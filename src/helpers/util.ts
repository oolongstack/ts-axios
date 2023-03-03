const toString = Object.prototype.toString;

export function isDate(val: any): val is Date {
  return toString.call(val) === "[object Date]";
}

export function isObject(val: any): val is Object {
  return typeof val === "object" && val !== null;
}

export function isPlainObject(val: any): val is Object {
  return toString.call(val) === "[object Object]";
}

/**
 * 将属性从from拷贝到to
 * @param to
 * @param from
 */
export function extend<T, U>(to: T, from: U): T & U {
  // console.log(from);

  const prototype: any = Object.getPrototypeOf(from);
  const keys = Object.getOwnPropertyNames(prototype)
    .filter((it) => it !== "constructor")
    .concat("interceptors");
  for (const key of keys) {
    // console.log(key);
    if (key === "interceptors") {
      (to as any)[key] = (from as any)[key];
    } else {
      (to as any)[key] = prototype[key] as any;
    }
  }
  return to as T & U;
}
