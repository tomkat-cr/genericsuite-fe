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
    TRUE_FALSE,
    ACTION_CREATE,
} from '../../constants/general_constants.jsx';

import users_api_keys from "../../../configs/frontend/users_api_keys.json";

// const crypto = require('crypto');
// import crypto from crypto;

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

export const UsersApiKeyComponent = ({parentData}) => (
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
    const debug = false;
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        switch(action) {
            case ACTION_CREATE:
                const access_token = generateAccessToken();
                if (debug) console_debug_log(`>>> UsersApiKeyGenerate | access_token:`, access_token);
                resp.fieldValues =  Object.assign(
                    data, { 'access_token': access_token }
                );
                break;
        }
        if (debug) console_debug_log(`>>> UsersApiKeyGenerate | resp:`, resp, 'data:', data, "action:", action);
        resolve(resp);
    });
}


