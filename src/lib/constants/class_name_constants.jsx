export const defaultTheme = {
  light: {
    primary: 'bg-blue-600 defaultThemeLightPrimary',
    secondary: 'bg-gray-200 defaultThemeLightSecondary',
    text: 'text-gray-800 defaultThemeLightText',
    label: 'text-gray-700 defaultThemeLightLabel',
    input: 'text-gray-800 defaultThemeLightInput',
    textHoverTop: 'hover:bg-blue-400 defaultThemeLightTextHoverTop',
    textHoverTopSubMenu: 'hover:bg-gray-200 defaultThemeLightTextHoverTopSubMenu',
    textHoverSide: 'hover:bg-gray-300 defaultThemeLightTextHoverSide',
    background: 'bg-gray-100 defaultThemeLightBackground',
    contentBg: 'bg-gray-300 defaultThemeLightContentBg',
  },
  dark: {
    primary: 'bg-blue-800 defaultThemeDarkPrimary',
    secondary: 'bg-gray-700 defaultThemeDarkSecondary',
    text: 'text-gray-200 defaultThemeDarkText',
    label: 'text-white defaultThemeDarkLabel',
    input: 'text-black defaultThemeDarkInput',
    textHoverTop: 'hover:bg-blue-400 defaultThemeDarkTextHoverTop',
    textHoverTopSubMenu: 'hover:bg-gray-200 defaultThemeDarkTextHoverTopSubMenu',
    textHoverSide: 'hover:bg-gray-400 defaultThemeDarkTextHoverSide',
    background: 'bg-gray-900 defaultThemeDarkBackground',
    contentBg: 'bg-slate-500 defaultThemeDarkContentBg',
  }
}

// Navlib

export const MAIN_CONTAINER_FOR_TOP_MENU_CLASS = "flex flex-col min-h-screen mainContainerForTopMenuClass";
export const MAIN_CONTAINER_FOR_SIDE_MENU_CLASS = "flex min-h-screen mainContainerForSideMenuClass";

export const APP_SECTION_CONTAINER_FOR_TOP_MENU_CLASS = "grow appSectionContainerForTopMenuClass";
export const APP_SECTION_CONTAINER_FOR_SIDE_MENU_CLASS = "grow flex flex-col appSectionContainerForSideMenuClass";

export const APP_SECTION_CONTAINER_FOR_SIDE_MENU_MAIN_CLASS = "grow appSectionContainerForSideMenuMainClass";

export const APP_FOOTER_CONTAINER_CLASS = "p-1 text-white text-center appFooterContainerClass";

export const CENTERED_BOX_CONTAINER_DIV_1_CLASS = "z-50 overflow-auto centeredBoxContainerDiv1Class";
export const CENTERED_BOX_CONTAINER_DIV_2_CLASS = "1-relative w-fit max-w-md m-auto flex-col flex rounded-lg centeredBoxContainerDiv2Class";
export const CENTERED_BOX_CONTAINER_DIV_3_CLASS = "flex flex-col items-center pt-1 pb-4 p-6 centeredBoxContainerDiv3Class";

export const NAVBAR_HEADER_FOR_TOP_MENU_CLASS = "flex items-center justify-between p-1 text-white navbarHeaderForTopMenuClass";
export const NAVBAR_HEADER_FOR_SIDE_MENU_CLASS = "top-0 left-0 w-64 p-2 overflow-y-auto transition-transform duration-300 ease-in-out 1-md:translate-x-0 lg:translate-x-0 z-20 navbarHeaderForSideMenuClass";
export const NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_OPEN_CLASS = 'translate-x-0 navbarHeaderForSideMenuMobileOpenClass';
export const NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_CLOSE_CLASS = 'navbarHeaderForSideMenuMobileCloseClass';

export const NAVBAR_TOP_FOR_SIDE_MENU_CLASS = "flex items-center justify-between p-1 text-white navbarTopForSideMenuClass";

export const NAVBAR_BRAND_ELEMENTS_FOR_TOP_MENU_CLASS = "flex items-center space-x-2 navbarBrandElementsForTopMenuClass";
export const NAVBAR_BRAND_ELEMENTS_FOR_SIDE_MENU_CLASS = "flex justify-between items-center mb-4 navbarBrandElementsForSideMenuClass";

export const NAVBAR_BRAND_NAME_CLASS = "text-2xl ml-2 font-bold navbarBrandNameClass";
export const NAVBAR_BRAND_APP_VERSION_CLASS = "text-xs navbarBrandAppVersionClass";
export const NAVBAR_BRAND_APP_LOGO_CLASS = "mx-auto my-0 navbarBrandAppLogoClass";

export const NAVBAR_TOP_CENTER_MENU_ON_TOP_CLASS = "flex space-x-4 navbarTopCenterMenuOnTopClass";
export const NAVBAR_TOP_CENTER_MENU_ON_LEFT_CLASS = 'space-y-2 navbarTopCenterMenuOnLeftClass';

export const NAVBAR_TOP_RIGHT_MENU_FOR_TOP_MENU_CLASS = "flex items-center space-x-4 navbarTopRightMenuForTopMenuClass";
export const NAVBAR_TOP_RIGHT_MENU_FOR_SIDE_MENU_CLASS = "flex items-center space-x-4 ml-auto navbarTopRightMenuForSideMenuClass";
export const NAVBAR_TOP_RIGHT_MENU_UNAUTHENTICATED_MARGIN_RIGHT_CLASS = "mr-2 navbarTopRightMenuUnauthenticatedMarginRightClass";

export const NAVBAR_MOBILE_MENU_DIV_1_CLASS = "fixed inset-0 bg-black bg-opacity-50 z-50 navbarMobileMenuDiv1Class";
export const NAVBAR_MOBILE_MENU_DIV_2_CLASS = "fixed inset-y-0 left-0 w-64 p-4 overflow-y-auto navbarMobileMenuDiv2Class";
export const NAVBAR_MOBILE_MENU_DIV_3_CLASS = "flex justify-between items-center mb-4 navbarMobileMenuDiv3Class";
export const NAVBAR_MOBILE_MENU_H2_CLASS = "text-xl font-bold navbarMobileMenuH2Class";
export const NAVBAR_MOBILE_CLOSE_BUTTON_CLASS = "p-2 rounded-full hover:bg-opacity-80 navbarMobileCloseButtonClass";
export const NAVBAR_MOBILE_CLOSE_BUTTON_ICON_CLASS = "h-6 w-6 navbarMobileCloseButtonIconClass";
export const NAVBAR_MOBILE_NAV_CLASS = "flex flex-col space-y-2 navbarMobileNavClass";

export const NAVBAR_TOGGLE_BUTTON_CLASS = "1-md:hidden 1-lg:hidden p-2 rounded-full hover:bg-opacity-80 navbarToggleButtonClass";
export const NAVBAR_TOGGLE_IMAGE_CLASS = "h-6 w-6 navbarToggleImageClass";

export const NAVBAR_TEXT_CLASS = 'flex items-center navbarTextClass';

export const NAV_LINK_TOP_DIV_TOP_MENU_CLASS = "relative group navLinkTopDivTopMenuClass";
export const NAV_LINK_TOP_DIV_HAMBURGER_CLASS = "block relative group navLinkTopDivHamburgerClass";
export const NAV_LINK_TOP_DIV_SIDE_MENU_CLASS = "navLinkTopDivSideMenuClass";
export const NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS = "1-flex 1-flex-col 1-space-y-2 navLinkTopDivMobileMenuClass";

export const NAV_LINK_BUTTON_TOP_MENU_CLASS = "rounded-sm p-1 flex items-center navLinkButtonsTopMenuClass";
export const NAV_LINK_BUTTON_HAMBURGER_CLASS = "block py-1 navLinkButtonsHamburgerClass";
export const NAV_LINK_BUTTON_SIDE_MENU_CLASS = "py-2 px-2 rounded-sm navLinkButtonsSideMenuClass";
export const NAV_LINK_BUTTON_MOBILE_MENU_CLASS = "1-w-full 1-text-left 1-flex 1-justify-between 1-items-center py-2 px-2 rounded-sm navLinkButtonsMobileMenuClass";

export const NAV_LINK_ICON_CLASS = "w-8 h-8 navLinkIconClass"
export const ROUNDED_ICON_CLASS = "rounded-full roundedIconClass"
export const ML2_ICON_CLASS = "ml-2 overflow-visible";
export const STROKE_WHITE_ICON_CLASS = "stroke-white";

export const VERTICAL_SLIDER_ICON_CLASS = "h-8 w-1.5 rounded-full bg-slate-400";

export const NAV_DROPDOWN_TOP_DIV_TOP_MENU_CLASS = "relative group navDropdownTopDivTopMenuClass";
export const NAV_DROPDOWN_TOP_DIV_HAMBURGER_CLASS = "block relative group navDropdownTopDivHamburgerClass";
export const NAV_DROPDOWN_TOP_DIV_SIDE_MENU_CLASS = "1-space-x-4 navDropdownTopDivSideMenuClass";
export const NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS = "1-space-y-2 navDropdownTopDivMobileMenuClass";

export const NAV_DROPDOWN_INNER_DIV_TOP_MENU_CLASS = "absolute hidden z-50 bg-white text-gray-800 p-2 rounded-sm shadow-lg navDropdownInnerDivTopMenuClass";
export const NAV_DROPDOWN_INNER_DIV_HAMBURGER_CLASS = "absolute right-0 hidden z-50 1-group-hover:block bg-white text-gray-800 p-2 rounded-sm shadow-lg navDropdownInnerDivHamburgerClass";
export const NAV_DROPDOWN_INNER_DIV_SIDE_MENU_CLASS = "ml-2 space-y-2 navDropdownInnerDivSideMenuClass";
export const NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS = "ml-2 space-y-2 navDropdownInnerDivMobileMenuClass";

export const NAV_DROPDOWN_BUTTON_TOP_MENU_CLASS = "rounded-sm p-1 flex items-center navDropdownButtonTopMenuClass";
export const NAV_DROPDOWN_BUTTON_HAMBURGER_CLASS = "rounded-sm p-2 block py-1 flex items-center navDropdownButtonHamburgerClass";
export const NAV_DROPDOWN_BUTTON_SIDE_MENU_CLASS = "1-w-full text-left flex justify-between items-center py-2 px-2 rounded-sm navDropdownButtonSideMenuClass";
export const NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS = "1-w-full text-left flex justify-between items-center py-2 px-2 rounded-sm navDropdownButtonMobileMenuClass";

export const NAV_DROPDOWN_IMAGE_TOP_MENU_CLASS = "navDropdownImageTopMenuClass";
export const NAV_DROPDOWN_IMAGE_HAMBURGER_CLASS = "navDropdownImageHamburgerClass";
export const NAV_DROPDOWN_IMAGE_SIDE_MENU_CLASS = "navDropdownImageSideMenuClass";
export const NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS = "h-4 w-4 transform transition-transform navDropdownImageMobileMenuClass";

export const NAV_DROPDOWN_ITEM_TOP_DIV_TOP_MENU_CLASS = "block py-1 navDropdownItemTopDivTopMenuClass";
export const NAV_DROPDOWN_ITEM_TOP_DIV_HAMBURGER_CLASS = "block py-1 navDropdownItemTopDivHamburgerClass";
export const NAV_DROPDOWN_ITEM_TOP_DIV_SIDE_MENU_CLASS = "block rounded-sm navDropdownItemTopDivSideMenuClass";
export const NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS = "block rounded-sm navDropdownItemTopDivMobileMenuClass";

export const NAV_DROPDOWN_ITEM_BUTTON_TOP_MENU_CLASS = "rounded-sm px-2 flex items-center navDropDownItemButtonsTopMenuClass";
export const NAV_DROPDOWN_ITEM_BUTTON_HAMBURGER_CLASS = "rounded-sm block px-2 navDropDownItemButtonsHamburgerClass";
export const NAV_DROPDOWN_ITEM_BUTTON_SIDE_MENU_CLASS = "rounded-sm px-2 py-2 navDropDownItemButtonsSideMenuClass";
export const NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS = "1-w-full 1-text-left 1-flex 1-justify-between 1-items-center rounded-sm py-2 px-2 navDropDownItemButtonsMobileMenuClass";

// Alert messages and message boxes

export const ALERT_BASE_CLASS = "1-relative p-3 border border-transparent rounded-sm alertBaseClass";
export const ALERT_DANGER_CLASS = `${ALERT_BASE_CLASS} text-red-800 bg-red-100 border-red-200 alertDangerClass`;
export const ALERT_WARNING_CLASS = `${ALERT_BASE_CLASS} text-yellow-800 bg-yellow-100 border-yellow-200 alertWarningClass`;
export const ALERT_INFO_CLASS = `${ALERT_BASE_CLASS} text-cyan-800 bg-cyan-100 border-cyan-200 alertInfoClass`;
export const ALERT_SUCCESS_CLASS = `${ALERT_BASE_CLASS} text-green-800 bg-green-100 border-green-200 alertSuccessClass`;

export const ERROR_MSG_CLASS = `${ALERT_DANGER_CLASS} mt-4 p-2 rounded-md errorMsgClass`;
export const WARNING_MSG_CLASS = `${ALERT_WARNING_CLASS} mt-4 p-2 rounded-md warningMsgClass`;
export const INFO_MSG_CLASS = `${ALERT_INFO_CLASS} mt-4 p-2 rounded-md infoMsgClass`;
export const SUCCESS_MSG_CLASS = `${ALERT_SUCCESS_CLASS} mt-4 p-2 rounded-md successMsgClass`;
export const GRAY_BOX_MSG_CLASS = `${ALERT_BASE_CLASS} text-black bg-gray-200 mt-4 p-2 rounded-md grayBoxMsgClass`;

// Forms

export const FORM_GROUP_CLASS = "mb-4 formGroupClass";
export const FORM_CONTROL_CLASS = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white formControlClass";
export const INVALID_FEEDBACK_CLASS = "text-red-800 text-sm mt-1 invalidFeedbackClass";
export const IS_INVALID_CLASS = "border-red-500 isInvalidClass";
export const DISABLE_FIELD_BACKGROUND_COLOR_CLASS = 'bg-gray-200 disableFieldBackgroundColorClass';

// Other general classes

export const HIDDEN_CLASS = 'hidden hiddenClass';
export const VISIBLE_CLASS = 'visible visibleClass';
export const INLINE_CLASS = 'inline inlineClass';

export const HORIZONTALLY_CENTERED_CLASS = "flex flex-col items-center horizontallyCenteredClass";
export const VERTICALLY_CENTERED_CLASS = "flex items-center justify-center verticallyCenteredClass";

export const TOP0_Z50_CLASS = "top-0 z-50 top0z50Class";

// Buttons

export const BUTTON_PRIMARY_CLASS = "bg-blue-500 text-white font-medium py-2 px-4 rounded-xl hover:bg-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 buttonPrimaryClass";
export const BUTTON_SECONDARY_CLASS = "bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl hover:bg-gray-400 focus:outline-hidden focus:ring-2 focus:ring-gray-500 buttonSecondaryClass";

// Special buttons

export const BUTTON_COMPOSED_LABEL_CLASS = "flex items-center buttonComposedLabelClass";

export const MENU_MODE_BUTTON_TOP_DIV_CLASS = "mt-1 menuModeButtonTopDivClass";

export const DARK_MODE_BUTTON_TOP_DIV_CLASS = "mt-1 darkModeButtonTopDivClass";
export const DARK_MODE_BUTTON_SVG_CLASS = "w-6 h-6 darkModeButtonSvgClass";
export const DARK_MODE_BUTTON_DARK_HIDDEN_CLASS = "dark:hidden darkModeButtonDarkHiddenClass";
export const DARK_MODE_BUTTON_DARK_INLINE_CLASS = "hidden dark:inline darkModeButtonDarkInlineClass";

// Generic CRUD editor (GCE_RFC) - BEGIN

// Listing page buttons (GCE_RFC)

export const BUTTON_LISTING_CLASS = "bg-blue-500 text-white p-2 rounded-xl text-sm buttonListingClass";
export const BUTTON_LISTING_DISABLED_CLASS = `${BUTTON_LISTING_CLASS} opacity-50 buttonListingDisabledClass`;
export const BUTTON_LISTING_NEW_CLASS = `${BUTTON_LISTING_CLASS} buttonListingNewClass`;
export const BUTTON_LISTING_REFRESH_CLASS = `${BUTTON_LISTING_CLASS} text-xs buttonListingRefreshClass`;

// General app section (GCE_RFC)

export const APP_GENERAL_MARGINS_CLASS = 'mt-2 mb-2 ml-2 mr-2 p-2 rounded-lg appGeneralMarginsClass';

export const APP_TOP_DIV_CLASS = `${APP_GENERAL_MARGINS_CLASS} rounded-lg appTopDivClass`;
export const APP_LEVEL2_DIV_CLASS = "overflow-x-auto appLevel2DivClass";
export const APP_TITLE_H1_CLASS = 'text-xl font-bold mb-4 appTitleH1Class';
export const APP_TITLE_RECYCLE_BUTTON_CLASS = "pl-2 align-bottom appTitleRecycleButtonClass";

export const APP_SIDE_MENU_BG_COLOR_CLASS = "bg-white dark:bg-gray-800 appSideMenuBgColorClass";

// Listing page (GCE_RFC)

export const APP_LISTING_TABLE_CLASS = "w-full text-sm appListingTableClass";
export const APP_LISTING_TABLE_HDR_THEAD_CLASS = "bg-white dark:bg-black appListingTableHdrTheadClass";
export const APP_LISTING_TABLE_HDR_TR_CLASS = "appListingTableHdrTrClass";
export const APP_LISTING_TABLE_HDR_TH_CLASS = "text-left p-2 appListingTableHdrThClass";
export const APP_LISTING_TABLE_HRD_ACTIONS_COL_CLASS = 'appListingTableHrdActionsColClass';
export const APP_LISTING_TABLE_BODY_TBODY_CLASS = `appListingTableBodyTbodyClass`;
export const APP_LISTING_TABLE_BODY_TR_ODD_CLASS = 'hover:bg-opacity-80 appListingTableBodyTrOddClass';
export const APP_LISTING_TABLE_BODY_TR_EVEN_CLASS = 'hover:bg-opacity-80 appListingTableBodyTrEvenClass';
export const APP_LISTING_TABLE_BODY_TR_ACTIONS_ODD_CLASS = 'appListingTableBodyTrActionsOddClass';
export const APP_LISTING_TABLE_BODY_TR_ACTIONS_EVEN_CLASS = 'appListingTableBodyTrActionsEvenClass';

export const APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS = "p-2 appListingTableBodyTdBaseOddClass";
export const APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS = "p-2 appListingTableBodyTdBaseEvenClass";
export const APP_LISTING_TABLE_BODY_TD_ODD_CLASS = `${APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS} break-words appListingTableBodyTdOddClass`;
export const APP_LISTING_TABLE_BODY_TD_EVEN_CLASS = `${APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS} break-words appListingTableBodyTdEvenClass`;
export const APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS = `${APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS} bg-opacity-80 whitespace-nowrap text-sm space-x-2 appListingTableBodyTdActionsOddClass`;
export const APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS = `${APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS} bg-opacity-80 whitespace-nowrap text-sm space-x-2 appListingTableBodyTdActionsEvenClass`;

// Listing page search box (GCE_RFC)

export const APP_LISTING_SEARCH_BOX_TOP_DIV_CLASS = "flex items-center space-x-2 appListingSearchBoxTopDivClass";
export const APP_LISTING_SEARCH_BOX_LABEL_CLASS = "mr-2 text-sm appListingSearchBoxLabelClass";
export const APP_LISTING_SEARCH_BOX_INPUT_CLASS = "p-2 rounded-xl border border-gray-300 bg-white w-40 text-sm appListingSearchBoxInputClass";
export const APP_LISTING_SEARCH_BOX_SUBMIT_BUTTON_CLASS = `${BUTTON_LISTING_CLASS} ml-2 mr-2 text-xs appListingSearchBoxSubmitButtonClass`;
export const APP_LISTING_SEARCH_BOX_STOP_BUTTON_CLASS = `${BUTTON_LISTING_CLASS} mr-2 text-xs appListingSearchBoxStopButtonClass`;
export const SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS = 'ml-2 searchEngineButtonTopDivClass';

// Listing page bottom toolbar (next and previous page, lines per page, search) (GCE_RFC)

export const APP_LISTING_TOOLBAR_TOP_DIV_CLASS = "flex items-center mt-4 space-x-4 1-sm:space-y-0 appListingToolbarTopDivClass";
export const APP_LISTING_TOOLBAR_TOP_DIV_WIDE_CLASS = "flex-row appListingToolbarTopDivWideClass";
export const APP_LISTING_TOOLBAR_TOP_DIV_NOT_WIDE_CLASS = "flex-col appListingToolbarTopDivNotWideClass";

export const APP_LISTING_TOOLBAR_PAGINATION_SECTION_CLASS = "text-sm flex items-center space-x-2 appListingToolbarPaginationSectionClass";

export const APP_LISTING_TOOLBAR_PAGE_NUM_SECTION_CLASS = "text-sm flex items-center appListingToolbarPageNumSectionClass";

export const APP_LISTING_TOOLBAR_ROW_PER_PAGE_SECTION_CLASS = "text-sm flex items-center appListingToolbarRowPerPageSectionClass";
export const APP_LISTING_TOOLBAR_ROW_PER_PAGE_LABEL_CLASS = "mr-2 text-sm appListingToolbarRowPerPageLabelClass";
export const APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS = "p-2 rounded-xl border border-gray-300 bg-white appListingToolbarRowPerPageInputClass";

export const APP_LISTING_TOOLBAR_WAIT_ANIMATION_CLASS = "ml-3 mr-3 hidden appListingToolbarWaitAnimationClass";

// Data page (GCE_RFC)

export const APP_FORMPAGE_LABEL_CLASS = "font-medium appFormPageLabelClass";
export const APP_FORMPAGE_LABEL_REQUIRED_CLASS = "font-medium text-red-700 appFormPageLabelRequiredClass";
export const APP_FORMPAGE_FORM_BUTTON_BAR_CLASS = "flex align-middle space-x-4 appFormPageFormButtonBarClass";
export const APP_FORMPAGE_FIELD_CLASS = `flex flex-col ${FORM_GROUP_CLASS} appFormPageFieldClass`;
export const APP_FORMPAGE_FIELD_BASE_CLASS = `${FORM_CONTROL_CLASS} border border-gray-300 p-2 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500 appFormPageFieldBaseClass`;
export const APP_FORMPAGE_FIELD_GOOD_CLASS = `${APP_FORMPAGE_FIELD_BASE_CLASS} appFormPageFieldGoodClass`;
export const APP_FORMPAGE_FIELD_INVALID_CLASS = `${APP_FORMPAGE_FIELD_BASE_CLASS} is-invalid appFormPageFieldInvalidClass`;
export const APP_FORMPAGE_SPECIAL_BUTTON_DIV_CLASS = "align-middle flex appFormPageSpecialButtonDivClass";
export const APP_FORMPAGE_CHILD_COMPONENTS_TOP_DIV_CLASS = "mt-6 appFormPageChildComponentsTopDivClass";

// Generic CRUD editor (GCE_RFC) - END

// Pop-ups

export const POPUP_TOP_MARGIN_CLASS = "pt-4 popupTopMarginClass";

// ModalLib

export const MODALIB_MODAL_DIV_1_CLASS = "z-50 fixed inset-0 1-bg-black 1-bg-opacity-50 flex items-center justify-center p-4 modalibModalDiv1Class";
export const MODALIB_MODAL_DIV_2_CLASS = "rounded-lg shadow-xl w-full max-w-md modalibModalDiv2Class";
export const MODALIB_MODAL_DIV_3_CLASS = "p-6 modalibModalDiv3Class";

export const MODALIB_MODAL_ICON_1_CLASS = "flex justify-center mb-4 modalibModalIcon1Class";
export const MODALIB_MODAL_ICON_2_CLASS = "rounded-full p-2 modalibModalIcon2Class";
export const MODALIB_MODAL_ICON_3_CLASS = "w-6 h-6 modalibModalIcon3Class";
export const MODALIB_MODAL_HEADER_CLASS = "modalibModalHeaderClass";
export const MODALIB_MODAL_TITLE_CLASS = "text-xl font-semibold text-center mb-2 modalibModalTitleClass";
export const MODALIB_MODAL_BODY_CLASS = "text-center mb-6 max-h-80 overflow-auto modalibModalBodyClass";
export const MODALIB_MODAL_FOOTER_CLASS = "flex mt-4 modalibModalFooterClass";
export const MODALIB_MODAL_FOOTER_WIDE_CLASS = "flex-row space-x-4 modalibModalFooterWideClass";
export const MODALIB_MODAL_FOOTER_NOT_WIDE_CLASS = "flex-col-reverse space-y-4 space-y-reverse modalibModalFooterNotWideClass";

export const MODALIB_BUTTON_BASESTYLE_CLASS = 'px-4 py-2 border rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-offset-2 modalibButtonBaseStyleClass';
export const MODALIB_BUTTON_BASESTYLE_WIDE_CLASS = 'flex-1 modalibButtonBaseStyleWideClass';
export const MODALIB_BUTTON_BASESTYLE_NOT_WIDE_CLASS = 'w-full flex justify-center modalibButtonBaseStyleNotWideClass';

export const MODALIB_BUTTON_PRIMARY_CLASS = `${BUTTON_PRIMARY_CLASS} modalibButtonPrimaryClass`;
export const MODALIB_BUTTON_SECONDARY_CLASS = `${BUTTON_SECONDARY_CLASS} modalibButtonSecondaryClass`;

export const MODALIB_BUTTON_SUCCESS_CLASS = 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400 modalibButtonSuccessClass';
export const MODALIB_BUTTON_DANGER_CLASS = 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 modalibButtonDangerClass';

// Login page

export const LOGIN_PAGE_APP_LOGO_CLASS = "mx-auto my-0 loginPageAppLogoClass";

// Login button

export const LOGIN_BUTTON_IN_APP_COMPONENT_CLASS = `${HORIZONTALLY_CENTERED_CLASS} p-4 loginButtonInAppComponentClass`;

// Components

export const SUGGESTION_DROPDOWN_CLASS = "align-middle flex";

// Wait animation

export const PAGE_ANIMATION_CLASS = "mt-3 flex items-center justify-center pageAnimationClass";
export const SHOW_HIDE_PAGE_ANIMATION_ENABLED_CLASS = "ml-3 mr-3 showHidePageAnimationEnabledClass";
export const SHOW_HIDE_PAGE_ANIMATION_DISABLED_CLASS = "ml-3 mr-3 hidden showHidePageAnimationDisabledClass";

// Markdown formatting (check renderMarkdownContent())

export const MARKDOWN_P_CLASS = "my-2 markdown-p-class";
export const MARKDOWN_BOLD_CLASS = "font-bold markdown-bold-class";
export const MARKDOWN_ITALIC_CLASS = "italic markdown-italic-class";
export const MARKDOWN_UNDERLINE_CLASS = "underline markdown-underline-class";

// AI Assistant and conversation pages

// Flexible input type text that grows according to its content (e.g. for the AI Assistant conversation)
export const INPUT_FLEXIBLE_CLASS = "pl-1 pb-1 pt-1 pr-1 block w-full border border-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-md resize-none overflow-hidden inputFlexibleClass";
