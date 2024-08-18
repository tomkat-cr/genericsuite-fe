import React, { useState } from 'react';

import { console_debug_log } from '../services/logging.service.jsx';

// Containers

const debug = false;

export const MainContainer = ({ children }) => {
    if (debug) console_debug_log("||||| MainContainer", children);
    return (
        <div
            // className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none"
            // className="z-20 top-0 inset-x-0 flex justify-center overflow-hidden dark:prose-dark"
            className="z-20 top-0 inset-x-0 flex justify-center overflow-x-auto dark:prose-dark"
        >
            <div
                // className="md:flex"
            >
                {children}
            </div>
        </div>
    );
}

export const AppSectionContainer = ({ children }) => {
    if (debug) console_debug_log("||||| AppSectionContainer", children);
    return (
        <div
            // className="w-screen bg-gray-300 fyn_jumbotron"
            // className="w-screen bg-gray-300 dark:bg-black flex flex-col flex-start"
            className="w-screen bg-gray-300 dark:bg-black min-h-[87vh]"
            // style={{ minHeight: '87vh' }}
        >
            {children}
        </div>
    );
}

export const CenteredBoxContainer = ({ children }) => {
    if (debug) console_debug_log("||||| CenterdBoxContainer", children);
    return (
        <div
            // className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex"
            className="z-50 overflow-auto"
        >
            <div
                // className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg"
                className="relative bg-white w-fit max-w-md m-auto flex-col flex rounded-lg"
            >
                <div
                    // className="flex flex-col h-full"
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
    if (debug) console_debug_log("||||| Navbar", children);
    return (
        <div
            className='sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent'
        >
            <div
                className='max-w-8xl mx-auto'
            >
                <div
                    className='py-1 border-b border-slate-900/10 lg:px-2 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0'
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export const NavbarContainer = ({ children }) => {
    if (debug) console_debug_log("||||| NavbarContainer", children);
    return (
        <div
            // className='relative flex items-center'
            // className="flex flex-wrap items-center justify-between"
            className="flex flex-wrap items-center justify-between"
        >
            {children}
        </div>
    );
}

const NavbarBrand = ({ children, as, to, onClick }) => {
    if (debug) console_debug_log("||||| NavbarBrand", children);
    const As = as;
    return (
        <div
            className="inline-block py-1.5 mr-4 text-xl whitespace-nowrap hover:no-underline focus:no-underline"
        >
            <As
                // as={as}
                to={to}
                onClick={onClick}
            >
                {children}
            </As>
        </div>
    );
}

const NavbarToggle = ({ children, className }) => {
    if (debug) console_debug_log("||||| NavbarToggle", children);
    return (
        <div
            className={className ?? ''}
        >
            {children}
        </div>
    );
}

const NavbarCollapse = ({ children, className }) => {
    if (debug) console_debug_log("||||| NavbarCollapse", children);
    return (
        <div
            className={className ?? ''}
        >
            {children}
        </div>
    );
}

const NavbarText = ({ children, className }) => {
    if (debug) console_debug_log("||||| NavbarText", children);
    return (
        <div
            className={className ?? 'flex items-center'}
        >
            {children}
        </div>
    );
}

const NavbarOptionsContainer = ({ children }) => {
    if (debug) console_debug_log("||||| NavbarOptionsContainer", children);
    return (
        <div
            // className='relative hidden lg:flex items-center ml-auto'
            className='relative lg:flex items-center'
        >
            <nav
                className='text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200'
            >
                <ul
                    className='flex items-center space-x-4'
                >
                    {children}
                </ul>
            </nav>
        </div>
    );
}

Navbar.Brand = NavbarBrand;
Navbar.Toggle = NavbarToggle;
Navbar.Collapse = NavbarCollapse;
Navbar.Text = NavbarText;
Navbar.Container = NavbarContainer;
Navbar.OptionsContainer = NavbarOptionsContainer;

// NavDropdown

export const NavDropdown = ({ children, title, id, type }) => {
    const debug = true;

    if (debug) console_debug_log(`||||| NavDropdown | id: ${id}`, children);
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const toggledropDownOpen = () => {
        const element = document.getElementById(`${id}_dropDown`);
        if (dropDownOpen) {
            element.classList.add('hidden');
        } else {
            element.classList.remove('hidden');
        }
        if (debug) console_debug_log(`>>--> NavDropdown | toggledropDownOpen | element: ${id}_dropDown | previous dropDownOpen: ${dropDownOpen}`);
        setDropDownOpen(!dropDownOpen);
    };

    const downArrowImage = (
        <svg
            width="6"
            height="3"
            className="ml-2 overflow-visible"
            aria-hidden="true"
        >
            <path
                d="M0 0L3 3L6 0"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            >
            </path>
        </svg>
    );

    const rightArrowImage = (
        <svg
            width="3"
            height="6"
            className="ml-2 overflow-visible"
            aria-hidden="true"
        >
            <path
                d="M0 0L3 3L0 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
            >
            </path>
        </svg>
    );

    const variantsDirectionImage = {
        top_menu: downArrowImage,
        hamburger: downArrowImage,
        side_menu: rightArrowImage,
    }

    const variantsTopDiv = {
        top_menu: 'relative',
        hamburger: 'relative',
        side_menu: 'relative',
    };

    const variantsInnerDiv = {
        top_menu: 'hidden absolute top-full mt-1 py-2 w-40 rounded-lg bg-white shadow ring-1 ring-slate-900/5 text-sm leading-6 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:highlight-white/5',
        hamburger: 'hidden absolute top-full mt-1 py-2 w-40 rounded-lg bg-white shadow ring-1 ring-slate-900/5 text-sm leading-6 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:highlight-white/5',
        side_menu: '',
    };

    const variantsButton = {
        top_menu: 'text-sm leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5',
        hamburger: 'text-sm leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5',
        side_menu: 'text-sm leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5',
    };

    const directionImage = variantsDirectionImage[type] || variantsDirectionImage.top_menu;
    const variantStyleTopDiv = variantsTopDiv[type] || variantsTopDiv.top_menu;
    const variantStyleInnerDiv = variantsInnerDiv[type] || variantsInnerDiv.top_menu;
    const variantStyleButton = variantsButton[type] || variantsButton.top_menu;

    return (
        <div
            className={variantStyleTopDiv}
            data-headlessui-state=""
        >
            <button
                className={variantStyleButton} 
                id={`${id}_button`}
                type="button"
                aria-haspopup="menu"
                aria-expanded="false"
                data-headlessui-state=""
                onClick={toggledropDownOpen}
            >
                {title}
                {directionImage}
            </button>
            <div
                className={variantStyleInnerDiv}
                aria-labelledby="headlessui-menu-button-:Rqcr6:"
                role="menu"
                tabIndex="0"
                data-headlessui-state="open"
                data-open=""
                // style="--button-width: 74.296875px;"
                id={`${id}_dropDown`}
            >
                {React.Children.map(children, child => 
                    React.cloneElement(child, {
                        closeParent: () => toggledropDownOpen(),
                    })
                )}
            </div>
        </div>
    );
}

const NavDropdownItem = ({ children, as, to, onClick, reloadDocument, type, closeParent }) => {
    if (debug) console_debug_log("||||| NavDropdownItem", children);
    const As = as;

    const variantsTopDiv = {
        top_menu: 'block px-3 py-1',
        hamburger: 'block px-3 py-1',
        side_menu: 'block px-8 py-1',
    };

    const variantStyleTopDiv = variantsTopDiv[type] || variantsTopDiv.top_menu;

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
            className="h-8 w-1.5 rounded-full bg-slate-400 mr-2 ml-2"
            onClick={onClick}
        />
    );
}

export const Nav = ({ type, id, children }) => {
    const [visible, setVisible] = useState(false);
    if (debug) console_debug_log("||||| Nav", children);

    if (!id) {
        id = 'nav_' + Math.random().toString(36).substr(2, 9);
    }
    
    const togleVisibility = () => {
        const idName = `${id}_side_menu`;
        if (!visible) {
            document.getElementById(idName).classList.add('hidden');
        } else {
            document.getElementById(idName).classList.remove('hidden');
        }
        console_debug_log(`togleVisibility | idName: ${idName} | visible: ${visible}`);
        setVisible(!visible);
    }

    const variantsTopDiv = {
        top_menu: '',
        hamburger: '',
        side_menu: 'h-full flex items-center',
    };

    const variantsInnerDiv = {
        top_menu: 'flex flex-col pl-0 mb-0 list-none',
        top_menu: 'relative flex items-center',
        hamburger: 'relative flex items-center',
        // side_menu: 'top-0 left-0 h-full w-64 shadow-lg flex flex-col overflow-y-auto bg-white dark:bg-gray-800',
        side_menu: 'top-0 left-0 h-full w-64 shadow-lg flex flex-col overflow-y-auto bg-white dark:bg-gray-800',
    };

    const variantStyleTopDiv = variantsTopDiv[type] || variantsTopDiv.top_menu;
    const variantStyleInnerDiv = variantsInnerDiv[type] || variantsInnerDiv.top_menu;

    return (
        <div
            className={variantStyleTopDiv}
        >
            <div
                className={variantStyleInnerDiv}
                id={`${id}_side_menu`}
            >
                {children}
            </div>
            {type === 'side_menu' && (
                <ToggleSideBar
                    id={`${id}_toggle`}
                    className='flex items-center justify-center'
                    onClick={togleVisibility}
                />
            )}
        </div>
    );
}

const NavLink = ({ children, as, to, onClick, reloadDocument, type }) => {
    if (debug) console_debug_log("||||| NavLink", children);
    const As = as;

    const variantsLi = {
        top_menu: 'p-1 list-none',
        hamburger: 'p-1 list-none',
        side_menu: 'p-1 list-none',
    };

    const variantsButton = {
        top_menu: 'p-2 hover:text-sky-500 dark:hover:text-sky-400',
        hamburger: 'p-2 hover:text-sky-500 dark:hover:text-sky-400',
        side_menu: 'p-2 hover:text-sky-500 dark:hover:text-sky-400',
    };

    const variantStyleLi = variantsLi[type] || variantsLi.top_menu;
    const variantStyleButton = variantsButton[type] || variantsButton.top_menu;

    return (
        <li
            className={variantStyleLi}
        >
            <As
                to={to}
                // onClick={onClick}
                className={variantStyleButton}
            >
                {children}
            </As>
        </li>
    );
}

Nav.Link = NavLink;
