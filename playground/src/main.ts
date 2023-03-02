import axios from "@cwater/ts-lib";
import type { AxiosResponse, AxiosError } from "@cwater/ts-lib";
axios({
  url: "/api/user",
  method: "get",
  params: {
    page: 1,
    size: 10,
  },
})
  .then((res: AxiosResponse) => {
    console.log(res);
  })
  .catch((err: AxiosError) => {
    console.log(err);
  });

axios({
  url: "/api/auth/login",
  method: "post",
  headers: {
    "content-type": "application/json;charset=utf-8",
  },
  data: {
    username: "cjl",
    password: "123456",
  },
}).then((res: AxiosResponse) => {
  console.log(res);
});

// axios({
//   url: "/api/users",
//   method: "post",
//   data: {
//     username: "dani",
//     password: "123456",
//   },
// }).then((res) => {
//   console.log(res);
// });
