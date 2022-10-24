<template>
  <el-menu
    class="aside"
    ref="menuElt"
    mode="vertical"
    @select="onMenuSelect"
    :default-active="activeIndex"
  >
    <!-- TODO: 暫時不用 v-for，因需求還不清楚 -->
    <AppMenuItem
      v-for="(val, name, idx) in APP_MENU_CONFIG.children"
      :value="val.label.value"
      :index="val.index"
      :icon-name="val.icon"
      :enlarge="isEnlarge"
      :children="val.children"
    ></AppMenuItem>
  </el-menu>
</template>

<script lang="ts" setup>
import { fa } from "element-plus/es/locale";
import { onMounted, PropType, ref, computed } from "vue";
import { facade } from "~/main";
import { APP_MENU_CONFIG } from "../configs/menu_config";
import AppMenuItem from "./buttons/AppMenuItem.vue";
import DemoDropdownsPage from "./DemoDropdownsPage.vue";
import SvgIcon from "./SvgIcon.vue";

const menuElt = ref<HTMLElement>();
const props = defineProps({
  mode: {
    type: String as PropType<"enlarge" | "enclose">,
    default: true
  }
});

const isEnlarge = computed(() => {
  return facade.stores.sideMenu.state.enlarged;
});

const onMenuSelect = () => {};

const activeIndex = computed<string>({
  get() {
    return facade.stores.sideMenu.state.activated!.name;
  },
  set(val: string) {
    facade.stores.sideMenu.setActiveIndex(val);
  }
});

onMounted(() => {
  console.log("AppAsideMenu mounted1", this, props, menuElt.value);
});
</script>

<style lang="scss">
.aside {
  @apply p-4;
  &-item {
    @apply mb-4 flex flex-row justify-start p-2;
    width: 9rem;
    height: 2.75rem;
  }
}
.item-dashboard {
}
.item-human-resource {
}
.item-material {
}
.item-supplier {
}
.item-project-mgr {
}
.item-uac {
}
</style>
