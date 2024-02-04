import { EventBus } from '../core/EventBus/EventBus';
import { toastEventPayload } from '../../models/appTypes';

export const ToastEventChannel = EventBus<{
    onSendToast: (payload: toastEventPayload) => void;
}>();
