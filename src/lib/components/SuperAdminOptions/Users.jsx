import React from 'react';

import {
    GenericCrudEditor,
    GetFormData,
} from '../../services/generic.editor.rfc.service';
import { genericFuncArrayDefaultValue } from '../../services/generic.editor.rfc.specific.func';
import {
    authenticationService,
    getUserData,
} from '../../services/authentication.service';
import { dbApiService } from '../../services/db.service';
import { console_debug_log } from '../../services/logging.service';
import { processDateToTimestamp } from '../../helpers/date-timestamp';

import {
    BILLING_PLANS,
} from '../../constants/app_constants';
import {
    ACTION_CREATE,
    ACTION_DELETE,
    ACTION_UPDATE,
    TRUE_FALSE,
    LANGUAGES,
} from '../../constants/general_constants';

import { UsersConfig } from '../UsersMenu/UsersConfig';
import users from "../../../configs/frontend/users.json";

const debug = false;

export function Users_EditorData(calleeName='Users_EditorData') {
    const registry = {
        "LANGUAGES": LANGUAGES, 
        "TRUE_FALSE": TRUE_FALSE,
        "BILLING_PLANS": BILLING_PLANS,
        "UsersDbPostWrite": UsersDbPostWrite,
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

export const UsersValidations = (data, editor, action) => {
    // Users pre-deletion/update validations
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        const { currentUserValue } = authenticationService;
        getUserData(currentUserValue.id)
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

export const UsersDbListPreRead = (data, editor, action) => {
    // Users pre-deletion/update validations
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        const { currentUserValue } = authenticationService;
        getUserData(currentUserValue.id)
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

/*
 * User's Profile
 */

export const UsersDbPostWrite = (data, editor, action) => {
    // Add an updated entry in user_history with current user's data
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        const parentId = data[editor.primaryKeyName];
        if (debug) {
            console_debug_log("UsersDbPostWrite - data:", data);
        }
        switch(action) {
            case ACTION_CREATE:
            case ACTION_UPDATE:
                const db = new dbApiService({ url: 'users/user-user-history' });
                // let itemToSave = (data['user_history']);
                // const newElement = {
                const itemToSave = {
                    user_id: parentId,
                    user_history: {
                        // date: processDateToTimestamp(new Date().toISOString().slice(0, 10)),
                        date: processDateToTimestamp(new Date().toISOString()),
                        goal_code: data['goal_code'],
                        goals: data['goals'],
                        weight: data['weight'],
                        weight_unit: data['weight_unit'],
                    }
                }
                // itemToSave.push(newElement);
                if (debug) {
                    console_debug_log("UsersDbPostWrite - itemToSave:", itemToSave);
                }
                db.createRow(itemToSave).then(
                    _ => {
                        // To refresh parent component and show the new calorie total
                        resp['otherData']['refresh'] = true;
                        if (debug) {
                            console_debug_log(`UsersDbPostWrite | resp:`, resp);
                        }
                        resolve(resp);
                    },
                    error => {
                        console_debug_log(`[UDPW-020] UsersDbPostWrite | error:`, error);
                        resp.error = true;
                        resp.errorMsg = error;
                        reject(resp)
                    }
                );
                break;
            default:
                resolve(resp);
        }
    });
}
