<template>
  <div class="uac-dropdown">
    <SvgIcon name="Account" size="20px"></SvgIcon>
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userName }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, PropType, computed } from "vue";
import { facade } from "~/main";
export default defineComponent({
  name: "UACDropDownButton",
  emit: ["itemSelected"],
  setup(props, { emit }) {
    const userName = computed(() => {
      return facade.stores.t.userName;
    });
    return {
      userName
    };
  }
});
</script>

<style lang="scss" scoped>
.uac-dropdown {
  @apply flex flex-row justify-start;
  > svg {
    @apply mr-1 text-text-bright;
  }
}

::v-deep() {
  .el-dropdown {
    @apply text-text-bright #{!important};
    @apply flex items-center #{!important};
    &-link {
      @apply flex items-center #{!important};
    }
  }
}
</style>
