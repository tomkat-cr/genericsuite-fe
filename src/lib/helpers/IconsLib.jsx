// IconsLib
import React from 'react';

import {
    ROUNDED_ICON_CLASS,
    ML2_ICON_CLASS,
    VERTICAL_SLIDER_ICON_CLASS,
    STROKE_WHITE_ICON_CLASS,
} from '../constants/class_name_constants.jsx';

const debug = false;

export const GsIcons = ({
    icon,
    size = null,
    // width = null,
    // height = null,
    alt = '',
    id = '',
    className = '',
    role = "img",
    additionalIconsFn = null,
}) => {

/*
Warning: Failed prop type: Invalid prop `size` of value `m` supplied to `FontAwesomeIcon`,
expected one of ["2xs","xs","sm","lg","xl","2xl","1x","2x","3x","4x","5x","6x","7x","8x","9x","10x"].

Reference::
https://docs.fontawesome.com/web/style/size

Relative Sizing Class	Font Size	Equivalent in Pixels
fa-2xs	0.625em	10px
fa-xs	0.75em	12px
fa-sm	0.875em	14px
fa-lg	1.25em	20px
fa-xl	1.5em	24px
fa-2xl	2em	    32px

Literal Sizing Class	Font Size	Equivalent in Pixels
fa-1x	1em     16px
fa-2x	2em     32px
fa-3x	3em     48px
fa-4x	4em     64px
fa-5x	5em     80px
fa-6x	6em     96px
fa-7x	7em     112px
fa-8x	8em     128px
fa-9x	9em     144px
fa-10x	10em    160px
*/
    const sizeData = {
        "2xs": {
            "width": "10",
            "height": "10",
        },
        "xs": {
            "width": "12",
            "height": "12",
        },
        "sm": {
            "width": "14",
            "height": "14",
        },
        "m": {
            "width": "16",
            "height": "16",
        },
        "2m": {
            "width": "18",
            "height": "18",
        },
        "lg": {
            "width": "20",
            "height": "20",
        },
        "xl": {
            "width": "24",
            "height": "24",
        },
        "2xl": {
            "width": "32",
            "height": "32",
        },
        "1x": {
            "width": "16",
            "height": "16",
        },
        "2x": {
            "width": "32",
            "height": "32",
        },
        "3x": {
            "width": "48",
            "height": "48",
        },
        "4x": {
            "width": "64",
            "height": "64",
        },
        "5x": {
            "width": "80",
            "height": "80",
        },
        "6x": {
            "width": "96",
            "height": "96",
        },
        "7x": {
            "width": "112",
            "height": "112",
        },
        "8x": {
            "width": "128",
            "height": "128",
        },
        "9x": {
            "width": "14",
            "height": "14",
        },
        "10x": {
            "width": "160",
            "height": "160",
        },
    }

    size = (size ?? 'sm');
    if (typeof sizeData[size] === "undefined") {
        console.error(`Invalid "size" *${size}*. Must be: 2xs, xs, sm, lg, xl, 2xl, 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, or 10x`)
        return (
            <>
                {`Invalid "size" *${size}*`}
            </>
        );
    }
    const currentWidth = (sizeData[size].width);
    const currentHeight = (sizeData[size].height);

    let selectedSvg = null;

    switch (icon.toLowerCase()) {

        case 'arrow-down-small':
            selectedSvg = (
                <svg
                    width="6"
                    height="3"
                    className={ML2_ICON_CLASS + (className ?? '')}
                >
                    <path
                        d="M0 0L3 3L6 0"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    >
                    </path>
                </svg>
            );
            break;

        case 'arrow-right-small':
            selectedSvg = (
                <svg
                    width="3"
                    height="6"
                    className={ML2_ICON_CLASS + (className ?? '')}
                >
                    <path
                        d="M0 0L3 3L0 6"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                    >
                    </path>
                </svg>
            );
            break;
    
        case 'arrows-rotate':
            selectedSvg = (
                <svg
                    viewBox="0 0 512 512"
                >
                    <g
                        fill="#FFFFFF"
                    >
                        <path
                            d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"
                        />
                    </g>
                </svg>
            );
            break;

        case 'clip':
            selectedSvg = (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z"
                        fill="currentColor"
                    >
                    </path>
                </svg>
            );
            break;

        case 'edit':
            selectedSvg = (
                <svg
                    viewBox="0 0 576 512"
                >
                    <path
                        fill="currentColor"
                        d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z">
                    </path>
                </svg>
            );
            break;
    
        case 'eye':
            selectedSvg = (
                <svg
                    viewBox="0 0 576 512"
                >
                    <path
                        fill="currentColor"
                        d="M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z">
                    </path>
                </svg>
            );
            break;

        case 'google-logo':
            selectedSvg = (
                <svg
                    fill="#000000"
                    viewBox="-51.2 -51.2 614.40 614.40"
                >
                    <g
                        id="SVGRepo_bgCarrier"
                        strokeWidth="0"
                    >
                        <rect
                            x="-51.2"
                            y="-51.2"
                            width="614.40"
                            height="614.40"
                            rx="0"
                            fill="#fcfcfc"
                            strokeWidth="0"
                        >
                        </rect>
                    </g>
                    <g
                        id="SVGRepo_tracerCarrier"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                    </g>
                    <g
                        id="SVGRepo_iconCarrier"
                    >
                        <path
                            d="M473.16,221.48l-2.26-9.59H262.46v88.22H387c-12.93,61.4-72.93,93.72-121.94,93.72-35.66,0-73.25-15-98.13-39.11a140.08,140.08,0,0,1-41.8-98.88c0-37.16,16.7-74.33,41-98.78s61-38.13,97.49-38.13c41.79,0,71.74,22.19,82.94,32.31l62.69-62.36C390.86,72.72,340.34,32,261.6,32h0c-60.75,0-119,23.27-161.58,65.71C58,139.5,36.25,199.93,36.25,256S56.83,369.48,97.55,411.6C141.06,456.52,202.68,480,266.13,480c57.73,0,112.45-22.62,151.45-63.66,38.34-40.4,58.17-96.3,58.17-154.9C475.75,236.77,473.27,222.12,473.16,221.48Z">
                        </path>
                    </g>
                </svg>
            );
            break;

        case 'greater-than':
            selectedSvg = (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m9 18 6-6-6-6"></path>
                </svg>
            );
            break;
        
        case 'less-than':
            selectedSvg = (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="m15 18-6-6 6-6"></path>
                </svg>
            );
            break;

        case 'menu-dots-more':
            selectedSvg = (
                <svg
                    fill="#000000"
                    viewBox="0 0 64 64"
                    version="1.1"
                >
                    <rect
                        id="Icons"
                        x="-256"
                        y="-64"
                    />
                        <g
                            // id="vertical-menu"
                            id="menu-dots-more"
                            fill="currentColor"
                        >
                            <circle cx="32.026" cy="12.028" r="4" />
                            <circle cx="32.026" cy="52.028" r="4" />
                            <circle cx="32.026" cy="32.028" r="4" />
                        </g>
                </svg>
            );
            break;

        case "menu-hamburger":
            selectedSvg = (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <line
                        x1="4" x2="20" y1="12" y2="12"
                    >
                    </line>
                    <line
                        x1="4" x2="20" y1="6" y2="6"
                    >
                    </line>
                    <line
                        x1="4" x2="20" y1="18" y2="18"
                    >
                    </line>
                </svg>
            );
            break;

        case 'moon':
            selectedSvg = (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
                </svg>
            );
            break;

        case 'place-holder-circle':
            selectedSvg = (
                <svg
                    className={ROUNDED_ICON_CLASS + (className ?? '')}
                    fill="none"
                >
                    <rect
                        width={currentWidth}
                        height={currentHeight}
                        fill="#EAEAEA"
                        rx="3"
                    >
                        <g opacity=".5">
                            <g opacity=".5">
                                <path fill="#FAFAFA" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/>
                                <path stroke="#C9C9C9" strokeWidth="2.418" d="M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"/>
                            </g>
                            <path stroke="url(#a)" strokeWidth="2.418" d="M0-1.209h553.581" transform="scale(1 -1) rotate(45 1163.11 91.165)"/>
                            <path stroke="url(#b)" strokeWidth="2.418" d="M404.846 598.671h391.726"/>
                            <path stroke="url(#c)" strokeWidth="2.418" d="M599.5 795.742V404.017"/>
                            <path stroke="url(#d)" strokeWidth="2.418" d="m795.717 796.597-391.441-391.44"/>
                            <path fill="#fff" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/>
                            <g clipPath="url(#e)">
                                <path fill="#666" fillRule="evenodd" d="M616.426 586.58h-31.434v16.176l3.553-3.554.531-.531h9.068l.074-.074 8.463-8.463h2.565l7.18 7.181V586.58Zm-15.715 14.654 3.698 3.699 1.283 1.282-2.565 2.565-1.282-1.283-5.2-5.199h-6.066l-5.514 5.514-.073.073v2.876a2.418 2.418 0 0 0 2.418 2.418h26.598a2.418 2.418 0 0 0 2.418-2.418v-8.317l-8.463-8.463-7.181 7.181-.071.072Zm-19.347 5.442v4.085a6.045 6.045 0 0 0 6.046 6.045h26.598a6.044 6.044 0 0 0 6.045-6.045v-7.108l1.356-1.355-1.282-1.283-.074-.073v-17.989h-38.689v23.43l-.146.146.146.147Z" clipRule="evenodd"/>
                            </g>
                            <path stroke="#C9C9C9" strokeWidth="2.418" d="M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"/>
                        </g>
                        <defs>
                            <linearGradient id="a" x1="554.061" x2="-.48" y1=".083" y2=".087" gradientUnits="userSpaceOnUse"><stop stopColor="#C9C9C9" stopOpacity="0"/><stop offset=".208" stopColor="#C9C9C9"/><stop offset=".792" stopColor="#C9C9C9"/><stop offset="1" stopColor="#C9C9C9" stopOpacity="0"/></linearGradient><linearGradient id="b" x1="796.912" x2="404.507" y1="599.963" y2="599.965" gradientUnits="userSpaceOnUse"><stop stopColor="#C9C9C9" stopOpacity="0"/><stop offset=".208" stopColor="#C9C9C9"/><stop offset=".792" stopColor="#C9C9C9"/><stop offset="1" stopColor="#C9C9C9" stopOpacity="0"/></linearGradient><linearGradient id="c" x1="600.792" x2="600.794" y1="403.677" y2="796.082" gradientUnits="userSpaceOnUse"><stop stopColor="#C9C9C9" stopOpacity="0"/><stop offset=".208" stopColor="#C9C9C9"/><stop offset=".792" stopColor="#C9C9C9"/><stop offset="1" stopColor="#C9C9C9" stopOpacity="0"/></linearGradient><linearGradient id="d" x1="404.85" x2="796.972" y1="403.903" y2="796.02" gradientUnits="userSpaceOnUse"><stop stopColor="#C9C9C9" stopOpacity="0"/><stop offset=".208" stopColor="#C9C9C9"/><stop offset=".792" stopColor="#C9C9C9"/><stop offset="1" stopColor="#C9C9C9" stopOpacity="0"/></linearGradient><clipPath id="e"><path fill="#fff" d="M581.364 580.535h38.689v38.689h-38.689z"/></clipPath>
                        </defs>
                    </rect>
                </svg>

            );
            break;

        case 'plus':
            selectedSvg = (
                <svg
                    viewBox="0 0 448 512"
                >
                    <path
                        fill="currentColor"
                        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    >
                    </path>
                </svg>
            );
            break;

        case 'search':
            selectedSvg = (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>
                </svg>
            );
            break;

        case 'side-menu':
            selectedSvg = (
                <svg
                    viewBox="0 0 24 24"
                >
                    <rect
                        id="Square-2"
                        x="3"
                        y="3"
                        width="18"
                        height="18"
                        rx="2"
                        ry="2"
                        fill="none"
                        className={STROKE_WHITE_ICON_CLASS}
                        strokeMiterlimit="10"
                        strokeWidth="2"
                    />
                    <line
                        x1="9"
                        y1="21"
                        x2="9"
                        y2="3"
                        fill="none"
                        className={STROKE_WHITE_ICON_CLASS}
                        strokeMiterlimit="10"
                        strokeWidth="2"
                    />
                </svg>
            );
            break;

        case 'spark':
            selectedSvg = (
                <svg
                    viewBox="0 0 24 24"
                    // role="presentation"
                >
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M9.276 4.382L7.357 9.247l-4.863 1.917a.78.78 0 000 1.45l4.863 1.918 1.919 4.863a.78.78 0 001.45 0h-.001l1.918-4.863 4.864-1.919a.781.781 0 000-1.45l-4.864-1.916-1.918-4.865a.776.776 0 00-.44-.438.778.778 0 00-1.01.438zm8.297-2.03l-.743 1.886-1.884.743a.56.56 0 000 1.038l1.884.743.743 1.886a.558.558 0 001.038 0l.745-1.886 1.883-.743a.557.557 0 000-1.038l-1.883-.743-.745-1.885a.552.552 0 00-.314-.314.562.562 0 00-.724.314zm-.704 13.003l-.744 1.883-1.883.744a.553.553 0 00-.316.314.56.56 0 00.316.724l1.883.743.744 1.884c.057.144.17.258.314.315a.56.56 0 00.724-.315l.744-1.884 1.883-.743a.557.557 0 000-1.038l-1.883-.744-.744-1.883a.551.551 0 00-.315-.316.56.56 0 00-.723.316z"
                    >
                    </path>
                </svg>
            );
            break;

        case 'sun':
            selectedSvg = (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="4"></circle><path d="M12 2v2"></path><path d="M12 20v2"></path><path d="m4.93 4.93 1.41 1.41"></path><path d="m17.66 17.66 1.41 1.41"></path><path d="M2 12h2"></path><path d="M20 12h2"></path><path d="m6.34 17.66-1.41 1.41"></path><path d="m19.07 4.93-1.41 1.41"></path>
                </svg>
            );
            break;
    
        case 'trash':
            selectedSvg = (
                <svg
                    viewBox="0 0 448 512"
                >
                    <path
                        fill="currentColor"
                        d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z">
                    </path>
                </svg>
            );
            break;

        case 'top-menu':
            selectedSvg = (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <rect
                        width="18"
                        height="18"
                        rx="3"
                        transform="matrix(1.39071e-07 1 1 -1.39071e-07 3 3)"
                        // className="stroke-black dark:stroke-white"
                        className={STROKE_WHITE_ICON_CLASS}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <line
                        x1="1"
                        y1="-1"
                        x2="17"
                        y2="-1"
                        transform="matrix(1 -1.82782e-07 -1.82782e-07 -1 3 8)"
                        // className="stroke-black dark:stroke-white"
                        className={STROKE_WHITE_ICON_CLASS}
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
            break;
            
        case 'vertical-slider':
            selectedSvg = (
                <div
                    className={VERTICAL_SLIDER_ICON_CLASS + (className ?? '')}
                />
            );
            break;

        case 'warning-sign':
            selectedSvg = (
                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                </svg>
            );
            break;

        case 'checked-sign':
            selectedSvg = (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="oi sl aye">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5"></path>
                </svg>
            );
            break;

        case 'x':
            selectedSvg = (
                <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M18 6 6 18"></path><path d="m6 6 12 12"></path>
                </svg>
            );
            break;

        default:
            if (additionalIconsFn) {
                selectedSvg = additionalIconsFn(
                    icon,
                    size,
                    currentWidth, // width,
                    currentHeight, // height,
                    alt,
                    id,
                    className,
                    role,
                );
            }
    }

    if (!selectedSvg) {
        return (
            <>
                {`Invalid Icon *${icon}*`}
            </>
        );
    }
    if (debug) console.log("selectedSvg # 1", selectedSvg, " | selectedSvg.type", selectedSvg.type, ' | icon:', icon);
    let iconProps = {
        'data-icon': icon.toLowerCase(),
        'id': id,
        'className': selectedSvg.props.className ?? className,
    };
    if (selectedSvg.type === "svg") {
        // iconProps['viewBox'] = "0 0 " + currentWidth + " " + currentHeight;
        iconProps['xmlns'] = selectedSvg.props.xmlns ?? "http://www.w3.org/2000/svg";
        iconProps['width'] = selectedSvg.props.width ?? currentWidth;
        iconProps['height'] = selectedSvg.props.height ?? currentHeight;
        iconProps['role'] = selectedSvg.props.role ?? role;
        iconProps['alt'] = selectedSvg.props.alt ?? alt;
        iconProps['title'] = selectedSvg.props.title ?? alt;
        if (debug) console.log("It's a SVG.... | iconProps", iconProps);
    }
    if (debug) console.log("selectedSvg # 2", selectedSvg);
    selectedSvg = React.cloneElement(selectedSvg, iconProps);
    if (debug) console.log("selectedSvg # 3", selectedSvg);
    return selectedSvg;
}
