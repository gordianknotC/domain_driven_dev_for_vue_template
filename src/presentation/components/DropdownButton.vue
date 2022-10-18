<template>
  <div>
    <el-dropdown
      class="rounded border p-2"
      trigger="click"
      @command="onItemSelected"
    >
      <span class="flex align-middle">
        <div v-if="selectedItem">{{ selectedItem }}</div>
        <div v-else>{{ placeholder }}</div>
        <el-icon><arrow-down /></el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu v-for="(item, idx) in items">
          <el-dropdown-item :key="idx" :command="item">
            {{ item }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, PropType } from "vue";

export default defineComponent({
  name: "DropdownButton",
  props: {
    placeholder: {
      type: String
    },
    items: {
      type: Array as PropType<string[]>,
      default: []
    },
    defaultItem: {
      type: String
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

<style lang=""></style>
