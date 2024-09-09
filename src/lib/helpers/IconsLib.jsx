// IconsLib
import React from 'react';

export const GsIcons = ({ icon, width = null, height = null, alt = '', id = '', className='', role="img" }) => {
    const currentWidth = (width ?? "14");
    const currentHeight = (height ?? "14");

    switch (icon.toLowerCase()) {

        case 'arrow-down-small':
            return (
                <svg
                    id={id}
                    alt={alt}
                    width={width ?? "6"}
                    height={height ?? "3"}
                    className={"ml-2 overflow-visible" + className ?? ''}
                    role={role}
                    // aria-hidden="true"
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

        case 'greater-than':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={currentWidth}
                    height={currentHeight}
                    className={className ?? ''}
                    role={role}
                    viewBox="0 0 384 512"
                >
                    <path
                        fill="currentColor"
                        d="M365.52 209.85L59.22 67.01c-16.06-7.49-35.15-.54-42.64 15.52L3.01 111.61c-7.49 16.06-.54 35.15 15.52 42.64L236.96 256.1 18.49 357.99C2.47 365.46-4.46 384.5 3.01 400.52l13.52 29C24 445.54 43.04 452.47 59.06 445l306.47-142.91a32.003 32.003 0 0 0 18.48-29v-34.23c-.01-12.45-7.21-23.76-18.49-29.01z"
                    >
                    </path>
                </svg>
            );

        case 'arrow-right-small':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={width ?? "3"}
                    height={height ?? "6"}
                    className={"ml-2 overflow-visible" + className ?? ''}
                    role={role}
                    // aria-hidden="true"
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
    
        case 'arrows-rotate':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={currentWidth}
                    height={currentHeight}
                    className={className ?? ''}
                    role={role}
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

        case 'clip':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={currentWidth}
                    height={currentHeight}
                    className={className ?? ''}
                    role={role}
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

        case 'edit':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={currentWidth}
                    height={currentHeight}
                    className={className ?? ''}
                    role={role}
                    viewBox="0 0 576 512"
                >
                    <path
                        fill="currentColor"
                        d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z">
                    </path>
                </svg>
            );
    
        case 'eye':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={currentWidth}
                    height={currentHeight}
                    className={className ?? ''}
                    role={role}
                    viewBox="0 0 576 512"
                >
                    <path
                        fill="currentColor"
                        d="M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z">
                    </path>
                </svg>
            );

        case 'google-logo':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={currentWidth}
                    height={currentHeight}
                    className={className ?? ''}
                    role={role}
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
                        <title>ionicons-v5_logos</title>
                        <path
                            d="M473.16,221.48l-2.26-9.59H262.46v88.22H387c-12.93,61.4-72.93,93.72-121.94,93.72-35.66,0-73.25-15-98.13-39.11a140.08,140.08,0,0,1-41.8-98.88c0-37.16,16.7-74.33,41-98.78s61-38.13,97.49-38.13c41.79,0,71.74,22.19,82.94,32.31l62.69-62.36C390.86,72.72,340.34,32,261.6,32h0c-60.75,0-119,23.27-161.58,65.71C58,139.5,36.25,199.93,36.25,256S56.83,369.48,97.55,411.6C141.06,456.52,202.68,480,266.13,480c57.73,0,112.45-22.62,151.45-63.66,38.34-40.4,58.17-96.3,58.17-154.9C475.75,236.77,473.27,222.12,473.16,221.48Z">
                        </path>
                    </g>
                </svg>
            );

        case 'menu-dots-more':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={currentWidth}
                    height={currentHeight}
                    className={className ?? ''}
                    role={role}
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
                            id="vertical-menu"
                            fill="currentColor"
                        >
                            <circle cx="32.026" cy="12.028" r="4" />
                            <circle cx="32.026" cy="52.028" r="4" />
                            <circle cx="32.026" cy="32.028" r="4" />
                        </g>
                </svg>
            );

        case "menu-hamburger":
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={width ?? "24"}
                    height={height ?? "24"}
                    className={"h-6 w-6" + className ?? ''}
                    role={role}
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

        case 'place-holder-circle':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={width ?? "32"}
                    height={height ?? "32"}
                    className={"w-8 h-8 rounded-full" + className ?? ''}
                    role={role}
                    fill="none"
                >
                    <rect
                        width={width ?? "32"}
                        height={height ?? "32"}
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

        case 'plus':
            return (
                <svg
                    // aria-hidden="true"
                    // focusable="false"
                    // data-prefix="fas"
                    // data-icon="plus"
                    // class="svg-inline--fa fa-plus "
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={currentWidth}
                    height={currentHeight}
                    className={className ?? ''}
                    role={role}
                    viewBox="0 0 448 512"
                >
                    <path
                        fill="currentColor"
                        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                    >
                    </path>
                </svg>
            );

        case 'side-menu':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    className={"w-6 h-6" + className ?? ''}
                    role={role}
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
                        // className="stroke-black dark:stroke-white"
                        className="stroke-white"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                    />
                    <line
                        x1="9"
                        y1="21"
                        x2="9"
                        y2="3"
                        fill="none"
                        // className="stroke-black dark:stroke-white"
                        className="stroke-white"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                    />
                </svg>
            );

        case 'spark':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={currentWidth}
                    height={currentHeight}
                    className={className ?? ''}
                    viewBox="0 0 24 24"
                    // role="presentation"
                    role={role}
                >
                    <path
                        fill="currentColor"
                        fillRule="evenodd"
                        d="M9.276 4.382L7.357 9.247l-4.863 1.917a.78.78 0 000 1.45l4.863 1.918 1.919 4.863a.78.78 0 001.45 0h-.001l1.918-4.863 4.864-1.919a.781.781 0 000-1.45l-4.864-1.916-1.918-4.865a.776.776 0 00-.44-.438.778.778 0 00-1.01.438zm8.297-2.03l-.743 1.886-1.884.743a.56.56 0 000 1.038l1.884.743.743 1.886a.558.558 0 001.038 0l.745-1.886 1.883-.743a.557.557 0 000-1.038l-1.883-.743-.745-1.885a.552.552 0 00-.314-.314.562.562 0 00-.724.314zm-.704 13.003l-.744 1.883-1.883.744a.553.553 0 00-.316.314.56.56 0 00.316.724l1.883.743.744 1.884c.057.144.17.258.314.315a.56.56 0 00.724-.315l.744-1.884 1.883-.743a.557.557 0 000-1.038l-1.883-.744-.744-1.883a.551.551 0 00-.315-.316.56.56 0 00-.723.316z"
                    >
                    </path>
                </svg>
            );

        case 'trash':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={currentWidth}
                    height={currentHeight}
                    className={className ?? ''}
                    // aria-hidden="true"
                    // focusable="false"
                    // data-prefix="fas"
                    // data-icon="trash"
                    // class="svg-inline--fa fa-trash "
                    role={role}
                    viewBox="0 0 448 512"
                >
                    <path
                        fill="currentColor"
                        d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z">
                    </path>
                </svg>
            );

        case 'top-menu':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    className={"w-6 h-6" + className ?? ''}
                    role={role}
                    viewBox="0 0 24 24"
                    fill="none"
                >
                    <rect
                        width="18"
                        height="18"
                        rx="3"
                        transform="matrix(1.39071e-07 1 1 -1.39071e-07 3 3)"
                        // className="stroke-black dark:stroke-white"
                        className="stroke-white"
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
                        className="stroke-white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </svg>
            );
            
        case 'vertical-slider':
            return (
                <div
                    id={id}
                    alt={alt}
                    className={"h-8 w-1.5 rounded-full bg-slate-400 mr-2 ml-2" + className ?? ''}
                    role={role}
                />
            );

        case 'x':
            return (
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    id={id}
                    alt={alt}
                    width={width ?? "24"}
                    height={height ?? "24"}
                    className={"h-6 w-6" + className ?? ''}
                    role={role}
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

        default:
            return (
                <>
                    {`Invalid Icon *${icon}*`}
                </>
            );
    }
}
