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
          <el-input
            placeholder="请输入内容"
            v-show="scope.row.cno == eidtindex && showeidt"
            v-model="scope.row.cname"
          ></el-input>
          <span v-show="scope.row.cno != eidtindex || showeidt == false">{{
            scope.row.cname
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="csex" label="性别" width="90">
        <template slot-scope="scope">
          <!--简单表格行内内部可编辑原理就是span 和 input 的切换显隐。-->

          <el-select
            name="cars"
            v-show="scope.row.cno == eidtindex && showeidt"
            v-model="scope.row.csex"
            :value="scope.row.csex"
          >
            <!--修改了elm的select-->
            <el-option value="男">男</el-option>
            <el-option value="女">女</el-option>
          </el-select>

          <span v-show="scope.row.cno != eidtindex || showeidt == false">{{
            scope.row.csex
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="caddress" label="用户住址" width="200">
        <template slot-scope="scope">
          <!--简单表格行内内部可编辑原理就是span 和 input 的切换显隐。-->
          <el-input
            placeholder="请输入内容"
            v-show="scope.row.cno == eidtindex && showeidt"
            v-model="scope.row.caddress"
          ></el-input>
          <span v-show="scope.row.cno != eidtindex || showeidt == false">{{
            scope.row.caddress
          }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="cregtime" label="入住日期" width="215">
        <template slot-scope="scope">
          <!--简单表格行内内部可编辑原理就是span 和 input 的切换显隐。-->
          <el-date-picker
            value-format="yyyy-MM-dd HH:mm:ss"
            v-show="scope.row.cno == eidtindex && showeidt"
            v-model="scope.row.cregtime"
            type="datetime"
            placeholder="选择日期时间"
            style="width: 200px;"
          >
          </el-date-picker>

          <span v-show="scope.row.cno != eidtindex || showeidt == false">{{
            scope.row.cregtime
          }}</span>
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
              confirmDelete(scope.row.cno, scope.$index, tableData)
            "
            type="danger"
            size="small"
          >
            移除
          </el-button>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="155"
        v-if="this.showeidt"
      >
        <template slot="header">
          <el-input v-model="search" size="mini" placeholder="输入姓名搜索" />
        </template>
        <template slot-scope="scope">
          <el-button
            style="float: right;margin-left: 10px;"
            @click.native.prevent="eidtRow(scope.row.cno)"
            type="primary"
            size="small"
          >
            编辑
          </el-button>
          <el-button
            style="float: right"
            @click.native.prevent="saveRow(scope.row)"
            type="success"
            size="small"
            v-show="eidtindex == scope.row.cno"
          >
            <!--只有编辑的用户ID和当前cno一致时才会显示保存效果-->
            保存
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
  name: "MemberList",
  props: ["screenHeight", "showdelete", "showeidt"],
  methods: {
    confirmDelete(cno, index, rows) {
      this.$confirm("此操作将删除用户以及相关物业费记录 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRow(cno, index, rows);
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 66,
            message: "已取消删除"
          });
        });
    },
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
            offset: 66,
            type: "warning"
          });
        })
        .then(response => {
          if (response.status != 200) {
            this.$message({
              showClose: true,
              message: "警告哦，删除失败，请检查服务端和数据库",
              offset: 66,
              type: "warning"
            });
            console.log("删除失败：", cno, response.status);
          } else {
            this.$message({
              showClose: true,
              message: "恭喜你，删除记录成功",
              offset: 66,
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
            offset: 66,
            type: "warning"
          });
        })
        .then(response => {
          if (response.status != 200) {
            this.$message({
              showClose: true,
              message: "警告哦，保存失败，请检查服务端和数据库",
              offset: 66,
              type: "warning"
            });
            console.log("保存失败：", response.status);
          } else {
            this.$message({
              showClose: true,
              message: "恭喜你，保存数据成功",
              offset: 66,
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
          offset: 66,
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
