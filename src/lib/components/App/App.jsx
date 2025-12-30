import React, { useEffect, useRef, useState } from 'react';
import {
    createBrowserRouter,
    HashRouter,
    Link as RouterLink,
    RouterProvider
} from "react-router-dom";
// import { useLocation } from 'react-router-dom';

import {
    AppProvider,
    useAppContext,
} from '../../helpers/AppContext.jsx';
import {
    mergeDicts,
} from '../../helpers/dict-utilities.jsx';
import {
    errorAndReEnter,
    getErrorMessage,
    logoutHander,
} from '../../helpers/error-and-reenter.jsx';
import {
    getUrlParams,
} from '../../helpers/url-params.jsx';
import {
    UserProvider,
    useUser
} from '../../helpers/UserContext.jsx';
import {
    verifyCurrentUser
} from '../../services/authentication.service.jsx';
import {
    GenericMenuBuilder,
    getDefaultRoutes,
    GetHashRoutes,
    getMenuFromApi,
    getRoutes,
} from '../../services/generic.menu.service.jsx';
import {
    console_debug_log,
} from '../../services/logging.service.jsx';

import { imageDirectory } from '../../constants/general_constants.jsx';

import { DarkModeButton } from '../../helpers/DarkModeButton.jsx';
import { MenuModeButton } from '../../helpers/MenuModeButton.jsx';
import { WaitAnimation } from '../../services/wait.animation.utility.jsx';

// Specific imports

import { Users_EditorData } from '../SuperAdminOptions/Users.jsx';
import { UserProfileEditor } from '../UsersMenu/UserProfile.jsx';
// import { ChatBot } from '../ChatBot/ChatBot.jsx';
import { About, AboutBody } from '../About/About.jsx';
import { AppFooter } from '../AppFooter/AppFooter.jsx';
import { HomePage } from '../HomePage/HomePage.jsx';
import { LoginPage } from '../LoginPage/LoginPage.jsx';
import { GeneralConfig_EditorData } from '../SuperAdminOptions/GeneralConfig.jsx';

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
    ALERT_DANGER_CLASS,
    BUTTON_PRIMARY_CLASS,
    defaultTheme,
    LOGIN_BUTTON_IN_APP_COMPONENT_CLASS,
    NAVBAR_BRAND_APP_LOGO_CLASS,
    NAVBAR_BRAND_APP_VERSION_CLASS,
    NAVBAR_BRAND_NAME_CLASS,
    WAIT_ANIMATION_MARGIN_TOP_CLASS,
} from '../../constants/class_name_constants.jsx';
import {
    getPrefix,
    hasHashRouter,
    history,
} from '../../helpers/history.jsx';
import {
    AppFooterContainer,
    AppSectionContainer,
    // ToggleSideBar,
    GsButton,
    MainContainer,
    Navbar,
} from '../../helpers/NavLib.jsx';

const debug = false;

const getShowContentOnly = () => {
    const urlParams = getUrlParams();
    const showContentOnly = (urlParams && typeof urlParams.menu !== "undefined" && urlParams.menu === "0");
    return showContentOnly;
}

const CloseButton = ({ children }) => {
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
                            <AppFooter />
                        </AppFooterContainer>
                    </>
                )}
            </AppSectionContainer>
            {!sideMenu && (
                <AppFooterContainer>
                    <AppFooter />
                </AppFooterContainer>
            )}
        </MainContainer>
    );
}

const AppMainInner = ({ children }) => {
    // const location = useLocation();
    // if (debug) console_debug_log("App | location:", location);
    const {
        currentUser,
        askForLogin,
        unRegisterUser,
    } = useUser();
    const {
        setState,
        errorState, setErrorState,
        menuOptions, setMenuOptions,
        sideMenu, setSideMenu,
        isMobileMenuOpen,
        componentMap,
    } = useAppContext();

    const showContentOnly = getShowContentOnly();
    const getMenuFromApiAlreadyCalled = useRef(false);

    const callGetMenuFromApi = () => {
        // Load menus from JSON configurations
        if (!getMenuFromApiAlreadyCalled.current) {
            getMenuFromApiAlreadyCalled.current = true;
            getMenuFromApi(setState, getErrorState, setErrorState, setMenuOptions, getMenuOptions);
        }
    }

    if (debug) {
        console_debug_log("App enters... | window.location:", window.location, "showContentOnly:", showContentOnly);
    }

    const logoutHandler = () => {
        unRegisterUser();
        logoutHander();
    }

    const getErrorState = () => {
        return errorState;
    }

    const getMenuOptions = () => {
        return menuOptions;
    }

    useEffect(() => {
        if (currentUser) {
            callGetMenuFromApi();
        }
    }, [currentUser]);

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
                            logoutHandler={logoutHandler}
                            showContentOnly={showContentOnly}
                            askForLogin={askForLogin}
                            currentUser={currentUser}
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
                                    logoutHandler={logoutHandler}
                                    showContentOnly={showContentOnly}
                                    askForLogin={askForLogin}
                                    currentUser={currentUser}
                                >
                                    {children}
                                </AppMainComponent>
                            </AppSectionContainer.ForSideMenu>
                            <AppFooterContainer>
                                <AppFooter />
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
                    <AppFooter />
                </AppFooterContainer>
            )}
        </MainContainer>
    );
};

const AppMainComponent = ({
    logoutHandler,
    showContentOnly,
    askForLogin,
    currentUser,
    children,
}) => {
    const { errorState } = useAppContext();

    if (errorState !== "") {
        if (debug) console_debug_log("AppMainComponent | errorAndReEnter | errorState:", errorState);
        if (showContentOnly) {
            return (
                <CloseButton>
                    {getErrorMessage(errorState)}
                </CloseButton>
            );
        }
        return errorAndReEnter(errorState, null, true, null, logoutHandler, false, false);
    }

    if (debug) console_debug_log("AppMainComponent | currentUser:", currentUser, "askForLogin:", askForLogin);

    if (askForLogin) {
        return (
            <div
                className={LOGIN_BUTTON_IN_APP_COMPONENT_CLASS}
            >
                <GsButton
                    as={RouterLink}
                    to={getPrefix() + '/login'}
                >
                    Login
                </GsButton>
            </div>
        )
    }

    if (!currentUser) {
        return (
            WaitAnimation(WAIT_ANIMATION_MARGIN_TOP_CLASS)
        );
    }

    return (children);
}

const AppMain = () => {
    const routerFutureFlags = {
        v7_relativeSplatPath: true
    }

    const { currentUser, registerUser, setAskForLogin } = useUser();
    const {
        setState,
        menuOptions, setMenuOptions,
        componentMap,
        setExpanded,
    } = useAppContext();

    const [router, setRouter] = useState(getDefaultRoutes(currentUser, componentMap, setExpanded));
    const verifyCurrentUserAlreadyCalled = useRef(false);
    const setRouterAlreadyCalled = useRef(false);

    const callVerifyCurrentUser = () => {
        if (!verifyCurrentUserAlreadyCalled.current) {
            verifyCurrentUserAlreadyCalled.current = true;
            verifyCurrentUser(registerUser, currentUser, setAskForLogin);
        }
    }

    const assignRouter = () => {
        if (!setRouterAlreadyCalled.current) {
            setRouter(getRoutes(currentUser, menuOptions, componentMap, setExpanded));
            setRouterAlreadyCalled.current = true;
        }
    }

    useEffect(() => {
        callVerifyCurrentUser();
    }, []);

    useEffect(() => {
        if (menuOptions) {
            assignRouter();
        }
    }, [menuOptions])

    if (debug) console_debug_log("App | router:", router, "menuOptions:", menuOptions, "currentUser:", currentUser);

    if (hasHashRouter) {
        return (
            <HashRouter
                history={history}
                future={routerFutureFlags}
            >
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
            router={createBrowserRouter(router, {
                future: routerFutureFlags
            })}
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

export const App = ({ componentMap = {}, appLogo = "", appLogoHeader = "" }) => {
    const [componentMapFinal, setComponentMapFinal] = useState(
        mergeDicts(componentMap, defaultComponentMap)
    );

    return (
        <UserProvider>
            <AppProvider
                globalComponentMap={componentMapFinal}
                globalAppLogo={appLogo}
                globalAppLogoHeader={appLogoHeader}
            >
                <AppMain />
            </AppProvider>
        </UserProvider>
    );
}
