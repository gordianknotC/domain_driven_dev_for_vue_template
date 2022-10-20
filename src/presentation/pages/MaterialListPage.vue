<template>
  <h3>MaterialList</h3>
  <div class="flex">
    <DropdownButton
      :class="'p-8'"
      :title="'標籤文字'"
      :placeholder="'請選擇'"
      :hint="'提示文字'"
      :items="['1', '2123123123123123123123123123', '3', '顯示全部']"
    />
    <DropdownButton
      :class="'p-8'"
      :title="'標籤文字'"
      :placeholder="'請選擇'"
      :hint="'提示文字'"
      :is-disable="true"
      :items="['11', '21', '31', '顯示全部1']"
    />
    <DropdownButton
      :class="'p-8'"
      :title="'標籤文字'"
      :placeholder="'請選擇'"
      :is-disable="true"
      :items="['12', '22', '32', '顯示全部2']"
    />
    <DropdownButton
      :class="'p-8'"
      :placeholder="'請選擇'"
      :items="['12', '22', '32', '顯示全部2']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import DropdownButton from "../components/DropdownButton.vue";

export default defineComponent({
  name: "MaterialListPage",
  components: { DropdownButton },
  props: {},
  setup(props, { emit }) {
    /** 儲存參數 */
    return {};
  }
});
</script>

<style lang="scss" scoped></style>
