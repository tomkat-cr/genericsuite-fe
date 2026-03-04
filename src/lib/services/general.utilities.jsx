export function isDict(value) {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

export function isList(value) {
    return Array.isArray(value);
}

export function isString(value) {
    return typeof value === 'string';
}

export function isNumber(value) {
    return typeof value === 'number';
}
