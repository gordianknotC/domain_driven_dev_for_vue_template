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

export default defineComponent({
  name: "AppLayout",
  components: {},
  setup() {}
});
</script>

<style lang="scss" scoped></style>
