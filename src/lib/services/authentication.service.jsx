// Authentication service

import { Buffer } from 'buffer';

import { getLocalConfig } from '../helpers/local-config.jsx';
import { saveItemToLocalStorage } from '../helpers/localstorage-manager.jsx';
import { dbApiService } from './db.service.jsx';
import { getBaseApiUrl, gsFetch } from './fetch.utilities.jsx';
import { convertId } from './id.utilities.jsx';
import { console_debug_log } from './logging.service.jsx';
import { currentUserSubject, logout } from './logout.service.jsx';

const debug = false;
export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue() { return currentUserSubject.value }
};

function login(username, password) {
    const config = {
        apiUrl: getBaseApiUrl()
    }
    // FA-62 - FE: Find a replacement for btoa()
    const requestOptions = {
        method: 'POST',
        headers: {
            "Authorization": "Basic " + Buffer.from(
                username + ":" + password
            ).toString('base64')
        },
    };
    return gsFetch(`${config.apiUrl}/users/login`, requestOptions)
        .then(res => {
            if (res.error) {
                return Promise.reject(res.message);
            }
            let user = {
                token: res.resultset.token
            };
            // Store the JWT token only in local storage to keep user logged in between page refreshes
            // localStorage.setItem('currentUser', JSON.stringify(user));
            saveItemToLocalStorage('currentUser', user);
            currentUserSubject.next(user);
            // Return user details and JWT token
            return getUserLocalData(res);
        });
}

export const getUserData = (userId) => {
    const dbApi = new dbApiService({ url: 'users' });
    return dbApi.getOne({ id: userId })
        .then(
            data => (data),
            error => {
                console_debug_log(`ERROR: getUserData(${userId}):`)
                console.error(error);
                return {
                    error: true,
                    errorMsg: error,
                };
            },
        );
}

export const getUserLocalData = (res) => {
    if (debug) console_debug_log('getUserLocalData() | res:', res);
    const data = res.resultset;
    if (debug) console_debug_log('getUserLocalData() | data:', data);
    const localConfig = getLocalConfig();
    return {
        id: convertId(data._id),
        // username: data.username,
        // email: data.email,
        firstName: data.firstname,
        // lastName: data.lastname,
        // token: data.token
        pref_side_menu: (data.pref_side_menu ?? localConfig.pref_side_menu),
        pref_dark_mode: (data.pref_dark_mode ?? localConfig.pref_dark_mode),
    };
}

export const getCurrentUserData = () => {
    const dbApi = new dbApiService({ url: 'users/current_user_d' });
    return dbApi.getOne({})
        .then(
            data => (data),
            error => {
                if (debug) {
                    console_debug_log(`ERROR: getCurrentUserData():`)
                    console.error(error);
                }
                return {
                    error: true,
                    errorMsg: error,
                };
            },
        );
}

export const verifyCurrentUser = (registerUser, currentUser, setAskForLogin) => {
    if (currentUser) {
        // Avoid multiple calls to setCurrentUser
        if (debug) console_debug_log("verifyCurrentUser() | currentUser already set");
        return;
    }
    if (authenticationService && typeof authenticationService.currentUserValue !== 'undefined' && authenticationService.currentUserValue) {
        getCurrentUserData()
            .then(
                userData => {
                    if (typeof userData.error !== 'undefined' && userData.error) {
                        console.error("verifyCurrentUser() | userData.errorMsg:", userData.errorMsg);
                        setAskForLogin(true);
                    } else {
                        if (debug) console_debug_log("verifyCurrentUser() | call to setCurrentUser with userData:", userData);
                        registerUser(getUserLocalData(userData));
                    }
                },
                error => {
                    setAskForLogin(true);
                    console.error(error.errorMsg);
                }
            );
    } else {
        setAskForLogin(true);
    }
}

/*
 * Get User Data cache
 */

let userDataCache = {}

export const getUserDataCache = (userId) => {
    if (userDataCache[userId]) {
        return Promise.resolve(userDataCache[userId])
    }
    return getUserData(userId)
}

export const setUserDataCache = (userId, userData) => {
    userDataCache[userId] = Object.assign({}, userData)
}
