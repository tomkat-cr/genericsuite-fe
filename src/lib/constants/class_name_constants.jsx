import React from 'react';

export const BUTTON_PRIMARY_CLASS = "bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500";
export const BUTTON_SECONDARY_CLASS = "bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500";
export const BUTTON_LISTING_CLASS = "bg-blue-500 text-white p-2 rounded text-sm";

export const INPUT_FLEXIBLE_CLASS = "pl-1 pb-1 pt-1 pr-1 block w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md resize-none overflow-hidden";
// export const INPUT_FLEXIBLE_CLASS = "m-0 w-full resize-none border-0 rounded-md border py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 gizmo:md:py-3.5 gizmo:placeholder-black/50 gizmo:dark:placeholder-white/50 pl-12 gizmo:pl-10 md:pl-[46px] gizmo:md:pl-[55px]";

/*
// https://netdna.bootstrapcdn.com/bootstrap/4.1.1/css/bootstrap.css
export const ERROR_MSG_CLASS = "alert alert-danger mt-4 p-2 rounded-md";
export const WARNING_MSG_CLASS = "alert alert-warning mt-4 p-2 rounded-md";
export const INFO_MSG_CLASS = "alert alert-info mt-4 p-2 rounded-md";
export const SUCCESS_MSG_CLASS = "alert alert-success text-black mt-4 p-2 rounded-md";
export const GRAY_BOX_MSG_CLASS = "alert text-black bg-gray-200 mt-4 p-2 rounded-md";
*/

export const ALERT_BASE_CLASS = "relative p-3 border border-transparent rounded";
export const ALERT_DANGER_CLASS = `${ALERT_BASE_CLASS} text-red-800 bg-red-100 border-red-200`;
export const ALERT_WARNING_CLASS = `${ALERT_BASE_CLASS} text-yellow-800 bg-yellow-100 border-yellow-200`;
export const ALERT_INFO_CLASS = `${ALERT_BASE_CLASS} text-cyan-800 bg-cyan-100 border-cyan-200`;
export const ALERT_SUCCESS_CLASS = `${ALERT_BASE_CLASS} text-green-800 bg-green-100 border-green-200`;

export const ERROR_MSG_CLASS = `${ALERT_DANGER_CLASS} mt-4 p-2 rounded-md`;
export const WARNING_MSG_CLASS = `${ALERT_WARNING_CLASS} mt-4 p-2 rounded-md`;
export const INFO_MSG_CLASS = `${ALERT_INFO_CLASS} mt-4 p-2 rounded-md`;
export const SUCCESS_MSG_CLASS = `${ALERT_SUCCESS_CLASS} mt-4 p-2 rounded-md`;
export const GRAY_BOX_MSG_CLASS = `${ALERT_BASE_CLASS} text-black bg-gray-200 mt-4 p-2 rounded-md`;

/*
export const FORM_GROUP_CLASS = "form-group";
export const FORM_CONTROL = "form-control";
export const INVALID_FEEDBACK = "invalid-feedback";
export const BUTTON_PRIMARY_CLASS = "btn btn-primary";
export const IS_INVALID = "is-invalid";
*/
export const FORM_GROUP_CLASS = "mb-4";
export const FORM_CONTROL = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
export const INVALID_FEEDBACK = "text-red-500 text-sm mt-1";
export const IS_INVALID = "border-red-500";
