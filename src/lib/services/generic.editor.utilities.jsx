// GenericCrudEditor general utilities

export const defaultValue = (dictObj, elementName, defaultValue = '') => {
    if (typeof dictObj[elementName] !== 'undefined') {
        return dictObj[elementName];
    }
    return defaultValue;
}

export const replaceSpecialVars = (params, currentUser) => {
    Object.keys(params).forEach(key => {
        if (params[key] === "{CurrentUserId}") {
            params[key] = currentUser.id;
        }
    });
    return params;
}
