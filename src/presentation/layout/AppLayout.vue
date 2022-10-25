<template>
  <div class="app-layout">
    <AppHeader> </AppHeader>
    <div class="row-direction">
      <AppAsideMenu> </AppAsideMenu>
      <div class="col-direction">
        <AppTabs></AppTabs>
        <div class="page-layout">
          <router-view> </router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppLayout"
};
</script>
<script lang="ts" setup>
import AppAsideMenu from "../components/menu/AppAsideMenu.vue";
import AppHeader from "../components/menu/AppHeader.vue";
import AppTabs from "../components/menu/AppTabs.vue";
</script>

<style lang="scss" scoped>
.app-layout {
  @apply flex h-screen w-screen flex-col justify-start overflow-y-hidden;
}
.page-layout {
  @apply bg-bg-pageBlank flex min-h-full w-full justify-center overflow-y-auto p-6;
  max-height: 100vh;
  height: auto;
}
</style>
