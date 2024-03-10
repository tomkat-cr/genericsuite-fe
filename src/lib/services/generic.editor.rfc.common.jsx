// GenericCrudEditor common functions

import {
    timestampDbListPostRead,
    timestampDbPostRead,
    timestampDbPreWrite,
} from './generic.editor.rfc.timestamp.jsx';
import {
    mandatoryFiltersDbListPreRead,
    mandatoryFiltersDbPreRead,
} from './generic.editor.rfc.specific.func.jsx';
import { getSelectFieldsOptions } from './generic.editor.rfc.formpage.jsx';
import { console_debug_log } from './logging.service.jsx';
import { getUrlParams } from "../helpers/url-params.jsx";
import { formatCaughtError } from "../helpers/error-and-reenter.jsx";
import { dbApiService } from "./db.service.jsx";

import {
    ACTION_CREATE,
    ACTION_READ,
    ACTION_UPDATE,
    ACTION_DELETE,
    MSG_ERROR_MISSING_ARRAY_NAME_PARAM,
} from "../constants/general_constants.jsx";

export const getEditorData = (props) => (
    props.editorConfig
)

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
    editor.parentKeyNames.map(
        (keyPair) =>
        (
            newParentFilter[keyPair.parameterName] =
            parentData[keyPair.parentElementName]
        )
    );
    // IMPORTANT: parentFilter and parentData
    // This is for editor.type = 'child_listing' / editor.subType = 'array'
    // The component call must have the parentData={parentData} attribute
    // and eventually handleFormPageActions={handleFormPageActions}
    editor.parentFilter = newParentFilter;
    editor.parentData = parentData;
    return editor;
};

const getColumns = (editor) => {
    return Object.keys(editor.fieldElements).map((key) => {
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

export const getEditoObj = (props, editor_response) => {
    let editor = (editor_response.response);
    editor.error = null;
    editor.errorMsg = null;
    // Database backend handler
    editor.db = new dbApiService({ url: editor.dbApiUrl });
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
        editor.dbListPreRead.push(
            mandatoryFiltersDbListPreRead
        )
        editor.dbPreRead.push(
            mandatoryFiltersDbPreRead
        )
    }
    // THESE 3 MUST BE LAST ONES
    // Date <-> Timestamp management
    editor.dbListPostRead.push(
        timestampDbListPostRead, // this must be the lastone
    )
    editor.dbPostRead.push(
        timestampDbPostRead, // this must be the lastone
    )
    editor.dbPreWrite.push(
        timestampDbPreWrite, // this must be the lastone
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
    if (typeof editor.array_name == 'undefined' &&
        editor.subType === 'array') {
        // No default value for the array name
        // editor.array_name = editor.baseUrl
        editor.error = MSG_ERROR_MISSING_ARRAY_NAME_PARAM; // 'Missing "array_name" parameter. It must be specified for subType "array".';
    }
    // Filters for child components
    editor = setParentData(
        (typeof props.parentData !== 'undefined' ?
            props.parentData : null
        ),
        editor
    );
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
}

const verifyEditorObj = (editorObj) => {
    const debug = false;
    let gfd_response = { "error": false, "error_message": "", "response": null };
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
        if (debug) {
            console_debug_log(`calleeName == FALSEEEEEEE`)
        }
        gfd_response.response = editorObj;
        return Promise.resolve(gfd_response);
    }
    const endpoint = "menu_options/element";
    const db = new dbApiService({ url: endpoint });
    const json_body = { "element": editorObj["calleeName"] };
    return db.getAll([], json_body, 'POST').then(
        data => {
            // All clear, go ahead
            if (debug) {
                console_debug_log("GCE-GetFormData: data");
                console_debug_log(data.response);
            }
            gfd_response.response = editorObj;
            return gfd_response;
        },
        error => {
            // Unauthorized
            error = formatCaughtError(error);
            if (debug) {
                console_debug_log("GCE-GetFormData: ERROR");
                console_debug_log(error);
            }
            gfd_response.error = true;
            gfd_response.errorMsg = `GetFormData: ${error.message} [GCE-GFD-020]`;
            return gfd_response;
        }
    );
}

export const setEditorParameters = (props) => {
    let editor_response = getEditorData(props);
    if (!editor_response) {
        console_debug_log("GenericCrudEditor / No editor data...");
        return null;
    }
    return verifyEditorObj(editor_response);
};

export const getIsReadOnly = (mode) => (mode === ACTION_READ || mode === ACTION_DELETE)

export const getEditorFlags = (action) => {
    let editorFlags = {};
    editorFlags.isEdit = (action === ACTION_UPDATE || action === ACTION_CREATE);
    editorFlags.isCreate = (action === ACTION_CREATE);
    editorFlags.isRead = (action === ACTION_READ);
    editorFlags.isUpdate = (action === ACTION_UPDATE);
    editorFlags.isDelete = (action === ACTION_DELETE);
    editorFlags.isReadOnly = getIsReadOnly(action);
    return editorFlags;
}
