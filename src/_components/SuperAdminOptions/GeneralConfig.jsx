import React from 'react';
import {
    GenericCrudEditor,
    GetFormData,
} from '../../_services';
import { TRUE_FALSE } from '../../_constants';

export function GeneralConfig_EditorData() {
    // console_debug_log("GeneralConfig_EditorData");
    const registry = {
        "GeneralConfig": GeneralConfig, 
        "TRUE_FALSE": TRUE_FALSE,
    }
    return GetFormData('general_config', registry, 'GeneralConfig_EditorData');
}

export const GeneralConfig = () => (
    <GenericCrudEditor editorConfig={GeneralConfig_EditorData()} />
)
