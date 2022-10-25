<template>
  <div class="holder">
    <div class="holder-bread-menu">
      <el-button :color="colors.bg.appHeader" dark @click="onClickBreadMenu">
        <SvgIcon name="Dehaze" size="20px"></SvgIcon>
      </el-button>
    </div>
    <div class="holder-branding">
      <el-image :src="brandingImg"></el-image>
    </div>
    <div class="holder-marquee">
      <Marquee></Marquee>
    </div>
    <div class="holder-account">
      <UACDropDownButton></UACDropDownButton>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppHeader",
  emits: ["toggle-bread-menu"],
  components: { SvgIcon, UACDropDownButton }
};
</script>
<script lang="ts" setup>
import { facade } from "~/main";
import colors from "~/presentation/assets/colors/default_colors";
import brandingImg from "~/presentation/assets/images/branding.png";
import UACDropDownButton from "../buttons/UACDropDownButton.vue";
import Marquee from "../Marquee.vue";
import SvgIcon from "../SvgIcon.vue";

const onClickBreadMenu = () => {
  facade.stores.appMenu.toggleAsideMenu();
};
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
    @apply flex w-full flex-1 px-4;
  }
  &-account {
    @apply flex flex-row items-center justify-around pr-5;
    min-width: 108px;
  }
}
</style>
