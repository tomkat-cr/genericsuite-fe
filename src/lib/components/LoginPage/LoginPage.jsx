import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { useUser } from '../../helpers/UserContext.jsx';

import {
    authenticationService,
    getCurrentUserData,
    getUserLocalData
} from '../../services/authentication.service.jsx';
import { getUrlParams } from '../../helpers/url-params.jsx';
import { getLastUrl, removeLastUrl } from '../../helpers/history.jsx';
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
    const [redirectUrl, setRedirectUrl] = useState(null);
    const [performLogin, setPerformLogin] = useState(false);
    const { currentUser, registerUser, unRegisterUser } = useUser();

    let appLogo = props.appLogo;

    useEffect(() => {
        if (currentUser && performLogin) {
            unRegisterUser();
        }
    }, [currentUser]);

    useEffect(() => {
        const urlParams = getUrlParams(props)
        let redirect;
        if (typeof urlParams.redirect === 'undefined') {
            redirect = getLastUrl();
        } else {
            redirect = urlParams.redirect;
        }
        // Redirect to home OR redirect URL if already logged in
        if (debug) console_debug_log("LoginPage | authenticationService:", authenticationService);
        if (authenticationService && typeof authenticationService.currentUserValue !== 'undefined' && authenticationService.currentUserValue) {
            removeLastUrl();
            // window.location.href = redirectUrl;
            getCurrentUserData()
                .then( 
                    userData => {
                        if (debug) console_debug_log("LoginPage | call to setCurrentUser with 'user' data # 1:", userData);
                        if (userData.error) {
                            if (debug) console.error('userData.error_message:', userData.error_message);
                            setPerformLogin(true);
                        } else {
                            registerUser(getUserLocalData(userData));
                            return <Navigate to={redirectUrl}/>
                        }
                    },
                    error => {
                        console.error(error.errorMsg);
                        setPerformLogin(true);
                    }
                );
        } else {
            setRedirectUrl(redirect);
            setPerformLogin(true);
        }
        // Avoid need to add redirectUrl to dependency array
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props]);

    const handleSubmit = (username, password, setStatus, setSubmitting) => {
        setStatus();
        authenticationService.login(username, password)
            .then(
                user => {
                    // To avoid stay in login page with the wait animation
                    setSubmitting(false);
                    // Set user data to <App/>
                    if (debug) console_debug_log("LoginPage | call to setCurrentUser with 'user' data # 2:", user);
                    registerUser(user);
                    // Redirect to previous page
                    removeLastUrl();
                    return <Navigate to={redirectUrl}/>
                        // window.location.href = redirectUrl;
                        // // To handle menu access rights changes
                        // window.location.reload(true);
                },
                error => {
                    setSubmitting(false);
                    setStatus(getErrorMessage(error));
                }
            );
    };

    if (!performLogin) {
        return WaitAnimation();
    }

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
                            {/* <MadeByLogoSquare alt="Madeby Logo" width="20" height="20" className={LOGIN_PAGE_APP_LOGO_CLASS} /> */}
                            {/* <MadeByLogoCircle alt="Madeby Logo" width="20" height="20" className={LOGIN_PAGE_APP_LOGO_CLASS} /> */}
                            <div
                                className={FORM_GROUP_CLASS}
                            >
                                <label htmlFor="username">Username</label>
                                <Field
                                    name="username"
                                    type="text"
                                    className={FORM_CONTROL_CLASS + (
                                        errors.username && touched.username ? ' ' + {IS_INVALID_CLASS} : ''
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
                                <label htmlFor="password">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className={FORM_CONTROL_CLASS + (
                                        errors.password && touched.password ? ' ' + {IS_INVALID_CLASS} : ''
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
                            {status && ! includesAppValidLinks(status) && 
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
