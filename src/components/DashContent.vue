<!--用于显示后台面板content区块内容-->
<template>
  <el-main>
    <div style="height: 60px;"></div>
    <MemberList :showdelete="this.showdelete" :showeidt="this.showeidt"></MemberList>
  </el-main>
</template>

<script>
import MemberList from "@/components/MemberList";
export default {
  name: "DashContent",
  props: ['showdelete','showeidt'],
  components: { MemberList },
  created() {
  }
};
</script>

<style scoped></style>
