<!--用于显示后台面板content区块内容-->
<template>
  <el-main>
    <div style="height: 60px;"></div>
    <!--实现动态路由-->
    <MemberList
      v-if="this.$route.path === '/dashboard/memberlist'"
      :screenHeight="this.screenHeight"
      :showdelete="this.showdelete"
      :showeidt="this.showeidt"
    ></MemberList>
    <AddMember v-if="this.$route.path === '/dashboard/addmember'"></AddMember>
  </el-main>
</template>

<script>
import MemberList from "@/components/MemberList";
import AddMember from "@/components/AddMember";
export default {
  name: "DashContent",
  props: ["screenHeight", "showdelete", "showeidt"],
  components: { AddMember, MemberList },
  created() {}
};
</script>

<style scoped></style>
