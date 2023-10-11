import React, { useState, useEffect, useCallback, useContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { isEmptyObject } from '../utils';
import { InputProps, BoletuxContextObj } from '../models/appTypes';

const LOCAL_STORAGE_SETTINGS_KEY = process.env.REACT_APP_LOCAL_STORAGE_SETTINGS_KEY || '';

export const BoletuxContext = React.createContext<BoletuxContextObj>({
    language: '',
    setLanguageHandler: (language: string ) => {},
} as BoletuxContextObj);


const BoletuxContextProvider: React.FC<InputProps> = ( props ) => {
    const [ language, setLanguage ] = useState<string>('');
    const [ localStorageSettings ] = useLocalStorage(LOCAL_STORAGE_SETTINGS_KEY);

    const retrieveStoredData = useCallback(() => {
        if (localStorageSettings && localStorageSettings.language !== '') {
            setLanguage(localStorageSettings.language);
        }

    }, [localStorageSettings]);

    useEffect(() => {
        retrieveStoredData();
    }, [retrieveStoredData]);

    const setLanguageHandler = (language: string) => {
        setLanguage(language);
    };

    const contextValue: BoletuxContextObj = {
        language: language,
        setLanguageHandler: setLanguageHandler,
    };


    return <BoletuxContext.Provider value={contextValue}>
        {props.children}
    </BoletuxContext.Provider>
};

export default BoletuxContextProvider;

export const useBoletuxContext = () => useContext(BoletuxContext);
