<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div style="height: 60px;"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: "app",
  components: { NavBar },
  created() {}
};
</script>

<style>
@import "~@csstools/normalize.css";
/*引入饿了么基于断点的隐藏类,实现响应式隐藏导航栏项目*/
@import "~element-ui/lib/theme-chalk/display.css";
body {
  display: block;
  margin: 0px !important;
}
/*重写nav导航下划线颜色*/
.el-menu.el-menu--horizontal {
  border-bottom: solid 1px #474747 !important;
}
</style>
