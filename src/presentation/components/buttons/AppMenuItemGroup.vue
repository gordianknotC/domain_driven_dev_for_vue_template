<template>
  <el-menu-item class="aside-group">
    <div v-if="enlarge" class="aside-group--enlarge">
      <SvgIcon size="20" :name="iconName"></SvgIcon>
      <span>{{ value }}</span>
    </div>
    <div v-else class="aside-group--enclose">
      <SvgIcon size="20" :name="iconName"></SvgIcon>
    </div>
  </el-menu-item>
</template>

<script lang="ts">
export default {
  name: "AppMenuItemGroup",
  inheritAttrs: true
};
</script>

<script lang="ts" setup>
import { PropType, useAttrs } from "vue";
import {
  ElMenuConfigItem,
  ElMenuConfigItemGroup
} from "~/presentation/third_parties/utils/element_menu_helper";
import Container from "../utils/Container.vue";
import AppMenuItem from "./AppMenuItem.vue";

const props = defineProps({
  value: {
    type: String,
    required: true
  },
  enlarge: {
    type: Boolean,
    default: true
  },
  iconName: {
    type: String,
    required: true
  },
  children: {
    type: Object as PropType<Record<any, ElMenuConfigItem>>
  }
});

const attrs = useAttrs();
</script>

<style lang="scss" scoped>
.hover {
  @apply rounded-md bg-bg-primaryActivated text-text-bright #{!important};
}

.aside-group {
  @apply mb-4 flex flex-row items-center justify-start text-text-light;
  height: 2.25rem;
  svg {
    @apply mr-2 flex items-center;
  }
  span {
    @apply text-sm;
    line-height: 2;
  }

  &.is-active {
    @extend .hover;
  }

  &--enlarge {
    @apply flex h-full flex-row items-center p-2;
    width: 100%;
    &:hover {
      @extend .hover;
    }
  }
  &--enclose {
    @apply flex h-full flex-row items-center p-2;
    width: 100%;
    &:hover {
      @extend .hover;
    }
  }
}
</style>
