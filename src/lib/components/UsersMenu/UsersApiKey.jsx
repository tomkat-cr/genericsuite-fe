import React from 'react';

import {
    GenericCrudEditor,
    GetFormData,
} from '../../services/generic.editor.rfc.service.jsx';
import {
    genericFuncArrayDefaultValue
} from '../../services/generic.editor.rfc.specific.func.jsx';
import { console_debug_log } from '../../services/logging.service.jsx';

import {
    ACTION_CREATE,
    TRUE_FALSE,
} from '../../constants/general_constants.jsx';

import users_api_keys from "../../../configs/frontend/users_api_keys.json";

const debug = false;

const REACT_APP_API_KEYS_PREFIX = process.env.REACT_APP_API_KEYS_PREFIX || "sk-gsu-";

export function UsersApiKey_EditorData() {
    // console_debug_log("UsersApiKey_EditorData");
    const registry = {
        "UsersApiKey": UsersApiKey,
        "TRUE_FALSE": TRUE_FALSE,
        "UsersApiKeyDbPreRead": UsersApiKeyDbPreRead,
    }
    return GetFormData(users_api_keys, registry, false);
}

export function UsersApiKey() {
    return {
        editorConfig: UsersApiKey_EditorData(),
        component: UsersApiKeyComponent
    };
}

export const UsersApiKeyComponent = ({ parentData }) => (
    <GenericCrudEditor
        editorConfig={UsersApiKey_EditorData()}
        parentData={parentData}
    />
)

export const generateAccessToken = (length = 64) => {
    // Generate a long access token
    // return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    // return crypto.randomBytes(length).toString('hex');
    const array = new Uint8Array(length);
    window.crypto.getRandomValues(array);
    return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

export const UsersApiKeyDbPreRead = (data, editor, action, currentUser) => {
    // Users api keys pre-form data load default values (dbPreRead)
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        switch (action) {
            case ACTION_CREATE:
                const access_token_waw = generateAccessToken();
                const access_token = `${REACT_APP_API_KEYS_PREFIX}${access_token_waw}`;
                if (debug) console_debug_log('>>> UsersApiKeyGenerate | access_token:', access_token, 'access_token_waw:', access_token_waw);
                resp.fieldValues = Object.assign({}, data, {
                    'resultset': {
                        'access_token': access_token
                    }
                });
                break;
        }
        if (debug) console_debug_log(`>>> UsersApiKeyGenerate | resp:`, resp, 'data:', data, "action:", action);
        resolve(resp);
    });
}


