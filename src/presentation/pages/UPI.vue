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
  container.page-main-form
    container.page-main-label UPI ID
    container.page-main-input
      input(v-model="upiID")
    container.page-main-description
      span.text-label UPI ID should be in the format
      span.font-bold.text-primary  username@upihandle
  container.page-main-submit
    button PAY ₹500.00
  container.page-main-sponsors
    .flex-1
    container.sponsor-gpay
      img(:src="require('~/assets/mfi-GPay.png')")
    container.sponsor-paytm
      img(:src="require('~/assets/mfi-paytm.png')")
    container.sponsor-amazonPay
      img(:src="require('~/assets/mfi-amazon-pay.png')")
    container.sponsor-upi
      img(:src="require('~/assets/mfi-UPI.png')")
    container.sponsor-y
      img(:src="require('~/assets/mfi-y.png')")
    .flex-1

</template>

<script lang="ts">
import { defineComponent, reactive, ref, toRefs } from "vue";
import Container from "~/presentation/components/Container.vue";
import mainStore from "~/service/store";
import PaymentCard from "~/presentation/components/PaymentCard.vue";
import Header from "~/presentation/components/Header.vue";

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
  emit: ["close", "route"],
  setup(props, { emit }) {
    const loading = ref(false);
    const onClickUPI = () => {
      mainStore.routeTo("UPI");
    };
    const onClickWallet = () => {
      mainStore.routeTo("Wallet");
    };
    const onClickBack = () => {
      console.log("back");
      mainStore.routeBack();
    };
    /** 儲存參數 */
    return {
      loading,
      onClickUPI,
      onClickWallet,
      onClickBack
    };
  }
});
</script>

<style lang="scss" scoped>

.page {
  .title {
    @apply text-left font-Lexend font-bold text-dark;
  }
  .subtitle {
    @apply text-left text-label;
  }

  @apply h-full relative;
  height: 100vh;
  width: 375px;

  &-main {
    // todo: remove this
    @apply px-3;
    &-form {
      @apply flex flex-col justify-start text-left p-3;
      height: 8.8rem;
    }
    &-label {
      @apply font-bold text-label text-left mb-3;
    }
    &-input {
      height: 3rem;
    }
    &-description {
      @apply flex flex-row text-xs mt-3;
    }
    &-submit {
      height: 4.4rem;
      padding: 1rem 2.2rem;
      button {
        @apply bg-primary text-white font-bold text-center items-center rounded w-full h-full;
        &:hover {
          @apply bg-primary-light;
        }
      }
    }
    &-sponsors {
      @apply flex flex-row items-center;
      height: 3rem;
      padding: 0.5rem;
      img {
        @apply mx-1;
        height: auto;
      }
    }
    .sponsor {
      &-gpay {
      }
      &-paytm {
      }
      &-amazonPay {
      }
      &-upi {
      }
      &-y {
      }
    }
  }

  //&-main::after{
  //  content: "";
  //  background-image: url("src/assets/Main-UPI.png");
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
