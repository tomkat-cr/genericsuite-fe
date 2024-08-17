import React, { useState } from 'react';
// import { Button, Modal } from 'react-bootstrap';
import { Button, Modal } from './ModalLib.jsx';

// import { getPrefix } from '../../helpers';
import { console_debug_log } from '../services/logging.service.jsx';

import { BUTTON_PRIMARY_CLASS } from '../constants/class_name_constants.jsx';

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
}) => {
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
            <Modal show={show} onHide={handleOnHide}>
                {title && showTitle &&
                    (
                        <Modal.Header closeButton>
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
                <Modal.Footer>
                    {closeButtonMessage && (
                        <DefaultButtonModal
                            variant="secondary"
                            action={() => closeButtonAction ? closeButtonAction() : handleClose()}
                        >
                            {closeButtonMessage}
                        </DefaultButtonModal>
                    )}
                    {secondButtonMessage && (
                        <DefaultButtonModal
                            variant="secondary"
                            action={secondButtonAction} 
                        >
                            {secondButtonMessage}
                        </DefaultButtonModal>

                    )}
                    {primaryButtonMessage && logoutButton && (
                        <LogoutNavigate
                            variant="primary"
                            action={primaryButtonAction} 
                        >
                            {primaryButtonMessage}
                        </LogoutNavigate>
                    )}
                    {primaryButtonMessage && !logoutButton && (
                        <DefaultButtonModal
                            variant="primary"
                            action={primaryButtonAction} 
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
}) => {
    if (debug) {
        console_debug_log(`LogoutNavigate`);
    }
    return (
        <a
            variant={variant}
            className={BUTTON_PRIMARY_CLASS}
            // href={getPrefix(true)+'/login'}
            href={'/#/login'}
        >
            {children}
        </a>
    )
}
