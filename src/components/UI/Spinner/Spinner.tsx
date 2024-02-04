import React from 'react';
import { useTranslation } from 'react-i18next';

import classes from './Spinner.module.scss';

const Spinner: React.FC<{ message?: string }> = ({ message }) => {
    const { t } = useTranslation();
    const messageText = message ? message : t('common.loading');

    return (
        <div className={classes.backdrop}>
            <div className={classes['container']}>
                <div className={classes['wrapper']}>
                    <div className={classes['content']}>
                        <div className={classes['loader-wrapper']}>
                            <div className={classes.loader}>
                                <div className={classes.square}></div>
                                <div className={classes.square}></div>
                                <div className={`${classes.square} ${classes.last}`}></div>
                                <div className={`${classes.square} ${classes.clear}`}></div>
                                <div className={classes.square}></div>
                                <div className={`${classes.square} ${classes.last}`}></div>
                                <div className={`${classes.square} ${classes.clear}`}></div>
                                <div className={classes.square}></div>
                                <div className={`${classes.square} ${classes.last}`}></div>
                            </div>
                        </div>
                        <div className={classes.text}>{messageText}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Spinner;
