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
  const prototype: any = Object.getPrototypeOf(from);
  const keys = Object.getOwnPropertyNames(prototype)
    .filter((it) => it !== "constructor")
    .concat("interceptors", "defaults");
  for (const key of keys) {
    if (key === "interceptors" || key === "defaults") {
      (to as any)[key] = (from as any)[key];
    } else {
      (to as any)[key] = prototype[key] as any;
    }
  }
  return to as T & U;
}

export function deepMerge(...objs: any[]): any {
  const result = Object.create(null);

  objs.forEach((obj) => {
    if (obj) {
      Object.keys(obj).forEach((objKey) => {
        const val = obj[objKey];
        if (isPlainObject(val)) {
          if (isPlainObject(result[objKey])) {
            result[objKey] = deepMerge(result[objKey], val);
          }
          result[objKey] = deepMerge(val);
        } else {
          result[objKey] = val;
        }
      });
    }
  });

  return result;
}
