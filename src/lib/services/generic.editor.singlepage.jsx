// GenericCrudEditor single page editor

import React, { useEffect, useState, useContext } from 'react';

import { 
    MainSectionContext,
    MainSectionProvider,
} from './generic.editor.rfc.provider.jsx';
import { 
    FormPage,
} from './generic.editor.rfc.formpage.jsx';
import { 
    setEditorParameters,
    getEditoObj,
} from './generic.editor.rfc.common.jsx';
import { 
    console_debug_log,
} from './logging.service.jsx';
import { getPrefix } from '../helpers/history.jsx';
import { errorAndReEnter } from '../helpers/error-and-reenter.jsx';

import {
    ACTION_UPDATE,
} from "../constants/general_constants.jsx";
import {
    ERROR_MSG_CLASS,
} from "../constants/class_name_constants.jsx";

import { WaitAnimation } from "./wait.animation.utility.jsx";

export const GenericSinglePageEditor = ({ editorConfig, id, parentData }) => {
    return (
      <>
        <MainSectionProvider>
          <GenericSinglePageEditorMain
            editorConfig={editorConfig}
            id={id}
            parentData={parentData}
          />
        </MainSectionProvider>
      </>
    );
  }
  
// export const GenericSinglePageEditorMain = ({ editorConfig, id, parentData }) => {
export const GenericSinglePageEditorMain = (props) => {
    const [editor, setEditor] = useState(null);
    const [formMode, setFormMode] = useState(null);
    const [status, setStatus] = useState("");
    const {
        initCache,
    } = useContext(MainSectionContext);
    const debug = false;

    useEffect(() => {
        if (debug) {
            console_debug_log('GenericSinglePageEditor | useEffect | props:');
            console_debug_log(props);
        }
        setEditorParameters(props).then(
            editor_response => {
              if (!editor_response) {
                setEditor(null);
              } else if(editor_response.error) {
                console_debug_log("GSPE-ERROR-010:");
                console_debug_log(editor_response.errorMsg);
                setStatus(errorAndReEnter(editor_response.errorMsg));
              } else if (!editor_response.response) {
                setEditor(null);
              } else {
                // setEditor(getEditoObj({ editorConfig: editor_config }, editor_response));
                if (debug) {
                    console_debug_log('GenericSinglePageEditor | $$$ editor_response:');
                    console_debug_log(editor_response);
                }
                setEditor(getEditoObj(props, editor_response));
              }
            },
            error => {
              console_debug_log("GSPE-ERROR-020:");
              console_debug_log(error);
              setStatus(errorAndReEnter(error));
            }
        );
    }, [props, debug]);

    useEffect(() => {
        const form_mode = [ACTION_UPDATE, props.id];
        if (debug) {
            console_debug_log('UserProfileEditor | useEffect | form_mode:');
            console_debug_log(form_mode);
        }
        setFormMode(form_mode);
    }, [props.id, debug]);

    const setInfoMsg = (msg) => {
        console_debug_log('setInfoMsg | msg:');
        console_debug_log(msg);
    };

    const handleCancel = () => {
        window.location.href = getPrefix(true) + '/';
    };

    // eslint-disable-next-line
    const handleRefresh = (newPage) => {
        initCache();
        window.location.reload(true);
    }
    
    if (debug) {
        console_debug_log('UserProfileEditor | editor:');
        console_debug_log(editor);
    }

    if (!editor) {
        if (status) {
            return (
                <div className={ERROR_MSG_CLASS}>
                    {status}
                    [GSPE-NES]
                </div>
            );
        }
        return (
            WaitAnimation()
        );
    }
    if (status) {
        return (
            <div className={ERROR_MSG_CLASS}>
                {status}
                [GSPE-ST]
            </div>
        );
    }
        
    return (
        <>
            <FormPage
                mode_par={formMode[0]}
                id_par={formMode[1]}
                onCancel_par={handleCancel}
                setInfoMsg_par={setInfoMsg}
                editor_par={editor}
            />
        </>
    );
}