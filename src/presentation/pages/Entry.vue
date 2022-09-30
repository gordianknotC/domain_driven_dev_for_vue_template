<template lang="pug">
h3 hello
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import Container from "~/presentation/components/Container.vue";
import mainStore from "~/service/temp_store";
import PaymentCard from "~/presentation/components/PaymentCard.vue";
import VHeader from "~/presentation/components/Header.vue";
export default defineComponent({
  name: "Entry",
  components: {
  },
  props: {
  },
  emit: ["close", "route"],
  setup(props, { emit }) {
    /** 儲存參數 */
    return {
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
