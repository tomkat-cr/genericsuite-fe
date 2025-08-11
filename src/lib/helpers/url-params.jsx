import { console_debug_log } from "../services/logging.service.jsx";

const debug = false;

export function getUrlParams(props = window) {
    let urlParams = {};
    let searchString;
    if (debug) console_debug_log('getUrlParams | props:', props);
    try {
        if (props.hasOwnProperty('location')) {
            if (props.location.hasOwnProperty('search')) {
                if (props.location.search !== '') {
                    searchString = props.location.search;
                } else {
                    searchString = props.location.href;
                }
                if (searchString.startsWith('?')) {
                    // Remove only the leading '?', do not split by other '?' inside values
                    searchString = searchString.slice(1);
                }
                if (searchString === '') {
                    return urlParams;
                }
                let keyPairs = searchString.split("&");
                if(Array.isArray(keyPairs)) {
                    for (let i = 0; i < keyPairs.length; i++) {
                        const keyPairString = keyPairs[i];
                        const [rawKey, ...rest] = keyPairString.split('=');
                        let rawValue = rest.length > 0 ? rest.join('=') : '';
                        // If this is the redirect param and it contains a hash (#),
                        // treat the remainder of the query string as part of the value
                        if (rawValue.includes('#') && i < keyPairs.length - 1) {
                            const tail = keyPairs.slice(i + 1).join('&');
                            rawValue = `${rawValue}&${tail}`;
                            // We consumed the rest
                            i = keyPairs.length;
                        }
                        let key = rawKey;
                        let value = rawValue;
                        try {
                            key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
                        } catch (_) { /* noop */ }
                        try {
                            value = decodeURIComponent(rawValue.replace(/\+/g, ' '));
                        } catch (_) { /* noop */ }
                        urlParams[key] = value;
                    }
                }
            }
        } else {
            if (props.hasOwnProperty('match')) {
                if (props.match.hasOwnProperty('params')) {
                    urlParams = props.match.params;
                }
            }
        }   
    } catch (error) {
        console.log(`getUrlParams ERROR | ${props}`);
        console.error(error)
    }
    if (debug) console_debug_log('getUrlParams | urlParams:', urlParams);
    return urlParams;
}
