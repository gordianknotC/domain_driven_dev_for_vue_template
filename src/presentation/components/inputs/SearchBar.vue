<template>
  <el-input class="custom-el-input" v-model="input" :placeholder="placeholder">
    <template #prefix>
      <svg-icon name="search" :height="iconSize" :width="iconSize" />
    </template>
  </el-input>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import SvgIcon from "../../components/SvgIcon.vue";
import debounce from "lodash/debounce";

const props = defineProps({
  placeholder: { type: String, default: "" },
  // 需要延遲的毫秒數
  debounceDuration: {
    type: Number,
    default: 300
  },
  // 超過幾字元才觸發search
  minSearchLength: {
    type: Number,
    default: 0
  },
  //
  inputValidation: {
    type: RegExp,
    default: RegExp("")
  }
});
const emit = defineEmits<{ (e: "inputChanged", inputValue: string): void }>();

const input = ref("");
const iconSize = "14px";

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
    if (val.length < props.minSearchLength) return;
    const ok = props.inputValidation.test(val);
    if (!ok) return;

    debounceCallback(val.trim());
  }
);
</script>
<style lang="scss">
.custom-el-input {
  @apply text-xs;

  .el-input__prefix {
    padding: 0px;
  }
  .el-input__wrapper {
    @apply py-1.5 px-5;
    border-radius: 8px;
  }
  .el-input__prefix-inner {
    @apply pr-3;
    .svg-icon {
      margin: 0px;
    }
  }
}
</style>
