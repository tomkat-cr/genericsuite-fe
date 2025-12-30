// GenericCrudEditor provider. To share data and functions between the editor components

import React, { createContext, useCallback, useMemo, useState } from 'react';

import { console_debug_log } from './logging.service.jsx';

// Create a context to hold the function
export const MainSectionContext = createContext();

// Provider Component
export const MainSectionProvider = ({ children }) => {
    const [cache, setCache] = useState({});

    const initCache = useCallback(() => {
        setCache({});
    }, []);

    const getCachedData = useCallback((entryName) => {
        return cache[entryName];
    }, [cache]);

    const putCachedData = useCallback((entryName, data) => {
        setCache(prevCache => ({ ...prevCache, [entryName]: data }));
    }, []);

    const typeofCachedData = useCallback((entryName) => {
        return typeof cache[entryName];
    }, [cache]);

    const listCache = useCallback(() => {
        return cache;
    }, [cache]);

    const debugCache = useCallback((description = 'debugCache') => {
        console_debug_log(`>>>>--->> listCache [${description}]:`, listCache());
        return '';
    }, [listCache]);

    const contextValue = useMemo(() => (
        {
            initCache,
            getCachedData,
            putCachedData,
            typeofCachedData,
            listCache,
            debugCache,
        }
    ), [
        initCache,
        getCachedData,
        putCachedData,
        typeofCachedData,
        listCache,
        debugCache,
    ]);

    return (
        <MainSectionContext.Provider value={contextValue}>
            {children}
        </MainSectionContext.Provider>
    )
}
