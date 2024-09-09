import React, { createContext, useState, useContext, useEffect } from 'react';

const debug = false

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    const registerUser = (userData) => {
        if (debug) console.log('RegisterUser | userData:', userData);
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