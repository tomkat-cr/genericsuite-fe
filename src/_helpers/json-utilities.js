export function getConfigsJsonFile(jsonFileName) {
    const rawJson = require(`../configs/frontend/${jsonFileName}.json`);
    return JSON.parse(JSON.stringify(rawJson));
}

export const buildConstant = (constants) => {
    return Object.entries(constants).map(([key, value]) => ({ title: value, value: key }));
}
