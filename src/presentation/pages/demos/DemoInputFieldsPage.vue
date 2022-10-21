<template>
  <h3>Inputs Demo</h3>
  <div class="flex">
    <SearchBar
      :min-search-length="3"
      :placeholder="'輸入通用材料名稱...'"
      @input-changed="log"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import SearchBar from "../../components/inputs/SearchBar.vue";

export default defineComponent({
  name: "DemoIndexPage",
  components: { SearchBar },
  props: {},
  emit: ["close", "route"],
  setup(props, { emit }) {
    /** 儲存參數 */
    const log = () => {
      console.log("asd");
    };
    return {
      log
    };
  }
});
</script>

<style lang="scss" scoped></style>
