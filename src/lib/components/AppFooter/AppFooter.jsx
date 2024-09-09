import React from "react";

export const AppFooter = () => {
    return (
        <p>&copy; {new Date().getFullYear()} {process.env.REACT_APP_APP_NAME}. All rights reserved.</p>
    );
}