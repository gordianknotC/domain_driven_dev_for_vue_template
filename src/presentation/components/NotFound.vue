<template lang="pug">
.NotFound
  van-empty(
    image="error"
    description="404"
  )
    van-button.btn--primary(
      size="small"
      :to="goHomeUrl"
      rounded
    ) Back to HomePage
</template>

<script lang="ts">
import goHomeUrl from "@/utils/goHomeUrl";
export default {
  setup() {
    return {
      goHomeUrl
    };
  }
};
</script>

<style lang="scss" scoped>
.NotFound {
  width: 100vw;
  height: 100vh;

  @apply flex justify-center items-center bg-white;
}
</style>
