import React from 'react';

import classes from './Prizes.module.scss';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import goldCoinsLogoImg from '../../assets/images/gold-coin-stacks-logo.png';
import goldCoinsImg from '../../assets/images/gold-coin-stacks.png';

const Prizes: React.FC = () => {
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

            <section className={classes['claimable-section']}>
                <div className={classes.content}>
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={classes.claim}>
                                <p className={classes.title}>Airdrop 1</p>
                                <div className={classes.rewards}>
                                    <div className={classes.label}>Your rewards:</div>
                                    <div className={classes.value}>0 BNB</div>
                                </div>
                                <div className={classes['claim-btn']}>
                                    <button className={classes['action-btn']} type="button" role="tab">
                                        Claim
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={classes.claim}>
                                <p className={classes.title}>Bets amount</p>
                                <div className={classes.rewards}>
                                    <div className={classes.label}>Bets amount:</div>
                                    <div className={classes.value}>0 BNB</div>
                                </div>
                                <div className={classes['claim-btn']}>
                                    <button className={classes['action-btn']} type="button" role="tab">
                                        Claim
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes['airdrop-section']}>
                <div className={classes.content}>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className={classes.prizes}>
                                <div className={classes['coins-img']}>
                                    <img src={goldCoinsLogoImg} alt="Gold coins decoration" />
                                </div>
                                <div className={classes['total-rewards']}>
                                    <div className={classes.label}>Total rewards:</div>
                                    <div className={classes.value}>5.3 BNB</div>
                                </div>
                                <div className={classes['claim-rewards']}>
                                    <div className={classes.label}>Claim rewards:</div>
                                    <div className={classes.value}>Epoch 4</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className={classes.stats}>
                                <div className={classes.title}>
                                    <h2>Airdrop 1</h2>
                                </div>
                                <div className={classes.winners}>
                                    <div className={classes.item}>
                                        <div className={classes.address}>Early players who place a bet in epoch 3</div>
                                        <div className={classes.amount}>30%</div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>Early BNB Vault Investors during Epoch 2</div>
                                        <div className={classes.amount}>25%</div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>Early investors in NFTs during Epoch 2</div>
                                        <div className={classes.amount}>20%</div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>Early players who buy lottery tickets in Epoch 2</div>
                                        <div className={classes.amount}>15%</div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>Early members in the Boletux community</div>
                                        <div className={classes.amount}>10%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes['bets-section']}>
                <div className={classes.content}>
                    <div className="row">
                        <div className="col-lg-8 col-md-12 col-sm-12">
                            <div className={classes.stats}>
                                <div className={classes.title}>
                                    <h2>Bets amount</h2>
                                </div>
                                <div className={classes.winners}>
                                    <div className={classes.item}>
                                        <div className={classes.address}>0x35345345AD7456456F5634D343453C6745B363523CB</div>
                                        <div className={classes.amount}>3.2 BNB</div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>0x35345345AD7456456F5634D343453C6745B363523CB</div>
                                        <div className={classes.amount}>2.2 BNB</div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>0x35345345AD7456456F5634D343453C6745B363523CB</div>
                                        <div className={classes.amount}>1.1 BNB</div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>0x35345345AD7456456F5634D343453C6745B363523CB</div>
                                        <div className={classes.amount}>0.7 BNB</div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>0x35345345AD7456456F5634D343453C6745B363523CB</div>
                                        <div className={classes.amount}>0.7 BNB</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-12 col-sm-12">
                            <div className={classes.prizes}>
                                <div className={classes['coins-img']}>
                                    <img src={goldCoinsImg} alt="Gold coins decoration" />
                                </div>
                                <div className={classes['total-rewards']}>
                                    <div className={classes.label}>5 days:</div>
                                    <div className={classes.value}>08:28:32</div>
                                </div>
                                <div className={classes['claim-rewards']}>
                                    <div className={classes.label}>Rewards:</div>
                                    <div className={classes.value}>4.1 BNB</div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Prizes;
