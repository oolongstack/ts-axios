import { Method } from "../types";
import { deepMerge, isPlainObject } from "./util";

function normolizeHeaders(headers: any, normalizedName: string): void {
  if (!headers) return;
  Object.keys(headers).forEach((name) => {
    if (
      name !== normalizedName &&
      name.toLocaleUpperCase() === normalizedName.toLocaleUpperCase()
    ) {
      headers[normalizedName] = headers[name];
      delete headers[name];
    }
  });
}
export function processHeaders(headers: any, data: any): any {
  // 规范化
  normolizeHeaders(headers, "Content-Type");
  // data 为普通对象时 headers中的 content-type 为json
  if (isPlainObject(data)) {
    if (headers && !headers["Content-Type"]) {
      headers["Content-Type"] = "application/json;charset=utf-8";
    }
  }

  return headers;
}

export function parseHeaders(headersString: string): any {
  const parsed = Object.create(null);
  if (!headersString) return parsed;
  headersString.split("\r\n").forEach((line) => {
    let [key, val] = line.split(":");
    key = key.trim().toLowerCase();
    if (!key) return;
    if (val) {
      val = val.trim();
    }
    parsed[key] = val;
  });
  return parsed;
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) return headers;
  headers = deepMerge(headers.common, headers[method], headers);
  const methodsToDelete = [
    "get",
    "post",
    "delete",
    "patch",
    "put",
    "head",
    "options",
    "common",
  ];

  methodsToDelete.forEach((key) => {
    delete headers[key];
  });

  return headers;
}
