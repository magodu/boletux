import { EventBus } from './EventBus';

describe('eventbus', () => {
    test('instantiate an event bus', () => {
        const bus = EventBus();

        expect(Object.getOwnPropertyNames(bus)).toHaveLength(4);
        expect(bus).toHaveProperty('on');
        expect(bus).toHaveProperty('off');
        expect(bus).toHaveProperty('once');
        expect(bus).toHaveProperty('emit');
    });

    test('adds an event with a handler without payload', () => {
        const bus = EventBus<{
            'on-event-1': () => void;
        }>();

        const handler = jest.fn();
        bus.on('on-event-1', handler);

        bus.emit('on-event-1');
        expect(handler).toHaveBeenCalledTimes(1);
    });

    test('adds an event with a handler with payload', () => {
        const bus = EventBus<{
            'on-event-1': (payload: { data: string }) => void;
        }>();

        const handler = jest.fn();
        bus.on('on-event-1', handler);

        const payload = { data: 'serialized::test=sample&' };
        bus.emit('on-event-1', payload);
        expect(handler).toHaveBeenCalledTimes(1);
    });

    test('adds multiple events with one handler', () => {
        const bus = EventBus<{
            'on-event-1': () => void;
            'on-event-2': () => void;
        }>();

        const handler1 = jest.fn();
        bus.on('on-event-1', handler1);

        const handler2 = jest.fn();
        bus.on('on-event-2', handler2);

        bus.emit('on-event-1');
        expect(handler1).toBeCalledTimes(1);
        expect(handler2).not.toBeCalled();

        bus.emit('on-event-2');
        expect(handler1).toBeCalledTimes(1);
        expect(handler2).toBeCalledTimes(1);
    });

    test('adds one event with multiple handlers', () => {
        const bus = EventBus<{
            'on-test-event': (payload: { data: string }) => void;
        }>();

        const handler1 = jest.fn();
        const handler2 = jest.fn();
        bus.on('on-test-event', handler1);
        bus.on('on-test-event', handler2);

        const payload = { data: 'serialized::test=sample&' };
        bus.emit('on-test-event', payload);
        expect(handler1).toBeCalledTimes(1);
        expect(handler1).toBeCalledWith(payload);
        expect(handler2).toBeCalledTimes(1);
        expect(handler2).toBeCalledWith(payload);
    });

    test('adds an event handler and it can only be fired once', () => {
        const bus = EventBus<{
            'on-test-event': (payload: { data: string }) => void;
        }>();

        const handler = jest.fn();
        bus.once('on-test-event', handler);

        bus.emit('on-test-event', { data: 'serialized::test=sample&' });
        expect(handler).toBeCalledTimes(1);
        bus.emit('on-test-event', { data: 'serialized::test=dropped&' });
        expect(handler).toBeCalledTimes(1);
    });

    test('unsubscribes an event', () => {
        const bus = EventBus<{
            'on-event-1': (payload: number) => void;
            'on-event-2': () => void;
        }>();

        const handler1 = jest.fn();
        const unsubscribe = bus.on('on-event-1', handler1);

        bus.emit('on-event-1', 198237);
        expect(handler1).toHaveBeenCalledTimes(1);

        unsubscribe();

        bus.emit('on-event-1', 198238);
        expect(handler1).toHaveBeenCalledTimes(1);
    });

    test('unsubscribes an event using `eventbus.off`', () => {
        const bus = EventBus<{
            'on-event-1': (payload: number) => void;
            'on-event-2': () => void;
        }>();

        const handler1 = jest.fn();
        bus.on('on-event-1', handler1);

        bus.emit('on-event-1', 198237);
        expect(handler1).toHaveBeenCalledTimes(1);

        bus.off('on-event-1', handler1);

        bus.emit('on-event-1', 198238);
        expect(handler1).toHaveBeenCalledTimes(1);
    });

    test('should fire all event handlers even after an error occurs', () => {
        const TestError = new Error('Handler #2 failed.');

        const bus = EventBus<{
            'on-event-1': () => void;
        }>();

        const handler1 = jest.fn();
        const handler2 = jest.fn().mockImplementation(() => {
            throw TestError;
        });
        const handler3 = jest.fn();
        const handler4 = jest.fn();
        bus.on('on-event-1', handler1);
        bus.on('on-event-1', handler2);
        bus.on('on-event-1', handler3);
        bus.on('on-event-1', handler4);

        bus.emit('on-event-1');

        expect(handler1).toHaveBeenCalledTimes(1);
        expect(handler2).toHaveBeenCalledTimes(1);
        expect(handler3).toHaveBeenCalledTimes(1);
        expect(handler4).toHaveBeenCalledTimes(1);
    });

    test('should fire all event handlers and log error', () => {
        const onError = jest.fn();
        const TestError = new Error('Handler #2 failed.');

        const bus = EventBus<{
            'on-event-1': () => void;
        }>({
            onError,
        });

        const handler1 = jest.fn();
        const handler2 = jest.fn().mockImplementation(() => {
            throw TestError;
        });
        const handler3 = jest.fn();
        const handler4 = jest.fn();
        bus.on('on-event-1', handler1);
        bus.on('on-event-1', handler2);
        bus.on('on-event-1', handler3);
        bus.on('on-event-1', handler4);

        bus.emit('on-event-1');
        expect(onError).toBeCalledTimes(1);
        expect(handler1).toHaveBeenCalledTimes(1);
        expect(handler2).toHaveBeenCalledTimes(1);
        expect(handler3).toHaveBeenCalledTimes(1);
        expect(handler4).toHaveBeenCalledTimes(1);
    });
});
