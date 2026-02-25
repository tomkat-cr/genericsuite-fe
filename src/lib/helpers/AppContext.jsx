import React, { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from 'react';

// import { defaultTheme } from '../constants/class_name_constants.jsx';
import { console_debug_log } from '../services/logging.service.jsx';
import { isWindowWide, resizeManager } from './ui.jsx';

const debug = false

const AppContext = createContext();

const appReducer = (state, action) => {
    switch (action.type) {
        case 'SET_APP_LOGO':
            return { ...state, appLogo: action.payload };
        case 'SET_APP_LOGO_HEADER':
            return { ...state, appLogoHeader: action.payload };
        case 'SET_COMPONENT_MAP':
            return { ...state, componentMap: action.payload };
        case 'SET_STATE':
            return { ...state, state: action.payload };
        case 'SET_MENU_OPTIONS':
            return { ...state, menuOptions: action.payload };
        case 'SET_SIDE_MENU':
            return { ...state, sideMenu: action.payload };
        case 'TOGGLE_SIDE_MENU':
            return { ...state, sideMenu: !state.sideMenu };
        case 'SET_DARK_MODE':
            return { ...state, isDarkMode: action.payload };
        case 'TOGGLE_DARK_MODE':
            return { ...state, isDarkMode: !state.isDarkMode };
        case 'SET_MOBILE_MENU':
            return { ...state, isMobileMenuOpen: action.payload };
        case 'TOGGLE_MOBILE_MENU':
            return { ...state, isMobileMenuOpen: !state.isMobileMenuOpen };
        case 'SET_EXPANDED_MENUS':
            return { ...state, expandedMenus: action.payload };
        case 'SET_WIDE':
            return { ...state, isWide: action.payload };
        default:
            return state;
    }
};

export const AppProvider = ({ globalComponentMap, globalAppLogo = "", globalAppLogoHeader = "", children }) => {
    const initialState = {
        appLogo: globalAppLogo,
        appLogoHeader: globalAppLogoHeader,
        componentMap: globalComponentMap,
        errorState: "", // Error message
        state: "", // LOADING, ERROR, OK, TIMEOUT
        menuOptions: null,
        sideMenu: false,
        isDarkMode: false,
        isMobileMenuOpen: false,
        expandedMenus: [],
        isWide: isWindowWide(),
    };

    const [appState, dispatch] = useReducer(appReducer, initialState);

    const theme = appState.isDarkMode ? appState.componentMap["defaultTheme"].dark : appState.componentMap["defaultTheme"].light;

    const setAppLogo = useCallback((payload) => dispatch({ type: 'SET_APP_LOGO', payload }), []);
    const setAppLogoHeader = useCallback((payload) => dispatch({ type: 'SET_APP_LOGO_HEADER', payload }), []);
    const setComponentMap = useCallback((payload) => dispatch({ type: 'SET_COMPONENT_MAP', payload }), []);
    const setErrorState = useCallback((payload) => dispatch({ type: 'SET_ERROR', payload }), []);
    const setState = useCallback((payload) => dispatch({ type: 'SET_STATE', payload }), []);
    const setMenuOptions = useCallback((payload) => dispatch({ type: 'SET_MENU_OPTIONS', payload }), []);
    const setSideMenu = useCallback((payload) => dispatch({ type: 'SET_SIDE_MENU', payload }), []);
    const setIsDarkMode = useCallback((payload) => dispatch({ type: 'SET_DARK_MODE', payload }), []);
    const setIsMobileMenuOpen = useCallback((payload) => dispatch({ type: 'SET_MOBILE_MENU', payload }), []);
    const setExpandedMenus = useCallback((payload) => dispatch({ type: 'SET_EXPANDED_MENUS', payload }), []);
    const setIsWide = useCallback((payload) => dispatch({ type: 'SET_WIDE', payload }), []);

    const toggleDarkMode = useCallback(() => dispatch({ type: 'TOGGLE_DARK_MODE' }), []);
    const toggleSideMenu = useCallback(() => dispatch({ type: 'TOGGLE_SIDE_MENU' }), []);
    const toggleMobileMenu = useCallback(() => dispatch({ type: 'TOGGLE_MOBILE_MENU' }), []);
    const toggleSubmenu = useCallback((menuName, menuVisible) => {
        if (debug) console_debug_log(`<<<< AppContext | toggleSubmenu | menuName: ${menuName} | menuVisible: ${menuVisible}`);
        dispatch({
            type: 'SET_EXPANDED_MENUS',
            payload: menuVisible
                ? [menuName]
                : appState.expandedMenus.filter(item => item !== menuName)
        });
    }, [appState.expandedMenus]);

    const isComponent = useCallback((componentObj) => {
        return (String(componentObj).includes('component:'));
    }, []);

    const setExpanded = useCallback((componentObj) => {
        /* Close mobile menu if any option is clicked */
        if (document.getElementById("navbar-main-toggle") &&
            appState.isMobileMenuOpen
        ) {
            document.getElementById("navbar-main-toggle").click();
        }
        setExpandedMenus([]);
        if (componentObj) {
            if (debug) console_debug_log(`>> setExpanded [1] | isComponent: ${isComponent(componentObj)} | componentObj:`, componentObj);
            if (isComponent(componentObj)) {
                try {
                    return <componentObj />;
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
    }, [appState.isMobileMenuOpen, isComponent]);

    useEffect(() => {
        const resizer = resizeManager(() => {
            setIsWide(isWindowWide())
        })
        resizer.addListener();
        return () => resizer.removeListener();
    }, [setIsWide]);

    const contextValue = useMemo(() => ({
        ...appState,
        setAppLogo,
        setAppLogoHeader,
        setComponentMap,
        setErrorState,
        setState,
        setMenuOptions,
        setSideMenu,
        setIsDarkMode,
        setIsMobileMenuOpen,
        setExpandedMenus,
        setIsWide,
        theme,
        toggleDarkMode,
        toggleSideMenu,
        toggleMobileMenu,
        toggleSubmenu,
        setExpanded,
    }), [
        appState,
        theme,
        setAppLogo,
        setAppLogoHeader,
        setComponentMap,
        setErrorState,
        setState,
        setMenuOptions,
        setSideMenu,
        setIsDarkMode,
        setIsMobileMenuOpen,
        setExpandedMenus,
        setIsWide,
        toggleDarkMode,
        toggleSideMenu,
        toggleMobileMenu,
        toggleSubmenu,
        setExpanded,
    ]);

    return (
        <AppContext.Provider value={contextValue}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};