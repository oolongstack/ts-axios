import { Interceptors } from "../core/Axios";

export type Method =
  | "GET"
  | "POST"
  | "DELETE"
  | "PUT"
  | "PATCH"
  | "OPTIONS"
  | "HEAD"
  | "get"
  | "post"
  | "delete"
  | "put"
  | "patch"
  | "options"
  | "head";
export interface AxiosRequestConfig {
  url?: string;
  method?: Method;
  headers?: any;
  data?: any;
  params?: any;
  responseType?: XMLHttpRequestResponseType;
  timeout?: number;
}

export interface AxiosResponse<T = any> {
  data: T;
  status: number;
  statusTest: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

export interface AxiosError extends Error {
  isAxiosError: boolean;
  config: AxiosRequestConfig;
  code?: string | null;
  request?: any;
  response?: AxiosResponse;
}

export interface Axios {
  interceptors: Interceptors;
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>;
  post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
  put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
  patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): AxiosPromise<T>;
}

export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>;
  <T = any>(url: string, config: AxiosRequestConfig): AxiosPromise<T>;
}

export interface AxiosInterceptorManager {
  use(resolved: ResolvedFn, rejected: RejectedFn): number;
  eject(id: number): void;
}

export interface ResolvedFn<T = AxiosRequestConfig> {
  (val: T): T | Promise<T>;
}

export interface RejectedFn {
  (error: any): any;
}
