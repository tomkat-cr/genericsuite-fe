import { console_debug_log } from '../services/logging.service.jsx';
import { getCurrentUserFromLocalStorage } from '../services/logout.service.jsx';

export function authHeader() {
    // Returns authorization header with jwt token
    let currentUser = null;
    try {
        currentUser = getCurrentUserFromLocalStorage();
    } catch (error) {
        console_debug_log(`authHeader | ERROR: ${error}`);
    }
    if (currentUser && currentUser.token) {
        if (process.env.REACT_APP_X_TOKEN) {
            return { 'x-access-tokens': currentUser.token };
        } else {
            return { Authorization: `Bearer ${currentUser.token}` };
        }
    } else {
        return {};
    }
}