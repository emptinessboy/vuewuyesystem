import store from "../store";
// 添加请求拦截器，在请求头中加token
import router from "@/router";
import ElementUI from "element-ui";
const axios = require("axios");

// axios.defaults.withCredentials = true;
axios.defaults.crossDomain = true;
// axios.defaults.headers.get['Content-Type'] = 'application/x-www-form-urlencoded'
axios.interceptors.request.use(
  config => {
    if (localStorage.getItem("Authorization")) {
      let token = JSON.parse(localStorage.getItem("Authorization")).token;

      // response.setHeader("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE, PUT,HEAD");
      // 这里请求加header后就会出现跨域问题，暂时弃用header，貌似听大佬说要后端允许？以后再研究(
      // config.headers['Authorization'] = token;

      if (config.method === "post") {
        config.data = "token=" + token + "&" + config.data;
      } else if (config.method === "get") {
        // console.log(config.params);
        if (typeof config.params == undefined) {
          // 没有参数的处理方式
          config.url = config.url + "?token=" + token;
        } else {
          // 合并两个参数
          // 貌似多一个空参数，算了不管了
          config.params = Object.assign({ token: token }, config.params);
        }
      }
      console.log("拦截器设置token参数完毕：" + token);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    // 对响应数据做点什么
    return response;
  },
  error => {
    // 捕获登录异常的 405 错误
    if (error.response.status === 405) {
      console.log("用户未登录：", error);
      // 这里写清除token的代码
      store.commit("changeLogin", null);
      localStorage.removeItem("Authorization");
      router
        .replace({
          path: "/login",
          query: { redirect: router.currentRoute.fullPath } //登录成功后跳入浏览的当前页面
        })
        .catch(e => {
          console.log(e);
        });
      //弹出弹窗提示登录失效
      ElementUI.Message({
        showClose: true,
        message: "您需要重新登录 或者 登录已经过期 ",
        offset: 66,
        type: "warning"
      });
      return Promise.reject(error);
    } else {
      // 剩余的错误交给每个页面自行处理
      return Promise.reject(error);
    }
  }
);
