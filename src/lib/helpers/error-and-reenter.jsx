import React from 'react';
import { Button } from 'react-bootstrap';
import { Link as RouterLink } from 'react-router-dom';

import { 
    MSG_ERROR_INVALID_TOKEN,
    MSG_ERROR_CLICK_TO_RELOGIN,
    MSG_ERROR_CLICK_TO_RETRY,
    MSG_ERROR_SESSION_EXPIRED,
} from '../constants/general_constants.jsx';
import { APP_EMAILS, APP_VALID_URLS } from '../constants/app_constants.jsx';
import {
    authenticationService,
} from '../services/authentication.service.jsx';
import {
    console_debug_log,
} from '../services/logging.service.jsx';
import { history, getPrefix, setLastUrl } from './history.jsx';
import { ModalPopUp } from './ModalPopUp.jsx'

const debug = false;

const hard_login = false;

export function logoutHander() {
    if (debug) console_debug_log(`logoutHander | history.push(${getPrefix(true)+'/login'})`);
    authenticationService.logout();
    if (!history.push(getPrefix(true)+'/login') && hard_login) {
        if (debug) console_debug_log(`logoutHander | window.location.href = ${window.location.origin+getPrefix(true)+'/login'}`);
        window.location.href = window.location.origin + getPrefix(true) + '/login';
    }
};

export function refreshPage() {
    window.location.reload();;
};

const extractErrorFromVariants = (errorRaw, element, subElement = null) => {

console_debug_log(`extractErrorFromVariants | element = '${element}', subElement = '${subElement}' | errorRaw:`, errorRaw);
    let error = errorRaw;
    let errorJson;
    if (typeof error['errorMsg'] !== 'undefined') {
        error = error['errorMsg'];
    }
    if (typeof error === 'string') {
        if (subElement) {
            return '';
        }
        return error;
    }
    if (typeof error[element] !== 'undefined') {
        errorJson = error[element];
        if (typeof errorJson === 'string') {
            try {
                errorJson = JSON.parse(errorJson);
            } catch (e) {
                errorJson = null;
            }
            if (!errorJson) {
                if (subElement) {
                    return '';
                }
                return error[element];
            }
        }
        if (subElement) {
            if (typeof errorJson[subElement] === 'undefined') {
                return '';
            }
            return errorJson[subElement];
        }
console_debug_log(`(1) extractErrorFromVariants | errorJson:`, errorJson);
        return String(errorJson);
    }
console_debug_log(`(2) extractErrorFromVariants | error:`, error);
    if (subElement) {
        return '';
    }
    return String(error);
}

export const getErrorMessage = (error) => {
    if (typeof error === 'string') {
        return error;
    }
    let errorMessage = extractErrorFromVariants(error, 'message');
    
console_debug_log(`getErrorMessage | errorMessage = '${errorMessage}'`);

    let errorReason = extractErrorFromVariants(error, 'reason', 'message');

console_debug_log(`getErrorMessage | errorReason 11:`, errorReason);

    if (!errorReason) {
        errorReason = extractErrorFromVariants(error, 'reason', 'detail');

console_debug_log(`getErrorMessage | errorReason 22:`, errorReason);

    }
    if (!errorReason) {
        errorReason = extractErrorFromVariants(error, 'reason');

console_debug_log(`getErrorMessage | errorReason 3:`, errorReason);

    }
    if (errorReason) {
        errorMessage += ': ' + errorReason;
    }
    return errorMessage;

    // let errorMessage = error;
    // if (typeof error !== 'string') {
    //     if (typeof error['errorMsg'] !== 'undefined') {
    //         errorMessage = error['errorMsg'];
    //     } else {
    //         errorMessage = error['message'];
    //     }
    //     if (typeof error['reason'] !== 'undefined') {
    //         errorMessage += ': ' + 
    //             (
    //                 typeof error['reason']['message'] !== "undefined" ?
    //                     error['reason']['message'] : error['reason']
    //             )
    //     }
    // }
    // return errorMessage;
}

export const isSessionExpired = (errorMessage) => {
    if (debug) {
        console_debug_log('isSessionExpired | errorMessage:', errorMessage, 'MSG_ERROR_INVALID_TOKEN:', MSG_ERROR_INVALID_TOKEN);
    }
    return MSG_ERROR_INVALID_TOKEN.some(token => errorMessage.includes(token))
}

export const includesAppValidLinks = (message) => {
    return Object.values(APP_EMAILS).some(email => message.includes(email)) ||
           Object.values(APP_VALID_URLS).some(url => message.includes(url))

}

export function errorAndReEnter(
    error,
    errorCode = null,
    forceLogin = null,
    refreshHandler = null,
    parentLogoutHandler = null,
    logoutButton = false,
    closeButton = true,
) {
    if (debug) {
        console_debug_log(`errorAndReEnter | errorCode: ${errorCode} | forceLogin: ${forceLogin} | error:`, error);
    }
    const errorMessage = getErrorMessage(error) + (errorCode ? ` ${errorCode}`: '');
    if (forceLogin === null) {
        forceLogin = false;
    }
    if (typeof error !== 'string' || forceLogin === null) {
        forceLogin = true;
    }
    if (refreshHandler === null) {
        refreshHandler = refreshPage;
    }
    if (parentLogoutHandler === null) {
        parentLogoutHandler = logoutHander;
        logoutButton = true
    }
    const retryMessage = 
        isSessionExpired(errorMessage)
        ? MSG_ERROR_SESSION_EXPIRED
        : errorMessage
    ;
    const msgContainsHtml = includesAppValidLinks(retryMessage);
    const retryButton = MSG_ERROR_CLICK_TO_RETRY;
    const loginButton = (
        forceLogin || isSessionExpired(errorMessage)
        ? MSG_ERROR_CLICK_TO_RELOGIN
        : null
    );
    if (isSessionExpired(errorMessage)) {
        // If session is expired, clear current user in local storage
        setLastUrl();
        authenticationService.logout();
    }
    return (
        <ModalPopUp
            closeButtonMessage={closeButton ? "Close" : null}
            secondButtonMessage={retryButton}
            secondButtonAction={refreshHandler}
            primaryButtonMessage={loginButton}
            primaryButtonAction={parentLogoutHandler}
            logoutButton={logoutButton}
            htmlContent={msgContainsHtml ? retryMessage : null}
            htmlContentClass={'alert alert-danger'}
        >
            {msgContainsHtml ? null : errorMessageDiv(retryMessage)}
        </ModalPopUp>
    );
}

export function errorAndReEnterNonModal(
    error,
    forceLogin=false,
    refreshHandler=null,
    logoutHandler=null
) {
    let errorMessage = getErrorMessage(error);
    if (typeof error !== 'string') {
        forceLogin = true;
    }
    return (
        <div>
            { errorAndRetry(errorMessage, refreshHandler) }
            { errorLoginAgain(errorMessage, forceLogin, logoutHandler) }
        </div>
    );
}

export function errorLoginAgain(
    errorMessage,
    forceLogin=false,
    parentLogoutHandler=null,
) {
    if (parentLogoutHandler === null) {
        parentLogoutHandler = logoutHander;
    }
    if (debug) {
        console_debug_log('errorLoginAgain | errorMessage:', errorMessage);
    }
    if(forceLogin || MSG_ERROR_INVALID_TOKEN.includes(errorMessage)) {
        setLastUrl();
        return (
            <div>
                <br/>
                <Button
                    as={RouterLink}
                    to={getPrefix()+'/login'}
                    onClick={parentLogoutHandler}>{MSG_ERROR_CLICK_TO_RELOGIN}
                </Button>
            </div>
        );
    }
    return (<div></div>);
}

export function errorAndRetry(errorMessage, refreshHandler=null) {
    if (refreshHandler === null) {
        refreshHandler = refreshPage;
    }
    return (
        <div>
            {errorMessageDiv(
                (
                    MSG_ERROR_INVALID_TOKEN.includes(errorMessage)
                    ? MSG_ERROR_SESSION_EXPIRED
                    : errorMessage
                )
            )}
            <br/>
            <Button onClick={refreshHandler}>{MSG_ERROR_CLICK_TO_RETRY}</Button>
        </div>
    );
}

export function errorMessageDiv(errorMessage) {
    return (
        <div style={{ textAlign: 'center' }} className={'alert alert-danger'}>{errorMessage}</div>
    );
}

export const formatCaughtError = (error) => {
    let response = { "error": true, "message": getErrorMessage(error) };
    return response;
}
