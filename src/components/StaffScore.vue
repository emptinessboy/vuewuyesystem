<template>
  <!--用户列表-->
  <div v-if="tableData != null">
    <!--:row-class-name="tableRowClassName"用来给前三名的row上色-->
    <el-table
      :row-class-name="tableRowClassName"
      :data="tableData"
      style="width: 100%;height: 100%;"
    >
      <el-table-column prop="eid" label="员工ID" width="110"> </el-table-column>
      <el-table-column prop="ename" label="员工姓名" width="120">
      </el-table-column>
      <el-table-column prop="esex" label="性别" width="90"> </el-table-column>
      <el-table-column prop="esrore" label="绩效指标" width="120">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "StaffScore",
  props: ["screenHeight"],
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 0) {
        return "one-row";
      } else if (rowIndex === 1) {
        return "two-row";
      } else if (rowIndex === 2) {
        return "tree-row";
      }
      return "";
    },
    getStaffList() {
      let that = this;
      let getform = {
        want: "escore"
      };
      axios
        // eslint-disable-next-line no-undef
        .get(hxf_conf.BaseUrl + "/api/staff?", { params: getform })
        .then(response => {
          that.tableData = response.data;
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
    }
  },
  created() {
    this.getStaffList();
  },
  data() {
    return {
      //绑定搜索的字符串
      search: "",
      loading: true,
      //获得axios的response前tableData值为null
      tableData: null
    };
  }
};
</script>

<style>
.el-table .one-row {
  background: #8ab8e8;
}

.el-table .two-row {
  background: #b9d7f6;
}

.el-table .tree-row {
  background: #e1effd;
}
</style>
