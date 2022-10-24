<template>
  <el-menu-item v-if="!children" class="aside-item item-human-resource">
    <div v-if="enlarge" class="aside-item-enlarge">
      <SvgIcon size="20" :name="iconName"></SvgIcon>
      <span>{{ value }}</span>
    </div>
    <div v-else class="aside-item-enclose">
      <SvgIcon size="20" :name="iconName"></SvgIcon>
    </div>
  </el-menu-item>
  <el-menu-item-group v-else>
    <AppMenuItem
      v-for="(val, name, index) in children"
      :value="val!.label.value"
      :icon-name="val!.icon"
      :enlarge="enlarge"
    >
    </AppMenuItem>
  </el-menu-item-group>
</template>

<script lang="ts" setup>
import { PropType } from "vue";
import {
  ElMenuConfigItem,
  ElMenuConfigItemGroup
} from "~/presentation/third_parties/utils/element_menu_helper";

const name = "AppMenuItem";
// NOTE: inheritAttrs 有用到，不要刪
const inheritAttrs = true;
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
    type: Object as PropType<ElMenuConfigItemGroup>
  }
});
</script>

<style lang="scss">
.aside-item {
  @apply mb-4 flex flex-row justify-start p-2;
  height: 2.75rem;

  svg {
    @apply mr-2 text-text-light;
    &:hover {
      @apply text-text-strong;
    }
  }
  span {
    @apply text-text-light;
    &:hover {
      @apply text-text-strong;
    }
  }

  &-enlarge {
    width: 9rem;
  }
  &-enclose {
    width: 9rem;
  }
}
</style>
