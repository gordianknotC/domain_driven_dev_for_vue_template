<template lang="pug">
.page.w-full
  AppLayout()
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import AppLayout from "~/presentation/layout/HomeLayout.vue";

export default defineComponent({
  name: "App",
  components: {
    AppLayout
  },
  props: {},
  emit: ["close"],
  setup(props, { emit }) {
    return {};
  }
});
</script>

<style lang="scss">
#app {
  @apply flex text-center justify-center;
  margin: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;

  @include tablet {
    @apply h-full items-center;
    max-width: 530px;
  }
  @include mobile {
    @apply w-full h-full;
    max-width: 100%;
  }
  @include mini {
    @apply w-full h-full;
    max-width: 100%;
  }
}
</style>
