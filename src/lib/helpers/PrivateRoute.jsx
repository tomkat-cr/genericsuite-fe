import React from 'react';
import { Route, Navigate } from 'react-router-dom';

import { authenticationService } from '../services/authentication.service.jsx';
import { console_debug_log } from '../services/logging.service.jsx';
import { getPrefix } from './history.jsx';

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => {
        const currentUser = authenticationService.currentUserValue;
        if (!currentUser) {
            console_debug_log('PrivateRoute Not Authorized...')
            // not logged in so redirect to login page with the return url
            return <Navigate to={{ pathname: getPrefix(true)+'/login', state: { from: props.location } }} />
        }
        // Authorized USER, so return component
        return <Component {...props} />
    }} />
)