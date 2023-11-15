export interface localStorageSettingsType {
    language: string;
};

export interface InputProps {
    children: React.ReactElement;
}

export type AuthContextObj = {
    loginData: any,
    token: string | null,
    duration: number;
    isLoggedIn: boolean;
    setLoginDataHandler: (loginData: any) => void;
    logoutHandler: () => void;
};

export interface imageInputDataType {
    imageId: string;
    imageName: string;
    path: string;
    alt?: string;
}

export interface imageOutputDataType {
    id: string;
    imageName: string;
    src?: any;
    alt?: string;
}

export interface alertModalDataType {
    message: string;
    errorDetails?: string[];
}

export interface alertEventPayload {
    message: string;
    type?: string
}

export type BoletuxContextObj = {
    language: string;
    isLoggedIn: boolean;
    setLanguageHandler: (language: string) => void;
    setLogUserHandler: (logged: boolean) => void;
};

export interface nftList {
    id: string | number;
    src: any;
    alt: string;
}

export enum weekDays {
    monday = 1,
    tuesday = 2,
    wednesday = 3,
    thursday = 4,
    friday = 5,
    saturday = 6,
    sunday = 7,
}
