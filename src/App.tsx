import React, { useCallback, useEffect } from 'react';
import i18next from 'i18next';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop';
import ShowAlert from './components/core/ShowAlert/ShowAlert';
import Layout from './components/UI/Layout/Layout';

import BoletuxContextProvider from './store/boletux-context';
import useLocalStorage from './hooks/useLocalStorage';

import { localStorageSettingsType } from './models/appTypes';
import { defaultLanguage } from './constants';
import './i18n';

const LOCAL_STORAGE_DATA_KEY = process.env.REACT_APP_LOCAL_STORAGE_DATA_KEY || '';

function App() {
    const { i18n } = useTranslation();
    const [ localStorageUserData, setLocalStorageUserData ] = useLocalStorage(LOCAL_STORAGE_DATA_KEY);

    const changeLanguageHandler = useCallback((language: string) => {
        setLocalStorageUserData((oldConfig: localStorageSettingsType) => ({
            ...oldConfig,
            language: language
        }));

        i18n.changeLanguage(language);

    }, [i18n, setLocalStorageUserData]);

    const setLanguage = useCallback((language: string) => {
        i18n.changeLanguage(language);
    }, [i18n]);

    useEffect(() => {
        if (localStorageUserData) {
            setLanguage(localStorageUserData.language);
        } else {
            setLanguage(defaultLanguage);
            changeLanguageHandler(defaultLanguage);
        }

    }, [changeLanguageHandler, localStorageUserData, setLanguage]);
 
    return (
        <I18nextProvider i18n={i18next}>
            <BrowserRouter>
                <BoletuxContextProvider>
                    <Layout onChangeLanguage={changeLanguageHandler} >
                        <ScrollToTop />
                        <AppRoutes />
                        <ShowAlert />
                    </Layout>
                </BoletuxContextProvider>
            </BrowserRouter>
        </I18nextProvider>
    );
}

export default App;
