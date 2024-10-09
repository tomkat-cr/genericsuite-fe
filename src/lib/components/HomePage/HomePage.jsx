import React, { useState, useEffect } from 'react';

import { APP_GENERAL_MARGINS_CLASS } from '../../constants/class_name_constants.jsx';

export const HomePage = ({children}) => {
    return (
        <div
            className={APP_GENERAL_MARGINS_CLASS}
        >
            {children}
        </div>
    );
}
