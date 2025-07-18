// GenericCrudEditor data form functions

import React, { useEffect, useState, useContext } from 'react';

import { Formik, Field, Form, ErrorMessage, useFormikContext } from 'formik';
import * as Yup from 'yup';

import { processGenericFuncArray } from './generic.editor.rfc.specific.func.jsx';
import { getEditorFlags } from './generic.editor.rfc.common.jsx';
import { putSelectOptionsFromArray } from './generic.editor.rfc.selector.jsx';
import { SuggestionDropdown } from './generic.editor.rfc.suggestion.dropdown.jsx';
import { MainSectionContext } from './generic.editor.rfc.provider.jsx';
import { SearchEngineButton } from './generic.editor.rfc.search.engine.button.jsx';
// import { ChatBotButton } from './generic.editor.rfc.ai.button.jsx';
import { defaultValue } from './generic.editor.utilities.jsx';
import { console_debug_log } from './logging.service.jsx';
import { dbApiService } from "./db.service.jsx";
import { WaitAnimation } from "./wait.animation.utility.jsx";

import {
    nowToTimestap,
    timestampToDate,
} from '../helpers/date-timestamp.jsx';
import { errorAndReEnter } from "../helpers/error-and-reenter.jsx";
import { useUser } from '../helpers/UserContext.jsx';
import { useAppContext } from '../helpers/AppContext.jsx';
import { GsButton } from '../helpers/NavLib.jsx';

import {
    ACTION_CREATE,
    ACTION_READ,
    ACTION_UPDATE,
    ACTION_DELETE,
    MSG_DELETE_CONFIRM,
    MSG_ACTION_CREATE,
    MSG_ACTION_READ,
    MSG_ACTION_UPDATE,
    MSG_ACTION_DELETE,
    MSG_ACTION_CANCEL,
    MSG_DONE_DELETED,
    MSG_DONE_CREATED,
    MSG_DONE_UPDATED,
    MSG_IS_REQUIRED,
    MSG_MUST_BE,
    MSG_VALID_INTEGER,
    MSG_VALID_NUMBER,
    MSG_VALID_DATE,
    MSG_VALID_EMAIL,
} from "../constants/general_constants.jsx";
import {
    BUTTON_PRIMARY_CLASS,
    BUTTON_SECONDARY_CLASS,
    ERROR_MSG_CLASS,
    INFO_MSG_CLASS,
    APP_TOP_DIV_CLASS,
    APP_TITLE_H1_CLASS,
    // APP_FORMPAGE_LEVEL1_DIV_CLASS,
    // APP_FORMPAGE_LEVEL2_DIV_CLASS,
    INVALID_FEEDBACK_CLASS,
    APP_FORMPAGE_FORM_BUTTON_BAR_CLASS,
    APP_FORMPAGE_LABEL_CLASS,
    APP_FORMPAGE_LABEL_REQUIRED_CLASS,
    APP_FORMPAGE_FIELD_CLASS,
    APP_FORMPAGE_FIELD_BASE_CLASS,
    APP_FORMPAGE_FIELD_GOOD_CLASS,
    APP_FORMPAGE_FIELD_INVALID_CLASS,
    APP_FORMPAGE_SPECIAL_BUTTON_DIV_CLASS,
    APP_FORMPAGE_CHILD_COMPONENTS_TOP_DIV_CLASS,
} from "../constants/class_name_constants.jsx";

const debug = false;

let calcFields = {};

export const FormPage = ({
    editor_par,
    mode_par,
    id_par,
    onCancel_par,
    setInfoMsg_par,
    handleFormPageActions = null,
    message = "",
    messageType = "",
}) => {
    const [formData, setFormData] = useState(null);
    const [status, setStatus] = useState("");
    const [refresh, setRefresh] = useState(0);
    const [formMsg, setFormMsg] = useState({message: message, messageType: messageType});

    const { currentUser } = useUser();
    const { theme } = useAppContext();

    const {
        debugCache,
    } = useContext(MainSectionContext);

    const editor = editor_par;
    const mode = mode_par;
    const id = id_par;

    useEffect(() => {
        if (mode === ACTION_CREATE) {
            // To assign specific default values in creation...
            processGenericFuncArray(editor, 'dbPreRead', {}, mode, currentUser).then(
                funcResponse => {
                    if (debug) console_debug_log(`>> FormPage | dbPreRead # 1 > funcResponse:`, funcResponse, 'editor', editor);
                    setFormData(funcResponse.fieldValues)
                },
                error => setStatus(errorAndReEnter(error,'[GCE-FD-010]'))
            )
        }
        if (
            (mode === ACTION_UPDATE ||
                mode === ACTION_READ ||
                mode === ACTION_DELETE)
        ) {
            let accessKeysDataScreen = {}
            accessKeysDataScreen[editor.primaryKeyName] = id;
            processGenericFuncArray(editor, 'dbPreRead', accessKeysDataScreen, mode, currentUser).then(
                funcResponse => {
                    accessKeysDataScreen = Object.assign({}, funcResponse.fieldValues, editor.parentFilter);
                    editor.db.getOne(accessKeysDataScreen)
                        .then(
                            data => {
                                if (debug) console_debug_log(`>> FormPage | BEFORE dbPostRead > DATA:`, data, 'editor', editor);
                                // To assign specific default values in update, read or delete...
                                processGenericFuncArray(editor, 'dbPostRead', data, mode, currentUser).then(
                                    funcResponse => {
                                        if (debug) console_debug_log(`>> FormPage | dbPostRead > funcResponse:`, funcResponse.fieldValues, 'editor', editor);
                                        setFormData(funcResponse.fieldValues)
                                    },
                                    error => setStatus(errorAndReEnter(error, '[GCE-FD-020]'))
                                );
                            },
                            error => {
                                console_debug_log(`ERROR - GCE-FD-030`)
                                console.error(error);
                                setStatus(errorAndReEnter(error, '[GCE-FD-030]'));
                            },
                        );
                },
                error => setStatus(errorAndReEnter(error, '[GCE-FD-040]'))
            );
        }
    }, [id, editor, mode, refresh]);

    if (handleFormPageActions === null) {
        handleFormPageActions = (funcResponse) => {
            if (debug) {
                console_debug_log(`FormPage / handleFormPageActions | funcResponse:`, funcResponse);
            }
            if (typeof funcResponse['otherData']['refresh'] != "undefined") {
                setRefresh(refresh+1);
                setFormMsg({message: '', messageType: ''})
            }
        }
    }

    if (!editor || !formData) {
        return WaitAnimation();
    }

    const editorFlags = getEditorFlags(mode);
    const actionTitle =
        mode === ACTION_CREATE
            ? MSG_ACTION_CREATE
            : mode === ACTION_UPDATE
                ? MSG_ACTION_UPDATE
                : mode === ACTION_READ
                    ? MSG_ACTION_READ
                    : MSG_ACTION_DELETE;

    return (
        <div 
            className={`${APP_TOP_DIV_CLASS} ${theme.contentBg}`}
        >
            {/* <div 
                className={APP_FORMPAGE_LEVEL1_DIV_CLASS}
            > */}
                <CrudEditorFormPageTitle
                    baseUrl={editor.baseUrl}
                    title={editor.title}
                    actionTitle={actionTitle}
                />
                {/* <div
                    className={APP_FORMPAGE_LEVEL2_DIV_CLASS}
                > */}
                    {status && (
                        <div className={ERROR_MSG_CLASS}>
                            {status}
                        </div>
                    )}
                    {!status && formData &&
                        <EditFormFormik
                            editor={editor}
                            parenHandleCancel={onCancel_par}
                            setInfoMsg={setInfoMsg_par}
                            action={mode}
                            dataset={formData.resultset}
                            message={formMsg['message']}
                            messageType={formMsg['messageType']}
                            handleFormPageActions={handleFormPageActions}
                            theme={theme}
                            currentUser={currentUser}
                        />
                    }
                    {!status &&
                        formData &&
                        !editorFlags.isCreate &&
                        iterateChildComponents(editor, formData.resultset, handleFormPageActions)
                    }
                    {(debug ? debugCache("FormPage") : '')}
                </div>
            // </div>
        // </div>
    );
};

const CrudEditorFormPageTitle = ({ baseUrl, title, actionTitle }) => {
    return (
        <h2
            key={`${baseUrl}_title`}
            className={APP_TITLE_H1_CLASS}
        >
            {title + " - " + actionTitle}
        </h2>
    );
}

const PutOneFormfield = ({
    currentObjArray,
    componentSelectFieldsOptions,
    editorFlags,
    errors,
    touched,
    initialValue,
    theme,
}) => {
    const { setFieldValue } = useFormikContext();

    let currentObj = currentObjArray[1];

    const labelClass = APP_FORMPAGE_LABEL_CLASS + " " + theme.label;
    const labelClassRequiredFld = APP_FORMPAGE_LABEL_REQUIRED_CLASS;
    const divFieldClass = APP_FORMPAGE_FIELD_CLASS + " " + theme.label;
    const fieldClass = (errors[currentObj.name] && touched[currentObj.name] ? APP_FORMPAGE_FIELD_INVALID_CLASS : APP_FORMPAGE_FIELD_GOOD_CLASS + " " + theme.input);

    const readOnlyfield =
        editorFlags.isReadOnly ||
        (typeof currentObj.readonly !== "undefined" && currentObj.readonly);
    
    if (typeof currentObj.hidden !== "undefined" && currentObj.hidden) {
        return (
            <Field
                key={currentObj.name}
                name={currentObj.name}
                type="hidden"
            />
        );
    }

    const getLabelClass = () => {
        return (currentObj.required && !readOnlyfield ? labelClassRequiredFld : labelClass);
    }

    const getLabelSuffix = () => {
        return (currentObj.required && !readOnlyfield ? ' *' : '');
    }

    const addCalculation = (htmlElement) => {
        // To test formulas and see an example, check "genericsuite-fe/src/lib/components/SuperAdminOptions/GeneralConfig.jsx"
        if (debug) console_debug_log(`addCalculation | htmlElement.name: ${htmlElement.name} | htmlElement.formula: ${htmlElement.formula}`);
        if (defaultValue(htmlElement, "formula") !== '') {
            calcFields[htmlElement.name] = htmlElement.formula;
        }
    }
    
    const runCalculation = (e) => {
        for (const key in calcFields) {
            const formula = calcFields[key];
            if (debug) {
                console_debug_log(`Field (key): ${key} `);
                console_debug_log(`Formula: ${formula} `);
                console_debug_log(`e.target.name: ${e.target.name} `);
            }
            // if (formula.includes(e.target.name)) {
                const inputs = document.getElementsByName(key);
                if (inputs.length > 0) {
                    let calculatedValue = null;
                    try {
                        // calculatedValue = eval(formula);
                        calculatedValue = formula(inputs);
                    } catch (error) {
                        console.error('Error calculating value:', error);
                    }
                    if (debug) {
                        console_debug_log(`calculatedValue: ${calculatedValue} `);
                    }
                    if (!isNaN(calculatedValue)) {
                        if (debug) {
                            console_debug_log(`Before setFieldValue(${key}, ${calculatedValue})`);
                        }
                        setFieldValue(key, calculatedValue);
                        if (debug) {
                            console_debug_log(`After setFieldValue(${key}, ${calculatedValue})`);
                        }
                    } else {
                        console.error('calculatedValue is:', calculatedValue);
                    }
                }
            // }
        }
    }
    
    addCalculation(currentObj);

    const input_type = (
        ['number', 'integer'].includes(currentObj.type) ? 
            'number' : currentObj.type
    )

    // id name
    let idName = currentObj.name;

    // Special buttons definitions
    const chatbot_popup = defaultValue(currentObj, "chatbot_popup", false); // Ex. true or false
    const chatbot_prompt = defaultValue(currentObj, "chatbot_prompt");  // Ex. "Give me the %s calories in KCAL including the serving size amount and serving size unit"
    const google_popup = defaultValue(currentObj, "google_popup", false);   // Ex. true or false
    const google_prompt = defaultValue(currentObj, "google_prompt");  // Ex. "%s calories in KCAL, serving size amount and serving size unit"

    let elementInput;
    let elementLabel = (
        <label
            htmlFor={idName}
            className={getLabelClass()}
        >
            {currentObj.label + getLabelSuffix()}
        </label>
    );
    let elementError = (
        <ErrorMessage
            name={idName}
            component="div"
            className={INVALID_FEEDBACK_CLASS}
        />
    );
    
    switch (currentObj.type) {
        case 'select_component':
            elementInput = (
                <Field
                    name={idName}
                    id={idName}
                    as="select"
                    disabled={readOnlyfield}
                    required={currentObj.required && !readOnlyfield}
                    className={fieldClass}
                    onBlur={runCalculation}
                >
                    <currentObj.component />
                </Field>
            );
            break;
        case 'select':
            elementInput =  (
                <Field
                    name={idName}
                    id={idName}
                    as="select"
                    disabled={readOnlyfield}
                    required={currentObj.required && !readOnlyfield}
                    className={fieldClass}
                    onBlur={runCalculation}
                >
                    {putSelectOptionsFromArray(currentObj.select_elements)}
                </Field>
            );
            break;
        case 'component':
            elementInput =  (
                <currentObj.component
                    // dbRow={initialValue}
                    value={initialValue}
                    name={idName}
                    id={idName}
                    disabled={readOnlyfield}
                    required={currentObj.required && !readOnlyfield}
                    className={fieldClass}
                    onBlur={runCalculation}
                    showAsField="1"
                />
            );
            break;
        case 'suggestion_dropdown':
            idName = `${currentObj.name}-input`
            elementInput =  (
                <SuggestionDropdown
                    name={currentObj.name}
                    id={currentObj.name}
                    disabled={readOnlyfield}
                    required={currentObj.required && !readOnlyfield}
                    className={fieldClass}
                    value={initialValue}
                    config={currentObj}
                    onBlur={runCalculation}
                />
            );
            break;
        case 'label':
            elementLabel = '';
            elementError = '';
            elementInput =  (
                <div key={idName}>
                    <label
                        className={divFieldClass}
                    >
                        {currentObj.label}
                    </label>
                </div>
            );
            break;
        case 'hr':
            elementLabel = '';
            elementError = '';
            elementInput = (
                <div key={idName}>
                    <hr />
                </div>
            );
            break;
        case 'number':
        case 'integer':
        case 'text':
        case 'date':
        case 'datetime-local':
        case 'email':
        default:
            elementLabel = (
                <label
                    htmlFor={currentObj.name}
                    className={getLabelClass()}
                >
                    {currentObj.label + getLabelSuffix()}
                </label>
            );
            if (typeof currentObj.component === 'undefined') {
                // Normal input field
                elementInput =  (
                    <Field
                        key={idName}
                        name={idName}
                        id={idName}
                        type={input_type}
                        disabled={readOnlyfield}
                        required={currentObj.required && !readOnlyfield}
                        className={fieldClass}
                        onBlur={runCalculation}
                    />
                );
            } else {
                // Component input field
                elementInput =  (
                    <currentObj.component
                        value={initialValue}
                        name={idName}
                        id={idName}
                        disabled={readOnlyfield}
                        required={currentObj.required && !readOnlyfield}
                        className={fieldClass}
                        onBlur={runCalculation}
                        showAsField="1"
                    />
                );
            }
            break;
    }

    // Special buttons suffix
    if (chatbot_popup || google_popup) {
        elementInput = (
            <div
                className={APP_FORMPAGE_SPECIAL_BUTTON_DIV_CLASS}
            >
                {elementInput}
                {chatbot_popup && currentObj.aux_component !== null && (
                    <currentObj.aux_component
                        valueElement={idName}
                        chatbot_prompt={chatbot_prompt}
                    />
                )}
                {google_popup && (
                    <SearchEngineButton
                        valueElement={idName}
                        google_prompt={google_prompt}
                    />
                )}
            </div>
        );
    }

    if (debug) {
        console_debug_log(`PutOneFormfield | Field (key): ${currentObj.name} | className: ${divFieldClass} | elementLabel: ${elementLabel}`);
    }

    return (
        <div
            key={currentObj.name}
            className={divFieldClass}
        >
            {elementLabel}
            {elementInput}
            {elementError}
        </div>
    );
};

const EditFormFormik = (
    {
        editor,
        parenHandleCancel,
        setInfoMsg,
        action,
        dataset,
        message = "",
        messageType = "",
        handleFormPageActions,
        theme,
        currentUser,
    }
) => {
    const [formData, setFormData] = useState({
        readyToShow: false,
        dataset: null,
        canCommit: null,
        message: null,
        messageType: null,
    });
    if (debug) console_debug_log(`>> 1 >> EditFormFormik | dataset:`, dataset, 'editor:', editor, 'action:', action);

    useEffect(() => {
        const editorFlags = getEditorFlags(action);
        if (editorFlags.isRead) {
            setFormData(
                {
                    readyToShow: true,
                    dataset: dataset,
                    canCommit: null,
                    message: null,
                    messageType: null,
                }
            );
        } else {
            if (debug) console_debug_log(`>> 2 >> EditFormFormik | AFTER dbPreValidations > dataset:`, dataset);

            // Validate data before show the Data Form
            processGenericFuncArray(
                editor, 'dbPreValidations', dataset, action, currentUser
            ).then(
                funcResponse => {
                    if (debug) console_debug_log(`>> 2 >> EditFormFormik | BEFORE dbPreValidations > funcResponse:`, funcResponse);
                    setFormData(
                        {
                            readyToShow: true,
                            dataset: funcResponse.fieldValues,
                            canCommit: true,
                            message: null,
                            messageType: null,
                        }
                    );
                },
                error => {
                    setFormData(
                        {
                            readyToShow: true,
                            dataset: error.fieldValues,
                            canCommit: null,
                            message: error.errorMsg,
                            messageType: "ERROR",
                        }
                    );
                }
            );
        }
    },
        [
            editor,
            action,
            dataset,
        ]
    );

    if (!formData['readyToShow']) {
        // return '';
        return (
            WaitAnimation()
        );
    }

    if (!formData['canCommit'] === null) {
        formData['canCommit'] = false;
    }
    if (!formData['message'] === null) {
        formData['message'] = message;
    }
    if (!formData['messageType'] === null) {
        formData['messageType'] = messageType;
    }

    return (
        EditFormFormikFinal({
            editor: editor,
            parenHandleCancel: parenHandleCancel,
            setInfoMsg: setInfoMsg,
            action: action,
            dataset: formData['dataset'],
            canCommit: formData['canCommit'],
            message: formData['message'],
            messageType: formData['messageType'],
            handleFormPageActions: handleFormPageActions,
            theme: theme,
            currentUser: currentUser,
        })
    )
}

const EditFormFormikFinal = ({
    editor,
    parenHandleCancel,
    setInfoMsg,
    action,
    dataset,
    canCommit,
    message,
    messageType,
    handleFormPageActions,
    theme,
    currentUser,
}) => {
    const editorFlags = getEditorFlags(action);
    const initialFieldValues = getFieldElementsDbValues(editor, dataset);
    const rowId = initialFieldValues[editor.primaryKeyName];
    const componentSelectFieldsOptions =
        editor.selectFieldsOptionsPromises.map(
            currentObj => (
                currentObj.promiseResult
            )
        );

    if (messageType === '') {
        messageType = 'ERROR';
    }

    if (canCommit && editorFlags.isDelete) {
        // 'Are you sure to delete this element? Please confirm with the [Delete] button or [Cancel] this operation.'
        messageType = "ERROR";
        message = (message ? "<br/>" : "") + MSG_DELETE_CONFIRM;
    }

    if (debug) {
        console_debug_log('editForm_Formik_Final | dataset:');
        console_debug_log(dataset);
        console_debug_log('Editor:');
        console_debug_log(editor);
        console_debug_log('initialFieldValues:');
        console_debug_log(initialFieldValues);
    }

    const handleCancel = (infoMsg = '', config = {}) => {
        if (typeof infoMsg !== 'string') {
            infoMsg = '';
        }
        setInfoMsg(infoMsg);
        parenHandleCancel(config);
    }

    const submitHandler = (e) => {
        if (e.keyCode === 13) {
            e.preventDefault();
        }
    }

    if (debug) console_debug_log(`FormPage | editor.fieldElements:`, editor.fieldElements);

    return (
        <Formik
            key={editor.name}
            enableReinitialize={true}
            initialValues={initialFieldValues}
            //
            // Todo: THIS DOESN'T WORK IN ACTION=CREATION
            // validationSchema={Yup.object().shape(
            //     getFieldElementsYupValidations(editor, editorFlags)
            // )}
            onSubmit={(submitedtElements, { setStatus, setSubmitting }) => {
                if (!canCommit) {
                    setSubmitting(false);
                } else {
                    setStatus();
                    if (debug) {
                        console_debug_log('BEFORE dbService.createUpdateDelete(action = ' + action + ', rowId = ' + rowId + ')');
                    }

                    if (!((!rowId && editorFlags.isCreate) || rowId)) {
                        console_debug_log("NO-SENSE ERROR: rowId is Zero and is not Creation");
                        setSubmitting(false);
                        setStatus("NO-SENSE ERROR: rowId is Zero and is not Creation");
                    }

                    if (
                        editorFlags.isCreate &&
                        typeof submitedtElements.id !== "undefined"
                    ) {
                        // Removes calculated ID
                        delete submitedtElements.id;
                    }

                    // Validate data before save the row to Database
                    if (debug) {
                        console_debug_log('BEFORE validations');
                    }
                    processGenericFuncArray(
                        editor, 'validations', submitedtElements, action, currentUser
                    ).then(
                        funcResponse => {
                            if (debug) {
                                console_debug_log('BEFORE dbPreWrite');
                            }
                            processGenericFuncArray(
                                editor, 'dbPreWrite', submitedtElements, action, currentUser
                            ).then(
                                funcResponse => {
                                    // Save the row to Database
                                    if (debug) {
                                        console_debug_log('BEFORE saveRowToDatabase | submitedtElements:');
                                        console_debug_log(submitedtElements);
                                    }
                                    submitedtElements = { ...funcResponse.fieldValues };
                                    saveRowToDatabase(
                                        editor,
                                        action,
                                        rowId,
                                        submitedtElements,
                                        initialFieldValues
                                    ).then(
                                        (result) => {
                                            if (debug) {
                                                console_debug_log('>>>  Formik result');
                                                console_debug_log(result);
                                            }
                                            if (result && result.error) {
                                                setSubmitting(false);
                                                setStatus(result);
                                            } else {
                                                if (editorFlags.isCreate) {
                                                    submitedtElements.id = result['resultset']['_id'];
                                                }
                                                if (debug) {
                                                    console_debug_log('BEFORE dbPostWrite | submitedtElements:', submitedtElements);
                                                }
                                                processGenericFuncArray(
                                                    editor, 'dbPostWrite', submitedtElements, action, currentUser
                                                ).then(
                                                    funcResponse => {
                                                        if (debug) {
                                                            console_debug_log('AFTER saveRowToDatabase');
                                                        }
                                                        const infoMsg = editorFlags.isDelete ? MSG_DONE_DELETED :
                                                            editorFlags.isCreate ? MSG_DONE_CREATED :
                                                                editorFlags.isUpdate ? MSG_DONE_UPDATED :
                                                                    null;
                                                        handleFormPageActions(funcResponse);
                                                        if (editorFlags.isCreate && editor.createReenter) {
                                                            const config = {
                                                                nextAction: ACTION_READ,
                                                                id: result['resultset']['_id'],
                                                                infoMsg: infoMsg,
                                                            }
                                                            handleCancel(infoMsg, config);
                                                        } else {
                                                            handleCancel(infoMsg);
                                                        }
                                                    },
                                                    error => {
                                                        console_debug_log('dbPostWrite [EFFF-010] | error:', error);
                                                        setSubmitting(false);
                                                        setStatus(errorAndReEnter(error.errorMsg, '[EFFF-010]'));
                                                    }
                                                )
                                            }
                                        },
                                        (error) => {
                                            console_debug_log('saveRowToDatabase [EFFF-020] | error:', error);
                                            setSubmitting(false);
                                            setStatus(errorAndReEnter(error, 'EFFF-020'));
                                        }
                                    );
                                },
                                error => {
                                    console_debug_log('dbPreWrite [EFFF-030] | error:', error);
                                    setSubmitting(false);
                                    setStatus(errorAndReEnter((error.errorMsg, 'EFFF-030')));
                                }
                            )
                        },
                        error => {
                            console_debug_log('validations [EFFF-040] | error:', error);
                            setSubmitting(false);
                            setStatus(errorAndReEnter(error.errorMsg, 'EFFF-040'));
                        }
                    );

                }
            }}
        >
            {({ errors, status, touched, isSubmitting }) => (
                <Form
                    onKeyDown={submitHandler}
                >
                    {message && (
                        <div className={messageType === "ERROR" ? ERROR_MSG_CLASS : INFO_MSG_CLASS}>
                            {message}
                        </div>
                    )}
                    {Object.entries(editor.fieldElements).map(function (htmlElement) {
                        return <PutOneFormfield
                            key={htmlElement[1].name}
                            currentObjArray={htmlElement}
                            componentSelectFieldsOptions={componentSelectFieldsOptions}
                            editorFlags={editorFlags}
                            errors={errors}
                            touched={touched}
                            initialValue={initialFieldValues[htmlElement[1].name]}
                            theme={theme}
                        />
                    })}
                    <div
                        className={APP_FORMPAGE_FORM_BUTTON_BAR_CLASS}
                    >
                        {!editorFlags.isRead && canCommit && (
                            <>
                                <GsButton
                                    key="SubmitButton"
                                    type="submit"
                                    className={BUTTON_PRIMARY_CLASS}
                                    disabled={isSubmitting}
                                >
                                    {editorFlags.isCreate
                                        ? MSG_ACTION_CREATE
                                        : editorFlags.isDelete
                                            ? MSG_ACTION_DELETE
                                            : MSG_ACTION_UPDATE}
                                </GsButton>
                                {isSubmitting && (
                                    WaitAnimation()
                                )}
                            </>
                        )}
                        <GsButton
                            key="CancelButton"
                            variant="secondary"
                            disabled={isSubmitting}
                            onClick={handleCancel}
                        >
                            {MSG_ACTION_CANCEL}
                        </GsButton>
                    </div>
                    {status &&
                        <div className={ERROR_MSG_CLASS}>
                            {status}
                        </div>
                    }
                </Form>
            )}
        </Formik>
    );
};

const iterateChildComponents = (editor, dataset, handleFormPageActions) => {
    let initialFieldValues = getFieldElementsDbValues(editor, dataset);
    if (initialFieldValues[editor.primaryKeyName] === 0) {
        // Dataset is stil not ready...
        // return ('');
        return (
            WaitAnimation()
        );
    }
    return Object.entries(editor.childComponents).map(function (
        htmlElement
    ) {
        if (debug) {
            console_debug_log("iterateChildComponents - htmlElement:", htmlElement);
        }
        let ChildElement = htmlElement[1];
        if (String(ChildElement).includes('component:')) {
                if (debug) {
                    console_debug_log("iterateChildComponents - ChildElement).includes('component:')");
                }
                ChildElement = htmlElement[1]().component;
        }
        if (debug) {
            console_debug_log("iterateChildComponents - ChildElement with parentData (initialFieldValues):", initialFieldValues);
        }
        return (
            <div
                key={'ChildElement_' + htmlElement[0]}
                className={APP_FORMPAGE_CHILD_COMPONENTS_TOP_DIV_CLASS}
            >
                <ChildElement
                    parentData={initialFieldValues}
                    handleFormPageActions={handleFormPageActions}
                />
            </div>
        );
    });
};


const saveRowToDatabase = (editor, action, rowId, submitedtElements, initialValues) => {
    let rowToSave = submitedtElements;
    if (typeof rowToSave["resultset"] !== "undefined") {
        delete rowToSave["resultset"];
    }
    if (typeof initialValues["resultset"] !== "undefined") {
        delete initialValues["resultset"];
    }
    if (editor.type === "child_listing") {
        // Build the format for child table
        // Example:
        // {
        //     "user_id": "{{TEST_USER_ID}}",
        //     "food_times": {
        //         "food_moment_id": "test_food_moment_id_2",
        //         "food_time": "10:00"
        //     },
        //     "food_times_old": {
        //         "food_moment_id": "test_food_moment_id_1"
        //     }
        // }
        rowId = null;
        rowToSave = editor.parentKeyNames.reduce((acc, keyPair) => {
            acc[keyPair.parameterName] = // parent table 'id' field name
                editor.parentData[keyPair.parentElementName]; // parent table 'id' value
            return { ...acc };
        }, {});
        rowToSave[editor.array_name] = submitedtElements; // array object in the parent row with new values
        rowToSave[editor.array_name + "_old"] = initialValues; // array object in the parent row with initial values
    }
    // Save the row to Database
    const dbService = new dbApiService({ url: editor.dbApiUrl });
    return dbService.createUpdateDelete(action, rowId, rowToSave);
};

const setDefaultFieldValue = (currentObj) => {
    let response = null;
    if (typeof currentObj['default_value'] !== 'undefined') {
        switch (currentObj.default_value) {
            case 'current_timestamp':
                switch (currentObj.type) {
                    case 'date':
                        response = timestampToDate(nowToTimestap());
                        break;
                    case 'datetime-local':
                        response = timestampToDate(nowToTimestap(), true, 'T');
                        break;
                    default:
                        response = nowToTimestap();
                }
                break;
            default:
                response = currentObj.default_value;
        }
        return response;
    }
    switch (currentObj.type) {
        case '_id':
        case 'number':
        case 'integer':
            response = 0;
            break;
        case 'date':
            response = timestampToDate(nowToTimestap());
            break;
        case 'datetime-local':
            response = timestampToDate(nowToTimestap(), true, 'T');
            break;
        default:
            response = '';
    }
    return response;
}

const getFieldElementsDbValues = (editor, datasetRaw, defaultValues = true) => {
    let dataset = {};
    if (typeof datasetRaw !== 'undefined') {
        dataset = Object.assign({}, datasetRaw);
    }
    if (editor.subType === "array") {
        // Get the 1st element only because it's only an element when
        // the action over the child object is Read, Modify or Delete
        // if (typeof datasetRaw !== 'undefined') {
        if (debug) console_debug_log(`getFieldElementsDbValues | datasetRaw:`, datasetRaw, 'editor:', editor);
        if (typeof datasetRaw[0] !== 'undefined') {
            dataset = Object.assign({}, datasetRaw[0]);
        }
    }

    const dbService = new dbApiService({ url: editor.dbApiUrl });

    const verifyElementExistence = (dataset, element) => {
        return typeof dataset[element] !== "undefined";
    };

    const response = editor.fieldElements
        .reduce((acc, currentObj) => {
            let responseObj = '';
            if (currentObj.type === "_id") {
                if (verifyElementExistence(dataset, "_" + currentObj.name)) {
                    responseObj = dbService.convertId(dataset["_" + currentObj.name]);
                } else if (defaultValues) {
                    responseObj = setDefaultFieldValue(currentObj);
                }
            } else if (verifyElementExistence(dataset, currentObj.name)) {
                responseObj = dataset[currentObj.name];
            } else if (defaultValues) {
                responseObj = setDefaultFieldValue(currentObj);
            }
            if (typeof currentObj['force_value'] !== 'undefined') {
                responseObj = currentObj['force_value'];
            }
            switch (currentObj.type) {
                // case 'component':
                case 'label':
                case 'hr':
                    // Excluded types
                    break;
                default:
                    acc[currentObj.name] = responseObj;
            }
            return { ...acc };
            // }, {});
        }, dataset);

    if (typeof response["_id"] !== 'undefined') {
        delete response["_id"];
    }

    return response;
};

export const getFieldElementsYupValidations = (editor, editorFlags) => {
    if (editorFlags.isDelete) {
        return {};
    }
    const response = editor.fieldElements
        .reduce((acc, currentObj) => {
            let responseObj = Yup; // https://github.com/jquense/yup
            switch (currentObj.type) {
                case 'number':
                    responseObj = responseObj.number(
                        `${currentObj.label} ${MSG_MUST_BE} ${MSG_VALID_NUMBER}`
                    );
                    break;
                case 'integer':
                    responseObj = responseObj.number().integer(
                        `${currentObj.label} ${MSG_MUST_BE} ${MSG_VALID_INTEGER}`
                    );
                    break;
                case 'date':
                    responseObj = responseObj.date(
                        `${currentObj.label} ${MSG_MUST_BE} ${MSG_VALID_DATE}`
                    );
                    break;
                case 'email':
                    responseObj = responseObj.string().email(
                        `${currentObj.label} ${MSG_MUST_BE} ${MSG_VALID_EMAIL}`
                    );
                    break;
                case 'text':
                default:
                    responseObj = responseObj.string();
            }
            if (currentObj.required) {
                responseObj = responseObj.required(
                    `${currentObj.label} ${MSG_IS_REQUIRED}`
                );
            }
            acc[currentObj.name] = responseObj;
            return { ...acc };
        }, {});
    return response;
};
