import React, { useState, useEffect, CSSProperties } from 'react';

import { createIdKey } from '../../../utils'

import classes from './Countdown.module.scss';

type CountdownProps = {
    endTime: number;
    timeUpMsg?: string;
    style?: CSSProperties;
};

type TimeLeftType = {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
};

const setDigits = (time: number) => {
    return time < 10 ? `0${time}`: time ;
};

const calculateTimeLeft = (endtime: number): TimeLeftType => {
    let timeLeft: TimeLeftType = {};

    if (endtime > 0) {
        timeLeft = {
            days: Math.floor(endtime / (1000 * 60 * 60 * 24)),
            hours: Math.floor((endtime / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((endtime / 1000 / 60) % 60),
            seconds: Math.floor((endtime / 1000) % 60),
        };
    }

    return timeLeft;
};

const Countdown: React.FC<CountdownProps> = ({ endTime, timeUpMsg, style }) => {
    const [endTimeRemaining, setEndTimeRemaining] = useState<number>(endTime);
    const endTimeMessage = timeUpMsg || "Time's up!";

    useEffect(() => {
        let timer = setInterval(() => {
            if (endTimeRemaining > 0) {
                setEndTimeRemaining(prevTime => prevTime - 1);
            } else {
                clearInterval(timer);
            }
        }, 1000);
   
        return () => {
            clearInterval(timer);
        };
    }, [endTimeRemaining]);
   
    const timeLeft = calculateTimeLeft(endTimeRemaining * 1000);
 
    const timerComponents = Object.keys(timeLeft).map((interval) => {
        if (interval === "days") {
            return ( 
                <div className={classes['days-elem']} key={createIdKey()}>
                   {setDigits(timeLeft[interval])}d
                </div>
            ); 
        } else {
            return (
                <div key={createIdKey()}>
                    {setDigits(timeLeft[interval])}{interval !== "seconds" && <span className={classes['time-elem']}>:</span> }
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
