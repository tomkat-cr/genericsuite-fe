import React from 'react'
import { AboutBody } from "./About.jsx";
import { console_debug_log } from '../../services/logging.service.jsx';

const debug = false;

export const AboutBodyGsFe = () => {
    if (debug) console_debug_log('>>>> genericsuite-fe AboutBodyGsFe <<<<');
    return (
        <AboutBody>
            <>
                <p>
                    Welcome to <b>GenericSuite</b> (React version for Frontends), a comprehensive software solution designed to enhance your productivity and streamline your workflows.
                </p>
                <br/>
                <p>
                    This repository contains the frontend BASE part of GenericSuite, equipped with a customizable CRUD editor, login interface and a suite of tools to kickstart your development process.
                </p>
                <br/>
                <p>
                    2024-03-11 | Carlos J. Ramirez
                </p>
            </>
        </AboutBody>
    )
}

