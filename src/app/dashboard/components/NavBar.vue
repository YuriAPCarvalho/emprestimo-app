<template>
  <v-app-bar absolute elevate-on-scroll color="primary" dark app>
    <v-app-bar-nav-icon @click="changeMenuState"></v-app-bar-nav-icon>

    <v-toolbar-title>{{ pageTitle }}</v-toolbar-title>
  </v-app-bar>
</template>

<script>
export default {
  computed: {
    pageTitle() {
      return this.$route.name || "Emprestimo";
    },
  },
  methods: {
    changeMenuState() {
      this.$store.commit("drawer/changeDrawerState");
    },
  },
};
</script>

<style scoped></style>
