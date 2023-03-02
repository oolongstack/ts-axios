import { isPlainObject } from "./util";

export function transformRequest(data: any): any {
  // formdata也是对象，避免转换formdata
  if (isPlainObject(data)) {
    return JSON.stringify(data);
  }
  return data;
}

export function transformResponse(data: any): any {
  // formdata也是对象，避免转换formdata
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch (error) {}
  }
  return data;
}
