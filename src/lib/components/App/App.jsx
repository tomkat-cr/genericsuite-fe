import React, { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';

import {
    GenericMenuBuilder,
    getMenuFromApi,
    DefaultRoutes,
} from '../../services/generic.menu.service.jsx';
import {
    authenticationService,
} from '../../services/authentication.service.jsx';
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
import {MainContainer, AppSectionContainer, Nav, Navbar} from '../../helpers/styles-helper.jsx';
import { DarkModeButton } from '../../helpers/DarkModeButton.jsx';


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
    
    const [currentUser, setCurrentUser] = useState(null);
    const [state, setState] = useState("");
    const [login, setLogin] = useState(false);
    const [menuOptions, setMenuOptions] = useState(null);

    const urlParams = getUrlParams();
    const showContentOnly = (urlParams && typeof urlParams.menu !== "undefined" && urlParams.menu === "0");
    const version = process.env.REACT_APP_VERSION;
    const appName = process.env.REACT_APP_APP_NAME;
    const componentMapFinal = mergeDicts(componentMap, defaultComponentMap);

    if (debug) {
        console_debug_log("App enters... | window.location:", window.location, "urlParams:", urlParams, "showContentOnly:", showContentOnly, 'componentMapFinal:', componentMapFinal, 'appLogo:', appLogo);
    }

    useEffect(() => {
        if (authenticationService.currentUser) {
            const subscription = authenticationService.currentUser.subscribe(
                x => setCurrentUser(x)
            );
            return () => subscription.unsubscribe();
        }
    }, []);

    useEffect(() => {
        if ( !(login || window.location.href.includes("/login")) ) {
            getMenuFromApi(state, setState, setMenuOptions);
        }
    }, [state, login]);

    const stateHandler = () => {
        setLogin(true);
        logoutHander();
    }

    return (
        <MainContainer>
            {!showContentOnly && (
                <Navbar
                    id="navbar-main"
                    collapseOnSelect
                    expand="lg"
                    // className="bg-body-tertiary navbar-dark bg-dark"
                >
                    <Navbar.Container>
                        <Navbar.Brand
                            as={RouterLink}
                            to={(currentUser ? '/' : '/#/login')}
                            // to={(currentUser ? window.location.origin + '/#' : '/#/login')}
                            onClick={() => (currentUser ? setExpanded() : setExpanded(() => window.location.reload()))}
                        >
                            {appName} <span style={{fontSize: '60%'}}>{version}</span>
                        </Navbar.Brand>
                        <Navbar.OptionsContainer>
                            {currentUser && (
                                <>
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
                                        className="justify-content-end"
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
                                </>
                            )}
                        </Navbar.OptionsContainer>
                    </Navbar.Container>
                </Navbar>
            )}
            <AppSectionContainer>
                <div className="p-2">
                    <AppMainComponent
                        login={login}
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
                <div className="alert alert-danger" role="alert">
                    {children}
                </div>
            )}
            <button
                type="button"
                onClick={() => window.close()}
                className="ml-2 mb-1 bg-blue-500 text-white p-0 rounded close"
            >
                Close
            </button>
        </>
    );
}

const AppMainComponent = ({
    login,
    state,
    stateHandler,
    menuOptions,
    componentMap,
    showContentOnly,
    setExpanded,
    appLogo = null,
}) => {
    if (login || window.location.href.includes("/login")) {
        if (debug) console_debug_log("AppMainComponent | login");
        if (showContentOnly) {
            return (
                <CloseButton>
                    Re-login is required...
                </CloseButton>
            );
        }
        return (<LoginPage appLogo={appLogo}/>);
    }
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
