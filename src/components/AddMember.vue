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
    <el-form-item label="用户ID">
      <el-input disabled v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="用户姓名" prop="name">
      <el-input v-model="form.name" placeholder="请输入用户姓名"></el-input>
    </el-form-item>
    <el-form-item label="用户性别" prop="sex">
      <el-select v-model="form.sex" placeholder="请选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <!--这里要把校验规则prop写在下面的子ithem中-->
    <el-form-item label="入住时间" required>
      <el-col :span="11">
        <el-form-item prop="date1">
          <el-date-picker
            type="date"
            placeholder="选择日期"
            v-model="form.date1"
            style="width: 100%;"
          ></el-date-picker>
        </el-form-item>
      </el-col>
      <el-col
        class="line"
        :span="2"
        style="width: 5px;margin-right: 5px;margin-left: 5px"
      >
        -
      </el-col>
      <el-col :span="11">
        <el-form-item prop="date2">
          <el-time-picker
            placeholder="选择时间"
            v-model="form.date2"
            style="width: 100%;"
          ></el-time-picker>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="用户住址" prop="address">
      <el-input type="textarea" v-model="form.address"></el-input>
    </el-form-item>

    <el-form-item label="初始余额" prop="money">
      <el-slider :max="max" v-model="form.money" show-input></el-slider>
    </el-form-item>

    <el-form-item label="登陆密码" prop="pass">
      <el-input
        placeholder="请输入密码"
        v-model="form.pass"
        show-password
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button style="float: right" type="primary" @click="onSubmit('form')"
        >新增用户</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
import axios from "axios";
import md5 from "js-md5";
import qs from "qs";

export default {
  name: "AddMember",
  data() {
    return {
      max: 500,
      newuserid: "",
      form: {
        id: "",
        name: "",
        sex: "",
        date1: "",
        date2: "",
        address: "",
        money: 0,
        pass: ""
      },
      //表单校验规则
      rules: {
        name: [
          { required: true, message: "请输入用户姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        sex: [{ required: true, message: "请选择性别", trigger: "change" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        address: [
          {
            required: true,
            min: 1,
            max: 100,
            message: "请填写用户住址，小于 100 个字符",
            trigger: "blur"
          }
        ],
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
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getNewUID() {
      let that = this;
      axios
        // eslint-disable-next-line no-undef
        .get(hxf_conf.BaseUrl + "/api/addmembers")
        .then(response => {
          that.form.id = response.data[0].newid;
          console.log("获取新用户ID：" + that.form.id);
        })
        .catch(function(error) {
          console.log("获取新用户ID失败：", error);
          that.$message({
            showClose: true,
            message: "连接服务器端失败，请检查网络： " + error,
            offset: 66,
            type: "warning"
          });
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
            method: "add",
            id: this.form.id,
            name: this.form.name,
            sex: this.form.sex,
            date: this.form.date2,
            address: this.form.address,
            money: this.form.money,
            //这里为md5加盐，增加数据安全性
            pass: md5("huxiaofan" + this.form.pass)
          };
          axios
            .post(
              // eslint-disable-next-line no-undef
              hxf_conf.BaseUrl + "/api/addmembers",
              qs.stringify(postform)
            )
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
                  message: "恭喜你，添加用户成功",
                  offset: 66,
                  type: "success"
                });
                console.log("保存成功：", response.status);
              }
            })
            .catch(function(error) {
              console.log("添加失败：", error);
              that.$message({
                showClose: true,
                message: "警告哦，添加失败,错误原因：" + error,
                offset: 66,
                type: "warning"
              });
            })
            .finally(function() {
              //清空表单
              that.getNewUID();
              that.resetForm("form");
            });
          console.log("submit!");
          // console.log(postform);
        }
      });
    }
  },
  created() {
    this.getNewUID();
  }
};
</script>

<style scoped></style>
