import { BehaviorSubject } from 'rxjs';
import { setLastUrl } from '../_helpers';

export const currentUserSubject = new BehaviorSubject(
    JSON.parse(localStorage.getItem('currentUser'))
);

export function logout(lastURL=null) {
    // Remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    currentUserSubject.next(null);
    if (lastURL) {
        setLastUrl(lastURL);
    }
}
