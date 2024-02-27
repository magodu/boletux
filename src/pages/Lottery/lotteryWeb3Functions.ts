type ScFunction = () => Promise<any>;

// Abstract function that handles the try-catch logic for any sc method
export const executeSmartContractFunction = async (sc: any, fn: ScFunction): Promise<any> => {
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
    return executeSmartContractFunction(sc, sc.isLotteryOpened);
};

export const balance = async (sc: any): Promise<number> => {
    const response = await executeSmartContractFunction(sc, sc.balance);
    return response.toNumber();
};

export const ticketsForSale = (sc: any): Promise<boolean[]> => {
    return executeSmartContractFunction(sc, sc.actualTicketsForSale);
};

export const getPendingTime = async (sc: any): Promise<number> => {
    const response = await executeSmartContractFunction(sc, sc.getPendingTime);
    return response.toNumber();
};

export const getNumLottery = async (sc: any): Promise<number> => {
    const response = await executeSmartContractFunction(sc, sc.numLottery);
    return response.toNumber();
};

export const getTicketPrice = async (sc: any): Promise<number> => {
    const response = await executeSmartContractFunction(sc, sc.ticketPrice);
    return response.toNumber();
};

export const getLotteryHistory = async (sc: any): Promise<any> => {
    try {
        const currentLottery = await sc.numLottery();
        let i = currentLottery - 1;
        const end = i - 9;
        let list = [];

        for (i; i >= end; i--) {
            if (i >= 0) {
                let obj = await sc.getHistory(i);
                list.push({
                    initDate: obj.initDate.toNumber(),
                    endDate: obj.endDate.toNumber(),
                    prize: obj.prize.toNumber(),
                    lotteryTickets: obj.lotteryTickets,
                    winner: obj.winner,
                    winnerNum: obj.winnerNum.toNumber(),
                    soldTicketAmt: obj.soldTicketAmt.toNumber(),
                    soldTicketList: obj.soldTicketList,
                });
            }
        }

        return list;
    } catch (err) {
        console.error(err);
    }
};
