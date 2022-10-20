<template>
  <h3>customize el-select</h3>
  <div>
    <el-select
      v-model="value"
      size="large"
      @focus="onFocus"
      @click="onClick"
      @show="onShow"
      @hide="onHide"
      @open="onOpen"
      @close="onClose"
    >
      <template v-slot>
        <div></div>
      </template>
      <template v-slot:empty>
        <div>dropcontent: {{ dropContent }} :</div>
      </template>
    </el-select>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

console.log("mount demo pageindex");
const value = ref("");
const dropContent = ref("");
const onFocus = v => {
  console.log("onFocus", v);
  dropContent.value = v;
};
const onClick = () => {
  console.log("click");
};
const onHide = () => {
  console.log("hide");
};

const onShow = () => {
  console.log("onShow");
};
const onOpen = () => {
  console.log("onOpen");
};
const onClose = () => {
  console.log("onClose");
};
const options = [
  {
    value: "Option1",
    label: "Option1"
  },
  {
    value: "Option2",
    label: "Option2"
  },
  {
    value: "Option3",
    label: "Option3"
  },
  {
    value: "Option4",
    label: "Option4"
  },
  {
    value: "Option5",
    label: "Option5"
  }
];
</script>

<style lang="scss" scoped></style>
