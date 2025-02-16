import * as Rx from 'rxjs/Rx';

// concat: merges as well, but instead of interleaving, it sequences
// think of concat like a line at a ATM, the next transaction (subscription) cannot start until the previous completes!

const source1$ = Rx.Observable.interval(1000)
  .map(x => `Source1: ${x}`)
  .take(3);

const source2$ = Rx.Observable.interval(1750)
  .map(y => `Source2: ${y}`)
  .take(3);

const source3$ = Rx.Observable.interval(2500)
  .map(y => `Source3: ${y}`)
  .take(3);

// static form: creating a stream from the combination
Rx.Observable.concatAll(source1$, source2$, source3$) 
  .subscribe(console.log)



// const rangeSource$1 = Rx.Observable.range(1, 3).delay(19000);
// const rangeSource$2 = Rx.Observable.of('a', 'b', 'c');

// // gets sequenced in order
// const result = Rx.Observable.concat(rangeSource$1, rangeSource$2)
// result.subscribe(console.log);