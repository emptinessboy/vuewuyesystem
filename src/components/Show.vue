<template>
  <!--<v-chart theme="ovilia-green" :options="polar"/>-->
  <div style="width: 100%;">
    <el-row
      justify="space-around"
      :gutter="10"
      style="padding:0 .5rem 0 .5rem;"
    >
      <el-col :xs="13" :sm="8" :md="6" :lg="6">
        <el-card class="box-card" style="margin-bottom: 1rem; height: 15rem;">
          <div slot="header">
            <span>入住率</span>
          </div>
          <el-progress
            type="circle"
            :percentage="hxf_rzl"
          ></el-progress> </el-card
      ></el-col>

      <el-col :xs="11" :sm="16" :md="18" :lg="18"
        ><el-card class="box-card" style="margin-bottom: 1rem; height: 15rem;">
          <div slot="header">
            <span>数据概览</span>
          </div>
          <el-row justify="space-around" :gutter="10">
            <el-col :xs="0" :sm="8" :md="8" :lg="8">
              <p>
                物业费：<el-tag type="success">{{ hxf_wyf }}</el-tag>
                <span class="hidden-sm-and-down"> 元</span>
              </p>
              <p>
                服务数：<el-tag type="info">{{ hxf_fws }}</el-tag>
                <span class="hidden-sm-and-down"> 次</span>
              </p>
              <p>
                员工数：<el-tag type="warning">{{ hxf_liushui }}</el-tag>
                <span class="hidden-sm-and-down"> 人</span>
              </p> </el-col
            ><el-col :xs="0" :sm="4" :md="4" :lg="4">
              <el-divider direction="vertical" class="el-line"></el-divider>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
              <span>
                <p style="font-size: 1.3rem;line-height: 3rem">
                  住户<span class="hidden-xs-only">总</span>数
                </p>
                <span style="font-size: 2rem"
                  ><strong>{{ hxf_zhs }} </strong></span
                >
                <span style="font-size: 2rem" class="hidden-xs-only"
                  ><strong>户</strong></span
                >
              </span>
            </el-col>
          </el-row>
        </el-card></el-col
      >
    </el-row>

    <v-chart ref="chart" :options="option" :auto-resize="true" />
  </div>
</template>

<script>
import Event from "@/uitls/public";
import ECharts from "vue-echarts";
// 按需引入 ECharts
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/legend";
import axios from "axios";
export default {
  props: ["screenWidth"],
  components: {
    "v-chart": ECharts
  },
  methods: {},
  watch: {
    screenWidth() {
      // console.log(this.screenWidth)
      // 自适应屏幕尺寸
      this.$refs.chart.resize();
    },
    showbar() {
      // settimeout 减少渲染次数，减少卡顿
      setTimeout(() => {
        // 侧边栏收起展开自动调整 echart 宽度
        this.$refs.chart.resize();
      }, 500);
    }
  },
  created() {
    let that = this;
    // 在Vue中this始终指向Vue，但axios中this为undefined
    // 通过 let that = this
    // 将this保存在that中，再在函数中使用that均可
    axios
      // eslint-disable-next-line no-undef
      .get(hxf_conf.BaseUrl + "/api/show")
      .then(response => {
        // 获取并输出住户数
        that.hxf_zhs = response.data[0].count_cno;
        // 计算并输出入住率
        // eslint-disable-next-line no-undef
        that.hxf_rzl = parseInt((that.hxf_zhs / hxf_conf.hxf_fangjian) * 100);
        //获取并计算物业费剩余
        that.hxf_wyf = parseInt(response.data[0].count_cmoney);
        //获取并计算服务次数
        that.hxf_fws = parseInt(response.data[1].count_allstimes);
        //获取并计算员工数
        that.hxf_liushui = parseInt(response.data[1].count_allsmoney);
        // echarts 横坐标轴数据更新
        that.option.xAxis[0].data = response.data[2].days;
        // echarts 数据获取
        that.option.series[0].data = response.data[3].pay;
        that.option.series[1].data = response.data[3].income;
      })
      .catch(function(error) {
        try {
          if (error.response.status === 405) {
            console.log("子组件收到 405");
          } else {
            console.log("获取数据：", error);
            that.$message({
              showClose: true,
              message: "服务器内部错误或者服务异常，请检查： " + error,
              offset: 66,
              type: "warning"
            });
          }
        } catch (e) {
          console.log("获取数据：", error);
          that.$message({
            showClose: true,
            message: "连接服务器端失败，请检查网络：" + error,
            offset: 66,
            type: "warning"
          });
        }
      })
      .finally(function() {});
  },
  mounted() {
    //在模板编译完成后执行
    Event.$on("isshowbar", showbar => {
      this.showbar = showbar; //箭头函数内部不会产生新的this，这边如果不用=>,this指代Event
    });
    // settimeout 减少渲染次数，减少卡顿
    setTimeout(() => {
      // 侧边栏收起展开自动调整 echart 宽度
      this.$refs.chart.resize();
    }, 500);
  },
  data() {
    return {
      showbar: null,
      //入住率
      hxf_rzl: 0,
      //住户数
      hxf_zhs: 0,
      //物业费剩余
      hxf_wyf: 0,
      //服务次数
      hxf_fws: 0,
      //员工数
      hxf_liushui: 0,
      option: {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["用户充值", "服务消费"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "用户充值",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
          },
          {
            name: "服务消费",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    };
  }
};
</script>

<style scoped>
/**
 * 默认尺寸为 600px×400px，如果想让图表响应尺寸变化，可以像下面这样
 * 把尺寸设为百分比值（同时请记得为容器设置尺寸）。
 */
.echarts {
  width: 100%;
  /*height: 100%;*/
}
.el-line {
  height: 9em !important;
}
.box-card p {
  display: block;
  margin-block-start: 0em;
  margin-block-end: 1em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
}
@media (max-width: 800px) {
  .box-card p {
    line-height: 2;
  }
}
</style>
