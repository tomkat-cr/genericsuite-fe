import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { useUser } from './UserContext.jsx';

export const MenuModeButton = ({ sideMenu, setSideMenu }) => {
    const [sideMenuMode, setSideMenuMode] = useState(sideMenu);
    const { currentUser } = useUser();

    const toggleSideMenu = () => {
        const element = document.getElementsByTagName('html')[0];
        setSideMenuMode(!sideMenuMode);
    };

    useEffect(() => {
        if (currentUser) {
            setSideMenuMode(currentUser.pref_side_menu);
        }
    }, []);

    useEffect(() => {
        if (currentUser) {
            setSideMenuMode(currentUser.pref_side_menu);
        }
    }, [currentUser]);

    useEffect(() => {
        // External menu configuration
        setSideMenu(sideMenuMode);
    }, [sideMenuMode]);

    useEffect(() => {
        if (currentUser) {
            setSideMenu(currentUser.pref_side_menu);
        }
    }, [currentUser]);

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
                    className={sideMenuMode ? "hidden" : "inline"}
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
                    className={!sideMenuMode ? "hidden" : "inline"}
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