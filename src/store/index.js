import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  // 这里的代码参考自 https://www.cnblogs.com/web-record/p/9876916.html
  // 使用vuex和localstorage实现用户登录以及token验证
  state: {
    // 存储token
    Authorization: localStorage.getItem('Authorization') ? localStorage.getItem('Authorization') : ''
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state,auth) {
      //第一个参数，操作谁 操作 state
      //这句话修改 vuex 中 Authorization 的值
      state.Authorization = auth;
      //这句话将数据存入 localstorage 中
      localStorage.setItem('Authorization', auth);
    }
  },
  actions: {},
  modules: {}
});
