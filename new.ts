//
// Build a minimal observable. createObservable(subscribeFn) where subscribeFn(observer) wires up a source and returns a teardown function. Support .subscribe(observer), .map(fn), and .filter(pred) — each operator returns a new observable. Critically: when the final subscriber unsubscribes, teardown must propagate all the way up the chain so the source (e.g. an interval) is actually cleaned up — no leaks. If there's time, add .debounce(ms).

// ============================================================
// CANDIDATE STARTER — paste this in, build createObservable.
// An "observer" is { next(value), error(err), complete() }.
// subscribeFn(observer) wires up a source and RETURNS a teardown fn.
// ============================================================

type Observer<T> = {
  next: (value: T) => void;
  error?: (err: unknown) => void;
  complete?: () => void;
};
type Teardown = () => void;
type SubscribeFn<T> = (observer: Observer<T>) => Teardown | void;

interface Observable<T> {
  subscribe(observer: Observer<T>): Teardown;
  map<U>(fn: (value: T) => U): Observable<U>;
  filter(predicate: (value: T) => boolean): Observable<T>;
}

function createObservable<T>(subscribeFn: SubscribeFn<T>): Observable<T> {
  return {
    subscribe(observer) {
      // TODO: call subscribeFn with the observer, return its teardown.
      // Guard against a missing teardown and missing error/complete.
      return () => {subscribeFn(observer)};
    },
    map<U>(fn: (value: T) => U): Observable<U> {
      // Create a new observable that wraps this one
      return createObservable<U>((observer) => {
        // Subscribe to the source observable
        return this.subscribe({
          next: (value) => {
            try {
              // Transform the value and pass to the new observer
              observer.next(fn(value));
            } catch (err) {
              // If transform fails, forward the error
              if (observer.error) observer.error(err);
            }
          },
          error: (err) => {
            if (observer.error) observer.error(err);
          },
          complete: () => {
            if (observer.complete) observer.complete();
          }
        });
      });
    },
    filter(predicate) {
      // TODO: return a NEW observable forwarding only values where
      // predicate(value) is true.
      return createObservable<T>(() => () => {}); // replace
    },
    // Stretch: debounce(ms) — emit a value only after ms of quiet.
  };
}

// ===== Harness — an interval source you can run against =====
const interval = createObservable<number>((observer) => {
  let i = 0;
  const id = setInterval(() => observer.next(i++), 100);
  console.log("source: interval STARTED");
  return () => {
    clearInterval(id);
    console.log("source: interval TORN DOWN");
  };
});

const unsub = interval
  .map((x) => x * 2)
  .filter((x) => x % 4 === 0)
  .subscribe({ next: (x) => console.log("got", x) });

// After 1s we unsubscribe. SUCCESS = you see "interval TORN DOWN"
// and the "got" logs STOP. If the interval keeps logging, you have a leak.
setTimeout(unsub, 1000);





const customePromiseAll = (allPromiseArray: any[]) => {
  let solvedPromises = 0;
  let thenResults: any[] = [];
  let catchResults: any[] = [];

  return new Promise((resAll, rejAll) => {
    allPromiseArray.forEach((promise, index) => {
      let result = promise.then((v: any) => {
        thenResults[index] = v;
      });
      let catchResult = promise.catch((v: any) => {
        catchResults[index] = v;
      });
      promise.finally(() => {
        solvedPromises++;
        if (solvedPromises === allPromiseArray.length) {
          resAll(thenResults);
        }
      });
    });
  });
};






const customLRUCache = () => {
  let keysObject: [string, any][] = [];
  let arrayLength = 5;
  let currentLenght = 0;

  return {
    put: function (key: string, value: any) {
      let index = keysObject.findIndex((arr) => arr[0] === key);
      if (index !== -1) {
        keysObject.splice(index, 1);
        keysObject.push([key, value]);
      } else {
        if (currentLenght < arrayLength) {
          keysObject.push([key, value]);
          currentLenght++;
        } else {
          keysObject.splice(0, 1);
          keysObject.push([key, value]);
        }
      }
    },
    getFunction: function (key: string): any {
      let index = keysObject.findIndex((arr) => arr[0] === key);
      if (index !== -1) {
        let oldinfo = keysObject[index];
        keysObject.splice(index, 1);
        keysObject.push(oldinfo);
        return oldinfo[1];
      }
    },
  };
};



// Implement begin(), commit(), rollback(), set(k,v), get(k) supporting nested transactions.
// Example: set(x,1); begin(); set(x,2); begin(); set(x,3); rollback(); get(x)→2; commit(); get(x)→2
// Use a stack of dicts (one per transaction layer), merge down on commit, pop on rollback.

type stackObj1 =  {[key: string]: (...args: any[]) => any }| {begin() : void, set(x: string, v:number) : void, rollback(x:string, a:number): void} 

// type stackObj1 = any[] | { 
//   [key: string]: (...args: any[]) => any;  // Any function
// };

// type stackObj1 = any[] | { 
//   function(): void;  // ✅ Method that returns void
// };

// type StackOrTransaction = 
//     | any[]  // Could be an array
//     | {      // Or could be a transaction object
//         begin(): void;
//         set(x: string, v: number): void;
//         rollback(): void;
//         commit(): void;
//         get(x: string): any;
//     };

//     // Option A: Interface (recommended for APIs)
// interface TransactionLayer {
//   begin(): void;
//   set(key: string, value: any): void;
//   get(key: string): any;
//   rollback(): void;
//   commit(): void;
// }

function transactionlayer() : stackObj1{
  type stackobj = Record<string, any>
  let stackObj = {valuesStack : {}}
  let transactionArray : stackobj[] = [stackObj]
  let transactionIndex = 0;

  return {
      begin : function():void{
          transactionArray.push(stackObj);
          transactionIndex ++;
      },
      set : function(x:string, v: number){
              transactionArray[transactionIndex].valuesStack[x] =v; 
      },
      rollback : function(x:string, v: number){
          if(transactionIndex > 0){
              transactionArray.pop();
          }
  },
      get: function(x:string,){
          return transactionArray[transactionIndex].valuesStack[x]
      },
       commit: function(){

         if(transactionIndex > 0){
              transactionArray[transactionIndex-1].valuesStack = Object.assign(transactionArray[transactionIndex-1].valuesStack, transactionArray[transactionIndex].valuesStack);
              transactionIndex --;
          }

      },

}
}


const transaction = transactionlayer();
transaction.begin();




function dataScoket (){
  const callbacks : Record<string, any[]> = {};  

  return {
      emit : function(event : string, ...args : any[]){
          if(callbacks[event]){
              callbacks[event].forEach((cb) => cb(...args))
          }
      },
       on : function(event : string, cb:(val : string) => void){
          if(callbacks[event]) callbacks[event].push(cb);
          else callbacks[event] = [cb];
      },
  }
}

const socket = dataScoket();

socket.on('print', (value) =>{ console.log(value)});

socket.emit('print', 'ashad')




///
// Write a generic curry(fn) that works for any arity, and a compose(...fns) / pipe(...fns) utility.
// Example: curry((a,b,c)=>a+b+c)(1)(2)(3) === 6 and curry(...)(1,2)(3) === 6 (must support partial application in any grouping).

const curryFunction = (cb : (...value : number[]) => void) => {
  const argsArray : number[] = [];

  const executionFunction = (value : number) => {
      argsArray.push(value);
      cb(...argsArray);
      return executionFunction;
  }

  return executionFunction


}

let curryFunctionExecutor = curryFunction((...args : number[]) => {
  let sum = args.reduce((a, b) => a+b, 0);
  console.log(sum);
})
curryFunctionExecutor(1);
curryFunctionExecutor(2);
curryFunctionExecutor(3);









