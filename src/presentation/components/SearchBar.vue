<template>
  <div>
    <el-input v-model="input" :placeholder="placeholder" :prefix-icon="Search">
    </el-input>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";
import debounce from "lodash/debounce";

export default defineComponent({
  name: "SearchBar",
  props: {
    placeholder: { type: String, default: "" },
    // 需要延遲的毫秒數
    debounceDuration: {
      type: Number,
      default: 300
    }
  },
  emits: ["inputChanged"],
  setup(props, { emit }) {
    const input = ref("");

    // 經過debounceDuration 後再觸發inputChanged event
    const debounceCallback = debounce(
      (val: string) => emit("inputChanged", val),
      props.debounceDuration,
      {}
    );

    watch(
      () => input.value,
      (val, prevVal) => {
        // 值若改變則觸發debounceCallback,
        // 忽略前後空白格
        if (val === prevVal) return;
        debounceCallback(val.trim());
      }
    );

    return {
      props,
      input,
      Search
    };
  }
});
</script>
<style></style>
