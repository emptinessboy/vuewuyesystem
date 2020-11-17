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

    <el-menu-item index="1" @click="changeshowbar" style="width: 120px;">HXF物业系统</el-menu-item>
    <el-submenu index="2">
      <template slot="title">我的工作台</template>
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
    <el-menu-item index="3" >消息中心</el-menu-item>
    <el-menu-item index="4"
      ><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item
    >
    <el-menu-item class="block" style="float:right;" ><el-avatar size="medium" :src="circleUrl"></el-avatar></el-menu-item>
  </el-menu>
</template>

<script>
import Event from "@/uitls/public";
export default {
  name: "NavBar",
  data() {
    return {
      showbar: true,
      circleUrl:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
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
      console.log("是否显示侧边栏： "+this.showbar);
      Event.$emit("isshowbar", this.showbar);
    }
  }
};
</script>

<style scoped></style>
