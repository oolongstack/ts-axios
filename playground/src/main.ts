import axios from "ts-axios";
// axios({
//   url: "/api/users",
//   method: "get",
//   params: {
//     page: 1,
//     size: 10,
//   },
// })
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// axios({
//   url: "/api/auth/login",
//   method: "post",
//   headers: {
//     "content-type": "application/json;charset=utf-8",
//   },
//   data: {
//     username: "cjl",
//     password: "123456",
//   },
// }).then((res) => {
//   console.log(res);
// });

// axios
//   .get("/api/users", {
//     params: {
//       page: 1,
//       size: 2,
//     },
//   })
//   .then((res) => {
//     console.log(res);
//   });
// 拦截器实例
// console.dir(axios);

axios.interceptors.request.use(
  (config) => {
    console.log("1 请求拦截成功回调", config);

    return config;
  },
  (err) => {
    console.log("1 请求拦截的失败回调");

    throw err;
  }
);
axios.interceptors.request.use(
  (config) => {
    console.log("2 请求拦截成功回调", config);

    return config;
  },
  (err) => {
    console.log("2 请求拦截的失败回调");

    throw err;
  }
);
axios.interceptors.response.use(
  (response) => {
    console.log("1 响应拦截成功回调", response);

    return response;
  },
  (err) => {
    console.log("1 响应拦截的失败回调");

    throw err;
  }
);
axios.interceptors.response.use(
  (response) => {
    console.log("2 响应拦截成功回调", response);

    return response;
  },
  (err) => {
    console.log("2 响应拦截的失败回调");

    throw err;
  }
);

console.log(axios.interceptors);

const res = await axios.get<{ username: string; password: string }[]>(
  "/api/users",
  {
    params: { page: 1, size: 2 },
  }
);

const loginRes = await axios.post("/api/auth/login", {
  username: "cjl",
  password: "123456",
});
