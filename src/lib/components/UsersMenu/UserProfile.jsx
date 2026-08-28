import React from 'react';

import { useUser } from '../../helpers/UserContext.jsx';
import {
    GetFormData,
} from '../../services/generic.editor.rfc.service.jsx';
import { GenericSinglePageEditor } from '../../services/generic.editor.singlepage.jsx';

import {
    BILLING_PLANS,
} from '../../constants/app_constants.jsx';
import {
    GENDERS,
    LANGUAGES,
    TRUE_FALSE,
} from '../../constants/general_constants.jsx';

import {
    UsersDbListPreRead,
    UsersDbPreWrite,
    UsersPasswordValidations,
    UsersValidations,
} from '../SuperAdminOptions/Users.jsx';

import { UsersApiKey } from '../UsersMenu/UsersApiKey.jsx';
import { UsersConfig } from './UsersConfig.jsx';
import { UsersUserHistory } from './UsersUserHistory.jsx';

import users_profile from "../../../configs/frontend/users_profile.json";

export function UsersProfile_EditorData() {
    const registry = {
        "LANGUAGES": LANGUAGES,
        "TRUE_FALSE": TRUE_FALSE,
        "BILLING_PLANS": BILLING_PLANS,
        "GENDERS": GENDERS,
        "UsersConfig": UsersConfig,
        "UserProfileEditor": UserProfileEditor,
        "UsersDbListPreRead": UsersDbListPreRead,
        "UsersDbPreWrite": UsersDbPreWrite,
        "UsersValidations": UsersValidations,
        "UsersPasswordValidations": UsersPasswordValidations,
        "UsersApiKey": UsersApiKey,
        "UsersUserHistory": UsersUserHistory,
    }
    // return GetFormData('users_profile', registry, 'UserProfileEditor');
    return GetFormData(users_profile, registry, 'UserProfileEditor');
}

export const UserProfileEditor = (props) => {
    const { currentUser } = useUser();
    return (
        <>
            <GenericSinglePageEditor
                id={currentUser.id}
                editorConfig={UsersProfile_EditorData()}
            />
        </>
    );
}
