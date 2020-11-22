<template>
  <!--用户列表-->
  <div v-if="tableData != null">
    <!--使用过滤器搜索-->
    <el-table
      :max-height="this.screenHeight - 165"
      :data="
        tableData.filter(
          data =>
            !search || data.cno.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%;height: 100%;"
      ><el-table-column prop="id" label="序号" width="80"></el-table-column
      ><el-table-column
        prop="date"
        label="服务时间"
        width="190"
      ></el-table-column>
      <el-table-column prop="cno" label="用户ID" width="140"> </el-table-column>

      <el-table-column
        prop="method"
        label="资金流向"
        width="120"
      ></el-table-column>
      <el-table-column prop="times" label="次数" width="90"> </el-table-column>
      <el-table-column prop="sid" label="服务ID" width="90"></el-table-column>
      <el-table-column prop="staff" label="员工ID" width="90"></el-table-column>
      <el-table-column prop="money" label="金额" width="100">
        <template slot-scope="scope">
          <el-tag disable-transitions>{{ scope.row.money }}</el-tag>
        </template></el-table-column
      >

      <el-table-column
        fixed="right"
        label="操作"
        width="130"
        v-if="this.showdelete"
      >
        <template slot="header">
          <input
            type="text"
            v-model="search"
            placeholder="输用户ID搜索"
            class="el-input--mini el-input__inner"
            style="height:30px; line-height: 30px;"
          />
        </template>
        <template slot-scope="scope">
          <el-button
            style="float: right"
            @click.native.prevent="
              deleteRow(scope.row.id, scope.$index, tableData)
            "
            type="danger"
            size="small"
          >
            移除
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
  name: "MoneyList",
  props: ["screenHeight", "showdelete", "showeidt"],
  methods: {
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
        .catch(function(error) {
          console.log("删除失败：", error);
          that.$message({
            showClose: true,
            message: "警告哦，删除失败,错误原因：" + error,
            type: "warning"
          });
        })
        .then(response => {
          if (response.status != 200) {
            this.$message({
              showClose: true,
              message: "警告哦，删除失败，请检查服务端和数据库",
              type: "warning"
            });
            console.log("删除失败：", id, response.status);
          } else {
            this.$message({
              showClose: true,
              message: "恭喜你，删除记录成功",
              type: "success"
            });
            console.log("删除成功：", id, response.status);
            rows.splice(index, 1);
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
      .get(hxf_conf.BaseUrl + "/api/moneyapi")
      .catch(function(error) {
        console.log("获取数据：", error);
        that.$message({
          showClose: true,
          message: "连接服务器端失败，请检查网络： " + error,
          type: "warning"
        });
      })
      .then(response => {
        that.tableData = response.data;
        console.log("获取服务记录成功");
      })
      .finally(function() {});
  },
  data() {
    return {
      //绑定搜索的字符串
      search: "",
      eidtindex: "",
      loading: true,
      //获得axios的response前tableData值为null
      tableData: null
    };
  }
};
</script>

<style scoped></style>
