// GenericCrudEditor UI components

import React from 'react';

export const ShowAsDisabledField = ( {
    className = '',
    // backgroundColor = 'bg-gray-200',
    backgroundColor = '#e9ecef',
    children,
}) => {
    return (
        <>
            <div
                // className={`${backgroundColor} ${className}`}
                // className={`${backgroundColor}`}
                className={`${className}`}
                style={{ backgroundColor: backgroundColor }}
            >
                {children}
            </div>
        </>
    );
}
