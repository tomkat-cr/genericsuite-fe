import {
    MSG_ERROR_CONNECTION_FAIL,
    MSG_ERROR_INVALID_CREDS,
    MSG_ERROR_POSSIBLE_CORS,
    MSG_ERROR_SESSION_EXPIRED,
} from '../_constants/general_constants';
import { console_debug_log } from './logging.service';

const debug = false;

export const usePlainFetch = false;

export function handleResponse(response) {
    if (response.headers && response.response) {
        if (debug) console_debug_log('Response contains headers and response:', response.headers, response.response);
        return handleResponseText(response, response.response, response.headers);
    } else {
        if (debug) console_debug_log('Response does not contain headers and response:', response);
        return response.text().then(
            text => {
                return handleResponseText(response, text, {});
            },
            reason => {
                if (debug) console_debug_log('handleResponse ERROR - reason:');
                console.error(reason);
            }
        );
    }
}

export function handleResponseText(response, text, headers) {
    let data = {};
    if (IsJsonString(text)) {
        data = text && JSON.parse(text);
    }
    if (!response.ok) {
        let specificErrorMsg = (data && data.message) || text || response.statusText || '';
        if ([401, 403].indexOf(response.status) !== -1) {
            // Auto logout if 401 Unauthorized or 403 Forbidden response returned from api
            if (response.status === 401) {
                if (specificErrorMsg === '') {
                    specificErrorMsg = MSG_ERROR_INVALID_CREDS;
                }
            }
        }
        const errorMsg = specificErrorMsg || (data && data.message) || text || response.statusText;
        if (debug) {
            console_debug_log(
                'handleResponse | !response.ok | data:', data,
                'response:', response,
                'specificErrorMsg:', specificErrorMsg,
                'text:', text
            );
        }
        return Promise.reject(errorMsg);
    } else {
        data.headers = headers;
        if (!IsJsonString(text)) {
            if (debug) {
                console_debug_log(
                    'handleResponse | !IsJsonString(text) | data:', data,
                    'response:', response,
                    'text:', text
                );
            }
            data.file = text;
            if (!usePlainFetch && !data.headers.get('content-type')) {
                data.headers.set('content-type', 'application/octet-stream');
            }
        }
        if(typeof data.error == 'undefined') {
            data.error = false;
        }
        if(typeof data.error_message != 'undefined') {
            data.message = data.error_message;
        }
        if(typeof data.resultset != 'undefined' && typeof data.resultset != 'object') {
            // When the data.resultset has an array of records (objects) instead of a sigle object, it comes as an encapsulated string
            data.resultset = JSON.parse(data.resultset);
        }
    }
    if (debug) {
        console_debug_log('||| handleResponse data:', data, 'text:', text);
    }
    return data;
}

export async function handleFetchError(error) {
    const debug = true;
    let possibleCORS;
    let errorMsg;
    let reasonDetail;
    if (error instanceof Response) {
        /*
            body: (...)
            bodyUsed: false
            headers: Headers {}: 
            ok: false
            redirected: false
            status: 401
            statusText: "Unauthorized"
            type: "cors"
            url: "https://hostanme/endpoint"
        */
        possibleCORS = (error.statusText.includes('CORS'));

        reasonDetail = await error.text().then(text => {
            console_debug_log('Error body:', text);
            return text;
        }).catch(e => {
            console_debug_log('Error reading body:', e);
            return `HTTP ${error.status}`;
        });

        if (error.status === 401) {
            errorMsg = MSG_ERROR_SESSION_EXPIRED;
        } else {
            errorMsg = error.statusText;
        }
    } else {
        possibleCORS = (error instanceof TypeError && error.message.includes('Failed to fetch'));
        errorMsg = MSG_ERROR_CONNECTION_FAIL + (possibleCORS ? ` (${MSG_ERROR_POSSIBLE_CORS})` : '');
        reasonDetail = error;
   }
    if (debug) {
        console_debug_log(
            'handleFetchError | error:', error,
            'errorMsg:', errorMsg,
            'reasonDetail:', reasonDetail,
        );
    }
    return Promise.reject({
        error: true,
        message: errorMsg,
        reason: reasonDetail,
    });
}

export function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}
