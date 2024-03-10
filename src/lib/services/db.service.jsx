// API/Database services

import { authHeader } from '../helpers/auth-header.jsx';
import {
    ACTION_CREATE, 
    ACTION_UPDATE, 
    ACTION_DELETE, 
} from '../constants/general_constants.jsx';
import { handleResponse, handleFetchError, usePlainFetch } from './response.handlers.service.jsx';
import { fixBlob, getFilenameFromContentDisposition, responseHasFile } from './blob.files.utilities.jsx';
import { console_debug_log } from './logging.service.jsx';

// export const MULTIPART_FORM_DATA_HEADER = {'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'};
export const MULTIPART_FORM_DATA_HEADER = {'Content-Type': 'multipart/form-data'};

export class dbApiService {
    
    constructor(props) {
        this.props = props;
     
        this.props.authHeader = authHeader();
        this.props.authAndJsonHeader = Object.assign(
            { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // https://stackoverflow.com/questions/43344819/reading-response-headers-with-fetch-api
                // IMPORTANT: this makes the frontend unresponsive when it's deployed on the cloud (AWS)
                // 'Access-Control-Allow-Headers': 'Content-Type, Content-Disposition',
            }, 
            this.props.authHeader
        );
        if (this.debug) {
            console_debug_log('###===> dbApiService() | this.props:');
            console_debug_log(this.props);
        }
    }

    props = null;
    apiUrl = process.env.REACT_APP_API_URL;
    debug = false;

    paramsToUrlQuery(params) {
        let urlQuery = '';
        Object.entries(params).map(([key, value]) => (
            urlQuery += ((urlQuery === '' ? '?' : '&') + key + '=' + value)
        ));
        return urlQuery;
    }

    getFetch(url, requestOptions) {
        let response;
        try {
            if (usePlainFetch) {
                response = fetch(url, requestOptions)
                    .then(handleResponse)
                    .catch(handleFetchError);
            } else {
                response = fetch(url, requestOptions)
                    .then(response => {
                        if (this.debug) console_debug_log('||| getFetch | Phase 1 | response:', response);
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
                                return fixBlob(blob, filename)
                                .then(
                                    (text) => {
                                        // "text" contains the blob URL...
                                        if (this.debug) console_debug_log('||| getFetch | Phase 1.5 | blob:', blob, 'text:', text, 'filename:', filename);
                                        return { headers, text, response };
                                    },
                                    (error) => {
                                        console.error('||| getFetch | fixBlob | error:', error);
                                        return Promise.reject(response);
                                    }
                                );
                            });
                        } else {
                            // Process headers if needed here and the response text body
                            return response.text().then(text => {
                                return { headers, text, response };
                            });
                        }
                    })
                    .then(({ headers, text, response }) => {
                        if (this.debug) console_debug_log('||| getFetch | Phase 2 | headers:', headers, 'text', text, 'response:', response);
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
            console.error('|| FETCH Error:', e);
            response = Promise.resolve(handleFetchError(e));
        };
        return response;
    }

    getAll(params={}, data={}, method='GET', options={}) {
        let requestOptions = {};
        let body;
        let headers = {}
        if (options['headers']) {
            headers = options['headers'];
        }
        if (options['raw_body']) {
            body = data
        } else {
            body = JSON.stringify(data);
        }
        if (['POST', 'PUT'].includes(method)) {
            requestOptions = {
                method: method,
                headers: Object.assign(
                    {},
                    this.props.authAndJsonHeader,
                    headers
                ),
                body: body,
            };
        } else {
            requestOptions = {
                method: method,
                headers: this.props.authHeader,
            };
        }
        if (options['signal']) {
            requestOptions['signal'] = options['signal'];
        }
        const urlQuery = this.paramsToUrlQuery(params);
        const url = `${this.apiUrl}/${this.props.url}${urlQuery}`;
        if (this.debug) {
            console_debug_log(`###===> getAll() | ${this.apiUrl}/${this.props.url}${urlQuery}`);
        }
        return this.getFetch(url, requestOptions);
    }

    getOne(params, options={}) {
        const requestOptions = { ...options, method: 'GET', headers: this.props.authHeader };
        const urlQuery = this.paramsToUrlQuery(params);
        if (this.debug) {
            console_debug_log(`###===> getOne() | ${this.apiUrl}/${this.props.url}${urlQuery}`);
        }
        const url = `${this.apiUrl}/${this.props.url}${urlQuery}`;
        return this.getFetch(url, requestOptions);
    }

    createUpdateDelete(action, id, data, queryParams={}) {
        switch(action) {
            case ACTION_CREATE:
                return this.createRow(data, queryParams);
            case ACTION_UPDATE:
                return this.updateRow(id, data, queryParams);
            case ACTION_DELETE:
                return this.deleteRow(id, data, queryParams);
            default:
                return handleFetchError('Error CUD-1 - Invalid action: '+action)
        }
    }

    createRow(data, queryParams={}) {
        const urlQuery = this.paramsToUrlQuery(queryParams);
        const requestOptions = { 
            method: 'POST',
            headers: this.props.authAndJsonHeader,
            body: JSON.stringify(data)
        };
        if (this.debug) {
            console_debug_log(`###===> createRow() | ${this.apiUrl}/${this.props.url}${urlQuery}`);
        }
        const response = fetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions)
            .then(handleResponse)
            .catch(handleFetchError);
        return response;
    }

    updateRow(id, data, queryParams={}) {
        const urlQuery = this.paramsToUrlQuery(queryParams);
        if(id !== null) {
            data.id = id;
        }
        const requestOptions = { 
            method: 'PUT',
            headers: this.props.authAndJsonHeader,
            body: JSON.stringify(data)
        };
        if (this.debug) {
            console_debug_log(`###===> updateRow() | ${this.apiUrl}/${this.props.url}${urlQuery}`);
        }
        const response = fetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions)
            .then(handleResponse)
            .catch(handleFetchError);
        return response;
    }

    deleteRow(id, data, queryParams={}) {
        let urlQuery = this.paramsToUrlQuery(queryParams);
        if(id !== null) {
            urlQuery += (urlQuery === '' ? '?' : "&")+`id=${id}`;
        }
        const requestOptions = { 
            method: 'DELETE',
            headers: this.props.authAndJsonHeader,
            body: JSON.stringify(data)
        };
        if (this.debug) {
            console_debug_log(`###===> deleteRow() | ${this.apiUrl}/${this.props.url}${urlQuery}`);
        }
        const response = fetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions)
            .then(handleResponse)
            .catch(handleFetchError);
        return response;
    }

    convertId(id) {
        return convertId(id);
    }
}

export const convertId = (id) => {
    return (id === null || id ==='' || typeof id === 'string' ? id : id.$oid);
}
