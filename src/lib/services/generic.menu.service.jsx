// GenericMenuService (GMS) main

import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// import { NavLink as RouterLink } from 'react-router-dom';

import { useAppContext } from '../helpers/AppContext.jsx';
import { useUser } from '../helpers/UserContext.jsx';
import { history, getPrefix, hasHashRouter } from '../helpers/history.jsx';
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

// Not accepted this way:
// import Nav from 'react-bootstrap/Nav';
// import NavDropdown from 'react-bootstrap/NavDropdown';

// Not accepted this way neither:
// const Nav = require('react-bootstrap').Nav;
// const NavDropdown = require('react-bootstrap').NavDropdown;

// 2024-08-11
// import Nav from 'react-bootstrap/cjs/Nav.js';
// import NavDropdown from 'react-bootstrap/cjs/NavDropdown.js';

import { Nav, NavDropdown } from '../helpers/NavLib.jsx';
import { GsIcons } from '../helpers/IconsLib.jsx';
import {
    ALERT_DANGER_CLASS,
    APP_GENERAL_MARGINS_CLASS,
    HORIZONTALLY_CENTERED_CLASS,
    NAV_LINK_ICON_CLASS,
} from '../constants/class_name_constants.jsx';

const debug = false;

const jsPrefixToken = /\|([^|]*)\|/;

const nestedRoutes = false;
const routeExact = false;
const forcedLoginRoute = false;

const getOnClickObject = (onClickString, componentMap, setExpanded) => {
    let resutlFunction = null;
    const windowOpenObjs = {
        "about": {
            "url": "about_body?menu=0",
            "name": "AppAboutPopUp",
            "options": "height=600,width=400",
        },
    }
    if (!onClickString) {
        if (setExpanded) {
            resutlFunction = () => { setExpanded(); }
        }
    } else {
        // |about|
        // Before:
        // "|js|window.open(window.location.origin + '/#/about_body?menu=0', 'AppAboutPopUp','height=600,width=400')"
        if (onClickString.startsWith("|")) {
            const match = onClickString.match(jsPrefixToken);
            if (match) {
                const woOptions = (typeof windowOpenObjs[match[1]] !== "undefined" ? windowOpenObjs[match[1]] : null);
                if (woOptions) {
                    const windowOpenFn = (woOptions) => (window.open(`${window.location.origin}/${hasHashRouter ? '#/' : ''}${woOptions.url}`, woOptions.name, woOptions.options));
                    if (setExpanded) {
                        resutlFunction = () => { setExpanded(); windowOpenFn(woOptions); return window.location.href; };
                    } else {
                        resutlFunction = () => { windowOpenFn(woOptions); return window.location.href };
                    }
                } else {
                    resutlFunction = () => { alert(`ERROR: invalid onClick: ${onClickString}`); return window.location.href };
                }
            }
        } else {
            if (setExpanded) {
                resutlFunction = () => { setExpanded(componentMap[onClickString]); };
            } else {
                resutlFunction = componentMap[onClickString];
            }
        }
    }
    return resutlFunction;
}

const getElementObj = (componentMap, item) => {
    if (debug) console_debug_log("getElementObj | item:", item);
    const ElementObj = componentMap[item.element];
    if (ElementObj) {
        return ElementObj;
    }
    return null;
}

const getItemDefaults = (componentMap, setExpanded, item, topTitle = null) => {
    const hard_prefix = defaultValue(item, "hard_prefix", false);
    const get_prefix = defaultValue(item, "get_prefix", false);
    const reload = defaultValue(item, "reload", false);
    const template = defaultValue(item, "template", null);
    const element_obj = getElementObj(componentMap, item);
    let path = defaultValue(item, "path", null);
    if (get_prefix && path && path !== "/") {
        path = getPrefix(hard_prefix) + path
    }
    if (!path) {
        path = "#"
    }
    const on_click_string = defaultValue(item, "on_click", null);
    const on_click = getOnClickObject(
        on_click_string,
        componentMap, setExpanded
    );
    const title = (topTitle == null ? item.title : `[${topTitle}]`);
    return {
        "hard_prefix": hard_prefix,
        "get_prefix": get_prefix,
        "element_obj": element_obj,
        "path": path,
        "on_click": on_click,
        "on_click_string": on_click_string,
        "title": title,
        "reload": reload,
        "template": template,
    }
}

export const GetHashRoutes = ({ routes }) => (
    <Routes
        id="menuOptionsRoutes"
        history={history}
    >
        {routes.map(item => {
            return (
                <Route
                    key={item.key}
                    path={item.path}
                    exact={item.exact}
                    element={item.element}
                />
            )
        })}
    </Routes>
);

export const editorRoute = (editor, itemDefs) => (
    {
        key: itemDefs.title,
        exact: (editor.exact ?? routeExact),
        path: '/'+editor.baseUrl,
        element: editor.component,
        template: itemDefs.template,
        on_click_string: itemDefs.on_click_string,
    }
);

export const getRoutesRaw = (currentUser, menuOptions, componentMap, setExpanded) => {
    if (debug) console_debug_log("getRoutesRaw: menuOptions:", menuOptions);

    const AppMainInner = componentMap["AppMainInner"];
    const AppMainInnerUnauthenticated = componentMap["AppMainInnerUnauthenticated"];

    let indexRoute = -1;
    let loginRoute = -1;
    let routes = [];
    let RouteTemplateComponent;

    const addOneroute = (resultRoute) => {
        if (resultRoute) {
            if (debug) console_debug_log("getRoutesRaw1 | resultRoute OK:", resultRoute);
            switch (resultRoute.path) {
                case "/":
                    if (indexRoute == -1) {
                        routes.push(resultRoute);
                        indexRoute = routes.length - 1;
                    }
                    break;
                case getPrefix()+"/login":
                    if (loginRoute == -1) {
                        routes.push(resultRoute);
                        loginRoute = routes.length - 1;
                    }
                    break;
                default:
                    routes.push(resultRoute);
            }
        }
    }

    menuOptions.map(item => {
        const itemDefs = getItemDefaults(componentMap, setExpanded, item);
        if (debug) {
            console_debug_log("getRoutes: item / itemDefs");
            console_debug_log(item);
            console_debug_log(itemDefs);
        }
        let resultRoute = null;
        if (item.type === "nav_link") {
            resultRoute = {
                key: itemDefs["title"],
                exact: (item["exact"] ?? routeExact),
                path: itemDefs["path"],
                element: itemDefs["element_obj"],
                template: itemDefs.template,
                on_click_string: itemDefs.on_click_string,
            };
            addOneroute(resultRoute);
        } else {
            item.sub_menu_options.map(subItem => {
                const itemDefs = getItemDefaults(componentMap, setExpanded, subItem);
                if (debug) {
                    console_debug_log("getRoutes - sub_menu_options: subItem / itemDefs");
                    console_debug_log(subItem);
                    console_debug_log(itemDefs);
                }    
                if (subItem.type === 'editor') {
                    try {
                        resultRoute = editorRoute(componentMap[subItem.element](), itemDefs)
                        addOneroute(resultRoute);
                    } catch (error) {
                        console_debug_log("[GMB-GR-E010] subItem.element:", subItem.element);
                        console_debug_log(error);
                    }
                } else {
                    resultRoute = {
                        key: itemDefs["title"],
                        exact: (item["exact"] ?? routeExact),
                        path: itemDefs["path"],
                        element: itemDefs["element_obj"],
                        template: itemDefs.template,
                        on_click_string: itemDefs.on_click_string,
                    };
                    addOneroute(resultRoute);
                }
            });
        }
    })
    routes.push({
        key: 'invalidRoute',
        path: '*',
        element: InvalidRoute,
    });
    routes = routes.map(route => {
        let error = null;
        if (nestedRoutes) {
            route.path = route.path.replace(/\//, "");
        }
        if (debug) console_debug_log('getRoutesRaw | route.path:', route.path, '| route: ', );
        if (route.path === getPrefix()+'/login') {
            RouteTemplateComponent = AppMainInnerUnauthenticated;
        } else if (route.template) {
            if (typeof componentMap[route.template] === "undefined") {
                error = `[GMB-GR-E030] ERROR - template not registered in "componentMap" | route.template: ${route.template}`;
                console_debug_log(error);
                RouteTemplateComponent = componentMap["NoDesignComponent"];
            } else {
                RouteTemplateComponent = componentMap[route.template];
            }
        } else {
            RouteTemplateComponent = AppMainInner;
            // RouteTemplateComponent = (({ children} ) => (<>{children}</>));
        }
        route.element = (
            <RouteTemplateComponent
                // componentMap={componentMap}
                // currentUser={currentUser}
                errorMessage={error}
            >
                {route.element !== null && (<route.element/>)}
                {route.element === null && route.on_click_string !== null && (<p>Redirecting...</p>)}
                {route.element === null && route.on_click_string === null && (<InvalidElement>{route.key} Not Implemented...</InvalidElement>)}
            </RouteTemplateComponent>
        );
        return route;
    })
    let finalRoutes;
    if (currentUser) {
        routes[indexRoute].path = "/";
        if (nestedRoutes) {
            finalRoutes = {...routes[indexRoute]};
            delete routes[indexRoute];
            finalRoutes.children = routes;
        } else {
            routes[indexRoute].index = true;
        }
    } else {
        if (nestedRoutes) {
            finalRoutes = routes[loginRoute];
            finalRoutes.path = "/";
            routes[indexRoute].path = "index";
            finalRoutes.children = routes;
        } else {
            if (forcedLoginRoute) {
                routes.push({...routes[loginRoute]});
                routes[loginRoute].index = true;
                routes[loginRoute].path = "/";
                routes[indexRoute].path = "index";
            } else {
                routes[indexRoute].index = true;
            }
        }
    }
    if (debug) console_debug_log("getRoutesRaw2 | routes", routes, " | finalRoutes:", finalRoutes, " | indexRoute:", indexRoute, " | loginRoute:", loginRoute, " | currentUser:", currentUser);
    if (nestedRoutes) {
        return [finalRoutes];
    }
    return routes;
}

export const getRoutes = (currentUser, menuOptions, componentMap, setExpanded) => {
    if (debug) {
        console_debug_log("GenericMenuBuilder: getRoutes | menuOptions:", menuOptions, "componentMap:", componentMap);
    }
    const menuOptionsFinal = [...menuOptions, ...getDefaultRoutesRaw(componentMap)];
    if (debug) {
        console_debug_log("GenericMenuBuilder: getRoutes | menuOptionsFinal", menuOptionsFinal);
    }
    const routes = getRoutesRaw(currentUser, menuOptionsFinal, componentMap, setExpanded);
    return routes;
}

const isTopMenuAlternativeType = (itemType) => (
    Object.values(['side_menu', 'mobile_menu']).some(element => itemType === element)
)

export const editorMenuOption = (editor, itemType, mobileMenuMode, componentMap, setExpanded) => {
    return (
        <NavDropdown.Item
            key={editor.title}
            as={RouterLink}
            to={'/'+editor.baseUrl}
            onClick={getOnClickObject(null, componentMap, setExpanded)}
            type={itemType}
            mobileMenuMode={mobileMenuMode}
        >
            {editor.title}
        </NavDropdown.Item>
    );
}

export const getDefaultRoutesRaw = (componentMap) => {
    if (debug) console_debug_log('getDefaultRoutesRaw | componentMap:', componentMap);
    const LoginPage = componentMap["LoginPage"];
    const HomePage = componentMap["HomePage"];
    return [
        {
            title: 'loginpage',
            path: "/login",
            element: "LoginPage",
            type: "nav_link",
        },
        {
            title: 'homepage',
            path: "/",
            element: "HomePage",
            type: "nav_link",
        },
    ];
}

export const DefaultRoutes = () => {
    const { currentUser } = useUser();
    const { componentMap, setExpanded } = useAppContext();
    const routes = getDefaultRoutes(currentUser, componentMap, setExpanded);
    return (
        <GetHashRoutes
            routes={routes}
        />
    );
}

// export const getDefaultRoutes = (currentUser, componentMap, setExpanded, returnType = "routes") => {
export const getDefaultRoutes = (currentUser, componentMap, setExpanded) => {
    const menuOptionsFinal = getDefaultRoutesRaw(componentMap);
    const routes = getRoutesRaw(currentUser, menuOptionsFinal, componentMap, setExpanded);
    if (debug) console_debug_log('getDefaultRoutes | returnType: array');
    return routes;
}

const InvalidElement = ({ children }) => {
    if (debug) console_debug_log('ElementNotImplemented');
    return (
        <div
            className={APP_GENERAL_MARGINS_CLASS}
        >
            <div
                className={`${ALERT_DANGER_CLASS} ${HORIZONTALLY_CENTERED_CLASS}`}
                role="alert"
            >
                {children}
            </div>
        </div>
    );
}

const InvalidRoute = () => {
    // Catch all invalid routes and redirect to a default page or show a not found component
    if (debug) console_debug_log('InvalidRoute');
    return (
        <InvalidElement>
            URL not found...
        </InvalidElement>
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

export const GenericMenuBuilder = (
    {
        icon,
        title,
        itemType,
        mobileMenuMode,
    }
) => {
    const { currentUser } = useUser();
    const {
        state,
        menuOptions,
        setExpanded,
        componentMap,
    } = useAppContext();

    const GetNavs = (item_type_filter, topTitle, itemType, icon, mobileMenuMode) => {
        if (!menuOptions) {
            return '';
        }
        if (debug) {
            console_debug_log("GenericMenuBuilder: GetNavs | menuOptions / componentMap");
            console_debug_log(menuOptions);
            console_debug_log(componentMap);
        }
        return (
            menuOptions
            .filter(item => item.location === item_type_filter)
            .map(item => {
                const itemDefs = getItemDefaults(componentMap, setExpanded, item, topTitle);
                if (debug) {
                    console_debug_log("Nav & NavDropdown 1: subItem / itemDefs");
                    console_debug_log(item);
                    console_debug_log(itemDefs);
                }
                if (item.type === "nav_link") {
                    // Items in main menu, not belonging to any NavDropdown
                    return (
                        <Nav.Link
                            key={item.title}
                            as={RouterLink}
                            // to={getPrefix()+itemDefs["path"]}
                            to={itemDefs["path"]}
                            onClick={itemDefs["on_click"]}
                            reloadDocument={itemDefs["reload"]}
                            type={itemType}
                            mobileMenuMode={mobileMenuMode}
                        >
                            {icon ? <GsIcons icon={icon ?? ''} size="2xl" className={NAV_LINK_ICON_CLASS} />: itemDefs["title"]}
                        </Nav.Link>
                    );
                }
                // Navigation dropdown (main menu item with sub-menus)
                const navDropdownId = `basic-nav-dropdown-${item.title.replace(/ /g, '_')}`
                return (
                    <NavDropdown
                        key={item.title}
                        title={itemDefs["title"]}
                        id={navDropdownId}
                        type={itemType}
                        icon={icon}
                        mobileMenuMode={mobileMenuMode}
                    >
                    {
                        item.sub_menu_options.map(subItem => {
                            const itemDefs = getItemDefaults(componentMap, setExpanded, subItem);
                            if (debug) {
                                console_debug_log("NavDropdown.Item 2: subItem / itemDefs");
                                console_debug_log(subItem);
                                console_debug_log(itemDefs);
                            }
                            if (subItem.type === 'editor') {
                                try {
                                    return editorMenuOption(
                                        componentMap[subItem.element](),
                                        itemType,
                                        mobileMenuMode,
                                        componentMap, setExpanded
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
                                    type={itemType}
                                    mobileMenuMode={mobileMenuMode}
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

    const menuItems = (item_type_filter, topTitle, itemType, mobileMenuMode) => {
        if (typeof menuOptions === 'undefined' || menuOptions === null) {
            return '';
        }
        // Routes
        if (item_type_filter === "routes") {
            return getRoutes(currentUser, menuOptions, componentMap, setExpanded);
        }
        // NavLinks
        return GetNavs(item_type_filter, topTitle, itemType, icon, mobileMenuMode);
    };

    if (state !== "" && itemType === "routes") {
        return (
            <DefaultRoutes/>
        );
    }

    if (state !== "") {
        return (
            <DefaultRoutes/>
        );
    }

    return menuItems(isTopMenuAlternativeType(itemType) ? 'top_menu' : itemType, title, itemType, mobileMenuMode);
}
