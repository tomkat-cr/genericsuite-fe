import React from 'react';

import {
    GetFormData,
} from '../../services/generic.editor.rfc.service.jsx';
import { GenericSinglePageEditor } from '../../services/generic.editor.singlepage.jsx';
import {
    authenticationService,
} from '../../services/authentication.service.jsx';

import {
    BILLING_PLANS,
} from '../../constants/app_constants.jsx';
import {
    TRUE_FALSE,
    LANGUAGES,
    GENDERS,
} from '../../constants/general_constants.jsx';

import { UsersConfig } from './UsersConfig.jsx';
import {
    UsersDbPostWrite,
    UsersDbListPreRead,
    UsersDbPreWrite,
    UsersValidations,
    UsersPasswordValidations,
} from '../SuperAdminOptions/Users.jsx';

import users_profile from "../../../configs/frontend/users_profile.json";

export function UsersProfile_EditorData() {
    const registry = {
        "LANGUAGES": LANGUAGES, 
        "TRUE_FALSE": TRUE_FALSE,
        "BILLING_PLANS": BILLING_PLANS,
        "GENDERS": GENDERS,
        "UsersDbPostWrite": UsersDbPostWrite,
        "UsersConfig": UsersConfig,
        "UserProfileEditor": UserProfileEditor,
        "UsersDbListPreRead": UsersDbListPreRead,
        "UsersDbPreWrite": UsersDbPreWrite,
        "UsersValidations": UsersValidations,
        "UsersPasswordValidations": UsersPasswordValidations,
    }
    // return GetFormData('users_profile', registry, 'UserProfileEditor');
    return GetFormData(users_profile, registry, 'UserProfileEditor');
}

export const UserProfileEditor = (props) => {
    const { currentUserValue } = authenticationService;
    return (
        <>
            <GenericSinglePageEditor
                id={currentUserValue.id}
                editorConfig={UsersProfile_EditorData()}
            />
        </>
    );
}
