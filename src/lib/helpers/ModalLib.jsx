import React, { useEffect } from 'react';

import { console_debug_log } from '../services/logging.service.jsx';
import { CenteredBoxContainer } from './NavLib.jsx';

// Modal

const debug = false;

export const Button = ({ variant = 'primary', className = '', ...props }) => {
    if (debug) console_debug_log(`||||| Button | variant: ${variant} | className: ${className}`, 'props:', props);

    const baseStyle = 'px-4 py-2 rounded font-semibold focus:outline-none focus:ring-2 focus:ring-opacity-75';
    const variants = {
        primary: 'bg-blue-500 hover:bg-blue-600 text-white focus:ring-blue-400',
        secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-300',
        success: 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400',
        danger: 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400',
    };

    const variantStyle = variants[variant] || variants.primary;

    return (
        <button
            className={`${baseStyle} ${variantStyle} ${className}`}
            {...props}
        />
    );
};
  
export const Modal = ({ show, onHide, children }) => {
    if (debug) console_debug_log(`||||| Modal | show: ${show} | onHide: ${onHide}`, 'children:', children);
 
    useEffect(() => {
        const handleOutsideClick = (event) => {
            // Does not allow close the pop-up if click outside
        };
  
        if (show) {
            document.addEventListener('mousedown', handleOutsideClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [show, onHide]);
  
    if (!show) return null;
  
    return (
        <CenteredBoxContainer>
            {children}
        </CenteredBoxContainer>
    );
};
  
const ModalHeader = ({ children }) => {
    if (debug) console_debug_log(`||||| ModalHeader`, children);
    return (
        <div
            className="flex items-center justify-between pb-3"
        >
            {children}
        </div>
    )
};

const ModalTitle = ({ children }) => {
    if (debug) console_debug_log(`||||| ModalTitle`, children);
    return (
        <>
            <h3
                className="text-xl font-semibold"
            >
                {children}
            </h3>
        </>
    );
};

const ModalBody = ({ children }) => {
    if (debug) console_debug_log(`||||| ModalBody`, children);
    return (
        <div
            className="py-4"
        >
            {children}
        </div>
    );
}

const ModalFooter = ({ children }) => {
    if (debug) console_debug_log(`||||| ModalFooter`, children);
    return (
        <div
            className="flex justify-end pt-2 space-x-2"
        >
            {children}
        </div>
    );

}
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Button = Button;
