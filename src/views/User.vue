<template>
  <el-main>
    <!--头部提示开始-->
    <div class="cmoney">
      <el-alert
        :closable="false"
        style="margin-bottom: 20px;"
        title="用户余额"
        type="info"
        :description="'当前剩余物业费为：' + cmoney + ' 元'"
        show-icon
      >
        <!--头部提示结束-->
      </el-alert>
    </div>

    <el-card>
      <el-steps :active="2">
        <el-step title="下单" description="您已下单，请耐心等待"></el-step>
        <el-step title="上门" description="师傅已接单，正在上门"></el-step>
        <el-step title="结单" description="确认结单，完成服务"></el-step>
      </el-steps>
      <el-button type="success" style="float: right;margin: 15px 0 15px 0;"
        >确认结单</el-button
      >
    </el-card>

    <!--响应式服务显示窗体-->
    <el-row :gutter="20">
      <el-col
        :sm="24"
        :md="12"
        v-for="(item, index) in serviceList"
        :key="index"
        style="margin-left: -10px;"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span
              ><el-tag effect="dark" type="success" style="margin-right: 10px;"
                >ID：{{ item.sid }}</el-tag
              >
              {{ item.sname }}</span
            >
            <el-button
              style="float: right;"
              type="primary"
              @click="confirmOrder(item.sid)"
              >订购服务</el-button
            >
          </div>
          <div class="text item">服务介绍：{{ item.sdesc }}</div>
          <div class="text item">
            服务价格：<el-tag type="warning">{{ item.sprice }} 元</el-tag>
          </div>
          <div class="text item">
            累计服务居民：<el-tag>{{ item.stime }} 次</el-tag>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "User",
  data() {
    return {
      cmoney: "0",
      orderlist: {},
      serviceList: []
    };
  },
  created() {
    this.getMoney();
    setTimeout(() => {
      // 侧边栏收起展开自动调整 echart 宽度
      this.getSeriveList();
    }, 500);
    setTimeout(() => {
      // 侧边栏收起展开自动调整 echart 宽度
      this.getOrder();
    }, 500);
  },
  methods: {
    getMoney() {
      let that = this;
      axios
        // eslint-disable-next-line no-undef
        .get(hxf_conf.BaseUrl + "/api/user")
        .then(response => {
          that.cmoney = response.data[0].cmoney;
          console.log("获取用户余额成功");
          // console.log(that.serviceList);
        })
        .catch(function(error) {
          try {
            if (error.response.status === 405) {
              console.log("子组件收到 405");
            } else {
              console.log(error.response.status);
              console.log("获取用户余额失败：", error);
              that.$message({
                showClose: true,
                message: "服务器内部错误或者服务异常，请检查： " + error,
                offset: 66,
                type: "warning"
              });
            }
          } catch (e) {
            console.log("获取用户余额失败：", error);
            that.$message({
              showClose: true,
              message: "连接服务器失败，请检查网络： " + error,
              offset: 66,
              type: "warning"
            });
          }
        });
    },
    getOrder() {
      let that = this;
      let getform = {
        want: "order"
      };
      axios
        // eslint-disable-next-line no-undef
        .get(hxf_conf.BaseUrl + "/api/user?", { params: getform })
        .then(response => {
          that.orderlist = response.data;
          console.log("获取已订购的服务列表成功");
          // console.log(that.serviceList);
        })
        .catch(function(error) {
          try {
            if (error.response.status === 405) {
              console.log("子组件收到 405");
            } else {
              console.log(error.response.status);
              console.log("获取已订购的服务列表失败：", error);
              that.$message({
                showClose: true,
                message: "服务器内部错误或者服务异常，请检查： " + error,
                offset: 66,
                type: "warning"
              });
            }
          } catch (e) {
            console.log("获取已订购的服务列表失败：", error);
            that.$message({
              showClose: true,
              message: "连接服务器失败，请检查网络： " + error,
              offset: 66,
              type: "warning"
            });
          }
        });
    },
    getSeriveList() {
      let that = this;
      let getform = {
        want: "slist"
      };
      axios
        // eslint-disable-next-line no-undef
        .get(hxf_conf.BaseUrl + "/api/user?", { params: getform })
        .then(response => {
          that.serviceList = response.data;
          console.log("获取新服务列表成功");
          // console.log(that.serviceList);
        })
        .catch(function(error) {
          try {
            if (error.response.status === 405) {
              console.log("子组件收到 405");
            } else {
              console.log(error.response.status);
              console.log("获取服务列表失败：", error);
              that.$message({
                showClose: true,
                message: "服务器内部错误或者服务异常，请检查： " + error,
                offset: 66,
                type: "warning"
              });
            }
          } catch (e) {
            console.log("获取服务列表失败：", error);
            that.$message({
              showClose: true,
              message: "连接服务列表失败，请检查网络： " + error,
              offset: 66,
              type: "warning"
            });
          }
        });
    },
    confirmOrder(sid) {
      this.$confirm("确认订购服务么 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.orderService(sid);
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 66,
            message: "已取消订购"
          });
        });
    },
    orderService(sid) {
      let that = this;
      //这里因为后端servlet对json处理我老是调试不好就使用传统参数，需要使用qs模块反序列化为url
      let deleteid = {
        method: "order",
        sid: sid
      };
      axios
        // eslint-disable-next-line no-undef
        .post(hxf_conf.BaseUrl + "/api/user", qs.stringify(deleteid))
        .then(response => {
          if (response.status === 203) {
            this.$message({
              showClose: true,
              message: "订购失败，您还有订单尚未处理完毕，请耐心等待！",
              offset: 66,
              type: "warning"
            });
            console.log("订购失败：", sid, response.status);
          } else if (response.status !== 200) {
            this.$message({
              showClose: true,
              message: "警告哦，订购失败，请检查服务端和数据库",
              offset: 66,
              type: "warning"
            });
            console.log("订购失败：", sid, response.status);
          } else {
            this.$message({
              showClose: true,
              message: "恭喜你，订购成功",
              offset: 66,
              type: "success"
            });
            console.log("订购成功：", sid, response.status);
          }
        })
        .catch(function(error) {
          try {
            if (error.response.status === 405) {
              console.log("子组件收到 405");
            } else {
              console.log("订购失败：", error);
              that.$message({
                showClose: true,
                message: "警告哦，订购失败,错误原因：" + error,
                offset: 66,
                type: "warning"
              });
            }
          } catch (e) {
            console.log("删除失败：", error);
            that.$message({
              showClose: true,
              message: "警告哦，删除失败,网络错误：" + error,
              offset: 66,
              type: "warning"
            });
          }
        })
        .finally(function() {});
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.box-card {
  width: 100%;
  margin: 10px 20px 10px 10px;
}
</style>
<style>
.cmoney .el-alert .el-alert__description {
  font-size: 14px;
  margin: 5px 0 0;
  font-weight: bolder;
}
</style>
