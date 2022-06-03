<template lang="pug">
.page
  Entry(v-if="route==='Entry'" )
  UPI(v-else-if="route==='UPI'" )
  Wallet(v-else-if="route==='Wallet'" )

</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from "vue";
import Container from "~/components/Container.vue";
import Entry from "~/views/Entry.vue";
import UPI from "~/views/UPI.vue";
import Wallet from "~/views/Wallet.vue";
import mainStore, {TRouteName} from "~/service/store";

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
  emit:["close"],
  setup(props, {emit}) {
    const state = reactive({
      isDialogVisible: false,
      username: "",
      password: "",
    })
    const loading = ref(false);
    /** 儲存參數 */
    return {
      ...toRefs(mainStore.state),
      loading,
      onRoute(route: TRouteName){
        mainStore.routeTo(route);
      }
    };
  }
});

</script>

<style lang="scss">

#app{
  @apply flex text-center justify-center;
  margin:auto;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100vh;

  @include tablet{
    @apply h-full items-center;
    max-width: 530px;
  }
  @include mobile{
    @apply w-full h-full;
    max-width: 100%;
  }
  @include mini{
    @apply w-full h-full;
    max-width: 100%;
  }
}



</style>
