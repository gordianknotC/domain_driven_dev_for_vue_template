<template lang="pug">
.page.w-full
  AppLayout()
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import AppLayout from "~/presentation/layout/AppLayout.vue";

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
  @apply flex justify-center text-center;
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
    @apply h-full w-full;
    max-width: 100%;
  }
  @include mini {
    @apply h-full w-full;
    max-width: 100%;
  }
}
</style>
