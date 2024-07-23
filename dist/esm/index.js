import React, { useState, useEffect, createContext, useContext } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { Link, Route, Routes, Navigate } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { Buffer } from 'buffer';
import { BehaviorSubject } from 'rxjs';
import { Formik, Form, Field, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';
import Nav from 'react-bootstrap/cjs/Nav.js';
import NavDropdown from 'react-bootstrap/cjs/NavDropdown.js';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import fontawesome from '@fortawesome/fontawesome';
import { faGreaterThan, faPlus, faEye, faEdit, faTrashAlt, faCheck, faList } from '@fortawesome/fontawesome-free-solid';
import Downshift from 'downshift';
import Container from 'react-bootstrap/cjs/Container.js';
import Navbar from 'react-bootstrap/cjs/Navbar.js';

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

const BUTTON_PRIMARY_CLASS = "bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500";
const BUTTON_SECONDARY_CLASS = "bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500";
const BUTTON_LISTING_CLASS = "bg-blue-500 text-white p-2 rounded text-sm";
const INPUT_FLEXIBLE_CLASS = "pl-1 pb-1 pt-1 pr-1 block w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md resize-none overflow-hidden";
// export const INPUT_FLEXIBLE_CLASS = "m-0 w-full resize-none border-0 rounded-md border py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 gizmo:md:py-3.5 gizmo:placeholder-black/50 gizmo:dark:placeholder-white/50 pl-12 gizmo:pl-10 md:pl-[46px] gizmo:md:pl-[55px]";

const ERROR_MSG_CLASS = "alert alert-danger mt-4 p-2 rounded-md";
const WARNING_MSG_CLASS = "alert alert-warning mt-4 p-2 rounded-md";
const INFO_MSG_CLASS = "alert alert-info mt-4 p-2 rounded-md";
const SUCCESS_MSG_CLASS = "alert alert-success text-black mt-4 p-2 rounded-md";
const GRAY_BOX_MSG_CLASS = "alert text-black bg-gray-200 mt-4 p-2 rounded-md";

var class_name_constants = /*#__PURE__*/Object.freeze({
    __proto__: null,
    BUTTON_LISTING_CLASS: BUTTON_LISTING_CLASS,
    BUTTON_PRIMARY_CLASS: BUTTON_PRIMARY_CLASS,
    BUTTON_SECONDARY_CLASS: BUTTON_SECONDARY_CLASS,
    ERROR_MSG_CLASS: ERROR_MSG_CLASS,
    GRAY_BOX_MSG_CLASS: GRAY_BOX_MSG_CLASS,
    INFO_MSG_CLASS: INFO_MSG_CLASS,
    INPUT_FLEXIBLE_CLASS: INPUT_FLEXIBLE_CLASS,
    SUCCESS_MSG_CLASS: SUCCESS_MSG_CLASS,
    WARNING_MSG_CLASS: WARNING_MSG_CLASS
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
    htmlContentClass = null
  } = _ref;
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
  }, title && showTitle && /*#__PURE__*/React.createElement(Modal.Header, {
    closeButton: true
  }, /*#__PURE__*/React.createElement(Modal.Title, null, title)), /*#__PURE__*/React.createElement(Modal.Body, null, link && /*#__PURE__*/React.createElement("iframe", {
    src: link + linkSuffix,
    style: {
      width: '100%',
      height: '400px'
    },
    title: title
  }), !link && htmlContent === null && children, !link && htmlContent !== null && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: htmlContentClass,
    dangerouslySetInnerHTML: {
      __html: htmlContent
    }
  }))), /*#__PURE__*/React.createElement(Modal.Footer, null, closeButtonMessage && /*#__PURE__*/React.createElement(DefaultButtonModal, {
    variant: "secondary",
    action: () => closeButtonAction ? closeButtonAction() : handleClose()
  }, closeButtonMessage), secondButtonMessage && /*#__PURE__*/React.createElement(DefaultButtonModal, {
    variant: "secondary",
    action: secondButtonAction
  }, secondButtonMessage), primaryButtonMessage && logoutButton && /*#__PURE__*/React.createElement(LogoutNavigate, {
    variant: "primary",
    action: primaryButtonAction
  }, primaryButtonMessage), primaryButtonMessage && !logoutButton && /*#__PURE__*/React.createElement(DefaultButtonModal, {
    variant: "primary",
    action: primaryButtonAction
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
    variant
  } = _ref3;
  return /*#__PURE__*/React.createElement("a", {
    variant: variant,
    className: BUTTON_PRIMARY_CLASS
    // href={getPrefix(true)+'/login'}
    ,
    href: '/#/login'
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
    link: window.location.origin + '/#/about_body',
    showTitle: false
  });
};
const AboutBody = _ref => {
  let {
    children
  } = _ref;
  const version = process.env.REACT_APP_VERSION;
  const appName = process.env.REACT_APP_APP_NAME;
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", null, "About ", appName), /*#__PURE__*/React.createElement("p", null, "(Version: ", version && version !== '' ? version : "N/A", ")"), children);
};

const history = createBrowserHistory();
function getPrefix() {
  let hardPrefix = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  if (hardPrefix) {
    const prefix = process.env.REACT_APP_URI_PREFIX ? process.env.REACT_APP_URI_PREFIX : '';
    return '/#' + prefix;
  }
  return '';
}
const setLastUrl = function () {
  let lastURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  if (!lastURL) {
    lastURL = window.location.href;
  }
  if (lastURL.indexOf('/login') === -1) {
    localStorage.setItem('lastURL', lastURL);
  }
};
const removeLastUrl = () => {
  localStorage.removeItem('lastURL');
};
const getLastUrl = () => {
  let lastUrl = getPrefix(true) + '/';
  if (localStorage.getItem('lastURL')) {
    lastUrl = localStorage.getItem('lastURL');
  }
  return lastUrl;
};

var history$1 = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getLastUrl: getLastUrl,
    getPrefix: getPrefix,
    history: history,
    removeLastUrl: removeLastUrl,
    setLastUrl: setLastUrl
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
    MSG_MUST_BE: MSG_MUST_BE,
    MSG_NEXT: MSG_NEXT,
    MSG_OF: MSG_OF,
    MSG_PAGE: MSG_PAGE,
    MSG_PREVIOUS: MSG_PREVIOUS,
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

const currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser')));
function logout() {
  let lastURL = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  // Remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
  if (lastURL) {
    setLastUrl(lastURL);
  }
}

var logout_service = /*#__PURE__*/Object.freeze({
    __proto__: null,
    currentUserSubject: currentUserSubject,
    logout: logout
});

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

function authHeader() {
  // Returns authorization header with jwt token
  let currentUser = null;
  try {
    currentUser = authenticationService.currentUserValue;
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
      console_debug_log('Error body:', text);
      return text;
    }).catch(e => {
      console_debug_log('Error reading body:', e);
      return "HTTP ".concat(error.status);
    });
    if (error.status === 401) {
      errorMsg = MSG_ERROR_SESSION_EXPIRED;
    } else {
      errorMsg = error.statusText;
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
  {
    console_debug_log("|||| getFileExtension | filename: ".concat(filename, " | fileExtension: ").concat(fileExtension));
  }
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
  {
    console_debug_log("|||| getContentType | filename: ".concat(filename, " | contentType: ").concat(contentType));
  }
  return contentType;
};
const getFilenameFromContentDisposition = headers => {
  // Example: attachment; filename="dccbd8f2900a4c7eb1035add851da72f.wav"
  const contentDisposition = headers.get('content-disposition');
  const filenameMatch = contentDisposition && contentDisposition.match(/filename="([^"]+)"/);
  const filename = filenameMatch ? filenameMatch[1] : null;
  {
    console_debug_log('|||| Content-Disposition:', contentDisposition);
    console_debug_log('|||| Content-Disposition filename:', filename);
  }
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
  console_debug_log('decodeBlob | base64String:', base64String);
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
    console_debug_log('decodeBlob v2 | bytes:', bytes);
    blob = new Blob([bytes], {
      type: blobType
    });
  } else {
    blob = new Blob([base64String], {
      type: blobType
    });
  }
  console_debug_log('decodeBlob v2 | blob:', blob);
  const url = URL.createObjectURL(blob);
  console_debug_log('decodeBlob v2 | new url:', url);
  return url;
};
const fixBlob = async (blobObj, filename) => {
  // Verify if the blob is a binary encoded as Base64 string
  // If so, decode it and return a new blob URL with the decoded content...
  // Else, just return the blob URL...
  {
    console_debug_log("|||| fixBlob v2 | filename: ".concat(filename));
  }
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
    _defineProperty(this, "debug", true);
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
                console_debug_log('||| getFetch | fixBlob | error:', error);
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
      console_debug_log('|| FETCH Error:', e);
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
    const url = "".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery);
    if (this.debug) {
      console_debug_log("###===> getAll() | ".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery));
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
      console_debug_log("###===> getOne() | ".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery));
    }
    const url = "".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery);
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
      console_debug_log("###===> createRow() | ".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery));
    }
    const response = fetch("".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery), requestOptions).then(handleResponse).catch(handleFetchError);
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
      console_debug_log("###===> updateRow() | ".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery));
    }
    const response = fetch("".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery), requestOptions).then(handleResponse).catch(handleFetchError);
    return response;
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
    const response = fetch("".concat(this.apiUrl, "/").concat(this.props.url).concat(urlQuery), requestOptions).then(handleResponse).catch(handleFetchError);
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
      "Authorization": "Basic " + Buffer.from(username + ":" + password).toString('base64')
    }
  };
  let userService = new dbApiService({
    url: 'users'
  });
  return fetch("".concat(config.apiUrl, "/users/login"), requestOptions).then(handleResponse, handleFetchError).then(res => {
    if (res.error) {
      return Promise.reject(res.message);
    }
    let user = {
      id: userService.convertId(res.resultset._id),
      username: res.resultset.username,
      // email: res.resultset.email,
      firstName: res.resultset.firstname,
      lastName: res.resultset.lastname,
      token: res.resultset.token
    };
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUserSubject.next(user);
    return user;
  });
}
const getUserData = userId => {
  const dbApi = new dbApiService({
    url: 'users'
  });
  return dbApi.getOne({
    id: userId
  }).then(data => data, error => {
    console_debug_log("ERROR: getUserData(".concat(userId, ":)"));
    console.error(error);
    return {
      error: true,
      errorMsg: error
    };
  });
};

var authentication_service = /*#__PURE__*/Object.freeze({
    __proto__: null,
    authenticationService: authenticationService,
    getUserData: getUserData
});

const hard_login = false;
function logoutHander() {
  authenticationService.logout();
  if (!history.push(getPrefix(true) + '/login') && hard_login) {
    window.location.href = window.location.origin + getPrefix(true) + '/login';
  }
}
function refreshPage() {
  window.location.reload();
}

// const extractErrorFromVariants = (errorRaw, element, subElement=null) => {
//     // console_debug_log(`extractErrorFromVariants | element = '${element}', subElement = '${subElement}' | errorRaw:`, errorRaw);
//     let error = errorRaw;
//     let errorJson;
//     if (typeof error['errorMsg'] !== 'undefined') {
//         error = error['errorMsg'];
//     }
//     if (typeof error === 'string') {
//         if (subElement) {
//             return '';
//         }
//         return error;
//     }
//     if (typeof error[element] !== 'undefined') {
//         errorJson = error[element];
//         if (typeof errorJson === 'string') {
//             try {
//                 errorJson = JSON.parse(errorJson);
//             } catch (e) {
//                 errorJson = null;
//             }
//             if (!errorJson) {
//                 if (subElement) {
//                     return '';
//                 }
//                 return error[element];
//             }
//         }
//         if (subElement) {
//             if (typeof errorJson[subElement] === 'undefined') {
//                 return '';
//             }
//             console_debug_log(`(0) extractErrorFromVariants | errorJson[subElement]:`, errorJson[subElement]);
//             return errorJson[subElement];
//         }
//         console_debug_log(`(1) extractErrorFromVariants | errorJson:`, errorJson);
//         return String(errorJson);
//     }
//     console_debug_log(`(2) extractErrorFromVariants | error:`, error);
//     if (subElement) {
//         return '';
//     }
//     return String(error);
// }

const getErrorMessage = error => {
  // if (typeof error === 'string') {
  //     return error;
  // }
  // let errorMessage = extractErrorFromVariants(error, 'message');
  // console_debug_log(`getErrorMessage | errorMessage = '${errorMessage}'`);
  // let errorReason = extractErrorFromVariants(error, 'reason', 'message');
  // console_debug_log(`getErrorMessage | errorReason 11:`, errorReason);
  // if (!errorReason) {
  //     errorReason = extractErrorFromVariants(error, 'reason', 'detail');
  //     console_debug_log(`getErrorMessage | errorReason 22:`, errorReason);
  // }
  // if (!errorReason) {
  //     errorReason = extractErrorFromVariants(error, 'reason');
  //     console_debug_log(`getErrorMessage | errorReason 3:`, errorReason);
  // }
  // if (errorReason) {
  //     errorMessage += ': ' + errorReason;
  // }
  // return errorMessage;

  let errorMessage = error;
  if (typeof error !== 'string') {
    if (typeof error['errorMsg'] !== 'undefined') {
      errorMessage = error['errorMsg'];
    } else {
      errorMessage = error['message'];
    }
    if (typeof error['reason'] !== 'undefined') {
      errorMessage += ': ' + (typeof error['reason']['message'] !== "undefined" ? error['reason']['message'] : error['reason']);
    }
  }
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
    htmlContentClass: 'alert alert-danger'
  }, msgContainsHtml ? null : errorMessageDiv(retryMessage));
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
      as: Link,
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
    className: 'alert alert-danger'
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
const replaceSpecialVars = params => {
  const {
    currentUserValue
  } = authenticationService;
  Object.keys(params).forEach(key => {
    if (params[key] === "{CurrentUserId}") {
      params[key] = currentUserValue.id;
    }
  });
  return params;
};

var generic_editor_utilities = /*#__PURE__*/Object.freeze({
    __proto__: null,
    defaultValue: defaultValue,
    replaceSpecialVars: replaceSpecialVars
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
          if (searchString.includes('?')) {
            searchString = searchString.split('?')[1];
          } else {
            searchString = '';
          }
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
    console.log("getUrlParams ERROR | ".concat(props));
    console.error(error);
  }
  return urlParams;
}

var urlParams = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getUrlParams: getUrlParams
});

const WaitAnimation = () => {
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("center", null, /*#__PURE__*/React.createElement("img", {
    src: WAIT_ANIMATION_IMG,
    alt: MSG_ALT_WAIT_ANIMATION
  })));
};
const ShowHidePageAnimation = function (showFlag) {
  let elementId = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "NavigationAnimation";
  let animationDiv = document.getElementById(elementId);
  if (animationDiv) {
    if (showFlag) {
      animationDiv.className = "ml-3 mr-3";
    } else {
      animationDiv.className = "ml-3 mr-3 hidden";
    }
  }
};

var wait_animation_utility = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ShowHidePageAnimation: ShowHidePageAnimation,
    WaitAnimation: WaitAnimation
});

// This way to import the .svg files doesn't work on prod environents...
// import DefaultAppLogo from '../../images/app_logo_square.svg';
// import MadeByLogoSquare from '../../images/madeby_logo_square.svg';
// import MadeByLogoCircle from '../../images/madeby_logo_emblem.svg';

const defaultAppLogo = "app_logo_square.svg";
const LoginPage = props => {
  const [redirectUrl, setRedirectUrl] = useState(null);
  let appLogo = props.appLogo;
  useEffect(() => {
    const urlParams = getUrlParams(props);
    let redirect;
    if (typeof urlParams.redirect === 'undefined') {
      redirect = getLastUrl();
    } else {
      redirect = urlParams.redirect;
    }
    // Redirect to home OR redirect URL if already logged in
    if (authenticationService.currentUserValue) {
      removeLastUrl();
      window.location.href = redirectUrl;
    } else {
      setRedirectUrl(redirect);
    }
    // Avoid need to add redirectUrl to dependency array
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);
  const handleSubmit = (username, password, setStatus, setSubmitting) => {
    setStatus();
    authenticationService.login(username, password).then(user => {
      // To avoid stay in login page with the wait animation
      setSubmitting(false);
      // Redirect to previous page
      removeLastUrl();
      window.location.href = redirectUrl;
      // To handle menu access rights changes
      window.location.reload(true);
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
      className: "flex justify-center items-center min-h-screen mt-1 mb-1"
    }, /*#__PURE__*/React.createElement("div", {
      className: "bg-white rounded border mt-4 mb-1 pt-3 pb-2 pl-4 pr-4",
      style: {
        width: '400px',
        margin: 'auto'
      }
    }, /*#__PURE__*/React.createElement(Form, null, /*#__PURE__*/React.createElement("img", {
      src: imageDirectory + (appLogo || defaultAppLogo),
      width: "150",
      height: "150",
      className: "mx-auto my-0",
      alt: "App Logo"
    }), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "username"
    }, "Username"), /*#__PURE__*/React.createElement(Field, {
      name: "username",
      type: "text",
      className: 'form-control' + (errors.username && touched.username ? ' is-invalid' : '')
    }), /*#__PURE__*/React.createElement(ErrorMessage, {
      name: "username",
      component: "div",
      className: "invalid-feedback"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("label", {
      htmlFor: "password"
    }, "Password"), /*#__PURE__*/React.createElement(Field, {
      name: "password",
      type: "password",
      className: 'form-control' + (errors.password && touched.password ? ' is-invalid' : '')
    }), /*#__PURE__*/React.createElement(ErrorMessage, {
      name: "password",
      component: "div",
      className: "invalid-feedback"
    })), /*#__PURE__*/React.createElement("div", {
      className: "form-group"
    }, /*#__PURE__*/React.createElement("button", {
      type: "submit",
      className: "btn btn-primary",
      disabled: isSubmitting
    }, "Login"), isSubmitting && WaitAnimation()), status && !includesAppValidLinks(status) && /*#__PURE__*/React.createElement("div", {
      className: 'alert alert-danger'
    }, status), status && includesAppValidLinks(status) && /*#__PURE__*/React.createElement("div", {
      className: 'alert alert-danger',
      dangerouslySetInnerHTML: {
        __html: status
      }
    }))));
  }));
};

const HomePage = _ref => {
  let {
    children,
    appLogo
  } = _ref;
  const [currentUser, setCurrentUser] = useState(authenticationService.currentUserValue);
  useEffect(() => {
    const subscription = authenticationService.currentUser.subscribe(x => setCurrentUser(x));
    return () => subscription.unsubscribe();
  }, []);
  if (!currentUser) {
    return /*#__PURE__*/React.createElement(LoginPage, {
      appLogo: appLogo || null
    });
  }
  return /*#__PURE__*/React.createElement(React.Fragment, null, children);
};

// GenericMenuService (GMS) main


/* eslint no-eval: 0 */
const jsPrefixToken = "|js|";
const getOnClickObject = function (onClickString, setExpanded) {
  let componentMapping = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let resutlFunction = null;
  if (onClickString === null) {
    if (setExpanded) {
      resutlFunction = () => {
        setExpanded();
      };
    }
  } else {
    if (onClickString.startsWith(jsPrefixToken)) {
      onClickString = onClickString.substring(jsPrefixToken.length);
      if (setExpanded) {
        resutlFunction = () => {
          setExpanded();
          eval(onClickString);
          return window.location.href;
        };
      } else {
        resutlFunction = () => {
          eval(onClickString);
          return window.location.href;
        };
      }
    } else {
      if (setExpanded) {
        resutlFunction = () => {
          setExpanded(componentMapping[onClickString]);
        };
      } else {
        resutlFunction = componentMapping[onClickString];
      }
    }
  }
  return resutlFunction;
};
const GenericMenuBuilder = _ref => {
  let {
    title = null,
    componentMapping,
    itemType,
    menuOptions = null,
    status,
    login,
    setExpanded,
    appLogo = null
  } = _ref;
  const getElementObj = item => {
    const ElementObj = componentMapping[item.element];
    if (typeof ElementObj === 'undefined') {
      return null;
    }
    return /*#__PURE__*/React.createElement(ElementObj, null);
  };
  const getItemDefaults = function (item) {
    let topTitle = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
    const hard_prefix = defaultValue(item, "hard_prefix", false);
    const get_prefix = defaultValue(item, "get_prefix", true);
    const reload = defaultValue(item, "reload", false);
    const element_obj = getElementObj(item);
    let path = defaultValue(item, "path", null);
    if (get_prefix && path) {
      path = getPrefix(hard_prefix) + path;
    }
    if (!path) {
      path = "#";
    }
    const on_click = getOnClickObject(defaultValue(item, "on_click", null), setExpanded, componentMapping);
    const title = topTitle == null ? item.title : "[".concat(topTitle, "]");
    return {
      "hard_prefix": hard_prefix,
      "get_prefix": get_prefix,
      "element_obj": element_obj,
      "path": path,
      "on_click": on_click,
      "title": title,
      "reload": reload
    };
  };
  const getRoutes = () => {
    if (login) {
      return '';
    }
    const menuOptionsFinal = [...menuOptions, ...getDefaultRoutesRaw(appLogo)];
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Routes, {
      history: history
    }, menuOptionsFinal.map(item => {
      const itemDefs = getItemDefaults(item);
      if (item.type === "nav_link") {
        return /*#__PURE__*/React.createElement(Route, {
          key: itemDefs["title"],
          path: itemDefs["path"],
          element: itemDefs["element_obj"]
        });
      }
      return item.sub_menu_options.map(subItem => {
        const itemDefs = getItemDefaults(subItem);
        if (subItem.type === 'editor') {
          try {
            return editorRoute(componentMapping[subItem.element]());
          } catch (error) {
            console_debug_log("[GMB-GR-E010] subItem.element: ".concat(subItem.element));
            console_debug_log(error);
            return null;
          }
        }
        return /*#__PURE__*/React.createElement(Route, {
          key: itemDefs["title"],
          path: itemDefs["path"],
          element: itemDefs["element_obj"]
        });
      });
    }), /*#__PURE__*/React.createElement(Route, {
      key: "invalidRoute",
      path: "*",
      element: /*#__PURE__*/React.createElement(InvalidRouteRedirect, null)
    })));
  };
  const GetNavs = (item_type_filter, topTitle) => {
    if (login) {
      return '';
    }
    return menuOptions.filter(item => item.location === item_type_filter).map(item => {
      const itemDefs = getItemDefaults(item, topTitle);
      if (item.type === "nav_link") {
        // Items in main menu, not belonging to any NavDropdown
        return /*#__PURE__*/React.createElement(Nav.Link, {
          key: item.title,
          as: Link,
          to: itemDefs["path"],
          onClick: itemDefs["on_click"],
          reloadDocument: itemDefs["reload"]
        }, itemDefs["title"]);
      }
      // Navigation dropdown (main menu item with sub-menus)
      return /*#__PURE__*/React.createElement(NavDropdown, {
        key: item.title,
        title: itemDefs["title"],
        id: "basic-nav-dropdown"
      }, item.sub_menu_options.map(subItem => {
        const itemDefs = getItemDefaults(subItem);
        if (subItem.type === 'editor') {
          try {
            return editorMenuOption(componentMapping[subItem.element](), setExpanded);
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
          reloadDocument: itemDefs["reload"]
        }, itemDefs["title"]);
      }));
    });
  };
  const menuItems = (item_type_filter, topTitle) => {
    if (login) {
      return '';
    }
    if (typeof menuOptions === 'undefined' || menuOptions === null) {
      return '';
    }
    // Routes
    if (item_type_filter === 'routes') {
      return getRoutes();
    }
    // NavLinks
    return GetNavs(item_type_filter, topTitle);
  };
  if (status !== "" && itemType === "routes") {
    // if (login) {
    //     return '';
    // }
    return /*#__PURE__*/React.createElement(DefaultRoutes, {
      appLogo: appLogo
    });
  }
  if (status !== "") {
    // return '';
    return /*#__PURE__*/React.createElement(DefaultRoutes, {
      appLogo: appLogo
    });
  }
  return menuItems(itemType, title);
};
const editorRoute = editor => {
  return /*#__PURE__*/React.createElement(Route, {
    path: getPrefix() + '/' + editor.baseUrl,
    element: /*#__PURE__*/React.createElement(editor.component, null)
  });
};
const editorMenuOption = (editor, setExpanded) => {
  return /*#__PURE__*/React.createElement(NavDropdown.Item, {
    key: editor.title,
    as: Link,
    to: getPrefix() + '/' + editor.baseUrl,
    onClick: getOnClickObject(null, setExpanded)
  }, editor.title);
};
const getDefaultRoutesRaw = function () {
  let appLogo = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  return [{
    title: 'homepage1',
    path: "/",
    element_obj: /*#__PURE__*/React.createElement(HomePage, {
      appLogo: appLogo
    }),
    type: "nav_link"
  }, {
    title: 'homepage2',
    path: getPrefix(true) + "/",
    element_obj: /*#__PURE__*/React.createElement(HomePage, {
      appLogo: appLogo
    }),
    type: "nav_link"
  }, {
    title: 'homepage3',
    path: getPrefix(true).replace('/#', '/') + "/",
    element_obj: /*#__PURE__*/React.createElement(HomePage, {
      appLogo: appLogo
    }),
    type: "nav_link"
  }, {
    title: 'loginpage1',
    path: "/login",
    element_obj: /*#__PURE__*/React.createElement(LoginPage, {
      appLogo: appLogo
    }),
    type: "nav_link"
  }, {
    title: 'loginpage2',
    path: getPrefix(true) + "/login",
    element_obj: /*#__PURE__*/React.createElement(LoginPage, {
      appLogo: appLogo
    }),
    type: "nav_link"
  }, {
    title: 'loginpage3',
    path: getPrefix(true).replace('/#', '/') + "/login",
    element_obj: /*#__PURE__*/React.createElement(LoginPage, {
      appLogo: appLogo
    }),
    type: "nav_link"
  }];
};

// Catch all invalid routes and redirect to a default page or show a not found component
const InvalidRouteRedirect = () => {
  console_debug_log('InvalidRouteRedirect');
  return /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger",
    role: "alert"
  }, "URL not found...");
};
const DefaultRoutes = _ref2 => {
  let {
    appLogo = null
  } = _ref2;
  getPrefix(true).replace('/#', '/') + "/";
  return /*#__PURE__*/React.createElement(Routes, {
    history: history
  }, getDefaultRoutesRaw(appLogo).map(item => {
    return /*#__PURE__*/React.createElement(Route, {
      key: item["title"],
      path: item["path"],
      element: item["element_obj"]
    });
  }));
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

var generic_menu_service = /*#__PURE__*/Object.freeze({
    __proto__: null,
    DefaultRoutes: DefaultRoutes,
    GenericMenuBuilder: GenericMenuBuilder,
    editorMenuOption: editorMenuOption,
    editorRoute: editorRoute,
    getDefaultRoutesRaw: getDefaultRoutesRaw,
    getMenuFromApi: getMenuFromApi
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

// GenericCrudEditor provider. To share data and functions between the editor components


// Create a context to hold the function
const MainSectionContext = /*#__PURE__*/createContext();

// Provider Component
const MainSectionProvider = _ref => {
  let {
    children
  } = _ref;
  const [cache, setCache] = useState({});
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
    console_debug_log(">>>>--->> listCache [".concat(description, "]:"), listCache());
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
const processGenericFuncArray = (editor, funcArrayName, data, action) => {
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
      return objFunc(data, editor, action);
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

// export const UserFilterDbListPreRead = (data, editor, action) => {
//     // User filter DbListPreRead to filter by user_id
//     return new Promise((resolve, reject) => {
//         let resp = genericFuncArrayDefaultValue(data);
//         const { currentUserValue } = authenticationService;
//         resp.fieldValues['user_id'] = currentUserValue.id
//         // console_debug_log(">>> UserFilterDbListPreRead | resp:");
//         // console_debug_log(resp);
//         resolve(resp);
//     });
// }

// export const UserFilterDbPreRead = (data, editor, action) => {
//     // user_id assignment during Database Pre Read
//     // Template: timestampDbPostRead
//     return new Promise((resolve, reject) => {
//         let resp = genericFuncArrayDefaultValue(data);
//         const { currentUserValue } = authenticationService;
//         // console_debug_log(`>>> UserFilterDbPreRead ||| data:`);
//         // console_debug_log(data);
//         data['user_id'] = currentUserValue.id
//         resp.fieldValues.resultset =  Object.assign({}, data);
//         // resp.fieldValues['user_id'] = currentUserValue.id
//         // console_debug_log(`>>> UserFilterDbPreRead | currentUserValue.id: ${currentUserValue.id} | resp:`);
//         // console_debug_log(resp);
//         resolve(resp);
//     });
// }

const mandatoryFiltersDbListPreRead = (data, editor, action) => {
  // Mandatory Filters DbListPreRead to manage filters in list and search
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    if (typeof editor.mandatoryFilters !== 'undefined') {
      resp.fieldValues = replaceSpecialVars(editor.mandatoryFilters);
    }
    // console_debug_log(`>>> mandatoryFiltersDbListPreRead | resp:`, resp, 'editor.mandatoryFilters:', editor.mandatoryFilters);
    resolve(resp);
  });
};
const mandatoryFiltersDbPreRead = (data, editor, action) => {
  // Mandatory Filters assignment during Database Pre Read
  // Template: timestampDbPostRead
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    if (typeof editor.mandatoryFilters !== 'undefined') {
      resp.fieldValues.resultset = Object.assign(data, replaceSpecialVars(editor.mandatoryFilters));
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
const addMissingTz = stringDate => stringDate + (stringDate.indexOf('.') > 0 ? '' : GMT_TAIL);
const dateToTimestap = stringDate => new Date(addMissingTz(stringDate)).valueOf() / 1000;
const nowToTimestap = () => new Date().valueOf() / 1000;
const fixDateWithTz = dateTimeString => {
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
    gfd_response.errorMsg = "GetFormData: ".concat(error.message, " [GCE-GFD-020]");
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

var generic_editor_rfc_common = /*#__PURE__*/Object.freeze({
    __proto__: null,
    getEditoObj: getEditoObj,
    getEditorData: getEditorData,
    getEditorFlags: getEditorFlags,
    getIsReadOnly: getIsReadOnly,
    setEditorParameters: setEditorParameters
});

// GenericCrudEditor select components

const debug$1 = false;
const GenericSelectGenerator = props => {
  const [state, setState] = useState(null);
  const [config, setConfig] = useState(null);
  const [rows, setRows] = useState(null);
  const {
    getCachedData,
    putCachedData,
    typeofCachedData,
    debugCache
  } = useContext(MainSectionContext);
  useEffect(() => {
    setConfig(initConfig(props));
  }, [props]);
  useEffect(() => {
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
          if (debug$1) ;
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
  const [state, setState] = useState(null);
  const [config, setConfig] = useState(null);
  const [rows, setRows] = useState(null);
  const {
    getCachedData,
    putCachedData,
    typeofCachedData
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
  useEffect(() => {
    setConfig(initConfig(props));
  }, [props]);
  useEffect(() => {
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
  } = useFormikContext();
  const [inputValue, setInputValue] = useState(value);
  const [suggestions, setSuggestions] = useState([]);

  // This component's input field must be different to the external input field to enable value sync
  const nameInternal = "".concat(name, "_sdd");
  const filter_api_url = defaultValue(config, 'filter_api_url'); // Ex. "fda_food_query"
  const filter_api_request_method = defaultValue(config, "filter_api_request_method", "POST"); // Ex. true or false
  const filter_search_param_name = defaultValue(config, 'filter_search_param_name'); // Ex. "food_name"
  const filter_search_other_param = defaultValue(config, 'filter_search_other_param'); // Ex. {"autocomplete": "1"}
  const suggestion_id_fieldname = defaultValue(config, "suggestion_id_fieldname"); // Ex. "id"
  const suggestion_desc_fieldname = defaultValue(config, "suggestion_desc_fieldname"); // Ex. "description"
  const suggestion_name_fieldname = defaultValue(config, "suggestion_name_fieldname", suggestion_desc_fieldname); // Ex. "description"
  const autocomplete_fields = defaultValue(config, "autocomplete_fields", {});
  useEffect(() => {
    if (inputValue) {
      // Get suggestions from external surce
      const dbService = new dbApiService({
        url: filter_api_url
      });
      let urlParams = {};
      let bodyData = replaceSpecialVars(filter_search_other_param);
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
    className: "align-middle flex"
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
    className: "invalid-feedback"
  }, "Error: No suggestions found."));
};

var generic_editor_rfc_suggestion_dropdown = /*#__PURE__*/Object.freeze({
    __proto__: null,
    SuggestionDropdown: SuggestionDropdown
});

// Search Engine button


// import GoogleIcon from "../images/google_logo.svg";
const googleIcon = "google_logo.svg";
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
      const googleSearchUrl = "https://www.google.com/search?q=".concat(encodeURIComponent(setPrompt(google_prompt, inputValue)));
      window.open(googleSearchUrl, '_blank');
    }
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "ml-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleGoogleClick
  }, /*#__PURE__*/React.createElement("img", {
    src: imageDirectory + googleIcon,
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
  const [formData, setFormData] = useState(null);
  const [status, setStatus] = useState("");
  const [refresh, setRefresh] = useState(0);
  const [formMsg, setFormMsg] = useState({
    message: message,
    messageType: messageType
  });
  useContext(MainSectionContext);
  const editor = editor_par;
  const mode = mode_par;
  const id = id_par;
  useEffect(() => {
    if (mode === ACTION_CREATE) {
      // To assign specific default values in creation...
      processGenericFuncArray(editor, 'dbPreRead', {}, mode).then(funcResponse => setFormData(funcResponse.fieldValues), error => setStatus(errorAndReEnter(error, '[GCE-FD-010]')));
    }
    if (mode === ACTION_UPDATE || mode === ACTION_READ || mode === ACTION_DELETE) {
      let accessKeysDataScreen = {};
      accessKeysDataScreen[editor.primaryKeyName] = id;
      processGenericFuncArray(editor, 'dbPreRead', accessKeysDataScreen, mode).then(funcResponse => {
        accessKeysDataScreen = Object.assign(funcResponse.fieldValues, editor.parentFilter);
        editor.db.getOne(accessKeysDataScreen).then(data => {
          // To assign specific default values in update, read or delete...
          processGenericFuncArray(editor, 'dbPostRead', data, mode).then(funcResponse => setFormData(funcResponse.fieldValues), error => setStatus(errorAndReEnter(error, '[GCE-FD-020]')));
        }, error => {
          console_debug_log("ERROR - GCE-FD-030");
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
  return (
    /*#__PURE__*/
    // <div className="container mx-auto px-4">
    React.createElement("div", {
      className: "w-screen bg-gray-300 fyn_jumbotron"
    }, /*#__PURE__*/React.createElement("h1", {
      className: "text-2xl font-semibold mb-4"
    }, editor.title + " - " + actionTitle), status && /*#__PURE__*/React.createElement("div", {
      className: ERROR_MSG_CLASS
    }, status), !status && formData && /*#__PURE__*/React.createElement(EditFormFormik, {
      editor: editor,
      parenHandleCancel: onCancel_par,
      setInfoMsg: setInfoMsg_par,
      action: mode,
      dataset: formData.resultset,
      message: formMsg['message'],
      messageType: formMsg['messageType'],
      handleFormPageActions: handleFormPageActions
    }), !status && formData && !editorFlags.isCreate && iterateChildComponents(editor, formData.resultset, handleFormPageActions), '')
  );
};
const PutOneFormfield = _ref2 => {
  let {
    currentObjArray,
    componentSelectFieldsOptions,
    editorFlags,
    errors,
    touched,
    initialValue
  } = _ref2;
  const {
    setFieldValue
  } = useFormikContext();
  let currentObj = currentObjArray[1];
  const labelClass = "font-medium text-gray-700";
  const labelClassRequiredFld = "font-medium text-red-700";
  const divclass = "flex flex-col form-group";
  const fieldClass = "form-control" + (errors[currentObj.name] && touched[currentObj.name] ? " is-invalid" : "") + " border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
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
      if (formula.includes(e.target.name)) {
        const inputs = document.getElementsByName(key);
        if (inputs.length > 0) {
          // const input = inputs[0];
          let calculatedValue = null;
          try {
            calculatedValue = eval(formula);
          } catch (error) {
            console.error('Error calculating value:', error);
          }
          if (!isNaN(calculatedValue)) {
            setFieldValue(key, calculatedValue);
          } else {
            console.error('calculatedValue is:', calculatedValue);
          }
        }
      }
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
  let elementError = /*#__PURE__*/React.createElement(ErrorMessage, {
    name: idName,
    component: "div",
    className: "invalid-feedback"
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
      }, /*#__PURE__*/React.createElement(currentObj.component, null));
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
        className: divclass
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
      className: "align-middle flex"
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
    className: divclass
  }, elementLabel, elementInput, elementError);
};
const EditFormFormik = _ref3 => {
  let {
    editor,
    parenHandleCancel,
    setInfoMsg,
    action,
    dataset,
    message = "",
    messageType = "",
    handleFormPageActions
  } = _ref3;
  const [formData, setFormData] = useState({
    readyToShow: false,
    dataset: null,
    canCommit: null,
    message: null,
    messageType: null
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
      processGenericFuncArray(editor, 'dbPreValidations', dataset, action).then(funcResponse => {
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
    return '';
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
    handleFormPageActions: handleFormPageActions
  });
};
const EditFormFormikFinal = _ref4 => {
  let {
    editor,
    parenHandleCancel,
    setInfoMsg,
    action,
    dataset,
    canCommit,
    message,
    messageType,
    handleFormPageActions
  } = _ref4;
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
    // Todo: THIS DOESN'T WORK IN ACTION=CREATION
    // validationSchema={Yup.object().shape(
    //     getFieldElementsYupValidations(editor, editorFlags)
    // )}
    ,
    onSubmit: (submitedtElements, _ref5) => {
      let {
        setStatus,
        setSubmitting
      } = _ref5;
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
        processGenericFuncArray(editor, 'validations', submitedtElements, action).then(funcResponse => {
          processGenericFuncArray(editor, 'dbPreWrite', submitedtElements, action).then(funcResponse => {
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
                processGenericFuncArray(editor, 'dbPostWrite', submitedtElements, action).then(funcResponse => {
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
  }, _ref6 => {
    let {
      errors,
      status,
      touched,
      isSubmitting
    } = _ref6;
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
        initialValue: initialFieldValues[htmlElement[1].name]
      });
    }), /*#__PURE__*/React.createElement("table", {
      className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700"
    }, /*#__PURE__*/React.createElement("tbody", null, /*#__PURE__*/React.createElement("tr", null, !editorFlags.isRead && canCommit && /*#__PURE__*/React.createElement("td", {
      align: "left"
    }, /*#__PURE__*/React.createElement("button", {
      key: "SubmitButton",
      type: "submit",
      className: BUTTON_PRIMARY_CLASS,
      disabled: isSubmitting
    }, editorFlags.isCreate ? MSG_ACTION_CREATE : editorFlags.isDelete ? MSG_ACTION_DELETE : MSG_ACTION_UPDATE), isSubmitting && WaitAnimation()), /*#__PURE__*/React.createElement("td", {
      align: "left"
    }, /*#__PURE__*/React.createElement("button", {
      key: "CancelButton",
      type: "button",
      className: BUTTON_SECONDARY_CLASS,
      disabled: isSubmitting,
      onClick: handleCancel
    }, MSG_ACTION_CANCEL))))), status && /*#__PURE__*/React.createElement("div", {
      className: ERROR_MSG_CLASS
    }, status), /*#__PURE__*/React.createElement("div", null));
  });
};
const iterateChildComponents = (editor, dataset, handleFormPageActions) => {
  let initialFieldValues = getFieldElementsDbValues(editor, dataset);
  if (initialFieldValues[editor.primaryKeyName] === 0) {
    // Dataset is stil not ready...
    return '';
  }
  return Object.entries(editor.childComponents).map(function (htmlElement) {
    let ChildElement = htmlElement[1];
    if (String(ChildElement).includes('component:')) {
      ChildElement = htmlElement[1]().component;
    }
    return /*#__PURE__*/React.createElement("div", {
      key: 'ChildElement_' + htmlElement[0],
      className: "mt-6"
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
    return {
      ...acc
    };
  }, {});
  return response;
};

var generic_editor_rfc_formpage = /*#__PURE__*/Object.freeze({
    __proto__: null,
    FormPage: FormPage,
    getFieldElementsYupValidations: getFieldElementsYupValidations,
    getSelectFieldsOptions: getSelectFieldsOptions
});

// GenericCrudEditor search component

fontawesome.library.add(faGreaterThan);
const CrudEditorSearch = _ref => {
  let {
    id,
    fieldElements,
    handleCancel,
    value = ""
  } = _ref;
  const [searchText, setSearchText] = useState(value);
  const searchTextId = () => "searchText_".concat(id);
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
    className: "mt-2 flex items-center"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: searchTextId(),
    className: "ml-3 mr-2 text-sm"
  }, MSG_SEARCH, ":"), /*#__PURE__*/React.createElement("input", {
    id: searchTextId()
    // type="text"
    ,
    className: "mb-2 w-6 h-6 px-2 text-sm",
    value: searchText || '',
    onChange: handleTextChange
  }), /*#__PURE__*/React.createElement("button", {
    className: "".concat(BUTTON_LISTING_CLASS, " mb-2 ml-2 mr-2 text-xs"),
    onClick: handleSubmit
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: "greater-than"
  })), searchText !== '' && /*#__PURE__*/React.createElement("button", {
    className: "".concat(BUTTON_LISTING_CLASS, " mb-2 mr-2 text-xs"),
    onClick: handleCancelSearch
  }, "X"));
};

var generic_editor_rfc_search = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CrudEditorSearch: CrudEditorSearch
});

// GenericCrudEditor (GCE) service main

fontawesome.library.add(faPlus, faEye, faEdit, faTrashAlt, faCheck, faList
// faRecycle,
);
const debug = false;
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
  const [editor, setEditor] = useState(null);
  const [rows, setRows] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(ROWS_PER_PAGE);
  const [formMode, setFormMode] = useState([ACTION_LIST, null]);
  const [status, setStatus] = useState("");
  const [infoMsg, setInfoMsg] = useState("");
  const [searchFilters, setSearchFilters] = useState({});
  const [searchText, setSearchText] = useState("");
  const {
    initCache,
    debugCache
  } = useContext(MainSectionContext);
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
      setStatus(errorAndReEnter(error, null));
    });
  }, [props]);
  useEffect(() => {
    // if (editor && !status) {
    if (editor) {
      ShowHidePageAnimation(true);
      let accessKeysListing = {
        page: currentPage,
        limit: rowsPerPage
      };
      // dbListPreRead: To set a Listing filters, assign funcResponse.fieldValues[db_field]=filter_value
      processGenericFuncArray(editor, 'dbListPreRead', accessKeysListing, formMode).then(funcResponse => {
        // console_debug_log(`GenericCrudEditor / dbListPreRead - funcResponse:`)
        // console_debug_log(funcResponse);
        accessKeysListing = Object.assign(accessKeysListing, editor.parentFilter, searchFilters, funcResponse.fieldValues);
        editor.db.getAll(accessKeysListing).then(data => {
          ShowHidePageAnimation(false);
          // dbListPostRead: To fix Listing fields
          processGenericFuncArray(editor, 'dbListPostRead', data, formMode).then(funcResponse => setRows(funcResponse.fieldValues), error => setStatus(errorAndReEnter(error, null)));
        }, error => {
          console_debug_log("GenericCrudEditor / Listing - ERROR:");
          console.error(error);
          ShowHidePageAnimation(false);
          setStatus(errorAndReEnter(error, null));
        });
      }, error => {
        console_debug_log("GenericCrudEditor / dbListPreRead - ERROR:");
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
  if (!editor) {
    if (status) {
      return /*#__PURE__*/React.createElement("div", {
        className: ERROR_MSG_CLASS
      }, status, debug );
    }
    return WaitAnimation();
  }
  if (!rows && !status) {
    return WaitAnimation();
  }
  if (status) {
    return /*#__PURE__*/React.createElement("div", {
      className: ERROR_MSG_CLASS
    }, status, debug );
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
  return /*#__PURE__*/React.createElement(React.Fragment, null, infoMsg && /*#__PURE__*/React.createElement("div", {
    className: INFO_MSG_CLASS
  }, infoMsg), rows &&
  /*#__PURE__*/
  // <div className="container mx-auto">
  React.createElement("div", {
    className: "w-screen bg-gray-300 fyn_jumbotron"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-2xl font-bold mb-4"
  }, editor.title + " - " + MSG_ACTION_LIST, /*#__PURE__*/React.createElement("span", {
    className: "pl-2 align-bottom"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleRefresh,
    className: "".concat(BUTTON_LISTING_CLASS, " text-xs") /* mb-4 */
  }, /*#__PURE__*/React.createElement("img", {
    src: imageDirectory + "arrows_rotate_solid.svg",
    width: "14",
    height: "14",
    alt: "Reload",
    className: "text-white fill-white"
  })))), /*#__PURE__*/React.createElement("table", {
    className: "min-w-full divide-y divide-gray-200 dark:divide-gray-700"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    key: "".concat(editor.baseUrl, "_thead")
  }, Object.keys(editor.fieldElements).map(key => editor.fieldElements[key].listing && /*#__PURE__*/React.createElement("th", {
    key: key,
    scope: "col",
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase break-words"
  }, editor.fieldElements[key].label)), /*#__PURE__*/React.createElement("th", {
    scope: "col",
    className: "px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "pr-2"
  }, MSG_ACTIONS), /*#__PURE__*/React.createElement("button", {
    onClick: handleNew,
    className: "".concat(BUTTON_LISTING_CLASS, " mr-2")
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: "plus"
  }), " ", MSG_ACTION_NEW))))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-gray-200 dark:divide-gray-700"
  }, rows && typeof rows.resultset !== 'undefined' && rows.resultset.map(row => /*#__PURE__*/React.createElement("tr", {
    // key={rowId(row)}
    key: "".concat(editor.baseUrl, "_row_").concat(rowId(row))
  }, Object.keys(editor.fieldElements).map(key => editor.fieldElements[key].listing && /*#__PURE__*/React.createElement("td", {
    key: key,
    className: "px-6 py-4 break-words text-sm text-gray-800 dark:text-gray-200"
  }, getSelectDescription(editor.fieldElements[key], row) // Show column value or select description
  )), /*#__PURE__*/React.createElement("td", {
    className: "px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("button", {
    // type="button"
    onClick: () => handleView(rowId(row)),
    className: "".concat(BUTTON_LISTING_CLASS, " mr-2")
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: "eye"
  })), /*#__PURE__*/React.createElement("button", {
    // type="button"
    onClick: () => handleModify(rowId(row)),
    className: "".concat(BUTTON_LISTING_CLASS, " mr-2")
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: "edit"
  })), /*#__PURE__*/React.createElement("button", {
    // type="button"
    onClick: () => handleDelete(rowId(row)),
    className: "".concat(BUTTON_LISTING_CLASS)
  }, /*#__PURE__*/React.createElement(FontAwesomeIcon, {
    icon: "trash"
  })))))))), /*#__PURE__*/React.createElement("div", {
    className: "mt-4 flex items-center"
  }, /*#__PURE__*/React.createElement("button", {
    disabled: currentPage === 1,
    onClick: () => goToNewPage(currentPage - 1),
    className: "".concat(currentPage === 1 ? "opacity-50" : "", " ").concat(BUTTON_LISTING_CLASS)
  }, MSG_PREVIOUS), /*#__PURE__*/React.createElement("span", {
    id: "NavigationAnimation",
    className: "ml-3 mr-3 hidden"
  }, WaitAnimation()), /*#__PURE__*/React.createElement("span", {
    className: "text-sm ml-2 mr-2"
  }, MSG_PAGE, " ", currentPage, " ", MSG_OF, " ", rows.totalPages), /*#__PURE__*/React.createElement("button", {
    disabled: currentPage === rows.totalPages,
    onClick: () => goToNewPage(currentPage + 1),
    className: "".concat(currentPage === rows.totalPages ? "opacity-50" : "", " ").concat(BUTTON_LISTING_CLASS)
  }, MSG_NEXT), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex items-center"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: "newRowsPerPage",
    className: "ml-3 mr-2 text-sm"
  }, MSG_ROWS_PER_PAGE, ":"), /*#__PURE__*/React.createElement("input", {
    type: "number",
    min: "1",
    max: "500",
    id: "newRowsPerPage",
    value: rowsPerPage,
    className: "mb-2 w-6 h-6 px-2 text-sm",
    onChange: handleRowsPerPageChange
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(CrudEditorSearch, {
    id: editor.baseUrl,
    fieldElements: editor.fieldElements,
    handleCancel: handleCancel,
    value: searchText
  }))), status && /*#__PURE__*/React.createElement("div", {
    className: ERROR_MSG_CLASS
  }, status)), '');
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
  const fieldElementsArray = ['component', 'aux_component', 'select_elements', 'dataPopulator'];
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

// export const GetFormData = (jsonFileName, registry, calleeName = null) => {
const GetFormData = function (editorData, registry) {
  let calleeName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  if (typeof registry === 'undefined') {
    registry = {};
  }
  // const editorData = getConfigsJsonFile(jsonFileName);
  let editorDataObj = ConvertToComponents(editorData, registry);
  editorDataObj["calleeName"] = calleeName;
  return editorDataObj;
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

const UsersValidations = (data, editor, action) => {
  // Users pre-deletion/update validations
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    const {
      currentUserValue
    } = authenticationService;
    getUserData(currentUserValue.id).then(userData => {
      if (typeof data !== 'undefined' && typeof data['_id'] !== 'undefined') {
        data['id'] = editor.db.convertId(data['_id']);
      }
      switch (action) {
        case ACTION_DELETE:
          if (data['superuser'] === '1' && userData.resultset['superuser'] === '0') {
            resp.error = true;
            resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 'Super users can be deleted only by other Super users.';
          }
          if (data['id'] === currentUserValue.id) {
            resp.error = true;
            resp.errorMsg = (resp.errorMsg === '' ? '' : '<BR/>') + 'You cannot delete yourself';
          }
          if (userData.resultset['superuser'] === '0' && data['id'] !== currentUserValue.id) {
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
          if (userData.resultset['superuser'] === '0' && data['id'] !== currentUserValue.id) {
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
const UsersDbListPreRead = (data, editor, action) => {
  // Users pre-deletion/update validations
  return new Promise((resolve, reject) => {
    let resp = genericFuncArrayDefaultValue(data);
    const {
      currentUserValue
    } = authenticationService;
    getUserData(currentUserValue.id).then(currentUserData => {
      if (currentUserData.error) {
        resp.error = true;
        resp.errorMsg = currentUserData.errorMsg;
      } else {
        // Set a filter to retrieve only the current user
        if (currentUserData.resultset['superuser'] === '0') {
          resp.fieldValues['_id'] = currentUserValue.id;
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

// export const GenericSinglePageEditorMain = ({ editorConfig, id, parentData }) => {
const GenericSinglePageEditorMain = props => {
  const [editor, setEditor] = useState(null);
  const [formMode, setFormMode] = useState(null);
  const [status, setStatus] = useState("");
  useContext(MainSectionContext);
  const debug = false;
  useEffect(() => {
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
  useEffect(() => {
    const form_mode = [ACTION_UPDATE, props.id];
    setFormMode(form_mode);
  }, [props.id, debug]);
  const setInfoMsg = msg => {
    console_debug_log('setInfoMsg | msg:');
    console_debug_log(msg);
  };
  const handleCancel = () => {
    window.location.href = getPrefix(true) + '/';
  };
  if (!editor) {
    if (status) {
      return /*#__PURE__*/React.createElement("div", {
        className: ERROR_MSG_CLASS
      }, status, "[GSPE-NES]");
    }
    return WaitAnimation();
  }
  if (status) {
    return /*#__PURE__*/React.createElement("div", {
      className: ERROR_MSG_CLASS
    }, status, "[GSPE-ST]");
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
    currentUserValue
  } = authenticationService;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(GenericSinglePageEditor, {
    id: currentUserValue.id,
    editorConfig: UsersProfile_EditorData()
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
  };
  // return GetFormData('general_config', registry, 'GeneralConfig_EditorData');
  return GetFormData(general_config, registry, 'GeneralConfig_EditorData');
}
const GeneralConfig = () => /*#__PURE__*/React.createElement(GenericCrudEditor, {
  editorConfig: GeneralConfig_EditorData()
});

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".fyn_jumbotron {\n    /* padding: 2rem 1rem;\n    margin-bottom: 2rem; */\n    background-color: #e9ecef;\n    border-radius: 0.3rem;\n    font-family: -apple-system,BlinkMacSystemFont,\"Segoe UI\",Roboto,\"Helvetica Neue\",Arial,sans-serif,\"Apple Color Emoji\",\"Segoe UI Emoji\",\"Segoe UI Symbol\";\n    font-size: 1rem;\n    font-weight: 400;\n    line-height: 1.5;\n}\n";
styleInject(css_248z);

const defaultComponentMap = {
  "Users_EditorData": Users_EditorData,
  "GeneralConfig_EditorData": GeneralConfig_EditorData,
  "UserProfileEditor": UserProfileEditor,
  // "Chatbot": ChatBot,
  "HomePage": HomePage,
  "LoginPage": LoginPage,
  "About": About,
  "AboutBody": AboutBody,
  "logout": logoutHander
};
const isComponent = componentObj => {
  return String(componentObj).includes('component:');
};
function setExpanded(componentObj) {
  if (document.getElementById("navbar-main-toggle") && !document.getElementById("navbar-main-toggle").classList.contains("collapsed")) {
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
}
const App = _ref => {
  let {
    componentMap = {},
    appLogo = null
  } = _ref;
  const [currentUser, setCurrentUser] = useState(null);
  const [state, setState] = useState("");
  const [login, setLogin] = useState(false);
  const [menuOptions, setMenuOptions] = useState(null);
  const urlParams = getUrlParams();
  const showContentOnly = urlParams && typeof urlParams.menu !== "undefined" && urlParams.menu === "0";
  const version = process.env.REACT_APP_VERSION;
  const appName = process.env.REACT_APP_APP_NAME;
  const componentMapFinal = mergeDicts(componentMap, defaultComponentMap);
  useEffect(() => {
    if (authenticationService.currentUser) {
      const subscription = authenticationService.currentUser.subscribe(x => setCurrentUser(x));
      return () => subscription.unsubscribe();
    }
  }, []);
  useEffect(() => {
    if (!(login || window.location.href.includes("/login"))) {
      getMenuFromApi(state, setState, setMenuOptions);
    }
  }, [state, login]);
  const stateHandler = () => {
    setLogin(true);
    logoutHander();
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, !showContentOnly && /*#__PURE__*/React.createElement("div", {
    className: "w-screen"
  }, /*#__PURE__*/React.createElement(Navbar, {
    id: "navbar-main",
    collapseOnSelect: true,
    expand: "lg",
    className: "bg-body-tertiary navbar-dark bg-dark"
  }, /*#__PURE__*/React.createElement(Container, null, /*#__PURE__*/React.createElement(Navbar.Brand, {
    as: Link,
    to: currentUser ? '/' : '/#/login'
    // to={(currentUser ? window.location.origin + '/#' : '/#/login')}
    ,
    onClick: () => currentUser ? setExpanded() : setExpanded(() => window.location.reload())
  }, appName, " ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: '60%'
    }
  }, version)), currentUser && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Navbar.Toggle, {
    id: "navbar-main-toggle",
    "aria-controls": "responsive-navbar-nav"
  }), /*#__PURE__*/React.createElement(Navbar.Collapse, {
    id: "basic-navbar-nav"
  }, /*#__PURE__*/React.createElement(Nav, {
    className: "me-auto"
  }, /*#__PURE__*/React.createElement(GenericMenuBuilder, {
    componentMapping: componentMapFinal,
    itemType: "top_menu",
    menuOptions: menuOptions,
    status: state,
    setExpanded: setExpanded
  }))), /*#__PURE__*/React.createElement(Navbar.Collapse, {
    id: "current-user-navbar-nav",
    className: "justify-content-end"
  }, /*#__PURE__*/React.createElement(Navbar.Text, null, "Signed in as:"), /*#__PURE__*/React.createElement(GenericMenuBuilder, {
    title: currentUser.firstName,
    componentMapping: componentMapFinal,
    itemType: "hamburger",
    menuOptions: menuOptions,
    status: state,
    showContentOnly: showContentOnly,
    setExpanded: setExpanded
  })))))), /*#__PURE__*/React.createElement("div", {
    className: "w-screen bg-gray-300 fyn_jumbotron",
    style: {
      minHeight: '88vh'
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-2"
  }, /*#__PURE__*/React.createElement(AppMainComponent, {
    login: login,
    state: state,
    stateHandler: stateHandler,
    menuOptions: menuOptions,
    componentMap: componentMapFinal,
    setExpanded: setExpanded,
    showContentOnly: showContentOnly,
    appLogo: appLogo
  }))), state !== '' && /*#__PURE__*/React.createElement(DefaultRoutes, null));
};
const CloseButton = _ref2 => {
  let {
    children
  } = _ref2;
  return /*#__PURE__*/React.createElement(React.Fragment, null, children && /*#__PURE__*/React.createElement("div", {
    className: "alert alert-danger",
    role: "alert"
  }, children), /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => window.close(),
    className: "ml-2 mb-1 bg-blue-500 text-white p-0 rounded close"
  }, "Close"));
};
const AppMainComponent = _ref3 => {
  let {
    login,
    state,
    stateHandler,
    menuOptions,
    componentMap,
    showContentOnly,
    setExpanded,
    appLogo = null
  } = _ref3;
  if (login || window.location.href.includes("/login")) {
    if (showContentOnly) {
      return /*#__PURE__*/React.createElement(CloseButton, null, "Re-login is required...");
    }
    return /*#__PURE__*/React.createElement(LoginPage, {
      appLogo: appLogo
    });
  }
  if (state !== "") {
    if (showContentOnly) {
      return /*#__PURE__*/React.createElement(CloseButton, null, getErrorMessage(state));
    }
    return errorAndReEnter(state, null, true, null, stateHandler, false, false);
  }
  if (!menuOptions) {
    return WaitAnimation();
  }
  return /*#__PURE__*/React.createElement(GenericMenuBuilder, {
    componentMapping: componentMap,
    itemType: "routes",
    menuOptions: menuOptions,
    status: state,
    setExpanded: setExpanded,
    appLogo: appLogo
  });
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

const PrivateRoute = _ref => {
  let {
    component: Component,
    ...rest
  } = _ref;
  return /*#__PURE__*/React.createElement(Route, _extends({}, rest, {
    render: props => {
      const currentUser = authenticationService.currentUserValue;
      if (!currentUser) {
        console_debug_log('PrivateRoute Not Authorized...');
        // not logged in so redirect to login page with the return url
        return /*#__PURE__*/React.createElement(Navigate, {
          to: {
            pathname: getPrefix(true) + '/login',
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
const CopyButton = _ref2 => {
  let {
    text
  } = _ref2;
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
    }
  }, "Copy"));
};
const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
};

var ui = /*#__PURE__*/Object.freeze({
    __proto__: null,
    CopyButton: CopyButton,
    LinkifyText: LinkifyText,
    getElementWithErrorHandling: getElementWithErrorHandling,
    growUpTextArea: growUpTextArea,
    growUpTextAreaInner: growUpTextAreaInner,
    isMobileDevice: isMobileDevice,
    resetTextArea: resetTextArea,
    toggleIdVisibility: toggleIdVisibility
});

// GenericCrudEditor UI components

const ShowAsDisabledField = _ref => {
  let {
    className = '',
    // backgroundColor = 'bg-gray-200',
    backgroundColor = '#e9ecef',
    children
  } = _ref;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    // className={`${backgroundColor} ${className}`}
    // className={`${backgroundColor}`}
    className: "".concat(className),
    style: {
      backgroundColor: backgroundColor
    }
  }, children));
};

var generic_editor_rfc_ui = /*#__PURE__*/Object.freeze({
    __proto__: null,
    ShowAsDisabledField: ShowAsDisabledField
});

// Components
// Images
const appLogoEmblem = 'app_log_emblem.svg';
const appLogoCircle = 'app_logo_circle.svg';
const appLogoHorizontal = 'app_logo_horizontal.svg';
const appLogoSquare = 'app_logo_square.svg';
const arrowsRotateSolid = 'arrows_rotate_solid.svg';
const clip = 'clip.svg';
const googleLogo = 'google_logo.svg';
const madebyLogoEmblem = 'madeby_logo_emblem.svg';
const madebyLogoSquare = 'madeby_logo_square.svg';
const spark = 'spark.svg';

export { About, AboutBody, App, GeneralConfig, GeneralConfig_EditorData, HomePage, LoginPage, ModalPopUp$1 as ModalPopUp, PrivateRoute$1 as PrivateRoute, UserProfileEditor, Users, UsersConfig, UsersConfig_EditorData, UsersDbListPreRead, UsersDbPreWrite, UsersPasswordValidations, UsersProfile_EditorData, UsersValidations, Users_EditorData, app_constants as appConstants, appLogoCircle, appLogoEmblem, appLogoHorizontal, appLogoSquare, arrowsRotateSolid, authHeader$1 as authHeader, authentication_service as authenticationService, blob_files_utilities as blobFilesUtilities, class_name_constants as classNameConstants, clip, conversions, dateTimestamp, db_service as dbService, dictUtilities, errorAndReenter, general_constants as generalConstants, generic_editor_rfc_common as genericEditorRfcCommon, generic_editor_rfc_formpage as genericEditorRfcFormpage, generic_editor_rfc_provider as genericEditorRfcProvider, generic_editor_rfc_search as genericEditorRfcSearch, generic_editor_rfc_search_engine_button as genericEditorRfcSearchEngineButton, generic_editor_rfc_selector as genericEditorRfcSelector, generic_editor_rfc_service as genericEditorRfcService, generic_editor_rfc_specific_func as genericEditorRfcSpecificFunc, generic_editor_rfc_suggestion_dropdown as genericEditorRfcSuggestionDropdown, generic_editor_rfc_timestamp as genericEditorRfcTimestamp, generic_editor_rfc_ui as genericEditorRfcUi, generic_editor_singlepage as genericEditorSinglepage, generic_editor_utilities as genericEditorUtilities, generic_menu_service as genericMenuService, googleLogo, history$1 as history, jsonUtilities, logging_service as loggingService, logout_service as logoutService, madebyLogoEmblem, madebyLogoSquare, media, ramdomize, response_handlers_service as responseHandlersService, spark, ui, urlParams, wait_animation_utility as waitAnimationUtility };
//# sourceMappingURL=index.js.map
