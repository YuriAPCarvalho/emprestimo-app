<template>
  <v-app>
    <nav-bar></nav-bar>
    <drawer-menu></drawer-menu>
    <router-view></router-view>
  </v-app>
</template>

<script>
import NavBar from "@/app/dashboard/components/NavBar";
import DrawerMenu from "@/app/dashboard/components/DrawerMenu";

export default {
  name: "Dashboard",
  components: {
    NavBar,
    DrawerMenu
  }
}
</script>

<style scoped>

</style>
