export class Publisher<T> {
    private readonly _subscribers: ((data: T) => void)[];

    constructor() {
        this._subscribers = [];
    }

    public subscribe(subscriber: ((data: T) => void)): void {
        this._subscribers.push(subscriber);
    }

    public publish(data: T): void {
        for (const subscriber of this._subscribers) {
            subscriber(data);
        }
    }
}