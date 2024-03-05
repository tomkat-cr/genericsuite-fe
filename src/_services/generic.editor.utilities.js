import { authenticationService } from "./authentication.service";

export const defaultValue = (dictObj, elementName, defaultValue = '') => {
    if (typeof dictObj[elementName] !== 'undefined') {
        return dictObj[elementName];
    }
    return defaultValue;
}

export const replaceSpecialVars = (params) => {
    const { currentUserValue } = authenticationService;
    Object.keys(params).forEach(key => {
        if (params[key] === "{CurrentUserId}") {
            params[key] = currentUserValue.id;
        }
    });
    return params;
}
