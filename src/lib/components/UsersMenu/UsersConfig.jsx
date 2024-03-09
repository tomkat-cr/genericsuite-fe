import React from 'react';

import {
    GenericCrudEditor,
    GetFormData,
} from '../../services/generic.editor.rfc.service';
import users_config from "../../../configs/frontend/users_config.json";

export function UsersConfig_EditorData() {
    // console_debug_log("UsersConfig_EditorData");
    const registry = {
        "UsersConfig": UsersConfig, 
    }
    // return GetFormData('users_config', registry, false);
    return GetFormData(users_config, registry, false);
}

export function UsersConfig() {
    return {
        editorConfig: UsersConfig_EditorData(),
        component: UsersConfigComponent
    };
}

export const UsersConfigComponent = ({parentData}) => (
    <GenericCrudEditor
        editorConfig={UsersConfig_EditorData()}
        parentData={parentData}
    />
)
