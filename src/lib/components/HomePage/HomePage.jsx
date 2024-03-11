import React, { useState, useEffect } from 'react';

import { authenticationService } from '../../services/authentication.service.jsx';
import { LoginPage } from '../LoginPage/LoginPage.jsx';

export const HomePage = ({children, appLogo = null}) => {
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);

    useEffect(() => {
        const subscription = authenticationService.currentUser.subscribe(
            x => setCurrentUser(x)
        );
        return () => subscription.unsubscribe();
    }, []);

    return (
        <div>
            {!currentUser &&
                <LoginPage appLogo={appLogo}/>
            }
            {currentUser && children && 
                {children}
            }
        </div>
    );
}
