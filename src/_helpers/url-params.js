export function getUrlParams(props = window) {
    let urlParams = {};
    let searchString;
    try {
        if (props.hasOwnProperty('location')) {
            if (props.location.hasOwnProperty('search')) {
                if (props.location.search !== '') {
                    searchString = props.location.search;
                } else {
                    searchString = props.location.href;
                    if (searchString.includes('?')) {
                        searchString = searchString.split('?')[1];
                    } else {
                        searchString = '';
                    }
                }
                if (searchString === '') {
                    return urlParams;
                }
                let keyPairs = searchString.split("&");
                if(Array.isArray(keyPairs)) {
                    keyPairs.map(keyPairString => {
                        let KeyValueArray = keyPairString.split('=');
                        urlParams[KeyValueArray[0]] = 
                            (typeof KeyValueArray[1] === 'undefined' ? '' : KeyValueArray[1]);
                        return null;
                    });
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
    return urlParams;
}
