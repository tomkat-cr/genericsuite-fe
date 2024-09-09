import React, { createContext, useState, useContext, useEffect } from 'react';

import { defaultTheme } from '../constants/class_name_constants.jsx';
import { console_debug_log } from '../services/logging.service.jsx';

const debug = false

const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [state, setState] = useState("");
    const [menuOptions, setMenuOptions] = useState(null);
    const [sideMenu, setSideMenu] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [expandedMenus, setExpandedMenus] = useState ([]);

    const theme = isDarkMode ? defaultTheme.dark : defaultTheme.light;

    const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
    const toggleSideMenu = () => setSideMenu(!sideMenu);
    const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
    const toggleSubmenu = (menuName) => {
        setExpandedMenus(prev => (
            prev.includes(menuName)
            ? prev.filter(item => item !== menuName)
            : [...prev, menuName]
        ));
    }

    const isComponent = (componentObj) => {
        return (String(componentObj).includes('component:'));
    }
    
    const setExpanded = (componentObj) => {
        /* Close mobile menu if any option is clicked */
        if (document.getElementById("navbar-main-toggle") &&
            isMobileMenuOpen
        ) {
            document.getElementById("navbar-main-toggle").click();
        }
        if (componentObj) {
            if (debug) console_debug_log(`>> setExpanded [1] | isComponent: ${isComponent(componentObj)} | componentObj:`, componentObj);
            if (isComponent(componentObj)){
                try {
                    return <componentObj/>;
                } catch (error) {
                    console_debug_log('[ASE-E010] componentObj:', componentObj);
                    console_debug_log(error);
                    return null;
                }
            } else {
                try {
                    return componentObj();
                } catch (error) {
                    console_debug_log('[ASE-E020] componentObj:', componentObj);
                    console_debug_log(error);
                    return null;
                }
            }
        }
        if (debug) console_debug_log(">> setExpanded [2]");
        return '';
    }

    return (
        <AppContext.Provider value={{
            state, setState,
            menuOptions, setMenuOptions,
            sideMenu, setSideMenu,
            isDarkMode, setIsDarkMode,
            isMobileMenuOpen, setIsMobileMenuOpen,
            expandedMenus, setExpandedMenus,
            theme,
            toggleDarkMode,
            toggleSideMenu,
            toggleMobileMenu,
            toggleSubmenu,
            setExpanded,
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};