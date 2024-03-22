import React, { useState, useEffect } from 'react';

import { authenticationService } from '../../services/authentication.service.jsx';
import { console_debug_log } from '../../services/logging.service.jsx';

import { HomePage } from "./HomePage.jsx";

const debug = false;

export const HomePageGsFe = () => {
    if (debug) console_debug_log('>>>> genericsuite-fe HomePage <<<<');
    const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);
    useEffect(() => {
        const subscription = authenticationService.currentUser.subscribe(
            x => setCurrentUser(x)
        );
        return () => subscription.unsubscribe();
    }, []);
    return (
        <HomePage>
            <>
                {!currentUser &&
                    (<p><a href="/#/login">Please Sign-in</a></p>)
                }
                {currentUser &&
                    (<p>Hi {currentUser.firstName}! Welcome to the GenericSuite (BASE frontend version)</p>)
                }
            </>
        </HomePage>
    );
}
