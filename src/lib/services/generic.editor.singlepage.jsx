// GenericCrudEditor single page editor

import React, { useContext, useEffect, useReducer } from 'react';

import { errorAndReEnter } from '../helpers/error-and-reenter.jsx';
import { setWindowLocationHref, windowLocationReload } from '../helpers/navigation.jsx';
import {
    getEditoObj,
    setEditorParameters,
} from './generic.editor.rfc.common.jsx';
import {
    FormPage,
} from './generic.editor.rfc.formpage.jsx';
import {
    MainSectionContext,
    MainSectionProvider,
} from './generic.editor.rfc.provider.jsx';
import {
    console_debug_log,
} from './logging.service.jsx';

import {
    WAIT_ANIMATION_MARGIN_TOP_CLASS,
} from "../constants/class_name_constants.jsx";
import {
    ACTION_UPDATE,
} from "../constants/general_constants.jsx";

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

const debug = false;

const initialState = {
    editor: null,
    formMode: null,
    status: "",
};

function gspeReducer(state, action) {
    switch (action.type) {
        case 'SET_EDITOR':
            return { ...state, editor: action.payload };
        case 'SET_FORM_MODE':
            return { ...state, formMode: action.payload };
        case 'SET_STATUS':
            return { ...state, status: action.payload };
        default:
            return state;
    }
}

export const GenericSinglePageEditorMain = (props) => {
    const [state, dispatch] = useReducer(gspeReducer, initialState);
    const { editor, formMode, status } = state;

    const setEditor = (p) => dispatch({ type: 'SET_EDITOR', payload: p });
    const setFormMode = (p) => dispatch({ type: 'SET_FORM_MODE', payload: p });
    const setStatus = (p) => dispatch({ type: 'SET_STATUS', payload: p });
    const {
        initCache,
    } = useContext(MainSectionContext);

    useEffect(() => {
        if (debug) {
            console_debug_log('GenericSinglePageEditor | useEffect | props:');
            console_debug_log(props);
        }
        setEditorParameters(props).then(
            editor_response => {
                if (!editor_response) {
                    setEditor(null);
                } else if (editor_response.error) {
                    console_debug_log("GSPE-ERROR-010:");
                    console_debug_log(editor_response.errorMsg);
                    setStatus(editor_response.errorMsg);
                } else if (!editor_response.response) {
                    setEditor(null);
                } else {
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
                setStatus(error);
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
        if (debug) {
            console_debug_log('setInfoMsg | msg:');
            console_debug_log(msg);
        }
    };

    const handleCancel = () => {
        setWindowLocationHref('/');
    };

    // eslint-disable-next-line
    const handleRefresh = (newPage) => {
        initCache();
        windowLocationReload(true);
    }

    if (debug) {
        console_debug_log('UserProfileEditor | editor:');
        console_debug_log(editor);
    }

    if (!editor) {
        if (status) {
            return (
                <>
                    {status}
                    [GSPE-NES]
                </>
            );
        }
        return (
            WaitAnimation(WAIT_ANIMATION_MARGIN_TOP_CLASS)
        );
    }
    if (status) {
        return (
            <>
                {errorAndReEnter(status + (debug ? " [GSPE-ST]" : ""))}
            </>
        );
    }

    return (
        <>
            <FormPage
                mode={formMode[0]}
                id={formMode[1]}
                onCancel={handleCancel}
                setInfoMsg={setInfoMsg}
                editor={editor}
            />
        </>
    );
}