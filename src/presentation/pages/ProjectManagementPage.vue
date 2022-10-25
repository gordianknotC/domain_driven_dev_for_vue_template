<template>
  <h3>{{ title }}</h3>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { facade } from "~/main";
const title = computed(() => facade.stores.t.projectManagement);
const props = defineProps<{}>();
const name = "ProjectManagementPage";
</script>

<style lang="scss" scoped></style>
