import React from 'react';

import ModalPortal from '../Modal/ModalPortal';

import classes from './ModalWrapper.module.scss';

const ModalWrapper: React.FC<{ modalTitle: string; showAcceptButton?: boolean; showTopXButton?: boolean; children: React.ReactElement; onClose: () => void }> = ({ modalTitle, showAcceptButton = true, showTopXButton = false, children, onClose }) => {
    return (
        <ModalPortal onClose={onClose}>
            <div className={classes.margin}>
                <section className={classes.modal}>
                    <header className={classes.header}>
                        {showTopXButton && (
                            <div className={classes['close-button']} onClick={(e) => onClose()}>
                                <i className="bi bi-x"></i>
                            </div>
                        )}
                        <div className={classes.title}>{modalTitle}</div>
                    </header>
                    <div className={classes.content}>{children}</div>
                    <div className={classes.footer}>
                        {showAcceptButton && (
                            <div className={classes.button}>
                                <button type="button" onClick={(e) => onClose()}>
                                    Accept
                                </button>
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </ModalPortal>
    );
};

export default ModalWrapper;
