import React from 'react';
import { useTranslation } from 'react-i18next';

import { ToastEventChannel } from '../../../components/eventChannels/ToastEventChannel';

import { BsCopy } from "react-icons/bs";

import classes from './CopyToClipboardButton.module.scss';

type CopyToClipboardButtonProps = {
    textToCopy: string;
    title?: string;
}

const CopyToClipboardButton: React.FC<CopyToClipboardButtonProps> = ({ textToCopy = '', title = '' }) => {
    const { t } = useTranslation();

    const copyToClipboard = () => {
        navigator.clipboard.writeText(textToCopy);
        ToastEventChannel.emit('onSendToast', { type: 'success', message: t('successMessages.copyTextToclipboard') });
    };
  
    return (
      <button className={classes['copy-button']} onClick={copyToClipboard} title={title}>
        <BsCopy />
      </button>
    );
};


export default CopyToClipboardButton;
