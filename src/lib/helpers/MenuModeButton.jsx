import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import { getLocalConfig, saveLocalConfig } from './local-config.jsx';
import { useUser } from './UserContext.jsx';
import { useAppContext } from './AppContext.jsx';
import { GsIcons } from './IconsLib.jsx';
import {
    MENU_MODE_BUTTON_TOP_DIV_CLASS,
} from '../constants/class_name_constants.jsx';
import { console_debug_log } from '../services/logging.service.jsx';

const debug = true;

export const MenuModeButton = () => {
    const { currentUser } = useUser();
    const { sideMenu, setSideMenu } = useAppContext();

    const saveNewLocalUserConfig = (newSideMenuMode) => {
        const localConfig = {
            pref_side_menu: (newSideMenuMode ? '1' : '0'),
        }
        if (debug) console_debug_log('MenuModeButton', 'saveLocalConfig', localConfig);
        saveLocalConfig(localConfig);
    }

    const toggleSideMenu = () => {
        if (debug) console_debug_log('MenuModeButton | toggleSideMenu | !sideMenu: ', !sideMenu);
        saveNewLocalUserConfig(!sideMenu);
        setSideMenu(!sideMenu);
    };

    if (debug) console_debug_log('MenuModeButton | NEW CICLE');

    useEffect(() => {
        let newSideMenuMode = false;
        // Component startup
        // if (currentUser) {
        //     // Initial menu configuration from current user config, if the user is authenticated
        //     newSideMenuMode = (currentUser.pref_side_menu === '1');
        //     if (debug) console_debug_log('MenuModeButton', 'Initial menu configuration from current user config | currentUser.pref_side_menu', currentUser.pref_side_menu, 'newSideMenuMode:', newSideMenuMode);
        // } else {
            // Get previous preferences from localstorage
            const localConfig = getLocalConfig();
            newSideMenuMode = (localConfig.pref_side_menu === '1');
        // }
        if (newSideMenuMode !== sideMenu) {
            saveNewLocalUserConfig(newSideMenuMode);
            setSideMenu(newSideMenuMode);
        }
    }, [currentUser, sideMenu]);

    // useEffect(() => {
    //     // Internal menu configuration when current user changes
    //     if (currentUser) {
    //         setSideMenu(currentUser.pref_side_menu === '1');
    //     }
    // }, [currentUser]);

    // useEffect(() => {
    //     // Internal menu configuration when current user changes
    //     if (currentUser) {
    //         setSideMenu(currentUser.pref_side_menu === '1');
    //     }
    // }, [currentUser]);

    // useEffect(() => {
    //     // Save user preferences to localstorage when current user changes
    //     if (currentUser) {
    //         const localConfig = {
    //             pref_side_menu: (currentUser.pref_side_menu),
    //         }
    //         saveLocalConfig(localConfig);
    //     }
    // }, [currentUser]);
    
    // useEffect(() => {
    //     // External menu configuration when current user changes
    //     if (currentUser) {
    //         setSideMenu(currentUser.pref_side_menu === '1');
    //     }
    // }, [currentUser]);

    // useEffect(() => {
    //     // External menu configuration when side menu mode changes
    //     if (debug) console_debug_log('>> MenuModeButton', 'Side menu mode', sideMenu);
    //     setSideMenu(sideMenu);
    // }, [sideMenu]);
    
    // useEffect(() => {
    //     // Save session side menu preference to localstorage when it changes
    //     const localConfig = {
    //         pref_side_menu: (sideMenu ? '1' : '0'),
    //     }
    //     if (debug) console_debug_log('MenuModeButton', 'saveLocalConfig', localConfig);
    //     saveLocalConfig(localConfig);
    // }, [sideMenu]);

    return (
        <div
            id="menu-mode-button"
            className={MENU_MODE_BUTTON_TOP_DIV_CLASS}
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
                    className={!sideMenu ? "hidden" : "inline"}
                >
                    { /* Side menu button */ }
                    <GsIcons icon='side-menu'/>
                </span>
                <span
                    className={sideMenu ? "hidden" : "inline"}
                >
                    { /* Top menu button */ }
                    <GsIcons icon='top-menu'/>
                </span>
            </button>
        </div>
    );
}