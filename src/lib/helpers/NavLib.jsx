import React, { useState } from 'react';

import { console_debug_log } from '../services/logging.service.jsx';

// Containers

const debug = false;

export const MainContainer = ({children}) => {
    if (debug) console_debug_log("||||| MainContainer", children);
    return (
        <div
            // className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none"
            className="z-20 top-0 inset-x-0 flex justify-center overflow-hidden dark:prose-dark"
        >
            <div
                // className="md:flex"
            >
                {children}
            </div>
        </div>
    );
}

export const AppSectionContainer = ({children}) => {
    if (debug) console_debug_log("||||| AppSectionContainer", children);
    return (
        <div
            // className="w-screen bg-gray-300 fyn_jumbotron"
            // className="w-screen bg-gray-300 dark:bg-black flex flex-col flex-start"
            className="w-screen bg-gray-300 dark:bg-black"
            style={{ minHeight: '87vh' }}
        >
            {children}
        </div>
    );
}

export const CenteredBoxContainer = ({children}) => {
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

export const Navbar = ({children, collapseOnSelect, expand}) => {
    if (debug) console_debug_log("||||| Navbar", children);
    return (
        <div
            className='sticky top-0 z-40 w-full backdrop-blur flex-none transition-colors duration-500 lg:z-50 lg:border-b lg:border-slate-900/10 dark:border-slate-50/[0.06] bg-white/95 supports-backdrop-blur:bg-white/60 dark:bg-transparent'
        >
            <div
                className='max-w-8xl mx-auto'
            >
                <div
                    className='py-4 border-b border-slate-900/10 lg:px-8 lg:border-0 dark:border-slate-300/10 mx-4 lg:mx-0'
                >
                    {children}
                </div>
            </div>
        </div>
    );
}

export const NavbarContainer = ({children}) => {
    if (debug) console_debug_log("||||| NavbarContainer", children);
    return (
        <div
            className='relative flex items-center'
        >
            {children}
        </div>
    );
}

const NavbarBrand = ({children, as, to, onClick}) => {
    if (debug) console_debug_log("||||| NavbarBrand", children);
    const As = as;
    return (
        <div
            className='mr-3 flex-none w-[2.0625rem] overflow-hidden md:w-auto'
        >
            <div
                className='text-slate-900 dark:text-white w-auto h-5'
            >
                <As
                    // as={as}
                    to={to}
                    onClick={onClick}
                >
                    {children}
                </As>
            </div>
        </div>
    );
}

const NavbarToggle = ({children}) => {
    if (debug) console_debug_log("||||| NavbarToggle", children);
    return (
        <div
            className=''
        >
            {children}
        </div>
    );
}

const NavbarCollapse = ({children}) => {
    if (debug) console_debug_log("||||| NavbarCollapse", children);
    return (
        <div
            className=''
        >
            {children}
        </div>
    );
}

const NavbarText = ({children}) => {
    if (debug) console_debug_log("||||| NavbarText", children);
    return (
        <div
            className=''
        >
            {children}
        </div>
    );
}

const NavbarOptionsContainer = ({children}) => {
    if (debug) console_debug_log("||||| NavbarOptionsContainer", children);
    return (
        <div
            // className='relative hidden lg:flex items-center ml-auto'
            className='relative lg:flex items-center ml-auto'
        >
            <nav
                className='text-sm leading-6 font-semibold text-slate-700 dark:text-slate-200'
            >
                <ul
                    className='flex space-x-8'
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

export const NavDropdown = ({children, title, id}) => {
    if (debug) console_debug_log(`||||| NavDropdown | id: ${id}`, children);
    const [dropDownOpen, setDropDownOpen] = useState(false);

    const toggledropDownOpen = () => {
        const htmlTag = document.getElementById(`${id}_dropDown`);
        if (dropDownOpen) {
            htmlTag.classList.add('hidden');
        } else {
            htmlTag.classList.remove('hidden');
        }
        setDropDownOpen(!dropDownOpen);
    };

    return (
        <div
            className="relative"
            data-headlessui-state=""
        >
            <button
                className="text-xs leading-5 font-semibold bg-slate-400/10 rounded-full py-1 px-3 flex items-center space-x-2 hover:bg-slate-400/20 dark:highlight-white/5" 
                id={`${id}_button`}
                type="button"
                aria-haspopup="menu"
                aria-expanded="false"
                data-headlessui-state=""
                onClick={toggledropDownOpen}
            >
                {title}
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
            </button>
            <div
                className="hidden absolute top-full mt-1 py-2 w-40 rounded-lg bg-white shadow ring-1 ring-slate-900/5 text-sm leading-6 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:highlight-white/5"
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
                        onClick: (e) => {
                            if (child.props.onClick) {
                                child.props.onClick(e);
                            }
                            if (debug) console_debug_log('LLamo al child y cierra dropdwon');
                            setDropDownOpen(false);
                        }
                    })
                )}
            </div>
        </div>
    );
}

const NavDropdownItem = ({children, as, to, onClick, reloadDocument}) => {
    if (debug) console_debug_log("||||| NavDropdownItem", children);
    const As = as;
    return (
        <div
            className='block px-3 py-1'
        >
            {As && (
                <As
                    // as={as}
                    to={to}
                    onClick={onClick}
                >
                    {children}
                </As>
            )}
            {!As && (
                <button
                    onClick={onClick}
                >
                    {children}
                </button>
            )}
        </div>
    );
}

NavDropdown.Item = NavDropdownItem;

// Nav

export const Nav = ({children}) => {
    if (debug) console_debug_log("||||| Nav", children);
    return (
        <div
            className='relative flex items-center'
        >
            {children}
        </div>
    );
}

const NavLink = ({children, as, to, onClick, reloadDocument}) => {
    if (debug) console_debug_log("||||| NavLink", children);
    const As = as;
    return (
        <li>
            <As
                // as={as}
                to={to}
                onClick={onClick}
                className='p-2 hover:text-sky-500 dark:hover:text-sky-400'
            >
                {children}
            </As>
        </li>
    );
}

Nav.Link = NavLink;
