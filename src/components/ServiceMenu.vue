<template>
  <div>
    <el-alert
        style="margin-bottom: 20px;"
        title="小贴士"
        type="info"
        description="点击右下角圆形按钮来 添加 / 删除 物业服务"
        show-icon>
    </el-alert>
    <el-form :inline="true" :model="formInline" class="demo-form-inline" v-show="showeidt">
      <el-form-item label="审批人">
        <el-input v-model="formInline.user" placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="活动区域">
        <el-select v-model="formInline.region" placeholder="活动区域">
          <el-option label="区域一" value="shanghai"></el-option>
          <el-option label="区域二" value="beijing"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-row>
      <el-col :sm="24" :md="11" v-for="(o, index) in 20" :key="o" style="margin-left: -10px;">
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
          <div class="text item">
            累计服务次数：<el-tag>标签</el-tag>
          </div>
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
        user: "",
        region: ""
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
