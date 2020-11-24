<template>
  <!--用来新增用户-->
  <el-form
    label-position="left"
    ref="form"
    :model="form"
    label-width="80px"
    style="max-width: 800px;"
    :rules="rules"
  >
    <el-form-item label="用户 ID" prop="id" required>
      <el-select
        filterable
        v-model="form.id"
        placeholder="请选择用户"
        style="width: 100%"
      >
        <el-option
          v-for="item in cnoList"
          :key="item.cno"
          :label="'ID-' + item.cno + '  ' + item.cname"
          :value="item.cno"
        >
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="充值金额" prop="money">
      <el-slider
        :max="max"
        :min="min"
        v-model="form.money"
        show-input
      ></el-slider>
    </el-form-item>

    <!--表单隐藏项目，方便以后超级管理员开发-->
    <!--    <el-form-item label="AdminKey" prop="pass" v-show="false">-->
    <!--      <el-input-->
    <!--        placeholder="请输入密码"-->
    <!--        v-model="form.pass"-->
    <!--        show-password-->
    <!--      ></el-input>-->
    <!--    </el-form-item>-->

    <el-form-item>
      <el-button style="float: right" type="primary" @click="onSubmit('form')"
        >立刻充值</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import md5 from "js-md5";
import qs from "qs";

export default {
  name: "AddMoney",
  data() {
    return {
      max: 500,
      min: 1,
      cnoList: [],
      form: {
        id: "",
        money: 0,
        pass: ""
      },
      //表单校验规则
      rules: {
        id: [{ required: true, message: "请选择用户 ID", trigger: "change" }],
        pass: [
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getCnoList() {
      let that = this;
      axios
        // eslint-disable-next-line no-undef
        .get(hxf_conf.BaseUrl + "/api/listmembers")
        .then(response => {
          that.cnoList = response.data;
          console.log("获取新用户列表成功");
          // console.log(that.serviceList);
        })
        .catch(function(error) {
          try {
            if (error.response.status === 405) {
              console.log("子组件收到 405");
            }
          } catch (e) {
            console.log("获取用户列表失败：", error);
            that.$message({
              showClose: true,
              message: "连接服务器失败，请检查网络： " + error,
              offset: 66,
              type: "warning"
            });
          }
        });
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
            method: "income",
            id: this.form.id,
            money: this.form.money
            // 这里为md5加盐，增加数据安全性
            // pass: md5("huxiaofan" + this.form.pass)
          };
          axios
            .post(
              // eslint-disable-next-line no-undef
              hxf_conf.BaseUrl + "/api/moneyapi",
              qs.stringify(postform)
            )
            .then(response => {
              if (response.status != 200) {
                this.$message({
                  showClose: true,
                  message: "警告哦，充值失败，请检查服务端和数据库",
                  offset: 66,
                  type: "warning"
                });
                console.log("保存失败：", response.status);
              } else {
                this.$message({
                  showClose: true,
                  message: "恭喜你，充值成功",
                  offset: 66,
                  type: "success"
                });
                console.log("充值成功：", response.status);
              }
            })
            .catch(function(error) {
              try {
                if (error.response.status === 405) {
                  console.log("子组件收到 405");
                }
              } catch (e) {
                console.log("充值失败：", error);
                that.$message({
                  showClose: true,
                  message: "警告哦，充值失败,错误原因：" + error,
                  offset: 66,
                  type: "warning"
                });
              }
            })
            .finally(function() {
              //清空表单
              that.resetForm("form");
            });
          console.log("submit!");
          // console.log(postform);
        }
      });
    }
  },
  created() {
    this.getCnoList();
  }
};
</script>

<style scoped></style>
