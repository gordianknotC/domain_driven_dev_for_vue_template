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
    <Container class="holder-marquee"> </Container>
    <Container class="holder-account"> </Container>
  </div>
</template>

<script lang="ts">
export default {
  name: "AppHeader",
  emits: ["toggle-bread-menu"]
};
</script>
<script lang="ts" setup>
import { defineComponent } from "vue";
import colors from "~/presentation/assets/colors/default_colors";
import brandingImg from "~/presentation/assets/images/branding.png";
import Container from "../utils/Container.vue";
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
    width: 239px;
  }
  &-marquee {
    @apply w-full flex-1;
  }
  &-account {
    @apply pr-5;
    min-width: 108px;
  }
}
</style>
