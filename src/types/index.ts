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
export interface AxiosRequestConig {
  url: string;
  method?: Method;
  data?: any;
  params?: any;
}
