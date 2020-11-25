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
          <el-progress type="circle" :percentage="25"></el-progress> </el-card
      ></el-col>

      <el-col :xs="11" :sm="16" :md="18" :lg="18"
        ><el-card class="box-card" style="margin-bottom: 1rem; height: 15rem;">
          <div slot="header">
            <span>数据概览</span>
          </div>
          <el-row justify="space-around" :gutter="10">
            <el-col :xs="0" :sm="8" :md="8" :lg="8">
              <p>
                房屋数：<el-tag type="warning">1111</el-tag>
                <span class="hidden-sm-and-down">间</span>
              </p>
              <p>
                总余额：<el-tag type="success">2222</el-tag>
                <span class="hidden-sm-and-down">元</span>
              </p>
              <p>
                服务数：<el-tag type="info">1111</el-tag>
                <span class="hidden-sm-and-down">次</span>
              </p></el-col
            ><el-col :xs="0" :sm="4" :md="4" :lg="4">
              <el-divider direction="vertical" class="el-line"></el-divider>
            </el-col>
            <el-col :xs="24" :sm="12" :md="12" :lg="12">
              <span>
                <p style="font-size: 1.3rem;line-height: 3rem">
                  住户<span class="hidden-xs-only">总</span>数
                </p>
                <span style="font-size: 2rem"><strong>1000</strong></span>
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
        //
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
