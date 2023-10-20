import React, { useState, useEffect } from 'react';

import { createIdKey } from '../../../utils'

import classes from './Countdown.module.scss';

const calculateTimeLeft = (endtime: Date | string | number) => {
    const difference = +new Date(endtime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((difference / 1000 / 60) % 60),
            seconds: Math.floor((difference / 1000) % 60),
        };
    }

    return timeLeft;
};

const Countdown: React.FC<{ endtime: Date | string | number }> = ({ endtime }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endtime));

    useEffect(() => {
        const id = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(endtime));
        }, 1000);

        return () => {
            clearTimeout(id);
        };
    });

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        return (
            <div key={createIdKey()}>
                <span>
                    {timeLeft[interval]}
                </span>
                <p>{interval}</p>
            </div>
        );
    });

    return (
        <div className={classes['clock-wrapper']} >
            <p className="mb-2">Next lottery ends in:</p>
            <div className={classes.clock}>
                {timerComponents.length ? timerComponents : <span>Time's up!</span>}
            </div>
        </div>
    );
};

export default Countdown;
