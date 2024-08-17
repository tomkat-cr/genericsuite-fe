import React from 'react';

import {
    GenericCrudEditor,
    GetFormData,
} from '../../services/generic.editor.rfc.service.jsx';
import { genericFuncArrayDefaultValue } from '../../services/generic.editor.rfc.specific.func.jsx';
import {
    getUserData,
} from '../../services/authentication.service.jsx';
import { dbApiService } from '../../services/db.service.jsx';
import { console_debug_log } from '../../services/logging.service.jsx';
import { processDateToTimestamp } from '../../helpers/date-timestamp.jsx';

import {
    BILLING_PLANS,
} from '../../constants/app_constants.jsx';
import {
    ACTION_CREATE,
    ACTION_DELETE,
    ACTION_UPDATE,
    TRUE_FALSE,
    LANGUAGES,
    GENDERS,
} from '../../constants/general_constants.jsx';

import { UsersConfig } from '../UsersMenu/UsersConfig.jsx';

import users from "../../../configs/frontend/users.json";

const debug = false;

export function Users_EditorData(calleeName='Users_EditorData') {
    const registry = {
        "LANGUAGES": LANGUAGES, 
        "TRUE_FALSE": TRUE_FALSE,
        "BILLING_PLANS": BILLING_PLANS,
        "GENDERS": GENDERS,
        "UsersConfig": UsersConfig,
        "Users": Users,
        "UsersDbListPreRead": UsersDbListPreRead,
        "UsersDbPreWrite": UsersDbPreWrite,
        "UsersValidations": UsersValidations,
        "UsersPasswordValidations": UsersPasswordValidations,
    }
    // return GetFormData('users', registry, calleeName);
    return GetFormData(users, registry, calleeName);
}

export const Users = () => (
    <GenericCrudEditor editorConfig={Users_EditorData()} />
)

/*
 * System Admin
 */

export const UsersValidations = (data, editor, action, currentUser) => {
    // Users pre-deletion/update validations
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        getUserData(currentUser.id)
            .then( 
                userData => {
                    if (typeof data !== 'undefined' && typeof data['_id'] !== 'undefined') {
                        data['id'] = editor.db.convertId(data['_id'])
                    }
                    switch(action) {
                        case ACTION_DELETE:
                            if (data['superuser'] === '1' && userData.resultset['superuser'] === '0') {
                                resp.error = true;
                                resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 
                                    'Super users can be deleted only by other Super users.';
                            }
                            if (data['id'] === currentUserValue.id) {
                                resp.error = true;
                                resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 
                                    'You cannot delete yourself';
                            }
                            if (userData.resultset['superuser'] === '0' && data['id'] !== currentUserValue.id) {
                                resp.error = true;
                                resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 
                                    'You cannot delete other\'s records';
                            }
                            break;
                        case ACTION_CREATE:
                            if (userData.resultset['superuser'] === '0') {
                                resp.error = true;
                                resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 
                                    'You cannot create new users';
                            }
                            break;
                        case ACTION_UPDATE:
                            if (userData.resultset['superuser'] === '0' && data['id'] !== currentUserValue.id) {
                                resp.error = true;
                                resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 
                                    'You cannot modify other\'s records';
                            }
                            break;
                        default:
                    }
                    if (resp.error) {
                        reject(resp);
                    } else {
                        resolve(resp);
                    }
                },
                error => {
                    resp.error = true;
                    resp.errorMsg = error;
                    reject(resp)
                }
            );
    });
}

export const UsersDbListPreRead = (data, editor, action, currentUser) => {
    // Users pre-deletion/update validations
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        getUserData(currentUser.id)
            .then( 
                currentUserData => {
                    if (currentUserData.error) {
                        resp.error = true;
                        resp.errorMsg = currentUserData.errorMsg;
                    } else {
                        // Set a filter to retrieve only the current user
                        if (currentUserData.resultset['superuser'] === '0') {
                            resp.fieldValues['_id'] = currentUserValue.id
                        }    
                    }
                    if (resp.error) {
                        reject(resp);
                    } else {
                        resolve(resp);
                    }
                },
                error => {
                    resp.error = true;
                    resp.errorMsg = error;
                    reject(resp)
                }
            );
    });
}

export const UsersPasswordValidations = (data, editor, action) => {
    // Users validations
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        switch(action) {
            case ACTION_CREATE:
            case ACTION_UPDATE:
                if (data['passcode']) {
                    if (data['passcode'] !== data['passcode_repeat']) {
                        resp.error = true;
                        resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 
                            '"New Password" and "Repeat New Password" must be same';
                    }
                }
                break;
            default:
        }
        if (resp.error) {
            reject(resp);
        } else {
            resolve(resp);
        }
    });
}

export const UsersDbPreWrite = (data, editor, action) => {
    // Users validations
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        // Avoid passing an empty password to the backend
        if (data['passcode'].trim() === '') {
            resp.fieldsToDelete.push('passcode');
        }
        // Avoid passing the repeat password field to the backend
        resp.fieldsToDelete.push('passcode_repeat');
        resolve(resp);
    });
}
