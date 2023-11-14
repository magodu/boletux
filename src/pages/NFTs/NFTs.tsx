import React, { useState } from 'react';

import Carousel from '../../components/app/Carousel/Carousel';

import classes from './NFTs.module.scss';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import ethereumLogoImg from '../../assets/images/ethereum-logo.png';
import boxHeaderYellowImg from '../../assets/images/box-wrapper-header-yellow.png';
import boxFooterYellowImg from '../../assets/images/box-wrapper-footer-yellow.png';
import boxHeaderImg from '../../assets/images/box-wrapper-header.png';
import boxFooterImg from '../../assets/images/box-wrapper-footer.png';
import Nft0Img from '../../assets/images/NFTs/0.png';
import Nft1Img from '../../assets/images/NFTs/1.png';
import Nft2Img from '../../assets/images/NFTs/2.png';

import { BsQuestionCircle, BsGraphUpArrow } from 'react-icons/bs';

import { nftList } from '../../models/appTypes';

const nftWalletList: nftList[] = [
    {
        id: 1,
        src: Nft0Img,
        alt: 'Image 1 for carousel',
    },
    {
        id: 2,
        src: Nft1Img,
        alt: 'Image 2 for carousel',
    },
    {
        id: 3,
        src: Nft2Img,
        alt: 'Image 3 for carousel',
    },
];

const nftStakingList: nftList[] = [];

const NFTs: React.FC = () => {
    const [stakeNft, setStakeNft] = useState<string | number | null>(null);
    const [unstakeNft, setUnstakeNft] = useState<string | number | null>(null);

    const collectAwards = () => {
        console.log('Collect awards method');
    };

    const navigateTo = (where: string) => {
        console.log('navigate method to', where);
    };

    const selectSideHandler = (elem: any, slider: string) => {
        console.log('selectSideHandler', elem, slider);
        if (slider === 'stake') {
            setStakeNft(elem);
        } else if (slider === 'unstake') {
            setUnstakeNft(elem);
        }
        
    };

    const stake = () => {
        console.log('Stake', stakeNft);
    };

    const unstake = () => {
        console.log('Unstake', unstakeNft);
    };

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
                            <button className={`${classes.jackpot} ${classes.active}`} onClick={() => navigateTo('opensea')}>Buy NFTs</button>
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

            <section className={classes['nfts-section']}>
                <div className={classes['nfts-content']}>
                    <div className={classes.nfts}>
                        <div className={`${classes.box} ${classes['box-yellow']}`}>
                            <div className={classes.header}>
                                <img src={boxHeaderYellowImg} alt="" />
                                <div className={classes['box-title']}>NFTs</div>
                            </div>
                            <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                <div className={classes['box-nfts']}>
                                    <div className={classes['data-wrapper']}>
                                        <div className={classes.value}>46 / 100</div>
                                        <div className={classes.label}>NFTs STAKED</div>
                                    </div>
                                </div>
                                <div className={classes['box-nfts']}>
                                    <div className={classes['data-wrapper']}>
                                        <div className={classes.value}>34.3%</div>
                                        <div className={classes.label}>Floor price APR</div>
                                    </div>
                                </div>
                            </div>
                            <div className={classes.footer}>
                                <img src={boxFooterYellowImg} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.carousel}>
                        <div className={classes.box}>
                            <div className={classes.header}>
                                <img src={boxHeaderImg} alt="" />
                                <div className={classes['box-title']}>In wallet</div>
                            </div>
                            <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                <div className={classes['carousel-content']}>
                                    <Carousel list={nftWalletList} emptyText="Buy NFTs on Marketplace" onSelect={(elem) => selectSideHandler(elem, 'stake')} />
                                </div>
                                <div className={classes.buttons}>
                                    <button type="button" className={classes.large} disabled={nftWalletList.length > 0 ? false : true} onClick={() => stake()}>
                                        Stake
                                    </button>
                                </div>
                            </div>
                            <div className={classes.footer}>
                                <img src={boxFooterImg} alt="" />
                            </div>
                        </div>
                    </div>
                    <div className={classes.carousel}>
                        <div className={classes.box}>
                            <div className={classes.header}>
                                <img src={boxHeaderImg} alt="" />
                                <div className={classes['box-title']}>My stake</div>
                            </div>
                            <div className={`${classes.content} ${classes['box-wrapper']}`}>
                                <div className={classes['carousel-content']}>
                                    <Carousel list={nftStakingList} emptyText="Stake your NFTs and get Passive Income" onSelect={(elem) => selectSideHandler(elem, 'unstake')}/>
                                </div>
                                <div className={classes.buttons}>
                                    <button type="button" className={classes.large} disabled={nftStakingList.length > 0 ? false : true} onClick={() => unstake()}>
                                        Unstake
                                    </button>
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

export default NFTs;
