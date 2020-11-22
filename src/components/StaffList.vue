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
      <el-table-column prop="eno" label="员工ID" width="110"> </el-table-column>
      <el-table-column prop="ename" label="员工姓名" width="120">
      </el-table-column>
      <el-table-column prop="esex" label="性别" width="90">
      </el-table-column>
      <el-table-column prop="caddress" label="是否管理员" width="100">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="130"
      >
        <template slot="header">
          <input
              type="text"
              v-model="search"
              placeholder="输入姓名搜索"
              class="el-input--mini el-input__inner"
              style="height:30px; line-height: 30px;"
          />
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
  name: "StaffList",
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
    },
    eidtRow(cno) {
      this.eidtindex = cno;
      console.log("进入编辑模式成功");
    },
    saveRow(row) {
      // console.log(row);
      let that = this;
      //这里因为后端servlet对json处理我老是调试不好就使用传统参数，需要使用qs模块反序列化为url
      let eidtno = {
        method: "modify",
        row: row
      };
      axios
          // eslint-disable-next-line no-undef
          .post(hxf_conf.BaseUrl + "/api/listmembers", qs.stringify(eidtno))
          .catch(function(error) {
            console.log("保存失败：", error);
            that.$message({
              showClose: true,
              message: "警告哦，保存失败,错误原因：" + error,
              type: "warning"
            });
          })
          .then(response => {
            if (response.status != 200) {
              this.$message({
                showClose: true,
                message: "警告哦，保存失败，请检查服务端和数据库",
                type: "warning"
              });
              console.log("保存失败：", response.status);
            } else {
              this.$message({
                showClose: true,
                message: "恭喜你，保存数据成功",
                type: "success"
              });
              console.log("保存成功：", response.status);
            }
          })
          .finally(function() {});
      //去除编辑框，改为显示span
      this.eidtindex = "";
      console.log("保存数据到数据库成功");
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
        .get(hxf_conf.BaseUrl + "/api/listmembers")
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
