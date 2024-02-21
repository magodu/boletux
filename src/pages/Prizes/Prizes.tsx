import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Countdown from '../../components/app/Countdown/Countdown';
import TabNavItem from '../../components/UI/Tabs/TabNavItem';
import TabContent from '../../components/UI/Tabs/TabContent';
import ContentBox from '../../components/UI/ContentBox/ContentBox';

import classes from './Prizes.module.scss';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import ethereumLogoImg from '../../assets/images/ethereum-logo.png';
import { BsQuestionCircle, BsGraphUpArrow } from 'react-icons/bs';
import { RxExternalLink } from "react-icons/rx";

import { setLotteryDate } from '../../utils';
import { weekDays } from '../../models/appTypes';

const boxStyles = {
    box: { width: '260px' },
    'box-title': { fontSize: '20px' }
};

const Prizes: React.FC = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('prize');
    const weeklyRewardsCountdown = setLotteryDate(weekDays.sunday, 21);
    const lotteryCountdown = setLotteryDate(weekDays.sunday, 21);

    const countdownStyles = {
        color: '#FFFFFF',
        height: "40px",
        fontSize: "24px",
        fontWeight: "600",
        paddingTop: "0",
    };

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
                        <ContentBox type="special" title={t('prizes.airdrop_boxTitle')} styles={boxStyles} >
                            <div className={classes['box-wrapper']}>
                                <div className={classes['box-value-wrapper']}>
                                        <div className={classes['box-value']}>
                                            <div className={classes.value}>1.2</div>
                                            <div className={classes['crypto-currency']}>{t('prizes.points')}</div>
                                        </div>
                                </div>
                                <div className={classes['box-info']}> 
                                    <div className={classes['data-wrapper']}>
                                        <div className={classes.value}>{t('prizes.epochs')} 1-4</div>
                                        <div className={classes.label}>{t('prizes.earlyInvestors')}</div>
                                    </div>
                                </div>
                            </div>
                        </ContentBox>
                    </div>
                    <div className={classes.rewards}>
                        <ContentBox type="special" title={t('prizes.weeklyRewards_boxTitle')} styles={boxStyles} >
                            <div className={classes['box-wrapper']}>
                                <div className={classes['box-value-wrapper']}>
                                        <div className={classes['box-value']}>
                                            <div className={classes.value}>1.45</div>
                                            <div className={classes['crypto-currency']}>ETH</div>
                                        </div>
                                </div>
                                <div className={classes['box-info']}> 
                                    <div className={classes['data-wrapper']}>
                                        <div className={classes.value}>
                                            <Countdown endtime={weeklyRewardsCountdown} style={countdownStyles} />
                                        </div>
                                        <div className={classes.label}>{t('prizes.incentive')} #1</div>
                                    </div>
                                </div>
                            </div>
                        </ContentBox>
                    </div>
                    <div className={classes.jackpot}>
                        <ContentBox title={t('prizes.lottery_boxTitle')} styles={boxStyles} >
                            <div className={classes['box-wrapper']}>
                            <div className={classes['tabs-wrapper']}>
                                    <ul className={`nav nav-tabs ${classes.tabs}`} role="tablist">
                                        <TabNavItem title={t('prizes.prize_tab')} id="prize" activeTab={activeTab} setActiveTab={setActiveTab} />
                                        <TabNavItem title={t('prizes.tickets_tab')} id="tickets" activeTab={activeTab} setActiveTab={setActiveTab} />
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
                                                {/* <p>{t('prizes.tickets_placeholder')}</p> */}
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
                                        <div className={classes.value}>
                                            <Countdown endtime={lotteryCountdown} style={countdownStyles} />
                                        </div>
                                        <div className={classes.label}>{t('prizes.draw')} #7</div>
                                    </div>
                                </div>
                            </div>
                        </ContentBox>
                    </div>
                </div>
            </section>

            <section className={classes['instructions-section']}>
                <div className={classes.content}>
                    <h3 className={classes.title}>{t('prizes.instructions_title')}</h3>
                    <div className={classes['instructions-wrapper']}>                             
                        <div className={classes.box}>
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('prizes.instructions_airdrop_step')}</div>
                                <div className={classes.title}>{t('prizes.instructions_airdrop_title')}</div>
                                <div className={classes.text}>{t('prizes.instructions_airdrop_text')}</div>
                            </div>
                            <div className={classes['links-wrapper']}>
                                <div className={classes.link}><a href="#">{t('prizes.instructions_leaderboard_link')} <RxExternalLink /></a></div>
                                <div className={classes.link}><a href="https://boletux.gitbook.io/docs/v/espa/prizes/airdrop-points" target="_blank" rel="noreferrer">{t('prizes.instructions_details_link')} <RxExternalLink /></a></div>
                            </div>
                        </div>
                        <div className={classes.box}>
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('prizes.instructions_weeklyRewards_step')}</div>
                                <div className={classes.title}>{t('prizes.instructions_weeklyRewards_title')}</div>
                                <div className={classes.text}>{t('prizes.instructions_weeklyRewards_text')}</div>
                            </div>
                            <div className={classes['links-wrapper']}>
                                <div className={classes.link}><a href="#">{t('prizes.instructions_leaderboard_link')} <RxExternalLink /></a></div>
                                <div className={classes.link}><a href="https://boletux.gitbook.io/docs/v/espa/prizes/recompensas-semanales" target="_blank" rel="noreferrer">{t('prizes.instructions_details_link')} <RxExternalLink /></a></div>
                            </div>
                        </div>
                        <div className={classes.box}>
                            <div className={classes['instructions-box']}>
                                <div className={classes.step}>{t('prizes.instructions_jackpot_step')}</div>
                                <div className={classes.title}>{t('prizes.instructions_jackpot_title')}</div>
                                <div className={classes.text}>{t('prizes.instructions_jackpot_text')}</div>
                            </div>
                            <div className={classes['links-wrapper']}>
                                <div className={classes.link}><a href="#">{t('prizes.instructions_leaderboard_link')} <RxExternalLink /></a></div>
                                <div className={classes.link}><a href="https://boletux.gitbook.io/docs/v/espa/prizes/lottery-jackpot" target="_blank" rel="noreferrer">{t('prizes.instructions_details_link')} <RxExternalLink /></a></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>

        </div>
    );
};

export default Prizes;
