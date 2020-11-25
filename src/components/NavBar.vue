<template>
  <el-menu
    router
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
    <el-menu-item index="" @click="changeshowbar" style="width: 125px;"
      >HXF物业系统</el-menu-item
    >

    <el-submenu index="">
      <template slot="title">导航</template>
      <el-menu-item index="/dashboard/show">管理后台</el-menu-item>
      <el-menu-item index="/user">用户中心</el-menu-item>
    </el-submenu>
    <!--    <el-menu-item index="/3" class="hidden-xs-only">PC导航1</el-menu-item>-->

    <el-menu-item index="about" class="hidden-xs-only">关于</el-menu-item>
    <el-menu-item class="block" style="float:right;">
      <el-dropdown>
        <!--右下角蓝色的下拉菜单，使用原生dropdownmenu实现-->
        <el-avatar size="medium" :src="circleUrl"></el-avatar>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/login"
            ><el-dropdown-item v-show="!userinfo.eid && !userinfo.cno"
              >登录</el-dropdown-item
            ></router-link
          >
          <span @click="logOut()">
            <el-dropdown-item v-show="userinfo.eid || userinfo.cno"
              >注销</el-dropdown-item
            >
          </span>
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
      <span v-else-if="userinfo.cno != null">住户：{{ userinfo.cname }}</span>
      <span v-else>请先登录！</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
import Event from "@/uitls/public";
import axios from "axios";
export default {
  name: "NavBar",
  data() {
    return {
      showbar: true,
      userinfo: {
        cno: null,
        eid: null
      },
      circleUrl:
        "./static/imgs/user.png"
      // activeIndex2: "/dashboard/show"
    };
  },
  methods: {
    logOut() {
      console.log("触发注销");
      let that = this;
      // 在Vue中this始终指向Vue，但axios中this为undefined
      // 通过 let that = this
      // 将this保存在that中，再在函数中使用that均可
      axios
        // eslint-disable-next-line no-undef
        .get(hxf_conf.BaseUrl + "/api/logout")
        .catch(function(error) {
          console.log("服务端错误改为本地强行注销：", error);
        })
        .finally(function() {
          // 本地存储中删除 token
          window.localStorage.removeItem("Authorization");
          console.log("服务器 token 和本地 cookie 注销成功");
          that.$message({
            showClose: true,
            message: "注销成功！请重新登录",
            offset: 66,
            type: "success"
          });
          //清除用户信息
          that.userinfo = {
            cno: null,
            eid: null
          };
          that.$router.push("/login");
        });
    },
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
        console.log("导航栏更新用户信息");
        if (this.$store.state.Authorization == null) {
          this.userinfo = {
            cno: null,
            eid: null
          };
        } else {
          this.userinfo = JSON.parse(this.$store.state.Authorization);
        }
        // console.log(this.userinfo);
      } catch (e) {
        console.log("未获取到 LocalStorage 中的存储信息！");
      }
    }
  },
  watch: {
    // 登陆后刷新导航栏用户名
    "$store.state.Authorization": function() {
      this.getUserInfo();
      console.log("监听到用户信息变化");
    }
  },
  created() {
    // 登陆后刷新导航栏用户名
    this.getUserInfo();
  }
};
</script>

<style scoped></style>
