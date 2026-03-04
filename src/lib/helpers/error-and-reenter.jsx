import React from 'react';
import { Button } from './ModalLib.jsx';

import { ALERT_DANGER_CLASS } from '../constants/class_name_constants.jsx';
import {
    MSG_ERROR_CLICK_TO_RELOGIN,
    MSG_ERROR_CLICK_TO_RETRY,
    MSG_ERROR_INVALID_TOKEN,
    MSG_ERROR_SESSION_EXPIRED,
} from '../constants/general_constants.jsx';
import {
    authenticationService,
} from '../services/authentication.service.jsx';
import {
    console_debug_log
} from '../services/logging.service.jsx';
import { getPrefix, getUrlForRouter, setLastUrl } from './history.jsx';
import { ModalPopUp } from './ModalPopUp.jsx';
import { getWindowLocationOrigin, setWindowLocationHref, windowLocationReload } from './navigation.jsx';
import { isDict } from '../services/general.utilities.jsx';

const debug = false;

const hardLogin = false;

export function logoutHander() {
    const loginUrl = `${getWindowLocationOrigin()}${getUrlForRouter('/login')}`;
    authenticationService.logout();
    if (hardLogin) {
        if (debug) console_debug_log(`logoutHander | window.location.href = ${loginUrl}`);
        setWindowLocationHref(loginUrl);
    } else {
        windowLocationReload(true);
    }
};

export function refreshPage() {
    windowLocationReload();;
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
        if (typeof error['reason'] !== 'undefined' && error['reason']) {
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
    closeHandler = null,
) {
    if (debug) {
        console_debug_log(`errorAndReEnter | errorCode: ${errorCode} | forceLogin: ${forceLogin} | error:`, error);
    }
    const errorMessage = getErrorMessage(error) + (errorCode ? ` ${errorCode}` : '');
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
            htmlContent={retryMessage}
            iconClassName={ALERT_DANGER_CLASS}
            closeButtonAction={closeHandler}
        />
    );
}

export function errorAndReEnterNonModal(
    error,
    forceLogin = false,
    refreshHandler = null,
    logoutHandler = null
) {
    let errorMessage = getErrorMessage(error);
    if (typeof error !== 'string') {
        forceLogin = true;
    }
    return (
        <div>
            {errorAndRetry(errorMessage, refreshHandler)}
            {errorLoginAgain(errorMessage, forceLogin, logoutHandler)}
        </div>
    );
}

export function errorLoginAgain(
    errorMessage,
    forceLogin = false,
    parentLogoutHandler = null,
) {
    if (parentLogoutHandler === null) {
        parentLogoutHandler = logoutHander;
    }
    if (debug) {
        console_debug_log('errorLoginAgain | errorMessage:', errorMessage);
    }
    if (forceLogin || MSG_ERROR_INVALID_TOKEN.includes(errorMessage)) {
        setLastUrl();
        return (
            <div>
                <br />
                <Button
                    to={getPrefix() + '/login'}
                    onClick={parentLogoutHandler}>{MSG_ERROR_CLICK_TO_RELOGIN}
                </Button>
            </div>
        );
    }
    return (<div></div>);
}

export function errorAndRetry(errorMessage, refreshHandler = null) {
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
            <br />
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

export const getErrorDetail = (errorRaw) => {
    let errorDetails = null;
    if (typeof errorRaw["reason"] !== "undefined" &&
        typeof errorRaw["reason"]["response"] !== "undefined" &&
        typeof errorRaw["reason"]["response"]["data"] !== "undefined"
    ) {
        errorDetails = errorRaw["reason"]["response"]["data"];
    }
    return errorDetails;
}

export const getErrorMsgFromApi = (errorObject, errorCode) => {
    let error = errorObject;
    if (errorObject.errorMsg) {
        // "errorMsg" can be a string or an array... for example:
        // {
        //     error: true,
        //     message: 'Request failed with status code 400',
        //     reason: 'error: User History xyz already exist [AFTTU3].'
        // }
        if (isDict(errorObject.errorMsg)) {
            // Check if it has "reason" field...
            if (errorObject.errorMsg.reason) {
                error = errorObject.errorMsg.reason;
                // Check if it has "message" field...
            } else if (errorObject.errorMsg.message) {
                error = errorObject.errorMsg.message;
                // Otherwise... Join the array into a string...
            } else {
                error = Object.values(
                    errorObject.errorMsg
                ).filter(
                    item => item !== true
                ).map(
                    item => item
                ).join('\n\n');
            }
        } else {
            // If it is not an array, so consider it as a string...
            error = errorObject.errorMsg;
        }
    }

    if (errorObject.reason) {
        error = errorObject.reason;
    } else if (errorObject.message) {
        error = errorObject.message;
    }

    if (debug) console_debug_log('>> getErrorMsgFromApi | error:', error);

    if (!errorCode) {
        return error;
    }
    return error +
        '\n\n' +
        (errorCode.startsWith('[') ? '' : '[') +
        errorCode +
        (errorCode.endsWith(']') ? '' : ']');
}
