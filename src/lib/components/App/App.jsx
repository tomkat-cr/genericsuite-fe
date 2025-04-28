import React, { useState, useEffect } from 'react';
import {
    Link as RouterLink,
    createBrowserRouter,
    RouterProvider,
    HashRouter,
    Navigate,
    Link,
} from "react-router-dom";
// import { useLocation } from 'react-router-dom';

import {
    GenericMenuBuilder,
    getMenuFromApi,
    getDefaultRoutes,
    getRoutes,
    GetHashRoutes,
} from '../../services/generic.menu.service.jsx';
import {
    console_debug_log,
} from '../../services/logging.service.jsx';
import {
    verifyCurrentUser
} from '../../services/authentication.service.jsx';
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

// Component specific CSS:
// import './App.css';

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
    Navbar,
    // ToggleSideBar,
    GsButton,
} from '../../helpers/NavLib.jsx';
import {
    getPrefix,
    hasHashRouter,
    history,
} from '../../helpers/history.jsx';
import {
    defaultTheme,
    ALERT_DANGER_CLASS,
    BUTTON_PRIMARY_CLASS,
    NAVBAR_BRAND_APP_LOGO_CLASS,
    NAVBAR_BRAND_NAME_CLASS,
    NAVBAR_BRAND_APP_VERSION_CLASS,
    APP_GENERAL_MARGINS_CLASS,
    LOGIN_BUTTON_IN_APP_COMPONENT_CLASS,
} from '../../constants/class_name_constants.jsx';

const debug = false;

const getShowContentOnly = () => {
    const urlParams = getUrlParams();
    const showContentOnly = (urlParams && typeof urlParams.menu !== "undefined" && urlParams.menu === "0");
    return showContentOnly;
}

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

const AppNavBar = ({ children }) => {
    const { currentUser } = useUser();
    const { setExpanded, appLogoHeader } = useAppContext();
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
        >
            <Navbar.Brand
                as={RouterLink}
                to='/'
                // onClick={() => (currentUser ? setExpanded() : setExpanded(() => window.location.reload()))}
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

const TopRightMenu = ({ showContentOnly, authenticated = true }) => {
    const { currentUser } = useUser();
    return (
        <Navbar.TopRightMenu
            authenticated={authenticated}
        >
            <DarkModeButton />
            <MenuModeButton />
            <Navbar.Toggle />
            {currentUser && authenticated && (
                <GenericMenuBuilder
                    icon="place-holder-circle"
                    title={currentUser.firstName}
                    itemType="hamburger"
                    showContentOnly={showContentOnly}
                />
            )}
        </Navbar.TopRightMenu>
    );
}

const NoDesignComponent = ({ children, errorMessage }) => {
    return (
        <>
            {errorMessage && (
                <div
                    className={ALERT_DANGER_CLASS}
                    role="alert"
                >
                    {errorMessage}
                </div>
            )}
            {children}
        </>
    );
}

const AppMainInnerUnauthenticated = ({ children }) => {
    const { sideMenu } = useAppContext();
    const showContentOnly = getShowContentOnly();
    return (
        <MainContainer>
            <AppNavBar>
                {!sideMenu && (
                    <Navbar.TopRightMenu>
                        <TopRightMenu
                            showContentOnly={showContentOnly}
                            authenticated={false}
                        />
                    </Navbar.TopRightMenu>
                )}
            </AppNavBar>
            <AppSectionContainer>
                {!sideMenu && (
                    <>{children}</>
                )}
                {sideMenu && (
                    <>
                        <Navbar.TopForSideMenu>
                            <TopRightMenu
                                showContentOnly={showContentOnly}
                                authenticated={false}
                            />
                        </Navbar.TopForSideMenu>
                        <AppSectionContainer.ForSideMenu>
                            <>{children}</>
                        </AppSectionContainer.ForSideMenu>
                        <AppFooterContainer>
                            <AppFooter/>
                        </AppFooterContainer>
                    </>
                )}
            </AppSectionContainer>
            {!sideMenu && (
                <AppFooterContainer>
                    <AppFooter/>
                </AppFooterContainer>
            )}
        </MainContainer>
    );
}

const AppMainInner = ({ children }) => {
    // const location = useLocation();
    // if (debug) console_debug_log("App | location:", location);
    const { currentUser } = useUser();
    const {
        state, setState,
        menuOptions, setMenuOptions,
        sideMenu, setSideMenu,
        isMobileMenuOpen,
        componentMap,
    } = useAppContext();

    const showContentOnly = getShowContentOnly();

    if (debug) {
        console_debug_log("App enters... | window.location:", window.location, "showContentOnly:", showContentOnly);
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

    if (showContentOnly) {
        return (
            <AppMainInnerUnauthenticated>
                {children}
            </AppMainInnerUnauthenticated>
        );
    }

    return (
        <MainContainer>
            <AppNavBar>
                <Navbar.TopCenterMenu>
                    <GenericMenuBuilder
                        itemType={sideMenu ? "side_menu" : "top_menu"}
                    />
                    {sideMenu && isMobileMenuOpen && currentUser && (
                        <GenericMenuBuilder
                            title={currentUser.firstName}
                            itemType="hamburger"
                            showContentOnly={showContentOnly}
                            mobileMenuMode={true}
                        />
                    )}
                </Navbar.TopCenterMenu>
                {!sideMenu && (
                    <TopRightMenu
                        showContentOnly={showContentOnly}
                    />
                )}
            </AppNavBar>
            <AppSectionContainer>
                <>
                    {!sideMenu && (
                        <AppMainComponent
                            stateHandler={stateHandler}
                            showContentOnly={showContentOnly}
                        >
                            {children}
                        </AppMainComponent>
                    )}
                    {sideMenu && (
                        <>
                            <Navbar.TopForSideMenu>
                                <TopRightMenu
                                    showContentOnly={showContentOnly}
                                />
                            </Navbar.TopForSideMenu>
                            <AppSectionContainer.ForSideMenu>
                                {/* <ToggleSideBar
                                    onClick={() => document.getElementById('navbar-side-menu').classList.toggle('hidden')}
                                /> */}
                                <AppMainComponent
                                    stateHandler={stateHandler}
                                    showContentOnly={showContentOnly}
                                >
                                    {children}
                                </AppMainComponent>
                            </AppSectionContainer.ForSideMenu>
                            <AppFooterContainer>
                                <AppFooter/>
                            </AppFooterContainer>
                        </>
                    )}
                </>
            </AppSectionContainer>
            <Navbar.MobileMenu>
                <GenericMenuBuilder
                    itemType="mobile_menu"
                />
                {currentUser && (
                    <GenericMenuBuilder
                        title={currentUser.firstName}
                        itemType="hamburger"
                        showContentOnly={showContentOnly}
                        mobileMenuMode={true}
                    />
                )}
            </Navbar.MobileMenu>
            {!sideMenu && (
                <AppFooterContainer>
                    <AppFooter/>
                </AppFooterContainer>
            )}
        </MainContainer>
    );
};

const AppMainComponent = ({
    stateHandler,
    showContentOnly,
    children,
}) => {
    // const location = useLocation();
    // if (debug) console_debug_log("AppMainComponent | location:", location);
    const { state, menuOptions, currentUser } = useAppContext();

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
        return (
            <div 
                className={LOGIN_BUTTON_IN_APP_COMPONENT_CLASS}
            >
                <GsButton
                    as={RouterLink}
                    to={getPrefix()+'/login'}
                >
                    Login
                </GsButton>
            </div>
        )
    }
    return (children);
}

const AppMain = () => {
    const { currentUser, registerUser } = useUser();

    const {
        state, setState,
        menuOptions, setMenuOptions,
        componentMap,
        setExpanded,
    } = useAppContext();

    const [router, setRouter] = useState(getDefaultRoutes(currentUser, componentMap, setExpanded));

    useEffect(() => {
        verifyCurrentUser(registerUser);
    }, []);

    useEffect(() => {
        // Load menus from JSON configurations
        if (currentUser) {
            getMenuFromApi(state, setState, setMenuOptions);
        }
    }, [currentUser, state]);

    useEffect(() => {
        if (menuOptions) {
            setRouter(getRoutes(currentUser, menuOptions, componentMap, setExpanded));
        }
    }, [menuOptions])

    if (debug) console_debug_log("App | router:", router, "menuOptions:", menuOptions, "currentUser:", currentUser);

    if (hasHashRouter) {
        return (
            <HashRouter>
                <>
                    <GetHashRoutes
                        routes={router}
                    />
                </>
            </HashRouter>
        );
    }

    return (
        <RouterProvider
            router={createBrowserRouter(router)}
            history={history}
        />
    );
}

const defaultComponentMap = {
    "Users_EditorData": Users_EditorData,
    "GeneralConfig_EditorData": GeneralConfig_EditorData,
    "UserProfileEditor": UserProfileEditor,
    // "Chatbot": ChatBot,
    "HomePage": HomePage,
    "LoginPage": LoginPage,
    "About": About,
    "AboutBody": AboutBody,
    "AppFooter": AppFooter,
    "AppMainInner": AppMainInner,
    "AppMainInnerUnauthenticated": AppMainInnerUnauthenticated,
    "NoDesignComponent": NoDesignComponent,
    "logout": logoutHander,
    "defaultTheme": defaultTheme,
};

export const App = ({componentMap = {}, appLogo = "", appLogoHeader = ""}) => {
    const componentMapFinal = mergeDicts(componentMap, defaultComponentMap);
console.log("App | componentMapFinal:", componentMapFinal);
    return (
        <UserProvider>
            <AppProvider
                globalComponentMap={componentMapFinal}
                globalAppLogo={appLogo}
                globalAppLogoHeader={appLogoHeader}
            >
                <AppMain/>
            </AppProvider>
        </UserProvider>
      );
}
