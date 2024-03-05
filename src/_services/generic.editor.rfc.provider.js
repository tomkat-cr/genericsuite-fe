import React, { createContext, useState } from 'react';
import { console_debug_log } from './logging.service';

// Create a context to hold the function
export const MainSectionContext = createContext();

// Provider Component
export const MainSectionProvider = ({ children }) => {
    const [cache, setCache] = useState({});

    const initCache = () => {
        setCache({});
    }

    const getCachedData = (entryName) => {
        return cache[entryName];
    }

    const putCachedData = (entryName, data) => {
        setCache(prevCache => ({...prevCache, [entryName]: data}));
    }

    const typeofCachedData = (entryName) => {
        return typeof cache[entryName];
    }

    const listCache = () => {
        return cache;
    }

    const debugCache = (description='debugCache') => {
        console_debug_log(`>>>>--->> listCache [${description}]:`, listCache());
        return '';
    }

    return (
        <MainSectionContext.Provider
            value={
                {
                    initCache,
                    getCachedData,
                    putCachedData,
                    typeofCachedData,
                    listCache,
                    debugCache,
                }
            }
        >
            {children}
        </MainSectionContext.Provider>
    )
}
