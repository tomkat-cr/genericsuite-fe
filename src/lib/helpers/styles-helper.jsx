import React, { useState } from 'react';

// Container

export const MainContainer = ({children}) => {
    console.log("||||| MainContainer", children);
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
    console.log("||||| AppSectionContainer", children);
    return (
        <div
        // className="w-screen bg-gray-300 fyn_jumbotron"
            className="w-screen bg-gray-300 dark:bg-black"
            // style={{ minHeight: '88vh' }}
        >
            {children}
        </div>
    );
}

// NavBar

export const Navbar = ({children, collapseOnSelect, expand}) => {
    console.log("||||| Navbar", children);
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
    console.log("||||| NavbarContainer", children);
    return (
        <div
            className='relative flex items-center'
        >
            {children}
        </div>
    );
}

const NavbarBrand = ({children, as, to, onClick}) => {
    console.log("||||| NavbarBrand", children);
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
    console.log("||||| NavbarToggle", children);
    return (
        <div
            className=''
        >
            {children}
        </div>
    );
}

const NavbarCollapse = ({children}) => {
    console.log("||||| NavbarCollapse", children);
    return (
        <div
            className=''
        >
            {children}
        </div>
    );
}

const NavbarText = ({children}) => {
    console.log("||||| NavbarText", children);
    return (
        <div
            className=''
        >
            {children}
        </div>
    );
}

const NavbarOptionsContainer = ({children}) => {
    console.log("||||| NavbarOptionsContainer", children);
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

export const NavDropdown = ({children, title, id}) => {
    console.log(`||||| NavDropdown | id: ${id}`, children);
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
                {children}
            </div>


            {/* <div
                className="absolute top-full mt-1 py-2 w-40 rounded-lg bg-white shadow ring-1 ring-slate-900/5 text-sm leading-6 font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:highlight-white/5"
                aria-labelledby="headlessui-menu-button-:Rqcr6:"
                id="headlessui-menu-items-:R1acr6:"
                role="menu"
                tabIndex="0"
                data-headlessui-state="open"
                data-open=""
                style="--button-width: 74.296875px;"
            >
                    <span
                        class="flex items-center justify-between px-3 py-1 text-sky-500 dark:text-sky-400"
                        id="headlessui-menu-item-:r30:"
                        role="menuitem"
                        aria-disabled="true"
                        data-headlessui-state="disabled"
                        data-disabled=""
                    >
                        v3.4.9
                        <svg width="24" height="24" fill="none" aria-hidden="true"><path d="m7.75 12.75 2.25 2.5 6.25-6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" stroke-linejoin="round"></path>
                        </svg>
                    </span>
                    <a 
                        href="https://v2.tailwindcss.com"
                        class="block px-3 py-1"
                        id="headlessui-menu-item-:r31:"
                        role="menuitem"
                        tabIndex="-1"
                        data-headlessui-state=""
                    >
                        v2.2.19
                    </a>
                    <a 
                        href="https://v1.tailwindcss.com"
                        class="block px-3 py-1"
                        id="headlessui-menu-item-:r32:"
                        role="menuitem"
                        tabIndex="-1"
                        data-headlessui-state=""
                    >
                        v1.9.6
                    </a>
                    <a 
                        href="https://tailwindcss-v0.netlify.app/"
                        class="block px-3 py-1"
                        id="headlessui-menu-item-:r33:"
                        role="menuitem"
                        tabIndex="-1"
                        data-headlessui-state=""
                    >
                        v0.7.4
                    </a>
            </div> */}



        </div>
    );
}

const NavDropdownItem = ({children, as, to, onClick, reloadDocument}) => {
    console.log("||||| NavDropdownItem", children);
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

export const Nav = ({children}) => {
    console.log("||||| Nav", children);
    return (
        <div
            className='relative flex items-center'
        >
            {children}
        </div>
    );
}

const NavLink = ({children, as, to, onClick, reloadDocument}) => {
    console.log("||||| NavLink", children);
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

// Button

export const Button = ({children, as, to, onClick}) => {
    console.log("||||| Button", children);
    const As = as;
    if (As) {
        return (
            <As
                // as={as}
                to={to}
                onClick={onClick}
            >
                {children}
            </As>
        );
    }
    return (
        <button
            onClick={onClick}
        >
            {children}
        </button>
    );
}

// Modal

// google: react functional components how to create a component subcomponent
// Create react subcomponents in a simple way!
// https://dev.to/hey_yogini/create-react-subcomponents-in-a-simple-way-5h1f

export const Modal = ({children}) => {
    console.log("||||| Modal", children);
    return (
        <div
            className=''
        >
            {children}
        </div>
    );
}

const ModalHeader = ({children}) => {
    console.log("||||| ModalHeader", children);
    return (
        <div
            className=''
        >
            {children}
        </div>
    );
}

const ModalFooter = ({children}) => {
    console.log("||||| ModalFooter", children);
    return (
        <div
            className=''
        >
            {children}
        </div>
    );
}

const ModalTitle = ({children}) => {
    console.log("||||| ModalTitle", children);
    return (
        <div
            className=''
        >
            {children}
        </div>
    );
}

const ModalBody = ({children}) => {
    console.log("||||| ModalBody", children);
    return (
        <>
            {children}
        </>
    );
}

Modal.Header = ModalHeader;
Modal.Footer = ModalFooter;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
