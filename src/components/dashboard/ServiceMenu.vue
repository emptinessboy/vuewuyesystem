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
      <el-form-item label="服务 SID">
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
        v-for="(item, index) in serviceList"
        :key="index"
        style="margin-left: -10px;"
      >
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span
              ><el-tag effect="dark" type="success" style="margin-right: 10px;"
                >ID：{{ item.sid }}</el-tag
              >
              {{ item.sname }}</span
            >
            <el-button
              style="float: right; padding: 3px 0"
              type="text"
              v-show="showdelete"
              @click="confirmDelete(item.sid)"
              >删除服务</el-button
            >
          </div>
          <div class="text item">服务介绍：{{ item.sdesc }}</div>
          <div class="text item">
            服务价格：<el-tag type="warning">{{ item.sprice }} 元</el-tag>
          </div>
          <div class="text item">
            累计服务次数：<el-tag>{{ item.stime }} 次</el-tag>
          </div>
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
      serviceList: [],
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
        price: [{ required: true, message: "价格不能为空" }],
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
  created() {
    this.getSeriveList();
    this.getNewUID();
  },
  methods: {
    getSeriveList() {
      let that = this;
      let getform = {
        want: "slist"
      };
      axios
        // eslint-disable-next-line no-undef
        .get(hxf_conf.BaseUrl + "/api/servicemanage?", { params: getform })
        .then(response => {
          that.serviceList = response.data;
          console.log("获取新服务列表成功");
          // console.log(that.serviceList);
        })
        .catch(function(error) {
          try {
            if (error.response.status === 405) {
              console.log("子组件收到 405");
            } else {
              console.log(error.response.status);
              console.log("获取服务列表失败：", error);
              that.$message({
                showClose: true,
                message: "服务器内部错误或者服务异常，请检查： " + error,
                offset: 66,
                type: "warning"
              });
            }
          } catch (e) {
            console.log("获取服务列表失败：", error);
            that.$message({
              showClose: true,
              message: "连接服务列表失败，请检查网络： " + error,
              offset: 66,
              type: "warning"
            });
          }
        });
    },
    getNewUID() {
      let that = this;
      let getform = {
        want: "sid"
      };
      axios
        // eslint-disable-next-line no-undef
        .get(hxf_conf.BaseUrl + "/api/servicemanage?", { params: getform })
        .then(response => {
          that.newService.id = response.data[0].newid;
          console.log("获取新服务ID：" + that.newService.id);
        })
        .catch(function(error) {
          try {
            if (error.response.status === 405) {
              console.log("子组件收到 405");
            } else {
              console.log("获取新服务ID失败：", error);
              that.$message({
                showClose: true,
                message: "服务器内部错误或者服务异常，请检查： " + error,
                offset: 66,
                type: "warning"
              });
            }
          } catch (e) {
            console.log("获取新服务ID失败：", error);
            that.$message({
              showClose: true,
              message: "连接服务器端失败，请检查网络： " + error,
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
            method: "add",
            sid: this.newService.id,
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
                  message: "恭喜你，添加服务成功",
                  offset: 66,
                  type: "success"
                });
                console.log("保存成功：", response.status);
              }
            })
            .catch(function(error) {
              try {
                if (error.response.status === 405) {
                  console.log("子组件收到 405");
                } else {
                  console.log("添加失败：", error);
                  that.$message({
                    showClose: true,
                    message: "警告哦，添加失败,错误原因：" + error,
                    offset: 66,
                    type: "warning"
                  });
                }
              } catch (e) {
                console.log("添加失败：", error);
                that.$message({
                  showClose: true,
                  message: "警告哦，添加失败,网络错误：" + error,
                  offset: 66,
                  type: "warning"
                });
              }
            })
            .finally(function() {
              that.getNewUID();
              that.newService = {
                id: "",
                name: "",
                price: "0",
                desc: ""
              };
              that.getSeriveList();
            });
        }
      });
    },
    confirmDelete(sid) {
      this.$confirm("此操作将删除服务以及相关物业费记录 ?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.deleteService(sid);
        })
        .catch(() => {
          this.$message({
            type: "info",
            offset: 66,
            message: "已取消删除"
          });
        });
    },
    deleteService(sid) {
      let that = this;
      //这里因为后端servlet对json处理我老是调试不好就使用传统参数，需要使用qs模块反序列化为url
      let deleteid = {
        method: "delete",
        sid: sid
      };
      axios
        // eslint-disable-next-line no-undef
        .post(hxf_conf.BaseUrl + "/api/servicemanage", qs.stringify(deleteid))
        .then(response => {
          if (response.status != 200) {
            this.$message({
              showClose: true,
              message: "警告哦，删除失败，请检查服务端和数据库",
              offset: 66,
              type: "warning"
            });
            console.log("删除失败：", sid, response.status);
          } else {
            this.$message({
              showClose: true,
              message: "恭喜你，删除记录成功",
              offset: 66,
              type: "success"
            });
            console.log("删除成功：", sid, response.status);
          }
        })
        .catch(function(error) {
          try {
            if (error.response.status === 405) {
              console.log("子组件收到 405");
            } else {
              console.log("删除失败：", error);
              that.$message({
                showClose: true,
                message: "警告哦，删除失败,错误原因：" + error,
                offset: 66,
                type: "warning"
              });
            }
          } catch (e) {
            console.log("删除失败：", error);
            that.$message({
              showClose: true,
              message: "警告哦，删除失败,网络错误：" + error,
              offset: 66,
              type: "warning"
            });
          }
        })
        .finally(function() {
          that.getSeriveList();
          that.getNewUID();
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
