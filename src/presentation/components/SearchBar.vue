<template>
  <div>
    <el-input v-model="input" :placeholder="placeholder" :prefix-icon="Search">
    </el-input>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { Search } from "@element-plus/icons-vue";

export default defineComponent({
  name: "SearchBar",
  props: {
    placeholder: { type: String, default: "" }
  },
  emits: ["onValueChanged"],
  setup(props, { emit }) {
    const input = ref("");
    watch(
      () => input.value,
      (val, prevVal) => {
        if (val === prevVal) return;
        emit("onValueChanged", val);
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
<style lang="ts"></style>
