import * as rxjs from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import * as react_router_dom from 'react-router-dom';
import React from 'react';

declare function About(): React.FunctionComponentElement<any>;
declare function AboutBody(_ref: any): React.DetailedReactHTMLElement<React.HTMLAttributes<HTMLElement>, HTMLElement>;
declare function App(_ref: any): React.FunctionComponentElement<{
    children?: React.ReactNode | undefined;
}>;
declare function GeneralConfig(): React.FunctionComponentElement<any>;
declare function GeneralConfig_EditorData(): any;
declare function HomePage(_ref: any): React.FunctionComponentElement<{
    children?: React.ReactNode | undefined;
}> | React.FunctionComponentElement<any>;
declare function LoginPage(props: any): React.FunctionComponentElement<{
    children?: React.ReactNode | undefined;
}>;
declare var ModalPopUp$1: Readonly<{
    __proto__: null;
    DefaultButtonModal: (_ref2: any) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    LogoutNavigate: (_ref3: any) => React.DetailedReactHTMLElement<{
        variant: any;
        className: string;
        href: string;
    }, HTMLElement>;
    ModalPopUp: (_ref: any) => React.FunctionComponentElement<{
        children?: React.ReactNode | undefined;
    }>;
}>;
declare var PrivateRoute$1: Readonly<{
    __proto__: null;
    PrivateRoute: (_ref: any) => React.FunctionComponentElement<react_router_dom.RouteProps>;
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
declare function UsersDbListPreRead(data: any, editor: any, action: any): Promise<any>;
declare function UsersDbPreWrite(data: any, editor: any, action: any): Promise<any>;
declare function UsersPasswordValidations(data: any, editor: any, action: any): Promise<any>;
declare function UsersProfile_EditorData(): any;
declare function UsersValidations(data: any, editor: any, action: any): Promise<any>;
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
declare const appLogoEmblem: "app_log_emblem.svg";
declare const appLogoHorizontal: "app_logo_horizontal.svg";
declare const appLogoSquare: "app_logo_square.svg";
declare const arrowsRotateSolid: "arrows_rotate_solid.svg";
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
    getUserData: (userId: any) => Promise<any>;
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
    BUTTON_LISTING_CLASS: "bg-blue-500 text-white p-2 rounded text-sm";
    BUTTON_PRIMARY_CLASS: "bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500";
    BUTTON_SECONDARY_CLASS: "bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500";
    ERROR_MSG_CLASS: "alert alert-danger mt-4 p-2 rounded-md";
    GRAY_BOX_MSG_CLASS: "alert text-black bg-gray-200 mt-4 p-2 rounded-md";
    INFO_MSG_CLASS: "alert alert-info mt-4 p-2 rounded-md";
    INPUT_FLEXIBLE_CLASS: "pl-1 pb-1 pt-1 pr-1 block w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md resize-none overflow-hidden";
    SUCCESS_MSG_CLASS: "alert alert-success text-black mt-4 p-2 rounded-md";
    WARNING_MSG_CLASS: "alert alert-warning mt-4 p-2 rounded-md";
}>;
declare const clip: "clip.svg";
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
    MSG_MUST_BE: "must be";
    MSG_NEXT: "Next";
    MSG_OF: "of";
    MSG_PAGE: "Page";
    MSG_PREVIOUS: "Previous";
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
    getSelectFieldsOptions: (fieldElements: any) => {
        name: any;
        promiseResult: any;
    }[];
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
    mandatoryFiltersDbListPreRead: (data: any, editor: any, action: any) => Promise<any>;
    mandatoryFiltersDbPreRead: (data: any, editor: any, action: any) => Promise<any>;
    processGenericFuncArray: (editor: any, funcArrayName: any, data: any, action: any) => Promise<any>;
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
    replaceSpecialVars: (params: any) => any;
}>;
declare var generic_menu_service: Readonly<{
    __proto__: null;
    DefaultRoutes: (_ref2: any) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    GenericMenuBuilder: (_ref: any) => any;
    editorMenuOption: (editor: any, setExpanded: any) => React.DetailedReactHTMLElement<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;
    editorRoute: (editor: any) => React.FunctionComponentElement<react_router_dom.RouteProps>;
    getDefaultRoutesRaw: (...args: any[]) => {
        title: string;
        path: string;
        element_obj: React.FunctionComponentElement<any>;
        type: string;
    }[];
    getMenuFromApi: (state: any, setState: any, setMenuOptions: any) => void;
}>;
declare const googleLogo: "google_logo.svg";
declare var history$1: Readonly<{
    __proto__: null;
    getLastUrl: () => string;
    getPrefix: typeof getPrefix;
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
    logout: typeof logout;
}>;
declare const madebyLogoEmblem: "madeby_logo_emblem.svg";
declare const madebyLogoSquare: "madeby_logo_square.svg";
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
declare const spark: "spark.svg";
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
    resetTextArea: (textAreaId: any, conversationBlockId: any, sectionViewportHeight: any, maxOffsetHeight: any, ...args: any[]) => void;
    toggleIdVisibility: (onOff: any, ids: any) => void;
}>;
declare var urlParams: Readonly<{
    __proto__: null;
    getUrlParams: typeof getUrlParams;
}>;
declare var wait_animation_utility: Readonly<{
    __proto__: null;
    ShowHidePageAnimation: (showFlag: any, ...args: any[]) => void;
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
declare function getUrlParams(...args: any[]): {};

export { About, AboutBody, App, GeneralConfig, GeneralConfig_EditorData, HomePage, LoginPage, ModalPopUp$1 as ModalPopUp, PrivateRoute$1 as PrivateRoute, UserProfileEditor, Users, UsersConfig, UsersConfig_EditorData, UsersDbListPreRead, UsersDbPreWrite, UsersPasswordValidations, UsersProfile_EditorData, UsersValidations, Users_EditorData, app_constants as appConstants, appLogoCircle, appLogoEmblem, appLogoHorizontal, appLogoSquare, arrowsRotateSolid, authHeader$1 as authHeader, authentication_service as authenticationService, blob_files_utilities as blobFilesUtilities, class_name_constants as classNameConstants, clip, conversions, dateTimestamp, db_service as dbService, dictUtilities, errorAndReenter, general_constants as generalConstants, generic_editor_rfc_common as genericEditorRfcCommon, generic_editor_rfc_formpage as genericEditorRfcFormpage, generic_editor_rfc_provider as genericEditorRfcProvider, generic_editor_rfc_search as genericEditorRfcSearch, generic_editor_rfc_search_engine_button as genericEditorRfcSearchEngineButton, generic_editor_rfc_selector as genericEditorRfcSelector, generic_editor_rfc_service as genericEditorRfcService, generic_editor_rfc_specific_func as genericEditorRfcSpecificFunc, generic_editor_rfc_suggestion_dropdown as genericEditorRfcSuggestionDropdown, generic_editor_rfc_timestamp as genericEditorRfcTimestamp, generic_editor_rfc_ui as genericEditorRfcUi, generic_editor_singlepage as genericEditorSinglepage, generic_editor_utilities as genericEditorUtilities, generic_menu_service as genericMenuService, googleLogo, history$1 as history, jsonUtilities, logging_service as loggingService, logout_service as logoutService, madebyLogoEmblem, madebyLogoSquare, media, ramdomize, response_handlers_service as responseHandlersService, spark, ui, urlParams, wait_animation_utility as waitAnimationUtility };
