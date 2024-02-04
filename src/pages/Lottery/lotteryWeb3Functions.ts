type ScFunction = () => Promise<any>;

// Abstract function that handles the try-catch logic for any sc method
export const executeScFunction = async (sc: any, fn: ScFunction): Promise<any> => {
    let response;

    try {
        response = await fn.call(sc);
    } catch (err) {
        console.error(err);
        response = err;
    }

    return response;
};


export const isLotteryOpened = (sc: any): Promise<any> => {
    return executeScFunction(sc, sc.isLotteryOpened);
};

export const balance = async(sc: any): Promise<number> => {
    const response = await executeScFunction(sc, sc.balance);
    return response.toNumber();
};

export const ticketsForSale = (sc: any): Promise<boolean[]> => {
    return executeScFunction(sc, sc.ticketsForSale);
};

export const getPendingTime = async(sc: any): Promise<number> => {
    const response = await executeScFunction(sc, sc.getPendingTime);
    return response.toNumber();
};

export const getNumLottery = async(sc: any): Promise<number> => {
    const response = await executeScFunction(sc, sc.numLottery);
    return response.toNumber();
};

export const getTicketPrice = async(sc: any): Promise<number> => {
    const response = await executeScFunction(sc, sc.ticketPrice);
    return response.toNumber();
};
