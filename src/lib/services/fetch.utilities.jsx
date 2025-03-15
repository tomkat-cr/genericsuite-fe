// Fetch/Axios utilities
import { handleResponse, handleFetchError, usePlainFetch, IsJsonString } from './response.handlers.service.jsx';
import { fixBlob, getFilenameFromContentDisposition, responseHasFile } from './blob.files.utilities.jsx';
import { console_debug_log } from './logging.service.jsx';
import axios from 'axios';

const debug = true;

const useAxios = (process.env.REACT_APP_USE_AXIOS || "1") == "1";

export const getAxios = (url, requestOptions) => {
    if (debug) console_debug_log('GETAXIOS | url:', url, '\n | requestOptions:', requestOptions);
    let response;
    const { method, body, headers } = requestOptions;
    try {
        response = axios({
            url: url,
            method: method,
            data: body,
            headers: headers,
        })
        .then(response => {
            if (debug) console_debug_log('||| getAxios | Phase 1 | response:', response);
            if (response.status !== 200) {
                return Promise.reject(response);
            }
            const headers = response.headers;
            if (debug) console_debug_log('||| getAxios | Phase 1.5 | headers:', headers);
            if (responseHasFile(headers)) {
                const filename = getFilenameFromContentDisposition(headers);
                return fixBlob(response.data, filename, headers);
            }
            const text = response.data;                
            if (typeof text.resultset !== 'undefined' && IsJsonString(text.resultset)) {
                text.resultset = JSON.parse(text.resultset);
            }
            const new_response = Object.assign({}, response, text);
            new_response.ok = response.status === 200;
            new_response.text = text;
            delete new_response.data;
            if (debug) console_debug_log('||| getAxios | Phase 2 | new_response:', new_response);
            return new_response;
        })
        .catch(error => {
            return handleFetchError(error);
        });
    } catch (error) {
        console.error('Error in getAxios:', error);
        throw error;
    }
    return response;
}

export const getFetch = (url, requestOptions) => {
    if (debug) console_debug_log('GETFETCH | url:', url, '\n | requestOptions:', requestOptions);
    let response;
    try {
        if (usePlainFetch) {
            response = fetch(url, requestOptions)
                .then(handleResponse)
                .catch(handleFetchError);
        } else {
            response = fetch(url, requestOptions)
                .then(response => {
                    if (debug) console_debug_log('||| getFetch | Phase 1 | response:', response);
                    if (!response.ok) {
                        // throw new Error('Network response was not ok');
                        return Promise.reject(response);
                    }
                    const headers = response.headers;
                    // Process blob
                    if (responseHasFile(headers)) {
                        // Get file name and extension
                        const filename = getFilenameFromContentDisposition(headers);
                        return response.blob().then(blob => {
                            // Create a link to download the file (from blob)
                            // Verifying if it's a binary encoded as Base64 string
                            return fixBlob(blob, filename, headers)
                            .then(
                                (text) => {
                                    // "text" contains the blob URL...
                                    if (debug) console_debug_log('||| getFetch | Phase 1.5 | blob:', blob, 'text:', text, 'filename:', filename);
                                    return { headers, text, response };
                                },
                                (error) => {
                                    if (debug) console_debug_log('||| getFetch | fixBlob | error:', error);
                                    return Promise.reject(response);
                                }
                            );
                        });
                    } else {
                        // Process headers if needed here and the response text body
                        return response.text().then(text => {
                            if (debug) console_debug_log('||| getFetch | Phase 3 | { headers, text, response }:', { headers, text, response });
                            return { headers, text, response };
                        });
                    }
                })
                .then(({ headers, text, response }) => {
                    if (debug) console_debug_log('||| getFetch | Phase 2 | headers:', headers, 'text', text, 'response:', response);
                    const data = {
                        response: text,
                        headers: headers, // Attach headers to the data object
                        ok: response.ok,
                        status: response.status,
                        statusText: response.statusText,
                    };
                    return data;
                })
                .then(handleResponse)
                .catch(handleFetchError);
        }
    }
    catch (e) {
        if (debug) console_debug_log('|| FETCH Error:', e);
        response = Promise.resolve(handleFetchError(e));
    };
    return response;
}

export const gsFetch = (url, requestOptions) => {
    if (useAxios) {
        return getAxios(url, requestOptions);
    }
    return getFetch(url, requestOptions);
}
