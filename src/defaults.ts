import { AxiosRequestConfig } from "./types";

const defaults: AxiosRequestConfig = {
  method: "get",
  timeout: 0,
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
    },
  },
};

const methodsNoData = ["delete", "get", "head", "options"];
methodsNoData.forEach((method) => {
  defaults.headers[method] = {};
});

const methodsWhitData = ["post", "put", "patch"];

methodsWhitData.forEach((method) => {
  defaults.headers[method] = {
    "Content-Type": "application/x-www-form-urlencoded",
  };
});

export default defaults;
