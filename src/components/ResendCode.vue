<template lang="pug">
.flex.justify-center.items-center.mt-3.mb-6(v-if="isDisabled")
  span.link.mr-2 Resent OTP in
  van-count-down.remain-time.text-center(
    ref="countDown"
    :time="30 * 1000"
    format="ss"
    @finish="onFinish"
  )
    template(#default="timeData")
      span {{timeData.seconds}} sec

.text-primary.text-bold.ml-4.cursor-pointer.text-center(
  v-else
  @click="resendCode"
  ) Resent OTP
</template>

<script lang="ts">
import { defineComponent, ref } from "vue"
export default defineComponent({
  name: "ResendCode",
  emits: ["resend", "finish"],
  setup(props, { emit }) {
    const countDown = ref<any>(null);
    const isDisabled = ref(true);

    const resendCode = () => {
      emit("resend");
      isDisabled.value = true;
      countDown.value?.reset();
    }

    const onFinish = () => {
      console.log("countDown finished");
      isDisabled.value = false;
      emit("finish")
    };


    return {
      countDown,
      resendCode,
      onFinish,
      isDisabled,
    }
  },
})
</script>
<style lang="scss" scoped>
.link {
  @apply text-label cursor-pointer;
}

.remain-time {
  @apply text-label-dark;
}

</style>
