export function console_debug_log(debug_message) {
    if(get_debug_flag() === true) {
        console.log(debug_message);
        for (var i=1; i<arguments.length; i++) console.log(arguments[i]);
    }
}

export function get_debug_flag() {
    if(typeof window.app_local_debug === 'undefined') {
        if(process.env.hasOwnProperty('REACT_APP_DEBUG')) {
            window.app_local_debug = (process.env.REACT_APP_DEBUG === '1');
        } else {
            window.app_local_debug = false;
        }
    }
    return window.app_local_debug;
}