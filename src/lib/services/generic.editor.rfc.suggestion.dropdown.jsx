// Suggestion Dropdown

import { useCombobox } from 'downshift';
import { useFormikContext } from 'formik';
import { debounce } from 'lodash';
import React, { useEffect, useMemo, useState } from 'react';

import {
    APP_FORMPAGE_FIELD_BASE_CLASS,
    DISABLE_FIELD_BACKGROUND_COLOR_CLASS,
    INVALID_FEEDBACK_CLASS,
    IS_INVALID_CLASS,
    SUGGESTION_DROPDOWN_CLASS,
    SUGGESTION_DROPDOWN_WRAPPER_CLASS,
} from '../constants/class_name_constants.jsx';
import { getErrorMsgFromApi } from '../helpers/error-and-reenter.jsx';
import { useAppContext } from '../helpers/AppContext.jsx';
import { useUser } from '../helpers/UserContext.jsx';
import { dbApiService } from './db.service.jsx';
import {
    defaultValue,
    replaceSpecialVars,
} from "./generic.editor.utilities.jsx";
import { convertId } from './id.utilities.jsx';
import {
    console_debug_log,
} from "./logging.service.jsx";

const debug = true;

const debounceTimeout = 500;

export const SuggestionDropdown = ({
    name,
    disabled,
    required,
    className,
    value,
    config,
}) => {
    const { setFieldValue } = useFormikContext();
    const [inputValue, setInputValue] = useState(value);
    const [debouncedInputValue, setDebouncedInputValue] = useState(value);
    const [suggestions, setSuggestions] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const { currentUser } = useUser();
    const { theme } = useAppContext();

    // This component's input field must be different to the external input field to enable value sync
    const nameInternal = `${name}_sdd`;

    const filter_api_url = defaultValue(config, 'filter_api_url');     // Ex. "fda_food_query"
    const filter_api_request_method = String(defaultValue(config, "filter_api_request_method", "get")).toUpperCase(); // Ex. true or false
    const filter_search_param_name = defaultValue(config, 'filter_search_param_name');     // Ex. "food_name"
    const filter_search_other_param = defaultValue(config, 'filter_search_other_param');   // Ex. {"autocomplete": "1"}
    const suggestion_id_fieldname = defaultValue(config, "suggestion_id_fieldname");  // Ex. "id"
    const suggestion_desc_fieldname = defaultValue(config, "suggestion_desc_fieldname");  // Ex. "description"
    const suggestion_name_fieldname = defaultValue(config, "suggestion_name_fieldname", suggestion_desc_fieldname);  // Ex. "description"
    const autocomplete_fields = defaultValue(config, "autocomplete_fields", {});
    /*
        Ex.
        "autocomplete_fields": {
            "calories_value": "calories_value",
            "calories_unit": "calories_unit",
            "serving_size": "serving_size",
            "serving_size_unit": "serving_size_unit",
            "brand_name": "brand_name"
        }
    */

    if (debug) {
        console_debug_log(`SuggestionDropdown 1: fda_food_query | name: ${name}, disabled: ${disabled}, required: ${required}, className: ${className}`);
        console_debug_log(`Config: ${config}`);
    }

    useEffect(() => {
        if (debouncedInputValue) {
            // Get suggestions from external source
            const dbService = new dbApiService({ url: filter_api_url })
            let urlParams = {}
            let bodyData = replaceSpecialVars(filter_search_other_param, currentUser);
            bodyData[filter_search_param_name] = debouncedInputValue;
            if (debug) {
                console_debug_log(`SuggestionDropdown 2: ${filter_api_url} | useEffect | bodyData:`);
                console_debug_log(bodyData);
            }
            if (filter_api_request_method === "GET") {
                urlParams = Object.assign({}, bodyData);
                bodyData = {};
            }
            dbService.getAll(urlParams, bodyData, filter_api_request_method)
                .then(response => {
                    if (debug) {
                        console_debug_log('setSuggestions(response)', response);
                        console_debug_log('setSuggestions(response.resultset)', response.resultset);
                    }
                    if (typeof response.resultset == "string") {
                        setSuggestions([]);
                    } else {
                        setSuggestions(response.resultset);
                    }
                })
                .catch(error => {
                    if (debug) {
                        console.error('SuggestionDropdown API call error:', error);
                    }
                    setErrorMessage(getErrorMsgFromApi(error));
                });
        }
    }, [
        debouncedInputValue,
        filter_api_url,
        filter_search_other_param,
        filter_search_param_name,
        name,
        setFieldValue,
        filter_api_request_method,
        currentUser
    ]);

    useEffect(() => {
        setErrorMessage(null);
    }, [suggestions]);

    const handleSuggestionSelected = (suggestion) => {
        if (debug) {
            console_debug_log(`handleSuggestionSelected | suggestion:`);
            console_debug_log(suggestion);
        }
        if (suggestion) {
            Object.entries(autocomplete_fields).forEach(([field_name, attr_name]) => {
                const value = (suggestion[attr_name] ? suggestion[attr_name] : '');
                setFieldValue(field_name, value);
            });
            // Store new inputValue from suggestion
            const newInputValue = suggestion[suggestion_name_fieldname];
            setInputValue(newInputValue);
            setDebouncedInputValue(newInputValue);
        }
    };

    const inputValueChange = (newInputValue) => {
        setFieldValue(name, newInputValue);
        setInputValue(newInputValue);
    };

    const updateDebouncedInputValue = useMemo(
        () => debounce((value) => setDebouncedInputValue(value), debounceTimeout),
        []
    );

    const onInputValueChangeInternal = (newInputValue) => {
        inputValueChange(newInputValue);
        updateDebouncedInputValue(newInputValue);
    };

    const {
        isOpen,
        getMenuProps,
        getInputProps,
        highlightedIndex,
        getItemProps,
        selectedItem,
    } = useCombobox({
        items: suggestions,
        inputValue,
        onInputValueChange: ({ inputValue: newInputValue }) => {
            onInputValueChangeInternal(newInputValue);
        },
        onSelectedItemChange: ({ selectedItem }) => {
            handleSuggestionSelected(selectedItem);
        },
        itemToString: (item) => (item ? item[suggestion_name_fieldname] : inputValue),
        id: name,
    });

    return (
        <div className={SUGGESTION_DROPDOWN_WRAPPER_CLASS}>
            <div className={`${SUGGESTION_DROPDOWN_CLASS} ${className || ""} ${theme.input}`}>
                <div>
                    <input
                        {...getInputProps({
                            className: `${APP_FORMPAGE_FIELD_BASE_CLASS} ${disabled ? DISABLE_FIELD_BACKGROUND_COLOR_CLASS : ""
                                } ${(inputValue && suggestions.length === 0) ? IS_INVALID_CLASS : ""
                                }`,
                            disabled: disabled,
                            required: required,
                            name: nameInternal,
                        })}
                    />
                    <ul {...getMenuProps()}>
                        {isOpen &&
                            suggestions.map((suggestion, index) => (
                                <li
                                    {...getItemProps({
                                        key: convertId(suggestion[suggestion_id_fieldname]),
                                        index,
                                        item: suggestion,
                                        style: {
                                            backgroundColor: highlightedIndex === index ? 'lightgray' : 'white',
                                            fontWeight: selectedItem === suggestion ? 'bold' : 'normal',
                                        },
                                    })}
                                >
                                    {suggestion[suggestion_desc_fieldname]}
                                </li>
                            ))}
                    </ul>
                </div>
            </div>
            {inputValue && suggestions.length === 0 && (
                <div className={INVALID_FEEDBACK_CLASS}>
                    {errorMessage || 'Error: No suggestions found'}
                </div>
            )}
        </div>
    );
};

