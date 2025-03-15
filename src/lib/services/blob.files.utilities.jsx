// Blob files utilities

import { console_debug_log } from './logging.service.jsx';

const debug = false;

export const defaultFilenametoDownload = 'audio.wav';

export const getFileExtension = (filename) => {
    const fileExtension = filename ? filename.split('.').pop() : null;
    if (debug) {
        console_debug_log(`|||| getFileExtension | filename: ${filename} | fileExtension: ${fileExtension}`);
    }
    return fileExtension;
}

export const getContentType = (filename, forceAlternative = false) => {
    const fileExtension = getFileExtension(filename);
    let contentType = null;
    switch(fileExtension) {
        case 'wav':
            contentType = 'audio/wav';
            break;
        case 'mp3':
            if (forceAlternative) {
                contentType = 'audio/mp3';
            } else {
                contentType = 'audio/mpeg';
            }
            break;
        case 'csv':
            contentType = 'text/csv';
            break;
        case 'pdf':
            contentType = 'application/pdf';
            break;
        default:
            contentType = 'application/octet-stream';
    };
    if (debug) {
        console_debug_log(`|||| getContentType | filename: ${filename} | contentType: ${contentType}`);
    }
    return contentType;
}

export const getContentTypeFromHeadersOrFilename = (headers, filename) => {
    const contentType = getHeadersContentType(headers);
    if (!contentType) {
        return getContentType(filename);
    }
    return contentType;
}

export const getFilenameFromContentDisposition = (headers) => {
    // Example: attachment; filename="dccbd8f2900a4c7eb1035add851da72f.wav"
    const contentDisposition = headers.get('content-disposition');
    const filenameMatch = contentDisposition && contentDisposition.match(/filename="([^"]+)"/);
    const filename = filenameMatch ? filenameMatch[1] : null;
    if (debug) {
        console_debug_log('|||| Content-Disposition:', contentDisposition);
        console_debug_log('|||| Content-Disposition filename:', filename);
    }
    return filename;
}

export const performDownload = (fileUrl, filename=null, performIt=true) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', filename ? filename : defaultFilenametoDownload); // or any other extension
    document.body.appendChild(link);
    if (performIt) {
        link.click();
        document.body.removeChild(link);
        return true;
    }
    return link;
}

export const getHeadersContentType = (headers) => {
    if (!headers || !headers.get || typeof headers.get('content-type') === 'undefined') {
        return null;
    }
    return headers.get('content-type');
}

export const responseHasFile = (headers) => {
    const contentType = getHeadersContentType(headers);
    return contentType === 'application/octet-stream'
        || contentType.includes('audio/')
        || contentType.includes('image/')
        || contentType.includes('video/')
        || contentType.includes('text/csv')
        || contentType.includes('text/text')    // TODO: only to simulate AWS API Gateway
    ;                
}

export const isBinaryFileType = (filename) => {
    const contentType = getContentType(filename);
    return contentType === 'application/octet-stream'
        || contentType.includes('audio/')
        || contentType.includes('image/')
        || contentType.includes('video/')
    ;                
}

export const decodeBlob = (base64String, filename, oldUrl = null) => {
    const blobType = getContentType(filename);
    if (debug) console_debug_log('decodeBlob | base64String:', base64String);
    if (typeof base64String !== 'string') {
        if (oldUrl === null) {
            throw new Error('Expected a string');
        }
        return oldUrl;
    }
    let binaryString;
    let stringIsAbinary = false;
    try {
        binaryString = window.atob(base64String);
    } catch (e) {
        if (e instanceof DOMException && e.name === 'InvalidCharacterError') {
            // throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded contains characters outside of the Latin1 range. This may occur if the backend is in FastAPI instead of Chalice.");
            stringIsAbinary = true;
        } else {
            throw e;
        }
    }
    let blob;
    if (!stringIsAbinary) {
        const len = binaryString.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        if (debug) console_debug_log('decodeBlob v2 | bytes:', bytes);
        blob = new Blob([bytes], { type: blobType });
    } else {
        blob = new Blob([base64String], { type: blobType });
    }
    if (debug) console_debug_log('decodeBlob v2 | blob:', blob);
    const url = URL.createObjectURL(blob);
    if (debug) console_debug_log('decodeBlob v2 | new url:', url);
    return url;
}

export const fixBlob = async (blobObj, filename, headers = null) => {
    // Verify if the blob is a binary encoded as Base64 string
    // If so, decode it and return a new blob URL with the decoded content...
    // Else, just return the blob URL...
const debug = true;
    if (debug) {
        console_debug_log(`|||| fixBlob v2 | filename: ${filename}`);
    }
    const contentType = getContentTypeFromHeadersOrFilename(headers, filename);
    let blobUrl = null;
    try {
        blobUrl = URL.createObjectURL(blobObj);
    } catch (e) {
        if (debug) console_debug_log('|||| fixBlob v2 | URL.createObjectURL # 1 | Error:', e);
        if (!e.message.includes('Overload resolution failed')) {
            return Promise.reject(e);
        }
    }
    if (blobUrl === null) {
        try {
            const binaryData = [];
            binaryData.push(blobObj);
            blobObj = new Blob(binaryData, {type: contentType})
            blobUrl = URL.createObjectURL(blobObj);
        } catch (e) {
            if (debug) console_debug_log('|||| fixBlob v2 | URL.createObjectURL # 2 | Error:', e);
            return Promise.reject(e);
        }
    }
    if (!isBinaryFileType(filename)) {
        return new Promise((resolve, _) => {
            resolve(blobUrl);
        });
    }
    const reader = new FileReader();
    // reader.readAsDataURL(blob);  // Convert to data:audio/mpeg;base64,Ly9Qa3h...
    reader.readAsText(blobObj);  // No convertion at all... just get what it receives...
    return new Promise((resolve, reject) => {
        reader.onloadend = function () {
            if (typeof reader.result !== 'string') {
                resolve(blobUrl);
            } else {
                blobUrl = decodeBlob(reader.result, filename);
                resolve(blobUrl);
            }
        };
        reader.onerror = function (error) {
            reject(error);
        };
    });
};
