// useEthersErrorHandler.js
import { useState, useEffect } from 'react';
import { parseEthersError } from '../utils';
import { ToastEventChannel } from '../components/eventChannels/ToastEventChannel';

export function useEthersErrorHandler() {
    const [errorMessage, setErrorMessage] = useState(null);

    const handleError = (error: any) => {
        const message = parseEthersError(error);
        setErrorMessage(message);
    };

    useEffect(() => {
        if (errorMessage) {
            ToastEventChannel.emit('onSendToast', { type: 'error', message: errorMessage});
            console.error(errorMessage);
        }
    }, [errorMessage]);

    return { handleError, errorMessage };
}
