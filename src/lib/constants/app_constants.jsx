import {
    // getConfigsJsonFile,
    buildConstant,
} from "../helpers/json-utilities.jsx";
// const constants = getConfigsJsonFile('app_constants');

import constants from '../../configs/frontend/app_constants.json';

export const BILLING_PLANS = buildConstant(constants.BILLING_PLANS);
export const ERROR_MESSAGES = constants.ERROR_MESSAGES;
export const APP_EMAILS = constants.APP_EMAILS;
export const APP_VALID_URLS = constants.APP_VALID_URLS;
