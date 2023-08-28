const AsyncFunction = Object.getPrototypeOf(async function () {}).constructor;

export function is(val: unknown, type: string) {
  return toString.call(val) === `[object ${type}]`;
}
export function isPromise<T = any>(val: unknown): val is Promise<T> {
  return (
    is(val, 'Promise') &&
    val instanceof Promise &&
    [val.then, val.catch, val.finally].every(isFunction)
  );
}



export function isFunction(val: unknown): val is Function {
  return typeof val === 'function';
}

export function isAsyncFunction(val: unknown): val is Function {
  return val instanceof AsyncFunction;
}