import type {
  AxiosError,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from "../types";
import xhr from "./xhr";
import { buildURL } from "../helpers/url";
import { transformRequest, transformResponse } from "../helpers/data";
import { processHeaders } from "../helpers/headers";

export default function dispatchRequest(
  config: AxiosRequestConfig
): AxiosPromise {
  processConfig(config);
  return xhr(config)
    .then((res: AxiosResponse) => {
      // then里面return 会自动包装一层promise
      return transformResponseData(res);
    })
    .catch((err: AxiosError) => {
      throw err;
    });
}
/**
 * 请求前处理下config
 * @param config
 */
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config);
  config.headers = transformHeaders(config); // 注意转换顺序
  config.data = transformRequestData(config);
}

function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config;
  return buildURL(url!, params);
}

function transformRequestData(config: AxiosRequestConfig): any {
  const { data } = config;
  return transformRequest(data);
}

function transformHeaders(config: AxiosRequestConfig): any {
  const { headers = {}, data } = config;
  return processHeaders(headers, data);
}

function transformResponseData(res: AxiosResponse): AxiosResponse {
  res.data = transformResponse(res.data);
  return res;
}
