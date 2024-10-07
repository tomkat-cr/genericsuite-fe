import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Modal } from './ModalLib.jsx';

import { getPrefix, getUrlForRouter } from '../helpers/history.jsx';
import { console_debug_log } from '../services/logging.service.jsx';

import { BUTTON_PRIMARY_CLASS } from '../constants/class_name_constants.jsx';
import { resizeManager, isWindowWide } from './ui.jsx';
import { useAppContext } from './AppContext.jsx';

const debug = false;

export const ModalPopUp = ({
    title=null,
    children,
    closeButtonMessage = "Close",
    closeButtonAction = null,
    primaryButtonMessage = null,
    primaryButtonAction = null,
    secondButtonMessage = null,
    secondButtonAction = null,
    logoutButton = false,
    allowOnHide = true,
    link = null,
    showTitle = true,
    htmlContent = null,
    htmlContentClass = null,
    iconClassName = null,
}) => {
    const { isWide } = useAppContext();
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleOnHide = () => setShow(!allowOnHide);

    const linkSuffix = "?menu=0";

    if (debug) {
        console_debug_log("ModalPopUp enters... | link:", link);
    }

    // const handleShow = () => setShow(true);
    // {
    //     <Button variant="primary" onClick={handleShow}>
    //         Open Modal
    //     </Button>
    // }

    return (
        <>
            <Modal
                show={show}
                onHide={handleOnHide}
            >
                {(iconClassName || title) && showTitle &&
                    (
                        <Modal.Header closeButton>
                            <Modal.Icon
                                iconClassName={iconClassName}
                            />
                            <Modal.Title>{title}</Modal.Title>
                        </Modal.Header>
                    )
                }
                <Modal.Body>
                    {link && (
                        <iframe
                            src={link+linkSuffix}
                            style={{width:'100%',height:'400px'}}
                            title={title}
                        />)
                    }
                    {!link && htmlContent === null && children}
                    {!link && htmlContent !== null &&
                        <>
                            <div
                                className={htmlContentClass}
                                // dangerouslySetInnerHTML={{ __html: htmlContent }}
                            >
                                {htmlContent}
                            </div>
                        </>
                    }
                </Modal.Body>
                <Modal.Footer
                    isWide={isWide}
                >
                    {closeButtonMessage && (
                        <DefaultButtonModal
                            variant="secondary"
                            action={() => closeButtonAction ? closeButtonAction() : handleClose()}
                            isWide={isWide}
                        >
                            {closeButtonMessage}
                        </DefaultButtonModal>
                    )}
                    {secondButtonMessage && (
                        <DefaultButtonModal
                            variant="secondary"
                            action={secondButtonAction} 
                            isWide={isWide}
                        >
                            {secondButtonMessage}
                        </DefaultButtonModal>
                    )}
                    {primaryButtonMessage && logoutButton && (
                        <LogoutNavigate
                            variant="primary"
                            action={primaryButtonAction} 
                            isWide={isWide}
                        >
                            {primaryButtonMessage}
                        </LogoutNavigate>
                    )}
                    {primaryButtonMessage && !logoutButton && (
                        <DefaultButtonModal
                            variant="primary"
                            action={primaryButtonAction} 
                            isWide={isWide}
                        >
                            {primaryButtonMessage}
                        </DefaultButtonModal>
                    )}
                </Modal.Footer>
            </Modal>
        </>
    );
}

export const DefaultButtonModal = ({
    children,
    variant,
    action,
}) => {
    if (debug) {
        console_debug_log(`DefaultButtonModal`);
    }
    return (
        <Button
            variant={variant}
            onClick={() => action ? action() : null} 
        >
            {children}
        </Button>
    )
}

export const LogoutNavigate = ({
    children,
    variant,
    asAhref = false,
}) => {
    if (debug) {
        console_debug_log(`LogoutNavigate`);
    }
    if (asAhref) {
        return (
            <a
                variant={variant}
                className={BUTTON_PRIMARY_CLASS}
                href={getUrlForRouter('/login')}
            >
                {children}
            </a>
        )
    }
    // Aria reference:
    // https://www.w3.org/TR/wai-aria-1.2/#aria-details
    return (
        <Button
            aria-details="ModalLib | LogoutNavigate"
            as={Link}
            variant={variant}
            to={getPrefix()+'/login'}
        >
            {children}
        </Button>
    );
}
