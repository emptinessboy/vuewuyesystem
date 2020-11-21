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
      style="padding: 4rem 2.5rem 5rem 2.5rem;"
    >
      <el-form
        style="margin: auto;align-items:center;height: 100%"
        labelPosition="top"
        :model="loginForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        label-width="100px"
      >
        <h1>用户登录</h1>
        <el-form-item label="用户ID" prop="name">
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
        <el-form-item label="是否为员工？" prop="staff">
          <el-switch v-model="loginForm.isStaff"> </el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('loginForm')"
            >提交</el-button
          >
          <el-button @click="resetForm('loginForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        uid: "",
        pass: "",
        age: "",
        isStaff: false
      },
      rules: {
        name: [
          { required: true, message: "请输入用户ID", trigger: "blur" },
          { min: 1, max: 15, message: "超出长度限制", trigger: "blur" }
        ],
        pass: [
          {
            min: 1,
            max: 16,
            message: "密码长度为 6-20 个字符",
            trigger: "blur",
            required: true,
          }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.loginForm.uid = ""
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
