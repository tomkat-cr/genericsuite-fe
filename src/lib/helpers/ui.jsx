import React from 'react';
import { console_debug_log } from '../services/logging.service';
import { randomKey } from '../services/ramdomize';

const debug = false;

const textareaMinHeightDefault = 40;

export const toggleIdVisibility = (onOff, ids) => {
    ids.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.style.display = onOff === 'on' ? '' : 'none';
        }
    });
};


export const getElementWithErrorHandling = (elementId) => {
    try {
        const elementObj = document.getElementById(elementId);
        return elementObj;
    } catch (error) {
        // Element not found or stil loading...            
        return null;
    }
}

export const growUpTextAreaInner = (
    textAreaId,
    conversationBlockId,
    sectionViewportHeight,
    maxOffsetHeight,
    textareaMinHeight = textareaMinHeightDefault,
) => {
    const textarea = getElementWithErrorHandling(textAreaId);
    if (textarea) {
        // Grow upwards
        // Adjust the height of the textarea to grow as the user types
        textarea.style.height = 'auto';     
        textarea.style.height = textarea.scrollHeight + 'px';
        // If the content goes beyond its height, adjust the scroll to grow upwards
        const conversationObj = document.getElementById(conversationBlockId);
        // Calculate the height based on the viewport height (82vh, ".conversation-block.height" in FynBot.css)
        const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
        // Ensure the textarea does not exceed its max-height...
        if (textarea.scrollHeight > (maxOffsetHeight)) {
            textarea.style.height = `${maxOffsetHeight}px`;
        }
        // Set conversation height to make textarea to scroll up according its height
        const sectionViewportHeightInPx = (sectionViewportHeight / 100) * viewportHeight;
        const conversationHeight = sectionViewportHeightInPx - textarea.clientHeight + textareaMinHeight;
        conversationObj.style.height = `${conversationHeight}px`;
        if (debug) {
            console_debug_log(`growUpTextAreaInner | (par) sectionViewportHeight: ${sectionViewportHeight} | sectionViewportHeightInPx: ${sectionViewportHeightInPx} | (var) conversationHeight: ${conversationHeight} | conversationObj.style.height: ${conversationObj.style.height} | textarea.scrollHeight: ${textarea.scrollHeight} | textarea.clientHeight: ${textarea.clientHeight} | viewportHeight: ${viewportHeight}`);
        }
    }
}

export const growUpTextArea = (
    textAreaId,
    conversationBlockId,
    sectionViewportHeight,
    maxOffsetHeight,
    textareaMinHeight = textareaMinHeightDefault,
) => {
    const textarea = getElementWithErrorHandling(textAreaId);
    if (textarea) {
        textarea.addEventListener('input', event => growUpTextAreaInner(
            textAreaId,
            conversationBlockId,
            sectionViewportHeight,
            maxOffsetHeight,
            textareaMinHeight
        ));
    }
}

export const resetTextArea = (
    textAreaId,
    conversationBlockId,
    sectionViewportHeight,
    maxOffsetHeight,
    textareaMinHeight = textareaMinHeightDefault,
) => {
    const textarea = getElementWithErrorHandling(textAreaId);
    if (textarea) {
        if (debug) console_debug_log(`resetTextArea | textAreaId: ${textAreaId} | value: ${textarea.value}`);
        growUpTextAreaInner(
            textAreaId,
            conversationBlockId,
            sectionViewportHeight,
            maxOffsetHeight,
            textareaMinHeight
        );
    }
}

export const LinkifyText = ({ children }) => {
    // Detect links in the text.
    // Example: [Carlos Jose Ramirez Divo - Sitio web oficial](https://www.carlosjramirez.com/en/about-carlos-jose-ramirez-divo/)

    const regex = /\[[^\]]+\]\([^)]+\)/g;
    const matches = children.match(regex);

    const links = (!matches ? [] : matches.map((match) => {
        const title = match.substring(1, match.indexOf(']'));
        const url = match.substring(match.indexOf('(') + 1, match.length - 1);

        return (
            <a key={url} href={url} target="_blank" rel="noopener noreferrer">
                {title}
            </a>
        );
    }));

    const formattedText = children.split(regex).reduce((acc, textChunk, index) => {
        if (index === 0) {
            return [textChunk];
        }
        acc.push(links[index - 1]);
        acc.push(textChunk);
        return acc;
    }, []);

    return (
        <div>
            {formattedText.map((chunck, index) => {
                if (typeof chunck !== 'string') {
                    return chunck;
                }
                return chunck.split('\n').map((line, index) => {
                    return (
                        <p key={randomKey()}>
                            {line}
                        </p>
                    );
                });
            })}
        </div>
    );
};

export const CopyButton = ({ text }) => {
    return (
        <>
            <button
                id="copyButton"
                style={{
                    position: 'absolute',
                    top: '10px',
                    right: '20px',
                    padding: '3px',
                    borderRadius: '5px',
                    border: 'none',
                    background: 'grey',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '12px'
                }}
                onClick={(e) => {
                    navigator.clipboard.writeText(text);
                    const copiedMessage = document.createElement('div');
                    copiedMessage.textContent = 'Copied!';
                    copiedMessage.style.position = 'absolute';
                    copiedMessage.style.bottom = '-40px'; // Position under the button
                    copiedMessage.style.left = '-20px'; // Align with the button's left edge
                    copiedMessage.style.padding = '5px';
                    copiedMessage.style.borderRadius = '5px';
                    copiedMessage.style.border = 'none';
                    copiedMessage.style.background = 'grey';
                    copiedMessage.style.color = 'white';
                    copiedMessage.style.fontSize = '0.75rem';
                    copiedMessage.style.zIndex = '1000';
                    copiedMessage.style.opacity = '0';
                    copiedMessage.style.transition = 'opacity 0.3s';
                    e.currentTarget.appendChild(copiedMessage); // Append to the button's parent
                    setTimeout(() => {
                        copiedMessage.style.opacity = '1';
                    }, 100);
                    setTimeout(() => {
                        copiedMessage.style.opacity = '0';
                        setTimeout(() => copiedMessage.remove(), 2000);
                    }, 2000);
                }}
            >
                Copy
            </button>
        </>
    );
}

export const isMobileDevice = () => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}
