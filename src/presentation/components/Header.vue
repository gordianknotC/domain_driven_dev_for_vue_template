<template lang="pug">
section
  container.list-tile.page-main-header
    container.page-main-header-container
      container.page-main-header--left
        img(:src="require('~/assets/mfi-logo.png')")
      container.page-main-header--right
        span OPTGIC NETWORK PRIVATE LIMITED

  container.list-tile.page-main-payment--mt
  container.card.page-main-payment
    container.page-main-payment-container
      container.page-main-payment-header Payment
      container.page-main-payment-cash ₹500.00
</template>

<script lang="ts">
import {defineComponent, reactive, ref, toRefs} from "vue";
import Container from "~/presentation/components/Container.vue";

export default defineComponent({
  name: "Header",
  components: {
    Container,
  },
  props: {
  },
  setup(props, {emit}) {
    /** 儲存參數 */
    return {
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
  &-main{
    // todo: remove this
    @apply px-3;
    &-header{
      @apply pt-4 absolute left-0 right-0 px-3;
      height: $header-h;
      background-color: rgba(66, 133, 244, 0.8);
      z-index: -1;
      &-container{
        @apply flex flex-row justify-between;
      }
      &--left{
        @apply flex justify-start;
        width: 90px;
        height: 39px;
      }
      &--right{
        @apply flex text-white text-sm font-Lexend font-bold;
        @apply text-right items-center justify-end pr-2;
        font-size: 12px;
      }
    }

    &-payment--mt{
      height: calc(5.5rem - 1.3rem);
    }

    &-payment{
      @apply rounded bg-white;
      height: $card-h;
      &-container{
        @apply flex flex-col justify-start;
      }
      &-header{
        @apply text-left text-dark font-Lexend font-bold;
      }
      &-cash{
        @apply text-left text-primary font-Lexend font-bold;
      }
    }
  }
}





</style>
