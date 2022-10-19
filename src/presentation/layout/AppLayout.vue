<template>
  <section class="w-full h-full">
    <router-view></router-view>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import AppAsideMenu from "../components/AppAsideMenu.vue";
import AppHeader from "../components/AppHeader.vue";

export default defineComponent({
  name: "AppLayout",
  setup(props) {

  }
});
</script>

<style lang="scss" scoped></style>
