<template>
  <h3>Dropdown Buttons Demo</h3>
  <div class="flex">
    <DropdownButton
        :class="'p-8'"
        :title="'標籤文字'"
        :placeholder="'請選擇'"
        :items="['1', '2', '3', '顯示全部']"
    />
    <DropdownButton
        :class="'p-8'"
        :title="'標籤文字'"
        :placeholder="'請選擇'"
        :is-disable="true"
        :items="['12', '2', '3', '顯示全部']"
    />
  </div>
  <div class="flex">
    <DropdownButton
        :class="'p-8'"
        :placeholder="'請選擇'"
        :items="['2', '2', '3', '顯示全部']"
    />
    <DropdownButton
        :class="'p-8'"
        :placeholder="'請選擇'"
        :is-disable="true"
        :items="['22', '2', '3', '顯示全部']"
    />
  </div>
  <div class="flex">
    <DropdownButton
        :class="'p-8'"
        :title="'標籤文字'"
        :placeholder="'請選擇'"
        :hint="'提示文字'"
        :items="['3', '2123123123123123123123123123', '3', '顯示全部']"
    />
    <DropdownButton
        :class="'p-8'"
        :title="'標籤文字'"
        :placeholder="'請選擇'"
        :hint="'提示文字'"
        :is-disable="true"
        :items="['32', '2123123123123123123123123123', '3', '顯示全部']"
    />
  </div>
  <div class="flex">
    <DropdownButton
        :class="'p-8'"
        :placeholder="'請選擇'"
        :hint="'提示文字'"
        :items="['4', '2123123123123123123123123123', '3', '顯示全部']"
    />
    <DropdownButton
        :class="'p-8'"
        :placeholder="'請選擇'"
        :hint="'提示文字'"
        :is-disable="true"
        :items="['42', '2123123123123123123123123123', '3', '顯示全部']"
    />


  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import DropdownButton from "../../components/buttons/DropdownButton.vue";

export default defineComponent({
  name: "DemoIndexPage",
  components: { DropdownButton },
  props: {},
  emit: ["close", "route"],
  setup(props, { emit }) {
    /** 儲存參數 */
    return {};
  }
});
</script>

<style lang="scss" scoped></style>
