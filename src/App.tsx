import React, { useCallback, useEffect } from 'react';
import i18next from 'i18next';
import { I18nextProvider, useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from './AppRoutes';
import ScrollToTop from './components/UI/ScrollToTop/ScrollToTop';
import ShowAlert from './components/core/ShowAlert/ShowAlert';
import Layout from './components/UI/Layout/Layout';

import BoletuxContextProvider from './store/boletux-context';
import AuthContextProvider from './store/auth-context';
import useLocalStorage from './hooks/useLocalStorage';

import { localStorageSettingsType } from './models/appTypes';

import './i18n';

const LOCAL_STORAGE_SETTINGS_KEY = process.env.REACT_APP_LOCAL_STORAGE_SETTINGS_KEY || '';

function App() {
    const { i18n } = useTranslation();
    const [ localStorageSettings, setLocalStorageSettings ] = useLocalStorage(LOCAL_STORAGE_SETTINGS_KEY);

    const changeLanguageHandler = (language: string) => {
        setLocalStorageSettings((oldConfig: localStorageSettingsType) => ({
            ...oldConfig,
            language: language
        }));

        i18n.changeLanguage(language);
    };

    const setLanguage = useCallback((language: string) => {
        i18n.changeLanguage(language);
    }, [i18n]);

    useEffect(() => {
        if (localStorageSettings) {
            setLanguage(localStorageSettings.language);
        }

    }, [localStorageSettings, setLanguage]);
 
    return (
        <I18nextProvider i18n={i18next}>
            <BrowserRouter>
                <AuthContextProvider>
                    <BoletuxContextProvider>
                        <Layout onChangeLanguage={changeLanguageHandler} >
                            <ScrollToTop />
                            <AppRoutes />
                            <ShowAlert />
                        </Layout>
                    </BoletuxContextProvider>
                </AuthContextProvider>
            </BrowserRouter>
        </I18nextProvider>
    );
}

export default App;
