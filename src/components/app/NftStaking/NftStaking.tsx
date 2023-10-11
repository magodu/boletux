import React from 'react';

import classes from './NftStaking.module.scss';

import NFTImg from '../../../assets/images/NFTs/7.png';

const NftStaking = () => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <ul className={classes['nft-list']}>
                    <li className={classes['nft-item']}>
                        <div className={classes['item-wrapper']}>
                            <div className={classes['image-background']}>
                                <img src={NFTImg} alt="" />
                            </div>
                            <div className={classes.rewards}>
                                <div className={classes.label}>Claimable Rewards:</div>
                                <div className={classes.value}>1.14 BNB</div>
                            </div>
                            <div className={classes.actions}>
                                <button className={classes['action-btn']} type="button" role="tab">
                                    Claim
                                </button>
                                <button className={classes['action-btn']} type="button" role="tab">
                                    Unstake
                                </button>
                            </div>
                        </div>
                    </li>

                    <li className={classes['nft-buy']}>
                        <div className={classes['item-wrapper']}>
                            <div className={classes.buy}>
                                <button className={classes['action-btn']} type="button" role="tab">
                                    Buy NFT
                                </button>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    );
};
export default NftStaking;
