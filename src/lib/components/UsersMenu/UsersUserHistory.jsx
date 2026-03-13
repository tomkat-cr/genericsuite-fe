import React from 'react';

import {
    BILLING_PLANS,
} from '../../constants/app_constants.jsx';
import {
    ACTION_CREATE,
    ACTION_UPDATE,
    TRUE_FALSE,
} from '../../constants/general_constants.jsx';
import { processDateToTimestamp } from "../../helpers/date-timestamp.jsx";
import { dbApiService } from '../../services/db.service.jsx';
import {
    GenericCrudEditor,
    GetFormData,
} from '../../services/generic.editor.rfc.service.jsx';
import {
    genericFuncArrayDefaultValue
} from '../../services/generic.editor.rfc.specific.func.jsx';
import { newIdString } from "../../services/id.utilities.jsx";
import { console_debug_log } from '../../services/logging.service.jsx';

import users_user_history from "../../../configs/frontend/users_user_history.json";

const debug = false;

export function UsersUserHistory_EditorData() {
    const registry = {
        "UsersUserHistory": UsersUserHistory,
        "TRUE_FALSE": TRUE_FALSE,
        "BILLING_PLANS": BILLING_PLANS,
    }
    return GetFormData(users_user_history, registry, false);
}

export function UsersUserHistory() {
    return {
        editorConfig: UsersUserHistory_EditorData(),
        component: UsersUserHistoryComponent
    };
}

export const UsersUserHistoryComponent = ({ parentData }) => (
    <GenericCrudEditor
        editorConfig={UsersUserHistory_EditorData()}
        parentData={parentData}
    />
)

export const UsersHistoryDbPostWrite = (data, editor, action) => {
    // Add an updated entry in user_history with current user's data
    return new Promise((resolve, reject) => {
        let resp = genericFuncArrayDefaultValue(data);
        const parentId = data[editor.primaryKeyName];
        if (debug) {
            console_debug_log('UsersHistoryDbPostWrite - parentId: ' + String(parentId) + ' | data:', data);
        }
        switch (action) {
            case ACTION_CREATE:
            case ACTION_UPDATE:
                const db = new dbApiService({ url: 'users_user_history' });
                const itemToSave = {
                    user_id: parentId,
                    user_history: {
                        id: newIdString(),
                        date: processDateToTimestamp(new Date().toISOString()),
                        email: data['email'],
                        status: data['status'],
                        plan: data['plan'],
                    }
                }
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
