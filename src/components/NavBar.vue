<template>
  <el-menu
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="position: fixed;
    z-index:11;
    width: 100%"
  >
    <el-menu-item index="1" @click="changeshowbar" style="width: 120px;"
      >HXF物业系统</el-menu-item
    >

    <el-submenu index="2">
      <template slot="title">工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
      <el-submenu index="2-4">
        <template slot="title">选项4</template>
        <el-menu-item index="2-4-1">选项1</el-menu-item>
        <el-menu-item index="2-4-2">选项2</el-menu-item>
        <el-menu-item index="2-4-3">选项3</el-menu-item>
      </el-submenu>
    </el-submenu>
    <el-menu-item index="3" class="hidden-xs-only">PC导航1</el-menu-item>
    <el-menu-item index="4" class="hidden-xs-only">PC导航2</el-menu-item>
    <el-menu-item class="block" style="float:right;">
      <el-dropdown>
        <!--右下角蓝色的下拉菜单，使用原生dropdownmenu实现-->
        <el-avatar size="medium" :src="circleUrl"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>登录</el-dropdown-item>
          <el-dropdown-item>注册</el-dropdown-item>
          <el-dropdown-item>注销</el-dropdown-item>
          <el-dropdown-item>用户信息</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
    <el-menu-item
      class="hidden-xs-only"
      style="float: right; cursor: default;"
      disabled
    >
      <!--判断是否登录提示-->
      <span v-if="!islogined">您还没登录!</span>
      <span v-else>欢迎!</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import Event from "@/uitls/public";
export default {
  name: "NavBar",
  data() {
    return {
      showbar: true,
      islogined: false,
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      activeIndex: "1",
      activeIndex2: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    },
    changeshowbar() {
      this.showbar = !this.showbar;
      console.log("是否显示侧边栏： " + this.showbar);
      Event.$emit("isshowbar", this.showbar);
    }
  }
};
</script>

<style scoped></style>
