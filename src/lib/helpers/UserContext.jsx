import React, { createContext, useState, useContext, useEffect } from 'react';
import { console_debug_log } from '../services/logging.service.jsx';

const debug = false

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const registerUser = (userData) => {
        if (debug) console_debug_log('RegisterUser | userData:', userData);
        setCurrentUser(userData);
    };

    const unRegisterUser = () => {
        setCurrentUser(null);
    };

    return (
        <UserContext.Provider value={{ currentUser, registerUser, unRegisterUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};