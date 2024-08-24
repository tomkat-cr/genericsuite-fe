import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { getLocalConfig, saveLocalConfig } from './local-config.jsx';
import { useUser } from './UserContext.jsx';

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
                    <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6"
                    >
                        <rect
                            id="Square-2"
                            // dataName="Square"
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                            fill="none"
                            // stroke="#000000"
                            className="stroke-black dark:stroke-white"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        />
                        <line
                            x1="9"
                            y1="21"
                            x2="9"
                            y2="3"
                            fill="none"
                            // stroke="#000000"
                            className="stroke-black dark:stroke-white"
                            strokeMiterlimit="10"
                            strokeWidth="2"
                        />
                    </svg>
                </span>
                <span
                    className={sideMenuMode ? "hidden" : "inline"}
                >
                    { /* Top menu button */ }
                    <svg
                        // width="800px" height="800px"
                        // xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        className="w-6 h-6"
                    >
                        <rect
                            width="18"
                            height="18"
                            rx="3"
                            transform="matrix(1.39071e-07 1 1 -1.39071e-07 3 3)"
                            // stroke="#333333"
                            className="stroke-black dark:stroke-white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <line
                            x1="1"
                            y1="-1"
                            x2="17"
                            y2="-1"
                            transform="matrix(1 -1.82782e-07 -1.82782e-07 -1 3 8)"
                            // stroke="#333333"
                            className="stroke-black dark:stroke-white"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                </span>
            </button>
        </div>
    );
}