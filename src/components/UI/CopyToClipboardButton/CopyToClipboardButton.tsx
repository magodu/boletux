import React from 'react';

import { ToastEventChannel } from '../../../components/eventChannels/ToastEventChannel';

import { BsCopy } from "react-icons/bs";

import classes from './CopyToClipboardButton.module.scss';

type CopyToClipboardButtonProps = {
    textToCopy: string;
    title?: string;
    successMessage?: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ textToCopy = '', title = '', successMessage }) => {
    const copyToClipboard = () => {
        navigator.clipboard.writeText(textToCopy);
        successMessage && ToastEventChannel.emit('onSendToast', { type: 'success', message: successMessage });
    };
  
    return (
      <button className={classes['copy-button']} onClick={copyToClipboard} title={title}>
        <BsCopy />
      </button>
    );
};


export default CopyToClipboardButton;
