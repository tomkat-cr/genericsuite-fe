import React, { useState, useEffect } from 'react';

import { authenticationService } from '../../_services/authentication.service';
import { LoginPage } from '../LoginPage/LoginPage';

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
            {currentUser &&
                {children}
            }
        </div>
    );
}
