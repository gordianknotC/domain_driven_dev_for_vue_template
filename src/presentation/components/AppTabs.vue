<template lang="pug">
Container()
    el-tabs.app-tab(
        type="card"
        v-model="currentTabName"
        @tab-click="onTabClick"
        @tab-remove="onRemoveTab"
        :key="languageKey"
    )
        el-tab-pane(
            v-for="(tab, idx) in openedTabs"
            v-model="tab.title"
            :key="tab.name"
            :label="tab.title"
            :name="tab.name"
            :closable="idx != 0"
        )
          template(v-if="idx == 0" #label)
            svg-icon.inline-block(:size="20" name="Home")
          template(v-else #label)
            span {{tab.title}}
    </template>

<script lang="ts">
export default {
  name: "AppTabs",
  inheritAttrs: true
};
</script>

<script lang="ts" setup>
import { computed, onMounted } from "vue";
import { facade } from "~/main";
import { ERouteName } from "../consts/router_const";
import type { LocaleKeys } from "../controller/i18n/locales/tw";

const currentTabName = computed({
  get() {
    return facade.stores.appMenu.state.activated!.name;
  },
  set(val: string) {
    return facade.stores.appMenu.setActiveTab(
      facade.stores.appMenu.getTabItem(val as any)
    );
  }
});

const openedTabs = computed(() => {
  return facade.stores.appMenu.state.openedTabs!.map(_ => {
    console.log("onOopenTabsChanged....");
    return {
      name: _.name,
      title: facade.stores.t[`routes.${_.name}` as any as LocaleKeys]
    };
  });
});

const onTabClick = ({ paneName }: { paneName: string }) => {
  // TODO: query, params...
  facade.stores.router.push({ name: paneName });
};

const onRemoveTab = (routeName: string) => {
  facade.stores.appMenu.removeTab(routeName);
};

onMounted(() => {
  console.log("currentTabName", currentTabName.value);
  console.log("openedTabs", openedTabs.value);
});
</script>

<style lang="scss" scoped>
.tab-h {
  height: 2.15rem !important;
  line-height: 2.15rem !important;
}
.app-tab {
  @apply w-full;
  @extend .tab-h;
}

::v-deep() {
  .el-tabs {
    @apply tab-gradient-bg;
    @extend .tab-h;

    &__header,
    &__card,
    &__nav-wrapper,
    &__nav,
    &__item,
    &__nav-scroll {
      @extend .tab-h;
      margin: 0px;
    }

    &__nav {
      &.is-top {
        @apply rounded-none border-0 #{!important};
      }
      &-wrap {
        @apply h-full;
      }
    }

    &__item {
      @apply px-4;
      svg {
        @apply text-text-bright;
      }
      span {
        @apply text-xs text-text-bright;
      }
      &.is-active {
        background-color: white;
        svg {
          @apply text-text-strong;
        }
        span {
          @apply text-xs text-text-strong;
        }
      }
      &:last-child {
        @apply pr-4 #{!important};
      }
    }

    &__card {
      @apply border-0 #{!important};
    }
  }
}
</style>
