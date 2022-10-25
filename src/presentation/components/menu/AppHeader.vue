<template>
  <div class="holder">
    <div class="holder-bread-menu">
      <el-button :color="colors.bg.appHeader" dark>
        <SvgIcon name="Dehaze" :size="20"></SvgIcon>
      </el-button>
    </div>
    <div class="holder-branding">
      <el-image :src="brandingImg"></el-image>
    </div>
    <div class="holder-marquee">
      <Marquee></Marquee>
    </div>
    <div class="holder-account"></div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppHeader",
  emits: ["toggle-bread-menu"]
};
</script>
<script lang="ts" setup>
import colors from "~/presentation/assets/colors/default_colors";
import brandingImg from "~/presentation/assets/images/branding.png";
import Marquee from "../Marquee.vue";
</script>

<style lang="scss" scoped>
.holder {
  @apply flex w-full bg-appHeader;
  height: 4rem;
  &-bread-menu {
    width: 4rem;
    ::v-deep(.el-button) {
      @apply flex h-full w-full items-center rounded-none;
    }
  }
  &-branding {
    @apply flex items-center;
    width: 239px;
  }
  &-marquee {
    @apply flex w-full flex-1 pl-4;
  }
  &-account {
    @apply pr-5;
    min-width: 108px;
  }
}
</style>
