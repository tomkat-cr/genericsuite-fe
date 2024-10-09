import {
    saveItemToLocalStorage,
    getItemFromLocalStorage,
    removeItemFromLocalStorage
} from "./localstorage-manager.jsx";

const defaultItemName = (lsItemName = null) => {
    return lsItemName ? lsItemName : 'currentConfig';
}

const buildConfigData = (lsDataDict = null) => {
    const defaultConfigData = {
        "pref_dark_mode": "1",
        "pref_side_menu": "1",
        "language": "en",
        "currency": "USD",
        "timezone": "America/New_York",
    };
    lsDataDict = lsDataDict ?? {};
    // Merge defaultConfigData with lsDataDict
    return { ...defaultConfigData, ...lsDataDict };
}

export const saveLocalConfig = (lsDataDict, lsItemName = null) => {
    lsItemName = defaultItemName(lsItemName);
    // This allows to add configuration items individually
    const existingLocalConfig = getLocalConfig(lsItemName);
    lsDataDict = { ...existingLocalConfig, ...lsDataDict };
    saveItemToLocalStorage(lsItemName, lsDataDict);
};

export const getLocalConfig = (lsItemName = null) => {
    lsItemName = defaultItemName(lsItemName);
    const lsDataDict = getItemFromLocalStorage(lsItemName);
    return buildConfigData(lsDataDict);
}

export const removeLocalConfig = (lsItemName = null) => {
    lsItemName = defaultItemName(lsItemName);
    removeItemFromLocalStorage(lsItemName);
};
