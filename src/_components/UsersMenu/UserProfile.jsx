import React from 'react';

import {
    GenericSinglePageEditor,
    GetFormData,
    authenticationService,
} from '../../_services';

import {
    // WEIGHT_UNITS,
    // HEIGHT_UNITS,
    // GENDERS,
    // GOAL_CODES,
    LANGUAGES,
    BILLING_PLANS,
    TRUE_FALSE,
} from '../../_constants';
// import { UsersFoodTimes, UsersUserHistory } from '../UsersMenu';
// import { UserMinimumDailyCalories } from '../Health/UserDailyCaloriesAndCondition';
import { UsersConfig } from '../UsersMenu/UsersConfig';
import {
    UsersDbPostWrite,
    UsersDbListPreRead,
    UsersDbPreWrite,
    UsersValidations,
    UsersPasswordValidations,
} from '../SuperAdminOptions/Users';


export function UsersProfile_EditorData() {
    const registry = {
        // User's Profile
        // "WEIGHT_UNITS": WEIGHT_UNITS, 
        // "HEIGHT_UNITS": HEIGHT_UNITS, 
        // "GENDERS": GENDERS,
        // "GOAL_CODES": GOAL_CODES, 
        "LANGUAGES": LANGUAGES, 
        "TRUE_FALSE": TRUE_FALSE,
        "BILLING_PLANS": BILLING_PLANS,
        // "UserMinimumDailyCalories": UserMinimumDailyCalories,
        // "UsersFoodTimes": UsersFoodTimes,
        // "UsersUserHistory": UsersUserHistory,
        "UsersDbPostWrite": UsersDbPostWrite,
        "UsersConfig": UsersConfig,
        "UserProfileEditor": UserProfileEditor,
        "UsersDbListPreRead": UsersDbListPreRead,
        "UsersDbPreWrite": UsersDbPreWrite,
        "UsersValidations": UsersValidations,
        "UsersPasswordValidations": UsersPasswordValidations,
    }
    return GetFormData('users_profile', registry, 'UserProfileEditor');
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
