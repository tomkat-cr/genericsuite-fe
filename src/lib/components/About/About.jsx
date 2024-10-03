import React from 'react'
import { ModalPopUp } from '../../helpers/ModalPopUp.jsx'
import {
    ALERT_DANGER_CLASS,
    ALERT_SUCCESS_CLASS,
    APP_GENERAL_MARGINS_CLASS,
} from '../../constants/class_name_constants.jsx'

export const About = () => {
    return (
        <ModalPopUp
            title='About'
            link={window.location.origin + '/#/about_body'}
        />
    )
}

export const AboutBody = ({
    children,
}) => {
    const modalPopUpTest = false;
    const version = process.env.REACT_APP_VERSION;
    const appName = process.env.REACT_APP_APP_NAME;
    return (
        <div
            className={APP_GENERAL_MARGINS_CLASS}
        >
            <h1>About {appName}</h1>
            <p>(Version: {(version && version !== '') ? version : "N/A"})</p>
            <br/>
            {children}
            {modalPopUpTest && (
                <ModalPopUp
                    title='Test title'
                    showTitle={true}    
                    // iconClassName={ALERT_DANGER_CLASS}
                    iconClassName={ALERT_SUCCESS_CLASS}
                    primaryButtonMessage={"Login Again"}
                    primaryButtonAction={null}
                    secondButtonMessage={"Retry"}
                    secondButtonAction={null}
                    logoutButton={true}
                >
                    This is a test test test in <i>Italic</i> and <b>boldface</b>
                </ModalPopUp>
            )}
        </div>
    )
}
