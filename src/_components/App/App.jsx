import React, { useState, useEffect } from 'react';

import { Link as RouterLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import {
    GenericMenuBuilder,
    getMenuFromApi,
    DefaultRoutes,
    authenticationService,
    console_debug_log,
} from '../../_services';
import {
    errorAndReEnter,
    logoutHander,
    getUrlParams,
} from '../../_helpers';
import { WaitAnimation } from '../../_services/wait.animation.utility';

// Specific imports

import { Users_EditorData } from '../SuperAdminOptions/Users';
// import { FoodMoments_EditorData } from '../SuperAdminOptions/FoodMoments';
// import { GeneralIngredients_EditorData } from '../SuperAdminOptions/GeneralIngredients';
// import { UserIngredients_EditorData } from '../UsersMenu/UserIngredients';
// import { Dishes_EditorData } from '../UsersMenu/Dishes';
// import { DailyMeals_EditorData } from '../UsersMenu/DailyMeals';
import { UserProfileEditor } from '../UsersMenu/UserProfile';
// import { ChatBot } from '../ChatBot/ChatBot';
import { HomePage } from '../HomePage/HomePage';
import { LoginPage } from '../LoginPage/LoginPage';
import { About, AboutBody } from '../About/About';
import { GeneralConfig_EditorData } from '../SuperAdminOptions/GeneralConfig';
// import { ClarifaiModels_EditorData } from '../SuperAdminOptions/ClarifaiModels';

import './App.css';

const debug = false;

const componentMap = {
    "Users_EditorData": Users_EditorData,
    // "FoodMoments_EditorData": FoodMoments_EditorData,
    // "GeneralIngredients_EditorData": GeneralIngredients_EditorData,
    // "ClarifaiModels_EditorData": ClarifaiModels_EditorData,
    // "UserIngredients_EditorData": UserIngredients_EditorData,
    // "Dishes_EditorData": Dishes_EditorData,
    // "DailyMeals_EditorData": DailyMeals_EditorData,
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
            return <componentObj/>;
        } else {
            return componentObj();
        }
    }
    if (debug) console_debug_log(">> setExpanded [2]");
    return '';
}

export const App = () => {
    
    const [currentUser, setCurrentUser] = useState(null);
    const [state, setState] = useState("");
    const [login, setLogin] = useState(false);
    const [menuOptions, setMenuOptions] = useState(null);

    const urlParams = getUrlParams();
    const showContentOnly = (urlParams && typeof urlParams.menu !== "undefined" && urlParams.menu === "0");
    const version = process.env.REACT_APP_VERSION;
    const appName = process.env.REACT_APP_APP_NAME;

    if (debug) {
        console_debug_log("App enters... | window:", window.location, "urlParams:", urlParams, "showContentOnly:", showContentOnly);
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
        <>
            {!showContentOnly && (<div className="w-screen">
                    <Navbar
                        id="navbar-main"
                        collapseOnSelect
                        expand="lg"
                        className="bg-body-tertiary navbar-dark bg-dark"
                    >
                        <Container>
                            <Navbar.Brand
                                as={RouterLink}
                                to={(currentUser ? '/' : '/#/login')}
                                // to={(currentUser ? window.location.origin + '/#' : '/#/login')}
                                onClick={() => (currentUser ? setExpanded() : setExpanded(() => window.location.reload()))}
                            >
                                {appName} <span style={{fontSize: '60%'}}>{version}</span>
                            </Navbar.Brand>
                            {currentUser && <>
                                <Navbar.Toggle
                                    id="navbar-main-toggle"
                                    aria-controls="responsive-navbar-nav"
                                />
                                <Navbar.Collapse
                                    id="basic-navbar-nav"
                                >
                                    <Nav
                                        className="me-auto"
                                    >
                                        <GenericMenuBuilder
                                            componentMapping={componentMap}
                                            itemType="top_menu"
                                            menuOptions={menuOptions}
                                            status={state}
                                            setExpanded={setExpanded}
                                        />
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
                                        componentMapping={componentMap}
                                        itemType="hamburger"
                                        menuOptions={menuOptions}
                                        status={state}
                                        showContentOnly={showContentOnly}
                                        setExpanded={setExpanded}
                                    />
                                </Navbar.Collapse>
                            </>}
                        </Container>
                    </Navbar>
            </div>)}
            <div 
                className="w-screen bg-gray-300 fyn_jumbotron"
                style={{ minHeight: '88vh' }}
            >
                <div className="p-2">
                    <AppMainComponent
                        login={login}
                        state={state}
                        stateHandler={stateHandler}
                        menuOptions={menuOptions}
                        componentMap={componentMap}
                        setExpanded={setExpanded}
                        showContentOnly={showContentOnly}
                    />
                </div>
            </div>
            {state !== '' && (
                <DefaultRoutes/>
            )}
        </>
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
        return (<LoginPage/>);
    }
    if (state !== "") {
        if (debug) console_debug_log("AppMainComponent | errorAndReEnter");
        if (showContentOnly) {
            return (
                <CloseButton>
                    {state}
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
        />
    )
}