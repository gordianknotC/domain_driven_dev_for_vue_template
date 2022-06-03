<template lang="pug">
container.page.page-main
  Header
  PaymentCard(
    title="UPI"
    subtitle="Instant Payment Using UPI App"
    :imageUrl="require('~/assets/mfi-UPI.png')"
    :showBack="true"
    @back="onClickBack"
  )



</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from "vue";
import Container from "~/components/Container.vue";
import mainStore from "~/service/store";
import PaymentCard from "~/components/PaymentCard.vue";
import Header from "~/components/Header.vue";


export default defineComponent({
  name: "UPI",
  components: {
    Container,
    PaymentCard,
    Header
  },
  props: {
    invitationCode: {
      type: String
    }
  },
  emit:["close", "route"],
  setup(props, {emit}) {
    const loading = ref(false);
    const onClickUPI = ()=>{
      mainStore.routeTo("UPI");
    }
    const onClickWallet = ()=>{
      mainStore.routeTo("Wallet");
    }
    const onClickBack=()=>{
      console.log("back");
      mainStore.routeBack();
    }
    /** 儲存參數 */
    return {
      loading,
      onClickUPI,
      onClickWallet,
      onClickBack,
    };
  }
});

</script>

<style lang="scss" scoped>
@import "src/assets/styles/container";



.page{
  .title{
    @apply text-left font-Lexend font-bold text-dark;
  }
  .subtitle{
    @apply text-left text-label;

  }

  @apply h-full relative;
  height: 100vh;
  width: 375px;

  &-main{
    // todo: remove this
    @apply px-3;
  }

  &-main::after{
    content: "";
    background-image: url("~@/assets/Main-UPI.png");
    background-size: contain;
    background-repeat-x: no-repeat;
    background-position-x: center;
    opacity: 0.5;
    top: -23px;
    left: 0;
    bottom: 0;
    right: 0;
    position: absolute;
    z-index: -10;
  }
}




</style>
