import { Subscriber } from './subscriber';

export abstract class Subscribable {
  subscribers: Subscriber[];

  constructor() {
    this.subscribers = [];
  }

  Notify() {
    this.subscribers.forEach((subscriber) => subscriber.notify({}));
  }

  Subscribe(subscriber: Subscriber) {
    this.subscribers.push(subscriber);
  }

  Unsubscribe(subscriber: Subscriber) {
    const index = this.subscribers.indexOf(subscriber);
    this.subscribers.splice(index, 1);
  }
}
