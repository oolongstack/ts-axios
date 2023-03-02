import { createError } from "./helpers/error";
import { parseHeaders } from "./helpers/headers";
import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "./types";

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {
      data = null,
      url,
      method = "GET",
      headers,
      responseType,
      timeout,
    } = config;

    const request = new XMLHttpRequest();

    if (responseType) {
      request.responseType = responseType;
    }
    if (timeout) {
      request.timeout = timeout;
    }
    request.open(method.toUpperCase(), url, true);

    request.onreadystatechange = function () {
      // 4 到返回数据时了
      if (request.readyState !== 4) return;
      // if()
      const responseHeaders = parseHeaders(request.getAllResponseHeaders());
      const responseData =
        responseType !== "text" ? request.response : request.responseText;

      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusTest: request.statusText,
        headers: responseHeaders,
        config,
        request,
      };
      // 处理结果
      handleResponse(response);
    };

    request.onerror = function () {
      reject(createError("Network Error", config, null, request));
    };

    request.ontimeout = function () {
      reject(
        createError(
          `Timeout of ${timeout || 0} ms exceeded`,
          config,
          "ECONNABORTED",
          request
        )
      );
    };

    Object.keys(headers).forEach((name) => {
      if (data === null && name === "Content-Type") {
        delete headers[name];
      } else {
        request.setRequestHeader(name, headers[name]);
      }
    });
    request.send(data);

    function handleResponse(response: AxiosResponse) {
      if (response.status >= 200 && response.status < 300) {
        resolve(response);
      } else {
        reject(
          createError(
            `Request failed whit status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        );
      }
    }
  });
}
