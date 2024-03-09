import React from 'react';

import {
    GetFormData,
} from '../../services/generic.editor.rfc.service';
import { GenericSinglePageEditor } from '../../services/generic.editor.singlepage';
import {
    authenticationService,
} from '../../services/authentication.service';

import {
    BILLING_PLANS,
} from '../../constants/app_constants';
import {
    TRUE_FALSE,
    LANGUAGES,
} from '../../constants/general_constants';

import { UsersConfig } from './UsersConfig';
import {
    UsersDbPostWrite,
    UsersDbListPreRead,
    UsersDbPreWrite,
    UsersValidations,
    UsersPasswordValidations,
} from '../SuperAdminOptions/Users';
import users_profile from "../../../configs/frontend/users_profile.json";

export function UsersProfile_EditorData() {
    const registry = {
        "LANGUAGES": LANGUAGES, 
        "TRUE_FALSE": TRUE_FALSE,
        "BILLING_PLANS": BILLING_PLANS,
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
