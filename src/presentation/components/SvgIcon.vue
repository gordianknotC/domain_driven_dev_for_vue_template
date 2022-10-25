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
import { computed } from "@vue/reactivity";
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
    size: {
      type: String
    }
  },
  setup(props) {
    return {
      props: computed(() => {
        const width = props.size ?? props.width;
        const height = props.size ?? props.height;
        const name = props.name;
        return {
          width,
          height,
          name
        };
      })
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
