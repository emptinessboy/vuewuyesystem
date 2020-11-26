<template>
  <!--用户列表-->
  <div v-if="tableData != null">
    <!--使用过滤器搜索-->
    <el-table
      :max-height="this.screenHeight - 165"
      :data="tableData"
      style="width: 100%;height: 100%;"
      ><el-table-column prop="id" label="序号" width="80"></el-table-column
      ><el-table-column
        prop="date"
        label="申请时间"
        width="190"
      ></el-table-column>
      <el-table-column prop="cno" label="用户ID" width="140"> </el-table-column>
      <el-table-column prop="sid" label="服务ID" width="90"></el-table-column>
      <el-table-column
        prop="staff"
        label="接单员工"
        width="110"
      ></el-table-column>
      <el-table-column label="操作" width="160">
        <template slot-scope="scope">
          <el-button
            :disabled="scope.row.status > 1"
            @click.native.prevent="confirmOrder(scope.row.id)"
            size="small"
          >
            <span v-show="scope.row.status > 1">已</span>
            接单
          </el-button>
          <el-button
            style="float: right"
            @click.native.prevent="
              closeOrder(scope.row.id, scope.$index, tableData)
            "
            type="success"
            size="small"
          >
            结单
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
export default {
  name: "Order",
  props: ["screenHeight"],
  methods: {
    confirmOrder(id) {
      this.$confirm("确认接单吗 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.acceptOrder(id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 66,
            message: "已取消接单"
          });
        });
    },
    acceptOrder(id) {
      let that = this;
      //这里因为后端servlet对json处理我老是调试不好就使用传统参数，需要使用qs模块反序列化为url
      let deleteno = {
        method: "accept",
        id: id
      };
      axios
        // eslint-disable-next-line no-undef
        .post(hxf_conf.BaseUrl + "/api/orders", qs.stringify(deleteno))
        .then(response => {
          if (response.status != 200) {
            this.$message({
              showClose: true,
              message: "警告哦，接单失败，请检查服务端和数据库",
              offset: 66,
              type: "warning"
            });
            console.log("删除失败：", id, response.status);
          } else {
            this.$message({
              showClose: true,
              message: "恭喜你，接单成功",
              offset: 66,
              type: "success"
            });
            console.log("接单成功：", id, response.status);
          }
        })
        .catch(function(error) {
          try {
            if (error.response.status === 405) {
              console.log("子组件收到 405");
            } else {
              console.log("接单失败：", error);
              that.$message({
                showClose: true,
                message: "警告哦，接单失败,错误原因： " + error,
                offset: 66,
                type: "warning"
              });
            }
          } catch (e) {
            console.log("删除失败：", error);
            that.$message({
              showClose: true,
              message: "警告哦，接单失败,网络错误： " + error,
              offset: 66,
              type: "warning"
            });
          }
        })
        .finally(function() {});
    },
    closeOrder(id, index, rows) {
      this.$confirm("确认删除物业费记录吗 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRow(id, index, rows);
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 66,
            message: "已取消删除"
          });
        });
    },
    deleteRow(id, index, rows) {
      let that = this;
      //这里因为后端servlet对json处理我老是调试不好就使用传统参数，需要使用qs模块反序列化为url
      let deleteno = {
        method: "delete",
        id: id
      };
      axios
        // eslint-disable-next-line no-undef
        .post(hxf_conf.BaseUrl + "/api/moneyapi", qs.stringify(deleteno))
        .then(response => {
          if (response.status != 200) {
            this.$message({
              showClose: true,
              message: "警告哦，删除失败，请检查服务端和数据库",
              offset: 66,
              type: "warning"
            });
            console.log("删除失败：", id, response.status);
          } else {
            this.$message({
              showClose: true,
              message: "恭喜你，删除记录成功",
              offset: 66,
              type: "success"
            });
            console.log("删除成功：", id, response.status);
            rows.splice(index, 1);
          }
        })
        .catch(function(error) {
          try {
            if (error.response.status === 405) {
              console.log("子组件收到 405");
            } else {
              console.log("删除失败：", error);
              that.$message({
                showClose: true,
                message: "警告哦，删除失败,错误原因： " + error,
                offset: 66,
                type: "warning"
              });
            }
          } catch (e) {
            console.log("删除失败：", error);
            that.$message({
              showClose: true,
              message: "警告哦，删除失败,网络错误： " + error,
              offset: 66,
              type: "warning"
            });
          }
        })
        .finally(function() {});
    }
  },
  created() {
    //获取屏幕高度
    // this.getScreenHeight();
    let that = this;
    // 在Vue中this始终指向Vue，但axios中this为undefined
    // 通过 let that = this
    // 将this保存在that中，再在函数中使用that均可
    axios
      // eslint-disable-next-line no-undef
      .get(hxf_conf.BaseUrl + "/api/orders")
      .then(response => {
        that.tableData = response.data;
        console.log("获取服务记录成功");
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
            message: "连接服务器端失败，请检查网络： " + error,
            offset: 66,
            type: "warning"
          });
        }
      })
      .finally(function() {});
  },
  data() {
    return {
      eidtindex: "",
      loading: true,
      //获得axios的response前tableData值为null
      tableData: null
    };
  }
};
</script>

<style scoped></style>
