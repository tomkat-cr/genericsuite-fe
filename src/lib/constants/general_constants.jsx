import {
    // getConfigsJsonFile,
    buildConstant,
} from "../helpers/json-utilities.jsx";

import constants from "../../configs/frontend/general_constants.json";

// Security

export const MSG_ERROR_INVALID_TOKEN = ['A valid token is missing', 'Token is invalid', 'Session expired', 'HTTP 401'];
export const MSG_ERROR_INVALID_CREDS = 'The username or password is incorrect. Please try again.';
export const MSG_ERROR_SESSION_EXPIRED = 'Session expired.';
export const MSG_ERROR_CLICK_TO_RELOGIN = 'Login again';
export const MSG_ERROR_CLICK_TO_RETRY = 'Retry';

// API / Database

export const MSG_ERROR_CONNECTION_FAIL = 'Connection failure';
export const MSG_ERROR_POSSIBLE_CORS = 'Possible CORS';

// General

export const WAIT_ANIMATION_IMG = "data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==";
export const MSG_ALT_WAIT_ANIMATION = 'Wait...';

// All images must be in static/media/ directory for dev, qa, staging and prod stages/environments
export const imageDirectory = "static/media/";

// Generic editor : general constants

export const ACTION_CREATE =  'create';
export const ACTION_READ = 'read';
export const ACTION_UPDATE = 'update';
export const ACTION_DELETE = 'delete';
export const ACTION_LIST = 'list';

// Generic editor : messages

export const MSG_ERROR_MISSING_ARRAY_NAME_PARAM = 'Missing "array_name" parameter. It must be specified for subType "array".';
export const MSG_ERROR_ID_NOT_FOUND = 'ID not found...';
export const MSG_DELETE_CONFIRM = 'Are you sure to delete this element? Please confirm with the [Delete] button or [Cancel] this operation.';
export const MSG_ACTION_CREATE =  'Create';
export const MSG_ACTION_NEW =  'New';
export const MSG_ACTION_READ = 'View';
export const MSG_ACTION_EDIT = 'Edit';
export const MSG_ACTION_UPDATE = 'Update';
export const MSG_ACTION_DELETE = 'Delete';
export const MSG_ACTION_LIST = 'Listing';
export const MSG_ACTION_CANCEL = 'Cancel';
export const MSG_SELECT_AN_OPTION = 'Select an option...';
export const MSG_PREVIOUS = "Previous";
export const MSG_NEXT = "Next";
export const MSG_PAGE = "Page";
export const MSG_OF = "of";
export const MSG_DONE_DELETED = 'Item has been deleted';
export const MSG_DONE_CREATED = 'Item has been created';
export const MSG_DONE_UPDATED = 'Item has been updated';
export const MSG_ACTIONS = 'Actions';
export const MSG_SEARCH = 'Search';
export const MSG_RELOAD = 'Reload';
export const MSG_MORE = 'More';

export const MSG_IS_REQUIRED = 'is required';
export const MSG_MUST_BE = 'must be';
export const MSG_VALID_INTEGER = 'an integer number';
export const MSG_VALID_NUMBER = 'a number';
export const MSG_VALID_DATE = 'a valid date';
export const MSG_VALID_EMAIL = 'a valid email address';

export const MSG_ROWS_PER_PAGE = "Rows per page";

// Generic editor : default values

export const ROWS_PER_PAGE=5

// Generic editor : general select options

// const constants = getConfigsJsonFile('general_constants');
export const TRUE_FALSE = buildConstant(constants.TRUE_FALSE);
export const YES_NO = buildConstant(constants.YES_NO);
export const LANGUAGES = buildConstant(constants.LANGUAGES);
export const GENDERS = buildConstant(constants.GENDERS);
