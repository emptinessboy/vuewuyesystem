<template>
  <!--用户列表-->
  <div v-if="tableData != null">
    <!--使用过滤器搜索-->
    <el-table
      :max-height="this.screenHeight - 165"
      :data="
        tableData.filter(
          data =>
            !search || data.cname.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%;height: 100%;"
    >
      <el-table-column prop="cno" label="用户ID" width="150"> </el-table-column>
      <el-table-column prop="cname" label="用户姓名" width="120">
        <template slot-scope="scope">
          <!--简单表格行内内部可编辑原理就是span 和 input 的切换显隐。-->
          <span>{{ scope.row.cname }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="csex" label="性别" width="90">
        <template slot-scope="scope">
          <!--简单表格行内内部可编辑原理就是span 和 input 的切换显隐。-->

          <span>{{ scope.row.csex }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="caddress" label="用户住址" width="200">
        <template slot-scope="scope">
          <!--简单表格行内内部可编辑原理就是span 和 input 的切换显隐。-->

          <span>{{ scope.row.caddress }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cregtime" label="入住日期" width="215">
        <template slot-scope="scope">
          <!--简单表格行内内部可编辑原理就是span 和 input 的切换显隐。-->

          <span>{{ scope.row.date }}</span>
        </template>
      </el-table-column>

      <el-table-column prop="cmoney" label="剩余物业费" width="100">
      </el-table-column>

      <el-table-column
        fixed="right"
        label="操作"
        width="130"
        v-if="this.showdelete"
      >
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入姓名搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            style="float: right"
            @click.native.prevent="
              deleteRow(scope.row.cno, scope.$index, tableData)
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
    deleteRow(cno, index, rows) {
      let that = this;
      //这里因为后端servlet对json处理我老是调试不好就使用传统参数，需要使用qs模块反序列化为url
      let deleteno = {
        method: "delete",
        cno: cno
      };
      axios
        // eslint-disable-next-line no-undef
        .post(hxf_conf.BaseUrl + "/api/listmembers", qs.stringify(deleteno))
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
            console.log("删除失败：", cno, response.status);
          } else {
            this.$message({
              showClose: true,
              message: "恭喜你，删除记录成功",
              type: "success"
            });
            console.log("删除成功：", cno, response.status);
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
