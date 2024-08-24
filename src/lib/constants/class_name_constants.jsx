import React from 'react';

// Alert messages and message boxes

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

// Forms

/*
export const FORM_GROUP_CLASS = "form-group";
export const FORM_CONTROL_CLASS = "form-control";
export const INVALID_FEEDBACK_CLASS = "invalid-feedback";
export const BUTTON_PRIMARY_CLASS = "btn btn-primary";
export const IS_INVALID_CLASS = "is-invalid";
*/
export const FORM_GROUP_CLASS = "mb-4";
export const FORM_CONTROL_CLASS = "w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500";
export const INVALID_FEEDBACK_CLASS = "text-red-500 text-sm mt-1";
export const IS_INVALID_CLASS = "border-red-500";
export const DISABLE_FIELD_BACKGROUND_COLOR_CLASS = 'bg-gray-200';
export const HIDDEN_CLASS = 'hidden';
export const VISIBLE_CLASS = 'visible';

// Buttons

export const BUTTON_RIGHT_SPACE_CLASS = 'mr-2';
export const BUTTON_PRIMARY_CLASS = "bg-blue-500 text-white font-medium py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500";
export const BUTTON_SECONDARY_CLASS = "bg-gray-300 text-gray-700 font-medium py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500";

// Listing page buttons (GCE_RFC)

export const BUTTON_LISTING_CLASS = "bg-blue-500 text-white p-2 rounded text-sm";
export const BUTTON_LISTING_DISABLED_CLASS = `${BUTTON_LISTING_CLASS} opacity-50`;
export const BUTTON_LISTING_NEW_CLASS = `${BUTTON_LISTING_CLASS} ${BUTTON_RIGHT_SPACE_CLASS} ml-2`;
export const BUTTON_LISTING_REFRESH_CLASS=`${BUTTON_LISTING_CLASS} text-xs`;

// General app section (e.g. GCE_RFC)

// const APP_TOP_DIV_CLASS="w-screen bg-gray-300 fyn_jumbotron"
// const APP_TOP_DIV_CLASS='w-screen overflow-x-visible overflow-visible overflow-x-auto'
export const APP_TOP_DIV_CLASS = 'w-screen flex flex-col pb-2 ml-1 mr-1';
export const APP_LEVEL1_DIV_CLASS = 'w-screen';
export const APP_LEVEL2_DIV_CLASS = "not-prose relative bg-slate-50 rounded-xl overflow-hidden dark:bg-slate-800/25 mr-2";
export const APP_TITLE_H1_CLASS = 'text-2xl font-bold mb-2 mt-2';
export const APP_TITLE_RECYCLE_BUTTON_CLASS = "pl-2 align-bottom";

export const APP_MAIN_BOX_BG_COLOR_CLASS = "bg-white dark:bg-slate-800";
export const APP_SIDE_MENU_BG_COLOR_CLASS = "bg-white dark:bg-gray-800";

// Listing page (GCE_RFC)

// APP_LISTING_LEVEL2_DIV_CLASS="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]"
export const APP_LISTING_LEVEL2_DIV_CLASS = '';
export const APP_LISTING_LEVEL3_DIV_CLASS = "relative rounded-xl overflow-auto";
export const APP_LISTING_LEVEL4_DIV_CLASS = "shadow-sm overflow-hidden my-4";
// APP_LISTING_TABLE_CLASS="min-w-full divide-y divide-gray-200 dark:divide-gray-700"
// APP_LISTING_TABLE_CLASS="min-w-full"
// APP_LISTING_TABLE_CLASS="table-auto"
export const APP_LISTING_TABLE_CLASS = "border-collapse table-auto w-full text-sm";
export const APP_LISTING_TABLE_HDR_THEAD_CLASS = "";
export const APP_LISTING_TABLE_HDR_TR_CLASS = "";
// APP_LISTING_TABLE_HDR_TH_CLASS="pr-2 text-xs font-medium text-gray-500 uppercase break-words"
// // APP_LISTING_TABLE_HDR_TH2_CLASS="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase whitespace-nowrap"
export const APP_LISTING_TABLE_HDR_TH_CLASS = "border-b dark:border-slate-600 font-medium p-2 pl-2 pt-0 pb-3 text-slate-400 dark:text-slate-200 text-left";
// APP_LISTING_TABLE_HRD_ACTIONS_COL_CLASS="pr-2 text-xs font-medium text-gray-500 uppercase break-words"
export const APP_LISTING_TABLE_HRD_ACTIONS_COL_CLASS = '';
// // APP_LISTING_TABLE_BODY_TBODY_CLASS="divide-y divide-gray-200 dark:divide-gray-700"
export const APP_LISTING_TABLE_BODY_TBODY_CLASS = `${APP_MAIN_BOX_BG_COLOR_CLASS}`;
// APP_LISTING_TABLE_BODY_TBODY_CLASS="odd:bg-white even:bg-slate-50"
export const APP_LISTING_TABLE_BODY_TR_CLASS = 'odd:bg-white bg-slate-500';
// // APP_LISTING_TABLE_BODY_TD_CLASS="px-6 py-0 break-words text-sm text-gray-50 dark:text-gray-50"
// APP_LISTING_TABLE_BODY_TD_CLASS="break-words text-sm"
export const APP_LISTING_TABLE_BODY_TD_BASE_CLASS="border-b border-slate-100 dark:border-slate-700 p-2 pl-2 odd:text-white text-slate-500 dark:text-slate-400";
export const APP_LISTING_TABLE_BODY_TD_CLASS=`${APP_LISTING_TABLE_BODY_TD_BASE_CLASS} break-words`;
// APP_LISTING_TABLE_BODY_TD_ACTIONS_CLASS="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200"
// APP_LISTING_TABLE_BODY_TD_ACTIONS_CLASS="whitespace-nowrap text-sm"
export const APP_LISTING_TABLE_BODY_TD_ACTIONS_CLASS=`${APP_LISTING_TABLE_BODY_TD_BASE_CLASS} whitespace-nowrap text-sm`;

// Listing page search box (GCE_RFC)

export const APP_LISTING_SEARCH_BOX_TOP_DIV_CLASS="flex items-center";
// APP_LISTING_SEARCH_BOX_LABEL_CLASS="ml-3 mr-2 text-sm";
export const APP_LISTING_SEARCH_BOX_LABEL_CLASS="mr-2 text-sm";
// APP_LISTING_SEARCH_BOX_INPUT_CLASS="mb-2 w-6 h-6 px-2 text-sm";
// APP_LISTING_SEARCH_BOX_INPUT_CLASS="w-6 h-6 px-2 text-sm";
export const APP_LISTING_SEARCH_BOX_INPUT_CLASS="w-30 Px-2 text-sm";
// APP_LISTING_SEARCH_BOX_SUBMIT_BUTTON_CLASS={`${BUTTON_LISTING_CLASS} mb-2 ml-2 mr-2 text-xs`};
export const APP_LISTING_SEARCH_BOX_SUBMIT_BUTTON_CLASS=`${BUTTON_LISTING_CLASS} ml-2 mr-2 text-xs`;
// APP_LISTING_SEARCH_BOX_STOP_BUTTON_CLASS={`${BUTTON_LISTING_CLASS} mb-2 mr-2 text-xs`}
export const APP_LISTING_SEARCH_BOX_STOP_BUTTON_CLASS=`${BUTTON_LISTING_CLASS} mr-2 text-xs`;

// Listing page bottom toolbar (next and previous page, lines per page, search) (GCE_RFC)

export const APP_LISTING_TOOLBAR_TOP_DIV_CLASS = "ml-1 mr-1 mt-2 flex items-center";
export const APP_LISTING_TOOLBAR_PAGE_NUM_SECTION_CLASS="text-sm ml-2 mr-2";
export const APP_LISTING_TOOLBAR_ROW_PER_PAGE_SECTION_CLASS="text-sm mr-2 flex items-center";
export const APP_LISTING_TOOLBAR_ROW_PER_PAGE_LABEL_CLASS="ml-3 mr-2 text-sm";
// APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS="w-6 h-6 px-2 text-sm"
export const APP_LISTING_TOOLBAR_ROW_PER_PAGE_INPUT_CLASS="w-10 px-2 text-sm";
export const APP_LISTING_TOOLBAR_WAIT_ANIMATION_CLASS="ml-3 mr-3 hidden";

// Data page (GCE_RFC)

// APP_TOP_DIV_CLASS="container mx-auto px-4"
// APP_TOP_DIV_CLASS="w-screen bg-gray-300 fyn_jumbotron"
// APP_TITLE_H1_CLASS="text-2xl font-semibold mb-4"
export const APP_FORMPAGE_LEVEL1_DIV_CLASS = `${APP_LEVEL1_DIV_CLASS}`;
export const APP_FORMPAGE_LEVEL2_DIV_CLASS = `${APP_LEVEL2_DIV_CLASS} p-2`;
export const APP_FORMPAGE_LABEL_CLASS = "font-medium text-gray-700";
export const APP_FORMPAGE_LABEL_REQUIRED_CLASS = "font-medium text-red-700";
export const APP_FORMPAGE_FORM_TABLE_CLASS = "min-w-full divide-y divide-gray-200 dark:divide-gray-700";
export const APP_FORMPAGE_FIELD_CLASS = `flex flex-col ${FORM_GROUP_CLASS}`;
export const APP_FORMPAGE_FIELD_BASE_CLASS = `${FORM_CONTROL_CLASS} border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`;
export const APP_FORMPAGE_FIELD_GOOD_CLASS = `${APP_FORMPAGE_FIELD_BASE_CLASS}`;
export const APP_FORMPAGE_FIELD_INVALID_CLASS = `${APP_FORMPAGE_FIELD_BASE_CLASS} is-invalid`;
export const APP_FORMPAGE_SPECIAL_BUTTON_DIV_CLASS="align-middle flex";
export const APP_FORMPAGE_CHILD_COMPONENTS_TOP_DIV_CLASS = "mt-6";

// AI Assistant and conversation pages

// Flexible input type text that grows according to its content (e.g. for the AI Assistant conversation)
export const INPUT_FLEXIBLE_CLASS = "pl-1 pb-1 pt-1 pr-1 block w-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md resize-none overflow-hidden";
// export const INPUT_FLEXIBLE_CLASS = "m-0 w-full resize-none border-0 rounded-md border py-[10px] pr-10 focus:ring-0 focus-visible:ring-0 dark:bg-transparent md:py-4 md:pr-12 gizmo:md:py-3.5 gizmo:placeholder-black/50 gizmo:dark:placeholder-white/50 pl-12 gizmo:pl-10 md:pl-[46px] gizmo:md:pl-[55px]";
