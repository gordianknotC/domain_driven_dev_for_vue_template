<template>
  <div class="flex-col justify-start">
    <div
      v-if="title"
      :class="[isDisable ? 'text-light' : 'text-strong']"
      class="pb-2 text-left text-xs"
    >
      {{ title }}
    </div>
    <el-dropdown
      tabindex="0"
      :class="{
        'bg-inputDisable': isDisable,
        'border-primary-sd1': isMenuVisible
      }"
      class="min-w-116 rounded border px-4 py-2"
      trigger="click"
      :disabled="isDisable"
      @visible-change="onDropdownVisibleChanged"
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
    <div v-if="hint" class="pt-1 text-left text-2xs text-light">{{ hint }}</div>
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
    const isMenuVisible = ref(false);

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

    // 選單彈出後改變border color, 收起後還原
    const onDropdownVisibleChanged = (isVisible: boolean) => {
      isMenuVisible.value = isVisible;
      console.log(isVisible);
    };

    return {
      onItemSelected,
      onDropdownVisibleChanged,
      selectedItem,
      isMenuVisible
    };
  }
});
</script>

<style lang="scss">
.min-w-116 {
  min-width: 116px;
}
</style>
