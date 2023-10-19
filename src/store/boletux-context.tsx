import React, { useState, useEffect, useCallback, useContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { InputProps, BoletuxContextObj } from '../models/appTypes';
import { defaultLanguage } from '../constants';

const LOCAL_STORAGE_DATA_KEY = process.env.REACT_APP_LOCAL_STORAGE_DATA_KEY || '';

export const BoletuxContext = React.createContext<BoletuxContextObj>({
    language: defaultLanguage,
    isLoggedIn: false,
    setLanguageHandler: (language: string ) => {},
    setLogUserHandler: (logged: boolean ) => {},
} as BoletuxContextObj);


const BoletuxContextProvider: React.FC<InputProps> = ( props ) => {
    const [ language, setLanguage ] = useState<string>(defaultLanguage);
    const [ userLogged, setUserLogged ] = useState<boolean>(false);
    const [ localStorageUserData ] = useLocalStorage(LOCAL_STORAGE_DATA_KEY);

    const retrieveStoredData = useCallback(() => {
        if (localStorageUserData && localStorageUserData.language !== '') {
            setLanguage(localStorageUserData.language);
        }

    }, [localStorageUserData]);

    useEffect(() => {
        retrieveStoredData();
    }, [retrieveStoredData]);

    const setLanguageHandler = (language: string) => {
        setLanguage(language);
    };

    const setLogUserHandler = (isLogged: boolean) => {
        setUserLogged(isLogged);
    };

    const contextValue: BoletuxContextObj = {
        language: language,
        isLoggedIn: userLogged,
        setLanguageHandler: setLanguageHandler,
        setLogUserHandler: setLogUserHandler,
    };


    return <BoletuxContext.Provider value={contextValue}>
        {props.children}
    </BoletuxContext.Provider>
};

export default BoletuxContextProvider;

export const useBoletuxContext = () => useContext(BoletuxContext);
