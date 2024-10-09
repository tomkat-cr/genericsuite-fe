import React from 'react';

import {
    GenericCrudEditor,
    GetFormData,
} from '../../services/generic.editor.rfc.service.jsx';
import { TRUE_FALSE } from '../../constants/general_constants.jsx';

import general_config from "../../../configs/frontend/general_config.json";


export function GeneralConfig_EditorData() {
    // console_debug_log("GeneralConfig_EditorData");
    const registry = {
        "GeneralConfig": GeneralConfig, 
        "TRUE_FALSE": TRUE_FALSE,
        // "testFormula": () => (alert("This is a Formula")),
    }
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

export const GeneralConfig = () => (
    <GenericCrudEditor editorConfig={GeneralConfig_EditorData()} />
)
