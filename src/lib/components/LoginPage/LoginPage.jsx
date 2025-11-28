import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useUser } from '../../helpers/UserContext.jsx';
import { useAppContext } from '../../helpers/AppContext.jsx';

import {
    authenticationService,
} from '../../services/authentication.service.jsx';
import { getUrlParams } from '../../helpers/url-params.jsx';
import { getLastUrl, getPrefix, removeLastUrl } from '../../helpers/history.jsx';
import { getErrorMessage, includesAppValidLinks } from '../../helpers/error-and-reenter.jsx';
import { WaitAnimation } from '../../services/wait.animation.utility.jsx';
import { imageDirectory } from '../../constants/general_constants.jsx';
import {
    ERROR_MSG_CLASS,
    FORM_GROUP_CLASS,
    FORM_CONTROL_CLASS,
    INVALID_FEEDBACK_CLASS,
    BUTTON_PRIMARY_CLASS,
    IS_INVALID_CLASS,
    POPUP_TOP_MARGIN_CLASS,
    LOGIN_PAGE_APP_LOGO_CLASS,
} from '../../constants/class_name_constants.jsx';
import { CenteredBoxContainer } from '../../helpers/NavLib.jsx';
import { console_debug_log } from '../../services/logging.service.jsx';

// This way to import the .svg files doesn't work on prod environents...
// import DefaultAppLogo from '../../images/app_logo_square.svg';
// import MadeByLogoSquare from '../../images/madeby_logo_square.svg';
// import MadeByLogoCircle from '../../images/madeby_logo_emblem.svg';

const debug = false;

const defaultAppLogo = "app_logo_square.svg";

export const LoginPage = (props) => {

    const sanitizeRedirectUrl = (inputUrl) => {
        if (!inputUrl) {
            return '/';
        }
        let candidate = String(inputUrl).trim();
        try {
            candidate = decodeURIComponent(candidate);
        } catch (_) {
            // ignore decode errors, use raw candidate
        }
        try {
            const parsed = new URL(candidate, window.location.origin);
            // Only allow same-origin destinations
            if (parsed.origin !== window.location.origin) {
                return '/';
            }
            // Build a safe relative URL explicitly to preserve query and hash
            const relative = `${parsed.pathname || '/'}${parsed.search || ''}${parsed.hash || ''}`;
            // Disallow protocol-relative patterns like '//' at start of path
            if (relative.startsWith('//')) {
                return '/';
            }
            return relative || '/';
        } catch (_) {
            return '/';
        }
    }

    const getRedirect = () => {
        const urlParams = getUrlParams(props)
        if (typeof urlParams.redirect === 'undefined') {
            return sanitizeRedirectUrl(getLastUrl());
        }
        return sanitizeRedirectUrl(urlParams.redirect);
    }

    const { currentUser, registerUser, unRegisterUser } = useUser();
    const { appLogo, theme } = useAppContext();

    const handleSubmit = (username, password, setStatus, setSubmitting) => {
        setStatus();
        authenticationService.login(username, password)
            .then(
                user => {
                    let redirectUrl = getRedirect();
                    // To avoid stay in login page with the wait animation
                    setSubmitting(false);

                    // Set user data to <App/>
                    if (debug) console_debug_log("LoginPage | call to registerUser with 'user' data:", user);
                    registerUser(user);

                    // Redirect to previous page
                    removeLastUrl();
                    if (redirectUrl.includes('/login')) {
                        redirectUrl = '/';
                    }

                    // return <Navigate to={redirectUrl} replace={true}/>
                    window.location.href = sanitizeRedirectUrl(redirectUrl);

                    // To handle menu access rights changes
                    // window.location.reload(true);
                },
                error => {
                    setSubmitting(false);
                    setStatus(getErrorMessage(error));
                }
            );
    };

    return (
        <>
            <Formik
                initialValues={{
                    username: '',
                    password: ''
                }}
                validationSchema={Yup.object().shape({
                    username: Yup.string().required('Username is required'),
                    password: Yup.string().required('Password is required')
                })}
                onSubmit={({ username, password }, { setStatus, setSubmitting }) => {
                    handleSubmit(username, password, setStatus, setSubmitting);
                }}
            >{({ errors, status, touched, isSubmitting }) => (
                <div
                    className={POPUP_TOP_MARGIN_CLASS}
                >
                    <CenteredBoxContainer>
                        <Form>
                            <img src={imageDirectory + (appLogo || defaultAppLogo)}
                                width="150"
                                height="150"
                                className={LOGIN_PAGE_APP_LOGO_CLASS}
                                alt="App Logo"
                            />
                            <div
                                className={FORM_GROUP_CLASS}
                            >
                                <label
                                    htmlFor="username"
                                    className={theme.label}
                                >
                                    Username
                                </label>
                                <Field
                                    name="username"
                                    type="text"
                                    className={FORM_CONTROL_CLASS + ' ' + (
                                        errors.username && touched.username ? IS_INVALID_CLASS : theme.input
                                    )}
                                />
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className={INVALID_FEEDBACK_CLASS}
                                />
                            </div>
                            <div
                                className={FORM_GROUP_CLASS}
                            >
                                <label
                                    htmlFor="password"
                                    className={theme.label}
                                >
                                    Password
                                </label>
                                <Field
                                    name="password"
                                    type="password"
                                    className={FORM_CONTROL_CLASS + ' ' + (
                                        errors.password && touched.password ? IS_INVALID_CLASS : theme.input
                                    )}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className={INVALID_FEEDBACK_CLASS}
                                />
                            </div>
                            <div
                                className={FORM_GROUP_CLASS}
                            >
                                <button
                                    type="submit"
                                    className={BUTTON_PRIMARY_CLASS}
                                    disabled={isSubmitting}
                                >
                                    Login
                                </button>
                                {isSubmitting &&
                                    WaitAnimation()
                                }
                            </div>
                            {status && !includesAppValidLinks(status) &&
                                <div
                                    className={ERROR_MSG_CLASS}
                                >
                                    {status}
                                </div>
                            }
                            {status && includesAppValidLinks(status) &&
                                <div
                                    className={ERROR_MSG_CLASS}
                                // dangerouslySetInnerHTML={{ __html: status }}
                                >
                                    {status}
                                </div>
                            }
                        </Form>
                    </CenteredBoxContainer>
                </div>
            )}
            </Formik>
        </>
    );
}
