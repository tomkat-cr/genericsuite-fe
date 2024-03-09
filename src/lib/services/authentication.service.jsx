// Authentication service

import { Buffer } from 'buffer'

import { logout, currentUserSubject } from './logout.service';
import { dbApiService } from './db.service';
import { handleResponse, handleFetchError } from './response.handlers.service';
import { console_debug_log } from './logging.service';

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
                id: userService.convertId(res.resultset._id),
                username: res.resultset.username,
                // email: res.resultset.email,
                firstName: res.resultset.firstname,
                lastName: res.resultset.lastname,
                token: res.resultset.token
            };
            // store user details and jwt token in local storage to keep user logged in between page refreshes
            localStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return user;
        });
}

export const getUserData = (userId) => {
    const dbApi = new dbApiService({ url: 'users' });
    return dbApi.getOne({ id: userId })
        .then(
            data => (data),
            error => {
                console_debug_log(`ERROR: getUserData(${userId}:)`)
                console.error(error);
                return {
                    error: true,
                    errorMsg: error,
                };
            },
        );
}
