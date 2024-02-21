import React, { useReducer } from 'react';
import { useTranslation } from 'react-i18next';

import Spinner from '../../components/UI/Spinner/Spinner';

import classes from './Bets.module.scss';

import { criptocurrency } from '../../constants';
import { ActionReducerType } from '../..//models/appTypes';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import boxHeaderImg from '../../assets/images/box-wrapper-header.png';
import boxFooterImg from '../../assets/images/box-wrapper-footer.png';
import ethereumLogoImg from '../../assets/images/ethereum-logo.png';
import betStepsImg from '../../assets/images/bet-steps.png';
import { RxExternalLink } from "react-icons/rx";

import { BsArrowLeft, BsArrowRight, BsQuestionCircle, BsGraphUpArrow } from 'react-icons/bs';

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
};

const betsReducer = (state: ReducerState, action: ActionReducerType) => {
    const { type } = action;
    switch (type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.value };
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
    const [state, dispatch] = useReducer(betsReducer, initialState);
    const { isLoading, step, bet, evenOdd, betCompleted, multiplier, result, showResult } = state;

    const isStepForwardActive: boolean = ((step === 1 && bet) || (step === 2 && evenOdd) ||  (bet && evenOdd && step < 3));

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

    const confirmBet = () => {
        if (step === 3) {
            console.log('Place bet', bet, evenOdd);
            dispatch({ type: 'SET_BET_COMPLETED', value: true });
            dispatch({ type: 'SET_LOADING', value: true });
            // Connect to metamask or check if is connected
            // Check result and then
            const result = 'odd';
            const mockResult = {
                multiplier: '3',
                evenOdd: t(`bets.${result}`),
                isWinner: true,
                winAmount: 12,
            };

            setTimeout(() => {
                dispatch({ type: 'SET_MULTIPLIER', value: mockResult.multiplier });  
                dispatch({ type: 'SET_RESULT', value: mockResult });  
                dispatch({ type: 'SET_STEP', value: state.step + 1 });  
                dispatch({ type: 'SET_LOADING', value: false });
            }, 1000);
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
                            <div className={`${classes.box} ${step === 3 ? classes['active-step'] : ''} ${step !== 3 ? classes.disabled : ''}`}>
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
                                    <tr>
                                        <td data-label={t('bets.betTableHeader')}><span><b>#2</b></span></td>
                                        <td data-label={t('bets.amountTableHeader')}><span>0.1 ETH</span></td>
                                        <td data-label={t('bets.multiplierTableHeader')}><span>2</span></td>
                                        <td data-label={t('bets.resultNumTableHeader')}><span className={classes.result}>LOSE</span></td>
                                        <td data-label={t('bets.winnerTableHeader')} colSpan={3}><span className={classes.address}>0xed2cR9DR9DRYRe5R9DR9DjR9D607d</span></td>
                                    </tr>
                                    <tr>
                                        <td data-label={t('bets.betTableHeader')}><span><b>#1</b></span></td>
                                        <td data-label={t('bets.amountTableHeader')}><span>0.1 ETH</span></td>
                                        <td data-label={t('bets.multiplierTableHeader')}><span>1.5</span></td>
                                        <td data-label={t('bets.resultNumTableHeader')}><span className={classes.result}>WIN</span></td>
                                        <td data-label={t('bets.winnerTableHeader')} colSpan={3}><span className={classes.address}>0xed2cR9DR9DR9DR9R9DR9DR9D607d</span></td>
                                    </tr>
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
