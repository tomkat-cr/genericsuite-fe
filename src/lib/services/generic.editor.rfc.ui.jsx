// GenericCrudEditor UI components
import { Field } from 'formik';
import React from 'react';

import {
    APP_FORMPAGE_FIELD_GOOD_CLASS,
    DISABLE_FIELD_BACKGROUND_COLOR_CLASS,
} from '../constants/class_name_constants.jsx';

export const ShowAsDisabledField = ({
    className = APP_FORMPAGE_FIELD_GOOD_CLASS,
    name = '',
    key = '',
    id = '',
    type = "text",
    value = null,
    readOnly = false,
    required = false,
    disabled = false,
    showAsField = "1",
    onChange = () => { },
    onBlur = () => { },
    backgroundColor = null,
    children,
}) => {
    if (showAsField === "1") {
        return (
            <>
                <Field
                    name={name}
                    key={name}
                    id={name}
                    type={type}
                    required={required}
                    disabled={disabled}
                    readOnly={readOnly}
                    className={className}
                    value={value !== null ? value : children}
                    onChange={onChange}
                    onBlur={onBlur}
                />
            </>
        );
    }
    return (
        <>
            <div
                className={`${backgroundColor ?? DISABLE_FIELD_BACKGROUND_COLOR_CLASS} ${className}`}
            >
                {children}
            </div>
        </>
    );
}
