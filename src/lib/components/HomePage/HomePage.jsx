import React, { useState, useEffect } from 'react';

import { authenticationService } from '../../services/authentication.service.jsx';
import { LoginPage } from '../LoginPage/LoginPage.jsx';

export const HomePage = ({children, appLogo}) => {
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);

    useEffect(() => {
        const subscription = authenticationService.currentUser.subscribe(
            x => setCurrentUser(x)
        );
        return () => subscription.unsubscribe();
    }, []);

    if (!currentUser) {
        return (
            <LoginPage appLogo={appLogo || null}/>
        );
    }
    return (
        <>
            {children}
        </>
    );
}
