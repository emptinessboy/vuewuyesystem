<template>
  <div id="app">
    <nav-bar></nav-bar>
    <div style="height: 60px;"></div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "@/components/NavBar";

export default {
  name: "app",
  components: { NavBar },
  created() {}
};
</script>

<style>
@import "~@csstools/normalize.css";
body {
  display: block;
  margin: 0px !important;
}
</style>
