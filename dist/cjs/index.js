'use strict';

var React = require('react');
var ReactMarkdown = require('react-markdown');
var reactRouterDom = require('react-router-dom');
var history$2 = require('history');
var buffer = require('buffer');
var rxjs = require('rxjs');
var formik = require('formik');
var Yup = require('yup');
var Downshift = require('downshift');

function _interopNamespaceDefault(e) {
  var n = Object.create(null);
  if (e) {
    Object.keys(e).forEach(function (k) {
      if (k !== 'default') {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () { return e[k]; }
        });
      }
    });
  }
  n.default = e;
  return Object.freeze(n);
}

var Yup__namespace = /*#__PURE__*/_interopNamespaceDefault(Yup);

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : e[r] = t, e;
}
function _extends() {
  return _extends = Object.assign ? Object.assign.bind() : function (n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
    }
    return n;
  }, _extends.apply(null, arguments);
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r || "default");
    if ("object" != typeof i) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function _toPropertyKey(t) {
  var i = _toPrimitive(t, "string");
  return "symbol" == typeof i ? i : i + "";
}

function console_debug_log(debug_message) {
  if (get_debug_flag() === true) {
    console.log(debug_message);
    for (var i = 1; i < arguments.length; i++) console.log(arguments[i]);
  }
}
function get_debug_flag() {
  if (typeof window.app_local_debug === 'undefined') {
    if (process.env.hasOwnProperty('REACT_APP_DEBUG')) {
      window.app_local_debug = process.env.REACT_APP_DEBUG === '1';
    } else {
      window.app_local_debug = false;
    }
  }
  return window.app_local_debug;
}

var logging_service = /*#__PURE__*/Object.freeze({
  __proto__: null,
  console_debug_log: console_debug_log,
  get_debug_flag: get_debug_flag
});

const defaultTheme = {
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
    contentBg: 'bg-gray-300 defaultThemeLightContentBg'
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
    contentBg: 'bg-slate-500 defaultThemeDarkContentBg'
  }
};

// Navlib

const MAIN_CONTAINER_FOR_TOP_MENU_CLASS = "flex flex-col min-h-screen mainContainerForTopMenuClass";
const MAIN_CONTAINER_FOR_SIDE_MENU_CLASS = "flex min-h-screen mainContainerForSideMenuClass";
const APP_SECTION_CONTAINER_FOR_TOP_MENU_CLASS = "flex-grow 1-p-4 appSectionContainerForTopMenuClass";
// export const APP_SECTION_CONTAINER_FOR_SIDE_MENU_CLASS = "flex-grow flex flex-col 1-md:ml-64 lg:ml-64 appSectionContainerForSideMenuClass";
const APP_SECTION_CONTAINER_FOR_SIDE_MENU_CLASS = "flex-grow flex flex-col appSectionContainerForSideMenuClass";
const APP_SECTION_CONTAINER_FOR_SIDE_MENU_MAIN_CLASS = "flex-grow appSectionContainerForSideMenuMainClass";
const APP_FOOTER_CONTAINER_CLASS = "p-1 text-white text-center appFooterContainerClass";
const CENTERED_BOX_CONTAINER_DIV_1_CLASS = "z-50 overflow-auto centeredBoxContainerDiv1Class";
const CENTERED_BOX_CONTAINER_DIV_2_CLASS = "1-relative w-fit max-w-md m-auto flex-col flex rounded-lg centeredBoxContainerDiv2Class";
const CENTERED_BOX_CONTAINER_DIV_3_CLASS = "flex flex-col items-center pt-1 pb-4 p-6 centeredBoxContainerDiv3Class";
const NAVBAR_HEADER_FOR_TOP_MENU_CLASS = "flex items-center justify-between p-1 text-white navbarHeaderForTopMenuClass";
const NAVBAR_HEADER_FOR_SIDE_MENU_CLASS = "top-0 left-0 w-64 p-2 overflow-y-auto transition-transform duration-300 ease-in-out 1-md:translate-x-0 lg:translate-x-0 z-20 navbarHeaderForSideMenuClass";
const NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_OPEN_CLASS = 'translate-x-0 navbarHeaderForSideMenuMobileOpenClass';
const NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_CLOSE_CLASS = 'navbarHeaderForSideMenuMobileCloseClass';
const NAVBAR_TOP_FOR_SIDE_MENU_CLASS = "flex items-center justify-between p-1 text-white navbarTopForSideMenuClass";
const NAVBAR_BRAND_ELEMENTS_FOR_TOP_MENU_CLASS = "flex items-center space-x-2 navbarBrandElementsForTopMenuClass";
const NAVBAR_BRAND_ELEMENTS_FOR_SIDE_MENU_CLASS = "flex justify-between items-center mb-4 navbarBrandElementsForSideMenuClass";
// export const NAVBAR_BRAND_HIDDEN_IF_LARGE_SCREEN = "1-md:hidden lg:hidden navbarBrandHiddenIfLargeScreen";

const NAVBAR_BRAND_NAME_CLASS = "text-2xl ml-2 font-bold navbarBrandNameClass";
const NAVBAR_BRAND_APP_VERSION_CLASS = "text-xs navbarBrandAppVersionClass";
const NAVBAR_BRAND_APP_LOGO_CLASS = "mx-auto my-0 navbarBrandAppLogoClass";

// export const NAVBAR_TOP_CENTER_MENU_ON_TOP_CLASS="hidden 1-md:flex lg:flex space-x-4 navbarTopCenterMenuOnTopClass";
const NAVBAR_TOP_CENTER_MENU_ON_TOP_CLASS = "flex space-x-4 navbarTopCenterMenuOnTopClass";
const NAVBAR_TOP_CENTER_MENU_ON_LEFT_CLASS = 'space-y-2 navbarTopCenterMenuOnLeftClass';
const NAVBAR_TOP_RIGHT_MENU_FOR_TOP_MENU_CLASS = "flex items-center space-x-4 navbarTopRightMenuForTopMenuClass";
const NAVBAR_TOP_RIGHT_MENU_FOR_SIDE_MENU_CLASS = "flex items-center space-x-4 ml-auto navbarTopRightMenuForSideMenuClass";
const NAVBAR_TOP_RIGHT_MENU_UNAUTHENTICATED_MARGIN_RIGHT_CLASS = "mr-2 navbarTopRightMenuUnauthenticatedMarginRightClass";
const NAVBAR_MOBILE_MENU_DIV_1_CLASS = "fixed inset-0 bg-black bg-opacity-50 z-50 navbarMobileMenuDiv1Class";
const NAVBAR_MOBILE_MENU_DIV_2_CLASS = "fixed inset-y-0 left-0 w-64 p-4 overflow-y-auto navbarMobileMenuDiv2Class";
const NAVBAR_MOBILE_MENU_DIV_3_CLASS = "flex justify-between items-center mb-4 navbarMobileMenuDiv3Class";
const NAVBAR_MOBILE_MENU_H2_CLASS = "text-xl font-bold navbarMobileMenuH2Class";
const NAVBAR_MOBILE_CLOSE_BUTTON_CLASS = "p-2 rounded-full hover:bg-opacity-80 navbarMobileCloseButtonClass";
const NAVBAR_MOBILE_CLOSE_BUTTON_ICON_CLASS = "h-6 w-6 navbarMobileCloseButtonIconClass";
const NAVBAR_MOBILE_NAV_CLASS = "flex flex-col space-y-2 navbarMobileNavClass";
const NAVBAR_TOGGLE_BUTTON_CLASS = "1-md:hidden 1-lg:hidden p-2 rounded-full hover:bg-opacity-80 navbarToggleButtonClass";
const NAVBAR_TOGGLE_IMAGE_CLASS = "h-6 w-6 navbarToggleImageClass";
const NAVBAR_TEXT_CLASS = 'flex items-center navbarTextClass';
const NAV_LINK_TOP_DIV_TOP_MENU_CLASS = "relative group navLinkTopDivTopMenuClass";
const NAV_LINK_TOP_DIV_HAMBURGER_CLASS = "block relative group navLinkTopDivHamburgerClass";
const NAV_LINK_TOP_DIV_SIDE_MENU_CLASS = "navLinkTopDivSideMenuClass";
const NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS = "1-flex 1-flex-col 1-space-y-2 navLinkTopDivMobileMenuClass";
const NAV_LINK_BUTTON_TOP_MENU_CLASS = "rounded p-1 flex items-center navLinkButtonsTopMenuClass";
const NAV_LINK_BUTTON_HAMBURGER_CLASS = "block py-1 navLinkButtonsHamburgerClass";
const NAV_LINK_BUTTON_SIDE_MENU_CLASS = "py-2 px-2 rounded navLinkButtonsSideMenuClass";
const NAV_LINK_BUTTON_MOBILE_MENU_CLASS = "1-w-full 1-text-left 1-flex 1-justify-between 1-items-center py-2 px-2 rounded navLinkButtonsMobileMenuClass";
const NAV_LINK_ICON_CLASS = "w-8 h-8 navLinkIconClass";
const ROUNDED_ICON_CLASS = "rounded-full roundedIconClass";
const ML2_ICON_CLASS = "ml-2 overflow-visible";
const STROKE_WHITE_ICON_CLASS = "stroke-white";
const VERTICAL_SLIDER_ICON_CLASS = "h-8 w-1.5 rounded-full bg-slate-400";
const NAV_DROPDOWN_TOP_DIV_TOP_MENU_CLASS = "relative group navDropdownTopDivTopMenuClass";
const NAV_DROPDOWN_TOP_DIV_HAMBURGER_CLASS = "block relative group navDropdownTopDivHamburgerClass";
const NAV_DROPDOWN_TOP_DIV_SIDE_MENU_CLASS = "1-space-x-4 navDropdownTopDivSideMenuClass";
const NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS = "1-space-y-2 navDropdownTopDivMobileMenuClass";

// export const NAV_DROPDOWN_INNER_DIV_TOP_MENU_CLASS = "absolute hidden 1-group-hover:block bg-white text-gray-800 p-2 rounded shadow-lg navDropdownInnerDivTopMenuClass";
const NAV_DROPDOWN_INNER_DIV_TOP_MENU_CLASS = "absolute hidden z-50 bg-white text-gray-800 p-2 rounded shadow-lg navDropdownInnerDivTopMenuClass";
const NAV_DROPDOWN_INNER_DIV_HAMBURGER_CLASS = "absolute right-0 hidden z-50 1-group-hover:block bg-white text-gray-800 p-2 rounded shadow-lg navDropdownInnerDivHamburgerClass";
const NAV_DROPDOWN_INNER_DIV_SIDE_MENU_CLASS = "ml-2 space-y-2 navDropdownInnerDivSideMenuClass";
const NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS = "ml-2 space-y-2 navDropdownInnerDivMobileMenuClass";
const NAV_DROPDOWN_BUTTON_TOP_MENU_CLASS = "rounded p-1 flex items-center navDropdownButtonTopMenuClass";
const NAV_DROPDOWN_BUTTON_HAMBURGER_CLASS = "rounded p-2 block py-1 flex items-center navDropdownButtonHamburgerClass";
const NAV_DROPDOWN_BUTTON_SIDE_MENU_CLASS = "1-w-full text-left flex justify-between items-center py-2 px-2 rounded navDropdownButtonSideMenuClass";
const NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS = "1-w-full text-left flex justify-between items-center py-2 px-2 rounded navDropdownButtonMobileMenuClass";
const NAV_DROPDOWN_IMAGE_TOP_MENU_CLASS = "navDropdownImageTopMenuClass";
const NAV_DROPDOWN_IMAGE_HAMBURGER_CLASS = "navDropdownImageHamburgerClass";
const NAV_DROPDOWN_IMAGE_SIDE_MENU_CLASS = "navDropdownImageSideMenuClass";
const NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS = "h-4 w-4 transform transition-transform navDropdownImageMobileMenuClass";
const NAV_DROPDOWN_ITEM_TOP_DIV_TOP_MENU_CLASS = "block py-1 navDropdownItemTopDivTopMenuClass";
const NAV_DROPDOWN_ITEM_TOP_DIV_HAMBURGER_CLASS = "block py-1 navDropdownItemTopDivHamburgerClass";
const NAV_DROPDOWN_ITEM_TOP_DIV_SIDE_MENU_CLASS = "block rounded navDropdownItemTopDivSideMenuClass";
const NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS = "block rounded navDropdownItemTopDivMobileMenuClass";
const NAV_DROPDOWN_ITEM_BUTTON_TOP_MENU_CLASS = "rounded px-2 flex items-center navDropDownItemButtonsTopMenuClass";
const NAV_DROPDOWN_ITEM_BUTTON_HAMBURGER_CLASS = "rounded block px-2 navDropDownItemButtonsHamburgerClass";
const NAV_DROPDOWN_ITEM_BUTTON_SIDE_MENU_CLASS = "rounded px-2 py-2 navDropDownItemButtonsSideMenuClass";
const NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS = "1-w-full 1-text-left 1-flex 1-justify-between 1-items-center rounded py-2 px-2 navDropDownItemButtonsMobileMenuClass";

// Alert messages and message boxes

const ALERT_BASE_CLASS = "1-relative p-3 border border-transparent rounded alertBaseClass";
const ALERT_DANGER_CLASS = `${ALERT_BASE_CLASS} text-red-800 bg-red-100 border-red-200 alertDangerClass`;
const ALERT_WARNING_CLASS = `${ALERT_BASE_CLASS} text-yellow-800 bg-yellow-100 border-yellow-200 alertWarningClass`;
const ALERT_INFO_CLASS = `${ALERT_BASE_CLASS} text-cyan-800 bg-cyan-100 border-cyan-200 alertInfoClass`;
const ALERT_SUCCESS_CLASS = `${ALERT_BASE_CLASS} text-green-800 bg-green-100 border-green-200 alertSuccessClass`;
const ERROR_MSG_CLASS = `${ALERT_DANGER_CLASS} mt-4 p-2 rounded-md errorMsgClass`;
const WARNING_MSG_CLASS = `${ALERT_WARNING_CLASS} mt-4 p-2 rounded-md warningMsgClass`;
const INFO_MSG_CLASS = `${ALERT_INFO_CLASS} mt-4 p-2 rounded-md infoMsgClass`;
const SUCCESS_MSG_CLASS = `${ALERT_SUCCESS_CLASS} mt-4 p-2 rounded-md successMsgClass`;
const GRAY_BOX_MSG_CLASS = `${ALERT_BASE_CLASS} text-black bg-gray-200 mt-4 p-2 rounded-md grayBoxMsgClass`;

// Forms

const FORM_GROUP_CLASS = "mb-4 formGroupClass";
const FORM_CONTROL_CLASS = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 formControlClass";
const INVALID_FEEDBACK_CLASS = "text-red-800 text-sm mt-1 invalidFeedbackClass";
const IS_INVALID_CLASS = "border-red-500 isInvalidClass";
const DISABLE_FIELD_BACKGROUND_COLOR_CLASS = 'bg-gray-200 disableFieldBackgroundColorClass';

// Other general classes

const HIDDEN_CLASS = 'hidden hiddenClass';
const VISIBLE_CLASS = 'visible visibleClass';
const INLINE_CLASS = 'inline inlineClass';
const HORIZONTALLY_CENTERED_CLASS = "flex flex-col items-center horizontallyCenteredClass";
const VERTICALLY_CENTERED_CLASS = "flex items-center justify-center verticallyCenteredClass";
const TOP0_Z50_CLASS = "top-0 z-50 top0z50Class";

// Buttons

const BUTTON_PRIMARY_CLASS = "bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 buttonPrimaryClass";
const BUTTON_SECONDARY_CLASS = "bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 buttonSecondaryClass";
// export const BUTTON_RIGHT_SPACE_CLASS = 'mr-2 buttonRightSpaceClass';

// Special buttons

const BUTTON_COMPOSED_LABEL_CLASS = "flex items-center buttonComposedLabelClass";
const MENU_MODE_BUTTON_TOP_DIV_CLASS = "mt-1 menuModeButtonTopDivClass";
const DARK_MODE_BUTTON_TOP_DIV_CLASS = "mt-1 darkModeButtonTopDivClass";
const DARK_MODE_BUTTON_SVG_CLASS = "w-6 h-6 darkModeButtonSvgClass";
const DARK_MODE_BUTTON_DARK_HIDDEN_CLASS = "dark:hidden darkModeButtonDarkHiddenClass";
const DARK_MODE_BUTTON_DARK_INLINE_CLASS = "hidden dark:inline darkModeButtonDarkInlineClass";

// Generic CRUD editor (GCE_RFC) - BEGIN

// Listing page buttons (GCE_RFC)

const BUTTON_LISTING_CLASS = "bg-blue-500 text-white p-2 rounded text-sm buttonListingClass";
const BUTTON_LISTING_DISABLED_CLASS = `${BUTTON_LISTING_CLASS} opacity-50 buttonListingDisabledClass`;
const BUTTON_LISTING_NEW_CLASS = `${BUTTON_LISTING_CLASS} buttonListingNewClass`;
const BUTTON_LISTING_REFRESH_CLASS = `${BUTTON_LISTING_CLASS} text-xs buttonListingRefreshClass`;

// General app section (GCE_RFC)

const APP_GENERAL_MARGINS_CLASS = 'mt-2 mb-2 ml-2 mr-2 p-2 rounded-lg appGeneralMarginsClass';

// export const APP_TOP_DIV_CLASS = 'mb-4 p-4 rounded-lg appTopDivClass';
const APP_TOP_DIV_CLASS = `${APP_GENERAL_MARGINS_CLASS} rounded-lg appTopDivClass`;
const APP_LEVEL2_DIV_CLASS = "overflow-x-auto appLevel2DivClass";
// export const APP_TITLE_H1_CLASS = 'text-2xl font-bold mb-4 appTitleH1Class';
const APP_TITLE_H1_CLASS = 'text-xl font-bold mb-4 appTitleH1Class';
const APP_TITLE_RECYCLE_BUTTON_CLASS = "pl-2 align-bottom appTitleRecycleButtonClass";
const APP_SIDE_MENU_BG_COLOR_CLASS = "bg-white dark:bg-gray-800 appSideMenuBgColorClass";

// Listing page (GCE_RFC)

// export const APP_LISTING_LEVEL2_DIV_CLASS = 'appListingLevel2DivClass';
// export const APP_LISTING_LEVEL3_DIV_CLASS = "appListingLevel3DivClass";
// export const APP_LISTING_LEVEL4_DIV_CLASS = "appListingLevel4DivClass";

const APP_LISTING_TABLE_CLASS = "w-full text-sm appListingTableClass";
const APP_LISTING_TABLE_HDR_THEAD_CLASS = "bg-white dark:bg-black appListingTableHdrTheadClass";
const APP_LISTING_TABLE_HDR_TR_CLASS = "border-b appListingTableHdrTrClass";
const APP_LISTING_TABLE_HDR_TH_CLASS = "text-left p-2 appListingTableHdrThClass";
const APP_LISTING_TABLE_HRD_ACTIONS_COL_CLASS = 'appListingTableHrdActionsColClass';
const APP_LISTING_TABLE_BODY_TBODY_CLASS = `appListingTableBodyTbodyClass`;
const APP_LISTING_TABLE_BODY_TR_ODD_CLASS = 'hover:bg-opacity-80 appListingTableBodyTrOddClass';
const APP_LISTING_TABLE_BODY_TR_EVEN_CLASS = 'hover:bg-opacity-80 appListingTableBodyTrEvenClass';
const APP_LISTING_TABLE_BODY_TR_ACTIONS_ODD_CLASS = 'appListingTableBodyTrActionsOddClass';
const APP_LISTING_TABLE_BODY_TR_ACTIONS_EVEN_CLASS = 'appListingTableBodyTrActionsEvenClass';
const APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS = "p-2 appListingTableBodyTdBaseOddClass";
const APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS = "p-2 appListingTableBodyTdBaseEvenClass";
const APP_LISTING_TABLE_BODY_TD_ODD_CLASS = `${APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS} break-words appListingTableBodyTdOddClass`;
const APP_LISTING_TABLE_BODY_TD_EVEN_CLASS = `${APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS} break-words appListingTableBodyTdEvenClass`;
const APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS = `${APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS} bg-opacity-80 whitespace-nowrap text-sm space-x-2 appListingTableBodyTdActionsOddClass`;
const APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS = `${APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS} bg-opacity-80 whitespace-nowrap text-sm space-x-2 appListingTableBodyTdActionsEvenClass`;

// Listing page search box (GCE_RFC)

const APP_LISTING_SEARCH_BOX_TOP_DIV_CLASS = "flex items-center space-x-2 appListingSearchBoxTopDivClass";
const APP_LISTING_SEARCH_BOX_LABEL_CLASS = "mr-2 text-sm appListingSearchBoxLabelClass";
const APP_LISTING_SEARCH_BOX_INPUT_CLASS = "p-2 rounded border w-40 text-sm appListingSearchBoxInputClass";
const APP_LISTING_SEARCH_BOX_SUBMIT_BUTTON_CLASS = `${BUTTON_LISTING_CLASS} ml-2 mr-2 text-xs appListingSearchBoxSubmitButtonClass`;
const APP_LISTING_SEARCH_BOX_STOP_BUTTON_CLASS = `${BUTTON_LISTING_CLASS} mr-2 text-xs appListingSearchBoxStopButtonClass`;
const SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS = 'ml-2 searchEngineButtonTopDivClass';

// Listing page bottom toolbar (next and previous page, lines per page, search) (GCE_RFC)

const APP_LISTING_TOOLBAR_TOP_DIV_CLASS = "flex items-center mt-4 space-x-4 1-sm:space-y-0 appListingToolbarTopDivClass";
const APP_LISTING_TOOLBAR_TOP_DIV_WIDE_CLASS = "flex-row appListingToolbarTopDivWideClass";
const APP_LISTING_TOOLBAR_TOP_DIV_NOT_WIDE_CLASS = "flex-col appListingToolbarTopDivNotWideClass";
const APP_LISTING_TOOLBAR_PAGINATION_SECTION_CLASS = "text-sm flex items-center space-x-2 appListingToolbarPaginationSectionClass";
const APP_LISTING_TOOLBAR_PAGE_NUM_SECTION_CLASS = "text-sm flex items-center appListingToolbarPageNumSectionClass";
const APP_LISTING_TOOLBAR_ROW_PER_PAGE_SECTION_CLASS = "text-sm flex items-center appListingToolbarRowPerPageSectionClass";
const APP_LISTING_TOOLBAR_ROW_PER_PAGE_LABEL_CLASS = "mr-2 text-sm appListingToolbarRowPerPageLabelClass";
const APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS = "p-2 rounded border appListingToolbarRowPerPageInputClass";
const APP_LISTING_TOOLBAR_WAIT_ANIMATION_CLASS = "ml-3 mr-3 hidden appListingToolbarWaitAnimationClass";

// Data page (GCE_RFC)

const APP_FORMPAGE_LABEL_CLASS = "font-medium appFormPageLabelClass";
const APP_FORMPAGE_LABEL_REQUIRED_CLASS = "font-medium text-red-700 appFormPageLabelRequiredClass";
const APP_FORMPAGE_FORM_BUTTON_BAR_CLASS = "flex align-middle space-x-4 appFormPageFormButtonBarClass";
const APP_FORMPAGE_FIELD_CLASS = `flex flex-col ${FORM_GROUP_CLASS} appFormPageFieldClass`;
const APP_FORMPAGE_FIELD_BASE_CLASS = `${FORM_CONTROL_CLASS} border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appFormPageFieldBaseClass`;
const APP_FORMPAGE_FIELD_GOOD_CLASS = `${APP_FORMPAGE_FIELD_BASE_CLASS} appFormPageFieldGoodClass`;
const APP_FORMPAGE_FIELD_INVALID_CLASS = `${APP_FORMPAGE_FIELD_BASE_CLASS} is-invalid appFormPageFieldInvalidClass`;
const APP_FORMPAGE_SPECIAL_BUTTON_DIV_CLASS = "align-middle flex appFormPageSpecialButtonDivClass";
const APP_FORMPAGE_CHILD_COMPONENTS_TOP_DIV_CLASS = "mt-6 appFormPageChildComponentsTopDivClass";

// Generic CRUD editor (GCE_RFC) - END

// Pop-ups

const POPUP_TOP_MARGIN_CLASS = "pt-4 popupTopMarginClass";

// ModalLib

// export const MODALIB_MODAL_DIV_1_CLASS="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 modalibModalDiv1Class";
const MODALIB_MODAL_DIV_1_CLASS = "z-50 fixed inset-0 1-bg-black 1-bg-opacity-50 flex items-center justify-center p-4 modalibModalDiv1Class";
const MODALIB_MODAL_DIV_2_CLASS = "rounded-lg shadow-xl w-full max-w-md modalibModalDiv2Class";
const MODALIB_MODAL_DIV_3_CLASS = "p-6 modalibModalDiv3Class";
const MODALIB_MODAL_ICON_1_CLASS = "flex justify-center mb-4 modalibModalIcon1Class";
const MODALIB_MODAL_ICON_2_CLASS = "rounded-full p-2 modalibModalIcon2Class";
const MODALIB_MODAL_ICON_3_CLASS = "w-6 h-6 modalibModalIcon3Class";
const MODALIB_MODAL_HEADER_CLASS = "modalibModalHeaderClass";
const MODALIB_MODAL_TITLE_CLASS = "text-xl font-semibold text-center mb-2 modalibModalTitleClass";
const MODALIB_MODAL_BODY_CLASS = "text-center mb-6 max-h-80 overflow-auto modalibModalBodyClass";
const MODALIB_MODAL_FOOTER_CLASS = "flex mt-4 modalibModalFooterClass";
const MODALIB_MODAL_FOOTER_WIDE_CLASS = "flex-row space-x-4 modalibModalFooterWideClass";
const MODALIB_MODAL_FOOTER_NOT_WIDE_CLASS = "flex-col-reverse space-y-4 space-y-reverse modalibModalFooterNotWideClass";
const MODALIB_BUTTON_BASESTYLE_CLASS = 'px-4 py-2 border rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 modalibButtonBaseStyleClass';
const MODALIB_BUTTON_BASESTYLE_WIDE_CLASS = 'flex-1 modalibButtonBaseStyleWideClass';
const MODALIB_BUTTON_BASESTYLE_NOT_WIDE_CLASS = 'w-full flex justify-center modalibButtonBaseStyleNotWideClass';

// export const MODALIB_BUTTON_PRIMARY_CLASS = 'bg-indigo-600 border-transparent text-white hover:bg-indigo-700 focus:ring-indigo-500 modalibButtonPrimaryClass';
// export const MODALIB_BUTTON_SECONDARY_CLASS = 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50 focus:ring-indigo-500 modalibButtonSecondaryClass';
const MODALIB_BUTTON_PRIMARY_CLASS = `${BUTTON_PRIMARY_CLASS} modalibButtonPrimaryClass`;
const MODALIB_BUTTON_SECONDARY_CLASS = `${BUTTON_SECONDARY_CLASS} modalibButtonSecondaryClass`;
const MODALIB_BUTTON_SUCCESS_CLASS = 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400 modalibButtonSuccessClass';
const MODALIB_BUTTON_DANGER_CLASS = 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 modalibButtonDangerClass';

// Login page

const LOGIN_PAGE_APP_LOGO_CLASS = "mx-auto my-0 loginPageAppLogoClass";

// Login button

const LOGIN_BUTTON_IN_APP_COMPONENT_CLASS = `${HORIZONTALLY_CENTERED_CLASS} p-4 loginButtonInAppComponentClass`;

// Components

const SUGGESTION_DROPDOWN_CLASS = "align-middle flex";

// Wait animation

const SHOW_HIDE_PAGE_ANIMATION_ENABLED_CLASS = "ml-3 mr-3 showHidePageAnimationEnabledClass";
const SHOW_HIDE_PAGE_ANIMATION_DISABLED_CLASS = "ml-3 mr-3 hidden showHidePageAnimationDisabledClass";

// Markdown formatting (check renderMarkdownContent())

const MARKDOWN_P_CLASS = "my-2 markdown-p-class";
const MARKDOWN_BOLD_CLASS = "font-bold markdown-bold-class";
const MARKDOWN_ITALIC_CLASS = "italic markdown-italic-class";
const MARKDOWN_UNDERLINE_CLASS = "underline markdown-underline-class";

// AI Assistant and conversation pages

// Flexible input type text that grows according to its content (e.g. for the AI Assistant conversation)
const INPUT_FLEXIBLE_CLASS = "pl-1 pb-1 pt-1 pr-1 block w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md resize-none overflow-hidden inputFlexibleClass";
// export const INPUT_FLEXIBLE_CLASS = "m-0 w-full resize-none border-0 rounded-md border py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 gizmo:md:py-3.5 gizmo:placeholder-black/50 gizmo:dark:placeholder-white/50 pl-12 gizmo:pl-10 md:pl-[46px] gizmo:md:pl-[55px]";

var class_name_constants = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ALERT_BASE_CLASS: ALERT_BASE_CLASS,
  ALERT_DANGER_CLASS: ALERT_DANGER_CLASS,
  ALERT_INFO_CLASS: ALERT_INFO_CLASS,
  ALERT_SUCCESS_CLASS: ALERT_SUCCESS_CLASS,
  ALERT_WARNING_CLASS: ALERT_WARNING_CLASS,
  APP_FOOTER_CONTAINER_CLASS: APP_FOOTER_CONTAINER_CLASS,
  APP_FORMPAGE_CHILD_COMPONENTS_TOP_DIV_CLASS: APP_FORMPAGE_CHILD_COMPONENTS_TOP_DIV_CLASS,
  APP_FORMPAGE_FIELD_BASE_CLASS: APP_FORMPAGE_FIELD_BASE_CLASS,
  APP_FORMPAGE_FIELD_CLASS: APP_FORMPAGE_FIELD_CLASS,
  APP_FORMPAGE_FIELD_GOOD_CLASS: APP_FORMPAGE_FIELD_GOOD_CLASS,
  APP_FORMPAGE_FIELD_INVALID_CLASS: APP_FORMPAGE_FIELD_INVALID_CLASS,
  APP_FORMPAGE_FORM_BUTTON_BAR_CLASS: APP_FORMPAGE_FORM_BUTTON_BAR_CLASS,
  APP_FORMPAGE_LABEL_CLASS: APP_FORMPAGE_LABEL_CLASS,
  APP_FORMPAGE_LABEL_REQUIRED_CLASS: APP_FORMPAGE_LABEL_REQUIRED_CLASS,
  APP_FORMPAGE_SPECIAL_BUTTON_DIV_CLASS: APP_FORMPAGE_SPECIAL_BUTTON_DIV_CLASS,
  APP_GENERAL_MARGINS_CLASS: APP_GENERAL_MARGINS_CLASS,
  APP_LEVEL2_DIV_CLASS: APP_LEVEL2_DIV_CLASS,
  APP_LISTING_SEARCH_BOX_INPUT_CLASS: APP_LISTING_SEARCH_BOX_INPUT_CLASS,
  APP_LISTING_SEARCH_BOX_LABEL_CLASS: APP_LISTING_SEARCH_BOX_LABEL_CLASS,
  APP_LISTING_SEARCH_BOX_STOP_BUTTON_CLASS: APP_LISTING_SEARCH_BOX_STOP_BUTTON_CLASS,
  APP_LISTING_SEARCH_BOX_SUBMIT_BUTTON_CLASS: APP_LISTING_SEARCH_BOX_SUBMIT_BUTTON_CLASS,
  APP_LISTING_SEARCH_BOX_TOP_DIV_CLASS: APP_LISTING_SEARCH_BOX_TOP_DIV_CLASS,
  APP_LISTING_TABLE_BODY_TBODY_CLASS: APP_LISTING_TABLE_BODY_TBODY_CLASS,
  APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS: APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS,
  APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS: APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS,
  APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS: APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS,
  APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS: APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS,
  APP_LISTING_TABLE_BODY_TD_EVEN_CLASS: APP_LISTING_TABLE_BODY_TD_EVEN_CLASS,
  APP_LISTING_TABLE_BODY_TD_ODD_CLASS: APP_LISTING_TABLE_BODY_TD_ODD_CLASS,
  APP_LISTING_TABLE_BODY_TR_ACTIONS_EVEN_CLASS: APP_LISTING_TABLE_BODY_TR_ACTIONS_EVEN_CLASS,
  APP_LISTING_TABLE_BODY_TR_ACTIONS_ODD_CLASS: APP_LISTING_TABLE_BODY_TR_ACTIONS_ODD_CLASS,
  APP_LISTING_TABLE_BODY_TR_EVEN_CLASS: APP_LISTING_TABLE_BODY_TR_EVEN_CLASS,
  APP_LISTING_TABLE_BODY_TR_ODD_CLASS: APP_LISTING_TABLE_BODY_TR_ODD_CLASS,
  APP_LISTING_TABLE_CLASS: APP_LISTING_TABLE_CLASS,
  APP_LISTING_TABLE_HDR_THEAD_CLASS: APP_LISTING_TABLE_HDR_THEAD_CLASS,
  APP_LISTING_TABLE_HDR_TH_CLASS: APP_LISTING_TABLE_HDR_TH_CLASS,
  APP_LISTING_TABLE_HDR_TR_CLASS: APP_LISTING_TABLE_HDR_TR_CLASS,
  APP_LISTING_TABLE_HRD_ACTIONS_COL_CLASS: APP_LISTING_TABLE_HRD_ACTIONS_COL_CLASS,
  APP_LISTING_TOOLBAR_PAGE_NUM_SECTION_CLASS: APP_LISTING_TOOLBAR_PAGE_NUM_SECTION_CLASS,
  APP_LISTING_TOOLBAR_PAGINATION_SECTION_CLASS: APP_LISTING_TOOLBAR_PAGINATION_SECTION_CLASS,
  APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS: APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS,
  APP_LISTING_TOOLBAR_ROW_PER_PAGE_LABEL_CLASS: APP_LISTING_TOOLBAR_ROW_PER_PAGE_LABEL_CLASS,
  APP_LISTING_TOOLBAR_ROW_PER_PAGE_SECTION_CLASS: APP_LISTING_TOOLBAR_ROW_PER_PAGE_SECTION_CLASS,
  APP_LISTING_TOOLBAR_TOP_DIV_CLASS: APP_LISTING_TOOLBAR_TOP_DIV_CLASS,
  APP_LISTING_TOOLBAR_TOP_DIV_NOT_WIDE_CLASS: APP_LISTING_TOOLBAR_TOP_DIV_NOT_WIDE_CLASS,
  APP_LISTING_TOOLBAR_TOP_DIV_WIDE_CLASS: APP_LISTING_TOOLBAR_TOP_DIV_WIDE_CLASS,
  APP_LISTING_TOOLBAR_WAIT_ANIMATION_CLASS: APP_LISTING_TOOLBAR_WAIT_ANIMATION_CLASS,
  APP_SECTION_CONTAINER_FOR_SIDE_MENU_CLASS: APP_SECTION_CONTAINER_FOR_SIDE_MENU_CLASS,
  APP_SECTION_CONTAINER_FOR_SIDE_MENU_MAIN_CLASS: APP_SECTION_CONTAINER_FOR_SIDE_MENU_MAIN_CLASS,
  APP_SECTION_CONTAINER_FOR_TOP_MENU_CLASS: APP_SECTION_CONTAINER_FOR_TOP_MENU_CLASS,
  APP_SIDE_MENU_BG_COLOR_CLASS: APP_SIDE_MENU_BG_COLOR_CLASS,
  APP_TITLE_H1_CLASS: APP_TITLE_H1_CLASS,
  APP_TITLE_RECYCLE_BUTTON_CLASS: APP_TITLE_RECYCLE_BUTTON_CLASS,
  APP_TOP_DIV_CLASS: APP_TOP_DIV_CLASS,
  BUTTON_COMPOSED_LABEL_CLASS: BUTTON_COMPOSED_LABEL_CLASS,
  BUTTON_LISTING_CLASS: BUTTON_LISTING_CLASS,
  BUTTON_LISTING_DISABLED_CLASS: BUTTON_LISTING_DISABLED_CLASS,
  BUTTON_LISTING_NEW_CLASS: BUTTON_LISTING_NEW_CLASS,
  BUTTON_LISTING_REFRESH_CLASS: BUTTON_LISTING_REFRESH_CLASS,
  BUTTON_PRIMARY_CLASS: BUTTON_PRIMARY_CLASS,
  BUTTON_SECONDARY_CLASS: BUTTON_SECONDARY_CLASS,
  CENTERED_BOX_CONTAINER_DIV_1_CLASS: CENTERED_BOX_CONTAINER_DIV_1_CLASS,
  CENTERED_BOX_CONTAINER_DIV_2_CLASS: CENTERED_BOX_CONTAINER_DIV_2_CLASS,
  CENTERED_BOX_CONTAINER_DIV_3_CLASS: CENTERED_BOX_CONTAINER_DIV_3_CLASS,
  DARK_MODE_BUTTON_DARK_HIDDEN_CLASS: DARK_MODE_BUTTON_DARK_HIDDEN_CLASS,
  DARK_MODE_BUTTON_DARK_INLINE_CLASS: DARK_MODE_BUTTON_DARK_INLINE_CLASS,
  DARK_MODE_BUTTON_SVG_CLASS: DARK_MODE_BUTTON_SVG_CLASS,
  DARK_MODE_BUTTON_TOP_DIV_CLASS: DARK_MODE_BUTTON_TOP_DIV_CLASS,
  DISABLE_FIELD_BACKGROUND_COLOR_CLASS: DISABLE_FIELD_BACKGROUND_COLOR_CLASS,
  ERROR_MSG_CLASS: ERROR_MSG_CLASS,
  FORM_CONTROL_CLASS: FORM_CONTROL_CLASS,
  FORM_GROUP_CLASS: FORM_GROUP_CLASS,
  GRAY_BOX_MSG_CLASS: GRAY_BOX_MSG_CLASS,
  HIDDEN_CLASS: HIDDEN_CLASS,
  HORIZONTALLY_CENTERED_CLASS: HORIZONTALLY_CENTERED_CLASS,
  INFO_MSG_CLASS: INFO_MSG_CLASS,
  INLINE_CLASS: INLINE_CLASS,
  INPUT_FLEXIBLE_CLASS: INPUT_FLEXIBLE_CLASS,
  INVALID_FEEDBACK_CLASS: INVALID_FEEDBACK_CLASS,
  IS_INVALID_CLASS: IS_INVALID_CLASS,
  LOGIN_BUTTON_IN_APP_COMPONENT_CLASS: LOGIN_BUTTON_IN_APP_COMPONENT_CLASS,
  LOGIN_PAGE_APP_LOGO_CLASS: LOGIN_PAGE_APP_LOGO_CLASS,
  MAIN_CONTAINER_FOR_SIDE_MENU_CLASS: MAIN_CONTAINER_FOR_SIDE_MENU_CLASS,
  MAIN_CONTAINER_FOR_TOP_MENU_CLASS: MAIN_CONTAINER_FOR_TOP_MENU_CLASS,
  MARKDOWN_BOLD_CLASS: MARKDOWN_BOLD_CLASS,
  MARKDOWN_ITALIC_CLASS: MARKDOWN_ITALIC_CLASS,
  MARKDOWN_P_CLASS: MARKDOWN_P_CLASS,
  MARKDOWN_UNDERLINE_CLASS: MARKDOWN_UNDERLINE_CLASS,
  MENU_MODE_BUTTON_TOP_DIV_CLASS: MENU_MODE_BUTTON_TOP_DIV_CLASS,
  ML2_ICON_CLASS: ML2_ICON_CLASS,
  MODALIB_BUTTON_BASESTYLE_CLASS: MODALIB_BUTTON_BASESTYLE_CLASS,
  MODALIB_BUTTON_BASESTYLE_NOT_WIDE_CLASS: MODALIB_BUTTON_BASESTYLE_NOT_WIDE_CLASS,
  MODALIB_BUTTON_BASESTYLE_WIDE_CLASS: MODALIB_BUTTON_BASESTYLE_WIDE_CLASS,
  MODALIB_BUTTON_DANGER_CLASS: MODALIB_BUTTON_DANGER_CLASS,
  MODALIB_BUTTON_PRIMARY_CLASS: MODALIB_BUTTON_PRIMARY_CLASS,
  MODALIB_BUTTON_SECONDARY_CLASS: MODALIB_BUTTON_SECONDARY_CLASS,
  MODALIB_BUTTON_SUCCESS_CLASS: MODALIB_BUTTON_SUCCESS_CLASS,
  MODALIB_MODAL_BODY_CLASS: MODALIB_MODAL_BODY_CLASS,
  MODALIB_MODAL_DIV_1_CLASS: MODALIB_MODAL_DIV_1_CLASS,
  MODALIB_MODAL_DIV_2_CLASS: MODALIB_MODAL_DIV_2_CLASS,
  MODALIB_MODAL_DIV_3_CLASS: MODALIB_MODAL_DIV_3_CLASS,
  MODALIB_MODAL_FOOTER_CLASS: MODALIB_MODAL_FOOTER_CLASS,
  MODALIB_MODAL_FOOTER_NOT_WIDE_CLASS: MODALIB_MODAL_FOOTER_NOT_WIDE_CLASS,
  MODALIB_MODAL_FOOTER_WIDE_CLASS: MODALIB_MODAL_FOOTER_WIDE_CLASS,
  MODALIB_MODAL_HEADER_CLASS: MODALIB_MODAL_HEADER_CLASS,
  MODALIB_MODAL_ICON_1_CLASS: MODALIB_MODAL_ICON_1_CLASS,
  MODALIB_MODAL_ICON_2_CLASS: MODALIB_MODAL_ICON_2_CLASS,
  MODALIB_MODAL_ICON_3_CLASS: MODALIB_MODAL_ICON_3_CLASS,
  MODALIB_MODAL_TITLE_CLASS: MODALIB_MODAL_TITLE_CLASS,
  NAVBAR_BRAND_APP_LOGO_CLASS: NAVBAR_BRAND_APP_LOGO_CLASS,
  NAVBAR_BRAND_APP_VERSION_CLASS: NAVBAR_BRAND_APP_VERSION_CLASS,
  NAVBAR_BRAND_ELEMENTS_FOR_SIDE_MENU_CLASS: NAVBAR_BRAND_ELEMENTS_FOR_SIDE_MENU_CLASS,
  NAVBAR_BRAND_ELEMENTS_FOR_TOP_MENU_CLASS: NAVBAR_BRAND_ELEMENTS_FOR_TOP_MENU_CLASS,
  NAVBAR_BRAND_NAME_CLASS: NAVBAR_BRAND_NAME_CLASS,
  NAVBAR_HEADER_FOR_SIDE_MENU_CLASS: NAVBAR_HEADER_FOR_SIDE_MENU_CLASS,
  NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_CLOSE_CLASS: NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_CLOSE_CLASS,
  NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_OPEN_CLASS: NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_OPEN_CLASS,
  NAVBAR_HEADER_FOR_TOP_MENU_CLASS: NAVBAR_HEADER_FOR_TOP_MENU_CLASS,
  NAVBAR_MOBILE_CLOSE_BUTTON_CLASS: NAVBAR_MOBILE_CLOSE_BUTTON_CLASS,
  NAVBAR_MOBILE_CLOSE_BUTTON_ICON_CLASS: NAVBAR_MOBILE_CLOSE_BUTTON_ICON_CLASS,
  NAVBAR_MOBILE_MENU_DIV_1_CLASS: NAVBAR_MOBILE_MENU_DIV_1_CLASS,
  NAVBAR_MOBILE_MENU_DIV_2_CLASS: NAVBAR_MOBILE_MENU_DIV_2_CLASS,
  NAVBAR_MOBILE_MENU_DIV_3_CLASS: NAVBAR_MOBILE_MENU_DIV_3_CLASS,
  NAVBAR_MOBILE_MENU_H2_CLASS: NAVBAR_MOBILE_MENU_H2_CLASS,
  NAVBAR_MOBILE_NAV_CLASS: NAVBAR_MOBILE_NAV_CLASS,
  NAVBAR_TEXT_CLASS: NAVBAR_TEXT_CLASS,
  NAVBAR_TOGGLE_BUTTON_CLASS: NAVBAR_TOGGLE_BUTTON_CLASS,
  NAVBAR_TOGGLE_IMAGE_CLASS: NAVBAR_TOGGLE_IMAGE_CLASS,
  NAVBAR_TOP_CENTER_MENU_ON_LEFT_CLASS: NAVBAR_TOP_CENTER_MENU_ON_LEFT_CLASS,
  NAVBAR_TOP_CENTER_MENU_ON_TOP_CLASS: NAVBAR_TOP_CENTER_MENU_ON_TOP_CLASS,
  NAVBAR_TOP_FOR_SIDE_MENU_CLASS: NAVBAR_TOP_FOR_SIDE_MENU_CLASS,
  NAVBAR_TOP_RIGHT_MENU_FOR_SIDE_MENU_CLASS: NAVBAR_TOP_RIGHT_MENU_FOR_SIDE_MENU_CLASS,
  NAVBAR_TOP_RIGHT_MENU_FOR_TOP_MENU_CLASS: NAVBAR_TOP_RIGHT_MENU_FOR_TOP_MENU_CLASS,
  NAVBAR_TOP_RIGHT_MENU_UNAUTHENTICATED_MARGIN_RIGHT_CLASS: NAVBAR_TOP_RIGHT_MENU_UNAUTHENTICATED_MARGIN_RIGHT_CLASS,
  NAV_DROPDOWN_BUTTON_HAMBURGER_CLASS: NAV_DROPDOWN_BUTTON_HAMBURGER_CLASS,
  NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS: NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS,
  NAV_DROPDOWN_BUTTON_SIDE_MENU_CLASS: NAV_DROPDOWN_BUTTON_SIDE_MENU_CLASS,
  NAV_DROPDOWN_BUTTON_TOP_MENU_CLASS: NAV_DROPDOWN_BUTTON_TOP_MENU_CLASS,
  NAV_DROPDOWN_IMAGE_HAMBURGER_CLASS: NAV_DROPDOWN_IMAGE_HAMBURGER_CLASS,
  NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS: NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS,
  NAV_DROPDOWN_IMAGE_SIDE_MENU_CLASS: NAV_DROPDOWN_IMAGE_SIDE_MENU_CLASS,
  NAV_DROPDOWN_IMAGE_TOP_MENU_CLASS: NAV_DROPDOWN_IMAGE_TOP_MENU_CLASS,
  NAV_DROPDOWN_INNER_DIV_HAMBURGER_CLASS: NAV_DROPDOWN_INNER_DIV_HAMBURGER_CLASS,
  NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS: NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS,
  NAV_DROPDOWN_INNER_DIV_SIDE_MENU_CLASS: NAV_DROPDOWN_INNER_DIV_SIDE_MENU_CLASS,
  NAV_DROPDOWN_INNER_DIV_TOP_MENU_CLASS: NAV_DROPDOWN_INNER_DIV_TOP_MENU_CLASS,
  NAV_DROPDOWN_ITEM_BUTTON_HAMBURGER_CLASS: NAV_DROPDOWN_ITEM_BUTTON_HAMBURGER_CLASS,
  NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS: NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS,
  NAV_DROPDOWN_ITEM_BUTTON_SIDE_MENU_CLASS: NAV_DROPDOWN_ITEM_BUTTON_SIDE_MENU_CLASS,
  NAV_DROPDOWN_ITEM_BUTTON_TOP_MENU_CLASS: NAV_DROPDOWN_ITEM_BUTTON_TOP_MENU_CLASS,
  NAV_DROPDOWN_ITEM_TOP_DIV_HAMBURGER_CLASS: NAV_DROPDOWN_ITEM_TOP_DIV_HAMBURGER_CLASS,
  NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS: NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS,
  NAV_DROPDOWN_ITEM_TOP_DIV_SIDE_MENU_CLASS: NAV_DROPDOWN_ITEM_TOP_DIV_SIDE_MENU_CLASS,
  NAV_DROPDOWN_ITEM_TOP_DIV_TOP_MENU_CLASS: NAV_DROPDOWN_ITEM_TOP_DIV_TOP_MENU_CLASS,
  NAV_DROPDOWN_TOP_DIV_HAMBURGER_CLASS: NAV_DROPDOWN_TOP_DIV_HAMBURGER_CLASS,
  NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS: NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS,
  NAV_DROPDOWN_TOP_DIV_SIDE_MENU_CLASS: NAV_DROPDOWN_TOP_DIV_SIDE_MENU_CLASS,
  NAV_DROPDOWN_TOP_DIV_TOP_MENU_CLASS: NAV_DROPDOWN_TOP_DIV_TOP_MENU_CLASS,
  NAV_LINK_BUTTON_HAMBURGER_CLASS: NAV_LINK_BUTTON_HAMBURGER_CLASS,
  NAV_LINK_BUTTON_MOBILE_MENU_CLASS: NAV_LINK_BUTTON_MOBILE_MENU_CLASS,
  NAV_LINK_BUTTON_SIDE_MENU_CLASS: NAV_LINK_BUTTON_SIDE_MENU_CLASS,
  NAV_LINK_BUTTON_TOP_MENU_CLASS: NAV_LINK_BUTTON_TOP_MENU_CLASS,
  NAV_LINK_ICON_CLASS: NAV_LINK_ICON_CLASS,
  NAV_LINK_TOP_DIV_HAMBURGER_CLASS: NAV_LINK_TOP_DIV_HAMBURGER_CLASS,
  NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS: NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS,
  NAV_LINK_TOP_DIV_SIDE_MENU_CLASS: NAV_LINK_TOP_DIV_SIDE_MENU_CLASS,
  NAV_LINK_TOP_DIV_TOP_MENU_CLASS: NAV_LINK_TOP_DIV_TOP_MENU_CLASS,
  POPUP_TOP_MARGIN_CLASS: POPUP_TOP_MARGIN_CLASS,
  ROUNDED_ICON_CLASS: ROUNDED_ICON_CLASS,
  SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS: SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS,
  SHOW_HIDE_PAGE_ANIMATION_DISABLED_CLASS: SHOW_HIDE_PAGE_ANIMATION_DISABLED_CLASS,
  SHOW_HIDE_PAGE_ANIMATION_ENABLED_CLASS: SHOW_HIDE_PAGE_ANIMATION_ENABLED_CLASS,
  STROKE_WHITE_ICON_CLASS: STROKE_WHITE_ICON_CLASS,
  SUCCESS_MSG_CLASS: SUCCESS_MSG_CLASS,
  SUGGESTION_DROPDOWN_CLASS: SUGGESTION_DROPDOWN_CLASS,
  TOP0_Z50_CLASS: TOP0_Z50_CLASS,
  VERTICALLY_CENTERED_CLASS: VERTICALLY_CENTERED_CLASS,
  VERTICAL_SLIDER_ICON_CLASS: VERTICAL_SLIDER_ICON_CLASS,
  VISIBLE_CLASS: VISIBLE_CLASS,
  WARNING_MSG_CLASS: WARNING_MSG_CLASS,
  defaultTheme: defaultTheme
});

// IconsLib
const GsIcons = _ref => {
  let {
    icon,
    size = null,
    // width = null,
    // height = null,
    alt = '',
    id = '',
    className = '',
    role = "img",
    additionalIconsFn = null
  } = _ref;
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
      "height": "10"
    },
    "xs": {
      "width": "12",
      "height": "12"
    },
    "sm": {
      "width": "14",
      "height": "14"
    },
    "m": {
      "width": "16",
      "height": "16"
    },
    "2m": {
      "width": "18",
      "height": "18"
    },
    "lg": {
      "width": "20",
      "height": "20"
    },
    "xl": {
      "width": "24",
      "height": "24"
    },
    "2xl": {
      "width": "32",
      "height": "32"
    },
    "1x": {
      "width": "16",
      "height": "16"
    },
    "2x": {
      "width": "32",
      "height": "32"
    },
    "3x": {
      "width": "48",
      "height": "48"
    },
    "4x": {
      "width": "64",
      "height": "64"
    },
    "5x": {
      "width": "80",
      "height": "80"
    },
    "6x": {
      "width": "96",
      "height": "96"
    },
    "7x": {
      "width": "112",
      "height": "112"
    },
    "8x": {
      "width": "128",
      "height": "128"
    },
    "9x": {
      "width": "14",
      "height": "14"
    },
    "10x": {
      "width": "160",
      "height": "160"
    }
  };
  size = size ?? 'sm';
  if (typeof sizeData[size] === "undefined") {
    console.error(`Invalid "size" *${size}*. Must be: 2xs, xs, sm, lg, xl, 2xl, 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, or 10x`);
    return /*#__PURE__*/React.createElement(React.Fragment, null, `Invalid "size" *${size}*`);
  }
  const currentWidth = sizeData[size].width;
  const currentHeight = sizeData[size].height;
  let selectedSvg = null;
  switch (icon.toLowerCase()) {
    case 'arrow-down-small':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        width: "6",
        height: "3",
        className: ML2_ICON_CLASS + (className ?? '')
      }, /*#__PURE__*/React.createElement("path", {
        d: "M0 0L3 3L6 0",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }));
      break;
    case 'arrow-right-small':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        width: "3",
        height: "6",
        className: ML2_ICON_CLASS + (className ?? '')
      }, /*#__PURE__*/React.createElement("path", {
        d: "M0 0L3 3L0 6",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }));
      break;
    case 'arrows-rotate':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 512 512"
      }, /*#__PURE__*/React.createElement("g", {
        fill: "#FFFFFF"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z"
      })));
      break;
    case 'clip':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        fill: "none"
      }, /*#__PURE__*/React.createElement("path", {
        fillRule: "evenodd",
        clipRule: "evenodd",
        d: "M9 7C9 4.23858 11.2386 2 14 2C16.7614 2 19 4.23858 19 7V15C19 18.866 15.866 22 12 22C8.13401 22 5 18.866 5 15V9C5 8.44772 5.44772 8 6 8C6.55228 8 7 8.44772 7 9V15C7 17.7614 9.23858 20 12 20C14.7614 20 17 17.7614 17 15V7C17 5.34315 15.6569 4 14 4C12.3431 4 11 5.34315 11 7V15C11 15.5523 11.4477 16 12 16C12.5523 16 13 15.5523 13 15V9C13 8.44772 13.4477 8 14 8C14.5523 8 15 8.44772 15 9V15C15 16.6569 13.6569 18 12 18C10.3431 18 9 16.6569 9 15V7Z",
        fill: "currentColor"
      }));
      break;
    case 'edit':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 576 512"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        d: "M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z"
      }));
      break;
    case 'eye':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 576 512"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        d: "M569.354 231.631C512.969 135.949 407.81 72 288 72 168.14 72 63.004 135.994 6.646 231.631a47.999 47.999 0 0 0 0 48.739C63.031 376.051 168.19 440 288 440c119.86 0 224.996-63.994 281.354-159.631a47.997 47.997 0 0 0 0-48.738zM288 392c-75.162 0-136-60.827-136-136 0-75.162 60.826-136 136-136 75.162 0 136 60.826 136 136 0 75.162-60.826 136-136 136zm104-136c0 57.438-46.562 104-104 104s-104-46.562-104-104c0-17.708 4.431-34.379 12.236-48.973l-.001.032c0 23.651 19.173 42.823 42.824 42.823s42.824-19.173 42.824-42.823c0-23.651-19.173-42.824-42.824-42.824l-.032.001C253.621 156.431 270.292 152 288 152c57.438 0 104 46.562 104 104z"
      }));
      break;
    case 'google-logo':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        fill: "#000000",
        viewBox: "-51.2 -51.2 614.40 614.40"
      }, /*#__PURE__*/React.createElement("g", {
        id: "SVGRepo_bgCarrier",
        strokeWidth: "0"
      }, /*#__PURE__*/React.createElement("rect", {
        x: "-51.2",
        y: "-51.2",
        width: "614.40",
        height: "614.40",
        rx: "0",
        fill: "#fcfcfc",
        strokeWidth: "0"
      })), /*#__PURE__*/React.createElement("g", {
        id: "SVGRepo_tracerCarrier",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }), /*#__PURE__*/React.createElement("g", {
        id: "SVGRepo_iconCarrier"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M473.16,221.48l-2.26-9.59H262.46v88.22H387c-12.93,61.4-72.93,93.72-121.94,93.72-35.66,0-73.25-15-98.13-39.11a140.08,140.08,0,0,1-41.8-98.88c0-37.16,16.7-74.33,41-98.78s61-38.13,97.49-38.13c41.79,0,71.74,22.19,82.94,32.31l62.69-62.36C390.86,72.72,340.34,32,261.6,32h0c-60.75,0-119,23.27-161.58,65.71C58,139.5,36.25,199.93,36.25,256S56.83,369.48,97.55,411.6C141.06,456.52,202.68,480,266.13,480c57.73,0,112.45-22.62,151.45-63.66,38.34-40.4,58.17-96.3,58.17-154.9C475.75,236.77,473.27,222.12,473.16,221.48Z"
      })));
      break;
    case 'greater-than':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "m9 18 6-6-6-6"
      }));
      break;
    case 'less-than':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "m15 18-6-6 6-6"
      }));
      break;
    case 'menu-dots-more':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        fill: "#000000",
        viewBox: "0 0 64 64",
        version: "1.1"
      }, /*#__PURE__*/React.createElement("rect", {
        id: "Icons",
        x: "-256",
        y: "-64"
      }), /*#__PURE__*/React.createElement("g", {
        id: "vertical-menu",
        fill: "currentColor"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "32.026",
        cy: "12.028",
        r: "4"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "32.026",
        cy: "52.028",
        r: "4"
      }), /*#__PURE__*/React.createElement("circle", {
        cx: "32.026",
        cy: "32.028",
        r: "4"
      })));
      break;
    case "menu-hamburger":
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("line", {
        x1: "4",
        x2: "20",
        y1: "12",
        y2: "12"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "4",
        x2: "20",
        y1: "6",
        y2: "6"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "4",
        x2: "20",
        y1: "18",
        y2: "18"
      }));
      break;
    case 'moon':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"
      }));
      break;
    case 'place-holder-circle':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        className: ROUNDED_ICON_CLASS + (className ?? ''),
        fill: "none"
      }, /*#__PURE__*/React.createElement("rect", {
        width: currentWidth,
        height: currentHeight,
        fill: "#EAEAEA",
        rx: "3"
      }, /*#__PURE__*/React.createElement("g", {
        opacity: ".5"
      }, /*#__PURE__*/React.createElement("g", {
        opacity: ".5"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "#FAFAFA",
        d: "M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"
      }), /*#__PURE__*/React.createElement("path", {
        stroke: "#C9C9C9",
        strokeWidth: "2.418",
        d: "M600.709 736.5c-75.454 0-136.621-61.167-136.621-136.62 0-75.454 61.167-136.621 136.621-136.621 75.453 0 136.62 61.167 136.62 136.621 0 75.453-61.167 136.62-136.62 136.62Z"
      })), /*#__PURE__*/React.createElement("path", {
        stroke: "url(#a)",
        strokeWidth: "2.418",
        d: "M0-1.209h553.581",
        transform: "scale(1 -1) rotate(45 1163.11 91.165)"
      }), /*#__PURE__*/React.createElement("path", {
        stroke: "url(#b)",
        strokeWidth: "2.418",
        d: "M404.846 598.671h391.726"
      }), /*#__PURE__*/React.createElement("path", {
        stroke: "url(#c)",
        strokeWidth: "2.418",
        d: "M599.5 795.742V404.017"
      }), /*#__PURE__*/React.createElement("path", {
        stroke: "url(#d)",
        strokeWidth: "2.418",
        d: "m795.717 796.597-391.441-391.44"
      }), /*#__PURE__*/React.createElement("path", {
        fill: "#fff",
        d: "M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"
      }), /*#__PURE__*/React.createElement("g", {
        clipPath: "url(#e)"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "#666",
        fillRule: "evenodd",
        d: "M616.426 586.58h-31.434v16.176l3.553-3.554.531-.531h9.068l.074-.074 8.463-8.463h2.565l7.18 7.181V586.58Zm-15.715 14.654 3.698 3.699 1.283 1.282-2.565 2.565-1.282-1.283-5.2-5.199h-6.066l-5.514 5.514-.073.073v2.876a2.418 2.418 0 0 0 2.418 2.418h26.598a2.418 2.418 0 0 0 2.418-2.418v-8.317l-8.463-8.463-7.181 7.181-.071.072Zm-19.347 5.442v4.085a6.045 6.045 0 0 0 6.046 6.045h26.598a6.044 6.044 0 0 0 6.045-6.045v-7.108l1.356-1.355-1.282-1.283-.074-.073v-17.989h-38.689v23.43l-.146.146.146.147Z",
        clipRule: "evenodd"
      })), /*#__PURE__*/React.createElement("path", {
        stroke: "#C9C9C9",
        strokeWidth: "2.418",
        d: "M600.709 656.704c-31.384 0-56.825-25.441-56.825-56.824 0-31.384 25.441-56.825 56.825-56.825 31.383 0 56.824 25.441 56.824 56.825 0 31.383-25.441 56.824-56.824 56.824Z"
      })), /*#__PURE__*/React.createElement("defs", null, /*#__PURE__*/React.createElement("linearGradient", {
        id: "a",
        x1: "554.061",
        x2: "-.48",
        y1: ".083",
        y2: ".087",
        gradientUnits: "userSpaceOnUse"
      }, /*#__PURE__*/React.createElement("stop", {
        stopColor: "#C9C9C9",
        stopOpacity: "0"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: ".208",
        stopColor: "#C9C9C9"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: ".792",
        stopColor: "#C9C9C9"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: "1",
        stopColor: "#C9C9C9",
        stopOpacity: "0"
      })), /*#__PURE__*/React.createElement("linearGradient", {
        id: "b",
        x1: "796.912",
        x2: "404.507",
        y1: "599.963",
        y2: "599.965",
        gradientUnits: "userSpaceOnUse"
      }, /*#__PURE__*/React.createElement("stop", {
        stopColor: "#C9C9C9",
        stopOpacity: "0"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: ".208",
        stopColor: "#C9C9C9"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: ".792",
        stopColor: "#C9C9C9"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: "1",
        stopColor: "#C9C9C9",
        stopOpacity: "0"
      })), /*#__PURE__*/React.createElement("linearGradient", {
        id: "c",
        x1: "600.792",
        x2: "600.794",
        y1: "403.677",
        y2: "796.082",
        gradientUnits: "userSpaceOnUse"
      }, /*#__PURE__*/React.createElement("stop", {
        stopColor: "#C9C9C9",
        stopOpacity: "0"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: ".208",
        stopColor: "#C9C9C9"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: ".792",
        stopColor: "#C9C9C9"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: "1",
        stopColor: "#C9C9C9",
        stopOpacity: "0"
      })), /*#__PURE__*/React.createElement("linearGradient", {
        id: "d",
        x1: "404.85",
        x2: "796.972",
        y1: "403.903",
        y2: "796.02",
        gradientUnits: "userSpaceOnUse"
      }, /*#__PURE__*/React.createElement("stop", {
        stopColor: "#C9C9C9",
        stopOpacity: "0"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: ".208",
        stopColor: "#C9C9C9"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: ".792",
        stopColor: "#C9C9C9"
      }), /*#__PURE__*/React.createElement("stop", {
        offset: "1",
        stopColor: "#C9C9C9",
        stopOpacity: "0"
      })), /*#__PURE__*/React.createElement("clipPath", {
        id: "e"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "#fff",
        d: "M581.364 580.535h38.689v38.689h-38.689z"
      })))));
      break;
    case 'plus':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 448 512"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        d: "M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
      }));
      break;
    case 'search':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "11",
        cy: "11",
        r: "8"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m21 21-4.3-4.3"
      }));
      break;
    case 'side-menu':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24"
      }, /*#__PURE__*/React.createElement("rect", {
        id: "Square-2",
        x: "3",
        y: "3",
        width: "18",
        height: "18",
        rx: "2",
        ry: "2",
        fill: "none",
        className: STROKE_WHITE_ICON_CLASS,
        strokeMiterlimit: "10",
        strokeWidth: "2"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "9",
        y1: "21",
        x2: "9",
        y2: "3",
        fill: "none",
        className: STROKE_WHITE_ICON_CLASS,
        strokeMiterlimit: "10",
        strokeWidth: "2"
      }));
      break;
    case 'spark':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24"
        // role="presentation"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        fillRule: "evenodd",
        d: "M9.276 4.382L7.357 9.247l-4.863 1.917a.78.78 0 000 1.45l4.863 1.918 1.919 4.863a.78.78 0 001.45 0h-.001l1.918-4.863 4.864-1.919a.781.781 0 000-1.45l-4.864-1.916-1.918-4.865a.776.776 0 00-.44-.438.778.778 0 00-1.01.438zm8.297-2.03l-.743 1.886-1.884.743a.56.56 0 000 1.038l1.884.743.743 1.886a.558.558 0 001.038 0l.745-1.886 1.883-.743a.557.557 0 000-1.038l-1.883-.743-.745-1.885a.552.552 0 00-.314-.314.562.562 0 00-.724.314zm-.704 13.003l-.744 1.883-1.883.744a.553.553 0 00-.316.314.56.56 0 00.316.724l1.883.743.744 1.884c.057.144.17.258.314.315a.56.56 0 00.724-.315l.744-1.884 1.883-.743a.557.557 0 000-1.038l-1.883-.744-.744-1.883a.551.551 0 00-.315-.316.56.56 0 00-.723.316z"
      }));
      break;
    case 'sun':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "4"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 2v2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M12 20v2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m4.93 4.93 1.41 1.41"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m17.66 17.66 1.41 1.41"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M2 12h2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "M20 12h2"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m6.34 17.66-1.41 1.41"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m19.07 4.93-1.41 1.41"
      }));
      break;
    case 'trash':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 448 512"
      }, /*#__PURE__*/React.createElement("path", {
        fill: "currentColor",
        d: "M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm415.2 56.7L394.8 467c-1.6 25.3-22.6 45-47.9 45H101.1c-25.3 0-46.3-19.7-47.9-45L32.8 140.7c-.4-6.9 5.1-12.7 12-12.7h358.5c6.8 0 12.3 5.8 11.9 12.7z"
      }));
      break;
    case 'top-menu':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        fill: "none"
      }, /*#__PURE__*/React.createElement("rect", {
        width: "18",
        height: "18",
        rx: "3",
        transform: "matrix(1.39071e-07 1 1 -1.39071e-07 3 3)"
        // className="stroke-black dark:stroke-white"
        ,
        className: STROKE_WHITE_ICON_CLASS,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }), /*#__PURE__*/React.createElement("line", {
        x1: "1",
        y1: "-1",
        x2: "17",
        y2: "-1",
        transform: "matrix(1 -1.82782e-07 -1.82782e-07 -1 3 8)"
        // className="stroke-black dark:stroke-white"
        ,
        className: STROKE_WHITE_ICON_CLASS,
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }));
      break;
    case 'vertical-slider':
      selectedSvg = /*#__PURE__*/React.createElement("div", {
        className: VERTICAL_SLIDER_ICON_CLASS + (className ?? '')
      });
      break;
    case 'warning-sign':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        className: "h-6 w-6 text-red-600",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: "1.5",
        stroke: "currentColor",
        "aria-hidden": "true"
      }, /*#__PURE__*/React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
      }));
      break;
    case 'checked-sign':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        strokeWidth: "1.5",
        stroke: "currentColor",
        "aria-hidden": "true",
        className: "oi sl aye"
      }, /*#__PURE__*/React.createElement("path", {
        strokeLinecap: "round",
        strokeLinejoin: "round",
        d: "M4.5 12.75l6 6 9-13.5"
      }));
      break;
    case 'x':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: "2",
        strokeLinecap: "round",
        strokeLinejoin: "round"
      }, /*#__PURE__*/React.createElement("path", {
        d: "M18 6 6 18"
      }), /*#__PURE__*/React.createElement("path", {
        d: "m6 6 12 12"
      }));
      break;
    default:
      if (additionalIconsFn) {
        selectedSvg = additionalIconsFn(icon, size, currentWidth,
        // width,
        currentHeight,
        // height,
        alt, id, className, role);
      }
  }
  if (!selectedSvg) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, `Invalid Icon *${icon}*`);
  }
  let iconProps = {
    'data-icon': icon.toLowerCase(),
    'id': id,
    'className': selectedSvg.props.className ?? className
  };
  if (selectedSvg.type === "svg") {
    // iconProps['viewBox'] = "0 0 " + currentWidth + " " + currentHeight;
    iconProps['xmlns'] = selectedSvg.props.xmlns ?? "http://www.w3.org/2000/svg";
    iconProps['width'] = selectedSvg.props.width ?? currentWidth;
    iconProps['height'] = selectedSvg.props.height ?? currentHeight;
    iconProps['role'] = selectedSvg.props.role ?? role;
    iconProps['alt'] = selectedSvg.props.alt ?? alt;
    iconProps['title'] = selectedSvg.props.title ?? alt;
  }
  selectedSvg = /*#__PURE__*/React.cloneElement(selectedSvg, iconProps);
  return selectedSvg;
};

var IconsLib = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GsIcons: GsIcons
});

const randomKey = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

var ramdomize = /*#__PURE__*/Object.freeze({
  __proto__: null,
  randomKey: randomKey
});

const textareaMinHeightDefault = 40;
const toggleIdVisibility = (onOff, ids) => {
  ids.forEach(id => {
    const element = document.getElementById(id);
    if (element) {
      element.style.display = onOff === 'on' ? '' : 'none';
    }
  });
};
const getElementWithErrorHandling = elementId => {
  try {
    const elementObj = document.getElementById(elementId);
    return elementObj;
  } catch (error) {
    // Element not found or stil loading...            
    return null;
  }
};
const growUpTextAreaInner = function (textAreaId, conversationBlockId, sectionViewportHeight, maxOffsetHeight) {
  let textareaMinHeight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : textareaMinHeightDefault;
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
    if (textarea.scrollHeight > maxOffsetHeight) {
      textarea.style.height = `${maxOffsetHeight}px`;
    }
    // Set conversation height to make textarea to scroll up according its height
    const sectionViewportHeightInPx = sectionViewportHeight / 100 * viewportHeight;
    const conversationHeight = sectionViewportHeightInPx - textarea.clientHeight + textareaMinHeight;
    conversationObj.style.height = `${conversationHeight}px`;
  }
};
const growUpTextArea = function (textAreaId, conversationBlockId, sectionViewportHeight, maxOffsetHeight) {
  let textareaMinHeight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : textareaMinHeightDefault;
  const textarea = getElementWithErrorHandling(textAreaId);
  if (textarea) {
    textarea.addEventListener('input', event => growUpTextAreaInner(textAreaId, conversationBlockId, sectionViewportHeight, maxOffsetHeight, textareaMinHeight));
  }
};
const resetTextArea = function (textAreaId, conversationBlockId, sectionViewportHeight, maxOffsetHeight) {
  let textareaMinHeight = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : textareaMinHeightDefault;
  const textarea = getElementWithErrorHandling(textAreaId);
  if (textarea) {
    growUpTextAreaInner(textAreaId, conversationBlockId, sectionViewportHeight, maxOffsetHeight, textareaMinHeight);
  }
};
const LinkifyText = _ref => {
  let {
    children
  } = _ref;
  // Detect links in the text.
  // Example: [Carlos Jose Ramirez Divo - Sitio web oficial](https://www.carlosjramirez.com/en/about-carlos-jose-ramirez-divo/)

  const regex = /\[[^\]]+\]\([^)]+\)/g;
  const matches = children.match(regex);
  const links = !matches ? [] : matches.map(match => {
    const title = match.substring(1, match.indexOf(']'));
    const url = match.substring(match.indexOf('(') + 1, match.length - 1);
    return /*#__PURE__*/React.createElement("a", {
      key: url,
      href: url,
      target: "_blank",
      rel: "noopener noreferrer"
    }, title);
  });
  const formattedText = children.split(regex).reduce((acc, textChunk, index) => {
    if (index === 0) {
      return [textChunk];
    }
    acc.push(links[index - 1]);
    acc.push(textChunk);
    return acc;
  }, []);
  return /*#__PURE__*/React.createElement("div", null, formattedText.map((chunck, index) => {
    if (typeof chunck !== 'string') {
      return chunck;
    }
    return chunck.split('\n').map((line, index) => {
      return /*#__PURE__*/React.createElement("p", {
        key: randomKey()
      }, line);
    });
  }));
};
const renderMarkdownContent = text => {
  return /*#__PURE__*/React.createElement(ReactMarkdown, {
    components: {
      p: _ref2 => {
        let {
          children
        } = _ref2;
        return /*#__PURE__*/React.createElement("p", {
          className: MARKDOWN_P_CLASS
        }, children);
      },
      strong: _ref3 => {
        let {
          children
        } = _ref3;
        return /*#__PURE__*/React.createElement("strong", {
          className: MARKDOWN_BOLD_CLASS
        }, children);
      },
      em: _ref4 => {
        let {
          children
        } = _ref4;
        return /*#__PURE__*/React.createElement("em", {
          className: MARKDOWN_ITALIC_CLASS
        }, children);
      },
      a: _ref5 => {
        let {
          children,
          href
        } = _ref5;
        return /*#__PURE__*/React.createElement("a", {
          href: href,
          target: "_blank",
          className: MARKDOWN_UNDERLINE_CLASS
        }, children);
      }
      // Add more markdown components as needed
    }
  }, text);
};
const CopyButton = _ref6 => {
  let {
    text
  } = _ref6;
  const showCopiedMessage = e => {
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
  };
  const securedCopyToClipboard = text => {
    navigator.clipboard.writeText(text);
  };
  const unsecuredCopyToClipboard = text => {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    try {
      document.execCommand('copy');
    } catch (err) {
      console.error('Unable to copy to clipboard', err);
    }
    document.body.removeChild(textArea);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("button", {
    id: "copyButton",
    style: {
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
    },
    onClick: e => {
      if (window.isSecureContext && navigator.clipboard) {
        securedCopyToClipboard(text);
      } else {
        unsecuredCopyToClipboard(text);
      }
      showCopiedMessage(e);
    }
  }, "Copy"));
};
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};
const isWindowWide = () => window.innerWidth >= 640;
const resizeManager = callback => {
  const handleResize = () => {
    callback();
  };
  const addListener = () => {
    window.addEventListener('resize', handleResize);
  };
  const removeListener = () => {
    window.removeEventListener('resize', handleResize);
  };
  return {
    addListener,
    removeListener
  };
};

var ui = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CopyButton: CopyButton,
  LinkifyText: LinkifyText,
  getElementWithErrorHandling: getElementWithErrorHandling,
  growUpTextArea: growUpTextArea,
  growUpTextAreaInner: growUpTextAreaInner,
  isMobileDevice: isMobileDevice,
  isWindowWide: isWindowWide,
  renderMarkdownContent: renderMarkdownContent,
  resetTextArea: resetTextArea,
  resizeManager: resizeManager,
  toggleIdVisibility: toggleIdVisibility
});

const AppContext = /*#__PURE__*/React.createContext();
const AppProvider = _ref => {
  let {
    globalComponentMap,
    globalAppLogo = "",
    globalAppLogoHeader = "",
    children
  } = _ref;
  const [appLogo, setAppLogo] = React.useState(globalAppLogo);
  const [appLogoHeader, setAppLogoHeader] = React.useState(globalAppLogoHeader);
  const [componentMap, setComponentMap] = React.useState(globalComponentMap);
  const [state, setState] = React.useState("");
  const [menuOptions, setMenuOptions] = React.useState(null);
  const [sideMenu, setSideMenu] = React.useState(false);
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const [expandedMenus, setExpandedMenus] = React.useState([]);
  const [isWide, setIsWide] = React.useState(isWindowWide());
  const theme = isDarkMode ? componentMap["defaultTheme"].dark : componentMap["defaultTheme"].light;
  const toggleDarkMode = () => setIsDarkMode(!isDarkMode);
  const toggleSideMenu = () => setSideMenu(!sideMenu);
  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  // const toggleSubmenu = (menuName) => {
  const toggleSubmenu = (menuName, menuVisible) => {
    console_debug_log(`<<<< AppContext | toggleSubmenu | menuName: ${menuName} | menuVisible: ${menuVisible}`);
    setExpandedMenus(prev =>
    // prev.includes(menuName)
    // ? prev.filter(item => item !== menuName)
    // : [...prev, menuName]
    menuVisible ? [...prev, menuName] : prev.filter(item => item !== menuName));
  };
  const isComponent = componentObj => {
    return String(componentObj).includes('component:');
  };
  const setExpanded = componentObj => {
    /* Close mobile menu if any option is clicked */
    if (document.getElementById("navbar-main-toggle") && isMobileMenuOpen) {
      document.getElementById("navbar-main-toggle").click();
    }
    if (componentObj) {
      if (isComponent(componentObj)) {
        try {
          return /*#__PURE__*/React.createElement("componentObj", null);
        } catch (error) {
          console_debug_log('[ASE-E010] componentObj:', componentObj);
          console_debug_log(error);
          return null;
        }
      } else {
        try {
          return componentObj();
        } catch (error) {
          console_debug_log('[ASE-E020] componentObj:', componentObj);
          console_debug_log(error);
          return null;
        }
      }
    }
    return '';
  };
  React.useEffect(() => {
    const resizer = resizeManager(() => {
      setIsWide(isWindowWide());
    });
    resizer.addListener();
    return () => resizer.removeListener();
  }, []);
  return /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: {
      appLogo,
      setAppLogo,
      appLogoHeader,
      setAppLogoHeader,
      componentMap,
      setComponentMap,
      state,
      setState,
      menuOptions,
      setMenuOptions,
      sideMenu,
      setSideMenu,
      isDarkMode,
      setIsDarkMode,
      isMobileMenuOpen,
      setIsMobileMenuOpen,
      expandedMenus,
      setExpandedMenus,
      isWide,
      setIsWide,
      theme,
      toggleDarkMode,
      toggleSideMenu,
      toggleMobileMenu,
      toggleSubmenu,
      setExpanded
    }
  }, children);
};
const useAppContext = () => {
  return React.useContext(AppContext);
};

var AppContext$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AppProvider: AppProvider,
  useAppContext: useAppContext
});

const UserContext = /*#__PURE__*/React.createContext();
const UserProvider = _ref => {
  let {
    children
  } = _ref;
  const [currentUser, setCurrentUser] = React.useState(null);
  const registerUser = userData => {
    setCurrentUser(userData);
  };
  const unRegisterUser = () => {
    setCurrentUser(null);
  };
  return /*#__PURE__*/React.createElement(UserContext.Provider, {
    value: {
      currentUser,
      registerUser,
      unRegisterUser
    }
  }, children);
};
const useUser = () => {
  return React.useContext(UserContext);
};

var UserContext$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  UserProvider: UserProvider,
  useUser: useUser
});

const MainContainer = _ref => {
  let {
    children
  } = _ref;
  const {
    theme,
    sideMenu
  } = useAppContext();
  return /*#__PURE__*/React.createElement("div", {
    className: `${sideMenu ? MAIN_CONTAINER_FOR_SIDE_MENU_CLASS : MAIN_CONTAINER_FOR_TOP_MENU_CLASS} ${theme.background} ${theme.text}`
  }, children);
};
const AppSectionContainer = _ref2 => {
  let {
    children
  } = _ref2;
  const {
    sideMenu
  } = useAppContext();
  if (sideMenu) {
    return /*#__PURE__*/React.createElement("div", {
      className: APP_SECTION_CONTAINER_FOR_SIDE_MENU_CLASS
    }, children);
  }
  return /*#__PURE__*/React.createElement("main", {
    className: APP_SECTION_CONTAINER_FOR_TOP_MENU_CLASS
  }, children);
};
const AppSectionContainerForSideMenu = _ref3 => {
  let {
    children
  } = _ref3;
  return /*#__PURE__*/React.createElement("main", {
    className: APP_SECTION_CONTAINER_FOR_SIDE_MENU_MAIN_CLASS
  }, children);
};
AppSectionContainer.ForSideMenu = AppSectionContainerForSideMenu;
const AppFooterContainer = _ref4 => {
  let {
    children
  } = _ref4;
  /* App Footer */
  const {
    theme
  } = useAppContext();
  return /*#__PURE__*/React.createElement("footer", {
    className: `${APP_FOOTER_CONTAINER_CLASS} ${theme.primary}`
  }, children);
};
const CenteredBoxContainer = _ref5 => {
  let {
    children
  } = _ref5;
  /* Center box container, for pop-ups and login page like components */
  const {
    theme
  } = useAppContext();
  return /*#__PURE__*/React.createElement("div", {
    className: CENTERED_BOX_CONTAINER_DIV_1_CLASS
  }, /*#__PURE__*/React.createElement("div", {
    className: `${CENTERED_BOX_CONTAINER_DIV_2_CLASS} ${theme.contentBg}`
  }, /*#__PURE__*/React.createElement("div", {
    className: CENTERED_BOX_CONTAINER_DIV_3_CLASS
  }, children)));
};

// NavBar

const Navbar = _ref6 => {
  let {
    children,
    collapseOnSelect,
    expand
  } = _ref6;
  const {
    theme,
    sideMenu,
    isMobileMenuOpen,
    isWide
  } = useAppContext();
  if (sideMenu) {
    if (isMobileMenuOpen) {
      return /*#__PURE__*/React.createElement("nav", {
        id: "navbar-side-menu",
        className: `${NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_OPEN_CLASS} ${NAVBAR_HEADER_FOR_SIDE_MENU_CLASS} ${theme.secondary} ${theme.text}`
      }, children);
    }
    if (isWide) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
        id: "navbar-side-menu",
        className: `${NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_CLOSE_CLASS} ${NAVBAR_HEADER_FOR_SIDE_MENU_CLASS} ${theme.secondary} ${theme.text}`
      }, children), /*#__PURE__*/React.createElement(ToggleSideBar, {
        onClick: () => document.getElementById('navbar-side-menu').classList.toggle('hidden')
      }));
    }
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: `${NAVBAR_HEADER_FOR_TOP_MENU_CLASS} ${theme.primary}`
  }, children);
};
const NavbarBrand = _ref7 => {
  let {
    children,
    as,
    to,
    onClick
  } = _ref7;
  const {
    sideMenu,
    isWide
  } = useAppContext();
  const As = as;
  if (sideMenu) {
    return /*#__PURE__*/React.createElement("div", {
      className: NAVBAR_BRAND_ELEMENTS_FOR_SIDE_MENU_CLASS
    }, /*#__PURE__*/React.createElement(As
    // as={as}
    , {
      to: to,
      onClick: onClick
    }, /*#__PURE__*/React.createElement("div", {
      className: NAVBAR_BRAND_ELEMENTS_FOR_TOP_MENU_CLASS
    }, children)), /*#__PURE__*/React.createElement(MobileMenuCloseButton
    // className={NAVBAR_BRAND_HIDDEN_IF_LARGE_SCREEN}
    , {
      className: isWide ? HIDDEN_CLASS : ""
    }));
  }
  return /*#__PURE__*/React.createElement(As
  // as={as}
  , {
    to: to,
    onClick: onClick
  }, /*#__PURE__*/React.createElement("div", {
    className: NAVBAR_BRAND_ELEMENTS_FOR_TOP_MENU_CLASS
  }, children));
};
const NavbarTopCenterMenu = _ref8 => {
  let {
    children
  } = _ref8;
  const {
    sideMenu,
    isWide
  } = useAppContext();
  if (sideMenu) {
    return /*#__PURE__*/React.createElement("div", {
      className: NAVBAR_TOP_CENTER_MENU_ON_LEFT_CLASS
    }, children);
  }
  return /*#__PURE__*/React.createElement("nav", {
    id: "navbar-top-center-menu",
    className: NAVBAR_TOP_CENTER_MENU_ON_TOP_CLASS + (isWide ? "" : " " + HIDDEN_CLASS)
  }, children);
};
const NavbarTopRightMenu = _ref9 => {
  let {
    children,
    authenticated = true
  } = _ref9;
  const {
    currentUser
  } = useUser();
  const {
    sideMenu
  } = useAppContext();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: (sideMenu ? NAVBAR_TOP_RIGHT_MENU_FOR_SIDE_MENU_CLASS : NAVBAR_TOP_RIGHT_MENU_FOR_TOP_MENU_CLASS) + (!(currentUser && authenticated) ? " " + NAVBAR_TOP_RIGHT_MENU_UNAUTHENTICATED_MARGIN_RIGHT_CLASS : "")
  }, children));
};
const MobileMenuCloseButton = _ref10 => {
  let {
    className
  } = _ref10;
  /* Mobile menu close button */
  const {
    toggleMobileMenu
  } = useAppContext();
  return /*#__PURE__*/React.createElement("button", {
    onClick: toggleMobileMenu,
    className: className ?? '' + NAVBAR_MOBILE_CLOSE_BUTTON_CLASS
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "x",
    size: "sm",
    className: NAVBAR_MOBILE_CLOSE_BUTTON_ICON_CLASS
  }));
};
const NavbarMobileMenu = _ref11 => {
  let {
    children
  } = _ref11;
  const {
    theme,
    isMobileMenuOpen,
    sideMenu
  } = useAppContext();
  if (!isMobileMenuOpen || sideMenu) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: NAVBAR_MOBILE_MENU_DIV_1_CLASS
  }, /*#__PURE__*/React.createElement("div", {
    className: `${NAVBAR_MOBILE_MENU_DIV_2_CLASS} ${theme.background} ${theme.text}`
  }, /*#__PURE__*/React.createElement("div", {
    className: NAVBAR_MOBILE_MENU_DIV_3_CLASS
  }, /*#__PURE__*/React.createElement("h2", {
    className: NAVBAR_MOBILE_MENU_H2_CLASS
  }, "Menu"), /*#__PURE__*/React.createElement(MobileMenuCloseButton, null)), /*#__PURE__*/React.createElement("nav", {
    className: NAVBAR_MOBILE_NAV_CLASS
  }, children)));
};
const NavbarToggle = () => {
  const {
    toggleMobileMenu,
    isWide
  } = useAppContext();
  return /*#__PURE__*/React.createElement("button", {
    id: "navbar-main-toggle",
    onClick: toggleMobileMenu,
    className: NAVBAR_TOGGLE_BUTTON_CLASS + (isWide ? " " + HIDDEN_CLASS : "")
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "menu-hamburger",
    size: "xl",
    className: NAVBAR_TOGGLE_IMAGE_CLASS
  }));
};
const NavbarText = _ref12 => {
  let {
    children,
    className
  } = _ref12;
  return /*#__PURE__*/React.createElement("div", {
    className: className ?? NAVBAR_TEXT_CLASS
  }, children);
};
const NavbarTopForSideMenu = _ref13 => {
  let {
    children,
    className
  } = _ref13;
  const {
    theme
  } = useAppContext();
  return /*#__PURE__*/React.createElement("header", {
    className: `${NAVBAR_TOP_FOR_SIDE_MENU_CLASS} ${theme.primary}`
  }, children);
};
Navbar.Brand = NavbarBrand;
Navbar.TopCenterMenu = NavbarTopCenterMenu;
Navbar.TopRightMenu = NavbarTopRightMenu;
Navbar.MobileMenu = NavbarMobileMenu;
Navbar.Toggle = NavbarToggle;
Navbar.Text = NavbarText;
Navbar.TopForSideMenu = NavbarTopForSideMenu;

// NavDropdown

const NavDropdown = _ref14 => {
  let {
    children,
    title,
    id,
    type,
    icon,
    mobileMenuMode
  } = _ref14;
  const {
    expandedMenus,
    toggleSubmenu,
    theme,
    isWide
  } = useAppContext();
  const [dropDownOpen, setDropDownOpen] = React.useState(false);
  const fullId = `${id}_${type}`;
  const toggledropDownOpen = () => {
    const elementId = `${fullId}_dropDown`;
    const element = document.getElementById(elementId);
    if (dropDownOpen) {
      element.classList.add('hidden');
    } else {
      element.classList.remove('hidden');
    }
    console_debug_log(`>>--> NavDropdown | toggledropDownOpen | elementId: ${elementId} | previous dropDownOpen: ${dropDownOpen}`);
    setDropDownOpen(!dropDownOpen);
  };
  const variantsDirectionImage = {
    top_menu: 'arrow-right-small',
    // 'arrow-down-small',
    hamburger: 'arrow-right-small',
    // 'arrow-down-small',
    side_menu: 'arrow-right-small',
    mobile_menu: 'arrow-right-small'
  };
  const variantsTopDiv = {
    top_menu: NAV_DROPDOWN_TOP_DIV_TOP_MENU_CLASS,
    hamburger: mobileMenuMode ? NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS : NAV_DROPDOWN_TOP_DIV_HAMBURGER_CLASS + (isWide ? "" : " " + HIDDEN_CLASS),
    side_menu: NAV_DROPDOWN_TOP_DIV_SIDE_MENU_CLASS,
    mobile_menu: NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS
  };
  const variantsInnerDiv = {
    top_menu: NAV_DROPDOWN_INNER_DIV_TOP_MENU_CLASS,
    hamburger: mobileMenuMode ? NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS : NAV_DROPDOWN_INNER_DIV_HAMBURGER_CLASS,
    side_menu: NAV_DROPDOWN_INNER_DIV_SIDE_MENU_CLASS,
    mobile_menu: NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS
  };
  const variantsButton = {
    top_menu: `${NAV_DROPDOWN_BUTTON_TOP_MENU_CLASS} ${theme.textHoverTop}`,
    hamburger: `${mobileMenuMode ? NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS : NAV_DROPDOWN_BUTTON_HAMBURGER_CLASS} ${mobileMenuMode ? theme.textHoverSide : theme.textHoverTop}`,
    side_menu: `${NAV_DROPDOWN_BUTTON_SIDE_MENU_CLASS} ${theme.textHoverSide}`,
    mobile_menu: `${NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS} ${theme.textHoverSide}`
  };
  const variantsSubmenuImage = {
    top_menu: NAV_DROPDOWN_IMAGE_TOP_MENU_CLASS,
    hamburger: mobileMenuMode ? NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS : NAV_DROPDOWN_IMAGE_HAMBURGER_CLASS,
    side_menu: NAV_DROPDOWN_IMAGE_SIDE_MENU_CLASS,
    mobile_menu: NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS
  };

  // const variantsOptionClick = {
  //     top_menu: toggleSubmenu,
  //     hamburger: toggleSubmenu,
  //     side_menu: toggleSubmenu,
  //     mobile_menu: toggleSubmenu,
  // };

  // useEffect(() => {
  //     variantOnClick(fullId);
  // }, []);

  React.useEffect(() => {
    console_debug_log(`SideMenu | useEffect | dropDownOpen: ${dropDownOpen}`);
    // variantOnClick(fullId);
    toggleSubmenu(fullId, dropDownOpen);
  }, [dropDownOpen, fullId]);
  React.useEffect(() => {
    const elementId = `${fullId}_submenu_image`;
    const element = document.getElementById(elementId);
    if (element) {
      if (expandedMenus.includes(fullId)) {
        element.classList.add('rotate-90');
      } else {
        element.classList.remove('rotate-90');
      }
    }
  }, [dropDownOpen, fullId, expandedMenus]);
  const directionImage = variantsDirectionImage[type] || '';
  const variantStyleTopDiv = variantsTopDiv[type] || '';
  const variantStyleInnerDiv = variantsInnerDiv[type] || '';
  const variantStyleButton = variantsButton[type] || '';
  const variantStyleSubmenuImage = variantsSubmenuImage[type] || '';
  // const variantOnClick = variantsOptionClick[type] || (() => (''));
  // const variantOnClick = variantsOptionClick[type] || toggleSubmenu;

  return /*#__PURE__*/React.createElement("div", {
    className: variantStyleTopDiv
  }, /*#__PURE__*/React.createElement("button", {
    className: variantStyleButton,
    id: `${fullId}_button`,
    type: "button",
    onClick: toggledropDownOpen
  }, icon ? /*#__PURE__*/React.createElement(GsIcons, {
    icon: icon ?? '',
    size: "2xl",
    className: NAV_LINK_ICON_CLASS
  }) : title, /*#__PURE__*/React.createElement(GsIcons, {
    id: `${fullId}_submenu_image`,
    icon: directionImage,
    className: variantStyleSubmenuImage
  })), /*#__PURE__*/React.createElement("div", {
    className: variantStyleInnerDiv,
    id: `${fullId}_dropDown`
  }, expandedMenus.includes(fullId) && React.Children.map(children, child => /*#__PURE__*/React.cloneElement(child, {
    closeParent: () => toggledropDownOpen()
  }))));
};
const NavDropdownItem = _ref15 => {
  let {
    children,
    as,
    to,
    onClick,
    reloadDocument,
    type,
    closeParent,
    mobileMenuMode
  } = _ref15;
  const {
    theme
  } = useAppContext();
  const As = as;
  const variantsTopDiv = {
    top_menu: NAV_DROPDOWN_ITEM_TOP_DIV_TOP_MENU_CLASS,
    hamburger: mobileMenuMode ? NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS : NAV_DROPDOWN_ITEM_TOP_DIV_HAMBURGER_CLASS,
    side_menu: NAV_DROPDOWN_ITEM_TOP_DIV_SIDE_MENU_CLASS,
    mobile_menu: NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS
  };
  const variantsButton = {
    top_menu: `${NAV_DROPDOWN_ITEM_BUTTON_TOP_MENU_CLASS} ${theme.textHoverTopSubMenu}`,
    hamburger: `${mobileMenuMode ? NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS : NAV_DROPDOWN_ITEM_BUTTON_HAMBURGER_CLASS} ${mobileMenuMode ? theme.textHoverSide : theme.textHoverTopSubMenu}`,
    side_menu: `${NAV_DROPDOWN_ITEM_BUTTON_SIDE_MENU_CLASS} ${theme.textHoverSide}`,
    mobile_menu: `${NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS} ${theme.textHoverSide}`
  };
  const variantStyleTopDiv = variantsTopDiv[type] || '';
  const variantStyleButton = variantsButton[type] || '';
  return /*#__PURE__*/React.createElement("div", {
    className: variantStyleTopDiv
  }, As && /*#__PURE__*/React.createElement(As, {
    className: variantStyleButton,
    to: to,
    onClick: e => {
      closeParent();
      if (onClick) {
        onClick(e);
      }
    }
  }, children), !As && /*#__PURE__*/React.createElement("button", {
    className: variantStyleButton,
    onClick: e => {
      closeParent();
      if (onClick) {
        onClick(e);
      }
    }
  }, children));
};
NavDropdown.Item = NavDropdownItem;

// Nav

// export const Nav = ({ type, id, children }) => {
//     /* Central Menu */
//     const [visible, setVisible] = useState(false);
//     if (debug) console_debug_log("||||| Nav", children);

//     if (!id) {
//         id = 'nav_' + Math.random().toString(36).substr(2, 9);
//     }

//     const togleVisibility = () => {
//         const idName = `${id}_side_menu`;
//         if (!visible) {
//             document.getElementById(idName).classList.add('hidden');
//         } else {
//             document.getElementById(idName).classList.remove('hidden');
//         }
//         console_debug_log(`togleVisibility | idName: ${idName} | visible: ${visible}`);
//         setVisible(!visible);
//     }

//     const variantsTopDiv = {
//         top_menu: '',
//         hamburger: '',
//         side_menu: 'h-full flex items-center',
//     };

//     const variantsInnerDiv = {
//         top_menu: 'flex flex-col pl-0 mb-0 list-none',
//         top_menu: 'relative flex items-center',
//         hamburger: 'relative flex items-center',
//         // side_menu: 'top-0 left-0 h-full w-64 shadow-lg flex flex-col overflow-y-auto bg-white dark:bg-gray-800',
//         side_menu: `top-0 left-0 h-full w-64 shadow-lg flex flex-col overflow-y-auto ${APP_SIDE_MENU_BG_COLOR_CLASS}`,
//     };

//     const variantStyleTopDiv = variantsTopDiv[type] || '';
//     const variantStyleInnerDiv = variantsInnerDiv[type] || '';

//     return (
//         <div
//             className={variantStyleTopDiv}
//         >
//             <div
//                 className={variantStyleInnerDiv}
//                 id={`${id}_side_menu`}
//             >
//                 {children}
//             </div>
//             {type === 'side_menu' && (
//                 <ToggleSideBar
//                     id={`${id}_toggle`}
//                     className='flex items-center justify-center'
//                     onClick={togleVisibility}
//                 />
//             )}
//         </div>
//     );
// }

const NavLink = _ref16 => {
  let {
    children,
    as,
    to,
    onClick,
    reloadDocument,
    type,
    mobileMenuMode
  } = _ref16;
  const {
    theme,
    isWide
  } = useAppContext();
  const As = as;
  const variantsLi = {
    top_menu: NAV_LINK_TOP_DIV_TOP_MENU_CLASS,
    hamburger: mobileMenuMode ? NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS : NAV_LINK_TOP_DIV_HAMBURGER_CLASS + (isWide ? "" : " " + HIDDEN_CLASS),
    side_menu: NAV_LINK_TOP_DIV_SIDE_MENU_CLASS,
    mobile_menu: NAV_LINK_TOP_DIV_MOBILE_MENU_CLASS
  };
  const variantsButton = {
    top_menu: `${NAV_LINK_BUTTON_TOP_MENU_CLASS}  ${theme.textHoverTop}`,
    hamburger: `${mobileMenuMode ? NAV_LINK_BUTTON_MOBILE_MENU_CLASS : NAV_LINK_BUTTON_HAMBURGER_CLASS} ${mobileMenuMode ? theme.textHoverSide : theme.textHoverTop}`,
    side_menu: `${NAV_LINK_BUTTON_SIDE_MENU_CLASS}  ${theme.textHoverSide}`,
    mobile_menu: `${NAV_LINK_BUTTON_MOBILE_MENU_CLASS}  ${theme.textHoverSide}`
  };
  const variantStyleLi = variantsLi[type] || '';
  const variantStyleButton = variantsButton[type] || '';
  return /*#__PURE__*/React.createElement("div", {
    className: variantStyleLi
  }, /*#__PURE__*/React.createElement(As, {
    to: to
    // onClick={onClick}
    ,
    className: variantStyleButton
  }, children));
};
const Nav = NavbarTopCenterMenu;
Nav.Link = NavLink;

// Buttons

const ToggleSideBar = _ref17 => {
  let {
    onClick,
    ...props
  } = _ref17;
  props.className = VERTICALLY_CENTERED_CLASS + " " + TOP0_Z50_CLASS + " " + (props.className ?? '');
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick
  }, props), /*#__PURE__*/React.createElement(GsIcons, {
    icon: "vertical-slider"
  }));
};
const GsButton = _ref18 => {
  let {
    variant = 'primary',
    className = '',
    as = null,
    ...props
  } = _ref18;
  const variants = {
    primary: BUTTON_PRIMARY_CLASS,
    secondary: BUTTON_SECONDARY_CLASS
  };
  const variantStyle = variants[variant] || '';
  if (as) {
    // https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button
    const As = as;
    return /*#__PURE__*/React.createElement(As, _extends({
      to: props.to ?? props.href ?? null,
      className: `${variantStyle} ${className}`
    }, props));
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: props.type ?? "button",
    className: `${variantStyle} ${className}`
  }, props));
};

var NavLib = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AppFooterContainer: AppFooterContainer,
  AppSectionContainer: AppSectionContainer,
  AppSectionContainerForSideMenu: AppSectionContainerForSideMenu,
  CenteredBoxContainer: CenteredBoxContainer,
  GsButton: GsButton,
  MainContainer: MainContainer,
  Nav: Nav,
  NavDropdown: NavDropdown,
  Navbar: Navbar,
  ToggleSideBar: ToggleSideBar
});

const Button = _ref => {
  let {
    isWide,
    variant = 'primary',
    className = '',
    ...props
  } = _ref;
  const baseStyle = MODALIB_BUTTON_BASESTYLE_CLASS + " " + (isWide ? MODALIB_BUTTON_BASESTYLE_WIDE_CLASS : MODALIB_BUTTON_BASESTYLE_NOT_WIDE_CLASS);
  const variants = {
    primary: MODALIB_BUTTON_PRIMARY_CLASS,
    secondary: MODALIB_BUTTON_SECONDARY_CLASS,
    success: MODALIB_BUTTON_SUCCESS_CLASS,
    danger: MODALIB_BUTTON_DANGER_CLASS
  };
  const variantStyle = variants[variant] || variants.primary;
  return /*#__PURE__*/React.createElement(GsButton, _extends({
    variant: "",
    className: `${baseStyle} ${variantStyle} ${className}`
  }, props));
};
const Modal = _ref2 => {
  let {
    show,
    onHide,
    className,
    children
  } = _ref2;
  const {
    theme
  } = useAppContext();
  React.useEffect(() => {
    const handleOutsideClick = event => {
      // Does not allow close the pop-up if click outside
    };
    if (show) {
      document.addEventListener('mousedown', handleOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [show, onHide]);
  if (!show) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: MODALIB_MODAL_DIV_1_CLASS,
    role: "dialog",
    "aria-modal": "true"
  }, /*#__PURE__*/React.createElement("div", {
    className: `${MODALIB_MODAL_DIV_2_CLASS} ${theme.contentBg} ${theme.text}`
  }, /*#__PURE__*/React.createElement("div", {
    className: MODALIB_MODAL_DIV_3_CLASS
  }, children)));
};
const ModalHeader = _ref3 => {
  let {
    children
  } = _ref3;
  // if MODALIB_MODAL_HEADER_CLASS has no spaces or is empty, means it has no styling...
  if (MODALIB_MODAL_HEADER_CLASS.indexOf(' ') === -1) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, children);
  }
  return /*#__PURE__*/React.createElement("div", {
    className: MODALIB_MODAL_HEADER_CLASS
  }, children);
};
const ModalIcon = _ref4 => {
  let {
    children,
    iconClassName
  } = _ref4;
  if (!iconClassName) {
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: MODALIB_MODAL_ICON_1_CLASS
  }, /*#__PURE__*/React.createElement("div", {
    className: (iconClassName ?? '') + " " + MODALIB_MODAL_ICON_2_CLASS
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: iconClassName === ALERT_DANGER_CLASS ? "warning-sign" : "checked-sign",
    className: MODALIB_MODAL_ICON_3_CLASS
  })));
};
const ModalTitle = _ref5 => {
  let {
    children
  } = _ref5;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h3", {
    className: MODALIB_MODAL_TITLE_CLASS
  }, children));
};
const ModalBody = _ref6 => {
  let {
    children
  } = _ref6;
  return /*#__PURE__*/React.createElement("div", {
    className: MODALIB_MODAL_BODY_CLASS
  }, children);
};
const ModalFooter = _ref7 => {
  let {
    children,
    isWide
  } = _ref7;
  return /*#__PURE__*/React.createElement("div", {
    className: `${MODALIB_MODAL_FOOTER_CLASS} ${isWide ? MODALIB_MODAL_FOOTER_WIDE_CLASS : MODALIB_MODAL_FOOTER_NOT_WIDE_CLASS}`
  }, children);
};
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Icon = ModalIcon;
Modal.Button = Button;

const saveRawItemToLocalStorage = (lsItemName, lsData) => {
  localStorage.setItem(lsItemName, lsData);
};
const getRawItemFromLocalStorage = lsItemName => {
  return localStorage.getItem(lsItemName);
};
const removeItemFromLocalStorage = lsItemName => {
  localStorage.removeItem(lsItemName);
};
const saveItemToLocalStorage = (lsItemName, lsDataDict) => {
  saveRawItemToLocalStorage(lsItemName, JSON.stringify(lsDataDict));
};
const getItemFromLocalStorage = lsItemName => {
  return JSON.parse(getRawItemFromLocalStorage(lsItemName));
};

const history = history$2.createBrowserHistory();
const hasHashRouter = process.env.REACT_APP_HASH_ROUTER ?? true;
const getUrlForRouter = url => {
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  return `${hasHashRouter ? '/#' : ''}${getPrefix()}${url}`;
};
function getPrefix() {
  let hardPrefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (hardPrefix) {
    const prefix = process.env.REACT_APP_URI_PREFIX ?? '';
    return `/${prefix}`;
  }
  return '';
}
const setLastUrl = function () {
  let lastURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (!lastURL) {
    lastURL = window.location.href;
  }
  if (lastURL.indexOf('/login') === -1) {
    saveRawItemToLocalStorage('lastURL', lastURL);
  }
};
const removeLastUrl = () => {
  localStorage.removeItem('lastURL');
  removeItemFromLocalStorage('lastURL');
};
const getLastUrl = () => {
  let lastUrl = getRawItemFromLocalStorage('lastURL');
  if (lastUrl === null || lastUrl === '' || lastUrl === "null") {
    lastUrl = '/';
  }
  return lastUrl;
};

var history$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getLastUrl: getLastUrl,
  getPrefix: getPrefix,
  getUrlForRouter: getUrlForRouter,
  hasHashRouter: hasHashRouter,
  history: history,
  removeLastUrl: removeLastUrl,
  setLastUrl: setLastUrl
});

const ModalPopUp = _ref => {
  let {
    title = null,
    children,
    closeButtonMessage = "Close",
    closeButtonAction = null,
    primaryButtonMessage = null,
    primaryButtonAction = null,
    secondButtonMessage = null,
    secondButtonAction = null,
    logoutButton = false,
    allowOnHide = true,
    link = null,
    showTitle = true,
    htmlContent = null,
    htmlContentClass = null,
    iconClassName = null
  } = _ref;
  const {
    isWide
  } = useAppContext();
  const [show, setShow] = React.useState(true);
  const handleClose = () => setShow(false);
  const handleOnHide = () => setShow(!allowOnHide);
  const linkSuffix = "?menu=0";

  // const handleShow = () => setShow(true);
  // {
  //     <Button variant="primary" onClick={handleShow}>
  //         Open Modal
  //     </Button>
  // }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Modal, {
    show: show,
    onHide: handleOnHide
  }, (iconClassName || title) && showTitle && /*#__PURE__*/React.createElement(Modal.Header, {
    closeButton: true
  }, /*#__PURE__*/React.createElement(Modal.Icon, {
    iconClassName: iconClassName
  }), /*#__PURE__*/React.createElement(Modal.Title, null, title)), /*#__PURE__*/React.createElement(Modal.Body, null, link && /*#__PURE__*/React.createElement("iframe", {
    src: link + linkSuffix,
    style: {
      width: '100%',
      height: '400px'
    },
    title: title
  }), !link && htmlContent === null && children, !link && htmlContent !== null && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: htmlContentClass
    // dangerouslySetInnerHTML={{ __html: htmlContent }}
  }, htmlContent))), /*#__PURE__*/React.createElement(Modal.Footer, {
    isWide: isWide
  }, closeButtonMessage && /*#__PURE__*/React.createElement(DefaultButtonModal, {
    variant: "secondary",
    action: () => closeButtonAction ? closeButtonAction() : handleClose(),
    isWide: isWide
  }, closeButtonMessage), secondButtonMessage && /*#__PURE__*/React.createElement(DefaultButtonModal, {
    variant: "secondary",
    action: secondButtonAction,
    isWide: isWide
  }, secondButtonMessage), primaryButtonMessage && logoutButton && /*#__PURE__*/React.createElement(LogoutNavigate, {
    variant: "primary",
    action: primaryButtonAction,
    isWide: isWide
  }, primaryButtonMessage), primaryButtonMessage && !logoutButton && /*#__PURE__*/React.createElement(DefaultButtonModal, {
    variant: "primary",
    action: primaryButtonAction,
    isWide: isWide
  }, primaryButtonMessage))));
};
const DefaultButtonModal = _ref2 => {
  let {
    children,
    variant,
    action
  } = _ref2;
  return /*#__PURE__*/React.createElement(Button, {
    variant: variant,
    onClick: () => action ? action() : null
  }, children);
};
const LogoutNavigate = _ref3 => {
  let {
    children,
    variant,
    asAhref = false
  } = _ref3;
  if (asAhref) {
    return /*#__PURE__*/React.createElement("a", {
      variant: variant,
      className: BUTTON_PRIMARY_CLASS,
      href: getUrlForRouter('/login')
    }, children);
  }
  // Aria reference:
  // https://www.w3.org/TR/wai-aria-1.2/#aria-details
  return /*#__PURE__*/React.createElement(Button, {
    "aria-details": "ModalLib | LogoutNavigate",
    as: reactRouterDom.Link,
    variant: variant,
    to: getPrefix() + '/login'
  }, children);
};

var ModalPopUp$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  DefaultButtonModal: DefaultButtonModal,
  LogoutNavigate: LogoutNavigate,
  ModalPopUp: ModalPopUp
});

const About = () => {
  return /*#__PURE__*/React.createElement(ModalPopUp, {
    title: "About",
    link: `${window.location.origin}${hasHashRouter ? '/#' : ''}/about_body?menu=0`
  });
};
const AboutBody = _ref => {
  let {
    children,
    modalPopUpTest = true
  } = _ref;
  const version = process.env.REACT_APP_VERSION;
  const appName = process.env.REACT_APP_APP_NAME;
  return /*#__PURE__*/React.createElement("div", {
    className: APP_GENERAL_MARGINS_CLASS
  }, /*#__PURE__*/React.createElement("h1", null, "About ", appName), /*#__PURE__*/React.createElement("p", null, "(Version: ", version && version !== '' ? version : "N/A", ")"), /*#__PURE__*/React.createElement("br", null), children, modalPopUpTest && /*#__PURE__*/React.createElement(ModalPopUp, {
    title: "Test ModalPopUp",
    showTitle: true
    // iconClassName={ALERT_DANGER_CLASS}
    ,
    iconClassName: ALERT_SUCCESS_CLASS,
    primaryButtonMessage: "Login Again",
    primaryButtonAction: null,
    secondButtonMessage: "Retry",
    secondButtonAction: null,
    logoutButton: true
  }, "This is a test test test in ", /*#__PURE__*/React.createElement("i", null, "Italic"), ", ", /*#__PURE__*/React.createElement("u", null, "Underline"), " and ", /*#__PURE__*/React.createElement("b", null, "Boldface"), ".", /*#__PURE__*/React.createElement(ReactMarkdown, {
    components: {
      li: _ref2 => {
        let {
          children
        } = _ref2;
        return /*#__PURE__*/React.createElement("li", {
          className: MARKDOWN_P_CLASS
        }, "* ", children);
      }
    }
  }, "- This is a bullet point with _Italic_ and **Boldface** with markdown syntax."), /*#__PURE__*/React.createElement(ReactMarkdown, {
    components: {
      li: _ref3 => {
        let {
          children
        } = _ref3;
        return /*#__PURE__*/React.createElement("li", {
          className: MARKDOWN_P_CLASS
        }, "* ", children);
      }
    }
  }, "- This is another bullet point."), /*#__PURE__*/React.createElement(ReactMarkdown, null, "``` print(\"Hello GenericSuite! This is a code block example\") ```"), /*#__PURE__*/React.createElement(CopyButton, {
    text: "Content copied!!!"
  }), renderMarkdownContent("This is a __underline__ test using the renderMarkdownContent() function")));
};

// export function getConfigsJsonFile(jsonFileName) {
//     // const basePath = process.env.REACT_APP_JSON_CONFIG_PATH || '../src/configs';
//     // const jsonFilePath = `${basePath}/frontend/${jsonFileName}.json`
//     // const rawJson = require(jsonFilePath);
//     const rawJson = require(`../configs/frontend/${jsonFileName}.json`);
//     return rawJson;
// }

const buildConstant = constants => {
  return Object.entries(constants).map(_ref => {
    let [key, value] = _ref;
    return {
      title: value,
      value: key
    };
  });
};

var jsonUtilities = /*#__PURE__*/Object.freeze({
  __proto__: null,
  buildConstant: buildConstant
});

var TRUE_FALSE$1 = {
	"0": "No",
	"1": "Yes"
};
var YES_NO$1 = {
	y: "Yes",
	n: "No"
};
var LANGUAGES$1 = {
	en: "English",
	es: "Español"
};
var GENDERS$1 = {
	m: "Male",
	f: "Female"
};
var constants$1 = {
	TRUE_FALSE: TRUE_FALSE$1,
	YES_NO: YES_NO$1,
	LANGUAGES: LANGUAGES$1,
	GENDERS: GENDERS$1
};

// Security

const MSG_ERROR_INVALID_TOKEN = ['A valid token is missing', 'Token is invalid', 'Session expired', 'HTTP 401'];
const MSG_ERROR_INVALID_CREDS = 'The username or password is incorrect. Please try again.';
const MSG_ERROR_SESSION_EXPIRED = 'Session expired.';
const MSG_ERROR_CLICK_TO_RELOGIN = 'Login again';
const MSG_ERROR_CLICK_TO_RETRY = 'Retry';

// API / Database

const MSG_ERROR_CONNECTION_FAIL = 'Connection failure';
const MSG_ERROR_POSSIBLE_CORS = 'Possible CORS';

// General

const WAIT_ANIMATION_IMG = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
const MSG_ALT_WAIT_ANIMATION = 'Wait...';

// All images must be in static/media/ directory for dev, qa, staging and prod stages/environments
const imageDirectory = "static/media/";

// Generic editor : general constants

const ACTION_CREATE = 'create';
const ACTION_READ = 'read';
const ACTION_UPDATE = 'update';
const ACTION_DELETE = 'delete';
const ACTION_LIST = 'list';

// Generic editor : messages

const MSG_ERROR_MISSING_ARRAY_NAME_PARAM = 'Missing "array_name" parameter. It must be specified for subType "array".';
const MSG_ERROR_ID_NOT_FOUND = 'ID not found...';
const MSG_DELETE_CONFIRM = 'Are you sure to delete this element? Please confirm with the [Delete] button or [Cancel] this operation.';
const MSG_ACTION_CREATE = 'Create';
const MSG_ACTION_NEW = 'New';
const MSG_ACTION_READ = 'View';
const MSG_ACTION_EDIT = 'Edit';
const MSG_ACTION_UPDATE = 'Update';
const MSG_ACTION_DELETE = 'Delete';
const MSG_ACTION_LIST = 'Listing';
const MSG_ACTION_CANCEL = 'Cancel';
const MSG_SELECT_AN_OPTION = 'Select an option...';
const MSG_PREVIOUS = "Previous";
const MSG_NEXT = "Next";
const MSG_PAGE = "Page";
const MSG_OF = "of";
const MSG_DONE_DELETED = 'Item has been deleted';
const MSG_DONE_CREATED = 'Item has been created';
const MSG_DONE_UPDATED = 'Item has been updated';
const MSG_ACTIONS = 'Actions';
const MSG_SEARCH = 'Search';
const MSG_RELOAD = 'Reload';
const MSG_MORE = 'More';
const MSG_IS_REQUIRED = 'is required';
const MSG_MUST_BE = 'must be';
const MSG_VALID_INTEGER = 'an integer number';
const MSG_VALID_NUMBER = 'a number';
const MSG_VALID_DATE = 'a valid date';
const MSG_VALID_EMAIL = 'a valid email address';
const MSG_ROWS_PER_PAGE = "Rows per page";

// Generic editor : default values

const ROWS_PER_PAGE = 5;

// Generic editor : general select options

// const constants = getConfigsJsonFile('general_constants');
const TRUE_FALSE = buildConstant(constants$1.TRUE_FALSE);
const YES_NO = buildConstant(constants$1.YES_NO);
const LANGUAGES = buildConstant(constants$1.LANGUAGES);
const GENDERS = buildConstant(constants$1.GENDERS);

var general_constants = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ACTION_CREATE: ACTION_CREATE,
  ACTION_DELETE: ACTION_DELETE,
  ACTION_LIST: ACTION_LIST,
  ACTION_READ: ACTION_READ,
  ACTION_UPDATE: ACTION_UPDATE,
  GENDERS: GENDERS,
  LANGUAGES: LANGUAGES,
  MSG_ACTIONS: MSG_ACTIONS,
  MSG_ACTION_CANCEL: MSG_ACTION_CANCEL,
  MSG_ACTION_CREATE: MSG_ACTION_CREATE,
  MSG_ACTION_DELETE: MSG_ACTION_DELETE,
  MSG_ACTION_EDIT: MSG_ACTION_EDIT,
  MSG_ACTION_LIST: MSG_ACTION_LIST,
  MSG_ACTION_NEW: MSG_ACTION_NEW,
  MSG_ACTION_READ: MSG_ACTION_READ,
  MSG_ACTION_UPDATE: MSG_ACTION_UPDATE,
  MSG_ALT_WAIT_ANIMATION: MSG_ALT_WAIT_ANIMATION,
  MSG_DELETE_CONFIRM: MSG_DELETE_CONFIRM,
  MSG_DONE_CREATED: MSG_DONE_CREATED,
  MSG_DONE_DELETED: MSG_DONE_DELETED,
  MSG_DONE_UPDATED: MSG_DONE_UPDATED,
  MSG_ERROR_CLICK_TO_RELOGIN: MSG_ERROR_CLICK_TO_RELOGIN,
  MSG_ERROR_CLICK_TO_RETRY: MSG_ERROR_CLICK_TO_RETRY,
  MSG_ERROR_CONNECTION_FAIL: MSG_ERROR_CONNECTION_FAIL,
  MSG_ERROR_ID_NOT_FOUND: MSG_ERROR_ID_NOT_FOUND,
  MSG_ERROR_INVALID_CREDS: MSG_ERROR_INVALID_CREDS,
  MSG_ERROR_INVALID_TOKEN: MSG_ERROR_INVALID_TOKEN,
  MSG_ERROR_MISSING_ARRAY_NAME_PARAM: MSG_ERROR_MISSING_ARRAY_NAME_PARAM,
  MSG_ERROR_POSSIBLE_CORS: MSG_ERROR_POSSIBLE_CORS,
  MSG_ERROR_SESSION_EXPIRED: MSG_ERROR_SESSION_EXPIRED,
  MSG_IS_REQUIRED: MSG_IS_REQUIRED,
  MSG_MORE: MSG_MORE,
  MSG_MUST_BE: MSG_MUST_BE,
  MSG_NEXT: MSG_NEXT,
  MSG_OF: MSG_OF,
  MSG_PAGE: MSG_PAGE,
  MSG_PREVIOUS: MSG_PREVIOUS,
  MSG_RELOAD: MSG_RELOAD,
  MSG_ROWS_PER_PAGE: MSG_ROWS_PER_PAGE,
  MSG_SEARCH: MSG_SEARCH,
  MSG_SELECT_AN_OPTION: MSG_SELECT_AN_OPTION,
  MSG_VALID_DATE: MSG_VALID_DATE,
  MSG_VALID_EMAIL: MSG_VALID_EMAIL,
  MSG_VALID_INTEGER: MSG_VALID_INTEGER,
  MSG_VALID_NUMBER: MSG_VALID_NUMBER,
  ROWS_PER_PAGE: ROWS_PER_PAGE,
  TRUE_FALSE: TRUE_FALSE,
  WAIT_ANIMATION_IMG: WAIT_ANIMATION_IMG,
  YES_NO: YES_NO,
  imageDirectory: imageDirectory
});

var BILLING_PLANS$1 = {
	free: "Free",
	basic: "Basic",
	premium: "Premium"
};
var ERROR_MESSAGES$1 = {
	ACCOUNT_INACTIVE: "User account inactive [L5]. To activate your account, please contact support@exampleapp.com"
};
var APP_EMAILS$1 = {
	SUPPORT_EMAIL: "support@exampleapp.com",
	INFO_EMAIL: "info@exampleapp.com"
};
var APP_VALID_URLS$1 = {
	APP_DOMAIN: "exampleapp.com",
	APP_WEBSITE: "https://www.exampleapp.com"
};
var constants = {
	BILLING_PLANS: BILLING_PLANS$1,
	ERROR_MESSAGES: ERROR_MESSAGES$1,
	APP_EMAILS: APP_EMAILS$1,
	APP_VALID_URLS: APP_VALID_URLS$1
};

const BILLING_PLANS = buildConstant(constants.BILLING_PLANS);
const ERROR_MESSAGES = constants.ERROR_MESSAGES;
const APP_EMAILS = constants.APP_EMAILS;
const APP_VALID_URLS = constants.APP_VALID_URLS;

var app_constants = /*#__PURE__*/Object.freeze({
  __proto__: null,
  APP_EMAILS: APP_EMAILS,
  APP_VALID_URLS: APP_VALID_URLS,
  BILLING_PLANS: BILLING_PLANS,
  ERROR_MESSAGES: ERROR_MESSAGES
});

const getCurrentUserFromLocalStorage = () => {
  // return JSON.parse(localStorage.getItem('currentUser'));
  return getItemFromLocalStorage('currentUser');
};
const currentUserSubject = new rxjs.BehaviorSubject(getCurrentUserFromLocalStorage());
function logout() {
  let lastURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  // Remove user from local storage to log user out
  // localStorage.removeItem('currentUser');
  removeItemFromLocalStorage('currentUser');
  currentUserSubject.next(null);
  if (lastURL) {
    setLastUrl(lastURL);
  }
}

var logout_service = /*#__PURE__*/Object.freeze({
  __proto__: null,
  currentUserSubject: currentUserSubject,
  getCurrentUserFromLocalStorage: getCurrentUserFromLocalStorage,
  logout: logout
});

function authHeader() {
  // Returns authorization header with jwt token
  let currentUser = null;
  try {
    currentUser = getCurrentUserFromLocalStorage();
  } catch (error) {
    console_debug_log(`authHeader | ERROR: ${error}`);
  }
  if (currentUser && currentUser.token) {
    if (process.env.REACT_APP_X_TOKEN) {
      return {
        'x-access-tokens': currentUser.token
      };
    } else {
      return {
        Authorization: `Bearer ${currentUser.token}`
      };
    }
  } else {
    return {};
  }
}

var authHeader$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  authHeader: authHeader
});

const usePlainFetch = false;
function handleResponse(response) {
  if (response.headers && response.response) {
    return handleResponseText(response, response.response, response.headers);
  } else {
    return response.text().then(text => {
      return handleResponseText(response, text, {});
    }, reason => {
      console.error(reason);
    });
  }
}
function handleResponseText(response, text, headers) {
  let data = {};
  if (IsJsonString(text)) {
    data = text && JSON.parse(text);
  }
  if (!response.ok) {
    let specificErrorMsg = data && data.message || text || response.statusText || '';
    if ([401, 403].indexOf(response.status) !== -1) {
      // Auto logout if 401 Unauthorized or 403 Forbidden response returned from api
      if (response.status === 401) {
        if (specificErrorMsg === '') {
          specificErrorMsg = MSG_ERROR_INVALID_CREDS;
        }
      }
    }
    const errorMsg = specificErrorMsg || data && data.message || text || response.statusText;
    return Promise.reject(errorMsg);
  } else {
    data.headers = headers;
    if (!IsJsonString(text)) {
      data.file = text;
      if (!data.headers.get('content-type')) {
        data.headers.set('content-type', 'application/octet-stream');
      }
    }
    if (typeof data.error == 'undefined') {
      data.error = false;
    }
    if (typeof data.error_message != 'undefined') {
      data.message = data.error_message;
    }
    if (typeof data.resultset != 'undefined' && typeof data.resultset != 'object') {
      // When the data.resultset has an array of records (objects) instead of a sigle object, it comes as an encapsulated string
      data.resultset = JSON.parse(data.resultset);
    }
  }
  return data;
}
async function handleFetchError(error) {
  let possibleCORS;
  let errorMsg;
  let reasonDetail;
  if (error instanceof Response) {
    /*
        body: (...)
        bodyUsed: false
        headers: Headers {}: 
        ok: false
        redirected: false
        status: 401
        statusText: "Unauthorized"
        type: "cors"
        url: "https://hostanme/endpoint"
    */
    possibleCORS = error.statusText.includes('CORS');
    reasonDetail = await error.text().then(text => {
      return text;
    }).catch(e => {
      return `HTTP ${error.status}`;
    });
    if (error.status === 401) {
      errorMsg = MSG_ERROR_SESSION_EXPIRED;
    } else {
      errorMsg = error.statusText;
    }
  } else {
    possibleCORS = error instanceof TypeError && error.message.includes('Failed to fetch');
    errorMsg = MSG_ERROR_CONNECTION_FAIL + (possibleCORS ? ` (${MSG_ERROR_POSSIBLE_CORS})` : '');
    reasonDetail = error;
  }
  return Promise.reject({
    error: true,
    message: errorMsg,
    reason: reasonDetail
  });
}
function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

var response_handlers_service = /*#__PURE__*/Object.freeze({
  __proto__: null,
  IsJsonString: IsJsonString,
  handleFetchError: handleFetchError,
  handleResponse: handleResponse,
  handleResponseText: handleResponseText,
  usePlainFetch: usePlainFetch
});

// Blob files utilities

const defaultFilenametoDownload = 'audio.wav';
const getFileExtension = filename => {
  const fileExtension = filename ? filename.split('.').pop() : null;
  return fileExtension;
};
const getContentType = function (filename) {
  let forceAlternative = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  const fileExtension = getFileExtension(filename);
  let contentType = null;
  switch (fileExtension) {
    case 'wav':
      contentType = 'audio/wav';
      break;
    case 'mp3':
      if (forceAlternative) {
        contentType = 'audio/mp3';
      } else {
        contentType = 'audio/mpeg';
      }
      break;
    case 'csv':
      contentType = 'text/csv';
      break;
    case 'pdf':
      contentType = 'application/pdf';
      break;
    default:
      contentType = 'application/octet-stream';
  }
  return contentType;
};
const getFilenameFromContentDisposition = headers => {
  // Example: attachment; filename="dccbd8f2900a4c7eb1035add851da72f.wav"
  const contentDisposition = headers.get('content-disposition');
  const filenameMatch = contentDisposition && contentDisposition.match(/filename="([^"]+)"/);
  const filename = filenameMatch ? filenameMatch[1] : null;
  return filename;
};
const performDownload = function (fileUrl) {
  let filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  let performIt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  const link = document.createElement('a');
  link.href = fileUrl;
  link.setAttribute('download', filename ? filename : defaultFilenametoDownload); // or any other extension
  document.body.appendChild(link);
  if (performIt) {
    link.click();
    document.body.removeChild(link);
    return true;
  }
  return link;
};
const getHeadersContentType = headers => {
  return headers.get('content-type');
};
const responseHasFile = headers => {
  const contentType = getHeadersContentType(headers);
  return contentType === 'application/octet-stream' || contentType.includes('audio/') || contentType.includes('image/') || contentType.includes('video/') || contentType.includes('text/csv') || contentType.includes('text/text') // TODO: only to simulate AWS API Gateway
  ;
};
const isBinaryFileType = filename => {
  const contentType = getContentType(filename);
  return contentType === 'application/octet-stream' || contentType.includes('audio/') || contentType.includes('image/') || contentType.includes('video/');
};
const decodeBlob = function (base64String, filename) {
  let oldUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  const blobType = getContentType(filename);
  if (typeof base64String !== 'string') {
    if (oldUrl === null) {
      throw new Error('Expected a string');
    }
    return oldUrl;
  }
  let binaryString;
  let stringIsAbinary = false;
  try {
    binaryString = window.atob(base64String);
  } catch (e) {
    if (e instanceof DOMException && e.name === 'InvalidCharacterError') {
      // throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded contains characters outside of the Latin1 range. This may occur if the backend is in FastAPI instead of Chalice.");
      stringIsAbinary = true;
    } else {
      throw e;
    }
  }
  let blob;
  if (!stringIsAbinary) {
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    blob = new Blob([bytes], {
      type: blobType
    });
  } else {
    blob = new Blob([base64String], {
      type: blobType
    });
  }
  const url = URL.createObjectURL(blob);
  return url;
};
const fixBlob = async (blobObj, filename) => {
  let blobUrl = URL.createObjectURL(blobObj);
  if (!isBinaryFileType(filename)) {
    return new Promise((resolve, _) => {
      resolve(blobUrl);
    });
  }
  const reader = new FileReader();
  // reader.readAsDataURL(blob);  // Convert to data:audio/mpeg;base64,Ly9Qa3h...
  reader.readAsText(blobObj); // No convertion at all... just get what it receives...
  return new Promise((resolve, reject) => {
    reader.onloadend = function () {
      if (typeof reader.result !== 'string') {
        resolve(blobUrl);
      } else {
        blobUrl = decodeBlob(reader.result, filename);
        resolve(blobUrl);
      }
    };
    reader.onerror = function (error) {
      reject(error);
    };
  });
};

var blob_files_utilities = /*#__PURE__*/Object.freeze({
  __proto__: null,
  decodeBlob: decodeBlob,
  defaultFilenametoDownload: defaultFilenametoDownload,
  fixBlob: fixBlob,
  getContentType: getContentType,
  getFileExtension: getFileExtension,
  getFilenameFromContentDisposition: getFilenameFromContentDisposition,
  getHeadersContentType: getHeadersContentType,
  isBinaryFileType: isBinaryFileType,
  performDownload: performDownload,
  responseHasFile: responseHasFile
});

// export const MULTIPART_FORM_DATA_HEADER = {'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'};
const MULTIPART_FORM_DATA_HEADER = {
  'Content-Type': 'multipart/form-data'
};
class dbApiService {
  constructor(props) {
    _defineProperty(this, "props", null);
    _defineProperty(this, "apiUrl", process.env.REACT_APP_API_URL);
    _defineProperty(this, "debug", false);
    this.props = props;
    this.props.authHeader = authHeader();
    this.props.authAndJsonHeader = Object.assign({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      // https://stackoverflow.com/questions/43344819/reading-response-headers-with-fetch-api
      // IMPORTANT: this makes the frontend unresponsive when it's deployed on the cloud (AWS)
      // 'Access-Control-Allow-Headers': 'Content-Type, Content-Disposition',
    }, this.props.authHeader);
    if (this.debug) {
      console_debug_log('###===> dbApiService() | this.props:');
      console_debug_log(this.props);
    }
  }
  paramsToUrlQuery(params) {
    let urlQuery = '';
    Object.entries(params).map(_ref => {
      let [key, value] = _ref;
      return urlQuery += (urlQuery === '' ? '?' : '&') + key + '=' + value;
    });
    return urlQuery;
  }
  getFetch(url, requestOptions) {
    let response;
    try {
      if (usePlainFetch) ; else {
        response = fetch(url, requestOptions).then(response => {
          if (this.debug) console_debug_log('||| getFetch | Phase 1 | response:', response);
          if (!response.ok) {
            // throw new Error('Network response was not ok');
            return Promise.reject(response);
          }
          const headers = response.headers;
          // Process blob
          if (responseHasFile(headers)) {
            // Get file name and extension
            const filename = getFilenameFromContentDisposition(headers);
            return response.blob().then(blob => {
              // Create a link to download the file (from blob)
              // Verifying if it's a binary encoded as Base64 string
              return fixBlob(blob, filename).then(text => {
                // "text" contains the blob URL...
                if (this.debug) console_debug_log('||| getFetch | Phase 1.5 | blob:', blob, 'text:', text, 'filename:', filename);
                return {
                  headers,
                  text,
                  response
                };
              }, error => {
                if (this.debug) console_debug_log('||| getFetch | fixBlob | error:', error);
                return Promise.reject(response);
              });
            });
          } else {
            // Process headers if needed here and the response text body
            return response.text().then(text => {
              return {
                headers,
                text,
                response
              };
            });
          }
        }).then(_ref2 => {
          let {
            headers,
            text,
            response
          } = _ref2;
          if (this.debug) console_debug_log('||| getFetch | Phase 2 | headers:', headers, 'text', text, 'response:', response);
          const data = {
            response: text,
            headers: headers,
            // Attach headers to the data object
            ok: response.ok,
            status: response.status,
            statusText: response.statusText
          };
          return data;
        }).then(handleResponse).catch(handleFetchError);
      }
    } catch (e) {
      if (this.debug) console_debug_log('|| FETCH Error:', e);
      response = Promise.resolve(handleFetchError(e));
    }
    return response;
  }
  getAll() {
    let params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    let data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    let method = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'GET';
    let options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    let requestOptions = {};
    let body;
    let headers = {};
    if (options['headers']) {
      headers = options['headers'];
    }
    if (options['raw_body']) {
      body = data;
    } else {
      body = JSON.stringify(data);
    }
    if (['POST', 'PUT'].includes(method)) {
      requestOptions = {
        method: method,
        headers: Object.assign({}, this.props.authAndJsonHeader, headers),
        body: body
      };
    } else {
      requestOptions = {
        method: method,
        headers: this.props.authHeader
      };
    }
    if (options['signal']) {
      requestOptions['signal'] = options['signal'];
    }
    const urlQuery = this.paramsToUrlQuery(params);
    const url = `${this.apiUrl}/${this.props.url}${urlQuery}`;
    if (this.debug) {
      console_debug_log(`###===> getAll() | ${this.apiUrl}/${this.props.url}${urlQuery}`);
    }
    return this.getFetch(url, requestOptions);
  }
  getOne(params) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const requestOptions = {
      ...options,
      method: 'GET',
      headers: this.props.authHeader
    };
    const urlQuery = this.paramsToUrlQuery(params);
    if (this.debug) {
      console_debug_log(`###===> getOne() | ${this.apiUrl}/${this.props.url}${urlQuery}`);
    }
    const url = `${this.apiUrl}/${this.props.url}${urlQuery}`;
    return this.getFetch(url, requestOptions);
  }
  createUpdateDelete(action, id, data) {
    let queryParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    switch (action) {
      case ACTION_CREATE:
        return this.createRow(data, queryParams);
      case ACTION_UPDATE:
        return this.updateRow(id, data, queryParams);
      case ACTION_DELETE:
        return this.deleteRow(id, data, queryParams);
      default:
        return handleFetchError('Error CUD-1 - Invalid action: ' + action);
    }
  }
  createRow(data) {
    let queryParams = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const urlQuery = this.paramsToUrlQuery(queryParams);
    const requestOptions = {
      method: 'POST',
      headers: this.props.authAndJsonHeader,
      body: JSON.stringify(data)
    };
    if (this.debug) {
      console_debug_log(`###===> createRow() | ${this.apiUrl}/${this.props.url}${urlQuery}`);
    }
    const response = fetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions).then(handleResponse).catch(handleFetchError);
    return response;
  }
  updateRow(id, data) {
    let queryParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const urlQuery = this.paramsToUrlQuery(queryParams);
    if (id !== null) {
      data.id = id;
    }
    const requestOptions = {
      method: 'PUT',
      headers: this.props.authAndJsonHeader,
      body: JSON.stringify(data)
    };
    if (this.debug) {
      console_debug_log(`###===> updateRow() | ${this.apiUrl}/${this.props.url}${urlQuery}`);
    }
    const response = fetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions).then(handleResponse).catch(handleFetchError);
    return response;
  }
  deleteRow(id, data) {
    let queryParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let urlQuery = this.paramsToUrlQuery(queryParams);
    if (id !== null) {
      urlQuery += (urlQuery === '' ? '?' : "&") + `id=${id}`;
    }
    const requestOptions = {
      method: 'DELETE',
      headers: this.props.authAndJsonHeader,
      body: JSON.stringify(data)
    };
    if (this.debug) {
      console_debug_log(`###===> deleteRow() | ${this.apiUrl}/${this.props.url}${urlQuery}`);
    }
    const response = fetch(`${this.apiUrl}/${this.props.url}${urlQuery}`, requestOptions).then(handleResponse).catch(handleFetchError);
    return response;
  }
  convertId(id) {
    return convertId(id);
  }
}
const convertId = id => {
  return id === null || id === '' || typeof id === 'string' ? id : id.$oid;
};

var db_service = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MULTIPART_FORM_DATA_HEADER: MULTIPART_FORM_DATA_HEADER,
  convertId: convertId,
  dbApiService: dbApiService
});

const defaultItemName = function () {
  let lsItemName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return lsItemName ? lsItemName : 'currentConfig';
};
const buildConfigData = function () {
  let lsDataDict = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  const defaultConfigData = {
    "pref_dark_mode": "1",
    "pref_side_menu": "1",
    "language": "en",
    "currency": "USD",
    "timezone": "America/New_York"
  };
  lsDataDict = lsDataDict ?? {};
  // Merge defaultConfigData with lsDataDict
  return {
    ...defaultConfigData,
    ...lsDataDict
  };
};
const saveLocalConfig = function (lsDataDict) {
  let lsItemName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  lsItemName = defaultItemName(lsItemName);
  // This allows to add configuration items individually
  const existingLocalConfig = getLocalConfig(lsItemName);
  lsDataDict = {
    ...existingLocalConfig,
    ...lsDataDict
  };
  saveItemToLocalStorage(lsItemName, lsDataDict);
};
const getLocalConfig = function () {
  let lsItemName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  lsItemName = defaultItemName(lsItemName);
  const lsDataDict = getItemFromLocalStorage(lsItemName);
  return buildConfigData(lsDataDict);
};

// Authentication service

const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};
function login(username, password) {
  const config = {
    apiUrl: process.env.REACT_APP_API_URL
  };
  // FA-62 - FE: Find a replacement for btoa()
  const requestOptions = {
    method: 'POST',
    headers: {
      "Authorization": "Basic " + buffer.Buffer.from(username + ":" + password).toString('base64')
    }
  };
  new dbApiService({
    url: 'users'
  });
  return fetch(`${config.apiUrl}/users/login`, requestOptions).then(handleResponse, handleFetchError).then(res => {
    if (res.error) {
      return Promise.reject(res.message);
    }
    let user = {
      token: res.resultset.token
    };
    // Store the JWT token only in local storage to keep user logged in between page refreshes
    // localStorage.setItem('currentUser', JSON.stringify(user));
    saveItemToLocalStorage('currentUser', user);
    currentUserSubject.next(user);
    // Return user details and JWT token
    return getUserLocalData(res);
  });
}
const getUserData = userId => {
  const dbApi = new dbApiService({
    url: 'users'
  });
  return dbApi.getOne({
    id: userId
  }).then(data => data, error => {
    console_debug_log(`ERROR: getUserData(${userId}):`);
    console.error(error);
    return {
      error: true,
      errorMsg: error
    };
  });
};
const getUserLocalData = res => {
  const userService = new dbApiService({
    url: 'users'
  });
  const data = res.resultset;
  const localConfig = getLocalConfig();
  return {
    id: userService.convertId(data._id),
    // username: data.username,
    // email: data.email,
    firstName: data.firstname,
    // lastName: data.lastname,
    // token: data.token
    pref_side_menu: data.pref_side_menu ?? localConfig.pref_side_menu,
    pref_dark_mode: data.pref_dark_mode ?? localConfig.pref_dark_mode
  };
};
const getCurrentUserData = () => {
  const dbApi = new dbApiService({
    url: 'users/current_user_d'
  });
  return dbApi.getOne({}).then(data => data, error => {
    return {
      error: true,
      errorMsg: error
    };
  });
};
const verifyCurrentUser = registerUser => {
  if (authenticationService && typeof authenticationService.currentUserValue !== 'undefined' && authenticationService.currentUserValue) {
    getCurrentUserData().then(userData => {
      if (userData.error) ; else {
        registerUser(getUserLocalData(userData));
      }
    }, error => {
      console.error(error.errorMsg);
    });
  }
};

var authentication_service = /*#__PURE__*/Object.freeze({
  __proto__: null,
  authenticationService: authenticationService,
  getCurrentUserData: getCurrentUserData,
  getUserData: getUserData,
  getUserLocalData: getUserLocalData,
  verifyCurrentUser: verifyCurrentUser
});

function logoutHander() {
  `${window.location.origin}${getUrlForRouter('/login')}`;
  authenticationService.logout();
  {
    window.location.reload(true);
  }
}
function refreshPage() {
  window.location.reload();
}
const getErrorMessage = error => {
  let errorMessage = error;
  if (typeof error !== 'string') {
    if (typeof error['errorMsg'] !== 'undefined') {
      if (typeof error['errorMsg'] == 'string') {
        errorMessage = error['errorMsg'];
      } else {
        error = error['errorMsg'];
        errorMessage = error['message'];
      }
    } else {
      errorMessage = error['message'];
    }
    if (typeof error['reason'] !== 'undefined') {
      errorMessage += ': ' + (typeof error['reason']['message'] !== "undefined" ? error['reason']['message'] : typeof error['reason'] === 'string' ? error['reason'] : JSON.stringify(error['reason']));
    }
  }
  // if (debug || get_debug_flag()) {
  //     errorMessage = `${errorMessage}\nDebug:\n${JSON.stringify(error)}`;
  // }
  return errorMessage;
};
const isSessionExpired = errorMessage => {
  return MSG_ERROR_INVALID_TOKEN.some(token => errorMessage.includes(token));
};
const includesAppValidLinks = message => {
  return Object.values(APP_EMAILS).some(email => message.includes(email)) || Object.values(APP_VALID_URLS).some(url => message.includes(url));
};
function errorAndReEnter(error) {
  let errorCode = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  let forceLogin = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let refreshHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  let parentLogoutHandler = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  let logoutButton = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  let closeButton = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : true;
  let closeHandler = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : null;
  const errorMessage = getErrorMessage(error) + (errorCode ? ` ${errorCode}` : '');
  if (forceLogin === null) {
    forceLogin = false;
  }
  if (typeof error !== 'string' || forceLogin === null) {
    forceLogin = true;
  }
  if (refreshHandler === null) {
    refreshHandler = refreshPage;
  }
  if (parentLogoutHandler === null) {
    parentLogoutHandler = logoutHander;
    logoutButton = true;
  }
  const retryMessage = isSessionExpired(errorMessage) ? MSG_ERROR_SESSION_EXPIRED : errorMessage;
  const msgContainsHtml = includesAppValidLinks(retryMessage);
  const retryButton = MSG_ERROR_CLICK_TO_RETRY;
  const loginButton = forceLogin || isSessionExpired(errorMessage) ? MSG_ERROR_CLICK_TO_RELOGIN : null;
  if (isSessionExpired(errorMessage)) {
    // If session is expired, clear current user in local storage
    setLastUrl();
    authenticationService.logout();
  }
  return /*#__PURE__*/React.createElement(ModalPopUp, {
    closeButtonMessage: closeButton ? "Close" : null,
    secondButtonMessage: retryButton,
    secondButtonAction: refreshHandler,
    primaryButtonMessage: loginButton,
    primaryButtonAction: parentLogoutHandler,
    logoutButton: logoutButton,
    htmlContent: msgContainsHtml ? retryMessage : null,
    iconClassName: ALERT_DANGER_CLASS,
    closeButtonAction: closeHandler
  }, msgContainsHtml ? null : retryMessage);
}
function errorAndReEnterNonModal(error) {
  let forceLogin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let refreshHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let logoutHandler = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  let errorMessage = getErrorMessage(error);
  if (typeof error !== 'string') {
    forceLogin = true;
  }
  return /*#__PURE__*/React.createElement("div", null, errorAndRetry(errorMessage, refreshHandler), errorLoginAgain(errorMessage, forceLogin, logoutHandler));
}
function errorLoginAgain(errorMessage) {
  let forceLogin = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let parentLogoutHandler = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (parentLogoutHandler === null) {
    parentLogoutHandler = logoutHander;
  }
  if (forceLogin || MSG_ERROR_INVALID_TOKEN.includes(errorMessage)) {
    setLastUrl();
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Button
    // as={RouterLink}
    , {
      to: getPrefix() + '/login',
      onClick: parentLogoutHandler
    }, MSG_ERROR_CLICK_TO_RELOGIN));
  }
  return /*#__PURE__*/React.createElement("div", null);
}
function errorAndRetry(errorMessage) {
  let refreshHandler = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (refreshHandler === null) {
    refreshHandler = refreshPage;
  }
  return /*#__PURE__*/React.createElement("div", null, errorMessageDiv(MSG_ERROR_INVALID_TOKEN.includes(errorMessage) ? MSG_ERROR_SESSION_EXPIRED : errorMessage), /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Button, {
    onClick: refreshHandler
  }, MSG_ERROR_CLICK_TO_RETRY));
}
function errorMessageDiv(errorMessage) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    },
    className: ALERT_DANGER_CLASS
  }, errorMessage);
}
const formatCaughtError = error => {
  let response = {
    "error": true,
    "message": getErrorMessage(error)
  };
  return response;
};

var errorAndReenter = /*#__PURE__*/Object.freeze({
  __proto__: null,
  errorAndReEnter: errorAndReEnter,
  errorAndReEnterNonModal: errorAndReEnterNonModal,
  errorAndRetry: errorAndRetry,
  errorLoginAgain: errorLoginAgain,
  errorMessageDiv: errorMessageDiv,
  formatCaughtError: formatCaughtError,
  getErrorMessage: getErrorMessage,
  includesAppValidLinks: includesAppValidLinks,
  isSessionExpired: isSessionExpired,
  logoutHander: logoutHander,
  refreshPage: refreshPage
});

// GenericCrudEditor general utilities

const defaultValue = function (dictObj, elementName) {
  let defaultValue = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  if (typeof dictObj[elementName] !== 'undefined') {
    return dictObj[elementName];
  }
  return defaultValue;
};
const replaceSpecialVars = (params, currentUser) => {
  Object.keys(params).forEach(key => {
    if (params[key] === "{CurrentUserId}") {
      params[key] = currentUser.id;
    }
  });
  return params;
};

var generic_editor_utilities = /*#__PURE__*/Object.freeze({
  __proto__: null,
  defaultValue: defaultValue,
  replaceSpecialVars: replaceSpecialVars
});

// GenericMenuService (GMS) main

const jsPrefixToken = /\|([^|]*)\|/;
const routeExact = false;
const getOnClickObject = (onClickString, componentMap, setExpanded) => {
  let resutlFunction = null;
  const windowOpenObjs = {
    "about": {
      "url": "about_body?menu=0",
      "name": "AppAboutPopUp",
      "options": "height=600,width=400"
    }
  };
  if (!onClickString) {
    if (setExpanded) {
      resutlFunction = () => {
        setExpanded();
      };
    }
  } else {
    // |about|
    // Before:
    // "|js|window.open(window.location.origin + '/#/about_body?menu=0', 'AppAboutPopUp','height=600,width=400')"
    if (onClickString.startsWith("|")) {
      const match = onClickString.match(jsPrefixToken);
      if (match) {
        const woOptions = typeof windowOpenObjs[match[1]] !== "undefined" ? windowOpenObjs[match[1]] : null;
        if (woOptions) {
          const windowOpenFn = woOptions => window.open(`${window.location.origin}${getUrlForRouter("/" + woOptions.url)}`, woOptions.name, woOptions.options);
          if (setExpanded) {
            resutlFunction = () => {
              setExpanded();
              windowOpenFn(woOptions);
              return window.location.href;
            };
          } else {
            resutlFunction = () => {
              windowOpenFn(woOptions);
              return window.location.href;
            };
          }
        } else {
          resutlFunction = () => {
            alert(`ERROR: invalid onClick: ${onClickString}`);
            return window.location.href;
          };
        }
      }
    } else {
      if (setExpanded) {
        resutlFunction = () => {
          setExpanded(componentMap[onClickString]);
        };
      } else {
        resutlFunction = componentMap[onClickString];
      }
    }
  }
  return resutlFunction;
};
const getElementObj = (componentMap, item) => {
  const ElementObj = componentMap[item.element];
  if (ElementObj) {
    return ElementObj;
  }
  return null;
};
const getItemDefaults = function (componentMap, setExpanded, item) {
  let topTitle = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  const hard_prefix = defaultValue(item, "hard_prefix", false);
  const get_prefix = defaultValue(item, "get_prefix", false);
  const reload = defaultValue(item, "reload", false);
  const template = defaultValue(item, "template", null);
  const element_obj = getElementObj(componentMap, item);
  let path = defaultValue(item, "path", null);
  if (get_prefix && path && path !== "/") {
    path = getPrefix(hard_prefix) + path;
  }
  if (!path) {
    path = "#";
  }
  const on_click_string = defaultValue(item, "on_click", null);
  const on_click = getOnClickObject(on_click_string, componentMap, setExpanded);
  const title = topTitle == null ? item.title : `[${topTitle}]`;
  return {
    "hard_prefix": hard_prefix,
    "get_prefix": get_prefix,
    "element_obj": element_obj,
    "path": path,
    "on_click": on_click,
    "on_click_string": on_click_string,
    "title": title,
    "reload": reload,
    "template": template
  };
};
const GetHashRoutes = _ref => {
  let {
    routes
  } = _ref;
  return /*#__PURE__*/React.createElement(reactRouterDom.Routes, {
    id: "menuOptionsRoutes",
    history: history
  }, routes.map(item => {
    return /*#__PURE__*/React.createElement(reactRouterDom.Route, {
      key: item.key,
      path: item.path,
      exact: item.exact,
      element: item.element
    });
  }));
};
const editorRoute = (editor, itemDefs) => ({
  key: itemDefs.title,
  exact: editor.exact ?? routeExact,
  path: '/' + editor.baseUrl,
  element: editor.component,
  template: itemDefs.template,
  on_click_string: itemDefs.on_click_string
});
const getRoutesRaw = (currentUser, menuOptions, componentMap, setExpanded) => {
  const AppMainInner = componentMap["AppMainInner"];
  const AppMainInnerUnauthenticated = componentMap["AppMainInnerUnauthenticated"];
  let indexRoute = -1;
  let loginRoute = -1;
  let routes = [];
  let RouteTemplateComponent;
  const addOneroute = resultRoute => {
    if (resultRoute) {
      switch (resultRoute.path) {
        case "/":
          if (indexRoute == -1) {
            routes.push(resultRoute);
            indexRoute = routes.length - 1;
          }
          break;
        case getPrefix() + "/login":
          if (loginRoute == -1) {
            routes.push(resultRoute);
            loginRoute = routes.length - 1;
          }
          break;
        default:
          routes.push(resultRoute);
      }
    }
  };
  menuOptions.map(item => {
    const itemDefs = getItemDefaults(componentMap, setExpanded, item);
    let resultRoute = null;
    if (item.type === "nav_link") {
      resultRoute = {
        key: itemDefs["title"],
        exact: item["exact"] ?? routeExact,
        path: itemDefs["path"],
        element: itemDefs["element_obj"],
        template: itemDefs.template,
        on_click_string: itemDefs.on_click_string
      };
      addOneroute(resultRoute);
    } else {
      item.sub_menu_options.map(subItem => {
        const itemDefs = getItemDefaults(componentMap, setExpanded, subItem);
        if (subItem.type === 'editor') {
          try {
            resultRoute = editorRoute(componentMap[subItem.element](), itemDefs);
            addOneroute(resultRoute);
          } catch (error) {
            console_debug_log("[GMB-GR-E010] subItem.element:", subItem.element);
            console_debug_log(error);
          }
        } else {
          resultRoute = {
            key: itemDefs["title"],
            exact: item["exact"] ?? routeExact,
            path: itemDefs["path"],
            element: itemDefs["element_obj"],
            template: itemDefs.template,
            on_click_string: itemDefs.on_click_string
          };
          addOneroute(resultRoute);
        }
      });
    }
  });
  routes.push({
    key: 'invalidRoute',
    path: '*',
    element: InvalidRoute
  });
  routes = routes.map(route => {
    let error = null;
    if (route.path === getPrefix() + '/login') {
      RouteTemplateComponent = AppMainInnerUnauthenticated;
    } else if (route.template) {
      if (typeof componentMap[route.template] === "undefined") {
        error = `[GMB-GR-E030] ERROR - template not registered in "componentMap" | route.template: ${route.template}`;
        console_debug_log(error);
        RouteTemplateComponent = componentMap["NoDesignComponent"];
      } else {
        RouteTemplateComponent = componentMap[route.template];
      }
    } else {
      RouteTemplateComponent = AppMainInner;
      // RouteTemplateComponent = (({ children} ) => (<>{children}</>));
    }
    route.element = /*#__PURE__*/React.createElement(RouteTemplateComponent
    // componentMap={componentMap}
    // currentUser={currentUser}
    , {
      errorMessage: error
    }, route.element !== null && /*#__PURE__*/React.createElement(route.element, null), route.element === null && route.on_click_string !== null && /*#__PURE__*/React.createElement("p", null, "Redirecting..."), route.element === null && route.on_click_string === null && /*#__PURE__*/React.createElement(InvalidElement, null, route.key, " Not Implemented..."));
    return route;
  });
  if (currentUser) {
    routes[indexRoute].path = "/";
    {
      routes[indexRoute].index = true;
    }
  } else {
    {
      {
        routes[indexRoute].index = true;
      }
    }
  }
  return routes;
};
const getRoutes = (currentUser, menuOptions, componentMap, setExpanded) => {
  const menuOptionsFinal = [...menuOptions, ...getDefaultRoutesRaw(componentMap)];
  const routes = getRoutesRaw(currentUser, menuOptionsFinal, componentMap, setExpanded);
  return routes;
};
const isTopMenuAlternativeType = itemType => Object.values(['side_menu', 'mobile_menu']).some(element => itemType === element);
const editorMenuOption = (editor, itemType, mobileMenuMode, componentMap, setExpanded) => {
  return /*#__PURE__*/React.createElement(NavDropdown.Item, {
    key: editor.title,
    as: reactRouterDom.Link,
    to: '/' + editor.baseUrl,
    onClick: getOnClickObject(null, componentMap, setExpanded),
    type: itemType,
    mobileMenuMode: mobileMenuMode
  }, editor.title);
};
const getDefaultRoutesRaw = componentMap => {
  componentMap["LoginPage"];
  componentMap["HomePage"];
  return [{
    title: 'loginpage',
    path: "/login",
    element: "LoginPage",
    type: "nav_link"
  }, {
    title: 'homepage',
    path: "/",
    element: "HomePage",
    type: "nav_link"
  }];
};
const DefaultRoutes = () => {
  const {
    currentUser
  } = useUser();
  const {
    componentMap,
    setExpanded
  } = useAppContext();
  const routes = getDefaultRoutes(currentUser, componentMap, setExpanded);
  return /*#__PURE__*/React.createElement(GetHashRoutes, {
    routes: routes
  });
};

// export const getDefaultRoutes = (currentUser, componentMap, setExpanded, returnType = "routes") => {
const getDefaultRoutes = (currentUser, componentMap, setExpanded) => {
  const menuOptionsFinal = getDefaultRoutesRaw(componentMap);
  const routes = getRoutesRaw(currentUser, menuOptionsFinal, componentMap, setExpanded);
  return routes;
};
const InvalidElement = _ref2 => {
  let {
    children
  } = _ref2;
  return /*#__PURE__*/React.createElement("div", {
    className: APP_GENERAL_MARGINS_CLASS
  }, /*#__PURE__*/React.createElement("div", {
    className: `${ALERT_DANGER_CLASS} ${HORIZONTALLY_CENTERED_CLASS}`,
    role: "alert"
  }, children));
};
const InvalidRoute = () => {
  return /*#__PURE__*/React.createElement(InvalidElement, null, "URL not found...");
};
const getMenuFromApi = (state, setState, setMenuOptions) => {
  if (state !== "") {
    return;
  }
  const endpoint = "menu_options";
  const db = new dbApiService({
    url: endpoint
  });
  db.getAll().then(data => {
    setMenuOptions(data.resultset);
  }, error => {
    error = formatCaughtError(error);
    if (!window.location.href.includes("/login")) {
      setState(error);
    }
  });
};
const GenericMenuBuilder = _ref3 => {
  let {
    icon,
    title,
    itemType,
    mobileMenuMode
  } = _ref3;
  const {
    currentUser
  } = useUser();
  const {
    state,
    menuOptions,
    setExpanded,
    componentMap
  } = useAppContext();
  const GetNavs = (item_type_filter, topTitle, itemType, icon, mobileMenuMode) => {
    if (!menuOptions) {
      return '';
    }
    return menuOptions.filter(item => item.location === item_type_filter).map(item => {
      const itemDefs = getItemDefaults(componentMap, setExpanded, item, topTitle);
      if (item.type === "nav_link") {
        // Items in main menu, not belonging to any NavDropdown
        return /*#__PURE__*/React.createElement(Nav.Link, {
          key: item.title,
          as: reactRouterDom.Link
          // to={getPrefix()+itemDefs["path"]}
          ,
          to: itemDefs["path"],
          onClick: itemDefs["on_click"],
          reloadDocument: itemDefs["reload"],
          type: itemType,
          mobileMenuMode: mobileMenuMode
        }, icon ? /*#__PURE__*/React.createElement(GsIcons, {
          icon: icon ?? '',
          size: "2xl",
          className: NAV_LINK_ICON_CLASS
        }) : itemDefs["title"]);
      }
      // Navigation dropdown (main menu item with sub-menus)
      const navDropdownId = `basic-nav-dropdown-${item.title.replace(/ /g, '_')}`;
      return /*#__PURE__*/React.createElement(NavDropdown, {
        key: item.title,
        title: itemDefs["title"],
        id: navDropdownId,
        type: itemType,
        icon: icon,
        mobileMenuMode: mobileMenuMode
      }, item.sub_menu_options.map(subItem => {
        const itemDefs = getItemDefaults(componentMap, setExpanded, subItem);
        if (subItem.type === 'editor') {
          try {
            return editorMenuOption(componentMap[subItem.element](), itemType, mobileMenuMode, componentMap, setExpanded);
          } catch (error) {
            console_debug_log(`[GMB-GR-E020] subItem.element: ${subItem.element}`);
            console_debug_log(error);
            return null;
          }
        }
        return /*#__PURE__*/React.createElement(NavDropdown.Item, {
          key: subItem.title,
          as: reactRouterDom.Link,
          to: itemDefs["path"],
          onClick: itemDefs["on_click"],
          reloadDocument: itemDefs["reload"],
          type: itemType,
          mobileMenuMode: mobileMenuMode
        }, itemDefs["title"]);
      }));
    });
  };
  const menuItems = (item_type_filter, topTitle, itemType, mobileMenuMode) => {
    if (typeof menuOptions === 'undefined' || menuOptions === null) {
      return '';
    }
    // Routes
    if (item_type_filter === "routes") {
      return getRoutes(currentUser, menuOptions, componentMap, setExpanded);
    }
    // NavLinks
    return GetNavs(item_type_filter, topTitle, itemType, icon, mobileMenuMode);
  };
  if (state !== "" && itemType === "routes") {
    return /*#__PURE__*/React.createElement(DefaultRoutes, null);
  }
  if (state !== "") {
    return /*#__PURE__*/React.createElement(DefaultRoutes, null);
  }
  return menuItems(isTopMenuAlternativeType(itemType) ? 'top_menu' : itemType, title, itemType, mobileMenuMode);
};

var generic_menu_service = /*#__PURE__*/Object.freeze({
  __proto__: null,
  DefaultRoutes: DefaultRoutes,
  GenericMenuBuilder: GenericMenuBuilder,
  GetHashRoutes: GetHashRoutes,
  editorMenuOption: editorMenuOption,
  editorRoute: editorRoute,
  getDefaultRoutes: getDefaultRoutes,
  getDefaultRoutesRaw: getDefaultRoutesRaw,
  getMenuFromApi: getMenuFromApi,
  getRoutes: getRoutes,
  getRoutesRaw: getRoutesRaw
});

function getUrlParams() {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  let urlParams = {};
  let searchString;
  try {
    if (props.hasOwnProperty('location')) {
      if (props.location.hasOwnProperty('search')) {
        if (props.location.search !== '') {
          searchString = props.location.search;
        } else {
          searchString = props.location.href;
        }
        if (searchString.startsWith('?')) {
          searchString = searchString.split('?')[1];
        }
        if (searchString === '') {
          return urlParams;
        }
        let keyPairs = searchString.split("&");
        if (Array.isArray(keyPairs)) {
          keyPairs.map(keyPairString => {
            let KeyValueArray = keyPairString.split('=');
            urlParams[KeyValueArray[0]] = typeof KeyValueArray[1] === 'undefined' ? '' : KeyValueArray[1];
            return null;
          });
        }
      }
    } else {
      if (props.hasOwnProperty('match')) {
        if (props.match.hasOwnProperty('params')) {
          urlParams = props.match.params;
        }
      }
    }
  } catch (error) {
    console.log(`getUrlParams ERROR | ${props}`);
    console.error(error);
  }
  return urlParams;
}

var urlParams = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getUrlParams: getUrlParams
});

const mergeDicts = (dictToAdd, originDict) => {
  if (!(typeof dictToAdd === 'object' && dictToAdd !== null)) {
    dictToAdd = {};
  }
  const dictToAddFinal = Object.entries(dictToAdd).reduce((acc, _ref) => {
    let [key, value] = _ref;
    acc[key] = value;
    return acc;
  }, {
    ...originDict
  });
  return dictToAddFinal;
};

var dictUtilities = /*#__PURE__*/Object.freeze({
  __proto__: null,
  mergeDicts: mergeDicts
});

const WaitAnimation = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("center", null, /*#__PURE__*/React.createElement("img", {
    src: WAIT_ANIMATION_IMG,
    alt: MSG_ALT_WAIT_ANIMATION
  })));
};
const ShowHidePageAnimation = function (showAnimation) {
  let elementId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "nav_animation";
  let animationDiv = document.getElementById(elementId);
  if (animationDiv) {
    animationDiv.className = showAnimation ? SHOW_HIDE_PAGE_ANIMATION_ENABLED_CLASS : SHOW_HIDE_PAGE_ANIMATION_DISABLED_CLASS;
  }
};

var wait_animation_utility = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ShowHidePageAnimation: ShowHidePageAnimation,
  WaitAnimation: WaitAnimation
});

const DarkModeButton = () => {
  const {
    currentUser
  } = useUser();
  const {
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode
  } = useAppContext();
  React.useEffect(() => {
    // Component startup
    let newDarkMode = false;
    if (currentUser) {
      // Initial menu configuration from current user config, if the user is authenticated
      newDarkMode = currentUser.pref_dark_mode === '1';
    } else {
      // Get previous preferences from localstorage
      const localConfig = getLocalConfig();
      newDarkMode = localConfig.pref_dark_mode === '1';
    }
    if (newDarkMode !== isDarkMode) {
      setIsDarkMode(newDarkMode);
    }
  }, []);
  React.useEffect(() => {
    if (currentUser) {
      setIsDarkMode(currentUser.pref_dark_mode === '1');
    }
  }, [currentUser]);
  React.useEffect(() => {
    // Save session side menu preference to localstorage when it changes
    const localConfig = {
      pref_dark_mode: isDarkMode ? '1' : '0'
    };
    saveLocalConfig(localConfig);
    // Fix the overall dark mode design
    const element = document.getElementsByTagName('html')[0];
    if (!isDarkMode) {
      element.classList.remove('dark');
    } else {
      element.classList.add('dark');
    }
  }, [isDarkMode]);
  return /*#__PURE__*/React.createElement("div", {
    id: "dark-mode-button",
    className: DARK_MODE_BUTTON_TOP_DIV_CLASS
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    id: "headlessui-listbox-button-:R2lkcr6:",
    "aria-haspopup": "listbox",
    "aria-expanded": "false",
    "data-headlessui-state": "",
    "aria-labelledby": "headlessui-label-:R1lkcr6: headlessui-listbox-button-:R2lkcr6:",
    onClick: toggleDarkMode
  }, /*#__PURE__*/React.createElement("span", {
    className: DARK_MODE_BUTTON_DARK_HIDDEN_CLASS
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "sun",
    size: "xl",
    className: DARK_MODE_BUTTON_SVG_CLASS
  })), /*#__PURE__*/React.createElement("span", {
    className: DARK_MODE_BUTTON_DARK_INLINE_CLASS
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "moon",
    size: "xl",
    className: DARK_MODE_BUTTON_SVG_CLASS
  }))));
};

const MenuModeButton = () => {
  const {
    currentUser
  } = useUser();
  const {
    sideMenu,
    setSideMenu
  } = useAppContext();
  const saveNewLocalUserConfig = newSideMenuMode => {
    const localConfig = {
      pref_side_menu: newSideMenuMode ? '1' : '0'
    };
    saveLocalConfig(localConfig);
  };
  const toggleSideMenu = () => {
    saveNewLocalUserConfig(!sideMenu);
    setSideMenu(!sideMenu);
  };
  React.useEffect(() => {
    let newSideMenuMode = false;
    // Component startup
    // if (currentUser) {
    //     // Initial menu configuration from current user config, if the user is authenticated
    //     newSideMenuMode = (currentUser.pref_side_menu === '1');
    //     if (debug) console_debug_log('MenuModeButton', 'Initial menu configuration from current user config | currentUser.pref_side_menu', currentUser.pref_side_menu, 'newSideMenuMode:', newSideMenuMode);
    // } else {
    // Get previous preferences from localstorage
    const localConfig = getLocalConfig();
    newSideMenuMode = localConfig.pref_side_menu === '1';
    // }
    if (newSideMenuMode !== sideMenu) {
      saveNewLocalUserConfig(newSideMenuMode);
      setSideMenu(newSideMenuMode);
    }
  }, [currentUser, sideMenu]);

  // useEffect(() => {
  //     // Internal menu configuration when current user changes
  //     if (currentUser) {
  //         setSideMenu(currentUser.pref_side_menu === '1');
  //     }
  // }, [currentUser]);

  // useEffect(() => {
  //     // Internal menu configuration when current user changes
  //     if (currentUser) {
  //         setSideMenu(currentUser.pref_side_menu === '1');
  //     }
  // }, [currentUser]);

  // useEffect(() => {
  //     // Save user preferences to localstorage when current user changes
  //     if (currentUser) {
  //         const localConfig = {
  //             pref_side_menu: (currentUser.pref_side_menu),
  //         }
  //         saveLocalConfig(localConfig);
  //     }
  // }, [currentUser]);

  // useEffect(() => {
  //     // External menu configuration when current user changes
  //     if (currentUser) {
  //         setSideMenu(currentUser.pref_side_menu === '1');
  //     }
  // }, [currentUser]);

  // useEffect(() => {
  //     // External menu configuration when side menu mode changes
  //     if (debug) console_debug_log('>> MenuModeButton', 'Side menu mode', sideMenu);
  //     setSideMenu(sideMenu);
  // }, [sideMenu]);

  // useEffect(() => {
  //     // Save session side menu preference to localstorage when it changes
  //     const localConfig = {
  //         pref_side_menu: (sideMenu ? '1' : '0'),
  //     }
  //     if (debug) console_debug_log('MenuModeButton', 'saveLocalConfig', localConfig);
  //     saveLocalConfig(localConfig);
  // }, [sideMenu]);

  return /*#__PURE__*/React.createElement("div", {
    id: "menu-mode-button",
    className: MENU_MODE_BUTTON_TOP_DIV_CLASS
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: toggleSideMenu
  }, /*#__PURE__*/React.createElement("span", {
    className: !sideMenu ? HIDDEN_CLASS : INLINE_CLASS
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "side-menu",
    size: "xl"
  })), /*#__PURE__*/React.createElement("span", {
    className: sideMenu ? HIDDEN_CLASS : INLINE_CLASS
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "top-menu",
    size: "xl"
  }))));
};

// GenericCrudEditor provider. To share data and functions between the editor components


// Create a context to hold the function
const MainSectionContext = /*#__PURE__*/React.createContext();

// Provider Component
const MainSectionProvider = _ref => {
  let {
    children
  } = _ref;
  const [cache, setCache] = React.useState({});
  const initCache = () => {
    setCache({});
  };
  const getCachedData = entryName => {
    return cache[entryName];
  };
  const putCachedData = (entryName, data) => {
    setCache(prevCache => ({
      ...prevCache,
      [entryName]: data
    }));
  };
  const typeofCachedData = entryName => {
    return typeof cache[entryName];
  };
  const listCache = () => {
    return cache;
  };
  const debugCache = function () {
    let description = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'debugCache';
    console_debug_log(`>>>>--->> listCache [${description}]:`, listCache());
    return '';
  };
  return /*#__PURE__*/React.createElement(MainSectionContext.Provider, {
    value: {
      initCache,
      getCachedData,
      putCachedData,
      typeofCachedData,
      listCache,
      debugCache
    }
  }, children);
};

var generic_editor_rfc_provider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MainSectionContext: MainSectionContext,
  MainSectionProvider: MainSectionProvider
});

// GenericCrudEditor Specific Functions handling

const genericFuncArrayDefaultValue = function () {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    'error': false,
    'errorMsg': '',
    'fieldMsg': {},
    'fieldValues': data,
    'fieldsToDelete': [],
    'otherData': {}
  };
};
const reduceAllResponses = (responses, data) => {
  const defaultValues = genericFuncArrayDefaultValue(data);
  const responsesReduced = responses.reduce((acc, response) => {
    response = {
      ...defaultValues,
      ...response
    };
    acc['error'] = acc['error'] || response['error'];
    acc['errorMsg'] += (acc['errorMsg'] !== '' && response['errorMsg'] !== '' ? ', ' : '') + response['errorMsg'];
    acc['fieldMsg'] = {
      ...acc['fieldMsg'],
      ...response['fieldMsg']
    };
    acc['fieldValues'] = {
      ...acc['fieldValues'],
      ...response['fieldValues']
    };
    acc['fieldsToDelete'] = [...acc['fieldsToDelete'], ...response['fieldsToDelete']];
    acc['otherData'] = {
      ...acc['otherData'],
      ...response['otherData']
    };
    return {
      ...acc
    };
  }, defaultValues);
  return responsesReduced;
};
const processGenericFuncArray = (editor, funcArrayName, data, action, currentUser) => {
  return new Promise((resolve, reject) => {
    const genericFuncArray = editor[funcArrayName];
    const allFuncPromises = genericFuncArray.map(objFunc => {
      // objFunc response must be an object can contain any or all of this attributes:
      // {
      //   'error': false,
      //   'errorMsg': '',
      //   'fieldMsg': {},
      //   'fieldValues': {},
      //   'fieldsToDelete': [],
      //   'otherData': [],
      // }
      return objFunc(data, editor, action, currentUser);
    });
    Promise.all(allFuncPromises).then(results => {
      // const allFuncResponses = results.forEach(
      const allFuncResponses = results.map(result => result);
      let finalResponse = reduceAllResponses(allFuncResponses, data);
      finalResponse['fieldsToDelete'].forEach(fieldName => {
        delete finalResponse.fieldValues[fieldName];
      });
      resolve(finalResponse);
    }, error => reject(error));
  });
};

// General specific funcions 

// export const UserFilterDbListPreRead = (data, editor, action, currentUser) => {
//     // User filter DbListPreRead to filter by user_id
//     return new Promise((resolve, reject) => {
//         let resp = genericFuncArrayDefaultValue(data);
//         resp.fieldValues['user_id'] = currentUser.id
//         // console_debug_log(">>> UserFilterDbListPreRead | resp:");
//         // console_debug_log(resp);
//         resolve(resp);
//     });
// }

// export const UserFilterDbPreRead = (data, editor, action, currentUser) => {
//     // user_id assignment during Database Pre Read
//     // Template: timestampDbPostRead
//     return new Promise((resolve, reject) => {
//         let resp = genericFuncArrayDefaultValue(data);
//         // console_debug_log(`>>> UserFilterDbPreRead ||| data:`);
//         // console_debug_log(data);
//         data['user_id'] = currentUser.id
//         resp.fieldValues.resultset =  Object.assign({}, data);
//         // resp.fieldValues['user_id'] = currentUserValue.id
//         // console_debug_log(`>>> UserFilterDbPreRead | currentUserValue.id: ${currentUserValue.id} | resp:`);
//         // console_debug_log(resp);
//         resolve(resp);
//     });
// }

const mandatoryFiltersDbListPreRead = (data, editor, action, currentUser) => {
  // Mandatory Filters DbListPreRead to manage filters in list and search
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    if (typeof editor.mandatoryFilters !== 'undefined') {
      resp.fieldValues = replaceSpecialVars(editor.mandatoryFilters, currentUser);
    }
    // console_debug_log(`>>> mandatoryFiltersDbListPreRead | resp:`, resp, 'editor.mandatoryFilters:', editor.mandatoryFilters);
    resolve(resp);
  });
};
const mandatoryFiltersDbPreRead = (data, editor, action, currentUser) => {
  // Mandatory Filters assignment during Database Pre Read
  // Template: timestampDbPostRead
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    if (typeof editor.mandatoryFilters !== 'undefined') {
      resp.fieldValues.resultset = Object.assign(data, replaceSpecialVars(editor.mandatoryFilters, currentUser));
    }
    // console_debug_log(`>>> mandatoryFiltersDbPreRead | resp:`, resp, 'data:', data);
    resolve(resp);
  });
};

var generic_editor_rfc_specific_func = /*#__PURE__*/Object.freeze({
  __proto__: null,
  genericFuncArrayDefaultValue: genericFuncArrayDefaultValue,
  mandatoryFiltersDbListPreRead: mandatoryFiltersDbListPreRead,
  mandatoryFiltersDbPreRead: mandatoryFiltersDbPreRead,
  processGenericFuncArray: processGenericFuncArray
});

const GMT_TAIL = '.000Z'; // '.000-0000'
const DATE_TIME_TAIL = `T00:00:00${GMT_TAIL}`;
const timestampToDate = function (timestamp) {
  let fullDateTime = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  let separator = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  let militaryTime = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;
  const timestampUnixEpoch = timestamp * 1000;
  const date = new Date(timestampUnixEpoch);
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  // const formattedTime = hours % 12 + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
  const formattedTime = (hours > 12 ? hours - 12 : hours) + ':' + (minutes < 10 ? '0' : '') + minutes + ' ' + ampm;
  if (fullDateTime) {
    if (separator) {
      if (!militaryTime) {
        return date.toISOString().split("T")[0] + separator + formattedTime;
      }
      return date.toISOString().split("T").join(separator).slice(0, 19);
    }
    if (!militaryTime) {
      return date.toISOString().split("T")[0] + 'T' + formattedTime;
    }
    return date.toISOString();
  }
  return date.toISOString().split("T")[0];
};
const addMissingTz = stringDate => stringDate + (stringDate.indexOf('.') > 0 ? '' : GMT_TAIL);
const dateToTimestap = stringDate => new Date(addMissingTz(stringDate)).valueOf() / 1000;
const nowToTimestap = () => new Date().valueOf() / 1000;
const fixDateWithTz = dateTimeString => {
  switch (dateTimeString.length) {
    case 10:
      dateTimeString += DATE_TIME_TAIL;
      break;
    case 16:
      dateTimeString += `:00${GMT_TAIL}`;
      break;
    default:
      dateTimeString = addMissingTz(dateTimeString);
  }
  return dateTimeString;
};
const processTimestampToDate = (timestampMixed, fullDatetime, separator) => {
  if (!timestampMixed) {
    timestampMixed = 0; // nowToTimestap();
  }
  if (typeof timestampMixed === 'string') {
    timestampMixed = fixDateWithTz(timestampMixed);
    timestampMixed = dateToTimestap(timestampMixed);
  }
  return timestampToDate(timestampMixed, fullDatetime, separator);
};
const processDateToTimestamp = dateTime => {
  dateTime = fixDateWithTz(dateTime);
  return dateToTimestap(dateTime);
};
const addZeroTimeToDate = dateValue => {
  const date = new Date(dateValue);
  date.setHours(0);
  date.setMinutes(0);
  date.setSeconds(0);
  date.setMilliseconds(0);
  return date.toISOString().slice(0, 19).replace('T', ' ');
};

var dateTimestamp = /*#__PURE__*/Object.freeze({
  __proto__: null,
  addMissingTz: addMissingTz,
  addZeroTimeToDate: addZeroTimeToDate,
  dateToTimestap: dateToTimestap,
  fixDateWithTz: fixDateWithTz,
  nowToTimestap: nowToTimestap,
  processDateToTimestamp: processDateToTimestamp,
  processTimestampToDate: processTimestampToDate,
  timestampToDate: timestampToDate
});

// GenericCrudEditor timestamp components

const timestampDbListPostRead = (dataRead, editor, action) => {
  // Timestamp to Date convertion during Listing Database Post Read
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(dataRead);
    const data = dataRead.resultset.map(row => {
      const new_row = editor.fieldElements.reduce((acc, currentObj) => {
        switch (currentObj.type) {
          case 'date':
          case 'datetime-local':
            acc[currentObj.name] = processTimestampToDate(acc[currentObj.name], true, ' ');
            break;
        }
        return {
          ...acc
        };
      }, row);
      return new_row;
    });
    resp.fieldValues.resultset = data;
    resolve(resp);
  });
};
const timestampDbPostRead = (dataRead, editor, action) => {
  // Timestamp to Date convertion during FormData Database Post Read
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(dataRead);
    const new_row = editor.fieldElements.reduce((acc, currentObj) => {
      switch (currentObj.type) {
        case 'date':
          // For date edition, we need only the date portion
          acc[currentObj.name] = processTimestampToDate(acc[currentObj.name]);
          break;
        case 'datetime-local':
          // For datetime-local edition, we need the date from time separation to be the 'T'
          acc[currentObj.name] = processTimestampToDate(acc[currentObj.name], true, 'T');
          break;
      }
      return {
        ...acc
      };
    }, dataRead.resultset);
    resp.fieldValues.resultset = new_row;
    resolve(resp);
  });
};
const timestampDbPreWrite = (row, editor, action) => {
  return new Promise((resolve, reject) => {
    // Date to Timestamp convertion during FormData Database Pre Writing
    let resp = genericFuncArrayDefaultValue(row);
    const new_row = editor.fieldElements.reduce((acc, currentObj) => {
      switch (currentObj.type) {
        case 'date':
        case 'datetime-local':
          acc[currentObj.name] = processDateToTimestamp(acc[currentObj.name]);
          break;
      }
      return {
        ...acc
      };
    }, row);
    // Update update_date with current date/time timestamp
    if (typeof new_row['update_date'] !== 'undefined') {
      new_row['update_date'] = nowToTimestap();
    }
    resp.fieldValues = new_row;
    resolve(resp);
  });
};

var generic_editor_rfc_timestamp = /*#__PURE__*/Object.freeze({
  __proto__: null,
  timestampDbListPostRead: timestampDbListPostRead,
  timestampDbPostRead: timestampDbPostRead,
  timestampDbPreWrite: timestampDbPreWrite
});

// GenericCrudEditor common functions

const getEditorData = props => props.editorConfig;
const setParentData = (parentData, editor) => {
  // There's a inconsistency, parentData isn't loaded yet
  // So leave things asi is...
  if (parentData === null) {
    return editor;
  }
  if (parentData.length < editor.parentKeyNames.length) {
    return editor;
  }
  let newParentFilter = {};
  editor.parentKeyNames.map(keyPair => newParentFilter[keyPair.parameterName] = parentData[keyPair.parentElementName]);
  // IMPORTANT: parentFilter and parentData
  // This is for editor.type = 'child_listing' / editor.subType = 'array'
  // The component call must have the parentData={parentData} attribute
  // and eventually handleFormPageActions={handleFormPageActions}
  editor.parentFilter = newParentFilter;
  editor.parentData = parentData;
  return editor;
};
const getColumns = editor => {
  return Object.keys(editor.fieldElements).map(key => {
    if (typeof editor.fieldElements[key].listing == "undefined") {
      editor.fieldElements[key].listing = false;
    }
    if (typeof editor.fieldElements[key].required == "undefined") {
      editor.fieldElements[key].required = false;
    }
    if (typeof editor.fieldElements[key].primaryKey == "undefined") {
      editor.fieldElements[key].primaryKey = false;
      if (editor.fieldElements[key].type === "_id") {
        editor.fieldElements[key].primaryKey = true;
      }
    }
    if (editor.fieldElements[key].primaryKey) {
      editor.fieldElements[key].readonly = true;
      editor.primaryKeyName = editor.fieldElements[key].name;
    }
    return editor.fieldElements[key];
  });
};
const getEditoObj = (props, editor_response) => {
  let editor = editor_response.response;
  editor.error = null;
  editor.errorMsg = null;
  // Database backend handler
  editor.db = new dbApiService({
    url: editor.dbApiUrl
  });
  // Child components
  if (typeof editor.childComponents == 'undefined') {
    editor.childComponents = [];
  }
  // Primary Key parameter name for API calls
  if (typeof editor.primaryKeyName == 'undefined') {
    editor.primaryKeyName = 'id';
  }
  // Parent Key Names, for child listing
  if (typeof editor.parentKeyNames == 'undefined') {
    editor.parentKeyNames = [];
  }

  // Specific functions - BEGIN
  //
  // dbListPreRead: Before read data from database in the listing.
  // Good place for hidden filters.
  if (typeof editor.dbListPreRead == 'undefined') {
    editor.dbListPreRead = [];
  }
  // dbListPostRead: After read data from database in the listing.
  if (typeof editor.dbListPostRead == 'undefined') {
    editor.dbListPostRead = [];
  }
  // dbPreRead: Before read data from database in formData.
  // If any error, shows the error message.
  if (typeof editor.dbPreRead == 'undefined') {
    editor.dbPreRead = [];
  }
  // dbPostRead: After read data from database in formData.
  // If any error, shows the error message.
  if (typeof editor.dbPostRead == 'undefined') {
    editor.dbPostRead = [];
  }
  // dbPreValidations: FormData field values validation before doing a Delete operation.
  // If any error, prevents the database row to be deleted.
  if (typeof editor.dbPreValidations == 'undefined') {
    editor.dbPreValidations = [];
  }
  // validations: FormData field values validation before write to the database.
  // If any error, prevents the database write and stays in FormData.
  if (typeof editor.validations == 'undefined') {
    editor.validations = [];
  }
  // dbPreWrite: Before write to database, after a successfull validation.
  // If any error, shows the error message, prevents the database write and stays in FormData.
  if (typeof editor.dbPreWrite == 'undefined') {
    editor.dbPreWrite = [];
  }
  // dbPostWrite: After a successful write to database.
  // If any error, shows the error message and stays in FormData.
  if (typeof editor.dbPostWrite == 'undefined') {
    editor.dbPostWrite = [];
  }
  // User ID filter
  if (typeof editor.userIdFilter == 'undefined') {
    editor.userIdFilter = false;
  }
  if (typeof editor.mandatoryFilters == 'undefined') {
    editor.mandatoryFilters = {};
  } else {
    editor.dbListPreRead.push(mandatoryFiltersDbListPreRead);
    editor.dbPreRead.push(mandatoryFiltersDbPreRead);
  }
  // THESE 3 MUST BE LAST ONES
  // Date <-> Timestamp management
  editor.dbListPostRead.push(timestampDbListPostRead // this must be the lastone
  );
  editor.dbPostRead.push(timestampDbPostRead // this must be the lastone
  );
  editor.dbPreWrite.push(timestampDbPreWrite // this must be the lastone
  );

  //
  // Specific functions - END

  // Editor type
  if (typeof editor.type == 'undefined') {
    editor.type = 'master_listing'; // 'master_listing' | 'child_listing'
  }
  // Editor sub-type: 'array' is for arrays elements in tables of child listing
  if (typeof editor.subType == 'undefined') {
    editor.subType = 'table'; // 'array' | 'table'
  }
  // Array name for those 'array' type child listing. These elements are inside a real table.
  if (typeof editor.array_name == 'undefined' && editor.subType === 'array') {
    // No default value for the array name
    // editor.array_name = editor.baseUrl
    editor.error = MSG_ERROR_MISSING_ARRAY_NAME_PARAM; // 'Missing "array_name" parameter. It must be specified for subType "array".';
  }
  // Filters for child components
  editor = setParentData(typeof props.parentData !== 'undefined' ? props.parentData : null, editor);
  // Populate Select type Fields Options
  editor.selectFieldsOptionsPromises = getSelectFieldsOptions(editor.fieldElements);
  // Get parameters passed in the URL
  editor.urlParams = getUrlParams(props);
  // Set default values for column definitions
  editor.fieldElements = getColumns(editor);
  // Reenter on create
  if (typeof editor.createReenter == 'undefined') {
    editor.createReenter = false;
  }
  return editor;
};
const verifyEditorObj = editorObj => {
  let gfd_response = {
    "error": false,
    "error_message": "",
    "response": null
  };
  if (typeof editorObj === 'undefined') {
    gfd_response.errorMsg = "GetFormData: editorObj is null [GCE-GFD-012]";
    return Promise.resolve(gfd_response);
  }
  if (typeof editorObj["calleeName"] === 'undefined' || editorObj["calleeName"] === null) {
    gfd_response.error = true;
    gfd_response.errorMsg = "GetFormData: calleeName is not defined [GCE-GFD-010]";
    return Promise.resolve(gfd_response);
  }
  if (editorObj["calleeName"] === false) {
    gfd_response.response = editorObj;
    return Promise.resolve(gfd_response);
  }
  const endpoint = "menu_options/element";
  const db = new dbApiService({
    url: endpoint
  });
  const json_body = {
    "element": editorObj["calleeName"]
  };
  return db.getAll([], json_body, 'POST').then(data => {
    gfd_response.response = editorObj;
    return gfd_response;
  }, error => {
    // Unauthorized
    error = formatCaughtError(error);
    gfd_response.error = true;
    gfd_response.errorMsg = `GetFormData: ${error.message} [GCE-GFD-020]`;
    return gfd_response;
  });
};
const setEditorParameters = props => {
  let editor_response = getEditorData(props);
  if (!editor_response) {
    console_debug_log("GenericCrudEditor / No editor data...");
    return null;
  }
  return verifyEditorObj(editor_response);
};
const getIsReadOnly = mode => mode === ACTION_READ || mode === ACTION_DELETE;
const getEditorFlags = action => {
  let editorFlags = {};
  editorFlags.isEdit = action === ACTION_UPDATE || action === ACTION_CREATE;
  editorFlags.isCreate = action === ACTION_CREATE;
  editorFlags.isRead = action === ACTION_READ;
  editorFlags.isUpdate = action === ACTION_UPDATE;
  editorFlags.isDelete = action === ACTION_DELETE;
  editorFlags.isReadOnly = getIsReadOnly(action);
  return editorFlags;
};
const getSelectFieldsOptions = fieldElements => {
  return Object.entries(fieldElements).filter(function (key) {
    let currentObj = key[1];
    return currentObj.type === 'select_component' && typeof currentObj.dataPopulator !== "undefined";
  }).map(function (key) {
    let currentObj = key[1];
    return {
      name: currentObj.name,
      promiseResult: currentObj.dataPopulator()
    };
  });
};

var generic_editor_rfc_common = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getEditoObj: getEditoObj,
  getEditorData: getEditorData,
  getEditorFlags: getEditorFlags,
  getIsReadOnly: getIsReadOnly,
  getSelectFieldsOptions: getSelectFieldsOptions,
  setEditorParameters: setEditorParameters
});

// GenericCrudEditor select components

const debug$2 = false;
const GenericSelectGenerator = props => {
  const [state, setState] = React.useState(null);
  const [config, setConfig] = React.useState(null);
  const [rows, setRows] = React.useState(null);
  const {
    getCachedData,
    putCachedData,
    typeofCachedData,
    debugCache
  } = React.useContext(MainSectionContext);
  React.useEffect(() => {
    setConfig(initConfig(props));
  }, [props]);
  React.useEffect(() => {
    const setRowsAndCache = data => {
      // select_cache[config.select_name] = data;
      putCachedData(config.select_name, data);
      setRows(data);
    };
    // if (config && typeof select_cache[config.select_name] !== 'undefined') {
    if (config && typeofCachedData(config.select_name) !== 'undefined') {
      setRows(getCachedData(config.select_name));
    } else {
      try {
        let accessKeysListing = {};
        if (config && config.dbFilter) {
          accessKeysListing = {
            ...accessKeysListing,
            ...config.dbFilter
          };
          if (debug$2) ;
        }
        ;
        config && config.dbService.getAll(accessKeysListing).then(data => setRowsAndCache(data), error => setState(error));
      } catch (error) {
        console.error(config.editor.title + '-Select | error object:', error);
      }
    }
  }, [config, getCachedData, putCachedData, typeofCachedData]);
  const initConfig = props => {
    const editor = getEditorData(props);
    return {
      dbService: new dbApiService({
        url: editor.dbApiUrl
      }),
      filter: typeof props.filter !== 'undefined' ? props.filter : null,
      dbFilter: typeof props.dbFilter !== 'undefined' ? props.dbFilter : null,
      show_description: typeof props.show_description !== 'undefined' ? props.show_description : false,
      editor: editor,
      select_name: editor.name
    };
  };
  if (rows === null) {
    // Still not ready...
    return '';
  }
  if (state) {
    // Some error happens
    return state.toString();
  }
  const selectOptions = [...[{
    _id: null,
    name: MSG_SELECT_AN_OPTION
  }], ...rows.resultset];
  const {
    filter,
    show_description
  } = config;
  return selectOptions.filter(option => filter === null ? true : config.dbService.convertId(option._id) === filter).map(option => {
    if (show_description) {
      return option.name;
    }
    return /*#__PURE__*/React.createElement("option", {
      key: config.dbService.convertId(option._id),
      value: config.dbService.convertId(option._id)
    }, option.name);
  });
};
const GenericSelectDataPopulator = props => {
  const [state, setState] = React.useState(null);
  const [config, setConfig] = React.useState(null);
  const [rows, setRows] = React.useState(null);
  const {
    getCachedData,
    putCachedData,
    typeofCachedData
  } = React.useContext(MainSectionContext);
  const initConfig = props => {
    const editor = getEditorData(props);
    return {
      dbService: new dbApiService({
        url: editor.dbApiUrl
      }),
      filter: props.filter !== undefined ? props.filter : null,
      dbFilter: props.dbFilter !== undefined ? props.dbFilter : null,
      editor: editor,
      select_name: editor.name,
      title_field_name: props.title_field_name !== undefined ? props.show_description : "title",
      value_field_name: props.value_field_name !== undefined ? props.value_field_name : "value",
      key_name: props.key_name !== undefined ? props.key_name : "_id"
    };
  };
  const returnData = () => {
    const {
      filter,
      title_field_name,
      value_field_name,
      key_name,
      dbService
    } = config;
    if (!rows) {
      return '';
    }
    if (state) {
      return state.toString();
    }
    const array_options = rows.resultset.filter(option => filter === null ? true : dbService.convertId(option[key_name]) === filter).map(option => {
      let element = {};
      element[title_field_name] = option.name;
      element[value_field_name] = dbService.convertId(option[key_name]);
      return element;
    });
    return putSelectOptionsFromArray(array_options);
  };
  React.useEffect(() => {
    setConfig(initConfig(props));
  }, [props]);
  React.useEffect(() => {
    const setRowsAndCache = data => {
      putCachedData(config.select_name, data);
      setRows(data);
    };
    async function getData() {
      try {
        let accessKeysListing = {};
        if (config && config.dbFilter) {
          accessKeysListing = {
            ...accessKeysListing,
            ...config.dbFilter
          };
        }
        ;
        console_debug_log('>> GENERICSELECTGENERATOR # 2 | accessKeysListing:');
        console_debug_log(accessKeysListing);
        config && config.dbService.getAll(accessKeysListing).then(data => setRowsAndCache(data), error => setState(error));
      } catch (error) {
        console_debug_log(config.editor.title + "-Select | error object:");
        console_debug_log(error);
      }
    }
    if (config && typeofCachedData(config.select_name) !== 'undefined') {
      setRows(getCachedData(config.select_name));
    } else {
      getData();
    }
  }, [config, getCachedData, putCachedData, typeofCachedData]);
  return returnData();
};
const putSelectOptionsFromArray = function (select_array_elements) {
  let title_field_name = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "title";
  let value_field_name = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "value";
  let emptyElement = {};
  emptyElement[title_field_name] = MSG_SELECT_AN_OPTION;
  emptyElement[value_field_name] = null;
  const selectOptions = [...[emptyElement], ...select_array_elements];
  return selectOptions.map(option => /*#__PURE__*/React.createElement("option", {
    key: option[value_field_name],
    value: option[value_field_name]
  }, option[title_field_name]));
};
const getSelectDescription = (currentObj, dbRow) => {
  // Component select (with specific select component and data populator)
  if (currentObj.type === 'select_component') {
    const filter = typeof dbRow[currentObj.name] !== "undefined" ? dbRow[currentObj.name].toString() : null;
    return /*#__PURE__*/React.createElement(currentObj.component, {
      filter: filter,
      show_description: true
    });
  }
  // Generic select
  if (currentObj.type === 'select') {
    return currentObj.select_elements.filter(option => dbRow[currentObj.name] && option.value === dbRow[currentObj.name].toString()).map(option => option.title);
  }
  // Verify if the attribute (field) exists, if not, the value will be Null
  let value = null;
  if (typeof dbRow[currentObj.name] !== 'undefined') {
    value = dbRow[currentObj.name];
  }
  // Show specific component
  if (currentObj.type === 'component' || typeof currentObj.component !== 'undefined') {
    return /*#__PURE__*/React.createElement(currentObj.component, {
      value: value,
      dbRow: dbRow,
      listing: "1"
    });
  }
  // Returns plain value
  return value;
};

var generic_editor_rfc_selector = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GenericSelectDataPopulator: GenericSelectDataPopulator,
  GenericSelectGenerator: GenericSelectGenerator,
  getSelectDescription: getSelectDescription,
  putSelectOptionsFromArray: putSelectOptionsFromArray
});

// Suggestion Dropdown

const SuggestionDropdown = _ref => {
  let {
    name,
    disabled,
    required,
    className,
    value,
    config
  } = _ref;
  const {
    setFieldValue
  } = formik.useFormikContext();
  const [inputValue, setInputValue] = React.useState(value);
  const [suggestions, setSuggestions] = React.useState([]);
  const {
    currentUser
  } = useUser();
  const {
    theme
  } = useAppContext();

  // This component's input field must be different to the external input field to enable value sync
  const nameInternal = `${name}_sdd`;
  const filter_api_url = defaultValue(config, 'filter_api_url'); // Ex. "fda_food_query"
  const filter_api_request_method = defaultValue(config, "filter_api_request_method", "POST"); // Ex. true or false
  const filter_search_param_name = defaultValue(config, 'filter_search_param_name'); // Ex. "food_name"
  const filter_search_other_param = defaultValue(config, 'filter_search_other_param'); // Ex. {"autocomplete": "1"}
  const suggestion_id_fieldname = defaultValue(config, "suggestion_id_fieldname"); // Ex. "id"
  const suggestion_desc_fieldname = defaultValue(config, "suggestion_desc_fieldname"); // Ex. "description"
  const suggestion_name_fieldname = defaultValue(config, "suggestion_name_fieldname", suggestion_desc_fieldname); // Ex. "description"
  const autocomplete_fields = defaultValue(config, "autocomplete_fields", {});
  React.useEffect(() => {
    if (inputValue) {
      // Get suggestions from external surce
      const dbService = new dbApiService({
        url: filter_api_url
      });
      let urlParams = {};
      let bodyData = replaceSpecialVars(filter_search_other_param, currentUser);
      bodyData[filter_search_param_name] = inputValue;
      if (filter_api_request_method === "GET") {
        urlParams = Object.assign({}, bodyData);
        bodyData = Object.assign({});
      }
      dbService.getAll(urlParams, bodyData, filter_api_request_method).then(response => {
        if (typeof response.resultset == "string") {
          setSuggestions([]);
        } else {
          setSuggestions(response.resultset);
        }
      }).catch(error => console.error(error));
    }
  }, [inputValue, filter_api_url, filter_search_other_param, filter_search_param_name, name, setFieldValue, filter_api_request_method]);
  const handleSuggestionSelected = suggestion => {
    if (suggestion) {
      Object.entries(autocomplete_fields).forEach(_ref2 => {
        let [field_name, attr_name] = _ref2;
        const value = suggestion[attr_name] ? suggestion[attr_name] : '';
        setFieldValue(field_name, value);
      });
      // Store new inputValue from suggestion
      const newInputValue = suggestion[suggestion_name_fieldname];
      setInputValue(newInputValue);
    }
  };
  const inputValueChange = newInputValue => {
    setFieldValue(name, newInputValue);
    setInputValue(newInputValue);
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: `${SUGGESTION_DROPDOWN_CLASS} ${theme.input}`
  }, /*#__PURE__*/React.createElement(Downshift, {
    inputValue: inputValue,
    onChange: handleSuggestionSelected
    // onInputValueChange={debounce((inputValue) => setInputValue(inputValue), 500)}
    // onInputValueChange={(inputValue) => setInputValue(inputValue)}
    ,
    onInputValueChange: inputValue => inputValueChange(inputValue),
    itemToString: item => item ? item[suggestion_name_fieldname] : inputValue,
    id: name,
    name: nameInternal,
    key: nameInternal,
    disabled: disabled,
    required: required,
    className: className
  }, _ref3 => {
    let {
      getInputProps,
      getItemProps,
      getMenuProps,
      isOpen,
      highlightedIndex,
      selectedItem,
      getToggleButtonProps
    } = _ref3;
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", getInputProps()), /*#__PURE__*/React.createElement("ul", getMenuProps(), isOpen ? suggestions.map((suggestion, index) => /*#__PURE__*/React.createElement("li", getItemProps({
      key: convertId(suggestion[suggestion_id_fieldname]),
      index,
      item: suggestion,
      style: {
        backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
        fontWeight: selectedItem === suggestion ? 'bold' : 'normal'
      }
    }), suggestion[suggestion_desc_fieldname])) : null));
  })), inputValue && suggestions.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: INVALID_FEEDBACK_CLASS
  }, "Error: No suggestions found."));
};

var generic_editor_rfc_suggestion_dropdown = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SuggestionDropdown: SuggestionDropdown
});

// Search Engine button

const SearchEngineButton = _ref => {
  let {
    valueElement,
    google_prompt
  } = _ref;
  const setPrompt = (prompt, valueToReplace) => {
    return prompt.replace("%s", valueToReplace);
  };
  const handleGoogleClick = e => {
    e.preventDefault();
    const inputValue = document.getElementById(valueElement).value;
    if (inputValue !== "") {
      const googleSearchUrl = `https://www.google.com/search?q=${encodeURIComponent(setPrompt(google_prompt, inputValue))}`;
      window.open(googleSearchUrl, '_blank');
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleGoogleClick
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "google-logo",
    alt: "Open Google Search"
  }))));
};

var generic_editor_rfc_search_engine_button = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SearchEngineButton: SearchEngineButton
});

// GenericCrudEditor data form functions

let calcFields = {};
const FormPage = _ref => {
  let {
    editor_par,
    mode_par,
    id_par,
    onCancel_par,
    setInfoMsg_par,
    handleFormPageActions = null,
    message = "",
    messageType = ""
  } = _ref;
  const [formData, setFormData] = React.useState(null);
  const [status, setStatus] = React.useState("");
  const [refresh, setRefresh] = React.useState(0);
  const [formMsg, setFormMsg] = React.useState({
    message: message,
    messageType: messageType
  });
  const {
    currentUser
  } = useUser();
  const {
    theme
  } = useAppContext();
  React.useContext(MainSectionContext);
  const editor = editor_par;
  const mode = mode_par;
  const id = id_par;
  React.useEffect(() => {
    if (mode === ACTION_CREATE) {
      // To assign specific default values in creation...
      processGenericFuncArray(editor, 'dbPreRead', {}, mode, currentUser).then(funcResponse => setFormData(funcResponse.fieldValues), error => setStatus(errorAndReEnter(error, '[GCE-FD-010]')));
    }
    if (mode === ACTION_UPDATE || mode === ACTION_READ || mode === ACTION_DELETE) {
      let accessKeysDataScreen = {};
      accessKeysDataScreen[editor.primaryKeyName] = id;
      processGenericFuncArray(editor, 'dbPreRead', accessKeysDataScreen, mode, currentUser).then(funcResponse => {
        accessKeysDataScreen = Object.assign(funcResponse.fieldValues, editor.parentFilter);
        editor.db.getOne(accessKeysDataScreen).then(data => {
          // To assign specific default values in update, read or delete...
          processGenericFuncArray(editor, 'dbPostRead', data, mode, currentUser).then(funcResponse => setFormData(funcResponse.fieldValues), error => setStatus(errorAndReEnter(error, '[GCE-FD-020]')));
        }, error => {
          console_debug_log(`ERROR - GCE-FD-030`);
          console.error(error);
          setStatus(errorAndReEnter(error, '[GCE-FD-030]'));
        });
      }, error => setStatus(errorAndReEnter(error, '[GCE-FD-040]')));
    }
  }, [id, editor, mode, refresh]);
  if (handleFormPageActions === null) {
    handleFormPageActions = funcResponse => {
      if (typeof funcResponse['otherData']['refresh'] != "undefined") {
        setRefresh(refresh + 1);
        setFormMsg({
          message: '',
          messageType: ''
        });
      }
    };
  }
  if (!editor || !formData) {
    return WaitAnimation();
  }
  const editorFlags = getEditorFlags(mode);
  const actionTitle = mode === ACTION_CREATE ? MSG_ACTION_CREATE : mode === ACTION_UPDATE ? MSG_ACTION_UPDATE : mode === ACTION_READ ? MSG_ACTION_READ : MSG_ACTION_DELETE;
  return /*#__PURE__*/React.createElement("div", {
    className: `${APP_TOP_DIV_CLASS} ${theme.contentBg}`
  }, /*#__PURE__*/React.createElement(CrudEditorFormPageTitle, {
    baseUrl: editor.baseUrl,
    title: editor.title,
    actionTitle: actionTitle
  }), status && /*#__PURE__*/React.createElement("div", {
    className: ERROR_MSG_CLASS
  }, status), !status && formData && /*#__PURE__*/React.createElement(EditFormFormik, {
    editor: editor,
    parenHandleCancel: onCancel_par,
    setInfoMsg: setInfoMsg_par,
    action: mode,
    dataset: formData.resultset,
    message: formMsg['message'],
    messageType: formMsg['messageType'],
    handleFormPageActions: handleFormPageActions,
    theme: theme,
    currentUser: currentUser
  }), !status && formData && !editorFlags.isCreate && iterateChildComponents(editor, formData.resultset, handleFormPageActions), '')
  // </div>
  // </div>
  ;
};
const CrudEditorFormPageTitle = _ref2 => {
  let {
    baseUrl,
    title,
    actionTitle
  } = _ref2;
  return /*#__PURE__*/React.createElement("h2", {
    key: `${baseUrl}_title`,
    className: APP_TITLE_H1_CLASS
  }, title + " - " + actionTitle);
};
const PutOneFormfield = _ref3 => {
  let {
    currentObjArray,
    componentSelectFieldsOptions,
    editorFlags,
    errors,
    touched,
    initialValue,
    theme
  } = _ref3;
  const {
    setFieldValue
  } = formik.useFormikContext();
  let currentObj = currentObjArray[1];
  const labelClass = APP_FORMPAGE_LABEL_CLASS + " " + theme.label;
  const labelClassRequiredFld = APP_FORMPAGE_LABEL_REQUIRED_CLASS;
  const divFieldClass = APP_FORMPAGE_FIELD_CLASS + " " + theme.label;
  const fieldClass = errors[currentObj.name] && touched[currentObj.name] ? APP_FORMPAGE_FIELD_INVALID_CLASS : APP_FORMPAGE_FIELD_GOOD_CLASS + " " + theme.input;
  const readOnlyfield = editorFlags.isReadOnly || typeof currentObj.readonly !== "undefined" && currentObj.readonly;
  if (typeof currentObj.hidden !== "undefined" && currentObj.hidden) {
    return /*#__PURE__*/React.createElement(formik.Field, {
      key: currentObj.name,
      name: currentObj.name,
      type: "hidden"
    });
  }
  const getLabelClass = () => {
    return currentObj.required && !readOnlyfield ? labelClassRequiredFld : labelClass;
  };
  const getLabelSuffix = () => {
    return currentObj.required && !readOnlyfield ? ' *' : '';
  };
  const addCalculation = htmlElement => {
    if (defaultValue(htmlElement, "formula") !== '') {
      calcFields[htmlElement.name] = htmlElement.formula;
    }
  };
  const runCalculation = e => {
    for (const key in calcFields) {
      const formula = calcFields[key];
      // if (formula.includes(e.target.name)) {
      const inputs = document.getElementsByName(key);
      if (inputs.length > 0) {
        let calculatedValue = null;
        try {
          // calculatedValue = eval(formula);
          calculatedValue = formula(inputs);
        } catch (error) {
          console.error('Error calculating value:', error);
        }
        if (!isNaN(calculatedValue)) {
          setFieldValue(key, calculatedValue);
        } else {
          console.error('calculatedValue is:', calculatedValue);
        }
      }
      // }
    }
  };
  addCalculation(currentObj);
  const input_type = ['number', 'integer'].includes(currentObj.type) ? 'number' : currentObj.type;

  // id name
  let idName = currentObj.name;

  // Special buttons definitions
  const chatbot_popup = defaultValue(currentObj, "chatbot_popup", false); // Ex. true or false
  const chatbot_prompt = defaultValue(currentObj, "chatbot_prompt"); // Ex. "Give me the %s calories in KCAL including the serving size amount and serving size unit"
  const google_popup = defaultValue(currentObj, "google_popup", false); // Ex. true or false
  const google_prompt = defaultValue(currentObj, "google_prompt"); // Ex. "%s calories in KCAL, serving size amount and serving size unit"

  let elementInput;
  let elementLabel = /*#__PURE__*/React.createElement("label", {
    htmlFor: idName,
    className: getLabelClass()
  }, currentObj.label + getLabelSuffix());
  let elementError = /*#__PURE__*/React.createElement(formik.ErrorMessage, {
    name: idName,
    component: "div",
    className: INVALID_FEEDBACK_CLASS
  });
  switch (currentObj.type) {
    case 'select_component':
      elementInput = /*#__PURE__*/React.createElement(formik.Field, {
        name: idName,
        id: idName,
        as: "select",
        disabled: readOnlyfield,
        required: currentObj.required && !readOnlyfield,
        className: fieldClass,
        onBlur: runCalculation
      }, /*#__PURE__*/React.createElement(currentObj.component, null));
      break;
    case 'select':
      elementInput = /*#__PURE__*/React.createElement(formik.Field, {
        name: idName,
        id: idName,
        as: "select",
        disabled: readOnlyfield,
        required: currentObj.required && !readOnlyfield,
        className: fieldClass,
        onBlur: runCalculation
      }, putSelectOptionsFromArray(currentObj.select_elements));
      break;
    case 'component':
      elementInput = /*#__PURE__*/React.createElement(currentObj.component, {
        // dbRow={initialValue}
        value: initialValue,
        name: idName,
        id: idName,
        disabled: readOnlyfield,
        required: currentObj.required && !readOnlyfield,
        className: fieldClass,
        onBlur: runCalculation,
        showAsField: "1"
      });
      break;
    case 'suggestion_dropdown':
      idName = `${currentObj.name}-input`;
      elementInput = /*#__PURE__*/React.createElement(SuggestionDropdown, {
        name: currentObj.name,
        id: currentObj.name,
        disabled: readOnlyfield,
        required: currentObj.required && !readOnlyfield,
        className: fieldClass,
        value: initialValue,
        config: currentObj,
        onBlur: runCalculation
      });
      break;
    case 'label':
      elementLabel = '';
      elementError = '';
      elementInput = /*#__PURE__*/React.createElement("div", {
        key: idName
      }, /*#__PURE__*/React.createElement("label", {
        className: divFieldClass
      }, currentObj.label));
      break;
    case 'hr':
      elementLabel = '';
      elementError = '';
      elementInput = /*#__PURE__*/React.createElement("div", {
        key: idName
      }, /*#__PURE__*/React.createElement("hr", null));
      break;
    case 'number':
    case 'integer':
    case 'text':
    case 'date':
    case 'datetime-local':
    case 'email':
    default:
      elementLabel = /*#__PURE__*/React.createElement("label", {
        htmlFor: currentObj.name,
        className: getLabelClass()
      }, currentObj.label + getLabelSuffix());
      if (typeof currentObj.component === 'undefined') {
        // Normal input field
        elementInput = /*#__PURE__*/React.createElement(formik.Field, {
          key: idName,
          name: idName,
          id: idName,
          type: input_type,
          disabled: readOnlyfield,
          required: currentObj.required && !readOnlyfield,
          className: fieldClass,
          onBlur: runCalculation
        });
      } else {
        // Component input field
        elementInput = /*#__PURE__*/React.createElement(currentObj.component, {
          value: initialValue,
          name: idName,
          id: idName,
          disabled: readOnlyfield,
          required: currentObj.required && !readOnlyfield,
          className: fieldClass,
          onBlur: runCalculation,
          showAsField: "1"
        });
      }
      break;
  }

  // Special buttons suffix
  if (chatbot_popup || google_popup) {
    elementInput = /*#__PURE__*/React.createElement("div", {
      className: APP_FORMPAGE_SPECIAL_BUTTON_DIV_CLASS
    }, elementInput, chatbot_popup && currentObj.aux_component !== null && /*#__PURE__*/React.createElement(currentObj.aux_component, {
      valueElement: idName,
      chatbot_prompt: chatbot_prompt
    }), google_popup && /*#__PURE__*/React.createElement(SearchEngineButton, {
      valueElement: idName,
      google_prompt: google_prompt
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    key: currentObj.name,
    className: divFieldClass
  }, elementLabel, elementInput, elementError);
};
const EditFormFormik = _ref4 => {
  let {
    editor,
    parenHandleCancel,
    setInfoMsg,
    action,
    dataset,
    message = "",
    messageType = "",
    handleFormPageActions,
    theme,
    currentUser
  } = _ref4;
  const [formData, setFormData] = React.useState({
    readyToShow: false,
    dataset: null,
    canCommit: null,
    message: null,
    messageType: null
  });
  // const { currentUser } = useUser();

  React.useEffect(() => {
    const editorFlags = getEditorFlags(action);
    if (editorFlags.isRead) {
      setFormData({
        readyToShow: true,
        dataset: dataset,
        canCommit: null,
        message: null,
        messageType: null
      });
    } else {
      // Validate data before show the Data Form
      processGenericFuncArray(editor, 'dbPreValidations', dataset, action, currentUser).then(funcResponse => {
        setFormData({
          readyToShow: true,
          dataset: funcResponse.fieldValues,
          canCommit: true,
          message: null,
          messageType: null
        });
      }, error => {
        setFormData({
          readyToShow: true,
          dataset: error.fieldValues,
          canCommit: null,
          message: error.errorMsg,
          messageType: "ERROR"
        });
      });
    }
  }, [editor, action, dataset]);
  if (!formData['readyToShow']) {
    // return '';
    return WaitAnimation();
  }
  if (!formData['canCommit'] === null) {
    formData['canCommit'] = false;
  }
  if (!formData['message'] === null) {
    formData['message'] = message;
  }
  if (!formData['messageType'] === null) {
    formData['messageType'] = messageType;
  }
  return EditFormFormikFinal({
    editor: editor,
    parenHandleCancel: parenHandleCancel,
    setInfoMsg: setInfoMsg,
    action: action,
    dataset: formData['dataset'],
    canCommit: formData['canCommit'],
    message: formData['message'],
    messageType: formData['messageType'],
    handleFormPageActions: handleFormPageActions,
    theme: theme,
    currentUser: currentUser
  });
};
const EditFormFormikFinal = _ref5 => {
  let {
    editor,
    parenHandleCancel,
    setInfoMsg,
    action,
    dataset,
    canCommit,
    message,
    messageType,
    handleFormPageActions,
    theme,
    currentUser
  } = _ref5;
  // const { currentUser } = useUser();

  const editorFlags = getEditorFlags(action);
  const initialFieldValues = getFieldElementsDbValues(editor, dataset);
  const rowId = initialFieldValues[editor.primaryKeyName];
  const componentSelectFieldsOptions = editor.selectFieldsOptionsPromises.map(currentObj => currentObj.promiseResult);
  if (messageType === '') {
    messageType = 'ERROR';
  }
  if (canCommit && editorFlags.isDelete) {
    // 'Are you sure to delete this element? Please confirm with the [Delete] button or [Cancel] this operation.'
    messageType = "ERROR";
    message = (message ? "<br/>" : "") + MSG_DELETE_CONFIRM;
  }
  const handleCancel = function () {
    let infoMsg = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    let config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (typeof infoMsg !== 'string') {
      infoMsg = '';
    }
    setInfoMsg(infoMsg);
    parenHandleCancel(config);
  };
  const submitHandler = e => {
    if (e.keyCode === 13) {
      e.preventDefault();
    }
  };
  console_debug_log(`FormPage | editor.fieldElements:`, editor.fieldElements);
  return /*#__PURE__*/React.createElement(formik.Formik, {
    key: editor.name,
    enableReinitialize: true,
    initialValues: initialFieldValues
    //
    // Todo: THIS DOESN'T WORK IN ACTION=CREATION
    // validationSchema={Yup.object().shape(
    //     getFieldElementsYupValidations(editor, editorFlags)
    // )}
    ,
    onSubmit: (submitedtElements, _ref6) => {
      let {
        setStatus,
        setSubmitting
      } = _ref6;
      if (!canCommit) {
        setSubmitting(false);
      } else {
        setStatus();
        if (!(!rowId && editorFlags.isCreate || rowId)) {
          console_debug_log("NO-SENSE ERROR: rowId is Zero and is not Creation");
          setSubmitting(false);
          setStatus("NO-SENSE ERROR: rowId is Zero and is not Creation");
        }
        if (editorFlags.isCreate && typeof submitedtElements.id !== "undefined") {
          // Removes calculated ID
          delete submitedtElements.id;
        }
        processGenericFuncArray(editor, 'validations', submitedtElements, action, currentUser).then(funcResponse => {
          processGenericFuncArray(editor, 'dbPreWrite', submitedtElements, action, currentUser).then(funcResponse => {
            submitedtElements = {
              ...funcResponse.fieldValues
            };
            saveRowToDatabase(editor, action, rowId, submitedtElements, initialFieldValues).then(result => {
              if (result && result.error) {
                setSubmitting(false);
                setStatus(result);
              } else {
                if (editorFlags.isCreate) {
                  submitedtElements.id = result['resultset']['_id'];
                }
                processGenericFuncArray(editor, 'dbPostWrite', submitedtElements, action, currentUser).then(funcResponse => {
                  const infoMsg = editorFlags.isDelete ? MSG_DONE_DELETED : editorFlags.isCreate ? MSG_DONE_CREATED : editorFlags.isUpdate ? MSG_DONE_UPDATED : null;
                  handleFormPageActions(funcResponse);
                  if (editorFlags.isCreate && editor.createReenter) {
                    const config = {
                      nextAction: ACTION_READ,
                      id: result['resultset']['_id'],
                      infoMsg: infoMsg
                    };
                    handleCancel(infoMsg, config);
                  } else {
                    handleCancel(infoMsg);
                  }
                }, error => {
                  console_debug_log('dbPostWrite [EFFF-010] | error:', error);
                  setSubmitting(false);
                  setStatus(errorAndReEnter(error.errorMsg, '[EFFF-010]'));
                });
              }
            }, error => {
              console_debug_log('saveRowToDatabase [EFFF-020] | error:', error);
              setSubmitting(false);
              setStatus(errorAndReEnter(error, 'EFFF-020'));
            });
          }, error => {
            console_debug_log('dbPreWrite [EFFF-030] | error:', error);
            setSubmitting(false);
            setStatus(errorAndReEnter((error.errorMsg, 'EFFF-030')));
          });
        }, error => {
          console_debug_log('validations [EFFF-040] | error:', error);
          setSubmitting(false);
          setStatus(errorAndReEnter(error.errorMsg, 'EFFF-040'));
        });
      }
    }
  }, _ref7 => {
    let {
      errors,
      status,
      touched,
      isSubmitting
    } = _ref7;
    return /*#__PURE__*/React.createElement(formik.Form, {
      onKeyDown: submitHandler
    }, message && /*#__PURE__*/React.createElement("div", {
      className: messageType === "ERROR" ? ERROR_MSG_CLASS : INFO_MSG_CLASS
    }, message), Object.entries(editor.fieldElements).map(function (htmlElement) {
      return /*#__PURE__*/React.createElement(PutOneFormfield, {
        key: htmlElement[1].name,
        currentObjArray: htmlElement,
        componentSelectFieldsOptions: componentSelectFieldsOptions,
        editorFlags: editorFlags,
        errors: errors,
        touched: touched,
        initialValue: initialFieldValues[htmlElement[1].name],
        theme: theme
      });
    }), /*#__PURE__*/React.createElement("div", {
      className: APP_FORMPAGE_FORM_BUTTON_BAR_CLASS
    }, !editorFlags.isRead && canCommit && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GsButton, {
      key: "SubmitButton",
      type: "submit",
      className: BUTTON_PRIMARY_CLASS,
      disabled: isSubmitting
    }, editorFlags.isCreate ? MSG_ACTION_CREATE : editorFlags.isDelete ? MSG_ACTION_DELETE : MSG_ACTION_UPDATE), isSubmitting && WaitAnimation()), /*#__PURE__*/React.createElement(GsButton, {
      key: "CancelButton",
      variant: "secondary",
      disabled: isSubmitting,
      onClick: handleCancel
    }, MSG_ACTION_CANCEL)), status && /*#__PURE__*/React.createElement("div", {
      className: ERROR_MSG_CLASS
    }, status));
  });
};
const iterateChildComponents = (editor, dataset, handleFormPageActions) => {
  let initialFieldValues = getFieldElementsDbValues(editor, dataset);
  if (initialFieldValues[editor.primaryKeyName] === 0) {
    // Dataset is stil not ready...
    // return ('');
    return WaitAnimation();
  }
  return Object.entries(editor.childComponents).map(function (htmlElement) {
    let ChildElement = htmlElement[1];
    if (String(ChildElement).includes('component:')) {
      ChildElement = htmlElement[1]().component;
    }
    return /*#__PURE__*/React.createElement("div", {
      key: 'ChildElement_' + htmlElement[0],
      className: APP_FORMPAGE_CHILD_COMPONENTS_TOP_DIV_CLASS
    }, /*#__PURE__*/React.createElement(ChildElement, {
      parentData: initialFieldValues,
      handleFormPageActions: handleFormPageActions
    }));
  });
};
const saveRowToDatabase = (editor, action, rowId, submitedtElements, initialValues) => {
  let rowToSave = submitedtElements;
  if (typeof rowToSave["resultset"] !== "undefined") {
    delete rowToSave["resultset"];
  }
  if (typeof initialValues["resultset"] !== "undefined") {
    delete initialValues["resultset"];
  }
  if (editor.type === "child_listing") {
    // Build the format for child table
    // Example:
    // {
    //     "user_id": "{{TEST_USER_ID}}",
    //     "food_times": {
    //         "food_moment_id": "test_food_moment_id_2",
    //         "food_time": "10:00"
    //     },
    //     "food_times_old": {
    //         "food_moment_id": "test_food_moment_id_1"
    //     }
    // }
    rowId = null;
    rowToSave = editor.parentKeyNames.reduce((acc, keyPair) => {
      acc[keyPair.parameterName] =
      // parent table 'id' field name
      editor.parentData[keyPair.parentElementName]; // parent table 'id' value
      return {
        ...acc
      };
    }, {});
    rowToSave[editor.array_name] = submitedtElements; // array object in the parent row with new values
    rowToSave[editor.array_name + "_old"] = initialValues; // array object in the parent row with initial values
  }
  // Save the row to Database
  const dbService = new dbApiService({
    url: editor.dbApiUrl
  });
  return dbService.createUpdateDelete(action, rowId, rowToSave);
};
const setDefaultFieldValue = currentObj => {
  let response = null;
  if (typeof currentObj['default_value'] !== 'undefined') {
    switch (currentObj.default_value) {
      case 'current_timestamp':
        switch (currentObj.type) {
          case 'date':
            response = timestampToDate(nowToTimestap());
            break;
          case 'datetime-local':
            response = timestampToDate(nowToTimestap(), true, 'T');
            break;
          default:
            response = nowToTimestap();
        }
        break;
      default:
        response = currentObj.default_value;
    }
    return response;
  }
  switch (currentObj.type) {
    case '_id':
    case 'number':
    case 'integer':
      response = 0;
      break;
    case 'date':
      response = timestampToDate(nowToTimestap());
      break;
    case 'datetime-local':
      response = timestampToDate(nowToTimestap(), true, 'T');
      break;
    default:
      response = '';
  }
  return response;
};
const getFieldElementsDbValues = function (editor, datasetRaw) {
  let defaultValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // console_debug_log(`getFieldElementsDbValues | defaultValues: ${defaultValues} | datasetRaw:`, datasetRaw);
  let dataset = {};
  if (typeof datasetRaw !== 'undefined') {
    dataset = Object.assign({}, datasetRaw);
  }
  // if (editor.type !== "child_listing") {
  //   dataset = Object.assign({}, datasetRaw);
  // } else {
  if (editor.subType === "array") {
    // Get the 1st element only because it's only an element when
    // the action over the child object is Read, Modify or Delete
    // if (typeof datasetRaw !== 'undefined') {
    if (typeof datasetRaw[0] !== 'undefined') {
      dataset = Object.assign({}, datasetRaw[0]);
    }
    // }
  }
  // }

  const dbService = new dbApiService({
    url: editor.dbApiUrl
  });
  const verifyElementExistence = (dataset, element) => {
    return typeof dataset[element] !== "undefined";
  };
  const response = editor.fieldElements.reduce((acc, currentObj) => {
    let responseObj = '';
    if (currentObj.type === "_id") {
      if (verifyElementExistence(dataset, "_" + currentObj.name)) {
        responseObj = dbService.convertId(dataset["_" + currentObj.name]);
      } else if (defaultValues) {
        responseObj = setDefaultFieldValue(currentObj);
      }
    } else if (verifyElementExistence(dataset, currentObj.name)) {
      responseObj = dataset[currentObj.name];
    } else if (defaultValues) {
      responseObj = setDefaultFieldValue(currentObj);
    }
    if (typeof currentObj['force_value'] !== 'undefined') {
      responseObj = currentObj['force_value'];
    }
    switch (currentObj.type) {
      // case 'component':
      case 'label':
      case 'hr':
        // Excluded types
        break;
      default:
        acc[currentObj.name] = responseObj;
    }
    return {
      ...acc
    };
    // }, {});
  }, dataset);
  if (typeof response["_id"] !== 'undefined') {
    delete response["_id"];
  }
  return response;
};
const getFieldElementsYupValidations = (editor, editorFlags) => {
  if (editorFlags.isDelete) {
    return {};
  }
  const response = editor.fieldElements.reduce((acc, currentObj) => {
    let responseObj = Yup__namespace; // https://github.com/jquense/yup
    switch (currentObj.type) {
      case 'number':
        responseObj = responseObj.number(`${currentObj.label} ${MSG_MUST_BE} ${MSG_VALID_NUMBER}`);
        break;
      case 'integer':
        responseObj = responseObj.number().integer(`${currentObj.label} ${MSG_MUST_BE} ${MSG_VALID_INTEGER}`);
        break;
      case 'date':
        responseObj = responseObj.date(`${currentObj.label} ${MSG_MUST_BE} ${MSG_VALID_DATE}`);
        break;
      case 'email':
        responseObj = responseObj.string().email(`${currentObj.label} ${MSG_MUST_BE} ${MSG_VALID_EMAIL}`);
        break;
      case 'text':
      default:
        responseObj = responseObj.string();
    }
    if (currentObj.required) {
      responseObj = responseObj.required(`${currentObj.label} ${MSG_IS_REQUIRED}`);
    }
    acc[currentObj.name] = responseObj;
    return {
      ...acc
    };
  }, {});
  return response;
};

var generic_editor_rfc_formpage = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FormPage: FormPage,
  getFieldElementsYupValidations: getFieldElementsYupValidations
});

// GenericCrudEditor search component

const CrudEditorSearch = _ref => {
  let {
    id,
    fieldElements,
    handleCancel,
    value = ""
  } = _ref;
  const {
    theme
  } = useAppContext();
  const [searchText, setSearchText] = React.useState(value);
  const getDateRange = searchValue => {
    const dateRange = searchValue.split(',');
    let result;
    if (dateRange.length !== 2) {
      result = String(processDateToTimestamp(searchValue));
    } else {
      result = (dateRange[0] ? String(processDateToTimestamp(dateRange[0].trim())) : '') + "," + (dateRange[1] ? String(processDateToTimestamp(dateRange[1].trim())) : '');
    }
    return result;
  };
  const submitSearch = newSearchText => {
    let searchFilters = {};
    if (newSearchText !== "") {
      searchFilters = Object.keys(fieldElements).reduce((filterDict, index) => {
        const element = fieldElements[index];
        if (element.listing && (!['number', 'integer', 'date', 'datetime-local', 'hr', 'label'].includes(element.type) || ['number', 'integer'].includes(element.type) && !isNaN(newSearchText) || ['date', 'datetime-local'].includes(element.type) && !getDateRange(newSearchText).includes("NaN"))) {
          let newElement = {};
          if (['date', 'datetime-local'].includes(element.type)) {
            newElement[element.name] = getDateRange(newSearchText);
          } else {
            newElement[element.name] = newSearchText;
          }
          filterDict = {
            ...filterDict,
            ...newElement
          };
        }
        return {
          ...filterDict
        };
      }, {
        like: '1',
        comb: 'or'
      });
    }
    const config = {
      searchFilters: searchFilters,
      searchText: newSearchText
    };
    handleCancel(config);
  };
  const handleTextChange = event => {
    setSearchText(event.target.value);
  };
  const handleCancelSearch = () => {
    setSearchText('');
    submitSearch('');
  };
  const handleSubmit = () => {
    submitSearch(searchText);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: APP_LISTING_SEARCH_BOX_TOP_DIV_CLASS
  }, /*#__PURE__*/React.createElement("input", {
    id: id
    // type="text"
    ,
    className: APP_LISTING_SEARCH_BOX_INPUT_CLASS + " " + theme.input,
    placeholder: `${MSG_SEARCH}...`,
    value: searchText || '',
    onChange: handleTextChange
  }), /*#__PURE__*/React.createElement("button", {
    className: APP_LISTING_SEARCH_BOX_SUBMIT_BUTTON_CLASS,
    onClick: handleSubmit
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "search",
    alt: MSG_SEARCH
  })), searchText !== '' && /*#__PURE__*/React.createElement("button", {
    className: APP_LISTING_SEARCH_BOX_STOP_BUTTON_CLASS,
    onClick: handleCancelSearch
  }, "X"));
};

var generic_editor_rfc_search = /*#__PURE__*/Object.freeze({
  __proto__: null,
  CrudEditorSearch: CrudEditorSearch
});

// GenericCrudEditor (GCE) service main

const debug$1 = false;
const GenericCrudEditor = _ref => {
  let {
    editorConfig,
    parentData,
    handleFormPageActions = null
  } = _ref;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MainSectionProvider, null, /*#__PURE__*/React.createElement(GenericCrudEditorMain, {
    editorConfig: editorConfig,
    parentData: parentData,
    handleFormPageActions: handleFormPageActions
  })));
};
const GenericCrudEditorMain = props => {
  const [editor, setEditor] = React.useState(null);
  const [rows, setRows] = React.useState(null);
  const [currentPage, setCurrentPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(ROWS_PER_PAGE);
  const [formMode, setFormMode] = React.useState([ACTION_LIST, null]);
  const [status, setStatus] = React.useState("");
  const [infoMsg, setInfoMsg] = React.useState("");
  const [searchFilters, setSearchFilters] = React.useState({});
  const [searchText, setSearchText] = React.useState("");
  const {
    initCache,
    debugCache
  } = React.useContext(MainSectionContext);
  const {
    currentUser
  } = useUser();
  const {
    theme,
    isWide
  } = useAppContext();
  const actionsHandlerAllowsMagicButton = false;
  React.useEffect(() => {
    setEditorParameters(props).then(editor_response => {
      if (!editor_response) {
        setEditor(null);
      } else if (editor_response.error) {
        console_debug_log("GCE-M-010:");
        console_debug_log(editor_response.errorMsg);
        setStatus(errorAndReEnter(editor_response.errorMsg, null));
      } else if (!editor_response.response) {
        setEditor(null);
      } else {
        setEditor(getEditoObj(props, editor_response));
      }
    }, error => {
      console_debug_log("GCE-M-020:");
      console_debug_log(error);
      setStatus(errorAndReEnter(error, null));
    });
  }, [props]);
  React.useEffect(() => {
    // if (editor && !status) {
    if (editor) {
      const animationElementId = editor.baseUrl + "_pagination" + "_nav_animation";
      ShowHidePageAnimation(true, animationElementId);
      let accessKeysListing = {
        page: currentPage,
        limit: rowsPerPage
      };
      // dbListPreRead: To set a Listing filters, assign funcResponse.fieldValues[db_field]=filter_value
      processGenericFuncArray(editor, 'dbListPreRead', accessKeysListing, formMode, currentUser).then(funcResponse => {
        // console_debug_log(`GenericCrudEditor / dbListPreRead - funcResponse:`)
        // console_debug_log(funcResponse);
        accessKeysListing = Object.assign(accessKeysListing, editor.parentFilter, searchFilters, funcResponse.fieldValues);
        editor.db.getAll(accessKeysListing).then(data => {
          ShowHidePageAnimation(false, animationElementId);
          // dbListPostRead: To fix Listing fields
          processGenericFuncArray(editor, 'dbListPostRead', data, formMode, currentUser).then(funcResponse => setRows(funcResponse.fieldValues), error => setStatus(errorAndReEnter(error, null)));
        }, error => {
          console_debug_log(`GenericCrudEditor / Listing - ERROR:`);
          console.error(error);
          ShowHidePageAnimation(false, animationElementId);
          setStatus(errorAndReEnter(error, null));
        });
      }, error => {
        console_debug_log(`GenericCrudEditor / dbListPreRead - ERROR:`);
        console.error(error);
        setStatus(errorAndReEnter(error, null));
      });
    }
  }, [currentPage, rowsPerPage, editor, formMode, searchFilters]);
  const handleCancel = function () {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    if (typeof config['searchFilters'] !== 'undefined') {
      setSearchFilters(config['searchFilters']);
      setSearchText(config['searchText']);
    }
    if (typeof config['nextAction'] !== 'undefined') {
      setFormMode([config['nextAction'], config['id'], config['infoMsg'], "INFO"]);
    } else {
      setFormMode([ACTION_LIST, null]);
    }
  };
  const handleNew = () => {
    setFormMode([ACTION_CREATE, null]);
  };
  const handleView = id => {
    setFormMode([ACTION_READ, id]);
  };
  const handleModify = id => {
    setFormMode([ACTION_UPDATE, id]);
  };
  const handleDelete = id => {
    setFormMode([ACTION_DELETE, id]);
  };
  const goToNewPage = newPage => {
    setInfoMsg('');
    setCurrentPage(newPage);
  };
  const handleRowsPerPageChange = event => {
    if (!event.target.value) {
      return;
    }
    setInfoMsg('');
    setRowsPerPage(event.target.value);
  };
  const handleRefresh = newPage => {
    // select_cache = {};
    initCache();
    window.location.reload(true);
  };
  const rowId = row => {
    const response = typeof row._id === 'undefined' ? row[editor.primaryKeyName] : editor.db.convertId(row._id);
    return response;
  };
  const actionsHandler = (mode, row) => {
    const element = document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_controls`);
    document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_magicButton`);
    const rowElement = document.getElementById(`${editor.baseUrl}_row_${rowId(row)}_row`);
    const bgColorStype = ['bg-slate-300', 'odd:bg-slate-300'];
    if (mode === 'show') {
      // Highlight row
      bgColorStype.map(key => {
        rowElement.classList.add(key);
      });
      // If mouse over allowed, show controls
      {
        element.classList.remove('hidden');
      }
    }
    if (mode === 'hide') {
      // Remove row highlight
      bgColorStype.map(key => {
        rowElement.classList.remove(key);
      });
      // If mouse over allowed, hide controls
      {
        element.classList.add('hidden');
      }
    }
    if (mode === 'toggle') {
      // Turn off previous opened controls
      rows.resultset.map(thisRow => {
        const thisRowElement = document.getElementById(`${editor.baseUrl}_row_${rowId(thisRow)}_controls`);
        if (!thisRowElement.classList.contains('hidden')) {
          thisRowElement.classList.add('hidden');
        }
      });
      if (element.classList.contains('hidden')) {
        // Controls hidden in this row
        bgColorStype.map(key => {
          rowElement.classList.add(key);
        });
        element.classList.remove('hidden');
      } else {
        // Controls activated in this row
        bgColorStype.map(key => {
          rowElement.classList.remove(key);
        });
        element.classList.add('hidden');
      }
    }
  };
  if (!editor) {
    if (status) {
      return /*#__PURE__*/React.createElement("div", null, status, debug$1);
    }
    return WaitAnimation();
  }
  if (!rows && !status) {
    return WaitAnimation();
  }
  if (status) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, status, debug$1);
  }
  if (rows && typeof rows['totalPages'] !== 'undefined' && rows['totalPages'] == null) {
    return 'Rows ok but not totalPages - ERROR # 3';
  }
  if (formMode[0] !== ACTION_LIST) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormPage, {
      mode_par: formMode[0],
      id_par: formMode[1],
      onCancel_par: handleCancel,
      setInfoMsg_par: setInfoMsg,
      editor_par: editor,
      handleFormPageActions: props.handleFormPageActions,
      message: typeof formMode[2] !== 'undefined' ? formMode[2] : '',
      messageType: typeof formMode[3] !== 'undefined' ? formMode[3] : ''
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    key: `${editor.baseUrl}_top_div`,
    className: `${APP_TOP_DIV_CLASS} ${theme.contentBg}`
  }, infoMsg && /*#__PURE__*/React.createElement("div", {
    key: `${editor.baseUrl}_info_msg`,
    className: INFO_MSG_CLASS
  }, infoMsg), rows && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CrudEditorListingTitle, {
    baseUrl: editor.baseUrl,
    title: editor.title,
    handleRefresh: handleRefresh
  }), /*#__PURE__*/React.createElement("div", {
    key: `${editor.baseUrl}_level2_div`,
    className: APP_LEVEL2_DIV_CLASS
  }, /*#__PURE__*/React.createElement("table", {
    key: `${editor.baseUrl}_table`,
    className: APP_LISTING_TABLE_CLASS
  }, /*#__PURE__*/React.createElement("thead", {
    key: `${editor.baseUrl}_thead`,
    className: APP_LISTING_TABLE_HDR_THEAD_CLASS
  }, /*#__PURE__*/React.createElement("tr", {
    key: `${editor.baseUrl}_thead_tr`,
    className: APP_LISTING_TABLE_HDR_TR_CLASS
  }, Object.keys(editor.fieldElements).map(key => editor.fieldElements[key].listing && /*#__PURE__*/React.createElement("th", {
    // scope="col"
    key: `${editor.baseUrl}_${key}_thead_th`,
    className: APP_LISTING_TABLE_HDR_TH_CLASS
  }, editor.fieldElements[key].label)), actionsHandlerAllowsMagicButton)), /*#__PURE__*/React.createElement("tbody", {
    key: `${editor.baseUrl}_tbody`,
    className: APP_LISTING_TABLE_BODY_TBODY_CLASS
  }, rows && typeof rows.resultset !== 'undefined' && rows.resultset.map((row, index) =>
  /*#__PURE__*/
  // To avoid use of <> to group 2 <tr> (one for the row and one for the actions)
  // because it throws the warning:
  // "Warning: Each child in a list should have a unique "key" prop."
  // we use <React.Fragment> instead
  React.createElement(React.Fragment, {
    key: `${editor.baseUrl}_row_${rowId(row)}_tr_enclosure`
  }, /*#__PURE__*/React.createElement("tr", {
    id: `${editor.baseUrl}_row_${rowId(row)}_row`,
    key: `${editor.baseUrl}_row_${rowId(row)}_row`,
    className: index % 2 ? `${APP_LISTING_TABLE_BODY_TR_ODD_CLASS}` : `${theme.secondary} ${APP_LISTING_TABLE_BODY_TR_EVEN_CLASS}`,
    onMouseOver: () => {
      actionsHandler('show', row);
    },
    onClick: () => {
      actionsHandler('toggle', row);
    },
    onMouseLeave: () => {
      actionsHandler('hide', row);
    }
  }, Object.keys(editor.fieldElements).map(key => editor.fieldElements[key].listing && /*#__PURE__*/React.createElement("td", {
    key: `${editor.baseUrl}_row_${rowId(row)}_${key}_td`,
    className: index % 2 ? APP_LISTING_TABLE_BODY_TD_ODD_CLASS : APP_LISTING_TABLE_BODY_TD_EVEN_CLASS
  }, getSelectDescription(editor.fieldElements[key], row) // Show column value or select description
  )), actionsHandlerAllowsMagicButton), /*#__PURE__*/React.createElement("tr", {
    id: `${editor.baseUrl}_row_${rowId(row)}_controls`,
    key: `${editor.baseUrl}_row_${rowId(row)}_controls`,
    className: (index % 2 ? APP_LISTING_TABLE_BODY_TR_ACTIONS_ODD_CLASS : `${theme.secondary} ${APP_LISTING_TABLE_BODY_TR_ACTIONS_EVEN_CLASS}`) + " " + HIDDEN_CLASS,
    onMouseOver: () => {
      actionsHandler('show', row);
    },
    onClick: () => {
      actionsHandler('toggle', row);
    },
    onMouseLeave: () => {
      actionsHandler('hide', row);
    }
  }, /*#__PURE__*/React.createElement("td", {
    // Action buttons
    key: `${editor.baseUrl}_row_${rowId(row)}_controls_td`,
    colSpan: Object.keys(editor.fieldElements).length + 1,
    className: index % 2 ? APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS : APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS
  }, /*#__PURE__*/React.createElement("button", {
    key: `${editor.baseUrl}_row_${rowId(row)}_controls_eye`,
    onClick: () => handleView(rowId(row))
    // className={`${BUTTON_LISTING_CLASS} ${BUTTON_RIGHT_SPACE_CLASS}`}
    ,
    className: `${BUTTON_LISTING_CLASS}`
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "eye",
    alt: MSG_ACTION_READ
  })), /*#__PURE__*/React.createElement("button", {
    key: `${editor.baseUrl}_row_${rowId(row)}_controls_edit`,
    onClick: () => handleModify(rowId(row))
    // className={`${BUTTON_LISTING_CLASS} ${BUTTON_RIGHT_SPACE_CLASS}`}
    ,
    className: `${BUTTON_LISTING_CLASS}`
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "edit",
    alt: MSG_ACTION_EDIT
  })), /*#__PURE__*/React.createElement("button", {
    key: `${editor.baseUrl}_row_${rowId(row)}_controls_trash`,
    onClick: () => handleDelete(rowId(row)),
    className: `${BUTTON_LISTING_CLASS}`
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "trash",
    alt: MSG_ACTION_DELETE
  }))))))))), /*#__PURE__*/React.createElement("div", {
    key: `${editor.baseUrl}_toolbar`,
    className: APP_LISTING_TOOLBAR_TOP_DIV_CLASS + " " + (isWide ? APP_LISTING_TOOLBAR_TOP_DIV_WIDE_CLASS : APP_LISTING_TOOLBAR_TOP_DIV_NOT_WIDE_CLASS)
  }, /*#__PURE__*/React.createElement(CrudEditorPagination, {
    id: editor.baseUrl + "_pagination",
    currentPage: currentPage,
    totalPages: rows.totalPages,
    goToNewPage: goToNewPage
  }), /*#__PURE__*/React.createElement(CrudEditorRowsPerPage, {
    id: editor.baseUrl + "_newRowsPerPage",
    rowsPerPage: rowsPerPage,
    handleRowsPerPageChange: handleRowsPerPageChange
  }), /*#__PURE__*/React.createElement(CrudEditorSearch, {
    id: editor.baseUrl + "_searchText",
    fieldElements: editor.fieldElements,
    handleCancel: handleCancel,
    value: searchText
  }), /*#__PURE__*/React.createElement(CrudEditorNewButton, {
    id: editor.baseUrl + "_newButton",
    handleNew: handleNew
  })), status && /*#__PURE__*/React.createElement("div", null, status, debug$1)), '');
};
const ConvertToComponents = (editorDataObj, registry) => {
  /*
   Convert the following editorData elements to components using the registry
   as a brigde between the string elements from the JSON file
   and the components objects.
    component: ...,
    fieldElements: [ ...
      select_elements: ...,
       dataPopulator: ...,
      component: ..,
     // 1-N relationships
    childComponents: [ ... ],
     // Specific functions
    dbListPreRead: [ ... ]
    dbListPostRead: [ ... ]
    dbPreRead: [ ... ]
    dbPostRead: [ ... ]
    dbPreValidations: [ ... ]
    validations: [ ... ]
    dbPreWrite: [ ... ]
    dbPostWrite: [ ... ]
   */
  const editorDataObjArray = ['component'];
  editorDataObjArray.forEach(element => {
    if (typeof editorDataObj[element] !== 'undefined' && typeof editorDataObj[element] === 'string') {
      editorDataObj[element] = registry[editorDataObj[element]];
    }
  });

  // Do the same for the rest of elements in fieldElements array
  const fieldElementsArray = ['component', 'aux_component', 'select_elements', 'dataPopulator', 'formula'];
  editorDataObj['fieldElements'] = editorDataObj['fieldElements'].map(fieldElement => {
    fieldElementsArray.forEach(element => {
      if (typeof fieldElement[element] !== 'undefined' && typeof fieldElement[element] === 'string') {
        fieldElement[element] = registry[fieldElement[element]];
      }
    });
    return fieldElement;
  });
  const relatedObjsArray = ['childComponents', 'dbListPreRead', 'dbListPostRead', 'dbPreRead', 'dbPostRead', 'dbPreValidations', 'validations', 'dbPreWrite', 'dbPostWrite'];
  relatedObjsArray.forEach(element => {
    if (typeof editorDataObj[element] !== 'undefined') {
      editorDataObj[element] = editorDataObj[element].map(childComponent => {
        if (typeof childComponent === 'string') {
          childComponent = registry[childComponent];
        }
        return childComponent;
      });
    }
  });
  return editorDataObj;
};
const GetFormData = function (editorData, registry) {
  let calleeName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (typeof registry === 'undefined') {
    registry = {};
  }
  let editorDataObj = ConvertToComponents(editorData, registry);
  editorDataObj["calleeName"] = calleeName;
  return editorDataObj;
};
const CrudEditorRowsPerPage = _ref2 => {
  let {
    id,
    rowsPerPage,
    handleRowsPerPageChange
  } = _ref2;
  const {
    theme
  } = useAppContext();
  return /*#__PURE__*/React.createElement("div", {
    className: APP_LISTING_TOOLBAR_ROW_PER_PAGE_SECTION_CLASS
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "newRowsPerPage",
    className: APP_LISTING_TOOLBAR_ROW_PER_PAGE_LABEL_CLASS
  }, MSG_ROWS_PER_PAGE, ":"), /*#__PURE__*/React.createElement("select", {
    id: "newRowsPerPage",
    className: APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS + " " + theme.input,
    onChange: handleRowsPerPageChange,
    defaultValue: rowsPerPage
  }, /*#__PURE__*/React.createElement("option", {
    key: ROWS_PER_PAGE,
    value: ROWS_PER_PAGE
  }, ROWS_PER_PAGE), Array.from({
    length: 10
  }, (_, i) => (i + 1) * 10).map(value => /*#__PURE__*/React.createElement("option", {
    key: value,
    value: value
  }, value)), rowsPerPage > 100 && /*#__PURE__*/React.createElement("option", {
    key: rowsPerPage,
    value: rowsPerPage
  }, rowsPerPage)));
};
const CrudEditorPagination = _ref3 => {
  let {
    id,
    currentPage,
    totalPages,
    goToNewPage
  } = _ref3;
  return /*#__PURE__*/React.createElement("div", {
    id: id,
    className: APP_LISTING_TOOLBAR_PAGINATION_SECTION_CLASS
  }, /*#__PURE__*/React.createElement("button", {
    disabled: currentPage === 1,
    onClick: () => goToNewPage(currentPage - 1),
    className: `${currentPage === 1 ? BUTTON_LISTING_DISABLED_CLASS : BUTTON_LISTING_CLASS}`
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "less-than",
    alt: MSG_PREVIOUS
  })), /*#__PURE__*/React.createElement("div", {
    className: APP_LISTING_TOOLBAR_PAGE_NUM_SECTION_CLASS
  }, MSG_PAGE, " ", currentPage, " ", MSG_OF, " ", totalPages), /*#__PURE__*/React.createElement("button", {
    disabled: currentPage === totalPages,
    onClick: () => goToNewPage(currentPage + 1),
    className: `${currentPage === totalPages ? BUTTON_LISTING_DISABLED_CLASS : BUTTON_LISTING_CLASS}`
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "greater-than",
    alt: MSG_NEXT
  })), /*#__PURE__*/React.createElement("div", {
    id: id + "_nav_animation",
    className: APP_LISTING_TOOLBAR_WAIT_ANIMATION_CLASS
  }, WaitAnimation()));
};
const CrudEditorNewButton = _ref4 => {
  let {
    id,
    handleNew
  } = _ref4;
  return /*#__PURE__*/React.createElement("button", {
    id: id,
    onClick: handleNew,
    className: BUTTON_LISTING_NEW_CLASS
  }, /*#__PURE__*/React.createElement("div", {
    className: BUTTON_COMPOSED_LABEL_CLASS
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "plus",
    alt: MSG_ACTION_NEW
  }), "\xA0", MSG_ACTION_NEW));
};
const CrudEditorListingTitle = _ref5 => {
  let {
    baseUrl,
    title,
    handleRefresh
  } = _ref5;
  return /*#__PURE__*/React.createElement("h2", {
    key: `${baseUrl}_title`,
    className: APP_TITLE_H1_CLASS
  }, title + " - " + MSG_ACTION_LIST, /*#__PURE__*/React.createElement("span", {
    className: APP_TITLE_RECYCLE_BUTTON_CLASS
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleRefresh,
    className: BUTTON_LISTING_REFRESH_CLASS
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "arrows-rotate",
    alt: MSG_RELOAD
  }))));
};

var generic_editor_rfc_service = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ConvertToComponents: ConvertToComponents,
  GenericCrudEditor: GenericCrudEditor,
  GetFormData: GetFormData
});

var baseUrl$3 = "users_config";
var title$3 = "User Configurations";
var name$3 = "User's Configuration";
var dbApiUrl$3 = "users_config";
var component$3 = "UsersConfig";
var type = "child_listing";
var subType = "array";
var array_name = "users_config";
var parentKeyNames = [
	{
		parameterName: "user_id",
		parentUrl: "users",
		parentElementName: "id"
	}
];
var primaryKeyName = "id";
var defaultOrder$1 = "config_name";
var fieldElements$3 = [
	{
		name: "id",
		required: false,
		label: "ID",
		type: "text",
		readonly: true,
		hidden: true,
		listing: false,
		uuid_generator: true
	},
	{
		name: "config_name",
		required: true,
		label: "Name",
		type: "text",
		readonly: false,
		listing: true
	},
	{
		name: "config_value",
		required: true,
		label: "Value",
		type: "text",
		readonly: false,
		listing: true
	}
];
var users_config = {
	baseUrl: baseUrl$3,
	title: title$3,
	name: name$3,
	dbApiUrl: dbApiUrl$3,
	component: component$3,
	type: type,
	subType: subType,
	array_name: array_name,
	parentKeyNames: parentKeyNames,
	primaryKeyName: primaryKeyName,
	defaultOrder: defaultOrder$1,
	fieldElements: fieldElements$3
};

function UsersConfig_EditorData() {
  // console_debug_log("UsersConfig_EditorData");
  const registry = {
    "UsersConfig": UsersConfig
  };
  // return GetFormData('users_config', registry, false);
  return GetFormData(users_config, registry, false);
}
function UsersConfig() {
  return {
    editorConfig: UsersConfig_EditorData(),
    component: UsersConfigComponent
  };
}
const UsersConfigComponent = _ref => {
  let {
    parentData
  } = _ref;
  return /*#__PURE__*/React.createElement(GenericCrudEditor, {
    editorConfig: UsersConfig_EditorData(),
    parentData: parentData
  });
};

var baseUrl$2 = "users";
var title$2 = "Users";
var name$2 = "User";
var component$2 = "Users";
var dbApiUrl$2 = "users";
var fieldElements$2 = [
	{
		name: "id",
		required: true,
		label: "ID",
		type: "_id",
		readonly: true
	},
	{
		name: "firstname",
		required: true,
		label: "First Name",
		type: "text",
		readonly: false,
		listing: true
	},
	{
		name: "lastname",
		required: true,
		label: "Last Name",
		type: "text",
		readonly: false,
		listing: true
	},
	{
		name: "email",
		required: true,
		label: "Email",
		type: "email",
		readonly: false,
		listing: true
	},
	{
		name: "status",
		required: true,
		label: "Active",
		type: "select",
		select_elements: "TRUE_FALSE",
		default_value: "1",
		listing: true
	},
	{
		name: "plan",
		required: true,
		label: "Billing Plan",
		type: "select",
		select_elements: "BILLING_PLANS",
		default_value: "1",
		listing: true
	},
	{
		name: "superuser",
		required: true,
		label: "Superuser",
		type: "select",
		select_elements: "TRUE_FALSE",
		readonly: false,
		hidden: false,
		default_value: "0",
		listing: true
	},
	{
		name: "birthday",
		required: true,
		label: "Birthday",
		type: "date",
		readonly: false
	},
	{
		name: "gender",
		required: true,
		label: "Gender",
		type: "select",
		select_elements: "GENDERS",
		readonly: false,
		listing: false
	},
	{
		name: "language",
		required: true,
		label: "Preferred Language",
		type: "select",
		select_elements: "LANGUAGES",
		readonly: false,
		listing: false
	},
	{
		name: "openai_api_key",
		required: false,
		label: "OpenAI API Key",
		type: "text"
	},
	{
		name: "openai_model",
		required: false,
		label: "OpenAI Model (defaults to gpt-4o-mini)",
		type: "text"
	},
	{
		name: "creation_date",
		required: true,
		label: "Created",
		type: "datetime-local",
		readonly: true,
		hidden: false,
		default_value: "current_timestamp",
		listing: true
	},
	{
		name: "update_date",
		required: true,
		label: "Last update",
		type: "datetime-local",
		readonly: true,
		hidden: false,
		default_value: "current_timestamp",
		listing: false
	},
	{
		name: "label0",
		type: "hr"
	},
	{
		name: "label1",
		label: "PASWORD CHANGE",
		type: "label"
	},
	{
		name: "passcode",
		required: false,
		label: "New password",
		type: "password",
		force_value: ""
	},
	{
		name: "passcode_repeat",
		required: false,
		label: "Repeat new password",
		type: "password",
		force_value: ""
	}
];
var childComponents = [
	"UsersConfig"
];
var dbListPreRead$1 = [
	"UsersDbListPreRead"
];
var dbPreWrite$1 = [
	"UsersDbPreWrite"
];
var dbPreValidations$1 = [
	"UsersValidations"
];
var validations$1 = [
	"UsersPasswordValidations"
];
var users = {
	baseUrl: baseUrl$2,
	title: title$2,
	name: name$2,
	component: component$2,
	dbApiUrl: dbApiUrl$2,
	fieldElements: fieldElements$2,
	childComponents: childComponents,
	dbListPreRead: dbListPreRead$1,
	dbPreWrite: dbPreWrite$1,
	dbPreValidations: dbPreValidations$1,
	validations: validations$1
};

function Users_EditorData() {
  let calleeName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Users_EditorData';
  const registry = {
    "LANGUAGES": LANGUAGES,
    "TRUE_FALSE": TRUE_FALSE,
    "BILLING_PLANS": BILLING_PLANS,
    "GENDERS": GENDERS,
    "UsersConfig": UsersConfig,
    "Users": Users,
    "UsersDbListPreRead": UsersDbListPreRead,
    "UsersDbPreWrite": UsersDbPreWrite,
    "UsersValidations": UsersValidations,
    "UsersPasswordValidations": UsersPasswordValidations
  };
  // return GetFormData('users', registry, calleeName);
  return GetFormData(users, registry, calleeName);
}
const Users = () => /*#__PURE__*/React.createElement(GenericCrudEditor, {
  editorConfig: Users_EditorData()
});

/*
 * System Admin
 */

const UsersValidations = (data, editor, action, currentUser) => {
  // Users pre-deletion/update validations
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    getUserData(currentUser.id).then(userData => {
      if (typeof data !== 'undefined' && typeof data['_id'] !== 'undefined') {
        data['id'] = editor.db.convertId(data['_id']);
      }
      switch (action) {
        case ACTION_DELETE:
          if (data['superuser'] === '1' && userData.resultset['superuser'] === '0') {
            resp.error = true;
            resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 'Super users can be deleted only by other Super users.';
          }
          if (data['id'] === currentUser.id) {
            resp.error = true;
            resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 'You cannot delete yourself';
          }
          if (userData.resultset['superuser'] === '0' && data['id'] !== currentUser.id) {
            resp.error = true;
            resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 'You cannot delete other\'s records';
          }
          break;
        case ACTION_CREATE:
          if (userData.resultset['superuser'] === '0') {
            resp.error = true;
            resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 'You cannot create new users';
          }
          break;
        case ACTION_UPDATE:
          if (userData.resultset['superuser'] === '0' && data['id'] !== currentUser.id) {
            resp.error = true;
            resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 'You cannot modify other\'s records';
          }
          break;
      }
      if (resp.error) {
        reject(resp);
      } else {
        resolve(resp);
      }
    }, error => {
      resp.error = true;
      resp.errorMsg = error;
      reject(resp);
    });
  });
};
const UsersDbListPreRead = (data, editor, action, currentUser) => {
  // Users pre-deletion/update validations
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    getUserData(currentUser.id).then(currentUserData => {
      if (currentUserData.error) {
        resp.error = true;
        resp.errorMsg = currentUserData.errorMsg;
      } else {
        // Set a filter to retrieve only the current user
        if (currentUserData.resultset['superuser'] === '0') {
          resp.fieldValues['_id'] = currentUser.id;
        }
      }
      if (resp.error) {
        reject(resp);
      } else {
        resolve(resp);
      }
    }, error => {
      resp.error = true;
      resp.errorMsg = error;
      reject(resp);
    });
  });
};
const UsersPasswordValidations = (data, editor, action) => {
  // Users validations
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    switch (action) {
      case ACTION_CREATE:
      case ACTION_UPDATE:
        if (data['passcode']) {
          if (data['passcode'] !== data['passcode_repeat']) {
            resp.error = true;
            resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + '"New Password" and "Repeat New Password" must be same';
          }
        }
        break;
    }
    if (resp.error) {
      reject(resp);
    } else {
      resolve(resp);
    }
  });
};
const UsersDbPreWrite = (data, editor, action) => {
  // Users validations
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    // Avoid passing an empty password to the backend
    if (data['passcode'].trim() === '') {
      resp.fieldsToDelete.push('passcode');
    }
    // Avoid passing the repeat password field to the backend
    resp.fieldsToDelete.push('passcode_repeat');
    resolve(resp);
  });
};

// GenericCrudEditor single page editor

const GenericSinglePageEditor = _ref => {
  let {
    editorConfig,
    id,
    parentData
  } = _ref;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(MainSectionProvider, null, /*#__PURE__*/React.createElement(GenericSinglePageEditorMain, {
    editorConfig: editorConfig,
    id: id,
    parentData: parentData
  })));
};
const debug = false;
const GenericSinglePageEditorMain = props => {
  const [editor, setEditor] = React.useState(null);
  const [formMode, setFormMode] = React.useState(null);
  const [status, setStatus] = React.useState("");
  React.useContext(MainSectionContext);
  React.useEffect(() => {
    setEditorParameters(props).then(editor_response => {
      if (!editor_response) {
        setEditor(null);
      } else if (editor_response.error) {
        console_debug_log("GSPE-ERROR-010:");
        console_debug_log(editor_response.errorMsg);
        setStatus(errorAndReEnter(editor_response.errorMsg));
      } else if (!editor_response.response) {
        setEditor(null);
      } else {
        setEditor(getEditoObj(props, editor_response));
      }
    }, error => {
      console_debug_log("GSPE-ERROR-020:");
      console_debug_log(error);
      setStatus(errorAndReEnter(error));
    });
  }, [props, debug]);
  React.useEffect(() => {
    const form_mode = [ACTION_UPDATE, props.id];
    setFormMode(form_mode);
  }, [props.id, debug]);
  const setInfoMsg = msg => {
    console_debug_log('setInfoMsg | msg:');
    console_debug_log(msg);
  };
  const handleCancel = () => {
    window.location.href = '/';
  };
  if (!editor) {
    if (status) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, status, "[GSPE-NES]");
    }
    return WaitAnimation();
  }
  if (status) {
    return /*#__PURE__*/React.createElement("div", {
      className: ERROR_MSG_CLASS
    }, status, debug);
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormPage, {
    mode_par: formMode[0],
    id_par: formMode[1],
    onCancel_par: handleCancel,
    setInfoMsg_par: setInfoMsg,
    editor_par: editor
  }));
};

var generic_editor_singlepage = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GenericSinglePageEditor: GenericSinglePageEditor,
  GenericSinglePageEditorMain: GenericSinglePageEditorMain
});

var baseUrl$1 = "users";
var title$1 = "User Profiles";
var name$1 = "User Profile";
var component$1 = "Users";
var dbApiUrl$1 = "users";
var updateItem = "1";
var fieldElements$1 = [
	{
		name: "id",
		required: true,
		label: "ID",
		type: "_id",
		hidden: true,
		readonly: true
	},
	{
		name: "firstname",
		required: true,
		label: "First Name",
		type: "text",
		readonly: false,
		listing: true
	},
	{
		name: "lastname",
		required: true,
		label: "Last Name",
		type: "text",
		readonly: false,
		listing: true
	},
	{
		name: "email",
		required: true,
		label: "Email",
		type: "email",
		readonly: false,
		listing: true
	},
	{
		name: "birthday",
		required: true,
		label: "Birthday",
		type: "date",
		readonly: false
	},
	{
		name: "gender",
		required: true,
		label: "Gender",
		type: "select",
		select_elements: "GENDERS",
		readonly: false,
		listing: false
	},
	{
		name: "language",
		required: true,
		label: "Preferred Language",
		type: "select",
		select_elements: "LANGUAGES",
		readonly: false,
		listing: false
	},
	{
		name: "plan",
		required: true,
		label: "Billing Plan",
		type: "select",
		select_elements: "BILLING_PLANS",
		default_value: "free",
		readonly: true,
		listing: true
	},
	{
		name: "status",
		required: true,
		label: "Active",
		type: "select",
		select_elements: "TRUE_FALSE",
		default_value: "1",
		readonly: true
	},
	{
		name: "openai_api_key",
		required: false,
		label: "OpenAI API Key",
		type: "text"
	},
	{
		name: "openai_model",
		required: false,
		label: "OpenAI Model (defaults to gpt-4o-mini)",
		type: "text"
	},
	{
		name: "creation_date",
		required: true,
		label: "Client Since",
		type: "datetime-local",
		readonly: true,
		hidden: false,
		default_value: "current_timestamp",
		listing: true
	},
	{
		name: "label0",
		type: "hr"
	},
	{
		name: "label1",
		label: "PASWORD CHANGE",
		type: "label"
	},
	{
		name: "passcode",
		required: false,
		label: "New password",
		type: "password",
		force_value: ""
	},
	{
		name: "passcode_repeat",
		required: false,
		label: "Repeat new password",
		type: "password",
		force_value: ""
	}
];
var dbListPreRead = [
	"UsersDbListPreRead"
];
var dbPreWrite = [
	"UsersDbPreWrite"
];
var dbPreValidations = [
	"UsersValidations"
];
var validations = [
	"UsersPasswordValidations"
];
var users_profile = {
	baseUrl: baseUrl$1,
	title: title$1,
	name: name$1,
	component: component$1,
	dbApiUrl: dbApiUrl$1,
	updateItem: updateItem,
	fieldElements: fieldElements$1,
	dbListPreRead: dbListPreRead,
	dbPreWrite: dbPreWrite,
	dbPreValidations: dbPreValidations,
	validations: validations
};

function UsersProfile_EditorData() {
  const registry = {
    "LANGUAGES": LANGUAGES,
    "TRUE_FALSE": TRUE_FALSE,
    "BILLING_PLANS": BILLING_PLANS,
    "GENDERS": GENDERS,
    "UsersConfig": UsersConfig,
    "UserProfileEditor": UserProfileEditor,
    "UsersDbListPreRead": UsersDbListPreRead,
    "UsersDbPreWrite": UsersDbPreWrite,
    "UsersValidations": UsersValidations,
    "UsersPasswordValidations": UsersPasswordValidations
  };
  // return GetFormData('users_profile', registry, 'UserProfileEditor');
  return GetFormData(users_profile, registry, 'UserProfileEditor');
}
const UserProfileEditor = props => {
  const {
    currentUser
  } = useUser();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GenericSinglePageEditor, {
    id: currentUser.id,
    editorConfig: UsersProfile_EditorData()
  }));
};

const HomePage = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/React.createElement("div", {
    className: APP_GENERAL_MARGINS_CLASS
  }, children);
};

const defaultAppLogo = "app_logo_square.svg";
const LoginPage = props => {
  const getRedirect = () => {
    const urlParams = getUrlParams(props);
    if (typeof urlParams.redirect === 'undefined') {
      return getLastUrl();
    }
    return urlParams.redirect;
  };
  const {
    currentUser,
    registerUser,
    unRegisterUser
  } = useUser();
  const {
    appLogo,
    theme
  } = useAppContext();
  const handleSubmit = (username, password, setStatus, setSubmitting) => {
    setStatus();
    authenticationService.login(username, password).then(user => {
      const redirectUrl = getRedirect();
      // To avoid stay in login page with the wait animation
      setSubmitting(false);
      registerUser(user);
      // Redirect to previous page
      removeLastUrl();
      if (redirectUrl.indexOf('/login') > 0) {
        redirectUrl = '/';
      }
      // return <Navigate to={redirectUrl} replace={true}/>
      window.location.href = redirectUrl;
      // To handle menu access rights changes
      // window.location.reload(true);
    }, error => {
      setSubmitting(false);
      setStatus(getErrorMessage(error));
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(formik.Formik, {
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup__namespace.object().shape({
      username: Yup__namespace.string().required('Username is required'),
      password: Yup__namespace.string().required('Password is required')
    }),
    onSubmit: (_ref, _ref2) => {
      let {
        username,
        password
      } = _ref;
      let {
        setStatus,
        setSubmitting
      } = _ref2;
      handleSubmit(username, password, setStatus, setSubmitting);
    }
  }, _ref3 => {
    let {
      errors,
      status,
      touched,
      isSubmitting
    } = _ref3;
    return /*#__PURE__*/React.createElement("div", {
      className: POPUP_TOP_MARGIN_CLASS
    }, /*#__PURE__*/React.createElement(CenteredBoxContainer, null, /*#__PURE__*/React.createElement(formik.Form, null, /*#__PURE__*/React.createElement("img", {
      src: imageDirectory + (appLogo || defaultAppLogo),
      width: "150",
      height: "150",
      className: LOGIN_PAGE_APP_LOGO_CLASS,
      alt: "App Logo"
    }), /*#__PURE__*/React.createElement("div", {
      className: FORM_GROUP_CLASS
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username",
      className: theme.label
    }, "Username"), /*#__PURE__*/React.createElement(formik.Field, {
      name: "username",
      type: "text",
      className: FORM_CONTROL_CLASS + ' ' + (errors.username && touched.username ? IS_INVALID_CLASS : theme.input)
    }), /*#__PURE__*/React.createElement(formik.ErrorMessage, {
      name: "username",
      component: "div",
      className: INVALID_FEEDBACK_CLASS
    })), /*#__PURE__*/React.createElement("div", {
      className: FORM_GROUP_CLASS
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "password",
      className: theme.label
    }, "Password"), /*#__PURE__*/React.createElement(formik.Field, {
      name: "password",
      type: "password",
      className: FORM_CONTROL_CLASS + ' ' + (errors.password && touched.password ? IS_INVALID_CLASS : theme.input)
    }), /*#__PURE__*/React.createElement(formik.ErrorMessage, {
      name: "password",
      component: "div",
      className: INVALID_FEEDBACK_CLASS
    })), /*#__PURE__*/React.createElement("div", {
      className: FORM_GROUP_CLASS
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: BUTTON_PRIMARY_CLASS,
      disabled: isSubmitting
    }, "Login"), isSubmitting && WaitAnimation()), status && !includesAppValidLinks(status) && /*#__PURE__*/React.createElement("div", {
      className: ERROR_MSG_CLASS
    }, status), status && includesAppValidLinks(status) && /*#__PURE__*/React.createElement("div", {
      className: ERROR_MSG_CLASS
      // dangerouslySetInnerHTML={{ __html: status }}
    }, status))));
  }));
};

var baseUrl = "general_config";
var title = "Configuration Parameters";
var name = "Configuration Parameter";
var component = "GeneralConfig";
var dbApiUrl = "general_config";
var defaultOrder = "config_name|asc";
var fieldElements = [
	{
		name: "id",
		required: true,
		label: "ID",
		type: "_id",
		readonly: true
	},
	{
		name: "config_name",
		required: true,
		label: "Name",
		type: "text",
		readonly: false,
		listing: true
	},
	{
		name: "active",
		required: true,
		label: "Active",
		type: "select",
		select_elements: "TRUE_FALSE",
		readonly: false,
		hidden: false,
		default_value: "1",
		listing: true
	},
	{
		name: "config_value",
		required: true,
		label: "Value",
		type: "text",
		readonly: false,
		listing: true
	},
	{
		name: "notes",
		required: true,
		label: "Notes",
		type: "text",
		readonly: false,
		listing: true
	}
];
var general_config = {
	baseUrl: baseUrl,
	title: title,
	name: name,
	component: component,
	dbApiUrl: dbApiUrl,
	defaultOrder: defaultOrder,
	fieldElements: fieldElements
};

function GeneralConfig_EditorData() {
  // console_debug_log("GeneralConfig_EditorData");
  const registry = {
    "GeneralConfig": GeneralConfig,
    "TRUE_FALSE": TRUE_FALSE
    // "testFormula": () => (alert("This is a Formula")),
  };
  /*
   * To test the formula:
  *
   * Uncomment the above "testFormula" function:
   *     "testFormula": () => (alert("This is a Formula")),
   *
   * Add the following definition item to "general_config.json"
   * {
   *    "name": "formula_test",
   *    "label": "FORMULA TEST",
   *    "type": "text",
   *    "readonly": false,
   *    "listing": true,
   *    "formula": "testFormula"
   * }
   * 
   * Then go to the "Admin > Configuration Parameters"
   * 
   * Click on the Edit button on any row
   * 
   * Go to the "Formula Test", click on it and press Tab
   */
  return GetFormData(general_config, registry, 'GeneralConfig_EditorData');
}
const GeneralConfig = () => /*#__PURE__*/React.createElement(GenericCrudEditor, {
  editorConfig: GeneralConfig_EditorData()
});

const AppFooter = _ref => {
  let {
    appName = null,
    year = null,
    url = null,
    rights = null,
    otherLine = null
  } = _ref;
  const appNameData = appName ?? process.env.REACT_APP_APP_NAME;
  const yearData = year ?? new Date().getFullYear();
  const rightsData = rights ?? "All rights reserved";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "\xA9 ", yearData, " ", url ? /*#__PURE__*/React.createElement("a", {
    href: url,
    target: "_blank"
  }, appNameData) : appNameData, ". ", rightsData, "."), otherLine && /*#__PURE__*/React.createElement("p", null, otherLine));
};

const getShowContentOnly = () => {
  const urlParams = getUrlParams();
  const showContentOnly = urlParams && typeof urlParams.menu !== "undefined" && urlParams.menu === "0";
  return showContentOnly;
};
const CloseButton = _ref => {
  let {
    children
  } = _ref;
  return /*#__PURE__*/React.createElement(React.Fragment, null, children && /*#__PURE__*/React.createElement("div", {
    className: ALERT_DANGER_CLASS,
    role: "alert"
  }, children), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => window.close(),
    className: BUTTON_PRIMARY_CLASS
  }, "Close"));
};
const AppNavBar = _ref2 => {
  let {
    children
  } = _ref2;
  useUser();
  const {
    setExpanded,
    appLogoHeader
  } = useAppContext();
  const version = process.env.REACT_APP_VERSION;
  const appName = appLogoHeader ? /*#__PURE__*/React.createElement("img", {
    src: imageDirectory + appLogoHeader,
    className: NAVBAR_BRAND_APP_LOGO_CLASS,
    alt: "App Logo"
  }) : process.env.REACT_APP_APP_NAME;
  return /*#__PURE__*/React.createElement(Navbar, {
    id: "navbar-main"
  }, /*#__PURE__*/React.createElement(Navbar.Brand, {
    as: reactRouterDom.Link,
    to: "/"
    // onClick={() => (currentUser ? setExpanded() : setExpanded(() => window.location.reload()))}
  }, /*#__PURE__*/React.createElement("div", {
    className: NAVBAR_BRAND_NAME_CLASS
  }, appName), /*#__PURE__*/React.createElement("div", {
    className: NAVBAR_BRAND_APP_VERSION_CLASS
  }, version)), children);
};
const TopRightMenu = _ref3 => {
  let {
    showContentOnly,
    authenticated = true
  } = _ref3;
  const {
    currentUser
  } = useUser();
  return /*#__PURE__*/React.createElement(Navbar.TopRightMenu, {
    authenticated: authenticated
  }, /*#__PURE__*/React.createElement(DarkModeButton, null), /*#__PURE__*/React.createElement(MenuModeButton, null), /*#__PURE__*/React.createElement(Navbar.Toggle, null), currentUser && authenticated && /*#__PURE__*/React.createElement(GenericMenuBuilder, {
    icon: "place-holder-circle",
    title: currentUser.firstName,
    itemType: "hamburger",
    showContentOnly: showContentOnly
  }));
};
const NoDesignComponent = _ref4 => {
  let {
    children,
    errorMessage
  } = _ref4;
  return /*#__PURE__*/React.createElement(React.Fragment, null, errorMessage && /*#__PURE__*/React.createElement("div", {
    className: ALERT_DANGER_CLASS,
    role: "alert"
  }, errorMessage), children);
};
const AppMainInnerUnauthenticated = _ref5 => {
  let {
    children
  } = _ref5;
  const {
    sideMenu
  } = useAppContext();
  const showContentOnly = getShowContentOnly();
  return /*#__PURE__*/React.createElement(MainContainer, null, /*#__PURE__*/React.createElement(AppNavBar, null, !sideMenu && /*#__PURE__*/React.createElement(Navbar.TopRightMenu, null, /*#__PURE__*/React.createElement(TopRightMenu, {
    showContentOnly: showContentOnly,
    authenticated: false
  }))), /*#__PURE__*/React.createElement(AppSectionContainer, null, !sideMenu && /*#__PURE__*/React.createElement(React.Fragment, null, children), sideMenu && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar.TopForSideMenu, null, /*#__PURE__*/React.createElement(TopRightMenu, {
    showContentOnly: showContentOnly,
    authenticated: false
  })), /*#__PURE__*/React.createElement(AppSectionContainer.ForSideMenu, null, /*#__PURE__*/React.createElement(React.Fragment, null, children)), /*#__PURE__*/React.createElement(AppFooterContainer, null, /*#__PURE__*/React.createElement(AppFooter, null)))), !sideMenu && /*#__PURE__*/React.createElement(AppFooterContainer, null, /*#__PURE__*/React.createElement(AppFooter, null)));
};
const AppMainInner = _ref6 => {
  let {
    children
  } = _ref6;
  // const location = useLocation();
  // if (debug) console_debug_log("App | location:", location);
  const {
    currentUser
  } = useUser();
  const {
    state,
    setState,
    menuOptions,
    setMenuOptions,
    sideMenu,
    setSideMenu,
    isMobileMenuOpen,
    componentMap
  } = useAppContext();
  const showContentOnly = getShowContentOnly();
  const stateHandler = () => {
    logoutHander();
  };
  React.useEffect(() => {
    // Load menus from JSON configurations
    if (currentUser) {
      getMenuFromApi(state, setState, setMenuOptions);
    }
  }, [currentUser, state]);
  if (showContentOnly) {
    return /*#__PURE__*/React.createElement(AppMainInnerUnauthenticated, null, children);
  }
  return /*#__PURE__*/React.createElement(MainContainer, null, /*#__PURE__*/React.createElement(AppNavBar, null, /*#__PURE__*/React.createElement(Navbar.TopCenterMenu, null, /*#__PURE__*/React.createElement(GenericMenuBuilder, {
    itemType: sideMenu ? "side_menu" : "top_menu"
  }), sideMenu && isMobileMenuOpen && currentUser && /*#__PURE__*/React.createElement(GenericMenuBuilder, {
    title: currentUser.firstName,
    itemType: "hamburger",
    showContentOnly: showContentOnly,
    mobileMenuMode: true
  })), !sideMenu && /*#__PURE__*/React.createElement(TopRightMenu, {
    showContentOnly: showContentOnly
  })), /*#__PURE__*/React.createElement(AppSectionContainer, null, /*#__PURE__*/React.createElement(React.Fragment, null, !sideMenu && /*#__PURE__*/React.createElement(AppMainComponent, {
    stateHandler: stateHandler,
    showContentOnly: showContentOnly
  }, children), sideMenu && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar.TopForSideMenu, null, /*#__PURE__*/React.createElement(TopRightMenu, {
    showContentOnly: showContentOnly
  })), /*#__PURE__*/React.createElement(AppSectionContainer.ForSideMenu, null, /*#__PURE__*/React.createElement(AppMainComponent, {
    stateHandler: stateHandler,
    showContentOnly: showContentOnly
  }, children)), /*#__PURE__*/React.createElement(AppFooterContainer, null, /*#__PURE__*/React.createElement(AppFooter, null))))), /*#__PURE__*/React.createElement(Navbar.MobileMenu, null, /*#__PURE__*/React.createElement(GenericMenuBuilder, {
    itemType: "mobile_menu"
  }), currentUser && /*#__PURE__*/React.createElement(GenericMenuBuilder, {
    title: currentUser.firstName,
    itemType: "hamburger",
    showContentOnly: showContentOnly,
    mobileMenuMode: true
  })), !sideMenu && /*#__PURE__*/React.createElement(AppFooterContainer, null, /*#__PURE__*/React.createElement(AppFooter, null)));
};
const AppMainComponent = _ref7 => {
  let {
    stateHandler,
    showContentOnly,
    children
  } = _ref7;
  // const location = useLocation();
  // if (debug) console_debug_log("AppMainComponent | location:", location);
  const {
    state,
    menuOptions,
    currentUser
  } = useAppContext();
  if (state !== "") {
    if (showContentOnly) {
      return /*#__PURE__*/React.createElement(CloseButton, null, getErrorMessage(state));
    }
    return errorAndReEnter(state, null, true, null, stateHandler, false, false);
  }
  if (!menuOptions) {
    return /*#__PURE__*/React.createElement("div", {
      className: LOGIN_BUTTON_IN_APP_COMPONENT_CLASS
    }, /*#__PURE__*/React.createElement(GsButton, {
      as: reactRouterDom.Link,
      to: getPrefix() + '/login'
    }, "Login"));
  }
  return children;
};
const AppMain = () => {
  const {
    currentUser,
    registerUser
  } = useUser();
  const {
    state,
    setState,
    menuOptions,
    setMenuOptions,
    componentMap,
    setExpanded
  } = useAppContext();
  const [router, setRouter] = React.useState(getDefaultRoutes(currentUser, componentMap, setExpanded));
  React.useEffect(() => {
    verifyCurrentUser(registerUser);
  }, []);
  React.useEffect(() => {
    // Load menus from JSON configurations
    if (currentUser) {
      getMenuFromApi(state, setState, setMenuOptions);
    }
  }, [currentUser, state]);
  React.useEffect(() => {
    if (menuOptions) {
      setRouter(getRoutes(currentUser, menuOptions, componentMap, setExpanded));
    }
  }, [menuOptions]);
  if (hasHashRouter) {
    return /*#__PURE__*/React.createElement(reactRouterDom.HashRouter, null, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GetHashRoutes, {
      routes: router
    })));
  }
  return /*#__PURE__*/React.createElement(reactRouterDom.RouterProvider, {
    router: reactRouterDom.createBrowserRouter(router),
    history: history
  });
};
const defaultComponentMap = {
  "Users_EditorData": Users_EditorData,
  "GeneralConfig_EditorData": GeneralConfig_EditorData,
  "UserProfileEditor": UserProfileEditor,
  // "Chatbot": ChatBot,
  "HomePage": HomePage,
  "LoginPage": LoginPage,
  "About": About,
  "AboutBody": AboutBody,
  "AppFooter": AppFooter,
  "AppMainInner": AppMainInner,
  "AppMainInnerUnauthenticated": AppMainInnerUnauthenticated,
  "NoDesignComponent": NoDesignComponent,
  "logout": logoutHander,
  "defaultTheme": defaultTheme
};
const App = _ref8 => {
  let {
    componentMap = {},
    appLogo = "",
    appLogoHeader = ""
  } = _ref8;
  const componentMapFinal = mergeDicts(componentMap, defaultComponentMap);
  return /*#__PURE__*/React.createElement(UserProvider, null, /*#__PURE__*/React.createElement(AppProvider, {
    globalComponentMap: componentMapFinal,
    globalAppLogo: appLogo,
    globalAppLogoHeader: appLogoHeader
  }, /*#__PURE__*/React.createElement(AppMain, null)));
};

const convertHeight = (height, height_unit, target_unit) => {
  if (height_unit === null || height_unit === '' || height_unit === MSG_SELECT_AN_OPTION || target_unit === null || target_unit === '' || target_unit === MSG_SELECT_AN_OPTION) {
    return 0;
  }
  if (height_unit === target_unit) {
    return height;
  }
  if (height_unit === 'cm' && target_unit === 'm') {
    return height / 100;
  }
  if (height_unit === 'm' && target_unit === 'cm') {
    return height * 100;
  }
  if (height_unit === 'i' && target_unit === 'm') {
    return height * 0.0254;
  }
  if (height_unit === 'm' && target_unit === 'i') {
    return height / 0.0254;
  }
  if (height_unit === 'i' && target_unit === 'cm') {
    return height * 2.54;
  }
  if (height_unit === 'cm' && target_unit === 'i') {
    return height / 2.54;
  }
  throw new Error(`Unsupported conversion from "${height_unit}" to "${target_unit}"`);
};
const convertWeight = (weight, weight_unit, target_unit) => {
  if (weight_unit === null || weight_unit === '' || weight_unit === MSG_SELECT_AN_OPTION || target_unit === null || target_unit === '' || target_unit === MSG_SELECT_AN_OPTION) {
    return 0;
  }
  if (weight_unit === target_unit) {
    return weight;
  }
  if (weight_unit === 'kg' && target_unit === 'lb') {
    return weight * 2.20462;
  }
  if (weight_unit === 'lb' && target_unit === 'kg') {
    return weight / 2.20462;
  }
  throw new Error(`Unsupported conversion from ${weight_unit} to ${target_unit}`);
};
const interpretString = str => {
  /*
   interprete un string, de tal forma que si es un numero, lo devuelva,
   si tiene solo letras (sin espacios), devuelve la cantidad de letras,
   y si no devuelva la cantidad de palabras sin contar las comas o los puntos.
   */
  if (!isNaN(str)) {
    return Number(str);
  }
  const words = str.replace(/[.,]/g, '').split(' ');
  if (words.length === 1) {
    return words[0].length;
  }
  return words.length;
};
const calculateAge = dateOfBirth => {
  const today = new Date();
  const birthDate = new Date(dateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || monthDifference === 0 && today.getDate() < birthDate.getDate()) {
    age--;
  }
  return age;
};
const convertCaloriesToUnit = function (calories, fromUnit) {
  let toUnit = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "kcal";
  const CALORIE_UNITS = {
    'kcal': 1,
    'kj': 0.239006
  };
  return parseFloat(calories) * CALORIE_UNITS[fromUnit] / CALORIE_UNITS[toUnit];
};

var conversions = /*#__PURE__*/Object.freeze({
  __proto__: null,
  calculateAge: calculateAge,
  convertCaloriesToUnit: convertCaloriesToUnit,
  convertHeight: convertHeight,
  convertWeight: convertWeight,
  interpretString: interpretString
});

const mediaSupported = () => {
  let mediaSupported = [];
  if (MediaRecorder.isTypeSupported('audio/mpeg')) {
    mediaSupported.push("mp3");
  }
  if (MediaRecorder.isTypeSupported('audio/webm; codecs=opus')) {
    mediaSupported.push("opus");
  }
  if (MediaRecorder.isTypeSupported('audio/webm')) {
    mediaSupported.push("webm");
  }
  if (MediaRecorder.isTypeSupported('audio/mp4')) {
    mediaSupported.push("mp4");
  }
  if (MediaRecorder.isTypeSupported('audio/wav')) {
    mediaSupported.push("wav");
  }
  return mediaSupported;
};
const getMediaTypeToRecord = () => {
  let options = {};
  let extension = null;

  // Check for MP3 support (less likely to be supported)
  if (MediaRecorder.isTypeSupported('audio/mpeg')) {
    options = {
      mimeType: 'audio/mpeg'
    };
    extension = "mp3";
  }
  // else if (MediaRecorder.isTypeSupported('audio/webm; codecs=opus')) {
  //     // Browser supports recording in Opus format within a WebM container
  //     // (apparently not suported by OpenAi Whisper)
  //     extension = "opus";
  // }
  else if (MediaRecorder.isTypeSupported('audio/webm')) {
    // Browser supports recording in WebM format
    extension = "webm";
  }
  // Check for MP4 support, e.g. iPhones (less likely to be supported)
  else if (MediaRecorder.isTypeSupported('audio/mp4')) {
    options = {
      mimeType: 'audio/mp4'
    };
    extension = "mp4";
  }
  // Alternatively, Check if the browser supports recording in WAV format
  else if (MediaRecorder.isTypeSupported('audio/wav')) {
    options = {
      mimeType: 'audio/wav'
    };
    extension = "wav";
  } else {
    // Browser does not support either format, use default settings
    // OpenAi Whisper supports:
    // ['flac', 'm4a', 'mp3', 'mp4', 'mpeg', 'mpga', 'oga', 'ogg', 'wav', 'webm']
    throw new Error('No audio extension supported');
  }
  return {
    extension: extension,
    options: options
  };
};

var media = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getMediaTypeToRecord: getMediaTypeToRecord,
  mediaSupported: mediaSupported
});

const PrivateRoute = _ref => {
  let {
    component: Component,
    ...rest
  } = _ref;
  return /*#__PURE__*/React.createElement(reactRouterDom.Route, _extends({}, rest, {
    render: props => {
      const {
        currentUser
      } = useUser();
      if (!currentUser) {
        console_debug_log('PrivateRoute Not Authorized...');
        // Not logged in so redirect to login page with the return url
        return /*#__PURE__*/React.createElement(reactRouterDom.Navigate, {
          to: {
            pathname: getPrefix() + '/login',
            state: {
              from: props.location
            }
          }
        });
      }
      // Authorized USER, so return component
      return /*#__PURE__*/React.createElement(Component, props);
    }
  }));
};

var PrivateRoute$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  PrivateRoute: PrivateRoute
});

// export function mockFetch(data: any, headers: any = null) {
function mockFetch(data) {
  let headers = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!headers) {
    headers = {
      'Content-Type': 'application/json'
    };
  }
  return jest.fn().mockImplementation(() => Promise.resolve({
    ok: true,
    json: () => data,
    headers: new Headers(headers),
    text: () => Promise.resolve(JSON.stringify(data)),
    status: 200,
    statusText: ''
  }));
}
function mockUserData() {
  return {
    codeFile: 'helpers/UserContext.jsx',
    response: {
      currentUser: {
        id: 'mockedUserId',
        firstName: 'Mocked firstName',
        token: 'Mocked token'
      },
      registerUser: () => null,
      unRegisterUser: () => null
    }
  };
}
function mockAuthService() {
  return {
    codeFile: 'services/authentication.service.jsx',
    response: {
      authenticationService: {
        currentUserValue: {
          token: 'Mocked token'
        }
      },
      // To fix the error: "TypeError: (0 , _authenticationService.getUserData) is not a function"
      getUserData: () => Promise.resolve({
        error: false,
        error_message: null,
        resultset: {
          _id: 'mockedUserId',
          first_name: 'Mocked firstName',
          last_name: 'Mocked lastName',
          superuser: 0
        }
      }),
      getCurrentUserData: () => Promise.resolve({
        resultset: {
          error: false,
          error_message: null,
          resultset: {
            _id: 'mockedUserId',
            first_name: 'Mocked firstName',
            last_name: 'Mocked lastName',
            superuser: 0
          }
        }
      })
    }
  };
}
function mockDefaultComponentMap() {
  return {
    "defaultTheme": defaultTheme
  };
}

var mocks = /*#__PURE__*/Object.freeze({
  __proto__: null,
  mockAuthService: mockAuthService,
  mockDefaultComponentMap: mockDefaultComponentMap,
  mockFetch: mockFetch,
  mockUserData: mockUserData
});

// GenericCrudEditor UI components
const ShowAsDisabledField = _ref => {
  let {
    className = '',
    backgroundColor = null,
    children
  } = _ref;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: `${backgroundColor ?? DISABLE_FIELD_BACKGROUND_COLOR_CLASS} ${className}`
  }, children));
};

var generic_editor_rfc_ui = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ShowAsDisabledField: ShowAsDisabledField
});

// Components
// Images
// const appLogoEmblem = 'app_log_emblem.svg';
const appLogoCircle = 'app_logo_circle.svg';
const appLogoLandscape = 'app_logo_landscape.svg';

exports.About = About;
exports.AboutBody = AboutBody;
exports.App = App;
exports.AppContext = AppContext$1;
exports.AppFooter = AppFooter;
exports.GeneralConfig = GeneralConfig;
exports.GeneralConfig_EditorData = GeneralConfig_EditorData;
exports.HomePage = HomePage;
exports.IconsLib = IconsLib;
exports.LoginPage = LoginPage;
exports.ModalPopUp = ModalPopUp$1;
exports.NavLib = NavLib;
exports.PrivateRoute = PrivateRoute$1;
exports.UserContext = UserContext$1;
exports.UserProfileEditor = UserProfileEditor;
exports.Users = Users;
exports.UsersConfig = UsersConfig;
exports.UsersConfig_EditorData = UsersConfig_EditorData;
exports.UsersDbListPreRead = UsersDbListPreRead;
exports.UsersDbPreWrite = UsersDbPreWrite;
exports.UsersPasswordValidations = UsersPasswordValidations;
exports.UsersProfile_EditorData = UsersProfile_EditorData;
exports.UsersValidations = UsersValidations;
exports.Users_EditorData = Users_EditorData;
exports.appConstants = app_constants;
exports.appLogoCircle = appLogoCircle;
exports.appLogoLandscape = appLogoLandscape;
exports.authHeader = authHeader$1;
exports.authenticationService = authentication_service;
exports.blobFilesUtilities = blob_files_utilities;
exports.classNameConstants = class_name_constants;
exports.conversions = conversions;
exports.dateTimestamp = dateTimestamp;
exports.dbService = db_service;
exports.dictUtilities = dictUtilities;
exports.errorAndReenter = errorAndReenter;
exports.generalConstants = general_constants;
exports.genericEditorRfcCommon = generic_editor_rfc_common;
exports.genericEditorRfcFormpage = generic_editor_rfc_formpage;
exports.genericEditorRfcProvider = generic_editor_rfc_provider;
exports.genericEditorRfcSearch = generic_editor_rfc_search;
exports.genericEditorRfcSearchEngineButton = generic_editor_rfc_search_engine_button;
exports.genericEditorRfcSelector = generic_editor_rfc_selector;
exports.genericEditorRfcService = generic_editor_rfc_service;
exports.genericEditorRfcSpecificFunc = generic_editor_rfc_specific_func;
exports.genericEditorRfcSuggestionDropdown = generic_editor_rfc_suggestion_dropdown;
exports.genericEditorRfcTimestamp = generic_editor_rfc_timestamp;
exports.genericEditorRfcUi = generic_editor_rfc_ui;
exports.genericEditorSinglepage = generic_editor_singlepage;
exports.genericEditorUtilities = generic_editor_utilities;
exports.genericMenuService = generic_menu_service;
exports.history = history$1;
exports.jsonUtilities = jsonUtilities;
exports.loggingService = logging_service;
exports.logoutService = logout_service;
exports.media = media;
exports.ramdomize = ramdomize;
exports.responseHandlersService = response_handlers_service;
exports.testHelpersMocks = mocks;
exports.ui = ui;
exports.urlParams = urlParams;
exports.waitAnimationUtility = wait_animation_utility;
//# sourceMappingURL=index.js.map
