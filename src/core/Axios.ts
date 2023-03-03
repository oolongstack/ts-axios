import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
  RejectedFn,
  ResolvedFn,
} from "../types";
import dispatchRequest from "./dispatchRequest";
import { InterceptorManager } from "./interceptorManager";
import mergeConfig from "./mergeConfig";
export interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>;
  response: InterceptorManager<AxiosResponse>;
}
interface PromiseChain<T> {
  resolved: ResolvedFn<T> | ((config: AxiosRequestConfig) => AxiosPromise);
  rejected: RejectedFn | undefined;
}

class Axios {
  public defaults: AxiosRequestConfig;
  public interceptors: Interceptors;
  constructor(initConfig: AxiosRequestConfig) {
    this.defaults = initConfig;
    this.interceptors = {
      request: new InterceptorManager<AxiosRequestConfig>(),
      response: new InterceptorManager<AxiosResponse>(),
    };
  }
  // 函数重载
  public request(url?: any, config?: any): AxiosPromise {
    if (typeof url === "string") {
      if (!config) {
        config = {};
      }
      config.url = url;
    } else {
      // 第一个传的config
      config = url;
    }

    config = mergeConfig(this.defaults, config);
    // 拦截器相关逻辑
    const chain: PromiseChain<any>[] = [
      { resolved: dispatchRequest, rejected: undefined },
    ];
    if (this.interceptors.request) {
      this.interceptors.request.forEach((interceptor) => {
        chain.unshift({
          resolved: interceptor.resolved,
          rejected: interceptor.rejected,
        });
      });
    }
    if (this.interceptors.response) {
      this.interceptors.response.forEach((interceptor) => {
        chain.push({
          resolved: interceptor.resolved,
          rejected: interceptor.rejected,
        });
      });
    }
    let promise = Promise.resolve(config);

    while (chain.length) {
      const interceptor = chain.shift()!;
      promise = promise.then(interceptor.resolved, interceptor.rejected);
    }

    // console.log(chain, "this.chain");

    return promise;
  }
  public get(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWhitoutData(url, "GET", config);
  }
  public delete(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWhitoutData(url, "DELETE", config);
  }
  public head(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWhitoutData(url, "HEAD", config);
  }
  public options(url: string, config?: AxiosRequestConfig): AxiosPromise {
    return this._requestMethodWhitoutData(url, "OPTIONS", config);
  }
  public post(
    url: "string",
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this._requestMethodWhitData(url, "POST", data, config);
  }
  public put(
    url: "string",
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this._requestMethodWhitData(url, "PUT", data, config);
  }
  public patch(
    url: "string",
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise {
    return this._requestMethodWhitData(url, "PATCH", data, config);
  }
  // 无请求体的请求
  private _requestMethodWhitoutData(
    url: string,
    method: Method,
    config?: AxiosRequestConfig
  ) {
    return this.request(
      Object.assign({}, config, {
        url,
        method,
      })
    );
  }
  // 有请求体的请求
  private _requestMethodWhitData(
    url: string,
    method: Method,
    data?: any,
    config?: AxiosRequestConfig
  ) {
    return this.request(
      Object.assign({}, config, {
        url,
        method,
        data,
      })
    );
  }
}

export default Axios;
