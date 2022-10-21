<template>
  <Container class="holder">
    <Container class="holder-bread-menu"></Container>
    <Container class="holder-branding"></Container>
    <Container class="holder-marquee"></Container>
    <Container class="holder-account"></Container>
  </Container>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Container from "./utils/Container.vue";

export default defineComponent({
  name: "AppHeader",
  emits: ["toggle-bread-menu"],
  setup(props) {
    return {};
  },
  components: { Container }
});
</script>

<style lang="scss">
.holder {
  @apply flex w-full;
  height: 4rem;
  &-bread-menu {
    width: 4rem;
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
