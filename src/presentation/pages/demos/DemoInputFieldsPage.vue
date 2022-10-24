<template>
  <h3>Inputs Demo</h3>
  <div class="flex items-center">
    <SearchBar
      :min-search-length="3"
      :placeholder="'輸入通用材料名稱...'"
      @input-changed="log"
    />
    <DropdownButton
      :placeholder="'請選擇'"
      :items="['1', '2', '3', '顯示全部']"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import SearchBar from "../../components/inputs/SearchBar.vue";
import DropdownButton from "../../components/buttons/DropdownButton.vue";

export default defineComponent({
  name: "DemoIndexPage",
  components: { SearchBar, DropdownButton },
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
