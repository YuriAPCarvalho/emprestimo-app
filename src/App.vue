<template>
  <div>
    <dashboard v-if="logged"></dashboard>
    <authetication v-else></authetication>
  </div>
</template>

<script>


import Dashboard from "@/app/dashboard/Dashboard";
import Authetication from "@/app/authentication/Authentication";

export default {
  components: {
    Dashboard,
    Authetication
  },
  data: () => ({
    logged: true
  })
}
</script>
