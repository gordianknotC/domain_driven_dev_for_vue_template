<template lang="pug">
.page
  Entry()
<!--  Entry(v-if="route==='Entry'" )-->
<!--  UPI(v-else-if="route==='UPI'" )-->
<!--  Wallet(v-else-if="route==='Wallet'" )-->
</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import Container from "~/presentation/components/Container.vue";
import Entry from "~/presentation/pages/Entry.vue";
import UPI from "~/presentation/pages/UPI.vue";
import Wallet from "~/presentation/pages/Wallet.vue";
import mainStore, { TRouteName } from "~/service/store";

export default defineComponent({
  name: "App",
  components: {
    Container,
    Entry,
    UPI,
    Wallet
  },
  props: {
    invitationCode: {
      type: String
    }
  },
  emit: ["close"],
  setup(props, { emit }) {
    const state = reactive({
      isDialogVisible: false,
      username: "",
      password: ""
    });
    console.log("..");
    const loading = ref(false);
    /** 儲存參數 */
    return {
      ...toRefs(mainStore.state),
      loading,
      onRoute(route: TRouteName) {
        mainStore.routeTo(route);
      }
    };
  }
});
</script>

<style lang="scss">
#app {
  @apply flex text-center justify-center;
  margin: auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;

  @apply h-full items-center;
  max-width: 530px;
}
</style>
