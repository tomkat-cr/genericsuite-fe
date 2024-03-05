// generic.editor.rfc.search.engine.button.js
// Search Engine button
import React from 'react';

import { 
    console_debug_log,
} from ".";

import GoogleIcon from "../_images/google_logo.svg";

const debug = true;

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
            <div className='ml-2'>
                <button
                    onClick={handleGoogleClick}
                >
                    <img src={GoogleIcon} alt="Open Google Search" />
                </button>
            </div>
        </>
    );
};
