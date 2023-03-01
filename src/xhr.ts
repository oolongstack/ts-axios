import { AxiosRequestConig } from "./types";

export default function xhr(config: AxiosRequestConig): void {
  const { data = null, url, method = "GET" } = config;

  const request = new XMLHttpRequest();

  request.open(method.toUpperCase(), url, true);

  request.send(data);
}
