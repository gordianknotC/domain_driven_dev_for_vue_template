<template lang="pug">
AdminHeader
.flex
  AdminAsideMenu
  .page-content
    .tabs-wrapper.main-tabs
      el-tabs(
        type="card"
        v-model="currentTabName"
        @tab-click="tabClick"
        @tab-remove="removeTab"
        :key="app.state.language"
      )
        el-tab-pane(
          v-for="(tab, idx) in openedTabs"
          v-model="tab.title"
          :key="tab.name"
          :label="tab.title"
          :name="tab.name"
          :closable="tab.name !== RouterNames.AdminHome"
        )
          template(#label)
            SvgIcon.inline-block(
              name="home"
              :size="20"
              v-if="idx === 0"
            )
            span {{tab.title}}
    main.page-main
      section.inline-flex.w-full
        .spacer
        .now {{app.state.serverTime}}
      router-view(:key="fullPath")
</template>

<script lang="ts">
import { defineComponent } from "vue";
import RouterNames from "@/router/name";
import AdminAsideMenu from "~/components/AdminAsideMenu.vue";
import AdminHeader from "~/components/AdminHeader.vue";
import {computed} from "~/types/base/vueTypes";
import {facade} from "~/types/extendBase/facadeTypes";

export default defineComponent({
  name: "AdminHomeLayout",
  components: {
    AdminHeader,
    AdminAsideMenu
  },
  setup() {
    const tabClick = ({ paneName }: any) => {
      facade.router.push({
        name: paneName
      });
    };

    const removeTab = (routeName: string) => {
      const nav = facade.appReact.routeNameToNav(routeName);
      facade.appReact.closeTab(nav);
    };


    return {
      app: facade.appReact,
      RouterNames,
      tabClick,
      removeTab,
      currentTabName: computed(()=> {
        const w = facade.appReact.state.language;
        return facade.appReact.currentTab.value.name;
      }),
      openedTabs: computed(()=> {
        const w = facade.appReact.state.language;
        return facade.appReact.openedTabs.value;
      }),
      fullPath: computed(()=>facade.router.currentRoute.value.fullPath)
    };
  }
});
</script>

<style lang="scss" scoped>
@import "../assets/styles/variables";

.page-content {
  @apply flex-1 grid h-full;
  grid-template-rows: $tab-height 1fr;
  width: calc(100vw - #{$aside-width});
}

.page-main {
  @apply overflow-y-auto relative;
  height: calc(100vh - #{$header-tab-height});

  .spacer{
    @apply w-full;
    flex: 1 1 0;
  }
  .now{
    @apply text-secondary text-left;
    flex: 0 0 16.5rem;
  }
}

.tabs-wrapper {
  height: $tab-height;
}

</style>
