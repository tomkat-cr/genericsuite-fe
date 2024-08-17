// Authentication service

import { Buffer } from 'buffer'

import { logout, currentUserSubject } from './logout.service.jsx';
import { dbApiService } from './db.service.jsx';
import { handleResponse, handleFetchError } from './response.handlers.service.jsx';
import { console_debug_log } from './logging.service.jsx';

export const authenticationService = {
    login,
    logout,
    currentUser: currentUserSubject.asObservable(),
    get currentUserValue () { return currentUserSubject.value }
};

function login(username, password) {
    const config = {
        apiUrl: process.env.REACT_APP_API_URL
    }
    // FA-62 - FE: Find a replacement for btoa()
    const requestOptions = {
        method: 'POST',
        headers: {
            "Authorization":  "Basic " + Buffer.from(
                username + ":" + password
            ).toString('base64')
        },
    };
    let userService = new dbApiService({url: 'users'})
    return fetch(`${config.apiUrl}/users/login`, requestOptions)
        .then(handleResponse, handleFetchError)
        .then(res => {
            if(res.error) {
                return Promise.reject(res.message);
            }
            let user = {
                token: res.resultset.token
            };
            // Store the JWT token only in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
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
    let userService = new dbApiService({url: 'users'})
    return {
        id: userService.convertId(res.resultset._id),
        // username: res.resultset.username,
        // email: res.resultset.email,
        firstName: res.resultset.firstname,
        // lastName: res.resultset.lastname,
        token: res.resultset.token
    };
}

export const getCurrentUserData = () => {
    const dbApi = new dbApiService({ url: 'users/current_user_d' });
    return dbApi.getOne({})
        .then(
            data => (data),
            error => {
                console_debug_log(`ERROR: getCurrentUserData():`)
                console.error(error);
                return {
                    error: true,
                    errorMsg: error,
                };
            },
        );
}
