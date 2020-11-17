<template>
  <div>
    <el-container style="height:100%; border: 0px solid #eee">
      <side-bar></side-bar>
      <transition name="el-fade-in-linear">
        <el-container>
          <el-header
            :class="{ secheader: showbar }"
            style="text-align: left; font-size: 12px; position: fixed; z-index:8; width: 100%;"
          >
            <div
              @click="changeshowbar"
              style="cursor:pointer; width: 100px; font-size: 25px;"
            >
              <!--鼠标移动变成手形-->
              <i :class="munuinfo" style="margin-right: 5px"></i>
            </div>
          </el-header>

          <el-main>
            <div style="height: 60px;"></div>
            <el-table :data="tableData">
              <el-table-column prop="date" label="日期" width="140">
              </el-table-column>
              <el-table-column prop="name" label="姓名" width="120">
              </el-table-column>
              <el-table-column prop="address" label="地址"> </el-table-column>
            </el-table>
          </el-main>
        </el-container>
      </transition>
    </el-container>
    <div class="eidtbutton">
      <el-dropdown>
        <!--右下角蓝色的下拉菜单，使用原生dropdownmenu实现-->
        <el-button
          style="width: 50px;height: 50px;"
          type="primary"
          icon="el-icon-edit"
          circle
        ></el-button>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item>删除</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <!--      <el-button-->
      <!--        style="width: 50px;height: 50px;"-->
      <!--        type="primary"-->
      <!--        icon="el-icon-edit"-->
      <!--        circle-->
      <!--        @click="changeshowbar"-->
      <!--      ></el-button>-->
    </div>
  </div>
</template>
<style>
.eidtbutton {
  position: fixed;
  z-index: 10;
  right: 50px;
  bottom: 60px;
}
.secheader {
  /*动态计算左边栏收起时宽度*/
  width: calc(100% - 120px);
}
.el-header {
  /*element默认样式，用于这里的次级header*/
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}
</style>

<script>
import Event from "@/uitls/public";
import SideBar from "@/components/SideBar";

export default {
  name: "DashBoard",
  components: { SideBar },
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      showbar: true,
      munuinfo: "el-icon-s-fold",
      tableData: Array(20).fill(item)
    };
  },
  computed: {},
  methods: {
    changeshowbar() {
      this.showbar = !this.showbar;
      console.log("是否显示侧边栏： " + this.showbar);
      Event.$emit("isshowbar", this.showbar);
    }
  },
  mounted() {
    //在模板编译完成后执行
    Event.$on("isshowbar", showbar => {
      this.showbar = showbar; //箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
    });
  },
  watch: {
    showbar(val) {
      if (val == true) {
        this.munuinfo = "el-icon-s-fold";
      } else {
        this.munuinfo = "el-icon-s-unfold";
      }
    }
  }
};
</script>
