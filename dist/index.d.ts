import * as rxjs from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import * as react_router_dom from 'react-router-dom';
import React from 'react';

declare function About(): React.FunctionComponentElement<any>;
declare function AboutBody(_ref: any): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
declare function App(_ref8: any): React.FunctionComponentElement<any>;
declare var AppContext$1: Readonly<{
    __proto__: null;
    AppProvider: (_ref: any) => React.FunctionComponentElement<React.ProviderProps<any>>;
    useAppContext: () => any;
}>;
declare function AppFooter(_ref: any): React.FunctionComponentElement<{
    children?: React.ReactNode | undefined;
}>;
declare function GeneralConfig(): React.FunctionComponentElement<any>;
declare function GeneralConfig_EditorData(): any;
declare function HomePage(_ref: any): React.DetailedReactHTMLElement<{
    className: string;
}, HTMLElement>;
declare var IconsLib: Readonly<{
    __proto__: null;
    GsIcons: (_ref: any) => React.FunctionComponentElement<{
        children?: React.ReactNode | undefined;
    }> | React.DetailedReactHTMLElement<{
        'data-icon': any;
        id: any;
        className: any;
    }, HTMLElement>;
}>;
declare function LoginPage(props: any): React.FunctionComponentElement<{
    children?: React.ReactNode | undefined;
}>;
declare var ModalPopUp$1: Readonly<{
    __proto__: null;
    DefaultButtonModal: (_ref2: any) => React.FunctionComponentElement<any>;
    LogoutNavigate: (_ref3: any) => React.FunctionComponentElement<any> | React.DetailedReactHTMLElement<{
        variant: any;
        className: string;
        href: string;
    }, HTMLElement>;
    ModalPopUp: (_ref: any) => React.FunctionComponentElement<{
        children?: React.ReactNode | undefined;
    }>;
}>;
declare var NavLib: Readonly<{
    __proto__: null;
    AppFooterContainer: (_ref4: any) => React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
    AppSectionContainer: {
        (_ref2: any): React.DetailedReactHTMLElement<{
            className: string;
        }, HTMLElement>;
        ForSideMenu: (_ref3: any) => React.DetailedReactHTMLElement<{
            className: string;
        }, HTMLElement>;
    };
    AppSectionContainerForSideMenu: (_ref3: any) => React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
    CenteredBoxContainer: (_ref5: any) => React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
    GsButton: (_ref18: any) => React.CElement<any, React.Component<any, any, any>> | React.DetailedReactHTMLElement<any, HTMLElement>;
    MainContainer: (_ref: any) => React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
    Nav: (_ref8: any) => React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
    NavDropdown: {
        (_ref14: any): React.DetailedReactHTMLElement<{
            className: any;
        }, HTMLElement>;
        Item: (_ref15: any) => React.DetailedReactHTMLElement<{
            className: any;
        }, HTMLElement>;
    };
    Navbar: {
        (_ref6: any): React.FunctionComponentElement<{
            children?: React.ReactNode | undefined;
        }> | React.DetailedReactHTMLElement<{
            className: string;
        }, HTMLElement> | null;
        Brand: (_ref7: any) => React.DetailedReactHTMLElement<{
            className: string;
        }, HTMLElement> | React.CElement<{
            to: any;
            onClick: any;
        }, React.Component<{
            to: any;
            onClick: any;
        }, any, any>>;
        TopCenterMenu: (_ref8: any) => React.DetailedReactHTMLElement<{
            className: string;
        }, HTMLElement>;
        TopRightMenu: (_ref9: any) => React.FunctionComponentElement<{
            children?: React.ReactNode | undefined;
        }>;
        MobileMenu: (_ref11: any) => React.DetailedReactHTMLElement<{
            className: string;
        }, HTMLElement> | null;
        Toggle: () => React.DetailedReactHTMLElement<{
            id: string;
            onClick: any;
            className: string;
        }, HTMLElement>;
        Text: (_ref12: any) => React.DetailedReactHTMLElement<{
            className: any;
        }, HTMLElement>;
        TopForSideMenu: (_ref13: any) => React.DetailedReactHTMLElement<{
            className: string;
        }, HTMLElement>;
    };
    ToggleSideBar: (_ref17: any) => React.DetailedReactHTMLElement<any, HTMLElement>;
}>;
declare var PrivateRoute$1: Readonly<{
    __proto__: null;
    PrivateRoute: (_ref: any) => React.FunctionComponentElement<react_router_dom.RouteProps>;
}>;
declare var UserContext$1: Readonly<{
    __proto__: null;
    UserProvider: (_ref: any) => React.FunctionComponentElement<React.ProviderProps<any>>;
    useUser: () => any;
}>;
declare function UserProfileEditor(props: any): React.FunctionComponentElement<{
    children?: React.ReactNode | undefined;
}>;
declare function Users(): React.FunctionComponentElement<any>;
declare function UsersConfig(): {
    editorConfig: any;
    component: (_ref: any) => React.FunctionComponentElement<any>;
};
declare function UsersConfig_EditorData(): any;
declare function UsersDbListPreRead(data: any, editor: any, action: any, currentUser: any): Promise<any>;
declare function UsersDbPreWrite(data: any, editor: any, action: any): Promise<any>;
declare function UsersPasswordValidations(data: any, editor: any, action: any): Promise<any>;
declare function UsersProfile_EditorData(): any;
declare function UsersValidations(data: any, editor: any, action: any, currentUser: any): Promise<any>;
declare function Users_EditorData(...args: any[]): any;
declare var app_constants: Readonly<{
    __proto__: null;
    APP_EMAILS: {
        SUPPORT_EMAIL: string;
        INFO_EMAIL: string;
    };
    APP_VALID_URLS: {
        APP_DOMAIN: string;
        APP_WEBSITE: string;
    };
    BILLING_PLANS: {
        title: any;
        value: string;
    }[];
    ERROR_MESSAGES: {
        ACCOUNT_INACTIVE: string;
    };
}>;
declare const appLogoCircle: "app_logo_circle.svg";
declare const appLogoLandscape: "app_logo_landscape.svg";
declare var authHeader$1: Readonly<{
    __proto__: null;
    authHeader: typeof authHeader;
}>;
declare var authentication_service: Readonly<{
    __proto__: null;
    authenticationService: {
        login: typeof login;
        logout: typeof logout;
        currentUser: rxjs.Observable<any>;
        readonly currentUserValue: any;
    };
    getCurrentUserData: () => Promise<any>;
    getUserData: (userId: any) => Promise<any>;
    getUserLocalData: (res: any) => {
        id: any;
        firstName: any;
        pref_side_menu: any;
        pref_dark_mode: any;
    };
    verifyCurrentUser: (registerUser: any) => void;
}>;
declare var blob_files_utilities: Readonly<{
    __proto__: null;
    decodeBlob: (base64String: any, filename: any, ...args: any[]) => any;
    defaultFilenametoDownload: "audio.wav";
    fixBlob: (blobObj: any, filename: any) => Promise<any>;
    getContentType: (filename: any, ...args: any[]) => string;
    getFileExtension: (filename: any) => any;
    getFilenameFromContentDisposition: (headers: any) => any;
    getHeadersContentType: (headers: any) => any;
    isBinaryFileType: (filename: any) => boolean;
    performDownload: (fileUrl: any, ...args: any[]) => true | HTMLAnchorElement;
    responseHasFile: (headers: any) => any;
}>;
declare var class_name_constants: Readonly<{
    __proto__: null;
    ALERT_BASE_CLASS: "1-relative p-3 border border-transparent rounded alertBaseClass";
    ALERT_DANGER_CLASS: string;
    ALERT_INFO_CLASS: string;
    ALERT_SUCCESS_CLASS: string;
    ALERT_WARNING_CLASS: string;
    APP_FOOTER_CONTAINER_CLASS: "p-1 text-white text-center appFooterContainerClass";
    APP_FORMPAGE_CHILD_COMPONENTS_TOP_DIV_CLASS: "mt-6 appFormPageChildComponentsTopDivClass";
    APP_FORMPAGE_FIELD_BASE_CLASS: string;
    APP_FORMPAGE_FIELD_CLASS: string;
    APP_FORMPAGE_FIELD_GOOD_CLASS: string;
    APP_FORMPAGE_FIELD_INVALID_CLASS: string;
    APP_FORMPAGE_FORM_BUTTON_BAR_CLASS: "flex align-middle space-x-4 appFormPageFormButtonBarClass";
    APP_FORMPAGE_LABEL_CLASS: "font-medium appFormPageLabelClass";
    APP_FORMPAGE_LABEL_REQUIRED_CLASS: "font-medium text-red-700 appFormPageLabelRequiredClass";
    APP_FORMPAGE_SPECIAL_BUTTON_DIV_CLASS: "align-middle flex appFormPageSpecialButtonDivClass";
    APP_GENERAL_MARGINS_CLASS: "mt-2 mb-2 ml-2 mr-2 p-2 rounded-lg appGeneralMarginsClass";
    APP_LEVEL2_DIV_CLASS: "overflow-x-auto appLevel2DivClass";
    APP_LISTING_SEARCH_BOX_INPUT_CLASS: "p-2 rounded border w-40 text-sm appListingSearchBoxInputClass";
    APP_LISTING_SEARCH_BOX_LABEL_CLASS: "mr-2 text-sm appListingSearchBoxLabelClass";
    APP_LISTING_SEARCH_BOX_STOP_BUTTON_CLASS: string;
    APP_LISTING_SEARCH_BOX_SUBMIT_BUTTON_CLASS: string;
    APP_LISTING_SEARCH_BOX_TOP_DIV_CLASS: "flex items-center space-x-2 appListingSearchBoxTopDivClass";
    APP_LISTING_TABLE_BODY_TBODY_CLASS: "appListingTableBodyTbodyClass";
    APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS: string;
    APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS: string;
    APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS: "p-2 appListingTableBodyTdBaseEvenClass";
    APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS: "p-2 appListingTableBodyTdBaseOddClass";
    APP_LISTING_TABLE_BODY_TD_EVEN_CLASS: string;
    APP_LISTING_TABLE_BODY_TD_ODD_CLASS: string;
    APP_LISTING_TABLE_BODY_TR_ACTIONS_EVEN_CLASS: "appListingTableBodyTrActionsEvenClass";
    APP_LISTING_TABLE_BODY_TR_ACTIONS_ODD_CLASS: "appListingTableBodyTrActionsOddClass";
    APP_LISTING_TABLE_BODY_TR_EVEN_CLASS: "hover:bg-opacity-80 appListingTableBodyTrEvenClass";
    APP_LISTING_TABLE_BODY_TR_ODD_CLASS: "hover:bg-opacity-80 appListingTableBodyTrOddClass";
    APP_LISTING_TABLE_CLASS: "w-full text-sm appListingTableClass";
    APP_LISTING_TABLE_HDR_THEAD_CLASS: "bg-white dark:bg-black appListingTableHdrTheadClass";
    APP_LISTING_TABLE_HDR_TH_CLASS: "text-left p-2 appListingTableHdrThClass";
    APP_LISTING_TABLE_HDR_TR_CLASS: "border-b appListingTableHdrTrClass";
    APP_LISTING_TABLE_HRD_ACTIONS_COL_CLASS: "appListingTableHrdActionsColClass";
    APP_LISTING_TOOLBAR_PAGE_NUM_SECTION_CLASS: "text-sm flex items-center appListingToolbarPageNumSectionClass";
    APP_LISTING_TOOLBAR_PAGINATION_SECTION_CLASS: "text-sm flex items-center space-x-2 appListingToolbarPaginationSectionClass";
    APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS: "p-2 rounded border appListingToolbarRowPerPageInputClass";
    APP_LISTING_TOOLBAR_ROW_PER_PAGE_LABEL_CLASS: "mr-2 text-sm appListingToolbarRowPerPageLabelClass";
    APP_LISTING_TOOLBAR_ROW_PER_PAGE_SECTION_CLASS: "text-sm flex items-center appListingToolbarRowPerPageSectionClass";
    APP_LISTING_TOOLBAR_TOP_DIV_CLASS: "flex items-center mt-4 space-x-4 1-sm:space-y-0 appListingToolbarTopDivClass";
    APP_LISTING_TOOLBAR_TOP_DIV_NOT_WIDE_CLASS: "flex-col appListingToolbarTopDivNotWideClass";
    APP_LISTING_TOOLBAR_TOP_DIV_WIDE_CLASS: "flex-row appListingToolbarTopDivWideClass";
    APP_LISTING_TOOLBAR_WAIT_ANIMATION_CLASS: "ml-3 mr-3 hidden appListingToolbarWaitAnimationClass";
    APP_SECTION_CONTAINER_FOR_SIDE_MENU_CLASS: "flex-grow flex flex-col appSectionContainerForSideMenuClass";
    APP_SECTION_CONTAINER_FOR_SIDE_MENU_MAIN_CLASS: "flex-grow appSectionContainerForSideMenuMainClass";
    APP_SECTION_CONTAINER_FOR_TOP_MENU_CLASS: "flex-grow 1-p-4 appSectionContainerForTopMenuClass";
    APP_SIDE_MENU_BG_COLOR_CLASS: "bg-white dark:bg-gray-800 appSideMenuBgColorClass";
    APP_TITLE_H1_CLASS: "text-xl font-bold mb-4 appTitleH1Class";
    APP_TITLE_RECYCLE_BUTTON_CLASS: "pl-2 align-bottom appTitleRecycleButtonClass";
    APP_TOP_DIV_CLASS: string;
    BUTTON_COMPOSED_LABEL_CLASS: "flex items-center buttonComposedLabelClass";
    BUTTON_LISTING_CLASS: "bg-blue-500 text-white p-2 rounded text-sm buttonListingClass";
    BUTTON_LISTING_DISABLED_CLASS: string;
    BUTTON_LISTING_NEW_CLASS: string;
    BUTTON_LISTING_REFRESH_CLASS: string;
    BUTTON_PRIMARY_CLASS: "bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 buttonPrimaryClass";
    BUTTON_SECONDARY_CLASS: "bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 buttonSecondaryClass";
    CENTERED_BOX_CONTAINER_DIV_1_CLASS: "z-50 overflow-auto centeredBoxContainerDiv1Class";
    CENTERED_BOX_CONTAINER_DIV_2_CLASS: "1-relative w-fit max-w-md m-auto flex-col flex rounded-lg centeredBoxContainerDiv2Class";
    CENTERED_BOX_CONTAINER_DIV_3_CLASS: "flex flex-col items-center pt-1 pb-4 p-6 centeredBoxContainerDiv3Class";
    DARK_MODE_BUTTON_DARK_HIDDEN_CLASS: "dark:hidden darkModeButtonDarkHiddenClass";
    DARK_MODE_BUTTON_DARK_INLINE_CLASS: "hidden dark:inline darkModeButtonDarkInlineClass";
    DARK_MODE_BUTTON_SVG_CLASS: "w-6 h-6 darkModeButtonSvgClass";
    DARK_MODE_BUTTON_TOP_DIV_CLASS: "mt-1 darkModeButtonTopDivClass";
    DISABLE_FIELD_BACKGROUND_COLOR_CLASS: "bg-gray-200 disableFieldBackgroundColorClass";
    ERROR_MSG_CLASS: string;
    FORM_CONTROL_CLASS: "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 formControlClass";
    FORM_GROUP_CLASS: "mb-4 formGroupClass";
    GRAY_BOX_MSG_CLASS: string;
    HIDDEN_CLASS: "hidden hiddenClass";
    HORIZONTALLY_CENTERED_CLASS: "flex flex-col items-center horizontallyCenteredClass";
    INFO_MSG_CLASS: string;
    INLINE_CLASS: "inline inlineClass";
    INPUT_FLEXIBLE_CLASS: "pl-1 pb-1 pt-1 pr-1 block w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md resize-none overflow-hidden inputFlexibleClass";
    INVALID_FEEDBACK_CLASS: "text-red-800 text-sm mt-1 invalidFeedbackClass";
    IS_INVALID_CLASS: "border-red-500 isInvalidClass";
    LOGIN_BUTTON_IN_APP_COMPONENT_CLASS: string;
    LOGIN_PAGE_APP_LOGO_CLASS: "mx-auto my-0 loginPageAppLogoClass";
    MAIN_CONTAINER_FOR_SIDE_MENU_CLASS: "flex min-h-screen mainContainerForSideMenuClass";
    MAIN_CONTAINER_FOR_TOP_MENU_CLASS: "flex flex-col min-h-screen mainContainerForTopMenuClass";
    MENU_MODE_BUTTON_TOP_DIV_CLASS: "mt-1 menuModeButtonTopDivClass";
    ML2_ICON_CLASS: "ml-2 overflow-visible";
    MODALIB_BUTTON_BASESTYLE_CLASS: "px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 modalibButtonBaseStyleClass";
    MODALIB_BUTTON_BASESTYLE_NOT_WIDE_CLASS: "w-full flex justify-center modalibButtonBaseStyleNotWideClass";
    MODALIB_BUTTON_BASESTYLE_WIDE_CLASS: "flex-1 modalibButtonBaseStyleWideClass";
    MODALIB_BUTTON_DANGER_CLASS: "bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 modalibButtonDangerClass";
    MODALIB_BUTTON_PRIMARY_CLASS: string;
    MODALIB_BUTTON_SECONDARY_CLASS: string;
    MODALIB_BUTTON_SUCCESS_CLASS: "bg-green-500 hover:bg-green-600 text-white focus:ring-green-400 modalibButtonSuccessClass";
    MODALIB_MODAL_BODY_CLASS: "text-center mb-6 max-h-80 overflow-auto modalibModalBodyClass";
    MODALIB_MODAL_DIV_1_CLASS: "z-50 fixed inset-0 1-bg-black 1-bg-opacity-50 flex items-center justify-center p-4 modalibModalDiv1Class";
    MODALIB_MODAL_DIV_2_CLASS: "rounded-lg shadow-xl w-full max-w-md modalibModalDiv2Class";
    MODALIB_MODAL_DIV_3_CLASS: "p-6 modalibModalDiv3Class";
    MODALIB_MODAL_FOOTER_CLASS: "flex mt-4 modalibModalFooterClass";
    MODALIB_MODAL_FOOTER_NOT_WIDE_CLASS: "flex-col-reverse space-y-4 space-y-reverse modalibModalFooterNotWideClass";
    MODALIB_MODAL_FOOTER_WIDE_CLASS: "flex-row space-x-4 modalibModalFooterWideClass";
    MODALIB_MODAL_HEADER_CLASS: "modalibModalHeaderClass";
    MODALIB_MODAL_ICON_1_CLASS: "flex justify-center mb-4 modalibModalIcon1Class";
    MODALIB_MODAL_ICON_2_CLASS: "rounded-full p-2 modalibModalIcon2Class";
    MODALIB_MODAL_ICON_3_CLASS: "w-6 h-6 modalibModalIcon3Class";
    MODALIB_MODAL_TITLE_CLASS: "text-xl font-semibold text-center mb-2 modalibModalTitleClass";
    NAVBAR_BRAND_APP_LOGO_CLASS: "mx-auto my-0 navbarBrandAppLogoClass";
    NAVBAR_BRAND_APP_VERSION_CLASS: "text-xs navbarBrandAppVersionClass";
    NAVBAR_BRAND_ELEMENTS_FOR_SIDE_MENU_CLASS: "flex justify-between items-center mb-4 navbarBrandElementsForSideMenuClass";
    NAVBAR_BRAND_ELEMENTS_FOR_TOP_MENU_CLASS: "flex items-center space-x-2 navbarBrandElementsForTopMenuClass";
    NAVBAR_BRAND_NAME_CLASS: "text-2xl ml-2 font-bold navbarBrandNameClass";
    NAVBAR_HEADER_FOR_SIDE_MENU_CLASS: "top-0 left-0 w-64 p-2 overflow-y-auto transition-transform duration-300 ease-in-out 1-md:translate-x-0 lg:translate-x-0 z-20 navbarHeaderForSideMenuClass";
    NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_CLOSE_CLASS: "navbarHeaderForSideMenuMobileCloseClass";
    NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_OPEN_CLASS: "translate-x-0 navbarHeaderForSideMenuMobileOpenClass";
    NAVBAR_HEADER_FOR_TOP_MENU_CLASS: "flex items-center justify-between p-1 text-white navbarHeaderForTopMenuClass";
    NAVBAR_MOBILE_CLOSE_BUTTON_CLASS: "p-2 rounded-full hover:bg-opacity-80 navbarMobileCloseButtonClass";
    NAVBAR_MOBILE_CLOSE_BUTTON_ICON_CLASS: "h-6 w-6 navbarMobileCloseButtonIconClass";
    NAVBAR_MOBILE_MENU_DIV_1_CLASS: "fixed inset-0 bg-black bg-opacity-50 z-50 navbarMobileMenuDiv1Class";
    NAVBAR_MOBILE_MENU_DIV_2_CLASS: "fixed inset-y-0 left-0 w-64 p-4 overflow-y-auto navbarMobileMenuDiv2Class";
    NAVBAR_MOBILE_MENU_DIV_3_CLASS: "flex justify-between items-center mb-4 navbarMobileMenuDiv3Class";
    NAVBAR_MOBILE_MENU_H2_CLASS: "text-xl font-bold navbarMobileMenuH2Class";
    NAVBAR_MOBILE_NAV_CLASS: "flex flex-col space-y-2 navbarMobileNavClass";
    NAVBAR_TEXT_CLASS: "flex items-center navbarTextClass";
    NAVBAR_TOGGLE_BUTTON_CLASS: "1-md:hidden 1-lg:hidden p-2 rounded-full hover:bg-opacity-80 navbarToggleButtonClass";
    NAVBAR_TOGGLE_IMAGE_CLASS: "h-6 w-6 navbarToggleImageClass";
    NAVBAR_TOP_CENTER_MENU_ON_LEFT_CLASS: "space-y-2 navbarTopCenterMenuOnLeftClass";
    NAVBAR_TOP_CENTER_MENU_ON_TOP_CLASS: "flex space-x-4 navbarTopCenterMenuOnTopClass";
    NAVBAR_TOP_FOR_SIDE_MENU_CLASS: "flex items-center justify-between p-1 text-white navbarTopForSideMenuClass";
    NAVBAR_TOP_RIGHT_MENU_FOR_SIDE_MENU_CLASS: "flex items-center space-x-4 ml-auto navbarTopRightMenuForSideMenuClass";
    NAVBAR_TOP_RIGHT_MENU_FOR_TOP_MENU_CLASS: "flex items-center space-x-4 navbarTopRightMenuForTopMenuClass";
    NAVBAR_TOP_RIGHT_MENU_UNAUTHENTICATED_MARGIN_RIGHT_CLASS: "mr-2 navbarTopRightMenuUnauthenticatedMarginRightClass";
    NAV_DROPDOWN_BUTTON_HAMBURGER_CLASS: "rounded p-2 block py-1 flex items-center navDropdownButtonHamburgerClass";
    NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS: "1-w-full text-left flex justify-between items-center py-2 px-2 rounded navDropdownButtonMobileMenuClass";
    NAV_DROPDOWN_BUTTON_SIDE_MENU_CLASS: "1-w-full text-left flex justify-between items-center py-2 px-2 rounded navDropdownButtonSideMenuClass";
    NAV_DROPDOWN_BUTTON_TOP_MENU_CLASS: "rounded p-1 flex items-center navDropdownButtonTopMenuClass";
    NAV_DROPDOWN_IMAGE_HAMBURGER_CLASS: "navDropdownImageHamburgerClass";
    NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS: "h-4 w-4 transform transition-transform navDropdownImageMobileMenuClass";
    NAV_DROPDOWN_IMAGE_SIDE_MENU_CLASS: "navDropdownImageSideMenuClass";
    NAV_DROPDOWN_IMAGE_TOP_MENU_CLASS: "navDropdownImageTopMenuClass";
    NAV_DROPDOWN_INNER_DIV_HAMBURGER_CLASS: "absolute right-0 hidden z-50 1-group-hover:block bg-white text-gray-800 p-2 rounded shadow-lg navDropdownInnerDivHamburgerClass";
    NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS: "ml-2 space-y-2 navDropdownInnerDivMobileMenuClass";
    NAV_DROPDOWN_INNER_DIV_SIDE_MENU_CLASS: "ml-2 space-y-2 navDropdownInnerDivSideMenuClass";
    NAV_DROPDOWN_INNER_DIV_TOP_MENU_CLASS: "absolute hidden z-50 bg-white text-gray-800 p-2 rounded shadow-lg navDropdownInnerDivTopMenuClass";
    NAV_DROPDOWN_ITEM_BUTTON_HAMBURGER_CLASS: "rounded block px-2 navDropDownItemButtonsHamburgerClass";
    NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS: "1-w-full 1-text-left 1-flex 1-justify-between 1-items-center rounded py-2 px-2 navDropDownItemButtonsMobileMenuClass";
    NAV_DROPDOWN_ITEM_BUTTON_SIDE_MENU_CLASS: "rounded px-2 py-2 navDropDownItemButtonsSideMenuClass";
    NAV_DROPDOWN_ITEM_BUTTON_TOP_MENU_CLASS: "rounded px-2 flex items-center navDropDownItemButtonsTopMenuClass";
    NAV_DROPDOWN_ITEM_TOP_DIV_HAMBURGER_CLASS: "block py-1 navDropdownItemTopDivHamburgerClass";
    NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS: "block rounded navDropdownItemTopDivMobileMenuClass";
    NAV_DROPDOWN_ITEM_TOP_DIV_SIDE_MENU_CLASS: "block rounded navDropdownItemTopDivSideMenuClass";
    NAV_DROPDOWN_ITEM_TOP_DIV_TOP_MENU_CLASS: "block py-1 navDropdownItemTopDivTopMenuClass";
    NAV_DROPDOWN_TOP_DIV_HAMBURGER_CLASS: "block relative group navDropdownTopDivHamburgerClass";
    NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS: "1-space-y-2 navDropdownTopDivMobileMenuClass";
    NAV_DROPDOWN_TOP_DIV_SIDE_MENU_CLASS: "1-space-x-4 navDropdownTopDivSideMenuClass";
    NAV_DROPDOWN_TOP_DIV_TOP_MENU_CLASS: "relative group navDropdownTopDivTopMenuClass";
    NAV_LINK_BUTTON_HAMBURGER_CLASS: "block py-1 navLinkButtonsHamburgerClass";
    NAV_LINK_BUTTON_MOBILE_MENU_CLASS: "1-w-full 1-text-left 1-flex 1-justify-between 1-items-center py-2 px-2 rounded navLinkButtonsMobileMenuClass";
    NAV_LINK_BUTTON_SIDE_MENU_CLASS: "py-2 px-2 rounded navLinkButtonsSideMenuClass";
    NAV_LINK_BUTTON_TOP_MENU_CLASS: "rounded p-1 flex items-center navLinkButtonsTopMenuClass";
    NAV_LINK_ICON_CLASS: "w-8 h-8 navLinkIconClass";
    NAV_LINK_TOP_DIV_HAMBURGER_CLASS: "block relative group navLinkTopDivHamburgerClass";
    NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS: "1-flex 1-flex-col 1-space-y-2 navLinkTopDivMobileMenuClass";
    NAV_LINK_TOP_DIV_SIDE_MENU_CLASS: "navLinkTopDivSideMenuClass";
    NAV_LINK_TOP_DIV_TOP_MENU_CLASS: "relative group navLinkTopDivTopMenuClass";
    POPUP_TOP_MARGIN_CLASS: "pt-4 popupTopMarginClass";
    ROUNDED_ICON_CLASS: "rounded-full roundedIconClass";
    SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS: "ml-2 searchEngineButtonTopDivClass";
    SHOW_HIDE_PAGE_ANIMATION_DISABLED_CLASS: "ml-3 mr-3 hidden showHidePageAnimationDisabledClass";
    SHOW_HIDE_PAGE_ANIMATION_ENABLED_CLASS: "ml-3 mr-3 showHidePageAnimationEnabledClass";
    STROKE_WHITE_ICON_CLASS: "stroke-white";
    SUCCESS_MSG_CLASS: string;
    SUGGESTION_DROPDOWN_CLASS: "align-middle flex";
    TOP0_Z50_CLASS: "top-0 z-50 top0z50Class";
    VERTICALLY_CENTERED_CLASS: "flex items-center justify-center verticallyCenteredClass";
    VERTICAL_SLIDER_ICON_CLASS: "h-8 w-1.5 rounded-full bg-slate-400";
    VISIBLE_CLASS: "visible visibleClass";
    WARNING_MSG_CLASS: string;
    defaultTheme: {
        light: {
            primary: string;
            secondary: string;
            text: string;
            label: string;
            input: string;
            textHoverTop: string;
            textHoverTopSubMenu: string;
            textHoverSide: string;
            background: string;
            contentBg: string;
        };
        dark: {
            primary: string;
            secondary: string;
            text: string;
            label: string;
            input: string;
            textHoverTop: string;
            textHoverTopSubMenu: string;
            textHoverSide: string;
            background: string;
            contentBg: string;
        };
    };
}>;
declare var conversions: Readonly<{
    __proto__: null;
    calculateAge: (dateOfBirth: any) => number;
    convertCaloriesToUnit: (calories: any, fromUnit: any, ...args: any[]) => number;
    convertHeight: (height: any, height_unit: any, target_unit: any) => any;
    convertWeight: (weight: any, weight_unit: any, target_unit: any) => any;
    interpretString: (str: any) => any;
}>;
declare var dateTimestamp: Readonly<{
    __proto__: null;
    addMissingTz: (stringDate: any) => string;
    addZeroTimeToDate: (dateValue: any) => string;
    dateToTimestap: (stringDate: any) => number;
    fixDateWithTz: (dateTimeString: any) => any;
    nowToTimestap: () => number;
    processDateToTimestamp: (dateTime: any) => number;
    processTimestampToDate: (timestampMixed: any, fullDatetime: any, separator: any) => string;
    timestampToDate: (timestamp: any, ...args: any[]) => string;
}>;
declare var db_service: Readonly<{
    __proto__: null;
    MULTIPART_FORM_DATA_HEADER: {
        'Content-Type': string;
    };
    convertId: (id: any) => any;
    dbApiService: typeof dbApiService;
}>;
declare var dictUtilities: Readonly<{
    __proto__: null;
    mergeDicts: (dictToAdd: any, originDict: any) => any;
}>;
declare var errorAndReenter: Readonly<{
    __proto__: null;
    errorAndReEnter: typeof errorAndReEnter;
    errorAndReEnterNonModal: typeof errorAndReEnterNonModal;
    errorAndRetry: typeof errorAndRetry;
    errorLoginAgain: typeof errorLoginAgain;
    errorMessageDiv: typeof errorMessageDiv;
    formatCaughtError: (error: any) => {
        error: boolean;
        message: any;
    };
    getErrorMessage: (error: any) => any;
    includesAppValidLinks: (message: any) => boolean;
    isSessionExpired: (errorMessage: any) => boolean;
    logoutHander: typeof logoutHander;
    refreshPage: typeof refreshPage;
}>;
declare var general_constants: Readonly<{
    __proto__: null;
    ACTION_CREATE: "create";
    ACTION_DELETE: "delete";
    ACTION_LIST: "list";
    ACTION_READ: "read";
    ACTION_UPDATE: "update";
    GENDERS: {
        title: any;
        value: string;
    }[];
    LANGUAGES: {
        title: any;
        value: string;
    }[];
    MSG_ACTIONS: "Actions";
    MSG_ACTION_CANCEL: "Cancel";
    MSG_ACTION_CREATE: "Create";
    MSG_ACTION_DELETE: "Delete";
    MSG_ACTION_EDIT: "Edit";
    MSG_ACTION_LIST: "Listing";
    MSG_ACTION_NEW: "New";
    MSG_ACTION_READ: "View";
    MSG_ACTION_UPDATE: "Update";
    MSG_ALT_WAIT_ANIMATION: "Wait...";
    MSG_DELETE_CONFIRM: "Are you sure to delete this element? Please confirm with the [Delete] button or [Cancel] this operation.";
    MSG_DONE_CREATED: "Item has been created";
    MSG_DONE_DELETED: "Item has been deleted";
    MSG_DONE_UPDATED: "Item has been updated";
    MSG_ERROR_CLICK_TO_RELOGIN: "Login again";
    MSG_ERROR_CLICK_TO_RETRY: "Retry";
    MSG_ERROR_CONNECTION_FAIL: "Connection failure";
    MSG_ERROR_ID_NOT_FOUND: "ID not found...";
    MSG_ERROR_INVALID_CREDS: "The username or password is incorrect. Please try again.";
    MSG_ERROR_INVALID_TOKEN: string[];
    MSG_ERROR_MISSING_ARRAY_NAME_PARAM: "Missing \"array_name\" parameter. It must be specified for subType \"array\".";
    MSG_ERROR_POSSIBLE_CORS: "Possible CORS";
    MSG_ERROR_SESSION_EXPIRED: "Session expired.";
    MSG_IS_REQUIRED: "is required";
    MSG_MORE: "More";
    MSG_MUST_BE: "must be";
    MSG_NEXT: "Next";
    MSG_OF: "of";
    MSG_PAGE: "Page";
    MSG_PREVIOUS: "Previous";
    MSG_RELOAD: "Reload";
    MSG_ROWS_PER_PAGE: "Rows per page";
    MSG_SEARCH: "Search";
    MSG_SELECT_AN_OPTION: "Select an option...";
    MSG_VALID_DATE: "a valid date";
    MSG_VALID_EMAIL: "a valid email address";
    MSG_VALID_INTEGER: "an integer number";
    MSG_VALID_NUMBER: "a number";
    ROWS_PER_PAGE: 5;
    TRUE_FALSE: {
        title: any;
        value: string;
    }[];
    WAIT_ANIMATION_IMG: "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
    YES_NO: {
        title: any;
        value: string;
    }[];
    imageDirectory: "static/media/";
}>;
declare var generic_editor_rfc_common: Readonly<{
    __proto__: null;
    getEditoObj: (props: any, editor_response: any) => any;
    getEditorData: (props: any) => any;
    getEditorFlags: (action: any) => {
        isEdit: boolean;
        isCreate: boolean;
        isRead: boolean;
        isUpdate: boolean;
        isDelete: boolean;
        isReadOnly: boolean;
    };
    getIsReadOnly: (mode: any) => boolean;
    getSelectFieldsOptions: (fieldElements: any) => {
        name: any;
        promiseResult: any;
    }[];
    setEditorParameters: (props: any) => Promise<{
        error: boolean;
        error_message: string;
        response: null;
    }> | null;
}>;
declare var generic_editor_rfc_formpage: Readonly<{
    __proto__: null;
    FormPage: (_ref: any) => React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement> | React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
    getFieldElementsYupValidations: (editor: any, editorFlags: any) => any;
}>;
declare var generic_editor_rfc_provider: Readonly<{
    __proto__: null;
    MainSectionContext: React.Context<any>;
    MainSectionProvider: (_ref: any) => React.FunctionComponentElement<React.ProviderProps<any>>;
}>;
declare var generic_editor_rfc_search: Readonly<{
    __proto__: null;
    CrudEditorSearch: (_ref: any) => React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
}>;
declare var generic_editor_rfc_search_engine_button: Readonly<{
    __proto__: null;
    SearchEngineButton: (_ref: any) => React.FunctionComponentElement<{
        children?: React.ReactNode | undefined;
    }>;
}>;
declare var generic_editor_rfc_selector: Readonly<{
    __proto__: null;
    GenericSelectDataPopulator: (props: any) => any;
    GenericSelectGenerator: (props: any) => any;
    getSelectDescription: (currentObj: any, dbRow: any) => any;
    putSelectOptionsFromArray: (select_array_elements: any, ...args: any[]) => React.ReactElement<{
        key: any;
        value: any;
    }, string | React.JSXElementConstructor<any>>[];
}>;
declare var generic_editor_rfc_service: Readonly<{
    __proto__: null;
    ConvertToComponents: (editorDataObj: any, registry: any) => any;
    GenericCrudEditor: (_ref: any) => React.FunctionComponentElement<{
        children?: React.ReactNode | undefined;
    }>;
    GetFormData: (editorData: any, registry: any, ...args: any[]) => any;
}>;
declare var generic_editor_rfc_specific_func: Readonly<{
    __proto__: null;
    genericFuncArrayDefaultValue: (...args: any[]) => {
        error: boolean;
        errorMsg: string;
        fieldMsg: {};
        fieldValues: any;
        fieldsToDelete: never[];
        otherData: {};
    };
    mandatoryFiltersDbListPreRead: (data: any, editor: any, action: any, currentUser: any) => Promise<any>;
    mandatoryFiltersDbPreRead: (data: any, editor: any, action: any, currentUser: any) => Promise<any>;
    processGenericFuncArray: (editor: any, funcArrayName: any, data: any, action: any, currentUser: any) => Promise<any>;
}>;
declare var generic_editor_rfc_suggestion_dropdown: Readonly<{
    __proto__: null;
    SuggestionDropdown: (_ref: any) => React.FunctionComponentElement<{
        children?: React.ReactNode | undefined;
    }>;
}>;
declare var generic_editor_rfc_timestamp: Readonly<{
    __proto__: null;
    timestampDbListPostRead: (dataRead: any, editor: any, action: any) => Promise<any>;
    timestampDbPostRead: (dataRead: any, editor: any, action: any) => Promise<any>;
    timestampDbPreWrite: (row: any, editor: any, action: any) => Promise<any>;
}>;
declare var generic_editor_rfc_ui: Readonly<{
    __proto__: null;
    ShowAsDisabledField: (_ref: any) => React.FunctionComponentElement<{
        children?: React.ReactNode | undefined;
    }>;
}>;
declare var generic_editor_singlepage: Readonly<{
    __proto__: null;
    GenericSinglePageEditor: (_ref: any) => React.FunctionComponentElement<{
        children?: React.ReactNode | undefined;
    }>;
    GenericSinglePageEditorMain: (props: any) => React.FunctionComponentElement<{
        children?: React.ReactNode | undefined;
    }> | React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement> | React.DetailedReactHTMLElement<{
        className: string;
    }, HTMLElement>;
}>;
declare var generic_editor_utilities: Readonly<{
    __proto__: null;
    defaultValue: (dictObj: any, elementName: any, ...args: any[]) => any;
    replaceSpecialVars: (params: any, currentUser: any) => any;
}>;
declare var generic_menu_service: Readonly<{
    __proto__: null;
    DefaultRoutes: () => React.FunctionComponentElement<any>;
    GenericMenuBuilder: (_ref3: any) => any;
    GetHashRoutes: (_ref: any) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    editorMenuOption: (editor: any, itemType: any, mobileMenuMode: any, componentMap: any, setExpanded: any) => React.FunctionComponentElement<any>;
    editorRoute: (editor: any, itemDefs: any) => {
        key: any;
        exact: any;
        path: string;
        element: any;
        template: any;
        on_click_string: any;
    };
    getDefaultRoutes: (currentUser: any, componentMap: any, setExpanded: any) => {
        key: string;
        path: string;
        element: () => React.FunctionComponentElement<any>;
    }[];
    getDefaultRoutesRaw: (componentMap: any) => {
        title: string;
        path: string;
        element: string;
        type: string;
    }[];
    getMenuFromApi: (state: any, setState: any, setMenuOptions: any) => void;
    getRoutes: (currentUser: any, menuOptions: any, componentMap: any, setExpanded: any) => {
        key: string;
        path: string;
        element: () => React.FunctionComponentElement<any>;
    }[];
    getRoutesRaw: (currentUser: any, menuOptions: any, componentMap: any, setExpanded: any) => {
        key: string;
        path: string;
        element: () => React.FunctionComponentElement<any>;
    }[];
}>;
declare var history$2: Readonly<{
    __proto__: null;
    getLastUrl: () => string;
    getPrefix: typeof getPrefix;
    getUrlForRouter: (url: any) => string;
    hasHashRouter: string | true;
    history: any;
    removeLastUrl: () => void;
    setLastUrl: (...args: any[]) => void;
}>;
declare var jsonUtilities: Readonly<{
    __proto__: null;
    buildConstant: (constants: any) => {
        title: any;
        value: string;
    }[];
}>;
declare var logging_service: Readonly<{
    __proto__: null;
    console_debug_log: typeof console_debug_log;
    get_debug_flag: typeof get_debug_flag;
}>;
declare var logout_service: Readonly<{
    __proto__: null;
    currentUserSubject: BehaviorSubject<any>;
    getCurrentUserFromLocalStorage: () => any;
    logout: typeof logout;
}>;
declare var media: Readonly<{
    __proto__: null;
    getMediaTypeToRecord: () => {
        extension: string;
        options: {};
    };
    mediaSupported: () => string[];
}>;
declare var ramdomize: Readonly<{
    __proto__: null;
    randomKey: () => string;
}>;
declare var response_handlers_service: Readonly<{
    __proto__: null;
    IsJsonString: typeof IsJsonString;
    handleFetchError: typeof handleFetchError;
    handleResponse: typeof handleResponse;
    handleResponseText: typeof handleResponseText;
    usePlainFetch: false;
}>;
declare var mocks: Readonly<{
    __proto__: null;
    mockAuthService: typeof mockAuthService;
    mockDefaultComponentMap: typeof mockDefaultComponentMap;
    mockFetch: typeof mockFetch;
    mockUserData: typeof mockUserData;
}>;
declare var ui: Readonly<{
    __proto__: null;
    CopyButton: (_ref2: any) => React.FunctionComponentElement<{
        children?: React.ReactNode | undefined;
    }>;
    LinkifyText: (_ref: any) => React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    getElementWithErrorHandling: (elementId: any) => HTMLElement | null;
    growUpTextArea: (textAreaId: any, conversationBlockId: any, sectionViewportHeight: any, maxOffsetHeight: any, ...args: any[]) => void;
    growUpTextAreaInner: (textAreaId: any, conversationBlockId: any, sectionViewportHeight: any, maxOffsetHeight: any, ...args: any[]) => void;
    isMobileDevice: () => boolean;
    isWindowWide: () => boolean;
    resetTextArea: (textAreaId: any, conversationBlockId: any, sectionViewportHeight: any, maxOffsetHeight: any, ...args: any[]) => void;
    resizeManager: (callback: any) => {
        addListener: () => void;
        removeListener: () => void;
    };
    toggleIdVisibility: (onOff: any, ids: any) => void;
}>;
declare var urlParams: Readonly<{
    __proto__: null;
    getUrlParams: typeof getUrlParams;
}>;
declare var wait_animation_utility: Readonly<{
    __proto__: null;
    ShowHidePageAnimation: (showAnimation: any, ...args: any[]) => void;
    WaitAnimation: () => React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
}>;

declare function authHeader(): {
    'x-access-tokens': any;
    Authorization?: undefined;
} | {
    Authorization: string;
    'x-access-tokens'?: undefined;
} | {
    'x-access-tokens'?: undefined;
    Authorization?: undefined;
};
declare class dbApiService {
    constructor(props: any);
    props: any;
    paramsToUrlQuery(params: any): string;
    getFetch(url: any, requestOptions: any): Promise<any> | undefined;
    getAll(...args: any[]): Promise<any> | undefined;
    getOne(params: any, ...args: any[]): Promise<any> | undefined;
    createUpdateDelete(action: any, id: any, data: any, ...args: any[]): Promise<any>;
    createRow(data: any, ...args: any[]): Promise<any>;
    updateRow(id: any, data: any, ...args: any[]): Promise<any>;
    deleteRow(id: any, data: any, ...args: any[]): Promise<any>;
    convertId(id: any): any;
}
declare function errorAndReEnter(error: any, ...args: any[]): React.FunctionComponentElement<any>;
declare function errorAndReEnterNonModal(error: any, ...args: any[]): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
declare function errorAndRetry(errorMessage: any, ...args: any[]): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
declare function errorLoginAgain(errorMessage: any, ...args: any[]): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
declare function errorMessageDiv(errorMessage: any): React.DetailedReactHTMLElement<{
    style: {
        textAlign: "center";
    };
    className: string;
}, HTMLElement>;
declare function logoutHander(): void;
declare function refreshPage(): void;
declare function getPrefix(...args: any[]): string;
declare function console_debug_log(debug_message: any, ...args: any[]): void;
declare function get_debug_flag(): any;

declare function logout(...args: any[]): void;
declare function IsJsonString(str: any): boolean;
declare function handleFetchError(error: any): Promise<never>;
declare function handleResponse(response: any): any;
declare function handleResponseText(response: any, text: any, headers: any): Promise<never> | {
    headers: any;
    file: any;
    error: boolean;
    message: any;
    resultset: any;
};
declare function mockAuthService(): {
    codeFile: string;
    response: {
        authenticationService: {
            currentUserValue: {
                token: string;
            };
        };
        getUserData: () => Promise<{
            error: boolean;
            error_message: null;
            resultset: {
                _id: string;
                first_name: string;
                last_name: string;
                superuser: number;
            };
        }>;
        getCurrentUserData: () => Promise<{
            resultset: {
                error: boolean;
                error_message: null;
                resultset: {
                    _id: string;
                    first_name: string;
                    last_name: string;
                    superuser: number;
                };
            };
        }>;
    };
};
declare function mockDefaultComponentMap(): {
    defaultTheme: {
        light: {
            primary: string;
            secondary: string;
            text: string;
            label: string;
            input: string;
            textHoverTop: string;
            textHoverTopSubMenu: string;
            textHoverSide: string;
            background: string;
            contentBg: string;
        };
        dark: {
            primary: string;
            secondary: string;
            text: string;
            label: string;
            input: string;
            textHoverTop: string;
            textHoverTopSubMenu: string;
            textHoverSide: string;
            background: string;
            contentBg: string;
        };
    };
};
declare function mockFetch(data: any, ...args: any[]): jest.Mock<any, any, any>;
declare function mockUserData(): {
    codeFile: string;
    response: {
        currentUser: {
            id: string;
            firstName: string;
            token: string;
        };
        registerUser: () => null;
        unRegisterUser: () => null;
    };
};
declare function getUrlParams(...args: any[]): {};

export { About, AboutBody, App, AppContext$1 as AppContext, AppFooter, GeneralConfig, GeneralConfig_EditorData, HomePage, IconsLib, LoginPage, ModalPopUp$1 as ModalPopUp, NavLib, PrivateRoute$1 as PrivateRoute, UserContext$1 as UserContext, UserProfileEditor, Users, UsersConfig, UsersConfig_EditorData, UsersDbListPreRead, UsersDbPreWrite, UsersPasswordValidations, UsersProfile_EditorData, UsersValidations, Users_EditorData, app_constants as appConstants, appLogoCircle, appLogoLandscape, authHeader$1 as authHeader, authentication_service as authenticationService, blob_files_utilities as blobFilesUtilities, class_name_constants as classNameConstants, conversions, dateTimestamp, db_service as dbService, dictUtilities, errorAndReenter, general_constants as generalConstants, generic_editor_rfc_common as genericEditorRfcCommon, generic_editor_rfc_formpage as genericEditorRfcFormpage, generic_editor_rfc_provider as genericEditorRfcProvider, generic_editor_rfc_search as genericEditorRfcSearch, generic_editor_rfc_search_engine_button as genericEditorRfcSearchEngineButton, generic_editor_rfc_selector as genericEditorRfcSelector, generic_editor_rfc_service as genericEditorRfcService, generic_editor_rfc_specific_func as genericEditorRfcSpecificFunc, generic_editor_rfc_suggestion_dropdown as genericEditorRfcSuggestionDropdown, generic_editor_rfc_timestamp as genericEditorRfcTimestamp, generic_editor_rfc_ui as genericEditorRfcUi, generic_editor_singlepage as genericEditorSinglepage, generic_editor_utilities as genericEditorUtilities, generic_menu_service as genericMenuService, history$2 as history, jsonUtilities, logging_service as loggingService, logout_service as logoutService, media, ramdomize, response_handlers_service as responseHandlersService, mocks as testHelpersMocks, ui, urlParams, wait_animation_utility as waitAnimationUtility };
