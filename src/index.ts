import { AxiosRequestConig } from "./types";
import xhr from "./xhr";

function axios(config: AxiosRequestConig) {
  xhr(config);
}

export default axios;
