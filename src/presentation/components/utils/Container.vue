<template lang="pug">
div(
  v-if="isDev()"
  :style="outline ? `outline-color:${color()};` : ''"
  :class="{outline}"
)
  slot(name="default")
div(
  v-else
)
  slot(name="default")
</template>

<script lang="ts">
import { isDeclareVariable } from "@babel/types";
import { defineComponent, PropType } from "vue";
import { getColorArray } from "~/presentation/third_parties/utils/color_utils";
import { isNotDev, isDev } from "~/presentation/third_parties/utils/env_util";

let currentIndex = -1;
const numbersOfSteps = 50;
const colors = getColorArray(numbersOfSteps);

export default defineComponent({
  name: "Container",
  props: {
    bgImage: {
      type: String
    }
  },
  setup() {
    return {
      color() {
        currentIndex += 3;
        return colors[currentIndex % numbersOfSteps];
      },
      outline: true,
      isDev
    };
  }
});
</script>
<style lang="scss" scoped>
.outline {
  outline: 1px solid;
  outline-offset: -1px;
}
</style>
