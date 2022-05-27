<template lang="pug">
base-input(
  v-bind="$attrs"
  @clickRightIcon="onClickRightIcon"
)
  template(#right-icon)
    svg-icon.cursor-pointer(:name="svgIcon")
</template>

<script lang="ts">
import {computed, defineComponent, reactive} from "vue";
import {toRefs} from "vue";
import BaseInput from "~/components/BaseInput.vue";
export default defineComponent({
  name: "Password",
  components: {
    BaseInput,
  },
  inheritAttrs: true,
  emits: ["click-right-icon"],
  setup(props, {emit}){
    const state = reactive({showPwd: false});
    return{
      ...toRefs(state),
      onClickRightIcon(){
        state.showPwd = !state.showPwd;
        emit("click-right-icon");
      },
      svgIcon:computed(()=>{
        const watched = state.showPwd;
        return state.showPwd ? "eye_closed" : "eye"
      }),
    }
  }
});
</script>

<style lang="scss" scoped>

</style>
