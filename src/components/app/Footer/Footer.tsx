import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { twitterUrl, discordUrl } from '../../../constants';

import footerShapeHome from '../../../assets/images/background/footer-shape-home.png';
import footerShape from '../../../assets/images/background/footer-shape.png';
import { BsTwitterX as TwitterIcon } from 'react-icons/bs';
import { BsDiscord as DiscordIcon} from 'react-icons/bs';

import classes from './Footer.module.scss';

const Footer = () => {
    const { pathname } = useLocation();
    const { t } = useTranslation();

    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    return (
        <footer className={classes.footer}>
            <div className={classes['bg-shape--top']}>
                <img src={pathname === '/home' ? footerShapeHome : footerShape} alt="" />
            </div>
            <div className="container pt-120">
                <div className="row align-items-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-8">
                        {/* <ul className={classes['short-links']}>
                            <li>
                                <Link to="/#">About</Link>
                            </li>
                            <li>
                                <Link to="/#">FAQs</Link>
                            </li>
                            <li>
                                <Link to="/#">Contact</Link>
                            </li>
                            <li>
                                <Link to="/#">Privacy</Link>
                            </li>
                        </ul> */}
                    </div>
                </div>
                <hr />
                <div className={`${classes['footer-bottom']} row py-5 align-items-center`}>
                    <div className="col-lg-6">
                        <p className={`${classes['copyright-text']} mb-lg-0`} >
                            {t('footer.copyright')} © {getCurrentYear()}. {t('footer.rights')}
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <ul className={classes['social-links']}>
                            <li>
                                <Link to={twitterUrl} target="_blank" rel="noopener noreferrer">
                                    <TwitterIcon />
                                </Link>
                            </li>
                            <li>
                                <Link to={discordUrl} target="_blank" rel="noopener noreferrer">
                                    <DiscordIcon />
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
