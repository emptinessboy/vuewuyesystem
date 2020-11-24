<template>
  <el-row type="flex" justify="space-around" class="row-bg login">
    <!--这里使用了elementUI的响应式设计-->
    <!--走马灯部分-->
    <el-col :xs="0" :sm="8" :md="12" :lg="15"
      ><div
        class="grid-content bg-purple"
        style="height:100%; width:100%; background-color: #333333"
      >
        <div class="block">
          <el-carousel height="calc(100vh - 60px)">
            <el-carousel-item>
              <img
                src="/static/imgs/zwu_1.jpg"
                style="min-width: 100%; min-height: 100%;"
              />
            </el-carousel-item>
            <el-carousel-item>
              <img
                src="/static/imgs/zwu_2.jpg"
                style="min-width: 100%; min-height: 100%;"
              />
            </el-carousel-item>
            <el-carousel-item>
              <img
                src="/static/imgs/zwu_3.jpg"
                style="min-width: 100%; min-height: 100%;"
              />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </el-col>
    <!--登录表单部分-->
    <el-col
      :xs="24"
      :sm="16"
      :md="12"
      :lg="9"
      id="login"
      style="padding: 1rem 0rem 5rem 0rem;"
    >
      <div
        style="margin: 0;align-items:center;height: 100%;
        display: flex;justify-content:center;flex-direction:column;"
      >
        <el-form
          style="margin: 0;width: 70%;"
          labelPosition="top"
          :model="loginForm"
          status-icon
          :rules="rules"
          ref="loginForm"
          label-width="100px"
        >
          <h1>用户登录</h1>
          <el-form-item label="用户ID" prop="uid">
            <el-input
              type="text"
              v-model="loginForm.uid"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="loginForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="是否为员工？"
            prop="staff"
            style="margin-bottom: 25px;"
          >
            <el-switch v-model="loginForm.isStaff"> </el-switch>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('loginForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import md5 from "js-md5";
import axios from "axios";
import qs from "qs";
import { mapMutations } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        uid: "",
        pass: "",
        age: "",
        isStaff: true
      },
      rules: {
        uid: [
          { required: true, message: "请输入用户ID", trigger: "blur" },
          { min: 1, max: 15, message: "超出长度限制", trigger: "blur" }
        ],
        pass: [
          {
            min: 6,
            max: 20,
            message: "密码长度为 6-20 个字符",
            trigger: "blur",
            required: true
          }
        ]
      }
    };
  },
  methods: {
    //Vue中…mapMutations传递参数 通过子组件定义的方法传递参数，在…mapMutations引用。
    ...mapMutations(["changeLogin"]),
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.loginForm.uid = "";
    },
    submitForm(formName) {
      //这里是表单校验规则
      this.$refs[formName].validate(valid => {
        if (!valid) {
          console.log("error submit!!");
        } else {
          //下面是post请求部分
          let that = this;
          //这里因为后端servlet对json处理我老是调试不好就使用传统参数，需要使用qs模块反序列化为url
          let postform = {
            method: "login",
            type: this.loginForm.isStaff ? "staff" : "user",
            user: this.loginForm.uid,
            //这里为md5加盐，增加数据安全性
            pass: md5("huxiaofan" + this.loginForm.pass)
          };
          axios
            .post(
              // eslint-disable-next-line no-undef
              hxf_conf.BaseUrl + "/api/login",
              qs.stringify(postform)
            )
            .then(response => {
              if (response.status == 200) {
                //存 token 到 VUEX 的 Authorization 和 Localstorage
                //这里使用了 JSON.stringfy 将json存入，因为localstorage不允许存对象，只能字符串
                that.$store.commit(
                  "changeLogin",
                  JSON.stringify(response.data[0])
                );
                console.log(JSON.stringify(response.data[0]));
                this.$message({
                  showClose: true,
                  message: "恭喜你，登录成功，正在跳转",
                  offset: 66,
                  type: "success"
                });
                console.log("登录成功：", response.status);
                //登录成功后跳转
                that.$router.push("/dashboard/show");
              }
            })
            .catch(error => {
              if (error.response.status == 401) {
                this.$message({
                  showClose: true,
                  message: "登录失败，用户名或密码错误",
                  offset: 70,
                  type: "error"
                });
                console.log("登录失败：", error.response.status);
              } else {
                console.log("登录失败：", error);
                that.$message({
                  showClose: true,
                  message: "警告哦，登录失败,错误原因：" + error,
                  offset: 70,
                  type: "warning"
                });
              }
              //清空表单
              that.resetForm("loginForm");
            })
            .finally(function() {
            });
          console.log("submit!");
          // console.log(postform);
        }
      });
    }
  }
};
</script>

<style scoped>
.login {
  /*修复饿了么ui高度100%导致的溢出*/
  overflow-y: hidden;
  padding-bottom: 0px;
  margin-bottom: 0px;
  /*高度适应屏幕*/
  height: calc(100vh - 60px);
  width: 100%;
}
.login .el-form-item {
  margin-bottom: 15px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
<style>
.login .el-form-item .el-form-item__label {
  padding: 0px !important;
}
</style>
