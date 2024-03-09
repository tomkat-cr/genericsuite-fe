// export function getConfigsJsonFile(jsonFileName) {
//     // const basePath = process.env.REACT_APP_JSON_CONFIG_PATH || '../src/configs';
//     // const jsonFilePath = `${basePath}/frontend/${jsonFileName}.json`
//     // const rawJson = require(jsonFilePath);
//     const rawJson = require(`../configs/frontend/${jsonFileName}.json`);
//     return rawJson;
// }

export const buildConstant = (constants) => {
    return Object.entries(constants).map(([key, value]) => ({ title: value, value: key }));
}
