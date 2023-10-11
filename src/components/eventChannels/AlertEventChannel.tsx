import { EventBus } from '../core/EventBus/EventBus';
import { alertEventPayload } from '../../models/appTypes';

export const AlertEventChannel = EventBus<{
    onSendAlert: (payload: alertEventPayload) => void;
}>();
