<template lang="pug">
  h3 Buttons Demo
  p -------
  BaseButton(
    color="blue"
    disable=true
    
  ) 123
  p -------
  BaseButton(
    color="blue"
    type="light"
    disable=true
  ) 123
  p -------
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import BaseButton from "~/presentation/components/buttons/BaseButton.vue";

export default defineComponent({
  name: "DemoButtonsPage",
  components: {
    BaseButton
  },
  props: {},
  emit: ["close", "route"],
  setup(props, { emit }) {
    /** 儲存參數 */
    return {};
  }
});
</script>

<style lang="scss" scoped></style>
