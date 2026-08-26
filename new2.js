//Build a minimal observable. createObservable(subscribeFn) where subscribeFn(observer) wires up a source and returns a teardown function. Support .subscribe(observer), .map(fn), and .filter(pred) — each operator returns a new observable. Critically: when the final subscriber unsubscribes, teardown must propagate all the way up the chain so the source (e.g. an interval) is actually cleaned up — no leaks. If there's time, add .debounce(ms).

function createObservable(subscribeFn) {
  return {
    subscribe(observer) {},

    map(fn) {
       // TODO: return a NEW observable forwarding only values where
    },

    filter(predicate) {
      // TODO: return a NEW observable forwarding only values where
      // predicate(value) is true.
    },

    // Stretch: debounce(ms) — emit a value only after ms of quiet.
  };
}

// ===== Harness — an interval source you can run against =====
const interval = createObservable((observer) => {
  let i = 0;

  const id = setInterval(() => {
    observer.next(i++);
  }, 100);

  console.log("source: interval STARTED");

  return () => {
    clearInterval(id);
    console.log("source: interval TORN DOWN");
  };
});

const unsub = interval
  .map((x) => x * 2)
  .filter((x) => x % 4 === 0)
  .subscribe({
    next: (x) => console.log("got", x),
  });

// After 1s we unsubscribe. SUCCESS = you see "interval TORN DOWN"
// and the "got" logs STOP. If the interval keeps logging, you have a leak.
setTimeout(unsub, 1000);




function compose(...fns) {
    console.log(fns)
    if(fns?.length){
  
        let popfn =fns.pop();
              console.log('1', popfn)
        let value = compose(...fns);
         return function (x) {
        return value(popfn(x));
    };
    }
    else{return (x) =>{
        return x
    }}
    
}

const add1 = x => x + 1;
const double = x => x * 2;
const square = x => x * x;

console.log(compose(square, double, add1)(3)); // square(double(add1(3))) 




///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function once(fn) {
  let greeting = false;
  return () => {
    if (!greeting) {
      greeting = true;
      fn();
    }
  };
}

const greet = once(() => {
  console.log("Hello");
});

greet();
greet();
greet();

function createBankAccount(initialBalance) {
  let balance = initialBalance;
  return {
    deposit(value) {
      balance = balance + value;
    },
    withdraw(value) {
      balance = balance - value;
    },
    getBalance() {
      return balance;
    },
  };
}

const account = createBankAccount(100);

account.deposit(50);

account.withdraw(20);

console.log(account.getBalance()); //130

// ===== Harness =====
function debounce(fn, ms) {
  let currentActiveId = null;
  return (v) => {
    if (currentActiveId) clearTimeout(currentActiveId);
    currentActiveId = setTimeout(() => {
      fn(v);
    }, ms);
  };

  // TODO: return a function that delays calling fn until `ms` have
  // passed with no new calls. Must forward args and preserve `this`.
}

// ===== Harness =====
let calls = 0;
const log = debounce((x) => {
  calls++;
  console.log("called with", x, "total calls:", calls);
}, 200);

log(1);
log(2);
log(3);

function throttle(fn, ms) {
  let setTimeOutId = null;
  let evalutaton = false;

  return () => {
    if (evalutaton) {
    } else {
      evalutaton = true;
      setTimeOutId = setTimeout(() => {
        fn();
        clearTimeout(setTimeOutId);
        evalutaton = false;
      }, ms);
    }
  };
}

// ===== Harness =====
let count = 0;
const tick = throttle(() => {
  count++;
  console.log("tick", count, "at", Date.now() % 10000);
}, 100);

const id = setInterval(tick, 20);
setTimeout(() => {
  clearInterval(id);
  // SUCCESS = count is roughly 5-6, NOT 25
  console.log("final count (expect ~5-6):", count);
}, 500);

function memoize(fn) {
  // TODO: return a memoized version of fn. Must work for fns with
  // MULTIPLE arguments (not just one), not just fn.length === 1.

  let hashArr = {};
  let hash = "";

  return (a, b) => {
    hash = `${a}_${b}`;
    if (!hashArr?.[hash]) {
      let res = fn(a, b);
      hashArr[hash] = res;
      return res;
    }
    return hashArr?.[hash];
  };
}

// ===== Harness =====
let realCalls = 0;
const slowAdd = (a, b) => {
  realCalls++;
  return a + b;
};
const fastAdd = memoize(slowAdd);

console.log(fastAdd(2, 3)); // 5
console.log(fastAdd(2, 3)); // 5, should NOT increment realCalls
console.log(fastAdd(4, 1)); // 5, different args, new computation
console.log("real calls (expect 2):", realCalls);

function deepClone(value) {
  // 1. Primitive values (or null)
  if (value === null || typeof value !== "object") {
    return value;
  }

  // 2. Date
  if (value instanceof Date) {
    return new Date(value.getTime());
  }

  // 3. Array
  if (Array.isArray(value)) {
    const arr = [];

    value.forEach((item, index) => {
      arr[index] = deepClone(item);
    });

    return arr;
  }

  // 4. Plain Object
  const obj = {};

  Object.entries(value).forEach(([key, val]) => {
    obj[key] = deepClone(val);
  });

  return obj;
}

// ===== Harness =====
const original = {
  name: "test",
  date: new Date(2024, 0, 1),
  nested: { arr: [1, 2, { deep: true }] },
};

const clone = deepClone(original);
clone.nested.arr[2].deep = false;
clone.date.setFullYear(1999);

console.log("original untouched:", original.nested.arr[2].deep); // true
console.log("original date untouched:", original.date.getFullYear()); // 2024
console.log("clone.date is real Date:", clone.date instanceof Date); // true

const obj = {
  name: "obj",
  regular: function () {
    console.log("regular:", this.name);
  },
  arrow: () => {
    console.log("arrow:", this.name);
  },
  delayed: function () {
    setTimeout(function () {
      console.log("delayed:", this.name);
    }, 10);
  },
  delayedArrow: function () {
    setTimeout(() => {
      console.log("delayedArrow:", this.name);
    }, 10);
  },
};

// TODO: predict the output of EACH line below before running it.
obj.regular(); // undefined
obj.arrow(); //name
obj.delayed(); //undefined
obj.delayedArrow(); //undefined

const detached = obj.regular; //
detached(); //name // predict this too — what logs, or does it throw?

const reattached = obj.regular.bind(obj);
reattached(); // name





class MyPromise {
  constructor(executor) {
    // TODO: implement pending/fulfilled/rejected states,
    // store value/reason, support resolve/reject called
    // sync or async inside executor.
  }

  then(onFulfilled, onRejected) {
    // TODO: must return a NEW MyPromise to support chaining.
    // Must run callbacks asynchronously (microtask-like timing)
    // even if the promise is already settled.
  }
}

// ===== Harness =====
const log2 = [];

new MyPromise((resolve) => {
  log2.push("executor start");
  resolve(1);
  log2.push("executor end");
})
  .then((val) => {
    log2.push("then1: " + val);
    return val + 1;
  })
  .then((val) => {
    log2.push("then2: " + val);
  });

log2.push("sync code end");

setTimeout(() => {
  // SUCCESS order: ["executor start","executor end","sync code end","then1: 1","then2: 2"]
  console.log(log2);
}, 0);




function outer() {
    let count = 0;
  
    return {
      inc() {
        count++;
      },
      get() {
        return count;
      }
    };
  }
  
  const a = outer();
  const b = outer();
  
  a.inc(); 
  a.inc();
  
  b.inc();
  
  console.log(a.get()); // 2
  console.log(b.get()); //1






  function myPromise(executor) {
    let state = "pending";
    let value;
    let handlers = [];

    function resolve(result) {
        if (state !== "pending") return;

        state = "fulfilled";
        value = result;

        queueMicrotask(() => {
            handlers.forEach((handler) => handler(value));
            handlers = [];
        });
    }

    function reject(error) {
        if (state !== "pending") return;

        state = "rejected";
        value = error;
    }

    executor(resolve, reject);

    return {
        then(callback) {
            if (state === "fulfilled") {
                queueMicrotask(() => callback(value));
            } else if (state === "pending") {
                handlers.push(callback);
            }

            return this; // Only for this minimal implementation
        },
    };
}


Array.prototype.myReduce = function (fn, initialValue){
    var acc = initialValue;
    for(let i =0 ; i< this.length; i++){
        acc = fn(acc, this[i]);
    }
    return acc
}

let value = [2,3,4].myReduce((acc, value) =>{return acc = acc+ value}, 0);
console.log(value);







// function Box(value) {
//     let name = "ashad";
  
//     const fn = () => {
//       console.log(name);
//     };
  
//     return { name, fn };
//   }
  
//   Box.prototype.sayName = function () {
//     console.log("hey name is", this.name);
//   };
  
//   const b = new Box("abbas");
  
//   b.fn();
//   b.sayName();
  
//   Now let's analyze what actually happens.
  
//   Step 1: new Box("abbas")
  
//   Normally, new does something like:
  
//   const obj = {};
//   Object.setPrototypeOf(obj, Box.prototype);
//   const result = Box.call(obj, "abbas");
  
//   Inside Box:
  
//   let name = "ashad";
  
//   const fn = () => {
//     console.log(name);
//   };
  
//   return { name, fn };
  
//   Notice something very important:
  
//   You explicitly return an object.
  
//   That means new does not return obj.
  
//   Instead, it returns the object you returned.
  
//   So:
  
//   const b = new Box("abbas");
  
//   is effectively:
  
//   const b = {
//     name: "ashad",
//     fn: /* closure */
//   };
//   Step 2: What about the prototype?
  
//   This is the tricky part.
  
//   When a constructor returns its own object, that returned object is not automatically linked to Box.prototype.
  
//   So:
  
//   b.sayName
  
//   is
  
//   undefined
  
//   Therefore:
  
//   b.sayName();
  
//   throws
  
//   TypeError: b.sayName is not a function
//   Let's verify mentally
  
//   b is:
  
//   {
//     name: "ashad",
//     fn: () => {
//       console.log(name);
//     }
//   }
  
//   Its prototype is:
  
//   Object.prototype
  
//   Not
  
//   Box.prototype
  
//   because your constructor returned a different object.
  
//   b.fn()
  
//   This works.
  
//   The closure remembers:
  
//   let name = "ashad";
  
//   So:
  
//   b.fn();
  
//   prints
  
//   ashad
//   b.sayName()
  
//   Fails.
  
//   TypeError: b.sayName is not a function

function CustomPromise(executor) {
  let state = 'pending'; // 'pending' | 'fulfilled'
  let value = null;
  let callbackArray = [];

  function resolve(v) {
    // 1. Only resolve if state is currently 'pending'
    if (state !== 'pending') return;

    state = 'fulfilled';
    value = v;

    // 2. Run queued callbacks asynchronously on the microtask queue
    queueMicrotask(() => {
      callbackArray.forEach((cb) => cb(value));
    });
  };
  
    executor(resolve);
    
  // 4. Return an object containing the .then method
  return {
     then : function (thenCallback) {
    // Explicitly reference THIS parent promise's callbackArray
    const parentCallbacks = callbackArray;

    const childExecutor = (resolveChild) => {
      const handleCallback = () => {
        const result = thenCallback(value);

        if (result && typeof result.then === 'function') {
          result.then(resolveChild);
        } else {
          resolveChild(result);
        }
      };

      // Pushes the handler directly into parentCallbacks!
      parentCallbacks.push(handleCallback);
    };

    return CustomPromise(childExecutor);
  }
  };
}

// Example usage:
const p = CustomPromise((resolve) => {
  setTimeout(() => resolve('Data loaded!'), 1000);
});

p.then((res) => {
  console.log(res); // "Data loaded!"
  return 'Transformed data';
}).then((res2) => {
  console.log(res2); // "Transformed data"
});







// ===== Observable Implementation =====
function createObservable(subscribeFn) {
  return {
    subscribe(observer) {
      // TODO: call subscribeFn with observer, return teardown
      // Guard against missing teardown, error, complete
        try{
          subscribeFn(observer);
        }
        catch(err){
          if(observer.error) observer.error(err)
        }
    },
    map(fn) {
      // TODO: Return a NEW observable that transforms each value
      // Must subscribe to source (this) and pass transformed values
      // Forward errors and completion
      return createObservable((observer) => {
        return this.subscribe({
          next: (value) => {
            observer.next(fn(value)); // Pass transformed value to the NEW observer
          },
          error: (err) => {
            if (observer.error) observer.error(err);
          },
          complete: () => {
            if (observer.complete) observer.complete();
          }
        });
      }); // replace
    },
    filter(predicate) {
      // TODO: Return a NEW observable that only forwards values
      // where predicate(value) is true
      // Must subscribe to source (this)
      return createObservable(() => () => {}); // replace
    },
  };
}

// ===== Harness =====
// Create an observable that emits user objects
const users = createObservable((observer) => {
  const data = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 17 },
    { name: 'Charlie', age: 30 },
    { name: 'Diana', age: 16 },
    { name: 'Eve', age: 22 }
  ];
  
  console.log('source: users DATA STARTED');
  let index = 0;
  
  const id = setInterval(() => {
    if (index < data.length) {
      observer.next(data[index++]);
    } else {
      if (observer.complete) observer.complete();
      clearInterval(id);
    }
  }, 500);
  
  return () => {
    clearInterval(id);
    console.log('source: users DATA TORN DOWN');
  };
});

// TODO: Complete this chain
// 1. Map to get only the name of each user (map user => user.name)
// 2. Filter to only get names that start with a vowel (A, E, I, O, U)
// 3. Subscribe and log the names

// const unsub = users
//   // TODO: Add map here
//   // TODO: Add filter here
//   .subscribe({ 
//     next: (value) => console.log('got', value),
//     complete: () => console.log('COMPLETE!')
//   });

// // Unsubscribe after 3 seconds
// setTimeout(unsub, 3000);

// Expected output:
// source: users DATA STARTED
// got Alice
// got Eve
// COMPLETE!
// source: users DATA TORN DOWN




// ============================================================
// IMPLEMENTATION: Observable with Operators
// ============================================================

function createObservable(subscribeFn) {
  return {
    subscribe(observer) {

        try{
          subscribeFn(observer)
        }
        catch(err){
          if(observer.error) observer.error(err)
        }
      finally{
        if(observer.complete) observer.complete();
      }
      // TODO: Subscribe to the source
      // - Handle both object and function observers
      // - Return subscription object with unsubscribe()
    },

    map(fn) {
        return createObservable((observer) =>{
          this.subscribe({
            next : (v) => {observer.next(fn(v))}
          })
        })
      // TODO: Return a NEW observable that applies fn to each value
      // - Create new observable that wraps this observable
      // - Forward transformed values to new observer
    },

    filter(predicate) {
      return createObservable((observer) =>{
        this.subscribe({
          next : (v) => {
            if(predicate(v)){
              observer.next(v)
            }
            else{
              () => {}
            }
          }
        })
      })
      // TODO: Return a NEW observable that only passes values where predicate is true
      // - Create new observable that wraps this observable
      // - Only forward values that pass the predicate
    },

    take(n) {
      // TODO: Return a NEW observable that completes after n values
      // - Create new observable that wraps this observable
      // - Count values and complete after n
    },

    // Stretch: debounce(ms)
    debounce(ms) {
      // TODO: Return a NEW observable that emits after ms of silence
      // - Use setTimeout to delay emission
      // - Reset timer on each new value
    },

    // Stretch: throttle(ms)
    throttle(ms) {
      // TODO: Return a NEW observable that emits at most once per ms
      // - Use setTimeout to control emission rate
    }
  };
}

// ============================================================
// TEST HARNESS 1: Interval Source (from original question)
// ============================================================

const interval = createObservable((observer) => {
  let i = 0;
  const id = setInterval(() => {
    observer.next(i++);
  }, 100);

  console.log("source: interval STARTED");

  return () => {
    clearInterval(id);
    console.log("source: interval TORN DOWN");
  };
});

console.log("\n=== TEST 1: Interval with map, filter, take ===");
const unsub1 = interval
  .map((x) => x * 2)
  .filter((x) => x % 4 === 0)
  .take(3)
  .subscribe({
    next: (x) => console.log("got", x),
    complete: () => console.log("✅ Complete! Should see TORN DOWN"),
    error: (err) => console.error("❌ Error:", err)
  });

setTimeout(unsub1, 1000);




const promiseArray = [];

for(let i = 1; i < 10; i++){
    promiseArray.push(() =>{
      return  new Promise((res, rej) =>{
        setTimeout(() => {
            console.log(i);  // Log when resolved
            res(i);          // Resolve with the value i
        }, i * 1000)
    })
    })
}

class concurrentArray{
    constructor(promiseArray, count){
        this.total = count;
        this.currentCount = 0;
        this.currentIndex = 0;
        this.promiseArray = promiseArray
    }
    
    
    execute = () =>{
        let index = this.currentIndex;
        if(this.currentCount < this.total && index < promiseArray.length){
            let fn = this.promiseArray[index]
            
            fn().then(() => {
                this.currentCount--;
                this.execute()
            });
            this.currentCount++;
            this.currentIndex++;
            this.execute();
        }
    } 
    
}


const promiseClass = new concurrentArray(promiseArray, 5);
promiseClass.execute();


const deepClone = (obj, weakMap = new WeakMap()) => {
  if (obj === null || typeof obj !== 'object') return obj; 
  
  if(weakMap.has(obj))return weakMap.get(obj)
  
   if (obj instanceof Date) return new Date(obj);
  if (obj instanceof RegExp) {
      let newvalue = new RegExp(obj.source, obj.flags);
      weakMap.set(obj, newvalue);
      return new RegExp(obj.source, obj.flags);
  }
  
  if(obj instanceof Map){
      weakMap.set(obj, new Map);
      for([key, value] of obj){
          
      }
  }
  
}


class LRUCache {
  constructor(capacity) {
      this.capacity = capacity;
      this.cache = new Map();
  }
  get(key) {
      if (!this.cache.has(key)) return -1;
      const val = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, val);
      return val;
  }
  put(key, value) {
      if (this.cache.has(key)) this.cache.delete(key);
      else if (this.cache.size >= this.capacity) {
          this.cache.delete(this.cache.keys().next().value);
      }
      this.cache.set(key, value);
  }
}



////////////////////////////////////////////////////////////PROMISE//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function CustomPromise(executor) {
  let state = 'pending'; // 'pending' | 'fulfilled'
  let value = null;
  let callbackArray = [];

  function resolve(v) {
    // 1. Only resolve if state is currently 'pending'
    if (state !== 'pending') return;

    state = 'fulfilled';
    value = v;

    // 2. Run queued callbacks asynchronously on the microtask queue
    queueMicrotask(() => {
      callbackArray.forEach((cb) => cb(value));
    });
  };
  
    executor(resolve);
    
  // 4. Return an object containing the .then method
  return {
     then : function (thenCallback) {
    // Explicitly reference THIS parent promise's callbackArray
    const parentCallbacks = callbackArray;

    const childExecutor = (resolveChild) => {
      const handleCallback = () => {
        const result = thenCallback(value);

        if (result && typeof result.then === 'function') {
          result.then(resolveChild);
        } else {
          resolveChild(result);
        }
      };

      // Pushes the handler directly into parentCallbacks!
      parentCallbacks.push(handleCallback);
    };

    return CustomPromise(childExecutor);
  }
  };
}

// Example usage:
const p = CustomPromise((resolve) => {
  setTimeout(() => resolve('Data loaded!'), 1000);
});

p.then((res) => {
  console.log(res); // "Data loaded!"
  return 'Transformed data';
}).then((res2) => {
  console.log(res2); // "Transformed data"
});





//implementing procise all

const promiseArray = [];

let value = 0;

while(value < 5){
    let newv = value
    promiseArray.push(() => {
        return new Promise((res, rej) => {
        setTimeout(() => {
            res(JSON.parse(JSON.stringify(newv)))
        }, value* 1000)
        
    }) 
    } );
    value++;
};

function customPromiseAll(promiseArray){
    return new Promise((res, rej) => {
    let responseArr = {};
    let resolvedCount = 0;
    
    
    promiseArray.forEach((promisefn, index) => {
        let promiseInstance = promisefn();
    promiseInstance.then((v) => {
        responseArr[index] = v
        resolvedCount++;
        if(resolvedCount === promiseArray?.length){
                res(Object.values(responseArr));
                
        }
    });
    promiseInstance.catch((e) => {
        rej(e);
    })
    });
    });
};

customPromiseAll(promiseArray).then(v => console.log(v))


//custom call 

let obj = {
  name : 'ashad'
};

function printName(age){
  console.log(`${this.name} age is ${age}`)
};

Function.prototype.customCall = function(obj, ...args){
 let key = 'fn';
 obj[key] = this;
 let result = obj[key](args);
 return result
}

printName.customCall(obj, 10)

//




Function.prototype.customBind = function (context, ...args){
let newContext = context;
let key = 'fnkey';
newContext[key] = this;
return  () => {
    newContext[key](...args)
    
}
}

let custp = executor.customBind(object, 10);
custp();


//deep cloneeee

const obj = {
    
  value : 1,
  date : new Date(),
  arr : [1,2,4,12,41],
    address: {
  city: "Delhi"
},
  objec : {
      'a' : 'asc',
      'b' : 'bsc',
      'c' : 'asd'
  }
}

let map = new Map();
map.set('a', 'asdasc');
map.set(1, 'afsc');
map.set(obj , 'asdasd');

obj.someMa = map;


obj.address.owner = obj;
let weakmap = new WeakMap();


const newDeepClone = (value, tempweakmap) => {
  
  if(value === null ||  value === undefined || typeof value === 'string' || typeof value === 'number'){
      return value;
  }
  if(tempweakmap.get(value)){
      return tempweakmap.get(value);
      
  }
  if(value instanceof Date){
   const copy = new Date(value.getTime());
  tempweakmap.set(value, copy);
  return copy;
      
      
  }
  
  
  if (value instanceof Map) {
      let returnvalue = new Map();
      tempweakmap.set(value, returnvalue);
     // console.log(value)
      for(const [key, val] of value){
          let returnVal = newDeepClone(val, tempweakmap);
          returnvalue.set(key, returnVal);
      }
      return returnvalue
      
      
  }
  if(value instanceof Array){
       let returnvalue = [];
      tempweakmap.set(value, returnvalue);
      value.forEach((newValue) =>{
          let newV = newDeepClone(newValue, tempweakmap);
          returnvalue.push(newV);
      })
      return returnvalue
  }
 
   if(value instanceof Object){
       let returnvalue = {}
       tempweakmap.set(value, returnvalue);
      Object.entries(value).forEach(([key, newValue]) =>{
          returnvalue[key] = newDeepClone(newValue, tempweakmap);
          
      });
        return returnvalue
  }

  
}

let clonedObj = newDeepClone(obj, weakmap);
console.log(clonedObj);


///function currinyyyy////////////////////////////////////////////////////////////////////



function myCustomCurr(...args){
        
  let allArguments = args;
  

  
  function executor(allArguments = []){
      const value = allArguments.reduce((acc, v) => acc = acc + v ,  0);
      console.log(value)
  };
  
  return function(v) {
      const parentArgs = allArguments;
      if(v){
          console.log(v,parentArgs )
          return myCustomCurr(v,...parentArgs);
      }
      else{
         executor(allArguments) 
      }
      
      
  }


}

myCustomCurr(10, 20)(40)()




//custom Bind

export function executor(value){
  let v =  `${this?.name}, age is ${value}`
  console.log(v);
  return v
}

const object = {
  name : 'ashad'
}












const Mypromise = (fn => {


  let status = 'pending'
  let finalResult = null;
  let afterFunction = null;
  
  
  
  const res = (result) => {
      if(status === 'pending'){
          status = 'fulfilled';
          if(afterFunction){
              let res = afterFunction(result);
              finalResult = res
          }
          else{
              finalResult = result
          }
      }
      return result;
  }
  
  
  fn(res);
  
  return {
      then : (thenfn) => {
          return Mypromise((res) => {
              if(status === 'resolved'){
                  res(thenfn(res)); 
              }
              else{
                  afterFunction = (result) => {
                      res(thenfn(result));
                  }
              }
          })
      }
  }
  })
  
  
  
  const myP = Mypromise((res) => {
      setTimeout(() => {
          res(10);
      }, 2000)
  });
  myP.then((v) => v*2).then(k => console.log(k));
  
  
  
  








  const customAllSettled = (promiseArr) => {
    let result = new Array(promiseArr.length);
    let resolvedCount = 0;

    return new Promise((res, rej) => {
        promiseArr.forEach((promise, index) => {
            promise?.then((v) => {
                result[index] = {status : 'completed', value :v};
                resolvedCount++;
                if(resolvedCount === promiseArr?.length){
                    let obj = {} ;
                    result.forEach((v, index)=>{
                        obj[index] = v;
                    });
                    res(obj);
                }
            });
            promise?.catch((v) => {
                result[index] = {status : 'failed', value : undefined};
                resolvedCount++;
                if(resolvedCount === promiseArr?.length){
                    let obj = {} ;
                    result.forEach((v, index)=>{
                        obj[index] = v;
                    });
                    res(obj);
                }
            });
        })
    });
    }


    const promisearr = [
        new Promise((res) => {
            setTimeout(() => {
                res(10)
            }, 3000)
        }),
        new Promise((res, rej) => {
            setTimeout(() => {
                setTimeout(() => {
                console.log('xx')
                res(40)
            }, 4000)
              
            }, 2000)
        }),
         new Promise((res) => {
            setTimeout(() => {
                console.log('xx')
                res(40)
            }, 4000)
        })
        ];

    let res = customAllSettled(promisearr);
    res.then((v) => {console.log(v)})






