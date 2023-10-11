import React, { useState, useRef, useEffect, useCallback, useContext } from 'react';

import useLocalStorage from '../hooks/useLocalStorage';
import { isEmptyObject } from '../utils';
import { AlertEventChannel } from '../components/eventChannels/AlertEventChannel';

import { AuthContextObj, InputProps } from '../models/appTypes';


let logoutTimer: any;
const LOCAL_STORAGE_KEY = process.env.REACT_APP_LOCAL_STORAGE_DATA_KEY || '';

export const AuthContext = React.createContext<AuthContextObj>({
    loginData: {},
    token: '',
    duration: 0,
    isLoggedIn: false,
    setLoginDataHandler: (loginData: any) => {},
    logoutHandler: () => {},
} as AuthContextObj);

const calculateRemainingTime = (expirationTime: string) => {
    const currentTime = new Date().getTime();
    const adjExpirationTime = new Date(expirationTime).getTime();

    const remainingDuration = adjExpirationTime - currentTime;

    return remainingDuration;
};

const retrieveStoredToken = () => {

    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);

    let data = {
        token: '',
        duration: 0
    };

    if (storedData && storedData !== 'undefined') {
        const storedDataParsed = JSON.parse(storedData);
        const storedToken: string = storedDataParsed.token;
        const storedExpirationDate: string = storedDataParsed.expirationTime;
        const remainingTime = calculateRemainingTime(storedExpirationDate);

        if (remainingTime <= 60000) {
            console.log('Time expired');
            return null;
        }
        data = {
            token: storedToken,
            duration: remainingTime || 0,
        };
    }

    return data;
};

const AuthContextProvider: React.FC<InputProps> = (props) => {
    const [loginData, setLoginData] = useState<any>(null);
    const loginCalledRef = useRef<boolean>(false);

    const tokenData = retrieveStoredToken();

    let initialToken = '';
    if (tokenData) {
        initialToken = tokenData.token!;
    }

    const [token, setToken] = useState<string | null>(initialToken);
    const [tokenDuration, setTokenDuration] = useState<number>(0);
    const [localStorageConfig, removeValue] = useLocalStorage(LOCAL_STORAGE_KEY);
    const userIsLoggedIn = !!token;

    const logoutHandler = useCallback(() => {
        setToken(null);
        removeValue();

        if (logoutTimer) {
            clearTimeout(logoutTimer);
        }
    }, [removeValue]);

    const logoutTimeout = useCallback(() => {
        logoutHandler();
        AlertEventChannel.emit('onSendAlert', { type: 'warning', message: 'Session expired. Please login again.'}); // Send Event
    }, [logoutHandler]);

    const setLoginDataHandler = (loginData: any) => {
        setLoginData(loginData);
        setToken(loginData.EntityToken.EntityToken);
        const storedExpirationDate = loginData.EntityToken.TokenExpiration;
        const remainingTime = calculateRemainingTime(storedExpirationDate!);
        setTokenDuration(remainingTime);

        logoutTimer = setTimeout(logoutTimeout, remainingTime);
    };

    useEffect(() => {
        if (!isEmptyObject(loginData) && !logoutTimer) {
            logoutTimer = setTimeout(logoutTimeout, tokenDuration);
        }
    }, [loginData, logoutTimeout, tokenDuration]);

    const retrieveStoredData = useCallback(() => {
        if (localStorageConfig && localStorageConfig.loginData && !isEmptyObject(localStorageConfig.loginData)) {
            if (!loginCalledRef.current) {
                const sessionToken = localStorageConfig.loginData.SessionTicket;
                const entityToken = localStorageConfig.loginData.EntityToken.EntityToken;
                loginCalledRef.current = true;
            }
        }

    }, [localStorageConfig]);

    useEffect(() => {
        retrieveStoredData();
    }, [retrieveStoredData]);

    const contextValue: AuthContextObj = {
        loginData: loginData,
        token: token,
        duration: tokenDuration,
        isLoggedIn: userIsLoggedIn,
        setLoginDataHandler: setLoginDataHandler,
        logoutHandler: logoutHandler,
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
