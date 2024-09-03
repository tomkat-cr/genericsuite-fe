import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { getLocalConfig, saveLocalConfig } from './local-config.jsx';
import { useUser } from './UserContext.jsx';
import { GsIcons } from './IconsLib.jsx';


export const MenuModeButton = ({ sideMenu, setSideMenu }) => {
    const [sideMenuMode, setSideMenuMode] = useState(sideMenu);
    const { currentUser } = useUser();

    const toggleSideMenu = () => {
        const element = document.getElementsByTagName('html')[0];
        setSideMenuMode(!sideMenuMode);
    };

    useEffect(() => {
        let newSideMenuMode = false;
        // Component startup
        if (currentUser) {
            // Initial menu configuration from current user config, if the user is authenticated
            newSideMenuMode = (currentUser.pref_side_menu === '1');
        } else {
            // Get previous preferences from localstorage
            const localConfig = getLocalConfig();
            newSideMenuMode = (localConfig.pref_side_menu === '1');
        }
        if (newSideMenuMode !== sideMenuMode) {
            setSideMenuMode(newSideMenuMode);
        }
    }, []);

    useEffect(() => {
        // Internal menu configuration when current user changes
        if (currentUser) {
            setSideMenuMode(currentUser.pref_side_menu === '1');
        }
    }, [currentUser]);

    useEffect(() => {
        // Save user preferences to localstorage when current user changes
        if (currentUser) {
            const localConfig = {
                pref_side_menu: (currentUser.pref_side_menu),
            }
            saveLocalConfig(localConfig);
        }
    }, [currentUser]);
    
    useEffect(() => {
        // External menu configuration when current user changes
        if (currentUser) {
            setSideMenu(currentUser.pref_side_menu === '1');
        }
    }, [currentUser]);

    useEffect(() => {
        // External menu configuration when side menu mode changes
        setSideMenu(sideMenuMode);
    }, [sideMenuMode]);
    
    useEffect(() => {
        // Save session side menu preference to localstorage when it changes
        const localConfig = {
            pref_side_menu: (sideMenuMode ? '1' : '0'),
        }
        saveLocalConfig(localConfig);
    }, [sideMenuMode]);

    return (
        <div
            className="menu-mode-button"
        >
            <button
                type="button"
                id="headlessui-listbox-button-:R2lkcr5:"
                aria-haspopup="listbox"
                aria-expanded="false"
                data-headlessui-state=""
                aria-labelledby="headlessui-label-:R1lkcr5: headlessui-listbox-button-:R2lkcr5:"
                onClick={toggleSideMenu}
            >
                <span
                    className={!sideMenuMode ? "hidden" : "inline"}
                >
                    { /* Side menu button */ }
                    <GsIcons icon='side-menu'/>
                </span>
                <span
                    className={sideMenuMode ? "hidden" : "inline"}
                >
                    { /* Top menu button */ }
                    <GsIcons icon='top-menu'/>
                </span>
            </button>
        </div>
    );
}