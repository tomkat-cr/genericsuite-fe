import React from 'react'

import ReactMarkdown from 'react-markdown';

import { ModalPopUp } from '../../helpers/ModalPopUp.jsx'
import { hasHashRouter } from '../../helpers/history.jsx'
import {
    renderMarkdownContent,
    CopyButton,
} from '../../helpers/ui.jsx';
import {
    ALERT_DANGER_CLASS,
    ALERT_SUCCESS_CLASS,
    APP_GENERAL_MARGINS_CLASS,
    MARKDOWN_BOLD_CLASS,
    MARKDOWN_ITALIC_CLASS,
    MARKDOWN_P_CLASS,
    MARKDOWN_UNDERLINE_CLASS,
} from '../../constants/class_name_constants.jsx'

export const About = () => {
    return (
        <ModalPopUp
            title='About'
            link={`${window.location.origin}${hasHashRouter ? '/#' : ''}/about_body?menu=0`}
        />
    )
}

export const AboutBody = ({
    children,
    modalPopUpTest = true,
}) => {
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
                    title='Test ModalPopUp'
                    showTitle={true}    
                    // iconClassName={ALERT_DANGER_CLASS}
                    iconClassName={ALERT_SUCCESS_CLASS}
                    primaryButtonMessage={"Login Again"}
                    primaryButtonAction={null}
                    secondButtonMessage={"Retry"}
                    secondButtonAction={null}
                    logoutButton={true}
                >
                    This is a test test test in <i>Italic</i>, <u>Underline</u> and <b>Boldface</b>.
                    <ReactMarkdown
                        components={{
                            li: ({ children }) => <li className={MARKDOWN_P_CLASS}>* {children}</li>,
                        }}
                    >
- This is a bullet point with _Italic_ and **Boldface** with markdown syntax.
                    </ReactMarkdown>
                    <ReactMarkdown
                        components={{
                            li: ({ children }) => <li className={MARKDOWN_P_CLASS}>* {children}</li>,
                        }}
                    >
- This is another bullet point.
                    </ReactMarkdown>
                    <ReactMarkdown>
                        ```
                        print("Hello GenericSuite! This is a code block example")
                        ```
                    </ReactMarkdown>
                    <CopyButton text={"Content copied!!!"} />
                    {
                        renderMarkdownContent("This is a __underline__ test using the renderMarkdownContent() function")
                    }
                </ModalPopUp>
            )}
        </div>
    )
}
