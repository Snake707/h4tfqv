import {
  fromEvent,
  from,
  interval,
  delayWhen,
  sample,
  debounce,
  map,
  shareReplay,
  asyncScheduler,
  scheduled,
  Observable,
  Subscriber,
  Subscription,
} from 'rxjs';

class steadyEmitterQueue {
  private list: string[] = [];
  private timer: number = 1000;
  private obs: Observable<any>;

  constructor() {
    let subsFunctionVariable = this.subsFunction.bind(this);
    this.obs = new Observable(subsFunctionVariable);
  }

  public runner(subscriber: Subscriber<any>): void {
    if (this.list.length > 0) {
      subscriber.next(this.list.shift());
    }
  }
  private subsFunction(subscriber: Subscriber<any>) {
    console.log(subscriber);
    let intervalId = setInterval(this.runner.bind(this), 1000, subscriber);
    console.log(intervalId);
  }

  public subscribe(observerOrNext: (value: any) => void): Subscription {
    return this.obs.subscribe(observerOrNext);
  }

  public push(element: any): void {
    this.list.push(element);
  }
}

let count = 0;
let queue = new steadyEmitterQueue();
let id = setInterval(() => queue.push(++count), 2000);
setTimeout(() => clearInterval(id), 6000);
queue.subscribe((gotten) => {
  console.log('gotton: ' + gotten);
});

setTimeout(() => {
  console.log('try subscribing again');
  queue.subscribe((gotten) => {
    console.log('gotton2: ' + gotten);
  });
}, 5000);
