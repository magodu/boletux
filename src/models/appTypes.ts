export interface localStorageSettingsType {
    language: string;
};

export interface InputProps {
    children: React.ReactElement;
}



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

export interface toastEventPayload {
    message: string;
    type?: string
}

export type BoletuxContextObj = {
    language: string;
    isLoggedIn: boolean;
    web3Provider: any,
    web3Contracts: any,
    setLanguageHandler: (language: string) => void;
    setLoggedUser: (logged: boolean) => void;
    setWeb3Provider: (provider: any ) => void,
    setWeb3Contract: (contractType: string, contract: any ) => void,
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

export type ActionReducerType = { type: string; value: any };
