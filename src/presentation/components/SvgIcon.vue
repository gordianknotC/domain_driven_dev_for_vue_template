<template>
  <svg
    class="svg-icon"
    :style="{
      width: props.width,
      height: props.height
    }"
  >
    <use :xlink:href="`#icon-${props.name}`" />
  </svg>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "SvgIcon",
  props: {
    name: {
      type: String,
      required: true,
      default: "email"
    },
    width: {
      type: String,
      default: "24px"
    },
    height: {
      type: String,
      default: "24px"
    },
    color: {
      type: String,
      default: "#000"
    }
  },
  setup(props) {
    return {
      props
    };
  }
});
</script>

<style lang="scss">
//.svg-icon {
//  fill: currentColor;
//  stroke: currentColor;
//}
</style>
