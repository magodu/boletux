import { useState, useEffect } from 'react';

import AlertModal from '../../UI/AlertModal/AlertModal';
import { AlertEventChannel } from '../../eventChannels/AlertEventChannel';

function ShowAlert() {
   const [ alertIsShown, setAlertIsShown ] = useState<boolean>(false);
    const [ alertData, setAlertData ] = useState<any>();
 
    useEffect(() => {
        // subscribe to events when mounting
        const unsubscribeOnAlert = AlertEventChannel.on(
          'onSendAlert',
          (payload) => {

            setAlertIsShown(true);
            const data = {
                message: {
                    message: payload.message
                },
                type: payload.type
            };

            setAlertData(data);
          }
        )
        // unsubscribe events when unmounting
        return () => {
            unsubscribeOnAlert()
        }
    }, []);

    const hideAlertHandler = () => {
        setAlertIsShown(false);
    };

    return (
        <>
            { alertIsShown && <AlertModal data={alertData.message} type={alertData?.type} onClose={hideAlertHandler} /> }
        </>
    )
}

export default ShowAlert;
