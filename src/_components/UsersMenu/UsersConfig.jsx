import React from 'react';

import {
    GenericCrudEditor,
    GetFormData,
    // console_debug_log
} from '../../_services';

export function UsersConfig_EditorData() {
    // console_debug_log("UsersConfig_EditorData");
    const registry = {
        "UsersConfig": UsersConfig, 
    }
    return GetFormData('users_config', registry, false);
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
