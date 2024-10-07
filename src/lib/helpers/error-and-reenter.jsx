import React from 'react';
import { Button } from './ModalLib.jsx';
import { Link as RouterLink } from 'react-router-dom';

import { 
    MSG_ERROR_INVALID_TOKEN,
    MSG_ERROR_CLICK_TO_RELOGIN,
    MSG_ERROR_CLICK_TO_RETRY,
    MSG_ERROR_SESSION_EXPIRED,
} from '../constants/general_constants.jsx';
import { APP_EMAILS, APP_VALID_URLS } from '../constants/app_constants.jsx';
import { ALERT_DANGER_CLASS } from '../constants/class_name_constants.jsx';
import {
    authenticationService,
} from '../services/authentication.service.jsx';
import {
    console_debug_log,
    get_debug_flag,
} from '../services/logging.service.jsx';
import { history, getPrefix, setLastUrl } from './history.jsx';
import { ModalPopUp } from './ModalPopUp.jsx'

const debug = false;

const hardLogin = true;

export function logoutHander() {
    const loginUrl = window.location.origin+getPrefix()+'/login';
    authenticationService.logout();
    if (hardLogin) {
        if (debug) console_debug_log(`logoutHander | window.location.href = ${loginUrl}`);
        window.location.href = loginUrl;
    } else {
        window.location.reload(true);
    }
};

export function refreshPage() {
    window.location.reload();;
};

export const getErrorMessage = (error) => {
    let errorMessage = error;
    if (typeof error !== 'string') {
        if (typeof error['errorMsg'] !== 'undefined') {
            if (typeof error['errorMsg'] == 'string') {
                errorMessage = error['errorMsg'];
            } else {
                error = error['errorMsg'];
                errorMessage = error['message'];
            }
        } else {
            errorMessage = error['message'];
        }
        if (typeof error['reason'] !== 'undefined') {
            errorMessage += ': ' + 
                (
                    typeof error['reason']['message'] !== "undefined" ?
                        error['reason']['message'] : 
                        typeof error['reason'] === 'string' ?
                            error['reason'] : JSON.stringify(error['reason'])
                )
        }
    }
    // if (debug || get_debug_flag()) {
    //     errorMessage = `${errorMessage}\nDebug:\n${JSON.stringify(error)}`;
    // }
    return errorMessage;
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
            // htmlContentClass={ALERT_DANGER_CLASS}
            iconClassName={ALERT_DANGER_CLASS}
        >
            {/* {msgContainsHtml ? null : errorMessageDiv(retryMessage)} */}
            {msgContainsHtml ? null : retryMessage}
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
                    // as={RouterLink}
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
            <Button
                onClick={refreshHandler}
            >
                {MSG_ERROR_CLICK_TO_RETRY}
            </Button>
        </div>
    );
}

export function errorMessageDiv(errorMessage) {
    return (
        <div style={{ textAlign: 'center' }} className={ALERT_DANGER_CLASS}>{errorMessage}</div>
    );
}

export const formatCaughtError = (error) => {
    let response = { "error": true, "message": getErrorMessage(error) };
    return response;
}
