<template lang="pug">
.w-full.h-full.flex.justify-center.items-center
  p.text-2xl {{$t("notFound")}}
</template>
<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "NotFound"
});
</script>

<style lang="scss" scoped></style>
