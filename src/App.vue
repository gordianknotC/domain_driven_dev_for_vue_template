<template lang="pug">
.page.w-full
  Entry()
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import Entry from "~/presentation/pages/Entry.vue";

export default defineComponent({
  name: "App",
  components: {
    Entry
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
