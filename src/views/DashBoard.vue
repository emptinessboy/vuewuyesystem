<template>
  <div>
    <!--除去顶部navbar的内容，包含次级顶栏和侧边栏和content区块-->
    <el-container style="height:100%; border: 0px solid #eee">
      <side-bar></side-bar>
      <!--侧边栏过渡动画加入-->
      <transition name="el-fade-in-linear">
        <el-container>
          <!--次级顶栏-->
          <!--showbar参数使用eventbus传递-->
          <el-header
            :class="{ secheader: showbar }"
            style="text-align: left; font-size: 12px; position: fixed; z-index:8; width: 100%;"
          >
            <el-button
              v-if="
                this.$route.path === '/dashboard/memberlist' ||
                  this.$route.path === '/dashboard/servicemenu'
              "
              type="info"
              plain
              style="float: right; margin-top: 10px;"
              :class="{ quitbutton: showbar }"
              v-show="showdelete || showeidt"
              @click="quiteidt"
              >退出编辑</el-button
            >
            <div
              @click="changeshowbar"
              style="cursor:pointer; width: 100px; font-size: 25px;"
            >
              <!--鼠标移动变成手形 cursor:pointer-->
              <i :class="munuinfo" style="margin-right: 5px"></i>
              <span style="font-size: 1px;line-height: 60px;">{{
                munuinfotext
              }}</span>
            </div>
          </el-header>
          <dash-content
            :screenHeight="screenHeight"
            :showdelete="showdelete"
            :showeidt="showeidt"
          ></dash-content>
        </el-container>
      </transition>
    </el-container>

    <!--右下角蓝色的下拉菜单，使用原生dropdownmenu实现-->
    <div
      class="eidtbutton"
      v-if="
        this.$route.path === '/dashboard/memberlist' ||
          this.$route.path === '/dashboard/servicemenu'
      "
    >
      <el-dropdown>
        <!--右下角蓝色的下拉菜单，使用原生dropdownmenu实现-->
        <el-button
          style="width: 50px;height: 50px; font-size: 20px"
          type="primary"
          icon="el-icon-edit"
          circle
        ></el-button>
        <el-dropdown-menu slot="dropdown">
          <span
            @click="changeshoweidt"
            ><el-dropdown-item>编辑</el-dropdown-item></span
          >
          <span @click="changeshowdelete"
            ><el-dropdown-item>删除</el-dropdown-item></span
          >
          <span @click="quiteidt">
            <el-dropdown-item :disabled="!(showdelete || showeidt)"
              >查看</el-dropdown-item
            >
          </span>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<style scoped>
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
.quitbutton {
  margin-right: 120px;
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
// 懒加载组件
const DashContent = () => import("@/components/DashContent");

export default {
  name: "DashBoard",
  components: {
    DashContent,
    SideBar
  },
  data() {
    return {
      showbar: true,
      showdelete: false,
      showeidt: false,
      munuinfo: "el-icon-s-fold",
      munuinfotext: "收拢",
      screenWidth: "",
      screenHeight: ""
    };
  },
  computed: {},
  methods: {
    screenfit() {
      this.screenHeight = document.documentElement.clientHeight;
      this.screenWidth = document.body.clientWidth;
      if (this.screenWidth <= 768) {
        //传递事件将 isshowbar 变为 false，使页面响应，左侧边栏隐藏
        Event.$emit("isshowbar", false);
      } else {
        Event.$emit("isshowbar", true);
      }
      // console.log("当前屏幕尺寸为： "+this.screenWidth);
    },
    changeshowbar() {
      this.showbar = !this.showbar;
      console.log("是否显示侧边栏： " + this.showbar);
      Event.$emit("isshowbar", this.showbar);
    },
    //控制是否显示编辑列表，通过props的showeitd
    changeshowdelete() {
      this.showdelete = !this.showdelete;
      console.log("显示删除控件？ " + this.showdelete);
      if (this.showdelete === true) {
        this.showeidt = false;
      }
    },
    changeshoweidt() {
      this.showeidt = !this.showeidt;
      console.log("显示编辑控件？ " + this.showeidt);
      if (this.showeidt === true) {
        this.showdelete = false;
      }
    },
    quiteidt() {
      this.showeidt = false;
      this.showdelete = false;
      console.log("退出编辑模式成功");
    }
  },
  mounted() {
    //在模板编译完成后执行 使用eventbus传递侧边栏是否开启信息
    Event.$on("isshowbar", showbar => {
      this.showbar = showbar; //箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
    });
    this.screenfit();
    //监控屏幕尺寸实现响应式菜单栏
    window.onresize = () => {
      this.screenfit();
      // console.log("用户屏幕高度" + this.screenHeight);
    };
  },
  watch: {
    showbar(val) {
      if (val === true) {
        this.munuinfo = "el-icon-s-fold";
        this.munuinfotext = "收拢";
      } else {
        this.munuinfo = "el-icon-s-unfold";
        this.munuinfotext = "展开";
      }
    }
  }
};
</script>
