<template lang="pug">
VanField(
  v-bind="$attrs"
  v-model="pInput"
  :label-class="labelClass"
  :class="[borderClass, inputClass]"
  :right-icon="overrideErrorIcon"
  :error-message="errorMessage"
  ref="vanInput"
  error-message-align="left"
  :disabled="disabled"
  enterkeyhint="Done"
  @focus="onFocus"
  @blur="onBlur"
)
  // expose 到母層，但理論上應該要  v-bind="slotData"
  template( v-for="(_, name) in $slots" v-slot:[name]="slotData")
    slot(:name="name" v-bind:data="slotData")

slot(name="description")
  .description(v-if="description") {{description}}

</template>

<script lang="ts">
import {computed, defineComponent, reactive} from "vue";
import SvgIcon from "~/components/SvgIcon.vue";
import {CommonMixin} from "~/utils/commonMixin";
import {onMounted, ref} from "vue";
import {ComponentInstance} from "vant/es/utils";
import {is} from "common_js_builtin/dist/utils/typeInferernce";


enum EInputStage {
  blur,
  focus,
  hover,
}

export default defineComponent({
  name: "BaseInput",
  components: {
    SvgIcon
  },
  /** --------------------------------------
   *  所有 props 繼承 VanField, 請參考官方文件
   *  這裡只列出需要被偵聽的 props
   *  --------------------------------------  **/
  props: {
    modelValue:{
      type: String,
      required: true,
    },
    errorMessage:{
      type:String,
      default: ()=> "",
    },
    disabled:{
      type: Boolean,
      default: ()=> false,
    },
    rightIcon:{
      type: String
    },
    description:{
      type:String,
      default: ()=> "",
    },
  },
  inheritAttrs: true,
  emits: ["update:modelValue", "focus", "blur"],
  setup(props, {emit}){
    const mixin = new CommonMixin();
    const vanInput = ref(null);
    const pInput = mixin.asVModel({
      props, propName: "modelValue",
      emit, onSet: (value: string)=>{

    }
    });

    const state = reactive({
      stage: EInputStage.blur,
    });

    const overrideErrorIcon = computed(()=>{
      const showError = hasError.value;
      return showError
          ? "warning"
          : props.rightIcon ?? "";
    });

    // fixme: 實作 customize labelClass from props
    const labelClass = computed (()=>{
      const showError = hasError.value;
      return state.stage === EInputStage.blur && is.empty(pInput.value)
          ? showError
              ? "van-field-base__label van-field-base-error__label"
              : "van-field-base__label"
          : showError
              ? "van-field-base__label van-field-base-error-shift"
              : "van-field-base__label van-field-base-shift";
    });

    const borderClass = computed(()=>{
      const showBorder = state.stage !== EInputStage.blur;
      const showError = hasError.value;
      return showBorder
          ? showError
              ? "error-border"
              : "focus-border"
          : "";
    });

    const inputClass = computed(()=>{
      const hasInput = is.not.empty(pInput.value);
      const showError = hasError.value;
      return hasInput
          ? showError
              ? "van-field-base-error-shift"
              : "van-field-base-shift"
          : "van-field-base";
    });

    const hasError = computed(()=>{
      const watched = pInput.value;
      console.log("hsError:", is.not.empty(props.errorMessage), props.errorMessage);
      return is.not.empty(props.errorMessage);
    });

    const onFocus = ()=>{
      state.stage = EInputStage.focus;
      emit("focus");
    }

    const onBlur = ()=>{
      state.stage = EInputStage.blur;
      emit("blur");
    }

    onMounted(()=>{
      const fieldInstance = (vanInput.value! as ComponentInstance);
      const inputElt: HTMLInputElement = fieldInstance.$el.querySelector("input");
      mixin.hideAutoFillBackground(inputElt, ()=>{
        inputElt.value = inputElt.value.toString();
      });
    });

    return{
      pInput,
      labelClass,
      inputClass,
      vanInput,
      hasError,
      borderClass,
      onFocus,
      onBlur,
      overrideErrorIcon
    }
  }
});
</script>

<style lang="scss" scoped>
.defaultBG{
  background: linear-gradient(123.24deg, #e3ebf1 0.21%, #ecf0f3 100.42%);
}
.mx4{
  @apply mx-4;
}

.description {
  @apply block text text-sm px-4;
  margin-top: 0rem;
  line-height: 1.5;
}

.none{
  visibility: hidden;
}

::v-deep(){
  .van-field {
    &__value {
      @apply p-4 input-inner-shadow;
      padding: 0.75rem 1rem;
    }

    &__body{
      & input{
        height:2rem;
      }
      // 修正 Edge 預設的 password eye ball
      & input::-ms-reveal,
      input::-ms-clear{
        display:none;
      }

      // 修正 safari 預設的 password eye ball
      & input::-webkit-contacts-auto-fill-button,
      input::-webkit-credentials-auto-fill-button {
        display:none;
        visibility: hidden;
      }

    }
  }
}

</style>
