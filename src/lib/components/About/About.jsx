import React from 'react'
import { ModalPopUp } from '../../helpers/ModalPopUp.jsx'

export const About = () => {
    return (
        <ModalPopUp
            title='About'
            link={window.location.origin + '/#/about_body'}
            showTitle={false}
        />
    )
}

export const AboutBody = ({children}) => {
    const version = process.env.REACT_APP_VERSION;
    const appName = process.env.REACT_APP_APP_NAME;
    return (
        <div>
            <h1>About {appName}</h1>
            <p>(Version: {(version && version !== '') ? version : "N/A"})</p>
            {children}
        </div>
    )
}
