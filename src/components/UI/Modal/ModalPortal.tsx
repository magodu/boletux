import { Fragment } from 'react';
import ReactDOM from 'react-dom';

import classes from './ModalPortal.module.scss';

import { InputProps } from '../../../models/appTypes';

const Backdrop: React.FC<{ onClose: () => void  }> = ({ onClose }) => {
    return <div className={classes.backdrop} onClick={onClose} />;
};

const ModalOverlay: React.FC<InputProps> = (props) => {
    return (
        <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    );
};

const portalElement = document.getElementById('overlays');

const ModalPortal: React.FC<{children: React.ReactElement, onClose: () => void }> = ({ children, onClose }) => {
    return (
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement!)}
            {ReactDOM.createPortal(<ModalOverlay>{children}</ModalOverlay>, portalElement!)}
        </Fragment>
    );
};

export default ModalPortal;
