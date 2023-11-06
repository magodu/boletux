import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import classes from './Bets.module.scss';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import boxHeaderImg from '../../assets/images/box-wrapper-header.png';
import boxFooterImg from '../../assets/images/box-wrapper-footer.png';

import { BsGraphUpArrow } from 'react-icons/bs';
import { IoIosHelpCircleOutline } from 'react-icons/io';

const Bets: React.FC = () => {
    const { t } = useTranslation();
    const [step, setStep] = useState<number>(1);
    const [bet, setBet] = useState<string>('');
    const [evenOdd, setEvenOdd] = useState<string>('');
    const [betCompleted, setBetCompleted] = useState<boolean>(false);
    const [multiplier, setMultiplier] = useState<string>('?');
    const [claimCompleted, setClaimCompleted] = useState<boolean>(false);
    const [result, setResult] = useState<any>(null);
    const [showResult, setShowResult] = useState<boolean>(false);


    const changeBet = (event: any) => {
        if (step === 1) {
            setBet(event.target.value);
            setStep(2);
        }
    };

    const changeEvenOdd = (event: any) => {
        if (step === 2) {
            setEvenOdd(event.target.value);
            setStep(3);
        }
    };

    const confirmBet = () => {
        if (step === 3) {
            console.log('Place bet', bet, evenOdd);
            setBetCompleted(true);
            // Connect to metamask or check if is connected
            // Check result and then
            const mockResult = {
                multiplier: '3',
                evenOdd: 'even',
                evenOddValue: '4',
                isWinner: true,
                winAmount: 12,
            };

            setTimeout(() => {
                setMultiplier(mockResult.multiplier);
                setResult(mockResult);
                setStep((prevStep) => prevStep + 1);
            }, 1000);
        }
    };

    const revealBetResult = () => {
        setShowResult(true);

    }

    return (
        <div className={classes['bets-wrapper']}>
            <div className={classes['bg-shape']}>
                <img src={roundShapeBgImg} alt="" />
            </div>
            <div className={`${classes.title} container`}>
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Bets</h2>
                    </div>
                </div>
            </div>
            {/* <section className={classes['description-section']}>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className={classes.description}>
                                    <div className={classes.text}>
                                        All bets are placed on the blockchain, there are no algorithms, it just depends on the price of Bitcoin. Two chances to bet (Even or Odd), with a 50% guaranteed probability. Get up to x10!
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section> */}
            <section className={classes['steps-section']}>
                <div className="container">
                    <div className="row mb-none-30">
                        <div className="col-lg-3 mb-30">
                            <div className={`${classes.box} ${step === 1 ? classes['active-step'] : ''} ${step !== 1 ? classes.disabled : ''}`}>
                                <div className={classes.header}>
                                    <img src={boxHeaderImg} alt="" />
                                    <div className={classes['box-title']}>Amount</div>
                                </div>
                                <div className={classes.content}>
                                    <div className={classes['form-wrapper']}>
                                        <form className={classes.form}>
                                            <ul className={classes['bets-amount']}>
                                                <li>
                                                    <input type="radio" name="bet" value="0.25" id="option1" checked={bet === '0.25'} onChange={(event) => changeBet(event)} />
                                                    <label htmlFor="option1">
                                                        <div className={classes.number}>0,25</div>
                                                        <div className={classes.currency}>ETH</div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="bet" value="0.5" id="option2" checked={bet === '0.5'} onChange={(event) => changeBet(event)} />
                                                    <label htmlFor="option2">
                                                        <div className={classes.number}>0,5</div>
                                                        <div className={classes.currency}>ETH</div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="bet" value="0.75" id="option3" checked={bet === '0.75'} onChange={(event) => changeBet(event)} />
                                                    <label htmlFor="option3">
                                                        <div className={classes.number}>0,75</div>
                                                        <div className={classes.currency}>ETH</div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="bet" value="1" id="option4" checked={bet === '1'} onChange={(event) => changeBet(event)} />
                                                    <label htmlFor="option4">
                                                        <div className={classes.number}>1</div>
                                                        <div className={classes.currency}>ETH</div>
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
                        <div className="col-lg-3 mb-30">
                            <div className={`${classes.box} ${step === 2 ? classes['active-step'] : ''} ${step !== 2 ? classes.disabled : ''}`}>
                                <div className={classes.header}>
                                    <img src={boxHeaderImg} alt="" />
                                    <div className={classes['box-title']}>Prediction</div>
                                </div>
                                <div className={classes.content}>
                                    <div className={classes['form-wrapper']}>
                                        <form className={classes.form}>
                                            <ul className={classes['bets-prediction']}>
                                                <li>
                                                    <input type="radio" name="bet" value="even" id="even" checked={evenOdd === 'even'} onChange={(event) => changeEvenOdd(event)} />
                                                    <label htmlFor="even">
                                                        <div className={classes['even-odd-title']}>Even</div>
                                                        <div className={classes.balls}>
                                                            <div className={classes.ball}>0</div>
                                                            <div className={classes.ball}>2</div>
                                                            <div className={classes.ball}>4</div>
                                                            <div className={classes.ball}>6</div>
                                                            <div className={classes.ball}>8</div>
                                                        </div>
                                                    </label>
                                                </li>
                                                <li>
                                                    <input type="radio" name="bet" value="odd" id="odd" checked={evenOdd === 'odd'} onChange={(event) => changeEvenOdd(event)} />
                                                    <label htmlFor="odd">
                                                        <div className={classes['even-odd-title']}>Odd</div>
                                                        <div className={classes.balls}>
                                                            <div className={classes.ball}>1</div>
                                                            <div className={classes.ball}>3</div>
                                                            <div className={classes.ball}>5</div>
                                                            <div className={classes.ball}>7</div>
                                                            <div className={classes.ball}>9</div>
                                                        </div>
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
                        <div className="col-lg-3 mb-30">
                            <div className={`${classes.box} ${step === 3 ? classes['active-step'] : ''} ${step !== 3 ? classes.disabled : ''}`}>
                                <div className={classes.header}>
                                    <img src={boxHeaderImg} alt="" />
                                    <div className={classes['box-title']}>Multiplier</div>
                                </div>
                                <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                    <div className={`${classes['box-result']} ${multiplier !== '?' ? classes['show-result-box'] : ''}`}>{multiplier}</div>
                                    {multiplier === '?' && (<div className={classes['form-wrapper']}>
                                            <form className={`${classes.form} ${classes.flex}`}>
                                                <button type="button" className={classes.large} disabled={bet === '' || evenOdd === ''} onClick={(e) => confirmBet()}>
                                                    Confirm & Spin
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
                        <div className="col-lg-3 mb-30">
                            <div className={`${classes.box} ${step === 4 ? classes['active-step'] : ''} ${step !== 4 ? classes.disabled : ''}`}>
                                <div className={classes.header}>
                                    <img src={boxHeaderImg} alt="" />
                                    <div className={classes['box-title']}>result</div>
                                </div>
                                <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                    {!showResult ? ( 
                                        <>
                                            <div className={classes['box-result']}>?</div>
                                            <div className={classes['form-wrapper']}>
                                                <form className={`${classes.form} ${classes.flex}`}>
                                                    <button type="button" className={classes.large} disabled={!result} onClick={() => revealBetResult()}>  
                                                        Reveal
                                                    </button>
                                                </form>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className={`${classes['box-result']} ${classes['show-result-box']}`}>
                                                <div className={classes['final-step-wrapper']}>
                                                    <div className={classes['even-odd-value']}>{result.evenOdd}</div>
                                                    <div className={classes.value}>{result.evenOddValue}</div>
                                                </div>
                                            </div>
                                            <div className={classes['win-lose-wrapper']}>
                                                <div className={`${classes['win-lose-box']} ${result.isWinner ? classes.active : ''}`}>Win</div>
                                                <div className={`${classes['win-lose-box']} ${!result.isWinner ? classes.active : ''}`}>Lose</div>
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
                </div>
            </section>
        </div>
    );
};

export default Bets;
