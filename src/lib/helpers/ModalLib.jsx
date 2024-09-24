import React, { useEffect } from 'react';

import { console_debug_log } from '../services/logging.service.jsx';
import { CenteredBoxContainer, GsButton } from './NavLib.jsx';
import {
    MODALIB_MODAL_DIV_1_CLASS,
    MODALIB_BUTTON_BASESTYLE_CLASS,
    MODALIB_BUTTON_PRIMARY_CLASS,
    MODALIB_BUTTON_SECONDARY_CLASS,
    MODALIB_BUTTON_SUCCESS_CLASS,
    MODALIB_BUTTON_DANGER_CLASS,
    MODALIB_MODAL_HEADER_CLASS,
    MODALIB_MODAL_TITLE_CLASS,
    MODALIB_MODAL_BODY_CLASS,
    MODALIB_MODAL_FOOTER_CLASS,
    ALERT_DANGER_CLASS,
    MODALIB_MODAL_ICON_1_CLASS,
    MODALIB_MODAL_ICON_2_CLASS,
    MODALIB_MODAL_ICON_3_CLASS,
    MODALIB_MODAL_DIV_2_CLASS,
    MODALIB_MODAL_DIV_3_CLASS,
    MODALIB_MODAL_FOOTER_WIDE_CLASS,
    MODALIB_MODAL_FOOTER_NOT_WIDE_CLASS,
    MODALIB_BUTTON_BASESTYLE_NOT_WIDE_CLASS,
    MODALIB_BUTTON_BASESTYLE_WIDE_CLASS,
} from '../constants/class_name_constants.jsx';
import { GsIcons } from './IconsLib.jsx';

// Modal

const debug = false;

export const Button = ({ isWide, variant = 'primary', className = '', ...props }) => {
    if (debug) console_debug_log(`||||| Button | variant: ${variant} | className: ${className}`, 'props:', props);

    const baseStyle = MODALIB_BUTTON_BASESTYLE_CLASS + " " + (isWide ? MODALIB_BUTTON_BASESTYLE_WIDE_CLASS : MODALIB_BUTTON_BASESTYLE_NOT_WIDE_CLASS);
    const variants = {
        primary: MODALIB_BUTTON_PRIMARY_CLASS,
        secondary: MODALIB_BUTTON_SECONDARY_CLASS,
        success: MODALIB_BUTTON_SUCCESS_CLASS,
        danger: MODALIB_BUTTON_DANGER_CLASS,
    };
    const variantStyle = variants[variant] || variants.primary;
    return (
        <GsButton
            variant=""
            className={`${baseStyle} ${variantStyle} ${className}`}
            {...props}
        />
    );
};
  
export const Modal = ({ show, onHide, className, children }) => {
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
            className={MODALIB_MODAL_DIV_1_CLASS}
            role="dialog"
            aria-modal="true"
        >
            <div
                className={MODALIB_MODAL_DIV_2_CLASS}
            >
                <div
                    className={MODALIB_MODAL_DIV_3_CLASS}
                >
                    {children}
                </div>
            </div>
        </div>
    );

};

const ModalHeader = ({ children }) => {
    if (debug) console_debug_log(`||||| ModalHeader`, children);
    // if MODALIB_MODAL_HEADER_CLASS has no spaces or is empty, means it has no styling...
    if (MODALIB_MODAL_HEADER_CLASS === '' || MODALIB_MODAL_HEADER_CLASS.indexOf(' ') === -1) {
        return (
            <>
                {children}
            </>
        );
    }
    return (
        <div
            className={MODALIB_MODAL_HEADER_CLASS}
        >
            {children}
        </div>
    )
};

const ModalIcon = ({ children, iconClassName }) => {
    if (debug) console_debug_log(`||||| ModalIcon | iconClassName: ${iconClassName}`, 'children:', children);
    if (!iconClassName) {
        return null;
    }
    return (
        <div
            className={MODALIB_MODAL_ICON_1_CLASS}
        >
            <div
                className={(iconClassName ?? '') + " " + MODALIB_MODAL_ICON_2_CLASS}
            >
                <GsIcons
                    icon={iconClassName === ALERT_DANGER_CLASS ? "warning-sign" : "checked-sign"}
                    className={MODALIB_MODAL_ICON_3_CLASS}
                />
            </div>
        </div>
    );
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

const ModalFooter = ({ children, isWide }) => {
    if (debug) console_debug_log(`||||| ModalFooter`, children);
    return (
        <div
            className={`${MODALIB_MODAL_FOOTER_CLASS} ${isWide ? MODALIB_MODAL_FOOTER_WIDE_CLASS : MODALIB_MODAL_FOOTER_NOT_WIDE_CLASS}`}
        >
            {children}
        </div>
    );
}

Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Icon = ModalIcon;
Modal.Button = Button;
