<template lang="pug">
h3 hello
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
export default defineComponent({
  name: "Entry",
  components: {
  },
  props: {
  },
  emit: ["close", "route"],
  setup(props, { emit }) {
    /** 儲存參數 */
    return {
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
