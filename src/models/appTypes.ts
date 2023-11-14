export interface localStorageDataType {
    token: string;
    expirationTime: string;
    loginData: any;
    titleData: any;
    userCharactersList: any;
    userData: any;
    userInventory: any;
};

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

export interface registerUserRequest {
    DisplayName: string;
    Email: string;
    Password: string;
    Username: string;
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

export interface alertEventPayload {
    message: string;
    type?: string
}

export interface buffType {
    buffType: number;
    buffValue: number;
    isPlayerBuff: boolean;
    skillPositionList: number;
    turnsToFinish: number;
} 

export interface serverActionType {
    action: number;
    buff: buffType | null;
    damage: number;
    enemyAttack: number;
    enemyHp: number;
    isPlayerPirate: boolean;
    playerAttack: number;
    playerHp: number;
    skill: number;
    status: null
    turnPhase: number;
}


export interface playerStatsType {
    player: 1 | 2,
    initialPlayerHealthPoints: number;
    initialOpponentHealthPoints: number;
    playerHp: number | null;
    enemyHp: number | null;
    playerAttack?: number | null;
    enemyAttack?: number | null;
    damage?: number | null;
    skill: number | null;
}


export interface playerAnimationType {
    player: number;
    imageRoot: string;
    animation: string;
}


export interface AnnouncerMessageType {
    id: string;
    player: number;
    avatar?: string;
    message: string;
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
