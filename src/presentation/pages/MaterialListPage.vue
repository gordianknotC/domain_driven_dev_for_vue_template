<template>
  <h3>MaterialList</h3>
  <SvgIcon name="loading"></SvgIcon>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import SvgIcon from "../components/SvgIcon.vue";

export default defineComponent({
  name: "MaterialListPage",
  props: {},
  setup(props, { emit }) {
    /** 儲存參數 */
    return {};
  },
  components: { SvgIcon }
});
</script>

<style lang="scss" scoped></style>
