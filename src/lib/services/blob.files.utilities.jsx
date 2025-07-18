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
    let filenameMatch = contentDisposition && contentDisposition.match(/filename="([^"]+)"/);
    if (!filenameMatch) {
        filenameMatch = contentDisposition && contentDisposition.match(/filename=([^"]+)/);
    }
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
    return contentType && (contentType === 'application/octet-stream'
        || contentType.includes('audio/')
        || contentType.includes('image/')
        || contentType.includes('video/')
        || contentType.includes('text/csv')
        || contentType.includes('text/text')    // TODO: only to simulate AWS API Gateway
    );                
}

export const isBinaryFileType = (filename, contentType = null) => {
    if (!contentType) {
        if (filename) {
            contentType = getContentType(filename);
        } else {
            console.error('isBinaryFileType | filename and contentType are null');
            return false;
        }
    }
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
    if (debug) {
        console_debug_log(`|||| fixBlob v2 | filename: ${filename}`);
    }
    const headerContentType = getContentTypeFromHeadersOrFilename(headers, filename);
    const contentType = getContentType(filename);
    if (debug) console_debug_log('|||| fixBlob v2 | contentType:', contentType, ' | headerContentType:', headerContentType);
    let blobUrl = null;
    try {
        blobUrl = URL.createObjectURL(blobObj);
        if (debug) console_debug_log('|||| fixBlob v2 #1 | blobUrl:', blobUrl);
    } catch (e) {
        if (debug) console_debug_log('|||| fixBlob v2 #1 | URL.createObjectURL | Error:', e);
        // 'Overload resolution failed' happens when axios is used (not with fetch)
        if (!e.message.includes('Overload resolution failed')) {
            return Promise.reject(e);
        }
    }
    if (blobUrl === null) {
        try {
            const binaryData = [];
            binaryData.push(blobObj);
            blobObj = new Blob(binaryData, {type: contentType})
            if (debug) console_debug_log('|||| fixBlob v2 #2 | blobObj:', blobObj);
            blobUrl = URL.createObjectURL(blobObj);
            if (debug) console_debug_log('|||| fixBlob v2 #2 | blobUrl:', blobUrl);
        } catch (e) {
            if (debug) console_debug_log('|||| fixBlob v2 #2 | URL.createObjectURL | Error:', e);
            return Promise.reject(e);
        }
    }
    // if (!isBinaryFileType(filename, contentType)) {
    if (!isBinaryFileType(filename)) {
        if (debug) console_debug_log('|||| fixBlob v2 #3 | Not a binary file type');
        return new Promise((resolve, _) => {
            resolve(blobUrl);
        });
    }
    const reader = new FileReader();
    // reader.readAsDataURL(blob);  // Convert to data:audio/mpeg;base64,Ly9Qa3h...
    reader.readAsText(blobObj);  // No convertion at all... just get what it receives...
    if (debug) console_debug_log('|||| fixBlob v2 #4 | reader.readAsText(blobObj)');
    return new Promise((resolve, reject) => {
        reader.onloadend = function () {
            if (typeof reader.result !== 'string' || isBinaryFileType(filename, headerContentType)) {
                if (debug) console_debug_log('|||| fixBlob v2 #5 | reader.result:', reader.result);
                resolve(blobUrl);
            } else {
                if (debug) console_debug_log('|||| fixBlob v2 #6 | reader.result:', reader.result);
                blobUrl = decodeBlob(reader.result, filename);
                resolve(blobUrl);
            }
        };
        reader.onerror = function (error) {
            if (debug) console_debug_log('|||| fixBlob v2 #7 | reader.onerror | Error:', error);
            reject(error);
        };
    });
};
