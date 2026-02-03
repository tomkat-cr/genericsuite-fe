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
    googlePrompt,
}) => {

    if (debug) {
        console_debug_log(`SearchEngineButton | valueElement: ${valueElement} | document.getElementById(valueElement)| ${document.getElementById(valueElement)} | googlePrompt: ${googlePrompt}`);
    }

    const setPrompt = (prompt, valueToReplace) => {
        return prompt.replace("%s", valueToReplace);
    }

    const handleGoogleClick = (e) => {
        e.preventDefault();
        const inputValue = document.getElementById(valueElement).value;
        if (inputValue !== "") {
            const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(setPrompt(googlePrompt, inputValue))}`;
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

export const ChatBotButtonGeneric = ({
    AuxComponent,
    valueElement,
    chatbotPrompt,
}) => {
    if (typeof AuxComponent === "undefined") {
        console_debug_log(`>> ChatBotButtonGeneric | AuxComponent is undefined`);
        return (
            <div
                className={SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS}
            >
                <GsIcons
                    icon="error"
                    alt="Error: AuxComponent is undefined"
                />
            </div>
        );
    }
    try {
        return (
            <div
                className={SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS}
            >
                <AuxComponent
                    valueElement={valueElement}
                    chatbot_prompt={chatbotPrompt}
                />
            </div>
        );
    } catch (error) {
        console_debug_log(`>> ChatBotButtonGeneric | error:`, error, 'editor', editor);
        return (
            <div
                className={SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS}
            >
                <GsIcons
                    icon="error"
                    alt="Error: Internal error"
                />
            </div>
        );
    }
}

