import React, { useState, useEffect, useCallback, useContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { InputProps, BoletuxContextObj } from '../models/appTypes';
import { defaultLanguage } from '../constants';

const LOCAL_STORAGE_DATA_KEY = process.env.REACT_APP_LOCAL_STORAGE_DATA_KEY || '';

export const BoletuxContext = React.createContext<BoletuxContextObj>({
    language: defaultLanguage,
    isLoggedIn: false,
    web3Provider: null,
    web3Contracts: {},
    setLanguageHandler: (language: string ) => {},
    setLoggedUser: (logged: boolean ) => {},
    setWeb3Provider: (provider: any ) => {},
    setWeb3Contract: (contractType: string, contract: any ) => {},
} as BoletuxContextObj);


const BoletuxContextProvider: React.FC<InputProps> = ( props ) => {
    const [ language, setLanguage ] = useState<string>(defaultLanguage);
    const [ userLogged, setUserLogged ] = useState<boolean>(false);
    const [ web3Provider, setWeb3Provider ] = useState<any>(null);
    const [ web3Contracts, setWeb3Contracts ] = useState<any>({});
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

    const setWeb3ProviderHandler = (provider: any) => {
        setWeb3Provider(provider);
    };

    const setWeb3ContractHandler = (contractType: string, contract: any) => {
        setWeb3Contracts((prevState: any) => ({
            ...prevState,
            [contractType]: contract,
        }));
    };

    const contextValue: BoletuxContextObj = {
        language: language,
        isLoggedIn: userLogged,
        web3Provider: web3Provider,
        web3Contracts: web3Contracts,
        setLanguageHandler: setLanguageHandler,
        setLoggedUser: setLogUserHandler,
        setWeb3Provider: setWeb3ProviderHandler,
        setWeb3Contract: setWeb3ContractHandler,
    };


    return <BoletuxContext.Provider value={contextValue}>
        {props.children}
    </BoletuxContext.Provider>
};

export default BoletuxContextProvider;

export const useBoletuxContext = () => useContext(BoletuxContext);
