import React, { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

import {
    GenericMenuBuilder,
    getMenuFromApi,
    DefaultRoutes,
} from '../../services/generic.menu.service.jsx';
import {
    console_debug_log,
} from '../../services/logging.service.jsx';
import {
    errorAndReEnter,
    logoutHander,
    getErrorMessage,
} from '../../helpers/error-and-reenter.jsx';
import {
    getUrlParams,
} from '../../helpers/url-params.jsx';
import {
    mergeDicts,
} from '../../helpers/dict-utilities.jsx';
import {
    UserProvider,
    useUser
} from '../../helpers/UserContext.jsx';
import {
    AppProvider,
    useAppContext,
} from '../../helpers/AppContext.jsx';

import {
    getLocalConfig,
    saveLocalConfig
} from '../../helpers/local-config.jsx';
import { imageDirectory } from '../../constants/general_constants.jsx';

import { WaitAnimation } from '../../services/wait.animation.utility.jsx';
import { DarkModeButton } from '../../helpers/DarkModeButton.jsx';
import { MenuModeButton } from '../../helpers/MenuModeButton.jsx';

// Specific imports

import { Users_EditorData } from '../SuperAdminOptions/Users.jsx';
import { UserProfileEditor } from '../UsersMenu/UserProfile.jsx';
// import { ChatBot } from '../ChatBot/ChatBot.jsx';
import { HomePage } from '../HomePage/HomePage.jsx';
import { LoginPage } from '../LoginPage/LoginPage.jsx';
import { About, AboutBody } from '../About/About.jsx';
import { GeneralConfig_EditorData } from '../SuperAdminOptions/GeneralConfig.jsx';
import { AppFooter } from '../AppFooter/AppFooter.jsx';

import './App.css';

// Not accepted this way:
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';

// Not accepted this way neither:
// const Container = require('react-bootstrap').Container;
// const Nav = require('react-bootstrap').Nav;
// const Navbar = require('react-bootstrap').Navbar;

// 2024-08-11
// import Container from 'react-bootstrap/cjs/Container.js';
// import Nav from 'react-bootstrap/cjs/Nav.js';
// import Navbar from 'react-bootstrap/cjs/Navbar.js';
import {
    MainContainer,
    AppSectionContainer,
    AppFooterContainer,
    Nav,
    Navbar,
} from '../../helpers/NavLib.jsx';
import {
    ALERT_DANGER_CLASS,
    BUTTON_PRIMARY_CLASS,
    NAVBAR_BRAND_APP_LOGO_CLASS,
    NAVBAR_BRAND_NAME_CLASS,
    NAVBAR_BRAND_APP_VERSION_CLASS,
} from '../../constants/class_name_constants.jsx';

const debug = false;

const defaultComponentMap = {
    "Users_EditorData": Users_EditorData,
    "GeneralConfig_EditorData": GeneralConfig_EditorData,
    "UserProfileEditor": UserProfileEditor,
    // "Chatbot": ChatBot,
    "HomePage": HomePage,
    "LoginPage": LoginPage,
    "About": About,
    "AboutBody": AboutBody,
    "AppFooter": AboutBody,
    "logout": logoutHander,
};

export const App = ({componentMap = {}, appLogo = null, appLogoHeader = null}) => {
    return (
        <UserProvider>
            <AppProvider>
                <AppMain
                    componentMap={componentMap}
                    appLogo={appLogo}
                    appLogoHeader={appLogoHeader}
                />
            </AppProvider>
        </UserProvider>
      );
}

const AppNavBar = ({ children, appLogoHeader = null }) => {
    const { currentUser } = useUser();
    const { setExpanded } = useAppContext();
    const version = process.env.REACT_APP_VERSION;
    const appName = (
        appLogoHeader ? 
            <img
                src={imageDirectory + appLogoHeader}
                className={NAVBAR_BRAND_APP_LOGO_CLASS}
                alt="App Logo"
            />
                :
            process.env.REACT_APP_APP_NAME
    );
    return (
        <Navbar
            id="navbar-main"
            // collapseOnSelect
            // expand="lg"
        >
            <Navbar.Brand
                as={RouterLink}
                to='/'
                onClick={() => (currentUser ? setExpanded() : setExpanded(() => window.location.reload()))}
            >
                <div
                    className={NAVBAR_BRAND_NAME_CLASS}
                >
                    {appName}
                </div>
                <div
                    className={NAVBAR_BRAND_APP_VERSION_CLASS}
                >{version}</div>
            </Navbar.Brand>
            {children}
        </Navbar>
    );
}

const TopRightMenu = ({ componentMapping, showContentOnly }) => {
    const { currentUser } = useUser();
    return (
        <Navbar.TopRightMenu>
            <DarkModeButton />
            <MenuModeButton />
            <Navbar.Toggle />
            <GenericMenuBuilder
                icon="place-holder-circle"
                title={currentUser.firstName}
                componentMapping={componentMapping}
                itemType="hamburger"
                showContentOnly={showContentOnly}
            />
        </Navbar.TopRightMenu>
    );
}

const AppMain = ({componentMap = {}, appLogo = null, appLogoHeader = null}) => {
    const urlParams = getUrlParams();
    const showContentOnly = (urlParams && typeof urlParams.menu !== "undefined" && urlParams.menu === "0");
    const componentMapFinal = mergeDicts(componentMap, defaultComponentMap);

    const location = useLocation();
    if (debug) console_debug_log("App | location:", location);

    const { currentUser } = useUser();
    const {
        state, setState,
        menuOptions, setMenuOptions,
        sideMenu, setSideMenu,
    } = useAppContext();

    if (debug) {
        console_debug_log("App enters... | window.location:", window.location, "urlParams:", urlParams, "showContentOnly:", showContentOnly, 'componentMapFinal:', componentMapFinal, 'appLogo:', appLogo, 'appLogoHeader:', appLogoHeader);
    }

    const stateHandler = () => {
        logoutHander();
    }

    useEffect(() => {
        // Load menus from JSON configurations
        if (currentUser) {
            getMenuFromApi(state, setState, setMenuOptions);
        }
    }, [currentUser, state]);

    if (!currentUser) {
        return (
            <MainContainer>
                <AppNavBar
                    appLogoHeader={appLogoHeader}
                >
                    <Navbar.TopRightMenu>
                        <DarkModeButton/>
                    </Navbar.TopRightMenu>
                </AppNavBar>
                <AppSectionContainer>
                    <LoginPage
                        appLogo={appLogo}
                        appLogoHeader={appLogoHeader}
                    />
                </AppSectionContainer>
                <AppFooterContainer>
                    <AppFooter/>
                </AppFooterContainer>
            </MainContainer>
        );
    }

    return (
        <MainContainer>
            {!showContentOnly && (
                <AppNavBar
                    appLogoHeader={appLogoHeader}
                >
                    <Navbar.TopCenterMenu>
                        <GenericMenuBuilder
                            componentMapping={componentMapFinal}
                            itemType={sideMenu ? "side_menu" : "top_menu"}
                        />
                    </Navbar.TopCenterMenu>
                    {!sideMenu && (
                        <TopRightMenu
                            componentMapping={componentMapFinal}
                            showContentOnly={showContentOnly}
                        />
                    )}
                </AppNavBar>
            )}
            <AppSectionContainer>
                {!showContentOnly && sideMenu && (
                    <Navbar.TopForSideMenu>
                        <TopRightMenu
                            componentMapping={componentMapFinal}
                            showContentOnly={showContentOnly}
                        />
                    </Navbar.TopForSideMenu>
                )}
                <AppSectionContainer.ForSideMenu>
                    <AppMainComponent
                        stateHandler={stateHandler}
                        componentMap={componentMapFinal}
                        showContentOnly={showContentOnly}
                        appLogo={appLogo}
                        appLogoHeader={appLogoHeader}
                    />
                </AppSectionContainer.ForSideMenu>
                {sideMenu && (
                    <AppFooterContainer>
                        <AppFooter/>
                    </AppFooterContainer>
                )}
            </AppSectionContainer>
            <Navbar.MobileMenu>
                <GenericMenuBuilder
                    componentMapping={componentMapFinal}
                    itemType="mobile_menu"
                />
            </Navbar.MobileMenu>
            {state !== '' && (
                <DefaultRoutes/>
            )}
            {!sideMenu && (
                <AppFooterContainer>
                    <AppFooter/>
                </AppFooterContainer>
            )}
        </MainContainer>
    );
};

const CloseButton = ({children}) => {
    return (
        <>
            {children && (
                <div
                    className={ALERT_DANGER_CLASS} role="alert"
                >
                    {children}
                </div>
            )}
            <button
                type="button"
                onClick={() => window.close()}
                className={BUTTON_PRIMARY_CLASS}
            >
                Close
            </button>
        </>
    );
}

const AppMainComponent = ({
    stateHandler,
    componentMap,
    showContentOnly,
    appLogo = null,
    appLogoHeader = null,
}) => {
    const location = useLocation();
    if (debug) console_debug_log("AppMainComponent | location:", location);
    const { state, menuOptions } = useAppContext();

    if (state !== "") {
        if (debug) console_debug_log("AppMainComponent | errorAndReEnter | state:", state);
        if (showContentOnly) {
            return (
                <CloseButton>
                    {getErrorMessage(state)}
                </CloseButton>
            );
        }
        return errorAndReEnter(state, null, true, null, stateHandler, false, false);
    }
    if (!menuOptions) {
        if (debug) console_debug_log("AppMainComponent | WaitAnimation");
        return WaitAnimation();
    }
    if (debug) console_debug_log("AppMainComponent | GenericMenuBuilder");
    return (
        <GenericMenuBuilder
            componentMapping={componentMap}
            itemType="routes"
            appLogo={appLogo}
            appLogoHeader={appLogoHeader}
        />
    )
}
