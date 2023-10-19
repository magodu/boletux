import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import ModalWrapper from '../../components/UI/ModalWrapper/ModalWrapper';
import BetsModal from '../../components/app/BetsModal/BetsModal';

import classes from './Bets.module.scss';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';

const Bets: React.FC = () => {
    const [bet, setBet] = useState('');
    const [evenOdd, setEvenOdd] = useState('');
    const [reward, setReward] = useState('');
    const [modalIsShown, setModalIsShown] = useState<boolean>(false);
    const { t } = useTranslation();

    const changeBet = (event: any) => {
        console.log(event.target.value);
        setBet(event.target.value);
    };

    const changeEvenOdd = (event: any) => {
        console.log(event.target.value);
        setEvenOdd(event.target.value);
    };

    const hideModalHandler = () => {
        setModalIsShown(false);
    };

    const acceptBet = (result: any) => {
        console.log("Accept bet and close", result);
        hideModalHandler();
    };

    const showModalBetRoutine = () => {
        console.log('Place bet', bet, evenOdd);
        setModalIsShown(true);
    };
    

    return (
        <>
            {modalIsShown && (
                <ModalWrapper modalTitle="" showAcceptButton={true} onClose={hideModalHandler}>
                    <BetsModal data={{ userId: '' }} onFinish={(result) => acceptBet(result)} />
                </ModalWrapper>
            )}
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
                                <div className={classes.globe}>
                                    <div className={classes.order}>Step 1</div>
                                    <div className={classes.content}>
                                        <div className={classes['content-title']}>Choose BNB amount</div>
                                        <div className={classes.description}>The maximun allowed bet amount is 5 BNB (no minimum limits). You need to have the BNB in your wallet (Bet amount and gas).</div>
                                        <div className={classes['form-wrapper']}>
                                            <form className={classes.form}>
                                                <ul>
                                                    <li>
                                                        <input type="radio" name="bet" value="0.25" id="option1" checked={bet === '0.25'} onChange={(event) => changeBet(event)} />
                                                        <label htmlFor="option1">0,25 ETH</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" name="bet" value="0.5" id="option2" checked={bet === '0.5'} onChange={(event) => changeBet(event)} />
                                                        <label htmlFor="option2">0,5 ETH</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" name="bet" value="0.75" id="option3" checked={bet === '0.75'} onChange={(event) => changeBet(event)} />
                                                        <label htmlFor="option3">0,75 ETH</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" name="bet" value="1" id="option4" checked={bet === '1'} onChange={(event) => changeBet(event)} />
                                                        <label htmlFor="option4">1 ETH</label>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 mb-30">
                                <div className={classes.globe}>
                                    <div className={classes.order}>Step 2</div>
                                    <div className={classes.content}>
                                        <div className={classes['content-title']}>Choose 'Even' or 'Odd'</div>
                                        <div className={classes.description}>Confirm your bet with a 50% real chance of winning. If you win, you will double the BNB amount of the bet.</div>
                                        <div className={classes['form-wrapper']}>
                                            <form className={`${classes.form} ${classes.flex}`}>
                                                <ul>
                                                    <li>
                                                        <input type="radio" name="evenOdd" value="even" id="even" checked={evenOdd === 'even'} onChange={(event) => changeEvenOdd(event)} />
                                                        <label htmlFor="even">Even</label>
                                                    </li>
                                                    <li>
                                                        <input type="radio" name="evenOdd" value="odd" id="odd" checked={evenOdd === 'odd'} onChange={(event) => changeEvenOdd(event)} />
                                                        <label htmlFor="odd">Odd</label>
                                                    </li>
                                                </ul>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 mb-30">
                                <div className={classes.globe}>
                                    <div className={classes.order}>Step 3</div>
                                    <div className={classes.content}>
                                        <div className={classes['content-title']}>Spin and multiply your prize</div>
                                        <div className={classes.description}>Spin the wheel and get your prize multiplier. Confirm the bet and sign the transaction with your wallet.</div>
                                        <div className={classes['form-wrapper']}>
                                            <form className={`${classes.form} ${classes.flex}`}>
                                                <button type="button" className={classes.large} disabled={bet === '' || evenOdd === ''} onClick={(e) => showModalBetRoutine()}>
                                                    Confirm & Spin
                                                </button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-3 mb-30">
                                <div className={classes.globe}>
                                    <div className={classes.order}>Step 4</div>
                                    <div className={classes.content}>
                                        <div className={classes['content-title']}>Claim your rewards</div>
                                        <div className={classes.description}>Claim BNB rewards from your winning bets. You will receive your prizes instantly after your bets.</div>
                                        <div className={classes['form-wrapper']}>
                                            <div className={`${classes.form} ${classes.flex}`}>
                                                <input type="number" name="prize" placeholder="0.0" readOnly={true} value={reward} />
                                                <button type="button" disabled={!reward} >Claim</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default Bets;
