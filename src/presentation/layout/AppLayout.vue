<template>
  <div class="app-layout">
    <AppHeader> </AppHeader>
    <div class="row-direction">
      <AppAsideMenu> </AppAsideMenu>
      <div class="col-direction">
        <AppTabs></AppTabs>
        <div class="content-layout">
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
  @apply flex h-screen w-screen flex-col justify-start;
}
.content-layout {
  @apply flex h-full w-full  justify-center p-6;
}
</style>
