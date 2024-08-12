// GenericMenuService (GMS) main

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// The 'tailwindcss' package does not export components like 'NavDropdown' or 'Nav'.
// For navigation components, consider using a different library such as 'react-bootstrap'.
// import { NavDropdown, Nav } from 'tailwindcss';

import { history, getPrefix } from '../helpers/history.jsx';
import { formatCaughtError } from '../helpers/error-and-reenter.jsx';
import {
    dbApiService,
} from './db.service.jsx';
import {
    defaultValue,
} from './generic.editor.utilities.jsx';
import {
    console_debug_log,
} from './logging.service.jsx';

import { LoginPage } from '../components/LoginPage/LoginPage.jsx';
import { HomePage } from '../components/HomePage/HomePage.jsx';

// Not accepted this way:
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// const Nav = require('react-bootstrap').Nav;
// const NavDropdown = require('react-bootstrap').NavDropdown;

// 2024-08-11
// import Nav from 'react-bootstrap/cjs/Nav.js';
// import NavDropdown from 'react-bootstrap/cjs/NavDropdown.js';
import {Nav, NavDropdown} from '../helpers/styles-helper.jsx';

const debug = false;

/* eslint no-eval: 0 */
const jsPrefixToken = "|js|";

const getOnClickObject = (onClickString, setExpanded, componentMapping = {}) => {
    let resutlFunction = null;
    if (onClickString === null) {
        if (setExpanded) {
            resutlFunction = () => { setExpanded(); }
        }
    } else {
        if (onClickString.startsWith(jsPrefixToken)) {
            onClickString = onClickString.substring(jsPrefixToken.length);
            if (setExpanded) {
                resutlFunction = () => { setExpanded(); eval(onClickString); return window.location.href; };
            } else {
                resutlFunction = () => { eval(onClickString); return window.location.href };
            }
        } else {
            if (setExpanded) {
                resutlFunction = () => { setExpanded(componentMapping[onClickString]); };
            } else {
                resutlFunction = componentMapping[onClickString];
            }
        }
    }
    return resutlFunction;
}

export const GenericMenuBuilder = (
    {
        title = null,
        componentMapping,
        itemType,
        menuOptions = null,
        status,
        login,
        setExpanded,
        appLogo = null,
    }
) => {
    const getElementObj = (item) => {
        const ElementObj = componentMapping[item.element];
        if (typeof ElementObj === 'undefined') {
            return null;
        }
        return <ElementObj/>;
    }

    const getItemDefaults = (item, topTitle = null) => {
        const hard_prefix = defaultValue(item, "hard_prefix", false);
        const get_prefix = defaultValue(item, "get_prefix", true);
        const reload = defaultValue(item, "reload", false);
        const element_obj = getElementObj(item);
        let path = defaultValue(item, "path", null);
        if (get_prefix && path) {
            path = getPrefix(hard_prefix) + path
        }
        if (!path) {
            path = "#"
        }
        const on_click = getOnClickObject(
            defaultValue(item, "on_click", null),
            setExpanded,
            componentMapping,
        );
        const title = (topTitle == null ? item.title : `[${topTitle}]`);
        return {
            "hard_prefix": hard_prefix,
            "get_prefix": get_prefix,
            "element_obj": element_obj,
            "path": path,
            "on_click": on_click,
            "title": title,
            "reload": reload,
        }
    }

    const getRoutes = () => {
        if (debug) {
            console_debug_log("GenericMenuBuilder: getRoutes | menuOptions:", menuOptions, "componentMapping:", componentMapping);
        }
        if (login) {
            return '';
        }
        const menuOptionsFinal = [...menuOptions, ...getDefaultRoutesRaw(appLogo)];
        if (debug) {
            console_debug_log("GenericMenuBuilder: getRoutes | menuOptionsFinal", menuOptionsFinal);
        }
        return (
            <>
                <Routes history={history}>
                    {menuOptionsFinal.map(item => {
                        const itemDefs = getItemDefaults(item);
                        if (debug) {
                            console_debug_log("getRoutes: item / itemDefs");
                            console_debug_log(item);
                            console_debug_log(itemDefs);
                        }
                        if (item.type === "nav_link") {
                            return <Route
                                key={itemDefs["title"]}
                                path={itemDefs["path"]}
                                element={itemDefs["element_obj"]} 
                            />
                        }
                        return item.sub_menu_options.map(subItem => {
                            const itemDefs = getItemDefaults(subItem);
                            if (debug) {
                                console_debug_log("getRoutes - sub_menu_options: subItem / itemDefs");
                                console_debug_log(subItem);
                                console_debug_log(itemDefs);
                            }    
                            if (subItem.type === 'editor') {
                                try {
                                    return editorRoute(componentMapping[subItem.element]());
                                } catch (error) {
                                    console_debug_log(`[GMB-GR-E010] subItem.element: ${subItem.element}`);
                                    console_debug_log(error);
                                    return null;
                                }
                            }
                            return (
                                <Route
                                    key={itemDefs["title"]}
                                    path={itemDefs["path"]}
                                    element={itemDefs["element_obj"]}
                                />
                            )
                        });
                    })}
                    <Route
                        key='invalidRoute'
                        path='*'
                        element={(<InvalidRouteRedirect />)}
                    />
                </Routes>
            </>
        );
    }

    const GetNavs = (item_type_filter, topTitle, itemType) => {
        // React-Bootstrap Navs and tabs
        // https://react-bootstrap.netlify.app/docs/components/navs
        if (debug) {
            console_debug_log("GenericMenuBuilder: GetNavs | menuOptions / componentMapping");
            console_debug_log(menuOptions);
            console_debug_log(componentMapping);
        }
        if (login) {
            return '';
        }
        return (
            menuOptions
            .filter(item => item.location === item_type_filter)
            .map(item => {
                const itemDefs = getItemDefaults(item, topTitle);
                if (debug) {
                    console_debug_log("Nav y NavDropdown 1: subItem / itemDefs");
                    console_debug_log(item);
                    console_debug_log(itemDefs);
                }
                if (item.type === "nav_link") {
                    // Items in main menu, not belonging to any NavDropdown
                    return (
                        <Nav.Link
                            key={item.title}
                            as={RouterLink}
                            to={itemDefs["path"]}
                            onClick={itemDefs["on_click"]}
                            reloadDocument={itemDefs["reload"]}
                        >
                            {itemDefs["title"]}
                        </Nav.Link>
                    );
                }
                // Navigation dropdown (main menu item with sub-menus)
                return (
                    <NavDropdown
                        key={item.title}
                        title={itemDefs["title"]}
                        id={`basic-nav-dropdown-${itemType}`}
                    >
                    {
                        item.sub_menu_options.map(subItem => {
                            const itemDefs = getItemDefaults(subItem);
                            if (debug) {
                                console_debug_log("NavDropdown.Item 2: subItem / itemDefs");
                                console_debug_log(subItem);
                                console_debug_log(itemDefs);
                            }
                            if (subItem.type === 'editor') {
                                try {
                                    return editorMenuOption(
                                        componentMapping[subItem.element](),
                                        setExpanded,
                                    );
                                } catch (error) {
                                    console_debug_log(`[GMB-GR-E020] subItem.element: ${subItem.element}`);
                                    console_debug_log(error);
                                    return null;
                                }
                            }
                            return (
                                <NavDropdown.Item
                                    key={subItem.title}
                                    as={RouterLink}
                                    to={itemDefs["path"]}
                                    onClick={itemDefs["on_click"]}
                                    reloadDocument={itemDefs["reload"]}
                                >
                                    {itemDefs["title"]}
                                </NavDropdown.Item>
                            );
                        })
                    }
                    </NavDropdown>
                );
            })
        );
    }

    const menuItems = (item_type_filter, topTitle, itemType) => {
        if (login) {
            return '';
        }
        if (typeof menuOptions === 'undefined' || menuOptions === null) {
            return '';
        }
        // Routes
        if (item_type_filter === 'routes') {
            return getRoutes();
        }
        // NavLinks
        return GetNavs(item_type_filter, topTitle, itemType);
    };

    if (status !== "" && itemType === "routes") {
        // if (login) {
        //     return '';
        // }
        return <DefaultRoutes appLogo={appLogo} />;
    }

    if (status !== "") {
        // return '';
        return <DefaultRoutes appLogo={appLogo} />;
    }

    return menuItems(itemType, title, itemType);
}

export const editorRoute = (editor) => {
    return (
        <Route
            path={getPrefix()+'/'+editor.baseUrl}
            element={<editor.component/>}
        />
    );
}

export const editorMenuOption = (editor, setExpanded) => {
    return (
        <NavDropdown.Item
            key={editor.title}
            as={RouterLink}
            to={getPrefix()+'/'+editor.baseUrl}
            onClick={getOnClickObject(null, setExpanded)}
        >
            {editor.title}
        </NavDropdown.Item>
    );
}

export const getDefaultRoutesRaw = ( appLogo = null ) => {
    if (debug) console_debug_log('getDefaultRoutesRaw');
    return [
        {
            title: 'homepage1',
            path: "/",
            element_obj: <HomePage appLogo={appLogo}/>,
            type: "nav_link",
        },
        {
            title: 'homepage2',
            path: getPrefix(true)+"/",
            element_obj: <HomePage appLogo={appLogo}/>,
            type: "nav_link",
        },
        {
            title: 'homepage3',
            path: getPrefix(true).replace('/#', '/')+"/",
            element_obj: <HomePage appLogo={appLogo}/>,
            type: "nav_link",
        },
        {
            title: 'loginpage1',
            path: "/login",
            element_obj: <LoginPage appLogo={appLogo}/>,
            type: "nav_link",
        },
        {
            title: 'loginpage2',
            path: getPrefix(true)+"/login",
            element_obj: <LoginPage appLogo={appLogo}/>,
            type: "nav_link",
        },
        {
            title: 'loginpage3',
            path: getPrefix(true).replace('/#', '/')+"/login",
            element_obj: <LoginPage appLogo={appLogo}/>,
            type: "nav_link",
        },
    ];
}

// Catch all invalid routes and redirect to a default page or show a not found component
const InvalidRouteRedirect = () => {
    console_debug_log('InvalidRouteRedirect');
    return (
        <div className="alert alert-danger" role="alert">
            URL not found...
        </div>
    );
}

export const DefaultRoutes = ( { appLogo = null} ) => {
    const homePagePath3 = getPrefix(true).replace('/#', '/')+"/";
    if (debug) {
        console_debug_log(`DefaultRoutes | homePagePath3: ${homePagePath3}`)
    }
    return (
        <Routes history={history}>
            {
                getDefaultRoutesRaw(appLogo).map(item => {
                    if (debug) {
                        console_debug_log("DefaultRoutes: item:", item);
                    }
                    return <Route
                        key={item["title"]}
                        path={item["path"]}
                        element={item["element_obj"]} 
                    />
                })
            }
        </Routes>
    );
}

export const getMenuFromApi = (state, setState, setMenuOptions) => {
    if (state !== "") {
        return;
    }
    const endpoint = "menu_options";
    const db = new dbApiService({ url: endpoint });
    db.getAll().then(
        data => {
            if (debug) {
                console_debug_log("getMenuFromApi: data");
                console_debug_log(data);
            }
            setMenuOptions(data.resultset);
        },
        error => {
            error = formatCaughtError(error);
            if (debug) {
                console_debug_log("getMenuFromApi: ERROR");
                console_debug_log(error);
            }
            if (!window.location.href.includes("/login")) {
                setState(error);
            }
        }
    );
}
