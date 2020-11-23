<template>
  <el-menu
    router
    :default-active="activeIndex2"
    class="el-menu-demo"
    mode="horizontal"
    @select="handleSelect"
    background-color="#30373e"
    text-color="#fff"
    active-text-color="#ffd04b"
    style="position: fixed;
    z-index:11;
    width: 100%"
  >
    <el-menu-item
      index="/dashboard/show"
      @click="changeshowbar"
      style="width: 125px;"
      >HXF物业系统</el-menu-item
    >

    <el-submenu index="/2">
      <template slot="title">工作台</template>
      <el-menu-item index="2-1">选项1</el-menu-item>
      <el-menu-item index="2-2">选项2</el-menu-item>
      <el-menu-item index="2-3">选项3</el-menu-item>
    </el-submenu>
<!--    <el-menu-item index="/3" class="hidden-xs-only">PC导航1</el-menu-item>-->

    <el-menu-item index="about" class="hidden-xs-only">关于</el-menu-item>
    <el-menu-item class="block" style="float:right;">
      <el-dropdown>
        <!--右下角蓝色的下拉菜单，使用原生dropdownmenu实现-->
        <el-avatar size="medium" :src="circleUrl"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/login"
            ><el-dropdown-item v-show="!userinfo.eid && !userinfo.cid"
              >登录</el-dropdown-item
            ></router-link
          >
          <router-link to="/logout"
            ><el-dropdown-item v-show="userinfo.eid || userinfo.cid"
              >注销</el-dropdown-item
            ></router-link
          >
        </el-dropdown-menu>
      </el-dropdown>
    </el-menu-item>
    <el-menu-item
      class="hidden-xs-only"
      style="float: right; cursor: default;"
      disabled
    >
      <!--判断是否登录提示-->
      <span v-if="userinfo.eid != null">员工：{{ userinfo.ename }}</span>
      <span v-else-if="userinfo.cid != null">住户：{{ userinfo.ename }}</span>
      <span v-else>请先登录！</span>
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
      userinfo: {
        cid: null,
        eid: null
      },
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      activeIndex: "1",
      activeIndex2: "/dashboard/show"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      // 新标签页跳转关于
      if (key == "about") {
        window.open("https://git.huxiaofan.com/emptinessboy/vuewuyesystem");
      }
      // this.$router.push({ path: key });
      // console.log(key, keyPath);
    },
    changeshowbar() {
      this.showbar = !this.showbar;
      console.log("是否显示侧边栏： " + this.showbar);
      Event.$emit("isshowbar", this.showbar);
    },
    getUserInfo() {
      try {
        this.userinfo = JSON.parse(this.$store.state.Authorization);
      } catch (e) {
        console.log("未获取到 LocalStorage 中的存储信息！");
      }
    }
  },
  watch: {
    // 登陆后刷新导航栏用户名
    "$store.state.Authorization": function() {
      this.getUserInfo();
    }
  },
  created() {
    // 登陆后刷新导航栏用户名
    this.getUserInfo();
  }
};
</script>

<style scoped></style>
