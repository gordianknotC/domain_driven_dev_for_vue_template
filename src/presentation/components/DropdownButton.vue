<template>
  <div class="flex-col justify-start">
    <div class="pb-2 text-left text-xs text-strong">{{ title }}</div>
    <el-dropdown
      :class="{ 'bg-inputDisable': isDisable }"
      class="min-w-116 rounded border px-4 py-2 focus:border-primary-sd1"
      trigger="click"
      :disabled="isDisable"
      @command="onItemSelected"
    >
      <span class="flex w-full select-none justify-between">
        <div class="text-strong" v-if="selectedItem">
          {{ selectedItem }}
        </div>
        <div class="text-light" v-else>{{ placeholder }}</div>
        <span class="w-3"></span>
        <el-icon><arrow-down /></el-icon>
      </span>

      <template #dropdown>
        <el-dropdown-menu v-for="item in items">
          <el-dropdown-item :key="item" :command="item">
            {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <div class="pt-1 text-left text-2xs text-light">{{ hint }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, PropType } from "vue";

export default defineComponent({
  name: "DropdownButton",
  props: {
    title: {
      type: String
    },
    placeholder: {
      type: String
    },
    hint: {
      type: String
    },
    items: {
      type: Array as PropType<string[]>,
      default: []
    },
    defaultItem: {
      type: String
    },
    isDisable: {
      type: Boolean,
      default: false
    }
  },
  emit: ["itemSelected"],
  setup(props, { emit }) {
    const selectedItem = ref("");

    onMounted(() => {
      if (props.defaultItem) {
        selectedItem.value = props.defaultItem;
      }
    });

    // 點取選項，觸發itemSelected event
    const onItemSelected = (item: string) => {
      selectedItem.value = item;
      emit("itemSelected", item);
    };

    return {
      onItemSelected,
      selectedItem
    };
  }
});
</script>

<style lang="scss">
.min-w-116 {
  min-width: 116px;
}
</style>
