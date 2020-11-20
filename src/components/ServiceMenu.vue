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
      :inline="true"
      :model="formInline"
      class="demo-form-inline"
      v-show="showeidt"
    >
      <el-form-item label="服务名称" required>
        <el-input v-model="formInline.name" placeholder="服务名称"></el-input>
      </el-form-item>
      <!--使用allow-create属性即可通过在输入框中输入文字来创建新的条目。注意此时filterable必须为真。本例还使用了default-first-option属性，在该属性打开的情况下，按下回车就可以选中当前选项列表中的第一个选项，无需使用鼠标或键盘方向键进行定位。-->
      <el-form-item label="服务价格" required>
        <el-select
          v-model="formInline.price"
          placeholder="输入或选择价格"
          filterable
          allow-create
          default-first-option
        >
          <el-option label="50 元" value="50"></el-option>
          <el-option label="100 元" value="100"></el-option>
          <el-option label="150 元" value="100"></el-option>
          <el-option label="200 元" value="100"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="服务简介" required>
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="formInline.desc"
        >
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
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
            <span>卡片名称</span>
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
export default {
  name: "ServiceMenu",
  props: ["showdelete", "showeidt"],
  data() {
    return {
      formInline: {
        name: "",
        price: "",
        desc: ""
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
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
