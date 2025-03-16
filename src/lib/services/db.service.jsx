// API/Database services

import { authHeader } from '../helpers/auth-header.jsx';
import {
    ACTION_CREATE, 
    ACTION_UPDATE, 
    ACTION_DELETE, 
} from '../constants/general_constants.jsx';
import { handleFetchError } from './response.handlers.service.jsx';
import { console_debug_log } from './logging.service.jsx';
import { gsFetch } from './fetch.utilities.jsx';
import { convertId } from './id.utilities.jsx';

// export const MULTIPART_FORM_DATA_HEADER = {'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'};
export const MULTIPART_FORM_DATA_HEADER = {'Content-Type': 'multipart/form-data'};

const useExposeHeaders = (process.env.REACT_APP_USE_EXPOSE_HEADERS || "0") == "1";

export class dbApiService {
    
    constructor(props) {
        this.props = props;
     
        const additionalHeaders = this.getAdditionalHeaders();
        this.props.authHeader = authHeader();
        this.props.authAndJsonHeader = Object.assign(
            { 
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                // https://stackoverflow.com/questions/43344819/reading-response-headers-with-fetch-api
                // IMPORTANT: this makes the frontend unresponsive when it's deployed on the cloud (AWS)
                // 'Access-Control-Allow-Headers': 'Content-Type, Content-Disposition',
            },
            additionalHeaders,
            this.props.authHeader
        );
        if (this.debug) {
            console_debug_log('###===> dbApiService() | this.props:');
            console_debug_log(this.props);
        }
    }

    props = null;
    apiUrl = process.env.REACT_APP_API_URL;

    // debug = false;
    debug = true;

    getAdditionalHeaders() {
        const headers = {};
        if (useExposeHeaders) {
            // [GS-15] This one should work to allow receive the headers sent by the Flask backend
            headers['Access-Control-Expose-Headers'] = 'Content-Disposition';
        }
        return headers;
    }

    paramsToUrlQuery(params) {
        let urlQuery = '';
        Object.entries(params).map(([key, value]) => (
            urlQuery += ((urlQuery === '' ? '?' : '&') + key + '=' + value)
        ));
        return urlQuery;
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
        return gsFetch(url, requestOptions);
    }

    getOne(params, options={}) {
        const requestOptions = { ...options, method: 'GET', headers: this.props.authHeader };
        const urlQuery = this.paramsToUrlQuery(params);
        if (this.debug) {
            console_debug_log(`###===> getOne() | ${this.apiUrl}/${this.props.url}${urlQuery}`);
        }
        const url = `${this.apiUrl}/${this.props.url}${urlQuery}`;
        return gsFetch(url, requestOptions);
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
        return gsFetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions);
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
        return gsFetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions);
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
        return gsFetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions);
    }

    convertId(id) {
        return convertId(id);
    }
}
