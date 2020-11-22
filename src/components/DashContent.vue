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
    <ServiceMenu
      v-if="this.$route.path === '/dashboard/servicemenu'"
      :showdelete="showdelete"
      :showeidt="showeidt"
    ></ServiceMenu>
    <money-pay v-if="this.$route.path === '/dashboard/payservice'"></money-pay>
    <money-list
      v-if="this.$route.path === '/dashboard/moneylist'"
      :screenHeight="this.screenHeight"
      :showdelete="this.showdelete"
      :showeidt="this.showeidt"
    ></money-list>
  </el-main>
</template>

<script>
import MemberList from "@/components/MemberList";
import AddMember from "@/components/AddMember";
import ServiceMenu from "@/components/ServiceMenu";
import MoneyPay from "@/components/MoneyPay";
import MoneyList from "@/components/MoneyList";
export default {
  name: "DashContent",
  props: ["screenHeight", "showdelete", "showeidt"],
  components: { MoneyList, MoneyPay, ServiceMenu, AddMember, MemberList },
  created() {}
};
</script>

<style scoped></style>
