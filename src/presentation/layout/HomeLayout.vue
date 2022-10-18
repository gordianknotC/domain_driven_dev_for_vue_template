<template>
  <section>
    <AppHeader> </AppHeader>
    <section class="page-layout-container">
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
  setup() {}
});
</script>

<style lang="scss" scoped></style>
