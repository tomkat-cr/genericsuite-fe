import React, { useState, useEffect } from 'react';

import { authenticationService } from '../../services/authentication.service.jsx';
import { LoginPage } from '../LoginPage/LoginPage.jsx';

export const HomePage = ({children}) => {
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
                <LoginPage/>
            }
            {currentUser && children && 
                {children}
            }
        </div>
    );
}
