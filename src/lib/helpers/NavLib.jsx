import React, { useEffect, useState } from 'react';

import { console_debug_log } from '../services/logging.service.jsx';
import {
    APP_SIDE_MENU_BG_COLOR_CLASS,
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
    NAV_LINK_BUTTON_TOP_MENU_CLASS,
    NAV_LINK_BUTTON_HAMBURGER_CLASS,
    NAV_LINK_BUTTON_SIDE_MENU_CLASS,
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
    NAV_DROPDOWN_ITEM_BUTTON_TOP_MENU_CLASS,
    NAV_DROPDOWN_ITEM_BUTTON_HAMBURGER_CLASS,
    NAV_DROPDOWN_ITEM_BUTTON_SIDE_MENU_CLASS,
    NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS,
    NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS,
    NAV_LINK_BUTTON_MOBILE_MENU_CLASS,
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
    // NAVBAR_BRAND_HIDDEN_IF_LARGE_SCREEN,
    NAVBAR_TEXT_CLASS,
    NAVBAR_TOGGLE_IMAGE_CLASS,
    NAVBAR_TOP_CENTER_MENU_ON_LEFT_CLASS,
    APP_SECTION_CONTAINER_FOR_SIDE_MENU_CLASS,
    NAVBAR_TOP_FOR_SIDE_MENU_CLASS,
    APP_FOOTER_CONTAINER_CLASS,
    CENTERED_BOX_CONTAINER_DIV_1_CLASS,
    CENTERED_BOX_CONTAINER_DIV_3_CLASS,
    APP_SECTION_CONTAINER_FOR_SIDE_MENU_MAIN_CLASS,
    CENTERED_BOX_CONTAINER_DIV_2_CLASS,
    BUTTON_PRIMARY_CLASS,
    BUTTON_SECONDARY_CLASS,
    NAV_LINK_ICON_CLASS,
    VERTICALLY_CENTERED_CLASS,
    TOP0_Z50_CLASS,
    HIDDEN_CLASS,
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
    /* App section top container */
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
    /* App section inner container for side menu */
    if (debug) console_debug_log("||||| AppSectionContainerForSideMenu");
    return (
        <main
            className={APP_SECTION_CONTAINER_FOR_SIDE_MENU_MAIN_CLASS}
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
    /* Center box container, for pop-ups and login page like components */
    const { theme } = useAppContext();
    if (debug) console_debug_log("||||| CenterdBoxContainer", children);
    return (
        <div
            className={CENTERED_BOX_CONTAINER_DIV_1_CLASS}
        >
            <div
                className={`${CENTERED_BOX_CONTAINER_DIV_2_CLASS} ${theme.contentBg}`}
            >
                <div
                    className={CENTERED_BOX_CONTAINER_DIV_3_CLASS}
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
    const { theme, sideMenu, isMobileMenuOpen, isWide } = useAppContext();
    if (sideMenu) {
        if (isMobileMenuOpen) {
            return (
                <nav
                    id='navbar-side-menu'
                    className={`${NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_OPEN_CLASS} ${NAVBAR_HEADER_FOR_SIDE_MENU_CLASS} ${theme.secondary} ${theme.text}`}
                >
                    {children}
                </nav>
            );
        }
        if (isWide) {
            return (
                <>
                <nav
                    id='navbar-side-menu'
                    className={`${NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_CLOSE_CLASS} ${NAVBAR_HEADER_FOR_SIDE_MENU_CLASS} ${theme.secondary} ${theme.text}`}
                    >
                    {children}
                </nav>
                <ToggleSideBar
                    onClick={() => document.getElementById('navbar-side-menu').classList.toggle('hidden')}
                    />
            </>);
        }
        return null;
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
    const { sideMenu, isWide } = useAppContext();
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
                    // className={NAVBAR_BRAND_HIDDEN_IF_LARGE_SCREEN}
                    className={isWide ? HIDDEN_CLASS : ""}
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
    /* Header main top menu (center) */
    if (debug) console_debug_log("||||| NavbarTopCenterMenu", children);
    const { sideMenu, isWide } = useAppContext();
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
            id='navbar-top-center-menu'
            className={NAVBAR_TOP_CENTER_MENU_ON_TOP_CLASS + (isWide ? "" : " " + HIDDEN_CLASS)}
        >
            {children}
        </nav>
    );
}

const NavbarTopRightMenu = ({ children }) => {
    /* Header top menu (right side, for buttons like dark mode, menu place, hamburger menu) */
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
    /* Mobile menu close button */
    const { toggleMobileMenu } = useAppContext();
    return (
        <button
            onClick={toggleMobileMenu}
            className={className ?? '' + NAVBAR_MOBILE_CLOSE_BUTTON_CLASS}
        >
            <GsIcons
                icon='x'
                size="sm"
                className={NAVBAR_MOBILE_CLOSE_BUTTON_ICON_CLASS}
            />
        </button>
    );
}

const NavbarMobileMenu = ({ children }) => {
    /* Mobile menu */
    if (debug) console_debug_log("||||| NavbarMobileMenu", children);
    const { theme, isMobileMenuOpen, sideMenu } = useAppContext();
    if (!isMobileMenuOpen || sideMenu) {
        return null;
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
    /* Side mobile menu toggle (appears at top right when horizontal size is small, e.g. mobile devices) */
    if (debug) console_debug_log("||||| NavbarToggle");
    const { toggleMobileMenu, isWide } = useAppContext();
    return (
        <button
            id="navbar-main-toggle"
            onClick={toggleMobileMenu}
            className={NAVBAR_TOGGLE_BUTTON_CLASS + (isWide ? " " + HIDDEN_CLASS : "") }
        >
            <GsIcons
                icon="menu-hamburger"
                size="xl"
                className={NAVBAR_TOGGLE_IMAGE_CLASS}
            />
        </button>
    );
}

const NavbarText = ({ children, className }) => {
    /* Text at the header, e.g. "logged as..." */
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
    /* Header on top for side menu */
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

export const NavDropdown = ({ children, title, id, type, icon, mobileMenuMode }) => {
    const { expandedMenus, toggleSubmenu, theme, isWide } = useAppContext();

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
        top_menu: 'arrow-right-small', // 'arrow-down-small',
        hamburger: 'arrow-right-small', // 'arrow-down-small',
        side_menu: 'arrow-right-small',
        mobile_menu: 'arrow-right-small',
    }

    const variantsTopDiv = {
        top_menu: NAV_DROPDOWN_TOP_DIV_TOP_MENU_CLASS,
        hamburger: mobileMenuMode ? NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS : (NAV_DROPDOWN_TOP_DIV_HAMBURGER_CLASS + (isWide ? "" : " " + HIDDEN_CLASS)),
        side_menu: NAV_DROPDOWN_TOP_DIV_SIDE_MENU_CLASS,
        mobile_menu: NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS,
    };

    const variantsInnerDiv = {
        top_menu: NAV_DROPDOWN_INNER_DIV_TOP_MENU_CLASS,
        hamburger: mobileMenuMode ? NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS : NAV_DROPDOWN_INNER_DIV_HAMBURGER_CLASS,
        side_menu: NAV_DROPDOWN_INNER_DIV_SIDE_MENU_CLASS,
        mobile_menu: NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS,
    };

    const variantsButton = {
        top_menu: `${NAV_DROPDOWN_BUTTON_TOP_MENU_CLASS} ${theme.textHoverTop}`,
        hamburger: `${mobileMenuMode ? NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS : NAV_DROPDOWN_BUTTON_HAMBURGER_CLASS} ${mobileMenuMode ? theme.textHoverSide : theme.textHoverTop}`,
        side_menu: `${NAV_DROPDOWN_BUTTON_SIDE_MENU_CLASS} ${theme.textHoverSide}`,
        mobile_menu: `${NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS} ${theme.textHoverSide}`,
    };

    const variantsSubmenuImage = {
        top_menu: NAV_DROPDOWN_IMAGE_TOP_MENU_CLASS,
        hamburger: mobileMenuMode ? NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS : NAV_DROPDOWN_IMAGE_HAMBURGER_CLASS,
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
    const variantOnClick = variantsOptionClick[type] || (() => (''));

    return (
        <div
            className={variantStyleTopDiv}
        >
            <button
                className={variantStyleButton}
                id={`${fullId}_button`}
                type="button"
                onClick={toggledropDownOpen}
            >
                {(icon ? <GsIcons icon={icon ?? ''} size="2xl" className={NAV_LINK_ICON_CLASS} /> : title)}
                <GsIcons
                    id={`${fullId}_submenu_image`}
                    icon={directionImage}
                    className={variantStyleSubmenuImage}
                />
            </button>
            <div
                className={variantStyleInnerDiv}
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

const NavDropdownItem = ({ children, as, to, onClick, reloadDocument, type, closeParent, mobileMenuMode }) => {
    if (debug) console_debug_log("||||| NavDropdownItem", children);
    const { theme } = useAppContext();
    const As = as;

    const variantsTopDiv = {
        top_menu: NAV_DROPDOWN_ITEM_TOP_DIV_TOP_MENU_CLASS,
        hamburger: mobileMenuMode ? NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS : NAV_DROPDOWN_ITEM_TOP_DIV_HAMBURGER_CLASS,
        side_menu: NAV_DROPDOWN_ITEM_TOP_DIV_SIDE_MENU_CLASS,
        mobile_menu: NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS,
    };

    const variantsButton = {
        top_menu: `${NAV_DROPDOWN_ITEM_BUTTON_TOP_MENU_CLASS} ${theme.textHoverTopSubMenu}`,
        hamburger: `${mobileMenuMode ? NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS : NAV_DROPDOWN_ITEM_BUTTON_HAMBURGER_CLASS} ${mobileMenuMode ? theme.textHoverSide : theme.textHoverTopSubMenu}`,
        side_menu: `${NAV_DROPDOWN_ITEM_BUTTON_SIDE_MENU_CLASS} ${theme.textHoverSide}`,
        mobile_menu: `${NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS} ${theme.textHoverSide}`,
    };

    const variantStyleTopDiv = variantsTopDiv[type] || '';
    const variantStyleButton = variantsButton[type] || '';

    return (
        <div
            className={variantStyleTopDiv}
        >
            {As && (
                <As
                    className={variantStyleButton}
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
                    className={variantStyleButton}
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

const NavLink = ({ children, as, to, onClick, reloadDocument, type, mobileMenuMode }) => {
    if (debug) console_debug_log("||||| NavLink", children);
    const { theme, isWide } = useAppContext();
    const As = as;

    const variantsLi = {
        top_menu: NAV_LINK_TOP_DIV_TOP_MENU_CLASS,
        hamburger: mobileMenuMode ? NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS : (NAV_LINK_TOP_DIV_HAMBURGER_CLASS + (isWide ? "" : " " + HIDDEN_CLASS)),
        side_menu: NAV_LINK_TOP_DIV_SIDE_MENU_CLASS,
        mobile_menu: NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS,
    };
    const variantsButton = {
        top_menu: `${NAV_LINK_BUTTON_TOP_MENU_CLASS}  ${theme.textHoverTop}`,
        hamburger: `${mobileMenuMode ? NAV_LINK_BUTTON_MOBILE_MENU_CLASS : NAV_LINK_BUTTON_HAMBURGER_CLASS} ${mobileMenuMode ? theme.textHoverSide : theme.textHoverTop}`,
        side_menu: `${NAV_LINK_BUTTON_SIDE_MENU_CLASS}  ${theme.textHoverSide}`,
        mobile_menu: `${NAV_LINK_BUTTON_MOBILE_MENU_CLASS}  ${theme.textHoverSide}`,
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

// Buttons


export const ToggleSideBar = ({ onClick, ...props }) => {
    props.className = VERTICALLY_CENTERED_CLASS + " " + TOP0_Z50_CLASS + " " + (props.className ?? '');
    return (
        <div
            onClick={onClick}
            {...props}
        >
            <GsIcons
                icon='vertical-slider'
            />
        </div>
    );
}

export const GsButton = ({ variant = 'primary', className = '', as = null, ...props }) => {
    if (debug) console_debug_log(`||||| GsButton | variant: ${variant} | className: ${className}`, 'props:', props);
    const variants = {
        primary: BUTTON_PRIMARY_CLASS,
        secondary: BUTTON_SECONDARY_CLASS,
    };
    const variantStyle = variants[variant] || '';
    if (as) {
        // https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button
        const As = as;
        if (debug) console.log(`||||| GsButton | As:`, As, ' | props:', props);
        return (
            <As
                to={props.to ?? props.href ?? null}
                className={`${variantStyle} ${className}`}
                {...props}
            />
        );
    }
    return (
        <button
            type={props.type ?? "button"}
            className={`${variantStyle} ${className}`}
            {...props}
        />
    );
};
