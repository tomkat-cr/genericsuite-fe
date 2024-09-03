// GenericCrudEditor search component

import React, { useState } from "react"

import { console_debug_log } from "./logging.service.jsx";
import { processDateToTimestamp } from "../helpers/date-timestamp.jsx";
import { GsIcons } from "../helpers/IconsLib.jsx";
    
import {
    MSG_SEARCH,
} from "../constants/general_constants.jsx";
import {
    BUTTON_LISTING_CLASS,
    APP_LISTING_SEARCH_BOX_TOP_DIV_CLASS,
    APP_LISTING_SEARCH_BOX_LABEL_CLASS,
    APP_LISTING_SEARCH_BOX_INPUT_CLASS,
    APP_LISTING_SEARCH_BOX_SUBMIT_BUTTON_CLASS,
    APP_LISTING_SEARCH_BOX_STOP_BUTTON_CLASS,
} from "../constants/class_name_constants.jsx";

// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import fontawesome from "@fortawesome/fontawesome";
// import {
//     faGreaterThan,
// } from "@fortawesome/fontawesome-free-solid";
// fontawesome.library.add(
//     faGreaterThan,
// );

const debug = false;

export const CrudEditorSearch = ({
    id,
    fieldElements,
    handleCancel,
    value="",
}) => {
    const [searchText, setSearchText] = useState(value);

    const searchTextId = () => (`searchText_${id}`)

    const getDateRange = (searchValue) => {
        const dateRange = searchValue.split(',');
        let result;
        if (dateRange.length !== 2) {
            result = String(processDateToTimestamp(searchValue));
        } else {
            result = 
                (dateRange[0] ? String(processDateToTimestamp(dateRange[0].trim())) : '') +
                "," +
                (dateRange[1] ? String(processDateToTimestamp(dateRange[1].trim())) : '');
        }
        if (debug) console_debug_log(`CrudEditorSearch | getDateRange | result: ${result}`);
        return result;
    }

    const submitSearch = (newSearchText) => {
        let searchFilters = {};
        if (newSearchText !== "") {
            searchFilters = Object.keys(fieldElements)
            .reduce((filterDict, index) => {
                const element = fieldElements[index];
                if (debug) {
                    console_debug_log(`reduce | filterDict:`, filterDict, 'element:', element);
                }
                if (element.listing && 
                    (
                        (! ['number', 'integer', 'date', 'datetime-local', 'hr', 'label'].includes(element.type)) ||
                        (['number', 'integer'].includes(element.type) && ! isNaN(newSearchText)) ||
                        (['date', 'datetime-local'].includes(element.type) && ! (getDateRange(newSearchText).includes("NaN")))
                    )
                ) {
                    let newElement = {};
                    if (['date', 'datetime-local'].includes(element.type)) {
                        newElement[element.name] = getDateRange(newSearchText)
                    } else {
                        newElement[element.name] = newSearchText;
                    }
                    filterDict = {...filterDict, ...newElement};
                }
                return {...filterDict};
            }, {like: '1', comb: 'or'});
        }
        const config = {
            searchFilters: searchFilters,
            searchText: newSearchText,
        }
        if (debug) {
            console_debug_log(`CrudEditorSearch | newSearchText:`, newSearchText);
            console_debug_log(`CrudEditorSearch | fieldElements:`, fieldElements);
            console_debug_log(`CrudEditorSearch | searchFilters:`, searchFilters);
        }
        handleCancel(config);
    }

    const handleTextChange = (event) => {
        setSearchText(event.target.value);
    }

    const handleCancelSearch = () => {
        setSearchText('');
        submitSearch('');
    }

    const handleSubmit = () => {
        submitSearch(searchText);
    }

    return (
        <div
            className={APP_LISTING_SEARCH_BOX_TOP_DIV_CLASS}
        >
            <label
                htmlFor={searchTextId()}
                className={APP_LISTING_SEARCH_BOX_LABEL_CLASS}
            >
                {MSG_SEARCH}:
            </label>
            <input
                id={searchTextId()}
                // type="text"
                className={APP_LISTING_SEARCH_BOX_INPUT_CLASS}
                value={searchText || ''}
                onChange={handleTextChange}
            />
            <button
                className={APP_LISTING_SEARCH_BOX_SUBMIT_BUTTON_CLASS}
                onClick={handleSubmit}
            >
                {/* <FontAwesomeIcon icon="greater-than" /> */}
                <GsIcons icon="greater-than" />
            </button>
            {searchText !== '' &&
                <button
                    className={APP_LISTING_SEARCH_BOX_STOP_BUTTON_CLASS}
                    onClick={handleCancelSearch}
                >
                    X
                </button>

            }
        </div>
    );

}
