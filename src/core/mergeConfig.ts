import { deepMerge, isPlainObject } from "../helpers/util";
import { AxiosRequestConfig } from "../types";
const strats = Object.create(null);

// 默认合并策略 右边覆盖左边
function defaultStrat(val1: any, val2: any): any {
  return typeof val2 === "undefined" ? val1 : val2;
}

// 只取val2
function fromVal2Strat(val1: any, val2: any): any {
  if (typeof val2 !== "undefined") return val2;
}

// 用于headers复杂对象类型
function deepMergeStrat(val1: any, val2: any): any {
  if (isPlainObject(val2)) {
    return deepMerge(val1, val2);
  } else if (typeof val2 !== "undefined") {
    return val2;
  } else if (isPlainObject(val1)) {
    return deepMerge(val1);
  } else if (typeof val1 !== "undefined") {
    return val1;
  }
}

const stratKeysDeepMerge = ["headers"];

stratKeysDeepMerge.forEach((key) => {
  strats[key] = deepMergeStrat;
});

// 这些属性只要val2传了，就去val2
const stratKeysFromVal2 = ["url", "data", "params"];

stratKeysFromVal2.forEach((key) => {
  strats[key] = fromVal2Strat;
});

export default function mergeConfig(
  config1: AxiosRequestConfig,
  config2?: AxiosRequestConfig
): AxiosRequestConfig {
  if (!config2) config2 = {};
  const config = Object.create(null);
  // 不同字段有不同的合并策略

  for (const key in config2) {
    mergeField(key);
  }

  for (const key in config1) {
    if (!config2[key]) mergeField(key);
  }

  function mergeField(key: string): void {
    const strat = strats[key] || defaultStrat;
    config[key] = strat(config1[key], config2![key]);
  }
  return config;
}
