<template>
  <div>
    <!--头部提示开始-->
    <el-alert
      style="margin-bottom: 20px;"
      title="小贴士"
      type="info"
      description="点击右下角小铅笔按钮来 添加 / 删除 物业服务"
      show-icon
    >
      <!--头部提示结束-->
    </el-alert>
    <!--新增服务表单-->
    <el-form
      label-position="left"
      ref="newService"
      :rules="rules"
      :inline="true"
      :model="newService"
      class="demo-form-inline"
      v-show="showeidt"
    >
      <el-form-item label="服务名称">
        <el-input
          v-model="newService.id"
          placeholder="服务ID"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="服务名称" prop="name">
        <el-input v-model="newService.name" placeholder="服务名称"></el-input>
      </el-form-item>
      <!--使用allow-create属性即可通过在输入框中输入文字来创建新的条目。注意此时filterable必须为真。本例还使用了default-first-option属性，在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。-->
      <el-form-item label="服务价格" prop="price">
        <el-select
          type="number"
          v-model="newService.price"
          placeholder="输入或选择价格"
          filterable
          allow-create
          default-first-option
        >
          <el-option label="免费" value="0"></el-option>
          <el-option label="50 元" value="50"></el-option>
          <el-option label="100 元" value="100"></el-option>
          <el-option label="150 元" value="150"></el-option>
          <el-option label="200 元" value="200"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务简介" prop="desc">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="newService.desc"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit('newService')"
          >提交</el-button
        >
      </el-form-item>
    </el-form>
    <!--新增服务表单-->
    <!--响应式服务显示窗体-->
    <el-row>
      <el-col
        :sm="24"
        :md="11"
        v-for="(o, index) in 20"
        :key="o"
        style="margin-left: -10px;"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span
              ><el-tag effect="dark" type="success" style="margin-right: 10px;"
                >ID：001</el-tag
              >
              卡片名称</span
            >
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              v-show="showdelete"
              >删除服务</el-button
            >
          </div>
          <div class="text item">
            服务介绍：123
          </div>
          <div class="text item">
            服务价格：<el-tag type="warning">标签</el-tag>
          </div>
          <div class="text item">累计服务次数：<el-tag>标签</el-tag></div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import axios from "axios";
import qs from "qs";

export default {
  name: "ServiceMenu",
  props: ["showdelete", "showeidt"],
  data() {
    return {
      newService: {
        id: "",
        name: "",
        price: "",
        desc: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入服务名称", trigger: "blur" },
          { min: 1, max: 10, message: "不超过 10 个字符", trigger: "blur" }
        ],
        price: [
          { required: true, message: "价格不能为空" },
        ],
        desc: [
          {
            required: true,
            min: 1,
            max: 50,
            message: "请填写服务简介，小于 50 个字符",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
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
            id: this.newService.id,
            name: this.newService.name,
            //保留两位小数
            price: parseFloat(this.newService.price).toFixed(2),
            desc: this.newService.desc,
            time: 0
          };
          axios
            .post(
              // eslint-disable-next-line no-undef
              hxf_conf.BaseUrl + "/api/servicemanage",
              qs.stringify(postform)
            )
            .catch(function(error) {
              console.log("添加失败：", error);
              that.$message({
                showClose: true,
                message: "警告哦，添加失败,错误原因：" + error,
                type: "warning"
              });
            })
            .then(response => {
              if (response.status != 200) {
                this.$message({
                  showClose: true,
                  message: "警告哦，添加失败，请检查服务端和数据库",
                  type: "warning"
                });
                console.log("保存失败：", response.status);
              } else {
                this.$message({
                  showClose: true,
                  message: "恭喜你，添加服务成功",
                  type: "success"
                });
                console.log("保存成功：", response.status);
              }
            })
            .finally(function() {
              // that.getNewUID();// that.getNewUID();// that.getNewUID();// that.getNewUID();
              that.newService = {
                id: "",
                name: "",
                price: "0",
                desc: ""
              };
            });
        }
      });
    }
  }
};
</script>

<style scoped>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.box-card {
  width: 100%;
  margin: 10px 20px 10px 10px;
}
</style>
