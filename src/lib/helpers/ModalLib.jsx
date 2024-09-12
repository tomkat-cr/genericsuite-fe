import React, { useEffect } from 'react';

import { console_debug_log } from '../services/logging.service.jsx';

import {
    POPUP_TOP_MARGIN_CLASS,
    MODALIB_BUTTON_BASESTYLE_CLASS,
    MODALIB_BUTTON_PRIMARY_CLASS,
    MODALIB_BUTTON_SECONDARY_CLASS,
    MODALIB_BUTTON_SUCCESS_CLASS,
    MODALIB_BUTTON_DANGER_CLASS,
    MODALIB_MODAL_HEADER_CLASS,
    MODALIB_MODAL_TITLE_CLASS,
    MODALIB_MODAL_BODY_CLASS,
    MODALIB_MODAL_FOOTER_CLASS,
} from '../constants/class_name_constants.jsx';
import { CenteredBoxContainer } from './NavLib.jsx';

// Modal

const debug = false;

export const Button = ({ variant = 'primary', className = '', ...props }) => {
    if (debug) console_debug_log(`||||| Button | variant: ${variant} | className: ${className}`, 'props:', props);

    const baseStyle = MODALIB_BUTTON_BASESTYLE_CLASS;
    const variants = {
        primary: MODALIB_BUTTON_PRIMARY_CLASS,
        secondary: MODALIB_BUTTON_SECONDARY_CLASS,
        success: MODALIB_BUTTON_SUCCESS_CLASS,
        danger: MODALIB_BUTTON_DANGER_CLASS,
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
        <div
            className={POPUP_TOP_MARGIN_CLASS}
        >
            <CenteredBoxContainer>
                {children}
            </CenteredBoxContainer>
        </div>
    );
};
  
const ModalHeader = ({ children }) => {
    if (debug) console_debug_log(`||||| ModalHeader`, children);
    return (
        <div
            className={MODALIB_MODAL_HEADER_CLASS}
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
                className={MODALIB_MODAL_TITLE_CLASS}
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
            className={MODALIB_MODAL_BODY_CLASS}
        >
            {children}
        </div>
    );
}

const ModalFooter = ({ children }) => {
    if (debug) console_debug_log(`||||| ModalFooter`, children);
    return (
        <div
            className={MODALIB_MODAL_FOOTER_CLASS}
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
