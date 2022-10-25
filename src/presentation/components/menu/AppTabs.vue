<template lang="pug">
div()
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
          svg-icon.inline-block(size="20px" name="Home")
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
import { ERouteName } from "~/presentation/consts/router_const";
import type { LocaleKeys } from "~/presentation/controller/i18n/locales/tw";
import Container from "../utils/Container.vue";

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

// FIXME: 改用 mapper model 寫，不要在這寫 logic
const openedTabs = computed(() => {
  return facade.stores.appMenu.state.openedTabs!.map(_ => {
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

const languageKey = computed(() => {
  return facade.stores.i18n.global.locale;
});

const onRemoveTab = (routeName: string) => {
  facade.stores.appMenu.removeTab(routeName);
};

onMounted(() => {
  // console.log("currentTabName", currentTabName.value);
  // console.log("openedTabs", openedTabs.value);
});
</script>

<style lang="scss" scoped>
.tab-cell {
  height: 2.15rem !important;
  line-height: 2.15rem !important;
  border: none !important;
}
.app-tab {
  @apply w-full;
  @extend .tab-cell;
}

::v-deep() {
  .el-tabs {
    @apply tab-gradient-bg;
    @extend .tab-cell;

    &__header,
    &__card,
    &__nav-wrapper,
    &__nav,
    &__item,
    &__nav-scroll {
      @extend .tab-cell;
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
