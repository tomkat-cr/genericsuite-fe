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
    }
    // return GetFormData('general_config', registry, 'GeneralConfig_EditorData');
    return GetFormData(general_config, registry, 'GeneralConfig_EditorData');
}

export const GeneralConfig = () => (
    <GenericCrudEditor editorConfig={GeneralConfig_EditorData()} />
)
