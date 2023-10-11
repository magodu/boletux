import React from 'react';

import Modal from '../Modal/ModalPortal';

import classes from './AlertModal.module.scss';

import { alertModalDataType } from '../../../models/appTypes';

const AlertModal: React.FC<{ data: alertModalDataType; onClose: () => void; type?: string }> = ({ data, onClose, type = 'Success' }) => {
    return (
        <Modal onClose={onClose}>
            <section className={`${classes.alert} ${classes.frame}`}>
                <div className={classes.close} onClick={(e) => onClose()}><i className="bi bi-x-circle-fill"></i></div>
                <div className={classes.content}>
                    <div className={classes.icon}>{type === 'Success' ? <i className="bi bi-check-square text-success"></i> : <i className="bi bi-exclamation-triangle text-warning"></i> }</div>
                    <div className={classes.text}>
                        {data.message}
                        <ul>{data.errorDetails && data.errorDetails.map((detail: string, i: number) => <li key={i}>{detail}</li>)}</ul>
                    </div>
                </div>
                <div className={classes.footer}></div>
            </section>
        </Modal>
    );
};

export default AlertModal;
