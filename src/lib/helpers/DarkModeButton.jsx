import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import { getLocalConfig, saveLocalConfig } from './local-config.jsx';
import { useUser } from './UserContext.jsx';
import { useAppContext } from './AppContext.jsx';
import {
    DARK_MODE_BUTTON_DARK_HIDDEN_CLASS,
    DARK_MODE_BUTTON_DARK_INLINE_CLASS,
    DARK_MODE_BUTTON_SVG_CLASS,
    DARK_MODE_BUTTON_TOP_DIV_CLASS,
} from '../constants/class_name_constants.jsx';
import { GsIcons } from './IconsLib.jsx';

const debug = false;

export const DarkModeButton = () => {
    const { currentUser } = useUser();
    const { isDarkMode, setIsDarkMode, toggleDarkMode } = useAppContext();

    useEffect(() => {
        // Component startup
        let newDarkMode = false;
        if (currentUser) {
            if (debug) console.log('Loading config from user\'s preferences:', currentUser);
            // Initial menu configuration from current user config, if the user is authenticated
            newDarkMode = (currentUser.pref_dark_mode === '1');
        } else {
            // Get previous preferences from localstorage
            const localConfig = getLocalConfig();
            if (debug) console.log('Loading local config', localConfig);
            newDarkMode = (localConfig.pref_dark_mode === '1');
        }
        if (newDarkMode !== isDarkMode) {
            setIsDarkMode(newDarkMode);
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            setIsDarkMode(currentUser.pref_dark_mode === '1');
        }
    }, [currentUser]);
    
    useEffect(() => {
        // Save session side menu preference to localstorage when it changes
        const localConfig = {
            pref_dark_mode: (isDarkMode ? '1' : '0'),
        }
        if (debug) console.log('Saving local config', localConfig);
        saveLocalConfig(localConfig);
        // Fix the overall dark mode design
        const element = document.getElementsByTagName('html')[0];
        if (!isDarkMode) {
            element.classList.remove('dark');
        } else {
            element.classList.add('dark');
        }

    }, [isDarkMode]);

    return (
        <div
            id="dark-mode-button"
            className={DARK_MODE_BUTTON_TOP_DIV_CLASS}
        >
            <button
                type="button"
                id="headlessui-listbox-button-:R2lkcr6:"
                aria-haspopup="listbox"
                aria-expanded="false"
                data-headlessui-state=""
                aria-labelledby="headlessui-label-:R1lkcr6: headlessui-listbox-button-:R2lkcr6:"
                onClick={toggleDarkMode}
            >
                <span
                    className={DARK_MODE_BUTTON_DARK_HIDDEN_CLASS}
                >
                    { /* Light button */ }
                    <GsIcons
                        icon="sun"
                        className={DARK_MODE_BUTTON_SVG_CLASS}
                    />
                </span>
                <span
                    className={DARK_MODE_BUTTON_DARK_INLINE_CLASS}
                >
                    { /* Dark button */ }
                    <GsIcons
                        icon="moon"
                        className={DARK_MODE_BUTTON_SVG_CLASS}
                    />
                </span>
            </button>
        </div>
    );
}