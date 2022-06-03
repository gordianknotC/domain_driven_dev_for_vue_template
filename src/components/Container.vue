<template lang="pug">
section(
  :style="outline ? `outline-color:${color()};` : ''"
  :class="{outline}"
)
  slot(name="default")
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import {rainbow} from "~/utils/color";


const numbersOfSteps = 50;
const colors: string[] = [];
for (let i = 0; i < numbersOfSteps; i++) {
  const color = rainbow(numbersOfSteps, i);
  colors.push(color);
}

let currentIndex = -1;

export default defineComponent({
  name: "Container",
  props: {
    bgImage:{
      type: String,
    }
  },
  setup() {
    return {
      color(){
        currentIndex++;
        return colors[currentIndex % numbersOfSteps];
      },
      outline: false
    };
  }
});
</script>
<style lang="scss" scoped>
.outline{
  outline: 1px solid;
  outline-offset: -1px;
}


</style>
