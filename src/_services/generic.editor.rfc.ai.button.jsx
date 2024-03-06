// generic.editor.rfc.ai.button.js
// AI button
import React, { useState } from 'react';

import { 
    console_debug_log,
} from ".";
import SparkIcon from "../_images/spark.svg";

// import { ChatBot } from '../_components/ChatBot/ChatBot';
let ChatBot;
if (process.env.REACT_APP_GENERIC_SUITE_AI_PATH !== '') {
    ChatBot = require(`${process.env.REACT_APP_GENERIC_SUITE_AI_PATH}/_components/ChatBot`).ChatBot;
};

const debug = true;

const sparkClickOpenWindow = true;

export const ChatBotButton = ({
    valueElement,
    chatbot_prompt,
}) => {
    const [showLLMPopup, setShowLLMPopup] = useState(false);

    if (debug) {
        console_debug_log(`ChatBotButton | valueElement: ${valueElement} | document.getElementById(valueElement)| ${document.getElementById(valueElement)} | chatbot_prompt: ${chatbot_prompt}`);
    }

    const setPrompt = (prompt, valueToReplace) => {
        return prompt.replace("%s", valueToReplace);
    }
    
    const handleSparkClick = (e) => {
        e.preventDefault();
        const inputValue = document.getElementById(valueElement).value;
        if (inputValue !== "") {
            if (sparkClickOpenWindow) {
                window.open(
                    window.location.origin + '/#/chatbot?menu=0&ssb=0&q=' + setPrompt(chatbot_prompt, inputValue),
                    'AppChatbotPopUp',
                    'height=600,width=400'
                );
            } else {
                setShowLLMPopup(!showLLMPopup);
            }
        }
    };

    return (
        <>
            <div
                className="align-middle flex"
            >
                <div className='ml-2'>
                    <button
                        onClick={handleSparkClick}
                    >
                        <img src={SparkIcon} alt="Open AI Chat" />
                    </button>
                </div>
            </div>
            {showLLMPopup && (
                <div className="mt-5">
                    <div className="llm-popup">
                        <ChatBot
                            userQuestion={setPrompt(chatbot_prompt, document.getElementById(valueElement).value)}
                            showSideBar={false}
                        />
                    </div>
                </div>
            )}
        </>
    );
};

