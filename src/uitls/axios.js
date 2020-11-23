// 添加请求拦截器，在请求头中加token
import router from "@/router";

const axios = require("axios");
// 这里请求加header后就会出现跨域问题，暂时弃用拦截器
// axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.interceptors.request.use(
//   config => {
//     if (localStorage.getItem("Authorization")) {
//       let token = JSON.parse(localStorage.getItem("Authorization")).token;

      // config.headers.Authorization = token;
      // console.log("拦截器设置token完毕"+token);
    // }
//
//     return config;
//   },
//   error => {
//     return Promise.reject(error);
//   }
// );

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 这里写清除token的代码
          router.replace({
            path: "login",
            query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
          });
      }
    }
    // 对响应错误做点什么
    console.log("出错了 " + error);
    return Promise.reject(error);
  }
);
