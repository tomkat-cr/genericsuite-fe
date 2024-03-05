import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

export function getPrefix(hardPrefix=false) {
    if (hardPrefix) {
        const prefix = process.env.REACT_APP_URI_PREFIX ? process.env.REACT_APP_URI_PREFIX : '';
        return '/#'+prefix;
    }
    return '';
}

export const setLastUrl = (lastURL=null) => {
    if (!lastURL) {
        lastURL = window.location.href;
    }
    if (lastURL.indexOf('/login') === -1) {
        localStorage.setItem('lastURL', lastURL);
    }
}

export const removeLastUrl = () => {
    localStorage.removeItem('lastURL');
}

export const getLastUrl = () => {
    let lastUrl = getPrefix(true)+'/';
    if (localStorage.getItem('lastURL')) {
        lastUrl = localStorage.getItem('lastURL');
    }
    return lastUrl;
}
