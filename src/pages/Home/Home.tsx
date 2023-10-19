import { useState } from 'react';
import { Link } from 'react-router-dom';

import e1BgImg from '../../assets/images/background/hero-2-e1.png';
import e2BgImg from '../../assets/images/background/hero-2-e2.png';
import e3BgImg from '../../assets/images/background/hero-2-e3.png';
import e4BgImg from '../../assets/images/background/hero-2-e4.png';
import e5BgImg from '../../assets/images/background/hero-2-e5.png';
import shapeBgImg from '../../assets/images/background/hero-3-shape.png';
import roundShapeBgImg from '../../assets/images/background/round-shape-3.png';
import contestBgImg from '../../assets/images/background/contest-bg.png';
import animation1Img from '../../assets/images/home-animation/home01.png';
import animation2Img from '../../assets/images/home-animation/home02.png';
import animation3Img from '../../assets/images/home-animation/home03.png';
import animation4Img from '../../assets/images/home-animation/home04.png';
import animation5Img from '../../assets/images/home-animation/home05.png';
import animation6Img from '../../assets/images/home-animation/home06.png';

import betsImgOn from '../../assets/images/options/bets_on.png';
import betsImgOff from '../../assets/images/options/bets_off.png';
import lotteryImgOn from '../../assets/images/options/lottery_on.png';
import lotteryImgOff from '../../assets/images/options/lottery_off.png';
import vaultImgOn from '../../assets/images/options/vault_on.png';
import vaultImgOff from '../../assets/images/options/vault_off.png';
import nftsImgOn from '../../assets/images/options/nfts_on.png';
import nftsImgOff from '../../assets/images/options/nfts_off.png';
import nftImg from '../../assets/images/NFT-animated.gif';

import classes from './Home.module.scss';


const hoverImages = {
    bets: {
        srcActive: betsImgOff,
        srcOn: betsImgOn,
        srcOff: betsImgOff
    },
    lottery: {
        srcActive: lotteryImgOff,
        srcOn: lotteryImgOn,
        srcOff: lotteryImgOff
    },
    vault: {
        srcActive: vaultImgOff,
        srcOn: vaultImgOn,
        srcOff: vaultImgOff
    },
    nfts: {
        srcActive: nftsImgOff,
        srcOn: nftsImgOn,
        srcOff: nftsImgOff
    },
};

const Home: React.FC = () => {
    const [ hoverImagesData, setHoverImagesData ] = useState<any>(hoverImages);

    const changeImage = (imageId: string, action: string) => {
        const src = action === 'on' ? 'srcOn' : 'srcOff';
        setHoverImagesData((prevState: any) => ({ ...prevState, [imageId]: {...hoverImagesData[imageId] , srcActive: hoverImagesData[imageId][src]} }));
    };

    return (
        <>
            <div className={classes.home}>
                <section className={`${classes.presentation} ${classes['style_two']} ${classes['bg_img']}`}>
                    <div className={classes['shape-left']}>
                        <img src={shapeBgImg} alt="round shape 3" />
                    </div>
                    <div className={classes['shape']}>
                        <img src={roundShapeBgImg} alt="" />
                    </div>
                    <div className={classes['hero-e1']}>
                        <img src={e1BgImg} alt="" />
                    </div>
                    <div className={classes['hero-e2']}>
                        <img src={e2BgImg} alt="" />
                    </div>
                    <div className={classes['hero-e3']}>
                        <img src={e3BgImg} alt="" />
                    </div>
                    <div className={classes['hero-e4']}>
                        <img src={e4BgImg} alt="" />
                    </div>
                    <div className={classes['hero-e5']}>
                        <img src={e5BgImg} alt="" />
                    </div>
                    <div className="container">
                        <div className="row justify-content-center justify-content-lg-start">
                            <div className="col-xl-8 col-lg-8 col-md-12">
                                <div className={classes.content}>
                                    <div className={classes.subtitle}>Gambling & Real Yield</div>
                                    <h2 className={classes.title}>Choose your option to win</h2>
                                    <p className={classes.subtitle2}>Will you be our next lucky winner?</p>
                                </div>
                            </div>
                            <div className="col-xl-4 col-lg-4 col-md-12">
                                <div className={classes['boletux-animation']}>
                                    <img className={`${classes.animation1} ${classes.floating}`} src={animation1Img} alt="Boletux animation" />
                                    <img className={`${classes.animation2} ${classes.floating}`} src={animation2Img} alt="Boletux animation" />
                                    <img className={`${classes.animation3} ${classes.floating}`} src={animation3Img} alt="Boletux animation" />
                                    <img className={`${classes.animation4} ${classes.floating}`} src={animation4Img} alt="Boletux animation" />
                                    <img className={`${classes.animation5} ${classes.floating}`} src={animation5Img} alt="Boletux animation" />
                                    <img className={`${classes.animation6} ${classes.floating}`} src={animation6Img} alt="Boletux animation" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className={`${classes['options-section']}`}>
                    <div className={classes['bg-el']}>
                        <img src={contestBgImg} alt="contest" />
                    </div>
                    <div className="container">
                        <div className="row mb-0 mt-0">
                            <div className="col-lg-12">
                                <div className={`row ${classes.product}`}>
                                    <div className={`${classes['nft-image']} col-lg-3`}>
                                        <img src={nftImg} alt="Boletux NFT" />
                                    </div>
                                    <div className="col-lg-9">
                                        <div className={classes['options-wrapper']}>
                                            <div className={classes.title}>
                                                How it works?
                                            </div>
                                            <div className={classes.options}>
                                                <div className={classes.option}
                                                    onMouseEnter={() => changeImage('bets', 'on')}
                                                    onMouseLeave={() => changeImage('bets', 'off')}
                                                >
                                                    <div className={classes.image}>
                                                        <img src={hoverImagesData.bets.srcActive} alt="Boletux bets" />
                                                    </div>
                                                    <div className={classes.content}>
                                                    <div className={classes.title}>
                                                        BNB Bets
                                                    </div>
                                                    <div className={classes.description}>
                                                        Real BNB Betting on the blockchain. Spin the wheel and multiply your bets up to 10x.
                                                    </div></div>
                                                    <div className={classes.link}>
                                                        <Link to="/bets">Make a bet</Link>
                                                    </div>
                                                </div>
                                                <div className={classes.option} 
                                                   onMouseEnter={() => changeImage('lottery', 'on')}
                                                   onMouseLeave={() => changeImage('lottery', 'off')}
                                                >
                                                    <div className={classes.image}>
                                                        <img src={hoverImagesData.lottery.srcActive} alt="Boletux Lottery" />
                                                    </div>
                                                    <div className={classes.content}>
                                                    <div className={classes.title}>
                                                        Lottery
                                                    </div>
                                                    <div className={classes.description}>
                                                        100 weekly lottery tickets and 5 winners. Bitcoin price determines winners.
                                                    </div></div>
                                                    <div className={classes.link}>
                                                        <Link to="/lottery">Buy a ticket</Link>
                                                    </div>
                                                </div>
                                                <div className={classes.option}
                                                    onMouseEnter={() => changeImage('vault', 'on')}
                                                    onMouseLeave={() => changeImage('vault', 'off')}
                                                >
                                                    <div className={classes.image}>
                                                        <img src={hoverImagesData.vault.srcActive} alt="Boletux Vault" />
                                                    </div>
                                                    <div className={classes.content}>
                                                        <div className={classes.title}>
                                                            BNB Vault
                                                        </div>
                                                        <div className={classes.description}>
                                                            Invest against gamblers. Desposit BNB and earn unsuccessful bets and additional rewards.
                                                        </div>
                                                    </div>
                                                    <div className={classes.link}>
                                                        <Link to="/vault">Invest now</Link>
                                                    </div>
                                                </div>
                                                <div className={classes.option}
                                                    onMouseEnter={() => changeImage('nfts', 'on')}
                                                    onMouseLeave={() => changeImage('nfts', 'off')}
                                                >
                                                
                                                    <div className={classes.image}>
                                                        <img src={hoverImagesData.nfts.srcActive} alt="Boletux Real Yield NFTs" />
                                                    </div>
                                                    <div className={classes.content}>
                                                    <div className={classes.title}>
                                                        Real Yield NFTs
                                                    </div>
                                                    <div className={classes.description}>
                                                        Stake NFTs to earn fees and other daily rewards.
                                                    </div></div>
                                                    <div className={classes.link}>
                                                        <Link to="/nfts">Stake now</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

             {/*    <section className={`${classes['roadmap-section']}`}>
                    <div className="container">
                        <div className="row mb-0 mt-0">
                            <h3>Roadmap</h3>

                            <ul className={classes.timeline}>
                                <li>
                                    <div>
                                        <span className={classes.time}>1934</span> At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                                        praesentium
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className={classes.time}>1937</span> Proin quam velit, efficitur vel neque vitae, rhoncus commodo mi. Suspendisse finibus mauris et bibendum molestie. Aenean ex augue, varius et pulvinar in, pretium non
                                        nisi.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className={classes.time}>1940</span> Proin iaculis, nibh eget efficitur varius, libero tellus porta dolor, at pulvinar tortor ex eget ligula. Integer eu dapibus arcu, sit amet sollicitudin eros.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className={classes.time}>1943</span> In mattis elit vitae odio posuere, nec maximus massa varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className={classes.time}>1946</span> In mattis elit vitae odio posuere, nec maximus massa varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className={classes.time}>1956</span> In mattis elit vitae odio posuere, nec maximus massa varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className={classes.time}>1957</span> In mattis elit vitae odio posuere, nec maximus massa varius. Suspendisse varius volutpat mattis. Vestibulum id magna est.
                                    </div>
                                </li>
                                <li>
                                    <div>
                                        <span className={classes.time}>1967</span> Aenean condimentum odio a bibendum rhoncus. Ut mauris felis, volutpat eget porta faucibus, euismod quis ante.
                                    </div>
                                </li>
                              
                            </ul>
                        </div>
                    </div>
                </section> */}
            </div>
        </>
    );
};

export default Home;
