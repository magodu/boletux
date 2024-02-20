import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import Carousel from '../../components/app/Carousel/Carousel';
import ContentBox from '../../components/UI/ContentBox/ContentBox';

import classes from './NFTs.module.scss';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import ethereumLogoImg from '../../assets/images/ethereum-logo.png';
import Nft0Img from '../../assets/images/NFTs/0.png';
import Nft1Img from '../../assets/images/NFTs/1.png';
import Nft2Img from '../../assets/images/NFTs/2.png';

import { BsQuestionCircle, BsGraphUpArrow } from 'react-icons/bs';
import { RxExternalLink } from "react-icons/rx";

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
    const { t } = useTranslation();

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
                                    <button onClick={() => collectAwards()}>{t('common.collect')}</button>
                                </div>
                            </div>
                        </div>
                        <div className={classes.buttons}>
                            <button className={`${classes.jackpot} ${classes.active}`} onClick={() => navigateTo('opensea')}>
                                {t('nfts.buyNFTS_btn')}
                            </button>
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
                        <ContentBox type="special" title={t('nfts.nfts_boxTitle')}>
                            <div className={classes['box-wrapper']}>
                                <div className={classes['box-nfts']}>
                                    <div className={classes['data-wrapper']}>
                                        <div className={classes.value}>46 / 100</div>
                                        <div className={classes.label}>{t('nfts.nftsStaked')}</div>
                                    </div>
                                </div>
                                <div className={classes['box-nfts']}>
                                    <div className={classes['data-wrapper']}>
                                        <div className={classes.value}>34.3%</div>
                                        <div className={classes.label}>{t('nfts.floorPrice')}</div>
                                    </div>
                                </div>
                            </div>
                        </ContentBox>
                    </div>
                    <div className={classes.carousel}>
                        <ContentBox title={t('nfts.inWallet_boxTitle')}>
                            <div className={classes['box-wrapper']}>
                                <div className={classes['carousel-content']}>
                                    <Carousel list={nftWalletList} emptyText={t('nfts.inWallet_placeholder')} onSelect={(elem) => selectSideHandler(elem, 'stake')} />
                                </div>
                                <div className={classes.buttons}>
                                    <button type="button" className={classes.large} disabled={nftWalletList.length > 0 ? false : true} onClick={() => stake()}>
                                        {t('nfts.stake_btn')}
                                    </button>
                                </div>
                            </div>
                        </ContentBox>
                    </div>
                    <div className={classes.carousel}>
                        <ContentBox title={t('nfts.myStake_boxTitle')}>
                            <div className={classes['box-wrapper']}>
                                <div className={classes['carousel-content']}>
                                    <Carousel list={nftStakingList} emptyText={t('nfts.myStake_placeholder')} onSelect={(elem) => selectSideHandler(elem, 'unstake')} />
                                </div>
                                <div className={classes.buttons}>
                                    <button type="button" className={classes.large} disabled={nftStakingList.length > 0 ? false : true} onClick={() => unstake()}>
                                        {t('nfts.unstake_btn')}
                                    </button>
                                </div>
                            </div>
                        </ContentBox>
                    </div>
                </div>
            </section>

            <section className={classes['instructions-section']}>
                <div className={classes.content}>
                    <h3 className={classes.title}>{t('nfts.instructions_title')}</h3>
                    <div className={classes['instructions-wrapper']}>                             
                        <div className={classes['instructions-box']}>
                            <div className={classes.step}>{t('nfts.instructions_step')} 1</div>
                            <div className={classes.title}>{t('nfts.instructions_step1_title')}</div>
                            <div className={classes.text}>{t('nfts.instructions_step1_text')}</div>
                        </div>
                        <div className={classes['instructions-box']}>
                            <div className={classes.step}>{t('nfts.instructions_step')} 2</div>
                            <div className={classes.title}>{t('nfts.instructions_step2_title')}</div>
                            <div className={classes.text}>{t('nfts.instructions_step2_text')}</div>
                        </div>
                        <div className={classes['instructions-box']}>
                            <div className={classes.step}>{t('nfts.instructions_step')} 3</div>
                            <div className={classes.title}>{t('nfts.instructions_step3_title')}</div>
                            <div className={classes.text}>{t('nfts.instructions_step3_text')}</div>
                        </div>
                    </div>
                    <div className={classes['detail-link']}>
                        <a href="https://boletux.gitbook.io/docs/v/espa/real-yield-investments/nfts" target="_blank">{t('nfts.instructions_details_link')} <RxExternalLink /></a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default NFTs;
