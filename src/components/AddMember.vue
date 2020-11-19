<template>
  <!--用来新增用户-->
  <el-form
    label-position="left"
    ref="form"
    :model="form"
    label-width="80px"
    style="max-width: 800px;"
  >
    <el-form-item label="用户ID">
      <el-input disabled v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="用户姓名">
      <el-input v-model="form.name" placeholder="请输入用户姓名"></el-input>
    </el-form-item>
    <el-form-item label="用户性别">
      <el-select v-model="form.sex" placeholder="请选择性别">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="入住时间">
      <el-col :span="11">
        <el-date-picker
          type="date"
          placeholder="选择日期"
          v-model="form.date1"
          style="width: 100%;"
        ></el-date-picker>
      </el-col>
      <el-col
        class="line"
        :span="2"
        style="width: 5px;margin-right: 5px;margin-left: 5px"
      >
        -
      </el-col>
      <el-col :span="11">
        <el-time-picker
          placeholder="选择时间"
          v-model="form.date2"
          style="width: 100%;"
        ></el-time-picker>
      </el-col>
    </el-form-item>
    <el-form-item label="用户住址">
      <el-input type="textarea" v-model="form.address"></el-input>
    </el-form-item>

    <el-form-item label="初始余额">
      <el-slider :max="max" v-model="form.money" show-input> </el-slider>
    </el-form-item>

    <el-form-item label="登陆密码">
      <el-input
        placeholder="请输入密码"
        v-model="form.pass"
        show-password
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: "AddMember",
  data() {
    return {
      max: 500,
      form: {
        id: "",
        name: "",
        sex: "",
        date1: "",
        date2: "",
        address: "",
        money: 0,
        pass: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
      console.log(this.form);
    }
  }
};
</script>

<style scoped></style>
