import React, { useContext, createContext, useReducer, useCallback, useEffect, useMemo, useState, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import { createBrowserHistory } from 'history';
import { Link, Routes, Route, HashRouter, RouterProvider, createBrowserRouter, Navigate } from 'react-router-dom';
import { Buffer } from 'buffer';
import { BehaviorSubject } from 'rxjs';
import axios, { AxiosError } from 'axios';
import { ObjectId } from 'bson';
import { md5 } from 'js-md5';
import { useFormikContext, Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useCombobox } from 'downshift';

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
const APP_SECTION_CONTAINER_FOR_TOP_MENU_CLASS = "grow appSectionContainerForTopMenuClass";
const APP_SECTION_CONTAINER_FOR_SIDE_MENU_CLASS = "grow flex flex-col appSectionContainerForSideMenuClass";
const APP_SECTION_CONTAINER_FOR_SIDE_MENU_MAIN_CLASS = "grow appSectionContainerForSideMenuMainClass";
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
const NAVBAR_BRAND_NAME_CLASS = "text-2xl ml-2 font-bold navbarBrandNameClass";
const NAVBAR_BRAND_APP_VERSION_CLASS = "text-xs navbarBrandAppVersionClass";
const NAVBAR_BRAND_APP_LOGO_CLASS = "mx-auto my-0 navbarBrandAppLogoClass";
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
const NAV_LINK_BUTTON_TOP_MENU_CLASS = "rounded-sm p-1 flex items-center navLinkButtonsTopMenuClass";
const NAV_LINK_BUTTON_HAMBURGER_CLASS = "block py-1 navLinkButtonsHamburgerClass";
const NAV_LINK_BUTTON_SIDE_MENU_CLASS = "py-2 px-2 rounded-sm navLinkButtonsSideMenuClass";
const NAV_LINK_BUTTON_MOBILE_MENU_CLASS = "1-w-full 1-text-left 1-flex 1-justify-between 1-items-center py-2 px-2 rounded-sm navLinkButtonsMobileMenuClass";
const NAV_LINK_ICON_CLASS = "w-8 h-8 navLinkIconClass";
const ROUNDED_ICON_CLASS = "rounded-full roundedIconClass";
const ML2_ICON_CLASS = "ml-2 overflow-visible";
const STROKE_WHITE_ICON_CLASS = "stroke-white";
const VERTICAL_SLIDER_ICON_CLASS = "h-8 w-1.5 rounded-full bg-slate-400";
const NAV_DROPDOWN_TOP_DIV_TOP_MENU_CLASS = "relative group navDropdownTopDivTopMenuClass";
const NAV_DROPDOWN_TOP_DIV_HAMBURGER_CLASS = "block relative group navDropdownTopDivHamburgerClass";
const NAV_DROPDOWN_TOP_DIV_SIDE_MENU_CLASS = "1-space-x-4 navDropdownTopDivSideMenuClass";
const NAV_DROPDOWN_TOP_DIV_MOBILE_MENU_CLASS = "1-space-y-2 navDropdownTopDivMobileMenuClass";
const NAV_DROPDOWN_INNER_DIV_TOP_MENU_CLASS = "absolute hidden z-50 bg-white text-gray-800 p-2 rounded-sm shadow-lg navDropdownInnerDivTopMenuClass";
const NAV_DROPDOWN_INNER_DIV_HAMBURGER_CLASS = "absolute right-0 hidden z-50 1-group-hover:block bg-white text-gray-800 p-2 rounded-sm shadow-lg navDropdownInnerDivHamburgerClass";
const NAV_DROPDOWN_INNER_DIV_SIDE_MENU_CLASS = "ml-2 space-y-2 navDropdownInnerDivSideMenuClass";
const NAV_DROPDOWN_INNER_DIV_MOBILE_MENU_CLASS = "ml-2 space-y-2 navDropdownInnerDivMobileMenuClass";
const NAV_DROPDOWN_BUTTON_TOP_MENU_CLASS = "rounded-sm p-1 flex items-center navDropdownButtonTopMenuClass";
const NAV_DROPDOWN_BUTTON_HAMBURGER_CLASS = "rounded-sm p-2 block py-1 flex items-center navDropdownButtonHamburgerClass";
const NAV_DROPDOWN_BUTTON_SIDE_MENU_CLASS = "1-w-full text-left flex justify-between items-center py-2 px-2 rounded-sm navDropdownButtonSideMenuClass";
const NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS = "1-w-full text-left flex justify-between items-center py-2 px-2 rounded-sm navDropdownButtonMobileMenuClass";
const NAV_DROPDOWN_IMAGE_TOP_MENU_CLASS = "navDropdownImageTopMenuClass";
const NAV_DROPDOWN_IMAGE_HAMBURGER_CLASS = "navDropdownImageHamburgerClass";
const NAV_DROPDOWN_IMAGE_SIDE_MENU_CLASS = "navDropdownImageSideMenuClass";
const NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS = "h-4 w-4 transform transition-transform navDropdownImageMobileMenuClass";
const NAV_DROPDOWN_ITEM_TOP_DIV_TOP_MENU_CLASS = "block py-1 navDropdownItemTopDivTopMenuClass";
const NAV_DROPDOWN_ITEM_TOP_DIV_HAMBURGER_CLASS = "block py-1 navDropdownItemTopDivHamburgerClass";
const NAV_DROPDOWN_ITEM_TOP_DIV_SIDE_MENU_CLASS = "block rounded-sm navDropdownItemTopDivSideMenuClass";
const NAV_DROPDOWN_ITEM_TOP_DIV_MOBILE_MENU_CLASS = "block rounded-sm navDropdownItemTopDivMobileMenuClass";
const NAV_DROPDOWN_ITEM_BUTTON_TOP_MENU_CLASS = "rounded-sm px-2 flex items-center navDropDownItemButtonsTopMenuClass";
const NAV_DROPDOWN_ITEM_BUTTON_HAMBURGER_CLASS = "rounded-sm block px-2 navDropDownItemButtonsHamburgerClass";
const NAV_DROPDOWN_ITEM_BUTTON_SIDE_MENU_CLASS = "rounded-sm px-2 py-2 navDropDownItemButtonsSideMenuClass";
const NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS = "1-w-full 1-text-left 1-flex 1-justify-between 1-items-center rounded-sm py-2 px-2 navDropDownItemButtonsMobileMenuClass";

// Alert messages and message boxes

const ALERT_BASE_CLASS = "1-relative p-3 border border-transparent rounded-sm alertBaseClass";
const ALERT_DANGER_CLASS = "".concat(ALERT_BASE_CLASS, " text-red-800 bg-red-100 border-red-200 alertDangerClass");
const ALERT_WARNING_CLASS = "".concat(ALERT_BASE_CLASS, " text-yellow-800 bg-yellow-100 border-yellow-200 alertWarningClass");
const ALERT_INFO_CLASS = "".concat(ALERT_BASE_CLASS, " text-cyan-800 bg-cyan-100 border-cyan-200 alertInfoClass");
const ALERT_SUCCESS_CLASS = "".concat(ALERT_BASE_CLASS, " text-green-800 bg-green-100 border-green-200 alertSuccessClass");
const ERROR_MSG_CLASS = "".concat(ALERT_DANGER_CLASS, " mt-4 p-2 rounded-md errorMsgClass");
const WARNING_MSG_CLASS = "".concat(ALERT_WARNING_CLASS, " mt-4 p-2 rounded-md warningMsgClass");
const INFO_MSG_CLASS = "".concat(ALERT_INFO_CLASS, " mt-4 mb-4 p-2 rounded-md flex justify-between align-middle infoMsgClass");
const INFO_MSG_BUTTON_CLASS = "rounded-full p-1 bg-gray-100 hover:bg-gray-200 transition-colors duration-200 text-gray-600 hover:text-gray-800 infoMsgButtonClass";
const SUCCESS_MSG_CLASS = "".concat(ALERT_SUCCESS_CLASS, " mt-4 p-2 rounded-md successMsgClass");
const GRAY_BOX_MSG_CLASS = "".concat(ALERT_BASE_CLASS, " text-black bg-gray-200 mt-4 p-2 rounded-md grayBoxMsgClass");

// Forms

const FORM_GROUP_CLASS = "mb-4 formGroupClass";
const FORM_CONTROL_CLASS = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500 bg-white formControlClass";
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

const BUTTON_PRIMARY_CLASS = "bg-blue-500 text-white font-medium py-2 px-4 rounded-xl hover:bg-blue-600 focus:outline-hidden focus:ring-2 focus:ring-blue-500 buttonPrimaryClass";
const BUTTON_SECONDARY_CLASS = "bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-xl hover:bg-gray-400 focus:outline-hidden focus:ring-2 focus:ring-gray-500 buttonSecondaryClass";

// Special buttons

const BUTTON_COMPOSED_LABEL_CLASS = "flex items-center buttonComposedLabelClass";
const MENU_MODE_BUTTON_TOP_DIV_CLASS = "mt-1 menuModeButtonTopDivClass";
const DARK_MODE_BUTTON_TOP_DIV_CLASS = "mt-1 darkModeButtonTopDivClass";
const DARK_MODE_BUTTON_SVG_CLASS = "w-6 h-6 darkModeButtonSvgClass";
const DARK_MODE_BUTTON_DARK_HIDDEN_CLASS = "dark:hidden darkModeButtonDarkHiddenClass";
const DARK_MODE_BUTTON_DARK_INLINE_CLASS = "hidden dark:inline darkModeButtonDarkInlineClass";

// Generic CRUD editor (GCE_RFC) - BEGIN

// Listing page buttons (GCE_RFC)

const BUTTON_LISTING_CLASS = "bg-blue-500 text-white p-2 rounded-xl text-sm buttonListingClass";
const BUTTON_LISTING_DISABLED_CLASS = "".concat(BUTTON_LISTING_CLASS, " opacity-50 buttonListingDisabledClass");
const BUTTON_LISTING_NEW_CLASS = "".concat(BUTTON_LISTING_CLASS, " buttonListingNewClass");
const BUTTON_LISTING_REFRESH_CLASS = "".concat(BUTTON_LISTING_CLASS, " text-xs buttonListingRefreshClass");

// General app section (GCE_RFC)

const APP_GENERAL_MARGINS_CLASS = 'mt-2 mb-2 ml-2 mr-2 p-2 rounded-lg appGeneralMarginsClass';
const APP_TOP_DIV_CLASS = "".concat(APP_GENERAL_MARGINS_CLASS, " rounded-lg appTopDivClass");
const APP_LEVEL2_DIV_CLASS = "overflow-x-auto appLevel2DivClass";
const APP_TITLE_H1_CLASS = 'text-xl font-bold mb-4 appTitleH1Class';
const APP_TITLE_RECYCLE_BUTTON_CLASS = "pl-2 align-bottom appTitleRecycleButtonClass";
const APP_SIDE_MENU_BG_COLOR_CLASS = "bg-white dark:bg-gray-800 appSideMenuBgColorClass";

// Listing page (GCE_RFC)

const APP_LISTING_TABLE_CLASS = "w-full text-sm appListingTableClass";
const APP_LISTING_TABLE_HDR_THEAD_CLASS = "bg-white dark:bg-black appListingTableHdrTheadClass";
const APP_LISTING_TABLE_HDR_TR_CLASS = "appListingTableHdrTrClass";
const APP_LISTING_TABLE_HDR_TH_CLASS = "text-left p-2 appListingTableHdrThClass";
const APP_LISTING_TABLE_HRD_ACTIONS_COL_CLASS = 'appListingTableHrdActionsColClass';
const APP_LISTING_TABLE_BODY_TBODY_CLASS = "appListingTableBodyTbodyClass";
const APP_LISTING_TABLE_BODY_TR_ODD_CLASS = 'hover:bg-opacity-80 appListingTableBodyTrOddClass';
const APP_LISTING_TABLE_BODY_TR_EVEN_CLASS = 'hover:bg-opacity-80 appListingTableBodyTrEvenClass';
const APP_LISTING_TABLE_BODY_TR_ACTIONS_ODD_CLASS = 'appListingTableBodyTrActionsOddClass';
const APP_LISTING_TABLE_BODY_TR_ACTIONS_EVEN_CLASS = 'appListingTableBodyTrActionsEvenClass';
const APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS = "p-2 appListingTableBodyTdBaseOddClass";
const APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS = "p-2 appListingTableBodyTdBaseEvenClass";
const APP_LISTING_TABLE_BODY_TD_ODD_CLASS = "".concat(APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS, " break-words appListingTableBodyTdOddClass");
const APP_LISTING_TABLE_BODY_TD_EVEN_CLASS = "".concat(APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS, " break-words appListingTableBodyTdEvenClass");
const APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS = "".concat(APP_LISTING_TABLE_BODY_TD_BASE_ODD_CLASS, " bg-opacity-80 whitespace-nowrap text-sm space-x-2 appListingTableBodyTdActionsOddClass");
const APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS = "".concat(APP_LISTING_TABLE_BODY_TD_BASE_EVEN_CLASS, " bg-opacity-80 whitespace-nowrap text-sm space-x-2 appListingTableBodyTdActionsEvenClass");

// Listing page search box (GCE_RFC)

const APP_LISTING_SEARCH_BOX_TOP_DIV_CLASS = "flex items-center space-x-2 appListingSearchBoxTopDivClass";
const APP_LISTING_SEARCH_BOX_LABEL_CLASS = "mr-2 text-sm appListingSearchBoxLabelClass";
const APP_LISTING_SEARCH_BOX_INPUT_CLASS = "p-2 rounded-xl border border-gray-300 bg-white w-40 text-sm appListingSearchBoxInputClass";
const APP_LISTING_SEARCH_BOX_SUBMIT_BUTTON_CLASS = "".concat(BUTTON_LISTING_CLASS, " ml-2 mr-2 text-xs appListingSearchBoxSubmitButtonClass");
const APP_LISTING_SEARCH_BOX_STOP_BUTTON_CLASS = "".concat(BUTTON_LISTING_CLASS, " mr-2 text-xs appListingSearchBoxStopButtonClass");
const SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS = 'ml-2 searchEngineButtonTopDivClass';

// Listing page bottom toolbar (next and previous page, lines per page, search) (GCE_RFC)

const APP_LISTING_TOOLBAR_TOP_DIV_CLASS = "flex items-center mt-4 space-x-4 1-sm:space-y-0 appListingToolbarTopDivClass";
const APP_LISTING_TOOLBAR_TOP_DIV_WIDE_CLASS = "flex-row appListingToolbarTopDivWideClass";
const APP_LISTING_TOOLBAR_TOP_DIV_NOT_WIDE_CLASS = "flex-col appListingToolbarTopDivNotWideClass";
const APP_LISTING_TOOLBAR_PAGINATION_SECTION_CLASS = "text-sm flex items-center space-x-2 appListingToolbarPaginationSectionClass";
const APP_LISTING_TOOLBAR_PAGE_NUM_SECTION_CLASS = "text-sm flex items-center appListingToolbarPageNumSectionClass";
const APP_LISTING_TOOLBAR_ROW_PER_PAGE_SECTION_CLASS = "text-sm flex items-center appListingToolbarRowPerPageSectionClass";
const APP_LISTING_TOOLBAR_ROW_PER_PAGE_LABEL_CLASS = "mr-2 text-sm appListingToolbarRowPerPageLabelClass";
const APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS = "p-2 rounded-xl border border-gray-300 bg-white appListingToolbarRowPerPageInputClass";
const APP_LISTING_TOOLBAR_WAIT_ANIMATION_CLASS = "ml-3 mr-3 hidden appListingToolbarWaitAnimationClass";

// Data page (GCE_RFC)

const APP_FORMPAGE_LABEL_CLASS = "font-medium appFormPageLabelClass";
const APP_FORMPAGE_LABEL_REQUIRED_CLASS = "font-medium text-red-700 appFormPageLabelRequiredClass";
const APP_FORMPAGE_FORM_BUTTON_BAR_CLASS = "flex align-middle space-x-4 appFormPageFormButtonBarClass";
const APP_FORMPAGE_FIELD_CLASS = "flex flex-col ".concat(FORM_GROUP_CLASS, " appFormPageFieldClass");
const APP_FORMPAGE_FIELD_BASE_CLASS = "".concat(FORM_CONTROL_CLASS, " border border-gray-300 p-2 rounded-md focus:outline-hidden focus:ring-2 focus:ring-blue-500 appFormPageFieldBaseClass");
const APP_FORMPAGE_FIELD_GOOD_CLASS = "".concat(APP_FORMPAGE_FIELD_BASE_CLASS, " appFormPageFieldGoodClass");
const APP_FORMPAGE_FIELD_INVALID_CLASS = "".concat(APP_FORMPAGE_FIELD_BASE_CLASS, " is-invalid appFormPageFieldInvalidClass");
const APP_FORMPAGE_SPECIAL_BUTTON_DIV_CLASS = "align-middle flex appFormPageSpecialButtonDivClass";
const APP_FORMPAGE_CHILD_COMPONENTS_TOP_DIV_CLASS = "mt-6 appFormPageChildComponentsTopDivClass";

// Generic CRUD editor (GCE_RFC) - END

// Pop-ups

const POPUP_TOP_MARGIN_CLASS = "pt-4 popupTopMarginClass";

// ModalLib

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
const MODALIB_BUTTON_BASESTYLE_CLASS = 'px-4 py-2 border rounded-xl text-sm font-medium focus:outline-hidden focus:ring-2 focus:ring-offset-2 modalibButtonBaseStyleClass';
const MODALIB_BUTTON_BASESTYLE_WIDE_CLASS = 'flex-1 modalibButtonBaseStyleWideClass';
const MODALIB_BUTTON_BASESTYLE_NOT_WIDE_CLASS = 'w-full flex justify-center modalibButtonBaseStyleNotWideClass';
const MODALIB_BUTTON_PRIMARY_CLASS = "".concat(BUTTON_PRIMARY_CLASS, " modalibButtonPrimaryClass");
const MODALIB_BUTTON_SECONDARY_CLASS = "".concat(BUTTON_SECONDARY_CLASS, " modalibButtonSecondaryClass");
const MODALIB_BUTTON_SUCCESS_CLASS = 'bg-green-500 hover:bg-green-600 text-white focus:ring-green-400 modalibButtonSuccessClass';
const MODALIB_BUTTON_DANGER_CLASS = 'bg-red-500 hover:bg-red-600 text-white focus:ring-red-400 modalibButtonDangerClass';

// Login page

const LOGIN_PAGE_APP_LOGO_CLASS = "pb-4 mx-auto my-0 loginPageAppLogoClass";
const LOGIN_PAGE_EXTRA_PT = "pt-6 loginPageExtraPtClass";

// Login button

const LOGIN_BUTTON_IN_APP_COMPONENT_CLASS = "".concat(HORIZONTALLY_CENTERED_CLASS, " p-4 loginButtonInAppComponentClass");

// Components

const SUGGESTION_DROPDOWN_CLASS = "align-middle flex";

// Wait animation

const WAIT_ANIMATION_CLASS = "flex items-center justify-center waitAnimationClass";
const WAIT_ANIMATION_MARGIN_TOP_CLASS = "mt-3 waitAnimationWithMarginClass";
const WAIT_ANIMATION_ENABLED_CLASS = "ml-3 mr-3 waitAnimationEnabledClass";
const WAIT_ANIMATION_DISABLED_CLASS = "ml-3 mr-3 hidden waitAnimationDisabledClass";

// Markdown formatting (check renderMarkdownContent())

const MARKDOWN_P_CLASS = "my-2 markdown-p-class";
const MARKDOWN_BOLD_CLASS = "font-bold markdown-bold-class";
const MARKDOWN_ITALIC_CLASS = "italic markdown-italic-class";
const MARKDOWN_UNDERLINE_CLASS = "underline markdown-underline-class";

// AI Assistant and conversation pages

// Flexible input type text that grows according to its content (e.g. for the AI Assistant conversation)
const INPUT_FLEXIBLE_CLASS = "pl-1 pb-1 pt-1 pr-1 block w-full border border-gray-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500 rounded-md resize-none overflow-hidden inputFlexibleClass";

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
  INFO_MSG_BUTTON_CLASS: INFO_MSG_BUTTON_CLASS,
  INFO_MSG_CLASS: INFO_MSG_CLASS,
  INLINE_CLASS: INLINE_CLASS,
  INPUT_FLEXIBLE_CLASS: INPUT_FLEXIBLE_CLASS,
  INVALID_FEEDBACK_CLASS: INVALID_FEEDBACK_CLASS,
  IS_INVALID_CLASS: IS_INVALID_CLASS,
  LOGIN_BUTTON_IN_APP_COMPONENT_CLASS: LOGIN_BUTTON_IN_APP_COMPONENT_CLASS,
  LOGIN_PAGE_APP_LOGO_CLASS: LOGIN_PAGE_APP_LOGO_CLASS,
  LOGIN_PAGE_EXTRA_PT: LOGIN_PAGE_EXTRA_PT,
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
  STROKE_WHITE_ICON_CLASS: STROKE_WHITE_ICON_CLASS,
  SUCCESS_MSG_CLASS: SUCCESS_MSG_CLASS,
  SUGGESTION_DROPDOWN_CLASS: SUGGESTION_DROPDOWN_CLASS,
  TOP0_Z50_CLASS: TOP0_Z50_CLASS,
  VERTICALLY_CENTERED_CLASS: VERTICALLY_CENTERED_CLASS,
  VERTICAL_SLIDER_ICON_CLASS: VERTICAL_SLIDER_ICON_CLASS,
  VISIBLE_CLASS: VISIBLE_CLASS,
  WAIT_ANIMATION_CLASS: WAIT_ANIMATION_CLASS,
  WAIT_ANIMATION_DISABLED_CLASS: WAIT_ANIMATION_DISABLED_CLASS,
  WAIT_ANIMATION_ENABLED_CLASS: WAIT_ANIMATION_ENABLED_CLASS,
  WAIT_ANIMATION_MARGIN_TOP_CLASS: WAIT_ANIMATION_MARGIN_TOP_CLASS,
  WARNING_MSG_CLASS: WARNING_MSG_CLASS,
  defaultTheme: defaultTheme
});

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

// Navigation helpers to allow better testability by mocking these functions
// instead of direct window.location access which is non-configurable in JSDOM.

const getWindowLocationOrigin = () => window.location.origin;
const getWindowLocationHref = () => window.location.href;
const windowLocationReload = function () {
  let hardReload = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return window.location.reload(hardReload);
};
const setWindowLocationHref = url => {
  window.location.href = url;
};

var _process$env$REACT_AP;
const history = createBrowserHistory();
const hasHashRouter = (_process$env$REACT_AP = process.env.REACT_APP_HASH_ROUTER) !== null && _process$env$REACT_AP !== void 0 ? _process$env$REACT_AP : true;
const getUrlForRouter = url => {
  if (!url.startsWith('/')) {
    url = '/' + url;
  }
  return "".concat(hasHashRouter ? '/#' : '').concat(getPrefix()).concat(url);
};
function getPrefix() {
  let hardPrefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (hardPrefix) {
    var _process$env$REACT_AP2;
    const prefix = (_process$env$REACT_AP2 = process.env.REACT_APP_URI_PREFIX) !== null && _process$env$REACT_AP2 !== void 0 ? _process$env$REACT_AP2 : '';
    return "/".concat(prefix);
  }
  return '';
}
const setLastUrl = function () {
  let lastURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (!lastURL) {
    lastURL = getWindowLocationHref();
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

function _defineProperty(e, r, t) {
  return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
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
function ownKeys(e, r) {
  var t = Object.keys(e);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(e);
    r && (o = o.filter(function (r) {
      return Object.getOwnPropertyDescriptor(e, r).enumerable;
    })), t.push.apply(t, o);
  }
  return t;
}
function _objectSpread2(e) {
  for (var r = 1; r < arguments.length; r++) {
    var t = null != arguments[r] ? arguments[r] : {};
    r % 2 ? ownKeys(Object(t), true).forEach(function (r) {
      _defineProperty(e, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) {
      Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return e;
}
function _objectWithoutProperties(e, t) {
  if (null == e) return {};
  var o,
    r,
    i = _objectWithoutPropertiesLoose(e, t);
  if (Object.getOwnPropertySymbols) {
    var n = Object.getOwnPropertySymbols(e);
    for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
  }
  return i;
}
function _objectWithoutPropertiesLoose(r, e) {
  if (null == r) return {};
  var t = {};
  for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
    if (-1 !== e.indexOf(n)) continue;
    t[n] = r[n];
  }
  return t;
}
function _toPrimitive(t, r) {
  if ("object" != typeof t || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
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
      textarea.style.height = "".concat(maxOffsetHeight, "px");
    }
    // Set conversation height to make textarea to scroll up according its height
    const sectionViewportHeightInPx = sectionViewportHeight / 100 * viewportHeight;
    const conversationHeight = sectionViewportHeightInPx - textarea.clientHeight + textareaMinHeight;
    conversationObj.style.height = "".concat(conversationHeight, "px");
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
  if (!text || typeof text !== 'string') {
    return null;
  }
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
          rel: "noopener noreferrer",
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

const AppContext = /*#__PURE__*/createContext();
const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_APP_LOGO':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        appLogo: action.payload
      });
    case 'SET_APP_LOGO_HEADER':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        appLogoHeader: action.payload
      });
    case 'SET_COMPONENT_MAP':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        componentMap: action.payload
      });
    case 'SET_STATE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        state: action.payload
      });
    case 'SET_MENU_OPTIONS':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        menuOptions: action.payload
      });
    case 'SET_SIDE_MENU':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        sideMenu: action.payload
      });
    case 'TOGGLE_SIDE_MENU':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        sideMenu: !state.sideMenu
      });
    case 'SET_DARK_MODE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        isDarkMode: action.payload
      });
    case 'TOGGLE_DARK_MODE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        isDarkMode: !state.isDarkMode
      });
    case 'SET_MOBILE_MENU':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        isMobileMenuOpen: action.payload
      });
    case 'TOGGLE_MOBILE_MENU':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        isMobileMenuOpen: !state.isMobileMenuOpen
      });
    case 'SET_EXPANDED_MENUS':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        expandedMenus: action.payload
      });
    case 'SET_WIDE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        isWide: action.payload
      });
    default:
      return state;
  }
};
const AppProvider = _ref => {
  let {
    globalComponentMap,
    globalAppLogo = "",
    globalAppLogoHeader = "",
    children
  } = _ref;
  const initialState = {
    appLogo: globalAppLogo,
    appLogoHeader: globalAppLogoHeader,
    componentMap: globalComponentMap,
    errorState: "",
    // Error message
    state: "",
    // LOADING, ERROR, OK, TIMEOUT
    menuOptions: null,
    sideMenu: false,
    isDarkMode: false,
    isMobileMenuOpen: false,
    expandedMenus: [],
    isWide: isWindowWide()
  };
  const [appState, dispatch] = useReducer(appReducer, initialState);
  const theme = appState.isDarkMode ? appState.componentMap["defaultTheme"].dark : appState.componentMap["defaultTheme"].light;
  const setAppLogo = useCallback(payload => dispatch({
    type: 'SET_APP_LOGO',
    payload
  }), []);
  const setAppLogoHeader = useCallback(payload => dispatch({
    type: 'SET_APP_LOGO_HEADER',
    payload
  }), []);
  const setComponentMap = useCallback(payload => dispatch({
    type: 'SET_COMPONENT_MAP',
    payload
  }), []);
  const setErrorState = useCallback(payload => dispatch({
    type: 'SET_ERROR',
    payload
  }), []);
  const setState = useCallback(payload => dispatch({
    type: 'SET_STATE',
    payload
  }), []);
  const setMenuOptions = useCallback(payload => dispatch({
    type: 'SET_MENU_OPTIONS',
    payload
  }), []);
  const setSideMenu = useCallback(payload => dispatch({
    type: 'SET_SIDE_MENU',
    payload
  }), []);
  const setIsDarkMode = useCallback(payload => dispatch({
    type: 'SET_DARK_MODE',
    payload
  }), []);
  const setIsMobileMenuOpen = useCallback(payload => dispatch({
    type: 'SET_MOBILE_MENU',
    payload
  }), []);
  const setExpandedMenus = useCallback(payload => dispatch({
    type: 'SET_EXPANDED_MENUS',
    payload
  }), []);
  const setIsWide = useCallback(payload => dispatch({
    type: 'SET_WIDE',
    payload
  }), []);
  const toggleDarkMode = useCallback(() => dispatch({
    type: 'TOGGLE_DARK_MODE'
  }), []);
  const toggleSideMenu = useCallback(() => dispatch({
    type: 'TOGGLE_SIDE_MENU'
  }), []);
  const toggleMobileMenu = useCallback(() => dispatch({
    type: 'TOGGLE_MOBILE_MENU'
  }), []);
  const toggleSubmenu = useCallback((menuName, menuVisible) => {
    dispatch({
      type: 'SET_EXPANDED_MENUS',
      payload: menuVisible ? [menuName] : appState.expandedMenus.filter(item => item !== menuName)
    });
  }, [appState.expandedMenus]);
  const isComponent = useCallback(componentObj => {
    return String(componentObj).includes('component:');
  }, []);
  const setExpanded = useCallback(componentObj => {
    /* Close mobile menu if any option is clicked */
    if (document.getElementById("navbar-main-toggle") && appState.isMobileMenuOpen) {
      document.getElementById("navbar-main-toggle").click();
    }
    setExpandedMenus([]);
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
  }, [appState.isMobileMenuOpen, isComponent]);
  useEffect(() => {
    const resizer = resizeManager(() => {
      setIsWide(isWindowWide());
    });
    resizer.addListener();
    return () => resizer.removeListener();
  }, [setIsWide]);
  const contextValue = useMemo(() => _objectSpread2(_objectSpread2({}, appState), {}, {
    setAppLogo,
    setAppLogoHeader,
    setComponentMap,
    setErrorState,
    setState,
    setMenuOptions,
    setSideMenu,
    setIsDarkMode,
    setIsMobileMenuOpen,
    setExpandedMenus,
    setIsWide,
    theme,
    toggleDarkMode,
    toggleSideMenu,
    toggleMobileMenu,
    toggleSubmenu,
    setExpanded
  }), [appState, theme, setAppLogo, setAppLogoHeader, setComponentMap, setErrorState, setState, setMenuOptions, setSideMenu, setIsDarkMode, setIsMobileMenuOpen, setExpandedMenus, setIsWide, toggleDarkMode, toggleSideMenu, toggleMobileMenu, toggleSubmenu, setExpanded]);
  return /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: contextValue
  }, children);
};
const useAppContext = () => {
  return useContext(AppContext);
};

var AppContext$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  AppProvider: AppProvider,
  useAppContext: useAppContext
});

// IconsLib
const GsIcons = _ref => {
  var _selectedSvg$props$cl;
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
  Some vector icons thanks to: https://www.svgrepo.com/
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
  size = size !== null && size !== void 0 ? size : 'sm';
  if (typeof sizeData[size] === "undefined") {
    console.error("Invalid \"size\" *".concat(size, "*. Must be: 2xs, xs, sm, lg, xl, 2xl, 1x, 2x, 3x, 4x, 5x, 6x, 7x, 8x, 9x, or 10x"));
    return /*#__PURE__*/React.createElement(React.Fragment, null, "Invalid \"size\" *".concat(size, "*"));
  }
  const currentWidth = sizeData[size].width;
  const currentHeight = sizeData[size].height;
  let selectedSvg = null;
  switch (icon.toLowerCase()) {
    case 'arrow-down-small':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        width: "6",
        height: "3",
        className: ML2_ICON_CLASS + (className !== null && className !== void 0 ? className : '')
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
        className: ML2_ICON_CLASS + (className !== null && className !== void 0 ? className : '')
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
        // id="vertical-menu"
        id: "menu-dots-more",
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
        className: ROUNDED_ICON_CLASS + (className !== null && className !== void 0 ? className : ''),
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
        className: VERTICAL_SLIDER_ICON_CLASS + (className !== null && className !== void 0 ? className : '')
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
    case 'close':
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
    case 'error':
      selectedSvg = /*#__PURE__*/React.createElement("svg", {
        width: "24px",
        height: "24px",
        viewBox: "0 0 24 24",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg"
      }, /*#__PURE__*/React.createElement("g", {
        id: "style=linear"
      }, /*#__PURE__*/React.createElement("g", {
        id: "error-box"
      }, /*#__PURE__*/React.createElement("path", {
        id: "vector",
        d: "M2 8C2 4.68629 4.68629 2 8 2H16C19.3137 2 22 4.68629 22 8V16C22 19.3137 19.3137 22 16 22H8C4.68629 22 2 19.3137 2 16V8Z",
        stroke: "#000000",
        strokeWidth: "1.5"
      }), /*#__PURE__*/React.createElement("path", {
        id: "vector_2",
        d: "M9.00012 9L15.0001 15",
        stroke: "#000000",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }), /*#__PURE__*/React.createElement("path", {
        id: "vector_3",
        d: "M15 9L9 14.9999",
        stroke: "#000000",
        strokeWidth: "1.5",
        strokeLinecap: "round"
      }))));
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
    return /*#__PURE__*/React.createElement(React.Fragment, null, "Invalid Icon *".concat(icon, "*"));
  }
  let iconProps = {
    'data-icon': icon.toLowerCase(),
    'id': id,
    'className': (_selectedSvg$props$cl = selectedSvg.props.className) !== null && _selectedSvg$props$cl !== void 0 ? _selectedSvg$props$cl : className
  };
  if (selectedSvg.type === "svg") {
    var _selectedSvg$props$xm, _selectedSvg$props$wi, _selectedSvg$props$he, _selectedSvg$props$ro, _selectedSvg$props$al, _selectedSvg$props$ti;
    // iconProps['viewBox'] = "0 0 " + currentWidth + " " + currentHeight;
    iconProps['xmlns'] = (_selectedSvg$props$xm = selectedSvg.props.xmlns) !== null && _selectedSvg$props$xm !== void 0 ? _selectedSvg$props$xm : "http://www.w3.org/2000/svg";
    iconProps['width'] = (_selectedSvg$props$wi = selectedSvg.props.width) !== null && _selectedSvg$props$wi !== void 0 ? _selectedSvg$props$wi : currentWidth;
    iconProps['height'] = (_selectedSvg$props$he = selectedSvg.props.height) !== null && _selectedSvg$props$he !== void 0 ? _selectedSvg$props$he : currentHeight;
    iconProps['role'] = (_selectedSvg$props$ro = selectedSvg.props.role) !== null && _selectedSvg$props$ro !== void 0 ? _selectedSvg$props$ro : role;
    iconProps['alt'] = (_selectedSvg$props$al = selectedSvg.props.alt) !== null && _selectedSvg$props$al !== void 0 ? _selectedSvg$props$al : alt;
    iconProps['title'] = (_selectedSvg$props$ti = selectedSvg.props.title) !== null && _selectedSvg$props$ti !== void 0 ? _selectedSvg$props$ti : alt;
  }
  selectedSvg = /*#__PURE__*/React.cloneElement(selectedSvg, iconProps);
  return selectedSvg;
};

var IconsLib = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GsIcons: GsIcons
});

const UserContext = /*#__PURE__*/createContext();
const initialState$2 = {
  currentUser: null,
  askForLogin: false
};
const userReducer = (state, action) => {
  switch (action.type) {
    case 'REGISTER_USER':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        currentUser: action.payload
      });
    case 'UNREGISTER_USER':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        currentUser: null
      });
    case 'SET_ASK_FOR_LOGIN':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        askForLogin: action.payload
      });
    default:
      return state;
  }
};
const UserProvider = _ref => {
  let {
    children
  } = _ref;
  const [state, dispatch] = useReducer(userReducer, initialState$2);
  const setAskForLogin = newAskForLogin => {
    dispatch({
      type: 'SET_ASK_FOR_LOGIN',
      payload: newAskForLogin
    });
  };
  const registerUser = userData => {
    dispatch({
      type: 'REGISTER_USER',
      payload: userData
    });
    if (userData) {
      setAskForLogin(false);
    }
  };
  const unRegisterUser = () => {
    dispatch({
      type: 'UNREGISTER_USER'
    });
    setAskForLogin(true);
  };
  const currentUserValue = useMemo(() => ({
    currentUser: state.currentUser,
    registerUser,
    unRegisterUser,
    askForLogin: state.askForLogin,
    setAskForLogin
  }), [state.currentUser, registerUser, unRegisterUser, state.askForLogin, setAskForLogin]);
  return /*#__PURE__*/React.createElement(UserContext.Provider, {
    value: currentUserValue
  }, children);
};
const useUser = () => {
  return useContext(UserContext);
};

var UserContext$1 = /*#__PURE__*/Object.freeze({
  __proto__: null,
  UserProvider: UserProvider,
  useUser: useUser
});

const _excluded$3 = ["onClick"],
  _excluded2 = ["variant", "className", "as"];
const MainContainer = _ref => {
  let {
    children
  } = _ref;
  const {
    theme,
    sideMenu
  } = useAppContext();
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(sideMenu ? MAIN_CONTAINER_FOR_SIDE_MENU_CLASS : MAIN_CONTAINER_FOR_TOP_MENU_CLASS, " ").concat(theme.background, " ").concat(theme.text)
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
    className: "".concat(APP_FOOTER_CONTAINER_CLASS, " ").concat(theme.primary)
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
    className: "".concat(CENTERED_BOX_CONTAINER_DIV_2_CLASS, " ").concat(theme.contentBg)
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
        className: "".concat(NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_OPEN_CLASS, " ").concat(NAVBAR_HEADER_FOR_SIDE_MENU_CLASS, " ").concat(theme.secondary, " ").concat(theme.text)
      }, children);
    }
    if (isWide) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("nav", {
        id: "navbar-side-menu",
        className: "".concat(NAVBAR_HEADER_FOR_SIDE_MENU_MOBILE_CLOSE_CLASS, " ").concat(NAVBAR_HEADER_FOR_SIDE_MENU_CLASS, " ").concat(theme.secondary, " ").concat(theme.text)
      }, children), /*#__PURE__*/React.createElement(ToggleSideBar, {
        onClick: () => document.getElementById('navbar-side-menu').classList.toggle('hidden')
      }));
    }
    return null;
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(NAVBAR_HEADER_FOR_TOP_MENU_CLASS, " ").concat(theme.primary)
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
const MobileMenuCloseButton = _ref0 => {
  let {
    className
  } = _ref0;
  /* Mobile menu close button */
  const {
    toggleMobileMenu
  } = useAppContext();
  return /*#__PURE__*/React.createElement("button", {
    onClick: toggleMobileMenu,
    className: className !== null && className !== void 0 ? className : '' + NAVBAR_MOBILE_CLOSE_BUTTON_CLASS
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "x",
    size: "sm",
    className: NAVBAR_MOBILE_CLOSE_BUTTON_ICON_CLASS
  }));
};
const NavbarMobileMenu = _ref1 => {
  let {
    children
  } = _ref1;
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
    className: "".concat(NAVBAR_MOBILE_MENU_DIV_2_CLASS, " ").concat(theme.background, " ").concat(theme.text)
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
const NavbarText = _ref10 => {
  let {
    children,
    className
  } = _ref10;
  return /*#__PURE__*/React.createElement("div", {
    className: className !== null && className !== void 0 ? className : NAVBAR_TEXT_CLASS
  }, children);
};
const NavbarTopForSideMenu = _ref11 => {
  let {
    children,
    className
  } = _ref11;
  const {
    theme
  } = useAppContext();
  return /*#__PURE__*/React.createElement("header", {
    className: "".concat(NAVBAR_TOP_FOR_SIDE_MENU_CLASS, " ").concat(theme.primary)
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

const NavDropdown = _ref12 => {
  let {
    children,
    title,
    id,
    type,
    icon,
    mobileMenuMode
  } = _ref12;
  const {
    expandedMenus,
    toggleSubmenu,
    theme,
    isWide
  } = useAppContext();
  const fullId = "".concat(id, "_").concat(type);
  const isExpanded = expandedMenus.includes(fullId);
  const toggledropDownOpen = () => {
    toggleSubmenu(fullId, !isExpanded);
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
    top_menu: "".concat(NAV_DROPDOWN_BUTTON_TOP_MENU_CLASS, " ").concat(theme.textHoverTop),
    hamburger: "".concat(mobileMenuMode ? NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS : NAV_DROPDOWN_BUTTON_HAMBURGER_CLASS, " ").concat(mobileMenuMode ? theme.textHoverSide : theme.textHoverTop),
    side_menu: "".concat(NAV_DROPDOWN_BUTTON_SIDE_MENU_CLASS, " ").concat(theme.textHoverSide),
    mobile_menu: "".concat(NAV_DROPDOWN_BUTTON_MOBILE_MENU_CLASS, " ").concat(theme.textHoverSide)
  };
  const variantsSubmenuImage = {
    top_menu: NAV_DROPDOWN_IMAGE_TOP_MENU_CLASS,
    hamburger: mobileMenuMode ? NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS : NAV_DROPDOWN_IMAGE_HAMBURGER_CLASS,
    side_menu: NAV_DROPDOWN_IMAGE_SIDE_MENU_CLASS,
    mobile_menu: NAV_DROPDOWN_IMAGE_MOBILE_MENU_CLASS
  };
  useEffect(() => {
    const elementId = "".concat(fullId, "_dropDown");
    const element = document.getElementById(elementId);
    if (element) {
      if (isExpanded) {
        element.classList.remove('hidden');
      } else {
        element.classList.add('hidden');
      }
    }
  }, [isExpanded, fullId]);
  useEffect(() => {
    const elementId = "".concat(fullId, "_submenu_image");
    const element = document.getElementById(elementId);
    if (element) {
      if (isExpanded) {
        element.classList.add('rotate-90');
      } else {
        element.classList.remove('rotate-90');
      }
    }
  }, [isExpanded, fullId]);
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
    id: "".concat(fullId, "_button"),
    type: "button",
    onClick: toggledropDownOpen
  }, icon ? /*#__PURE__*/React.createElement(GsIcons, {
    icon: icon !== null && icon !== void 0 ? icon : '',
    size: "2xl",
    className: NAV_LINK_ICON_CLASS
  }) : title, /*#__PURE__*/React.createElement(GsIcons, {
    id: "".concat(fullId, "_submenu_image"),
    icon: directionImage,
    className: variantStyleSubmenuImage
  })), /*#__PURE__*/React.createElement("div", {
    className: variantStyleInnerDiv,
    id: "".concat(fullId, "_dropDown")
  }, expandedMenus.includes(fullId) && React.Children.map(children, child => {
    if (!child) {
      return null;
    }
    return /*#__PURE__*/React.cloneElement(child, {
      closeParent: () => toggleSubmenu(fullId, false)
    });
  })));
};
const NavDropdownItem = _ref13 => {
  let {
    children,
    as,
    to,
    onClick,
    reloadDocument,
    type,
    closeParent,
    mobileMenuMode
  } = _ref13;
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
    top_menu: "".concat(NAV_DROPDOWN_ITEM_BUTTON_TOP_MENU_CLASS, " ").concat(theme.textHoverTopSubMenu),
    hamburger: "".concat(mobileMenuMode ? NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS : NAV_DROPDOWN_ITEM_BUTTON_HAMBURGER_CLASS, " ").concat(mobileMenuMode ? theme.textHoverSide : theme.textHoverTopSubMenu),
    side_menu: "".concat(NAV_DROPDOWN_ITEM_BUTTON_SIDE_MENU_CLASS, " ").concat(theme.textHoverSide),
    mobile_menu: "".concat(NAV_DROPDOWN_ITEM_BUTTON_MOBILE_MENU_CLASS, " ").concat(theme.textHoverSide)
  };
  const variantStyleTopDiv = variantsTopDiv[type] || '';
  const variantStyleButton = variantsButton[type] || '';
  return /*#__PURE__*/React.createElement("div", {
    className: variantStyleTopDiv
  }, As && /*#__PURE__*/React.createElement(As, {
    className: variantStyleButton,
    to: to,
    onClick: e => {
      if (closeParent) closeParent();
      if (onClick) {
        onClick(e);
      }
    }
  }, children), !As && /*#__PURE__*/React.createElement("button", {
    className: variantStyleButton,
    onClick: e => {
      if (closeParent) closeParent();
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

const NavLink = _ref14 => {
  let {
    children,
    as,
    to,
    onClick,
    reloadDocument,
    type,
    mobileMenuMode
  } = _ref14;
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
    top_menu: "".concat(NAV_LINK_BUTTON_TOP_MENU_CLASS, "  ").concat(theme.textHoverTop),
    hamburger: "".concat(mobileMenuMode ? NAV_LINK_BUTTON_MOBILE_MENU_CLASS : NAV_LINK_BUTTON_HAMBURGER_CLASS, " ").concat(mobileMenuMode ? theme.textHoverSide : theme.textHoverTop),
    side_menu: "".concat(NAV_LINK_BUTTON_SIDE_MENU_CLASS, "  ").concat(theme.textHoverSide),
    mobile_menu: "".concat(NAV_LINK_BUTTON_MOBILE_MENU_CLASS, "  ").concat(theme.textHoverSide)
  };
  const variantStyleLi = variantsLi[type] || '';
  const variantStyleButton = variantsButton[type] || '';
  return /*#__PURE__*/React.createElement("div", {
    className: variantStyleLi
  }, /*#__PURE__*/React.createElement(As, {
    to: to,
    onClick: onClick,
    className: variantStyleButton
  }, children));
};
const Nav = NavbarTopCenterMenu;
Nav.Link = NavLink;

// Buttons

const ToggleSideBar = _ref15 => {
  var _props$className;
  let {
      onClick
    } = _ref15,
    props = _objectWithoutProperties(_ref15, _excluded$3);
  props.className = VERTICALLY_CENTERED_CLASS + " " + TOP0_Z50_CLASS + " " + ((_props$className = props.className) !== null && _props$className !== void 0 ? _props$className : '');
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick
  }, props), /*#__PURE__*/React.createElement(GsIcons, {
    icon: "vertical-slider"
  }));
};
const GsButton = _ref16 => {
  var _props$type;
  let {
      variant = 'primary',
      className = '',
      as = null
    } = _ref16,
    props = _objectWithoutProperties(_ref16, _excluded2);
  const variants = {
    primary: BUTTON_PRIMARY_CLASS,
    secondary: BUTTON_SECONDARY_CLASS
  };
  const variantStyle = variants[variant] || '';
  if (as) {
    var _ref17, _props$to;
    // https://stackoverflow.com/questions/42463263/wrapping-a-react-router-link-in-an-html-button
    const As = as;
    return /*#__PURE__*/React.createElement(As, _extends({
      to: (_ref17 = (_props$to = props.to) !== null && _props$to !== void 0 ? _props$to : props.href) !== null && _ref17 !== void 0 ? _ref17 : null,
      className: "".concat(variantStyle, " ").concat(className)
    }, props));
  }
  return /*#__PURE__*/React.createElement("button", _extends({
    type: (_props$type = props.type) !== null && _props$type !== void 0 ? _props$type : "button",
    className: "".concat(variantStyle, " ").concat(className)
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

const _excluded$2 = ["isWide", "variant", "className"];
const Button = _ref => {
  let {
      isWide,
      variant = 'primary',
      className = ''
    } = _ref,
    props = _objectWithoutProperties(_ref, _excluded$2);
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
    className: "".concat(baseStyle, " ").concat(variantStyle, " ").concat(className)
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
  useEffect(() => {
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
    className: "".concat(MODALIB_MODAL_DIV_2_CLASS, " ").concat(theme.contentBg, " ").concat(theme.text)
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
    className: (iconClassName !== null && iconClassName !== void 0 ? iconClassName : '') + " " + MODALIB_MODAL_ICON_2_CLASS
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
    className: "".concat(MODALIB_MODAL_FOOTER_CLASS, " ").concat(isWide ? MODALIB_MODAL_FOOTER_WIDE_CLASS : MODALIB_MODAL_FOOTER_NOT_WIDE_CLASS)
  }, children);
};
Modal.Header = ModalHeader;
Modal.Title = ModalTitle;
Modal.Body = ModalBody;
Modal.Footer = ModalFooter;
Modal.Icon = ModalIcon;
Modal.Button = Button;

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
  const [show, setShow] = useState(true);
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
  }), !link && htmlContent === null && children, !link && htmlContent !== null && /*#__PURE__*/React.createElement("div", {
    className: htmlContentClass
  }, renderMarkdownContent(htmlContent))), /*#__PURE__*/React.createElement(Modal.Footer, {
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
    as: Link,
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
    link: "".concat(getWindowLocationOrigin()).concat(hasHashRouter ? '/#' : '', "/about_body?menu=0")
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

const mergeDicts = (dictToAdd, originDict) => {
  if (!(typeof dictToAdd === 'object' && dictToAdd !== null)) {
    dictToAdd = {};
  }
  const dictToAddFinal = Object.entries(dictToAdd).reduce((acc, _ref) => {
    let [key, value] = _ref;
    acc[key] = value;
    return acc;
  }, _objectSpread2({}, originDict));
  return dictToAddFinal;
};

var dictUtilities = /*#__PURE__*/Object.freeze({
  __proto__: null,
  mergeDicts: mergeDicts
});

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

const MSG_ERROR_INVALID_TOKEN = ['A valid token is missing', 'Token is invalid', 'Session expired', 'HTTP 401', 'Request failed with status code 401'];
const MSG_ERROR_INVALID_CREDS = 'Invalid credentials. Please try again.';
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

const MSG_ERROR_MISSING_SUB_TYPE_PARAM = 'Incorrect "subType" parameter. It must be "array" or "table" for "child_listing" type. Current value: {editor.subType}';
const MSG_ERROR_MISSING_ARRAY_NAME_PARAM = 'Missing "array_name" parameter. It must be specified for subType "array".';
const MSG_ERROR_MISSING_ENDPOINT_KEY_NAMES_PARAM = 'Missing "endpointKeyNames" parameter. It must be specified for subType "{subType}".';
const MSG_ERROR_EMPTY_ENDPOINT_KEY_NAMES_PARAM = 'Empty "endpointKeyNames" parameter. It must be specified for subType "{subType}".';
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
const MSG_CLOSE = 'Close';
const MSG_IS_REQUIRED = 'is required';
const MSG_MUST_BE = 'must be';
const MSG_VALID_INTEGER = 'an integer number';
const MSG_VALID_NUMBER = 'a number';
const MSG_VALID_DATE = 'a valid date';
const MSG_VALID_EMAIL = 'a valid email address';
const MSG_ROWS_PER_PAGE = "Rows per page";

// Generic editor : default values

const ROWS_PER_PAGE = 30;

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
  MSG_CLOSE: MSG_CLOSE,
  MSG_DELETE_CONFIRM: MSG_DELETE_CONFIRM,
  MSG_DONE_CREATED: MSG_DONE_CREATED,
  MSG_DONE_DELETED: MSG_DONE_DELETED,
  MSG_DONE_UPDATED: MSG_DONE_UPDATED,
  MSG_ERROR_CLICK_TO_RELOGIN: MSG_ERROR_CLICK_TO_RELOGIN,
  MSG_ERROR_CLICK_TO_RETRY: MSG_ERROR_CLICK_TO_RETRY,
  MSG_ERROR_CONNECTION_FAIL: MSG_ERROR_CONNECTION_FAIL,
  MSG_ERROR_EMPTY_ENDPOINT_KEY_NAMES_PARAM: MSG_ERROR_EMPTY_ENDPOINT_KEY_NAMES_PARAM,
  MSG_ERROR_ID_NOT_FOUND: MSG_ERROR_ID_NOT_FOUND,
  MSG_ERROR_INVALID_CREDS: MSG_ERROR_INVALID_CREDS,
  MSG_ERROR_INVALID_TOKEN: MSG_ERROR_INVALID_TOKEN,
  MSG_ERROR_MISSING_ARRAY_NAME_PARAM: MSG_ERROR_MISSING_ARRAY_NAME_PARAM,
  MSG_ERROR_MISSING_ENDPOINT_KEY_NAMES_PARAM: MSG_ERROR_MISSING_ENDPOINT_KEY_NAMES_PARAM,
  MSG_ERROR_MISSING_SUB_TYPE_PARAM: MSG_ERROR_MISSING_SUB_TYPE_PARAM,
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
    "timezone": "America/New_York",
    "gce_rows_per_page": ROWS_PER_PAGE,
    "gce_actions_allows_mouse_over": process.env.REACT_APP_GCE_ACTIONS_ALLOW_MOUSE_OVER || "0",
    "gce_actions_allows_magic_button": process.env.REACT_APP_GCE_ACTIONS_ALLOW_MAGIC_BUTTON || "1"
  };
  lsDataDict = lsDataDict !== null && lsDataDict !== void 0 ? lsDataDict : {};
  // Merge defaultConfigData with lsDataDict
  return _objectSpread2(_objectSpread2({}, defaultConfigData), lsDataDict);
};
const saveLocalConfig = function (lsDataDict) {
  let lsItemName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  lsItemName = defaultItemName(lsItemName);
  // This allows to add configuration items individually
  const existingLocalConfig = getLocalConfig(lsItemName);
  lsDataDict = _objectSpread2(_objectSpread2({}, existingLocalConfig), lsDataDict);
  saveItemToLocalStorage(lsItemName, lsDataDict);
};
const getLocalConfig = function () {
  let lsItemName = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  lsItemName = defaultItemName(lsItemName);
  const lsDataDict = getItemFromLocalStorage(lsItemName);
  return buildConfigData(lsDataDict);
};
const getLocalConfigItem = lsItemName => {
  const localConfig = getLocalConfig();
  return localConfig[lsItemName];
};

const getCurrentUserFromLocalStorage = () => {
  // return JSON.parse(localStorage.getItem('currentUser'));
  return getItemFromLocalStorage('currentUser');
};
const currentUserSubject = new BehaviorSubject(getCurrentUserFromLocalStorage());
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
    console_debug_log("authHeader | ERROR: ".concat(error));
  }
  if (currentUser && currentUser.token) {
    if (process.env.REACT_APP_X_TOKEN) {
      return {
        'x-access-tokens': currentUser.token
      };
    } else {
      return {
        Authorization: "Bearer ".concat(currentUser.token)
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
  if (response.headers && typeof response.data !== 'undefined') {
    return handleResponseText(response, response.data, response.headers);
  }
  if (response.headers && response.response) {
    return handleResponseText(response, response.response, response.headers);
  }
  return response.text().then(text => {
    return handleResponseText(response, text, {});
  }, reason => {
    console.error(reason);
  });
}
function handleResponseText(response, text, headers) {
  let data = {};
  if (IsJsonString(text)) {
    data = text && JSON.parse(text);
  } else {
    if (typeof text === 'object') {
      // axios response is already a dict
      data = Object.assign({}, text);
    }
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
    if (typeof text === 'string') {
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
const get401ErrorMessage = (statusText, reasonDetail) => !statusText || statusText !== null && statusText !== void 0 && statusText.includes('Unauthorized') ? ['Could not verify [L3]', 'Could not verify [L2]', 'Inconsistency [L4]'].includes(reasonDetail) || String(reasonDetail ? reasonDetail : '').includes('inactive') ? MSG_ERROR_INVALID_CREDS : MSG_ERROR_SESSION_EXPIRED : statusText || reasonDetail;
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
      return "HTTP ".concat(error.status);
    });
    if (error.status === 401) {
      errorMsg = get401ErrorMessage(error.statusText, reasonDetail);
    } else {
      errorMsg = error.statusText;
    }
  } else if (error instanceof AxiosError) {
    /*
        code: "ERR_BAD_REQUEST"
        config: {transitional: {…}, adapter: Array(3), transformRequest: Array(1), transformResponse: Array(1), timeout: 0, …}
        message: "Request failed with status code 401"
        name: "AxiosError"
        request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 0, withCredentials: false, upload: XMLHttpRequestUpload, …}
        response: {data: 'Could not verify [L3]', status: 401, statusText: 'Unauthorized' or "", headers: AxiosHeaders, config: {…}, …}
        status: 401
        stack: "AxiosError: Request failed with status code 401\n    at settle (http://example-domain.com/node_modules/.vite/deps/axios.js?v=1eba938e:1257:12)\n ..."
    */
    possibleCORS = error.message.includes('CORS');
    if (error.status === 401) {
      var _error$response, _error$response2;
      errorMsg = get401ErrorMessage((_error$response = error.response) === null || _error$response === void 0 ? void 0 : _error$response.statusText, (_error$response2 = error.response) === null || _error$response2 === void 0 ? void 0 : _error$response2.data);
      reasonDetail = '';
    } else {
      var _error$response3;
      errorMsg = error.message;
      reasonDetail = (_error$response3 = error.response) === null || _error$response3 === void 0 ? void 0 : _error$response3.data;
    }
  } else {
    possibleCORS = error instanceof TypeError && error.message.includes('Failed to fetch');
    errorMsg = MSG_ERROR_CONNECTION_FAIL + (possibleCORS ? " (".concat(MSG_ERROR_POSSIBLE_CORS, ")") : '');
    reasonDetail = error;
  }
  return Promise.reject({
    error: true,
    message: errorMsg,
    reason: reasonDetail
  });
}
function IsJsonString(str) {
  if (typeof str !== 'string') {
    return false;
  }
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

const debug$3 = false;
const defaultFilenametoDownload = 'audio.wav';
const getFileExtension = filename => {
  const filenameWithoutQuery = filename ? filename.split('?')[0] : null;
  const fileExtension = filenameWithoutQuery ? filenameWithoutQuery.split('.').pop() : null;
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
const getContentTypeFromHeadersOrFilename = (headers, filename) => {
  const contentType = getHeadersContentType(headers);
  if (!contentType) {
    return getContentType(filename);
  }
  return contentType;
};
const getFilenameFromContentDisposition = headers => {
  // Example: attachment; filename="dccbd8f2900a4c7eb1035add851da72f.wav"
  const contentDisposition = headers.get('content-disposition');
  let filenameMatch = contentDisposition && contentDisposition.match(/filename="([^"]+)"/);
  if (!filenameMatch) {
    filenameMatch = contentDisposition && contentDisposition.match(/filename=([^"]+)/);
  }
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
  if (!headers || !headers.get || typeof headers.get('content-type') === 'undefined') {
    return null;
  }
  return headers.get('content-type');
};
const responseHasFile = headers => {
  const contentType = getHeadersContentType(headers);
  return contentType && (contentType === 'application/octet-stream' || contentType.includes('audio/') || contentType.includes('image/') || contentType.includes('video/') || contentType.includes('text/csv') || contentType.includes('text/text') // TODO: only to simulate AWS API Gateway
  );
};
const isBinaryFileType = function (filename) {
  let contentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  if (!contentType) {
    if (filename) {
      contentType = getContentType(filename);
    } else {
      console.error('isBinaryFileType | filename and contentType are null');
      return false;
    }
  }
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
const fixBlob = async function (blobObj, filename) {
  let headers = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  const headerContentType = getContentTypeFromHeadersOrFilename(headers, filename);
  const contentType = getContentType(filename);
  let blobUrl = null;
  try {
    blobUrl = URL.createObjectURL(blobObj);
    if (debug$3) ;
  } catch (e) {
    // 'Overload resolution failed' happens when axios is used (not with fetch)
    if (!e.message.includes('Overload resolution failed')) {
      return Promise.reject(e);
    }
  }
  if (blobUrl === null) {
    try {
      const binaryData = [];
      binaryData.push(blobObj);
      blobObj = new Blob(binaryData, {
        type: contentType
      });
      if (debug$3) ;
      blobUrl = URL.createObjectURL(blobObj);
      if (debug$3) ;
    } catch (e) {
      return Promise.reject(e);
    }
  }
  // if (!isBinaryFileType(filename, contentType)) {
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
      if (typeof reader.result !== 'string' || isBinaryFileType(filename, headerContentType)) {
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
  getContentTypeFromHeadersOrFilename: getContentTypeFromHeadersOrFilename,
  getFileExtension: getFileExtension,
  getFilenameFromContentDisposition: getFilenameFromContentDisposition,
  getHeadersContentType: getHeadersContentType,
  isBinaryFileType: isBinaryFileType,
  performDownload: performDownload,
  responseHasFile: responseHasFile
});

// Fetch/Axios utilities

// const https = require('https');

const debug$2 = false;
const useAxios = (process.env.REACT_APP_USE_AXIOS || "1") == "1";
const getAxios = (url, requestOptions) => {
  let response;
  const {
    method,
    body,
    headers
  } = requestOptions;
  let axios_config = {
    url: url,
    method: method,
    data: body,
    headers: headers
  };
  try {
    response = axios(axios_config).then(response => {
      let new_response;
      new_response = Object.assign({}, response);
      new_response.ok = [200, 201, 202, 204].includes(response.status);
      if (debug$2) ;
      if (!new_response.ok) {
        return Promise.reject(new_response);
      }
      const headers = response.headers;
      if (debug$2) ;
      if (responseHasFile(headers)) {
        const filename = getFilenameFromContentDisposition(headers);
        return fixBlob(response.data, filename, headers).then(text => {
          if (debug$2) ;
          return {
            headers,
            text,
            new_response
          };
        }, error => {
          if (debug$2) ;
          return Promise.reject(new_response);
        });
      } else {
        const text = response.data;
        if (debug$2) ;
        return {
          headers,
          text,
          new_response
        };
      }
    }).then(_ref => {
      let {
        headers,
        text,
        new_response
      } = _ref;
      if (debug$2) ;
      const data = {
        response: text,
        headers: headers,
        // Attach headers to the data object
        ok: new_response.ok,
        status: new_response.status,
        statusText: new_response.statusText
      };
      return data;
    }).then(handleResponse).catch(handleFetchError);
  } catch (error) {
    console.error('|| getAxios | Error:', error);
    response = Promise.resolve(handleFetchError(error));
  }
  return response;
};
const getFetch = (url, requestOptions) => {
  let response;
  try {
    if (usePlainFetch) ; else {
      response = fetch(url, requestOptions).then(response => {
        if (debug$2) ;
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
            return fixBlob(blob, filename, headers).then(text => {
              // "text" contains the blob URL...
              if (debug$2) ;
              return {
                headers,
                text,
                response
              };
            }, error => {
              if (debug$2) ;
              return Promise.reject(response);
            });
          });
        } else {
          // Process headers if needed here and the response text body
          return response.text().then(text => {
            if (debug$2) ;
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
        if (debug$2) ;
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
    response = Promise.resolve(handleFetchError(e));
  }
  return response;
};
const gsFetch = (url, requestOptions) => {
  if (useAxios) {
    return getAxios(url, requestOptions);
  }
  return getFetch(url, requestOptions);
};
const getBaseApiUrl = () => {
  const apiVersion = process.env.REACT_APP_API_VERSION || 'v1';
  return "".concat(process.env.REACT_APP_API_URL, "/").concat(apiVersion);
};

var fetch_utilities = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getAxios: getAxios,
  getBaseApiUrl: getBaseApiUrl,
  getFetch: getFetch,
  gsFetch: gsFetch,
  useAxios: useAxios
});

// ID Utilities


// Convert a MongoDB BSON _id to string
const convertId = id => {
  return id === null || id === '' || typeof id === 'string' ? id : id.$oid;
};

// Generate a new unique ObjectId
const generateNewIdObject = () => new ObjectId();

// To get the ID as a 24-character hexadecimal string (which is what's stored in the DB):
const newIdString = () => {
  const newId = generateNewIdObject();
  return newId.toHexString();
};

var id_utilities = /*#__PURE__*/Object.freeze({
  __proto__: null,
  convertId: convertId,
  generateNewIdObject: generateNewIdObject,
  newIdString: newIdString
});

// export const MULTIPART_FORM_DATA_HEADER = {'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'};
const MULTIPART_FORM_DATA_HEADER = {
  'Content-Type': 'multipart/form-data'
};
const useExposeHeaders = (process.env.REACT_APP_USE_EXPOSE_HEADERS || "0") == "1";
class dbApiService {
  constructor(props) {
    _defineProperty(this, "props", null);
    _defineProperty(this, "apiUrl", getBaseApiUrl());
    _defineProperty(this, "debug", false);
    this.props = props;
    const additionalHeaders = this.getAdditionalHeaders();
    this.props.authHeader = authHeader();
    this.props.authAndJsonHeader = Object.assign({}, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
      // https://stackoverflow.com/questions/43344819/reading-response-headers-with-fetch-api
      // IMPORTANT: this makes the frontend unresponsive when it's deployed on the cloud (AWS)
      // 'Access-Control-Allow-Headers': 'Content-Type, Content-Disposition',
    }, additionalHeaders, this.props.authHeader);
    if (this.debug) {
      console_debug_log('###===> dbApiService() | this.props:');
      console_debug_log(this.props);
    }
  }
  getAdditionalHeaders() {
    const headers = {};
    if (useExposeHeaders) {
      // [GS-15] This one should work to allow receive the headers sent by the Flask backend
      headers['Access-Control-Expose-Headers'] = 'Content-Disposition';
    }
    return headers;
  }
  paramsToUrlQuery(params) {
    let urlQuery = '';
    Object.entries(params).map(_ref => {
      let [key, value] = _ref;
      return urlQuery += (urlQuery === '' ? '?' : '&') + key + '=' + value;
    });
    return urlQuery;
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
    const url = "".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery);
    if (this.debug) {
      console_debug_log("###===> getAll() | ".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery));
    }
    return gsFetch(url, requestOptions);
  }
  getOne(params) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const requestOptions = _objectSpread2(_objectSpread2({}, options), {}, {
      method: 'GET',
      headers: this.props.authHeader
    });
    const urlQuery = this.paramsToUrlQuery(params);
    if (this.debug) {
      console_debug_log("###===> getOne() | ".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery));
    }
    const url = "".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery);
    return gsFetch(url, requestOptions);
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
      console_debug_log("###===> createRow() | ".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery));
    }
    return gsFetch("".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery), requestOptions);
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
      console_debug_log("###===> updateRow() | ".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery));
    }
    return gsFetch("".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery), requestOptions);
  }
  deleteRow(id, data) {
    let queryParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let urlQuery = this.paramsToUrlQuery(queryParams);
    if (id !== null) {
      urlQuery += (urlQuery === '' ? '?' : "&") + "id=".concat(id);
    }
    const requestOptions = {
      method: 'DELETE',
      headers: this.props.authAndJsonHeader,
      body: JSON.stringify(data)
    };
    if (this.debug) {
      console_debug_log("###===> deleteRow() | ".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery));
    }
    return gsFetch("".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery), requestOptions);
  }
  convertId(id) {
    return convertId(id);
  }
}

var db_service = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MULTIPART_FORM_DATA_HEADER: MULTIPART_FORM_DATA_HEADER,
  dbApiService: dbApiService
});

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
    apiUrl: getBaseApiUrl()
  };
  // FA-62 - FE: Find a replacement for btoa()
  const requestOptions = {
    method: 'POST',
    headers: {
      "Authorization": "Basic " + Buffer.from(username + ":" + password).toString('base64')
    }
  };
  return gsFetch("".concat(config.apiUrl, "/users/login"), requestOptions).then(res => {
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
    console_debug_log("ERROR: getUserData(".concat(userId, "):"));
    console.error(error);
    return {
      error: true,
      errorMsg: error
    };
  });
};
const getUserLocalData = res => {
  var _data$pref_side_menu, _data$pref_dark_mode;
  const data = res.resultset;
  const localConfig = getLocalConfig();
  return {
    id: convertId(data._id),
    // username: data.username,
    // email: data.email,
    firstName: data.firstname,
    // lastName: data.lastname,
    // token: data.token
    pref_side_menu: (_data$pref_side_menu = data.pref_side_menu) !== null && _data$pref_side_menu !== void 0 ? _data$pref_side_menu : localConfig.pref_side_menu,
    pref_dark_mode: (_data$pref_dark_mode = data.pref_dark_mode) !== null && _data$pref_dark_mode !== void 0 ? _data$pref_dark_mode : localConfig.pref_dark_mode
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
const verifyCurrentUser = (registerUser, currentUser, setAskForLogin) => {
  if (currentUser) {
    return;
  }
  if (authenticationService && typeof authenticationService.currentUserValue !== 'undefined' && authenticationService.currentUserValue) {
    getCurrentUserData().then(userData => {
      if (typeof userData.error !== 'undefined' && userData.error) {
        console.error("verifyCurrentUser() | userData.errorMsg:", userData.errorMsg);
        setAskForLogin(true);
      } else {
        registerUser(getUserLocalData(userData));
      }
    }, error => {
      setAskForLogin(true);
      console.error(error.errorMsg);
    });
  } else {
    setAskForLogin(true);
  }
};

/*
 * Get User Data cache
 */

let userDataCache = {};
const inFlightRequests = {};
const getUserDataCache = userId => {
  if (userDataCache[userId]) {
    return Promise.resolve(userDataCache[userId]);
  }
  if (inFlightRequests[userId]) {
    return inFlightRequests[userId];
  }
  const request = getUserData(userId).then(data => {
    delete inFlightRequests[userId];
    if (!data.error) {
      setUserDataCache(userId, data);
    }
    return data;
  }).catch(error => {
    delete inFlightRequests[userId];
    throw error;
  });
  inFlightRequests[userId] = request;
  return request;
};
const setUserDataCache = (userId, userData) => {
  userDataCache[userId] = Object.assign({}, userData);
};

var authentication_service = /*#__PURE__*/Object.freeze({
  __proto__: null,
  authenticationService: authenticationService,
  getCurrentUserData: getCurrentUserData,
  getUserData: getUserData,
  getUserDataCache: getUserDataCache,
  getUserLocalData: getUserLocalData,
  setUserDataCache: setUserDataCache,
  verifyCurrentUser: verifyCurrentUser
});

function logoutHander() {
  "".concat(getWindowLocationOrigin()).concat(getUrlForRouter('/login'));
  authenticationService.logout();
  {
    windowLocationReload(true);
  }
}
function refreshPage() {
  windowLocationReload();
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
    if (typeof error['reason'] !== 'undefined' && error['reason']) {
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
  const errorMessage = getErrorMessage(error) + (errorCode ? " ".concat(errorCode) : '');
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
    htmlContent: retryMessage,
    iconClassName: ALERT_DANGER_CLASS,
    closeButtonAction: closeHandler
  });
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
    return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement(Button, {
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
const getErrorDetail = errorRaw => {
  let errorDetails = null;
  if (typeof errorRaw["reason"] !== "undefined" && typeof errorRaw["reason"]["response"] !== "undefined" && typeof errorRaw["reason"]["response"]["data"] !== "undefined") {
    errorDetails = errorRaw["reason"]["response"]["data"];
  }
  return errorDetails;
};
const getErrorMsgFromApi = (errorObject, errorCode) => {
  let error = errorObject;
  if (errorObject.errorMsg) {
    error = errorObject.errorMsg;
  }
  if (errorObject.message) {
    error = errorObject.message;
  }
  if (!errorCode) {
    return error;
  }
  return error + '\n\n' + (errorCode.startsWith('[') ? '' : '[') + errorCode + (errorCode.endsWith(']') ? '' : ']');
};

var errorAndReenter = /*#__PURE__*/Object.freeze({
  __proto__: null,
  errorAndReEnter: errorAndReEnter,
  errorAndReEnterNonModal: errorAndReEnterNonModal,
  errorAndRetry: errorAndRetry,
  errorLoginAgain: errorLoginAgain,
  errorMessageDiv: errorMessageDiv,
  formatCaughtError: formatCaughtError,
  getErrorDetail: getErrorDetail,
  getErrorMessage: getErrorMessage,
  getErrorMsgFromApi: getErrorMsgFromApi,
  includesAppValidLinks: includesAppValidLinks,
  isSessionExpired: isSessionExpired,
  logoutHander: logoutHander,
  refreshPage: refreshPage
});

function getUrlParams() {
  let props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : window;
  /*
  Get query parameters / url parameters
   Example:
      const getUrlParams = gs.urlParams.getUrlParams;
      const urlParams = getUrlParams();
      noMenu = (urlParams.menu && urlParams.menu === "0"),
  */
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
          // Remove only the leading '?', do not split by other '?' inside values
          searchString = searchString.slice(1);
        } else if (searchString.indexOf('?') > -1) {
          // Remove everything after the first '?', do not split by other '?' inside values
          searchString = searchString.substring(searchString.indexOf('?') + 1);
        }
        if (searchString === '') {
          return urlParams;
        }
        let keyPairs = searchString.split("&");
        if (Array.isArray(keyPairs)) {
          for (let i = 0; i < keyPairs.length; i++) {
            const keyPairString = keyPairs[i];
            const [rawKey, ...rest] = keyPairString.split('=');
            let rawValue = rest.length > 0 ? rest.join('=') : '';
            // If this is the redirect param and it contains a hash (#),
            // treat the remainder of the query string as part of the value
            if (rawValue.includes('#') && i < keyPairs.length - 1) {
              const tail = keyPairs.slice(i + 1).join('&');
              rawValue = "".concat(rawValue, "&").concat(tail);
              // We consumed the rest
              i = keyPairs.length;
            }
            let key = rawKey;
            let value = rawValue;
            try {
              key = decodeURIComponent(rawKey.replace(/\+/g, ' '));
            } catch (_) {/* noop */}
            try {
              value = decodeURIComponent(rawValue.replace(/\+/g, ' '));
            } catch (_) {/* noop */}
            urlParams[key] = value;
          }
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
    console.log("getUrlParams ERROR | ".concat(props));
    console.error(error);
  }
  return urlParams;
}

var urlParams = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getUrlParams: getUrlParams
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
    // "|js|window.open(getWindowLocationOrigin() + '/#/about_body?menu=0', 'AppAboutPopUp','height=600,width=400')"
    if (onClickString.startsWith("|")) {
      const match = onClickString.match(jsPrefixToken);
      if (match) {
        const woOptions = typeof windowOpenObjs[match[1]] !== "undefined" ? windowOpenObjs[match[1]] : null;
        if (woOptions) {
          const windowOpenFn = woOptions => window.open("".concat(getWindowLocationOrigin()).concat(getUrlForRouter("/" + woOptions.url)), woOptions.name, woOptions.options);
          if (setExpanded) {
            resutlFunction = () => {
              setExpanded();
              windowOpenFn(woOptions);
              return getWindowLocationHref();
            };
          } else {
            resutlFunction = () => {
              windowOpenFn(woOptions);
              return getWindowLocationHref();
            };
          }
        } else {
          resutlFunction = () => {
            alert("ERROR: invalid onClick: ".concat(onClickString));
            return getWindowLocationHref();
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
  const title = topTitle == null ? item.title : "[".concat(topTitle, "]");
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
  return /*#__PURE__*/React.createElement(Routes, {
    id: "menuOptionsRoutes",
    history: history
  }, routes.map(item => {
    return /*#__PURE__*/React.createElement(Route, {
      key: item.key,
      path: item.path,
      exact: item.exact,
      element: item.element
    });
  }));
};
const editorRoute = (editor, itemDefs) => {
  var _editor$exact;
  return {
    key: itemDefs.title,
    exact: (_editor$exact = editor.exact) !== null && _editor$exact !== void 0 ? _editor$exact : routeExact,
    path: '/' + editor.baseUrl,
    element: editor.component,
    template: itemDefs.template,
    on_click_string: itemDefs.on_click_string
  };
};
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
      var _item$exact;
      resultRoute = {
        key: itemDefs["title"],
        exact: (_item$exact = item["exact"]) !== null && _item$exact !== void 0 ? _item$exact : routeExact,
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
          var _item$exact2;
          resultRoute = {
            key: itemDefs["title"],
            exact: (_item$exact2 = item["exact"]) !== null && _item$exact2 !== void 0 ? _item$exact2 : routeExact,
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
        error = "[GMB-GR-E030] ERROR - template not registered in \"componentMap\" | route.template: ".concat(route.template);
        console_debug_log(error);
        RouteTemplateComponent = componentMap["NoDesignComponent"];
      } else {
        RouteTemplateComponent = componentMap[route.template];
      }
    } else {
      RouteTemplateComponent = AppMainInner;
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
    as: Link,
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
    className: "".concat(ALERT_DANGER_CLASS, " ").concat(HORIZONTALLY_CENTERED_CLASS),
    role: "alert"
  }, children));
};
const InvalidRoute = () => {
  // Catch all invalid routes and redirect to a default page or show a not found component
  const {
    state
  } = useAppContext();
  if (state === "LOADING_MENU" || state === "") {
    return null;
  }
  return /*#__PURE__*/React.createElement(InvalidElement, null, "URL not found...");
};
const getMenuFromApi = function (setState, getErrorState, setErrorState, setMenuOptions) {
  let getMenuOptions = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : null;
  if (getErrorState() !== "" || getMenuOptions && getMenuOptions() !== null) {
    return;
  }
  setState("LOADING_MENU");
  const endpoint = "menu_options";
  const db = new dbApiService({
    url: endpoint
  });
  db.getAll().then(data => {
    setMenuOptions(data.resultset);
    setState("MENU_LOADED");
  }, error => {
    error = formatCaughtError(error);
    if (!getWindowLocationHref().includes("/login")) {
      setErrorState(error);
      setState("MENU_ERROR");
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
    errorState,
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
          as: Link,
          to: itemDefs["path"],
          onClick: itemDefs["on_click"],
          reloadDocument: itemDefs["reload"],
          type: itemType,
          mobileMenuMode: mobileMenuMode
        }, icon ? /*#__PURE__*/React.createElement(GsIcons, {
          icon: icon !== null && icon !== void 0 ? icon : '',
          size: "2xl",
          className: NAV_LINK_ICON_CLASS
        }) : itemDefs["title"]);
      }
      // Navigation dropdown (main menu item with sub-menus)
      const navDropdownId = "basic-nav-dropdown-".concat(item.title.replace(/ /g, '_'));
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
            console_debug_log("[GMB-GR-E020] subItem.element: ".concat(subItem.element));
            console_debug_log(error);
            return null;
          }
        }
        return /*#__PURE__*/React.createElement(NavDropdown.Item, {
          key: subItem.title,
          as: Link,
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
  if (errorState !== "" && itemType === "routes") {
    return /*#__PURE__*/React.createElement(DefaultRoutes, null);
  }
  if (errorState !== "") {
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

const DarkModeButton = () => {
  const {
    currentUser
  } = useUser();
  const {
    isDarkMode,
    setIsDarkMode,
    toggleDarkMode
  } = useAppContext();
  useEffect(() => {
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
  useEffect(() => {
    if (currentUser) {
      setIsDarkMode(currentUser.pref_dark_mode === '1');
    }
  }, [currentUser]);
  useEffect(() => {
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
  useEffect(() => {
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

const WaitAnimation = function () {
  let className = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "";
  return /*#__PURE__*/React.createElement("div", {
    className: WAIT_ANIMATION_CLASS + " " + className
  }, /*#__PURE__*/React.createElement("img", {
    src: WAIT_ANIMATION_IMG,
    alt: MSG_ALT_WAIT_ANIMATION
  }));
};
const ShowHideWaitAnimation = function (showAnimation) {
  let elementId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "nav_animation";
  let animationDiv = document.getElementById(elementId);
  if (animationDiv) {
    animationDiv.className = showAnimation ? WAIT_ANIMATION_ENABLED_CLASS : WAIT_ANIMATION_DISABLED_CLASS;
  }
};

var wait_animation_utility = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ShowHideWaitAnimation: ShowHideWaitAnimation,
  WaitAnimation: WaitAnimation
});

// MD5 Utilities

const getHash = text => {
  const hashedText = md5(text);
  console_debug_log("Hashing text: '".concat(text, "' -> '").concat(hashedText, "'"));
  return hashedText;
};

var md5_utilities = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getHash: getHash
});

const genericFuncArrayDefaultValue = function () {
  let data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  return {
    'error': false,
    'errorMsg': '',
    'fieldMsg': {},
    'fieldValues': _objectSpread2({}, data),
    'fieldsToDelete': [],
    'otherData': {}
  };
};
const reduceAllResponses = (responses, data) => {
  const defaultValues = genericFuncArrayDefaultValue(data);
  const responsesReduced = responses.reduce((acc, response) => {
    response = _objectSpread2(_objectSpread2({}, defaultValues), response);
    acc['error'] = acc['error'] || response['error'];
    acc['errorMsg'] += (acc['errorMsg'] !== '' && response['errorMsg'] !== '' ? ', ' : '') + response['errorMsg'];
    acc['fieldMsg'] = _objectSpread2(_objectSpread2({}, acc['fieldMsg']), response['fieldMsg']);
    // Merge fieldValues while preserving array values,
    // to prevent data losing when following fieldValues has same key but empty.
    // E.g. fieldValues["resultset"] may contains 'client_id' and 'client_secret' or another fields...
    // and following response may contains fieldValues["resultset"] = {}
    const mergedFieldValues = _objectSpread2({}, acc['fieldValues']);
    for (const [key, value] of Object.entries(response['fieldValues'])) {
      if (typeof mergedFieldValues[key] === 'object' && typeof value === 'object' && value !== null) {
        if (mergedFieldValues[key] === null) {
          mergedFieldValues[key] = {};
        }
        for (const [key2, value2] of Object.entries(value)) {
          mergedFieldValues[key][key2] = value2;
        }
        continue;
      }
      mergedFieldValues[key] = value;
    }
    acc['fieldValues'] = mergedFieldValues;
    acc['fieldsToDelete'] = [...acc['fieldsToDelete'], ...response['fieldsToDelete']];
    acc['otherData'] = _objectSpread2(_objectSpread2({}, acc['otherData']), response['otherData']);
    return _objectSpread2({}, acc);
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
      resp.fieldValues.resultset = Object.assign({}, data, replaceSpecialVars(editor.mandatoryFilters, currentUser));
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
const DATE_TIME_TAIL = "T00:00:00".concat(GMT_TAIL);
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
const addMissingTz = stringDate => String(stringDate) + (String(stringDate).indexOf('.') > 0 ? '' : GMT_TAIL);
const dateToTimestap = stringDate => new Date(addMissingTz(String(stringDate))).valueOf() / 1000;
const nowToTimestap = () => new Date().valueOf() / 1000;
const fixDateWithTz = dateTimeString => {
  dateTimeString = String(dateTimeString);
  switch (dateTimeString.length) {
    case 10:
      dateTimeString += DATE_TIME_TAIL;
      break;
    case 16:
      dateTimeString += ":00".concat(GMT_TAIL);
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
        return _objectSpread2({}, acc);
      }, row);
      return new_row;
    });
    resp.fieldValues.resultset = data;
    resolve(resp);
  });
};
const timestampDbPostRead = (dataRead, editor, action) => {
  return new Promise((resolve, reject) => {
    var _dataRead$resultset;
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
      return _objectSpread2({}, acc);
    }, editor.type == "child_listing" ? ((_dataRead$resultset = dataRead.resultset) === null || _dataRead$resultset === void 0 ? void 0 : _dataRead$resultset[0]) || {} : dataRead.resultset);
    resp.fieldValues.resultset = editor.type == "child_listing" ? [new_row] : new_row;
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
      return _objectSpread2({}, acc);
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
const setEndpointFilter = (parentData, editor) => {
  // Check inconsistencies: parentData isn't loaded yet or endpointKeyNames is not defined
  if (parentData === null || !editor.endpointKeyNames) {
    return editor;
  }
  // Check inconsistencies: parentData length
  if (parentData.length < editor.endpointKeyNames.length) {
    return editor;
  }
  // Set endpointFilter to retrieve the parent table item
  // containing the array of child items, or the child table items
  editor.endpointFilter = {};
  editor.endpointKeyNames.map(keyPair => editor.endpointFilter[keyPair.parameterName] = parentData[keyPair.parentElementName]);
  // IMPORTANT: endpointFilter and parentData
  // This is for editor.type = 'child_listing' / editor.subType = 'array' or 'table'
  // The component call must have the parentData={parentData} attribute
  // and eventually handleFormPageActions={handleFormPageActions}
  editor.parentData = parentData;
  return editor;
};
const getColumns = editor => {
  // Get columns fixed with default values
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
  // dbPreValidations: Validate data before show the Data Form.
  // If any error, shows the error message and prevents edition of the Data Form or deletion of the row.
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
  if (typeof editor.mandatoryFilters == 'undefined') {
    editor.mandatoryFilters = {};
  } else {
    editor.dbListPreRead.push(mandatoryFiltersDbListPreRead);
    editor.dbPreRead.push(mandatoryFiltersDbPreRead);
  }

  // User ID filter
  if (typeof editor.userIdFilter == 'undefined') {
    editor.userIdFilter = false;
  }
  if (editor.userIdFilter) {
    editor.mandatoryFilters.userId = currentUser.id;
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
  // Endpoint Key Names, for child listing
  if (typeof editor.endpointKeyNames == 'undefined') {
    if (typeof editor.parentKeyNames != 'undefined') {
      editor.endpointKeyNames = editor.parentKeyNames;
      console.error("DEPRECATED: parentKeyNames is deprecated. Use endpointKeyNames instead. It will be removed in a future version.");
    } else {
      editor.endpointKeyNames = [];
    }
  }

  // Array name for the 'array' subType child listing. These elements are inside a real table.
  let subTypeError = false;
  if (editor.subType === 'array') {
    if (typeof editor.array_name == 'undefined') {
      subTypeError = true;
      editor.error = MSG_ERROR_MISSING_ARRAY_NAME_PARAM; // Missing "array_name" parameter. It must be specified for subType "array".
    } else if (typeof editor.endpointKeyNames == 'undefined') {
      subTypeError = true;
      // Missing "endpointKeyNames" parameter. It must be specified for subType "{subType}".
      editor.error = MSG_ERROR_MISSING_ENDPOINT_KEY_NAMES_PARAM.replace("{subType}", editor.subType);
    }
  } else
    // Child data for 'table' subType child listing. These elements are outside a real table.
    if (editor.subType === 'table' && typeof editor.endpointKeyNames == 'undefined') {
      subTypeError = true;
      editor.error = MSG_ERROR_MISSING_ENDPOINT_KEY_NAMES_PARAM.replace("{subType}", editor.subType);
    }
  if (editor.type == 'child_listing' && !subTypeError) {
    // Filters for child components
    if (editor.subType === 'array') {
      if (editor.endpointKeyNames.length == 0) {
        // "endpointKeyNames" parameter is empty. It must be specified for subType "{subType}".
        editor.error = MSG_ERROR_EMPTY_ENDPOINT_KEY_NAMES_PARAM.replace("{subType}", editor.subType);
      }
    } else if (editor.subType === 'table') {
      if (editor.endpointKeyNames.length == 0) {
        editor.error = MSG_ERROR_EMPTY_ENDPOINT_KEY_NAMES_PARAM.replace("{subType}", editor.subType);
      }
    } else {
      editor.error = MSG_ERROR_MISSING_SUB_TYPE_PARAM.replace("{subType}", editor.subType); // Incorrect "subType" parameter. It must be "array" or "table" for "child_listing" type. Current value: {editor.subType};
    }
    if (!editor.error && typeof props.parentData !== 'undefined') {
      editor = setEndpointFilter(props.parentData, editor);
    }
  }
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
const verifyEditorCache = {};
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
  const calleeName = editorObj["calleeName"];
  if (typeof calleeName === 'undefined' || calleeName === null) {
    gfd_response.error = true;
    gfd_response.errorMsg = "GetFormData: calleeName is not defined [GCE-GFD-010]";
    return Promise.resolve(gfd_response);
  }
  if (calleeName === false) {
    gfd_response.response = editorObj;
    return Promise.resolve(gfd_response);
  }
  if (verifyEditorCache[calleeName]) {
    return verifyEditorCache[calleeName];
  }
  const endpoint = "menu_options/element";
  const db = new dbApiService({
    url: endpoint
  });
  const json_body = {
    "element": calleeName
  };
  const verifyPromise = db.getAll([], json_body, 'POST').then(data => {
    gfd_response.response = editorObj;
    return gfd_response;
  }, error => {
    // Unauthorized
    error = formatCaughtError(error);
    gfd_response.error = true;
    gfd_response.errorMsg = "GetFormData: ".concat(error.message, " [GCE-GFD-020]");
    // Clear cache on error so it can be retried? 
    // Better to keep it cached to prevent flood, but maybe remove if we want retry.
    // For now, let's keep the error response cached.
    return gfd_response;
  });
  verifyEditorCache[calleeName] = verifyPromise;
  return verifyPromise;
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
      promiseResult: currentObj.dataPopulator(currentObj)
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

// Create a context to hold the function
const MainSectionContext = /*#__PURE__*/createContext();

// Provider Component
const MainSectionProvider = _ref => {
  let {
    children
  } = _ref;
  const [cache, setCache] = useState({});
  const cacheRef = useRef(cache);
  const promisesRef = useRef({});
  useEffect(() => {
    cacheRef.current = cache;
  }, [cache]);
  const initCache = useCallback(() => {
    setCache({});
    promisesRef.current = {};
  }, []);
  const getCachedData = useCallback(entryName => {
    return cacheRef.current[entryName];
  }, []);
  const putCachedData = useCallback((entryName, data) => {
    setCache(prevCache => {
      if (prevCache[entryName] === data) return prevCache;
      return _objectSpread2(_objectSpread2({}, prevCache), {}, {
        [entryName]: data
      });
    });
  }, []);
  const typeofCachedData = useCallback(entryName => {
    return typeof cacheRef.current[entryName];
  }, []);
  const listCache = useCallback(() => {
    return cacheRef.current;
  }, []);
  const debugCache = useCallback(function () {
    let description = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'debugCache';
    console_debug_log(">>>>--->> listCache [".concat(description, "]:"), listCache());
    return '';
  }, [listCache]);
  const fetchOrCache = useCallback((entryName, fetchFn) => {
    if (typeof cacheRef.current[entryName] !== 'undefined') {
      return Promise.resolve(cacheRef.current[entryName]);
    }
    if (promisesRef.current[entryName]) {
      return promisesRef.current[entryName];
    }
    const promise = fetchFn().then(data => {
      putCachedData(entryName, data);
      delete promisesRef.current[entryName];
      return data;
    }).catch(err => {
      delete promisesRef.current[entryName];
      throw err;
    });
    promisesRef.current[entryName] = promise;
    return promise;
  }, [putCachedData]);
  const contextValue = useMemo(() => ({
    initCache,
    getCachedData,
    putCachedData,
    typeofCachedData,
    listCache,
    debugCache,
    fetchOrCache
  }), [initCache, getCachedData, putCachedData, typeofCachedData, listCache, debugCache, fetchOrCache]);
  return /*#__PURE__*/React.createElement(MainSectionContext.Provider, {
    value: contextValue
  }, children);
};

var generic_editor_rfc_provider = /*#__PURE__*/Object.freeze({
  __proto__: null,
  MainSectionContext: MainSectionContext,
  MainSectionProvider: MainSectionProvider
});

// Search Engine button

const SearchEngineButton = _ref => {
  let {
    valueElement,
    googlePrompt
  } = _ref;
  const setPrompt = (prompt, valueToReplace) => {
    return prompt.replace("%s", valueToReplace);
  };
  const handleGoogleClick = e => {
    e.preventDefault();
    const inputValue = document.getElementById(valueElement).value;
    if (inputValue !== "") {
      const googleSearchUrl = "https://www.google.com/search?q=".concat(encodeURIComponent(setPrompt(googlePrompt, inputValue)));
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
const ChatBotButtonGeneric = _ref2 => {
  let {
    AuxComponent,
    valueElement,
    chatbotPrompt
  } = _ref2;
  if (typeof AuxComponent === "undefined") {
    console_debug_log(">> ChatBotButtonGeneric | AuxComponent is undefined");
    return /*#__PURE__*/React.createElement("div", {
      className: SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS
    }, /*#__PURE__*/React.createElement(GsIcons, {
      icon: "error",
      alt: "Error: AuxComponent is undefined"
    }));
  }
  try {
    return /*#__PURE__*/React.createElement("div", {
      className: SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS
    }, /*#__PURE__*/React.createElement(AuxComponent, {
      valueElement: valueElement,
      chatbot_prompt: chatbotPrompt
    }));
  } catch (error) {
    console_debug_log(">> ChatBotButtonGeneric | error:", error);
    return /*#__PURE__*/React.createElement("div", {
      className: SEARCH_ENGINE_BUTTON_TOP_DIV_CLASS
    }, /*#__PURE__*/React.createElement(GsIcons, {
      icon: "error",
      alt: "Error: Internal error"
    }));
  }
};

var generic_editor_rfc_search_engine_button = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ChatBotButtonGeneric: ChatBotButtonGeneric,
  SearchEngineButton: SearchEngineButton
});

// GenericCrudEditor select components

const buildDescription = (itemData, fieldArray) => {
  let description = '';
  fieldArray.forEach(field => {
    description += itemData[field] + ' ';
  });
  return description.trim();
};
const GenericSelectGenerator = props => {
  /*
   * Select options generator component.
   * Return the description for the select value if show_description is true,
   * otherwise returns one or more <option>...</option> for a <select>, sending
   * a request to the API, and adding a <option>...</option> with the key and description for each row returned
   *
   * Parameters:
   *  filter: filter by _id. Default to no filter (null)
   *  dbFilter: database query filter. Default to no filter (null)
   *  show_description: if true, show description in the listing page or read-only form page, otherwise builds the <option>. Default is false
   *  description_fields: array of fields to show in the description. Default is ["name"]
   */
  const [errorState, setErrorState] = useState(null);
  const [config, setConfig] = useState(null);
  const [rows, setRows] = useState(null);
  const {
    // getCachedData,
    // putCachedData,
    // typeofCachedData,
    debugCache,
    fetchOrCache
  } = useContext(MainSectionContext);
  useEffect(() => {
    setConfig(initConfig(props));
  }, [props]);
  useEffect(() => {
    if (config) {
      const accessKeysListing = config.dbFilter || {};
      fetchOrCache(config.select_name, () => config.dbService.getAll(accessKeysListing)).then(data => setRows(data), error => setErrorState(error)).catch(error => {
        console.error(config.editor.title + '-Select | error object:', error);
      });
    }
  }, [config, fetchOrCache]);
  const initConfig = props => {
    const editor = getEditorData(props);
    return {
      // dbService: database service instance
      dbService: new dbApiService({
        url: editor.dbApiUrl
      }),
      // editor: editor configuration
      editor: editor,
      // select_name: name of the select, taken from the editor name
      select_name: editor.name,
      // filter: filter by _id. Default to no filter (null)
      filter: typeof props.filter !== 'undefined' ? props.filter : null,
      // dbFilter: database query filter. Default to no filter (null)
      dbFilter: typeof props.dbFilter !== 'undefined' ? props.dbFilter : null,
      // show_description: if true, show description in the listing page or read-only form page. Default is false
      show_description: typeof props.show_description !== 'undefined' ? props.show_description : false,
      // description_fields: array of fields to show in the description. Default is ["name"]
      description_fields: typeof props.description_fields !== 'undefined' ? props.description_fields : ["name"]
    };
  };
  if (rows === null) {
    // Still not ready...
    return '';
  }
  if (errorState) {
    // Some error happens
    return errorState.toString();
  }
  const {
    filter,
    show_description,
    description_fields,
    dbService
  } = config;
  let selectAnOptionItem = {};
  selectAnOptionItem['_id'] = null;
  selectAnOptionItem[description_fields[0]] = MSG_SELECT_AN_OPTION;
  for (let i = 1; i < description_fields.length; i++) {
    selectAnOptionItem[description_fields[i]] = '';
  }
  const selectOptions = [...[...[selectAnOptionItem]], ...rows.resultset];
  return selectOptions.filter(option => filter === null ? true : dbService.convertId(option._id) === filter).map(option => {
    if (show_description) {
      return buildDescription(option, description_fields);
    }
    return /*#__PURE__*/React.createElement("option", {
      key: dbService.convertId(option._id),
      value: dbService.convertId(option._id)
    }, buildDescription(option, description_fields));
  });
};
const GenericSelectDataPopulator = props => {
  /*
   * Generic select data populator component.
   * Return the data for a select, sending a request to the API, and adding a <option>...</option> with the key and description for each row returned
   *
   * Parameters:
   *  filter: filter by _id. Default to no filter (null)
   *  dbFilter: database query filter. Default to no filter (null)
   *  columns: columns to show in the listing page or read-only form page. Default is "" meaning all columns
   *  title_field_name: field name to show in the title. Default is "title"
   *  value_field_name: field name to show in the value. Default is "value"
   *  key_name: field name to show in the key. Default is "_id"
   */
  const [errorState, setErrorState] = useState(null);
  const [config, setConfig] = useState(null);
  const [rows, setRows] = useState(null);
  const {
    // getCachedData,
    // putCachedData,
    // typeofCachedData,
    fetchOrCache
  } = useContext(MainSectionContext);
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
      // columns: props.columns !== undefined
      //   ? props.columns
      //   : '',
      title_field_name: props.title_field_name !== undefined ? props.title_field_name : "title",
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
    if (errorState) {
      return errorState.toString();
    }
    const array_options = rows.resultset.filter(option => filter === null ? true : dbService.convertId(option[key_name]) === filter).map(option => {
      let element = {};
      element[title_field_name] = option.name;
      element[value_field_name] = dbService.convertId(option[key_name]);
      return element;
    });
    return putSelectOptionsFromArray(array_options);
  };
  useEffect(() => {
    setConfig(initConfig(props));
  }, [props]);
  if (config) {
    const accessKeysListing = config.dbFilter || {};
    // if (config.columns !== '') {
    //   accessKeysListing['gs_listing_columns'] = config.columns;
    // }
    fetchOrCache(config.select_name, () => config.dbService.getAll(accessKeysListing)).then(data => setRows(data), error => setErrorState(error));
  }
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
      dbRow: dbRow,
      show_description: true,
      currentObj: currentObj
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
      listing: "1",
      currentObj: currentObj
    });
  }
  // Returns plain value
  return value;
};

var generic_editor_rfc_selector = /*#__PURE__*/Object.freeze({
  __proto__: null,
  GenericSelectDataPopulator: GenericSelectDataPopulator,
  GenericSelectGenerator: GenericSelectGenerator,
  buildDescription: buildDescription,
  getSelectDescription: getSelectDescription,
  putSelectOptionsFromArray: putSelectOptionsFromArray
});

var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

var lodash$1 = {exports: {}};

/**
 * @license
 * Lodash <https://lodash.com/>
 * Copyright OpenJS Foundation and other contributors <https://openjsf.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */
var lodash = lodash$1.exports;

var hasRequiredLodash;

function requireLodash () {
	if (hasRequiredLodash) return lodash$1.exports;
	hasRequiredLodash = 1;
	(function (module, exports$1) {
(function() {

		  /** Used as a safe reference for `undefined` in pre-ES5 environments. */
		  var undefined$1;

		  /** Used as the semantic version number. */
		  var VERSION = '4.17.23';

		  /** Used as the size to enable large array optimizations. */
		  var LARGE_ARRAY_SIZE = 200;

		  /** Error message constants. */
		  var CORE_ERROR_TEXT = 'Unsupported core-js use. Try https://npms.io/search?q=ponyfill.',
		      FUNC_ERROR_TEXT = 'Expected a function',
		      INVALID_TEMPL_VAR_ERROR_TEXT = 'Invalid `variable` option passed into `_.template`';

		  /** Used to stand-in for `undefined` hash values. */
		  var HASH_UNDEFINED = '__lodash_hash_undefined__';

		  /** Used as the maximum memoize cache size. */
		  var MAX_MEMOIZE_SIZE = 500;

		  /** Used as the internal argument placeholder. */
		  var PLACEHOLDER = '__lodash_placeholder__';

		  /** Used to compose bitmasks for cloning. */
		  var CLONE_DEEP_FLAG = 1,
		      CLONE_FLAT_FLAG = 2,
		      CLONE_SYMBOLS_FLAG = 4;

		  /** Used to compose bitmasks for value comparisons. */
		  var COMPARE_PARTIAL_FLAG = 1,
		      COMPARE_UNORDERED_FLAG = 2;

		  /** Used to compose bitmasks for function metadata. */
		  var WRAP_BIND_FLAG = 1,
		      WRAP_BIND_KEY_FLAG = 2,
		      WRAP_CURRY_BOUND_FLAG = 4,
		      WRAP_CURRY_FLAG = 8,
		      WRAP_CURRY_RIGHT_FLAG = 16,
		      WRAP_PARTIAL_FLAG = 32,
		      WRAP_PARTIAL_RIGHT_FLAG = 64,
		      WRAP_ARY_FLAG = 128,
		      WRAP_REARG_FLAG = 256,
		      WRAP_FLIP_FLAG = 512;

		  /** Used as default options for `_.truncate`. */
		  var DEFAULT_TRUNC_LENGTH = 30,
		      DEFAULT_TRUNC_OMISSION = '...';

		  /** Used to detect hot functions by number of calls within a span of milliseconds. */
		  var HOT_COUNT = 800,
		      HOT_SPAN = 16;

		  /** Used to indicate the type of lazy iteratees. */
		  var LAZY_FILTER_FLAG = 1,
		      LAZY_MAP_FLAG = 2,
		      LAZY_WHILE_FLAG = 3;

		  /** Used as references for various `Number` constants. */
		  var INFINITY = 1 / 0,
		      MAX_SAFE_INTEGER = 9007199254740991,
		      MAX_INTEGER = 1.7976931348623157e+308,
		      NAN = 0 / 0;

		  /** Used as references for the maximum length and index of an array. */
		  var MAX_ARRAY_LENGTH = 4294967295,
		      MAX_ARRAY_INDEX = MAX_ARRAY_LENGTH - 1,
		      HALF_MAX_ARRAY_LENGTH = MAX_ARRAY_LENGTH >>> 1;

		  /** Used to associate wrap methods with their bit flags. */
		  var wrapFlags = [
		    ['ary', WRAP_ARY_FLAG],
		    ['bind', WRAP_BIND_FLAG],
		    ['bindKey', WRAP_BIND_KEY_FLAG],
		    ['curry', WRAP_CURRY_FLAG],
		    ['curryRight', WRAP_CURRY_RIGHT_FLAG],
		    ['flip', WRAP_FLIP_FLAG],
		    ['partial', WRAP_PARTIAL_FLAG],
		    ['partialRight', WRAP_PARTIAL_RIGHT_FLAG],
		    ['rearg', WRAP_REARG_FLAG]
		  ];

		  /** `Object#toString` result references. */
		  var argsTag = '[object Arguments]',
		      arrayTag = '[object Array]',
		      asyncTag = '[object AsyncFunction]',
		      boolTag = '[object Boolean]',
		      dateTag = '[object Date]',
		      domExcTag = '[object DOMException]',
		      errorTag = '[object Error]',
		      funcTag = '[object Function]',
		      genTag = '[object GeneratorFunction]',
		      mapTag = '[object Map]',
		      numberTag = '[object Number]',
		      nullTag = '[object Null]',
		      objectTag = '[object Object]',
		      promiseTag = '[object Promise]',
		      proxyTag = '[object Proxy]',
		      regexpTag = '[object RegExp]',
		      setTag = '[object Set]',
		      stringTag = '[object String]',
		      symbolTag = '[object Symbol]',
		      undefinedTag = '[object Undefined]',
		      weakMapTag = '[object WeakMap]',
		      weakSetTag = '[object WeakSet]';

		  var arrayBufferTag = '[object ArrayBuffer]',
		      dataViewTag = '[object DataView]',
		      float32Tag = '[object Float32Array]',
		      float64Tag = '[object Float64Array]',
		      int8Tag = '[object Int8Array]',
		      int16Tag = '[object Int16Array]',
		      int32Tag = '[object Int32Array]',
		      uint8Tag = '[object Uint8Array]',
		      uint8ClampedTag = '[object Uint8ClampedArray]',
		      uint16Tag = '[object Uint16Array]',
		      uint32Tag = '[object Uint32Array]';

		  /** Used to match empty string literals in compiled template source. */
		  var reEmptyStringLeading = /\b__p \+= '';/g,
		      reEmptyStringMiddle = /\b(__p \+=) '' \+/g,
		      reEmptyStringTrailing = /(__e\(.*?\)|\b__t\)) \+\n'';/g;

		  /** Used to match HTML entities and HTML characters. */
		  var reEscapedHtml = /&(?:amp|lt|gt|quot|#39);/g,
		      reUnescapedHtml = /[&<>"']/g,
		      reHasEscapedHtml = RegExp(reEscapedHtml.source),
		      reHasUnescapedHtml = RegExp(reUnescapedHtml.source);

		  /** Used to match template delimiters. */
		  var reEscape = /<%-([\s\S]+?)%>/g,
		      reEvaluate = /<%([\s\S]+?)%>/g,
		      reInterpolate = /<%=([\s\S]+?)%>/g;

		  /** Used to match property names within property paths. */
		  var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
		      reIsPlainProp = /^\w*$/,
		      rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g;

		  /**
		   * Used to match `RegExp`
		   * [syntax characters](http://ecma-international.org/ecma-262/7.0/#sec-patterns).
		   */
		  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g,
		      reHasRegExpChar = RegExp(reRegExpChar.source);

		  /** Used to match leading whitespace. */
		  var reTrimStart = /^\s+/;

		  /** Used to match a single whitespace character. */
		  var reWhitespace = /\s/;

		  /** Used to match wrap detail comments. */
		  var reWrapComment = /\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,
		      reWrapDetails = /\{\n\/\* \[wrapped with (.+)\] \*/,
		      reSplitDetails = /,? & /;

		  /** Used to match words composed of alphanumeric characters. */
		  var reAsciiWord = /[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g;

		  /**
		   * Used to validate the `validate` option in `_.template` variable.
		   *
		   * Forbids characters which could potentially change the meaning of the function argument definition:
		   * - "()," (modification of function parameters)
		   * - "=" (default value)
		   * - "[]{}" (destructuring of function parameters)
		   * - "/" (beginning of a comment)
		   * - whitespace
		   */
		  var reForbiddenIdentifierChars = /[()=,{}\[\]\/\s]/;

		  /** Used to match backslashes in property paths. */
		  var reEscapeChar = /\\(\\)?/g;

		  /**
		   * Used to match
		   * [ES template delimiters](http://ecma-international.org/ecma-262/7.0/#sec-template-literal-lexical-components).
		   */
		  var reEsTemplate = /\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g;

		  /** Used to match `RegExp` flags from their coerced string values. */
		  var reFlags = /\w*$/;

		  /** Used to detect bad signed hexadecimal string values. */
		  var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;

		  /** Used to detect binary string values. */
		  var reIsBinary = /^0b[01]+$/i;

		  /** Used to detect host constructors (Safari). */
		  var reIsHostCtor = /^\[object .+?Constructor\]$/;

		  /** Used to detect octal string values. */
		  var reIsOctal = /^0o[0-7]+$/i;

		  /** Used to detect unsigned integer values. */
		  var reIsUint = /^(?:0|[1-9]\d*)$/;

		  /** Used to match Latin Unicode letters (excluding mathematical operators). */
		  var reLatin = /[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g;

		  /** Used to ensure capturing order of template delimiters. */
		  var reNoMatch = /($^)/;

		  /** Used to match unescaped characters in compiled string literals. */
		  var reUnescapedString = /['\n\r\u2028\u2029\\]/g;

		  /** Used to compose unicode character classes. */
		  var rsAstralRange = '\\ud800-\\udfff',
		      rsComboMarksRange = '\\u0300-\\u036f',
		      reComboHalfMarksRange = '\\ufe20-\\ufe2f',
		      rsComboSymbolsRange = '\\u20d0-\\u20ff',
		      rsComboRange = rsComboMarksRange + reComboHalfMarksRange + rsComboSymbolsRange,
		      rsDingbatRange = '\\u2700-\\u27bf',
		      rsLowerRange = 'a-z\\xdf-\\xf6\\xf8-\\xff',
		      rsMathOpRange = '\\xac\\xb1\\xd7\\xf7',
		      rsNonCharRange = '\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf',
		      rsPunctuationRange = '\\u2000-\\u206f',
		      rsSpaceRange = ' \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000',
		      rsUpperRange = 'A-Z\\xc0-\\xd6\\xd8-\\xde',
		      rsVarRange = '\\ufe0e\\ufe0f',
		      rsBreakRange = rsMathOpRange + rsNonCharRange + rsPunctuationRange + rsSpaceRange;

		  /** Used to compose unicode capture groups. */
		  var rsApos = "['\u2019]",
		      rsAstral = '[' + rsAstralRange + ']',
		      rsBreak = '[' + rsBreakRange + ']',
		      rsCombo = '[' + rsComboRange + ']',
		      rsDigits = '\\d+',
		      rsDingbat = '[' + rsDingbatRange + ']',
		      rsLower = '[' + rsLowerRange + ']',
		      rsMisc = '[^' + rsAstralRange + rsBreakRange + rsDigits + rsDingbatRange + rsLowerRange + rsUpperRange + ']',
		      rsFitz = '\\ud83c[\\udffb-\\udfff]',
		      rsModifier = '(?:' + rsCombo + '|' + rsFitz + ')',
		      rsNonAstral = '[^' + rsAstralRange + ']',
		      rsRegional = '(?:\\ud83c[\\udde6-\\uddff]){2}',
		      rsSurrPair = '[\\ud800-\\udbff][\\udc00-\\udfff]',
		      rsUpper = '[' + rsUpperRange + ']',
		      rsZWJ = '\\u200d';

		  /** Used to compose unicode regexes. */
		  var rsMiscLower = '(?:' + rsLower + '|' + rsMisc + ')',
		      rsMiscUpper = '(?:' + rsUpper + '|' + rsMisc + ')',
		      rsOptContrLower = '(?:' + rsApos + '(?:d|ll|m|re|s|t|ve))?',
		      rsOptContrUpper = '(?:' + rsApos + '(?:D|LL|M|RE|S|T|VE))?',
		      reOptMod = rsModifier + '?',
		      rsOptVar = '[' + rsVarRange + ']?',
		      rsOptJoin = '(?:' + rsZWJ + '(?:' + [rsNonAstral, rsRegional, rsSurrPair].join('|') + ')' + rsOptVar + reOptMod + ')*',
		      rsOrdLower = '\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])',
		      rsOrdUpper = '\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])',
		      rsSeq = rsOptVar + reOptMod + rsOptJoin,
		      rsEmoji = '(?:' + [rsDingbat, rsRegional, rsSurrPair].join('|') + ')' + rsSeq,
		      rsSymbol = '(?:' + [rsNonAstral + rsCombo + '?', rsCombo, rsRegional, rsSurrPair, rsAstral].join('|') + ')';

		  /** Used to match apostrophes. */
		  var reApos = RegExp(rsApos, 'g');

		  /**
		   * Used to match [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks) and
		   * [combining diacritical marks for symbols](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks_for_Symbols).
		   */
		  var reComboMark = RegExp(rsCombo, 'g');

		  /** Used to match [string symbols](https://mathiasbynens.be/notes/javascript-unicode). */
		  var reUnicode = RegExp(rsFitz + '(?=' + rsFitz + ')|' + rsSymbol + rsSeq, 'g');

		  /** Used to match complex or compound words. */
		  var reUnicodeWord = RegExp([
		    rsUpper + '?' + rsLower + '+' + rsOptContrLower + '(?=' + [rsBreak, rsUpper, '$'].join('|') + ')',
		    rsMiscUpper + '+' + rsOptContrUpper + '(?=' + [rsBreak, rsUpper + rsMiscLower, '$'].join('|') + ')',
		    rsUpper + '?' + rsMiscLower + '+' + rsOptContrLower,
		    rsUpper + '+' + rsOptContrUpper,
		    rsOrdUpper,
		    rsOrdLower,
		    rsDigits,
		    rsEmoji
		  ].join('|'), 'g');

		  /** Used to detect strings with [zero-width joiners or code points from the astral planes](http://eev.ee/blog/2015/09/12/dark-corners-of-unicode/). */
		  var reHasUnicode = RegExp('[' + rsZWJ + rsAstralRange  + rsComboRange + rsVarRange + ']');

		  /** Used to detect strings that need a more robust regexp to match words. */
		  var reHasUnicodeWord = /[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/;

		  /** Used to assign default `context` object properties. */
		  var contextProps = [
		    'Array', 'Buffer', 'DataView', 'Date', 'Error', 'Float32Array', 'Float64Array',
		    'Function', 'Int8Array', 'Int16Array', 'Int32Array', 'Map', 'Math', 'Object',
		    'Promise', 'RegExp', 'Set', 'String', 'Symbol', 'TypeError', 'Uint8Array',
		    'Uint8ClampedArray', 'Uint16Array', 'Uint32Array', 'WeakMap',
		    '_', 'clearTimeout', 'isFinite', 'parseInt', 'setTimeout'
		  ];

		  /** Used to make template sourceURLs easier to identify. */
		  var templateCounter = -1;

		  /** Used to identify `toStringTag` values of typed arrays. */
		  var typedArrayTags = {};
		  typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
		  typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
		  typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
		  typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
		  typedArrayTags[uint32Tag] = true;
		  typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
		  typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
		  typedArrayTags[dataViewTag] = typedArrayTags[dateTag] =
		  typedArrayTags[errorTag] = typedArrayTags[funcTag] =
		  typedArrayTags[mapTag] = typedArrayTags[numberTag] =
		  typedArrayTags[objectTag] = typedArrayTags[regexpTag] =
		  typedArrayTags[setTag] = typedArrayTags[stringTag] =
		  typedArrayTags[weakMapTag] = false;

		  /** Used to identify `toStringTag` values supported by `_.clone`. */
		  var cloneableTags = {};
		  cloneableTags[argsTag] = cloneableTags[arrayTag] =
		  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
		  cloneableTags[boolTag] = cloneableTags[dateTag] =
		  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
		  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
		  cloneableTags[int32Tag] = cloneableTags[mapTag] =
		  cloneableTags[numberTag] = cloneableTags[objectTag] =
		  cloneableTags[regexpTag] = cloneableTags[setTag] =
		  cloneableTags[stringTag] = cloneableTags[symbolTag] =
		  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
		  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
		  cloneableTags[errorTag] = cloneableTags[funcTag] =
		  cloneableTags[weakMapTag] = false;

		  /** Used to map Latin Unicode letters to basic Latin letters. */
		  var deburredLetters = {
		    // Latin-1 Supplement block.
		    '\xc0': 'A',  '\xc1': 'A', '\xc2': 'A', '\xc3': 'A', '\xc4': 'A', '\xc5': 'A',
		    '\xe0': 'a',  '\xe1': 'a', '\xe2': 'a', '\xe3': 'a', '\xe4': 'a', '\xe5': 'a',
		    '\xc7': 'C',  '\xe7': 'c',
		    '\xd0': 'D',  '\xf0': 'd',
		    '\xc8': 'E',  '\xc9': 'E', '\xca': 'E', '\xcb': 'E',
		    '\xe8': 'e',  '\xe9': 'e', '\xea': 'e', '\xeb': 'e',
		    '\xcc': 'I',  '\xcd': 'I', '\xce': 'I', '\xcf': 'I',
		    '\xec': 'i',  '\xed': 'i', '\xee': 'i', '\xef': 'i',
		    '\xd1': 'N',  '\xf1': 'n',
		    '\xd2': 'O',  '\xd3': 'O', '\xd4': 'O', '\xd5': 'O', '\xd6': 'O', '\xd8': 'O',
		    '\xf2': 'o',  '\xf3': 'o', '\xf4': 'o', '\xf5': 'o', '\xf6': 'o', '\xf8': 'o',
		    '\xd9': 'U',  '\xda': 'U', '\xdb': 'U', '\xdc': 'U',
		    '\xf9': 'u',  '\xfa': 'u', '\xfb': 'u', '\xfc': 'u',
		    '\xdd': 'Y',  '\xfd': 'y', '\xff': 'y',
		    '\xc6': 'Ae', '\xe6': 'ae',
		    '\xde': 'Th', '\xfe': 'th',
		    '\xdf': 'ss',
		    // Latin Extended-A block.
		    '\u0100': 'A',  '\u0102': 'A', '\u0104': 'A',
		    '\u0101': 'a',  '\u0103': 'a', '\u0105': 'a',
		    '\u0106': 'C',  '\u0108': 'C', '\u010a': 'C', '\u010c': 'C',
		    '\u0107': 'c',  '\u0109': 'c', '\u010b': 'c', '\u010d': 'c',
		    '\u010e': 'D',  '\u0110': 'D', '\u010f': 'd', '\u0111': 'd',
		    '\u0112': 'E',  '\u0114': 'E', '\u0116': 'E', '\u0118': 'E', '\u011a': 'E',
		    '\u0113': 'e',  '\u0115': 'e', '\u0117': 'e', '\u0119': 'e', '\u011b': 'e',
		    '\u011c': 'G',  '\u011e': 'G', '\u0120': 'G', '\u0122': 'G',
		    '\u011d': 'g',  '\u011f': 'g', '\u0121': 'g', '\u0123': 'g',
		    '\u0124': 'H',  '\u0126': 'H', '\u0125': 'h', '\u0127': 'h',
		    '\u0128': 'I',  '\u012a': 'I', '\u012c': 'I', '\u012e': 'I', '\u0130': 'I',
		    '\u0129': 'i',  '\u012b': 'i', '\u012d': 'i', '\u012f': 'i', '\u0131': 'i',
		    '\u0134': 'J',  '\u0135': 'j',
		    '\u0136': 'K',  '\u0137': 'k', '\u0138': 'k',
		    '\u0139': 'L',  '\u013b': 'L', '\u013d': 'L', '\u013f': 'L', '\u0141': 'L',
		    '\u013a': 'l',  '\u013c': 'l', '\u013e': 'l', '\u0140': 'l', '\u0142': 'l',
		    '\u0143': 'N',  '\u0145': 'N', '\u0147': 'N', '\u014a': 'N',
		    '\u0144': 'n',  '\u0146': 'n', '\u0148': 'n', '\u014b': 'n',
		    '\u014c': 'O',  '\u014e': 'O', '\u0150': 'O',
		    '\u014d': 'o',  '\u014f': 'o', '\u0151': 'o',
		    '\u0154': 'R',  '\u0156': 'R', '\u0158': 'R',
		    '\u0155': 'r',  '\u0157': 'r', '\u0159': 'r',
		    '\u015a': 'S',  '\u015c': 'S', '\u015e': 'S', '\u0160': 'S',
		    '\u015b': 's',  '\u015d': 's', '\u015f': 's', '\u0161': 's',
		    '\u0162': 'T',  '\u0164': 'T', '\u0166': 'T',
		    '\u0163': 't',  '\u0165': 't', '\u0167': 't',
		    '\u0168': 'U',  '\u016a': 'U', '\u016c': 'U', '\u016e': 'U', '\u0170': 'U', '\u0172': 'U',
		    '\u0169': 'u',  '\u016b': 'u', '\u016d': 'u', '\u016f': 'u', '\u0171': 'u', '\u0173': 'u',
		    '\u0174': 'W',  '\u0175': 'w',
		    '\u0176': 'Y',  '\u0177': 'y', '\u0178': 'Y',
		    '\u0179': 'Z',  '\u017b': 'Z', '\u017d': 'Z',
		    '\u017a': 'z',  '\u017c': 'z', '\u017e': 'z',
		    '\u0132': 'IJ', '\u0133': 'ij',
		    '\u0152': 'Oe', '\u0153': 'oe',
		    '\u0149': "'n", '\u017f': 's'
		  };

		  /** Used to map characters to HTML entities. */
		  var htmlEscapes = {
		    '&': '&amp;',
		    '<': '&lt;',
		    '>': '&gt;',
		    '"': '&quot;',
		    "'": '&#39;'
		  };

		  /** Used to map HTML entities to characters. */
		  var htmlUnescapes = {
		    '&amp;': '&',
		    '&lt;': '<',
		    '&gt;': '>',
		    '&quot;': '"',
		    '&#39;': "'"
		  };

		  /** Used to escape characters for inclusion in compiled string literals. */
		  var stringEscapes = {
		    '\\': '\\',
		    "'": "'",
		    '\n': 'n',
		    '\r': 'r',
		    '\u2028': 'u2028',
		    '\u2029': 'u2029'
		  };

		  /** Built-in method references without a dependency on `root`. */
		  var freeParseFloat = parseFloat,
		      freeParseInt = parseInt;

		  /** Detect free variable `global` from Node.js. */
		  var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal && commonjsGlobal.Object === Object && commonjsGlobal;

		  /** Detect free variable `self`. */
		  var freeSelf = typeof self == 'object' && self && self.Object === Object && self;

		  /** Used as a reference to the global object. */
		  var root = freeGlobal || freeSelf || Function('return this')();

		  /** Detect free variable `exports`. */
		  var freeExports = exports$1 && !exports$1.nodeType && exports$1;

		  /** Detect free variable `module`. */
		  var freeModule = freeExports && 'object' == 'object' && module && !module.nodeType && module;

		  /** Detect the popular CommonJS extension `module.exports`. */
		  var moduleExports = freeModule && freeModule.exports === freeExports;

		  /** Detect free variable `process` from Node.js. */
		  var freeProcess = moduleExports && freeGlobal.process;

		  /** Used to access faster Node.js helpers. */
		  var nodeUtil = (function() {
		    try {
		      // Use `util.types` for Node.js 10+.
		      var types = freeModule && freeModule.require && freeModule.require('util').types;

		      if (types) {
		        return types;
		      }

		      // Legacy `process.binding('util')` for Node.js < 10.
		      return freeProcess && freeProcess.binding && freeProcess.binding('util');
		    } catch (e) {}
		  }());

		  /* Node.js helper references. */
		  var nodeIsArrayBuffer = nodeUtil && nodeUtil.isArrayBuffer,
		      nodeIsDate = nodeUtil && nodeUtil.isDate,
		      nodeIsMap = nodeUtil && nodeUtil.isMap,
		      nodeIsRegExp = nodeUtil && nodeUtil.isRegExp,
		      nodeIsSet = nodeUtil && nodeUtil.isSet,
		      nodeIsTypedArray = nodeUtil && nodeUtil.isTypedArray;

		  /*--------------------------------------------------------------------------*/

		  /**
		   * A faster alternative to `Function#apply`, this function invokes `func`
		   * with the `this` binding of `thisArg` and the arguments of `args`.
		   *
		   * @private
		   * @param {Function} func The function to invoke.
		   * @param {*} thisArg The `this` binding of `func`.
		   * @param {Array} args The arguments to invoke `func` with.
		   * @returns {*} Returns the result of `func`.
		   */
		  function apply(func, thisArg, args) {
		    switch (args.length) {
		      case 0: return func.call(thisArg);
		      case 1: return func.call(thisArg, args[0]);
		      case 2: return func.call(thisArg, args[0], args[1]);
		      case 3: return func.call(thisArg, args[0], args[1], args[2]);
		    }
		    return func.apply(thisArg, args);
		  }

		  /**
		   * A specialized version of `baseAggregator` for arrays.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} setter The function to set `accumulator` values.
		   * @param {Function} iteratee The iteratee to transform keys.
		   * @param {Object} accumulator The initial aggregated object.
		   * @returns {Function} Returns `accumulator`.
		   */
		  function arrayAggregator(array, setter, iteratee, accumulator) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      var value = array[index];
		      setter(accumulator, value, iteratee(value), array);
		    }
		    return accumulator;
		  }

		  /**
		   * A specialized version of `_.forEach` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns `array`.
		   */
		  function arrayEach(array, iteratee) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (iteratee(array[index], index, array) === false) {
		        break;
		      }
		    }
		    return array;
		  }

		  /**
		   * A specialized version of `_.forEachRight` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns `array`.
		   */
		  function arrayEachRight(array, iteratee) {
		    var length = array == null ? 0 : array.length;

		    while (length--) {
		      if (iteratee(array[length], length, array) === false) {
		        break;
		      }
		    }
		    return array;
		  }

		  /**
		   * A specialized version of `_.every` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} predicate The function invoked per iteration.
		   * @returns {boolean} Returns `true` if all elements pass the predicate check,
		   *  else `false`.
		   */
		  function arrayEvery(array, predicate) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (!predicate(array[index], index, array)) {
		        return false;
		      }
		    }
		    return true;
		  }

		  /**
		   * A specialized version of `_.filter` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} predicate The function invoked per iteration.
		   * @returns {Array} Returns the new filtered array.
		   */
		  function arrayFilter(array, predicate) {
		    var index = -1,
		        length = array == null ? 0 : array.length,
		        resIndex = 0,
		        result = [];

		    while (++index < length) {
		      var value = array[index];
		      if (predicate(value, index, array)) {
		        result[resIndex++] = value;
		      }
		    }
		    return result;
		  }

		  /**
		   * A specialized version of `_.includes` for arrays without support for
		   * specifying an index to search from.
		   *
		   * @private
		   * @param {Array} [array] The array to inspect.
		   * @param {*} target The value to search for.
		   * @returns {boolean} Returns `true` if `target` is found, else `false`.
		   */
		  function arrayIncludes(array, value) {
		    var length = array == null ? 0 : array.length;
		    return !!length && baseIndexOf(array, value, 0) > -1;
		  }

		  /**
		   * This function is like `arrayIncludes` except that it accepts a comparator.
		   *
		   * @private
		   * @param {Array} [array] The array to inspect.
		   * @param {*} target The value to search for.
		   * @param {Function} comparator The comparator invoked per element.
		   * @returns {boolean} Returns `true` if `target` is found, else `false`.
		   */
		  function arrayIncludesWith(array, value, comparator) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (comparator(value, array[index])) {
		        return true;
		      }
		    }
		    return false;
		  }

		  /**
		   * A specialized version of `_.map` for arrays without support for iteratee
		   * shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns the new mapped array.
		   */
		  function arrayMap(array, iteratee) {
		    var index = -1,
		        length = array == null ? 0 : array.length,
		        result = Array(length);

		    while (++index < length) {
		      result[index] = iteratee(array[index], index, array);
		    }
		    return result;
		  }

		  /**
		   * Appends the elements of `values` to `array`.
		   *
		   * @private
		   * @param {Array} array The array to modify.
		   * @param {Array} values The values to append.
		   * @returns {Array} Returns `array`.
		   */
		  function arrayPush(array, values) {
		    var index = -1,
		        length = values.length,
		        offset = array.length;

		    while (++index < length) {
		      array[offset + index] = values[index];
		    }
		    return array;
		  }

		  /**
		   * A specialized version of `_.reduce` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @param {*} [accumulator] The initial value.
		   * @param {boolean} [initAccum] Specify using the first element of `array` as
		   *  the initial value.
		   * @returns {*} Returns the accumulated value.
		   */
		  function arrayReduce(array, iteratee, accumulator, initAccum) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    if (initAccum && length) {
		      accumulator = array[++index];
		    }
		    while (++index < length) {
		      accumulator = iteratee(accumulator, array[index], index, array);
		    }
		    return accumulator;
		  }

		  /**
		   * A specialized version of `_.reduceRight` for arrays without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @param {*} [accumulator] The initial value.
		   * @param {boolean} [initAccum] Specify using the last element of `array` as
		   *  the initial value.
		   * @returns {*} Returns the accumulated value.
		   */
		  function arrayReduceRight(array, iteratee, accumulator, initAccum) {
		    var length = array == null ? 0 : array.length;
		    if (initAccum && length) {
		      accumulator = array[--length];
		    }
		    while (length--) {
		      accumulator = iteratee(accumulator, array[length], length, array);
		    }
		    return accumulator;
		  }

		  /**
		   * A specialized version of `_.some` for arrays without support for iteratee
		   * shorthands.
		   *
		   * @private
		   * @param {Array} [array] The array to iterate over.
		   * @param {Function} predicate The function invoked per iteration.
		   * @returns {boolean} Returns `true` if any element passes the predicate check,
		   *  else `false`.
		   */
		  function arraySome(array, predicate) {
		    var index = -1,
		        length = array == null ? 0 : array.length;

		    while (++index < length) {
		      if (predicate(array[index], index, array)) {
		        return true;
		      }
		    }
		    return false;
		  }

		  /**
		   * Gets the size of an ASCII `string`.
		   *
		   * @private
		   * @param {string} string The string inspect.
		   * @returns {number} Returns the string size.
		   */
		  var asciiSize = baseProperty('length');

		  /**
		   * Converts an ASCII `string` to an array.
		   *
		   * @private
		   * @param {string} string The string to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function asciiToArray(string) {
		    return string.split('');
		  }

		  /**
		   * Splits an ASCII `string` into an array of its words.
		   *
		   * @private
		   * @param {string} The string to inspect.
		   * @returns {Array} Returns the words of `string`.
		   */
		  function asciiWords(string) {
		    return string.match(reAsciiWord) || [];
		  }

		  /**
		   * The base implementation of methods like `_.findKey` and `_.findLastKey`,
		   * without support for iteratee shorthands, which iterates over `collection`
		   * using `eachFunc`.
		   *
		   * @private
		   * @param {Array|Object} collection The collection to inspect.
		   * @param {Function} predicate The function invoked per iteration.
		   * @param {Function} eachFunc The function to iterate over `collection`.
		   * @returns {*} Returns the found element or its key, else `undefined`.
		   */
		  function baseFindKey(collection, predicate, eachFunc) {
		    var result;
		    eachFunc(collection, function(value, key, collection) {
		      if (predicate(value, key, collection)) {
		        result = key;
		        return false;
		      }
		    });
		    return result;
		  }

		  /**
		   * The base implementation of `_.findIndex` and `_.findLastIndex` without
		   * support for iteratee shorthands.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {Function} predicate The function invoked per iteration.
		   * @param {number} fromIndex The index to search from.
		   * @param {boolean} [fromRight] Specify iterating from right to left.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function baseFindIndex(array, predicate, fromIndex, fromRight) {
		    var length = array.length,
		        index = fromIndex + (fromRight ? 1 : -1);

		    while ((fromRight ? index-- : ++index < length)) {
		      if (predicate(array[index], index, array)) {
		        return index;
		      }
		    }
		    return -1;
		  }

		  /**
		   * The base implementation of `_.indexOf` without `fromIndex` bounds checks.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function baseIndexOf(array, value, fromIndex) {
		    return value === value
		      ? strictIndexOf(array, value, fromIndex)
		      : baseFindIndex(array, baseIsNaN, fromIndex);
		  }

		  /**
		   * This function is like `baseIndexOf` except that it accepts a comparator.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @param {Function} comparator The comparator invoked per element.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function baseIndexOfWith(array, value, fromIndex, comparator) {
		    var index = fromIndex - 1,
		        length = array.length;

		    while (++index < length) {
		      if (comparator(array[index], value)) {
		        return index;
		      }
		    }
		    return -1;
		  }

		  /**
		   * The base implementation of `_.isNaN` without support for number objects.
		   *
		   * @private
		   * @param {*} value The value to check.
		   * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
		   */
		  function baseIsNaN(value) {
		    return value !== value;
		  }

		  /**
		   * The base implementation of `_.mean` and `_.meanBy` without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} array The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {number} Returns the mean.
		   */
		  function baseMean(array, iteratee) {
		    var length = array == null ? 0 : array.length;
		    return length ? (baseSum(array, iteratee) / length) : NAN;
		  }

		  /**
		   * The base implementation of `_.property` without support for deep paths.
		   *
		   * @private
		   * @param {string} key The key of the property to get.
		   * @returns {Function} Returns the new accessor function.
		   */
		  function baseProperty(key) {
		    return function(object) {
		      return object == null ? undefined$1 : object[key];
		    };
		  }

		  /**
		   * The base implementation of `_.propertyOf` without support for deep paths.
		   *
		   * @private
		   * @param {Object} object The object to query.
		   * @returns {Function} Returns the new accessor function.
		   */
		  function basePropertyOf(object) {
		    return function(key) {
		      return object == null ? undefined$1 : object[key];
		    };
		  }

		  /**
		   * The base implementation of `_.reduce` and `_.reduceRight`, without support
		   * for iteratee shorthands, which iterates over `collection` using `eachFunc`.
		   *
		   * @private
		   * @param {Array|Object} collection The collection to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @param {*} accumulator The initial value.
		   * @param {boolean} initAccum Specify using the first or last element of
		   *  `collection` as the initial value.
		   * @param {Function} eachFunc The function to iterate over `collection`.
		   * @returns {*} Returns the accumulated value.
		   */
		  function baseReduce(collection, iteratee, accumulator, initAccum, eachFunc) {
		    eachFunc(collection, function(value, index, collection) {
		      accumulator = initAccum
		        ? (initAccum = false, value)
		        : iteratee(accumulator, value, index, collection);
		    });
		    return accumulator;
		  }

		  /**
		   * The base implementation of `_.sortBy` which uses `comparer` to define the
		   * sort order of `array` and replaces criteria objects with their corresponding
		   * values.
		   *
		   * @private
		   * @param {Array} array The array to sort.
		   * @param {Function} comparer The function to define sort order.
		   * @returns {Array} Returns `array`.
		   */
		  function baseSortBy(array, comparer) {
		    var length = array.length;

		    array.sort(comparer);
		    while (length--) {
		      array[length] = array[length].value;
		    }
		    return array;
		  }

		  /**
		   * The base implementation of `_.sum` and `_.sumBy` without support for
		   * iteratee shorthands.
		   *
		   * @private
		   * @param {Array} array The array to iterate over.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {number} Returns the sum.
		   */
		  function baseSum(array, iteratee) {
		    var result,
		        index = -1,
		        length = array.length;

		    while (++index < length) {
		      var current = iteratee(array[index]);
		      if (current !== undefined$1) {
		        result = result === undefined$1 ? current : (result + current);
		      }
		    }
		    return result;
		  }

		  /**
		   * The base implementation of `_.times` without support for iteratee shorthands
		   * or max array length checks.
		   *
		   * @private
		   * @param {number} n The number of times to invoke `iteratee`.
		   * @param {Function} iteratee The function invoked per iteration.
		   * @returns {Array} Returns the array of results.
		   */
		  function baseTimes(n, iteratee) {
		    var index = -1,
		        result = Array(n);

		    while (++index < n) {
		      result[index] = iteratee(index);
		    }
		    return result;
		  }

		  /**
		   * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
		   * of key-value pairs for `object` corresponding to the property names of `props`.
		   *
		   * @private
		   * @param {Object} object The object to query.
		   * @param {Array} props The property names to get values for.
		   * @returns {Object} Returns the key-value pairs.
		   */
		  function baseToPairs(object, props) {
		    return arrayMap(props, function(key) {
		      return [key, object[key]];
		    });
		  }

		  /**
		   * The base implementation of `_.trim`.
		   *
		   * @private
		   * @param {string} string The string to trim.
		   * @returns {string} Returns the trimmed string.
		   */
		  function baseTrim(string) {
		    return string
		      ? string.slice(0, trimmedEndIndex(string) + 1).replace(reTrimStart, '')
		      : string;
		  }

		  /**
		   * The base implementation of `_.unary` without support for storing metadata.
		   *
		   * @private
		   * @param {Function} func The function to cap arguments for.
		   * @returns {Function} Returns the new capped function.
		   */
		  function baseUnary(func) {
		    return function(value) {
		      return func(value);
		    };
		  }

		  /**
		   * The base implementation of `_.values` and `_.valuesIn` which creates an
		   * array of `object` property values corresponding to the property names
		   * of `props`.
		   *
		   * @private
		   * @param {Object} object The object to query.
		   * @param {Array} props The property names to get values for.
		   * @returns {Object} Returns the array of property values.
		   */
		  function baseValues(object, props) {
		    return arrayMap(props, function(key) {
		      return object[key];
		    });
		  }

		  /**
		   * Checks if a `cache` value for `key` exists.
		   *
		   * @private
		   * @param {Object} cache The cache to query.
		   * @param {string} key The key of the entry to check.
		   * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		   */
		  function cacheHas(cache, key) {
		    return cache.has(key);
		  }

		  /**
		   * Used by `_.trim` and `_.trimStart` to get the index of the first string symbol
		   * that is not found in the character symbols.
		   *
		   * @private
		   * @param {Array} strSymbols The string symbols to inspect.
		   * @param {Array} chrSymbols The character symbols to find.
		   * @returns {number} Returns the index of the first unmatched string symbol.
		   */
		  function charsStartIndex(strSymbols, chrSymbols) {
		    var index = -1,
		        length = strSymbols.length;

		    while (++index < length && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
		    return index;
		  }

		  /**
		   * Used by `_.trim` and `_.trimEnd` to get the index of the last string symbol
		   * that is not found in the character symbols.
		   *
		   * @private
		   * @param {Array} strSymbols The string symbols to inspect.
		   * @param {Array} chrSymbols The character symbols to find.
		   * @returns {number} Returns the index of the last unmatched string symbol.
		   */
		  function charsEndIndex(strSymbols, chrSymbols) {
		    var index = strSymbols.length;

		    while (index-- && baseIndexOf(chrSymbols, strSymbols[index], 0) > -1) {}
		    return index;
		  }

		  /**
		   * Gets the number of `placeholder` occurrences in `array`.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} placeholder The placeholder to search for.
		   * @returns {number} Returns the placeholder count.
		   */
		  function countHolders(array, placeholder) {
		    var length = array.length,
		        result = 0;

		    while (length--) {
		      if (array[length] === placeholder) {
		        ++result;
		      }
		    }
		    return result;
		  }

		  /**
		   * Used by `_.deburr` to convert Latin-1 Supplement and Latin Extended-A
		   * letters to basic Latin letters.
		   *
		   * @private
		   * @param {string} letter The matched letter to deburr.
		   * @returns {string} Returns the deburred letter.
		   */
		  var deburrLetter = basePropertyOf(deburredLetters);

		  /**
		   * Used by `_.escape` to convert characters to HTML entities.
		   *
		   * @private
		   * @param {string} chr The matched character to escape.
		   * @returns {string} Returns the escaped character.
		   */
		  var escapeHtmlChar = basePropertyOf(htmlEscapes);

		  /**
		   * Used by `_.template` to escape characters for inclusion in compiled string literals.
		   *
		   * @private
		   * @param {string} chr The matched character to escape.
		   * @returns {string} Returns the escaped character.
		   */
		  function escapeStringChar(chr) {
		    return '\\' + stringEscapes[chr];
		  }

		  /**
		   * Gets the value at `key` of `object`.
		   *
		   * @private
		   * @param {Object} [object] The object to query.
		   * @param {string} key The key of the property to get.
		   * @returns {*} Returns the property value.
		   */
		  function getValue(object, key) {
		    return object == null ? undefined$1 : object[key];
		  }

		  /**
		   * Checks if `string` contains Unicode symbols.
		   *
		   * @private
		   * @param {string} string The string to inspect.
		   * @returns {boolean} Returns `true` if a symbol is found, else `false`.
		   */
		  function hasUnicode(string) {
		    return reHasUnicode.test(string);
		  }

		  /**
		   * Checks if `string` contains a word composed of Unicode symbols.
		   *
		   * @private
		   * @param {string} string The string to inspect.
		   * @returns {boolean} Returns `true` if a word is found, else `false`.
		   */
		  function hasUnicodeWord(string) {
		    return reHasUnicodeWord.test(string);
		  }

		  /**
		   * Converts `iterator` to an array.
		   *
		   * @private
		   * @param {Object} iterator The iterator to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function iteratorToArray(iterator) {
		    var data,
		        result = [];

		    while (!(data = iterator.next()).done) {
		      result.push(data.value);
		    }
		    return result;
		  }

		  /**
		   * Converts `map` to its key-value pairs.
		   *
		   * @private
		   * @param {Object} map The map to convert.
		   * @returns {Array} Returns the key-value pairs.
		   */
		  function mapToArray(map) {
		    var index = -1,
		        result = Array(map.size);

		    map.forEach(function(value, key) {
		      result[++index] = [key, value];
		    });
		    return result;
		  }

		  /**
		   * Creates a unary function that invokes `func` with its argument transformed.
		   *
		   * @private
		   * @param {Function} func The function to wrap.
		   * @param {Function} transform The argument transform.
		   * @returns {Function} Returns the new function.
		   */
		  function overArg(func, transform) {
		    return function(arg) {
		      return func(transform(arg));
		    };
		  }

		  /**
		   * Replaces all `placeholder` elements in `array` with an internal placeholder
		   * and returns an array of their indexes.
		   *
		   * @private
		   * @param {Array} array The array to modify.
		   * @param {*} placeholder The placeholder to replace.
		   * @returns {Array} Returns the new array of placeholder indexes.
		   */
		  function replaceHolders(array, placeholder) {
		    var index = -1,
		        length = array.length,
		        resIndex = 0,
		        result = [];

		    while (++index < length) {
		      var value = array[index];
		      if (value === placeholder || value === PLACEHOLDER) {
		        array[index] = PLACEHOLDER;
		        result[resIndex++] = index;
		      }
		    }
		    return result;
		  }

		  /**
		   * Converts `set` to an array of its values.
		   *
		   * @private
		   * @param {Object} set The set to convert.
		   * @returns {Array} Returns the values.
		   */
		  function setToArray(set) {
		    var index = -1,
		        result = Array(set.size);

		    set.forEach(function(value) {
		      result[++index] = value;
		    });
		    return result;
		  }

		  /**
		   * Converts `set` to its value-value pairs.
		   *
		   * @private
		   * @param {Object} set The set to convert.
		   * @returns {Array} Returns the value-value pairs.
		   */
		  function setToPairs(set) {
		    var index = -1,
		        result = Array(set.size);

		    set.forEach(function(value) {
		      result[++index] = [value, value];
		    });
		    return result;
		  }

		  /**
		   * A specialized version of `_.indexOf` which performs strict equality
		   * comparisons of values, i.e. `===`.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function strictIndexOf(array, value, fromIndex) {
		    var index = fromIndex - 1,
		        length = array.length;

		    while (++index < length) {
		      if (array[index] === value) {
		        return index;
		      }
		    }
		    return -1;
		  }

		  /**
		   * A specialized version of `_.lastIndexOf` which performs strict equality
		   * comparisons of values, i.e. `===`.
		   *
		   * @private
		   * @param {Array} array The array to inspect.
		   * @param {*} value The value to search for.
		   * @param {number} fromIndex The index to search from.
		   * @returns {number} Returns the index of the matched value, else `-1`.
		   */
		  function strictLastIndexOf(array, value, fromIndex) {
		    var index = fromIndex + 1;
		    while (index--) {
		      if (array[index] === value) {
		        return index;
		      }
		    }
		    return index;
		  }

		  /**
		   * Gets the number of symbols in `string`.
		   *
		   * @private
		   * @param {string} string The string to inspect.
		   * @returns {number} Returns the string size.
		   */
		  function stringSize(string) {
		    return hasUnicode(string)
		      ? unicodeSize(string)
		      : asciiSize(string);
		  }

		  /**
		   * Converts `string` to an array.
		   *
		   * @private
		   * @param {string} string The string to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function stringToArray(string) {
		    return hasUnicode(string)
		      ? unicodeToArray(string)
		      : asciiToArray(string);
		  }

		  /**
		   * Used by `_.trim` and `_.trimEnd` to get the index of the last non-whitespace
		   * character of `string`.
		   *
		   * @private
		   * @param {string} string The string to inspect.
		   * @returns {number} Returns the index of the last non-whitespace character.
		   */
		  function trimmedEndIndex(string) {
		    var index = string.length;

		    while (index-- && reWhitespace.test(string.charAt(index))) {}
		    return index;
		  }

		  /**
		   * Used by `_.unescape` to convert HTML entities to characters.
		   *
		   * @private
		   * @param {string} chr The matched character to unescape.
		   * @returns {string} Returns the unescaped character.
		   */
		  var unescapeHtmlChar = basePropertyOf(htmlUnescapes);

		  /**
		   * Gets the size of a Unicode `string`.
		   *
		   * @private
		   * @param {string} string The string inspect.
		   * @returns {number} Returns the string size.
		   */
		  function unicodeSize(string) {
		    var result = reUnicode.lastIndex = 0;
		    while (reUnicode.test(string)) {
		      ++result;
		    }
		    return result;
		  }

		  /**
		   * Converts a Unicode `string` to an array.
		   *
		   * @private
		   * @param {string} string The string to convert.
		   * @returns {Array} Returns the converted array.
		   */
		  function unicodeToArray(string) {
		    return string.match(reUnicode) || [];
		  }

		  /**
		   * Splits a Unicode `string` into an array of its words.
		   *
		   * @private
		   * @param {string} The string to inspect.
		   * @returns {Array} Returns the words of `string`.
		   */
		  function unicodeWords(string) {
		    return string.match(reUnicodeWord) || [];
		  }

		  /*--------------------------------------------------------------------------*/

		  /**
		   * Create a new pristine `lodash` function using the `context` object.
		   *
		   * @static
		   * @memberOf _
		   * @since 1.1.0
		   * @category Util
		   * @param {Object} [context=root] The context object.
		   * @returns {Function} Returns a new `lodash` function.
		   * @example
		   *
		   * _.mixin({ 'foo': _.constant('foo') });
		   *
		   * var lodash = _.runInContext();
		   * lodash.mixin({ 'bar': lodash.constant('bar') });
		   *
		   * _.isFunction(_.foo);
		   * // => true
		   * _.isFunction(_.bar);
		   * // => false
		   *
		   * lodash.isFunction(lodash.foo);
		   * // => false
		   * lodash.isFunction(lodash.bar);
		   * // => true
		   *
		   * // Create a suped-up `defer` in Node.js.
		   * var defer = _.runInContext({ 'setTimeout': setImmediate }).defer;
		   */
		  var runInContext = (function runInContext(context) {
		    context = context == null ? root : _.defaults(root.Object(), context, _.pick(root, contextProps));

		    /** Built-in constructor references. */
		    var Array = context.Array,
		        Date = context.Date,
		        Error = context.Error,
		        Function = context.Function,
		        Math = context.Math,
		        Object = context.Object,
		        RegExp = context.RegExp,
		        String = context.String,
		        TypeError = context.TypeError;

		    /** Used for built-in method references. */
		    var arrayProto = Array.prototype,
		        funcProto = Function.prototype,
		        objectProto = Object.prototype;

		    /** Used to detect overreaching core-js shims. */
		    var coreJsData = context['__core-js_shared__'];

		    /** Used to resolve the decompiled source of functions. */
		    var funcToString = funcProto.toString;

		    /** Used to check objects for own properties. */
		    var hasOwnProperty = objectProto.hasOwnProperty;

		    /** Used to generate unique IDs. */
		    var idCounter = 0;

		    /** Used to detect methods masquerading as native. */
		    var maskSrcKey = (function() {
		      var uid = /[^.]+$/.exec(coreJsData && coreJsData.keys && coreJsData.keys.IE_PROTO || '');
		      return uid ? ('Symbol(src)_1.' + uid) : '';
		    }());

		    /**
		     * Used to resolve the
		     * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
		     * of values.
		     */
		    var nativeObjectToString = objectProto.toString;

		    /** Used to infer the `Object` constructor. */
		    var objectCtorString = funcToString.call(Object);

		    /** Used to restore the original `_` reference in `_.noConflict`. */
		    var oldDash = root._;

		    /** Used to detect if a method is native. */
		    var reIsNative = RegExp('^' +
		      funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
		      .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
		    );

		    /** Built-in value references. */
		    var Buffer = moduleExports ? context.Buffer : undefined$1,
		        Symbol = context.Symbol,
		        Uint8Array = context.Uint8Array,
		        allocUnsafe = Buffer ? Buffer.allocUnsafe : undefined$1,
		        getPrototype = overArg(Object.getPrototypeOf, Object),
		        objectCreate = Object.create,
		        propertyIsEnumerable = objectProto.propertyIsEnumerable,
		        splice = arrayProto.splice,
		        spreadableSymbol = Symbol ? Symbol.isConcatSpreadable : undefined$1,
		        symIterator = Symbol ? Symbol.iterator : undefined$1,
		        symToStringTag = Symbol ? Symbol.toStringTag : undefined$1;

		    var defineProperty = (function() {
		      try {
		        var func = getNative(Object, 'defineProperty');
		        func({}, '', {});
		        return func;
		      } catch (e) {}
		    }());

		    /** Mocked built-ins. */
		    var ctxClearTimeout = context.clearTimeout !== root.clearTimeout && context.clearTimeout,
		        ctxNow = Date && Date.now !== root.Date.now && Date.now,
		        ctxSetTimeout = context.setTimeout !== root.setTimeout && context.setTimeout;

		    /* Built-in method references for those with the same name as other `lodash` methods. */
		    var nativeCeil = Math.ceil,
		        nativeFloor = Math.floor,
		        nativeGetSymbols = Object.getOwnPropertySymbols,
		        nativeIsBuffer = Buffer ? Buffer.isBuffer : undefined$1,
		        nativeIsFinite = context.isFinite,
		        nativeJoin = arrayProto.join,
		        nativeKeys = overArg(Object.keys, Object),
		        nativeMax = Math.max,
		        nativeMin = Math.min,
		        nativeNow = Date.now,
		        nativeParseInt = context.parseInt,
		        nativeRandom = Math.random,
		        nativeReverse = arrayProto.reverse;

		    /* Built-in method references that are verified to be native. */
		    var DataView = getNative(context, 'DataView'),
		        Map = getNative(context, 'Map'),
		        Promise = getNative(context, 'Promise'),
		        Set = getNative(context, 'Set'),
		        WeakMap = getNative(context, 'WeakMap'),
		        nativeCreate = getNative(Object, 'create');

		    /** Used to store function metadata. */
		    var metaMap = WeakMap && new WeakMap;

		    /** Used to lookup unminified function names. */
		    var realNames = {};

		    /** Used to detect maps, sets, and weakmaps. */
		    var dataViewCtorString = toSource(DataView),
		        mapCtorString = toSource(Map),
		        promiseCtorString = toSource(Promise),
		        setCtorString = toSource(Set),
		        weakMapCtorString = toSource(WeakMap);

		    /** Used to convert symbols to primitives and strings. */
		    var symbolProto = Symbol ? Symbol.prototype : undefined$1,
		        symbolValueOf = symbolProto ? symbolProto.valueOf : undefined$1,
		        symbolToString = symbolProto ? symbolProto.toString : undefined$1;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a `lodash` object which wraps `value` to enable implicit method
		     * chain sequences. Methods that operate on and return arrays, collections,
		     * and functions can be chained together. Methods that retrieve a single value
		     * or may return a primitive value will automatically end the chain sequence
		     * and return the unwrapped value. Otherwise, the value must be unwrapped
		     * with `_#value`.
		     *
		     * Explicit chain sequences, which must be unwrapped with `_#value`, may be
		     * enabled using `_.chain`.
		     *
		     * The execution of chained methods is lazy, that is, it's deferred until
		     * `_#value` is implicitly or explicitly called.
		     *
		     * Lazy evaluation allows several methods to support shortcut fusion.
		     * Shortcut fusion is an optimization to merge iteratee calls; this avoids
		     * the creation of intermediate arrays and can greatly reduce the number of
		     * iteratee executions. Sections of a chain sequence qualify for shortcut
		     * fusion if the section is applied to an array and iteratees accept only
		     * one argument. The heuristic for whether a section qualifies for shortcut
		     * fusion is subject to change.
		     *
		     * Chaining is supported in custom builds as long as the `_#value` method is
		     * directly or indirectly included in the build.
		     *
		     * In addition to lodash methods, wrappers have `Array` and `String` methods.
		     *
		     * The wrapper `Array` methods are:
		     * `concat`, `join`, `pop`, `push`, `shift`, `sort`, `splice`, and `unshift`
		     *
		     * The wrapper `String` methods are:
		     * `replace` and `split`
		     *
		     * The wrapper methods that support shortcut fusion are:
		     * `at`, `compact`, `drop`, `dropRight`, `dropWhile`, `filter`, `find`,
		     * `findLast`, `head`, `initial`, `last`, `map`, `reject`, `reverse`, `slice`,
		     * `tail`, `take`, `takeRight`, `takeRightWhile`, `takeWhile`, and `toArray`
		     *
		     * The chainable wrapper methods are:
		     * `after`, `ary`, `assign`, `assignIn`, `assignInWith`, `assignWith`, `at`,
		     * `before`, `bind`, `bindAll`, `bindKey`, `castArray`, `chain`, `chunk`,
		     * `commit`, `compact`, `concat`, `conforms`, `constant`, `countBy`, `create`,
		     * `curry`, `debounce`, `defaults`, `defaultsDeep`, `defer`, `delay`,
		     * `difference`, `differenceBy`, `differenceWith`, `drop`, `dropRight`,
		     * `dropRightWhile`, `dropWhile`, `extend`, `extendWith`, `fill`, `filter`,
		     * `flatMap`, `flatMapDeep`, `flatMapDepth`, `flatten`, `flattenDeep`,
		     * `flattenDepth`, `flip`, `flow`, `flowRight`, `fromPairs`, `functions`,
		     * `functionsIn`, `groupBy`, `initial`, `intersection`, `intersectionBy`,
		     * `intersectionWith`, `invert`, `invertBy`, `invokeMap`, `iteratee`, `keyBy`,
		     * `keys`, `keysIn`, `map`, `mapKeys`, `mapValues`, `matches`, `matchesProperty`,
		     * `memoize`, `merge`, `mergeWith`, `method`, `methodOf`, `mixin`, `negate`,
		     * `nthArg`, `omit`, `omitBy`, `once`, `orderBy`, `over`, `overArgs`,
		     * `overEvery`, `overSome`, `partial`, `partialRight`, `partition`, `pick`,
		     * `pickBy`, `plant`, `property`, `propertyOf`, `pull`, `pullAll`, `pullAllBy`,
		     * `pullAllWith`, `pullAt`, `push`, `range`, `rangeRight`, `rearg`, `reject`,
		     * `remove`, `rest`, `reverse`, `sampleSize`, `set`, `setWith`, `shuffle`,
		     * `slice`, `sort`, `sortBy`, `splice`, `spread`, `tail`, `take`, `takeRight`,
		     * `takeRightWhile`, `takeWhile`, `tap`, `throttle`, `thru`, `toArray`,
		     * `toPairs`, `toPairsIn`, `toPath`, `toPlainObject`, `transform`, `unary`,
		     * `union`, `unionBy`, `unionWith`, `uniq`, `uniqBy`, `uniqWith`, `unset`,
		     * `unshift`, `unzip`, `unzipWith`, `update`, `updateWith`, `values`,
		     * `valuesIn`, `without`, `wrap`, `xor`, `xorBy`, `xorWith`, `zip`,
		     * `zipObject`, `zipObjectDeep`, and `zipWith`
		     *
		     * The wrapper methods that are **not** chainable by default are:
		     * `add`, `attempt`, `camelCase`, `capitalize`, `ceil`, `clamp`, `clone`,
		     * `cloneDeep`, `cloneDeepWith`, `cloneWith`, `conformsTo`, `deburr`,
		     * `defaultTo`, `divide`, `each`, `eachRight`, `endsWith`, `eq`, `escape`,
		     * `escapeRegExp`, `every`, `find`, `findIndex`, `findKey`, `findLast`,
		     * `findLastIndex`, `findLastKey`, `first`, `floor`, `forEach`, `forEachRight`,
		     * `forIn`, `forInRight`, `forOwn`, `forOwnRight`, `get`, `gt`, `gte`, `has`,
		     * `hasIn`, `head`, `identity`, `includes`, `indexOf`, `inRange`, `invoke`,
		     * `isArguments`, `isArray`, `isArrayBuffer`, `isArrayLike`, `isArrayLikeObject`,
		     * `isBoolean`, `isBuffer`, `isDate`, `isElement`, `isEmpty`, `isEqual`,
		     * `isEqualWith`, `isError`, `isFinite`, `isFunction`, `isInteger`, `isLength`,
		     * `isMap`, `isMatch`, `isMatchWith`, `isNaN`, `isNative`, `isNil`, `isNull`,
		     * `isNumber`, `isObject`, `isObjectLike`, `isPlainObject`, `isRegExp`,
		     * `isSafeInteger`, `isSet`, `isString`, `isUndefined`, `isTypedArray`,
		     * `isWeakMap`, `isWeakSet`, `join`, `kebabCase`, `last`, `lastIndexOf`,
		     * `lowerCase`, `lowerFirst`, `lt`, `lte`, `max`, `maxBy`, `mean`, `meanBy`,
		     * `min`, `minBy`, `multiply`, `noConflict`, `noop`, `now`, `nth`, `pad`,
		     * `padEnd`, `padStart`, `parseInt`, `pop`, `random`, `reduce`, `reduceRight`,
		     * `repeat`, `result`, `round`, `runInContext`, `sample`, `shift`, `size`,
		     * `snakeCase`, `some`, `sortedIndex`, `sortedIndexBy`, `sortedLastIndex`,
		     * `sortedLastIndexBy`, `startCase`, `startsWith`, `stubArray`, `stubFalse`,
		     * `stubObject`, `stubString`, `stubTrue`, `subtract`, `sum`, `sumBy`,
		     * `template`, `times`, `toFinite`, `toInteger`, `toJSON`, `toLength`,
		     * `toLower`, `toNumber`, `toSafeInteger`, `toString`, `toUpper`, `trim`,
		     * `trimEnd`, `trimStart`, `truncate`, `unescape`, `uniqueId`, `upperCase`,
		     * `upperFirst`, `value`, and `words`
		     *
		     * @name _
		     * @constructor
		     * @category Seq
		     * @param {*} value The value to wrap in a `lodash` instance.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var wrapped = _([1, 2, 3]);
		     *
		     * // Returns an unwrapped value.
		     * wrapped.reduce(_.add);
		     * // => 6
		     *
		     * // Returns a wrapped value.
		     * var squares = wrapped.map(square);
		     *
		     * _.isArray(squares);
		     * // => false
		     *
		     * _.isArray(squares.value());
		     * // => true
		     */
		    function lodash(value) {
		      if (isObjectLike(value) && !isArray(value) && !(value instanceof LazyWrapper)) {
		        if (value instanceof LodashWrapper) {
		          return value;
		        }
		        if (hasOwnProperty.call(value, '__wrapped__')) {
		          return wrapperClone(value);
		        }
		      }
		      return new LodashWrapper(value);
		    }

		    /**
		     * The base implementation of `_.create` without support for assigning
		     * properties to the created object.
		     *
		     * @private
		     * @param {Object} proto The object to inherit from.
		     * @returns {Object} Returns the new object.
		     */
		    var baseCreate = (function() {
		      function object() {}
		      return function(proto) {
		        if (!isObject(proto)) {
		          return {};
		        }
		        if (objectCreate) {
		          return objectCreate(proto);
		        }
		        object.prototype = proto;
		        var result = new object;
		        object.prototype = undefined$1;
		        return result;
		      };
		    }());

		    /**
		     * The function whose prototype chain sequence wrappers inherit from.
		     *
		     * @private
		     */
		    function baseLodash() {
		      // No operation performed.
		    }

		    /**
		     * The base constructor for creating `lodash` wrapper objects.
		     *
		     * @private
		     * @param {*} value The value to wrap.
		     * @param {boolean} [chainAll] Enable explicit method chain sequences.
		     */
		    function LodashWrapper(value, chainAll) {
		      this.__wrapped__ = value;
		      this.__actions__ = [];
		      this.__chain__ = !!chainAll;
		      this.__index__ = 0;
		      this.__values__ = undefined$1;
		    }

		    /**
		     * By default, the template delimiters used by lodash are like those in
		     * embedded Ruby (ERB) as well as ES2015 template strings. Change the
		     * following template settings to use alternative delimiters.
		     *
		     * @static
		     * @memberOf _
		     * @type {Object}
		     */
		    lodash.templateSettings = {

		      /**
		       * Used to detect `data` property values to be HTML-escaped.
		       *
		       * @memberOf _.templateSettings
		       * @type {RegExp}
		       */
		      'escape': reEscape,

		      /**
		       * Used to detect code to be evaluated.
		       *
		       * @memberOf _.templateSettings
		       * @type {RegExp}
		       */
		      'evaluate': reEvaluate,

		      /**
		       * Used to detect `data` property values to inject.
		       *
		       * @memberOf _.templateSettings
		       * @type {RegExp}
		       */
		      'interpolate': reInterpolate,

		      /**
		       * Used to reference the data object in the template text.
		       *
		       * @memberOf _.templateSettings
		       * @type {string}
		       */
		      'variable': '',

		      /**
		       * Used to import variables into the compiled template.
		       *
		       * @memberOf _.templateSettings
		       * @type {Object}
		       */
		      'imports': {

		        /**
		         * A reference to the `lodash` function.
		         *
		         * @memberOf _.templateSettings.imports
		         * @type {Function}
		         */
		        '_': lodash
		      }
		    };

		    // Ensure wrappers are instances of `baseLodash`.
		    lodash.prototype = baseLodash.prototype;
		    lodash.prototype.constructor = lodash;

		    LodashWrapper.prototype = baseCreate(baseLodash.prototype);
		    LodashWrapper.prototype.constructor = LodashWrapper;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a lazy wrapper object which wraps `value` to enable lazy evaluation.
		     *
		     * @private
		     * @constructor
		     * @param {*} value The value to wrap.
		     */
		    function LazyWrapper(value) {
		      this.__wrapped__ = value;
		      this.__actions__ = [];
		      this.__dir__ = 1;
		      this.__filtered__ = false;
		      this.__iteratees__ = [];
		      this.__takeCount__ = MAX_ARRAY_LENGTH;
		      this.__views__ = [];
		    }

		    /**
		     * Creates a clone of the lazy wrapper object.
		     *
		     * @private
		     * @name clone
		     * @memberOf LazyWrapper
		     * @returns {Object} Returns the cloned `LazyWrapper` object.
		     */
		    function lazyClone() {
		      var result = new LazyWrapper(this.__wrapped__);
		      result.__actions__ = copyArray(this.__actions__);
		      result.__dir__ = this.__dir__;
		      result.__filtered__ = this.__filtered__;
		      result.__iteratees__ = copyArray(this.__iteratees__);
		      result.__takeCount__ = this.__takeCount__;
		      result.__views__ = copyArray(this.__views__);
		      return result;
		    }

		    /**
		     * Reverses the direction of lazy iteration.
		     *
		     * @private
		     * @name reverse
		     * @memberOf LazyWrapper
		     * @returns {Object} Returns the new reversed `LazyWrapper` object.
		     */
		    function lazyReverse() {
		      if (this.__filtered__) {
		        var result = new LazyWrapper(this);
		        result.__dir__ = -1;
		        result.__filtered__ = true;
		      } else {
		        result = this.clone();
		        result.__dir__ *= -1;
		      }
		      return result;
		    }

		    /**
		     * Extracts the unwrapped value from its lazy wrapper.
		     *
		     * @private
		     * @name value
		     * @memberOf LazyWrapper
		     * @returns {*} Returns the unwrapped value.
		     */
		    function lazyValue() {
		      var array = this.__wrapped__.value(),
		          dir = this.__dir__,
		          isArr = isArray(array),
		          isRight = dir < 0,
		          arrLength = isArr ? array.length : 0,
		          view = getView(0, arrLength, this.__views__),
		          start = view.start,
		          end = view.end,
		          length = end - start,
		          index = isRight ? end : (start - 1),
		          iteratees = this.__iteratees__,
		          iterLength = iteratees.length,
		          resIndex = 0,
		          takeCount = nativeMin(length, this.__takeCount__);

		      if (!isArr || (!isRight && arrLength == length && takeCount == length)) {
		        return baseWrapperValue(array, this.__actions__);
		      }
		      var result = [];

		      outer:
		      while (length-- && resIndex < takeCount) {
		        index += dir;

		        var iterIndex = -1,
		            value = array[index];

		        while (++iterIndex < iterLength) {
		          var data = iteratees[iterIndex],
		              iteratee = data.iteratee,
		              type = data.type,
		              computed = iteratee(value);

		          if (type == LAZY_MAP_FLAG) {
		            value = computed;
		          } else if (!computed) {
		            if (type == LAZY_FILTER_FLAG) {
		              continue outer;
		            } else {
		              break outer;
		            }
		          }
		        }
		        result[resIndex++] = value;
		      }
		      return result;
		    }

		    // Ensure `LazyWrapper` is an instance of `baseLodash`.
		    LazyWrapper.prototype = baseCreate(baseLodash.prototype);
		    LazyWrapper.prototype.constructor = LazyWrapper;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a hash object.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function Hash(entries) {
		      var index = -1,
		          length = entries == null ? 0 : entries.length;

		      this.clear();
		      while (++index < length) {
		        var entry = entries[index];
		        this.set(entry[0], entry[1]);
		      }
		    }

		    /**
		     * Removes all key-value entries from the hash.
		     *
		     * @private
		     * @name clear
		     * @memberOf Hash
		     */
		    function hashClear() {
		      this.__data__ = nativeCreate ? nativeCreate(null) : {};
		      this.size = 0;
		    }

		    /**
		     * Removes `key` and its value from the hash.
		     *
		     * @private
		     * @name delete
		     * @memberOf Hash
		     * @param {Object} hash The hash to modify.
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function hashDelete(key) {
		      var result = this.has(key) && delete this.__data__[key];
		      this.size -= result ? 1 : 0;
		      return result;
		    }

		    /**
		     * Gets the hash value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf Hash
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function hashGet(key) {
		      var data = this.__data__;
		      if (nativeCreate) {
		        var result = data[key];
		        return result === HASH_UNDEFINED ? undefined$1 : result;
		      }
		      return hasOwnProperty.call(data, key) ? data[key] : undefined$1;
		    }

		    /**
		     * Checks if a hash value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf Hash
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function hashHas(key) {
		      var data = this.__data__;
		      return nativeCreate ? (data[key] !== undefined$1) : hasOwnProperty.call(data, key);
		    }

		    /**
		     * Sets the hash `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf Hash
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the hash instance.
		     */
		    function hashSet(key, value) {
		      var data = this.__data__;
		      this.size += this.has(key) ? 0 : 1;
		      data[key] = (nativeCreate && value === undefined$1) ? HASH_UNDEFINED : value;
		      return this;
		    }

		    // Add methods to `Hash`.
		    Hash.prototype.clear = hashClear;
		    Hash.prototype['delete'] = hashDelete;
		    Hash.prototype.get = hashGet;
		    Hash.prototype.has = hashHas;
		    Hash.prototype.set = hashSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an list cache object.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function ListCache(entries) {
		      var index = -1,
		          length = entries == null ? 0 : entries.length;

		      this.clear();
		      while (++index < length) {
		        var entry = entries[index];
		        this.set(entry[0], entry[1]);
		      }
		    }

		    /**
		     * Removes all key-value entries from the list cache.
		     *
		     * @private
		     * @name clear
		     * @memberOf ListCache
		     */
		    function listCacheClear() {
		      this.__data__ = [];
		      this.size = 0;
		    }

		    /**
		     * Removes `key` and its value from the list cache.
		     *
		     * @private
		     * @name delete
		     * @memberOf ListCache
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function listCacheDelete(key) {
		      var data = this.__data__,
		          index = assocIndexOf(data, key);

		      if (index < 0) {
		        return false;
		      }
		      var lastIndex = data.length - 1;
		      if (index == lastIndex) {
		        data.pop();
		      } else {
		        splice.call(data, index, 1);
		      }
		      --this.size;
		      return true;
		    }

		    /**
		     * Gets the list cache value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf ListCache
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function listCacheGet(key) {
		      var data = this.__data__,
		          index = assocIndexOf(data, key);

		      return index < 0 ? undefined$1 : data[index][1];
		    }

		    /**
		     * Checks if a list cache value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf ListCache
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function listCacheHas(key) {
		      return assocIndexOf(this.__data__, key) > -1;
		    }

		    /**
		     * Sets the list cache `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf ListCache
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the list cache instance.
		     */
		    function listCacheSet(key, value) {
		      var data = this.__data__,
		          index = assocIndexOf(data, key);

		      if (index < 0) {
		        ++this.size;
		        data.push([key, value]);
		      } else {
		        data[index][1] = value;
		      }
		      return this;
		    }

		    // Add methods to `ListCache`.
		    ListCache.prototype.clear = listCacheClear;
		    ListCache.prototype['delete'] = listCacheDelete;
		    ListCache.prototype.get = listCacheGet;
		    ListCache.prototype.has = listCacheHas;
		    ListCache.prototype.set = listCacheSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a map cache object to store key-value pairs.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function MapCache(entries) {
		      var index = -1,
		          length = entries == null ? 0 : entries.length;

		      this.clear();
		      while (++index < length) {
		        var entry = entries[index];
		        this.set(entry[0], entry[1]);
		      }
		    }

		    /**
		     * Removes all key-value entries from the map.
		     *
		     * @private
		     * @name clear
		     * @memberOf MapCache
		     */
		    function mapCacheClear() {
		      this.size = 0;
		      this.__data__ = {
		        'hash': new Hash,
		        'map': new (Map || ListCache),
		        'string': new Hash
		      };
		    }

		    /**
		     * Removes `key` and its value from the map.
		     *
		     * @private
		     * @name delete
		     * @memberOf MapCache
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function mapCacheDelete(key) {
		      var result = getMapData(this, key)['delete'](key);
		      this.size -= result ? 1 : 0;
		      return result;
		    }

		    /**
		     * Gets the map value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf MapCache
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function mapCacheGet(key) {
		      return getMapData(this, key).get(key);
		    }

		    /**
		     * Checks if a map value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf MapCache
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function mapCacheHas(key) {
		      return getMapData(this, key).has(key);
		    }

		    /**
		     * Sets the map `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf MapCache
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the map cache instance.
		     */
		    function mapCacheSet(key, value) {
		      var data = getMapData(this, key),
		          size = data.size;

		      data.set(key, value);
		      this.size += data.size == size ? 0 : 1;
		      return this;
		    }

		    // Add methods to `MapCache`.
		    MapCache.prototype.clear = mapCacheClear;
		    MapCache.prototype['delete'] = mapCacheDelete;
		    MapCache.prototype.get = mapCacheGet;
		    MapCache.prototype.has = mapCacheHas;
		    MapCache.prototype.set = mapCacheSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     *
		     * Creates an array cache object to store unique values.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [values] The values to cache.
		     */
		    function SetCache(values) {
		      var index = -1,
		          length = values == null ? 0 : values.length;

		      this.__data__ = new MapCache;
		      while (++index < length) {
		        this.add(values[index]);
		      }
		    }

		    /**
		     * Adds `value` to the array cache.
		     *
		     * @private
		     * @name add
		     * @memberOf SetCache
		     * @alias push
		     * @param {*} value The value to cache.
		     * @returns {Object} Returns the cache instance.
		     */
		    function setCacheAdd(value) {
		      this.__data__.set(value, HASH_UNDEFINED);
		      return this;
		    }

		    /**
		     * Checks if `value` is in the array cache.
		     *
		     * @private
		     * @name has
		     * @memberOf SetCache
		     * @param {*} value The value to search for.
		     * @returns {number} Returns `true` if `value` is found, else `false`.
		     */
		    function setCacheHas(value) {
		      return this.__data__.has(value);
		    }

		    // Add methods to `SetCache`.
		    SetCache.prototype.add = SetCache.prototype.push = setCacheAdd;
		    SetCache.prototype.has = setCacheHas;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a stack cache object to store key-value pairs.
		     *
		     * @private
		     * @constructor
		     * @param {Array} [entries] The key-value pairs to cache.
		     */
		    function Stack(entries) {
		      var data = this.__data__ = new ListCache(entries);
		      this.size = data.size;
		    }

		    /**
		     * Removes all key-value entries from the stack.
		     *
		     * @private
		     * @name clear
		     * @memberOf Stack
		     */
		    function stackClear() {
		      this.__data__ = new ListCache;
		      this.size = 0;
		    }

		    /**
		     * Removes `key` and its value from the stack.
		     *
		     * @private
		     * @name delete
		     * @memberOf Stack
		     * @param {string} key The key of the value to remove.
		     * @returns {boolean} Returns `true` if the entry was removed, else `false`.
		     */
		    function stackDelete(key) {
		      var data = this.__data__,
		          result = data['delete'](key);

		      this.size = data.size;
		      return result;
		    }

		    /**
		     * Gets the stack value for `key`.
		     *
		     * @private
		     * @name get
		     * @memberOf Stack
		     * @param {string} key The key of the value to get.
		     * @returns {*} Returns the entry value.
		     */
		    function stackGet(key) {
		      return this.__data__.get(key);
		    }

		    /**
		     * Checks if a stack value for `key` exists.
		     *
		     * @private
		     * @name has
		     * @memberOf Stack
		     * @param {string} key The key of the entry to check.
		     * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
		     */
		    function stackHas(key) {
		      return this.__data__.has(key);
		    }

		    /**
		     * Sets the stack `key` to `value`.
		     *
		     * @private
		     * @name set
		     * @memberOf Stack
		     * @param {string} key The key of the value to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns the stack cache instance.
		     */
		    function stackSet(key, value) {
		      var data = this.__data__;
		      if (data instanceof ListCache) {
		        var pairs = data.__data__;
		        if (!Map || (pairs.length < LARGE_ARRAY_SIZE - 1)) {
		          pairs.push([key, value]);
		          this.size = ++data.size;
		          return this;
		        }
		        data = this.__data__ = new MapCache(pairs);
		      }
		      data.set(key, value);
		      this.size = data.size;
		      return this;
		    }

		    // Add methods to `Stack`.
		    Stack.prototype.clear = stackClear;
		    Stack.prototype['delete'] = stackDelete;
		    Stack.prototype.get = stackGet;
		    Stack.prototype.has = stackHas;
		    Stack.prototype.set = stackSet;

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an array of the enumerable property names of the array-like `value`.
		     *
		     * @private
		     * @param {*} value The value to query.
		     * @param {boolean} inherited Specify returning inherited property names.
		     * @returns {Array} Returns the array of property names.
		     */
		    function arrayLikeKeys(value, inherited) {
		      var isArr = isArray(value),
		          isArg = !isArr && isArguments(value),
		          isBuff = !isArr && !isArg && isBuffer(value),
		          isType = !isArr && !isArg && !isBuff && isTypedArray(value),
		          skipIndexes = isArr || isArg || isBuff || isType,
		          result = skipIndexes ? baseTimes(value.length, String) : [],
		          length = result.length;

		      for (var key in value) {
		        if ((inherited || hasOwnProperty.call(value, key)) &&
		            !(skipIndexes && (
		               // Safari 9 has enumerable `arguments.length` in strict mode.
		               key == 'length' ||
		               // Node.js 0.10 has enumerable non-index properties on buffers.
		               (isBuff && (key == 'offset' || key == 'parent')) ||
		               // PhantomJS 2 has enumerable non-index properties on typed arrays.
		               (isType && (key == 'buffer' || key == 'byteLength' || key == 'byteOffset')) ||
		               // Skip index properties.
		               isIndex(key, length)
		            ))) {
		          result.push(key);
		        }
		      }
		      return result;
		    }

		    /**
		     * A specialized version of `_.sample` for arrays.
		     *
		     * @private
		     * @param {Array} array The array to sample.
		     * @returns {*} Returns the random element.
		     */
		    function arraySample(array) {
		      var length = array.length;
		      return length ? array[baseRandom(0, length - 1)] : undefined$1;
		    }

		    /**
		     * A specialized version of `_.sampleSize` for arrays.
		     *
		     * @private
		     * @param {Array} array The array to sample.
		     * @param {number} n The number of elements to sample.
		     * @returns {Array} Returns the random elements.
		     */
		    function arraySampleSize(array, n) {
		      return shuffleSelf(copyArray(array), baseClamp(n, 0, array.length));
		    }

		    /**
		     * A specialized version of `_.shuffle` for arrays.
		     *
		     * @private
		     * @param {Array} array The array to shuffle.
		     * @returns {Array} Returns the new shuffled array.
		     */
		    function arrayShuffle(array) {
		      return shuffleSelf(copyArray(array));
		    }

		    /**
		     * This function is like `assignValue` except that it doesn't assign
		     * `undefined` values.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {string} key The key of the property to assign.
		     * @param {*} value The value to assign.
		     */
		    function assignMergeValue(object, key, value) {
		      if ((value !== undefined$1 && !eq(object[key], value)) ||
		          (value === undefined$1 && !(key in object))) {
		        baseAssignValue(object, key, value);
		      }
		    }

		    /**
		     * Assigns `value` to `key` of `object` if the existing value is not equivalent
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {string} key The key of the property to assign.
		     * @param {*} value The value to assign.
		     */
		    function assignValue(object, key, value) {
		      var objValue = object[key];
		      if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
		          (value === undefined$1 && !(key in object))) {
		        baseAssignValue(object, key, value);
		      }
		    }

		    /**
		     * Gets the index at which the `key` is found in `array` of key-value pairs.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {*} key The key to search for.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     */
		    function assocIndexOf(array, key) {
		      var length = array.length;
		      while (length--) {
		        if (eq(array[length][0], key)) {
		          return length;
		        }
		      }
		      return -1;
		    }

		    /**
		     * Aggregates elements of `collection` on `accumulator` with keys transformed
		     * by `iteratee` and values set by `setter`.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} setter The function to set `accumulator` values.
		     * @param {Function} iteratee The iteratee to transform keys.
		     * @param {Object} accumulator The initial aggregated object.
		     * @returns {Function} Returns `accumulator`.
		     */
		    function baseAggregator(collection, setter, iteratee, accumulator) {
		      baseEach(collection, function(value, key, collection) {
		        setter(accumulator, value, iteratee(value), collection);
		      });
		      return accumulator;
		    }

		    /**
		     * The base implementation of `_.assign` without support for multiple sources
		     * or `customizer` functions.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @returns {Object} Returns `object`.
		     */
		    function baseAssign(object, source) {
		      return object && copyObject(source, keys(source), object);
		    }

		    /**
		     * The base implementation of `_.assignIn` without support for multiple sources
		     * or `customizer` functions.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @returns {Object} Returns `object`.
		     */
		    function baseAssignIn(object, source) {
		      return object && copyObject(source, keysIn(source), object);
		    }

		    /**
		     * The base implementation of `assignValue` and `assignMergeValue` without
		     * value checks.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {string} key The key of the property to assign.
		     * @param {*} value The value to assign.
		     */
		    function baseAssignValue(object, key, value) {
		      if (key == '__proto__' && defineProperty) {
		        defineProperty(object, key, {
		          'configurable': true,
		          'enumerable': true,
		          'value': value,
		          'writable': true
		        });
		      } else {
		        object[key] = value;
		      }
		    }

		    /**
		     * The base implementation of `_.at` without support for individual paths.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {string[]} paths The property paths to pick.
		     * @returns {Array} Returns the picked elements.
		     */
		    function baseAt(object, paths) {
		      var index = -1,
		          length = paths.length,
		          result = Array(length),
		          skip = object == null;

		      while (++index < length) {
		        result[index] = skip ? undefined$1 : get(object, paths[index]);
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.clamp` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {number} number The number to clamp.
		     * @param {number} [lower] The lower bound.
		     * @param {number} upper The upper bound.
		     * @returns {number} Returns the clamped number.
		     */
		    function baseClamp(number, lower, upper) {
		      if (number === number) {
		        if (upper !== undefined$1) {
		          number = number <= upper ? number : upper;
		        }
		        if (lower !== undefined$1) {
		          number = number >= lower ? number : lower;
		        }
		      }
		      return number;
		    }

		    /**
		     * The base implementation of `_.clone` and `_.cloneDeep` which tracks
		     * traversed objects.
		     *
		     * @private
		     * @param {*} value The value to clone.
		     * @param {boolean} bitmask The bitmask flags.
		     *  1 - Deep clone
		     *  2 - Flatten inherited properties
		     *  4 - Clone symbols
		     * @param {Function} [customizer] The function to customize cloning.
		     * @param {string} [key] The key of `value`.
		     * @param {Object} [object] The parent object of `value`.
		     * @param {Object} [stack] Tracks traversed objects and their clone counterparts.
		     * @returns {*} Returns the cloned value.
		     */
		    function baseClone(value, bitmask, customizer, key, object, stack) {
		      var result,
		          isDeep = bitmask & CLONE_DEEP_FLAG,
		          isFlat = bitmask & CLONE_FLAT_FLAG,
		          isFull = bitmask & CLONE_SYMBOLS_FLAG;

		      if (customizer) {
		        result = object ? customizer(value, key, object, stack) : customizer(value);
		      }
		      if (result !== undefined$1) {
		        return result;
		      }
		      if (!isObject(value)) {
		        return value;
		      }
		      var isArr = isArray(value);
		      if (isArr) {
		        result = initCloneArray(value);
		        if (!isDeep) {
		          return copyArray(value, result);
		        }
		      } else {
		        var tag = getTag(value),
		            isFunc = tag == funcTag || tag == genTag;

		        if (isBuffer(value)) {
		          return cloneBuffer(value, isDeep);
		        }
		        if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
		          result = (isFlat || isFunc) ? {} : initCloneObject(value);
		          if (!isDeep) {
		            return isFlat
		              ? copySymbolsIn(value, baseAssignIn(result, value))
		              : copySymbols(value, baseAssign(result, value));
		          }
		        } else {
		          if (!cloneableTags[tag]) {
		            return object ? value : {};
		          }
		          result = initCloneByTag(value, tag, isDeep);
		        }
		      }
		      // Check for circular references and return its corresponding clone.
		      stack || (stack = new Stack);
		      var stacked = stack.get(value);
		      if (stacked) {
		        return stacked;
		      }
		      stack.set(value, result);

		      if (isSet(value)) {
		        value.forEach(function(subValue) {
		          result.add(baseClone(subValue, bitmask, customizer, subValue, value, stack));
		        });
		      } else if (isMap(value)) {
		        value.forEach(function(subValue, key) {
		          result.set(key, baseClone(subValue, bitmask, customizer, key, value, stack));
		        });
		      }

		      var keysFunc = isFull
		        ? (isFlat ? getAllKeysIn : getAllKeys)
		        : (isFlat ? keysIn : keys);

		      var props = isArr ? undefined$1 : keysFunc(value);
		      arrayEach(props || value, function(subValue, key) {
		        if (props) {
		          key = subValue;
		          subValue = value[key];
		        }
		        // Recursively populate clone (susceptible to call stack limits).
		        assignValue(result, key, baseClone(subValue, bitmask, customizer, key, value, stack));
		      });
		      return result;
		    }

		    /**
		     * The base implementation of `_.conforms` which doesn't clone `source`.
		     *
		     * @private
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {Function} Returns the new spec function.
		     */
		    function baseConforms(source) {
		      var props = keys(source);
		      return function(object) {
		        return baseConformsTo(object, source, props);
		      };
		    }

		    /**
		     * The base implementation of `_.conformsTo` which accepts `props` to check.
		     *
		     * @private
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
		     */
		    function baseConformsTo(object, source, props) {
		      var length = props.length;
		      if (object == null) {
		        return !length;
		      }
		      object = Object(object);
		      while (length--) {
		        var key = props[length],
		            predicate = source[key],
		            value = object[key];

		        if ((value === undefined$1 && !(key in object)) || !predicate(value)) {
		          return false;
		        }
		      }
		      return true;
		    }

		    /**
		     * The base implementation of `_.delay` and `_.defer` which accepts `args`
		     * to provide to `func`.
		     *
		     * @private
		     * @param {Function} func The function to delay.
		     * @param {number} wait The number of milliseconds to delay invocation.
		     * @param {Array} args The arguments to provide to `func`.
		     * @returns {number|Object} Returns the timer id or timeout object.
		     */
		    function baseDelay(func, wait, args) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      return setTimeout(function() { func.apply(undefined$1, args); }, wait);
		    }

		    /**
		     * The base implementation of methods like `_.difference` without support
		     * for excluding multiple arrays or iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {Array} values The values to exclude.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     */
		    function baseDifference(array, values, iteratee, comparator) {
		      var index = -1,
		          includes = arrayIncludes,
		          isCommon = true,
		          length = array.length,
		          result = [],
		          valuesLength = values.length;

		      if (!length) {
		        return result;
		      }
		      if (iteratee) {
		        values = arrayMap(values, baseUnary(iteratee));
		      }
		      if (comparator) {
		        includes = arrayIncludesWith;
		        isCommon = false;
		      }
		      else if (values.length >= LARGE_ARRAY_SIZE) {
		        includes = cacheHas;
		        isCommon = false;
		        values = new SetCache(values);
		      }
		      outer:
		      while (++index < length) {
		        var value = array[index],
		            computed = iteratee == null ? value : iteratee(value);

		        value = (comparator || value !== 0) ? value : 0;
		        if (isCommon && computed === computed) {
		          var valuesIndex = valuesLength;
		          while (valuesIndex--) {
		            if (values[valuesIndex] === computed) {
		              continue outer;
		            }
		          }
		          result.push(value);
		        }
		        else if (!includes(values, computed, comparator)) {
		          result.push(value);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.forEach` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     */
		    var baseEach = createBaseEach(baseForOwn);

		    /**
		     * The base implementation of `_.forEachRight` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     */
		    var baseEachRight = createBaseEach(baseForOwnRight, true);

		    /**
		     * The base implementation of `_.every` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} predicate The function invoked per iteration.
		     * @returns {boolean} Returns `true` if all elements pass the predicate check,
		     *  else `false`
		     */
		    function baseEvery(collection, predicate) {
		      var result = true;
		      baseEach(collection, function(value, index, collection) {
		        result = !!predicate(value, index, collection);
		        return result;
		      });
		      return result;
		    }

		    /**
		     * The base implementation of methods like `_.max` and `_.min` which accepts a
		     * `comparator` to determine the extremum value.
		     *
		     * @private
		     * @param {Array} array The array to iterate over.
		     * @param {Function} iteratee The iteratee invoked per iteration.
		     * @param {Function} comparator The comparator used to compare values.
		     * @returns {*} Returns the extremum value.
		     */
		    function baseExtremum(array, iteratee, comparator) {
		      var index = -1,
		          length = array.length;

		      while (++index < length) {
		        var value = array[index],
		            current = iteratee(value);

		        if (current != null && (computed === undefined$1
		              ? (current === current && !isSymbol(current))
		              : comparator(current, computed)
		            )) {
		          var computed = current,
		              result = value;
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.fill` without an iteratee call guard.
		     *
		     * @private
		     * @param {Array} array The array to fill.
		     * @param {*} value The value to fill `array` with.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns `array`.
		     */
		    function baseFill(array, value, start, end) {
		      var length = array.length;

		      start = toInteger(start);
		      if (start < 0) {
		        start = -start > length ? 0 : (length + start);
		      }
		      end = (end === undefined$1 || end > length) ? length : toInteger(end);
		      if (end < 0) {
		        end += length;
		      }
		      end = start > end ? 0 : toLength(end);
		      while (start < end) {
		        array[start++] = value;
		      }
		      return array;
		    }

		    /**
		     * The base implementation of `_.filter` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} predicate The function invoked per iteration.
		     * @returns {Array} Returns the new filtered array.
		     */
		    function baseFilter(collection, predicate) {
		      var result = [];
		      baseEach(collection, function(value, index, collection) {
		        if (predicate(value, index, collection)) {
		          result.push(value);
		        }
		      });
		      return result;
		    }

		    /**
		     * The base implementation of `_.flatten` with support for restricting flattening.
		     *
		     * @private
		     * @param {Array} array The array to flatten.
		     * @param {number} depth The maximum recursion depth.
		     * @param {boolean} [predicate=isFlattenable] The function invoked per iteration.
		     * @param {boolean} [isStrict] Restrict to values that pass `predicate` checks.
		     * @param {Array} [result=[]] The initial result value.
		     * @returns {Array} Returns the new flattened array.
		     */
		    function baseFlatten(array, depth, predicate, isStrict, result) {
		      var index = -1,
		          length = array.length;

		      predicate || (predicate = isFlattenable);
		      result || (result = []);

		      while (++index < length) {
		        var value = array[index];
		        if (depth > 0 && predicate(value)) {
		          if (depth > 1) {
		            // Recursively flatten arrays (susceptible to call stack limits).
		            baseFlatten(value, depth - 1, predicate, isStrict, result);
		          } else {
		            arrayPush(result, value);
		          }
		        } else if (!isStrict) {
		          result[result.length] = value;
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `baseForOwn` which iterates over `object`
		     * properties returned by `keysFunc` and invokes `iteratee` for each property.
		     * Iteratee functions may exit iteration early by explicitly returning `false`.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @param {Function} keysFunc The function to get the keys of `object`.
		     * @returns {Object} Returns `object`.
		     */
		    var baseFor = createBaseFor();

		    /**
		     * This function is like `baseFor` except that it iterates over properties
		     * in the opposite order.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @param {Function} keysFunc The function to get the keys of `object`.
		     * @returns {Object} Returns `object`.
		     */
		    var baseForRight = createBaseFor(true);

		    /**
		     * The base implementation of `_.forOwn` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     */
		    function baseForOwn(object, iteratee) {
		      return object && baseFor(object, iteratee, keys);
		    }

		    /**
		     * The base implementation of `_.forOwnRight` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     */
		    function baseForOwnRight(object, iteratee) {
		      return object && baseForRight(object, iteratee, keys);
		    }

		    /**
		     * The base implementation of `_.functions` which creates an array of
		     * `object` function property names filtered from `props`.
		     *
		     * @private
		     * @param {Object} object The object to inspect.
		     * @param {Array} props The property names to filter.
		     * @returns {Array} Returns the function names.
		     */
		    function baseFunctions(object, props) {
		      return arrayFilter(props, function(key) {
		        return isFunction(object[key]);
		      });
		    }

		    /**
		     * The base implementation of `_.get` without support for default values.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the property to get.
		     * @returns {*} Returns the resolved value.
		     */
		    function baseGet(object, path) {
		      path = castPath(path, object);

		      var index = 0,
		          length = path.length;

		      while (object != null && index < length) {
		        object = object[toKey(path[index++])];
		      }
		      return (index && index == length) ? object : undefined$1;
		    }

		    /**
		     * The base implementation of `getAllKeys` and `getAllKeysIn` which uses
		     * `keysFunc` and `symbolsFunc` to get the enumerable property names and
		     * symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Function} keysFunc The function to get the keys of `object`.
		     * @param {Function} symbolsFunc The function to get the symbols of `object`.
		     * @returns {Array} Returns the array of property names and symbols.
		     */
		    function baseGetAllKeys(object, keysFunc, symbolsFunc) {
		      var result = keysFunc(object);
		      return isArray(object) ? result : arrayPush(result, symbolsFunc(object));
		    }

		    /**
		     * The base implementation of `getTag` without fallbacks for buggy environments.
		     *
		     * @private
		     * @param {*} value The value to query.
		     * @returns {string} Returns the `toStringTag`.
		     */
		    function baseGetTag(value) {
		      if (value == null) {
		        return value === undefined$1 ? undefinedTag : nullTag;
		      }
		      return (symToStringTag && symToStringTag in Object(value))
		        ? getRawTag(value)
		        : objectToString(value);
		    }

		    /**
		     * The base implementation of `_.gt` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is greater than `other`,
		     *  else `false`.
		     */
		    function baseGt(value, other) {
		      return value > other;
		    }

		    /**
		     * The base implementation of `_.has` without support for deep paths.
		     *
		     * @private
		     * @param {Object} [object] The object to query.
		     * @param {Array|string} key The key to check.
		     * @returns {boolean} Returns `true` if `key` exists, else `false`.
		     */
		    function baseHas(object, key) {
		      return object != null && hasOwnProperty.call(object, key);
		    }

		    /**
		     * The base implementation of `_.hasIn` without support for deep paths.
		     *
		     * @private
		     * @param {Object} [object] The object to query.
		     * @param {Array|string} key The key to check.
		     * @returns {boolean} Returns `true` if `key` exists, else `false`.
		     */
		    function baseHasIn(object, key) {
		      return object != null && key in Object(object);
		    }

		    /**
		     * The base implementation of `_.inRange` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {number} number The number to check.
		     * @param {number} start The start of the range.
		     * @param {number} end The end of the range.
		     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
		     */
		    function baseInRange(number, start, end) {
		      return number >= nativeMin(start, end) && number < nativeMax(start, end);
		    }

		    /**
		     * The base implementation of methods like `_.intersection`, without support
		     * for iteratee shorthands, that accepts an array of arrays to inspect.
		     *
		     * @private
		     * @param {Array} arrays The arrays to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of shared values.
		     */
		    function baseIntersection(arrays, iteratee, comparator) {
		      var includes = comparator ? arrayIncludesWith : arrayIncludes,
		          length = arrays[0].length,
		          othLength = arrays.length,
		          othIndex = othLength,
		          caches = Array(othLength),
		          maxLength = Infinity,
		          result = [];

		      while (othIndex--) {
		        var array = arrays[othIndex];
		        if (othIndex && iteratee) {
		          array = arrayMap(array, baseUnary(iteratee));
		        }
		        maxLength = nativeMin(array.length, maxLength);
		        caches[othIndex] = !comparator && (iteratee || (length >= 120 && array.length >= 120))
		          ? new SetCache(othIndex && array)
		          : undefined$1;
		      }
		      array = arrays[0];

		      var index = -1,
		          seen = caches[0];

		      outer:
		      while (++index < length && result.length < maxLength) {
		        var value = array[index],
		            computed = iteratee ? iteratee(value) : value;

		        value = (comparator || value !== 0) ? value : 0;
		        if (!(seen
		              ? cacheHas(seen, computed)
		              : includes(result, computed, comparator)
		            )) {
		          othIndex = othLength;
		          while (--othIndex) {
		            var cache = caches[othIndex];
		            if (!(cache
		                  ? cacheHas(cache, computed)
		                  : includes(arrays[othIndex], computed, comparator))
		                ) {
		              continue outer;
		            }
		          }
		          if (seen) {
		            seen.push(computed);
		          }
		          result.push(value);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.invert` and `_.invertBy` which inverts
		     * `object` with values transformed by `iteratee` and set by `setter`.
		     *
		     * @private
		     * @param {Object} object The object to iterate over.
		     * @param {Function} setter The function to set `accumulator` values.
		     * @param {Function} iteratee The iteratee to transform values.
		     * @param {Object} accumulator The initial inverted object.
		     * @returns {Function} Returns `accumulator`.
		     */
		    function baseInverter(object, setter, iteratee, accumulator) {
		      baseForOwn(object, function(value, key, object) {
		        setter(accumulator, iteratee(value), key, object);
		      });
		      return accumulator;
		    }

		    /**
		     * The base implementation of `_.invoke` without support for individual
		     * method arguments.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the method to invoke.
		     * @param {Array} args The arguments to invoke the method with.
		     * @returns {*} Returns the result of the invoked method.
		     */
		    function baseInvoke(object, path, args) {
		      path = castPath(path, object);
		      object = parent(object, path);
		      var func = object == null ? object : object[toKey(last(path))];
		      return func == null ? undefined$1 : apply(func, object, args);
		    }

		    /**
		     * The base implementation of `_.isArguments`.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
		     */
		    function baseIsArguments(value) {
		      return isObjectLike(value) && baseGetTag(value) == argsTag;
		    }

		    /**
		     * The base implementation of `_.isArrayBuffer` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
		     */
		    function baseIsArrayBuffer(value) {
		      return isObjectLike(value) && baseGetTag(value) == arrayBufferTag;
		    }

		    /**
		     * The base implementation of `_.isDate` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
		     */
		    function baseIsDate(value) {
		      return isObjectLike(value) && baseGetTag(value) == dateTag;
		    }

		    /**
		     * The base implementation of `_.isEqual` which supports partial comparisons
		     * and tracks traversed objects.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @param {boolean} bitmask The bitmask flags.
		     *  1 - Unordered comparison
		     *  2 - Partial comparison
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @param {Object} [stack] Tracks traversed `value` and `other` objects.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     */
		    function baseIsEqual(value, other, bitmask, customizer, stack) {
		      if (value === other) {
		        return true;
		      }
		      if (value == null || other == null || (!isObjectLike(value) && !isObjectLike(other))) {
		        return value !== value && other !== other;
		      }
		      return baseIsEqualDeep(value, other, bitmask, customizer, baseIsEqual, stack);
		    }

		    /**
		     * A specialized version of `baseIsEqual` for arrays and objects which performs
		     * deep comparisons and tracks traversed objects enabling objects with circular
		     * references to be compared.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} [stack] Tracks traversed `object` and `other` objects.
		     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
		     */
		    function baseIsEqualDeep(object, other, bitmask, customizer, equalFunc, stack) {
		      var objIsArr = isArray(object),
		          othIsArr = isArray(other),
		          objTag = objIsArr ? arrayTag : getTag(object),
		          othTag = othIsArr ? arrayTag : getTag(other);

		      objTag = objTag == argsTag ? objectTag : objTag;
		      othTag = othTag == argsTag ? objectTag : othTag;

		      var objIsObj = objTag == objectTag,
		          othIsObj = othTag == objectTag,
		          isSameTag = objTag == othTag;

		      if (isSameTag && isBuffer(object)) {
		        if (!isBuffer(other)) {
		          return false;
		        }
		        objIsArr = true;
		        objIsObj = false;
		      }
		      if (isSameTag && !objIsObj) {
		        stack || (stack = new Stack);
		        return (objIsArr || isTypedArray(object))
		          ? equalArrays(object, other, bitmask, customizer, equalFunc, stack)
		          : equalByTag(object, other, objTag, bitmask, customizer, equalFunc, stack);
		      }
		      if (!(bitmask & COMPARE_PARTIAL_FLAG)) {
		        var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
		            othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

		        if (objIsWrapped || othIsWrapped) {
		          var objUnwrapped = objIsWrapped ? object.value() : object,
		              othUnwrapped = othIsWrapped ? other.value() : other;

		          stack || (stack = new Stack);
		          return equalFunc(objUnwrapped, othUnwrapped, bitmask, customizer, stack);
		        }
		      }
		      if (!isSameTag) {
		        return false;
		      }
		      stack || (stack = new Stack);
		      return equalObjects(object, other, bitmask, customizer, equalFunc, stack);
		    }

		    /**
		     * The base implementation of `_.isMap` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
		     */
		    function baseIsMap(value) {
		      return isObjectLike(value) && getTag(value) == mapTag;
		    }

		    /**
		     * The base implementation of `_.isMatch` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property values to match.
		     * @param {Array} matchData The property names, values, and compare flags to match.
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
		     */
		    function baseIsMatch(object, source, matchData, customizer) {
		      var index = matchData.length,
		          length = index,
		          noCustomizer = !customizer;

		      if (object == null) {
		        return !length;
		      }
		      object = Object(object);
		      while (index--) {
		        var data = matchData[index];
		        if ((noCustomizer && data[2])
		              ? data[1] !== object[data[0]]
		              : !(data[0] in object)
		            ) {
		          return false;
		        }
		      }
		      while (++index < length) {
		        data = matchData[index];
		        var key = data[0],
		            objValue = object[key],
		            srcValue = data[1];

		        if (noCustomizer && data[2]) {
		          if (objValue === undefined$1 && !(key in object)) {
		            return false;
		          }
		        } else {
		          var stack = new Stack;
		          if (customizer) {
		            var result = customizer(objValue, srcValue, key, object, source, stack);
		          }
		          if (!(result === undefined$1
		                ? baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG, customizer, stack)
		                : result
		              )) {
		            return false;
		          }
		        }
		      }
		      return true;
		    }

		    /**
		     * The base implementation of `_.isNative` without bad shim checks.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a native function,
		     *  else `false`.
		     */
		    function baseIsNative(value) {
		      if (!isObject(value) || isMasked(value)) {
		        return false;
		      }
		      var pattern = isFunction(value) ? reIsNative : reIsHostCtor;
		      return pattern.test(toSource(value));
		    }

		    /**
		     * The base implementation of `_.isRegExp` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
		     */
		    function baseIsRegExp(value) {
		      return isObjectLike(value) && baseGetTag(value) == regexpTag;
		    }

		    /**
		     * The base implementation of `_.isSet` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
		     */
		    function baseIsSet(value) {
		      return isObjectLike(value) && getTag(value) == setTag;
		    }

		    /**
		     * The base implementation of `_.isTypedArray` without Node.js optimizations.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
		     */
		    function baseIsTypedArray(value) {
		      return isObjectLike(value) &&
		        isLength(value.length) && !!typedArrayTags[baseGetTag(value)];
		    }

		    /**
		     * The base implementation of `_.iteratee`.
		     *
		     * @private
		     * @param {*} [value=_.identity] The value to convert to an iteratee.
		     * @returns {Function} Returns the iteratee.
		     */
		    function baseIteratee(value) {
		      // Don't store the `typeof` result in a variable to avoid a JIT bug in Safari 9.
		      // See https://bugs.webkit.org/show_bug.cgi?id=156034 for more details.
		      if (typeof value == 'function') {
		        return value;
		      }
		      if (value == null) {
		        return identity;
		      }
		      if (typeof value == 'object') {
		        return isArray(value)
		          ? baseMatchesProperty(value[0], value[1])
		          : baseMatches(value);
		      }
		      return property(value);
		    }

		    /**
		     * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     */
		    function baseKeys(object) {
		      if (!isPrototype(object)) {
		        return nativeKeys(object);
		      }
		      var result = [];
		      for (var key in Object(object)) {
		        if (hasOwnProperty.call(object, key) && key != 'constructor') {
		          result.push(key);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     */
		    function baseKeysIn(object) {
		      if (!isObject(object)) {
		        return nativeKeysIn(object);
		      }
		      var isProto = isPrototype(object),
		          result = [];

		      for (var key in object) {
		        if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
		          result.push(key);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.lt` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is less than `other`,
		     *  else `false`.
		     */
		    function baseLt(value, other) {
		      return value < other;
		    }

		    /**
		     * The base implementation of `_.map` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} iteratee The function invoked per iteration.
		     * @returns {Array} Returns the new mapped array.
		     */
		    function baseMap(collection, iteratee) {
		      var index = -1,
		          result = isArrayLike(collection) ? Array(collection.length) : [];

		      baseEach(collection, function(value, key, collection) {
		        result[++index] = iteratee(value, key, collection);
		      });
		      return result;
		    }

		    /**
		     * The base implementation of `_.matches` which doesn't clone `source`.
		     *
		     * @private
		     * @param {Object} source The object of property values to match.
		     * @returns {Function} Returns the new spec function.
		     */
		    function baseMatches(source) {
		      var matchData = getMatchData(source);
		      if (matchData.length == 1 && matchData[0][2]) {
		        return matchesStrictComparable(matchData[0][0], matchData[0][1]);
		      }
		      return function(object) {
		        return object === source || baseIsMatch(object, source, matchData);
		      };
		    }

		    /**
		     * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
		     *
		     * @private
		     * @param {string} path The path of the property to get.
		     * @param {*} srcValue The value to match.
		     * @returns {Function} Returns the new spec function.
		     */
		    function baseMatchesProperty(path, srcValue) {
		      if (isKey(path) && isStrictComparable(srcValue)) {
		        return matchesStrictComparable(toKey(path), srcValue);
		      }
		      return function(object) {
		        var objValue = get(object, path);
		        return (objValue === undefined$1 && objValue === srcValue)
		          ? hasIn(object, path)
		          : baseIsEqual(srcValue, objValue, COMPARE_PARTIAL_FLAG | COMPARE_UNORDERED_FLAG);
		      };
		    }

		    /**
		     * The base implementation of `_.merge` without support for multiple sources.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @param {number} srcIndex The index of `source`.
		     * @param {Function} [customizer] The function to customize merged values.
		     * @param {Object} [stack] Tracks traversed source values and their merged
		     *  counterparts.
		     */
		    function baseMerge(object, source, srcIndex, customizer, stack) {
		      if (object === source) {
		        return;
		      }
		      baseFor(source, function(srcValue, key) {
		        stack || (stack = new Stack);
		        if (isObject(srcValue)) {
		          baseMergeDeep(object, source, key, srcIndex, baseMerge, customizer, stack);
		        }
		        else {
		          var newValue = customizer
		            ? customizer(safeGet(object, key), srcValue, (key + ''), object, source, stack)
		            : undefined$1;

		          if (newValue === undefined$1) {
		            newValue = srcValue;
		          }
		          assignMergeValue(object, key, newValue);
		        }
		      }, keysIn);
		    }

		    /**
		     * A specialized version of `baseMerge` for arrays and objects which performs
		     * deep merges and tracks traversed objects enabling objects with circular
		     * references to be merged.
		     *
		     * @private
		     * @param {Object} object The destination object.
		     * @param {Object} source The source object.
		     * @param {string} key The key of the value to merge.
		     * @param {number} srcIndex The index of `source`.
		     * @param {Function} mergeFunc The function to merge values.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @param {Object} [stack] Tracks traversed source values and their merged
		     *  counterparts.
		     */
		    function baseMergeDeep(object, source, key, srcIndex, mergeFunc, customizer, stack) {
		      var objValue = safeGet(object, key),
		          srcValue = safeGet(source, key),
		          stacked = stack.get(srcValue);

		      if (stacked) {
		        assignMergeValue(object, key, stacked);
		        return;
		      }
		      var newValue = customizer
		        ? customizer(objValue, srcValue, (key + ''), object, source, stack)
		        : undefined$1;

		      var isCommon = newValue === undefined$1;

		      if (isCommon) {
		        var isArr = isArray(srcValue),
		            isBuff = !isArr && isBuffer(srcValue),
		            isTyped = !isArr && !isBuff && isTypedArray(srcValue);

		        newValue = srcValue;
		        if (isArr || isBuff || isTyped) {
		          if (isArray(objValue)) {
		            newValue = objValue;
		          }
		          else if (isArrayLikeObject(objValue)) {
		            newValue = copyArray(objValue);
		          }
		          else if (isBuff) {
		            isCommon = false;
		            newValue = cloneBuffer(srcValue, true);
		          }
		          else if (isTyped) {
		            isCommon = false;
		            newValue = cloneTypedArray(srcValue, true);
		          }
		          else {
		            newValue = [];
		          }
		        }
		        else if (isPlainObject(srcValue) || isArguments(srcValue)) {
		          newValue = objValue;
		          if (isArguments(objValue)) {
		            newValue = toPlainObject(objValue);
		          }
		          else if (!isObject(objValue) || isFunction(objValue)) {
		            newValue = initCloneObject(srcValue);
		          }
		        }
		        else {
		          isCommon = false;
		        }
		      }
		      if (isCommon) {
		        // Recursively merge objects and arrays (susceptible to call stack limits).
		        stack.set(srcValue, newValue);
		        mergeFunc(newValue, srcValue, srcIndex, customizer, stack);
		        stack['delete'](srcValue);
		      }
		      assignMergeValue(object, key, newValue);
		    }

		    /**
		     * The base implementation of `_.nth` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {Array} array The array to query.
		     * @param {number} n The index of the element to return.
		     * @returns {*} Returns the nth element of `array`.
		     */
		    function baseNth(array, n) {
		      var length = array.length;
		      if (!length) {
		        return;
		      }
		      n += n < 0 ? length : 0;
		      return isIndex(n, length) ? array[n] : undefined$1;
		    }

		    /**
		     * The base implementation of `_.orderBy` without param guards.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function[]|Object[]|string[]} iteratees The iteratees to sort by.
		     * @param {string[]} orders The sort orders of `iteratees`.
		     * @returns {Array} Returns the new sorted array.
		     */
		    function baseOrderBy(collection, iteratees, orders) {
		      if (iteratees.length) {
		        iteratees = arrayMap(iteratees, function(iteratee) {
		          if (isArray(iteratee)) {
		            return function(value) {
		              return baseGet(value, iteratee.length === 1 ? iteratee[0] : iteratee);
		            };
		          }
		          return iteratee;
		        });
		      } else {
		        iteratees = [identity];
		      }

		      var index = -1;
		      iteratees = arrayMap(iteratees, baseUnary(getIteratee()));

		      var result = baseMap(collection, function(value, key, collection) {
		        var criteria = arrayMap(iteratees, function(iteratee) {
		          return iteratee(value);
		        });
		        return { 'criteria': criteria, 'index': ++index, 'value': value };
		      });

		      return baseSortBy(result, function(object, other) {
		        return compareMultiple(object, other, orders);
		      });
		    }

		    /**
		     * The base implementation of `_.pick` without support for individual
		     * property identifiers.
		     *
		     * @private
		     * @param {Object} object The source object.
		     * @param {string[]} paths The property paths to pick.
		     * @returns {Object} Returns the new object.
		     */
		    function basePick(object, paths) {
		      return basePickBy(object, paths, function(value, path) {
		        return hasIn(object, path);
		      });
		    }

		    /**
		     * The base implementation of  `_.pickBy` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Object} object The source object.
		     * @param {string[]} paths The property paths to pick.
		     * @param {Function} predicate The function invoked per property.
		     * @returns {Object} Returns the new object.
		     */
		    function basePickBy(object, paths, predicate) {
		      var index = -1,
		          length = paths.length,
		          result = {};

		      while (++index < length) {
		        var path = paths[index],
		            value = baseGet(object, path);

		        if (predicate(value, path)) {
		          baseSet(result, castPath(path, object), value);
		        }
		      }
		      return result;
		    }

		    /**
		     * A specialized version of `baseProperty` which supports deep paths.
		     *
		     * @private
		     * @param {Array|string} path The path of the property to get.
		     * @returns {Function} Returns the new accessor function.
		     */
		    function basePropertyDeep(path) {
		      return function(object) {
		        return baseGet(object, path);
		      };
		    }

		    /**
		     * The base implementation of `_.pullAllBy` without support for iteratee
		     * shorthands.
		     *
		     * @private
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns `array`.
		     */
		    function basePullAll(array, values, iteratee, comparator) {
		      var indexOf = comparator ? baseIndexOfWith : baseIndexOf,
		          index = -1,
		          length = values.length,
		          seen = array;

		      if (array === values) {
		        values = copyArray(values);
		      }
		      if (iteratee) {
		        seen = arrayMap(array, baseUnary(iteratee));
		      }
		      while (++index < length) {
		        var fromIndex = 0,
		            value = values[index],
		            computed = iteratee ? iteratee(value) : value;

		        while ((fromIndex = indexOf(seen, computed, fromIndex, comparator)) > -1) {
		          if (seen !== array) {
		            splice.call(seen, fromIndex, 1);
		          }
		          splice.call(array, fromIndex, 1);
		        }
		      }
		      return array;
		    }

		    /**
		     * The base implementation of `_.pullAt` without support for individual
		     * indexes or capturing the removed elements.
		     *
		     * @private
		     * @param {Array} array The array to modify.
		     * @param {number[]} indexes The indexes of elements to remove.
		     * @returns {Array} Returns `array`.
		     */
		    function basePullAt(array, indexes) {
		      var length = array ? indexes.length : 0,
		          lastIndex = length - 1;

		      while (length--) {
		        var index = indexes[length];
		        if (length == lastIndex || index !== previous) {
		          var previous = index;
		          if (isIndex(index)) {
		            splice.call(array, index, 1);
		          } else {
		            baseUnset(array, index);
		          }
		        }
		      }
		      return array;
		    }

		    /**
		     * The base implementation of `_.random` without support for returning
		     * floating-point numbers.
		     *
		     * @private
		     * @param {number} lower The lower bound.
		     * @param {number} upper The upper bound.
		     * @returns {number} Returns the random number.
		     */
		    function baseRandom(lower, upper) {
		      return lower + nativeFloor(nativeRandom() * (upper - lower + 1));
		    }

		    /**
		     * The base implementation of `_.range` and `_.rangeRight` which doesn't
		     * coerce arguments.
		     *
		     * @private
		     * @param {number} start The start of the range.
		     * @param {number} end The end of the range.
		     * @param {number} step The value to increment or decrement by.
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Array} Returns the range of numbers.
		     */
		    function baseRange(start, end, step, fromRight) {
		      var index = -1,
		          length = nativeMax(nativeCeil((end - start) / (step || 1)), 0),
		          result = Array(length);

		      while (length--) {
		        result[fromRight ? length : ++index] = start;
		        start += step;
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.repeat` which doesn't coerce arguments.
		     *
		     * @private
		     * @param {string} string The string to repeat.
		     * @param {number} n The number of times to repeat the string.
		     * @returns {string} Returns the repeated string.
		     */
		    function baseRepeat(string, n) {
		      var result = '';
		      if (!string || n < 1 || n > MAX_SAFE_INTEGER) {
		        return result;
		      }
		      // Leverage the exponentiation by squaring algorithm for a faster repeat.
		      // See https://en.wikipedia.org/wiki/Exponentiation_by_squaring for more details.
		      do {
		        if (n % 2) {
		          result += string;
		        }
		        n = nativeFloor(n / 2);
		        if (n) {
		          string += string;
		        }
		      } while (n);

		      return result;
		    }

		    /**
		     * The base implementation of `_.rest` which doesn't validate or coerce arguments.
		     *
		     * @private
		     * @param {Function} func The function to apply a rest parameter to.
		     * @param {number} [start=func.length-1] The start position of the rest parameter.
		     * @returns {Function} Returns the new function.
		     */
		    function baseRest(func, start) {
		      return setToString(overRest(func, start, identity), func + '');
		    }

		    /**
		     * The base implementation of `_.sample`.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to sample.
		     * @returns {*} Returns the random element.
		     */
		    function baseSample(collection) {
		      return arraySample(values(collection));
		    }

		    /**
		     * The base implementation of `_.sampleSize` without param guards.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to sample.
		     * @param {number} n The number of elements to sample.
		     * @returns {Array} Returns the random elements.
		     */
		    function baseSampleSize(collection, n) {
		      var array = values(collection);
		      return shuffleSelf(array, baseClamp(n, 0, array.length));
		    }

		    /**
		     * The base implementation of `_.set`.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {*} value The value to set.
		     * @param {Function} [customizer] The function to customize path creation.
		     * @returns {Object} Returns `object`.
		     */
		    function baseSet(object, path, value, customizer) {
		      if (!isObject(object)) {
		        return object;
		      }
		      path = castPath(path, object);

		      var index = -1,
		          length = path.length,
		          lastIndex = length - 1,
		          nested = object;

		      while (nested != null && ++index < length) {
		        var key = toKey(path[index]),
		            newValue = value;

		        if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
		          return object;
		        }

		        if (index != lastIndex) {
		          var objValue = nested[key];
		          newValue = customizer ? customizer(objValue, key, nested) : undefined$1;
		          if (newValue === undefined$1) {
		            newValue = isObject(objValue)
		              ? objValue
		              : (isIndex(path[index + 1]) ? [] : {});
		          }
		        }
		        assignValue(nested, key, newValue);
		        nested = nested[key];
		      }
		      return object;
		    }

		    /**
		     * The base implementation of `setData` without support for hot loop shorting.
		     *
		     * @private
		     * @param {Function} func The function to associate metadata with.
		     * @param {*} data The metadata.
		     * @returns {Function} Returns `func`.
		     */
		    var baseSetData = !metaMap ? identity : function(func, data) {
		      metaMap.set(func, data);
		      return func;
		    };

		    /**
		     * The base implementation of `setToString` without support for hot loop shorting.
		     *
		     * @private
		     * @param {Function} func The function to modify.
		     * @param {Function} string The `toString` result.
		     * @returns {Function} Returns `func`.
		     */
		    var baseSetToString = !defineProperty ? identity : function(func, string) {
		      return defineProperty(func, 'toString', {
		        'configurable': true,
		        'enumerable': false,
		        'value': constant(string),
		        'writable': true
		      });
		    };

		    /**
		     * The base implementation of `_.shuffle`.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to shuffle.
		     * @returns {Array} Returns the new shuffled array.
		     */
		    function baseShuffle(collection) {
		      return shuffleSelf(values(collection));
		    }

		    /**
		     * The base implementation of `_.slice` without an iteratee call guard.
		     *
		     * @private
		     * @param {Array} array The array to slice.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns the slice of `array`.
		     */
		    function baseSlice(array, start, end) {
		      var index = -1,
		          length = array.length;

		      if (start < 0) {
		        start = -start > length ? 0 : (length + start);
		      }
		      end = end > length ? length : end;
		      if (end < 0) {
		        end += length;
		      }
		      length = start > end ? 0 : ((end - start) >>> 0);
		      start >>>= 0;

		      var result = Array(length);
		      while (++index < length) {
		        result[index] = array[index + start];
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.some` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} predicate The function invoked per iteration.
		     * @returns {boolean} Returns `true` if any element passes the predicate check,
		     *  else `false`.
		     */
		    function baseSome(collection, predicate) {
		      var result;

		      baseEach(collection, function(value, index, collection) {
		        result = predicate(value, index, collection);
		        return !result;
		      });
		      return !!result;
		    }

		    /**
		     * The base implementation of `_.sortedIndex` and `_.sortedLastIndex` which
		     * performs a binary search of `array` to determine the index at which `value`
		     * should be inserted into `array` in order to maintain its sort order.
		     *
		     * @private
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {boolean} [retHighest] Specify returning the highest qualified index.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     */
		    function baseSortedIndex(array, value, retHighest) {
		      var low = 0,
		          high = array == null ? low : array.length;

		      if (typeof value == 'number' && value === value && high <= HALF_MAX_ARRAY_LENGTH) {
		        while (low < high) {
		          var mid = (low + high) >>> 1,
		              computed = array[mid];

		          if (computed !== null && !isSymbol(computed) &&
		              (retHighest ? (computed <= value) : (computed < value))) {
		            low = mid + 1;
		          } else {
		            high = mid;
		          }
		        }
		        return high;
		      }
		      return baseSortedIndexBy(array, value, identity, retHighest);
		    }

		    /**
		     * The base implementation of `_.sortedIndexBy` and `_.sortedLastIndexBy`
		     * which invokes `iteratee` for `value` and each element of `array` to compute
		     * their sort ranking. The iteratee is invoked with one argument; (value).
		     *
		     * @private
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {Function} iteratee The iteratee invoked per element.
		     * @param {boolean} [retHighest] Specify returning the highest qualified index.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     */
		    function baseSortedIndexBy(array, value, iteratee, retHighest) {
		      var low = 0,
		          high = array == null ? 0 : array.length;
		      if (high === 0) {
		        return 0;
		      }

		      value = iteratee(value);
		      var valIsNaN = value !== value,
		          valIsNull = value === null,
		          valIsSymbol = isSymbol(value),
		          valIsUndefined = value === undefined$1;

		      while (low < high) {
		        var mid = nativeFloor((low + high) / 2),
		            computed = iteratee(array[mid]),
		            othIsDefined = computed !== undefined$1,
		            othIsNull = computed === null,
		            othIsReflexive = computed === computed,
		            othIsSymbol = isSymbol(computed);

		        if (valIsNaN) {
		          var setLow = retHighest || othIsReflexive;
		        } else if (valIsUndefined) {
		          setLow = othIsReflexive && (retHighest || othIsDefined);
		        } else if (valIsNull) {
		          setLow = othIsReflexive && othIsDefined && (retHighest || !othIsNull);
		        } else if (valIsSymbol) {
		          setLow = othIsReflexive && othIsDefined && !othIsNull && (retHighest || !othIsSymbol);
		        } else if (othIsNull || othIsSymbol) {
		          setLow = false;
		        } else {
		          setLow = retHighest ? (computed <= value) : (computed < value);
		        }
		        if (setLow) {
		          low = mid + 1;
		        } else {
		          high = mid;
		        }
		      }
		      return nativeMin(high, MAX_ARRAY_INDEX);
		    }

		    /**
		     * The base implementation of `_.sortedUniq` and `_.sortedUniqBy` without
		     * support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     */
		    function baseSortedUniq(array, iteratee) {
		      var index = -1,
		          length = array.length,
		          resIndex = 0,
		          result = [];

		      while (++index < length) {
		        var value = array[index],
		            computed = iteratee ? iteratee(value) : value;

		        if (!index || !eq(computed, seen)) {
		          var seen = computed;
		          result[resIndex++] = value === 0 ? 0 : value;
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.toNumber` which doesn't ensure correct
		     * conversions of binary, hexadecimal, or octal string values.
		     *
		     * @private
		     * @param {*} value The value to process.
		     * @returns {number} Returns the number.
		     */
		    function baseToNumber(value) {
		      if (typeof value == 'number') {
		        return value;
		      }
		      if (isSymbol(value)) {
		        return NAN;
		      }
		      return +value;
		    }

		    /**
		     * The base implementation of `_.toString` which doesn't convert nullish
		     * values to empty strings.
		     *
		     * @private
		     * @param {*} value The value to process.
		     * @returns {string} Returns the string.
		     */
		    function baseToString(value) {
		      // Exit early for strings to avoid a performance hit in some environments.
		      if (typeof value == 'string') {
		        return value;
		      }
		      if (isArray(value)) {
		        // Recursively convert values (susceptible to call stack limits).
		        return arrayMap(value, baseToString) + '';
		      }
		      if (isSymbol(value)) {
		        return symbolToString ? symbolToString.call(value) : '';
		      }
		      var result = (value + '');
		      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
		    }

		    /**
		     * The base implementation of `_.uniqBy` without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     */
		    function baseUniq(array, iteratee, comparator) {
		      var index = -1,
		          includes = arrayIncludes,
		          length = array.length,
		          isCommon = true,
		          result = [],
		          seen = result;

		      if (comparator) {
		        isCommon = false;
		        includes = arrayIncludesWith;
		      }
		      else if (length >= LARGE_ARRAY_SIZE) {
		        var set = iteratee ? null : createSet(array);
		        if (set) {
		          return setToArray(set);
		        }
		        isCommon = false;
		        includes = cacheHas;
		        seen = new SetCache;
		      }
		      else {
		        seen = iteratee ? [] : result;
		      }
		      outer:
		      while (++index < length) {
		        var value = array[index],
		            computed = iteratee ? iteratee(value) : value;

		        value = (comparator || value !== 0) ? value : 0;
		        if (isCommon && computed === computed) {
		          var seenIndex = seen.length;
		          while (seenIndex--) {
		            if (seen[seenIndex] === computed) {
		              continue outer;
		            }
		          }
		          if (iteratee) {
		            seen.push(computed);
		          }
		          result.push(value);
		        }
		        else if (!includes(seen, computed, comparator)) {
		          if (seen !== result) {
		            seen.push(computed);
		          }
		          result.push(value);
		        }
		      }
		      return result;
		    }

		    /**
		     * The base implementation of `_.unset`.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The property path to unset.
		     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
		     */
		    function baseUnset(object, path) {
		      path = castPath(path, object);

		      // Prevent prototype pollution, see: https://github.com/lodash/lodash/security/advisories/GHSA-xxjr-mmjv-4gpg
		      var index = -1,
		          length = path.length;

		      if (!length) {
		        return true;
		      }

		      var isRootPrimitive = object == null || (typeof object !== 'object' && typeof object !== 'function');

		      while (++index < length) {
		        var key = path[index];

		        // skip non-string keys (e.g., Symbols, numbers)
		        if (typeof key !== 'string') {
		          continue;
		        }

		        // Always block "__proto__" anywhere in the path if it's not expected
		        if (key === '__proto__' && !hasOwnProperty.call(object, '__proto__')) {
		          return false;
		        }

		        // Block "constructor.prototype" chains
		        if (key === 'constructor' &&
		            (index + 1) < length &&
		            typeof path[index + 1] === 'string' &&
		            path[index + 1] === 'prototype') {

		          // Allow ONLY when the path starts at a primitive root, e.g., _.unset(0, 'constructor.prototype.a')
		          if (isRootPrimitive && index === 0) {
		            continue;
		          }

		          return false;
		        }
		      }

		      var obj = parent(object, path);
		      return obj == null || delete obj[toKey(last(path))];
		    }

		    /**
		     * The base implementation of `_.update`.
		     *
		     * @private
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to update.
		     * @param {Function} updater The function to produce the updated value.
		     * @param {Function} [customizer] The function to customize path creation.
		     * @returns {Object} Returns `object`.
		     */
		    function baseUpdate(object, path, updater, customizer) {
		      return baseSet(object, path, updater(baseGet(object, path)), customizer);
		    }

		    /**
		     * The base implementation of methods like `_.dropWhile` and `_.takeWhile`
		     * without support for iteratee shorthands.
		     *
		     * @private
		     * @param {Array} array The array to query.
		     * @param {Function} predicate The function invoked per iteration.
		     * @param {boolean} [isDrop] Specify dropping elements instead of taking them.
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Array} Returns the slice of `array`.
		     */
		    function baseWhile(array, predicate, isDrop, fromRight) {
		      var length = array.length,
		          index = fromRight ? length : -1;

		      while ((fromRight ? index-- : ++index < length) &&
		        predicate(array[index], index, array)) {}

		      return isDrop
		        ? baseSlice(array, (fromRight ? 0 : index), (fromRight ? index + 1 : length))
		        : baseSlice(array, (fromRight ? index + 1 : 0), (fromRight ? length : index));
		    }

		    /**
		     * The base implementation of `wrapperValue` which returns the result of
		     * performing a sequence of actions on the unwrapped `value`, where each
		     * successive action is supplied the return value of the previous.
		     *
		     * @private
		     * @param {*} value The unwrapped value.
		     * @param {Array} actions Actions to perform to resolve the unwrapped value.
		     * @returns {*} Returns the resolved value.
		     */
		    function baseWrapperValue(value, actions) {
		      var result = value;
		      if (result instanceof LazyWrapper) {
		        result = result.value();
		      }
		      return arrayReduce(actions, function(result, action) {
		        return action.func.apply(action.thisArg, arrayPush([result], action.args));
		      }, result);
		    }

		    /**
		     * The base implementation of methods like `_.xor`, without support for
		     * iteratee shorthands, that accepts an array of arrays to inspect.
		     *
		     * @private
		     * @param {Array} arrays The arrays to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of values.
		     */
		    function baseXor(arrays, iteratee, comparator) {
		      var length = arrays.length;
		      if (length < 2) {
		        return length ? baseUniq(arrays[0]) : [];
		      }
		      var index = -1,
		          result = Array(length);

		      while (++index < length) {
		        var array = arrays[index],
		            othIndex = -1;

		        while (++othIndex < length) {
		          if (othIndex != index) {
		            result[index] = baseDifference(result[index] || array, arrays[othIndex], iteratee, comparator);
		          }
		        }
		      }
		      return baseUniq(baseFlatten(result, 1), iteratee, comparator);
		    }

		    /**
		     * This base implementation of `_.zipObject` which assigns values using `assignFunc`.
		     *
		     * @private
		     * @param {Array} props The property identifiers.
		     * @param {Array} values The property values.
		     * @param {Function} assignFunc The function to assign values.
		     * @returns {Object} Returns the new object.
		     */
		    function baseZipObject(props, values, assignFunc) {
		      var index = -1,
		          length = props.length,
		          valsLength = values.length,
		          result = {};

		      while (++index < length) {
		        var value = index < valsLength ? values[index] : undefined$1;
		        assignFunc(result, props[index], value);
		      }
		      return result;
		    }

		    /**
		     * Casts `value` to an empty array if it's not an array like object.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @returns {Array|Object} Returns the cast array-like object.
		     */
		    function castArrayLikeObject(value) {
		      return isArrayLikeObject(value) ? value : [];
		    }

		    /**
		     * Casts `value` to `identity` if it's not a function.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @returns {Function} Returns cast function.
		     */
		    function castFunction(value) {
		      return typeof value == 'function' ? value : identity;
		    }

		    /**
		     * Casts `value` to a path array if it's not one.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @param {Object} [object] The object to query keys on.
		     * @returns {Array} Returns the cast property path array.
		     */
		    function castPath(value, object) {
		      if (isArray(value)) {
		        return value;
		      }
		      return isKey(value, object) ? [value] : stringToPath(toString(value));
		    }

		    /**
		     * A `baseRest` alias which can be replaced with `identity` by module
		     * replacement plugins.
		     *
		     * @private
		     * @type {Function}
		     * @param {Function} func The function to apply a rest parameter to.
		     * @returns {Function} Returns the new function.
		     */
		    var castRest = baseRest;

		    /**
		     * Casts `array` to a slice if it's needed.
		     *
		     * @private
		     * @param {Array} array The array to inspect.
		     * @param {number} start The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns the cast slice.
		     */
		    function castSlice(array, start, end) {
		      var length = array.length;
		      end = end === undefined$1 ? length : end;
		      return (!start && end >= length) ? array : baseSlice(array, start, end);
		    }

		    /**
		     * A simple wrapper around the global [`clearTimeout`](https://mdn.io/clearTimeout).
		     *
		     * @private
		     * @param {number|Object} id The timer id or timeout object of the timer to clear.
		     */
		    var clearTimeout = ctxClearTimeout || function(id) {
		      return root.clearTimeout(id);
		    };

		    /**
		     * Creates a clone of  `buffer`.
		     *
		     * @private
		     * @param {Buffer} buffer The buffer to clone.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Buffer} Returns the cloned buffer.
		     */
		    function cloneBuffer(buffer, isDeep) {
		      if (isDeep) {
		        return buffer.slice();
		      }
		      var length = buffer.length,
		          result = allocUnsafe ? allocUnsafe(length) : new buffer.constructor(length);

		      buffer.copy(result);
		      return result;
		    }

		    /**
		     * Creates a clone of `arrayBuffer`.
		     *
		     * @private
		     * @param {ArrayBuffer} arrayBuffer The array buffer to clone.
		     * @returns {ArrayBuffer} Returns the cloned array buffer.
		     */
		    function cloneArrayBuffer(arrayBuffer) {
		      var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
		      new Uint8Array(result).set(new Uint8Array(arrayBuffer));
		      return result;
		    }

		    /**
		     * Creates a clone of `dataView`.
		     *
		     * @private
		     * @param {Object} dataView The data view to clone.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Object} Returns the cloned data view.
		     */
		    function cloneDataView(dataView, isDeep) {
		      var buffer = isDeep ? cloneArrayBuffer(dataView.buffer) : dataView.buffer;
		      return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
		    }

		    /**
		     * Creates a clone of `regexp`.
		     *
		     * @private
		     * @param {Object} regexp The regexp to clone.
		     * @returns {Object} Returns the cloned regexp.
		     */
		    function cloneRegExp(regexp) {
		      var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
		      result.lastIndex = regexp.lastIndex;
		      return result;
		    }

		    /**
		     * Creates a clone of the `symbol` object.
		     *
		     * @private
		     * @param {Object} symbol The symbol object to clone.
		     * @returns {Object} Returns the cloned symbol object.
		     */
		    function cloneSymbol(symbol) {
		      return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
		    }

		    /**
		     * Creates a clone of `typedArray`.
		     *
		     * @private
		     * @param {Object} typedArray The typed array to clone.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Object} Returns the cloned typed array.
		     */
		    function cloneTypedArray(typedArray, isDeep) {
		      var buffer = isDeep ? cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
		      return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
		    }

		    /**
		     * Compares values to sort them in ascending order.
		     *
		     * @private
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {number} Returns the sort order indicator for `value`.
		     */
		    function compareAscending(value, other) {
		      if (value !== other) {
		        var valIsDefined = value !== undefined$1,
		            valIsNull = value === null,
		            valIsReflexive = value === value,
		            valIsSymbol = isSymbol(value);

		        var othIsDefined = other !== undefined$1,
		            othIsNull = other === null,
		            othIsReflexive = other === other,
		            othIsSymbol = isSymbol(other);

		        if ((!othIsNull && !othIsSymbol && !valIsSymbol && value > other) ||
		            (valIsSymbol && othIsDefined && othIsReflexive && !othIsNull && !othIsSymbol) ||
		            (valIsNull && othIsDefined && othIsReflexive) ||
		            (!valIsDefined && othIsReflexive) ||
		            !valIsReflexive) {
		          return 1;
		        }
		        if ((!valIsNull && !valIsSymbol && !othIsSymbol && value < other) ||
		            (othIsSymbol && valIsDefined && valIsReflexive && !valIsNull && !valIsSymbol) ||
		            (othIsNull && valIsDefined && valIsReflexive) ||
		            (!othIsDefined && valIsReflexive) ||
		            !othIsReflexive) {
		          return -1;
		        }
		      }
		      return 0;
		    }

		    /**
		     * Used by `_.orderBy` to compare multiple properties of a value to another
		     * and stable sort them.
		     *
		     * If `orders` is unspecified, all values are sorted in ascending order. Otherwise,
		     * specify an order of "desc" for descending or "asc" for ascending sort order
		     * of corresponding values.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {boolean[]|string[]} orders The order to sort by for each property.
		     * @returns {number} Returns the sort order indicator for `object`.
		     */
		    function compareMultiple(object, other, orders) {
		      var index = -1,
		          objCriteria = object.criteria,
		          othCriteria = other.criteria,
		          length = objCriteria.length,
		          ordersLength = orders.length;

		      while (++index < length) {
		        var result = compareAscending(objCriteria[index], othCriteria[index]);
		        if (result) {
		          if (index >= ordersLength) {
		            return result;
		          }
		          var order = orders[index];
		          return result * (order == 'desc' ? -1 : 1);
		        }
		      }
		      // Fixes an `Array#sort` bug in the JS engine embedded in Adobe applications
		      // that causes it, under certain circumstances, to provide the same value for
		      // `object` and `other`. See https://github.com/jashkenas/underscore/pull/1247
		      // for more details.
		      //
		      // This also ensures a stable sort in V8 and other engines.
		      // See https://bugs.chromium.org/p/v8/issues/detail?id=90 for more details.
		      return object.index - other.index;
		    }

		    /**
		     * Creates an array that is the composition of partially applied arguments,
		     * placeholders, and provided arguments into a single array of arguments.
		     *
		     * @private
		     * @param {Array} args The provided arguments.
		     * @param {Array} partials The arguments to prepend to those provided.
		     * @param {Array} holders The `partials` placeholder indexes.
		     * @params {boolean} [isCurried] Specify composing for a curried function.
		     * @returns {Array} Returns the new array of composed arguments.
		     */
		    function composeArgs(args, partials, holders, isCurried) {
		      var argsIndex = -1,
		          argsLength = args.length,
		          holdersLength = holders.length,
		          leftIndex = -1,
		          leftLength = partials.length,
		          rangeLength = nativeMax(argsLength - holdersLength, 0),
		          result = Array(leftLength + rangeLength),
		          isUncurried = !isCurried;

		      while (++leftIndex < leftLength) {
		        result[leftIndex] = partials[leftIndex];
		      }
		      while (++argsIndex < holdersLength) {
		        if (isUncurried || argsIndex < argsLength) {
		          result[holders[argsIndex]] = args[argsIndex];
		        }
		      }
		      while (rangeLength--) {
		        result[leftIndex++] = args[argsIndex++];
		      }
		      return result;
		    }

		    /**
		     * This function is like `composeArgs` except that the arguments composition
		     * is tailored for `_.partialRight`.
		     *
		     * @private
		     * @param {Array} args The provided arguments.
		     * @param {Array} partials The arguments to append to those provided.
		     * @param {Array} holders The `partials` placeholder indexes.
		     * @params {boolean} [isCurried] Specify composing for a curried function.
		     * @returns {Array} Returns the new array of composed arguments.
		     */
		    function composeArgsRight(args, partials, holders, isCurried) {
		      var argsIndex = -1,
		          argsLength = args.length,
		          holdersIndex = -1,
		          holdersLength = holders.length,
		          rightIndex = -1,
		          rightLength = partials.length,
		          rangeLength = nativeMax(argsLength - holdersLength, 0),
		          result = Array(rangeLength + rightLength),
		          isUncurried = !isCurried;

		      while (++argsIndex < rangeLength) {
		        result[argsIndex] = args[argsIndex];
		      }
		      var offset = argsIndex;
		      while (++rightIndex < rightLength) {
		        result[offset + rightIndex] = partials[rightIndex];
		      }
		      while (++holdersIndex < holdersLength) {
		        if (isUncurried || argsIndex < argsLength) {
		          result[offset + holders[holdersIndex]] = args[argsIndex++];
		        }
		      }
		      return result;
		    }

		    /**
		     * Copies the values of `source` to `array`.
		     *
		     * @private
		     * @param {Array} source The array to copy values from.
		     * @param {Array} [array=[]] The array to copy values to.
		     * @returns {Array} Returns `array`.
		     */
		    function copyArray(source, array) {
		      var index = -1,
		          length = source.length;

		      array || (array = Array(length));
		      while (++index < length) {
		        array[index] = source[index];
		      }
		      return array;
		    }

		    /**
		     * Copies properties of `source` to `object`.
		     *
		     * @private
		     * @param {Object} source The object to copy properties from.
		     * @param {Array} props The property identifiers to copy.
		     * @param {Object} [object={}] The object to copy properties to.
		     * @param {Function} [customizer] The function to customize copied values.
		     * @returns {Object} Returns `object`.
		     */
		    function copyObject(source, props, object, customizer) {
		      var isNew = !object;
		      object || (object = {});

		      var index = -1,
		          length = props.length;

		      while (++index < length) {
		        var key = props[index];

		        var newValue = customizer
		          ? customizer(object[key], source[key], key, object, source)
		          : undefined$1;

		        if (newValue === undefined$1) {
		          newValue = source[key];
		        }
		        if (isNew) {
		          baseAssignValue(object, key, newValue);
		        } else {
		          assignValue(object, key, newValue);
		        }
		      }
		      return object;
		    }

		    /**
		     * Copies own symbols of `source` to `object`.
		     *
		     * @private
		     * @param {Object} source The object to copy symbols from.
		     * @param {Object} [object={}] The object to copy symbols to.
		     * @returns {Object} Returns `object`.
		     */
		    function copySymbols(source, object) {
		      return copyObject(source, getSymbols(source), object);
		    }

		    /**
		     * Copies own and inherited symbols of `source` to `object`.
		     *
		     * @private
		     * @param {Object} source The object to copy symbols from.
		     * @param {Object} [object={}] The object to copy symbols to.
		     * @returns {Object} Returns `object`.
		     */
		    function copySymbolsIn(source, object) {
		      return copyObject(source, getSymbolsIn(source), object);
		    }

		    /**
		     * Creates a function like `_.groupBy`.
		     *
		     * @private
		     * @param {Function} setter The function to set accumulator values.
		     * @param {Function} [initializer] The accumulator object initializer.
		     * @returns {Function} Returns the new aggregator function.
		     */
		    function createAggregator(setter, initializer) {
		      return function(collection, iteratee) {
		        var func = isArray(collection) ? arrayAggregator : baseAggregator,
		            accumulator = initializer ? initializer() : {};

		        return func(collection, setter, getIteratee(iteratee, 2), accumulator);
		      };
		    }

		    /**
		     * Creates a function like `_.assign`.
		     *
		     * @private
		     * @param {Function} assigner The function to assign values.
		     * @returns {Function} Returns the new assigner function.
		     */
		    function createAssigner(assigner) {
		      return baseRest(function(object, sources) {
		        var index = -1,
		            length = sources.length,
		            customizer = length > 1 ? sources[length - 1] : undefined$1,
		            guard = length > 2 ? sources[2] : undefined$1;

		        customizer = (assigner.length > 3 && typeof customizer == 'function')
		          ? (length--, customizer)
		          : undefined$1;

		        if (guard && isIterateeCall(sources[0], sources[1], guard)) {
		          customizer = length < 3 ? undefined$1 : customizer;
		          length = 1;
		        }
		        object = Object(object);
		        while (++index < length) {
		          var source = sources[index];
		          if (source) {
		            assigner(object, source, index, customizer);
		          }
		        }
		        return object;
		      });
		    }

		    /**
		     * Creates a `baseEach` or `baseEachRight` function.
		     *
		     * @private
		     * @param {Function} eachFunc The function to iterate over a collection.
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new base function.
		     */
		    function createBaseEach(eachFunc, fromRight) {
		      return function(collection, iteratee) {
		        if (collection == null) {
		          return collection;
		        }
		        if (!isArrayLike(collection)) {
		          return eachFunc(collection, iteratee);
		        }
		        var length = collection.length,
		            index = fromRight ? length : -1,
		            iterable = Object(collection);

		        while ((fromRight ? index-- : ++index < length)) {
		          if (iteratee(iterable[index], index, iterable) === false) {
		            break;
		          }
		        }
		        return collection;
		      };
		    }

		    /**
		     * Creates a base function for methods like `_.forIn` and `_.forOwn`.
		     *
		     * @private
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new base function.
		     */
		    function createBaseFor(fromRight) {
		      return function(object, iteratee, keysFunc) {
		        var index = -1,
		            iterable = Object(object),
		            props = keysFunc(object),
		            length = props.length;

		        while (length--) {
		          var key = props[fromRight ? length : ++index];
		          if (iteratee(iterable[key], key, iterable) === false) {
		            break;
		          }
		        }
		        return object;
		      };
		    }

		    /**
		     * Creates a function that wraps `func` to invoke it with the optional `this`
		     * binding of `thisArg`.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createBind(func, bitmask, thisArg) {
		      var isBind = bitmask & WRAP_BIND_FLAG,
		          Ctor = createCtor(func);

		      function wrapper() {
		        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
		        return fn.apply(isBind ? thisArg : this, arguments);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a function like `_.lowerFirst`.
		     *
		     * @private
		     * @param {string} methodName The name of the `String` case method to use.
		     * @returns {Function} Returns the new case function.
		     */
		    function createCaseFirst(methodName) {
		      return function(string) {
		        string = toString(string);

		        var strSymbols = hasUnicode(string)
		          ? stringToArray(string)
		          : undefined$1;

		        var chr = strSymbols
		          ? strSymbols[0]
		          : string.charAt(0);

		        var trailing = strSymbols
		          ? castSlice(strSymbols, 1).join('')
		          : string.slice(1);

		        return chr[methodName]() + trailing;
		      };
		    }

		    /**
		     * Creates a function like `_.camelCase`.
		     *
		     * @private
		     * @param {Function} callback The function to combine each word.
		     * @returns {Function} Returns the new compounder function.
		     */
		    function createCompounder(callback) {
		      return function(string) {
		        return arrayReduce(words(deburr(string).replace(reApos, '')), callback, '');
		      };
		    }

		    /**
		     * Creates a function that produces an instance of `Ctor` regardless of
		     * whether it was invoked as part of a `new` expression or by `call` or `apply`.
		     *
		     * @private
		     * @param {Function} Ctor The constructor to wrap.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createCtor(Ctor) {
		      return function() {
		        // Use a `switch` statement to work with class constructors. See
		        // http://ecma-international.org/ecma-262/7.0/#sec-ecmascript-function-objects-call-thisargument-argumentslist
		        // for more details.
		        var args = arguments;
		        switch (args.length) {
		          case 0: return new Ctor;
		          case 1: return new Ctor(args[0]);
		          case 2: return new Ctor(args[0], args[1]);
		          case 3: return new Ctor(args[0], args[1], args[2]);
		          case 4: return new Ctor(args[0], args[1], args[2], args[3]);
		          case 5: return new Ctor(args[0], args[1], args[2], args[3], args[4]);
		          case 6: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5]);
		          case 7: return new Ctor(args[0], args[1], args[2], args[3], args[4], args[5], args[6]);
		        }
		        var thisBinding = baseCreate(Ctor.prototype),
		            result = Ctor.apply(thisBinding, args);

		        // Mimic the constructor's `return` behavior.
		        // See https://es5.github.io/#x13.2.2 for more details.
		        return isObject(result) ? result : thisBinding;
		      };
		    }

		    /**
		     * Creates a function that wraps `func` to enable currying.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {number} arity The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createCurry(func, bitmask, arity) {
		      var Ctor = createCtor(func);

		      function wrapper() {
		        var length = arguments.length,
		            args = Array(length),
		            index = length,
		            placeholder = getHolder(wrapper);

		        while (index--) {
		          args[index] = arguments[index];
		        }
		        var holders = (length < 3 && args[0] !== placeholder && args[length - 1] !== placeholder)
		          ? []
		          : replaceHolders(args, placeholder);

		        length -= holders.length;
		        if (length < arity) {
		          return createRecurry(
		            func, bitmask, createHybrid, wrapper.placeholder, undefined$1,
		            args, holders, undefined$1, undefined$1, arity - length);
		        }
		        var fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;
		        return apply(fn, this, args);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a `_.find` or `_.findLast` function.
		     *
		     * @private
		     * @param {Function} findIndexFunc The function to find the collection index.
		     * @returns {Function} Returns the new find function.
		     */
		    function createFind(findIndexFunc) {
		      return function(collection, predicate, fromIndex) {
		        var iterable = Object(collection);
		        if (!isArrayLike(collection)) {
		          var iteratee = getIteratee(predicate, 3);
		          collection = keys(collection);
		          predicate = function(key) { return iteratee(iterable[key], key, iterable); };
		        }
		        var index = findIndexFunc(collection, predicate, fromIndex);
		        return index > -1 ? iterable[iteratee ? collection[index] : index] : undefined$1;
		      };
		    }

		    /**
		     * Creates a `_.flow` or `_.flowRight` function.
		     *
		     * @private
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new flow function.
		     */
		    function createFlow(fromRight) {
		      return flatRest(function(funcs) {
		        var length = funcs.length,
		            index = length,
		            prereq = LodashWrapper.prototype.thru;

		        if (fromRight) {
		          funcs.reverse();
		        }
		        while (index--) {
		          var func = funcs[index];
		          if (typeof func != 'function') {
		            throw new TypeError(FUNC_ERROR_TEXT);
		          }
		          if (prereq && !wrapper && getFuncName(func) == 'wrapper') {
		            var wrapper = new LodashWrapper([], true);
		          }
		        }
		        index = wrapper ? index : length;
		        while (++index < length) {
		          func = funcs[index];

		          var funcName = getFuncName(func),
		              data = funcName == 'wrapper' ? getData(func) : undefined$1;

		          if (data && isLaziable(data[0]) &&
		                data[1] == (WRAP_ARY_FLAG | WRAP_CURRY_FLAG | WRAP_PARTIAL_FLAG | WRAP_REARG_FLAG) &&
		                !data[4].length && data[9] == 1
		              ) {
		            wrapper = wrapper[getFuncName(data[0])].apply(wrapper, data[3]);
		          } else {
		            wrapper = (func.length == 1 && isLaziable(func))
		              ? wrapper[funcName]()
		              : wrapper.thru(func);
		          }
		        }
		        return function() {
		          var args = arguments,
		              value = args[0];

		          if (wrapper && args.length == 1 && isArray(value)) {
		            return wrapper.plant(value).value();
		          }
		          var index = 0,
		              result = length ? funcs[index].apply(this, args) : value;

		          while (++index < length) {
		            result = funcs[index].call(this, result);
		          }
		          return result;
		        };
		      });
		    }

		    /**
		     * Creates a function that wraps `func` to invoke it with optional `this`
		     * binding of `thisArg`, partial application, and currying.
		     *
		     * @private
		     * @param {Function|string} func The function or method name to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @param {Array} [partials] The arguments to prepend to those provided to
		     *  the new function.
		     * @param {Array} [holders] The `partials` placeholder indexes.
		     * @param {Array} [partialsRight] The arguments to append to those provided
		     *  to the new function.
		     * @param {Array} [holdersRight] The `partialsRight` placeholder indexes.
		     * @param {Array} [argPos] The argument positions of the new function.
		     * @param {number} [ary] The arity cap of `func`.
		     * @param {number} [arity] The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createHybrid(func, bitmask, thisArg, partials, holders, partialsRight, holdersRight, argPos, ary, arity) {
		      var isAry = bitmask & WRAP_ARY_FLAG,
		          isBind = bitmask & WRAP_BIND_FLAG,
		          isBindKey = bitmask & WRAP_BIND_KEY_FLAG,
		          isCurried = bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG),
		          isFlip = bitmask & WRAP_FLIP_FLAG,
		          Ctor = isBindKey ? undefined$1 : createCtor(func);

		      function wrapper() {
		        var length = arguments.length,
		            args = Array(length),
		            index = length;

		        while (index--) {
		          args[index] = arguments[index];
		        }
		        if (isCurried) {
		          var placeholder = getHolder(wrapper),
		              holdersCount = countHolders(args, placeholder);
		        }
		        if (partials) {
		          args = composeArgs(args, partials, holders, isCurried);
		        }
		        if (partialsRight) {
		          args = composeArgsRight(args, partialsRight, holdersRight, isCurried);
		        }
		        length -= holdersCount;
		        if (isCurried && length < arity) {
		          var newHolders = replaceHolders(args, placeholder);
		          return createRecurry(
		            func, bitmask, createHybrid, wrapper.placeholder, thisArg,
		            args, newHolders, argPos, ary, arity - length
		          );
		        }
		        var thisBinding = isBind ? thisArg : this,
		            fn = isBindKey ? thisBinding[func] : func;

		        length = args.length;
		        if (argPos) {
		          args = reorder(args, argPos);
		        } else if (isFlip && length > 1) {
		          args.reverse();
		        }
		        if (isAry && ary < length) {
		          args.length = ary;
		        }
		        if (this && this !== root && this instanceof wrapper) {
		          fn = Ctor || createCtor(fn);
		        }
		        return fn.apply(thisBinding, args);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a function like `_.invertBy`.
		     *
		     * @private
		     * @param {Function} setter The function to set accumulator values.
		     * @param {Function} toIteratee The function to resolve iteratees.
		     * @returns {Function} Returns the new inverter function.
		     */
		    function createInverter(setter, toIteratee) {
		      return function(object, iteratee) {
		        return baseInverter(object, setter, toIteratee(iteratee), {});
		      };
		    }

		    /**
		     * Creates a function that performs a mathematical operation on two values.
		     *
		     * @private
		     * @param {Function} operator The function to perform the operation.
		     * @param {number} [defaultValue] The value used for `undefined` arguments.
		     * @returns {Function} Returns the new mathematical operation function.
		     */
		    function createMathOperation(operator, defaultValue) {
		      return function(value, other) {
		        var result;
		        if (value === undefined$1 && other === undefined$1) {
		          return defaultValue;
		        }
		        if (value !== undefined$1) {
		          result = value;
		        }
		        if (other !== undefined$1) {
		          if (result === undefined$1) {
		            return other;
		          }
		          if (typeof value == 'string' || typeof other == 'string') {
		            value = baseToString(value);
		            other = baseToString(other);
		          } else {
		            value = baseToNumber(value);
		            other = baseToNumber(other);
		          }
		          result = operator(value, other);
		        }
		        return result;
		      };
		    }

		    /**
		     * Creates a function like `_.over`.
		     *
		     * @private
		     * @param {Function} arrayFunc The function to iterate over iteratees.
		     * @returns {Function} Returns the new over function.
		     */
		    function createOver(arrayFunc) {
		      return flatRest(function(iteratees) {
		        iteratees = arrayMap(iteratees, baseUnary(getIteratee()));
		        return baseRest(function(args) {
		          var thisArg = this;
		          return arrayFunc(iteratees, function(iteratee) {
		            return apply(iteratee, thisArg, args);
		          });
		        });
		      });
		    }

		    /**
		     * Creates the padding for `string` based on `length`. The `chars` string
		     * is truncated if the number of characters exceeds `length`.
		     *
		     * @private
		     * @param {number} length The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padding for `string`.
		     */
		    function createPadding(length, chars) {
		      chars = chars === undefined$1 ? ' ' : baseToString(chars);

		      var charsLength = chars.length;
		      if (charsLength < 2) {
		        return charsLength ? baseRepeat(chars, length) : chars;
		      }
		      var result = baseRepeat(chars, nativeCeil(length / stringSize(chars)));
		      return hasUnicode(chars)
		        ? castSlice(stringToArray(result), 0, length).join('')
		        : result.slice(0, length);
		    }

		    /**
		     * Creates a function that wraps `func` to invoke it with the `this` binding
		     * of `thisArg` and `partials` prepended to the arguments it receives.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {*} thisArg The `this` binding of `func`.
		     * @param {Array} partials The arguments to prepend to those provided to
		     *  the new function.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createPartial(func, bitmask, thisArg, partials) {
		      var isBind = bitmask & WRAP_BIND_FLAG,
		          Ctor = createCtor(func);

		      function wrapper() {
		        var argsIndex = -1,
		            argsLength = arguments.length,
		            leftIndex = -1,
		            leftLength = partials.length,
		            args = Array(leftLength + argsLength),
		            fn = (this && this !== root && this instanceof wrapper) ? Ctor : func;

		        while (++leftIndex < leftLength) {
		          args[leftIndex] = partials[leftIndex];
		        }
		        while (argsLength--) {
		          args[leftIndex++] = arguments[++argsIndex];
		        }
		        return apply(fn, isBind ? thisArg : this, args);
		      }
		      return wrapper;
		    }

		    /**
		     * Creates a `_.range` or `_.rangeRight` function.
		     *
		     * @private
		     * @param {boolean} [fromRight] Specify iterating from right to left.
		     * @returns {Function} Returns the new range function.
		     */
		    function createRange(fromRight) {
		      return function(start, end, step) {
		        if (step && typeof step != 'number' && isIterateeCall(start, end, step)) {
		          end = step = undefined$1;
		        }
		        // Ensure the sign of `-0` is preserved.
		        start = toFinite(start);
		        if (end === undefined$1) {
		          end = start;
		          start = 0;
		        } else {
		          end = toFinite(end);
		        }
		        step = step === undefined$1 ? (start < end ? 1 : -1) : toFinite(step);
		        return baseRange(start, end, step, fromRight);
		      };
		    }

		    /**
		     * Creates a function that performs a relational operation on two values.
		     *
		     * @private
		     * @param {Function} operator The function to perform the operation.
		     * @returns {Function} Returns the new relational operation function.
		     */
		    function createRelationalOperation(operator) {
		      return function(value, other) {
		        if (!(typeof value == 'string' && typeof other == 'string')) {
		          value = toNumber(value);
		          other = toNumber(other);
		        }
		        return operator(value, other);
		      };
		    }

		    /**
		     * Creates a function that wraps `func` to continue currying.
		     *
		     * @private
		     * @param {Function} func The function to wrap.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @param {Function} wrapFunc The function to create the `func` wrapper.
		     * @param {*} placeholder The placeholder value.
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @param {Array} [partials] The arguments to prepend to those provided to
		     *  the new function.
		     * @param {Array} [holders] The `partials` placeholder indexes.
		     * @param {Array} [argPos] The argument positions of the new function.
		     * @param {number} [ary] The arity cap of `func`.
		     * @param {number} [arity] The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createRecurry(func, bitmask, wrapFunc, placeholder, thisArg, partials, holders, argPos, ary, arity) {
		      var isCurry = bitmask & WRAP_CURRY_FLAG,
		          newHolders = isCurry ? holders : undefined$1,
		          newHoldersRight = isCurry ? undefined$1 : holders,
		          newPartials = isCurry ? partials : undefined$1,
		          newPartialsRight = isCurry ? undefined$1 : partials;

		      bitmask |= (isCurry ? WRAP_PARTIAL_FLAG : WRAP_PARTIAL_RIGHT_FLAG);
		      bitmask &= ~(isCurry ? WRAP_PARTIAL_RIGHT_FLAG : WRAP_PARTIAL_FLAG);

		      if (!(bitmask & WRAP_CURRY_BOUND_FLAG)) {
		        bitmask &= -4;
		      }
		      var newData = [
		        func, bitmask, thisArg, newPartials, newHolders, newPartialsRight,
		        newHoldersRight, argPos, ary, arity
		      ];

		      var result = wrapFunc.apply(undefined$1, newData);
		      if (isLaziable(func)) {
		        setData(result, newData);
		      }
		      result.placeholder = placeholder;
		      return setWrapToString(result, func, bitmask);
		    }

		    /**
		     * Creates a function like `_.round`.
		     *
		     * @private
		     * @param {string} methodName The name of the `Math` method to use when rounding.
		     * @returns {Function} Returns the new round function.
		     */
		    function createRound(methodName) {
		      var func = Math[methodName];
		      return function(number, precision) {
		        number = toNumber(number);
		        precision = precision == null ? 0 : nativeMin(toInteger(precision), 292);
		        if (precision && nativeIsFinite(number)) {
		          // Shift with exponential notation to avoid floating-point issues.
		          // See [MDN](https://mdn.io/round#Examples) for more details.
		          var pair = (toString(number) + 'e').split('e'),
		              value = func(pair[0] + 'e' + (+pair[1] + precision));

		          pair = (toString(value) + 'e').split('e');
		          return +(pair[0] + 'e' + (+pair[1] - precision));
		        }
		        return func(number);
		      };
		    }

		    /**
		     * Creates a set object of `values`.
		     *
		     * @private
		     * @param {Array} values The values to add to the set.
		     * @returns {Object} Returns the new set.
		     */
		    var createSet = !(Set && (1 / setToArray(new Set([,-0]))[1]) == INFINITY) ? noop : function(values) {
		      return new Set(values);
		    };

		    /**
		     * Creates a `_.toPairs` or `_.toPairsIn` function.
		     *
		     * @private
		     * @param {Function} keysFunc The function to get the keys of a given object.
		     * @returns {Function} Returns the new pairs function.
		     */
		    function createToPairs(keysFunc) {
		      return function(object) {
		        var tag = getTag(object);
		        if (tag == mapTag) {
		          return mapToArray(object);
		        }
		        if (tag == setTag) {
		          return setToPairs(object);
		        }
		        return baseToPairs(object, keysFunc(object));
		      };
		    }

		    /**
		     * Creates a function that either curries or invokes `func` with optional
		     * `this` binding and partially applied arguments.
		     *
		     * @private
		     * @param {Function|string} func The function or method name to wrap.
		     * @param {number} bitmask The bitmask flags.
		     *    1 - `_.bind`
		     *    2 - `_.bindKey`
		     *    4 - `_.curry` or `_.curryRight` of a bound function
		     *    8 - `_.curry`
		     *   16 - `_.curryRight`
		     *   32 - `_.partial`
		     *   64 - `_.partialRight`
		     *  128 - `_.rearg`
		     *  256 - `_.ary`
		     *  512 - `_.flip`
		     * @param {*} [thisArg] The `this` binding of `func`.
		     * @param {Array} [partials] The arguments to be partially applied.
		     * @param {Array} [holders] The `partials` placeholder indexes.
		     * @param {Array} [argPos] The argument positions of the new function.
		     * @param {number} [ary] The arity cap of `func`.
		     * @param {number} [arity] The arity of `func`.
		     * @returns {Function} Returns the new wrapped function.
		     */
		    function createWrap(func, bitmask, thisArg, partials, holders, argPos, ary, arity) {
		      var isBindKey = bitmask & WRAP_BIND_KEY_FLAG;
		      if (!isBindKey && typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      var length = partials ? partials.length : 0;
		      if (!length) {
		        bitmask &= -97;
		        partials = holders = undefined$1;
		      }
		      ary = ary === undefined$1 ? ary : nativeMax(toInteger(ary), 0);
		      arity = arity === undefined$1 ? arity : toInteger(arity);
		      length -= holders ? holders.length : 0;

		      if (bitmask & WRAP_PARTIAL_RIGHT_FLAG) {
		        var partialsRight = partials,
		            holdersRight = holders;

		        partials = holders = undefined$1;
		      }
		      var data = isBindKey ? undefined$1 : getData(func);

		      var newData = [
		        func, bitmask, thisArg, partials, holders, partialsRight, holdersRight,
		        argPos, ary, arity
		      ];

		      if (data) {
		        mergeData(newData, data);
		      }
		      func = newData[0];
		      bitmask = newData[1];
		      thisArg = newData[2];
		      partials = newData[3];
		      holders = newData[4];
		      arity = newData[9] = newData[9] === undefined$1
		        ? (isBindKey ? 0 : func.length)
		        : nativeMax(newData[9] - length, 0);

		      if (!arity && bitmask & (WRAP_CURRY_FLAG | WRAP_CURRY_RIGHT_FLAG)) {
		        bitmask &= -25;
		      }
		      if (!bitmask || bitmask == WRAP_BIND_FLAG) {
		        var result = createBind(func, bitmask, thisArg);
		      } else if (bitmask == WRAP_CURRY_FLAG || bitmask == WRAP_CURRY_RIGHT_FLAG) {
		        result = createCurry(func, bitmask, arity);
		      } else if ((bitmask == WRAP_PARTIAL_FLAG || bitmask == (WRAP_BIND_FLAG | WRAP_PARTIAL_FLAG)) && !holders.length) {
		        result = createPartial(func, bitmask, thisArg, partials);
		      } else {
		        result = createHybrid.apply(undefined$1, newData);
		      }
		      var setter = data ? baseSetData : setData;
		      return setWrapToString(setter(result, newData), func, bitmask);
		    }

		    /**
		     * Used by `_.defaults` to customize its `_.assignIn` use to assign properties
		     * of source objects to the destination object for all destination properties
		     * that resolve to `undefined`.
		     *
		     * @private
		     * @param {*} objValue The destination value.
		     * @param {*} srcValue The source value.
		     * @param {string} key The key of the property to assign.
		     * @param {Object} object The parent object of `objValue`.
		     * @returns {*} Returns the value to assign.
		     */
		    function customDefaultsAssignIn(objValue, srcValue, key, object) {
		      if (objValue === undefined$1 ||
		          (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
		        return srcValue;
		      }
		      return objValue;
		    }

		    /**
		     * Used by `_.defaultsDeep` to customize its `_.merge` use to merge source
		     * objects into destination objects that are passed thru.
		     *
		     * @private
		     * @param {*} objValue The destination value.
		     * @param {*} srcValue The source value.
		     * @param {string} key The key of the property to merge.
		     * @param {Object} object The parent object of `objValue`.
		     * @param {Object} source The parent object of `srcValue`.
		     * @param {Object} [stack] Tracks traversed source values and their merged
		     *  counterparts.
		     * @returns {*} Returns the value to assign.
		     */
		    function customDefaultsMerge(objValue, srcValue, key, object, source, stack) {
		      if (isObject(objValue) && isObject(srcValue)) {
		        // Recursively merge objects and arrays (susceptible to call stack limits).
		        stack.set(srcValue, objValue);
		        baseMerge(objValue, srcValue, undefined$1, customDefaultsMerge, stack);
		        stack['delete'](srcValue);
		      }
		      return objValue;
		    }

		    /**
		     * Used by `_.omit` to customize its `_.cloneDeep` use to only clone plain
		     * objects.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @param {string} key The key of the property to inspect.
		     * @returns {*} Returns the uncloned value or `undefined` to defer cloning to `_.cloneDeep`.
		     */
		    function customOmitClone(value) {
		      return isPlainObject(value) ? undefined$1 : value;
		    }

		    /**
		     * A specialized version of `baseIsEqualDeep` for arrays with support for
		     * partial deep comparisons.
		     *
		     * @private
		     * @param {Array} array The array to compare.
		     * @param {Array} other The other array to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} stack Tracks traversed `array` and `other` objects.
		     * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
		     */
		    function equalArrays(array, other, bitmask, customizer, equalFunc, stack) {
		      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
		          arrLength = array.length,
		          othLength = other.length;

		      if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
		        return false;
		      }
		      // Check that cyclic values are equal.
		      var arrStacked = stack.get(array);
		      var othStacked = stack.get(other);
		      if (arrStacked && othStacked) {
		        return arrStacked == other && othStacked == array;
		      }
		      var index = -1,
		          result = true,
		          seen = (bitmask & COMPARE_UNORDERED_FLAG) ? new SetCache : undefined$1;

		      stack.set(array, other);
		      stack.set(other, array);

		      // Ignore non-index properties.
		      while (++index < arrLength) {
		        var arrValue = array[index],
		            othValue = other[index];

		        if (customizer) {
		          var compared = isPartial
		            ? customizer(othValue, arrValue, index, other, array, stack)
		            : customizer(arrValue, othValue, index, array, other, stack);
		        }
		        if (compared !== undefined$1) {
		          if (compared) {
		            continue;
		          }
		          result = false;
		          break;
		        }
		        // Recursively compare arrays (susceptible to call stack limits).
		        if (seen) {
		          if (!arraySome(other, function(othValue, othIndex) {
		                if (!cacheHas(seen, othIndex) &&
		                    (arrValue === othValue || equalFunc(arrValue, othValue, bitmask, customizer, stack))) {
		                  return seen.push(othIndex);
		                }
		              })) {
		            result = false;
		            break;
		          }
		        } else if (!(
		              arrValue === othValue ||
		                equalFunc(arrValue, othValue, bitmask, customizer, stack)
		            )) {
		          result = false;
		          break;
		        }
		      }
		      stack['delete'](array);
		      stack['delete'](other);
		      return result;
		    }

		    /**
		     * A specialized version of `baseIsEqualDeep` for comparing objects of
		     * the same `toStringTag`.
		     *
		     * **Note:** This function only supports comparing values with tags of
		     * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {string} tag The `toStringTag` of the objects to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} stack Tracks traversed `object` and `other` objects.
		     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
		     */
		    function equalByTag(object, other, tag, bitmask, customizer, equalFunc, stack) {
		      switch (tag) {
		        case dataViewTag:
		          if ((object.byteLength != other.byteLength) ||
		              (object.byteOffset != other.byteOffset)) {
		            return false;
		          }
		          object = object.buffer;
		          other = other.buffer;

		        case arrayBufferTag:
		          if ((object.byteLength != other.byteLength) ||
		              !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
		            return false;
		          }
		          return true;

		        case boolTag:
		        case dateTag:
		        case numberTag:
		          // Coerce booleans to `1` or `0` and dates to milliseconds.
		          // Invalid dates are coerced to `NaN`.
		          return eq(+object, +other);

		        case errorTag:
		          return object.name == other.name && object.message == other.message;

		        case regexpTag:
		        case stringTag:
		          // Coerce regexes to strings and treat strings, primitives and objects,
		          // as equal. See http://www.ecma-international.org/ecma-262/7.0/#sec-regexp.prototype.tostring
		          // for more details.
		          return object == (other + '');

		        case mapTag:
		          var convert = mapToArray;

		        case setTag:
		          var isPartial = bitmask & COMPARE_PARTIAL_FLAG;
		          convert || (convert = setToArray);

		          if (object.size != other.size && !isPartial) {
		            return false;
		          }
		          // Assume cyclic values are equal.
		          var stacked = stack.get(object);
		          if (stacked) {
		            return stacked == other;
		          }
		          bitmask |= COMPARE_UNORDERED_FLAG;

		          // Recursively compare objects (susceptible to call stack limits).
		          stack.set(object, other);
		          var result = equalArrays(convert(object), convert(other), bitmask, customizer, equalFunc, stack);
		          stack['delete'](object);
		          return result;

		        case symbolTag:
		          if (symbolValueOf) {
		            return symbolValueOf.call(object) == symbolValueOf.call(other);
		          }
		      }
		      return false;
		    }

		    /**
		     * A specialized version of `baseIsEqualDeep` for objects with support for
		     * partial deep comparisons.
		     *
		     * @private
		     * @param {Object} object The object to compare.
		     * @param {Object} other The other object to compare.
		     * @param {number} bitmask The bitmask flags. See `baseIsEqual` for more details.
		     * @param {Function} customizer The function to customize comparisons.
		     * @param {Function} equalFunc The function to determine equivalents of values.
		     * @param {Object} stack Tracks traversed `object` and `other` objects.
		     * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
		     */
		    function equalObjects(object, other, bitmask, customizer, equalFunc, stack) {
		      var isPartial = bitmask & COMPARE_PARTIAL_FLAG,
		          objProps = getAllKeys(object),
		          objLength = objProps.length,
		          othProps = getAllKeys(other),
		          othLength = othProps.length;

		      if (objLength != othLength && !isPartial) {
		        return false;
		      }
		      var index = objLength;
		      while (index--) {
		        var key = objProps[index];
		        if (!(isPartial ? key in other : hasOwnProperty.call(other, key))) {
		          return false;
		        }
		      }
		      // Check that cyclic values are equal.
		      var objStacked = stack.get(object);
		      var othStacked = stack.get(other);
		      if (objStacked && othStacked) {
		        return objStacked == other && othStacked == object;
		      }
		      var result = true;
		      stack.set(object, other);
		      stack.set(other, object);

		      var skipCtor = isPartial;
		      while (++index < objLength) {
		        key = objProps[index];
		        var objValue = object[key],
		            othValue = other[key];

		        if (customizer) {
		          var compared = isPartial
		            ? customizer(othValue, objValue, key, other, object, stack)
		            : customizer(objValue, othValue, key, object, other, stack);
		        }
		        // Recursively compare objects (susceptible to call stack limits).
		        if (!(compared === undefined$1
		              ? (objValue === othValue || equalFunc(objValue, othValue, bitmask, customizer, stack))
		              : compared
		            )) {
		          result = false;
		          break;
		        }
		        skipCtor || (skipCtor = key == 'constructor');
		      }
		      if (result && !skipCtor) {
		        var objCtor = object.constructor,
		            othCtor = other.constructor;

		        // Non `Object` object instances with different constructors are not equal.
		        if (objCtor != othCtor &&
		            ('constructor' in object && 'constructor' in other) &&
		            !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
		              typeof othCtor == 'function' && othCtor instanceof othCtor)) {
		          result = false;
		        }
		      }
		      stack['delete'](object);
		      stack['delete'](other);
		      return result;
		    }

		    /**
		     * A specialized version of `baseRest` which flattens the rest array.
		     *
		     * @private
		     * @param {Function} func The function to apply a rest parameter to.
		     * @returns {Function} Returns the new function.
		     */
		    function flatRest(func) {
		      return setToString(overRest(func, undefined$1, flatten), func + '');
		    }

		    /**
		     * Creates an array of own enumerable property names and symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names and symbols.
		     */
		    function getAllKeys(object) {
		      return baseGetAllKeys(object, keys, getSymbols);
		    }

		    /**
		     * Creates an array of own and inherited enumerable property names and
		     * symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names and symbols.
		     */
		    function getAllKeysIn(object) {
		      return baseGetAllKeys(object, keysIn, getSymbolsIn);
		    }

		    /**
		     * Gets metadata for `func`.
		     *
		     * @private
		     * @param {Function} func The function to query.
		     * @returns {*} Returns the metadata for `func`.
		     */
		    var getData = !metaMap ? noop : function(func) {
		      return metaMap.get(func);
		    };

		    /**
		     * Gets the name of `func`.
		     *
		     * @private
		     * @param {Function} func The function to query.
		     * @returns {string} Returns the function name.
		     */
		    function getFuncName(func) {
		      var result = (func.name + ''),
		          array = realNames[result],
		          length = hasOwnProperty.call(realNames, result) ? array.length : 0;

		      while (length--) {
		        var data = array[length],
		            otherFunc = data.func;
		        if (otherFunc == null || otherFunc == func) {
		          return data.name;
		        }
		      }
		      return result;
		    }

		    /**
		     * Gets the argument placeholder value for `func`.
		     *
		     * @private
		     * @param {Function} func The function to inspect.
		     * @returns {*} Returns the placeholder value.
		     */
		    function getHolder(func) {
		      var object = hasOwnProperty.call(lodash, 'placeholder') ? lodash : func;
		      return object.placeholder;
		    }

		    /**
		     * Gets the appropriate "iteratee" function. If `_.iteratee` is customized,
		     * this function returns the custom method, otherwise it returns `baseIteratee`.
		     * If arguments are provided, the chosen function is invoked with them and
		     * its result is returned.
		     *
		     * @private
		     * @param {*} [value] The value to convert to an iteratee.
		     * @param {number} [arity] The arity of the created iteratee.
		     * @returns {Function} Returns the chosen function or its result.
		     */
		    function getIteratee() {
		      var result = lodash.iteratee || iteratee;
		      result = result === iteratee ? baseIteratee : result;
		      return arguments.length ? result(arguments[0], arguments[1]) : result;
		    }

		    /**
		     * Gets the data for `map`.
		     *
		     * @private
		     * @param {Object} map The map to query.
		     * @param {string} key The reference key.
		     * @returns {*} Returns the map data.
		     */
		    function getMapData(map, key) {
		      var data = map.__data__;
		      return isKeyable(key)
		        ? data[typeof key == 'string' ? 'string' : 'hash']
		        : data.map;
		    }

		    /**
		     * Gets the property names, values, and compare flags of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the match data of `object`.
		     */
		    function getMatchData(object) {
		      var result = keys(object),
		          length = result.length;

		      while (length--) {
		        var key = result[length],
		            value = object[key];

		        result[length] = [key, value, isStrictComparable(value)];
		      }
		      return result;
		    }

		    /**
		     * Gets the native function at `key` of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {string} key The key of the method to get.
		     * @returns {*} Returns the function if it's native, else `undefined`.
		     */
		    function getNative(object, key) {
		      var value = getValue(object, key);
		      return baseIsNative(value) ? value : undefined$1;
		    }

		    /**
		     * A specialized version of `baseGetTag` which ignores `Symbol.toStringTag` values.
		     *
		     * @private
		     * @param {*} value The value to query.
		     * @returns {string} Returns the raw `toStringTag`.
		     */
		    function getRawTag(value) {
		      var isOwn = hasOwnProperty.call(value, symToStringTag),
		          tag = value[symToStringTag];

		      try {
		        value[symToStringTag] = undefined$1;
		        var unmasked = true;
		      } catch (e) {}

		      var result = nativeObjectToString.call(value);
		      if (unmasked) {
		        if (isOwn) {
		          value[symToStringTag] = tag;
		        } else {
		          delete value[symToStringTag];
		        }
		      }
		      return result;
		    }

		    /**
		     * Creates an array of the own enumerable symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of symbols.
		     */
		    var getSymbols = !nativeGetSymbols ? stubArray : function(object) {
		      if (object == null) {
		        return [];
		      }
		      object = Object(object);
		      return arrayFilter(nativeGetSymbols(object), function(symbol) {
		        return propertyIsEnumerable.call(object, symbol);
		      });
		    };

		    /**
		     * Creates an array of the own and inherited enumerable symbols of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of symbols.
		     */
		    var getSymbolsIn = !nativeGetSymbols ? stubArray : function(object) {
		      var result = [];
		      while (object) {
		        arrayPush(result, getSymbols(object));
		        object = getPrototype(object);
		      }
		      return result;
		    };

		    /**
		     * Gets the `toStringTag` of `value`.
		     *
		     * @private
		     * @param {*} value The value to query.
		     * @returns {string} Returns the `toStringTag`.
		     */
		    var getTag = baseGetTag;

		    // Fallback for data views, maps, sets, and weak maps in IE 11 and promises in Node.js < 6.
		    if ((DataView && getTag(new DataView(new ArrayBuffer(1))) != dataViewTag) ||
		        (Map && getTag(new Map) != mapTag) ||
		        (Promise && getTag(Promise.resolve()) != promiseTag) ||
		        (Set && getTag(new Set) != setTag) ||
		        (WeakMap && getTag(new WeakMap) != weakMapTag)) {
		      getTag = function(value) {
		        var result = baseGetTag(value),
		            Ctor = result == objectTag ? value.constructor : undefined$1,
		            ctorString = Ctor ? toSource(Ctor) : '';

		        if (ctorString) {
		          switch (ctorString) {
		            case dataViewCtorString: return dataViewTag;
		            case mapCtorString: return mapTag;
		            case promiseCtorString: return promiseTag;
		            case setCtorString: return setTag;
		            case weakMapCtorString: return weakMapTag;
		          }
		        }
		        return result;
		      };
		    }

		    /**
		     * Gets the view, applying any `transforms` to the `start` and `end` positions.
		     *
		     * @private
		     * @param {number} start The start of the view.
		     * @param {number} end The end of the view.
		     * @param {Array} transforms The transformations to apply to the view.
		     * @returns {Object} Returns an object containing the `start` and `end`
		     *  positions of the view.
		     */
		    function getView(start, end, transforms) {
		      var index = -1,
		          length = transforms.length;

		      while (++index < length) {
		        var data = transforms[index],
		            size = data.size;

		        switch (data.type) {
		          case 'drop':      start += size; break;
		          case 'dropRight': end -= size; break;
		          case 'take':      end = nativeMin(end, start + size); break;
		          case 'takeRight': start = nativeMax(start, end - size); break;
		        }
		      }
		      return { 'start': start, 'end': end };
		    }

		    /**
		     * Extracts wrapper details from the `source` body comment.
		     *
		     * @private
		     * @param {string} source The source to inspect.
		     * @returns {Array} Returns the wrapper details.
		     */
		    function getWrapDetails(source) {
		      var match = source.match(reWrapDetails);
		      return match ? match[1].split(reSplitDetails) : [];
		    }

		    /**
		     * Checks if `path` exists on `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path to check.
		     * @param {Function} hasFunc The function to check properties.
		     * @returns {boolean} Returns `true` if `path` exists, else `false`.
		     */
		    function hasPath(object, path, hasFunc) {
		      path = castPath(path, object);

		      var index = -1,
		          length = path.length,
		          result = false;

		      while (++index < length) {
		        var key = toKey(path[index]);
		        if (!(result = object != null && hasFunc(object, key))) {
		          break;
		        }
		        object = object[key];
		      }
		      if (result || ++index != length) {
		        return result;
		      }
		      length = object == null ? 0 : object.length;
		      return !!length && isLength(length) && isIndex(key, length) &&
		        (isArray(object) || isArguments(object));
		    }

		    /**
		     * Initializes an array clone.
		     *
		     * @private
		     * @param {Array} array The array to clone.
		     * @returns {Array} Returns the initialized clone.
		     */
		    function initCloneArray(array) {
		      var length = array.length,
		          result = new array.constructor(length);

		      // Add properties assigned by `RegExp#exec`.
		      if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
		        result.index = array.index;
		        result.input = array.input;
		      }
		      return result;
		    }

		    /**
		     * Initializes an object clone.
		     *
		     * @private
		     * @param {Object} object The object to clone.
		     * @returns {Object} Returns the initialized clone.
		     */
		    function initCloneObject(object) {
		      return (typeof object.constructor == 'function' && !isPrototype(object))
		        ? baseCreate(getPrototype(object))
		        : {};
		    }

		    /**
		     * Initializes an object clone based on its `toStringTag`.
		     *
		     * **Note:** This function only supports cloning values with tags of
		     * `Boolean`, `Date`, `Error`, `Map`, `Number`, `RegExp`, `Set`, or `String`.
		     *
		     * @private
		     * @param {Object} object The object to clone.
		     * @param {string} tag The `toStringTag` of the object to clone.
		     * @param {boolean} [isDeep] Specify a deep clone.
		     * @returns {Object} Returns the initialized clone.
		     */
		    function initCloneByTag(object, tag, isDeep) {
		      var Ctor = object.constructor;
		      switch (tag) {
		        case arrayBufferTag:
		          return cloneArrayBuffer(object);

		        case boolTag:
		        case dateTag:
		          return new Ctor(+object);

		        case dataViewTag:
		          return cloneDataView(object, isDeep);

		        case float32Tag: case float64Tag:
		        case int8Tag: case int16Tag: case int32Tag:
		        case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
		          return cloneTypedArray(object, isDeep);

		        case mapTag:
		          return new Ctor;

		        case numberTag:
		        case stringTag:
		          return new Ctor(object);

		        case regexpTag:
		          return cloneRegExp(object);

		        case setTag:
		          return new Ctor;

		        case symbolTag:
		          return cloneSymbol(object);
		      }
		    }

		    /**
		     * Inserts wrapper `details` in a comment at the top of the `source` body.
		     *
		     * @private
		     * @param {string} source The source to modify.
		     * @returns {Array} details The details to insert.
		     * @returns {string} Returns the modified source.
		     */
		    function insertWrapDetails(source, details) {
		      var length = details.length;
		      if (!length) {
		        return source;
		      }
		      var lastIndex = length - 1;
		      details[lastIndex] = (length > 1 ? '& ' : '') + details[lastIndex];
		      details = details.join(length > 2 ? ', ' : ' ');
		      return source.replace(reWrapComment, '{\n/* [wrapped with ' + details + '] */\n');
		    }

		    /**
		     * Checks if `value` is a flattenable `arguments` object or array.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is flattenable, else `false`.
		     */
		    function isFlattenable(value) {
		      return isArray(value) || isArguments(value) ||
		        !!(spreadableSymbol && value && value[spreadableSymbol]);
		    }

		    /**
		     * Checks if `value` is a valid array-like index.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
		     * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
		     */
		    function isIndex(value, length) {
		      var type = typeof value;
		      length = length == null ? MAX_SAFE_INTEGER : length;

		      return !!length &&
		        (type == 'number' ||
		          (type != 'symbol' && reIsUint.test(value))) &&
		            (value > -1 && value % 1 == 0 && value < length);
		    }

		    /**
		     * Checks if the given arguments are from an iteratee call.
		     *
		     * @private
		     * @param {*} value The potential iteratee value argument.
		     * @param {*} index The potential iteratee index or key argument.
		     * @param {*} object The potential iteratee object argument.
		     * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
		     *  else `false`.
		     */
		    function isIterateeCall(value, index, object) {
		      if (!isObject(object)) {
		        return false;
		      }
		      var type = typeof index;
		      if (type == 'number'
		            ? (isArrayLike(object) && isIndex(index, object.length))
		            : (type == 'string' && index in object)
		          ) {
		        return eq(object[index], value);
		      }
		      return false;
		    }

		    /**
		     * Checks if `value` is a property name and not a property path.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @param {Object} [object] The object to query keys on.
		     * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
		     */
		    function isKey(value, object) {
		      if (isArray(value)) {
		        return false;
		      }
		      var type = typeof value;
		      if (type == 'number' || type == 'symbol' || type == 'boolean' ||
		          value == null || isSymbol(value)) {
		        return true;
		      }
		      return reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
		        (object != null && value in Object(object));
		    }

		    /**
		     * Checks if `value` is suitable for use as unique object key.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
		     */
		    function isKeyable(value) {
		      var type = typeof value;
		      return (type == 'string' || type == 'number' || type == 'symbol' || type == 'boolean')
		        ? (value !== '__proto__')
		        : (value === null);
		    }

		    /**
		     * Checks if `func` has a lazy counterpart.
		     *
		     * @private
		     * @param {Function} func The function to check.
		     * @returns {boolean} Returns `true` if `func` has a lazy counterpart,
		     *  else `false`.
		     */
		    function isLaziable(func) {
		      var funcName = getFuncName(func),
		          other = lodash[funcName];

		      if (typeof other != 'function' || !(funcName in LazyWrapper.prototype)) {
		        return false;
		      }
		      if (func === other) {
		        return true;
		      }
		      var data = getData(other);
		      return !!data && func === data[0];
		    }

		    /**
		     * Checks if `func` has its source masked.
		     *
		     * @private
		     * @param {Function} func The function to check.
		     * @returns {boolean} Returns `true` if `func` is masked, else `false`.
		     */
		    function isMasked(func) {
		      return !!maskSrcKey && (maskSrcKey in func);
		    }

		    /**
		     * Checks if `func` is capable of being masked.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `func` is maskable, else `false`.
		     */
		    var isMaskable = coreJsData ? isFunction : stubFalse;

		    /**
		     * Checks if `value` is likely a prototype object.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
		     */
		    function isPrototype(value) {
		      var Ctor = value && value.constructor,
		          proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

		      return value === proto;
		    }

		    /**
		     * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
		     *
		     * @private
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` if suitable for strict
		     *  equality comparisons, else `false`.
		     */
		    function isStrictComparable(value) {
		      return value === value && !isObject(value);
		    }

		    /**
		     * A specialized version of `matchesProperty` for source values suitable
		     * for strict equality comparisons, i.e. `===`.
		     *
		     * @private
		     * @param {string} key The key of the property to get.
		     * @param {*} srcValue The value to match.
		     * @returns {Function} Returns the new spec function.
		     */
		    function matchesStrictComparable(key, srcValue) {
		      return function(object) {
		        if (object == null) {
		          return false;
		        }
		        return object[key] === srcValue &&
		          (srcValue !== undefined$1 || (key in Object(object)));
		      };
		    }

		    /**
		     * A specialized version of `_.memoize` which clears the memoized function's
		     * cache when it exceeds `MAX_MEMOIZE_SIZE`.
		     *
		     * @private
		     * @param {Function} func The function to have its output memoized.
		     * @returns {Function} Returns the new memoized function.
		     */
		    function memoizeCapped(func) {
		      var result = memoize(func, function(key) {
		        if (cache.size === MAX_MEMOIZE_SIZE) {
		          cache.clear();
		        }
		        return key;
		      });

		      var cache = result.cache;
		      return result;
		    }

		    /**
		     * Merges the function metadata of `source` into `data`.
		     *
		     * Merging metadata reduces the number of wrappers used to invoke a function.
		     * This is possible because methods like `_.bind`, `_.curry`, and `_.partial`
		     * may be applied regardless of execution order. Methods like `_.ary` and
		     * `_.rearg` modify function arguments, making the order in which they are
		     * executed important, preventing the merging of metadata. However, we make
		     * an exception for a safe combined case where curried functions have `_.ary`
		     * and or `_.rearg` applied.
		     *
		     * @private
		     * @param {Array} data The destination metadata.
		     * @param {Array} source The source metadata.
		     * @returns {Array} Returns `data`.
		     */
		    function mergeData(data, source) {
		      var bitmask = data[1],
		          srcBitmask = source[1],
		          newBitmask = bitmask | srcBitmask,
		          isCommon = newBitmask < (WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG | WRAP_ARY_FLAG);

		      var isCombo =
		        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_CURRY_FLAG)) ||
		        ((srcBitmask == WRAP_ARY_FLAG) && (bitmask == WRAP_REARG_FLAG) && (data[7].length <= source[8])) ||
		        ((srcBitmask == (WRAP_ARY_FLAG | WRAP_REARG_FLAG)) && (source[7].length <= source[8]) && (bitmask == WRAP_CURRY_FLAG));

		      // Exit early if metadata can't be merged.
		      if (!(isCommon || isCombo)) {
		        return data;
		      }
		      // Use source `thisArg` if available.
		      if (srcBitmask & WRAP_BIND_FLAG) {
		        data[2] = source[2];
		        // Set when currying a bound function.
		        newBitmask |= bitmask & WRAP_BIND_FLAG ? 0 : WRAP_CURRY_BOUND_FLAG;
		      }
		      // Compose partial arguments.
		      var value = source[3];
		      if (value) {
		        var partials = data[3];
		        data[3] = partials ? composeArgs(partials, value, source[4]) : value;
		        data[4] = partials ? replaceHolders(data[3], PLACEHOLDER) : source[4];
		      }
		      // Compose partial right arguments.
		      value = source[5];
		      if (value) {
		        partials = data[5];
		        data[5] = partials ? composeArgsRight(partials, value, source[6]) : value;
		        data[6] = partials ? replaceHolders(data[5], PLACEHOLDER) : source[6];
		      }
		      // Use source `argPos` if available.
		      value = source[7];
		      if (value) {
		        data[7] = value;
		      }
		      // Use source `ary` if it's smaller.
		      if (srcBitmask & WRAP_ARY_FLAG) {
		        data[8] = data[8] == null ? source[8] : nativeMin(data[8], source[8]);
		      }
		      // Use source `arity` if one is not provided.
		      if (data[9] == null) {
		        data[9] = source[9];
		      }
		      // Use source `func` and merge bitmasks.
		      data[0] = source[0];
		      data[1] = newBitmask;

		      return data;
		    }

		    /**
		     * This function is like
		     * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
		     * except that it includes inherited enumerable properties.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     */
		    function nativeKeysIn(object) {
		      var result = [];
		      if (object != null) {
		        for (var key in Object(object)) {
		          result.push(key);
		        }
		      }
		      return result;
		    }

		    /**
		     * Converts `value` to a string using `Object.prototype.toString`.
		     *
		     * @private
		     * @param {*} value The value to convert.
		     * @returns {string} Returns the converted string.
		     */
		    function objectToString(value) {
		      return nativeObjectToString.call(value);
		    }

		    /**
		     * A specialized version of `baseRest` which transforms the rest array.
		     *
		     * @private
		     * @param {Function} func The function to apply a rest parameter to.
		     * @param {number} [start=func.length-1] The start position of the rest parameter.
		     * @param {Function} transform The rest array transform.
		     * @returns {Function} Returns the new function.
		     */
		    function overRest(func, start, transform) {
		      start = nativeMax(start === undefined$1 ? (func.length - 1) : start, 0);
		      return function() {
		        var args = arguments,
		            index = -1,
		            length = nativeMax(args.length - start, 0),
		            array = Array(length);

		        while (++index < length) {
		          array[index] = args[start + index];
		        }
		        index = -1;
		        var otherArgs = Array(start + 1);
		        while (++index < start) {
		          otherArgs[index] = args[index];
		        }
		        otherArgs[start] = transform(array);
		        return apply(func, this, otherArgs);
		      };
		    }

		    /**
		     * Gets the parent value at `path` of `object`.
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {Array} path The path to get the parent value of.
		     * @returns {*} Returns the parent value.
		     */
		    function parent(object, path) {
		      return path.length < 2 ? object : baseGet(object, baseSlice(path, 0, -1));
		    }

		    /**
		     * Reorder `array` according to the specified indexes where the element at
		     * the first index is assigned as the first element, the element at
		     * the second index is assigned as the second element, and so on.
		     *
		     * @private
		     * @param {Array} array The array to reorder.
		     * @param {Array} indexes The arranged array indexes.
		     * @returns {Array} Returns `array`.
		     */
		    function reorder(array, indexes) {
		      var arrLength = array.length,
		          length = nativeMin(indexes.length, arrLength),
		          oldArray = copyArray(array);

		      while (length--) {
		        var index = indexes[length];
		        array[length] = isIndex(index, arrLength) ? oldArray[index] : undefined$1;
		      }
		      return array;
		    }

		    /**
		     * Gets the value at `key`, unless `key` is "__proto__" or "constructor".
		     *
		     * @private
		     * @param {Object} object The object to query.
		     * @param {string} key The key of the property to get.
		     * @returns {*} Returns the property value.
		     */
		    function safeGet(object, key) {
		      if (key === 'constructor' && typeof object[key] === 'function') {
		        return;
		      }

		      if (key == '__proto__') {
		        return;
		      }

		      return object[key];
		    }

		    /**
		     * Sets metadata for `func`.
		     *
		     * **Note:** If this function becomes hot, i.e. is invoked a lot in a short
		     * period of time, it will trip its breaker and transition to an identity
		     * function to avoid garbage collection pauses in V8. See
		     * [V8 issue 2070](https://bugs.chromium.org/p/v8/issues/detail?id=2070)
		     * for more details.
		     *
		     * @private
		     * @param {Function} func The function to associate metadata with.
		     * @param {*} data The metadata.
		     * @returns {Function} Returns `func`.
		     */
		    var setData = shortOut(baseSetData);

		    /**
		     * A simple wrapper around the global [`setTimeout`](https://mdn.io/setTimeout).
		     *
		     * @private
		     * @param {Function} func The function to delay.
		     * @param {number} wait The number of milliseconds to delay invocation.
		     * @returns {number|Object} Returns the timer id or timeout object.
		     */
		    var setTimeout = ctxSetTimeout || function(func, wait) {
		      return root.setTimeout(func, wait);
		    };

		    /**
		     * Sets the `toString` method of `func` to return `string`.
		     *
		     * @private
		     * @param {Function} func The function to modify.
		     * @param {Function} string The `toString` result.
		     * @returns {Function} Returns `func`.
		     */
		    var setToString = shortOut(baseSetToString);

		    /**
		     * Sets the `toString` method of `wrapper` to mimic the source of `reference`
		     * with wrapper details in a comment at the top of the source body.
		     *
		     * @private
		     * @param {Function} wrapper The function to modify.
		     * @param {Function} reference The reference function.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @returns {Function} Returns `wrapper`.
		     */
		    function setWrapToString(wrapper, reference, bitmask) {
		      var source = (reference + '');
		      return setToString(wrapper, insertWrapDetails(source, updateWrapDetails(getWrapDetails(source), bitmask)));
		    }

		    /**
		     * Creates a function that'll short out and invoke `identity` instead
		     * of `func` when it's called `HOT_COUNT` or more times in `HOT_SPAN`
		     * milliseconds.
		     *
		     * @private
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new shortable function.
		     */
		    function shortOut(func) {
		      var count = 0,
		          lastCalled = 0;

		      return function() {
		        var stamp = nativeNow(),
		            remaining = HOT_SPAN - (stamp - lastCalled);

		        lastCalled = stamp;
		        if (remaining > 0) {
		          if (++count >= HOT_COUNT) {
		            return arguments[0];
		          }
		        } else {
		          count = 0;
		        }
		        return func.apply(undefined$1, arguments);
		      };
		    }

		    /**
		     * A specialized version of `_.shuffle` which mutates and sets the size of `array`.
		     *
		     * @private
		     * @param {Array} array The array to shuffle.
		     * @param {number} [size=array.length] The size of `array`.
		     * @returns {Array} Returns `array`.
		     */
		    function shuffleSelf(array, size) {
		      var index = -1,
		          length = array.length,
		          lastIndex = length - 1;

		      size = size === undefined$1 ? length : size;
		      while (++index < size) {
		        var rand = baseRandom(index, lastIndex),
		            value = array[rand];

		        array[rand] = array[index];
		        array[index] = value;
		      }
		      array.length = size;
		      return array;
		    }

		    /**
		     * Converts `string` to a property path array.
		     *
		     * @private
		     * @param {string} string The string to convert.
		     * @returns {Array} Returns the property path array.
		     */
		    var stringToPath = memoizeCapped(function(string) {
		      var result = [];
		      if (string.charCodeAt(0) === 46 /* . */) {
		        result.push('');
		      }
		      string.replace(rePropName, function(match, number, quote, subString) {
		        result.push(quote ? subString.replace(reEscapeChar, '$1') : (number || match));
		      });
		      return result;
		    });

		    /**
		     * Converts `value` to a string key if it's not a string or symbol.
		     *
		     * @private
		     * @param {*} value The value to inspect.
		     * @returns {string|symbol} Returns the key.
		     */
		    function toKey(value) {
		      if (typeof value == 'string' || isSymbol(value)) {
		        return value;
		      }
		      var result = (value + '');
		      return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
		    }

		    /**
		     * Converts `func` to its source code.
		     *
		     * @private
		     * @param {Function} func The function to convert.
		     * @returns {string} Returns the source code.
		     */
		    function toSource(func) {
		      if (func != null) {
		        try {
		          return funcToString.call(func);
		        } catch (e) {}
		        try {
		          return (func + '');
		        } catch (e) {}
		      }
		      return '';
		    }

		    /**
		     * Updates wrapper `details` based on `bitmask` flags.
		     *
		     * @private
		     * @returns {Array} details The details to modify.
		     * @param {number} bitmask The bitmask flags. See `createWrap` for more details.
		     * @returns {Array} Returns `details`.
		     */
		    function updateWrapDetails(details, bitmask) {
		      arrayEach(wrapFlags, function(pair) {
		        var value = '_.' + pair[0];
		        if ((bitmask & pair[1]) && !arrayIncludes(details, value)) {
		          details.push(value);
		        }
		      });
		      return details.sort();
		    }

		    /**
		     * Creates a clone of `wrapper`.
		     *
		     * @private
		     * @param {Object} wrapper The wrapper to clone.
		     * @returns {Object} Returns the cloned wrapper.
		     */
		    function wrapperClone(wrapper) {
		      if (wrapper instanceof LazyWrapper) {
		        return wrapper.clone();
		      }
		      var result = new LodashWrapper(wrapper.__wrapped__, wrapper.__chain__);
		      result.__actions__ = copyArray(wrapper.__actions__);
		      result.__index__  = wrapper.__index__;
		      result.__values__ = wrapper.__values__;
		      return result;
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an array of elements split into groups the length of `size`.
		     * If `array` can't be split evenly, the final chunk will be the remaining
		     * elements.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to process.
		     * @param {number} [size=1] The length of each chunk
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the new array of chunks.
		     * @example
		     *
		     * _.chunk(['a', 'b', 'c', 'd'], 2);
		     * // => [['a', 'b'], ['c', 'd']]
		     *
		     * _.chunk(['a', 'b', 'c', 'd'], 3);
		     * // => [['a', 'b', 'c'], ['d']]
		     */
		    function chunk(array, size, guard) {
		      if ((guard ? isIterateeCall(array, size, guard) : size === undefined$1)) {
		        size = 1;
		      } else {
		        size = nativeMax(toInteger(size), 0);
		      }
		      var length = array == null ? 0 : array.length;
		      if (!length || size < 1) {
		        return [];
		      }
		      var index = 0,
		          resIndex = 0,
		          result = Array(nativeCeil(length / size));

		      while (index < length) {
		        result[resIndex++] = baseSlice(array, index, (index += size));
		      }
		      return result;
		    }

		    /**
		     * Creates an array with all falsey values removed. The values `false`, `null`,
		     * `0`, `""`, `undefined`, and `NaN` are falsey.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to compact.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * _.compact([0, 1, false, 2, '', 3]);
		     * // => [1, 2, 3]
		     */
		    function compact(array) {
		      var index = -1,
		          length = array == null ? 0 : array.length,
		          resIndex = 0,
		          result = [];

		      while (++index < length) {
		        var value = array[index];
		        if (value) {
		          result[resIndex++] = value;
		        }
		      }
		      return result;
		    }

		    /**
		     * Creates a new array concatenating `array` with any additional arrays
		     * and/or values.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to concatenate.
		     * @param {...*} [values] The values to concatenate.
		     * @returns {Array} Returns the new concatenated array.
		     * @example
		     *
		     * var array = [1];
		     * var other = _.concat(array, 2, [3], [[4]]);
		     *
		     * console.log(other);
		     * // => [1, 2, 3, [4]]
		     *
		     * console.log(array);
		     * // => [1]
		     */
		    function concat() {
		      var length = arguments.length;
		      if (!length) {
		        return [];
		      }
		      var args = Array(length - 1),
		          array = arguments[0],
		          index = length;

		      while (index--) {
		        args[index - 1] = arguments[index];
		      }
		      return arrayPush(isArray(array) ? copyArray(array) : [array], baseFlatten(args, 1));
		    }

		    /**
		     * Creates an array of `array` values not included in the other given arrays
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons. The order and references of result values are
		     * determined by the first array.
		     *
		     * **Note:** Unlike `_.pullAll`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...Array} [values] The values to exclude.
		     * @returns {Array} Returns the new array of filtered values.
		     * @see _.without, _.xor
		     * @example
		     *
		     * _.difference([2, 1], [2, 3]);
		     * // => [1]
		     */
		    var difference = baseRest(function(array, values) {
		      return isArrayLikeObject(array)
		        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true))
		        : [];
		    });

		    /**
		     * This method is like `_.difference` except that it accepts `iteratee` which
		     * is invoked for each element of `array` and `values` to generate the criterion
		     * by which they're compared. The order and references of result values are
		     * determined by the first array. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * **Note:** Unlike `_.pullAllBy`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...Array} [values] The values to exclude.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * _.differenceBy([2.1, 1.2], [2.3, 3.4], Math.floor);
		     * // => [1.2]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.differenceBy([{ 'x': 2 }, { 'x': 1 }], [{ 'x': 1 }], 'x');
		     * // => [{ 'x': 2 }]
		     */
		    var differenceBy = baseRest(function(array, values) {
		      var iteratee = last(values);
		      if (isArrayLikeObject(iteratee)) {
		        iteratee = undefined$1;
		      }
		      return isArrayLikeObject(array)
		        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), getIteratee(iteratee, 2))
		        : [];
		    });

		    /**
		     * This method is like `_.difference` except that it accepts `comparator`
		     * which is invoked to compare elements of `array` to `values`. The order and
		     * references of result values are determined by the first array. The comparator
		     * is invoked with two arguments: (arrVal, othVal).
		     *
		     * **Note:** Unlike `_.pullAllWith`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...Array} [values] The values to exclude.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     *
		     * _.differenceWith(objects, [{ 'x': 1, 'y': 2 }], _.isEqual);
		     * // => [{ 'x': 2, 'y': 1 }]
		     */
		    var differenceWith = baseRest(function(array, values) {
		      var comparator = last(values);
		      if (isArrayLikeObject(comparator)) {
		        comparator = undefined$1;
		      }
		      return isArrayLikeObject(array)
		        ? baseDifference(array, baseFlatten(values, 1, isArrayLikeObject, true), undefined$1, comparator)
		        : [];
		    });

		    /**
		     * Creates a slice of `array` with `n` elements dropped from the beginning.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.5.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to drop.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.drop([1, 2, 3]);
		     * // => [2, 3]
		     *
		     * _.drop([1, 2, 3], 2);
		     * // => [3]
		     *
		     * _.drop([1, 2, 3], 5);
		     * // => []
		     *
		     * _.drop([1, 2, 3], 0);
		     * // => [1, 2, 3]
		     */
		    function drop(array, n, guard) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      n = (guard || n === undefined$1) ? 1 : toInteger(n);
		      return baseSlice(array, n < 0 ? 0 : n, length);
		    }

		    /**
		     * Creates a slice of `array` with `n` elements dropped from the end.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to drop.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.dropRight([1, 2, 3]);
		     * // => [1, 2]
		     *
		     * _.dropRight([1, 2, 3], 2);
		     * // => [1]
		     *
		     * _.dropRight([1, 2, 3], 5);
		     * // => []
		     *
		     * _.dropRight([1, 2, 3], 0);
		     * // => [1, 2, 3]
		     */
		    function dropRight(array, n, guard) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      n = (guard || n === undefined$1) ? 1 : toInteger(n);
		      n = length - n;
		      return baseSlice(array, 0, n < 0 ? 0 : n);
		    }

		    /**
		     * Creates a slice of `array` excluding elements dropped from the end.
		     * Elements are dropped until `predicate` returns falsey. The predicate is
		     * invoked with three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': true },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': false }
		     * ];
		     *
		     * _.dropRightWhile(users, function(o) { return !o.active; });
		     * // => objects for ['barney']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.dropRightWhile(users, { 'user': 'pebbles', 'active': false });
		     * // => objects for ['barney', 'fred']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.dropRightWhile(users, ['active', false]);
		     * // => objects for ['barney']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.dropRightWhile(users, 'active');
		     * // => objects for ['barney', 'fred', 'pebbles']
		     */
		    function dropRightWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3), true, true)
		        : [];
		    }

		    /**
		     * Creates a slice of `array` excluding elements dropped from the beginning.
		     * Elements are dropped until `predicate` returns falsey. The predicate is
		     * invoked with three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': false },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': true }
		     * ];
		     *
		     * _.dropWhile(users, function(o) { return !o.active; });
		     * // => objects for ['pebbles']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.dropWhile(users, { 'user': 'barney', 'active': false });
		     * // => objects for ['fred', 'pebbles']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.dropWhile(users, ['active', false]);
		     * // => objects for ['pebbles']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.dropWhile(users, 'active');
		     * // => objects for ['barney', 'fred', 'pebbles']
		     */
		    function dropWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3), true)
		        : [];
		    }

		    /**
		     * Fills elements of `array` with `value` from `start` up to, but not
		     * including, `end`.
		     *
		     * **Note:** This method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.2.0
		     * @category Array
		     * @param {Array} array The array to fill.
		     * @param {*} value The value to fill `array` with.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [1, 2, 3];
		     *
		     * _.fill(array, 'a');
		     * console.log(array);
		     * // => ['a', 'a', 'a']
		     *
		     * _.fill(Array(3), 2);
		     * // => [2, 2, 2]
		     *
		     * _.fill([4, 6, 8, 10], '*', 1, 3);
		     * // => [4, '*', '*', 10]
		     */
		    function fill(array, value, start, end) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      if (start && typeof start != 'number' && isIterateeCall(array, value, start)) {
		        start = 0;
		        end = length;
		      }
		      return baseFill(array, value, start, end);
		    }

		    /**
		     * This method is like `_.find` except that it returns the index of the first
		     * element `predicate` returns truthy for instead of the element itself.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @returns {number} Returns the index of the found element, else `-1`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': false },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': true }
		     * ];
		     *
		     * _.findIndex(users, function(o) { return o.user == 'barney'; });
		     * // => 0
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findIndex(users, { 'user': 'fred', 'active': false });
		     * // => 1
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findIndex(users, ['active', false]);
		     * // => 0
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findIndex(users, 'active');
		     * // => 2
		     */
		    function findIndex(array, predicate, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = fromIndex == null ? 0 : toInteger(fromIndex);
		      if (index < 0) {
		        index = nativeMax(length + index, 0);
		      }
		      return baseFindIndex(array, getIteratee(predicate, 3), index);
		    }

		    /**
		     * This method is like `_.findIndex` except that it iterates over elements
		     * of `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=array.length-1] The index to search from.
		     * @returns {number} Returns the index of the found element, else `-1`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': true },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': false }
		     * ];
		     *
		     * _.findLastIndex(users, function(o) { return o.user == 'pebbles'; });
		     * // => 2
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findLastIndex(users, { 'user': 'barney', 'active': true });
		     * // => 0
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findLastIndex(users, ['active', false]);
		     * // => 2
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findLastIndex(users, 'active');
		     * // => 0
		     */
		    function findLastIndex(array, predicate, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = length - 1;
		      if (fromIndex !== undefined$1) {
		        index = toInteger(fromIndex);
		        index = fromIndex < 0
		          ? nativeMax(length + index, 0)
		          : nativeMin(index, length - 1);
		      }
		      return baseFindIndex(array, getIteratee(predicate, 3), index, true);
		    }

		    /**
		     * Flattens `array` a single level deep.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to flatten.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * _.flatten([1, [2, [3, [4]], 5]]);
		     * // => [1, 2, [3, [4]], 5]
		     */
		    function flatten(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseFlatten(array, 1) : [];
		    }

		    /**
		     * Recursively flattens `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to flatten.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * _.flattenDeep([1, [2, [3, [4]], 5]]);
		     * // => [1, 2, 3, 4, 5]
		     */
		    function flattenDeep(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseFlatten(array, INFINITY) : [];
		    }

		    /**
		     * Recursively flatten `array` up to `depth` times.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.4.0
		     * @category Array
		     * @param {Array} array The array to flatten.
		     * @param {number} [depth=1] The maximum recursion depth.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * var array = [1, [2, [3, [4]], 5]];
		     *
		     * _.flattenDepth(array, 1);
		     * // => [1, 2, [3, [4]], 5]
		     *
		     * _.flattenDepth(array, 2);
		     * // => [1, 2, 3, [4], 5]
		     */
		    function flattenDepth(array, depth) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      depth = depth === undefined$1 ? 1 : toInteger(depth);
		      return baseFlatten(array, depth);
		    }

		    /**
		     * The inverse of `_.toPairs`; this method returns an object composed
		     * from key-value `pairs`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} pairs The key-value pairs.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * _.fromPairs([['a', 1], ['b', 2]]);
		     * // => { 'a': 1, 'b': 2 }
		     */
		    function fromPairs(pairs) {
		      var index = -1,
		          length = pairs == null ? 0 : pairs.length,
		          result = {};

		      while (++index < length) {
		        var pair = pairs[index];
		        result[pair[0]] = pair[1];
		      }
		      return result;
		    }

		    /**
		     * Gets the first element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @alias first
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {*} Returns the first element of `array`.
		     * @example
		     *
		     * _.head([1, 2, 3]);
		     * // => 1
		     *
		     * _.head([]);
		     * // => undefined
		     */
		    function head(array) {
		      return (array && array.length) ? array[0] : undefined$1;
		    }

		    /**
		     * Gets the index at which the first occurrence of `value` is found in `array`
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons. If `fromIndex` is negative, it's used as the
		     * offset from the end of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.indexOf([1, 2, 1, 2], 2);
		     * // => 1
		     *
		     * // Search from the `fromIndex`.
		     * _.indexOf([1, 2, 1, 2], 2, 2);
		     * // => 3
		     */
		    function indexOf(array, value, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = fromIndex == null ? 0 : toInteger(fromIndex);
		      if (index < 0) {
		        index = nativeMax(length + index, 0);
		      }
		      return baseIndexOf(array, value, index);
		    }

		    /**
		     * Gets all but the last element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.initial([1, 2, 3]);
		     * // => [1, 2]
		     */
		    function initial(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseSlice(array, 0, -1) : [];
		    }

		    /**
		     * Creates an array of unique values that are included in all given arrays
		     * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons. The order and references of result values are
		     * determined by the first array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @returns {Array} Returns the new array of intersecting values.
		     * @example
		     *
		     * _.intersection([2, 1], [2, 3]);
		     * // => [2]
		     */
		    var intersection = baseRest(function(arrays) {
		      var mapped = arrayMap(arrays, castArrayLikeObject);
		      return (mapped.length && mapped[0] === arrays[0])
		        ? baseIntersection(mapped)
		        : [];
		    });

		    /**
		     * This method is like `_.intersection` except that it accepts `iteratee`
		     * which is invoked for each element of each `arrays` to generate the criterion
		     * by which they're compared. The order and references of result values are
		     * determined by the first array. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of intersecting values.
		     * @example
		     *
		     * _.intersectionBy([2.1, 1.2], [2.3, 3.4], Math.floor);
		     * // => [2.1]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.intersectionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 1 }]
		     */
		    var intersectionBy = baseRest(function(arrays) {
		      var iteratee = last(arrays),
		          mapped = arrayMap(arrays, castArrayLikeObject);

		      if (iteratee === last(mapped)) {
		        iteratee = undefined$1;
		      } else {
		        mapped.pop();
		      }
		      return (mapped.length && mapped[0] === arrays[0])
		        ? baseIntersection(mapped, getIteratee(iteratee, 2))
		        : [];
		    });

		    /**
		     * This method is like `_.intersection` except that it accepts `comparator`
		     * which is invoked to compare elements of `arrays`. The order and references
		     * of result values are determined by the first array. The comparator is
		     * invoked with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of intersecting values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.intersectionWith(objects, others, _.isEqual);
		     * // => [{ 'x': 1, 'y': 2 }]
		     */
		    var intersectionWith = baseRest(function(arrays) {
		      var comparator = last(arrays),
		          mapped = arrayMap(arrays, castArrayLikeObject);

		      comparator = typeof comparator == 'function' ? comparator : undefined$1;
		      if (comparator) {
		        mapped.pop();
		      }
		      return (mapped.length && mapped[0] === arrays[0])
		        ? baseIntersection(mapped, undefined$1, comparator)
		        : [];
		    });

		    /**
		     * Converts all elements in `array` into a string separated by `separator`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to convert.
		     * @param {string} [separator=','] The element separator.
		     * @returns {string} Returns the joined string.
		     * @example
		     *
		     * _.join(['a', 'b', 'c'], '~');
		     * // => 'a~b~c'
		     */
		    function join(array, separator) {
		      return array == null ? '' : nativeJoin.call(array, separator);
		    }

		    /**
		     * Gets the last element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {*} Returns the last element of `array`.
		     * @example
		     *
		     * _.last([1, 2, 3]);
		     * // => 3
		     */
		    function last(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? array[length - 1] : undefined$1;
		    }

		    /**
		     * This method is like `_.indexOf` except that it iterates over elements of
		     * `array` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @param {number} [fromIndex=array.length-1] The index to search from.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.lastIndexOf([1, 2, 1, 2], 2);
		     * // => 3
		     *
		     * // Search from the `fromIndex`.
		     * _.lastIndexOf([1, 2, 1, 2], 2, 2);
		     * // => 1
		     */
		    function lastIndexOf(array, value, fromIndex) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return -1;
		      }
		      var index = length;
		      if (fromIndex !== undefined$1) {
		        index = toInteger(fromIndex);
		        index = index < 0 ? nativeMax(length + index, 0) : nativeMin(index, length - 1);
		      }
		      return value === value
		        ? strictLastIndexOf(array, value, index)
		        : baseFindIndex(array, baseIsNaN, index, true);
		    }

		    /**
		     * Gets the element at index `n` of `array`. If `n` is negative, the nth
		     * element from the end is returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.11.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=0] The index of the element to return.
		     * @returns {*} Returns the nth element of `array`.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'd'];
		     *
		     * _.nth(array, 1);
		     * // => 'b'
		     *
		     * _.nth(array, -2);
		     * // => 'c';
		     */
		    function nth(array, n) {
		      return (array && array.length) ? baseNth(array, toInteger(n)) : undefined$1;
		    }

		    /**
		     * Removes all given values from `array` using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * **Note:** Unlike `_.without`, this method mutates `array`. Use `_.remove`
		     * to remove elements from an array by predicate.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {...*} [values] The values to remove.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
		     *
		     * _.pull(array, 'a', 'c');
		     * console.log(array);
		     * // => ['b', 'b']
		     */
		    var pull = baseRest(pullAll);

		    /**
		     * This method is like `_.pull` except that it accepts an array of values to remove.
		     *
		     * **Note:** Unlike `_.difference`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'a', 'b', 'c'];
		     *
		     * _.pullAll(array, ['a', 'c']);
		     * console.log(array);
		     * // => ['b', 'b']
		     */
		    function pullAll(array, values) {
		      return (array && array.length && values && values.length)
		        ? basePullAll(array, values)
		        : array;
		    }

		    /**
		     * This method is like `_.pullAll` except that it accepts `iteratee` which is
		     * invoked for each element of `array` and `values` to generate the criterion
		     * by which they're compared. The iteratee is invoked with one argument: (value).
		     *
		     * **Note:** Unlike `_.differenceBy`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [{ 'x': 1 }, { 'x': 2 }, { 'x': 3 }, { 'x': 1 }];
		     *
		     * _.pullAllBy(array, [{ 'x': 1 }, { 'x': 3 }], 'x');
		     * console.log(array);
		     * // => [{ 'x': 2 }]
		     */
		    function pullAllBy(array, values, iteratee) {
		      return (array && array.length && values && values.length)
		        ? basePullAll(array, values, getIteratee(iteratee, 2))
		        : array;
		    }

		    /**
		     * This method is like `_.pullAll` except that it accepts `comparator` which
		     * is invoked to compare elements of `array` to `values`. The comparator is
		     * invoked with two arguments: (arrVal, othVal).
		     *
		     * **Note:** Unlike `_.differenceWith`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.6.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Array} values The values to remove.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [{ 'x': 1, 'y': 2 }, { 'x': 3, 'y': 4 }, { 'x': 5, 'y': 6 }];
		     *
		     * _.pullAllWith(array, [{ 'x': 3, 'y': 4 }], _.isEqual);
		     * console.log(array);
		     * // => [{ 'x': 1, 'y': 2 }, { 'x': 5, 'y': 6 }]
		     */
		    function pullAllWith(array, values, comparator) {
		      return (array && array.length && values && values.length)
		        ? basePullAll(array, values, undefined$1, comparator)
		        : array;
		    }

		    /**
		     * Removes elements from `array` corresponding to `indexes` and returns an
		     * array of removed elements.
		     *
		     * **Note:** Unlike `_.at`, this method mutates `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {...(number|number[])} [indexes] The indexes of elements to remove.
		     * @returns {Array} Returns the new array of removed elements.
		     * @example
		     *
		     * var array = ['a', 'b', 'c', 'd'];
		     * var pulled = _.pullAt(array, [1, 3]);
		     *
		     * console.log(array);
		     * // => ['a', 'c']
		     *
		     * console.log(pulled);
		     * // => ['b', 'd']
		     */
		    var pullAt = flatRest(function(array, indexes) {
		      var length = array == null ? 0 : array.length,
		          result = baseAt(array, indexes);

		      basePullAt(array, arrayMap(indexes, function(index) {
		        return isIndex(index, length) ? +index : index;
		      }).sort(compareAscending));

		      return result;
		    });

		    /**
		     * Removes all elements from `array` that `predicate` returns truthy for
		     * and returns an array of the removed elements. The predicate is invoked
		     * with three arguments: (value, index, array).
		     *
		     * **Note:** Unlike `_.filter`, this method mutates `array`. Use `_.pull`
		     * to pull elements from an array by value.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new array of removed elements.
		     * @example
		     *
		     * var array = [1, 2, 3, 4];
		     * var evens = _.remove(array, function(n) {
		     *   return n % 2 == 0;
		     * });
		     *
		     * console.log(array);
		     * // => [1, 3]
		     *
		     * console.log(evens);
		     * // => [2, 4]
		     */
		    function remove(array, predicate) {
		      var result = [];
		      if (!(array && array.length)) {
		        return result;
		      }
		      var index = -1,
		          indexes = [],
		          length = array.length;

		      predicate = getIteratee(predicate, 3);
		      while (++index < length) {
		        var value = array[index];
		        if (predicate(value, index, array)) {
		          result.push(value);
		          indexes.push(index);
		        }
		      }
		      basePullAt(array, indexes);
		      return result;
		    }

		    /**
		     * Reverses `array` so that the first element becomes the last, the second
		     * element becomes the second to last, and so on.
		     *
		     * **Note:** This method mutates `array` and is based on
		     * [`Array#reverse`](https://mdn.io/Array/reverse).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to modify.
		     * @returns {Array} Returns `array`.
		     * @example
		     *
		     * var array = [1, 2, 3];
		     *
		     * _.reverse(array);
		     * // => [3, 2, 1]
		     *
		     * console.log(array);
		     * // => [3, 2, 1]
		     */
		    function reverse(array) {
		      return array == null ? array : nativeReverse.call(array);
		    }

		    /**
		     * Creates a slice of `array` from `start` up to, but not including, `end`.
		     *
		     * **Note:** This method is used instead of
		     * [`Array#slice`](https://mdn.io/Array/slice) to ensure dense arrays are
		     * returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to slice.
		     * @param {number} [start=0] The start position.
		     * @param {number} [end=array.length] The end position.
		     * @returns {Array} Returns the slice of `array`.
		     */
		    function slice(array, start, end) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      if (end && typeof end != 'number' && isIterateeCall(array, start, end)) {
		        start = 0;
		        end = length;
		      }
		      else {
		        start = start == null ? 0 : toInteger(start);
		        end = end === undefined$1 ? length : toInteger(end);
		      }
		      return baseSlice(array, start, end);
		    }

		    /**
		     * Uses a binary search to determine the lowest index at which `value`
		     * should be inserted into `array` in order to maintain its sort order.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * _.sortedIndex([30, 50], 40);
		     * // => 1
		     */
		    function sortedIndex(array, value) {
		      return baseSortedIndex(array, value);
		    }

		    /**
		     * This method is like `_.sortedIndex` except that it accepts `iteratee`
		     * which is invoked for `value` and each element of `array` to compute their
		     * sort ranking. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * var objects = [{ 'x': 4 }, { 'x': 5 }];
		     *
		     * _.sortedIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
		     * // => 0
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.sortedIndexBy(objects, { 'x': 4 }, 'x');
		     * // => 0
		     */
		    function sortedIndexBy(array, value, iteratee) {
		      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2));
		    }

		    /**
		     * This method is like `_.indexOf` except that it performs a binary
		     * search on a sorted `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.sortedIndexOf([4, 5, 5, 5, 6], 5);
		     * // => 1
		     */
		    function sortedIndexOf(array, value) {
		      var length = array == null ? 0 : array.length;
		      if (length) {
		        var index = baseSortedIndex(array, value);
		        if (index < length && eq(array[index], value)) {
		          return index;
		        }
		      }
		      return -1;
		    }

		    /**
		     * This method is like `_.sortedIndex` except that it returns the highest
		     * index at which `value` should be inserted into `array` in order to
		     * maintain its sort order.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * _.sortedLastIndex([4, 5, 5, 5, 6], 5);
		     * // => 4
		     */
		    function sortedLastIndex(array, value) {
		      return baseSortedIndex(array, value, true);
		    }

		    /**
		     * This method is like `_.sortedLastIndex` except that it accepts `iteratee`
		     * which is invoked for `value` and each element of `array` to compute their
		     * sort ranking. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The sorted array to inspect.
		     * @param {*} value The value to evaluate.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the index at which `value` should be inserted
		     *  into `array`.
		     * @example
		     *
		     * var objects = [{ 'x': 4 }, { 'x': 5 }];
		     *
		     * _.sortedLastIndexBy(objects, { 'x': 4 }, function(o) { return o.x; });
		     * // => 1
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.sortedLastIndexBy(objects, { 'x': 4 }, 'x');
		     * // => 1
		     */
		    function sortedLastIndexBy(array, value, iteratee) {
		      return baseSortedIndexBy(array, value, getIteratee(iteratee, 2), true);
		    }

		    /**
		     * This method is like `_.lastIndexOf` except that it performs a binary
		     * search on a sorted `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {*} value The value to search for.
		     * @returns {number} Returns the index of the matched value, else `-1`.
		     * @example
		     *
		     * _.sortedLastIndexOf([4, 5, 5, 5, 6], 5);
		     * // => 3
		     */
		    function sortedLastIndexOf(array, value) {
		      var length = array == null ? 0 : array.length;
		      if (length) {
		        var index = baseSortedIndex(array, value, true) - 1;
		        if (eq(array[index], value)) {
		          return index;
		        }
		      }
		      return -1;
		    }

		    /**
		     * This method is like `_.uniq` except that it's designed and optimized
		     * for sorted arrays.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.sortedUniq([1, 1, 2]);
		     * // => [1, 2]
		     */
		    function sortedUniq(array) {
		      return (array && array.length)
		        ? baseSortedUniq(array)
		        : [];
		    }

		    /**
		     * This method is like `_.uniqBy` except that it's designed and optimized
		     * for sorted arrays.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee] The iteratee invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.sortedUniqBy([1.1, 1.2, 2.3, 2.4], Math.floor);
		     * // => [1.1, 2.3]
		     */
		    function sortedUniqBy(array, iteratee) {
		      return (array && array.length)
		        ? baseSortedUniq(array, getIteratee(iteratee, 2))
		        : [];
		    }

		    /**
		     * Gets all but the first element of `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.tail([1, 2, 3]);
		     * // => [2, 3]
		     */
		    function tail(array) {
		      var length = array == null ? 0 : array.length;
		      return length ? baseSlice(array, 1, length) : [];
		    }

		    /**
		     * Creates a slice of `array` with `n` elements taken from the beginning.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to take.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.take([1, 2, 3]);
		     * // => [1]
		     *
		     * _.take([1, 2, 3], 2);
		     * // => [1, 2]
		     *
		     * _.take([1, 2, 3], 5);
		     * // => [1, 2, 3]
		     *
		     * _.take([1, 2, 3], 0);
		     * // => []
		     */
		    function take(array, n, guard) {
		      if (!(array && array.length)) {
		        return [];
		      }
		      n = (guard || n === undefined$1) ? 1 : toInteger(n);
		      return baseSlice(array, 0, n < 0 ? 0 : n);
		    }

		    /**
		     * Creates a slice of `array` with `n` elements taken from the end.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {number} [n=1] The number of elements to take.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * _.takeRight([1, 2, 3]);
		     * // => [3]
		     *
		     * _.takeRight([1, 2, 3], 2);
		     * // => [2, 3]
		     *
		     * _.takeRight([1, 2, 3], 5);
		     * // => [1, 2, 3]
		     *
		     * _.takeRight([1, 2, 3], 0);
		     * // => []
		     */
		    function takeRight(array, n, guard) {
		      var length = array == null ? 0 : array.length;
		      if (!length) {
		        return [];
		      }
		      n = (guard || n === undefined$1) ? 1 : toInteger(n);
		      n = length - n;
		      return baseSlice(array, n < 0 ? 0 : n, length);
		    }

		    /**
		     * Creates a slice of `array` with elements taken from the end. Elements are
		     * taken until `predicate` returns falsey. The predicate is invoked with
		     * three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': true },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': false }
		     * ];
		     *
		     * _.takeRightWhile(users, function(o) { return !o.active; });
		     * // => objects for ['fred', 'pebbles']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.takeRightWhile(users, { 'user': 'pebbles', 'active': false });
		     * // => objects for ['pebbles']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.takeRightWhile(users, ['active', false]);
		     * // => objects for ['fred', 'pebbles']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.takeRightWhile(users, 'active');
		     * // => []
		     */
		    function takeRightWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3), false, true)
		        : [];
		    }

		    /**
		     * Creates a slice of `array` with elements taken from the beginning. Elements
		     * are taken until `predicate` returns falsey. The predicate is invoked with
		     * three arguments: (value, index, array).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Array
		     * @param {Array} array The array to query.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the slice of `array`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'active': false },
		     *   { 'user': 'fred',    'active': false },
		     *   { 'user': 'pebbles', 'active': true }
		     * ];
		     *
		     * _.takeWhile(users, function(o) { return !o.active; });
		     * // => objects for ['barney', 'fred']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.takeWhile(users, { 'user': 'barney', 'active': false });
		     * // => objects for ['barney']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.takeWhile(users, ['active', false]);
		     * // => objects for ['barney', 'fred']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.takeWhile(users, 'active');
		     * // => []
		     */
		    function takeWhile(array, predicate) {
		      return (array && array.length)
		        ? baseWhile(array, getIteratee(predicate, 3))
		        : [];
		    }

		    /**
		     * Creates an array of unique values, in order, from all given arrays using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @returns {Array} Returns the new array of combined values.
		     * @example
		     *
		     * _.union([2], [1, 2]);
		     * // => [2, 1]
		     */
		    var union = baseRest(function(arrays) {
		      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true));
		    });

		    /**
		     * This method is like `_.union` except that it accepts `iteratee` which is
		     * invoked for each element of each `arrays` to generate the criterion by
		     * which uniqueness is computed. Result values are chosen from the first
		     * array in which the value occurs. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of combined values.
		     * @example
		     *
		     * _.unionBy([2.1], [1.2, 2.3], Math.floor);
		     * // => [2.1, 1.2]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.unionBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 1 }, { 'x': 2 }]
		     */
		    var unionBy = baseRest(function(arrays) {
		      var iteratee = last(arrays);
		      if (isArrayLikeObject(iteratee)) {
		        iteratee = undefined$1;
		      }
		      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), getIteratee(iteratee, 2));
		    });

		    /**
		     * This method is like `_.union` except that it accepts `comparator` which
		     * is invoked to compare elements of `arrays`. Result values are chosen from
		     * the first array in which the value occurs. The comparator is invoked
		     * with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of combined values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.unionWith(objects, others, _.isEqual);
		     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
		     */
		    var unionWith = baseRest(function(arrays) {
		      var comparator = last(arrays);
		      comparator = typeof comparator == 'function' ? comparator : undefined$1;
		      return baseUniq(baseFlatten(arrays, 1, isArrayLikeObject, true), undefined$1, comparator);
		    });

		    /**
		     * Creates a duplicate-free version of an array, using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons, in which only the first occurrence of each element
		     * is kept. The order of result values is determined by the order they occur
		     * in the array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.uniq([2, 1, 2]);
		     * // => [2, 1]
		     */
		    function uniq(array) {
		      return (array && array.length) ? baseUniq(array) : [];
		    }

		    /**
		     * This method is like `_.uniq` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the criterion by which
		     * uniqueness is computed. The order of result values is determined by the
		     * order they occur in the array. The iteratee is invoked with one argument:
		     * (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * _.uniqBy([2.1, 1.2, 2.3], Math.floor);
		     * // => [2.1, 1.2]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.uniqBy([{ 'x': 1 }, { 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 1 }, { 'x': 2 }]
		     */
		    function uniqBy(array, iteratee) {
		      return (array && array.length) ? baseUniq(array, getIteratee(iteratee, 2)) : [];
		    }

		    /**
		     * This method is like `_.uniq` except that it accepts `comparator` which
		     * is invoked to compare elements of `array`. The order of result values is
		     * determined by the order they occur in the array.The comparator is invoked
		     * with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new duplicate free array.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.uniqWith(objects, _.isEqual);
		     * // => [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }]
		     */
		    function uniqWith(array, comparator) {
		      comparator = typeof comparator == 'function' ? comparator : undefined$1;
		      return (array && array.length) ? baseUniq(array, undefined$1, comparator) : [];
		    }

		    /**
		     * This method is like `_.zip` except that it accepts an array of grouped
		     * elements and creates an array regrouping the elements to their pre-zip
		     * configuration.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.2.0
		     * @category Array
		     * @param {Array} array The array of grouped elements to process.
		     * @returns {Array} Returns the new array of regrouped elements.
		     * @example
		     *
		     * var zipped = _.zip(['a', 'b'], [1, 2], [true, false]);
		     * // => [['a', 1, true], ['b', 2, false]]
		     *
		     * _.unzip(zipped);
		     * // => [['a', 'b'], [1, 2], [true, false]]
		     */
		    function unzip(array) {
		      if (!(array && array.length)) {
		        return [];
		      }
		      var length = 0;
		      array = arrayFilter(array, function(group) {
		        if (isArrayLikeObject(group)) {
		          length = nativeMax(group.length, length);
		          return true;
		        }
		      });
		      return baseTimes(length, function(index) {
		        return arrayMap(array, baseProperty(index));
		      });
		    }

		    /**
		     * This method is like `_.unzip` except that it accepts `iteratee` to specify
		     * how regrouped values should be combined. The iteratee is invoked with the
		     * elements of each group: (...group).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.8.0
		     * @category Array
		     * @param {Array} array The array of grouped elements to process.
		     * @param {Function} [iteratee=_.identity] The function to combine
		     *  regrouped values.
		     * @returns {Array} Returns the new array of regrouped elements.
		     * @example
		     *
		     * var zipped = _.zip([1, 2], [10, 20], [100, 200]);
		     * // => [[1, 10, 100], [2, 20, 200]]
		     *
		     * _.unzipWith(zipped, _.add);
		     * // => [3, 30, 300]
		     */
		    function unzipWith(array, iteratee) {
		      if (!(array && array.length)) {
		        return [];
		      }
		      var result = unzip(array);
		      if (iteratee == null) {
		        return result;
		      }
		      return arrayMap(result, function(group) {
		        return apply(iteratee, undefined$1, group);
		      });
		    }

		    /**
		     * Creates an array excluding all given values using
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * for equality comparisons.
		     *
		     * **Note:** Unlike `_.pull`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {Array} array The array to inspect.
		     * @param {...*} [values] The values to exclude.
		     * @returns {Array} Returns the new array of filtered values.
		     * @see _.difference, _.xor
		     * @example
		     *
		     * _.without([2, 1, 2, 3], 1, 2);
		     * // => [3]
		     */
		    var without = baseRest(function(array, values) {
		      return isArrayLikeObject(array)
		        ? baseDifference(array, values)
		        : [];
		    });

		    /**
		     * Creates an array of unique values that is the
		     * [symmetric difference](https://en.wikipedia.org/wiki/Symmetric_difference)
		     * of the given arrays. The order of result values is determined by the order
		     * they occur in the arrays.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @returns {Array} Returns the new array of filtered values.
		     * @see _.difference, _.without
		     * @example
		     *
		     * _.xor([2, 1], [2, 3]);
		     * // => [1, 3]
		     */
		    var xor = baseRest(function(arrays) {
		      return baseXor(arrayFilter(arrays, isArrayLikeObject));
		    });

		    /**
		     * This method is like `_.xor` except that it accepts `iteratee` which is
		     * invoked for each element of each `arrays` to generate the criterion by
		     * which by which they're compared. The order of result values is determined
		     * by the order they occur in the arrays. The iteratee is invoked with one
		     * argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * _.xorBy([2.1, 1.2], [2.3, 3.4], Math.floor);
		     * // => [1.2, 3.4]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.xorBy([{ 'x': 1 }], [{ 'x': 2 }, { 'x': 1 }], 'x');
		     * // => [{ 'x': 2 }]
		     */
		    var xorBy = baseRest(function(arrays) {
		      var iteratee = last(arrays);
		      if (isArrayLikeObject(iteratee)) {
		        iteratee = undefined$1;
		      }
		      return baseXor(arrayFilter(arrays, isArrayLikeObject), getIteratee(iteratee, 2));
		    });

		    /**
		     * This method is like `_.xor` except that it accepts `comparator` which is
		     * invoked to compare elements of `arrays`. The order of result values is
		     * determined by the order they occur in the arrays. The comparator is invoked
		     * with two arguments: (arrVal, othVal).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to inspect.
		     * @param {Function} [comparator] The comparator invoked per element.
		     * @returns {Array} Returns the new array of filtered values.
		     * @example
		     *
		     * var objects = [{ 'x': 1, 'y': 2 }, { 'x': 2, 'y': 1 }];
		     * var others = [{ 'x': 1, 'y': 1 }, { 'x': 1, 'y': 2 }];
		     *
		     * _.xorWith(objects, others, _.isEqual);
		     * // => [{ 'x': 2, 'y': 1 }, { 'x': 1, 'y': 1 }]
		     */
		    var xorWith = baseRest(function(arrays) {
		      var comparator = last(arrays);
		      comparator = typeof comparator == 'function' ? comparator : undefined$1;
		      return baseXor(arrayFilter(arrays, isArrayLikeObject), undefined$1, comparator);
		    });

		    /**
		     * Creates an array of grouped elements, the first of which contains the
		     * first elements of the given arrays, the second of which contains the
		     * second elements of the given arrays, and so on.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to process.
		     * @returns {Array} Returns the new array of grouped elements.
		     * @example
		     *
		     * _.zip(['a', 'b'], [1, 2], [true, false]);
		     * // => [['a', 1, true], ['b', 2, false]]
		     */
		    var zip = baseRest(unzip);

		    /**
		     * This method is like `_.fromPairs` except that it accepts two arrays,
		     * one of property identifiers and one of corresponding values.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.4.0
		     * @category Array
		     * @param {Array} [props=[]] The property identifiers.
		     * @param {Array} [values=[]] The property values.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * _.zipObject(['a', 'b'], [1, 2]);
		     * // => { 'a': 1, 'b': 2 }
		     */
		    function zipObject(props, values) {
		      return baseZipObject(props || [], values || [], assignValue);
		    }

		    /**
		     * This method is like `_.zipObject` except that it supports property paths.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.1.0
		     * @category Array
		     * @param {Array} [props=[]] The property identifiers.
		     * @param {Array} [values=[]] The property values.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * _.zipObjectDeep(['a.b[0].c', 'a.b[1].d'], [1, 2]);
		     * // => { 'a': { 'b': [{ 'c': 1 }, { 'd': 2 }] } }
		     */
		    function zipObjectDeep(props, values) {
		      return baseZipObject(props || [], values || [], baseSet);
		    }

		    /**
		     * This method is like `_.zip` except that it accepts `iteratee` to specify
		     * how grouped values should be combined. The iteratee is invoked with the
		     * elements of each group: (...group).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.8.0
		     * @category Array
		     * @param {...Array} [arrays] The arrays to process.
		     * @param {Function} [iteratee=_.identity] The function to combine
		     *  grouped values.
		     * @returns {Array} Returns the new array of grouped elements.
		     * @example
		     *
		     * _.zipWith([1, 2], [10, 20], [100, 200], function(a, b, c) {
		     *   return a + b + c;
		     * });
		     * // => [111, 222]
		     */
		    var zipWith = baseRest(function(arrays) {
		      var length = arrays.length,
		          iteratee = length > 1 ? arrays[length - 1] : undefined$1;

		      iteratee = typeof iteratee == 'function' ? (arrays.pop(), iteratee) : undefined$1;
		      return unzipWith(arrays, iteratee);
		    });

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates a `lodash` wrapper instance that wraps `value` with explicit method
		     * chain sequences enabled. The result of such sequences must be unwrapped
		     * with `_#value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.3.0
		     * @category Seq
		     * @param {*} value The value to wrap.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'age': 36 },
		     *   { 'user': 'fred',    'age': 40 },
		     *   { 'user': 'pebbles', 'age': 1 }
		     * ];
		     *
		     * var youngest = _
		     *   .chain(users)
		     *   .sortBy('age')
		     *   .map(function(o) {
		     *     return o.user + ' is ' + o.age;
		     *   })
		     *   .head()
		     *   .value();
		     * // => 'pebbles is 1'
		     */
		    function chain(value) {
		      var result = lodash(value);
		      result.__chain__ = true;
		      return result;
		    }

		    /**
		     * This method invokes `interceptor` and returns `value`. The interceptor
		     * is invoked with one argument; (value). The purpose of this method is to
		     * "tap into" a method chain sequence in order to modify intermediate results.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Seq
		     * @param {*} value The value to provide to `interceptor`.
		     * @param {Function} interceptor The function to invoke.
		     * @returns {*} Returns `value`.
		     * @example
		     *
		     * _([1, 2, 3])
		     *  .tap(function(array) {
		     *    // Mutate input array.
		     *    array.pop();
		     *  })
		     *  .reverse()
		     *  .value();
		     * // => [2, 1]
		     */
		    function tap(value, interceptor) {
		      interceptor(value);
		      return value;
		    }

		    /**
		     * This method is like `_.tap` except that it returns the result of `interceptor`.
		     * The purpose of this method is to "pass thru" values replacing intermediate
		     * results in a method chain sequence.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Seq
		     * @param {*} value The value to provide to `interceptor`.
		     * @param {Function} interceptor The function to invoke.
		     * @returns {*} Returns the result of `interceptor`.
		     * @example
		     *
		     * _('  abc  ')
		     *  .chain()
		     *  .trim()
		     *  .thru(function(value) {
		     *    return [value];
		     *  })
		     *  .value();
		     * // => ['abc']
		     */
		    function thru(value, interceptor) {
		      return interceptor(value);
		    }

		    /**
		     * This method is the wrapper version of `_.at`.
		     *
		     * @name at
		     * @memberOf _
		     * @since 1.0.0
		     * @category Seq
		     * @param {...(string|string[])} [paths] The property paths to pick.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
		     *
		     * _(object).at(['a[0].b.c', 'a[1]']).value();
		     * // => [3, 4]
		     */
		    var wrapperAt = flatRest(function(paths) {
		      var length = paths.length,
		          start = length ? paths[0] : 0,
		          value = this.__wrapped__,
		          interceptor = function(object) { return baseAt(object, paths); };

		      if (length > 1 || this.__actions__.length ||
		          !(value instanceof LazyWrapper) || !isIndex(start)) {
		        return this.thru(interceptor);
		      }
		      value = value.slice(start, +start + (length ? 1 : 0));
		      value.__actions__.push({
		        'func': thru,
		        'args': [interceptor],
		        'thisArg': undefined$1
		      });
		      return new LodashWrapper(value, this.__chain__).thru(function(array) {
		        if (length && !array.length) {
		          array.push(undefined$1);
		        }
		        return array;
		      });
		    });

		    /**
		     * Creates a `lodash` wrapper instance with explicit method chain sequences enabled.
		     *
		     * @name chain
		     * @memberOf _
		     * @since 0.1.0
		     * @category Seq
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36 },
		     *   { 'user': 'fred',   'age': 40 }
		     * ];
		     *
		     * // A sequence without explicit chaining.
		     * _(users).head();
		     * // => { 'user': 'barney', 'age': 36 }
		     *
		     * // A sequence with explicit chaining.
		     * _(users)
		     *   .chain()
		     *   .head()
		     *   .pick('user')
		     *   .value();
		     * // => { 'user': 'barney' }
		     */
		    function wrapperChain() {
		      return chain(this);
		    }

		    /**
		     * Executes the chain sequence and returns the wrapped result.
		     *
		     * @name commit
		     * @memberOf _
		     * @since 3.2.0
		     * @category Seq
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var array = [1, 2];
		     * var wrapped = _(array).push(3);
		     *
		     * console.log(array);
		     * // => [1, 2]
		     *
		     * wrapped = wrapped.commit();
		     * console.log(array);
		     * // => [1, 2, 3]
		     *
		     * wrapped.last();
		     * // => 3
		     *
		     * console.log(array);
		     * // => [1, 2, 3]
		     */
		    function wrapperCommit() {
		      return new LodashWrapper(this.value(), this.__chain__);
		    }

		    /**
		     * Gets the next value on a wrapped object following the
		     * [iterator protocol](https://mdn.io/iteration_protocols#iterator).
		     *
		     * @name next
		     * @memberOf _
		     * @since 4.0.0
		     * @category Seq
		     * @returns {Object} Returns the next iterator value.
		     * @example
		     *
		     * var wrapped = _([1, 2]);
		     *
		     * wrapped.next();
		     * // => { 'done': false, 'value': 1 }
		     *
		     * wrapped.next();
		     * // => { 'done': false, 'value': 2 }
		     *
		     * wrapped.next();
		     * // => { 'done': true, 'value': undefined }
		     */
		    function wrapperNext() {
		      if (this.__values__ === undefined$1) {
		        this.__values__ = toArray(this.value());
		      }
		      var done = this.__index__ >= this.__values__.length,
		          value = done ? undefined$1 : this.__values__[this.__index__++];

		      return { 'done': done, 'value': value };
		    }

		    /**
		     * Enables the wrapper to be iterable.
		     *
		     * @name Symbol.iterator
		     * @memberOf _
		     * @since 4.0.0
		     * @category Seq
		     * @returns {Object} Returns the wrapper object.
		     * @example
		     *
		     * var wrapped = _([1, 2]);
		     *
		     * wrapped[Symbol.iterator]() === wrapped;
		     * // => true
		     *
		     * Array.from(wrapped);
		     * // => [1, 2]
		     */
		    function wrapperToIterator() {
		      return this;
		    }

		    /**
		     * Creates a clone of the chain sequence planting `value` as the wrapped value.
		     *
		     * @name plant
		     * @memberOf _
		     * @since 3.2.0
		     * @category Seq
		     * @param {*} value The value to plant.
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var wrapped = _([1, 2]).map(square);
		     * var other = wrapped.plant([3, 4]);
		     *
		     * other.value();
		     * // => [9, 16]
		     *
		     * wrapped.value();
		     * // => [1, 4]
		     */
		    function wrapperPlant(value) {
		      var result,
		          parent = this;

		      while (parent instanceof baseLodash) {
		        var clone = wrapperClone(parent);
		        clone.__index__ = 0;
		        clone.__values__ = undefined$1;
		        if (result) {
		          previous.__wrapped__ = clone;
		        } else {
		          result = clone;
		        }
		        var previous = clone;
		        parent = parent.__wrapped__;
		      }
		      previous.__wrapped__ = value;
		      return result;
		    }

		    /**
		     * This method is the wrapper version of `_.reverse`.
		     *
		     * **Note:** This method mutates the wrapped array.
		     *
		     * @name reverse
		     * @memberOf _
		     * @since 0.1.0
		     * @category Seq
		     * @returns {Object} Returns the new `lodash` wrapper instance.
		     * @example
		     *
		     * var array = [1, 2, 3];
		     *
		     * _(array).reverse().value()
		     * // => [3, 2, 1]
		     *
		     * console.log(array);
		     * // => [3, 2, 1]
		     */
		    function wrapperReverse() {
		      var value = this.__wrapped__;
		      if (value instanceof LazyWrapper) {
		        var wrapped = value;
		        if (this.__actions__.length) {
		          wrapped = new LazyWrapper(this);
		        }
		        wrapped = wrapped.reverse();
		        wrapped.__actions__.push({
		          'func': thru,
		          'args': [reverse],
		          'thisArg': undefined$1
		        });
		        return new LodashWrapper(wrapped, this.__chain__);
		      }
		      return this.thru(reverse);
		    }

		    /**
		     * Executes the chain sequence to resolve the unwrapped value.
		     *
		     * @name value
		     * @memberOf _
		     * @since 0.1.0
		     * @alias toJSON, valueOf
		     * @category Seq
		     * @returns {*} Returns the resolved unwrapped value.
		     * @example
		     *
		     * _([1, 2, 3]).value();
		     * // => [1, 2, 3]
		     */
		    function wrapperValue() {
		      return baseWrapperValue(this.__wrapped__, this.__actions__);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Creates an object composed of keys generated from the results of running
		     * each element of `collection` thru `iteratee`. The corresponding value of
		     * each key is the number of times the key was returned by `iteratee`. The
		     * iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.5.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
		     * @returns {Object} Returns the composed aggregate object.
		     * @example
		     *
		     * _.countBy([6.1, 4.2, 6.3], Math.floor);
		     * // => { '4': 1, '6': 2 }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.countBy(['one', 'two', 'three'], 'length');
		     * // => { '3': 2, '5': 1 }
		     */
		    var countBy = createAggregator(function(result, value, key) {
		      if (hasOwnProperty.call(result, key)) {
		        ++result[key];
		      } else {
		        baseAssignValue(result, key, 1);
		      }
		    });

		    /**
		     * Checks if `predicate` returns truthy for **all** elements of `collection`.
		     * Iteration is stopped once `predicate` returns falsey. The predicate is
		     * invoked with three arguments: (value, index|key, collection).
		     *
		     * **Note:** This method returns `true` for
		     * [empty collections](https://en.wikipedia.org/wiki/Empty_set) because
		     * [everything is true](https://en.wikipedia.org/wiki/Vacuous_truth) of
		     * elements of empty collections.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {boolean} Returns `true` if all elements pass the predicate check,
		     *  else `false`.
		     * @example
		     *
		     * _.every([true, 1, null, 'yes'], Boolean);
		     * // => false
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': false },
		     *   { 'user': 'fred',   'age': 40, 'active': false }
		     * ];
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.every(users, { 'user': 'barney', 'active': false });
		     * // => false
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.every(users, ['active', false]);
		     * // => true
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.every(users, 'active');
		     * // => false
		     */
		    function every(collection, predicate, guard) {
		      var func = isArray(collection) ? arrayEvery : baseEvery;
		      if (guard && isIterateeCall(collection, predicate, guard)) {
		        predicate = undefined$1;
		      }
		      return func(collection, getIteratee(predicate, 3));
		    }

		    /**
		     * Iterates over elements of `collection`, returning an array of all elements
		     * `predicate` returns truthy for. The predicate is invoked with three
		     * arguments: (value, index|key, collection).
		     *
		     * **Note:** Unlike `_.remove`, this method returns a new array.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new filtered array.
		     * @see _.reject
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': true },
		     *   { 'user': 'fred',   'age': 40, 'active': false }
		     * ];
		     *
		     * _.filter(users, function(o) { return !o.active; });
		     * // => objects for ['fred']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.filter(users, { 'age': 36, 'active': true });
		     * // => objects for ['barney']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.filter(users, ['active', false]);
		     * // => objects for ['fred']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.filter(users, 'active');
		     * // => objects for ['barney']
		     *
		     * // Combining several predicates using `_.overEvery` or `_.overSome`.
		     * _.filter(users, _.overSome([{ 'age': 36 }, ['age', 40]]));
		     * // => objects for ['fred', 'barney']
		     */
		    function filter(collection, predicate) {
		      var func = isArray(collection) ? arrayFilter : baseFilter;
		      return func(collection, getIteratee(predicate, 3));
		    }

		    /**
		     * Iterates over elements of `collection`, returning the first element
		     * `predicate` returns truthy for. The predicate is invoked with three
		     * arguments: (value, index|key, collection).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @returns {*} Returns the matched element, else `undefined`.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'age': 36, 'active': true },
		     *   { 'user': 'fred',    'age': 40, 'active': false },
		     *   { 'user': 'pebbles', 'age': 1,  'active': true }
		     * ];
		     *
		     * _.find(users, function(o) { return o.age < 40; });
		     * // => object for 'barney'
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.find(users, { 'age': 1, 'active': true });
		     * // => object for 'pebbles'
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.find(users, ['active', false]);
		     * // => object for 'fred'
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.find(users, 'active');
		     * // => object for 'barney'
		     */
		    var find = createFind(findIndex);

		    /**
		     * This method is like `_.find` except that it iterates over elements of
		     * `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param {number} [fromIndex=collection.length-1] The index to search from.
		     * @returns {*} Returns the matched element, else `undefined`.
		     * @example
		     *
		     * _.findLast([1, 2, 3, 4], function(n) {
		     *   return n % 2 == 1;
		     * });
		     * // => 3
		     */
		    var findLast = createFind(findLastIndex);

		    /**
		     * Creates a flattened array of values by running each element in `collection`
		     * thru `iteratee` and flattening the mapped results. The iteratee is invoked
		     * with three arguments: (value, index|key, collection).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * function duplicate(n) {
		     *   return [n, n];
		     * }
		     *
		     * _.flatMap([1, 2], duplicate);
		     * // => [1, 1, 2, 2]
		     */
		    function flatMap(collection, iteratee) {
		      return baseFlatten(map(collection, iteratee), 1);
		    }

		    /**
		     * This method is like `_.flatMap` except that it recursively flattens the
		     * mapped results.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * function duplicate(n) {
		     *   return [[[n, n]]];
		     * }
		     *
		     * _.flatMapDeep([1, 2], duplicate);
		     * // => [1, 1, 2, 2]
		     */
		    function flatMapDeep(collection, iteratee) {
		      return baseFlatten(map(collection, iteratee), INFINITY);
		    }

		    /**
		     * This method is like `_.flatMap` except that it recursively flattens the
		     * mapped results up to `depth` times.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {number} [depth=1] The maximum recursion depth.
		     * @returns {Array} Returns the new flattened array.
		     * @example
		     *
		     * function duplicate(n) {
		     *   return [[[n, n]]];
		     * }
		     *
		     * _.flatMapDepth([1, 2], duplicate, 2);
		     * // => [[1, 1], [2, 2]]
		     */
		    function flatMapDepth(collection, iteratee, depth) {
		      depth = depth === undefined$1 ? 1 : toInteger(depth);
		      return baseFlatten(map(collection, iteratee), depth);
		    }

		    /**
		     * Iterates over elements of `collection` and invokes `iteratee` for each element.
		     * The iteratee is invoked with three arguments: (value, index|key, collection).
		     * Iteratee functions may exit iteration early by explicitly returning `false`.
		     *
		     * **Note:** As with other "Collections" methods, objects with a "length"
		     * property are iterated like arrays. To avoid this behavior use `_.forIn`
		     * or `_.forOwn` for object iteration.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @alias each
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     * @see _.forEachRight
		     * @example
		     *
		     * _.forEach([1, 2], function(value) {
		     *   console.log(value);
		     * });
		     * // => Logs `1` then `2`.
		     *
		     * _.forEach({ 'a': 1, 'b': 2 }, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
		     */
		    function forEach(collection, iteratee) {
		      var func = isArray(collection) ? arrayEach : baseEach;
		      return func(collection, getIteratee(iteratee, 3));
		    }

		    /**
		     * This method is like `_.forEach` except that it iterates over elements of
		     * `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @alias eachRight
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array|Object} Returns `collection`.
		     * @see _.forEach
		     * @example
		     *
		     * _.forEachRight([1, 2], function(value) {
		     *   console.log(value);
		     * });
		     * // => Logs `2` then `1`.
		     */
		    function forEachRight(collection, iteratee) {
		      var func = isArray(collection) ? arrayEachRight : baseEachRight;
		      return func(collection, getIteratee(iteratee, 3));
		    }

		    /**
		     * Creates an object composed of keys generated from the results of running
		     * each element of `collection` thru `iteratee`. The order of grouped values
		     * is determined by the order they occur in `collection`. The corresponding
		     * value of each key is an array of elements responsible for generating the
		     * key. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
		     * @returns {Object} Returns the composed aggregate object.
		     * @example
		     *
		     * _.groupBy([6.1, 4.2, 6.3], Math.floor);
		     * // => { '4': [4.2], '6': [6.1, 6.3] }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.groupBy(['one', 'two', 'three'], 'length');
		     * // => { '3': ['one', 'two'], '5': ['three'] }
		     */
		    var groupBy = createAggregator(function(result, value, key) {
		      if (hasOwnProperty.call(result, key)) {
		        result[key].push(value);
		      } else {
		        baseAssignValue(result, key, [value]);
		      }
		    });

		    /**
		     * Checks if `value` is in `collection`. If `collection` is a string, it's
		     * checked for a substring of `value`, otherwise
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * is used for equality comparisons. If `fromIndex` is negative, it's used as
		     * the offset from the end of `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object|string} collection The collection to inspect.
		     * @param {*} value The value to search for.
		     * @param {number} [fromIndex=0] The index to search from.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
		     * @returns {boolean} Returns `true` if `value` is found, else `false`.
		     * @example
		     *
		     * _.includes([1, 2, 3], 1);
		     * // => true
		     *
		     * _.includes([1, 2, 3], 1, 2);
		     * // => false
		     *
		     * _.includes({ 'a': 1, 'b': 2 }, 1);
		     * // => true
		     *
		     * _.includes('abcd', 'bc');
		     * // => true
		     */
		    function includes(collection, value, fromIndex, guard) {
		      collection = isArrayLike(collection) ? collection : values(collection);
		      fromIndex = (fromIndex && !guard) ? toInteger(fromIndex) : 0;

		      var length = collection.length;
		      if (fromIndex < 0) {
		        fromIndex = nativeMax(length + fromIndex, 0);
		      }
		      return isString(collection)
		        ? (fromIndex <= length && collection.indexOf(value, fromIndex) > -1)
		        : (!!length && baseIndexOf(collection, value, fromIndex) > -1);
		    }

		    /**
		     * Invokes the method at `path` of each element in `collection`, returning
		     * an array of the results of each invoked method. Any additional arguments
		     * are provided to each invoked method. If `path` is a function, it's invoked
		     * for, and `this` bound to, each element in `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Array|Function|string} path The path of the method to invoke or
		     *  the function invoked per iteration.
		     * @param {...*} [args] The arguments to invoke each method with.
		     * @returns {Array} Returns the array of results.
		     * @example
		     *
		     * _.invokeMap([[5, 1, 7], [3, 2, 1]], 'sort');
		     * // => [[1, 5, 7], [1, 2, 3]]
		     *
		     * _.invokeMap([123, 456], String.prototype.split, '');
		     * // => [['1', '2', '3'], ['4', '5', '6']]
		     */
		    var invokeMap = baseRest(function(collection, path, args) {
		      var index = -1,
		          isFunc = typeof path == 'function',
		          result = isArrayLike(collection) ? Array(collection.length) : [];

		      baseEach(collection, function(value) {
		        result[++index] = isFunc ? apply(path, value, args) : baseInvoke(value, path, args);
		      });
		      return result;
		    });

		    /**
		     * Creates an object composed of keys generated from the results of running
		     * each element of `collection` thru `iteratee`. The corresponding value of
		     * each key is the last element responsible for generating the key. The
		     * iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee to transform keys.
		     * @returns {Object} Returns the composed aggregate object.
		     * @example
		     *
		     * var array = [
		     *   { 'dir': 'left', 'code': 97 },
		     *   { 'dir': 'right', 'code': 100 }
		     * ];
		     *
		     * _.keyBy(array, function(o) {
		     *   return String.fromCharCode(o.code);
		     * });
		     * // => { 'a': { 'dir': 'left', 'code': 97 }, 'd': { 'dir': 'right', 'code': 100 } }
		     *
		     * _.keyBy(array, 'dir');
		     * // => { 'left': { 'dir': 'left', 'code': 97 }, 'right': { 'dir': 'right', 'code': 100 } }
		     */
		    var keyBy = createAggregator(function(result, value, key) {
		      baseAssignValue(result, key, value);
		    });

		    /**
		     * Creates an array of values by running each element in `collection` thru
		     * `iteratee`. The iteratee is invoked with three arguments:
		     * (value, index|key, collection).
		     *
		     * Many lodash methods are guarded to work as iteratees for methods like
		     * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
		     *
		     * The guarded methods are:
		     * `ary`, `chunk`, `curry`, `curryRight`, `drop`, `dropRight`, `every`,
		     * `fill`, `invert`, `parseInt`, `random`, `range`, `rangeRight`, `repeat`,
		     * `sampleSize`, `slice`, `some`, `sortBy`, `split`, `take`, `takeRight`,
		     * `template`, `trim`, `trimEnd`, `trimStart`, and `words`
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new mapped array.
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * _.map([4, 8], square);
		     * // => [16, 64]
		     *
		     * _.map({ 'a': 4, 'b': 8 }, square);
		     * // => [16, 64] (iteration order is not guaranteed)
		     *
		     * var users = [
		     *   { 'user': 'barney' },
		     *   { 'user': 'fred' }
		     * ];
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.map(users, 'user');
		     * // => ['barney', 'fred']
		     */
		    function map(collection, iteratee) {
		      var func = isArray(collection) ? arrayMap : baseMap;
		      return func(collection, getIteratee(iteratee, 3));
		    }

		    /**
		     * This method is like `_.sortBy` except that it allows specifying the sort
		     * orders of the iteratees to sort by. If `orders` is unspecified, all values
		     * are sorted in ascending order. Otherwise, specify an order of "desc" for
		     * descending or "asc" for ascending sort order of corresponding values.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Array[]|Function[]|Object[]|string[]} [iteratees=[_.identity]]
		     *  The iteratees to sort by.
		     * @param {string[]} [orders] The sort orders of `iteratees`.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.reduce`.
		     * @returns {Array} Returns the new sorted array.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'fred',   'age': 48 },
		     *   { 'user': 'barney', 'age': 34 },
		     *   { 'user': 'fred',   'age': 40 },
		     *   { 'user': 'barney', 'age': 36 }
		     * ];
		     *
		     * // Sort by `user` in ascending order and by `age` in descending order.
		     * _.orderBy(users, ['user', 'age'], ['asc', 'desc']);
		     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 40]]
		     */
		    function orderBy(collection, iteratees, orders, guard) {
		      if (collection == null) {
		        return [];
		      }
		      if (!isArray(iteratees)) {
		        iteratees = iteratees == null ? [] : [iteratees];
		      }
		      orders = guard ? undefined$1 : orders;
		      if (!isArray(orders)) {
		        orders = orders == null ? [] : [orders];
		      }
		      return baseOrderBy(collection, iteratees, orders);
		    }

		    /**
		     * Creates an array of elements split into two groups, the first of which
		     * contains elements `predicate` returns truthy for, the second of which
		     * contains elements `predicate` returns falsey for. The predicate is
		     * invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the array of grouped elements.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney',  'age': 36, 'active': false },
		     *   { 'user': 'fred',    'age': 40, 'active': true },
		     *   { 'user': 'pebbles', 'age': 1,  'active': false }
		     * ];
		     *
		     * _.partition(users, function(o) { return o.active; });
		     * // => objects for [['fred'], ['barney', 'pebbles']]
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.partition(users, { 'age': 1, 'active': false });
		     * // => objects for [['pebbles'], ['barney', 'fred']]
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.partition(users, ['active', false]);
		     * // => objects for [['barney', 'pebbles'], ['fred']]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.partition(users, 'active');
		     * // => objects for [['fred'], ['barney', 'pebbles']]
		     */
		    var partition = createAggregator(function(result, value, key) {
		      result[key ? 0 : 1].push(value);
		    }, function() { return [[], []]; });

		    /**
		     * Reduces `collection` to a value which is the accumulated result of running
		     * each element in `collection` thru `iteratee`, where each successive
		     * invocation is supplied the return value of the previous. If `accumulator`
		     * is not given, the first element of `collection` is used as the initial
		     * value. The iteratee is invoked with four arguments:
		     * (accumulator, value, index|key, collection).
		     *
		     * Many lodash methods are guarded to work as iteratees for methods like
		     * `_.reduce`, `_.reduceRight`, and `_.transform`.
		     *
		     * The guarded methods are:
		     * `assign`, `defaults`, `defaultsDeep`, `includes`, `merge`, `orderBy`,
		     * and `sortBy`
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {*} [accumulator] The initial value.
		     * @returns {*} Returns the accumulated value.
		     * @see _.reduceRight
		     * @example
		     *
		     * _.reduce([1, 2], function(sum, n) {
		     *   return sum + n;
		     * }, 0);
		     * // => 3
		     *
		     * _.reduce({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
		     *   (result[value] || (result[value] = [])).push(key);
		     *   return result;
		     * }, {});
		     * // => { '1': ['a', 'c'], '2': ['b'] } (iteration order is not guaranteed)
		     */
		    function reduce(collection, iteratee, accumulator) {
		      var func = isArray(collection) ? arrayReduce : baseReduce,
		          initAccum = arguments.length < 3;

		      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEach);
		    }

		    /**
		     * This method is like `_.reduce` except that it iterates over elements of
		     * `collection` from right to left.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {*} [accumulator] The initial value.
		     * @returns {*} Returns the accumulated value.
		     * @see _.reduce
		     * @example
		     *
		     * var array = [[0, 1], [2, 3], [4, 5]];
		     *
		     * _.reduceRight(array, function(flattened, other) {
		     *   return flattened.concat(other);
		     * }, []);
		     * // => [4, 5, 2, 3, 0, 1]
		     */
		    function reduceRight(collection, iteratee, accumulator) {
		      var func = isArray(collection) ? arrayReduceRight : baseReduce,
		          initAccum = arguments.length < 3;

		      return func(collection, getIteratee(iteratee, 4), accumulator, initAccum, baseEachRight);
		    }

		    /**
		     * The opposite of `_.filter`; this method returns the elements of `collection`
		     * that `predicate` does **not** return truthy for.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the new filtered array.
		     * @see _.filter
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': false },
		     *   { 'user': 'fred',   'age': 40, 'active': true }
		     * ];
		     *
		     * _.reject(users, function(o) { return !o.active; });
		     * // => objects for ['fred']
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.reject(users, { 'age': 40, 'active': true });
		     * // => objects for ['barney']
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.reject(users, ['active', false]);
		     * // => objects for ['fred']
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.reject(users, 'active');
		     * // => objects for ['barney']
		     */
		    function reject(collection, predicate) {
		      var func = isArray(collection) ? arrayFilter : baseFilter;
		      return func(collection, negate(getIteratee(predicate, 3)));
		    }

		    /**
		     * Gets a random element from `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to sample.
		     * @returns {*} Returns the random element.
		     * @example
		     *
		     * _.sample([1, 2, 3, 4]);
		     * // => 2
		     */
		    function sample(collection) {
		      var func = isArray(collection) ? arraySample : baseSample;
		      return func(collection);
		    }

		    /**
		     * Gets `n` random elements at unique keys from `collection` up to the
		     * size of `collection`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to sample.
		     * @param {number} [n=1] The number of elements to sample.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the random elements.
		     * @example
		     *
		     * _.sampleSize([1, 2, 3], 2);
		     * // => [3, 1]
		     *
		     * _.sampleSize([1, 2, 3], 4);
		     * // => [2, 3, 1]
		     */
		    function sampleSize(collection, n, guard) {
		      if ((guard ? isIterateeCall(collection, n, guard) : n === undefined$1)) {
		        n = 1;
		      } else {
		        n = toInteger(n);
		      }
		      var func = isArray(collection) ? arraySampleSize : baseSampleSize;
		      return func(collection, n);
		    }

		    /**
		     * Creates an array of shuffled values, using a version of the
		     * [Fisher-Yates shuffle](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to shuffle.
		     * @returns {Array} Returns the new shuffled array.
		     * @example
		     *
		     * _.shuffle([1, 2, 3, 4]);
		     * // => [4, 1, 3, 2]
		     */
		    function shuffle(collection) {
		      var func = isArray(collection) ? arrayShuffle : baseShuffle;
		      return func(collection);
		    }

		    /**
		     * Gets the size of `collection` by returning its length for array-like
		     * values or the number of own enumerable string keyed properties for objects.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object|string} collection The collection to inspect.
		     * @returns {number} Returns the collection size.
		     * @example
		     *
		     * _.size([1, 2, 3]);
		     * // => 3
		     *
		     * _.size({ 'a': 1, 'b': 2 });
		     * // => 2
		     *
		     * _.size('pebbles');
		     * // => 7
		     */
		    function size(collection) {
		      if (collection == null) {
		        return 0;
		      }
		      if (isArrayLike(collection)) {
		        return isString(collection) ? stringSize(collection) : collection.length;
		      }
		      var tag = getTag(collection);
		      if (tag == mapTag || tag == setTag) {
		        return collection.size;
		      }
		      return baseKeys(collection).length;
		    }

		    /**
		     * Checks if `predicate` returns truthy for **any** element of `collection`.
		     * Iteration is stopped once `predicate` returns truthy. The predicate is
		     * invoked with three arguments: (value, index|key, collection).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {boolean} Returns `true` if any element passes the predicate check,
		     *  else `false`.
		     * @example
		     *
		     * _.some([null, 0, 'yes', false], Boolean);
		     * // => true
		     *
		     * var users = [
		     *   { 'user': 'barney', 'active': true },
		     *   { 'user': 'fred',   'active': false }
		     * ];
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.some(users, { 'user': 'barney', 'active': false });
		     * // => false
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.some(users, ['active', false]);
		     * // => true
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.some(users, 'active');
		     * // => true
		     */
		    function some(collection, predicate, guard) {
		      var func = isArray(collection) ? arraySome : baseSome;
		      if (guard && isIterateeCall(collection, predicate, guard)) {
		        predicate = undefined$1;
		      }
		      return func(collection, getIteratee(predicate, 3));
		    }

		    /**
		     * Creates an array of elements, sorted in ascending order by the results of
		     * running each element in a collection thru each iteratee. This method
		     * performs a stable sort, that is, it preserves the original sort order of
		     * equal elements. The iteratees are invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Collection
		     * @param {Array|Object} collection The collection to iterate over.
		     * @param {...(Function|Function[])} [iteratees=[_.identity]]
		     *  The iteratees to sort by.
		     * @returns {Array} Returns the new sorted array.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'fred',   'age': 48 },
		     *   { 'user': 'barney', 'age': 36 },
		     *   { 'user': 'fred',   'age': 30 },
		     *   { 'user': 'barney', 'age': 34 }
		     * ];
		     *
		     * _.sortBy(users, [function(o) { return o.user; }]);
		     * // => objects for [['barney', 36], ['barney', 34], ['fred', 48], ['fred', 30]]
		     *
		     * _.sortBy(users, ['user', 'age']);
		     * // => objects for [['barney', 34], ['barney', 36], ['fred', 30], ['fred', 48]]
		     */
		    var sortBy = baseRest(function(collection, iteratees) {
		      if (collection == null) {
		        return [];
		      }
		      var length = iteratees.length;
		      if (length > 1 && isIterateeCall(collection, iteratees[0], iteratees[1])) {
		        iteratees = [];
		      } else if (length > 2 && isIterateeCall(iteratees[0], iteratees[1], iteratees[2])) {
		        iteratees = [iteratees[0]];
		      }
		      return baseOrderBy(collection, baseFlatten(iteratees, 1), []);
		    });

		    /*------------------------------------------------------------------------*/

		    /**
		     * Gets the timestamp of the number of milliseconds that have elapsed since
		     * the Unix epoch (1 January 1970 00:00:00 UTC).
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Date
		     * @returns {number} Returns the timestamp.
		     * @example
		     *
		     * _.defer(function(stamp) {
		     *   console.log(_.now() - stamp);
		     * }, _.now());
		     * // => Logs the number of milliseconds it took for the deferred invocation.
		     */
		    var now = ctxNow || function() {
		      return root.Date.now();
		    };

		    /*------------------------------------------------------------------------*/

		    /**
		     * The opposite of `_.before`; this method creates a function that invokes
		     * `func` once it's called `n` or more times.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {number} n The number of calls before `func` is invoked.
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new restricted function.
		     * @example
		     *
		     * var saves = ['profile', 'settings'];
		     *
		     * var done = _.after(saves.length, function() {
		     *   console.log('done saving!');
		     * });
		     *
		     * _.forEach(saves, function(type) {
		     *   asyncSave({ 'type': type, 'complete': done });
		     * });
		     * // => Logs 'done saving!' after the two async saves have completed.
		     */
		    function after(n, func) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      n = toInteger(n);
		      return function() {
		        if (--n < 1) {
		          return func.apply(this, arguments);
		        }
		      };
		    }

		    /**
		     * Creates a function that invokes `func`, with up to `n` arguments,
		     * ignoring any additional arguments.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} func The function to cap arguments for.
		     * @param {number} [n=func.length] The arity cap.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the new capped function.
		     * @example
		     *
		     * _.map(['6', '8', '10'], _.ary(parseInt, 1));
		     * // => [6, 8, 10]
		     */
		    function ary(func, n, guard) {
		      n = guard ? undefined$1 : n;
		      n = (func && n == null) ? func.length : n;
		      return createWrap(func, WRAP_ARY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, n);
		    }

		    /**
		     * Creates a function that invokes `func`, with the `this` binding and arguments
		     * of the created function, while it's called less than `n` times. Subsequent
		     * calls to the created function return the result of the last `func` invocation.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {number} n The number of calls at which `func` is no longer invoked.
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new restricted function.
		     * @example
		     *
		     * jQuery(element).on('click', _.before(5, addContactToList));
		     * // => Allows adding up to 4 contacts to the list.
		     */
		    function before(n, func) {
		      var result;
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      n = toInteger(n);
		      return function() {
		        if (--n > 0) {
		          result = func.apply(this, arguments);
		        }
		        if (n <= 1) {
		          func = undefined$1;
		        }
		        return result;
		      };
		    }

		    /**
		     * Creates a function that invokes `func` with the `this` binding of `thisArg`
		     * and `partials` prepended to the arguments it receives.
		     *
		     * The `_.bind.placeholder` value, which defaults to `_` in monolithic builds,
		     * may be used as a placeholder for partially applied arguments.
		     *
		     * **Note:** Unlike native `Function#bind`, this method doesn't set the "length"
		     * property of bound functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to bind.
		     * @param {*} thisArg The `this` binding of `func`.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new bound function.
		     * @example
		     *
		     * function greet(greeting, punctuation) {
		     *   return greeting + ' ' + this.user + punctuation;
		     * }
		     *
		     * var object = { 'user': 'fred' };
		     *
		     * var bound = _.bind(greet, object, 'hi');
		     * bound('!');
		     * // => 'hi fred!'
		     *
		     * // Bound with placeholders.
		     * var bound = _.bind(greet, object, _, '!');
		     * bound('hi');
		     * // => 'hi fred!'
		     */
		    var bind = baseRest(function(func, thisArg, partials) {
		      var bitmask = WRAP_BIND_FLAG;
		      if (partials.length) {
		        var holders = replaceHolders(partials, getHolder(bind));
		        bitmask |= WRAP_PARTIAL_FLAG;
		      }
		      return createWrap(func, bitmask, thisArg, partials, holders);
		    });

		    /**
		     * Creates a function that invokes the method at `object[key]` with `partials`
		     * prepended to the arguments it receives.
		     *
		     * This method differs from `_.bind` by allowing bound functions to reference
		     * methods that may be redefined or don't yet exist. See
		     * [Peter Michaux's article](http://peter.michaux.ca/articles/lazy-function-definition-pattern)
		     * for more details.
		     *
		     * The `_.bindKey.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for partially applied arguments.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.10.0
		     * @category Function
		     * @param {Object} object The object to invoke the method on.
		     * @param {string} key The key of the method.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new bound function.
		     * @example
		     *
		     * var object = {
		     *   'user': 'fred',
		     *   'greet': function(greeting, punctuation) {
		     *     return greeting + ' ' + this.user + punctuation;
		     *   }
		     * };
		     *
		     * var bound = _.bindKey(object, 'greet', 'hi');
		     * bound('!');
		     * // => 'hi fred!'
		     *
		     * object.greet = function(greeting, punctuation) {
		     *   return greeting + 'ya ' + this.user + punctuation;
		     * };
		     *
		     * bound('!');
		     * // => 'hiya fred!'
		     *
		     * // Bound with placeholders.
		     * var bound = _.bindKey(object, 'greet', _, '!');
		     * bound('hi');
		     * // => 'hiya fred!'
		     */
		    var bindKey = baseRest(function(object, key, partials) {
		      var bitmask = WRAP_BIND_FLAG | WRAP_BIND_KEY_FLAG;
		      if (partials.length) {
		        var holders = replaceHolders(partials, getHolder(bindKey));
		        bitmask |= WRAP_PARTIAL_FLAG;
		      }
		      return createWrap(key, bitmask, object, partials, holders);
		    });

		    /**
		     * Creates a function that accepts arguments of `func` and either invokes
		     * `func` returning its result, if at least `arity` number of arguments have
		     * been provided, or returns a function that accepts the remaining `func`
		     * arguments, and so on. The arity of `func` may be specified if `func.length`
		     * is not sufficient.
		     *
		     * The `_.curry.placeholder` value, which defaults to `_` in monolithic builds,
		     * may be used as a placeholder for provided arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of curried functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Function
		     * @param {Function} func The function to curry.
		     * @param {number} [arity=func.length] The arity of `func`.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the new curried function.
		     * @example
		     *
		     * var abc = function(a, b, c) {
		     *   return [a, b, c];
		     * };
		     *
		     * var curried = _.curry(abc);
		     *
		     * curried(1)(2)(3);
		     * // => [1, 2, 3]
		     *
		     * curried(1, 2)(3);
		     * // => [1, 2, 3]
		     *
		     * curried(1, 2, 3);
		     * // => [1, 2, 3]
		     *
		     * // Curried with placeholders.
		     * curried(1)(_, 3)(2);
		     * // => [1, 2, 3]
		     */
		    function curry(func, arity, guard) {
		      arity = guard ? undefined$1 : arity;
		      var result = createWrap(func, WRAP_CURRY_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
		      result.placeholder = curry.placeholder;
		      return result;
		    }

		    /**
		     * This method is like `_.curry` except that arguments are applied to `func`
		     * in the manner of `_.partialRight` instead of `_.partial`.
		     *
		     * The `_.curryRight.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for provided arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of curried functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} func The function to curry.
		     * @param {number} [arity=func.length] The arity of `func`.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the new curried function.
		     * @example
		     *
		     * var abc = function(a, b, c) {
		     *   return [a, b, c];
		     * };
		     *
		     * var curried = _.curryRight(abc);
		     *
		     * curried(3)(2)(1);
		     * // => [1, 2, 3]
		     *
		     * curried(2, 3)(1);
		     * // => [1, 2, 3]
		     *
		     * curried(1, 2, 3);
		     * // => [1, 2, 3]
		     *
		     * // Curried with placeholders.
		     * curried(3)(1, _)(2);
		     * // => [1, 2, 3]
		     */
		    function curryRight(func, arity, guard) {
		      arity = guard ? undefined$1 : arity;
		      var result = createWrap(func, WRAP_CURRY_RIGHT_FLAG, undefined$1, undefined$1, undefined$1, undefined$1, undefined$1, arity);
		      result.placeholder = curryRight.placeholder;
		      return result;
		    }

		    /**
		     * Creates a debounced function that delays invoking `func` until after `wait`
		     * milliseconds have elapsed since the last time the debounced function was
		     * invoked. The debounced function comes with a `cancel` method to cancel
		     * delayed `func` invocations and a `flush` method to immediately invoke them.
		     * Provide `options` to indicate whether `func` should be invoked on the
		     * leading and/or trailing edge of the `wait` timeout. The `func` is invoked
		     * with the last arguments provided to the debounced function. Subsequent
		     * calls to the debounced function return the result of the last `func`
		     * invocation.
		     *
		     * **Note:** If `leading` and `trailing` options are `true`, `func` is
		     * invoked on the trailing edge of the timeout only if the debounced function
		     * is invoked more than once during the `wait` timeout.
		     *
		     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
		     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
		     *
		     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
		     * for details over the differences between `_.debounce` and `_.throttle`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to debounce.
		     * @param {number} [wait=0] The number of milliseconds to delay.
		     * @param {Object} [options={}] The options object.
		     * @param {boolean} [options.leading=false]
		     *  Specify invoking on the leading edge of the timeout.
		     * @param {number} [options.maxWait]
		     *  The maximum time `func` is allowed to be delayed before it's invoked.
		     * @param {boolean} [options.trailing=true]
		     *  Specify invoking on the trailing edge of the timeout.
		     * @returns {Function} Returns the new debounced function.
		     * @example
		     *
		     * // Avoid costly calculations while the window size is in flux.
		     * jQuery(window).on('resize', _.debounce(calculateLayout, 150));
		     *
		     * // Invoke `sendMail` when clicked, debouncing subsequent calls.
		     * jQuery(element).on('click', _.debounce(sendMail, 300, {
		     *   'leading': true,
		     *   'trailing': false
		     * }));
		     *
		     * // Ensure `batchLog` is invoked once after 1 second of debounced calls.
		     * var debounced = _.debounce(batchLog, 250, { 'maxWait': 1000 });
		     * var source = new EventSource('/stream');
		     * jQuery(source).on('message', debounced);
		     *
		     * // Cancel the trailing debounced invocation.
		     * jQuery(window).on('popstate', debounced.cancel);
		     */
		    function debounce(func, wait, options) {
		      var lastArgs,
		          lastThis,
		          maxWait,
		          result,
		          timerId,
		          lastCallTime,
		          lastInvokeTime = 0,
		          leading = false,
		          maxing = false,
		          trailing = true;

		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      wait = toNumber(wait) || 0;
		      if (isObject(options)) {
		        leading = !!options.leading;
		        maxing = 'maxWait' in options;
		        maxWait = maxing ? nativeMax(toNumber(options.maxWait) || 0, wait) : maxWait;
		        trailing = 'trailing' in options ? !!options.trailing : trailing;
		      }

		      function invokeFunc(time) {
		        var args = lastArgs,
		            thisArg = lastThis;

		        lastArgs = lastThis = undefined$1;
		        lastInvokeTime = time;
		        result = func.apply(thisArg, args);
		        return result;
		      }

		      function leadingEdge(time) {
		        // Reset any `maxWait` timer.
		        lastInvokeTime = time;
		        // Start the timer for the trailing edge.
		        timerId = setTimeout(timerExpired, wait);
		        // Invoke the leading edge.
		        return leading ? invokeFunc(time) : result;
		      }

		      function remainingWait(time) {
		        var timeSinceLastCall = time - lastCallTime,
		            timeSinceLastInvoke = time - lastInvokeTime,
		            timeWaiting = wait - timeSinceLastCall;

		        return maxing
		          ? nativeMin(timeWaiting, maxWait - timeSinceLastInvoke)
		          : timeWaiting;
		      }

		      function shouldInvoke(time) {
		        var timeSinceLastCall = time - lastCallTime,
		            timeSinceLastInvoke = time - lastInvokeTime;

		        // Either this is the first call, activity has stopped and we're at the
		        // trailing edge, the system time has gone backwards and we're treating
		        // it as the trailing edge, or we've hit the `maxWait` limit.
		        return (lastCallTime === undefined$1 || (timeSinceLastCall >= wait) ||
		          (timeSinceLastCall < 0) || (maxing && timeSinceLastInvoke >= maxWait));
		      }

		      function timerExpired() {
		        var time = now();
		        if (shouldInvoke(time)) {
		          return trailingEdge(time);
		        }
		        // Restart the timer.
		        timerId = setTimeout(timerExpired, remainingWait(time));
		      }

		      function trailingEdge(time) {
		        timerId = undefined$1;

		        // Only invoke if we have `lastArgs` which means `func` has been
		        // debounced at least once.
		        if (trailing && lastArgs) {
		          return invokeFunc(time);
		        }
		        lastArgs = lastThis = undefined$1;
		        return result;
		      }

		      function cancel() {
		        if (timerId !== undefined$1) {
		          clearTimeout(timerId);
		        }
		        lastInvokeTime = 0;
		        lastArgs = lastCallTime = lastThis = timerId = undefined$1;
		      }

		      function flush() {
		        return timerId === undefined$1 ? result : trailingEdge(now());
		      }

		      function debounced() {
		        var time = now(),
		            isInvoking = shouldInvoke(time);

		        lastArgs = arguments;
		        lastThis = this;
		        lastCallTime = time;

		        if (isInvoking) {
		          if (timerId === undefined$1) {
		            return leadingEdge(lastCallTime);
		          }
		          if (maxing) {
		            // Handle invocations in a tight loop.
		            clearTimeout(timerId);
		            timerId = setTimeout(timerExpired, wait);
		            return invokeFunc(lastCallTime);
		          }
		        }
		        if (timerId === undefined$1) {
		          timerId = setTimeout(timerExpired, wait);
		        }
		        return result;
		      }
		      debounced.cancel = cancel;
		      debounced.flush = flush;
		      return debounced;
		    }

		    /**
		     * Defers invoking the `func` until the current call stack has cleared. Any
		     * additional arguments are provided to `func` when it's invoked.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to defer.
		     * @param {...*} [args] The arguments to invoke `func` with.
		     * @returns {number} Returns the timer id.
		     * @example
		     *
		     * _.defer(function(text) {
		     *   console.log(text);
		     * }, 'deferred');
		     * // => Logs 'deferred' after one millisecond.
		     */
		    var defer = baseRest(function(func, args) {
		      return baseDelay(func, 1, args);
		    });

		    /**
		     * Invokes `func` after `wait` milliseconds. Any additional arguments are
		     * provided to `func` when it's invoked.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to delay.
		     * @param {number} wait The number of milliseconds to delay invocation.
		     * @param {...*} [args] The arguments to invoke `func` with.
		     * @returns {number} Returns the timer id.
		     * @example
		     *
		     * _.delay(function(text) {
		     *   console.log(text);
		     * }, 1000, 'later');
		     * // => Logs 'later' after one second.
		     */
		    var delay = baseRest(function(func, wait, args) {
		      return baseDelay(func, toNumber(wait) || 0, args);
		    });

		    /**
		     * Creates a function that invokes `func` with arguments reversed.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Function
		     * @param {Function} func The function to flip arguments for.
		     * @returns {Function} Returns the new flipped function.
		     * @example
		     *
		     * var flipped = _.flip(function() {
		     *   return _.toArray(arguments);
		     * });
		     *
		     * flipped('a', 'b', 'c', 'd');
		     * // => ['d', 'c', 'b', 'a']
		     */
		    function flip(func) {
		      return createWrap(func, WRAP_FLIP_FLAG);
		    }

		    /**
		     * Creates a function that memoizes the result of `func`. If `resolver` is
		     * provided, it determines the cache key for storing the result based on the
		     * arguments provided to the memoized function. By default, the first argument
		     * provided to the memoized function is used as the map cache key. The `func`
		     * is invoked with the `this` binding of the memoized function.
		     *
		     * **Note:** The cache is exposed as the `cache` property on the memoized
		     * function. Its creation may be customized by replacing the `_.memoize.Cache`
		     * constructor with one whose instances implement the
		     * [`Map`](http://ecma-international.org/ecma-262/7.0/#sec-properties-of-the-map-prototype-object)
		     * method interface of `clear`, `delete`, `get`, `has`, and `set`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to have its output memoized.
		     * @param {Function} [resolver] The function to resolve the cache key.
		     * @returns {Function} Returns the new memoized function.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2 };
		     * var other = { 'c': 3, 'd': 4 };
		     *
		     * var values = _.memoize(_.values);
		     * values(object);
		     * // => [1, 2]
		     *
		     * values(other);
		     * // => [3, 4]
		     *
		     * object.a = 2;
		     * values(object);
		     * // => [1, 2]
		     *
		     * // Modify the result cache.
		     * values.cache.set(object, ['a', 'b']);
		     * values(object);
		     * // => ['a', 'b']
		     *
		     * // Replace `_.memoize.Cache`.
		     * _.memoize.Cache = WeakMap;
		     */
		    function memoize(func, resolver) {
		      if (typeof func != 'function' || (resolver != null && typeof resolver != 'function')) {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      var memoized = function() {
		        var args = arguments,
		            key = resolver ? resolver.apply(this, args) : args[0],
		            cache = memoized.cache;

		        if (cache.has(key)) {
		          return cache.get(key);
		        }
		        var result = func.apply(this, args);
		        memoized.cache = cache.set(key, result) || cache;
		        return result;
		      };
		      memoized.cache = new (memoize.Cache || MapCache);
		      return memoized;
		    }

		    // Expose `MapCache`.
		    memoize.Cache = MapCache;

		    /**
		     * Creates a function that negates the result of the predicate `func`. The
		     * `func` predicate is invoked with the `this` binding and arguments of the
		     * created function.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} predicate The predicate to negate.
		     * @returns {Function} Returns the new negated function.
		     * @example
		     *
		     * function isEven(n) {
		     *   return n % 2 == 0;
		     * }
		     *
		     * _.filter([1, 2, 3, 4, 5, 6], _.negate(isEven));
		     * // => [1, 3, 5]
		     */
		    function negate(predicate) {
		      if (typeof predicate != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      return function() {
		        var args = arguments;
		        switch (args.length) {
		          case 0: return !predicate.call(this);
		          case 1: return !predicate.call(this, args[0]);
		          case 2: return !predicate.call(this, args[0], args[1]);
		          case 3: return !predicate.call(this, args[0], args[1], args[2]);
		        }
		        return !predicate.apply(this, args);
		      };
		    }

		    /**
		     * Creates a function that is restricted to invoking `func` once. Repeat calls
		     * to the function return the value of the first invocation. The `func` is
		     * invoked with the `this` binding and arguments of the created function.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to restrict.
		     * @returns {Function} Returns the new restricted function.
		     * @example
		     *
		     * var initialize = _.once(createApplication);
		     * initialize();
		     * initialize();
		     * // => `createApplication` is invoked once
		     */
		    function once(func) {
		      return before(2, func);
		    }

		    /**
		     * Creates a function that invokes `func` with its arguments transformed.
		     *
		     * @static
		     * @since 4.0.0
		     * @memberOf _
		     * @category Function
		     * @param {Function} func The function to wrap.
		     * @param {...(Function|Function[])} [transforms=[_.identity]]
		     *  The argument transforms.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * function doubled(n) {
		     *   return n * 2;
		     * }
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var func = _.overArgs(function(x, y) {
		     *   return [x, y];
		     * }, [square, doubled]);
		     *
		     * func(9, 3);
		     * // => [81, 6]
		     *
		     * func(10, 5);
		     * // => [100, 10]
		     */
		    var overArgs = castRest(function(func, transforms) {
		      transforms = (transforms.length == 1 && isArray(transforms[0]))
		        ? arrayMap(transforms[0], baseUnary(getIteratee()))
		        : arrayMap(baseFlatten(transforms, 1), baseUnary(getIteratee()));

		      var funcsLength = transforms.length;
		      return baseRest(function(args) {
		        var index = -1,
		            length = nativeMin(args.length, funcsLength);

		        while (++index < length) {
		          args[index] = transforms[index].call(this, args[index]);
		        }
		        return apply(func, this, args);
		      });
		    });

		    /**
		     * Creates a function that invokes `func` with `partials` prepended to the
		     * arguments it receives. This method is like `_.bind` except it does **not**
		     * alter the `this` binding.
		     *
		     * The `_.partial.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for partially applied arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of partially
		     * applied functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.2.0
		     * @category Function
		     * @param {Function} func The function to partially apply arguments to.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new partially applied function.
		     * @example
		     *
		     * function greet(greeting, name) {
		     *   return greeting + ' ' + name;
		     * }
		     *
		     * var sayHelloTo = _.partial(greet, 'hello');
		     * sayHelloTo('fred');
		     * // => 'hello fred'
		     *
		     * // Partially applied with placeholders.
		     * var greetFred = _.partial(greet, _, 'fred');
		     * greetFred('hi');
		     * // => 'hi fred'
		     */
		    var partial = baseRest(function(func, partials) {
		      var holders = replaceHolders(partials, getHolder(partial));
		      return createWrap(func, WRAP_PARTIAL_FLAG, undefined$1, partials, holders);
		    });

		    /**
		     * This method is like `_.partial` except that partially applied arguments
		     * are appended to the arguments it receives.
		     *
		     * The `_.partialRight.placeholder` value, which defaults to `_` in monolithic
		     * builds, may be used as a placeholder for partially applied arguments.
		     *
		     * **Note:** This method doesn't set the "length" property of partially
		     * applied functions.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.0.0
		     * @category Function
		     * @param {Function} func The function to partially apply arguments to.
		     * @param {...*} [partials] The arguments to be partially applied.
		     * @returns {Function} Returns the new partially applied function.
		     * @example
		     *
		     * function greet(greeting, name) {
		     *   return greeting + ' ' + name;
		     * }
		     *
		     * var greetFred = _.partialRight(greet, 'fred');
		     * greetFred('hi');
		     * // => 'hi fred'
		     *
		     * // Partially applied with placeholders.
		     * var sayHelloTo = _.partialRight(greet, 'hello', _);
		     * sayHelloTo('fred');
		     * // => 'hello fred'
		     */
		    var partialRight = baseRest(function(func, partials) {
		      var holders = replaceHolders(partials, getHolder(partialRight));
		      return createWrap(func, WRAP_PARTIAL_RIGHT_FLAG, undefined$1, partials, holders);
		    });

		    /**
		     * Creates a function that invokes `func` with arguments arranged according
		     * to the specified `indexes` where the argument value at the first index is
		     * provided as the first argument, the argument value at the second index is
		     * provided as the second argument, and so on.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Function
		     * @param {Function} func The function to rearrange arguments for.
		     * @param {...(number|number[])} indexes The arranged argument indexes.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var rearged = _.rearg(function(a, b, c) {
		     *   return [a, b, c];
		     * }, [2, 0, 1]);
		     *
		     * rearged('b', 'c', 'a')
		     * // => ['a', 'b', 'c']
		     */
		    var rearg = flatRest(function(func, indexes) {
		      return createWrap(func, WRAP_REARG_FLAG, undefined$1, undefined$1, undefined$1, indexes);
		    });

		    /**
		     * Creates a function that invokes `func` with the `this` binding of the
		     * created function and arguments from `start` and beyond provided as
		     * an array.
		     *
		     * **Note:** This method is based on the
		     * [rest parameter](https://mdn.io/rest_parameters).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Function
		     * @param {Function} func The function to apply a rest parameter to.
		     * @param {number} [start=func.length-1] The start position of the rest parameter.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var say = _.rest(function(what, names) {
		     *   return what + ' ' + _.initial(names).join(', ') +
		     *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
		     * });
		     *
		     * say('hello', 'fred', 'barney', 'pebbles');
		     * // => 'hello fred, barney, & pebbles'
		     */
		    function rest(func, start) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      start = start === undefined$1 ? start : toInteger(start);
		      return baseRest(func, start);
		    }

		    /**
		     * Creates a function that invokes `func` with the `this` binding of the
		     * create function and an array of arguments much like
		     * [`Function#apply`](http://www.ecma-international.org/ecma-262/7.0/#sec-function.prototype.apply).
		     *
		     * **Note:** This method is based on the
		     * [spread operator](https://mdn.io/spread_operator).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.2.0
		     * @category Function
		     * @param {Function} func The function to spread arguments over.
		     * @param {number} [start=0] The start position of the spread.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var say = _.spread(function(who, what) {
		     *   return who + ' says ' + what;
		     * });
		     *
		     * say(['fred', 'hello']);
		     * // => 'fred says hello'
		     *
		     * var numbers = Promise.all([
		     *   Promise.resolve(40),
		     *   Promise.resolve(36)
		     * ]);
		     *
		     * numbers.then(_.spread(function(x, y) {
		     *   return x + y;
		     * }));
		     * // => a Promise of 76
		     */
		    function spread(func, start) {
		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      start = start == null ? 0 : nativeMax(toInteger(start), 0);
		      return baseRest(function(args) {
		        var array = args[start],
		            otherArgs = castSlice(args, 0, start);

		        if (array) {
		          arrayPush(otherArgs, array);
		        }
		        return apply(func, this, otherArgs);
		      });
		    }

		    /**
		     * Creates a throttled function that only invokes `func` at most once per
		     * every `wait` milliseconds. The throttled function comes with a `cancel`
		     * method to cancel delayed `func` invocations and a `flush` method to
		     * immediately invoke them. Provide `options` to indicate whether `func`
		     * should be invoked on the leading and/or trailing edge of the `wait`
		     * timeout. The `func` is invoked with the last arguments provided to the
		     * throttled function. Subsequent calls to the throttled function return the
		     * result of the last `func` invocation.
		     *
		     * **Note:** If `leading` and `trailing` options are `true`, `func` is
		     * invoked on the trailing edge of the timeout only if the throttled function
		     * is invoked more than once during the `wait` timeout.
		     *
		     * If `wait` is `0` and `leading` is `false`, `func` invocation is deferred
		     * until to the next tick, similar to `setTimeout` with a timeout of `0`.
		     *
		     * See [David Corbacho's article](https://css-tricks.com/debouncing-throttling-explained-examples/)
		     * for details over the differences between `_.throttle` and `_.debounce`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {Function} func The function to throttle.
		     * @param {number} [wait=0] The number of milliseconds to throttle invocations to.
		     * @param {Object} [options={}] The options object.
		     * @param {boolean} [options.leading=true]
		     *  Specify invoking on the leading edge of the timeout.
		     * @param {boolean} [options.trailing=true]
		     *  Specify invoking on the trailing edge of the timeout.
		     * @returns {Function} Returns the new throttled function.
		     * @example
		     *
		     * // Avoid excessively updating the position while scrolling.
		     * jQuery(window).on('scroll', _.throttle(updatePosition, 100));
		     *
		     * // Invoke `renewToken` when the click event is fired, but not more than once every 5 minutes.
		     * var throttled = _.throttle(renewToken, 300000, { 'trailing': false });
		     * jQuery(element).on('click', throttled);
		     *
		     * // Cancel the trailing throttled invocation.
		     * jQuery(window).on('popstate', throttled.cancel);
		     */
		    function throttle(func, wait, options) {
		      var leading = true,
		          trailing = true;

		      if (typeof func != 'function') {
		        throw new TypeError(FUNC_ERROR_TEXT);
		      }
		      if (isObject(options)) {
		        leading = 'leading' in options ? !!options.leading : leading;
		        trailing = 'trailing' in options ? !!options.trailing : trailing;
		      }
		      return debounce(func, wait, {
		        'leading': leading,
		        'maxWait': wait,
		        'trailing': trailing
		      });
		    }

		    /**
		     * Creates a function that accepts up to one argument, ignoring any
		     * additional arguments.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Function
		     * @param {Function} func The function to cap arguments for.
		     * @returns {Function} Returns the new capped function.
		     * @example
		     *
		     * _.map(['6', '8', '10'], _.unary(parseInt));
		     * // => [6, 8, 10]
		     */
		    function unary(func) {
		      return ary(func, 1);
		    }

		    /**
		     * Creates a function that provides `value` to `wrapper` as its first
		     * argument. Any additional arguments provided to the function are appended
		     * to those provided to the `wrapper`. The wrapper is invoked with the `this`
		     * binding of the created function.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Function
		     * @param {*} value The value to wrap.
		     * @param {Function} [wrapper=identity] The wrapper function.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var p = _.wrap(_.escape, function(func, text) {
		     *   return '<p>' + func(text) + '</p>';
		     * });
		     *
		     * p('fred, barney, & pebbles');
		     * // => '<p>fred, barney, &amp; pebbles</p>'
		     */
		    function wrap(value, wrapper) {
		      return partial(castFunction(wrapper), value);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Casts `value` as an array if it's not one.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.4.0
		     * @category Lang
		     * @param {*} value The value to inspect.
		     * @returns {Array} Returns the cast array.
		     * @example
		     *
		     * _.castArray(1);
		     * // => [1]
		     *
		     * _.castArray({ 'a': 1 });
		     * // => [{ 'a': 1 }]
		     *
		     * _.castArray('abc');
		     * // => ['abc']
		     *
		     * _.castArray(null);
		     * // => [null]
		     *
		     * _.castArray(undefined);
		     * // => [undefined]
		     *
		     * _.castArray();
		     * // => []
		     *
		     * var array = [1, 2, 3];
		     * console.log(_.castArray(array) === array);
		     * // => true
		     */
		    function castArray() {
		      if (!arguments.length) {
		        return [];
		      }
		      var value = arguments[0];
		      return isArray(value) ? value : [value];
		    }

		    /**
		     * Creates a shallow clone of `value`.
		     *
		     * **Note:** This method is loosely based on the
		     * [structured clone algorithm](https://mdn.io/Structured_clone_algorithm)
		     * and supports cloning arrays, array buffers, booleans, date objects, maps,
		     * numbers, `Object` objects, regexes, sets, strings, symbols, and typed
		     * arrays. The own enumerable properties of `arguments` objects are cloned
		     * as plain objects. An empty object is returned for uncloneable values such
		     * as error objects, functions, DOM nodes, and WeakMaps.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to clone.
		     * @returns {*} Returns the cloned value.
		     * @see _.cloneDeep
		     * @example
		     *
		     * var objects = [{ 'a': 1 }, { 'b': 2 }];
		     *
		     * var shallow = _.clone(objects);
		     * console.log(shallow[0] === objects[0]);
		     * // => true
		     */
		    function clone(value) {
		      return baseClone(value, CLONE_SYMBOLS_FLAG);
		    }

		    /**
		     * This method is like `_.clone` except that it accepts `customizer` which
		     * is invoked to produce the cloned value. If `customizer` returns `undefined`,
		     * cloning is handled by the method instead. The `customizer` is invoked with
		     * up to four arguments; (value [, index|key, object, stack]).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to clone.
		     * @param {Function} [customizer] The function to customize cloning.
		     * @returns {*} Returns the cloned value.
		     * @see _.cloneDeepWith
		     * @example
		     *
		     * function customizer(value) {
		     *   if (_.isElement(value)) {
		     *     return value.cloneNode(false);
		     *   }
		     * }
		     *
		     * var el = _.cloneWith(document.body, customizer);
		     *
		     * console.log(el === document.body);
		     * // => false
		     * console.log(el.nodeName);
		     * // => 'BODY'
		     * console.log(el.childNodes.length);
		     * // => 0
		     */
		    function cloneWith(value, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      return baseClone(value, CLONE_SYMBOLS_FLAG, customizer);
		    }

		    /**
		     * This method is like `_.clone` except that it recursively clones `value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.0.0
		     * @category Lang
		     * @param {*} value The value to recursively clone.
		     * @returns {*} Returns the deep cloned value.
		     * @see _.clone
		     * @example
		     *
		     * var objects = [{ 'a': 1 }, { 'b': 2 }];
		     *
		     * var deep = _.cloneDeep(objects);
		     * console.log(deep[0] === objects[0]);
		     * // => false
		     */
		    function cloneDeep(value) {
		      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG);
		    }

		    /**
		     * This method is like `_.cloneWith` except that it recursively clones `value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to recursively clone.
		     * @param {Function} [customizer] The function to customize cloning.
		     * @returns {*} Returns the deep cloned value.
		     * @see _.cloneWith
		     * @example
		     *
		     * function customizer(value) {
		     *   if (_.isElement(value)) {
		     *     return value.cloneNode(true);
		     *   }
		     * }
		     *
		     * var el = _.cloneDeepWith(document.body, customizer);
		     *
		     * console.log(el === document.body);
		     * // => false
		     * console.log(el.nodeName);
		     * // => 'BODY'
		     * console.log(el.childNodes.length);
		     * // => 20
		     */
		    function cloneDeepWith(value, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      return baseClone(value, CLONE_DEEP_FLAG | CLONE_SYMBOLS_FLAG, customizer);
		    }

		    /**
		     * Checks if `object` conforms to `source` by invoking the predicate
		     * properties of `source` with the corresponding property values of `object`.
		     *
		     * **Note:** This method is equivalent to `_.conforms` when `source` is
		     * partially applied.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.14.0
		     * @category Lang
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {boolean} Returns `true` if `object` conforms, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2 };
		     *
		     * _.conformsTo(object, { 'b': function(n) { return n > 1; } });
		     * // => true
		     *
		     * _.conformsTo(object, { 'b': function(n) { return n > 2; } });
		     * // => false
		     */
		    function conformsTo(object, source) {
		      return source == null || baseConformsTo(object, source, keys(source));
		    }

		    /**
		     * Performs a
		     * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
		     * comparison between two values to determine if they are equivalent.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1 };
		     * var other = { 'a': 1 };
		     *
		     * _.eq(object, object);
		     * // => true
		     *
		     * _.eq(object, other);
		     * // => false
		     *
		     * _.eq('a', 'a');
		     * // => true
		     *
		     * _.eq('a', Object('a'));
		     * // => false
		     *
		     * _.eq(NaN, NaN);
		     * // => true
		     */
		    function eq(value, other) {
		      return value === other || (value !== value && other !== other);
		    }

		    /**
		     * Checks if `value` is greater than `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is greater than `other`,
		     *  else `false`.
		     * @see _.lt
		     * @example
		     *
		     * _.gt(3, 1);
		     * // => true
		     *
		     * _.gt(3, 3);
		     * // => false
		     *
		     * _.gt(1, 3);
		     * // => false
		     */
		    var gt = createRelationalOperation(baseGt);

		    /**
		     * Checks if `value` is greater than or equal to `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is greater than or equal to
		     *  `other`, else `false`.
		     * @see _.lte
		     * @example
		     *
		     * _.gte(3, 1);
		     * // => true
		     *
		     * _.gte(3, 3);
		     * // => true
		     *
		     * _.gte(1, 3);
		     * // => false
		     */
		    var gte = createRelationalOperation(function(value, other) {
		      return value >= other;
		    });

		    /**
		     * Checks if `value` is likely an `arguments` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an `arguments` object,
		     *  else `false`.
		     * @example
		     *
		     * _.isArguments(function() { return arguments; }());
		     * // => true
		     *
		     * _.isArguments([1, 2, 3]);
		     * // => false
		     */
		    var isArguments = baseIsArguments(function() { return arguments; }()) ? baseIsArguments : function(value) {
		      return isObjectLike(value) && hasOwnProperty.call(value, 'callee') &&
		        !propertyIsEnumerable.call(value, 'callee');
		    };

		    /**
		     * Checks if `value` is classified as an `Array` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array, else `false`.
		     * @example
		     *
		     * _.isArray([1, 2, 3]);
		     * // => true
		     *
		     * _.isArray(document.body.children);
		     * // => false
		     *
		     * _.isArray('abc');
		     * // => false
		     *
		     * _.isArray(_.noop);
		     * // => false
		     */
		    var isArray = Array.isArray;

		    /**
		     * Checks if `value` is classified as an `ArrayBuffer` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array buffer, else `false`.
		     * @example
		     *
		     * _.isArrayBuffer(new ArrayBuffer(2));
		     * // => true
		     *
		     * _.isArrayBuffer(new Array(2));
		     * // => false
		     */
		    var isArrayBuffer = nodeIsArrayBuffer ? baseUnary(nodeIsArrayBuffer) : baseIsArrayBuffer;

		    /**
		     * Checks if `value` is array-like. A value is considered array-like if it's
		     * not a function and has a `value.length` that's an integer greater than or
		     * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
		     * @example
		     *
		     * _.isArrayLike([1, 2, 3]);
		     * // => true
		     *
		     * _.isArrayLike(document.body.children);
		     * // => true
		     *
		     * _.isArrayLike('abc');
		     * // => true
		     *
		     * _.isArrayLike(_.noop);
		     * // => false
		     */
		    function isArrayLike(value) {
		      return value != null && isLength(value.length) && !isFunction(value);
		    }

		    /**
		     * This method is like `_.isArrayLike` except that it also checks if `value`
		     * is an object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an array-like object,
		     *  else `false`.
		     * @example
		     *
		     * _.isArrayLikeObject([1, 2, 3]);
		     * // => true
		     *
		     * _.isArrayLikeObject(document.body.children);
		     * // => true
		     *
		     * _.isArrayLikeObject('abc');
		     * // => false
		     *
		     * _.isArrayLikeObject(_.noop);
		     * // => false
		     */
		    function isArrayLikeObject(value) {
		      return isObjectLike(value) && isArrayLike(value);
		    }

		    /**
		     * Checks if `value` is classified as a boolean primitive or object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a boolean, else `false`.
		     * @example
		     *
		     * _.isBoolean(false);
		     * // => true
		     *
		     * _.isBoolean(null);
		     * // => false
		     */
		    function isBoolean(value) {
		      return value === true || value === false ||
		        (isObjectLike(value) && baseGetTag(value) == boolTag);
		    }

		    /**
		     * Checks if `value` is a buffer.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a buffer, else `false`.
		     * @example
		     *
		     * _.isBuffer(new Buffer(2));
		     * // => true
		     *
		     * _.isBuffer(new Uint8Array(2));
		     * // => false
		     */
		    var isBuffer = nativeIsBuffer || stubFalse;

		    /**
		     * Checks if `value` is classified as a `Date` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a date object, else `false`.
		     * @example
		     *
		     * _.isDate(new Date);
		     * // => true
		     *
		     * _.isDate('Mon April 23 2012');
		     * // => false
		     */
		    var isDate = nodeIsDate ? baseUnary(nodeIsDate) : baseIsDate;

		    /**
		     * Checks if `value` is likely a DOM element.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a DOM element, else `false`.
		     * @example
		     *
		     * _.isElement(document.body);
		     * // => true
		     *
		     * _.isElement('<body>');
		     * // => false
		     */
		    function isElement(value) {
		      return isObjectLike(value) && value.nodeType === 1 && !isPlainObject(value);
		    }

		    /**
		     * Checks if `value` is an empty object, collection, map, or set.
		     *
		     * Objects are considered empty if they have no own enumerable string keyed
		     * properties.
		     *
		     * Array-like values such as `arguments` objects, arrays, buffers, strings, or
		     * jQuery-like collections are considered empty if they have a `length` of `0`.
		     * Similarly, maps and sets are considered empty if they have a `size` of `0`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is empty, else `false`.
		     * @example
		     *
		     * _.isEmpty(null);
		     * // => true
		     *
		     * _.isEmpty(true);
		     * // => true
		     *
		     * _.isEmpty(1);
		     * // => true
		     *
		     * _.isEmpty([1, 2, 3]);
		     * // => false
		     *
		     * _.isEmpty({ 'a': 1 });
		     * // => false
		     */
		    function isEmpty(value) {
		      if (value == null) {
		        return true;
		      }
		      if (isArrayLike(value) &&
		          (isArray(value) || typeof value == 'string' || typeof value.splice == 'function' ||
		            isBuffer(value) || isTypedArray(value) || isArguments(value))) {
		        return !value.length;
		      }
		      var tag = getTag(value);
		      if (tag == mapTag || tag == setTag) {
		        return !value.size;
		      }
		      if (isPrototype(value)) {
		        return !baseKeys(value).length;
		      }
		      for (var key in value) {
		        if (hasOwnProperty.call(value, key)) {
		          return false;
		        }
		      }
		      return true;
		    }

		    /**
		     * Performs a deep comparison between two values to determine if they are
		     * equivalent.
		     *
		     * **Note:** This method supports comparing arrays, array buffers, booleans,
		     * date objects, error objects, maps, numbers, `Object` objects, regexes,
		     * sets, strings, symbols, and typed arrays. `Object` objects are compared
		     * by their own, not inherited, enumerable properties. Functions and DOM
		     * nodes are compared by strict equality, i.e. `===`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1 };
		     * var other = { 'a': 1 };
		     *
		     * _.isEqual(object, other);
		     * // => true
		     *
		     * object === other;
		     * // => false
		     */
		    function isEqual(value, other) {
		      return baseIsEqual(value, other);
		    }

		    /**
		     * This method is like `_.isEqual` except that it accepts `customizer` which
		     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
		     * are handled by the method instead. The `customizer` is invoked with up to
		     * six arguments: (objValue, othValue [, index|key, object, other, stack]).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
		     * @example
		     *
		     * function isGreeting(value) {
		     *   return /^h(?:i|ello)$/.test(value);
		     * }
		     *
		     * function customizer(objValue, othValue) {
		     *   if (isGreeting(objValue) && isGreeting(othValue)) {
		     *     return true;
		     *   }
		     * }
		     *
		     * var array = ['hello', 'goodbye'];
		     * var other = ['hi', 'goodbye'];
		     *
		     * _.isEqualWith(array, other, customizer);
		     * // => true
		     */
		    function isEqualWith(value, other, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      var result = customizer ? customizer(value, other) : undefined$1;
		      return result === undefined$1 ? baseIsEqual(value, other, undefined$1, customizer) : !!result;
		    }

		    /**
		     * Checks if `value` is an `Error`, `EvalError`, `RangeError`, `ReferenceError`,
		     * `SyntaxError`, `TypeError`, or `URIError` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an error object, else `false`.
		     * @example
		     *
		     * _.isError(new Error);
		     * // => true
		     *
		     * _.isError(Error);
		     * // => false
		     */
		    function isError(value) {
		      if (!isObjectLike(value)) {
		        return false;
		      }
		      var tag = baseGetTag(value);
		      return tag == errorTag || tag == domExcTag ||
		        (typeof value.message == 'string' && typeof value.name == 'string' && !isPlainObject(value));
		    }

		    /**
		     * Checks if `value` is a finite primitive number.
		     *
		     * **Note:** This method is based on
		     * [`Number.isFinite`](https://mdn.io/Number/isFinite).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a finite number, else `false`.
		     * @example
		     *
		     * _.isFinite(3);
		     * // => true
		     *
		     * _.isFinite(Number.MIN_VALUE);
		     * // => true
		     *
		     * _.isFinite(Infinity);
		     * // => false
		     *
		     * _.isFinite('3');
		     * // => false
		     */
		    function isFinite(value) {
		      return typeof value == 'number' && nativeIsFinite(value);
		    }

		    /**
		     * Checks if `value` is classified as a `Function` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a function, else `false`.
		     * @example
		     *
		     * _.isFunction(_);
		     * // => true
		     *
		     * _.isFunction(/abc/);
		     * // => false
		     */
		    function isFunction(value) {
		      if (!isObject(value)) {
		        return false;
		      }
		      // The use of `Object#toString` avoids issues with the `typeof` operator
		      // in Safari 9 which returns 'object' for typed arrays and other constructors.
		      var tag = baseGetTag(value);
		      return tag == funcTag || tag == genTag || tag == asyncTag || tag == proxyTag;
		    }

		    /**
		     * Checks if `value` is an integer.
		     *
		     * **Note:** This method is based on
		     * [`Number.isInteger`](https://mdn.io/Number/isInteger).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an integer, else `false`.
		     * @example
		     *
		     * _.isInteger(3);
		     * // => true
		     *
		     * _.isInteger(Number.MIN_VALUE);
		     * // => false
		     *
		     * _.isInteger(Infinity);
		     * // => false
		     *
		     * _.isInteger('3');
		     * // => false
		     */
		    function isInteger(value) {
		      return typeof value == 'number' && value == toInteger(value);
		    }

		    /**
		     * Checks if `value` is a valid array-like length.
		     *
		     * **Note:** This method is loosely based on
		     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
		     * @example
		     *
		     * _.isLength(3);
		     * // => true
		     *
		     * _.isLength(Number.MIN_VALUE);
		     * // => false
		     *
		     * _.isLength(Infinity);
		     * // => false
		     *
		     * _.isLength('3');
		     * // => false
		     */
		    function isLength(value) {
		      return typeof value == 'number' &&
		        value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
		    }

		    /**
		     * Checks if `value` is the
		     * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
		     * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is an object, else `false`.
		     * @example
		     *
		     * _.isObject({});
		     * // => true
		     *
		     * _.isObject([1, 2, 3]);
		     * // => true
		     *
		     * _.isObject(_.noop);
		     * // => true
		     *
		     * _.isObject(null);
		     * // => false
		     */
		    function isObject(value) {
		      var type = typeof value;
		      return value != null && (type == 'object' || type == 'function');
		    }

		    /**
		     * Checks if `value` is object-like. A value is object-like if it's not `null`
		     * and has a `typeof` result of "object".
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
		     * @example
		     *
		     * _.isObjectLike({});
		     * // => true
		     *
		     * _.isObjectLike([1, 2, 3]);
		     * // => true
		     *
		     * _.isObjectLike(_.noop);
		     * // => false
		     *
		     * _.isObjectLike(null);
		     * // => false
		     */
		    function isObjectLike(value) {
		      return value != null && typeof value == 'object';
		    }

		    /**
		     * Checks if `value` is classified as a `Map` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a map, else `false`.
		     * @example
		     *
		     * _.isMap(new Map);
		     * // => true
		     *
		     * _.isMap(new WeakMap);
		     * // => false
		     */
		    var isMap = nodeIsMap ? baseUnary(nodeIsMap) : baseIsMap;

		    /**
		     * Performs a partial deep comparison between `object` and `source` to
		     * determine if `object` contains equivalent property values.
		     *
		     * **Note:** This method is equivalent to `_.matches` when `source` is
		     * partially applied.
		     *
		     * Partial comparisons will match empty array and empty object `source`
		     * values against any array or object value, respectively. See `_.isEqual`
		     * for a list of supported value comparisons.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property values to match.
		     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2 };
		     *
		     * _.isMatch(object, { 'b': 2 });
		     * // => true
		     *
		     * _.isMatch(object, { 'b': 1 });
		     * // => false
		     */
		    function isMatch(object, source) {
		      return object === source || baseIsMatch(object, source, getMatchData(source));
		    }

		    /**
		     * This method is like `_.isMatch` except that it accepts `customizer` which
		     * is invoked to compare values. If `customizer` returns `undefined`, comparisons
		     * are handled by the method instead. The `customizer` is invoked with five
		     * arguments: (objValue, srcValue, index|key, object, source).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {Object} object The object to inspect.
		     * @param {Object} source The object of property values to match.
		     * @param {Function} [customizer] The function to customize comparisons.
		     * @returns {boolean} Returns `true` if `object` is a match, else `false`.
		     * @example
		     *
		     * function isGreeting(value) {
		     *   return /^h(?:i|ello)$/.test(value);
		     * }
		     *
		     * function customizer(objValue, srcValue) {
		     *   if (isGreeting(objValue) && isGreeting(srcValue)) {
		     *     return true;
		     *   }
		     * }
		     *
		     * var object = { 'greeting': 'hello' };
		     * var source = { 'greeting': 'hi' };
		     *
		     * _.isMatchWith(object, source, customizer);
		     * // => true
		     */
		    function isMatchWith(object, source, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      return baseIsMatch(object, source, getMatchData(source), customizer);
		    }

		    /**
		     * Checks if `value` is `NaN`.
		     *
		     * **Note:** This method is based on
		     * [`Number.isNaN`](https://mdn.io/Number/isNaN) and is not the same as
		     * global [`isNaN`](https://mdn.io/isNaN) which returns `true` for
		     * `undefined` and other non-number values.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is `NaN`, else `false`.
		     * @example
		     *
		     * _.isNaN(NaN);
		     * // => true
		     *
		     * _.isNaN(new Number(NaN));
		     * // => true
		     *
		     * isNaN(undefined);
		     * // => true
		     *
		     * _.isNaN(undefined);
		     * // => false
		     */
		    function isNaN(value) {
		      // An `NaN` primitive is the only value that is not equal to itself.
		      // Perform the `toStringTag` check first to avoid errors with some
		      // ActiveX objects in IE.
		      return isNumber(value) && value != +value;
		    }

		    /**
		     * Checks if `value` is a pristine native function.
		     *
		     * **Note:** This method can't reliably detect native functions in the presence
		     * of the core-js package because core-js circumvents this kind of detection.
		     * Despite multiple requests, the core-js maintainer has made it clear: any
		     * attempt to fix the detection will be obstructed. As a result, we're left
		     * with little choice but to throw an error. Unfortunately, this also affects
		     * packages, like [babel-polyfill](https://www.npmjs.com/package/babel-polyfill),
		     * which rely on core-js.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a native function,
		     *  else `false`.
		     * @example
		     *
		     * _.isNative(Array.prototype.push);
		     * // => true
		     *
		     * _.isNative(_);
		     * // => false
		     */
		    function isNative(value) {
		      if (isMaskable(value)) {
		        throw new Error(CORE_ERROR_TEXT);
		      }
		      return baseIsNative(value);
		    }

		    /**
		     * Checks if `value` is `null`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is `null`, else `false`.
		     * @example
		     *
		     * _.isNull(null);
		     * // => true
		     *
		     * _.isNull(void 0);
		     * // => false
		     */
		    function isNull(value) {
		      return value === null;
		    }

		    /**
		     * Checks if `value` is `null` or `undefined`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is nullish, else `false`.
		     * @example
		     *
		     * _.isNil(null);
		     * // => true
		     *
		     * _.isNil(void 0);
		     * // => true
		     *
		     * _.isNil(NaN);
		     * // => false
		     */
		    function isNil(value) {
		      return value == null;
		    }

		    /**
		     * Checks if `value` is classified as a `Number` primitive or object.
		     *
		     * **Note:** To exclude `Infinity`, `-Infinity`, and `NaN`, which are
		     * classified as numbers, use the `_.isFinite` method.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a number, else `false`.
		     * @example
		     *
		     * _.isNumber(3);
		     * // => true
		     *
		     * _.isNumber(Number.MIN_VALUE);
		     * // => true
		     *
		     * _.isNumber(Infinity);
		     * // => true
		     *
		     * _.isNumber('3');
		     * // => false
		     */
		    function isNumber(value) {
		      return typeof value == 'number' ||
		        (isObjectLike(value) && baseGetTag(value) == numberTag);
		    }

		    /**
		     * Checks if `value` is a plain object, that is, an object created by the
		     * `Object` constructor or one with a `[[Prototype]]` of `null`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.8.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     * }
		     *
		     * _.isPlainObject(new Foo);
		     * // => false
		     *
		     * _.isPlainObject([1, 2, 3]);
		     * // => false
		     *
		     * _.isPlainObject({ 'x': 0, 'y': 0 });
		     * // => true
		     *
		     * _.isPlainObject(Object.create(null));
		     * // => true
		     */
		    function isPlainObject(value) {
		      if (!isObjectLike(value) || baseGetTag(value) != objectTag) {
		        return false;
		      }
		      var proto = getPrototype(value);
		      if (proto === null) {
		        return true;
		      }
		      var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
		      return typeof Ctor == 'function' && Ctor instanceof Ctor &&
		        funcToString.call(Ctor) == objectCtorString;
		    }

		    /**
		     * Checks if `value` is classified as a `RegExp` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.1.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a regexp, else `false`.
		     * @example
		     *
		     * _.isRegExp(/abc/);
		     * // => true
		     *
		     * _.isRegExp('/abc/');
		     * // => false
		     */
		    var isRegExp = nodeIsRegExp ? baseUnary(nodeIsRegExp) : baseIsRegExp;

		    /**
		     * Checks if `value` is a safe integer. An integer is safe if it's an IEEE-754
		     * double precision number which isn't the result of a rounded unsafe integer.
		     *
		     * **Note:** This method is based on
		     * [`Number.isSafeInteger`](https://mdn.io/Number/isSafeInteger).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a safe integer, else `false`.
		     * @example
		     *
		     * _.isSafeInteger(3);
		     * // => true
		     *
		     * _.isSafeInteger(Number.MIN_VALUE);
		     * // => false
		     *
		     * _.isSafeInteger(Infinity);
		     * // => false
		     *
		     * _.isSafeInteger('3');
		     * // => false
		     */
		    function isSafeInteger(value) {
		      return isInteger(value) && value >= -MAX_SAFE_INTEGER && value <= MAX_SAFE_INTEGER;
		    }

		    /**
		     * Checks if `value` is classified as a `Set` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a set, else `false`.
		     * @example
		     *
		     * _.isSet(new Set);
		     * // => true
		     *
		     * _.isSet(new WeakSet);
		     * // => false
		     */
		    var isSet = nodeIsSet ? baseUnary(nodeIsSet) : baseIsSet;

		    /**
		     * Checks if `value` is classified as a `String` primitive or object.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a string, else `false`.
		     * @example
		     *
		     * _.isString('abc');
		     * // => true
		     *
		     * _.isString(1);
		     * // => false
		     */
		    function isString(value) {
		      return typeof value == 'string' ||
		        (!isArray(value) && isObjectLike(value) && baseGetTag(value) == stringTag);
		    }

		    /**
		     * Checks if `value` is classified as a `Symbol` primitive or object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a symbol, else `false`.
		     * @example
		     *
		     * _.isSymbol(Symbol.iterator);
		     * // => true
		     *
		     * _.isSymbol('abc');
		     * // => false
		     */
		    function isSymbol(value) {
		      return typeof value == 'symbol' ||
		        (isObjectLike(value) && baseGetTag(value) == symbolTag);
		    }

		    /**
		     * Checks if `value` is classified as a typed array.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a typed array, else `false`.
		     * @example
		     *
		     * _.isTypedArray(new Uint8Array);
		     * // => true
		     *
		     * _.isTypedArray([]);
		     * // => false
		     */
		    var isTypedArray = nodeIsTypedArray ? baseUnary(nodeIsTypedArray) : baseIsTypedArray;

		    /**
		     * Checks if `value` is `undefined`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is `undefined`, else `false`.
		     * @example
		     *
		     * _.isUndefined(void 0);
		     * // => true
		     *
		     * _.isUndefined(null);
		     * // => false
		     */
		    function isUndefined(value) {
		      return value === undefined$1;
		    }

		    /**
		     * Checks if `value` is classified as a `WeakMap` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a weak map, else `false`.
		     * @example
		     *
		     * _.isWeakMap(new WeakMap);
		     * // => true
		     *
		     * _.isWeakMap(new Map);
		     * // => false
		     */
		    function isWeakMap(value) {
		      return isObjectLike(value) && getTag(value) == weakMapTag;
		    }

		    /**
		     * Checks if `value` is classified as a `WeakSet` object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.3.0
		     * @category Lang
		     * @param {*} value The value to check.
		     * @returns {boolean} Returns `true` if `value` is a weak set, else `false`.
		     * @example
		     *
		     * _.isWeakSet(new WeakSet);
		     * // => true
		     *
		     * _.isWeakSet(new Set);
		     * // => false
		     */
		    function isWeakSet(value) {
		      return isObjectLike(value) && baseGetTag(value) == weakSetTag;
		    }

		    /**
		     * Checks if `value` is less than `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is less than `other`,
		     *  else `false`.
		     * @see _.gt
		     * @example
		     *
		     * _.lt(1, 3);
		     * // => true
		     *
		     * _.lt(3, 3);
		     * // => false
		     *
		     * _.lt(3, 1);
		     * // => false
		     */
		    var lt = createRelationalOperation(baseLt);

		    /**
		     * Checks if `value` is less than or equal to `other`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.9.0
		     * @category Lang
		     * @param {*} value The value to compare.
		     * @param {*} other The other value to compare.
		     * @returns {boolean} Returns `true` if `value` is less than or equal to
		     *  `other`, else `false`.
		     * @see _.gte
		     * @example
		     *
		     * _.lte(1, 3);
		     * // => true
		     *
		     * _.lte(3, 3);
		     * // => true
		     *
		     * _.lte(3, 1);
		     * // => false
		     */
		    var lte = createRelationalOperation(function(value, other) {
		      return value <= other;
		    });

		    /**
		     * Converts `value` to an array.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {Array} Returns the converted array.
		     * @example
		     *
		     * _.toArray({ 'a': 1, 'b': 2 });
		     * // => [1, 2]
		     *
		     * _.toArray('abc');
		     * // => ['a', 'b', 'c']
		     *
		     * _.toArray(1);
		     * // => []
		     *
		     * _.toArray(null);
		     * // => []
		     */
		    function toArray(value) {
		      if (!value) {
		        return [];
		      }
		      if (isArrayLike(value)) {
		        return isString(value) ? stringToArray(value) : copyArray(value);
		      }
		      if (symIterator && value[symIterator]) {
		        return iteratorToArray(value[symIterator]());
		      }
		      var tag = getTag(value),
		          func = tag == mapTag ? mapToArray : (tag == setTag ? setToArray : values);

		      return func(value);
		    }

		    /**
		     * Converts `value` to a finite number.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.12.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted number.
		     * @example
		     *
		     * _.toFinite(3.2);
		     * // => 3.2
		     *
		     * _.toFinite(Number.MIN_VALUE);
		     * // => 5e-324
		     *
		     * _.toFinite(Infinity);
		     * // => 1.7976931348623157e+308
		     *
		     * _.toFinite('3.2');
		     * // => 3.2
		     */
		    function toFinite(value) {
		      if (!value) {
		        return value === 0 ? value : 0;
		      }
		      value = toNumber(value);
		      if (value === INFINITY || value === -INFINITY) {
		        var sign = (value < 0 ? -1 : 1);
		        return sign * MAX_INTEGER;
		      }
		      return value === value ? value : 0;
		    }

		    /**
		     * Converts `value` to an integer.
		     *
		     * **Note:** This method is loosely based on
		     * [`ToInteger`](http://www.ecma-international.org/ecma-262/7.0/#sec-tointeger).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.toInteger(3.2);
		     * // => 3
		     *
		     * _.toInteger(Number.MIN_VALUE);
		     * // => 0
		     *
		     * _.toInteger(Infinity);
		     * // => 1.7976931348623157e+308
		     *
		     * _.toInteger('3.2');
		     * // => 3
		     */
		    function toInteger(value) {
		      var result = toFinite(value),
		          remainder = result % 1;

		      return result === result ? (remainder ? result - remainder : result) : 0;
		    }

		    /**
		     * Converts `value` to an integer suitable for use as the length of an
		     * array-like object.
		     *
		     * **Note:** This method is based on
		     * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.toLength(3.2);
		     * // => 3
		     *
		     * _.toLength(Number.MIN_VALUE);
		     * // => 0
		     *
		     * _.toLength(Infinity);
		     * // => 4294967295
		     *
		     * _.toLength('3.2');
		     * // => 3
		     */
		    function toLength(value) {
		      return value ? baseClamp(toInteger(value), 0, MAX_ARRAY_LENGTH) : 0;
		    }

		    /**
		     * Converts `value` to a number.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to process.
		     * @returns {number} Returns the number.
		     * @example
		     *
		     * _.toNumber(3.2);
		     * // => 3.2
		     *
		     * _.toNumber(Number.MIN_VALUE);
		     * // => 5e-324
		     *
		     * _.toNumber(Infinity);
		     * // => Infinity
		     *
		     * _.toNumber('3.2');
		     * // => 3.2
		     */
		    function toNumber(value) {
		      if (typeof value == 'number') {
		        return value;
		      }
		      if (isSymbol(value)) {
		        return NAN;
		      }
		      if (isObject(value)) {
		        var other = typeof value.valueOf == 'function' ? value.valueOf() : value;
		        value = isObject(other) ? (other + '') : other;
		      }
		      if (typeof value != 'string') {
		        return value === 0 ? value : +value;
		      }
		      value = baseTrim(value);
		      var isBinary = reIsBinary.test(value);
		      return (isBinary || reIsOctal.test(value))
		        ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
		        : (reIsBadHex.test(value) ? NAN : +value);
		    }

		    /**
		     * Converts `value` to a plain object flattening inherited enumerable string
		     * keyed properties of `value` to own properties of the plain object.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {Object} Returns the converted plain object.
		     * @example
		     *
		     * function Foo() {
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.assign({ 'a': 1 }, new Foo);
		     * // => { 'a': 1, 'b': 2 }
		     *
		     * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
		     * // => { 'a': 1, 'b': 2, 'c': 3 }
		     */
		    function toPlainObject(value) {
		      return copyObject(value, keysIn(value));
		    }

		    /**
		     * Converts `value` to a safe integer. A safe integer can be compared and
		     * represented correctly.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.toSafeInteger(3.2);
		     * // => 3
		     *
		     * _.toSafeInteger(Number.MIN_VALUE);
		     * // => 0
		     *
		     * _.toSafeInteger(Infinity);
		     * // => 9007199254740991
		     *
		     * _.toSafeInteger('3.2');
		     * // => 3
		     */
		    function toSafeInteger(value) {
		      return value
		        ? baseClamp(toInteger(value), -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER)
		        : (value === 0 ? value : 0);
		    }

		    /**
		     * Converts `value` to a string. An empty string is returned for `null`
		     * and `undefined` values. The sign of `-0` is preserved.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Lang
		     * @param {*} value The value to convert.
		     * @returns {string} Returns the converted string.
		     * @example
		     *
		     * _.toString(null);
		     * // => ''
		     *
		     * _.toString(-0);
		     * // => '-0'
		     *
		     * _.toString([1, 2, 3]);
		     * // => '1,2,3'
		     */
		    function toString(value) {
		      return value == null ? '' : baseToString(value);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Assigns own enumerable string keyed properties of source objects to the
		     * destination object. Source objects are applied from left to right.
		     * Subsequent sources overwrite property assignments of previous sources.
		     *
		     * **Note:** This method mutates `object` and is loosely based on
		     * [`Object.assign`](https://mdn.io/Object/assign).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.10.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.assignIn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     * }
		     *
		     * function Bar() {
		     *   this.c = 3;
		     * }
		     *
		     * Foo.prototype.b = 2;
		     * Bar.prototype.d = 4;
		     *
		     * _.assign({ 'a': 0 }, new Foo, new Bar);
		     * // => { 'a': 1, 'c': 3 }
		     */
		    var assign = createAssigner(function(object, source) {
		      if (isPrototype(source) || isArrayLike(source)) {
		        copyObject(source, keys(source), object);
		        return;
		      }
		      for (var key in source) {
		        if (hasOwnProperty.call(source, key)) {
		          assignValue(object, key, source[key]);
		        }
		      }
		    });

		    /**
		     * This method is like `_.assign` except that it iterates over own and
		     * inherited source properties.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias extend
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.assign
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     * }
		     *
		     * function Bar() {
		     *   this.c = 3;
		     * }
		     *
		     * Foo.prototype.b = 2;
		     * Bar.prototype.d = 4;
		     *
		     * _.assignIn({ 'a': 0 }, new Foo, new Bar);
		     * // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
		     */
		    var assignIn = createAssigner(function(object, source) {
		      copyObject(source, keysIn(source), object);
		    });

		    /**
		     * This method is like `_.assignIn` except that it accepts `customizer`
		     * which is invoked to produce the assigned values. If `customizer` returns
		     * `undefined`, assignment is handled by the method instead. The `customizer`
		     * is invoked with five arguments: (objValue, srcValue, key, object, source).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias extendWith
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} sources The source objects.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @see _.assignWith
		     * @example
		     *
		     * function customizer(objValue, srcValue) {
		     *   return _.isUndefined(objValue) ? srcValue : objValue;
		     * }
		     *
		     * var defaults = _.partialRight(_.assignInWith, customizer);
		     *
		     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
		     * // => { 'a': 1, 'b': 2 }
		     */
		    var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
		      copyObject(source, keysIn(source), object, customizer);
		    });

		    /**
		     * This method is like `_.assign` except that it accepts `customizer`
		     * which is invoked to produce the assigned values. If `customizer` returns
		     * `undefined`, assignment is handled by the method instead. The `customizer`
		     * is invoked with five arguments: (objValue, srcValue, key, object, source).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} sources The source objects.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @see _.assignInWith
		     * @example
		     *
		     * function customizer(objValue, srcValue) {
		     *   return _.isUndefined(objValue) ? srcValue : objValue;
		     * }
		     *
		     * var defaults = _.partialRight(_.assignWith, customizer);
		     *
		     * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
		     * // => { 'a': 1, 'b': 2 }
		     */
		    var assignWith = createAssigner(function(object, source, srcIndex, customizer) {
		      copyObject(source, keys(source), object, customizer);
		    });

		    /**
		     * Creates an array of values corresponding to `paths` of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.0.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {...(string|string[])} [paths] The property paths to pick.
		     * @returns {Array} Returns the picked values.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }, 4] };
		     *
		     * _.at(object, ['a[0].b.c', 'a[1]']);
		     * // => [3, 4]
		     */
		    var at = flatRest(baseAt);

		    /**
		     * Creates an object that inherits from the `prototype` object. If a
		     * `properties` object is given, its own enumerable string keyed properties
		     * are assigned to the created object.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.3.0
		     * @category Object
		     * @param {Object} prototype The object to inherit from.
		     * @param {Object} [properties] The properties to assign to the object.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * function Shape() {
		     *   this.x = 0;
		     *   this.y = 0;
		     * }
		     *
		     * function Circle() {
		     *   Shape.call(this);
		     * }
		     *
		     * Circle.prototype = _.create(Shape.prototype, {
		     *   'constructor': Circle
		     * });
		     *
		     * var circle = new Circle;
		     * circle instanceof Circle;
		     * // => true
		     *
		     * circle instanceof Shape;
		     * // => true
		     */
		    function create(prototype, properties) {
		      var result = baseCreate(prototype);
		      return properties == null ? result : baseAssign(result, properties);
		    }

		    /**
		     * Assigns own and inherited enumerable string keyed properties of source
		     * objects to the destination object for all destination properties that
		     * resolve to `undefined`. Source objects are applied from left to right.
		     * Once a property is set, additional values of the same property are ignored.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.defaultsDeep
		     * @example
		     *
		     * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
		     * // => { 'a': 1, 'b': 2 }
		     */
		    var defaults = baseRest(function(object, sources) {
		      object = Object(object);

		      var index = -1;
		      var length = sources.length;
		      var guard = length > 2 ? sources[2] : undefined$1;

		      if (guard && isIterateeCall(sources[0], sources[1], guard)) {
		        length = 1;
		      }

		      while (++index < length) {
		        var source = sources[index];
		        var props = keysIn(source);
		        var propsIndex = -1;
		        var propsLength = props.length;

		        while (++propsIndex < propsLength) {
		          var key = props[propsIndex];
		          var value = object[key];

		          if (value === undefined$1 ||
		              (eq(value, objectProto[key]) && !hasOwnProperty.call(object, key))) {
		            object[key] = source[key];
		          }
		        }
		      }

		      return object;
		    });

		    /**
		     * This method is like `_.defaults` except that it recursively assigns
		     * default properties.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @see _.defaults
		     * @example
		     *
		     * _.defaultsDeep({ 'a': { 'b': 2 } }, { 'a': { 'b': 1, 'c': 3 } });
		     * // => { 'a': { 'b': 2, 'c': 3 } }
		     */
		    var defaultsDeep = baseRest(function(args) {
		      args.push(undefined$1, customDefaultsMerge);
		      return apply(mergeWith, undefined$1, args);
		    });

		    /**
		     * This method is like `_.find` except that it returns the key of the first
		     * element `predicate` returns truthy for instead of the element itself.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.1.0
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {string|undefined} Returns the key of the matched element,
		     *  else `undefined`.
		     * @example
		     *
		     * var users = {
		     *   'barney':  { 'age': 36, 'active': true },
		     *   'fred':    { 'age': 40, 'active': false },
		     *   'pebbles': { 'age': 1,  'active': true }
		     * };
		     *
		     * _.findKey(users, function(o) { return o.age < 40; });
		     * // => 'barney' (iteration order is not guaranteed)
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findKey(users, { 'age': 1, 'active': true });
		     * // => 'pebbles'
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findKey(users, ['active', false]);
		     * // => 'fred'
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findKey(users, 'active');
		     * // => 'barney'
		     */
		    function findKey(object, predicate) {
		      return baseFindKey(object, getIteratee(predicate, 3), baseForOwn);
		    }

		    /**
		     * This method is like `_.findKey` except that it iterates over elements of
		     * a collection in the opposite order.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @param {Function} [predicate=_.identity] The function invoked per iteration.
		     * @returns {string|undefined} Returns the key of the matched element,
		     *  else `undefined`.
		     * @example
		     *
		     * var users = {
		     *   'barney':  { 'age': 36, 'active': true },
		     *   'fred':    { 'age': 40, 'active': false },
		     *   'pebbles': { 'age': 1,  'active': true }
		     * };
		     *
		     * _.findLastKey(users, function(o) { return o.age < 40; });
		     * // => returns 'pebbles' assuming `_.findKey` returns 'barney'
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.findLastKey(users, { 'age': 36, 'active': true });
		     * // => 'barney'
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.findLastKey(users, ['active', false]);
		     * // => 'fred'
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.findLastKey(users, 'active');
		     * // => 'pebbles'
		     */
		    function findLastKey(object, predicate) {
		      return baseFindKey(object, getIteratee(predicate, 3), baseForOwnRight);
		    }

		    /**
		     * Iterates over own and inherited enumerable string keyed properties of an
		     * object and invokes `iteratee` for each property. The iteratee is invoked
		     * with three arguments: (value, key, object). Iteratee functions may exit
		     * iteration early by explicitly returning `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.3.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forInRight
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forIn(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'a', 'b', then 'c' (iteration order is not guaranteed).
		     */
		    function forIn(object, iteratee) {
		      return object == null
		        ? object
		        : baseFor(object, getIteratee(iteratee, 3), keysIn);
		    }

		    /**
		     * This method is like `_.forIn` except that it iterates over properties of
		     * `object` in the opposite order.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forIn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forInRight(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'c', 'b', then 'a' assuming `_.forIn` logs 'a', 'b', then 'c'.
		     */
		    function forInRight(object, iteratee) {
		      return object == null
		        ? object
		        : baseForRight(object, getIteratee(iteratee, 3), keysIn);
		    }

		    /**
		     * Iterates over own enumerable string keyed properties of an object and
		     * invokes `iteratee` for each property. The iteratee is invoked with three
		     * arguments: (value, key, object). Iteratee functions may exit iteration
		     * early by explicitly returning `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.3.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forOwnRight
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forOwn(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'a' then 'b' (iteration order is not guaranteed).
		     */
		    function forOwn(object, iteratee) {
		      return object && baseForOwn(object, getIteratee(iteratee, 3));
		    }

		    /**
		     * This method is like `_.forOwn` except that it iterates over properties of
		     * `object` in the opposite order.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.0.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns `object`.
		     * @see _.forOwn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.forOwnRight(new Foo, function(value, key) {
		     *   console.log(key);
		     * });
		     * // => Logs 'b' then 'a' assuming `_.forOwn` logs 'a' then 'b'.
		     */
		    function forOwnRight(object, iteratee) {
		      return object && baseForOwnRight(object, getIteratee(iteratee, 3));
		    }

		    /**
		     * Creates an array of function property names from own enumerable properties
		     * of `object`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @returns {Array} Returns the function names.
		     * @see _.functionsIn
		     * @example
		     *
		     * function Foo() {
		     *   this.a = _.constant('a');
		     *   this.b = _.constant('b');
		     * }
		     *
		     * Foo.prototype.c = _.constant('c');
		     *
		     * _.functions(new Foo);
		     * // => ['a', 'b']
		     */
		    function functions(object) {
		      return object == null ? [] : baseFunctions(object, keys(object));
		    }

		    /**
		     * Creates an array of function property names from own and inherited
		     * enumerable properties of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to inspect.
		     * @returns {Array} Returns the function names.
		     * @see _.functions
		     * @example
		     *
		     * function Foo() {
		     *   this.a = _.constant('a');
		     *   this.b = _.constant('b');
		     * }
		     *
		     * Foo.prototype.c = _.constant('c');
		     *
		     * _.functionsIn(new Foo);
		     * // => ['a', 'b', 'c']
		     */
		    function functionsIn(object) {
		      return object == null ? [] : baseFunctions(object, keysIn(object));
		    }

		    /**
		     * Gets the value at `path` of `object`. If the resolved value is
		     * `undefined`, the `defaultValue` is returned in its place.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the property to get.
		     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
		     * @returns {*} Returns the resolved value.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
		     *
		     * _.get(object, 'a[0].b.c');
		     * // => 3
		     *
		     * _.get(object, ['a', '0', 'b', 'c']);
		     * // => 3
		     *
		     * _.get(object, 'a.b.c', 'default');
		     * // => 'default'
		     */
		    function get(object, path, defaultValue) {
		      var result = object == null ? undefined$1 : baseGet(object, path);
		      return result === undefined$1 ? defaultValue : result;
		    }

		    /**
		     * Checks if `path` is a direct property of `object`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path to check.
		     * @returns {boolean} Returns `true` if `path` exists, else `false`.
		     * @example
		     *
		     * var object = { 'a': { 'b': 2 } };
		     * var other = _.create({ 'a': _.create({ 'b': 2 }) });
		     *
		     * _.has(object, 'a');
		     * // => true
		     *
		     * _.has(object, 'a.b');
		     * // => true
		     *
		     * _.has(object, ['a', 'b']);
		     * // => true
		     *
		     * _.has(other, 'a');
		     * // => false
		     */
		    function has(object, path) {
		      return object != null && hasPath(object, path, baseHas);
		    }

		    /**
		     * Checks if `path` is a direct or inherited property of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path to check.
		     * @returns {boolean} Returns `true` if `path` exists, else `false`.
		     * @example
		     *
		     * var object = _.create({ 'a': _.create({ 'b': 2 }) });
		     *
		     * _.hasIn(object, 'a');
		     * // => true
		     *
		     * _.hasIn(object, 'a.b');
		     * // => true
		     *
		     * _.hasIn(object, ['a', 'b']);
		     * // => true
		     *
		     * _.hasIn(object, 'b');
		     * // => false
		     */
		    function hasIn(object, path) {
		      return object != null && hasPath(object, path, baseHasIn);
		    }

		    /**
		     * Creates an object composed of the inverted keys and values of `object`.
		     * If `object` contains duplicate values, subsequent values overwrite
		     * property assignments of previous values.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.7.0
		     * @category Object
		     * @param {Object} object The object to invert.
		     * @returns {Object} Returns the new inverted object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2, 'c': 1 };
		     *
		     * _.invert(object);
		     * // => { '1': 'c', '2': 'b' }
		     */
		    var invert = createInverter(function(result, value, key) {
		      if (value != null &&
		          typeof value.toString != 'function') {
		        value = nativeObjectToString.call(value);
		      }

		      result[value] = key;
		    }, constant(identity));

		    /**
		     * This method is like `_.invert` except that the inverted object is generated
		     * from the results of running each element of `object` thru `iteratee`. The
		     * corresponding inverted value of each inverted key is an array of keys
		     * responsible for generating the inverted value. The iteratee is invoked
		     * with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.1.0
		     * @category Object
		     * @param {Object} object The object to invert.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {Object} Returns the new inverted object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': 2, 'c': 1 };
		     *
		     * _.invertBy(object);
		     * // => { '1': ['a', 'c'], '2': ['b'] }
		     *
		     * _.invertBy(object, function(value) {
		     *   return 'group' + value;
		     * });
		     * // => { 'group1': ['a', 'c'], 'group2': ['b'] }
		     */
		    var invertBy = createInverter(function(result, value, key) {
		      if (value != null &&
		          typeof value.toString != 'function') {
		        value = nativeObjectToString.call(value);
		      }

		      if (hasOwnProperty.call(result, value)) {
		        result[value].push(key);
		      } else {
		        result[value] = [key];
		      }
		    }, getIteratee);

		    /**
		     * Invokes the method at `path` of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the method to invoke.
		     * @param {...*} [args] The arguments to invoke the method with.
		     * @returns {*} Returns the result of the invoked method.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': [1, 2, 3, 4] } }] };
		     *
		     * _.invoke(object, 'a[0].b.c.slice', 1, 3);
		     * // => [2, 3]
		     */
		    var invoke = baseRest(baseInvoke);

		    /**
		     * Creates an array of the own enumerable property names of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects. See the
		     * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
		     * for more details.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.keys(new Foo);
		     * // => ['a', 'b'] (iteration order is not guaranteed)
		     *
		     * _.keys('hi');
		     * // => ['0', '1']
		     */
		    function keys(object) {
		      return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
		    }

		    /**
		     * Creates an array of the own and inherited enumerable property names of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property names.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.keysIn(new Foo);
		     * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
		     */
		    function keysIn(object) {
		      return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
		    }

		    /**
		     * The opposite of `_.mapValues`; this method creates an object with the
		     * same values as `object` and keys generated by running each own enumerable
		     * string keyed property of `object` thru `iteratee`. The iteratee is invoked
		     * with three arguments: (value, key, object).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.8.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns the new mapped object.
		     * @see _.mapValues
		     * @example
		     *
		     * _.mapKeys({ 'a': 1, 'b': 2 }, function(value, key) {
		     *   return key + value;
		     * });
		     * // => { 'a1': 1, 'b2': 2 }
		     */
		    function mapKeys(object, iteratee) {
		      var result = {};
		      iteratee = getIteratee(iteratee, 3);

		      baseForOwn(object, function(value, key, object) {
		        baseAssignValue(result, iteratee(value, key, object), value);
		      });
		      return result;
		    }

		    /**
		     * Creates an object with the same keys as `object` and values generated
		     * by running each own enumerable string keyed property of `object` thru
		     * `iteratee`. The iteratee is invoked with three arguments:
		     * (value, key, object).
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Object} Returns the new mapped object.
		     * @see _.mapKeys
		     * @example
		     *
		     * var users = {
		     *   'fred':    { 'user': 'fred',    'age': 40 },
		     *   'pebbles': { 'user': 'pebbles', 'age': 1 }
		     * };
		     *
		     * _.mapValues(users, function(o) { return o.age; });
		     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.mapValues(users, 'age');
		     * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
		     */
		    function mapValues(object, iteratee) {
		      var result = {};
		      iteratee = getIteratee(iteratee, 3);

		      baseForOwn(object, function(value, key, object) {
		        baseAssignValue(result, key, iteratee(value, key, object));
		      });
		      return result;
		    }

		    /**
		     * This method is like `_.assign` except that it recursively merges own and
		     * inherited enumerable string keyed properties of source objects into the
		     * destination object. Source properties that resolve to `undefined` are
		     * skipped if a destination value exists. Array and plain object properties
		     * are merged recursively. Other objects and value types are overridden by
		     * assignment. Source objects are applied from left to right. Subsequent
		     * sources overwrite property assignments of previous sources.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.5.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} [sources] The source objects.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = {
		     *   'a': [{ 'b': 2 }, { 'd': 4 }]
		     * };
		     *
		     * var other = {
		     *   'a': [{ 'c': 3 }, { 'e': 5 }]
		     * };
		     *
		     * _.merge(object, other);
		     * // => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }
		     */
		    var merge = createAssigner(function(object, source, srcIndex) {
		      baseMerge(object, source, srcIndex);
		    });

		    /**
		     * This method is like `_.merge` except that it accepts `customizer` which
		     * is invoked to produce the merged values of the destination and source
		     * properties. If `customizer` returns `undefined`, merging is handled by the
		     * method instead. The `customizer` is invoked with six arguments:
		     * (objValue, srcValue, key, object, source, stack).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The destination object.
		     * @param {...Object} sources The source objects.
		     * @param {Function} customizer The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * function customizer(objValue, srcValue) {
		     *   if (_.isArray(objValue)) {
		     *     return objValue.concat(srcValue);
		     *   }
		     * }
		     *
		     * var object = { 'a': [1], 'b': [2] };
		     * var other = { 'a': [3], 'b': [4] };
		     *
		     * _.mergeWith(object, other, customizer);
		     * // => { 'a': [1, 3], 'b': [2, 4] }
		     */
		    var mergeWith = createAssigner(function(object, source, srcIndex, customizer) {
		      baseMerge(object, source, srcIndex, customizer);
		    });

		    /**
		     * The opposite of `_.pick`; this method creates an object composed of the
		     * own and inherited enumerable property paths of `object` that are not omitted.
		     *
		     * **Note:** This method is considerably slower than `_.pick`.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {...(string|string[])} [paths] The property paths to omit.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.omit(object, ['a', 'c']);
		     * // => { 'b': '2' }
		     */
		    var omit = flatRest(function(object, paths) {
		      var result = {};
		      if (object == null) {
		        return result;
		      }
		      var isDeep = false;
		      paths = arrayMap(paths, function(path) {
		        path = castPath(path, object);
		        isDeep || (isDeep = path.length > 1);
		        return path;
		      });
		      copyObject(object, getAllKeysIn(object), result);
		      if (isDeep) {
		        result = baseClone(result, CLONE_DEEP_FLAG | CLONE_FLAT_FLAG | CLONE_SYMBOLS_FLAG, customOmitClone);
		      }
		      var length = paths.length;
		      while (length--) {
		        baseUnset(result, paths[length]);
		      }
		      return result;
		    });

		    /**
		     * The opposite of `_.pickBy`; this method creates an object composed of
		     * the own and inherited enumerable string keyed properties of `object` that
		     * `predicate` doesn't return truthy for. The predicate is invoked with two
		     * arguments: (value, key).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {Function} [predicate=_.identity] The function invoked per property.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.omitBy(object, _.isNumber);
		     * // => { 'b': '2' }
		     */
		    function omitBy(object, predicate) {
		      return pickBy(object, negate(getIteratee(predicate)));
		    }

		    /**
		     * Creates an object composed of the picked `object` properties.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {...(string|string[])} [paths] The property paths to pick.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.pick(object, ['a', 'c']);
		     * // => { 'a': 1, 'c': 3 }
		     */
		    var pick = flatRest(function(object, paths) {
		      return object == null ? {} : basePick(object, paths);
		    });

		    /**
		     * Creates an object composed of the `object` properties `predicate` returns
		     * truthy for. The predicate is invoked with two arguments: (value, key).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The source object.
		     * @param {Function} [predicate=_.identity] The function invoked per property.
		     * @returns {Object} Returns the new object.
		     * @example
		     *
		     * var object = { 'a': 1, 'b': '2', 'c': 3 };
		     *
		     * _.pickBy(object, _.isNumber);
		     * // => { 'a': 1, 'c': 3 }
		     */
		    function pickBy(object, predicate) {
		      if (object == null) {
		        return {};
		      }
		      var props = arrayMap(getAllKeysIn(object), function(prop) {
		        return [prop];
		      });
		      predicate = getIteratee(predicate);
		      return basePickBy(object, props, function(value, path) {
		        return predicate(value, path[0]);
		      });
		    }

		    /**
		     * This method is like `_.get` except that if the resolved value is a
		     * function it's invoked with the `this` binding of its parent object and
		     * its result is returned.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @param {Array|string} path The path of the property to resolve.
		     * @param {*} [defaultValue] The value returned for `undefined` resolved values.
		     * @returns {*} Returns the resolved value.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
		     *
		     * _.result(object, 'a[0].b.c1');
		     * // => 3
		     *
		     * _.result(object, 'a[0].b.c2');
		     * // => 4
		     *
		     * _.result(object, 'a[0].b.c3', 'default');
		     * // => 'default'
		     *
		     * _.result(object, 'a[0].b.c3', _.constant('default'));
		     * // => 'default'
		     */
		    function result(object, path, defaultValue) {
		      path = castPath(path, object);

		      var index = -1,
		          length = path.length;

		      // Ensure the loop is entered when path is empty.
		      if (!length) {
		        length = 1;
		        object = undefined$1;
		      }
		      while (++index < length) {
		        var value = object == null ? undefined$1 : object[toKey(path[index])];
		        if (value === undefined$1) {
		          index = length;
		          value = defaultValue;
		        }
		        object = isFunction(value) ? value.call(object) : value;
		      }
		      return object;
		    }

		    /**
		     * Sets the value at `path` of `object`. If a portion of `path` doesn't exist,
		     * it's created. Arrays are created for missing index properties while objects
		     * are created for all other missing properties. Use `_.setWith` to customize
		     * `path` creation.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {*} value The value to set.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
		     *
		     * _.set(object, 'a[0].b.c', 4);
		     * console.log(object.a[0].b.c);
		     * // => 4
		     *
		     * _.set(object, ['x', '0', 'y', 'z'], 5);
		     * console.log(object.x[0].y.z);
		     * // => 5
		     */
		    function set(object, path, value) {
		      return object == null ? object : baseSet(object, path, value);
		    }

		    /**
		     * This method is like `_.set` except that it accepts `customizer` which is
		     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
		     * path creation is handled by the method instead. The `customizer` is invoked
		     * with three arguments: (nsValue, key, nsObject).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {*} value The value to set.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = {};
		     *
		     * _.setWith(object, '[0][1]', 'a', Object);
		     * // => { '0': { '1': 'a' } }
		     */
		    function setWith(object, path, value, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      return object == null ? object : baseSet(object, path, value, customizer);
		    }

		    /**
		     * Creates an array of own enumerable string keyed-value pairs for `object`
		     * which can be consumed by `_.fromPairs`. If `object` is a map or set, its
		     * entries are returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias entries
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the key-value pairs.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.toPairs(new Foo);
		     * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
		     */
		    var toPairs = createToPairs(keys);

		    /**
		     * Creates an array of own and inherited enumerable string keyed-value pairs
		     * for `object` which can be consumed by `_.fromPairs`. If `object` is a map
		     * or set, its entries are returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @alias entriesIn
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the key-value pairs.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.toPairsIn(new Foo);
		     * // => [['a', 1], ['b', 2], ['c', 3]] (iteration order is not guaranteed)
		     */
		    var toPairsIn = createToPairs(keysIn);

		    /**
		     * An alternative to `_.reduce`; this method transforms `object` to a new
		     * `accumulator` object which is the result of running each of its own
		     * enumerable string keyed properties thru `iteratee`, with each invocation
		     * potentially mutating the `accumulator` object. If `accumulator` is not
		     * provided, a new object with the same `[[Prototype]]` will be used. The
		     * iteratee is invoked with four arguments: (accumulator, value, key, object).
		     * Iteratee functions may exit iteration early by explicitly returning `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.3.0
		     * @category Object
		     * @param {Object} object The object to iterate over.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @param {*} [accumulator] The custom accumulator value.
		     * @returns {*} Returns the accumulated value.
		     * @example
		     *
		     * _.transform([2, 3, 4], function(result, n) {
		     *   result.push(n *= n);
		     *   return n % 2 == 0;
		     * }, []);
		     * // => [4, 9]
		     *
		     * _.transform({ 'a': 1, 'b': 2, 'c': 1 }, function(result, value, key) {
		     *   (result[value] || (result[value] = [])).push(key);
		     * }, {});
		     * // => { '1': ['a', 'c'], '2': ['b'] }
		     */
		    function transform(object, iteratee, accumulator) {
		      var isArr = isArray(object),
		          isArrLike = isArr || isBuffer(object) || isTypedArray(object);

		      iteratee = getIteratee(iteratee, 4);
		      if (accumulator == null) {
		        var Ctor = object && object.constructor;
		        if (isArrLike) {
		          accumulator = isArr ? new Ctor : [];
		        }
		        else if (isObject(object)) {
		          accumulator = isFunction(Ctor) ? baseCreate(getPrototype(object)) : {};
		        }
		        else {
		          accumulator = {};
		        }
		      }
		      (isArrLike ? arrayEach : baseForOwn)(object, function(value, index, object) {
		        return iteratee(accumulator, value, index, object);
		      });
		      return accumulator;
		    }

		    /**
		     * Removes the property at `path` of `object`.
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to unset.
		     * @returns {boolean} Returns `true` if the property is deleted, else `false`.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 7 } }] };
		     * _.unset(object, 'a[0].b.c');
		     * // => true
		     *
		     * console.log(object);
		     * // => { 'a': [{ 'b': {} }] };
		     *
		     * _.unset(object, ['a', '0', 'b', 'c']);
		     * // => true
		     *
		     * console.log(object);
		     * // => { 'a': [{ 'b': {} }] };
		     */
		    function unset(object, path) {
		      return object == null ? true : baseUnset(object, path);
		    }

		    /**
		     * This method is like `_.set` except that accepts `updater` to produce the
		     * value to set. Use `_.updateWith` to customize `path` creation. The `updater`
		     * is invoked with one argument: (value).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.6.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {Function} updater The function to produce the updated value.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = { 'a': [{ 'b': { 'c': 3 } }] };
		     *
		     * _.update(object, 'a[0].b.c', function(n) { return n * n; });
		     * console.log(object.a[0].b.c);
		     * // => 9
		     *
		     * _.update(object, 'x[0].y.z', function(n) { return n ? n + 1 : 0; });
		     * console.log(object.x[0].y.z);
		     * // => 0
		     */
		    function update(object, path, updater) {
		      return object == null ? object : baseUpdate(object, path, castFunction(updater));
		    }

		    /**
		     * This method is like `_.update` except that it accepts `customizer` which is
		     * invoked to produce the objects of `path`.  If `customizer` returns `undefined`
		     * path creation is handled by the method instead. The `customizer` is invoked
		     * with three arguments: (nsValue, key, nsObject).
		     *
		     * **Note:** This method mutates `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.6.0
		     * @category Object
		     * @param {Object} object The object to modify.
		     * @param {Array|string} path The path of the property to set.
		     * @param {Function} updater The function to produce the updated value.
		     * @param {Function} [customizer] The function to customize assigned values.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var object = {};
		     *
		     * _.updateWith(object, '[0][1]', _.constant('a'), Object);
		     * // => { '0': { '1': 'a' } }
		     */
		    function updateWith(object, path, updater, customizer) {
		      customizer = typeof customizer == 'function' ? customizer : undefined$1;
		      return object == null ? object : baseUpdate(object, path, castFunction(updater), customizer);
		    }

		    /**
		     * Creates an array of the own enumerable string keyed property values of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property values.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.values(new Foo);
		     * // => [1, 2] (iteration order is not guaranteed)
		     *
		     * _.values('hi');
		     * // => ['h', 'i']
		     */
		    function values(object) {
		      return object == null ? [] : baseValues(object, keys(object));
		    }

		    /**
		     * Creates an array of the own and inherited enumerable string keyed property
		     * values of `object`.
		     *
		     * **Note:** Non-object values are coerced to objects.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Object
		     * @param {Object} object The object to query.
		     * @returns {Array} Returns the array of property values.
		     * @example
		     *
		     * function Foo() {
		     *   this.a = 1;
		     *   this.b = 2;
		     * }
		     *
		     * Foo.prototype.c = 3;
		     *
		     * _.valuesIn(new Foo);
		     * // => [1, 2, 3] (iteration order is not guaranteed)
		     */
		    function valuesIn(object) {
		      return object == null ? [] : baseValues(object, keysIn(object));
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Clamps `number` within the inclusive `lower` and `upper` bounds.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Number
		     * @param {number} number The number to clamp.
		     * @param {number} [lower] The lower bound.
		     * @param {number} upper The upper bound.
		     * @returns {number} Returns the clamped number.
		     * @example
		     *
		     * _.clamp(-10, -5, 5);
		     * // => -5
		     *
		     * _.clamp(10, -5, 5);
		     * // => 5
		     */
		    function clamp(number, lower, upper) {
		      if (upper === undefined$1) {
		        upper = lower;
		        lower = undefined$1;
		      }
		      if (upper !== undefined$1) {
		        upper = toNumber(upper);
		        upper = upper === upper ? upper : 0;
		      }
		      if (lower !== undefined$1) {
		        lower = toNumber(lower);
		        lower = lower === lower ? lower : 0;
		      }
		      return baseClamp(toNumber(number), lower, upper);
		    }

		    /**
		     * Checks if `n` is between `start` and up to, but not including, `end`. If
		     * `end` is not specified, it's set to `start` with `start` then set to `0`.
		     * If `start` is greater than `end` the params are swapped to support
		     * negative ranges.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.3.0
		     * @category Number
		     * @param {number} number The number to check.
		     * @param {number} [start=0] The start of the range.
		     * @param {number} end The end of the range.
		     * @returns {boolean} Returns `true` if `number` is in the range, else `false`.
		     * @see _.range, _.rangeRight
		     * @example
		     *
		     * _.inRange(3, 2, 4);
		     * // => true
		     *
		     * _.inRange(4, 8);
		     * // => true
		     *
		     * _.inRange(4, 2);
		     * // => false
		     *
		     * _.inRange(2, 2);
		     * // => false
		     *
		     * _.inRange(1.2, 2);
		     * // => true
		     *
		     * _.inRange(5.2, 4);
		     * // => false
		     *
		     * _.inRange(-3, -2, -6);
		     * // => true
		     */
		    function inRange(number, start, end) {
		      start = toFinite(start);
		      if (end === undefined$1) {
		        end = start;
		        start = 0;
		      } else {
		        end = toFinite(end);
		      }
		      number = toNumber(number);
		      return baseInRange(number, start, end);
		    }

		    /**
		     * Produces a random number between the inclusive `lower` and `upper` bounds.
		     * If only one argument is provided a number between `0` and the given number
		     * is returned. If `floating` is `true`, or either `lower` or `upper` are
		     * floats, a floating-point number is returned instead of an integer.
		     *
		     * **Note:** JavaScript follows the IEEE-754 standard for resolving
		     * floating-point values which can produce unexpected results.
		     *
		     * @static
		     * @memberOf _
		     * @since 0.7.0
		     * @category Number
		     * @param {number} [lower=0] The lower bound.
		     * @param {number} [upper=1] The upper bound.
		     * @param {boolean} [floating] Specify returning a floating-point number.
		     * @returns {number} Returns the random number.
		     * @example
		     *
		     * _.random(0, 5);
		     * // => an integer between 0 and 5
		     *
		     * _.random(5);
		     * // => also an integer between 0 and 5
		     *
		     * _.random(5, true);
		     * // => a floating-point number between 0 and 5
		     *
		     * _.random(1.2, 5.2);
		     * // => a floating-point number between 1.2 and 5.2
		     */
		    function random(lower, upper, floating) {
		      if (floating && typeof floating != 'boolean' && isIterateeCall(lower, upper, floating)) {
		        upper = floating = undefined$1;
		      }
		      if (floating === undefined$1) {
		        if (typeof upper == 'boolean') {
		          floating = upper;
		          upper = undefined$1;
		        }
		        else if (typeof lower == 'boolean') {
		          floating = lower;
		          lower = undefined$1;
		        }
		      }
		      if (lower === undefined$1 && upper === undefined$1) {
		        lower = 0;
		        upper = 1;
		      }
		      else {
		        lower = toFinite(lower);
		        if (upper === undefined$1) {
		          upper = lower;
		          lower = 0;
		        } else {
		          upper = toFinite(upper);
		        }
		      }
		      if (lower > upper) {
		        var temp = lower;
		        lower = upper;
		        upper = temp;
		      }
		      if (floating || lower % 1 || upper % 1) {
		        var rand = nativeRandom();
		        return nativeMin(lower + (rand * (upper - lower + freeParseFloat('1e-' + ((rand + '').length - 1)))), upper);
		      }
		      return baseRandom(lower, upper);
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Converts `string` to [camel case](https://en.wikipedia.org/wiki/CamelCase).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the camel cased string.
		     * @example
		     *
		     * _.camelCase('Foo Bar');
		     * // => 'fooBar'
		     *
		     * _.camelCase('--foo-bar--');
		     * // => 'fooBar'
		     *
		     * _.camelCase('__FOO_BAR__');
		     * // => 'fooBar'
		     */
		    var camelCase = createCompounder(function(result, word, index) {
		      word = word.toLowerCase();
		      return result + (index ? capitalize(word) : word);
		    });

		    /**
		     * Converts the first character of `string` to upper case and the remaining
		     * to lower case.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to capitalize.
		     * @returns {string} Returns the capitalized string.
		     * @example
		     *
		     * _.capitalize('FRED');
		     * // => 'Fred'
		     */
		    function capitalize(string) {
		      return upperFirst(toString(string).toLowerCase());
		    }

		    /**
		     * Deburrs `string` by converting
		     * [Latin-1 Supplement](https://en.wikipedia.org/wiki/Latin-1_Supplement_(Unicode_block)#Character_table)
		     * and [Latin Extended-A](https://en.wikipedia.org/wiki/Latin_Extended-A)
		     * letters to basic Latin letters and removing
		     * [combining diacritical marks](https://en.wikipedia.org/wiki/Combining_Diacritical_Marks).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to deburr.
		     * @returns {string} Returns the deburred string.
		     * @example
		     *
		     * _.deburr('déjà vu');
		     * // => 'deja vu'
		     */
		    function deburr(string) {
		      string = toString(string);
		      return string && string.replace(reLatin, deburrLetter).replace(reComboMark, '');
		    }

		    /**
		     * Checks if `string` ends with the given target string.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to inspect.
		     * @param {string} [target] The string to search for.
		     * @param {number} [position=string.length] The position to search up to.
		     * @returns {boolean} Returns `true` if `string` ends with `target`,
		     *  else `false`.
		     * @example
		     *
		     * _.endsWith('abc', 'c');
		     * // => true
		     *
		     * _.endsWith('abc', 'b');
		     * // => false
		     *
		     * _.endsWith('abc', 'b', 2);
		     * // => true
		     */
		    function endsWith(string, target, position) {
		      string = toString(string);
		      target = baseToString(target);

		      var length = string.length;
		      position = position === undefined$1
		        ? length
		        : baseClamp(toInteger(position), 0, length);

		      var end = position;
		      position -= target.length;
		      return position >= 0 && string.slice(position, end) == target;
		    }

		    /**
		     * Converts the characters "&", "<", ">", '"', and "'" in `string` to their
		     * corresponding HTML entities.
		     *
		     * **Note:** No other characters are escaped. To escape additional
		     * characters use a third-party library like [_he_](https://mths.be/he).
		     *
		     * Though the ">" character is escaped for symmetry, characters like
		     * ">" and "/" don't need escaping in HTML and have no special meaning
		     * unless they're part of a tag or unquoted attribute value. See
		     * [Mathias Bynens's article](https://mathiasbynens.be/notes/ambiguous-ampersands)
		     * (under "semi-related fun fact") for more details.
		     *
		     * When working with HTML you should always
		     * [quote attribute values](http://wonko.com/post/html-escaping) to reduce
		     * XSS vectors.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category String
		     * @param {string} [string=''] The string to escape.
		     * @returns {string} Returns the escaped string.
		     * @example
		     *
		     * _.escape('fred, barney, & pebbles');
		     * // => 'fred, barney, &amp; pebbles'
		     */
		    function escape(string) {
		      string = toString(string);
		      return (string && reHasUnescapedHtml.test(string))
		        ? string.replace(reUnescapedHtml, escapeHtmlChar)
		        : string;
		    }

		    /**
		     * Escapes the `RegExp` special characters "^", "$", "\", ".", "*", "+",
		     * "?", "(", ")", "[", "]", "{", "}", and "|" in `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to escape.
		     * @returns {string} Returns the escaped string.
		     * @example
		     *
		     * _.escapeRegExp('[lodash](https://lodash.com/)');
		     * // => '\[lodash\]\(https://lodash\.com/\)'
		     */
		    function escapeRegExp(string) {
		      string = toString(string);
		      return (string && reHasRegExpChar.test(string))
		        ? string.replace(reRegExpChar, '\\$&')
		        : string;
		    }

		    /**
		     * Converts `string` to
		     * [kebab case](https://en.wikipedia.org/wiki/Letter_case#Special_case_styles).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the kebab cased string.
		     * @example
		     *
		     * _.kebabCase('Foo Bar');
		     * // => 'foo-bar'
		     *
		     * _.kebabCase('fooBar');
		     * // => 'foo-bar'
		     *
		     * _.kebabCase('__FOO_BAR__');
		     * // => 'foo-bar'
		     */
		    var kebabCase = createCompounder(function(result, word, index) {
		      return result + (index ? '-' : '') + word.toLowerCase();
		    });

		    /**
		     * Converts `string`, as space separated words, to lower case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the lower cased string.
		     * @example
		     *
		     * _.lowerCase('--Foo-Bar--');
		     * // => 'foo bar'
		     *
		     * _.lowerCase('fooBar');
		     * // => 'foo bar'
		     *
		     * _.lowerCase('__FOO_BAR__');
		     * // => 'foo bar'
		     */
		    var lowerCase = createCompounder(function(result, word, index) {
		      return result + (index ? ' ' : '') + word.toLowerCase();
		    });

		    /**
		     * Converts the first character of `string` to lower case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the converted string.
		     * @example
		     *
		     * _.lowerFirst('Fred');
		     * // => 'fred'
		     *
		     * _.lowerFirst('FRED');
		     * // => 'fRED'
		     */
		    var lowerFirst = createCaseFirst('toLowerCase');

		    /**
		     * Pads `string` on the left and right sides if it's shorter than `length`.
		     * Padding characters are truncated if they can't be evenly divided by `length`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to pad.
		     * @param {number} [length=0] The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padded string.
		     * @example
		     *
		     * _.pad('abc', 8);
		     * // => '  abc   '
		     *
		     * _.pad('abc', 8, '_-');
		     * // => '_-abc_-_'
		     *
		     * _.pad('abc', 3);
		     * // => 'abc'
		     */
		    function pad(string, length, chars) {
		      string = toString(string);
		      length = toInteger(length);

		      var strLength = length ? stringSize(string) : 0;
		      if (!length || strLength >= length) {
		        return string;
		      }
		      var mid = (length - strLength) / 2;
		      return (
		        createPadding(nativeFloor(mid), chars) +
		        string +
		        createPadding(nativeCeil(mid), chars)
		      );
		    }

		    /**
		     * Pads `string` on the right side if it's shorter than `length`. Padding
		     * characters are truncated if they exceed `length`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to pad.
		     * @param {number} [length=0] The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padded string.
		     * @example
		     *
		     * _.padEnd('abc', 6);
		     * // => 'abc   '
		     *
		     * _.padEnd('abc', 6, '_-');
		     * // => 'abc_-_'
		     *
		     * _.padEnd('abc', 3);
		     * // => 'abc'
		     */
		    function padEnd(string, length, chars) {
		      string = toString(string);
		      length = toInteger(length);

		      var strLength = length ? stringSize(string) : 0;
		      return (length && strLength < length)
		        ? (string + createPadding(length - strLength, chars))
		        : string;
		    }

		    /**
		     * Pads `string` on the left side if it's shorter than `length`. Padding
		     * characters are truncated if they exceed `length`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to pad.
		     * @param {number} [length=0] The padding length.
		     * @param {string} [chars=' '] The string used as padding.
		     * @returns {string} Returns the padded string.
		     * @example
		     *
		     * _.padStart('abc', 6);
		     * // => '   abc'
		     *
		     * _.padStart('abc', 6, '_-');
		     * // => '_-_abc'
		     *
		     * _.padStart('abc', 3);
		     * // => 'abc'
		     */
		    function padStart(string, length, chars) {
		      string = toString(string);
		      length = toInteger(length);

		      var strLength = length ? stringSize(string) : 0;
		      return (length && strLength < length)
		        ? (createPadding(length - strLength, chars) + string)
		        : string;
		    }

		    /**
		     * Converts `string` to an integer of the specified radix. If `radix` is
		     * `undefined` or `0`, a `radix` of `10` is used unless `value` is a
		     * hexadecimal, in which case a `radix` of `16` is used.
		     *
		     * **Note:** This method aligns with the
		     * [ES5 implementation](https://es5.github.io/#x15.1.2.2) of `parseInt`.
		     *
		     * @static
		     * @memberOf _
		     * @since 1.1.0
		     * @category String
		     * @param {string} string The string to convert.
		     * @param {number} [radix=10] The radix to interpret `value` by.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {number} Returns the converted integer.
		     * @example
		     *
		     * _.parseInt('08');
		     * // => 8
		     *
		     * _.map(['6', '08', '10'], _.parseInt);
		     * // => [6, 8, 10]
		     */
		    function parseInt(string, radix, guard) {
		      if (guard || radix == null) {
		        radix = 0;
		      } else if (radix) {
		        radix = +radix;
		      }
		      return nativeParseInt(toString(string).replace(reTrimStart, ''), radix || 0);
		    }

		    /**
		     * Repeats the given string `n` times.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to repeat.
		     * @param {number} [n=1] The number of times to repeat the string.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the repeated string.
		     * @example
		     *
		     * _.repeat('*', 3);
		     * // => '***'
		     *
		     * _.repeat('abc', 2);
		     * // => 'abcabc'
		     *
		     * _.repeat('abc', 0);
		     * // => ''
		     */
		    function repeat(string, n, guard) {
		      if ((guard ? isIterateeCall(string, n, guard) : n === undefined$1)) {
		        n = 1;
		      } else {
		        n = toInteger(n);
		      }
		      return baseRepeat(toString(string), n);
		    }

		    /**
		     * Replaces matches for `pattern` in `string` with `replacement`.
		     *
		     * **Note:** This method is based on
		     * [`String#replace`](https://mdn.io/String/replace).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to modify.
		     * @param {RegExp|string} pattern The pattern to replace.
		     * @param {Function|string} replacement The match replacement.
		     * @returns {string} Returns the modified string.
		     * @example
		     *
		     * _.replace('Hi Fred', 'Fred', 'Barney');
		     * // => 'Hi Barney'
		     */
		    function replace() {
		      var args = arguments,
		          string = toString(args[0]);

		      return args.length < 3 ? string : string.replace(args[1], args[2]);
		    }

		    /**
		     * Converts `string` to
		     * [snake case](https://en.wikipedia.org/wiki/Snake_case).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the snake cased string.
		     * @example
		     *
		     * _.snakeCase('Foo Bar');
		     * // => 'foo_bar'
		     *
		     * _.snakeCase('fooBar');
		     * // => 'foo_bar'
		     *
		     * _.snakeCase('--FOO-BAR--');
		     * // => 'foo_bar'
		     */
		    var snakeCase = createCompounder(function(result, word, index) {
		      return result + (index ? '_' : '') + word.toLowerCase();
		    });

		    /**
		     * Splits `string` by `separator`.
		     *
		     * **Note:** This method is based on
		     * [`String#split`](https://mdn.io/String/split).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to split.
		     * @param {RegExp|string} separator The separator pattern to split by.
		     * @param {number} [limit] The length to truncate results to.
		     * @returns {Array} Returns the string segments.
		     * @example
		     *
		     * _.split('a-b-c', '-', 2);
		     * // => ['a', 'b']
		     */
		    function split(string, separator, limit) {
		      if (limit && typeof limit != 'number' && isIterateeCall(string, separator, limit)) {
		        separator = limit = undefined$1;
		      }
		      limit = limit === undefined$1 ? MAX_ARRAY_LENGTH : limit >>> 0;
		      if (!limit) {
		        return [];
		      }
		      string = toString(string);
		      if (string && (
		            typeof separator == 'string' ||
		            (separator != null && !isRegExp(separator))
		          )) {
		        separator = baseToString(separator);
		        if (!separator && hasUnicode(string)) {
		          return castSlice(stringToArray(string), 0, limit);
		        }
		      }
		      return string.split(separator, limit);
		    }

		    /**
		     * Converts `string` to
		     * [start case](https://en.wikipedia.org/wiki/Letter_case#Stylistic_or_specialised_usage).
		     *
		     * @static
		     * @memberOf _
		     * @since 3.1.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the start cased string.
		     * @example
		     *
		     * _.startCase('--foo-bar--');
		     * // => 'Foo Bar'
		     *
		     * _.startCase('fooBar');
		     * // => 'Foo Bar'
		     *
		     * _.startCase('__FOO_BAR__');
		     * // => 'FOO BAR'
		     */
		    var startCase = createCompounder(function(result, word, index) {
		      return result + (index ? ' ' : '') + upperFirst(word);
		    });

		    /**
		     * Checks if `string` starts with the given target string.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to inspect.
		     * @param {string} [target] The string to search for.
		     * @param {number} [position=0] The position to search from.
		     * @returns {boolean} Returns `true` if `string` starts with `target`,
		     *  else `false`.
		     * @example
		     *
		     * _.startsWith('abc', 'a');
		     * // => true
		     *
		     * _.startsWith('abc', 'b');
		     * // => false
		     *
		     * _.startsWith('abc', 'b', 1);
		     * // => true
		     */
		    function startsWith(string, target, position) {
		      string = toString(string);
		      position = position == null
		        ? 0
		        : baseClamp(toInteger(position), 0, string.length);

		      target = baseToString(target);
		      return string.slice(position, position + target.length) == target;
		    }

		    /**
		     * Creates a compiled template function that can interpolate data properties
		     * in "interpolate" delimiters, HTML-escape interpolated data properties in
		     * "escape" delimiters, and execute JavaScript in "evaluate" delimiters. Data
		     * properties may be accessed as free variables in the template. If a setting
		     * object is given, it takes precedence over `_.templateSettings` values.
		     *
		     * **Note:** In the development build `_.template` utilizes
		     * [sourceURLs](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/#toc-sourceurl)
		     * for easier debugging.
		     *
		     * For more information on precompiling templates see
		     * [lodash's custom builds documentation](https://lodash.com/custom-builds).
		     *
		     * For more information on Chrome extension sandboxes see
		     * [Chrome's extensions documentation](https://developer.chrome.com/extensions/sandboxingEval).
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category String
		     * @param {string} [string=''] The template string.
		     * @param {Object} [options={}] The options object.
		     * @param {RegExp} [options.escape=_.templateSettings.escape]
		     *  The HTML "escape" delimiter.
		     * @param {RegExp} [options.evaluate=_.templateSettings.evaluate]
		     *  The "evaluate" delimiter.
		     * @param {Object} [options.imports=_.templateSettings.imports]
		     *  An object to import into the template as free variables.
		     * @param {RegExp} [options.interpolate=_.templateSettings.interpolate]
		     *  The "interpolate" delimiter.
		     * @param {string} [options.sourceURL='lodash.templateSources[n]']
		     *  The sourceURL of the compiled template.
		     * @param {string} [options.variable='obj']
		     *  The data object variable name.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Function} Returns the compiled template function.
		     * @example
		     *
		     * // Use the "interpolate" delimiter to create a compiled template.
		     * var compiled = _.template('hello <%= user %>!');
		     * compiled({ 'user': 'fred' });
		     * // => 'hello fred!'
		     *
		     * // Use the HTML "escape" delimiter to escape data property values.
		     * var compiled = _.template('<b><%- value %></b>');
		     * compiled({ 'value': '<script>' });
		     * // => '<b>&lt;script&gt;</b>'
		     *
		     * // Use the "evaluate" delimiter to execute JavaScript and generate HTML.
		     * var compiled = _.template('<% _.forEach(users, function(user) { %><li><%- user %></li><% }); %>');
		     * compiled({ 'users': ['fred', 'barney'] });
		     * // => '<li>fred</li><li>barney</li>'
		     *
		     * // Use the internal `print` function in "evaluate" delimiters.
		     * var compiled = _.template('<% print("hello " + user); %>!');
		     * compiled({ 'user': 'barney' });
		     * // => 'hello barney!'
		     *
		     * // Use the ES template literal delimiter as an "interpolate" delimiter.
		     * // Disable support by replacing the "interpolate" delimiter.
		     * var compiled = _.template('hello ${ user }!');
		     * compiled({ 'user': 'pebbles' });
		     * // => 'hello pebbles!'
		     *
		     * // Use backslashes to treat delimiters as plain text.
		     * var compiled = _.template('<%= "\\<%- value %\\>" %>');
		     * compiled({ 'value': 'ignored' });
		     * // => '<%- value %>'
		     *
		     * // Use the `imports` option to import `jQuery` as `jq`.
		     * var text = '<% jq.each(users, function(user) { %><li><%- user %></li><% }); %>';
		     * var compiled = _.template(text, { 'imports': { 'jq': jQuery } });
		     * compiled({ 'users': ['fred', 'barney'] });
		     * // => '<li>fred</li><li>barney</li>'
		     *
		     * // Use the `sourceURL` option to specify a custom sourceURL for the template.
		     * var compiled = _.template('hello <%= user %>!', { 'sourceURL': '/basic/greeting.jst' });
		     * compiled(data);
		     * // => Find the source of "greeting.jst" under the Sources tab or Resources panel of the web inspector.
		     *
		     * // Use the `variable` option to ensure a with-statement isn't used in the compiled template.
		     * var compiled = _.template('hi <%= data.user %>!', { 'variable': 'data' });
		     * compiled.source;
		     * // => function(data) {
		     * //   var __t, __p = '';
		     * //   __p += 'hi ' + ((__t = ( data.user )) == null ? '' : __t) + '!';
		     * //   return __p;
		     * // }
		     *
		     * // Use custom template delimiters.
		     * _.templateSettings.interpolate = /{{([\s\S]+?)}}/g;
		     * var compiled = _.template('hello {{ user }}!');
		     * compiled({ 'user': 'mustache' });
		     * // => 'hello mustache!'
		     *
		     * // Use the `source` property to inline compiled templates for meaningful
		     * // line numbers in error messages and stack traces.
		     * fs.writeFileSync(path.join(process.cwd(), 'jst.js'), '\
		     *   var JST = {\
		     *     "main": ' + _.template(mainText).source + '\
		     *   };\
		     * ');
		     */
		    function template(string, options, guard) {
		      // Based on John Resig's `tmpl` implementation
		      // (http://ejohn.org/blog/javascript-micro-templating/)
		      // and Laura Doktorova's doT.js (https://github.com/olado/doT).
		      var settings = lodash.templateSettings;

		      if (guard && isIterateeCall(string, options, guard)) {
		        options = undefined$1;
		      }
		      string = toString(string);
		      options = assignInWith({}, options, settings, customDefaultsAssignIn);

		      var imports = assignInWith({}, options.imports, settings.imports, customDefaultsAssignIn),
		          importsKeys = keys(imports),
		          importsValues = baseValues(imports, importsKeys);

		      var isEscaping,
		          isEvaluating,
		          index = 0,
		          interpolate = options.interpolate || reNoMatch,
		          source = "__p += '";

		      // Compile the regexp to match each delimiter.
		      var reDelimiters = RegExp(
		        (options.escape || reNoMatch).source + '|' +
		        interpolate.source + '|' +
		        (interpolate === reInterpolate ? reEsTemplate : reNoMatch).source + '|' +
		        (options.evaluate || reNoMatch).source + '|$'
		      , 'g');

		      // Use a sourceURL for easier debugging.
		      // The sourceURL gets injected into the source that's eval-ed, so be careful
		      // to normalize all kinds of whitespace, so e.g. newlines (and unicode versions of it) can't sneak in
		      // and escape the comment, thus injecting code that gets evaled.
		      var sourceURL = '//# sourceURL=' +
		        (hasOwnProperty.call(options, 'sourceURL')
		          ? (options.sourceURL + '').replace(/\s/g, ' ')
		          : ('lodash.templateSources[' + (++templateCounter) + ']')
		        ) + '\n';

		      string.replace(reDelimiters, function(match, escapeValue, interpolateValue, esTemplateValue, evaluateValue, offset) {
		        interpolateValue || (interpolateValue = esTemplateValue);

		        // Escape characters that can't be included in string literals.
		        source += string.slice(index, offset).replace(reUnescapedString, escapeStringChar);

		        // Replace delimiters with snippets.
		        if (escapeValue) {
		          isEscaping = true;
		          source += "' +\n__e(" + escapeValue + ") +\n'";
		        }
		        if (evaluateValue) {
		          isEvaluating = true;
		          source += "';\n" + evaluateValue + ";\n__p += '";
		        }
		        if (interpolateValue) {
		          source += "' +\n((__t = (" + interpolateValue + ")) == null ? '' : __t) +\n'";
		        }
		        index = offset + match.length;

		        // The JS engine embedded in Adobe products needs `match` returned in
		        // order to produce the correct `offset` value.
		        return match;
		      });

		      source += "';\n";

		      // If `variable` is not specified wrap a with-statement around the generated
		      // code to add the data object to the top of the scope chain.
		      var variable = hasOwnProperty.call(options, 'variable') && options.variable;
		      if (!variable) {
		        source = 'with (obj) {\n' + source + '\n}\n';
		      }
		      // Throw an error if a forbidden character was found in `variable`, to prevent
		      // potential command injection attacks.
		      else if (reForbiddenIdentifierChars.test(variable)) {
		        throw new Error(INVALID_TEMPL_VAR_ERROR_TEXT);
		      }

		      // Cleanup code by stripping empty strings.
		      source = (isEvaluating ? source.replace(reEmptyStringLeading, '') : source)
		        .replace(reEmptyStringMiddle, '$1')
		        .replace(reEmptyStringTrailing, '$1;');

		      // Frame code as the function body.
		      source = 'function(' + (variable || 'obj') + ') {\n' +
		        (variable
		          ? ''
		          : 'obj || (obj = {});\n'
		        ) +
		        "var __t, __p = ''" +
		        (isEscaping
		           ? ', __e = _.escape'
		           : ''
		        ) +
		        (isEvaluating
		          ? ', __j = Array.prototype.join;\n' +
		            "function print() { __p += __j.call(arguments, '') }\n"
		          : ';\n'
		        ) +
		        source +
		        'return __p\n}';

		      var result = attempt(function() {
		        return Function(importsKeys, sourceURL + 'return ' + source)
		          .apply(undefined$1, importsValues);
		      });

		      // Provide the compiled function's source by its `toString` method or
		      // the `source` property as a convenience for inlining compiled templates.
		      result.source = source;
		      if (isError(result)) {
		        throw result;
		      }
		      return result;
		    }

		    /**
		     * Converts `string`, as a whole, to lower case just like
		     * [String#toLowerCase](https://mdn.io/toLowerCase).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the lower cased string.
		     * @example
		     *
		     * _.toLower('--Foo-Bar--');
		     * // => '--foo-bar--'
		     *
		     * _.toLower('fooBar');
		     * // => 'foobar'
		     *
		     * _.toLower('__FOO_BAR__');
		     * // => '__foo_bar__'
		     */
		    function toLower(value) {
		      return toString(value).toLowerCase();
		    }

		    /**
		     * Converts `string`, as a whole, to upper case just like
		     * [String#toUpperCase](https://mdn.io/toUpperCase).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the upper cased string.
		     * @example
		     *
		     * _.toUpper('--foo-bar--');
		     * // => '--FOO-BAR--'
		     *
		     * _.toUpper('fooBar');
		     * // => 'FOOBAR'
		     *
		     * _.toUpper('__foo_bar__');
		     * // => '__FOO_BAR__'
		     */
		    function toUpper(value) {
		      return toString(value).toUpperCase();
		    }

		    /**
		     * Removes leading and trailing whitespace or specified characters from `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to trim.
		     * @param {string} [chars=whitespace] The characters to trim.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the trimmed string.
		     * @example
		     *
		     * _.trim('  abc  ');
		     * // => 'abc'
		     *
		     * _.trim('-_-abc-_-', '_-');
		     * // => 'abc'
		     *
		     * _.map(['  foo  ', '  bar  '], _.trim);
		     * // => ['foo', 'bar']
		     */
		    function trim(string, chars, guard) {
		      string = toString(string);
		      if (string && (guard || chars === undefined$1)) {
		        return baseTrim(string);
		      }
		      if (!string || !(chars = baseToString(chars))) {
		        return string;
		      }
		      var strSymbols = stringToArray(string),
		          chrSymbols = stringToArray(chars),
		          start = charsStartIndex(strSymbols, chrSymbols),
		          end = charsEndIndex(strSymbols, chrSymbols) + 1;

		      return castSlice(strSymbols, start, end).join('');
		    }

		    /**
		     * Removes trailing whitespace or specified characters from `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to trim.
		     * @param {string} [chars=whitespace] The characters to trim.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the trimmed string.
		     * @example
		     *
		     * _.trimEnd('  abc  ');
		     * // => '  abc'
		     *
		     * _.trimEnd('-_-abc-_-', '_-');
		     * // => '-_-abc'
		     */
		    function trimEnd(string, chars, guard) {
		      string = toString(string);
		      if (string && (guard || chars === undefined$1)) {
		        return string.slice(0, trimmedEndIndex(string) + 1);
		      }
		      if (!string || !(chars = baseToString(chars))) {
		        return string;
		      }
		      var strSymbols = stringToArray(string),
		          end = charsEndIndex(strSymbols, stringToArray(chars)) + 1;

		      return castSlice(strSymbols, 0, end).join('');
		    }

		    /**
		     * Removes leading whitespace or specified characters from `string`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to trim.
		     * @param {string} [chars=whitespace] The characters to trim.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {string} Returns the trimmed string.
		     * @example
		     *
		     * _.trimStart('  abc  ');
		     * // => 'abc  '
		     *
		     * _.trimStart('-_-abc-_-', '_-');
		     * // => 'abc-_-'
		     */
		    function trimStart(string, chars, guard) {
		      string = toString(string);
		      if (string && (guard || chars === undefined$1)) {
		        return string.replace(reTrimStart, '');
		      }
		      if (!string || !(chars = baseToString(chars))) {
		        return string;
		      }
		      var strSymbols = stringToArray(string),
		          start = charsStartIndex(strSymbols, stringToArray(chars));

		      return castSlice(strSymbols, start).join('');
		    }

		    /**
		     * Truncates `string` if it's longer than the given maximum string length.
		     * The last characters of the truncated string are replaced with the omission
		     * string which defaults to "...".
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to truncate.
		     * @param {Object} [options={}] The options object.
		     * @param {number} [options.length=30] The maximum string length.
		     * @param {string} [options.omission='...'] The string to indicate text is omitted.
		     * @param {RegExp|string} [options.separator] The separator pattern to truncate to.
		     * @returns {string} Returns the truncated string.
		     * @example
		     *
		     * _.truncate('hi-diddly-ho there, neighborino');
		     * // => 'hi-diddly-ho there, neighbo...'
		     *
		     * _.truncate('hi-diddly-ho there, neighborino', {
		     *   'length': 24,
		     *   'separator': ' '
		     * });
		     * // => 'hi-diddly-ho there,...'
		     *
		     * _.truncate('hi-diddly-ho there, neighborino', {
		     *   'length': 24,
		     *   'separator': /,? +/
		     * });
		     * // => 'hi-diddly-ho there...'
		     *
		     * _.truncate('hi-diddly-ho there, neighborino', {
		     *   'omission': ' [...]'
		     * });
		     * // => 'hi-diddly-ho there, neig [...]'
		     */
		    function truncate(string, options) {
		      var length = DEFAULT_TRUNC_LENGTH,
		          omission = DEFAULT_TRUNC_OMISSION;

		      if (isObject(options)) {
		        var separator = 'separator' in options ? options.separator : separator;
		        length = 'length' in options ? toInteger(options.length) : length;
		        omission = 'omission' in options ? baseToString(options.omission) : omission;
		      }
		      string = toString(string);

		      var strLength = string.length;
		      if (hasUnicode(string)) {
		        var strSymbols = stringToArray(string);
		        strLength = strSymbols.length;
		      }
		      if (length >= strLength) {
		        return string;
		      }
		      var end = length - stringSize(omission);
		      if (end < 1) {
		        return omission;
		      }
		      var result = strSymbols
		        ? castSlice(strSymbols, 0, end).join('')
		        : string.slice(0, end);

		      if (separator === undefined$1) {
		        return result + omission;
		      }
		      if (strSymbols) {
		        end += (result.length - end);
		      }
		      if (isRegExp(separator)) {
		        if (string.slice(end).search(separator)) {
		          var match,
		              substring = result;

		          if (!separator.global) {
		            separator = RegExp(separator.source, toString(reFlags.exec(separator)) + 'g');
		          }
		          separator.lastIndex = 0;
		          while ((match = separator.exec(substring))) {
		            var newEnd = match.index;
		          }
		          result = result.slice(0, newEnd === undefined$1 ? end : newEnd);
		        }
		      } else if (string.indexOf(baseToString(separator), end) != end) {
		        var index = result.lastIndexOf(separator);
		        if (index > -1) {
		          result = result.slice(0, index);
		        }
		      }
		      return result + omission;
		    }

		    /**
		     * The inverse of `_.escape`; this method converts the HTML entities
		     * `&amp;`, `&lt;`, `&gt;`, `&quot;`, and `&#39;` in `string` to
		     * their corresponding characters.
		     *
		     * **Note:** No other HTML entities are unescaped. To unescape additional
		     * HTML entities use a third-party library like [_he_](https://mths.be/he).
		     *
		     * @static
		     * @memberOf _
		     * @since 0.6.0
		     * @category String
		     * @param {string} [string=''] The string to unescape.
		     * @returns {string} Returns the unescaped string.
		     * @example
		     *
		     * _.unescape('fred, barney, &amp; pebbles');
		     * // => 'fred, barney, & pebbles'
		     */
		    function unescape(string) {
		      string = toString(string);
		      return (string && reHasEscapedHtml.test(string))
		        ? string.replace(reEscapedHtml, unescapeHtmlChar)
		        : string;
		    }

		    /**
		     * Converts `string`, as space separated words, to upper case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the upper cased string.
		     * @example
		     *
		     * _.upperCase('--foo-bar');
		     * // => 'FOO BAR'
		     *
		     * _.upperCase('fooBar');
		     * // => 'FOO BAR'
		     *
		     * _.upperCase('__foo_bar__');
		     * // => 'FOO BAR'
		     */
		    var upperCase = createCompounder(function(result, word, index) {
		      return result + (index ? ' ' : '') + word.toUpperCase();
		    });

		    /**
		     * Converts the first character of `string` to upper case.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category String
		     * @param {string} [string=''] The string to convert.
		     * @returns {string} Returns the converted string.
		     * @example
		     *
		     * _.upperFirst('fred');
		     * // => 'Fred'
		     *
		     * _.upperFirst('FRED');
		     * // => 'FRED'
		     */
		    var upperFirst = createCaseFirst('toUpperCase');

		    /**
		     * Splits `string` into an array of its words.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category String
		     * @param {string} [string=''] The string to inspect.
		     * @param {RegExp|string} [pattern] The pattern to match words.
		     * @param- {Object} [guard] Enables use as an iteratee for methods like `_.map`.
		     * @returns {Array} Returns the words of `string`.
		     * @example
		     *
		     * _.words('fred, barney, & pebbles');
		     * // => ['fred', 'barney', 'pebbles']
		     *
		     * _.words('fred, barney, & pebbles', /[^, ]+/g);
		     * // => ['fred', 'barney', '&', 'pebbles']
		     */
		    function words(string, pattern, guard) {
		      string = toString(string);
		      pattern = guard ? undefined$1 : pattern;

		      if (pattern === undefined$1) {
		        return hasUnicodeWord(string) ? unicodeWords(string) : asciiWords(string);
		      }
		      return string.match(pattern) || [];
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Attempts to invoke `func`, returning either the result or the caught error
		     * object. Any additional arguments are provided to `func` when it's invoked.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {Function} func The function to attempt.
		     * @param {...*} [args] The arguments to invoke `func` with.
		     * @returns {*} Returns the `func` result or error object.
		     * @example
		     *
		     * // Avoid throwing errors for invalid selectors.
		     * var elements = _.attempt(function(selector) {
		     *   return document.querySelectorAll(selector);
		     * }, '>_>');
		     *
		     * if (_.isError(elements)) {
		     *   elements = [];
		     * }
		     */
		    var attempt = baseRest(function(func, args) {
		      try {
		        return apply(func, undefined$1, args);
		      } catch (e) {
		        return isError(e) ? e : new Error(e);
		      }
		    });

		    /**
		     * Binds methods of an object to the object itself, overwriting the existing
		     * method.
		     *
		     * **Note:** This method doesn't set the "length" property of bound functions.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {Object} object The object to bind and assign the bound methods to.
		     * @param {...(string|string[])} methodNames The object method names to bind.
		     * @returns {Object} Returns `object`.
		     * @example
		     *
		     * var view = {
		     *   'label': 'docs',
		     *   'click': function() {
		     *     console.log('clicked ' + this.label);
		     *   }
		     * };
		     *
		     * _.bindAll(view, ['click']);
		     * jQuery(element).on('click', view.click);
		     * // => Logs 'clicked docs' when clicked.
		     */
		    var bindAll = flatRest(function(object, methodNames) {
		      arrayEach(methodNames, function(key) {
		        key = toKey(key);
		        baseAssignValue(object, key, bind(object[key], object));
		      });
		      return object;
		    });

		    /**
		     * Creates a function that iterates over `pairs` and invokes the corresponding
		     * function of the first predicate to return truthy. The predicate-function
		     * pairs are invoked with the `this` binding and arguments of the created
		     * function.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {Array} pairs The predicate-function pairs.
		     * @returns {Function} Returns the new composite function.
		     * @example
		     *
		     * var func = _.cond([
		     *   [_.matches({ 'a': 1 }),           _.constant('matches A')],
		     *   [_.conforms({ 'b': _.isNumber }), _.constant('matches B')],
		     *   [_.stubTrue,                      _.constant('no match')]
		     * ]);
		     *
		     * func({ 'a': 1, 'b': 2 });
		     * // => 'matches A'
		     *
		     * func({ 'a': 0, 'b': 1 });
		     * // => 'matches B'
		     *
		     * func({ 'a': '1', 'b': '2' });
		     * // => 'no match'
		     */
		    function cond(pairs) {
		      var length = pairs == null ? 0 : pairs.length,
		          toIteratee = getIteratee();

		      pairs = !length ? [] : arrayMap(pairs, function(pair) {
		        if (typeof pair[1] != 'function') {
		          throw new TypeError(FUNC_ERROR_TEXT);
		        }
		        return [toIteratee(pair[0]), pair[1]];
		      });

		      return baseRest(function(args) {
		        var index = -1;
		        while (++index < length) {
		          var pair = pairs[index];
		          if (apply(pair[0], this, args)) {
		            return apply(pair[1], this, args);
		          }
		        }
		      });
		    }

		    /**
		     * Creates a function that invokes the predicate properties of `source` with
		     * the corresponding property values of a given object, returning `true` if
		     * all predicates return truthy, else `false`.
		     *
		     * **Note:** The created function is equivalent to `_.conformsTo` with
		     * `source` partially applied.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {Object} source The object of property predicates to conform to.
		     * @returns {Function} Returns the new spec function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': 2, 'b': 1 },
		     *   { 'a': 1, 'b': 2 }
		     * ];
		     *
		     * _.filter(objects, _.conforms({ 'b': function(n) { return n > 1; } }));
		     * // => [{ 'a': 1, 'b': 2 }]
		     */
		    function conforms(source) {
		      return baseConforms(baseClone(source, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that returns `value`.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Util
		     * @param {*} value The value to return from the new function.
		     * @returns {Function} Returns the new constant function.
		     * @example
		     *
		     * var objects = _.times(2, _.constant({ 'a': 1 }));
		     *
		     * console.log(objects);
		     * // => [{ 'a': 1 }, { 'a': 1 }]
		     *
		     * console.log(objects[0] === objects[1]);
		     * // => true
		     */
		    function constant(value) {
		      return function() {
		        return value;
		      };
		    }

		    /**
		     * Checks `value` to determine whether a default value should be returned in
		     * its place. The `defaultValue` is returned if `value` is `NaN`, `null`,
		     * or `undefined`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.14.0
		     * @category Util
		     * @param {*} value The value to check.
		     * @param {*} defaultValue The default value.
		     * @returns {*} Returns the resolved value.
		     * @example
		     *
		     * _.defaultTo(1, 10);
		     * // => 1
		     *
		     * _.defaultTo(undefined, 10);
		     * // => 10
		     */
		    function defaultTo(value, defaultValue) {
		      return (value == null || value !== value) ? defaultValue : value;
		    }

		    /**
		     * Creates a function that returns the result of invoking the given functions
		     * with the `this` binding of the created function, where each successive
		     * invocation is supplied the return value of the previous.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [funcs] The functions to invoke.
		     * @returns {Function} Returns the new composite function.
		     * @see _.flowRight
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var addSquare = _.flow([_.add, square]);
		     * addSquare(1, 2);
		     * // => 9
		     */
		    var flow = createFlow();

		    /**
		     * This method is like `_.flow` except that it creates a function that
		     * invokes the given functions from right to left.
		     *
		     * @static
		     * @since 3.0.0
		     * @memberOf _
		     * @category Util
		     * @param {...(Function|Function[])} [funcs] The functions to invoke.
		     * @returns {Function} Returns the new composite function.
		     * @see _.flow
		     * @example
		     *
		     * function square(n) {
		     *   return n * n;
		     * }
		     *
		     * var addSquare = _.flowRight([square, _.add]);
		     * addSquare(1, 2);
		     * // => 9
		     */
		    var flowRight = createFlow(true);

		    /**
		     * This method returns the first argument it receives.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {*} value Any value.
		     * @returns {*} Returns `value`.
		     * @example
		     *
		     * var object = { 'a': 1 };
		     *
		     * console.log(_.identity(object) === object);
		     * // => true
		     */
		    function identity(value) {
		      return value;
		    }

		    /**
		     * Creates a function that invokes `func` with the arguments of the created
		     * function. If `func` is a property name, the created function returns the
		     * property value for a given element. If `func` is an array or object, the
		     * created function returns `true` for elements that contain the equivalent
		     * source properties, otherwise it returns `false`.
		     *
		     * @static
		     * @since 4.0.0
		     * @memberOf _
		     * @category Util
		     * @param {*} [func=_.identity] The value to convert to a callback.
		     * @returns {Function} Returns the callback.
		     * @example
		     *
		     * var users = [
		     *   { 'user': 'barney', 'age': 36, 'active': true },
		     *   { 'user': 'fred',   'age': 40, 'active': false }
		     * ];
		     *
		     * // The `_.matches` iteratee shorthand.
		     * _.filter(users, _.iteratee({ 'user': 'barney', 'active': true }));
		     * // => [{ 'user': 'barney', 'age': 36, 'active': true }]
		     *
		     * // The `_.matchesProperty` iteratee shorthand.
		     * _.filter(users, _.iteratee(['user', 'fred']));
		     * // => [{ 'user': 'fred', 'age': 40 }]
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.map(users, _.iteratee('user'));
		     * // => ['barney', 'fred']
		     *
		     * // Create custom iteratee shorthands.
		     * _.iteratee = _.wrap(_.iteratee, function(iteratee, func) {
		     *   return !_.isRegExp(func) ? iteratee(func) : function(string) {
		     *     return func.test(string);
		     *   };
		     * });
		     *
		     * _.filter(['abc', 'def'], /ef/);
		     * // => ['def']
		     */
		    function iteratee(func) {
		      return baseIteratee(typeof func == 'function' ? func : baseClone(func, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that performs a partial deep comparison between a given
		     * object and `source`, returning `true` if the given object has equivalent
		     * property values, else `false`.
		     *
		     * **Note:** The created function is equivalent to `_.isMatch` with `source`
		     * partially applied.
		     *
		     * Partial comparisons will match empty array and empty object `source`
		     * values against any array or object value, respectively. See `_.isEqual`
		     * for a list of supported value comparisons.
		     *
		     * **Note:** Multiple values can be checked by combining several matchers
		     * using `_.overSome`
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {Object} source The object of property values to match.
		     * @returns {Function} Returns the new spec function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': 1, 'b': 2, 'c': 3 },
		     *   { 'a': 4, 'b': 5, 'c': 6 }
		     * ];
		     *
		     * _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
		     * // => [{ 'a': 4, 'b': 5, 'c': 6 }]
		     *
		     * // Checking for several possible values
		     * _.filter(objects, _.overSome([_.matches({ 'a': 1 }), _.matches({ 'a': 4 })]));
		     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
		     */
		    function matches(source) {
		      return baseMatches(baseClone(source, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that performs a partial deep comparison between the
		     * value at `path` of a given object to `srcValue`, returning `true` if the
		     * object value is equivalent, else `false`.
		     *
		     * **Note:** Partial comparisons will match empty array and empty object
		     * `srcValue` values against any array or object value, respectively. See
		     * `_.isEqual` for a list of supported value comparisons.
		     *
		     * **Note:** Multiple values can be checked by combining several matchers
		     * using `_.overSome`
		     *
		     * @static
		     * @memberOf _
		     * @since 3.2.0
		     * @category Util
		     * @param {Array|string} path The path of the property to get.
		     * @param {*} srcValue The value to match.
		     * @returns {Function} Returns the new spec function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': 1, 'b': 2, 'c': 3 },
		     *   { 'a': 4, 'b': 5, 'c': 6 }
		     * ];
		     *
		     * _.find(objects, _.matchesProperty('a', 4));
		     * // => { 'a': 4, 'b': 5, 'c': 6 }
		     *
		     * // Checking for several possible values
		     * _.filter(objects, _.overSome([_.matchesProperty('a', 1), _.matchesProperty('a', 4)]));
		     * // => [{ 'a': 1, 'b': 2, 'c': 3 }, { 'a': 4, 'b': 5, 'c': 6 }]
		     */
		    function matchesProperty(path, srcValue) {
		      return baseMatchesProperty(path, baseClone(srcValue, CLONE_DEEP_FLAG));
		    }

		    /**
		     * Creates a function that invokes the method at `path` of a given object.
		     * Any additional arguments are provided to the invoked method.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Util
		     * @param {Array|string} path The path of the method to invoke.
		     * @param {...*} [args] The arguments to invoke the method with.
		     * @returns {Function} Returns the new invoker function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': { 'b': _.constant(2) } },
		     *   { 'a': { 'b': _.constant(1) } }
		     * ];
		     *
		     * _.map(objects, _.method('a.b'));
		     * // => [2, 1]
		     *
		     * _.map(objects, _.method(['a', 'b']));
		     * // => [2, 1]
		     */
		    var method = baseRest(function(path, args) {
		      return function(object) {
		        return baseInvoke(object, path, args);
		      };
		    });

		    /**
		     * The opposite of `_.method`; this method creates a function that invokes
		     * the method at a given path of `object`. Any additional arguments are
		     * provided to the invoked method.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.7.0
		     * @category Util
		     * @param {Object} object The object to query.
		     * @param {...*} [args] The arguments to invoke the method with.
		     * @returns {Function} Returns the new invoker function.
		     * @example
		     *
		     * var array = _.times(3, _.constant),
		     *     object = { 'a': array, 'b': array, 'c': array };
		     *
		     * _.map(['a[2]', 'c[0]'], _.methodOf(object));
		     * // => [2, 0]
		     *
		     * _.map([['a', '2'], ['c', '0']], _.methodOf(object));
		     * // => [2, 0]
		     */
		    var methodOf = baseRest(function(object, args) {
		      return function(path) {
		        return baseInvoke(object, path, args);
		      };
		    });

		    /**
		     * Adds all own enumerable string keyed function properties of a source
		     * object to the destination object. If `object` is a function, then methods
		     * are added to its prototype as well.
		     *
		     * **Note:** Use `_.runInContext` to create a pristine `lodash` function to
		     * avoid conflicts caused by modifying the original.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {Function|Object} [object=lodash] The destination object.
		     * @param {Object} source The object of functions to add.
		     * @param {Object} [options={}] The options object.
		     * @param {boolean} [options.chain=true] Specify whether mixins are chainable.
		     * @returns {Function|Object} Returns `object`.
		     * @example
		     *
		     * function vowels(string) {
		     *   return _.filter(string, function(v) {
		     *     return /[aeiou]/i.test(v);
		     *   });
		     * }
		     *
		     * _.mixin({ 'vowels': vowels });
		     * _.vowels('fred');
		     * // => ['e']
		     *
		     * _('fred').vowels().value();
		     * // => ['e']
		     *
		     * _.mixin({ 'vowels': vowels }, { 'chain': false });
		     * _('fred').vowels();
		     * // => ['e']
		     */
		    function mixin(object, source, options) {
		      var props = keys(source),
		          methodNames = baseFunctions(source, props);

		      if (options == null &&
		          !(isObject(source) && (methodNames.length || !props.length))) {
		        options = source;
		        source = object;
		        object = this;
		        methodNames = baseFunctions(source, keys(source));
		      }
		      var chain = !(isObject(options) && 'chain' in options) || !!options.chain,
		          isFunc = isFunction(object);

		      arrayEach(methodNames, function(methodName) {
		        var func = source[methodName];
		        object[methodName] = func;
		        if (isFunc) {
		          object.prototype[methodName] = function() {
		            var chainAll = this.__chain__;
		            if (chain || chainAll) {
		              var result = object(this.__wrapped__),
		                  actions = result.__actions__ = copyArray(this.__actions__);

		              actions.push({ 'func': func, 'args': arguments, 'thisArg': object });
		              result.__chain__ = chainAll;
		              return result;
		            }
		            return func.apply(object, arrayPush([this.value()], arguments));
		          };
		        }
		      });

		      return object;
		    }

		    /**
		     * Reverts the `_` variable to its previous value and returns a reference to
		     * the `lodash` function.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @returns {Function} Returns the `lodash` function.
		     * @example
		     *
		     * var lodash = _.noConflict();
		     */
		    function noConflict() {
		      if (root._ === this) {
		        root._ = oldDash;
		      }
		      return this;
		    }

		    /**
		     * This method returns `undefined`.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.3.0
		     * @category Util
		     * @example
		     *
		     * _.times(2, _.noop);
		     * // => [undefined, undefined]
		     */
		    function noop() {
		      // No operation performed.
		    }

		    /**
		     * Creates a function that gets the argument at index `n`. If `n` is negative,
		     * the nth argument from the end is returned.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {number} [n=0] The index of the argument to return.
		     * @returns {Function} Returns the new pass-thru function.
		     * @example
		     *
		     * var func = _.nthArg(1);
		     * func('a', 'b', 'c', 'd');
		     * // => 'b'
		     *
		     * var func = _.nthArg(-2);
		     * func('a', 'b', 'c', 'd');
		     * // => 'c'
		     */
		    function nthArg(n) {
		      n = toInteger(n);
		      return baseRest(function(args) {
		        return baseNth(args, n);
		      });
		    }

		    /**
		     * Creates a function that invokes `iteratees` with the arguments it receives
		     * and returns their results.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [iteratees=[_.identity]]
		     *  The iteratees to invoke.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var func = _.over([Math.max, Math.min]);
		     *
		     * func(1, 2, 3, 4);
		     * // => [4, 1]
		     */
		    var over = createOver(arrayMap);

		    /**
		     * Creates a function that checks if **all** of the `predicates` return
		     * truthy when invoked with the arguments it receives.
		     *
		     * Following shorthands are possible for providing predicates.
		     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
		     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [predicates=[_.identity]]
		     *  The predicates to check.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var func = _.overEvery([Boolean, isFinite]);
		     *
		     * func('1');
		     * // => true
		     *
		     * func(null);
		     * // => false
		     *
		     * func(NaN);
		     * // => false
		     */
		    var overEvery = createOver(arrayEvery);

		    /**
		     * Creates a function that checks if **any** of the `predicates` return
		     * truthy when invoked with the arguments it receives.
		     *
		     * Following shorthands are possible for providing predicates.
		     * Pass an `Object` and it will be used as an parameter for `_.matches` to create the predicate.
		     * Pass an `Array` of parameters for `_.matchesProperty` and the predicate will be created using them.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {...(Function|Function[])} [predicates=[_.identity]]
		     *  The predicates to check.
		     * @returns {Function} Returns the new function.
		     * @example
		     *
		     * var func = _.overSome([Boolean, isFinite]);
		     *
		     * func('1');
		     * // => true
		     *
		     * func(null);
		     * // => true
		     *
		     * func(NaN);
		     * // => false
		     *
		     * var matchesFunc = _.overSome([{ 'a': 1 }, { 'a': 2 }])
		     * var matchesPropertyFunc = _.overSome([['a', 1], ['a', 2]])
		     */
		    var overSome = createOver(arraySome);

		    /**
		     * Creates a function that returns the value at `path` of a given object.
		     *
		     * @static
		     * @memberOf _
		     * @since 2.4.0
		     * @category Util
		     * @param {Array|string} path The path of the property to get.
		     * @returns {Function} Returns the new accessor function.
		     * @example
		     *
		     * var objects = [
		     *   { 'a': { 'b': 2 } },
		     *   { 'a': { 'b': 1 } }
		     * ];
		     *
		     * _.map(objects, _.property('a.b'));
		     * // => [2, 1]
		     *
		     * _.map(_.sortBy(objects, _.property(['a', 'b'])), 'a.b');
		     * // => [1, 2]
		     */
		    function property(path) {
		      return isKey(path) ? baseProperty(toKey(path)) : basePropertyDeep(path);
		    }

		    /**
		     * The opposite of `_.property`; this method creates a function that returns
		     * the value at a given path of `object`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.0.0
		     * @category Util
		     * @param {Object} object The object to query.
		     * @returns {Function} Returns the new accessor function.
		     * @example
		     *
		     * var array = [0, 1, 2],
		     *     object = { 'a': array, 'b': array, 'c': array };
		     *
		     * _.map(['a[2]', 'c[0]'], _.propertyOf(object));
		     * // => [2, 0]
		     *
		     * _.map([['a', '2'], ['c', '0']], _.propertyOf(object));
		     * // => [2, 0]
		     */
		    function propertyOf(object) {
		      return function(path) {
		        return object == null ? undefined$1 : baseGet(object, path);
		      };
		    }

		    /**
		     * Creates an array of numbers (positive and/or negative) progressing from
		     * `start` up to, but not including, `end`. A step of `-1` is used if a negative
		     * `start` is specified without an `end` or `step`. If `end` is not specified,
		     * it's set to `start` with `start` then set to `0`.
		     *
		     * **Note:** JavaScript follows the IEEE-754 standard for resolving
		     * floating-point values which can produce unexpected results.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {number} [start=0] The start of the range.
		     * @param {number} end The end of the range.
		     * @param {number} [step=1] The value to increment or decrement by.
		     * @returns {Array} Returns the range of numbers.
		     * @see _.inRange, _.rangeRight
		     * @example
		     *
		     * _.range(4);
		     * // => [0, 1, 2, 3]
		     *
		     * _.range(-4);
		     * // => [0, -1, -2, -3]
		     *
		     * _.range(1, 5);
		     * // => [1, 2, 3, 4]
		     *
		     * _.range(0, 20, 5);
		     * // => [0, 5, 10, 15]
		     *
		     * _.range(0, -4, -1);
		     * // => [0, -1, -2, -3]
		     *
		     * _.range(1, 4, 0);
		     * // => [1, 1, 1]
		     *
		     * _.range(0);
		     * // => []
		     */
		    var range = createRange();

		    /**
		     * This method is like `_.range` except that it populates values in
		     * descending order.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {number} [start=0] The start of the range.
		     * @param {number} end The end of the range.
		     * @param {number} [step=1] The value to increment or decrement by.
		     * @returns {Array} Returns the range of numbers.
		     * @see _.inRange, _.range
		     * @example
		     *
		     * _.rangeRight(4);
		     * // => [3, 2, 1, 0]
		     *
		     * _.rangeRight(-4);
		     * // => [-3, -2, -1, 0]
		     *
		     * _.rangeRight(1, 5);
		     * // => [4, 3, 2, 1]
		     *
		     * _.rangeRight(0, 20, 5);
		     * // => [15, 10, 5, 0]
		     *
		     * _.rangeRight(0, -4, -1);
		     * // => [-3, -2, -1, 0]
		     *
		     * _.rangeRight(1, 4, 0);
		     * // => [1, 1, 1]
		     *
		     * _.rangeRight(0);
		     * // => []
		     */
		    var rangeRight = createRange(true);

		    /**
		     * This method returns a new empty array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {Array} Returns the new empty array.
		     * @example
		     *
		     * var arrays = _.times(2, _.stubArray);
		     *
		     * console.log(arrays);
		     * // => [[], []]
		     *
		     * console.log(arrays[0] === arrays[1]);
		     * // => false
		     */
		    function stubArray() {
		      return [];
		    }

		    /**
		     * This method returns `false`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {boolean} Returns `false`.
		     * @example
		     *
		     * _.times(2, _.stubFalse);
		     * // => [false, false]
		     */
		    function stubFalse() {
		      return false;
		    }

		    /**
		     * This method returns a new empty object.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {Object} Returns the new empty object.
		     * @example
		     *
		     * var objects = _.times(2, _.stubObject);
		     *
		     * console.log(objects);
		     * // => [{}, {}]
		     *
		     * console.log(objects[0] === objects[1]);
		     * // => false
		     */
		    function stubObject() {
		      return {};
		    }

		    /**
		     * This method returns an empty string.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {string} Returns the empty string.
		     * @example
		     *
		     * _.times(2, _.stubString);
		     * // => ['', '']
		     */
		    function stubString() {
		      return '';
		    }

		    /**
		     * This method returns `true`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.13.0
		     * @category Util
		     * @returns {boolean} Returns `true`.
		     * @example
		     *
		     * _.times(2, _.stubTrue);
		     * // => [true, true]
		     */
		    function stubTrue() {
		      return true;
		    }

		    /**
		     * Invokes the iteratee `n` times, returning an array of the results of
		     * each invocation. The iteratee is invoked with one argument; (index).
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {number} n The number of times to invoke `iteratee`.
		     * @param {Function} [iteratee=_.identity] The function invoked per iteration.
		     * @returns {Array} Returns the array of results.
		     * @example
		     *
		     * _.times(3, String);
		     * // => ['0', '1', '2']
		     *
		     *  _.times(4, _.constant(0));
		     * // => [0, 0, 0, 0]
		     */
		    function times(n, iteratee) {
		      n = toInteger(n);
		      if (n < 1 || n > MAX_SAFE_INTEGER) {
		        return [];
		      }
		      var index = MAX_ARRAY_LENGTH,
		          length = nativeMin(n, MAX_ARRAY_LENGTH);

		      iteratee = getIteratee(iteratee);
		      n -= MAX_ARRAY_LENGTH;

		      var result = baseTimes(length, iteratee);
		      while (++index < n) {
		        iteratee(index);
		      }
		      return result;
		    }

		    /**
		     * Converts `value` to a property path array.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Util
		     * @param {*} value The value to convert.
		     * @returns {Array} Returns the new property path array.
		     * @example
		     *
		     * _.toPath('a.b.c');
		     * // => ['a', 'b', 'c']
		     *
		     * _.toPath('a[0].b.c');
		     * // => ['a', '0', 'b', 'c']
		     */
		    function toPath(value) {
		      if (isArray(value)) {
		        return arrayMap(value, toKey);
		      }
		      return isSymbol(value) ? [value] : copyArray(stringToPath(toString(value)));
		    }

		    /**
		     * Generates a unique ID. If `prefix` is given, the ID is appended to it.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Util
		     * @param {string} [prefix=''] The value to prefix the ID with.
		     * @returns {string} Returns the unique ID.
		     * @example
		     *
		     * _.uniqueId('contact_');
		     * // => 'contact_104'
		     *
		     * _.uniqueId();
		     * // => '105'
		     */
		    function uniqueId(prefix) {
		      var id = ++idCounter;
		      return toString(prefix) + id;
		    }

		    /*------------------------------------------------------------------------*/

		    /**
		     * Adds two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.4.0
		     * @category Math
		     * @param {number} augend The first number in an addition.
		     * @param {number} addend The second number in an addition.
		     * @returns {number} Returns the total.
		     * @example
		     *
		     * _.add(6, 4);
		     * // => 10
		     */
		    var add = createMathOperation(function(augend, addend) {
		      return augend + addend;
		    }, 0);

		    /**
		     * Computes `number` rounded up to `precision`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Math
		     * @param {number} number The number to round up.
		     * @param {number} [precision=0] The precision to round up to.
		     * @returns {number} Returns the rounded up number.
		     * @example
		     *
		     * _.ceil(4.006);
		     * // => 5
		     *
		     * _.ceil(6.004, 2);
		     * // => 6.01
		     *
		     * _.ceil(6040, -2);
		     * // => 6100
		     */
		    var ceil = createRound('ceil');

		    /**
		     * Divide two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Math
		     * @param {number} dividend The first number in a division.
		     * @param {number} divisor The second number in a division.
		     * @returns {number} Returns the quotient.
		     * @example
		     *
		     * _.divide(6, 4);
		     * // => 1.5
		     */
		    var divide = createMathOperation(function(dividend, divisor) {
		      return dividend / divisor;
		    }, 1);

		    /**
		     * Computes `number` rounded down to `precision`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Math
		     * @param {number} number The number to round down.
		     * @param {number} [precision=0] The precision to round down to.
		     * @returns {number} Returns the rounded down number.
		     * @example
		     *
		     * _.floor(4.006);
		     * // => 4
		     *
		     * _.floor(0.046, 2);
		     * // => 0.04
		     *
		     * _.floor(4060, -2);
		     * // => 4000
		     */
		    var floor = createRound('floor');

		    /**
		     * Computes the maximum value of `array`. If `array` is empty or falsey,
		     * `undefined` is returned.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {*} Returns the maximum value.
		     * @example
		     *
		     * _.max([4, 2, 8, 6]);
		     * // => 8
		     *
		     * _.max([]);
		     * // => undefined
		     */
		    function max(array) {
		      return (array && array.length)
		        ? baseExtremum(array, identity, baseGt)
		        : undefined$1;
		    }

		    /**
		     * This method is like `_.max` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the criterion by which
		     * the value is ranked. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {*} Returns the maximum value.
		     * @example
		     *
		     * var objects = [{ 'n': 1 }, { 'n': 2 }];
		     *
		     * _.maxBy(objects, function(o) { return o.n; });
		     * // => { 'n': 2 }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.maxBy(objects, 'n');
		     * // => { 'n': 2 }
		     */
		    function maxBy(array, iteratee) {
		      return (array && array.length)
		        ? baseExtremum(array, getIteratee(iteratee, 2), baseGt)
		        : undefined$1;
		    }

		    /**
		     * Computes the mean of the values in `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {number} Returns the mean.
		     * @example
		     *
		     * _.mean([4, 2, 8, 6]);
		     * // => 5
		     */
		    function mean(array) {
		      return baseMean(array, identity);
		    }

		    /**
		     * This method is like `_.mean` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the value to be averaged.
		     * The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the mean.
		     * @example
		     *
		     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
		     *
		     * _.meanBy(objects, function(o) { return o.n; });
		     * // => 5
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.meanBy(objects, 'n');
		     * // => 5
		     */
		    function meanBy(array, iteratee) {
		      return baseMean(array, getIteratee(iteratee, 2));
		    }

		    /**
		     * Computes the minimum value of `array`. If `array` is empty or falsey,
		     * `undefined` is returned.
		     *
		     * @static
		     * @since 0.1.0
		     * @memberOf _
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {*} Returns the minimum value.
		     * @example
		     *
		     * _.min([4, 2, 8, 6]);
		     * // => 2
		     *
		     * _.min([]);
		     * // => undefined
		     */
		    function min(array) {
		      return (array && array.length)
		        ? baseExtremum(array, identity, baseLt)
		        : undefined$1;
		    }

		    /**
		     * This method is like `_.min` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the criterion by which
		     * the value is ranked. The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {*} Returns the minimum value.
		     * @example
		     *
		     * var objects = [{ 'n': 1 }, { 'n': 2 }];
		     *
		     * _.minBy(objects, function(o) { return o.n; });
		     * // => { 'n': 1 }
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.minBy(objects, 'n');
		     * // => { 'n': 1 }
		     */
		    function minBy(array, iteratee) {
		      return (array && array.length)
		        ? baseExtremum(array, getIteratee(iteratee, 2), baseLt)
		        : undefined$1;
		    }

		    /**
		     * Multiply two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.7.0
		     * @category Math
		     * @param {number} multiplier The first number in a multiplication.
		     * @param {number} multiplicand The second number in a multiplication.
		     * @returns {number} Returns the product.
		     * @example
		     *
		     * _.multiply(6, 4);
		     * // => 24
		     */
		    var multiply = createMathOperation(function(multiplier, multiplicand) {
		      return multiplier * multiplicand;
		    }, 1);

		    /**
		     * Computes `number` rounded to `precision`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.10.0
		     * @category Math
		     * @param {number} number The number to round.
		     * @param {number} [precision=0] The precision to round to.
		     * @returns {number} Returns the rounded number.
		     * @example
		     *
		     * _.round(4.006);
		     * // => 4
		     *
		     * _.round(4.006, 2);
		     * // => 4.01
		     *
		     * _.round(4060, -2);
		     * // => 4100
		     */
		    var round = createRound('round');

		    /**
		     * Subtract two numbers.
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {number} minuend The first number in a subtraction.
		     * @param {number} subtrahend The second number in a subtraction.
		     * @returns {number} Returns the difference.
		     * @example
		     *
		     * _.subtract(6, 4);
		     * // => 2
		     */
		    var subtract = createMathOperation(function(minuend, subtrahend) {
		      return minuend - subtrahend;
		    }, 0);

		    /**
		     * Computes the sum of the values in `array`.
		     *
		     * @static
		     * @memberOf _
		     * @since 3.4.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @returns {number} Returns the sum.
		     * @example
		     *
		     * _.sum([4, 2, 8, 6]);
		     * // => 20
		     */
		    function sum(array) {
		      return (array && array.length)
		        ? baseSum(array, identity)
		        : 0;
		    }

		    /**
		     * This method is like `_.sum` except that it accepts `iteratee` which is
		     * invoked for each element in `array` to generate the value to be summed.
		     * The iteratee is invoked with one argument: (value).
		     *
		     * @static
		     * @memberOf _
		     * @since 4.0.0
		     * @category Math
		     * @param {Array} array The array to iterate over.
		     * @param {Function} [iteratee=_.identity] The iteratee invoked per element.
		     * @returns {number} Returns the sum.
		     * @example
		     *
		     * var objects = [{ 'n': 4 }, { 'n': 2 }, { 'n': 8 }, { 'n': 6 }];
		     *
		     * _.sumBy(objects, function(o) { return o.n; });
		     * // => 20
		     *
		     * // The `_.property` iteratee shorthand.
		     * _.sumBy(objects, 'n');
		     * // => 20
		     */
		    function sumBy(array, iteratee) {
		      return (array && array.length)
		        ? baseSum(array, getIteratee(iteratee, 2))
		        : 0;
		    }

		    /*------------------------------------------------------------------------*/

		    // Add methods that return wrapped values in chain sequences.
		    lodash.after = after;
		    lodash.ary = ary;
		    lodash.assign = assign;
		    lodash.assignIn = assignIn;
		    lodash.assignInWith = assignInWith;
		    lodash.assignWith = assignWith;
		    lodash.at = at;
		    lodash.before = before;
		    lodash.bind = bind;
		    lodash.bindAll = bindAll;
		    lodash.bindKey = bindKey;
		    lodash.castArray = castArray;
		    lodash.chain = chain;
		    lodash.chunk = chunk;
		    lodash.compact = compact;
		    lodash.concat = concat;
		    lodash.cond = cond;
		    lodash.conforms = conforms;
		    lodash.constant = constant;
		    lodash.countBy = countBy;
		    lodash.create = create;
		    lodash.curry = curry;
		    lodash.curryRight = curryRight;
		    lodash.debounce = debounce;
		    lodash.defaults = defaults;
		    lodash.defaultsDeep = defaultsDeep;
		    lodash.defer = defer;
		    lodash.delay = delay;
		    lodash.difference = difference;
		    lodash.differenceBy = differenceBy;
		    lodash.differenceWith = differenceWith;
		    lodash.drop = drop;
		    lodash.dropRight = dropRight;
		    lodash.dropRightWhile = dropRightWhile;
		    lodash.dropWhile = dropWhile;
		    lodash.fill = fill;
		    lodash.filter = filter;
		    lodash.flatMap = flatMap;
		    lodash.flatMapDeep = flatMapDeep;
		    lodash.flatMapDepth = flatMapDepth;
		    lodash.flatten = flatten;
		    lodash.flattenDeep = flattenDeep;
		    lodash.flattenDepth = flattenDepth;
		    lodash.flip = flip;
		    lodash.flow = flow;
		    lodash.flowRight = flowRight;
		    lodash.fromPairs = fromPairs;
		    lodash.functions = functions;
		    lodash.functionsIn = functionsIn;
		    lodash.groupBy = groupBy;
		    lodash.initial = initial;
		    lodash.intersection = intersection;
		    lodash.intersectionBy = intersectionBy;
		    lodash.intersectionWith = intersectionWith;
		    lodash.invert = invert;
		    lodash.invertBy = invertBy;
		    lodash.invokeMap = invokeMap;
		    lodash.iteratee = iteratee;
		    lodash.keyBy = keyBy;
		    lodash.keys = keys;
		    lodash.keysIn = keysIn;
		    lodash.map = map;
		    lodash.mapKeys = mapKeys;
		    lodash.mapValues = mapValues;
		    lodash.matches = matches;
		    lodash.matchesProperty = matchesProperty;
		    lodash.memoize = memoize;
		    lodash.merge = merge;
		    lodash.mergeWith = mergeWith;
		    lodash.method = method;
		    lodash.methodOf = methodOf;
		    lodash.mixin = mixin;
		    lodash.negate = negate;
		    lodash.nthArg = nthArg;
		    lodash.omit = omit;
		    lodash.omitBy = omitBy;
		    lodash.once = once;
		    lodash.orderBy = orderBy;
		    lodash.over = over;
		    lodash.overArgs = overArgs;
		    lodash.overEvery = overEvery;
		    lodash.overSome = overSome;
		    lodash.partial = partial;
		    lodash.partialRight = partialRight;
		    lodash.partition = partition;
		    lodash.pick = pick;
		    lodash.pickBy = pickBy;
		    lodash.property = property;
		    lodash.propertyOf = propertyOf;
		    lodash.pull = pull;
		    lodash.pullAll = pullAll;
		    lodash.pullAllBy = pullAllBy;
		    lodash.pullAllWith = pullAllWith;
		    lodash.pullAt = pullAt;
		    lodash.range = range;
		    lodash.rangeRight = rangeRight;
		    lodash.rearg = rearg;
		    lodash.reject = reject;
		    lodash.remove = remove;
		    lodash.rest = rest;
		    lodash.reverse = reverse;
		    lodash.sampleSize = sampleSize;
		    lodash.set = set;
		    lodash.setWith = setWith;
		    lodash.shuffle = shuffle;
		    lodash.slice = slice;
		    lodash.sortBy = sortBy;
		    lodash.sortedUniq = sortedUniq;
		    lodash.sortedUniqBy = sortedUniqBy;
		    lodash.split = split;
		    lodash.spread = spread;
		    lodash.tail = tail;
		    lodash.take = take;
		    lodash.takeRight = takeRight;
		    lodash.takeRightWhile = takeRightWhile;
		    lodash.takeWhile = takeWhile;
		    lodash.tap = tap;
		    lodash.throttle = throttle;
		    lodash.thru = thru;
		    lodash.toArray = toArray;
		    lodash.toPairs = toPairs;
		    lodash.toPairsIn = toPairsIn;
		    lodash.toPath = toPath;
		    lodash.toPlainObject = toPlainObject;
		    lodash.transform = transform;
		    lodash.unary = unary;
		    lodash.union = union;
		    lodash.unionBy = unionBy;
		    lodash.unionWith = unionWith;
		    lodash.uniq = uniq;
		    lodash.uniqBy = uniqBy;
		    lodash.uniqWith = uniqWith;
		    lodash.unset = unset;
		    lodash.unzip = unzip;
		    lodash.unzipWith = unzipWith;
		    lodash.update = update;
		    lodash.updateWith = updateWith;
		    lodash.values = values;
		    lodash.valuesIn = valuesIn;
		    lodash.without = without;
		    lodash.words = words;
		    lodash.wrap = wrap;
		    lodash.xor = xor;
		    lodash.xorBy = xorBy;
		    lodash.xorWith = xorWith;
		    lodash.zip = zip;
		    lodash.zipObject = zipObject;
		    lodash.zipObjectDeep = zipObjectDeep;
		    lodash.zipWith = zipWith;

		    // Add aliases.
		    lodash.entries = toPairs;
		    lodash.entriesIn = toPairsIn;
		    lodash.extend = assignIn;
		    lodash.extendWith = assignInWith;

		    // Add methods to `lodash.prototype`.
		    mixin(lodash, lodash);

		    /*------------------------------------------------------------------------*/

		    // Add methods that return unwrapped values in chain sequences.
		    lodash.add = add;
		    lodash.attempt = attempt;
		    lodash.camelCase = camelCase;
		    lodash.capitalize = capitalize;
		    lodash.ceil = ceil;
		    lodash.clamp = clamp;
		    lodash.clone = clone;
		    lodash.cloneDeep = cloneDeep;
		    lodash.cloneDeepWith = cloneDeepWith;
		    lodash.cloneWith = cloneWith;
		    lodash.conformsTo = conformsTo;
		    lodash.deburr = deburr;
		    lodash.defaultTo = defaultTo;
		    lodash.divide = divide;
		    lodash.endsWith = endsWith;
		    lodash.eq = eq;
		    lodash.escape = escape;
		    lodash.escapeRegExp = escapeRegExp;
		    lodash.every = every;
		    lodash.find = find;
		    lodash.findIndex = findIndex;
		    lodash.findKey = findKey;
		    lodash.findLast = findLast;
		    lodash.findLastIndex = findLastIndex;
		    lodash.findLastKey = findLastKey;
		    lodash.floor = floor;
		    lodash.forEach = forEach;
		    lodash.forEachRight = forEachRight;
		    lodash.forIn = forIn;
		    lodash.forInRight = forInRight;
		    lodash.forOwn = forOwn;
		    lodash.forOwnRight = forOwnRight;
		    lodash.get = get;
		    lodash.gt = gt;
		    lodash.gte = gte;
		    lodash.has = has;
		    lodash.hasIn = hasIn;
		    lodash.head = head;
		    lodash.identity = identity;
		    lodash.includes = includes;
		    lodash.indexOf = indexOf;
		    lodash.inRange = inRange;
		    lodash.invoke = invoke;
		    lodash.isArguments = isArguments;
		    lodash.isArray = isArray;
		    lodash.isArrayBuffer = isArrayBuffer;
		    lodash.isArrayLike = isArrayLike;
		    lodash.isArrayLikeObject = isArrayLikeObject;
		    lodash.isBoolean = isBoolean;
		    lodash.isBuffer = isBuffer;
		    lodash.isDate = isDate;
		    lodash.isElement = isElement;
		    lodash.isEmpty = isEmpty;
		    lodash.isEqual = isEqual;
		    lodash.isEqualWith = isEqualWith;
		    lodash.isError = isError;
		    lodash.isFinite = isFinite;
		    lodash.isFunction = isFunction;
		    lodash.isInteger = isInteger;
		    lodash.isLength = isLength;
		    lodash.isMap = isMap;
		    lodash.isMatch = isMatch;
		    lodash.isMatchWith = isMatchWith;
		    lodash.isNaN = isNaN;
		    lodash.isNative = isNative;
		    lodash.isNil = isNil;
		    lodash.isNull = isNull;
		    lodash.isNumber = isNumber;
		    lodash.isObject = isObject;
		    lodash.isObjectLike = isObjectLike;
		    lodash.isPlainObject = isPlainObject;
		    lodash.isRegExp = isRegExp;
		    lodash.isSafeInteger = isSafeInteger;
		    lodash.isSet = isSet;
		    lodash.isString = isString;
		    lodash.isSymbol = isSymbol;
		    lodash.isTypedArray = isTypedArray;
		    lodash.isUndefined = isUndefined;
		    lodash.isWeakMap = isWeakMap;
		    lodash.isWeakSet = isWeakSet;
		    lodash.join = join;
		    lodash.kebabCase = kebabCase;
		    lodash.last = last;
		    lodash.lastIndexOf = lastIndexOf;
		    lodash.lowerCase = lowerCase;
		    lodash.lowerFirst = lowerFirst;
		    lodash.lt = lt;
		    lodash.lte = lte;
		    lodash.max = max;
		    lodash.maxBy = maxBy;
		    lodash.mean = mean;
		    lodash.meanBy = meanBy;
		    lodash.min = min;
		    lodash.minBy = minBy;
		    lodash.stubArray = stubArray;
		    lodash.stubFalse = stubFalse;
		    lodash.stubObject = stubObject;
		    lodash.stubString = stubString;
		    lodash.stubTrue = stubTrue;
		    lodash.multiply = multiply;
		    lodash.nth = nth;
		    lodash.noConflict = noConflict;
		    lodash.noop = noop;
		    lodash.now = now;
		    lodash.pad = pad;
		    lodash.padEnd = padEnd;
		    lodash.padStart = padStart;
		    lodash.parseInt = parseInt;
		    lodash.random = random;
		    lodash.reduce = reduce;
		    lodash.reduceRight = reduceRight;
		    lodash.repeat = repeat;
		    lodash.replace = replace;
		    lodash.result = result;
		    lodash.round = round;
		    lodash.runInContext = runInContext;
		    lodash.sample = sample;
		    lodash.size = size;
		    lodash.snakeCase = snakeCase;
		    lodash.some = some;
		    lodash.sortedIndex = sortedIndex;
		    lodash.sortedIndexBy = sortedIndexBy;
		    lodash.sortedIndexOf = sortedIndexOf;
		    lodash.sortedLastIndex = sortedLastIndex;
		    lodash.sortedLastIndexBy = sortedLastIndexBy;
		    lodash.sortedLastIndexOf = sortedLastIndexOf;
		    lodash.startCase = startCase;
		    lodash.startsWith = startsWith;
		    lodash.subtract = subtract;
		    lodash.sum = sum;
		    lodash.sumBy = sumBy;
		    lodash.template = template;
		    lodash.times = times;
		    lodash.toFinite = toFinite;
		    lodash.toInteger = toInteger;
		    lodash.toLength = toLength;
		    lodash.toLower = toLower;
		    lodash.toNumber = toNumber;
		    lodash.toSafeInteger = toSafeInteger;
		    lodash.toString = toString;
		    lodash.toUpper = toUpper;
		    lodash.trim = trim;
		    lodash.trimEnd = trimEnd;
		    lodash.trimStart = trimStart;
		    lodash.truncate = truncate;
		    lodash.unescape = unescape;
		    lodash.uniqueId = uniqueId;
		    lodash.upperCase = upperCase;
		    lodash.upperFirst = upperFirst;

		    // Add aliases.
		    lodash.each = forEach;
		    lodash.eachRight = forEachRight;
		    lodash.first = head;

		    mixin(lodash, (function() {
		      var source = {};
		      baseForOwn(lodash, function(func, methodName) {
		        if (!hasOwnProperty.call(lodash.prototype, methodName)) {
		          source[methodName] = func;
		        }
		      });
		      return source;
		    }()), { 'chain': false });

		    /*------------------------------------------------------------------------*/

		    /**
		     * The semantic version number.
		     *
		     * @static
		     * @memberOf _
		     * @type {string}
		     */
		    lodash.VERSION = VERSION;

		    // Assign default placeholders.
		    arrayEach(['bind', 'bindKey', 'curry', 'curryRight', 'partial', 'partialRight'], function(methodName) {
		      lodash[methodName].placeholder = lodash;
		    });

		    // Add `LazyWrapper` methods for `_.drop` and `_.take` variants.
		    arrayEach(['drop', 'take'], function(methodName, index) {
		      LazyWrapper.prototype[methodName] = function(n) {
		        n = n === undefined$1 ? 1 : nativeMax(toInteger(n), 0);

		        var result = (this.__filtered__ && !index)
		          ? new LazyWrapper(this)
		          : this.clone();

		        if (result.__filtered__) {
		          result.__takeCount__ = nativeMin(n, result.__takeCount__);
		        } else {
		          result.__views__.push({
		            'size': nativeMin(n, MAX_ARRAY_LENGTH),
		            'type': methodName + (result.__dir__ < 0 ? 'Right' : '')
		          });
		        }
		        return result;
		      };

		      LazyWrapper.prototype[methodName + 'Right'] = function(n) {
		        return this.reverse()[methodName](n).reverse();
		      };
		    });

		    // Add `LazyWrapper` methods that accept an `iteratee` value.
		    arrayEach(['filter', 'map', 'takeWhile'], function(methodName, index) {
		      var type = index + 1,
		          isFilter = type == LAZY_FILTER_FLAG || type == LAZY_WHILE_FLAG;

		      LazyWrapper.prototype[methodName] = function(iteratee) {
		        var result = this.clone();
		        result.__iteratees__.push({
		          'iteratee': getIteratee(iteratee, 3),
		          'type': type
		        });
		        result.__filtered__ = result.__filtered__ || isFilter;
		        return result;
		      };
		    });

		    // Add `LazyWrapper` methods for `_.head` and `_.last`.
		    arrayEach(['head', 'last'], function(methodName, index) {
		      var takeName = 'take' + (index ? 'Right' : '');

		      LazyWrapper.prototype[methodName] = function() {
		        return this[takeName](1).value()[0];
		      };
		    });

		    // Add `LazyWrapper` methods for `_.initial` and `_.tail`.
		    arrayEach(['initial', 'tail'], function(methodName, index) {
		      var dropName = 'drop' + (index ? '' : 'Right');

		      LazyWrapper.prototype[methodName] = function() {
		        return this.__filtered__ ? new LazyWrapper(this) : this[dropName](1);
		      };
		    });

		    LazyWrapper.prototype.compact = function() {
		      return this.filter(identity);
		    };

		    LazyWrapper.prototype.find = function(predicate) {
		      return this.filter(predicate).head();
		    };

		    LazyWrapper.prototype.findLast = function(predicate) {
		      return this.reverse().find(predicate);
		    };

		    LazyWrapper.prototype.invokeMap = baseRest(function(path, args) {
		      if (typeof path == 'function') {
		        return new LazyWrapper(this);
		      }
		      return this.map(function(value) {
		        return baseInvoke(value, path, args);
		      });
		    });

		    LazyWrapper.prototype.reject = function(predicate) {
		      return this.filter(negate(getIteratee(predicate)));
		    };

		    LazyWrapper.prototype.slice = function(start, end) {
		      start = toInteger(start);

		      var result = this;
		      if (result.__filtered__ && (start > 0 || end < 0)) {
		        return new LazyWrapper(result);
		      }
		      if (start < 0) {
		        result = result.takeRight(-start);
		      } else if (start) {
		        result = result.drop(start);
		      }
		      if (end !== undefined$1) {
		        end = toInteger(end);
		        result = end < 0 ? result.dropRight(-end) : result.take(end - start);
		      }
		      return result;
		    };

		    LazyWrapper.prototype.takeRightWhile = function(predicate) {
		      return this.reverse().takeWhile(predicate).reverse();
		    };

		    LazyWrapper.prototype.toArray = function() {
		      return this.take(MAX_ARRAY_LENGTH);
		    };

		    // Add `LazyWrapper` methods to `lodash.prototype`.
		    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
		      var checkIteratee = /^(?:filter|find|map|reject)|While$/.test(methodName),
		          isTaker = /^(?:head|last)$/.test(methodName),
		          lodashFunc = lodash[isTaker ? ('take' + (methodName == 'last' ? 'Right' : '')) : methodName],
		          retUnwrapped = isTaker || /^find/.test(methodName);

		      if (!lodashFunc) {
		        return;
		      }
		      lodash.prototype[methodName] = function() {
		        var value = this.__wrapped__,
		            args = isTaker ? [1] : arguments,
		            isLazy = value instanceof LazyWrapper,
		            iteratee = args[0],
		            useLazy = isLazy || isArray(value);

		        var interceptor = function(value) {
		          var result = lodashFunc.apply(lodash, arrayPush([value], args));
		          return (isTaker && chainAll) ? result[0] : result;
		        };

		        if (useLazy && checkIteratee && typeof iteratee == 'function' && iteratee.length != 1) {
		          // Avoid lazy use if the iteratee has a "length" value other than `1`.
		          isLazy = useLazy = false;
		        }
		        var chainAll = this.__chain__,
		            isHybrid = !!this.__actions__.length,
		            isUnwrapped = retUnwrapped && !chainAll,
		            onlyLazy = isLazy && !isHybrid;

		        if (!retUnwrapped && useLazy) {
		          value = onlyLazy ? value : new LazyWrapper(this);
		          var result = func.apply(value, args);
		          result.__actions__.push({ 'func': thru, 'args': [interceptor], 'thisArg': undefined$1 });
		          return new LodashWrapper(result, chainAll);
		        }
		        if (isUnwrapped && onlyLazy) {
		          return func.apply(this, args);
		        }
		        result = this.thru(interceptor);
		        return isUnwrapped ? (isTaker ? result.value()[0] : result.value()) : result;
		      };
		    });

		    // Add `Array` methods to `lodash.prototype`.
		    arrayEach(['pop', 'push', 'shift', 'sort', 'splice', 'unshift'], function(methodName) {
		      var func = arrayProto[methodName],
		          chainName = /^(?:push|sort|unshift)$/.test(methodName) ? 'tap' : 'thru',
		          retUnwrapped = /^(?:pop|shift)$/.test(methodName);

		      lodash.prototype[methodName] = function() {
		        var args = arguments;
		        if (retUnwrapped && !this.__chain__) {
		          var value = this.value();
		          return func.apply(isArray(value) ? value : [], args);
		        }
		        return this[chainName](function(value) {
		          return func.apply(isArray(value) ? value : [], args);
		        });
		      };
		    });

		    // Map minified method names to their real names.
		    baseForOwn(LazyWrapper.prototype, function(func, methodName) {
		      var lodashFunc = lodash[methodName];
		      if (lodashFunc) {
		        var key = lodashFunc.name + '';
		        if (!hasOwnProperty.call(realNames, key)) {
		          realNames[key] = [];
		        }
		        realNames[key].push({ 'name': methodName, 'func': lodashFunc });
		      }
		    });

		    realNames[createHybrid(undefined$1, WRAP_BIND_KEY_FLAG).name] = [{
		      'name': 'wrapper',
		      'func': undefined$1
		    }];

		    // Add methods to `LazyWrapper`.
		    LazyWrapper.prototype.clone = lazyClone;
		    LazyWrapper.prototype.reverse = lazyReverse;
		    LazyWrapper.prototype.value = lazyValue;

		    // Add chain sequence methods to the `lodash` wrapper.
		    lodash.prototype.at = wrapperAt;
		    lodash.prototype.chain = wrapperChain;
		    lodash.prototype.commit = wrapperCommit;
		    lodash.prototype.next = wrapperNext;
		    lodash.prototype.plant = wrapperPlant;
		    lodash.prototype.reverse = wrapperReverse;
		    lodash.prototype.toJSON = lodash.prototype.valueOf = lodash.prototype.value = wrapperValue;

		    // Add lazy aliases.
		    lodash.prototype.first = lodash.prototype.head;

		    if (symIterator) {
		      lodash.prototype[symIterator] = wrapperToIterator;
		    }
		    return lodash;
		  });

		  /*--------------------------------------------------------------------------*/

		  // Export lodash.
		  var _ = runInContext();

		  // Some AMD build optimizers, like r.js, check for condition patterns like:
		  if (freeModule) {
		    // Export for Node.js.
		    (freeModule.exports = _)._ = _;
		    // Export for CommonJS support.
		    freeExports._ = _;
		  }
		  else {
		    // Export to the global object.
		    root._ = _;
		  }
		}.call(lodash)); 
	} (lodash$1, lodash$1.exports));
	return lodash$1.exports;
}

var lodashExports = requireLodash();

// Suggestion Dropdown

const debounceTimeout = 500;
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
  } = useFormikContext();
  const [inputValue, setInputValue] = useState(value);
  const [debouncedInputValue, setDebouncedInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);
  const {
    currentUser
  } = useUser();
  const {
    theme
  } = useAppContext();

  // This component's input field must be different to the external input field to enable value sync
  const nameInternal = "".concat(name, "_sdd");
  const filter_api_url = defaultValue(config, 'filter_api_url'); // Ex. "fda_food_query"
  const filter_api_request_method = String(defaultValue(config, "filter_api_request_method", "get")).toUpperCase(); // Ex. true or false
  const filter_search_param_name = defaultValue(config, 'filter_search_param_name'); // Ex. "food_name"
  const filter_search_other_param = defaultValue(config, 'filter_search_other_param'); // Ex. {"autocomplete": "1"}
  const suggestion_id_fieldname = defaultValue(config, "suggestion_id_fieldname"); // Ex. "id"
  const suggestion_desc_fieldname = defaultValue(config, "suggestion_desc_fieldname"); // Ex. "description"
  const suggestion_name_fieldname = defaultValue(config, "suggestion_name_fieldname", suggestion_desc_fieldname); // Ex. "description"
  const autocomplete_fields = defaultValue(config, "autocomplete_fields", {});
  useEffect(() => {
    if (debouncedInputValue) {
      // Get suggestions from external source
      const dbService = new dbApiService({
        url: filter_api_url
      });
      let urlParams = {};
      let bodyData = replaceSpecialVars(filter_search_other_param, currentUser);
      bodyData[filter_search_param_name] = debouncedInputValue;
      if (filter_api_request_method === "GET") {
        urlParams = Object.assign({}, bodyData);
        bodyData = {};
      }
      dbService.getAll(urlParams, bodyData, filter_api_request_method).then(response => {
        if (typeof response.resultset == "string") {
          setSuggestions([]);
        } else {
          setSuggestions(response.resultset);
        }
      }).catch(error => console.error(error));
    }
  }, [debouncedInputValue, filter_api_url, filter_search_other_param, filter_search_param_name, name, setFieldValue, filter_api_request_method, currentUser]);
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
      setDebouncedInputValue(newInputValue);
    }
  };
  const inputValueChange = newInputValue => {
    setFieldValue(name, newInputValue);
    setInputValue(newInputValue);
  };
  const updateDebouncedInputValue = useMemo(() => lodashExports.debounce(value => setDebouncedInputValue(value), debounceTimeout), []);
  const onInputValueChangeInternal = newInputValue => {
    inputValueChange(newInputValue);
    updateDebouncedInputValue(newInputValue);
  };
  const {
    isOpen,
    getMenuProps,
    getInputProps,
    highlightedIndex,
    getItemProps,
    selectedItem
  } = useCombobox({
    items: suggestions,
    inputValue,
    onInputValueChange: _ref3 => {
      let {
        inputValue: newInputValue
      } = _ref3;
      onInputValueChangeInternal(newInputValue);
    },
    onSelectedItemChange: _ref4 => {
      let {
        selectedItem
      } = _ref4;
      handleSuggestionSelected(selectedItem);
    },
    itemToString: item => item ? item[suggestion_name_fieldname] : inputValue,
    id: name
  });
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(SUGGESTION_DROPDOWN_CLASS, " ").concat(className || "", " ").concat(theme.input)
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", getInputProps({
    className: "".concat(APP_FORMPAGE_FIELD_BASE_CLASS, " ").concat(disabled ? DISABLE_FIELD_BACKGROUND_COLOR_CLASS : "", " ").concat(inputValue && suggestions.length === 0 ? IS_INVALID_CLASS : ""),
    disabled: disabled,
    required: required,
    name: nameInternal
  })), /*#__PURE__*/React.createElement("ul", getMenuProps(), isOpen && suggestions.map((suggestion, index) => /*#__PURE__*/React.createElement("li", getItemProps({
    key: convertId(suggestion[suggestion_id_fieldname]),
    index,
    item: suggestion,
    style: {
      backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
      fontWeight: selectedItem === suggestion ? 'bold' : 'normal'
    }
  }), suggestion[suggestion_desc_fieldname]))))), inputValue && suggestions.length === 0 && /*#__PURE__*/React.createElement("div", {
    className: INVALID_FEEDBACK_CLASS
  }, "Error: No suggestions found."));
};

var generic_editor_rfc_suggestion_dropdown = /*#__PURE__*/Object.freeze({
  __proto__: null,
  SuggestionDropdown: SuggestionDropdown
});

const _excluded$1 = ["resultset"];
let calcFields = {};
const formPageReducer = (state, action) => {
  switch (action.type) {
    case 'SET_FORM_DATA':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        formData: action.payload
      });
    case 'SET_ERROR_STATUS':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        errorStatus: action.payload
      });
    case 'INCREMENT_REFRESH':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        refresh: state.refresh + 1
      });
    case 'SET_FORM_MSG':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        formMsg: action.payload
      });
    case 'SET_ITEM_READ':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        itemRead: action.payload
      });
    default:
      return state;
  }
};
const editFormReducer = (state, action) => {
  switch (action.type) {
    case 'SET_EDIT_FORM_DATA':
      return _objectSpread2(_objectSpread2({}, state), action.payload);
    default:
      return state;
  }
};
const FormPage = _ref => {
  let {
    editor,
    mode,
    id,
    onCancel,
    setInfoMsg,
    handleFormPageActions = null,
    message = "",
    messageType = ""
  } = _ref;
  const [state, dispatch] = useReducer(formPageReducer, {
    formData: null,
    errorStatus: {
      error: "",
      code: ""
    },
    refresh: 0,
    formMsg: {
      message: message,
      messageType: messageType
    },
    itemRead: false
  });
  const {
    formData,
    errorStatus,
    refresh,
    formMsg,
    itemRead
  } = state;
  const {
    currentUser
  } = useUser();
  const {
    theme
  } = useAppContext();
  const dataAlreadyLoaded = useRef(false);
  const setFormData = payload => dispatch({
    type: 'SET_FORM_DATA',
    payload
  });
  const setErrorStatus = (errorMessage, errorCode) => dispatch({
    type: 'SET_ERROR_STATUS',
    payload: {
      error: getErrorMsgFromApi(errorMessage),
      code: errorCode
    }
  });
  const setRefresh = () => {
    dispatch({
      type: 'INCREMENT_REFRESH'
    });
    dataAlreadyLoaded.current = false;
  };
  const setFormMsg = payload => dispatch({
    type: 'SET_FORM_MSG',
    payload
  });
  const {
    debugCache
  } = useContext(MainSectionContext);
  const initForm = () => {
    if (dataAlreadyLoaded.current) {
      return;
    }
    dataAlreadyLoaded.current = true;
    if (mode === ACTION_CREATE) {
      // To assign specific default values in creation...
      processGenericFuncArray(editor, 'dbPreRead', {}, mode, currentUser).then(funcResponse => {
        setFormData(funcResponse.fieldValues);
      }, error => setErrorStatus(error, '[GCE-FD-010]'));
    }
    if (mode === ACTION_UPDATE || mode === ACTION_READ || mode === ACTION_DELETE) {
      let accessKeysDataScreen = {};
      accessKeysDataScreen[editor.primaryKeyName] = id;
      processGenericFuncArray(editor, 'dbPreRead', accessKeysDataScreen, mode, currentUser).then(funcResponse => {
        const _funcResponse$fieldVa = funcResponse.fieldValues,
          {
            resultset
          } = _funcResponse$fieldVa,
          fieldValuesWithoutResultSet = _objectWithoutProperties(_funcResponse$fieldVa, _excluded$1);
        accessKeysDataScreen = Object.assign({}, fieldValuesWithoutResultSet, editor.endpointFilter);
        editor.db.getOne(accessKeysDataScreen).then(data => {
          // To assign specific default values in update, read or delete...
          processGenericFuncArray(editor, 'dbPostRead', data, mode, currentUser).then(funcResponse => {
            setFormData(funcResponse.fieldValues);
          }, error => {
            console.error('ERROR on dbPostRead - GCE-FD-020', error);
            setErrorStatus(error, '[GCE-FD-020]');
          });
        }, error => {
          console.error('ERROR on getOne - GCE-FD-030', error);
          setErrorStatus(error, '[GCE-FD-030]');
        });
      }, error => {
        console.error('ERROR on dbPreRead - GCE-FD-040', error);
        setErrorStatus(error, '[GCE-FD-040]');
      });
    }
  };
  useEffect(() => {
    initForm();
  }, [refresh]);
  if (handleFormPageActions === null) {
    handleFormPageActions = funcResponse => {
      if (typeof funcResponse['otherData']['refresh'] != "undefined") {
        setRefresh();
        setFormMsg({
          message: '',
          messageType: ''
        });
      }
    };
  }
  if (!editor) {
    return WaitAnimation(WAIT_ANIMATION_MARGIN_TOP_CLASS);
  }
  if (!formData && !errorStatus.error) {
    return WaitAnimation(WAIT_ANIMATION_MARGIN_TOP_CLASS);
  }
  const editorFlags = getEditorFlags(mode);
  const actionTitle = mode === ACTION_CREATE ? MSG_ACTION_CREATE : mode === ACTION_UPDATE ? MSG_ACTION_UPDATE : mode === ACTION_READ ? MSG_ACTION_READ : MSG_ACTION_DELETE;
  return /*#__PURE__*/React.createElement("div", {
    className: "".concat(APP_TOP_DIV_CLASS, " ").concat(theme.contentBg)
  }, /*#__PURE__*/React.createElement(CrudEditorFormPageTitle, {
    baseUrl: editor.baseUrl,
    title: editor.title,
    actionTitle: actionTitle
  }), errorStatus.error && /*#__PURE__*/React.createElement(React.Fragment, null, errorAndReEnter(errorStatus.error, errorStatus.code)), !errorStatus.error && formData && /*#__PURE__*/React.createElement(EditFormFormik, {
    editor: editor,
    parenHandleCancel: onCancel,
    setInfoMsg: setInfoMsg,
    action: mode,
    dataset: formData.resultset,
    message: formMsg['message'],
    messageType: formMsg['messageType'],
    handleFormPageActions: handleFormPageActions,
    theme: theme,
    currentUser: currentUser
  }), !errorStatus.error && formData && !editorFlags.isCreate && iterateChildComponents(editor, formData.resultset, handleFormPageActions), '');
};
const CrudEditorFormPageTitle = _ref2 => {
  let {
    baseUrl,
    title,
    actionTitle
  } = _ref2;
  return /*#__PURE__*/React.createElement("h2", {
    key: "".concat(baseUrl, "_title"),
    className: APP_TITLE_H1_CLASS
  }, title + " - " + actionTitle);
};
const GetHTag = _ref3 => {
  let {
    tag,
    children
  } = _ref3;
  return /*#__PURE__*/React.createElement(tag, {
    children
  });
};
const PutOneFormfield = _ref4 => {
  let {
    currentObjArray,
    componentSelectFieldsOptions,
    editorFlags,
    errors,
    touched,
    initialValue,
    theme,
    dbRow
  } = _ref4;
  const {
    setFieldValue
  } = useFormikContext();
  let currentObj = currentObjArray[1];
  const labelClass = APP_FORMPAGE_LABEL_CLASS + " " + theme.label;
  const labelClassRequiredFld = APP_FORMPAGE_LABEL_REQUIRED_CLASS;
  const divFieldClass = APP_FORMPAGE_FIELD_CLASS + " " + theme.label;
  const fieldClass = errors[currentObj.name] && touched[currentObj.name] ? APP_FORMPAGE_FIELD_INVALID_CLASS : APP_FORMPAGE_FIELD_GOOD_CLASS + " " + theme.input;
  const readOnlyfield = editorFlags.isReadOnly || typeof currentObj.readonly !== "undefined" && currentObj.readonly;
  if (typeof currentObj.hidden !== "undefined" && currentObj.hidden) {
    return /*#__PURE__*/React.createElement(Field, {
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
  const customOnChange = e => {
    // This allows "component" fields to updated the Formik form values
    setFieldValue(e.target.name, e.target.value);
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
  let elementError = /*#__PURE__*/React.createElement(ErrorMessage, {
    name: idName,
    component: "div",
    className: INVALID_FEEDBACK_CLASS
  });
  switch (currentObj.type) {
    case 'select_component':
      elementInput = /*#__PURE__*/React.createElement(Field, {
        name: idName,
        id: idName,
        as: "select",
        disabled: readOnlyfield,
        required: currentObj.required && !readOnlyfield,
        className: fieldClass,
        onBlur: runCalculation
      }, /*#__PURE__*/React.createElement(currentObj.component, {
        currentObj: currentObj,
        dbRow: dbRow
      }));
      break;
    case 'select':
      elementInput = /*#__PURE__*/React.createElement(Field, {
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
        value: initialValue,
        name: idName,
        id: idName,
        disabled: readOnlyfield,
        required: currentObj.required && !readOnlyfield,
        readOnly: readOnlyfield,
        className: fieldClass,
        onBlur: runCalculation,
        showAsField: "1",
        onChange: customOnChange,
        setValue: setFieldValue,
        currentObj: currentObj,
        dbRow: dbRow
      });
      break;
    case 'suggestion_dropdown':
      idName = "".concat(currentObj.name, "-input");
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
    case 'h1':
    case 'h2':
    case 'h3':
    case 'h4':
    case 'h5':
    case 'h6':
      elementLabel = '';
      elementError = '';
      elementInput = /*#__PURE__*/React.createElement(GetHTag, {
        tag: currentObj.type,
        key: idName
      }, currentObj.label);
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
        elementInput = /*#__PURE__*/React.createElement(Field, {
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
    }, elementInput, chatbot_popup && currentObj.aux_component !== null && /*#__PURE__*/React.createElement(ChatBotButtonGeneric, {
      AuxComponent: currentObj.aux_component,
      valueElement: idName,
      chatbotPrompt: chatbot_prompt
    }), google_popup && /*#__PURE__*/React.createElement(SearchEngineButton, {
      valueElement: idName,
      googlePrompt: google_prompt
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    key: currentObj.name,
    className: divFieldClass
  }, elementLabel, elementInput, elementError);
};
const EditFormFormik = _ref5 => {
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
  } = _ref5;
  const [state, dispatch] = useReducer(editFormReducer, {
    readyToShow: false,
    dataset: null,
    canCommit: null,
    message: null,
    messageType: null
  });
  const {
    readyToShow,
    dataset: editDataset,
    canCommit,
    message: editMessage,
    messageType: editMessageType
  } = state;
  const setFormData = payload => dispatch({
    type: 'SET_EDIT_FORM_DATA',
    payload
  });
  useEffect(() => {
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
  if (!readyToShow) {
    return WaitAnimation(WAIT_ANIMATION_MARGIN_TOP_CLASS);
  }
  let finalCanCommit = canCommit;
  if (finalCanCommit === null) {
    finalCanCommit = false;
  }
  let finalMessage = editMessage;
  if (finalMessage === null) {
    finalMessage = message;
  }
  let finalMessageType = editMessageType;
  if (finalMessageType === null || finalMessageType === '') {
    finalMessageType = messageType;
  }
  return EditFormFormikFinal({
    editor: editor,
    parenHandleCancel: parenHandleCancel,
    setInfoMsg: setInfoMsg,
    action: action,
    dataset: editDataset,
    canCommit: finalCanCommit,
    message: finalMessage,
    messageType: finalMessageType,
    handleFormPageActions: handleFormPageActions,
    theme: theme,
    currentUser: currentUser
  });
};
const EditFormFormikFinal = _ref6 => {
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
  } = _ref6;
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
  return /*#__PURE__*/React.createElement(Formik, {
    key: editor.name,
    enableReinitialize: true,
    initialValues: initialFieldValues
    //
    // TODO: getFieldElementsYupValidations didn't work with action=CREATION, at least on 2023-11-12
    //
    ,
    validationSchema: Yup.object().shape(getFieldElementsYupValidations(editor, editorFlags)),
    onSubmit: (submitedtElements, _ref7) => {
      let {
        setStatus,
        setSubmitting
      } = _ref7;
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
            submitedtElements = _objectSpread2({}, funcResponse.fieldValues);
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
                  setStatus(getErrorMsgFromApi(error, '[EFFF-010]'));
                });
              }
            }, error => {
              console_debug_log('saveRowToDatabase [EFFF-020] | error:', error);
              setSubmitting(false);
              setStatus(getErrorMsgFromApi(error, '[EFFF-020]'));
            });
          }, error => {
            console_debug_log('dbPreWrite [EFFF-030] | error:', error);
            setSubmitting(false);
            setStatus(getErrorMsgFromApi(error, '[EFFF-030]'));
          });
        }, error => {
          console_debug_log('validations [EFFF-040] | error:', error);
          setSubmitting(false);
          setStatus(getErrorMsgFromApi(error, '[EFFF-040]'));
        });
      }
    }
  }, _ref8 => {
    let {
      errors,
      status,
      touched,
      isSubmitting
    } = _ref8;
    return /*#__PURE__*/React.createElement(Form, {
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
        theme: theme,
        dbRow: dataset
      });
    }), /*#__PURE__*/React.createElement("div", {
      className: APP_FORMPAGE_FORM_BUTTON_BAR_CLASS
    }, !editorFlags.isRead && canCommit && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GsButton, {
      key: "SubmitButton",
      type: "submit",
      className: BUTTON_PRIMARY_CLASS,
      disabled: isSubmitting
    }, editorFlags.isCreate ? MSG_ACTION_CREATE : editorFlags.isDelete ? MSG_ACTION_DELETE : MSG_ACTION_UPDATE), isSubmitting && WaitAnimation(WAIT_ANIMATION_MARGIN_TOP_CLASS)), /*#__PURE__*/React.createElement(GsButton, {
      key: "CancelButton",
      variant: "secondary",
      disabled: isSubmitting,
      onClick: handleCancel
    }, MSG_ACTION_CANCEL)), status && /*#__PURE__*/React.createElement("div", {
      className: ERROR_MSG_CLASS
    }, errorAndReEnter(status)));
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
    }, /*#__PURE__*/React.createElement("hr", null), /*#__PURE__*/React.createElement(ChildElement, {
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
    // Add the parent id to the child object
    rowToSave = editor.endpointKeyNames.reduce((acc, keyPair) => {
      acc[keyPair.parameterName] =
      // parent table 'id' field name
      editor.parentData[keyPair.parentElementName]; // parent table 'id' value
      return _objectSpread2({}, acc);
    }, {});
    if (editor.subType === "array") {
      // Build the format for child array
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
      rowToSave[editor.array_name] = submitedtElements; // array object in the parent row with new values
      rowToSave[editor.array_name + "_old"] = initialValues; // array object in the parent row with initial values
    } else {
      // Build the format for child external table, merging the parent id to the child object
      rowToSave = _objectSpread2(_objectSpread2({}, submitedtElements), rowToSave);
    }
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
  let dataset = {};
  if (typeof datasetRaw !== 'undefined') {
    dataset = Object.assign({}, datasetRaw);
  }
  if (editor.subType === "array") {
    if (typeof datasetRaw[0] !== 'undefined') {
      dataset = Object.assign({}, datasetRaw[0]);
    }
  }
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
      case 'label':
      case 'hr':
      case 'h1':
      case 'h2':
      case 'h3':
      case 'h4':
      case 'h5':
      case 'h6':
        // Excluded types
        break;
      default:
        acc[currentObj.name] = responseObj;
    }
    return _objectSpread2({}, acc);
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
  const response = editor.fieldElements.filter(currentObj => {
    return !["label", "hr", "h1", "h2", "h3", "h4", "h5", "h6"].includes(currentObj.type);
  }).reduce((acc, currentObj) => {
    let responseObj = Yup; // https://github.com/jquense/yup
    switch (currentObj.type) {
      case 'number':
        responseObj = responseObj.number("".concat(currentObj.label, " ").concat(MSG_MUST_BE, " ").concat(MSG_VALID_NUMBER));
        break;
      case 'integer':
        responseObj = responseObj.number().integer("".concat(currentObj.label, " ").concat(MSG_MUST_BE, " ").concat(MSG_VALID_INTEGER));
        break;
      case 'date':
        responseObj = responseObj.date("".concat(currentObj.label, " ").concat(MSG_MUST_BE, " ").concat(MSG_VALID_DATE));
        break;
      case 'email':
        responseObj = responseObj.string().email("".concat(currentObj.label, " ").concat(MSG_MUST_BE, " ").concat(MSG_VALID_EMAIL));
        break;
      case 'text':
      default:
        responseObj = responseObj.string();
    }
    if (currentObj.required) {
      responseObj = responseObj.required("".concat(currentObj.label, " ").concat(MSG_IS_REQUIRED));
    }
    acc[currentObj.name] = responseObj;
    return _objectSpread2({}, acc);
  }, {});
  return response;
};

var generic_editor_rfc_formpage = /*#__PURE__*/Object.freeze({
  __proto__: null,
  FormPage: FormPage
});

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
  const [searchText, setSearchText] = useState(value);
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
          filterDict = _objectSpread2(_objectSpread2({}, filterDict), newElement);
        }
        return _objectSpread2({}, filterDict);
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
    placeholder: "".concat(MSG_SEARCH, "..."),
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

const debug$1 = false;
const initialState$1 = {
  editor: null,
  rows: null,
  currentPage: 1,
  rowsPerPage: 10,
  formMode: [ACTION_LIST, null],
  status: "",
  infoMsg: "",
  searchFilters: {},
  searchText: ""
};
function gceReducer(state, action) {
  switch (action.type) {
    case 'SET_EDITOR':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        editor: action.payload
      });
    case 'SET_ROWS':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        rows: action.payload
      });
    case 'SET_CURRENT_PAGE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        currentPage: action.payload
      });
    case 'SET_ROWS_PER_PAGE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        rowsPerPage: action.payload
      });
    case 'SET_FORM_MODE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        formMode: action.payload
      });
    case 'SET_STATUS':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        status: action.payload
      });
    case 'SET_INFO_MSG':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        infoMsg: action.payload
      });
    case 'SET_SEARCH_FILTERS':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        searchFilters: action.payload
      });
    case 'SET_SEARCH_TEXT':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        searchText: action.payload
      });
    case 'HANDLE_CANCEL':
      {
        const {
          config
        } = action.payload;
        let newState = _objectSpread2({}, state);
        if (typeof config['searchFilters'] !== 'undefined') {
          newState.searchFilters = config['searchFilters'];
          newState.searchText = config['searchText'];
        }
        if (typeof config['nextAction'] !== 'undefined') {
          newState.formMode = [config['nextAction'], config['id'], config['infoMsg'], "INFO"];
        } else {
          newState.formMode = [ACTION_LIST, null];
        }
        return newState;
      }
    default:
      return state;
  }
}
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
  const [state, dispatch] = useReducer(gceReducer, _objectSpread2(_objectSpread2({}, initialState$1), {}, {
    rowsPerPage: parseInt(getLocalConfigItem("gce_rows_per_page")) || 10
  }));
  const {
    editor,
    rows,
    currentPage,
    rowsPerPage,
    formMode,
    status,
    infoMsg,
    searchFilters,
    searchText
  } = state;
  const setStatus = p => dispatch({
    type: 'SET_STATUS',
    payload: p
  });
  const setEditor = p => dispatch({
    type: 'SET_EDITOR',
    payload: p
  });
  const setRows = p => dispatch({
    type: 'SET_ROWS',
    payload: p
  });
  const setInfoMsg = p => dispatch({
    type: 'SET_INFO_MSG',
    payload: p
  });
  const setFormMode = p => dispatch({
    type: 'SET_FORM_MODE',
    payload: p
  });
  const setCurrentPage = p => dispatch({
    type: 'SET_CURRENT_PAGE',
    payload: p
  });
  const setRowsPerPage = p => dispatch({
    type: 'SET_ROWS_PER_PAGE',
    payload: p
  });
  const {
    initCache,
    debugCache
  } = useContext(MainSectionContext);
  const {
    currentUser
  } = useUser();
  const {
    theme,
    isWide
  } = useAppContext();
  const actionsHandlerAllowsMouseOver = getLocalConfigItem("gce_actions_allows_mouse_over") == '1';
  const actionsHandlerAllowsMagicButton = getLocalConfigItem("gce_actions_allows_magic_button") == '1';
  useEffect(() => {
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
      setStatus(errorAndReEnter(getErrorMsgFromApi(error), null));
    });
  }, []);
  useEffect(() => {
    if (editor && formMode[0] === ACTION_LIST) {
      const animationElementId = editor.baseUrl + "_pagination" + "_nav_animation";
      ShowHideWaitAnimation(true, animationElementId);
      let accessKeysListing = {
        page: currentPage,
        limit: rowsPerPage
      };
      // dbListPreRead: To set a Listing filters, assign funcResponse.fieldValues[db_field]=filter_value
      processGenericFuncArray(editor, 'dbListPreRead', accessKeysListing, formMode, currentUser).then(funcResponse => {
        accessKeysListing = Object.assign({}, accessKeysListing, editor.endpointFilter, searchFilters, funcResponse.fieldValues);
        editor.db.getAll(accessKeysListing).then(data => {
          ShowHideWaitAnimation(false, animationElementId);
          // dbListPostRead: To fix Listing fields
          processGenericFuncArray(editor, 'dbListPostRead', data, formMode, currentUser).then(funcResponse => setRows(funcResponse.fieldValues), error => setStatus(errorAndReEnter(getErrorMsgFromApi(error), null)));
        }, error => {
          console_debug_log("GenericCrudEditor / Listing - ERROR:");
          console.error(error);
          ShowHideWaitAnimation(false, animationElementId);
          setStatus(errorAndReEnter(getErrorMsgFromApi(error), null));
        });
      }, error => {
        console_debug_log("GenericCrudEditor / dbListPreRead - ERROR:");
        console.error(error);
        setStatus(errorAndReEnter(getErrorMsgFromApi(error), null));
      });
    }
  }, [currentPage, rowsPerPage, editor, formMode, searchFilters]);
  const handleCancel = function () {
    let config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    dispatch({
      type: 'HANDLE_CANCEL',
      payload: {
        config
      }
    });
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
    saveLocalConfig({
      "gce_rows_per_page": event.target.value
    });
    setInfoMsg('');
    setRowsPerPage(event.target.value);
  };
  const handleRefresh = newPage => {
    // select_cache = {};
    initCache();
    windowLocationReload(true);
  };
  const rowId = row => {
    const rowIdVar = typeof row._id === 'undefined' ? row[editor.primaryKeyName] : editor.db.convertId(row._id);
    const response = typeof rowIdVar === 'undefined' ? getHash(JSON.stringify(row)) : rowIdVar;
    if (typeof rowIdVar === 'undefined') {
      console.error("ERROR [GCE-M-060]: row does not have '_id' nor '".concat(editor.primaryKeyName, "' | Editor: ").concat(editor.name, " | Row: ").concat(JSON.stringify(row)));
    }
    return response;
  };
  const actionsHandler = (mode, row) => {
    const currentRowId = rowId(row);
    const element = document.getElementById("".concat(editor.baseUrl, "_row_").concat(currentRowId, "_controls"));
    const currRowHadHiddenClass = element.classList.contains('hidden');
    const magicButtonElement = document.getElementById("".concat(editor.baseUrl, "_row_").concat(currentRowId, "_magicButton"));
    const rowElement = document.getElementById("".concat(editor.baseUrl, "_row_").concat(currentRowId, "_row"));
    const bgColorStype = ['bg-slate-300', 'odd:bg-slate-300'];
    if (mode === 'show') {
      // Highlight row
      bgColorStype.map(key => {
        rowElement.classList.add(key);
      });
      // If mouse over allowed, show controls
      if (actionsHandlerAllowsMouseOver) {
        if (actionsHandlerAllowsMagicButton) {
          magicButtonElement.classList.add('hidden');
        }
        element.classList.remove('hidden');
      }
    }
    if (mode === 'hide') {
      // Remove row highlight
      bgColorStype.map(key => {
        rowElement.classList.remove(key);
      });
      // If mouse over allowed, hide controls
      if (actionsHandlerAllowsMouseOver) {
        if (actionsHandlerAllowsMagicButton) {
          magicButtonElement.classList.remove('hidden');
        }
        element.classList.add('hidden');
      }
    }
    if (mode === 'toggle') {
      // Turn off previous opened controls
      rows.resultset.map(thisRow => {
        const thisRowElement = document.getElementById("".concat(editor.baseUrl, "_row_").concat(rowId(thisRow), "_controls"));
        if (!thisRowElement.classList.contains('hidden')) {
          thisRowElement.classList.add('hidden');
        }
      });
      if (currRowHadHiddenClass) {
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
    return WaitAnimation(WAIT_ANIMATION_MARGIN_TOP_CLASS);
  }
  if (!rows && !status) {
    return WaitAnimation(WAIT_ANIMATION_MARGIN_TOP_CLASS);
  }
  if (status) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, status, debug$1);
  }
  if (rows && typeof rows['totalPages'] !== 'undefined' && rows['totalPages'] == null) {
    return 'Rows ok but not totalPages - ERROR # 3';
  }
  if (formMode[0] !== ACTION_LIST) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormPage, {
      mode: formMode[0],
      id: formMode[1],
      onCancel: handleCancel,
      setInfoMsg: setInfoMsg,
      editor: editor,
      handleFormPageActions: props.handleFormPageActions,
      message: typeof formMode[2] !== 'undefined' ? formMode[2] : '',
      messageType: typeof formMode[3] !== 'undefined' ? formMode[3] : ''
    }));
  }
  return /*#__PURE__*/React.createElement("div", {
    key: "".concat(editor.baseUrl, "_top_div"),
    className: "".concat(APP_TOP_DIV_CLASS, " ").concat(theme.contentBg)
  }, infoMsg && /*#__PURE__*/React.createElement("div", {
    key: "".concat(editor.baseUrl, "_info_msg"),
    className: INFO_MSG_CLASS
  }, /*#__PURE__*/React.createElement("div", null, infoMsg), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    onClick: () => setInfoMsg(''),
    className: INFO_MSG_BUTTON_CLASS
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "x",
    alt: MSG_CLOSE
  })))), rows && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CrudEditorListingTitle, {
    baseUrl: editor.baseUrl,
    title: editor.title,
    handleRefresh: handleRefresh
  }), /*#__PURE__*/React.createElement("div", {
    key: "".concat(editor.baseUrl, "_level2_div"),
    className: APP_LEVEL2_DIV_CLASS
  }, /*#__PURE__*/React.createElement("table", {
    key: "".concat(editor.baseUrl, "_table"),
    className: APP_LISTING_TABLE_CLASS
  }, /*#__PURE__*/React.createElement("thead", {
    key: "".concat(editor.baseUrl, "_thead"),
    className: APP_LISTING_TABLE_HDR_THEAD_CLASS
  }, /*#__PURE__*/React.createElement("tr", {
    key: "".concat(editor.baseUrl, "_thead_tr"),
    className: APP_LISTING_TABLE_HDR_TR_CLASS
  }, actionsHandlerAllowsMagicButton && /*#__PURE__*/React.createElement("th", {
    // scope="col"
    key: "".concat(editor.baseUrl, "_actions"),
    className: APP_LISTING_TABLE_HDR_TH_CLASS
  }, /*#__PURE__*/React.createElement("div", {
    key: "".concat(editor.baseUrl, "_actions_div"),
    className: APP_LISTING_TABLE_HRD_ACTIONS_COL_CLASS
  }, " ")), Object.keys(editor.fieldElements).map(key => editor.fieldElements[key].listing && /*#__PURE__*/React.createElement("th", {
    // scope="col"
    key: "".concat(editor.baseUrl, "_").concat(key, "_thead_th"),
    className: APP_LISTING_TABLE_HDR_TH_CLASS
  }, editor.fieldElements[key].label)))), /*#__PURE__*/React.createElement("tbody", {
    key: "".concat(editor.baseUrl, "_tbody"),
    className: APP_LISTING_TABLE_BODY_TBODY_CLASS
  }, rows && typeof rows.resultset !== 'undefined' && rows.resultset.map((row, index) => {
    // To avoid use of "<>" to group two "<tr>" (one for the row and one for the actions)
    // because it throws the warning:
    //    "Warning: Each child in a list should have a unique "key" prop."
    // we use <React.Fragment> instead
    const uniqueRowId = rowId(row);
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_tr_enclosure")
    }, /*#__PURE__*/React.createElement("tr", {
      id: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_row"),
      key: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_row"),
      className: index % 2 ? "".concat(APP_LISTING_TABLE_BODY_TR_ODD_CLASS) : "".concat(theme.secondary, " ").concat(APP_LISTING_TABLE_BODY_TR_EVEN_CLASS),
      onMouseOver: () => {
        actionsHandler('show', row);
      },
      onClick: () => {
        actionsHandler('toggle', row);
      },
      onMouseLeave: () => {
        actionsHandler('hide', row);
      }
    }, actionsHandlerAllowsMagicButton && /*#__PURE__*/React.createElement("td", {
      // Action buttons
      key: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_magicButton_td")
      // colSpan={Object.keys(editor.fieldElements).length + 1}
      ,
      className: index % 2 ? APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS : APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS
    }, /*#__PURE__*/React.createElement("div", {
      id: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_magicButton"),
      key: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_magicButton"),
      className: VISIBLE_CLASS
    }, /*#__PURE__*/React.createElement(GsIcons, {
      icon: "menu-dots-more",
      alt: MSG_MORE
    }))), Object.keys(editor.fieldElements).map(key => editor.fieldElements[key].listing && /*#__PURE__*/React.createElement("td", {
      key: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_").concat(key, "_td"),
      className: index % 2 ? APP_LISTING_TABLE_BODY_TD_ODD_CLASS : APP_LISTING_TABLE_BODY_TD_EVEN_CLASS
    }, getSelectDescription(editor.fieldElements[key], row) // Show column value or select description
    ))), /*#__PURE__*/React.createElement("tr", {
      id: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_controls"),
      key: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_controls"),
      className: (index % 2 ? APP_LISTING_TABLE_BODY_TR_ACTIONS_ODD_CLASS : "".concat(theme.secondary, " ").concat(APP_LISTING_TABLE_BODY_TR_ACTIONS_EVEN_CLASS)) + " " + HIDDEN_CLASS,
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
      key: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_controls_td"),
      colSpan: Object.keys(editor.fieldElements).length + 1,
      className: index % 2 ? APP_LISTING_TABLE_BODY_TD_ACTIONS_ODD_CLASS : APP_LISTING_TABLE_BODY_TD_ACTIONS_EVEN_CLASS
    }, /*#__PURE__*/React.createElement("button", {
      key: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_controls_eye"),
      onClick: () => handleView(uniqueRowId),
      className: "".concat(BUTTON_LISTING_CLASS)
    }, /*#__PURE__*/React.createElement(GsIcons, {
      icon: "eye",
      alt: MSG_ACTION_READ
    })), /*#__PURE__*/React.createElement("button", {
      key: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_controls_edit"),
      onClick: () => handleModify(uniqueRowId),
      className: "".concat(BUTTON_LISTING_CLASS)
    }, /*#__PURE__*/React.createElement(GsIcons, {
      icon: "edit",
      alt: MSG_ACTION_EDIT
    })), /*#__PURE__*/React.createElement("button", {
      key: "".concat(editor.baseUrl, "_row_").concat(uniqueRowId, "_controls_trash"),
      onClick: () => handleDelete(uniqueRowId),
      className: "".concat(BUTTON_LISTING_CLASS)
    }, /*#__PURE__*/React.createElement(GsIcons, {
      icon: "trash",
      alt: MSG_ACTION_DELETE
    })))));
  })))), /*#__PURE__*/React.createElement("div", {
    key: "".concat(editor.baseUrl, "_toolbar"),
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
  }, Array.from({
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
    className: "".concat(currentPage === 1 ? BUTTON_LISTING_DISABLED_CLASS : BUTTON_LISTING_CLASS)
  }, /*#__PURE__*/React.createElement(GsIcons, {
    icon: "less-than",
    alt: MSG_PREVIOUS
  })), /*#__PURE__*/React.createElement("div", {
    className: APP_LISTING_TOOLBAR_PAGE_NUM_SECTION_CLASS
  }, MSG_PAGE, " ", currentPage, totalPages > 0 ? " ".concat(MSG_OF, " ").concat(totalPages) : ''), /*#__PURE__*/React.createElement("button", {
    disabled: currentPage >= totalPages,
    onClick: () => goToNewPage(currentPage + 1),
    className: "".concat(currentPage >= totalPages ? BUTTON_LISTING_DISABLED_CLASS : BUTTON_LISTING_CLASS)
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
    key: "".concat(baseUrl, "_title"),
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

var BILLING_PLANS$1 = {
	free: "Free",
	basic: "Basic",
	premium: "Premium"
};
var ERROR_MESSAGES$1 = {
	ACCOUNT_INACTIVE: "User account inactive [L5]. To activate your account, please contact support@exampleapp.com"
};
var APP_EMAILS$2 = {
	SUPPORT_EMAIL: "support@exampleapp.com",
	INFO_EMAIL: "info@exampleapp.com"
};
var APP_VALID_URLS$2 = {
	APP_DOMAIN: "exampleapp.com",
	APP_WEBSITE: "https://www.exampleapp.com"
};
var constants = {
	BILLING_PLANS: BILLING_PLANS$1,
	ERROR_MESSAGES: ERROR_MESSAGES$1,
	APP_EMAILS: APP_EMAILS$2,
	APP_VALID_URLS: APP_VALID_URLS$2
};

const BILLING_PLANS = buildConstant(constants.BILLING_PLANS);
const ERROR_MESSAGES = constants.ERROR_MESSAGES;
const APP_EMAILS$1 = constants.APP_EMAILS;
const APP_VALID_URLS$1 = constants.APP_VALID_URLS;

var app_constants = /*#__PURE__*/Object.freeze({
  __proto__: null,
  APP_EMAILS: APP_EMAILS$1,
  APP_VALID_URLS: APP_VALID_URLS$1,
  BILLING_PLANS: BILLING_PLANS,
  ERROR_MESSAGES: ERROR_MESSAGES
});

var baseUrl$5 = "users_api_keys";
var title$5 = "User API Keys";
var name$5 = "User's API Key";
var dbApiUrl$5 = "users_api_keys";
var component$5 = "UsersApiKey";
var type$2 = "child_listing";
var subType$2 = "table";
var endpointKeyNames$2 = [
	{
		parameterName: "user_id",
		parentElementName: "id"
	}
];
var primaryKeyName$2 = "id";
var defaultOrder$3 = "access_token";
var fieldElements$5 = [
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
		name: "access_token",
		required: true,
		label: "Access Token",
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
		default_value: "1",
		readonly: false,
		listing: true
	}
];
var dbPreRead = [
	"UsersApiKeyDbPreRead"
];
var users_api_keys = {
	baseUrl: baseUrl$5,
	title: title$5,
	name: name$5,
	dbApiUrl: dbApiUrl$5,
	component: component$5,
	type: type$2,
	subType: subType$2,
	endpointKeyNames: endpointKeyNames$2,
	primaryKeyName: primaryKeyName$2,
	defaultOrder: defaultOrder$3,
	fieldElements: fieldElements$5,
	dbPreRead: dbPreRead
};

const REACT_APP_API_KEYS_PREFIX = process.env.REACT_APP_API_KEYS_PREFIX || "sk-gsu-";
function UsersApiKey_EditorData() {
  // console_debug_log("UsersApiKey_EditorData");
  const registry = {
    "UsersApiKey": UsersApiKey,
    "TRUE_FALSE": TRUE_FALSE,
    "UsersApiKeyDbPreRead": UsersApiKeyDbPreRead
  };
  return GetFormData(users_api_keys, registry, false);
}
function UsersApiKey() {
  return {
    editorConfig: UsersApiKey_EditorData(),
    component: UsersApiKeyComponent
  };
}
const UsersApiKeyComponent = _ref => {
  let {
    parentData
  } = _ref;
  return /*#__PURE__*/React.createElement(GenericCrudEditor, {
    editorConfig: UsersApiKey_EditorData(),
    parentData: parentData
  });
};
const generateAccessToken = function () {
  let length = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 64;
  // Generate a long access token
  // return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  // return crypto.randomBytes(length).toString('hex');
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
};
const UsersApiKeyDbPreRead = (data, editor, action, currentUser) => {
  // Users api keys pre-form data load default values (dbPreRead)
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    switch (action) {
      case ACTION_CREATE:
        const access_token_waw = generateAccessToken();
        const access_token = "".concat(REACT_APP_API_KEYS_PREFIX).concat(access_token_waw);
        resp.fieldValues = Object.assign({}, data, {
          'resultset': {
            'access_token': access_token
          }
        });
        break;
    }
    resolve(resp);
  });
};

var baseUrl$4 = "users_config";
var title$4 = "User Configurations";
var name$4 = "User's Configuration";
var dbApiUrl$4 = "users_config";
var component$4 = "UsersConfig";
var type$1 = "child_listing";
var subType$1 = "array";
var array_name$1 = "users_config";
var parentUrl$1 = "users";
var endpointKeyNames$1 = [
	{
		parameterName: "user_id",
		parentElementName: "id"
	}
];
var primaryKeyName$1 = "id";
var defaultOrder$2 = "config_name";
var fieldElements$4 = [
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
		type: "suggestion_dropdown",
		listing: true,
		suggestion_id_fieldname: "_id",
		suggestion_desc_fieldname: "config_name",
		suggestion_name_fieldname: "config_name",
		filter_api_url: "general_config",
		filter_search_param_name: "config_name",
		filter_search_other_param: {
			like: "1",
			limit: 10
		},
		autocomplete_fields: {
			config_value: "config_value"
		},
		chatbot_popup: true,
		aux_component: "ChatBotButton",
		chatbot_prompt: "Give me the list of configuration parameters for GenericSuite backend",
		google_popup: true,
		google_prompt: "GenericSuite backend configuration parameters list"
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
	baseUrl: baseUrl$4,
	title: title$4,
	name: name$4,
	dbApiUrl: dbApiUrl$4,
	component: component$4,
	type: type$1,
	subType: subType$1,
	array_name: array_name$1,
	parentUrl: parentUrl$1,
	endpointKeyNames: endpointKeyNames$1,
	primaryKeyName: primaryKeyName$1,
	defaultOrder: defaultOrder$2,
	fieldElements: fieldElements$4
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

var baseUrl$3 = "user_history";
var title$3 = "User History";
var name$3 = "User History";
var component$3 = "UsersUserHistory";
var dbApiUrl$3 = "users_user_history";
var type = "child_listing";
var subType = "array";
var array_name = "user_history";
var parentUrl = "users";
var endpointKeyNames = [
	{
		parameterName: "user_id",
		parentElementName: "id"
	}
];
var primaryKeyName = "id";
var defaultOrder$1 = "date|desc";
var fieldElements$3 = [
	{
		name: "id",
		required: false,
		label: "ID",
		type: "text",
		readonly: true,
		hidden: false,
		listing: false,
		uuid_generator: true
	},
	{
		name: "date",
		label: "Date",
		required: true,
		type: "datetime-local",
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
	}
];
var users_user_history = {
	baseUrl: baseUrl$3,
	title: title$3,
	name: name$3,
	component: component$3,
	dbApiUrl: dbApiUrl$3,
	type: type,
	subType: subType,
	array_name: array_name,
	parentUrl: parentUrl,
	endpointKeyNames: endpointKeyNames,
	primaryKeyName: primaryKeyName,
	defaultOrder: defaultOrder$1,
	fieldElements: fieldElements$3
};

function UsersUserHistory_EditorData() {
  const registry = {
    "UsersUserHistory": UsersUserHistory,
    "TRUE_FALSE": TRUE_FALSE,
    "BILLING_PLANS": BILLING_PLANS
  };
  return GetFormData(users_user_history, registry, false);
}
function UsersUserHistory() {
  return {
    editorConfig: UsersUserHistory_EditorData(),
    component: UsersUserHistoryComponent
  };
}
const UsersUserHistoryComponent = _ref => {
  let {
    parentData
  } = _ref;
  return /*#__PURE__*/React.createElement(GenericCrudEditor, {
    editorConfig: UsersUserHistory_EditorData(),
    parentData: parentData
  });
};
const UsersHistoryDbPostWrite = (data, editor, action) => {
  // Add an updated entry in user_history with current user's data
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    const parentId = data[editor.primaryKeyName];
    {
      console_debug_log('UsersHistoryDbPostWrite - parentId: ' + String(parentId) + ' | data:', data);
    }
    switch (action) {
      case ACTION_CREATE:
      case ACTION_UPDATE:
        const db = new dbApiService({
          url: 'users_user_history'
        });
        const itemToSave = {
          user_id: parentId,
          user_history: {
            id: newIdString(),
            date: processDateToTimestamp(new Date().toISOString()),
            email: data['email'],
            status: data['status'],
            plan: data['plan']
          }
        };
        {
          console_debug_log("UsersDbPostWrite - itemToSave:", itemToSave);
        }
        db.createRow(itemToSave).then(_ => {
          // To refresh parent component and show the new calorie total
          resp['otherData']['refresh'] = true;
          {
            console_debug_log("UsersDbPostWrite | resp:", resp);
          }
          resolve(resp);
        }, error => {
          console_debug_log("[UDPW-020] UsersDbPostWrite | error:", error);
          resp.error = true;
          resp.errorMsg = error;
          reject(resp);
        });
        break;
      default:
        resolve(resp);
    }
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
		type: "h2"
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
var childComponents$1 = [
	"UsersUserHistory",
	"UsersConfig",
	"UsersApiKey"
];
var dbListPreRead$1 = [
	"UsersDbListPreRead"
];
var dbPreWrite$1 = [
	"UsersDbPreWrite"
];
var dbPostWrite = [
	"UsersHistoryDbPostWrite"
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
	childComponents: childComponents$1,
	dbListPreRead: dbListPreRead$1,
	dbPreWrite: dbPreWrite$1,
	dbPostWrite: dbPostWrite,
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
    "UsersHistoryDbPostWrite": UsersHistoryDbPostWrite,
    "UsersValidations": UsersValidations,
    "UsersPasswordValidations": UsersPasswordValidations,
    "UsersApiKey": UsersApiKey,
    "UsersUserHistory": UsersUserHistory
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
    getUserDataCache(currentUser.id).then(userData => {
      setUserDataCache(currentUser.id, userData);
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
    getUserDataCache(currentUser.id).then(currentUserData => {
      setUserDataCache(currentUser.id, currentUserData);
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
  // Users password validations
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    switch (action) {
      case ACTION_CREATE:
        if (!data['passcode']) {
          resp.error = true;
          resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 'User needs a password';
          break;
        }
        break;
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
  // Users database pre-write actions
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
const initialState = {
  editor: null,
  formMode: null,
  status: ""
};
function gspeReducer(state, action) {
  switch (action.type) {
    case 'SET_EDITOR':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        editor: action.payload
      });
    case 'SET_FORM_MODE':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        formMode: action.payload
      });
    case 'SET_STATUS':
      return _objectSpread2(_objectSpread2({}, state), {}, {
        status: action.payload
      });
    default:
      return state;
  }
}
const GenericSinglePageEditorMain = props => {
  const [state, dispatch] = useReducer(gspeReducer, initialState);
  const {
    editor,
    formMode,
    status
  } = state;
  const setEditor = p => dispatch({
    type: 'SET_EDITOR',
    payload: p
  });
  const setFormMode = p => dispatch({
    type: 'SET_FORM_MODE',
    payload: p
  });
  const setStatus = p => dispatch({
    type: 'SET_STATUS',
    payload: p
  });
  const {
    initCache
  } = useContext(MainSectionContext);
  useEffect(() => {
    setEditorParameters(props).then(editor_response => {
      if (!editor_response) {
        setEditor(null);
      } else if (editor_response.error) {
        console_debug_log("GSPE-ERROR-010:");
        console_debug_log(editor_response.errorMsg);
        setStatus(editor_response.errorMsg);
      } else if (!editor_response.response) {
        setEditor(null);
      } else {
        setEditor(getEditoObj(props, editor_response));
      }
    }, error => {
      console_debug_log("GSPE-ERROR-020:");
      console_debug_log(error);
      setStatus(error);
    });
  }, [props, debug]);
  useEffect(() => {
    const form_mode = [ACTION_UPDATE, props.id];
    setFormMode(form_mode);
  }, [props.id, debug]);
  const setInfoMsg = msg => {
  };
  const handleCancel = () => {
    setWindowLocationHref('/');
  };
  if (!editor) {
    if (status) {
      return /*#__PURE__*/React.createElement(React.Fragment, null, status, "[GSPE-NES]");
    }
    return WaitAnimation(WAIT_ANIMATION_MARGIN_TOP_CLASS);
  }
  if (status) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, errorAndReEnter(status + ("")));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(FormPage, {
    mode: formMode[0],
    id: formMode[1],
    onCancel: handleCancel,
    setInfoMsg: setInfoMsg,
    editor: editor
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
		type: "h2"
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
	"UsersApiKey"
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
	childComponents: childComponents,
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
    "UsersPasswordValidations": UsersPasswordValidations,
    "UsersApiKey": UsersApiKey
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

const AppFooter = _ref => {
  let {
    appName = null,
    year = null,
    url = null,
    rights = null,
    otherLine = null
  } = _ref;
  const appNameData = appName !== null && appName !== void 0 ? appName : process.env.REACT_APP_APP_NAME;
  const yearData = year !== null && year !== void 0 ? year : new Date().getFullYear();
  const rightsData = rights !== null && rights !== void 0 ? rights : "All rights reserved";
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "\xA9 ", yearData, " ", url ? /*#__PURE__*/React.createElement("a", {
    href: url,
    target: "_blank"
  }, appNameData) : appNameData, ". ", rightsData, "."), otherLine && /*#__PURE__*/React.createElement("p", null, otherLine));
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
  const sanitizeRedirectUrl = inputUrl => {
    if (!inputUrl) {
      return '/';
    }
    let candidate = String(inputUrl).trim();
    try {
      candidate = decodeURIComponent(candidate);
    } catch (_) {
      // ignore decode errors, use raw candidate
    }
    try {
      const origin = getWindowLocationOrigin();
      const parsed = new URL(candidate, origin);
      // Only allow same-origin destinations
      if (parsed.origin !== origin) {
        return '/';
      }
      // Build a safe relative URL explicitly to preserve query and hash
      const relative = "".concat(parsed.pathname || '/').concat(parsed.search || '').concat(parsed.hash || '');
      // Disallow protocol-relative patterns like '//' at start of path
      if (relative.startsWith('//')) {
        return '/';
      }
      return relative || '/';
    } catch (_) {
      return '/';
    }
  };
  const getRedirect = () => {
    const urlParams = getUrlParams(props);
    if (typeof urlParams.redirect === 'undefined') {
      return sanitizeRedirectUrl(getLastUrl());
    }
    return sanitizeRedirectUrl(urlParams.redirect);
  };
  const {
    currentUser,
    registerUser
  } = useUser();
  const {
    appLogo,
    theme
  } = useAppContext();
  const handleSubmit = (username, password, setStatus, setSubmitting) => {
    setStatus();
    authenticationService.login(username, password).then(user => {
      let redirectUrl = getRedirect();
      // To avoid stay in login page with the wait animation
      setSubmitting(false);
      registerUser(user);

      // Redirect to previous page
      removeLastUrl();
      if (redirectUrl.includes('/login')) {
        redirectUrl = '/';
      }

      // return <Navigate to={redirectUrl} replace={true}/>
      setWindowLocationHref(sanitizeRedirectUrl(redirectUrl));

      // To handle menu access rights changes
      // windowLocationReload(true);
    }, error => {
      setSubmitting(false);
      setStatus(getErrorMessage(error));
    });
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Formik, {
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: Yup.object().shape({
      username: Yup.string().required('Username is required'),
      password: Yup.string().required('Password is required')
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
    }, /*#__PURE__*/React.createElement("img", {
      src: imageDirectory + (appLogo || defaultAppLogo),
      width: "150",
      height: "150",
      className: LOGIN_PAGE_APP_LOGO_CLASS,
      alt: "App Logo"
    }), /*#__PURE__*/React.createElement(CenteredBoxContainer, null, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement("div", {
      className: FORM_GROUP_CLASS + " " + LOGIN_PAGE_EXTRA_PT
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username",
      className: theme.label
    }, "Username"), /*#__PURE__*/React.createElement(Field, {
      name: "username",
      type: "text",
      autoComplete: "username",
      className: FORM_CONTROL_CLASS + ' ' + (errors.username && touched.username ? IS_INVALID_CLASS : theme.input)
    }), /*#__PURE__*/React.createElement(ErrorMessage, {
      name: "username",
      component: "div",
      className: INVALID_FEEDBACK_CLASS
    })), /*#__PURE__*/React.createElement("div", {
      className: FORM_GROUP_CLASS
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "password",
      className: theme.label
    }, "Password"), /*#__PURE__*/React.createElement(Field, {
      name: "password",
      type: "password",
      autoComplete: "current-password",
      className: FORM_CONTROL_CLASS + ' ' + (errors.password && touched.password ? IS_INVALID_CLASS : theme.input)
    }), /*#__PURE__*/React.createElement(ErrorMessage, {
      name: "password",
      component: "div",
      className: INVALID_FEEDBACK_CLASS
    })), /*#__PURE__*/React.createElement("div", {
      className: FORM_GROUP_CLASS
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: BUTTON_PRIMARY_CLASS,
      disabled: isSubmitting
    }, "Login"), isSubmitting && WaitAnimation()), status && /*#__PURE__*/React.createElement("div", {
      className: ERROR_MSG_CLASS
    }, renderMarkdownContent(status)))));
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
  const {
    currentUser
  } = useUser();
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
    as: Link,
    to: "/"
    // onClick={() => (currentUser ? setExpanded() : setExpanded(() => windowLocationReload()))}
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
  if (showContentOnly) {
    // This is too prevent showing the menu when showContentOnly is true
    // E.g. pop-up about page
    return null;
  }
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
    currentUser,
    askForLogin,
    unRegisterUser
  } = useUser();
  const {
    setState,
    errorState,
    setErrorState,
    menuOptions,
    setMenuOptions,
    sideMenu,
    setSideMenu,
    isMobileMenuOpen,
    componentMap
  } = useAppContext();
  const showContentOnly = getShowContentOnly();
  const getMenuFromApiAlreadyCalled = useRef(false);
  const callGetMenuFromApi = () => {
    // Load menus from JSON configurations
    if (!getMenuFromApiAlreadyCalled.current) {
      getMenuFromApiAlreadyCalled.current = true;
      getMenuFromApi(setState, getErrorState, setErrorState, setMenuOptions, getMenuOptions);
    }
  };
  const logoutHandler = () => {
    unRegisterUser();
    logoutHander();
  };
  const getErrorState = () => {
    return errorState;
  };
  const getMenuOptions = () => {
    return menuOptions;
  };
  useEffect(() => {
    if (currentUser) {
      callGetMenuFromApi();
    }
  }, [currentUser]);
  if (showContentOnly) {
    return /*#__PURE__*/React.createElement(AppMainInnerUnauthenticated, null, children);
  }
  return /*#__PURE__*/React.createElement(MainContainer, null, /*#__PURE__*/React.createElement(AppNavBar, null, /*#__PURE__*/React.createElement(Navbar.TopCenterMenu, null, /*#__PURE__*/React.createElement(GenericMenuBuilder, {
    itemType: sideMenu ? "side_menu" : "top_menu"
  }), sideMenu && isMobileMenuOpen && currentUser && /*#__PURE__*/React.createElement(GenericMenuBuilder, {
    title: currentUser.firstName,
    itemType: "hamburger",
    mobileMenuMode: true
  })), !sideMenu && /*#__PURE__*/React.createElement(TopRightMenu, {
    showContentOnly: showContentOnly
  })), /*#__PURE__*/React.createElement(AppSectionContainer, null, /*#__PURE__*/React.createElement(React.Fragment, null, !sideMenu && /*#__PURE__*/React.createElement(AppMainComponent, {
    logoutHandler: logoutHandler,
    showContentOnly: showContentOnly,
    askForLogin: askForLogin,
    currentUser: currentUser
  }, children), sideMenu && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar.TopForSideMenu, null, /*#__PURE__*/React.createElement(TopRightMenu, {
    showContentOnly: showContentOnly
  })), /*#__PURE__*/React.createElement(AppSectionContainer.ForSideMenu, null, /*#__PURE__*/React.createElement(AppMainComponent, {
    logoutHandler: logoutHandler,
    showContentOnly: showContentOnly,
    askForLogin: askForLogin,
    currentUser: currentUser
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
    logoutHandler,
    showContentOnly,
    askForLogin,
    currentUser,
    children
  } = _ref7;
  const {
    errorState
  } = useAppContext();
  if (errorState !== "") {
    if (showContentOnly) {
      return /*#__PURE__*/React.createElement(CloseButton, null, getErrorMessage(errorState));
    }
    return errorAndReEnter(errorState, null, true, null, logoutHandler, false, false);
  }
  if (askForLogin) {
    return /*#__PURE__*/React.createElement("div", {
      className: LOGIN_BUTTON_IN_APP_COMPONENT_CLASS
    }, /*#__PURE__*/React.createElement(GsButton, {
      as: Link,
      to: getPrefix() + '/login'
    }, "Login"));
  }
  if (!currentUser) {
    return WaitAnimation(WAIT_ANIMATION_MARGIN_TOP_CLASS);
  }
  return children;
};
const AppMain = () => {
  const routerFutureFlags = {
    v7_relativeSplatPath: true
  };
  const {
    currentUser,
    registerUser,
    setAskForLogin
  } = useUser();
  const {
    setState,
    menuOptions,
    setMenuOptions,
    componentMap,
    setExpanded
  } = useAppContext();
  const [router, setRouter] = useState(getDefaultRoutes(currentUser, componentMap, setExpanded));
  const verifyCurrentUserAlreadyCalled = useRef(false);
  const setRouterAlreadyCalled = useRef(false);
  const callVerifyCurrentUser = () => {
    if (!verifyCurrentUserAlreadyCalled.current) {
      verifyCurrentUserAlreadyCalled.current = true;
      verifyCurrentUser(registerUser, currentUser, setAskForLogin);
    }
  };
  const assignRouter = () => {
    if (!setRouterAlreadyCalled.current) {
      setRouter(getRoutes(currentUser, menuOptions, componentMap, setExpanded));
      setRouterAlreadyCalled.current = true;
    }
  };
  useEffect(() => {
    callVerifyCurrentUser();
  }, []);
  useEffect(() => {
    if (menuOptions) {
      assignRouter();
    }
  }, [menuOptions]);
  if (hasHashRouter) {
    return /*#__PURE__*/React.createElement(HashRouter, {
      history: history,
      future: routerFutureFlags
    }, /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GetHashRoutes, {
      routes: router
    })));
  }
  return /*#__PURE__*/React.createElement(RouterProvider, {
    router: createBrowserRouter(router, {
      future: routerFutureFlags
    }),
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
  const [componentMapFinal, setComponentMapFinal] = useState(mergeDicts(componentMap, defaultComponentMap));
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
  throw new Error("Unsupported conversion from \"".concat(height_unit, "\" to \"").concat(target_unit, "\""));
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
  throw new Error("Unsupported conversion from ".concat(weight_unit, " to ").concat(target_unit));
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

const _excluded = ["component"];
const PrivateRoute = _ref => {
  let {
      component: Component
    } = _ref,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement(Route, _extends({}, rest, {
    render: props => {
      const {
        currentUser
      } = useUser();
      if (!currentUser) {
        console_debug_log('PrivateRoute Not Authorized...');
        // Not logged in so redirect to login page with the return url
        return /*#__PURE__*/React.createElement(Navigate, {
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
    className = APP_FORMPAGE_FIELD_GOOD_CLASS,
    name = '',
    key = '',
    id = '',
    type = "text",
    value = null,
    readOnly = false,
    required = false,
    disabled = false,
    showAsField = "1",
    onChange = () => {},
    onBlur = () => {},
    backgroundColor = null,
    children
  } = _ref;
  if (showAsField === "1") {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Field, {
      name: name,
      key: name,
      id: name,
      type: type,
      required: required,
      disabled: disabled,
      readOnly: readOnly,
      className: className,
      value: value !== null ? value : children,
      onChange: onChange,
      onBlur: onBlur
    }));
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "".concat(backgroundColor !== null && backgroundColor !== void 0 ? backgroundColor : DISABLE_FIELD_BACKGROUND_COLOR_CLASS, " ").concat(className)
  }, children));
};

var generic_editor_rfc_ui = /*#__PURE__*/Object.freeze({
  __proto__: null,
  ShowAsDisabledField: ShowAsDisabledField
});

// UUID utilities

function generateUUID() {
  /*
   * To resemble crypto.randomUUID() using Node.js's native crypto module, using crypto.randomBytes()
   */
  const bytes = crypto.randomBytes(16);
  bytes[6] = bytes[6] & 0x0f | 0x40;
  bytes[8] = bytes[8] & 0x3f | 0x80;
  const uuid = bytes.toString('hex').match(/([0-9a-f]{8})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{4})([0-9a-f]{12})/).slice(1).join('-');
  return uuid;
}
const getUuidV4 = () => {
  return generateUUID();
};

var uuid_utilities = /*#__PURE__*/Object.freeze({
  __proto__: null,
  generateUUID: generateUUID,
  getUuidV4: getUuidV4
});

// Components
// Images
// const appLogoEmblem = 'app_log_emblem.svg';
const appLogoCircle = 'app_logo_circle.svg';
const appLogoLandscape = 'app_logo_landscape.svg';

export { About, AboutBody, App, AppContext$1 as AppContext, AppFooter, GeneralConfig, GeneralConfig_EditorData, HomePage, IconsLib, LoginPage, ModalPopUp$1 as ModalPopUp, NavLib, PrivateRoute$1 as PrivateRoute, UserContext$1 as UserContext, UserProfileEditor, Users, UsersApiKey, UsersApiKeyDbPreRead, UsersApiKey_EditorData, UsersConfig, UsersConfig_EditorData, UsersDbListPreRead, UsersDbPreWrite, UsersPasswordValidations, UsersProfile_EditorData, UsersValidations, Users_EditorData, app_constants as appConstants, appLogoCircle, appLogoLandscape, authHeader$1 as authHeader, authentication_service as authenticationService, blob_files_utilities as blobFilesUtilities, class_name_constants as classNameConstants, conversions, dateTimestamp, db_service as dbService, dictUtilities, errorAndReenter, fetch_utilities as fetchUtilities, general_constants as generalConstants, generic_editor_rfc_common as genericEditorRfcCommon, generic_editor_rfc_formpage as genericEditorRfcFormpage, generic_editor_rfc_provider as genericEditorRfcProvider, generic_editor_rfc_search as genericEditorRfcSearch, generic_editor_rfc_search_engine_button as genericEditorRfcSearchEngineButton, generic_editor_rfc_selector as genericEditorRfcSelector, generic_editor_rfc_service as genericEditorRfcService, generic_editor_rfc_specific_func as genericEditorRfcSpecificFunc, generic_editor_rfc_suggestion_dropdown as genericEditorRfcSuggestionDropdown, generic_editor_rfc_timestamp as genericEditorRfcTimestamp, generic_editor_rfc_ui as genericEditorRfcUi, generic_editor_singlepage as genericEditorSinglepage, generic_editor_utilities as genericEditorUtilities, generic_menu_service as genericMenuService, history$1 as history, id_utilities as idUtilities, jsonUtilities, logging_service as loggingService, logout_service as logoutService, md5_utilities as md5Utilities, media, ramdomize, response_handlers_service as responseHandlersService, mocks as testHelpersMocks, ui, urlParams, uuid_utilities as uuidUtilities, wait_animation_utility as waitAnimationUtility };
//# sourceMappingURL=index.js.map
