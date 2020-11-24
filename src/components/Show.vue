<template>
  <!--<v-chart theme="ovilia-green" :options="polar"/>-->
  <div style="width: 100%;">
    <v-chart ref="chart" :options="option" :auto-resize="true" />
  </div>
</template>

<script>
import ECharts from "vue-echarts";
import "echarts/lib/chart/line";
import "echarts/lib/component/polar";

export default {
  props:["screenWidth"],
  components: {
    "v-chart": ECharts
  },
  methods:{

  },
  watch:{
    screenWidth(){
      // console.log(this.screenWidth)
      // 自适应屏幕尺寸
      this.$refs.chart.resize();
    }
  },
  created() {

  },
  data() {
    let data = [];

    for (let i = 0; i <= 360; i++) {
      let t = (i / 180) * Math.PI;
      let r = Math.sin(2 * t) * Math.cos(2 * t);
      data.push([r, i]);
    }

    return {
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
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
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
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: {},
            data: [820, 932, 901, 934, 1290, 1330, 1320]
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
</style>
