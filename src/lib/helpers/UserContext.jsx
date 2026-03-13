import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { console_debug_log } from '../services/logging.service.jsx';

const debug = false

const UserContext = createContext();

const initialState = {
    currentUser: null,
    askForLogin: false,
};

const userReducer = (state, action) => {
    switch (action.type) {
        case 'REGISTER_USER':
            return {
                ...state,
                currentUser: action.payload,
            };
        case 'UNREGISTER_USER':
            return {
                ...state,
                currentUser: null,
            };
        case 'SET_ASK_FOR_LOGIN':
            return {
                ...state,
                askForLogin: action.payload,
            };
        default:
            return state;
    }
};

export const UserProvider = ({ children }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const setAskForLogin = (newAskForLogin) => {
        dispatch({ type: 'SET_ASK_FOR_LOGIN', payload: newAskForLogin });
    };

    const registerUser = (userData) => {
        if (debug) console_debug_log('RegisterUser | userData:', userData);
        dispatch({ type: 'REGISTER_USER', payload: userData });
        if (userData) {
            setAskForLogin(false);
        }
    };

    const unRegisterUser = () => {
        if (debug) console_debug_log('UnRegisterUser');
        dispatch({ type: 'UNREGISTER_USER' });
        setAskForLogin(true);
    };

    const currentUserValue = useMemo(() => ({
        currentUser: state.currentUser,
        registerUser,
        unRegisterUser,
        askForLogin: state.askForLogin,
        setAskForLogin
    }), [
        state.currentUser,
        registerUser,
        unRegisterUser,
        state.askForLogin,
        setAskForLogin
    ]);

    return (
        <UserContext.Provider value={currentUserValue}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    return useContext(UserContext);
};