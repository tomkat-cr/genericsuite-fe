import React from 'react';

import {
    GenericCrudEditor,
    GetFormData,
} from '../../services/generic.editor.rfc.service.jsx';

import users_config from "../../../configs/frontend/users_config.json";
import users_config_admin from "../../../configs/frontend/users_config_admin.json";

export function UsersConfig_EditorData(isSuperUser) {
    const registry = {
        "UsersConfig": UsersConfig,
    }
    return GetFormData(
        isSuperUser ? users_config_admin : users_config,
        registry,
        false
    );
}

export function UsersConfig() {
    return {
        editorConfig: UsersConfig_EditorData(false),
        component: UsersConfigComponent
    };
}

export function UsersConfigAdmin() {
    return {
        editorConfig: UsersConfig_EditorData(true),
        component: UsersConfigAdminComponent
    };
}

export const UsersConfigComponent = ({ parentData }) => (
    <GenericCrudEditor
        editorConfig={UsersConfig_EditorData(false)}
        parentData={parentData}
    />
)

export const UsersConfigAdminComponent = ({ parentData }) => (
    <GenericCrudEditor
        editorConfig={UsersConfig_EditorData(true)}
        parentData={parentData}
    />
)
