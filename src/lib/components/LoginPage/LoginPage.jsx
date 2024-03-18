import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { authenticationService } from '../../services/authentication.service.jsx';
import { getUrlParams } from '../../helpers/url-params.jsx';
import { getLastUrl, removeLastUrl } from '../../helpers/history.jsx';
import { getErrorMessage, includesAppValidLinks } from '../../helpers/error-and-reenter.jsx';
import { WaitAnimation } from '../../services/wait.animation.utility.jsx';
import { imageDirectory } from '../../constants/general_constants.jsx';

// This way to import the .svg files doesn't work on prod environents...
// import DefaultAppLogo from '../../images/app_logo_square.svg';
// import MadeByLogoSquare from '../../images/madeby_logo_square.svg';
// import MadeByLogoCircle from '../../images/madeby_logo_emblem.svg';

const defaultAppLogo = "app_logo_square.svg";

export const LoginPage = (props) => {
    const [redirectUrl, setRedirectUrl] = useState(null);

    useEffect(() => {
        const urlParams = getUrlParams(props)
        let redirect;
        if (typeof urlParams.redirect === 'undefined') {
            redirect = getLastUrl();
        } else {
            redirect = urlParams.redirect;
        }
        if (typeof props.appLogo === 'undefined') {
            props.appLogo = null;
        }
        // Redirect to home OR redirect URL if already logged in
        if (authenticationService.currentUserValue) {
            removeLastUrl();
            window.location.href = redirectUrl;
        } else {
            setRedirectUrl(redirect);
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
                    // Redirect to previous page
                    removeLastUrl();
                    window.location.href = redirectUrl;
                    // To handle menu access rights changes
                    window.location.reload(true);
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
                <div className="flex justify-center items-center min-h-screen mt-1 mb-1">
                    <div className="bg-white rounded border mt-4 mb-1 pt-3 pb-2 pl-4 pr-4" style={{ width: '400px', margin: 'auto' }}>
                        <Form>
                            <img src={imageDirectory + (props.appLogo !== null ? props.appLogo : defaultAppLogo)}
                                width="150"
                                height="150"
                                className="mx-auto my-0"
                                alt="App Logo"
                            />
                            {/* <MadeByLogoSquare alt="Madeby Logo" width="20" height="20" className="mx-auto my-0" /> */}
                            {/* <MadeByLogoCircle alt="Madeby Logo" width="20" height="20" className="mx-auto my-0" /> */}
                            <div className="form-group">
                                <label htmlFor="username">Username</label>
                                <Field
                                    name="username"
                                    type="text"
                                    className={'form-control' + (
                                        errors.username && touched.username ? ' is-invalid' : ''
                                    )}
                                />
                                <ErrorMessage
                                    name="username"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <Field
                                    name="password"
                                    type="password"
                                    className={'form-control' + (
                                        errors.password && touched.password ? ' is-invalid' : ''
                                    )}
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="invalid-feedback"
                                />
                            </div>
                            <div className="form-group">
                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isSubmitting}
                                >
                                    Login
                                </button>
                                {isSubmitting &&
                                    WaitAnimation()
                                }
                            </div>
                            {status && ! includesAppValidLinks(status) && 
                                <div className={'alert alert-danger'}>{status}</div>
                            }
                            {status && includesAppValidLinks(status) &&
                                <div
                                    className={'alert alert-danger'}
                                    dangerouslySetInnerHTML={{ __html: status }}
                                />
                            }
                        </Form>
                    </div>
                </div>
            )}
            </Formik>
        </>
    );
}
