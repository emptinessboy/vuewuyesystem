<template>
  <div>
    <!--新增服务表单-->
    <el-form
      label-position="left"
      ref="newStaff"
      :rules="rules"
      :inline="true"
      :model="newStaff"
      class="demo-form-inline"
    >
      <el-form-item label="员工 EID">
        <el-input
          v-model="newStaff.id"
          placeholder="员工ID"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="员工姓名" prop="name">
        <el-input v-model="newStaff.name" placeholder="员工姓名"></el-input>
      </el-form-item>
      <!--使用allow-create属性即可通过在输入框中输入文字来创建新的条目。注意此时filterable必须为真。本例还使用了default-first-option属性，在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。-->
      <el-form-item label="员工性别" prop="sex">
        <el-select
          type="number"
          v-model="newStaff.sex"
          placeholder="选择性别"
          default-first-option
        >
          <el-option label="男" value="男"></el-option>
          <el-option label="女" value="女"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="登录密码" prop="pass">
        <el-input
          v-model="newStaff.pass"
          placeholder="员工密码"
          show-password
        ></el-input>
      </el-form-item>

      <el-form-item label="">
        <el-switch
          v-model="newStaff.isadmin"
          active-text="管理员"
          inactive-text="普通员工"
        >
        </el-switch>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('newStaff')">新增</el-button>
      </el-form-item>
    </el-form>
    <!--新增服务表单-->

    <!--用户列表-->
    <div v-if="tableData != null">
      <!--使用过滤器搜索-->
      <el-table
        :data="
          tableData.filter(
            data =>
              !search || data.ename.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%;height: 100%;"
      >
        <el-table-column prop="eid" label="员工ID" width="110">
        </el-table-column>
        <el-table-column prop="ename" label="员工姓名" width="130">
        </el-table-column>
        <el-table-column prop="esex" label="性别" width="90"> </el-table-column>
        <el-table-column prop="isadmin" label="是否管理员" width="160">
        </el-table-column>
        <el-table-column label="操作" width="180">
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
                confirmDelete(scope.row.eid, scope.$index, tableData)
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
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";
import md5 from "js-md5";
export default {
  name: "StaffList",
  props: ["screenHeight"],
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit(formName) {
      //这里是表单校验规则
      this.$refs[formName].validate(valid => {
        if (!valid) {
          console.log("error submit!!");
        } else {
          //下面是post请求部分
          let that = this;
          //这里因为后端servlet对json处理我老是调试不好就使用传统参数，需要使用qs模块反序列化为url
          let postform = {
            method: "add",
            id: this.newStaff.id,
            name: this.newStaff.name,
            sex: this.newStaff.sex,
            //这里为md5加盐，增加数据安全性
            pass: md5("huxiaofan" + this.newStaff.pass),
            isadmin: this.newStaff.isadmin
          };
          axios
            .post(
              // eslint-disable-next-line no-undef
              hxf_conf.BaseUrl + "/api/staff",
              qs.stringify(postform)
            )
            .catch(function(error) {
              console.log("添加失败：", error);
              that.$message({
                showClose: true,
                message: "警告哦，添加失败,错误原因：" + error,
                offset: 66,
                type: "warning"
              });
            })
            .then(response => {
              if (response.status != 200) {
                this.$message({
                  showClose: true,
                  message: "警告哦，添加失败，请检查服务端和数据库",
                  offset: 66,
                  type: "warning"
                });
                console.log("保存失败：", response.status);
              } else {
                this.$message({
                  showClose: true,
                  message: "恭喜你，添加员工成功",
                  offset: 66,
                  type: "success"
                });
                console.log("添加员工成功：", response.status);
              }
            })
            .finally(function() {
              that.getNewEID();
              that.getStaffList();
              that.resetForm("newStaff");
            });
        }
      });
    },
    getNewEID() {
      let that = this;
      let getform = {
        want: "eid"
      };
      axios
        // eslint-disable-next-line no-undef
        .get(hxf_conf.BaseUrl + "/api/staff?", { params: getform })
        .catch(function(error) {
          console.log("获取新员工ID失败：", error);
          that.$message({
            showClose: true,
            message: "连接服务器端失败，请检查网络： " + error,
            offset: 66,
            type: "warning"
          });
        })
        .then(response => {
          that.newStaff.id = response.data[0].newid;
          console.log("获取新员工ID：" + that.newStaff.id);
        });
    },
    getStaffList() {
      let that = this;
      let getform = {
        want: "elist"
      };
      axios
        // eslint-disable-next-line no-undef
        .get(hxf_conf.BaseUrl + "/api/staff?", { params: getform })
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

    confirmDelete(eno, index, rows) {
      this.$confirm("此操作将员工以及相关物业费记录 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteRow(eno, index, rows);
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 66,
            message: "已取消删除"
          });
        });
    },

    deleteRow(eno, index, rows) {
      let that = this;
      //这里因为后端servlet对json处理我老是调试不好就使用传统参数，需要使用qs模块反序列化为url
      let deleteno = {
        method: "delete",
        id: eno
      };
      axios
        // eslint-disable-next-line no-undef
        .post(hxf_conf.BaseUrl + "/api/staff", qs.stringify(deleteno))
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
            console.log("删除失败：", eno, response.status);
          } else {
            this.$message({
              showClose: true,
              message: "恭喜你，删除记录成功",
              offset: 66,
              type: "success"
            });
            console.log("删除成功：", eno, response.status);
            rows.splice(index, 1);
          }
        })
        .finally(function() {
          that.getNewEID();
        });
    }
  },
  created() {
    //获取屏幕高度
    this.getNewEID();
    this.getStaffList();
  },
  data() {
    return {
      //绑定搜索的字符串
      search: "",
      loading: true,
      //获得axios的response前tableData值为null
      tableData: null,
      newStaff: {
        id: "",
        name: "",
        sex: "",
        pass: "",
        isadmin: false
      },
      rules: {
        name: [
          { required: true, message: "请输入员工姓名", trigger: "blur" },
          { min: 1, max: 5, message: "不超过 5 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "性别不能为空" }],
        pass: [
          {
            required: true,
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  }
};
</script>

<style scoped></style>
