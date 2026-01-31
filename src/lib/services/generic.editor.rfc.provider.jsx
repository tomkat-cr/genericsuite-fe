// GenericCrudEditor provider. To share data and functions between the editor components

import React, { createContext, useCallback, useEffect, useMemo, useRef, useState } from 'react';

import { console_debug_log } from './logging.service.jsx';

// Create a context to hold the function
export const MainSectionContext = createContext();

// Provider Component
export const MainSectionProvider = ({ children }) => {
    const [cache, setCache] = useState({});
    const cacheRef = useRef(cache);
    const promisesRef = useRef({});

    useEffect(() => {
        cacheRef.current = cache;
    }, [cache]);

    const initCache = useCallback(() => {
        setCache({});
        promisesRef.current = {};
    }, []);

    const getCachedData = useCallback((entryName) => {
        return cacheRef.current[entryName];
    }, []);

    const putCachedData = useCallback((entryName, data) => {
        setCache(prevCache => {
            if (prevCache[entryName] === data) return prevCache;
            return { ...prevCache, [entryName]: data };
        });
    }, []);

    const typeofCachedData = useCallback((entryName) => {
        return typeof cacheRef.current[entryName];
    }, []);

    const listCache = useCallback(() => {
        return cacheRef.current;
    }, []);

    const debugCache = useCallback((description = 'debugCache') => {
        console_debug_log(`>>>>--->> listCache [${description}]:`, listCache());
        return '';
    }, [listCache]);

    const fetchOrCache = useCallback((entryName, fetchFn) => {
        if (typeof cacheRef.current[entryName] !== 'undefined') {
            return Promise.resolve(cacheRef.current[entryName]);
        }
        if (promisesRef.current[entryName]) {
            return promisesRef.current[entryName];
        }
        const promise = fetchFn().then(data => {
            putCachedData(entryName, data);
            delete promisesRef.current[entryName];
            return data;
        }).catch(err => {
            delete promisesRef.current[entryName];
            throw err;
        });
        promisesRef.current[entryName] = promise;
        return promise;
    }, [putCachedData]);

    const contextValue = useMemo(() => (
        {
            initCache,
            getCachedData,
            putCachedData,
            typeofCachedData,
            listCache,
            debugCache,
            fetchOrCache,
        }
    ), [
        initCache,
        getCachedData,
        putCachedData,
        typeofCachedData,
        listCache,
        debugCache,
        fetchOrCache,
    ]);

    return (
        <MainSectionContext.Provider value={contextValue}>
            {children}
        </MainSectionContext.Provider>
    )
}
