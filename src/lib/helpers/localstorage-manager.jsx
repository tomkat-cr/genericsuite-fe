export const saveRawItemToLocalStorage = (lsItemName, lsData) => {
    localStorage.setItem(lsItemName, lsData);
};

export const getRawItemFromLocalStorage = (lsItemName) => {
    return localStorage.getItem(lsItemName);
};

export const removeItemFromLocalStorage = (lsItemName) => {
    localStorage.removeItem(lsItemName);
};

export const saveItemToLocalStorage = (lsItemName, lsDataDict) => {
    saveRawItemToLocalStorage(lsItemName, JSON.stringify(lsDataDict));
};

export const getItemFromLocalStorage = (lsItemName) => {
    return JSON.parse(getRawItemFromLocalStorage(lsItemName));
};
