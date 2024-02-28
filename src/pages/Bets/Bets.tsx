import React, { useEffect, useRef, useReducer, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { ethers } from 'ethers';

import Spinner from '../../components/UI/Spinner/Spinner';
import CopyToClipboardButton from '../../components/UI/CopyToClipboardButton/CopyToClipboardButton';

import { BoletuxContext } from '../../store/boletux-context';
import { useEthersErrorHandler } from '../../hooks/useEthersErrorHandler';
import { abiBet } from '../../ethereum/abiBetContract';

import { ToastEventChannel } from '../../components/eventChannels/ToastEventChannel';

import classes from './Bets.module.scss';

import { criptocurrency } from '../../constants';
import { ActionReducerType, betPlaceResultType } from '../..//models/appTypes';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import boxHeaderImg from '../../assets/images/box-wrapper-header.png';
import boxFooterImg from '../../assets/images/box-wrapper-footer.png';
import ethereumLogoImg from '../../assets/images/ethereum-logo.png';
import betStepsImg from '../../assets/images/bet-steps.png';
import { RxExternalLink } from "react-icons/rx";

import { BsArrowLeft, BsArrowRight, BsQuestionCircle, BsGraphUpArrow } from 'react-icons/bs';

const addr_bet_contract = process.env.REACT_APP_BET_CONTRACT || '';

const betOptions = [
    {
        id: 'option1',
        betValue: 0.005,
        betText: '0,005',
    },
    {
        id: 'option2',
        betValue: 0.025,
        betText: '0,025',
    },
    {
        id: 'option3',
        betValue: 0.1,
        betText: '0,1',
    },
    {
        id: 'option4',
        betValue: 0.25,
        betText: '0,25',
    },
];

interface ReducerState {
    isLoading: boolean;
    step: string;
    bet: string;
    evenOdd: string;
    betCompleted: boolean;
    multiplier: string;
    result: any;
    showResult: boolean;
    betLatestsDraws: any[];
}

const initialState = {
    isLoading: false,
    step: 1,
    bet: '',
    evenOdd: '',
    betCompleted: false,
    multiplier: '?',
    result: null,
    showResult: false,
    betLatestsDraws: [],
};

const betsReducer = (state: ReducerState, action: ActionReducerType) => {
    const { type } = action;
    switch (type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.value };
        case 'SET_HISTORY':
            return { ...state, betLatestsDraws: action.value };
        case 'SET_STEP':
            return { ...state, step: action.value };
        case 'SET_BET':
            return { ...state, bet: action.value };
        case 'SET_EVEN_ODD':
            return { ...state, evenOdd: action.value };
        case 'SET_BET_COMPLETED':
            return { ...state, betCompleted: action.value };
        case 'SET_MULTIPLIER':
            return { ...state, multiplier: action.value };
        case 'SET_RESULT':
            return { ...state, result: action.value };
        case 'SET_SHOW_RESULT':
            return { ...state, showResult: action.value };
        case 'RESET':
            return { ...state, ...initialState };
        default:
            return state;
    }
};

const Bets: React.FC = () => {
    const { t } = useTranslation();
    const { web3Provider, setWeb3Provider, web3Contracts, setWeb3Contract } = useContext(BoletuxContext);
    const { handleError, errorMessage } = useEthersErrorHandler();
    const [state, dispatch] = useReducer(betsReducer, initialState);
    const { isLoading, step, bet, evenOdd, betCompleted, multiplier, result, showResult, betLatestsDraws } = state;
    const contractBetRef = useRef<any>();

    const isStepForwardActive: boolean = ((step === 1 && bet) || (step === 2 && evenOdd) ||  (bet && evenOdd && step < 3));

    const getBetHistory = async (sc: any): Promise<any> => {
        try {
            const currentBet = await sc.numBet();

            let i = currentBet - 1;
            let end = i - 9;
            let list = [];

            for (i ; i >= end; i--) {
                if (i >= 0) {
                    let obj = await sc.getHistory(i);
                    list.push(
                        {
                            user:       obj.user,
                            date:       Math.round(parseFloat(ethers.utils.formatEther(obj.date)) * (10 ** 18)),
                            input:      Math.round(parseFloat(ethers.utils.formatEther(obj.input)) * (10 ** 18)),
                            multiplier: Math.round(parseFloat(ethers.utils.formatEther(obj.multiplier)) * (10 ** 18)),
                            prize:      Math.round(parseFloat(ethers.utils.formatEther(obj.prize)) * (10 ** 18)),
                            winner:     obj.winner
                        }
                    )
                }
            }

            console.log('list', list);
            return list;

        } catch(err){
            console.error(err);
            ToastEventChannel.emit('onSendToast', { type: 'error', message: t('bets.errorMessageRecoverHistory') });
        }
    };

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
                const contractBet = new ethers.Contract(addr_bet_contract, abiBet, web3Provider);

                contractBetRef.current = contractBet;
                setWeb3Contract('bet', contractBet);
                return contractBet;
            }
            return null;
        };

        const fetchLotteryStatus = async (contract: any) => {
            if (contract) {
                const betLatestsDraws = await getBetHistory(contract);
 
                dispatch({type: 'SET_HISTORY', value: betLatestsDraws});
                dispatch({ type: 'SET_LOADING', value: false });
            }
        };

        const initializeContractAndFetchStatus = async () => {
            await initializeProvider();
            const deployedContract = await deployContract();
            await fetchLotteryStatus(deployedContract);
        };

        dispatch({ type: 'SET_LOADING', value: true });
        initializeContractAndFetchStatus();
    }, [web3Provider]);

    const changeBet = (event: any) => {
        if (step === 1) {
            dispatch({ type: 'SET_BET', value: event.target.value });
            dispatch({ type: 'SET_STEP', value: 2 });
        }
    };

    const changeEvenOdd = (event: any) => {
        if (step === 2) {
            dispatch({ type: 'SET_EVEN_ODD', value: event.target.value });
            dispatch({ type: 'SET_STEP', value: 3 });  
        }
    };

    const placeBet = async () => {
        dispatch({ type: 'SET_LOADING', value: true });
        await web3Provider.send('eth_requestAccounts', []);
        const signer = web3Provider.getSigner();
        const scWithSigner = web3Contracts.bet.connect(signer);
        const evenOddValue = evenOdd === 'even' ? true : false;
        let response;

        try {
            let rawTX = await scWithSigner.bet(evenOddValue, { value: 1 }); // TODO: Put real bet value
            // SEND TX
            ToastEventChannel.emit('onSendToast', { type: 'info', message: t('successMessages.infoMessageTransactionSent', { transactionNumber: rawTX.nonce }) });
            const receipt = await rawTX.wait(2);

            // CONFIRMED TX
            response = {
                user: receipt.events[0].args.user,
                date: receipt.events[0].args.date,
                input: receipt.events[0].args.input,
                multiplier: receipt.events[0].args.multiplier / 10,
                prize: receipt.events[0].args.prize,
                winner: receipt.events[0].args.winner,
            };
          
            dispatch({ type: 'SET_LOADING', value: false });
            ToastEventChannel.emit('onSendToast', { type: 'success', message: t('successMessages.transactionConfirmed', { transactionNumber: rawTX.nonce }) });
        } catch (error) {
            handleError(error);
            dispatch({ type: 'SET_LOADING', value: false });
        }

        return response;

    };

    const confirmBet = async () => {
        let winnerBet = '';

        if (step === 3) {
            console.log('Place bet', bet, evenOdd);
            dispatch({ type: 'SET_BET_COMPLETED', value: true });
            dispatch({ type: 'SET_LOADING', value: true });

            const response: betPlaceResultType = await placeBet();
            const betLatestsDraws = await getBetHistory(web3Contracts.bet);
 
            let winnerBet = evenOdd === 'even' && response.winner ? t('bets.even') :
                evenOdd === 'odd' && response.winner ? t('bets.odd') :
                evenOdd === 'odd' && !response.winner ? t('bets.even') :
                t('bets.odd');

            const betResult = {
                multiplier: response.multiplier,
                evenOdd: winnerBet,
                isWinner: response.winner,
                winAmount: response.prize,
            };
            console.log('betResult', betResult);

            dispatch({ type: 'SET_MULTIPLIER', value: betResult.multiplier });
            dispatch({ type: 'SET_RESULT', value: betResult });
            dispatch({ type: 'SET_STEP', value: state.step + 1 });
            dispatch({ type: 'SET_HISTORY', value: betLatestsDraws });
            dispatch({ type: 'SET_LOADING', value: false });
        }
    };

    const revealBetResult = () => {
        dispatch({ type: 'SET_SHOW_RESULT', value: true });
    };

    const goStepBack = () => {
        if (step === 2 || step === 3) {
            dispatch({ type: 'SET_STEP', value: state.step - 1 });
        }
    };

    const goStepForward = () => {
        if (isStepForwardActive) {
            dispatch({ type: 'SET_STEP', value: state.step + 1 });
        }
    };

    const collectAwards = () => {
        console.log('Collect awards method');
    };

    const newBet = () => {
        if (showResult) {
            dispatch({ type: 'RESET', value: '' });
        }
    };

    const navigateTo = (where: string) => {
        console.log('navigate method to', where);
    };

    return (
        <>
            {isLoading && <Spinner message={t('common.processing')} />}
            <div className={classes['bets-wrapper']}>
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
                                        <span className={classes.value}>xx</span>
                                        <button onClick={() => collectAwards()}>{t('common.collect')}</button>
                                    </div>
                                </div>
                            </div>
                            <div className={classes['steps-wrapper']}>
                                <div className={classes.steps}>
                                    <img src={betStepsImg} alt="" />
                                    <div className={`${classes['left-arrow']} ${step === 2 || step === 3 ? classes.active : ''}`} onClick={() => goStepBack()} >
                                        <BsArrowLeft />
                                    </div>
                                    <div className={`${classes['right-arrow']} ${isStepForwardActive ? classes.active : ''}`} onClick={() => goStepForward()}>
                                        <BsArrowRight />
                                    </div>
                                </div>
                            </div>
                            <div className={classes.buttons}>
                                <button className={`${classes['new-bet']} ${showResult ? classes.active : ''}`} onClick={() => newBet()}>
                                    {t('bets.newBetButton')}
                                </button>
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

                <section className={classes['bets-section']}>
                    <div className={classes['bets-content']}>
                        <div className={classes['bet-step']}>
                            <div className={`${classes.box} ${step === 1 ? classes['active-step'] : ''} ${step !== 1 ? classes.disabled : ''}`}>
                                <div className={classes.header}>
                                    <img src={boxHeaderImg} alt="" />
                                    <div className={classes['box-title']}>{t('bets.amountHeader')}</div>
                                </div>
                                <div className={classes.content}>
                                    <div className={classes['form-wrapper']}>
                                        <form className={classes.form}>
                                            <ul className={classes['bets-amount']}>
                                                {betOptions.map((elem: any) => (
                                                    <li key={elem.id}>
                                                        <input type="radio" name="bet" value={elem.betValue} id={elem.id} checked={bet === elem.betValue.toString() } onChange={(event) => changeBet(event)} />
                                                        <label htmlFor={elem.id}>
                                                            <div className={classes.number}>{elem.betText}</div>
                                                            <div className={classes.currency}>{criptocurrency}</div>
                                                        </label>
                                                    </li>
                                                ))}
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                                <div className={classes.footer}>
                                    <img src={boxFooterImg} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className={classes['bet-step']}>
                            <div className={`${classes.box} ${step === 2 ? classes['active-step'] : ''} ${step !== 2 ? classes.disabled : ''}`}>
                                <div className={classes.header}>
                                    <img src={boxHeaderImg} alt="" />
                                    <div className={classes['box-title']}>{t('bets.amountHeader')}</div>
                                </div>
                                <div className={classes.content}>
                                    <div className={classes['form-wrapper']}>
                                        <form className={classes.form}>
                                            <ul className={classes['bets-prediction']}>
                                                <li>
                                                    <input type="radio" name="bet" value="even" id="even" checked={evenOdd === 'even'} onChange={(event) => changeEvenOdd(event)} />
                                                    <label htmlFor="even">
                                                        <div className={classes['even-odd-title']}>{t('bets.even')}</div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="bet" value="odd" id="odd" checked={evenOdd === 'odd'} onChange={(event) => changeEvenOdd(event)} />
                                                    <label htmlFor="odd">
                                                        <div className={classes['even-odd-title']}>{t('bets.odd')}</div>
                                                    </label>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </div>
                                <div className={classes.footer}>
                                    <img src={boxFooterImg} alt="" />
                                </div>
                            </div>
                        </div>
                        
                        <div className={classes['bet-step']}>
                            <div className={`${classes.box} ${step === 3 ? classes['active-step'] : ''} ${step === 1 || step === 2 ? classes.disabled : ''}`}>
                                <div className={classes.header}>
                                    <img src={boxHeaderImg} alt="" />
                                    <div className={classes['box-title']}>{t('bets.multiplierHeader')}</div>
                                </div>
                                <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                    <div className={`${classes['box-result']} ${multiplier !== '?' ? classes['show-result-box'] : ''}`}>
                                        {multiplier !== '?' && (<span className={classes.multiplier}>x</span>)}{multiplier}
                                    </div>
                                    {multiplier === '?' && (
                                        <div className={classes['form-wrapper']}>
                                            <form className={`${classes.form} ${classes.flex}`}>
                                                <button type="button" className={classes.large} disabled={bet === '' || evenOdd === ''} onClick={(e) => confirmBet()}>
                                                    {t('bets.confirmButton')}
                                                </button>
                                            </form>
                                        </div>
                                    )}
                                </div>
                                <div className={classes.footer}>
                                    <img src={boxFooterImg} alt="" />
                                </div>
                            </div>
                        </div>
                        
                        <div className={classes['bet-step']}>
                            <div className={`${classes.box} ${step === 4 ? classes['active-step'] : ''} ${step !== 4 ? classes.disabled : ''}`}>
                                <div className={classes.header}>
                                    <img src={boxHeaderImg} alt="" />
                                    <div className={classes['box-title']}>{t('bets.resultHeader')}</div>
                                </div>
                                <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                    {!showResult ? (
                                        <>
                                            <div className={classes['box-result']}>?</div>
                                            <div className={classes['form-wrapper']}>
                                                <form className={`${classes.form} ${classes.flex}`}>
                                                    <button type="button" className={classes.large} disabled={!result} onClick={() => revealBetResult()}>
                                                        {t('bets.revealButton')}
                                                    </button>
                                                </form>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={`${classes['box-result']} ${classes['show-result-box']}`}>
                                                <div className={classes['final-step-wrapper']}>
                                                    <div className={classes['even-odd-value']}>{result.evenOdd}</div>
                                                </div>
                                            </div>
                                            <div className={classes['win-lose-wrapper']}>
                                                <div className={`${classes['win-lose-box']} ${result.isWinner ? classes.active : ''}`}>{t('bets.win')}</div>
                                                <div className={`${classes['win-lose-box']} ${!result.isWinner ? classes.active : ''}`}>{t('bets.lose')}</div>
                                            </div>
                                        </>
                                    )}
                                </div>
                                <div className={classes.footer}>
                                    <img src={boxFooterImg} alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={classes['instructions-section']}>
                    <div className={classes.content}>
                        <h3 className={classes.title}>{t('lottery.instructions_title')}</h3>
                        <div className={classes['instructions-wrapper']}>                             
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('bets.instructions_step')} 1</div>
                                <div className={classes.title}>{t('bets.instructions_step1_title')}</div>
                                <div className={classes.text}>{t('bets.instructions_step1_text')}</div>
                            </div>
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('bets.instructions_step')} 2</div>
                                <div className={classes.title}>{t('bets.instructions_step2_title')}</div>
                                <div className={classes.text}>{t('bets.instructions_step2_text')}</div>
                            </div>
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('bets.instructions_step')} 3</div>
                                <div className={classes.title}>{t('bets.instructions_step3_title')}</div>
                                <div className={classes.text}>{t('bets.instructions_step3_text')}</div>
                            </div>
                        </div>
                        <div className={classes['detail-link']}>
                            <a href="https://boletux.gitbook.io/docs/v/espa/gambling-and-betting/bets" target="_blank" rel="noreferrer">{t('lottery.instructions_details_link')} <RxExternalLink /></a>
                        </div>
                    </div>
                </section>

                <section className={classes['draws-section']}>
                    <div className={classes.content}>
                        <h3 className={classes.title}>{t('bets.latest_title')}</h3>
                        <div className={classes['table-wrapper']}> 
                            <table>
                                <thead>
                                    <tr>
                                        <th>{t('bets.betTableHeader')}</th>
                                        <th>{t('bets.amountTableHeader')}</th>
                                        <th>{t('bets.multiplierTableHeader')}</th>
                                        <th>{t('bets.resultNumTableHeader')}</th>
                                        <th colSpan={3}>{t('bets.winnerTableHeader')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {betLatestsDraws.map((draw: any, i: number) => (
                                        <tr key={i}>
                                            <td data-label={t('bets.betTableHeader')}><span><b>#2</b></span></td>
                                            <td data-label={t('bets.amountTableHeader')}><span>{draw.input} ETH</span></td>
                                            <td data-label={t('bets.multiplierTableHeader')}><span>{draw.multiplier}</span></td>
                                            <td data-label={t('bets.resultNumTableHeader')}><span className={classes.result}>{ draw.winner ? t('bets.win') : t('bets.lose') }</span></td>
                                            <td data-label={t('bets.winnerTableHeader')} colSpan={3} >
                                                <div className={classes.address}>
                                                    <span className={classes.wallet}>{draw.user}</span>
                                                    <span className={classes.copy}>
                                                        <CopyToClipboardButton textToCopy={draw.user} 
                                                            title={t('common.copyWalletAddress')} 
                                                            successMessage={t('successMessages.copyTextToclipboard')} />
                                                    </span>
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

export default Bets;
