import React, { useState, useRef, useEffect, useReducer, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';

import classes from './Lottery.module.scss';

import Countdown from '../../components/app/Countdown/Countdown';
import TabNavItem from '../../components/UI/Tabs/TabNavItem';
import TabContent from '../../components/UI/Tabs/TabContent';
import ContentBox from '../../components/UI/ContentBox/ContentBox';

import Spinner from '../../components/UI/Spinner/Spinner';
import CopyToClipboardButton from '../../components/UI/CopyToClipboardButton/CopyToClipboardButton';

import { ToastEventChannel } from '../../components/eventChannels/ToastEventChannel';

import { BoletuxContext } from '../../store/boletux-context';
import { useEthersErrorHandler } from '../../hooks/useEthersErrorHandler';

import { abiLotteryFactory, abiLotteryStorage } from '../../ethereum/abiLotteryContract';
import { getPendingTime, isLotteryOpened, balance, ticketsForSale, getNumLottery, getTicketPrice, getLotteryHistory } from './lotteryWeb3Functions';

import { criptocurrency } from '../../constants';
import { ActionReducerType } from '../..//models/appTypes';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import ethereumLogoImg from '../../assets/images/ethereum-logo.png';
import clockImg from '../../assets/images/clock.png';
import { FaTrashAlt } from 'react-icons/fa';
import { BsQuestionCircle, BsGraphUpArrow } from 'react-icons/bs';
import { RxExternalLink } from "react-icons/rx";


const addr_factory_contract = process.env.REACT_APP_LOTTERY_FACTORY_CONTRACT || '';
const addr_storage_contract = process.env.REACT_APP_LOTTERY_STORAGE_CONTRACT || '';
const boxStyles = {
    box: { width: '260px' },
};

interface ReducerState {
    isLoading: boolean;
    lotteryDraw: string;
    lotteryPrice: string;
    lotteryPendingTime: number | null;
    lotteryBalance: number;
    lotteryTicketsForSale: any[];
    ticketsListByOwner: any[];
    userSelectedTickets: any[];
    lotteryHistory: any[];
}

const initialState = {
    isLoading: false,
    lotteryDraw: '',
    lotteryPrice: '',
    lotteryPendingTime: null,
    lotteryBalance: 0,
    lotteryTicketsForSale: [],
    ticketsListByOwner: [],
    userSelectedTickets: [],
    lotteryHistory: [],
};

const lotteryReducer = (state: ReducerState, action: ActionReducerType) => {
    const { type } = action;
    switch (type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.value };
        case 'SET_DRAW':
            return { ...state, lotteryDraw: action.value };
        case 'SET_PRICE':
            return { ...state, lotteryPrice: action.value };
        case 'SET_PENDING_TIME':
            return { ...state, lotteryPendingTime: action.value };
        case 'SET_HISTORY':
                return { ...state, lotteryHistory: action.value };
        case 'SET_BALANCE':
            return { ...state, lotteryBalance: action.value };
        case 'SET_TICKETS_FOR_SALE':
            return { ...state, lotteryTicketsForSale: action.value };
        case 'SET_TICKETS_BY_OWNER':
            return { ...state, ticketsListByOwner: action.value };
        case 'SET_SELECTED_TICKETS':
            return { ...state, userSelectedTickets: action.value };
        default:
            return state;
    }
};

const Lottery: React.FC = () => {
    const { t } = useTranslation();
    const { web3Provider, setWeb3Provider, web3Contracts, setWeb3Contract } = useContext(BoletuxContext);
    const { handleError, errorMessage } = useEthersErrorHandler();
    const [activeTab, setActiveTab] = useState<string>('buy');
    const [state, dispatch] = useReducer(lotteryReducer, initialState);
    const { isLoading, lotteryDraw, lotteryPrice, lotteryPendingTime, lotteryBalance, lotteryTicketsForSale, ticketsListByOwner, userSelectedTickets, lotteryHistory } = state;

    const contractFactoryRef = useRef<any>();
    const contractStorageRef = useRef<any>();

    const lotteryNumbers = Array.from({ length: 100 }, (_, index) => String(index).padStart(2, '0'));

    useEffect(() => {
        const initializeProvider = async () => {
            if (window.ethereum && !web3Provider) {
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                setWeb3Provider(provider);
            }
        };

        const deployContract = async () => {
            if (web3Provider) {
                const contractFactory = new ethers.Contract(addr_factory_contract, abiLotteryFactory, web3Provider);
                const contractStorage = new ethers.Contract(addr_storage_contract, abiLotteryStorage, web3Provider);

                contractFactoryRef.current = contractFactory;
                contractStorageRef.current = contractStorage;
                setWeb3Contract('lotteryFactory', contractFactory);
                setWeb3Contract('lotteryStorage', contractStorage);
                return {
                    contractFactory,
                    contractStorage,
                };
            }
            return null;
        };

        const fetchLotteryStatus = async (contracts: any) => {

            if (contracts) {
                const {
                    contractFactory,
                    contractStorage,
                } = contracts;

                const lotteryIsOpened = await isLotteryOpened(contractFactory);
                const pendingTime = await getPendingTime(contractStorage);
                const lotteryDraw = await getNumLottery(contractFactory);
                const lotteryPrice = await getTicketPrice(contractFactory);
                const lotteryLatestsDraws = await getLotteryHistory(contractFactory);

                console.log('lotteryLatestsDraws', lotteryLatestsDraws);
 
                dispatch({ type: 'SET_DRAW', value: lotteryDraw });
                dispatch({ type: 'SET_PRICE', value: lotteryPrice });
                dispatch({type: 'SET_PENDING_TIME', value: pendingTime});
                dispatch({type: 'SET_HISTORY', value: lotteryLatestsDraws});

                if (lotteryIsOpened) {
                    const lotteryBalance = await balance(contractFactory);
                    const rawTicketsForSale = await ticketsForSale(contractStorage);
                    let lotteryTicketsForSale = [...rawTicketsForSale];
                    lotteryTicketsForSale.shift();

                    dispatch({ type: 'SET_BALANCE', value: lotteryBalance });
                    dispatch({ type: 'SET_TICKETS_FOR_SALE', value: lotteryTicketsForSale });
                }

                dispatch({ type: 'SET_LOADING', value: false });
            }
        };

        const initializeContractAndFetchStatus = async () => {
            await initializeProvider();
            const deployedContracts = await deployContract();
            await fetchLotteryStatus(deployedContracts);
        };

        dispatch({ type: 'SET_LOADING', value: true });
        initializeContractAndFetchStatus();
    }, [web3Provider]);

    const collectAwards = async () => {
        console.log('Collect awards method');
    };

    const navigateTo = (where: string) => {
        console.log('navigate method to', where);
    };

    const checkAvailableTicket = (ticketPosition: number): boolean => {
        return !lotteryTicketsForSale[ticketPosition];
    };

    const checkAlreadySelectedTicket = (ticket: string): boolean => {
        return !userSelectedTickets.includes(ticket);
    };

    const selectTicket = (ticket: string, ticketPosition: number) => {
        if (checkAvailableTicket(ticketPosition) && checkAlreadySelectedTicket(ticket)) {
            if (userSelectedTickets.length < 10) {
                let tickets = [...userSelectedTickets];
                tickets.push(ticket);
                tickets.sort((a, b) => a - b);
                dispatch({ type: 'SET_SELECTED_TICKETS', value: tickets });
            } else {
                ToastEventChannel.emit('onSendToast', { type: 'error', message: t('lottery.errorMessageMaxTickets') });
            }
        }

        if (!checkAlreadySelectedTicket(ticket)) {
            let tickets = [...userSelectedTickets];
            tickets.splice(tickets.indexOf(ticket), 1);
            tickets.sort((a, b) => a - b);
            dispatch({ type: 'SET_SELECTED_TICKETS', value: tickets });
        }
    };

    const removeTickets = () => {
        dispatch({ type: 'SET_SELECTED_TICKETS', value: [] });
    };

    const removeTicket = (ticket: string) => {
        let tickets = [...userSelectedTickets];
        tickets.splice(tickets.indexOf(ticket), 1);
        tickets.sort((a, b) => a - b);
        dispatch({ type: 'SET_SELECTED_TICKETS', value: tickets });
    };

    const ticketListByOwner = async () => {
        await web3Provider.send('eth_requestAccounts', []);
        const signer = web3Provider.getSigner();
        const address = await signer.getAddress();
        try {
            const response = await web3Contracts.lotteryStorage.ticketListByOwner(address);
            const formattedResponse = response.map((ticket: any) => ticket.toNumber() - 1);
            dispatch({ type: 'SET_TICKETS_BY_OWNER', value: formattedResponse });
        } catch (error) {
            handleError(error);
        }
    };

    const buyTicket = async (numList: number[]) => {
        dispatch({ type: 'SET_LOADING', value: true });
        await web3Provider.send('eth_requestAccounts', []);
        const signer = web3Provider.getSigner();
        const scWithSigner = web3Contracts.lotteryFactory.connect(signer);

        try {
            let rawTX = await scWithSigner.buyTicketList(numList, { value: numList.length });
            // SEND TX
            ToastEventChannel.emit('onSendToast', { type: 'info', message: t('lottery.infoMessageTransactionSent', { transactionNumber: rawTX.nonce }) });

            const receipt = await rawTX.wait(2);
            // CONFIRMED TX
            const lotteryBalance = await balance(web3Contracts.lotteryFactory);

            await ticketListByOwner();
            const rawTicketsForSale = await ticketsForSale(web3Contracts.lotteryStorage);
            let lotteryTicketsForSale = [...rawTicketsForSale];
            lotteryTicketsForSale.shift();

            dispatch({ type: 'SET_BALANCE', value: lotteryBalance });
            dispatch({ type: 'SET_TICKETS_FOR_SALE', value: lotteryTicketsForSale });

            removeTickets();
            dispatch({ type: 'SET_LOADING', value: false });
            ToastEventChannel.emit('onSendToast', { type: 'success', message: t('lottery.successMessageTransactionConfirmed', { transactionNumber: rawTX.nonce }) });
            // return receipt;     STORE OPERATION RECEIPT??
        } catch (error) {
            handleError(error);
            dispatch({ type: 'SET_LOADING', value: false });
        }
    };

    const buyTickets = () => {
        const ticketsListToBuy = userSelectedTickets.map((num: string) => +num + 1);
        buyTicket(ticketsListToBuy);
    };

    return (
        <>
            {isLoading && <Spinner message={t('common.processing')} />}
            <div className={classes['lottery-wrapper']}>
                <div className={classes['bg-shape']}>
                    <img src={roundShapeBgImg} alt="" />
                </div>

                <section className={classes['actions-section']}>
                    <div className="container">
                        <div className={`${classes.actions} row mb-none-30`}>
                            <div className={classes['collect-wrapper']}>
                                <div className={classes.collect}>
                                    <div className={classes.image}>
                                        <img src={ethereumLogoImg} alt="" />
                                    </div>
                                    <div className={classes.amount}>
                                        <span className={classes.value}>XX</span>
                                        <button onClick={() => collectAwards()}>{t('common.collect')}</button>
                                    </div>
                                </div>
                            </div>
                            <div className={classes['time-wrapper']}>
                                <div className={classes.countdown}>
                                    <div className={classes.image}>
                                        <img src={clockImg} alt="" />
                                    </div>
                                    <div className={classes.time}>
                                        <div className={classes.message}>{t('lottery.getYourTickets')}</div>
                                        {lotteryPendingTime && <Countdown endTime={lotteryPendingTime} />}
                                    </div>
                                </div>
                            </div>
                            <div className={classes.buttons}>
                                <button className={`${classes.jackpot} ${classes.active}`}>{t('lottery.jackpotButtonText')}</button>
                                <button className={classes.info} onClick={() => navigateTo('info')}>
                                    <BsQuestionCircle />
                                </button>
                                <button className={classes.stats} onClick={() => navigateTo('stats')}>
                                    <BsGraphUpArrow />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={classes['lottery-section']}>
                    <div className={classes.content}>
                        <div className={classes.jackpot}>
                            <div className={classes.prizes}>
                                <ContentBox type="special" title={t('lottery.prizePot')} styles={boxStyles} >
                                    <div className={classes['box-wrapper']}>
                                        <div className={classes['box-prize-pot-wrapper']}>
                                            <div className={classes['box-prize-pot']}>
                                                <div className={classes.value}>{lotteryBalance}</div>
                                                <div className={classes['crypto-currency']}>{criptocurrency}</div>
                                            </div>
                                        </div>
                                        <div className={classes['pot-data-wrapper']}>
                                            <div className={classes['pot-data-box']}>
                                                <div className={classes.value}>#{lotteryDraw}</div>
                                                <div className={classes.label}>{t('lottery.draw')}</div>
                                            </div>
                                            <div className={`${classes['pot-data-box']}`}>
                                                <div className={classes.value}>{lotteryPrice}</div>
                                                <div className={classes.label}>
                                                    {criptocurrency} / {t('lottery.ticket')}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </ContentBox>
                            </div>
                            <div className={classes['lottery-numbers-wrapper']}>
                                <div className={classes['lottery-numbers']}>
                                    <ul className={classes.numbers}>
                                        {lotteryNumbers.map((number: string, i: number) => (
                                            <li key={i} className={`${lotteryTicketsForSale[i] ? classes.disabled : ''} ${userSelectedTickets.includes(number) ? classes.selected : ''}`} onClick={() => selectTicket(number, i)}>
                                                {number}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                            <div className={classes.tickets}>
                                <ContentBox title={t('lottery.tickets')} styles={boxStyles} >
                                    <div className={classes['box-wrapper']}>
                                        <div className={classes['tabs-wrapper']}>
                                            <ul className={`nav nav-tabs ${classes.tabs}`} role="tablist">
                                                <TabNavItem title={t('lottery.buyNewTab')} id="buy" activeTab={activeTab} setActiveTab={setActiveTab} />
                                                <TabNavItem title={t('lottery.ticketsTab')} id="bought" activeTab={activeTab} setActiveTab={setActiveTab} onClick={ticketListByOwner} />
                                            </ul>
                                        </div>
                                        <div className={classes['tabs-content']}>
                                            <TabContent id="buy" activeTab={activeTab}>
                                                <div className={classes['tickets-wrapper']}>
                                                    <div className={classes['tickets-list']}>
                                                        {userSelectedTickets.length === 0 && <p>{t('lottery.buyNewTabEmpty')}</p>}
                                                        {userSelectedTickets.map((number: string, i: number) => (
                                                            <div key={i} className={classes.item} onClick={() => removeTicket(number)}>
                                                                {number}
                                                            </div>
                                                        ))}
                                                    </div>
                                                    {userSelectedTickets.length > 0 && <FaTrashAlt onClick={() => removeTickets()} title={t('lottery.removeTicketsButtonText')} />}
                                                </div>
                                            </TabContent>
                                            <TabContent id="bought" activeTab={activeTab}>
                                                <div className={classes['tickets-wrapper']}>
                                                    <div className={classes['tickets-list']}>
                                                        {ticketsListByOwner.length === 0 && <p>{t('lottery.ticketsTabEmpty')}</p>}
                                                        {ticketsListByOwner.map((number: string, i: number) => (
                                                            <div key={i} className={classes.item}>
                                                                {number}
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </TabContent>
                                        </div>
                                        <div className={classes['form-wrapper']}>
                                            <form className={classes.form}>
                                                {activeTab === 'buy' && (
                                                    <button type="button" className={classes.large} disabled={userSelectedTickets.length === 0} onClick={() => buyTickets()}>
                                                        {t('lottery.buyTicketsButtonText')}
                                                    </button>
                                                )}
                                            </form>
                                        </div>
                                    </div>
                                </ContentBox>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={classes['instructions-section']}>
                    <div className={classes.content}>
                        <h3 className={classes.title}>{t('lottery.instructions_title')}</h3>
                        <div className={classes['instructions-wrapper']}>                             
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('lottery.instructions_step')} 1</div>
                                <div className={classes.title}>{t('lottery.instructions_step1_title')}</div>
                                <div className={classes.text}>{t('lottery.instructions_step1_text')}</div>
                            </div>
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('lottery.instructions_step')} 2</div>
                                <div className={classes.title}>{t('lottery.instructions_step2_title')}</div>
                                <div className={classes.text}>{t('lottery.instructions_step2_text')}</div>
                            </div>
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('lottery.instructions_step')} 3</div>
                                <div className={classes.title}>{t('lottery.instructions_step3_title')}</div>
                                <div className={classes.text}>{t('lottery.instructions_step3_text')}</div>
                            </div>
                        </div>
                        <div className={classes['detail-link']}>
                            <a href="https://boletux.gitbook.io/docs/v/espa/gambling-and-betting/lottery" target="_blank" rel="noreferrer">{t('lottery.instructions_details_link')} <RxExternalLink /></a>
                        </div>
                    </div>
                </section>

                <section className={classes['draws-section']}>
                    <div className={classes.content}>
                        <h3 className={classes.title}>{t('lottery.latest_title')}</h3>
                        <div className={classes['table-wrapper']}> 
                            <table>
                                <thead>
                                    <tr>
                                        <th>{t('lottery.drawTableHeader')}</th>
                                        <th>{t('lottery.dateTableHeader')}</th>
                                        <th>{t('lottery.prizePotTableHeader')}</th>
                                        <th>{t('lottery.winnerNumTableHeader')}</th>
                                        <th colSpan={3}>{t('lottery.winnerTableHeader')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                        {lotteryHistory.map((draw: any, i: number) => (
                                            <tr key={i}>
                                                <td data-label={t('lottery.drawTableHeader')}><span><b>#2</b></span></td>
                                                <td data-label={t('lottery.dateTableHeader')}><span>{draw.initDate}</span></td>
                                                <td data-label={t('lottery.prizePotTableHeader')}><span className={classes.prize}>{draw.prize} ETH</span></td>
                                                <td data-label={t('lottery.winnerNumTableHeader')}><span>{draw.winnerNum}</span></td>
                                                <td data-label={t('lottery.winnerTableHeader')} colSpan={3} >
                                                    <div className={classes.address}>
                                                        <span className={classes.wallet}>{draw.winner}</span>
                                                        <span className={classes.copy}><CopyToClipboardButton textToCopy={draw.winner} title={t('common.copyWalletAddress')} /></span>
                                                    </div>   
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Lottery;
