<template lang="pug">
container.page.page-main
  Header
  container.page-main-separator Choose Payment Method
  PaymentCard(
    title="UPI"
    subtitle="Instant Payment Using UPI App"
    :imageUrl="require('~/presentation/assets/mfi-UPI.png')"
    :showBack="false"
    @route="onClickUPI"
  )
  PaymentCard(
    title="EWallet"
    subtitle="PhonePe.Paytm & more"
    :imageUrl="require('~/presentation/assets/mfi-EWallet.png')"
    :showBack="false"
    @route="onClickWallet"
  )
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from "vue";
import Container from "~/presentation/components/Container.vue";
import mainStore from "~/service/store";
import PaymentCard from "~/presentation/components/PaymentCard.vue";
import Header from "~/presentation/components/Header.vue";
export default defineComponent({
  name: "Entry",
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
    const state = reactive({
      isDialogVisible: false,
      username: "",
      password: "",
    })
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
      ...toRefs(state),
      loading,
      onClickUPI,
      onClickWallet,
      onClickBack

    };
  }
});

</script>

<style lang="scss" scoped>
@import "src/presentation/assets/styles/container";

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

    &-separator{
      @apply p-4 font-Lexend font-bold text-dark text-left;
      height: 3.6rem;
    }
  }

  //&-main::after{
  //  content: "";
  //  background-image: url("src/presentation/assets/Main.png");
  //  background-size: contain;
  //  background-repeat-x: no-repeat;
  //  background-position-x: center;
  //  opacity: 0.5;
  //  top: -23px;
  //  left: 0;
  //  bottom: 0;
  //  right: 0;
  //  position: absolute;
  //  z-index: -10;
  //}


}





</style>
