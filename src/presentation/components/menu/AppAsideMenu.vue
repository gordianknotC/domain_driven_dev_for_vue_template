<template>
  <div class="aside-menu" :class="{ 'aside-menu--large': isEnlarge }">
    <el-menu
      ref="menuElt"
      mode="vertical"
      :default-active="activeIndex"
      :unique-opened="true"
      :router="true"
      @select="onMenuSelect"
    >
      <AppMenuItemGroup
        v-for="(val, name, idx) in menuConfig.children"
        :value="val.label"
        :index="val.index"
        :route="val.route"
        :icon-name="val.icon"
        :enlarge="isEnlarge"
        :children="val.children"
      ></AppMenuItemGroup>
    </el-menu>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, PropType, ref, computed, onUnmounted } from "vue";
import { facade } from "~/main";
import AppMenuItemGroup from "../buttons/AppMenuItemGroup.vue";

const menuElt = ref<HTMLElement>();

const menuConfig = computed(() => facade.stores.appMenu.state.config);

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
  width: 4.5rem;
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
