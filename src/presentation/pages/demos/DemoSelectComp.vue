<template>
  <section>
    <section>
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
            <el-option v-for="(item, idx) in ['a', 'b']"></el-option>
            <div class="p-4">
              <div>dropcontent: {{ dropContent }} :</div>
              <el-input></el-input>
            </div>
          </template>
          <template v-slot:empty> </template>
        </el-select>
      </div>
    </section>
    <section></section>
  </section>
</template>

<script lang="ts" setup>
import { booleanLiteral } from "@babel/types";
import { ref, defineEmits } from "vue";

console.log("mount demo pageindex");
const emit = defineEmits<{
  (
    eventName: "focus",
    argName: "some",
    argNameOther: "how",
    third: "wow"
  ): void;
  (eventName: "blur", otherArg: "some"): boolean;
}>();

const name = "DemoSelectComp";
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
