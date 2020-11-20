<template>
  <transition name="el-fade-in-linear">
    <el-aside style="width: 125px;" v-show="showbar">
      <el-menu
        class="flex-container"
        router
        :default-openeds="['1', '3']"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        collapse
        style="width: 125px; position: fixed; z-index:9; height: 100%; padding-top: 5px;"
      >
        <el-menu-item index="memberlist">
          <i class="el-icon-s-data"></i>
          数据总览
        </el-menu-item>

        <el-menu-item index="memberlist">
          <i class="el-icon-user-solid"></i>
          住户列表
        </el-menu-item>

        <el-menu-item index="addmember">
          <i class="el-icon-circle-plus"></i>
          添加住户
        </el-menu-item>

        <el-submenu index="3" style="margin-top: auto;margin-bottom: 80px;">
          <template slot="title"
            ><i class="el-icon-setting"></i> 员工管理</template
          >
          <el-menu-item-group>
            <template slot="title">分组一</template>
            <el-menu-item index="3-1">选项1</el-menu-item>
            <el-menu-item index="3-2">选项2</el-menu-item>
          </el-menu-item-group>
          <el-menu-item-group title="分组2">
            <el-menu-item index="3-3">选项3</el-menu-item>
          </el-menu-item-group>
          <el-submenu index="3-4">
            <template slot="title">选项4</template>
            <el-menu-item index="3-4-1">选项4-1</el-menu-item>
          </el-submenu>
        </el-submenu>
      </el-menu>
    </el-aside>
  </transition>
</template>

<script>
import Event from "@/uitls/public";

export default {
  name: "SideBar",
  data() {
    return {
      showbar: true
    };
  },
  computed: {},
  mounted() {
    //在模板编译完成后执行
    Event.$on("isshowbar", showbar => {
      this.showbar = showbar; //箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
    });
  }
};
</script>

<style scoped>
.flex-container {
  display: -webkit-flex;
  display: flex;
  flex-direction: column;
}
</style>
