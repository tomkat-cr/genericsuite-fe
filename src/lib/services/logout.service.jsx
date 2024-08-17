import { BehaviorSubject } from 'rxjs';

import { setLastUrl } from '../helpers/history.jsx';

export const getCurrentUserFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem('currentUser'));
};

export const currentUserSubject = new BehaviorSubject(
    getCurrentUserFromLocalStorage()
);

export function logout(lastURL=null) {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    if (lastURL) {
        setLastUrl(lastURL);
    }
}
