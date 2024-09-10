import React, { useEffect, useState } from 'react';

import { console_debug_log } from '../services/logging.service.jsx';
import {
    APP_SIDE_MENU_BG_COLOR_CLASS,
    APP_MAIN_BOX_BG_COLOR_CLASS,
    MAIN_CONTAINER_FOR_TOP_MENU_CLASS,
    MAIN_CONTAINER_FOR_SIDE_MENU_CLASS,
    NAVBAR_HEADER_FOR_TOP_MENU_CLASS,
    NAVBAR_BRAND_ELEMENTS_FOR_TOP_MENU_CLASS,
    NAVBAR_TOP_CENTER_MENU_ON_TOP_CLASS,
    NAVBAR_TOP_RIGHT_MENU_FOR_TOP_MENU_CLASS,
    NAVBAR_TOP_RIGHT_MENU_FOR_SIDE_MENU_CLASS,
    NAVBAR_TOGGLE_BUTTON_CLASS,
    NAV_LINK_TOP_DIV_TOP_MENU_CLASS,
    NAV_LINK_TOP_DIV_HAMBURGER_CLASS,
    NAV_LINK_TOP_DIV_SIDE_MENU_CLASS,
    NAV_LINK_BUTTONS_TOP_MENU_CLASS,
    NAV_LINK_BUTTONS_HAMBURGER_CLASS,
    NAV_LINK_BUTTONS_SIDE_MENU_CLASS,
    NAV_DROPDOWN_TOP_DIV_TOP_MENU_CLASS,
    NAV_DROPDOWN_TOP_DIV_HAMBURGER_CLASS,
    NAV_DROPDOWN_TOP_DIV_SIDE_MENU_CLASS,
    NAV_DROPDOWN_INNER_DIV_TOP_MENU_CLASS,
    NAV_DROPDOWN_INNER_DIV_HAMBURGER_CLASS,
    NAV_DROPDOWN_INNER_DIV_SIDE_MENU_CLASS,
    NAV_DROPDOWN_BUTTON_TOP_MENU_CLASS,
    NAV_DROPDOWN_BUTTON_HAMBURGER_CLASS,
    NAV_DROPDOWN_BUTTON_SIDE_MENU_CLASS,
    NAV_DROPDOWN_ITEM_TOP_DIV_TOP_MENU_CLASS,
    NAV_DROPDOWN_ITEM_TOP_DIV_HAMBURGER_CLASS,
    NAV_DROPDOWN_ITEM_TOP_DIV_SIDE_MENU_CLASS,
    NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS,
    NAV_LINK_BUTTONS_MOBILE_MENU_CLASS,
    NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS,
    NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS,
    NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS,
    NAVBAR_MOBILE_MENU_DIV_1_CLASS,
    NAVBAR_MOBILE_MENU_DIV_2_CLASS,
    NAVBAR_MOBILE_MENU_H2_CLASS,
    NAVBAR_MOBILE_CLOSE_BUTTON_CLASS,
    NAVBAR_MOBILE_CLOSE_BUTTON_ICON_CLASS,
    NAVBAR_MOBILE_NAV_CLASS,
    NAVBAR_MOBILE_MENU_DIV_3_CLASS,
    NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS,
    NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS,
    NAV_DROPDOWN_IMAGE_SIDE_MENU_CLASS,
    NAV_DROPDOWN_IMAGE_HAMBURGER_CLASS,
    NAV_DROPDOWN_IMAGE_TOP_MENU_CLASS,
    APP_SECTION_CONTAINER_FOR_TOP_MENU_CLASS,
    NAVBAR_HEADER_FOR_SIDE_MENU_CLASS,
    NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_OPEN_CLASS,
    NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_CLOSE_CLASS,
    NAVBAR_BRAND_ELEMENTS_FOR_SIDE_MENU_CLASS,
    NAVBAR_BRAND_HIDDEN_IF_LARGE_SCREEN,
    NAVBAR_TEXT_CLASS,
    NAVBAR_TOGGLE_IMAGE_CLASS,
    NAVBAR_TOP_CENTER_MENU_ON_LEFT_CLASS,
    APP_SECTION_CONTAINER_FOR_SIDE_MENU_CLASS,
    NAVBAR_TOP_FOR_SIDE_MENU_CLASS,
    APP_FOOTER_CONTAINER_CLASS,
} from '../constants/class_name_constants.jsx';
import { GsIcons } from './IconsLib.jsx';
import { useAppContext } from './AppContext.jsx';

// Containers

const debug = false;

export const MainContainer = ({ children }) => {
    /* App Layout (main container) */
    if (debug) console_debug_log("||||| MainContainer", children);
    const { theme, sideMenu } = useAppContext();
    return (
        <div
            className={`${sideMenu ? MAIN_CONTAINER_FOR_SIDE_MENU_CLASS : MAIN_CONTAINER_FOR_TOP_MENU_CLASS} ${theme.background} ${theme.text}`}
        >
            {children}
        </div>
    );
}

export const AppSectionContainer = ({ children }) => {
    if (debug) console_debug_log("||||| AppSectionContainer", children);
    const { sideMenu } = useAppContext();
    if (sideMenu) {
        return (
            <div
                className={APP_SECTION_CONTAINER_FOR_SIDE_MENU_CLASS}
            >
                {children}
            </div>
        );
    }
    return (
        <main
            className={APP_SECTION_CONTAINER_FOR_TOP_MENU_CLASS}
        >
            {children}
        </main>
    );
}

export const AppSectionContainerForSideMenu = ( { children }) => {
    if (debug) console_debug_log("||||| AppSectionContainerForSideMenu");
    const { sideMenu } = useAppContext();
    return (
        <main
            className={sideMenu ? "flex-grow p-4" : ""}
        >
            {children}
        </main>
    );
}

AppSectionContainer.ForSideMenu = AppSectionContainerForSideMenu;


export const AppFooterContainer = ({ children }) => {
    /* App Footer */
    const { theme } = useAppContext();
    return (
        <footer
            className={`${APP_FOOTER_CONTAINER_CLASS} ${theme.primary}`}
        >
            {children}
        </footer>
    );
}

export const CenteredBoxContainer = ({ children }) => {
    if (debug) console_debug_log("||||| CenterdBoxContainer", children);
    return (
        <div
            className="z-50 overflow-auto"
        >
            <div
                className={`relative ${APP_MAIN_BOX_BG_COLOR_CLASS} w-fit max-w-md m-auto flex-col flex rounded-lg`}
            >
                <div
                    className="flex flex-col items-center pt-1 pb-4 p-6"
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

// NavBar

export const Navbar = ({ children, collapseOnSelect, expand }) => {
    /* App Header */
    if (debug) console_debug_log("||||| Navbar", children);
    const { theme, sideMenu, isMobileMenuOpen } = useAppContext();
    if (sideMenu) {
        const translateStyle = (isMobileMenuOpen ?
            NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_OPEN_CLASS
            :
            NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_CLOSE_CLASS
        );
        return (
            <nav
                className={`${translateStyle} ${NAVBAR_HEADER_FOR_SIDE_MENU_CLASS} ${theme.secondary} ${theme.text}`}
            >
                {children}
            </nav>
        );
    }
    return (
        <div
            className={`${NAVBAR_HEADER_FOR_TOP_MENU_CLASS} ${theme.primary}`}
        >
            {children}
        </div>
    );
}

const NavbarBrand = ({ children, as, to, onClick }) => {
    /* App Logo */
    if (debug) console_debug_log("||||| NavbarBrand", children);
    const { sideMenu } = useAppContext();
    const As = as;
    if (sideMenu) {
        return (
            <div
                className={NAVBAR_BRAND_ELEMENTS_FOR_SIDE_MENU_CLASS}
            >
                <As
                    // as={as}
                    to={to}
                    onClick={onClick}
                >
                    <div
                        className={NAVBAR_BRAND_ELEMENTS_FOR_TOP_MENU_CLASS}
                    >
                        {children}
                    </div>
                </As>
                <MobileMenuCloseButton
                    className={NAVBAR_BRAND_HIDDEN_IF_LARGE_SCREEN}
                />
            </div>
        );
    }
    return (
        <As
            // as={as}
            to={to}
            onClick={onClick}
        >
            <div
                className={NAVBAR_BRAND_ELEMENTS_FOR_TOP_MENU_CLASS}
            >
                {children}
            </div>
        </As>
    );
}

const NavbarTopCenterMenu = ({ children }) => {
    if (debug) console_debug_log("||||| NavbarTopCenterMenu", children);
    const { sideMenu } = useAppContext();
    if (sideMenu) {
        return (
            <div
                className={NAVBAR_TOP_CENTER_MENU_ON_LEFT_CLASS}
            >
                {children}
            </div>
        );
    }
    return (
        <nav
            className={NAVBAR_TOP_CENTER_MENU_ON_TOP_CLASS}
        >
            {children}
        </nav>
    );
}

const NavbarTopRightMenu = ({ children }) => {
    if (debug) console_debug_log("||||| NavbarTopRightMenu", children);
    const { sideMenu } = useAppContext();
    return (
        <div
            className={sideMenu ? NAVBAR_TOP_RIGHT_MENU_FOR_SIDE_MENU_CLASS : NAVBAR_TOP_RIGHT_MENU_FOR_TOP_MENU_CLASS}
        >
            {children}
        </div>
    );
}

const MobileMenuCloseButton = ({ className }) => {
    const { toggleMobileMenu } = useAppContext();
    return (
        <button
            onClick={toggleMobileMenu}
            className={className ?? '' + NAVBAR_MOBILE_CLOSE_BUTTON_CLASS}
        >
            <GsIcons
                icon='x'
                className={NAVBAR_MOBILE_CLOSE_BUTTON_ICON_CLASS}
            />
        </button>
    );
}

const NavbarMobileMenu = ({ children }) => {
    if (debug) console_debug_log("||||| NavbarMobileMenu", children);
    const { theme, isMobileMenuOpen, sideMenu, toggleMobileMenu } = useAppContext();
    if (!isMobileMenuOpen) {
        return null;
    }
    if (sideMenu) {
        return (
            <>{'Pass'}</>
        );
    }
    return (
        <div className={NAVBAR_MOBILE_MENU_DIV_1_CLASS}>
            <div className={`${NAVBAR_MOBILE_MENU_DIV_2_CLASS} ${theme.background} ${theme.text}`}>
                <div className={NAVBAR_MOBILE_MENU_DIV_3_CLASS}>
                    {/* Side mobile menu title */}
                    <h2
                        className={NAVBAR_MOBILE_MENU_H2_CLASS}
                    >
                        Menu
                    </h2>
                    {/* Side mobile menu close button */}
                    <MobileMenuCloseButton />
                </div>
                {/* Side mobile menu options */}
                <nav
                    className={NAVBAR_MOBILE_NAV_CLASS}
                >
                    {children}
                </nav>
            </div>
        </div>
    );
}

const NavbarToggle = () => {
    /* Side mobile menu toggle */
    if (debug) console_debug_log("||||| NavbarToggle");
    const { toggleMobileMenu } = useAppContext();
    return (
        <button
            id="navbar-main-toggle"
            onClick={toggleMobileMenu}
            className={NAVBAR_TOGGLE_BUTTON_CLASS}
        >
            <GsIcons
                icon="menu-hamburger"
                className={NAVBAR_TOGGLE_IMAGE_CLASS}
            />
        </button>
    );
}

const NavbarText = ({ children, className }) => {
    if (debug) console_debug_log("||||| NavbarText", children);
    return (
        <div
            className={className ?? NAVBAR_TEXT_CLASS}
        >
            {children}
        </div>
    );
}

const NavbarTopForSideMenu = ({ children, className }) => {
    if (debug) console_debug_log("||||| NavbarForSideMenu", children);
    const { theme } = useAppContext();
    return (
        <header
            className={`${NAVBAR_TOP_FOR_SIDE_MENU_CLASS} ${theme.primary}`}
        >
            {children}
        </header>
    );
}

Navbar.Brand = NavbarBrand;
Navbar.TopCenterMenu = NavbarTopCenterMenu;
Navbar.TopRightMenu = NavbarTopRightMenu;
Navbar.MobileMenu = NavbarMobileMenu;
Navbar.Toggle = NavbarToggle;
Navbar.Text = NavbarText;
Navbar.TopForSideMenu = NavbarTopForSideMenu;

// NavDropdown

export const NavDropdown = ({ children, title, id, type, icon }) => {
    const { expandedMenus, toggleSubmenu } = useAppContext();

    const [fullId, setFullId] = useState(`${id}_${type}`);
    const [dropDownOpen, setDropDownOpen] = useState(false);

    if (debug) console_debug_log(`||||| NavDropdown | id: ${id} | fullId: ${fullId}`, children);

    const toggledropDownOpen = () => {
        const elementId = `${fullId}_dropDown`;
        const element = document.getElementById(elementId);
        if (dropDownOpen) {
            element.classList.add('hidden');
        } else {
            element.classList.remove('hidden');
        }
        if (debug) console_debug_log(`>>--> NavDropdown | toggledropDownOpen | elementId: ${elementId} | previous dropDownOpen: ${dropDownOpen}`);
        setDropDownOpen(!dropDownOpen);
    };

    const variantsDirectionImage = {
        top_menu: 'arrow-down-small',
        hamburger: 'arrow-down-small',
        side_menu: 'arrow-right-small',
        mobile_menu: 'arrow-right-small',
    }

    const variantsTopDiv = {
        top_menu: NAV_DROPDOWN_TOP_DIV_TOP_MENU_CLASS,
        hamburger: NAV_DROPDOWN_TOP_DIV_HAMBURGER_CLASS,
        side_menu: NAV_DROPDOWN_TOP_DIV_SIDE_MENU_CLASS,
        mobile_menu: NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS,
    };

    const variantsInnerDiv = {
        top_menu: NAV_DROPDOWN_INNER_DIV_TOP_MENU_CLASS,
        hamburger: NAV_DROPDOWN_INNER_DIV_HAMBURGER_CLASS,
        side_menu: NAV_DROPDOWN_INNER_DIV_SIDE_MENU_CLASS,
        mobile_menu: NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS,
    };

    const variantsButton = {
        top_menu: NAV_DROPDOWN_BUTTON_TOP_MENU_CLASS,
        hamburger: NAV_DROPDOWN_BUTTON_HAMBURGER_CLASS,
        side_menu: NAV_DROPDOWN_BUTTON_SIDE_MENU_CLASS,
        mobile_menu: NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS,
    };

    const variantsSubmenuImage = {
        top_menu: NAV_DROPDOWN_IMAGE_TOP_MENU_CLASS,
        hamburger: NAV_DROPDOWN_IMAGE_HAMBURGER_CLASS,
        side_menu: NAV_DROPDOWN_IMAGE_SIDE_MENU_CLASS,
        mobile_menu: NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS,
    };

    const variantsOptionClick = {
        top_menu: toggleSubmenu,
        hamburger: toggleSubmenu,
        side_menu: toggleSubmenu,
        mobile_menu: toggleSubmenu,
    };

    useEffect(() => {
        variantOnClick(fullId);
    }, [dropDownOpen, fullId]);

    useEffect(() => {
        const elementId = `${fullId}_submenu_image`;
        const element = document.getElementById(elementId);
        if (element) {
            if (expandedMenus.includes(fullId)) {
                element.classList.add('rotate-90');
            } else {
                element.classList.remove('rotate-90');
            }
        }
    }, [dropDownOpen, fullId, expandedMenus]);

    const directionImage = variantsDirectionImage[type] || '';
    const variantStyleTopDiv = variantsTopDiv[type] || '';
    const variantStyleInnerDiv = variantsInnerDiv[type] || '';
    const variantStyleButton = variantsButton[type] || '';
    const variantStyleSubmenuImage = variantsSubmenuImage[type] || '';
    const variantOnClick = variantsOptionClick[type] || '';

    return (
        <div
            className={variantStyleTopDiv}
            // data-headlessui-state=""
            // zIndex="9999"
        >
            <button
                className={variantStyleButton}
                id={`${fullId}_button`}
                type="button"
                // aria-haspopup="menu"
                // aria-expanded="false"
                // data-headlessui-state=""
                onClick={toggledropDownOpen}
                // zIndex="9999"
            >
                {(icon ? <GsIcons icon={icon} /> : title)}
                <GsIcons
                    id={`${fullId}_submenu_image`}
                    icon={directionImage}
                    className={variantStyleSubmenuImage}
                />
            </button>
            <div
                className={variantStyleInnerDiv}
                // zIndex="9999"
                // aria-labelledby="headlessui-menu-button-:Rqcr6:"
                // role="menu"
                // tabIndex="0"
                // data-headlessui-state="open"
                // data-open=""
                id={`${fullId}_dropDown`}
            >
                {expandedMenus.includes(fullId) && (
                    React.Children.map(children, child =>
                        React.cloneElement(child, {
                            closeParent: () => toggledropDownOpen(),
                        })
                    )
                )}
            </div>
        </div>
    );
}

const NavDropdownItem = ({ children, as, to, onClick, reloadDocument, type, closeParent }) => {
    if (debug) console_debug_log("||||| NavDropdownItem", children);
    const As = as;

    const variantsTopDiv = {
        top_menu: NAV_DROPDOWN_ITEM_TOP_DIV_TOP_MENU_CLASS,
        hamburger: NAV_DROPDOWN_ITEM_TOP_DIV_HAMBURGER_CLASS,
        side_menu: NAV_DROPDOWN_ITEM_TOP_DIV_SIDE_MENU_CLASS,
        mobile_menu: NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS,
    };

    const variantStyleTopDiv = variantsTopDiv[type] || '';

    return (
        <div
            className={variantStyleTopDiv}
        >
            {As && (
                <As
                    to={to}
                    onClick={(e) => {
                        if (debug) console_debug_log(`>>--> NavDropdownItem | 1) Called NavDropdown child and closes the dropdown... | e:`, e);
                        closeParent();
                        if (onClick) {
                            onClick(e);
                        }
                    }}
                >
                    {children}
                </As>
            )}
            {!As && (
                <button
                    onClick={(e) => {
                        if (debug) console_debug_log(`>>--> NavDropdownItem | 2) Called NavDropdown child and closes the dropdown... | e:`, e);
                        closeParent();
                        if (onClick) {
                            onClick(e);
                        }
                    }}
                >
                    {children}
                </button>
            )}
        </div>
    );
}

NavDropdown.Item = NavDropdownItem;

// Nav

export const ToggleSideBar = ({ onClick }) => {
    return (
        <div
            // className="h-8 w-1.5 rounded-full bg-slate-400 mr-2 ml-2"
            onClick={onClick}
        >
            <GsIcons icon='vertical-slider' />
        </div>
    );
}

// export const Nav = ({ type, id, children }) => {
//     /* Central Menu */
//     const [visible, setVisible] = useState(false);
//     if (debug) console_debug_log("||||| Nav", children);

//     if (!id) {
//         id = 'nav_' + Math.random().toString(36).substr(2, 9);
//     }

//     const togleVisibility = () => {
//         const idName = `${id}_side_menu`;
//         if (!visible) {
//             document.getElementById(idName).classList.add('hidden');
//         } else {
//             document.getElementById(idName).classList.remove('hidden');
//         }
//         console_debug_log(`togleVisibility | idName: ${idName} | visible: ${visible}`);
//         setVisible(!visible);
//     }

//     const variantsTopDiv = {
//         top_menu: '',
//         hamburger: '',
//         side_menu: 'h-full flex items-center',
//     };

//     const variantsInnerDiv = {
//         top_menu: 'flex flex-col pl-0 mb-0 list-none',
//         top_menu: 'relative flex items-center',
//         hamburger: 'relative flex items-center',
//         // side_menu: 'top-0 left-0 h-full w-64 shadow-lg flex flex-col overflow-y-auto bg-white dark:bg-gray-800',
//         side_menu: `top-0 left-0 h-full w-64 shadow-lg flex flex-col overflow-y-auto ${APP_SIDE_MENU_BG_COLOR_CLASS}`,
//     };

//     const variantStyleTopDiv = variantsTopDiv[type] || '';
//     const variantStyleInnerDiv = variantsInnerDiv[type] || '';

//     return (
//         <div
//             className={variantStyleTopDiv}
//         >
//             <div
//                 className={variantStyleInnerDiv}
//                 id={`${id}_side_menu`}
//             >
//                 {children}
//             </div>
//             {type === 'side_menu' && (
//                 <ToggleSideBar
//                     id={`${id}_toggle`}
//                     className='flex items-center justify-center'
//                     onClick={togleVisibility}
//                 />
//             )}
//         </div>
//     );
// }

const NavLink = ({ children, as, to, onClick, reloadDocument, type }) => {
    if (debug) console_debug_log("||||| NavLink", children);
    const As = as;

    const variantsLi = {
        top_menu: NAV_LINK_TOP_DIV_TOP_MENU_CLASS,
        hamburger: NAV_LINK_TOP_DIV_HAMBURGER_CLASS,
        side_menu: NAV_LINK_TOP_DIV_SIDE_MENU_CLASS,
        mobile_menu: NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS,
    };
    const variantsButton = {
        top_menu: NAV_LINK_BUTTONS_TOP_MENU_CLASS,
        hamburger: NAV_LINK_BUTTONS_HAMBURGER_CLASS,
        side_menu: NAV_LINK_BUTTONS_SIDE_MENU_CLASS,
        mobile_menu: NAV_LINK_BUTTONS_MOBILE_MENU_CLASS,
    };

    const variantStyleLi = variantsLi[type] || '';
    const variantStyleButton = variantsButton[type] || '';

    return (
        <div
            className={variantStyleLi}
        >
            <As
                to={to}
                // onClick={onClick}
                className={variantStyleButton}
            >
                {children}
            </As>
        </div>
    );
}

export const Nav = NavbarTopCenterMenu;
Nav.Link = NavLink;