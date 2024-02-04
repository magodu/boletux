import { useState, useEffect } from 'react';

import toast, { Toaster } from 'react-hot-toast';
import { ToastEventChannel } from '../../eventChannels/ToastEventChannel';

function ShowToast() {
    useEffect(() => {
        // subscribe to events when mounting
        const unsubscribeOnToast = ToastEventChannel.on('onSendToast', (payload) => {
            switch (payload.type) {
                case 'success':
                    toast.success(payload.message);
                    break;
                case 'error':
                    toast.error(payload.message);
                    break;
                case 'info':
                    toast.success(payload.message);
                    break;
                case 'warning':
                    toast.success(payload.message);
                    break;
                default:
            }
        });
        // unsubscribe events when unmounting
        return () => {
            unsubscribeOnToast();
        };
    }, []);

    return (
        <>
            <Toaster position="top-right" reverseOrder={false} />
        </>
    );
}

export default ShowToast;
