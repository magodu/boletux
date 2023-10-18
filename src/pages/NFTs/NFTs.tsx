import React, { useState } from 'react';

import NftWallet from '../../components/app/NftWallet/NftWallet';
import NftStaking from '../../components/app/NftStaking/NftStaking';
import TabNavItem from '../../components/UI/Tabs/TabNavItem';
import TabContent from '../../components/UI/Tabs/TabContent';

import classes from './NFTs.module.scss';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';

const NFTs: React.FC = () => {
    const [activeTab, setActiveTab] = useState('wallet');

    return (
        <div className={classes['nfts-wrapper']}>
            <div className={classes['bg-shape']}>
                <img src={roundShapeBgImg} alt="" />
            </div>
            <div className={`${classes.title} container`}>
                <div className="row">
                    <div className="col-lg-12">
                        <h2>NFTs</h2>
                    </div>
                </div>
            </div>

            <section className={classes['description-section']}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6">
                            <div className={classes.description}>
                                <div className={classes.text}>
                                    Stake NFTs to earn fees and other daily rewards.
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <div className={classes['nft-stats']}>
                                <div className={classes['nft-staked']}>
                                    <div className={classes.cipher}>
                                        25/100
                                    </div>
                                    <div className={classes.title}>
                                        NFTs Staked
                                    </div>
                                </div>
                                <div className={classes['nft-percentage']}>
                                    <div className={classes.cipher}>
                                        42.1%
                                    </div>
                                    <div className={classes.title}>
                                        Floor Price APR
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes['nfts-section']}>
                <div className={classes.content}>
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="tabs">
                                <ul className={`nav nav-tabs ${classes.tabs}`} role="tablist">
                                    <TabNavItem title="NFTs in your Wallet" id="wallet" activeTab={activeTab} setActiveTab={setActiveTab} />
                                    <TabNavItem title="NFTs in staking" id="staking" activeTab={activeTab} setActiveTab={setActiveTab} />
                                </ul>

                                <div className="outlet">
                                    <TabContent id="wallet" activeTab={activeTab}>
                                        <NftWallet />
                                    </TabContent>
                                    <TabContent id="staking" activeTab={activeTab}>
                                        <NftStaking />
                                    </TabContent>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NFTs;

