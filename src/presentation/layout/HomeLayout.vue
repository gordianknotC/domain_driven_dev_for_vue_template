<template>
  <section class="app-layout">
    <AppHeader> </AppHeader>
    <section class="page-layout">
      <router-view></router-view>
    </section>
    <AppAsideMenu> </AppAsideMenu>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppAsideMenu from "../components/AppAsideMenu.vue";
import AppHeader from "../components/AppHeader.vue";

export default defineComponent({
  name: "AppLayout",
  components: {
    AppAsideMenu,
    AppHeader
  },
  setup(props) {

  }
});
</script>

<style lang="scss" scoped></style>
