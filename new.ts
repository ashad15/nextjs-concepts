// ============================================================
// 1. OBSERVABLE
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

function createObservable<T>(
  subscribeFn: SubscribeFn<T>
): Observable<T> {
  return {
    subscribe(observer: Observer<T>): Teardown {
      const teardown = subscribeFn(observer);

      return teardown ?? (() => {});
    },

    map<U>(fn: (value: T) => U): Observable<U> {
      return createObservable<U>((observer) => {
        return this.subscribe({
          next: (value) => {
            try {
              observer.next(fn(value));
            } catch (err) {
              observer.error?.(err);
            }
          },

          error: (err) => {
            observer.error?.(err);
          },

          complete: () => {
            observer.complete?.();
          },
        });
      });
    },

    filter(
      predicate: (value: T) => boolean
    ): Observable<T> {
      return createObservable<T>((observer) => {
        return this.subscribe({
          next: (value) => {
            try {
              if (predicate(value)) {
                observer.next(value);
              }
            } catch (err) {
              observer.error?.(err);
            }
          },

          error: (err) => {
            observer.error?.(err);
          },

          complete: () => {
            observer.complete?.();
          },
        });
      });
    },
  };
}


// Test Observable

const interval = createObservable<number>((observer) => {
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

setTimeout(unsub, 1000);


// ============================================================
// 2. CUSTOM PROMISE.ALL
// ============================================================

const customPromiseAll = (
  promises: Promise<unknown>[]
): Promise<unknown[]> => {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results: unknown[] = [];
    let completed = 0;

    promises.forEach((promise, index) => {
      promise
        .then((value) => {
          results[index] = value;
          completed++;

          if (completed === promises.length) {
            resolve(results);
          }
        })
        .catch((error: unknown) => {
          reject(error);
        });
    });
  });
};


// ============================================================
// 3. LRU CACHE
// ============================================================

function customLRUCache(capacity: number = 5) {
  const cache: [string, unknown][] = [];

  return {
    put(key: string, value: unknown): void {
      const index = cache.findIndex(
        ([existingKey]) => existingKey === key
      );

      // Existing key
      if (index !== -1) {
        cache.splice(index, 1);
      }

      // Remove least recently used
      if (cache.length >= capacity) {
        cache.shift();
      }

      cache.push([key, value]);
    },

    get(key: string): unknown | undefined {
      const index = cache.findIndex(
        ([existingKey]) => existingKey === key
      );

      if (index === -1) {
        return undefined;
      }

      const entry = cache[index];

      // Move to most recently used
      cache.splice(index, 1);
      cache.push(entry);

      return entry[1];
    },
  };
};


// Example

const lru = customLRUCache(3);

lru.put("a", 1);
lru.put("b", 2);
lru.put("c", 3);

console.log(lru.get("a")); // 1

lru.put("d", 4);

console.log(lru.get("b")); // undefined


// ============================================================
// 4. TRANSACTION
// ============================================================

interface Transaction {
  begin(): void;
  set(key: string, value: number): void;
  get(key: string): number | undefined;
  rollback(): void;
  commit(): void;
}

function transactionLayer(): Transaction {
  type Layer = Record<string, number>;

  const stack: Layer[] = [{}];

  return {
    begin(): void {
      stack.push({});
    },

    set(key: string, value: number): void {
      const currentLayer = stack[stack.length - 1];

      currentLayer[key] = value;
    },

    get(key: string): number | undefined {
      // Search from newest transaction to oldest
      for (let i = stack.length - 1; i >= 0; i--) {
        if (key in stack[i]) {
          return stack[i][key];
        }
      }

      return undefined;
    },

    rollback(): void {
      if (stack.length > 1) {
        stack.pop();
      }
    },

    commit(): void {
      if (stack.length <= 1) {
        return;
      }

      const currentLayer = stack.pop();

      if (!currentLayer) {
        return;
      }

      const parentLayer = stack[stack.length - 1];

      Object.assign(parentLayer, currentLayer);
    },
  };
}


// Example

const transaction = transactionLayer();

transaction.set("x", 1);

transaction.begin();

transaction.set("x", 2);

transaction.begin();

transaction.set("x", 3);

transaction.rollback();

console.log(transaction.get("x")); // 2

transaction.commit();

console.log(transaction.get("x")); // 2


// ============================================================
// 5. SIMPLE EVENT SOCKET
// ============================================================

type Callback = (...args: unknown[]) => void;

function dataSocket() {
  const callbacks: Record<string, Callback[]> = {};

  return {
    on(event: string, callback: Callback): void {
      if (!callbacks[event]) {
        callbacks[event] = [];
      }

      callbacks[event].push(callback);
    },

    emit(event: string, ...args: unknown[]): void {
      callbacks[event]?.forEach((callback) => {
        callback(...args);
      });
    },
  };
}


// Example

const socket = dataSocket();

socket.on("print", (value: unknown) => {
  console.log(value);
});

socket.emit("print", "ashad");


// ============================================================
// 6. CURRY
// ============================================================

function curry<T extends unknown[], R>(
  fn: (...args: T) => R
) {
  function curried(...args: unknown[]): unknown {
    if (args.length >= fn.length) {
      return fn(...(args as T));
    }

    return (...nextArgs: unknown[]) => {
      return curried(...args, ...nextArgs);
    };
  }

  return curried;
}
