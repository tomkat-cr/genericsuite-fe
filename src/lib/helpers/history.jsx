import { createBrowserHistory } from 'history';

import {
    saveRawItemToLocalStorage,
    getRawItemFromLocalStorage,
    removeItemFromLocalStorage,
} from './localstorage-manager.jsx';

export const history = createBrowserHistory();

export function getPrefix(hardPrefix=false) {
    if (hardPrefix) {
        const prefix = process.env.REACT_APP_URI_PREFIX ?? '';
        return '/#'+prefix;
    }
    return '';
}

export const setLastUrl = (lastURL=null) => {
    if (!lastURL) {
        lastURL = window.location.href;
    }
    if (lastURL.indexOf('/login') === -1) {
        // localStorage.setItem('lastURL', lastURL);
        saveRawItemToLocalStorage('lastURL', lastURL);
    }
}

export const removeLastUrl = () => {
    localStorage.removeItem('lastURL');
    removeItemFromLocalStorage('lastURL');
}

export const getLastUrl = () => {
    let lastUrl = getRawItemFromLocalStorage('lastURL')
    if (lastUrl === null || lastUrl === '' || lastUrl === "null") {
        // lastUrl = getPrefix(true)+'/';
        lastUrl = '/';
    }
    return lastUrl;
}
