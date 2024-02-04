import { imageInputDataType, imageOutputDataType, alertModalDataType } from './models/appTypes';


// TODO: review these functions if are used or not

export const isEmptyObject = (obj: any): boolean => {
    if (!obj) return true;

    return obj && Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype;
};

export const tryParseJSONObject = (jsonString: string) => {
    try {
        const o = JSON.parse(jsonString);
        // JSON.parse(null) returns null, and typeof null === "object", so we must check for that, too. Thankfully, null is falsey, so this suffices:
        if (o && typeof o === 'object') {
            return o;
        }
    } catch (e) {}

    return false;
};

export const convertArrayToObject = (array: any[], key: string) => {
    const initialValue = {};
    return array.reduce((obj, item) => {
        obj[item.id] = {};
        Object.keys(item).forEach(function (k) {
            if (k !== key) obj[item.id] = Object.assign(obj[item.id], { [k]: item[k] });
        });
        return obj;
    }, initialValue);
};

export const isElementExists = (array: any[], value: any, key?: string): boolean => {
    let found = false;
    if (key) {
        found = array.some((el) => el[key] === value[key]);
    } else {
        found = array.some((el) => el === value);
    }
    return found;
};

export const loadImageData = (imageData: imageInputDataType, path?: string) => {
    return new Promise((resolve, reject) => {
        const cData: imageOutputDataType = {
            id: imageData.imageId,
            alt: imageData.alt,
            imageName: imageData.imageName,
            src: require(`./assets/${imageData.path}${imageData.imageName}`).default,
        };

        const image = new Image();
        image.src = cData.src;

        image.onload = () => resolve(cData);
        image.onerror = (error) => reject(error);
    });
};

export const getErrorDetails = (error: any) => {
    let errorDetails: string[] = [];
    let parsedError: alertModalDataType = {
        message: error.errorMessage,
        errorDetails: [],
    };
    for (const prop in error.errorDetails) {
        error.errorDetails[prop].forEach((err: string) => {
            errorDetails.push(`${prop}: ${err}`);
        });
    }

    parsedError.errorDetails = errorDetails;

    return parsedError;
};

export const createIdKey = (length: number = 5) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
};

export const formatNumber = (num: number) => {
    return Math.round((num + Number.EPSILON) * 100) / 100;
};

export const setLotteryDate = (day: number, hour: number) => {
    let curr = new Date();
    let endOfWeek = curr.getDate() - curr.getDay() + day;
    let lotteryDate = new Date(curr.setDate(endOfWeek));
    lotteryDate.setHours(hour, 0, 0, 0);

    return lotteryDate;
};

export const wait = (milliseconds: number) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(null);
        }, milliseconds);
    });
};

export const parseEthersError = (error: any) => {
    let errorMessage = error.reason || (error.error && error.error.message);

    if (!errorMessage && error.data) {
        try {
            let errorData = typeof error.data === 'string' ? JSON.parse(error.data) : error.data;
            errorMessage = errorData.message || (errorData.originalError && errorData.originalError.message);
        } catch (jsonError) {
            console.error('Error parsing error data:', jsonError);
            errorMessage = 'An unexpected error occurred';
        }
    }

    return errorMessage || 'An unknown error occurred';
};
