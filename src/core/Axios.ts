import {
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from "../types";
import dispatchRequest from "./dispatchRequest";
import { InterceptorManager } from "./interceptorManager";
export interface Interceptors {
  request: InterceptorManager<AxiosRequestConfig>;
  response: InterceptorManager<AxiosResponse>;
}

class Axios {
  public interceptors: Interceptors;
  constructor() {
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

    // 拦截器相关逻辑
    const chain = [];
    return dispatchRequest(config);
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
