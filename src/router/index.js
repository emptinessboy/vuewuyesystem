import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login")
  },
  {
    //实现动态路由，根据参数进入不同的控制面板
    path: "/dashboard/:path",
    name: "DashBoard",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/DashBoard.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;
