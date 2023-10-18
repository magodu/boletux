import React from 'react';

import classes from './Lottery.module.scss';

import roundShapeBgImg from '../../assets/images/background/inner-hero-shape-2.png';
import goldCoinsLogoImg from '../../assets/images/gold-coin-stacks-logo.png';
import { FaTrashAlt } from 'react-icons/fa';




const Lottery: React.FC = () => {
    const lotteryNumbers = Array.from({ length: 100 }, (_, index) => String(index).padStart(2, '0'));
    return (
        <div className={classes['lottery-wrapper']}>
            <div className={classes['bg-shape']}>
                <img src={roundShapeBgImg} alt="" />
            </div>
            <div className={`${classes.title} container`}>
                <div className="row">
                    <div className="col-lg-12">
                        <h2>Lottery</h2>
                    </div>
                </div>
            </div>
            <section className={classes['description-section']}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className={classes.description}>
                                <div className={classes.text}>A raffle every week and up to 5 winners. The winning number only depends on the Bitcoin price, so all prizes can be verified directly on the blockchain.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes['lottery-section']}>
                <div className={classes['clock-wrapper']}>
                    <p className="mb-2">Next lottery ends in:</p>
                    <div className={classes.clock} data-clock="2023/12/10">
                        <div>
                            <span>02</span>
                            <p>days</p>
                        </div>
                        <div>
                            <span>12</span>
                            <p>hours</p>
                        </div>
                        <div>
                            <span>06</span>
                            <p>minutes</p>
                        </div>
                        <div>
                            <span>58</span>
                            <p>seconds</p>
                        </div>
                    </div>
                </div>
                <div className={classes.content}>
                    <div className="row">
                        <div className="col-lg-8">
                            <div className={classes['lottery-numbers']}>
                                <ul className={classes.numbers}>
                                    {lotteryNumbers.map((number, i) => (
                                        <li key={i}>{number}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className={classes.jackpot}>
                                <div className={classes.title}>
                                    <h4>BNB Jackpot</h4>
                                </div>
                                <div className={classes['jackpot-value']}>1.2</div>
                                <div className={classes.week}>
                                    <div className={classes.label}>Week</div>
                                    <div className={classes.value}>2</div>
                                </div>
                                <div className={classes.price}>
                                    <div className={classes.label}>Ticket price</div>
                                    <div className={classes.value}>0.1 BNB</div>
                                </div>
                                <hr />
                                <div className={classes['tickets-wrapper']}>
                                    <div className={classes.label}>
                                        <h5>Your tickets</h5>
                                    </div>
                                    <div className={classes.tickets}>
                                        {/* <p>You haven't bought tickets yet</p> */}
                                        <ul className={classes['tickets-list']}>
                                            <li>03</li>
                                            <li>20</li>
                                        </ul>
                                    </div>
                                </div>
                                <hr />
                                <div className={classes['new-tickets-wrapper']}>
                                    <div className={classes.label}>
                                        <h5>Get new tickets</h5>
                                        <FaTrashAlt />
                                    </div>
                                    <div className={classes.tickets}>
                                        <p>Select your tickets in the panel and they will appear here</p>
                                        <ul className={classes['new-tickets-list']}>
                                            <li>12</li>
                                        </ul>
                                    </div>
                                </div>
                                <div className={classes.buy}>
                                    <button  className={classes['action-btn']} type="button" role="tab" >
                                        Buy tickets
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={classes['prizes-section']}>
                <div className={classes.content}>
                    <div className="row">
                        <div className="col-lg-4">
                            <div className={classes.prizes}>
                                <div className={classes['coins-img']}>
                                    <img src={goldCoinsLogoImg} alt="image" />
                                </div>
                                <div className={classes.rewards}>
                                    <div className={classes.label}>Your rewards:</div>
                                    <div className={classes.value}>0 BNB</div>
                                </div>
                                <div className={classes.claim}>
                                    <button  className={classes['action-btn']} type="button" role="tab" >
                                        Claim
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-8">
                            <div className={classes['latest-winners']}>
                                <div className={classes.title}>
                                    <h2>Latest winners</h2>
                                </div>
                                <div className={classes.winners}>
                                    <div className={classes.item}>
                                        <div className={classes.address}>
                                            0x234234234D23423423f234234234e234234234d234234
                                        </div>
                                        <div className={classes.amount}>
                                            4.5 BNB
                                        </div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>
                                            0x234234234D23423423f234234234e234234234d234234
                                        </div>
                                        <div className={classes.amount}>
                                            4.5 BNB
                                        </div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>
                                            0x234234234D23423423f234234234e234234234d234234
                                        </div>
                                        <div className={classes.amount}>
                                            4.5 BNB
                                        </div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>
                                            0x234234234D23423423f234234234e234234234d234234
                                        </div>
                                        <div className={classes.amount}>
                                            4.5 BNB
                                        </div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>
                                            0x234234234D23423423f234234234e234234234d234234
                                        </div>
                                        <div className={classes.amount}>
                                            4.5 BNB
                                        </div>
                                    </div>
                                    <div className={classes.item}>
                                        <div className={classes.address}>
                                            0x234234234D23423423f234234234e234234234d234234
                                        </div>
                                        <div className={classes.amount}>
                                            4.5 BNB
                                        </div>
                                    </div>
                                </div>
                                <div className={classes.pagination}>
                                            
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Lottery;
