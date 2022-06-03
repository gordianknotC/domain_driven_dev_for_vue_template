<template lang="pug">
container.hover-card.upi(@click="onRoute")
  container.upi-container
    container.upi-container--left
      img(:src="imageUrl")
    container.upi-container--right
      .flex.flex-row.justify-between.w-full(
        v-if="showBack"
      )
        container.title {{title}}
        container.clickable-label
          button(@click="onClickBack") Back
      container.title(
        v-else
      ) {{title}}
      container.subtitle {{subtitle}}
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import Container from "~/components/Container.vue";
import mainStore from "~/service/store";

export default defineComponent({
  name: "PaymentCard",
  props: {
    title:{
      type: String,
      require: true
    },
    subtitle:{
      type: String,
      require: true
    },
    imageUrl:{
      type: String,
      require: true,
    },
    showBack:{
      type: Boolean,
      default: false
    }
  },
  components:{
    Container
  },
  emits:["back", "route"],
  setup(prop, {emit}) {
    const onRoute = ()=>{
      emit("route")
    }
    const onClickBack=()=>{
      emit("back")
    }
    return {
      onRoute,
      onClickBack,
    };
  }
});
</script>
<style lang="scss" scoped>
@import "src/assets/styles/container";

.title{
  @apply text-left font-Lexend font-bold text-dark;
}
.subtitle{
  @apply text-left text-label;
}

.upi{
  @apply border-label;
  border: solid 1px;
  height: $card-h;
  max-height: $card-h;
  &-container{
    @apply flex flex-row justify-start items-center;
    height: auto;
    &--left{
      width: 2.4rem;
    }
    &--right{
      @apply w-full;
      &-container{
        @apply flex flex-row justify-between;
      }
    }
  }
}
</style>
