<template>
  <el-menu-item v-if="!children" class="aside-item">
    <Container v-if="enlarge" class="aside-item--enlarge">
      <SvgIcon size="20" :name="iconName"></SvgIcon>
      <span>{{ value }}</span>
    </Container>
    <Container v-else class="aside-item--enclose">
      <SvgIcon size="20" :name="iconName"></SvgIcon>
    </Container>
  </el-menu-item>

  <el-menu-item-group class="aside-group" v-else>
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
import Container from "../utils/Container.vue";

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

<style lang="scss" scoped>
.aside-item {
  @apply mb-4 flex flex-row items-center justify-start;
  height: 2.75rem;

  svg {
    @apply mr-2 flex items-center text-text-light;
    &:hover {
      @apply text-text-strong;
    }
  }
  span {
    @apply text-2xl text-text-light;
    line-height: 2;
    &:hover {
      @apply text-text-strong;
    }
  }

  &--enlarge {
    @apply flex flex-row;
    width: 100%;
  }
  &--enclose {
    @apply flex flex-row;
    width: 100%;
  }
}
</style>
