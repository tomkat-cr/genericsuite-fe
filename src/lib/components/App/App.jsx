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

import { WaitAnimation } from '../../services/wait.animation.utility.jsx';

// Specific imports

import { Users_EditorData } from '../SuperAdminOptions/Users.jsx';
import { UserProfileEditor } from '../UsersMenu/UserProfile.jsx';
// import { ChatBot } from '../ChatBot/ChatBot.jsx';
import { HomePage } from '../HomePage/HomePage.jsx';
import { LoginPage } from '../LoginPage/LoginPage.jsx';
import { About, AboutBody } from '../About/About.jsx';
import { GeneralConfig_EditorData } from '../SuperAdminOptions/GeneralConfig.jsx';

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
import { MainContainer, AppSectionContainer, Nav, Navbar } from '../../helpers/NavLib.jsx';
import { DarkModeButton } from '../../helpers/DarkModeButton.jsx';
import {
    ALERT_DANGER_CLASS,
    BUTTON_PRIMARY_CLASS,
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
    "logout": logoutHander,
};

const isComponent = (componentObj) => {
    return (String(componentObj).includes('component:'));
}

function setExpanded(componentObj) {
    if (document.getElementById("navbar-main-toggle") &&
        !document.getElementById("navbar-main-toggle").classList.contains("collapsed")) {
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

export const App = ({componentMap = {}, appLogo = null}) => {
    return (
        <UserProvider>
          <AppMain
            componentMap={componentMap}
            appLogo={appLogo}
          />
        </UserProvider>
      );
}

const AppNavBar = ({ children }) => {
    const { currentUser } = useUser();
    const version = process.env.REACT_APP_VERSION;
    const appName = process.env.REACT_APP_APP_NAME;
    return (
        <Navbar
            id="navbar-main"
            collapseOnSelect
            expand="lg"
            // className="bg-body-tertiary navbar-dark bg-dark"
        >
            <Navbar.Container>
                <Navbar.Brand
                    as={RouterLink}
                    to='/'
                    onClick={() => (currentUser ? setExpanded() : setExpanded(() => window.location.reload()))}
                >
                    {appName} <span style={{fontSize: '60%'}}>{version}</span>
                </Navbar.Brand>
                {children}
            </Navbar.Container>
        </Navbar>
    );
}

const AppMain = ({componentMap = {}, appLogo = null}) => {
    const [state, setState] = useState("");
    const [menuOptions, setMenuOptions] = useState(null);

    const urlParams = getUrlParams();
    const showContentOnly = (urlParams && typeof urlParams.menu !== "undefined" && urlParams.menu === "0");
    const componentMapFinal = mergeDicts(componentMap, defaultComponentMap);

    const location = useLocation();
    console_debug_log("App | location:", location);

    const { currentUser } = useUser();

    if (debug) {
        console_debug_log("App enters... | window.location:", window.location, "urlParams:", urlParams, "showContentOnly:", showContentOnly, 'componentMapFinal:', componentMapFinal, 'appLogo:', appLogo);
    }

    useEffect(() => {
        if (currentUser) {
            getMenuFromApi(state, setState, setMenuOptions);
        }
    }, [currentUser, state]);

    const stateHandler = () => {
        logoutHander();
    }

    if (!currentUser) {
        return (
            <MainContainer>
                <AppNavBar>
                    <Navbar.OptionsContainer>
                        <Navbar.Collapse
                            id="basic-navbar-nav"
                        >
                            <Nav>
                                <DarkModeButton/>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar.OptionsContainer>
                </AppNavBar>
                <AppSectionContainer>
                    <LoginPage appLogo={appLogo}/>
                </AppSectionContainer>
            </MainContainer>
        );
    }

    return (
        <MainContainer>
            {!showContentOnly && (
                <AppNavBar>
                    <Navbar.OptionsContainer>
                        <Navbar.Toggle
                            id="navbar-main-toggle"
                            aria-controls="responsive-navbar-nav"
                        />
                        <Navbar.Collapse
                            id="basic-navbar-nav"
                        >
                            <Nav
                                // className="me-auto"
                            >
                                <GenericMenuBuilder
                                    componentMapping={componentMapFinal}
                                    itemType="top_menu"
                                    menuOptions={menuOptions}
                                    status={state}
                                    setExpanded={setExpanded}
                                />
                                <DarkModeButton/>
                            </Nav>
                        </Navbar.Collapse>
                        <Navbar.Collapse
                            id="current-user-navbar-nav"
                            // className="justify-content-end"
                        >
                            <Navbar.Text>
                                Signed in as:
                            </Navbar.Text>
                            <GenericMenuBuilder
                                title={currentUser.firstName}
                                componentMapping={componentMapFinal}
                                itemType="hamburger"
                                menuOptions={menuOptions}
                                status={state}
                                showContentOnly={showContentOnly}
                                setExpanded={setExpanded}
                            />
                        </Navbar.Collapse>
                    </Navbar.OptionsContainer>
                </AppNavBar>
            )}
            <AppSectionContainer>
                <div className="p-2">
                    <AppMainComponent
                        // login={login}
                        state={state}
                        stateHandler={stateHandler}
                        menuOptions={menuOptions}
                        componentMap={componentMapFinal}
                        setExpanded={setExpanded}
                        showContentOnly={showContentOnly}
                        appLogo={appLogo}
                    />
                </div>
            </AppSectionContainer>
            {state !== '' && (
                <DefaultRoutes/>
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
    state,
    stateHandler,
    menuOptions,
    componentMap,
    showContentOnly,
    setExpanded,
    appLogo = null,
}) => {
    const location = useLocation();
    if (debug) console_debug_log("AppMainComponent | location:", location);

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
            menuOptions={menuOptions}
            status={state}
            setExpanded={setExpanded}
            appLogo={appLogo}
        />
    )
}
