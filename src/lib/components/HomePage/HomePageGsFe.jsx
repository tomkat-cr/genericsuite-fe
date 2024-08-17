import React, { useState, useEffect } from 'react';

import { useUser } from '../../helpers/UserContext.jsx';
import { console_debug_log } from '../../services/logging.service.jsx';

import { HomePage } from "./HomePage.jsx";

const debug = false;

export const HomePageGsFe = () => {
    if (debug) console_debug_log('>>>> genericsuite-fe HomePage <<<<');
    const { currentUser } = useUser();
    return (
        <HomePage>
            <>
                {currentUser &&
                    (<p>Hi {currentUser.firstName}! Welcome to the GenericSuite (BASE frontend version)</p>)
                }
            </>
        </HomePage>
    );
}
