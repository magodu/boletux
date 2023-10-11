import React from 'react';

import classes from './Vault.module.scss';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';

import { RiVipDiamondLine } from 'react-icons/ri';
import { LuCopyCheck } from 'react-icons/lu';

const Vault: React.FC = () => {
    return (
        <div className={classes['vault-wrapper']}>
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

            <section className={classes['vault-section']}>
                <div className={classes.content}>
                    <div className="row">
                        <div className="col-lg-5">
                            <div className={classes.vault}>
                                <p className="mb-2">Max capacity: 200 BTX</p>
                                <div className={classes.progressbar} data-perc="70%">
                                    <div className={classes.bar} style={{ width: '70%' }}></div>
                                </div>
                                <p className={classes['remaining-capacity']}>Only 123 remaining!</p>
                                <hr />
                                <div className={classes['vault-data']}>
                                    <div className={`${classes.data} ${classes.apr}`}>
                                        <div className={classes.label}>APR</div>
                                        <div className={classes.value}>21,35%</div>
                                    </div>
                                    <div className={classes.data}>
                                        <div className={classes.label}>Index Price</div>
                                        <div className={classes.value}>1 uBTX = 0.95 BNB</div>
                                    </div>
                                    <div className={classes.data}>
                                        <div className={classes.label}>Total Staked</div>
                                        <div className={classes.value}>174 uBTX</div>
                                    </div>
                                    <div className={classes.data}>
                                        <div className={classes.label}>Lockup Period</div>
                                        <div className={classes.value}>1 day</div>
                                    </div>
                                </div>
                                <hr />
                                <div className={classes['user-data']}>
                                    <div className={classes.data}>
                                        <div className={classes.label}>Your Staking</div>
                                        <div className={classes.value}>4.34 uBTX (4.10 BNB)</div>
                                    </div>
                                    <div className={classes.data}>
                                        <div className={classes.label}>Your Rewards</div>
                                        <div className={classes.value}>0.04 BNB</div>
                                    </div>
                                </div>
                                <hr />
                                <div className={classes.buttons}>
                                        <button  className={classes['action-btn']} type="button" role="tab" >
                                            Add Fund
                                        </button>
                                  
                                        <button  className={classes['action-btn']} type="button" role="tab" >
                                            Withdraw Funds
                                        </button>
                                   
                                   
                                        <button  className={classes['action-btn']} type="button" role="tab" >
                                            Claim Rewards
                                        </button>
                                    
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className={classes.wrapper}>
                                <div className={classes.description}>
                                    <div className={classes.product}>BNB Vault</div>
                                    <div className={classes.text}>Winning bets will be paid with BNB deposited into the Vault and losing bets will be deposited into the Vault. All investors who deposit liquidity will receive BTX tokens based on the price of the index. The BTX tokens will automatically staked and the investor will start receiving the rewards:</div>
                                </div>
                                <div className={classes.rewards}>
                                    <div className={classes['reward-item']}>
                                        <div className={classes['item-thumb']}><RiVipDiamondLine /></div>
                                        <div className={classes['item-content']} >
                                            <div className={classes.percentage}>1.5%</div>
                                            <div className={classes.text}>BNB Bets</div>
                                        </div>
                                    </div>
                                    <div className={classes['reward-item']}>
                                        <div className={classes['item-thumb']}><LuCopyCheck /></div>
                                        <div className={classes['item-content']} >
                                            <div className={classes.percentage}>3%</div>
                                            <div className={classes.text}>Real Yield NFTs</div>
                                        </div>
                                    </div>
                                    <div className={classes['reward-item']}>
                                        <div className={classes['item-thumb']}><LuCopyCheck /></div>
                                        <div className={classes['item-content']} >
                                            <div className={classes.percentage}>3%</div>
                                            <div className={classes.text}>Tickets Lottery</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Vault;
