<template>
  <section class="holder">
    <section class="holder-bread-menu"></section>
    <section class="holder-logo"></section>
    <section class="holder-marquee"></section>
    <section class="holder-account"></section>
  </section>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "AppHeader",
  emits: ["toggle-bread-menu"],
  setup(props) {
    return {};
  }
});
</script>

<style lang="scss">
.holder {
  &-bread-menu {
  }
  &-logo {
  }
  &-marquee {
  }
  &-account {
  }
}
</style>
