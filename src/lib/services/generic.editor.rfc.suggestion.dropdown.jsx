// Suggestion Dropdown

import React, { useState, useEffect } from 'react';
import Downshift from 'downshift';
import { useFormikContext } from 'formik';
// import { debounce } from 'lodash';

import {
    dbApiService,
    convertId,
} from './db.service.jsx';
import {
    defaultValue,
    replaceSpecialVars,
} from "./generic.editor.utilities.jsx";
import { 
    console_debug_log,
} from "./logging.service.jsx";
import { useUser } from '../helpers/UserContext.jsx';
import { INVALID_FEEDBACK_CLASS } from '../constants/class_name_constants.jsx';

const debug = false;

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
    const [suggestions, setSuggestions] = useState([]);
    const { currentUser } = useUser();

    // This component's input field must be different to the external input field to enable value sync
    const nameInternal = `${name}_sdd`;

    const filter_api_url = defaultValue(config, 'filter_api_url');     // Ex. "fda_food_query"
    const filter_api_request_method = defaultValue(config, "filter_api_request_method", "POST"); // Ex. true or false
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
        if (inputValue) {
            // Get suggestions from external surce
            const dbService = new dbApiService({ url: filter_api_url })
            let urlParams = {}
            let bodyData = replaceSpecialVars(filter_search_other_param, currentUser);
            bodyData[filter_search_param_name] = inputValue;
            if (debug) {
                console_debug_log(`SuggestionDropdow 2: ${filter_api_url} | useEffect | bodyData:`);
                console_debug_log(bodyData);
            }
            if (filter_api_request_method === "GET") {
                urlParams = Object.assign({}, bodyData);
                bodyData = Object.assign({});
            }
            dbService.getAll(urlParams, bodyData, filter_api_request_method)
                .then(response => {
                    if (debug) {
                        console_debug_log('setSuggestions(response.resultset)');
                        console_debug_log(response.resultset);
                    }
                    if (typeof response.resultset == "string") {
                        setSuggestions([]);
                    } else {
                        setSuggestions(response.resultset);
                    }
                })
                .catch(error => console.error(error));
        }
    }, [
        inputValue,
        filter_api_url,
        filter_search_other_param,
        filter_search_param_name,
        name,
        setFieldValue,
        filter_api_request_method
    ]);

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
            const newInputValue = suggestion[suggestion_name_fieldname]
            if (debug) {
                console_debug_log(`inputValueChange | 1.1) Before setInputValue(${newInputValue})`);
            }
            setInputValue(newInputValue);
            if (debug) {
                console_debug_log(`inputValueChange | 1.2) After setInputValue(${newInputValue})`);
            }
        }
    };

    const inputValueChange = (newInputValue) => {
        // Sync the external input field value with this component's input field
        if (debug) {
            console_debug_log(`inputValueChange | 2.1) Before setFieldValue(${name}, ${inputValue})`);
        }
        setFieldValue(name, newInputValue);
        if (debug) {
            console_debug_log(`inputValueChange | 2.2) After setFieldValue(${name}, ${inputValue})`);
        }
        // Store new inputValue
        if (debug) {
            console_debug_log(`inputValueChange | 2.3) Before setInputValue(${newInputValue})`);
        }
        setInputValue(newInputValue);
        if (debug) {
            console_debug_log(`inputValueChange | 2.4) After setInputValue(${newInputValue})`);
        }
    };

    return (
        <>
            <div
                className="align-middle flex"
            >
                <Downshift
                    inputValue={inputValue}
                    onChange={handleSuggestionSelected}
                    // onInputValueChange={debounce((inputValue) => setInputValue(inputValue), 500)}
                    // onInputValueChange={(inputValue) => setInputValue(inputValue)}
                    onInputValueChange={(inputValue) => inputValueChange(inputValue)}
                    itemToString={(item) => (item ? item[suggestion_name_fieldname] : inputValue)}
                    id={name}
                    name={nameInternal}
                    key={nameInternal}
                    disabled={disabled}
                    required={required}
                    className={className}
                >
                    {({
                        getInputProps,
                        getItemProps,
                        getMenuProps,
                        isOpen,
                        highlightedIndex,
                        selectedItem,
                        getToggleButtonProps
                    }) => (
                        <div>
                            <input {...getInputProps()} />
                            <ul {...getMenuProps()}>
                                {isOpen
                                    ? suggestions.map((suggestion, index) => (
                                        <li
                                            {...getItemProps({
                                                key: convertId(suggestion[suggestion_id_fieldname]),
                                                index,
                                                item: suggestion,
                                                style: {
                                                    backgroundColor:
                                                        highlightedIndex === index ? 'lightgray' : 'white',
                                                    fontWeight: selectedItem === suggestion ? 'bold' : 'normal',
                                                },
                                            })}
                                        >
                                            {suggestion[suggestion_desc_fieldname]}
                                        </li>
                                    ))
                                    : null}
                            </ul>
                        </div>
                    )}
                </Downshift>

            </div>
            {inputValue && suggestions.length === 0 && (
                <div
                    className={INVALID_FEEDBACK_CLASS}
                >
                    Error: No suggestions found.
                </div>
            )}
        </>
    );
};

