<template>
  <Container class="aside-menu" :class="{ 'aside-menu--large': isEnlarge }">
    <el-menu
      ref="menuElt"
      mode="vertical"
      :default-active="activeIndex"
      :unique-opened="true"
      :router="true"
      @select="onMenuSelect"
    >
      <AppMenuItemGroup
        v-for="(val, name, idx) in APP_MENU_CONFIG.children"
        :value="val.label.value"
        :index="val.index"
        :route="val.route"
        :icon-name="val.icon"
        :enlarge="isEnlarge"
        :children="val.children"
      ></AppMenuItemGroup>
    </el-menu>
  </Container>
</template>

<script lang="ts" setup>
import { fa } from "element-plus/es/locale";
import { onMounted, PropType, ref, computed, onUnmounted } from "vue";
import { facade } from "~/main";
import { APP_MENU_CONFIG } from "../configs/menu_config";
import AppMenuItem from "./buttons/AppMenuItem.vue";
import AppMenuItemGroup from "./buttons/AppMenuItemGroup.vue";
import DemoDropdownsPage from "./DemoDropdownsPage.vue";
import SvgIcon from "./SvgIcon.vue";
import Container from "./utils/Container.vue";

const menuElt = ref<HTMLElement>();
const props = defineProps({
  mode: {
    type: String as PropType<"enlarge" | "enclose">,
    default: true
  }
});

const isEnlarge = computed(() => {
  return facade.stores.appMenu.state.enlarged;
});

const onMenuSelect = (index: string, path: string, item: any, result: any) => {
  console.log("onMenuSelect", index, path, item, result);
};

const activeIndex = computed<string>({
  get() {
    return facade.stores.router.currentRoute.value.name as string;
  },
  set(val: string) {
    // pass
  }
});

onMounted(() => {
  facade.stores.appMenu.bindRouter();
});

onUnmounted(() => {
  facade.stores.appMenu.unbindRouter();
});
</script>

<style lang="scss" scoped>
.aside-menu {
  @apply aside-gradient-bg flex h-full flex-col justify-start bg-primary p-4;
  width: 5rem;
  &--large {
    width: 12rem !important;
  }
  &-item {
    @apply mb-4 flex flex-row justify-start p-2;
    width: 9rem;
    height: 2.75rem;
  }
}
</style>
