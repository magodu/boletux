import React, { useState } from 'react';

import classes from './Lottery.module.scss';

import Countdown from '../../components/app/Countdown/Countdown';
import TabNavItem from '../../components/UI/Tabs/TabNavItem';
import TabContent from '../../components/UI/Tabs/TabContent';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';

import ethereumLogoImg from '../../assets/images/ethereum-logo.png';
import boxHeaderYellowImg from '../../assets/images/box-wrapper-header-yellow.png';
import boxFooterYellowImg from '../../assets/images/box-wrapper-footer-yellow.png';
import boxHeaderImg from '../../assets/images/box-wrapper-header.png';
import boxFooterImg from '../../assets/images/box-wrapper-footer.png';
import clockImg from '../../assets/images/clock.png';
import { FaTrashAlt } from 'react-icons/fa';
import { BsQuestionCircle, BsGraphUpArrow } from 'react-icons/bs';

import { setLotteryDate } from '../../utils';
import { weekDays } from '../../models/appTypes';


const Lottery: React.FC = () => {
    const lotteryNumbers = Array.from({ length: 100 }, (_, index) => String(index).padStart(2, '0'));
    const lotteryDate = setLotteryDate(weekDays.sunday, 21);
    const [activeTab, setActiveTab] = useState('buy');

    const collectAwards = () => {
        console.log('Collect awwards method');
    }

    const navigateTo = (where: string) => {
        console.log('navigate method to', where);
    }

    const buyTickets = () => {
        console.log('Buy Tickets');
    }

    return (
        <div className={classes['lottery-wrapper']}>
            <div className={classes['bg-shape']}>
                <img src={roundShapeBgImg} alt="" />
            </div>
            <div className={`${classes.title} container`}>
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Lottery</h2>
                    </div>
                </div>
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
                                    <span className={classes.value}>56</span>
                                    <button onClick={() => collectAwards()}>Collect</button>
                                </div>
                            </div>
                        </div>
                        <div className={classes['time-wrapper']}>
                            <div className={classes.countdown}>
                                <div className={classes.image}>
                                    <img src={clockImg} alt="" />
                                </div>
                                <div className={classes.time}>
                                    <div className={classes.message}>Get your tickets</div>
                                    <Countdown endtime={lotteryDate} />
                                </div>
                            </div>
                        </div>
                        <div className={classes.buttons}>
                            <button className={`${classes.jackpot} ${classes.active}`}>Jackpot</button>
                            <button className={classes.info} onClick={() => navigateTo('info')}><BsQuestionCircle /></button> 
                            <button className={classes.stats} onClick={() => navigateTo('stats')}><BsGraphUpArrow /></button> 
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes['lottery-section']}>
                <div className={classes.content}>
                    <div className={classes.jackpot}>
                        <div className={classes.prizes}>
                            <div className={`${classes.box} ${classes['box-yellow']}`}>
                                <div className={classes.header}>
                                    <img src={boxHeaderYellowImg} alt="" />
                                    <div className={classes['box-title']}>Prize Pot</div>
                                </div>
                                <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                    <div className={classes['box-prize-pot-wrapper']}>
                                        <div className={classes['box-prize-pot']}>
                                            <div className={classes.value}>1.2</div>
                                            <div className={classes['crypto-currency']}>ETH</div>
                                        </div>
                                    </div>
                                    <div className={classes['pot-data-wrapper']}>
                                        <div className={classes['pot-data-box']}>
                                            <div className={classes.value}>#1</div>
                                            <div className={classes.label}>DRAW</div>
                                        </div>
                                        <div className={`${classes['pot-data-box']}`}>
                                            <div className={classes.value}>0.02</div>
                                            <div className={classes.label}>ETH / TICKET</div>
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.footer}>
                                    <img src={boxFooterYellowImg} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className={classes['lottery-numbers-wrapper']}>
                            <div className={classes['lottery-numbers']}>
                                <ul className={classes.numbers}>
                                    {lotteryNumbers.map((number, i) => (
                                        <li key={i}>{number}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className={classes.tickets}>
                            <div className={classes.box}>
                                <div className={classes.header}>
                                    <img src={boxHeaderImg} alt="" />
                                    <div className={classes['box-title']}>Tickets</div>
                                </div>
                                <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                    <div className={classes['tabs-wrapper']}>
                                        <ul className={`nav nav-tabs ${classes.tabs}`} role="tablist">
                                            <TabNavItem title="Buy new" id="buy" activeTab={activeTab} setActiveTab={setActiveTab} />
                                            <TabNavItem title="Your tickets" id="bought" activeTab={activeTab} setActiveTab={setActiveTab} />
                                        </ul>
                                    </div>
                                    <div className={classes['tabs-content']}>
                                        <TabContent id="buy" activeTab={activeTab}>
                                            <div className={classes['tickets-wrapper']}>
                                                <div className={classes['tickets-list']}>
                                                    <p>Select your tickets in the panel and they will appear here</p>
                                                </div>
                                            </div>
                                        </TabContent>
                                        <TabContent id="bought" activeTab={activeTab}>
                                            <div className={classes['tickets-wrapper']}>
                                                <div className={classes['tickets-list']}>
                                                    {/* <p>Your bougth tickets will appear here</p> */}
                                                    <div className={classes.item}>22</div>
                                                    <div className={classes.item}>31</div>
                                                    <div className={classes.item}>32</div>
                                                    <div className={classes.item}>23</div>
                                                    <div className={classes.item}>28</div>
                                                    <div className={classes.item}>88</div>
                                                    <div className={classes.item}>89</div>
                                                    <div className={classes.item}>90</div>
                                                </div>
                                            </div>
                                        </TabContent>
                                    </div>
                                    <div className={classes['form-wrapper']}>
                                        <form className={classes.form}>
                                            {activeTab === 'buy' && (<button type="button" className={classes.large} disabled={false} onClick={() => buyTickets()}>
                                                    Buy Tickets
                                                </button>
                                            )}
                                        </form>
                                    </div>
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

export default Lottery;
