import React, { useEffect } from 'react';

import classes from './BetsModal.module.scss';

const BetsModal: React.FC<{ data: any, onFinish: (result: any) => void }> = ({ data, onFinish }) => {

    const acceptBet = () => {
        console.log("acceptBet");
        onFinish('result');
    };

    return (
        <div className={classes['modal-content']}>
            <div className={classes['content-container']}>
                <div className={classes.globe}>
                    <div className={classes.title}>Multiplier</div>
                    <div className={`${classes.value} ${classes.multiplier}`}>10X</div>
                </div>
                <div className={classes.globe}>
                    <div className={classes.title}>Spin</div>
                    <div className={classes.value}>
                        27200.<span className={classes.decimals}>45</span>
                    </div>
                </div>
                <div className={classes.globe}>
                    <div className={classes.title}>Prize</div>
                    <div className={`${classes.value} ${classes.prize}`}>0.3 ETH</div>
                </div>
            </div>
        </div>
    );
};

export default BetsModal;
