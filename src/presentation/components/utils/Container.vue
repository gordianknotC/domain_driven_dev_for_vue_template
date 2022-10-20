<template lang="pug">
section(
  :style="outline ? `outline-color:${color()};` : ''"
  :class="{outline}"
)
  slot(name="default")
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";

function rainbow(numOfSteps: number, step: number): string {
  // This function generates vibrant, "evenly spaced" colours (i.e. no clustering). This is ideal for creating easily distinguishable vibrant markers in Google Maps and other apps.
  // Adam Cole, 2011-Sept-14
  // HSV to RBG adapted from: http://mjijackson.com/2008/02/rgb-to-hsl-and-rgb-to-hsv-color-model-conversion-algorithms-in-javascript
  let r, g, b;
  let h = step / numOfSteps;
  //prettier-ignore
  let i = ~~(h * 6);
  let f = h * 6 - i;
  let q = 1 - f;
  switch (i % 6) {
    case 0:
      r = 1;
      g = f;
      b = 0;
      break;
    case 1:
      r = q;
      g = 1;
      b = 0;
      break;
    case 2:
      r = 0;
      g = 1;
      b = f;
      break;
    case 3:
      r = 0;
      g = q;
      b = 1;
      break;
    case 4:
      r = f;
      g = 0;
      b = 1;
      break;
    case 5:
      r = 1;
      g = 0;
      b = q;
      break;
  }

  //@ts-ignore prettier-ignore
  const c =
    "#" +
    ("00" + (~~(r * 255)).toString(16)).slice(-2) +
    ("00" + (~~(g * 255)).toString(16)).slice(-2) +
    ("00" + (~~(b * 255)).toString(16)).slice(-2);
  return c;
}

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
    bgImage: {
      type: String
    }
  },
  setup() {
    console.log("");
    return {
      color() {
        currentIndex++;
        return colors[currentIndex % numbersOfSteps];
      },
      outline: true
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
