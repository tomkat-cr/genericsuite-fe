// GenericCrudEditor UI components
import React from 'react';

import {
    DISABLE_FIELD_BACKGROUND_COLOR_CLASS,
} from '../constants/class_name_constants.jsx';

export const ShowAsDisabledField = ( {
    className = '',
    backgroundColor = null,
    children,
}) => {
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
