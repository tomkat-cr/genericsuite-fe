// GenericCrudEditor UI components
import React from 'react';

import {
    DISABLE_FIELD_BACKGROUND_COLOR_CLASS,
} from '../constants/class_name_constants';

export const ShowAsDisabledField = ( {
    className = '',
    // backgroundColor = 'bg-gray-200',
    // backgroundColor = '#e9ecef',
    backgroundColor = null,
    children,
}) => {
    return (
        <>
            <div
                // className={`${className}`}
                // style={{ backgroundColor: backgroundColor }}
                className={`${backgroundColor ?? DISABLE_FIELD_BACKGROUND_COLOR_CLASS} ${className}`}
            >
                {children}
            </div>
        </>
    );
}
