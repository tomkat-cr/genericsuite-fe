import {
    saveItemToLocalStorage,
    getItemFromLocalStorage,
    removeItemFromLocalStorage
} from "./localstorage-manager.jsx";
import {
    ROWS_PER_PAGE,
} from "../constants/general_constants.jsx";

const debug = false;

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
        "gce_rows_per_page": ROWS_PER_PAGE,
        "gce_actions_allows_mouse_over": (process.env.REACT_APP_GCE_ACTIONS_ALLOW_MOUSE_OVER || "0"),
        "gce_actions_allows_magic_button": (process.env.REACT_APP_GCE_ACTIONS_ALLOW_MAGIC_BUTTON || "1"),
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

export const getLocalConfigItem = (lsItemName) => {
    const localConfig = getLocalConfig();
    return localConfig[lsItemName];
};

export const removeLocalConfig = (lsItemName = null) => {
    lsItemName = defaultItemName(lsItemName);
    removeItemFromLocalStorage(lsItemName);
};
