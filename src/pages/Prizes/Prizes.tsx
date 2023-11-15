import React, { useState } from 'react';

import Countdown from '../../components/app/Countdown/Countdown';
import TabNavItem from '../../components/UI/Tabs/TabNavItem';
import TabContent from '../../components/UI/Tabs/TabContent';

import classes from './Prizes.module.scss';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import ethereumLogoImg from '../../assets/images/ethereum-logo.png';
import boxHeaderYellowImg from '../../assets/images/box-wrapper-header-yellow.png';
import boxFooterYellowImg from '../../assets/images/box-wrapper-footer-yellow.png';
import boxHeaderImg from '../../assets/images/box-wrapper-header.png';
import boxFooterImg from '../../assets/images/box-wrapper-footer.png';

import { BsQuestionCircle, BsGraphUpArrow } from 'react-icons/bs';

const Prizes: React.FC = () => {
    const [activeTab, setActiveTab] = useState('prize');

    const collectAwards = () => {
        console.log('Collect awards method');
    };

    const navigateTo = (where: string) => {
        console.log('navigate method to', where);
    };

    return (
        <div className={classes['prizes-wrapper']}>
            <div className={classes['bg-shape']}>
                <img src={roundShapeBgImg} alt="" />
            </div>
            <div className={`${classes.title} container`}>
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Invest against gamblers</h2>
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
                        <div className={classes.buttons}>
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

            <section className={classes['prizes-section']}>
                <div className={classes['prizes-content']}>
                    <div className={classes.incentives}>
                        <div className={`${classes.box} ${classes['box-yellow']}`}>
                            <div className={classes.header}>
                                <img src={boxHeaderYellowImg} alt="" />
                                <div className={classes['box-title']}>Incentives program</div>
                            </div>
                            <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                <div className={classes['box-value-wrapper']}>
                                        <div className={classes['box-value']}>
                                            <div className={classes.value}>1.2</div>
                                            <div className={classes['crypto-currency']}>ETH</div>
                                        </div>
                                </div>
                                <div className={classes['box-info']}> 
                                    <div className={classes['data-wrapper']}>
                                        <div className={classes.value}>Epochs 1-4</div>
                                        <div className={classes.label}>Early Investors</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.footer}>
                                <img src={boxFooterYellowImg} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.rewards}>
                        <div className={`${classes.box} ${classes['box-yellow']}`}>
                            <div className={classes.header}>
                                <img src={boxHeaderYellowImg} alt="" />
                                <div className={classes['box-title']}>Weekly rewards</div>
                            </div>
                            <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                <div className={classes['box-value-wrapper']}>
                                        <div className={classes['box-value']}>
                                            <div className={classes.value}>1.45</div>
                                            <div className={classes['crypto-currency']}>ETH</div>
                                        </div>
                                </div>
                                <div className={classes['box-info']}> 
                                    <div className={classes['data-wrapper']}>
                                        <div className={classes.value}>5d 04:03:52</div>
                                        <div className={classes.label}>Incentive #1</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.footer}>
                                <img src={boxFooterYellowImg} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.jackpot}>
                        <div className={classes.box}>
                            <div className={classes.header}>
                                <img src={boxHeaderImg} alt="" />
                                <div className={classes['box-title']}>Lottery jackpot</div>
                            </div>
                            <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                <div className={classes['tabs-wrapper']}>
                                    <ul className={`nav nav-tabs ${classes.tabs}`} role="tablist">
                                        <TabNavItem title="Prize pot" id="prize" activeTab={activeTab} setActiveTab={setActiveTab} />
                                        <TabNavItem title="Your tickets" id="tickets" activeTab={activeTab} setActiveTab={setActiveTab} />
                                    </ul>
                                </div>
                                <div className={classes['tabs-content']}>
                                    <TabContent id="prize" activeTab={activeTab}>
                                        <div className={classes['prize-pot-wrapper']}>
                                            <div className={classes['box-value']}>
                                                <div className={classes.value}>2.25</div>
                                                <div className={classes['crypto-currency']}>ETH</div>
                                            </div>
                                        </div>
                                    </TabContent>
                                    <TabContent id="tickets" activeTab={activeTab}>
                                        <div className={classes['tickets-wrapper']}>
                                            <div className={classes['tickets-list']}>
                                                {/* <p>Your bougth tickets will appear here</p> */}
                                                <div className={classes.item}>22</div>
                                                <div className={classes.item}>31</div>
                                                <div className={classes.item}>32</div>
                                                <div className={classes.item}>23</div>
                                            </div>
                                        </div>
                                    </TabContent>
                                </div>
                                <div className={classes['box-info']}> 
                                    <div className={classes['data-wrapper']}>
                                        <div className={classes.value}>5d 04:03:52</div>
                                        <div className={classes.label}>Incentive #1</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.footer}>
                                <img src={boxFooterImg} alt="" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Prizes;
