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
    <add-money v-if="this.$route.path === '/dashboard/addmoney'"> </add-money>
    <staff-list
      v-if="this.$route.path === '/dashboard/staff'"
      :screenHeight="this.screenHeight"
      :showdelete="this.showdelete"
      :showeidt="this.showeidt"
    ></staff-list>
    <staff-score v-if="this.$route.path === '/dashboard/score'"></staff-score>
    <Show
      v-if="this.$route.path === '/dashboard/show'"
      :screenWidth="this.screenWidth"
    ></Show>
    <Order
      v-if="this.$route.path === '/dashboard/order'"
      :screenWidth="this.screenWidth"
    ></Order>
  </el-main>
</template>

<script>
import MemberList from "@/components/dashboard/MemberList";
import AddMember from "@/components/dashboard/AddMember";
import ServiceMenu from "@/components/dashboard/ServiceMenu";
import MoneyPay from "@/components/dashboard/MoneyPay";
import MoneyList from "@/components/dashboard/MoneyList";
import AddMoney from "@/components/dashboard/AddMoney";
import StaffList from "@/components/dashboard/StaffList";
import StaffScore from "@/components/dashboard/StaffScore";
import Show from "@/components/dashboard/Show";
import Order from "@/components/dashboard/Order";
export default {
  name: "DashContent",
  props: ["screenWidth", "screenHeight", "showdelete", "showeidt"],
  components: {
    Order,
    Show,
    StaffScore,
    StaffList,
    AddMoney,
    MoneyList,
    MoneyPay,
    ServiceMenu,
    AddMember,
    MemberList
  },
  created() {}
};
</script>

<style scoped></style>
