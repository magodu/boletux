import React, { useState, useEffect, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLocation } from "react-router-dom";

import { AuthContext } from '../../../store/auth-context';
import { BoletuxContext } from '../../../store/boletux-context';

import classes from './Header.module.scss';

import logoImg from '../../../assets/images/boletux-logo-text-white.png';
import esLangImg from '../../../assets/images/es.svg';
import enLangImg from '../../../assets/images/en.svg';
import zksyncImg from '../../../assets/images/zksync-logo.png';

import { BiChevronDown } from 'react-icons/bi';


interface languageMenu {
    en: boolean;
    es: boolean;
}

const Header: React.FC<{ data: any; onChangeLanguage: (language: string) => void }> = ({ data, onChangeLanguage }) => {
    const [menuOpened, setMenuOpened] = useState<boolean>(false);
    const [windowHeight, setWindowHeight] = useState<number>(0);
    const { isLoggedIn, logoutHandler } = useContext(AuthContext);
    const { language, setLanguageHandler } = useContext(BoletuxContext);

    const [open, setOpen] = useState('');
    const [show, setShow] = useState(false);

    const { t } = useTranslation();
    const navigate = useNavigate();

    const initialLanguageMenuClasses: languageMenu = {
        en: false,
        es: false,
    };

    const [languageMenuActive, setLanguageMenuActive] = useState<languageMenu>(initialLanguageMenuClasses);
    const location = useLocation();
    const { pathname } = location;
    const splitLocation = pathname.split('/');

    useEffect(() => {
        const languageSelected = language;
        setLanguageMenuActive((prevState) => ({ ...prevState, [languageSelected]: true }));
    }, [language]);

    const navBarTop = () => {
        if (window !== undefined) {
            let height = window.scrollY;
            setWindowHeight(height);
        }
    };

    useEffect(() => {
        window.onbeforeunload = function () {
            window.scrollTo(0, 0);
        };
        window.addEventListener('scroll', navBarTop);
        return () => {
            window.removeEventListener('scroll', navBarTop);
        };
    }, []);

    const toggleMenu = () => {
        setMenuOpened((prevState) => !prevState);
    };

    const closeOthers = (el: any) => {
        const linksClass = classes.links;
        const showClass = classes.show;
        const linksElements = document.querySelector(`.${linksClass}`)?.children;

        for (let i = 0; i < linksElements!.length; i++) {
            const link = linksElements![i];
            if (el !== link && link.classList.contains(showClass)) {
                link.classList.remove(showClass);
            }
        }
    };

    const handleOpen = (event: any) => {
        if (open !== event.target.text) {
            setOpen(event.target.text);
        } else {
            setOpen('');
        }
    };

    const togleSubmenu = (event: any) => {
        const showClass = classes.show;
        closeOthers(event.currentTarget);
        event.currentTarget.classList.toggle(showClass);
    };

    const openRoute = (route: string) => {
        toggleMenu();
        navigate(route);
        navigate(0);
    };

    const setLanguage = (event: React.FormEvent, language: string) => {
        event.preventDefault();

        setLanguageMenuActive({ ...initialLanguageMenuClasses });
        setLanguageMenuActive((prevState) => ({ ...prevState, [language]: true }));
        setLanguageHandler(language);
        onChangeLanguage(language);
    };

    const logOut = () => {
        console.log('logOut');
        logoutHandler();
    };

    return (
        <header id="gotoTop" className={`${classes.header} ${windowHeight > 50 ? `${classes['menu-fixed']} animated fadeInDown` : '' }`} >
            <div className={classes['header__top']}>
                <div className="container">
                    <div className={`${classes['top-menu']} row align-items-center gap-2 gap-md-0`} >
                        <div className="col-sm-6">
                            <div className={`${classes.left} d-flex align-items-center`} >
                                <div className={classes.language}>
                                    <Link to="" title="Language">
                                        <span>{t('navBar.language')}</span>
                                    </Link>
                                    <ul className={classes['languages-sub-menu']}>
                                        <li className={`${classes.language} ${languageMenuActive['en'] ? classes['language-selected'] : ''}`}>
                                            <Link to="" title={t('navBar.language_english')} onClick={(e) => setLanguage(e, 'en')}>
                                                <img className={classes['language-img']} src={enLangImg} alt="" />
                                                <span className={classes.language} lang="en">
                                                    {t('navBar.language_english')}
                                                </span>
                                            </Link>
                                        </li>
                                        <li className={`${classes.language} ${languageMenuActive['es'] ? classes['language-selected'] : ''}`}>
                                            <Link to="" title={t('navBar.language_spanish')} onClick={(e) => setLanguage(e, 'es')}>
                                                <img className={classes['language-img']} src={esLangImg} alt="" />
                                                <span className={classes.language} lang="es">
                                                    {t('navBar.language_spanish')}
                                                </span>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-6">
                            <div className={classes.right}>
                                <Link to="" className={`${classes.zksync__btn} d-flex align-items-center justify-content-center`} >
                                    <img className={classes['language-img']} src={zksyncImg} alt="" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes['header__bottom']}>
                <div className="container">
                    <nav className={`${classes['navbar__container']} navbar navbar-expand-xl p-0 align-items-center`} >
                        <div className={classes.controls}>
                            <Link to="/home" className={`${classes['site-logo']} site-title`}>
                                <img src={logoImg} alt="logo" />
                                <span className="logo-icon">
                                    <i className="flaticon-fire"></i>
                                </span>
                            </Link>
                            <button
                                className={`${classes['navbar-toggler']} ms-auto`}
                                type="button"
                                onClick={() => setShow(!show)}
                            >
                                <span className={classes['menu-toggle']} ></span>
                            </button>
                        </div>
                        <div className={`collapse ${classes['navbar-collapse']} ${show && 'show'}`} >
                            <ul className={`navbar-nav ${classes['main-menu']} ms-auto`} >
                                <li className={splitLocation[1] === "bets" ? classes.active : ""}>
                                    <Link to="/bets" >
                                        Bets
                                    </Link>
                                </li>
                                <li  className={splitLocation[1] === "lottery" ? classes.active : ""}>
                                    <Link to="/lottery" >
                                        Lottery
                                    </Link>
                                </li>
                                <li className={splitLocation[1] === "vault" ? classes.active : ""}>
                                    <Link to="/vault" >
                                        Vault
                                    </Link>
                                </li>
                                <li className={splitLocation[1] === "nfts" ? classes.active : ""}>
                                    <Link to="/nfts" >
                                        NFTs
                                    </Link>
                                </li>
                                <li className={splitLocation[1] === "prizes" ? classes.active : ""}>
                                    <Link to="/prizes" >
                                        Prizes
                                    </Link>
                                </li>
                                <li className={`${classes['menu_has_children']} ${open === 'More' ? `${classes.open}` : ''}`}>
                                    <Link to="" onClick={(e) => handleOpen(e)}>
                                        More<BiChevronDown />
                                    </Link>
                                    <ul className={classes['sub-menu']} >
                                        {[
                                            ['Docs', 'https://boletux.gitbook.io/docs/'],
                                            ['Analytics', '/analytics'],
                                        ].map(([itm, url], i) => (
                                            <li key={i}>
                                                <Link to={url} onClick={() => setShow(false)}>
                                                    {itm}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </ul>
                            <div className={classes['nav-right']} >
                                <Link to="" className={`${classes['connect-wallet']} ${classes.button} `}>Connect</Link>
                            </div>
                        </div>
                    </nav>
                </div>
            </div>
        </header>
    );
};

export default Header;
