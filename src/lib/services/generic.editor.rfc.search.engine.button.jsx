// Search Engine button

import React from 'react';

import { 
    console_debug_log,
} from "./logging.service.jsx";

import { SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS } from '../constants/class_name_constants.jsx';
import { GsIcons } from '../helpers/IconsLib.jsx';

// Does not work:
// import GoogleIcon from "../images/google_logo.svg";

// Does work to use external image:
// import { imageDirectory } from '../constants/general_constants.jsx';
// const googleIcon = "google_logo.svg";

const debug = false;

export const SearchEngineButton = ({
    valueElement,
    google_prompt,
}) => {

    if (debug) {
        console_debug_log(`SearchEngineButton | valueElement: ${valueElement} | document.getElementById(valueElement)| ${document.getElementById(valueElement)} | google_prompt: ${google_prompt}`);
    }

    const setPrompt = (prompt, valueToReplace) => {
        return prompt.replace("%s", valueToReplace);
    }
    
    const handleGoogleClick = (e) => {
        e.preventDefault();
        const inputValue = document.getElementById(valueElement).value;
        if (inputValue !== "") {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(setPrompt(google_prompt, inputValue))}`;
            window.open(googleSearchUrl, '_blank');
        }
    };

    return (
        <>
            <div
                className={SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS}
            >
                <button
                    onClick={handleGoogleClick}
                >
                    {/* <GoogleIcon alt="Open Google Search" /> */}
                    {/* <img src={imageDirectory + googleIcon} alt="Open Google Search" /> */}
                    <GsIcons
                        icon="google-logo"
                        alt="Open Google Search"
                    />
                </button>
            </div>
        </>
    );
};
