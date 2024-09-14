import React from "react";

export const AppFooter = ({ appName = null, year = null, url = null, rights = null, otherLine = null}) => {
    const appNameData = appName ?? process.env.REACT_APP_APP_NAME;
    const yearData = year ?? new Date().getFullYear();
    const rightsData = rights ?? "All rights reserved";
    return (
        <>
            <p>&copy; {yearData} {url ? <a href={url} target="_blank">{appNameData}</a> : appNameData}. {rightsData}.</p>
            {otherLine && (
                <p>{otherLine}</p>
            )}
        </>
    );
}