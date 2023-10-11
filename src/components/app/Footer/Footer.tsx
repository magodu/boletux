import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

import { FaTwitter } from 'react-icons/fa';
import round_shape_2 from '../../../assets/images/background/footer-shape.png';

import classes from './Footer.module.scss';

const Footer = () => {

    const getCurrentYear = () => {
        return new Date().getFullYear();
    };

    return (
        <footer className={classes.footer}>
            <div className={classes['bg-shape--top']}>
                <img src={round_shape_2} alt="image" />
            </div>
            <div className="container pt-120">
                <div className="row align-items-center">
                    <div className="col-lg-4"></div>
                    <div className="col-lg-8">
                    {/*     <ul className={classes['short-links']}>
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
                            Copyright © {getCurrentYear()}. All Rights Reserved By Boletux
                        </p>
                    </div>
                    <div className="col-lg-6">
                        <ul className={classes['social-links']}>
                            <li>
                                <Link to="https://twitter.com/" target="_blank" rel="noopener noreferrer">
                                    <FaTwitter />
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
