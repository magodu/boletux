import React, { useState, useEffect, CSSProperties } from 'react';

import { createIdKey } from '../../../utils'

import classes from './Countdown.module.scss';

type CountdownProps = {
    endtime: Date | string | number;
    timeUpMsg?: string;
    style?: CSSProperties;
};

const setDigits = (time: number) => {
    return time < 10 ? `0${time}`: time ;
};

const calculateTimeLeft = (endtime: Date | string | number) => {
    const difference = +new Date(endtime) - +new Date();
    let timeLeft = {};

    if (difference > 0) {
        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: setDigits(Math.floor((difference / (1000 * 60 * 60)) % 24)),
            minutes: setDigits(Math.floor((difference / 1000 / 60) % 60)),
            seconds: setDigits(Math.floor((difference / 1000) % 60)),
        };
    }

    return timeLeft;
};

const Countdown: React.FC<CountdownProps> = ({ endtime, timeUpMsg, style }) => {
    const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endtime));
    const endTimeMessage = timeUpMsg || "Time's up!";

    useEffect(() => {
        const id = setTimeout(() => {
            setTimeLeft(calculateTimeLeft(endtime));
        }, 1000);

        return () => {
            clearTimeout(id);
        };
    });

    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (interval === "days") {
            return ( 
                <div className={classes['days-elem']} key={createIdKey()}>
                    {timeLeft[interval]}d
                </div>
            ); 
        } else {
            return (
                <div key={createIdKey()}>
                    {timeLeft[interval]}{interval !== "seconds" && <span className={classes['time-elem']}>:</span> }
                </div>
            );
        }
    });

    return (
        <>
            {timerComponents.length ? <span className={classes.value} style={style}>{timerComponents}</span> : <span className={classes.value}>{endTimeMessage}</span>}
        </>
    );
};

export default Countdown;
