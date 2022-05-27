<template lang="pug">
.page.pl-4.pr-4
  .page-banner.image-container--w(
    :style="`background-image: url(${require('~/assets/banner.png')})`")
  .page-horizontal
    hr
  .page-rating.xm
    .page-rating-left
      .page-rating-left--sm Starring
      .page-rating-left--lg 4.5
    .page-rating-right
      .page-rating-right--lg Extra +
      .page-rating-right--sm USERS

  .page-footer.image-container--w(
    :style="`background-image: url(${require('~/assets/footer.jpg')})`")
    .page-footer-container

</template>

<script lang="ts">

import {defineComponent, reactive, ref, toRefs} from "vue";

export default defineComponent({
  name: "App",
  components: {
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
      ...toRefs(state),
      loading,

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


.image-container{
  &--w{
    overflow: hidden;
    background-size: cover;
    background-repeat-x: no-repeat;
    background-position-x: center;
  }
  &--h{
    overflow: hidden;
    background-size: contain;
    background-repeat-x: no-repeat;
    background-position-x: center;
  }
}

// 1556, 132, 500, 146, 260, 118, 400
.page{
  @apply h-full;
  height: 100vh;

  &-banner{
    height: 32vh;

  }

  &-horizontal {
    margin-top: 4px;
    border-top: 5px solid slategray;
    width: 100%;
  }

  &-rating{
    @apply w-full px-4 flex flex-row justify-between items-center;
    height: 7.5vh;
    color: slategray;
    &-left{
      @apply flex justify-center flex-col h-full;
      &--lg {
        font-weight: 700;
        font-size: 2em;
      }
      &--sm{
        margin-bottom: 0rem;
        margin-top: 0rem;
        font-size: 1rem;
        line-height: 1rem;
        font-weight: 500;
      }
    }
    &-right{
      @apply flex justify-center flex-col h-full;
      &--lg{
        font-weight: 600;
        font-size: 1.8em;
        line-height: 2rem;
      }
      &--sm{
        font-size: 1rem;
        line-height: 1rem;
      }
    }
  }
  &-footer{
    height: 28vh;
    &-container{
      @apply w-full relative h-full;
    }

  }

}





</style>
