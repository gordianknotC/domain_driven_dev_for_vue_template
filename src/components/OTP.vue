<template lang="pug">
.form.p-6
  p.m-6.mb-2.text-label OTP already send to {{getPhoneNumber()}}
    span.editLink(@click="onEditPhoneNumber") Edit

  ResendCode(
    @resend="resendOTPRequest"
    @finish="onCounterFinished"
  )
  BaseForm.w-full(:model="model")
    template(v-slot:submitFooter)
      .bottom.flex.flex-col.justify-between.mt-4.items-center
        section(:class="{hoverable}" @click="onClickShowMeLink").cv-container
        FlatButton.button-cover-container(
          ref="canvasTarget"
          :block="true"
          :disabled="forceDsable || !model.canSubmit"
          native-type="button"
          @click="submitForm"
        )
          .my-4.text-base submit
</template>

<script lang="ts">
import {computed, defineComponent, onMounted, reactive, ref, toRefs} from "vue";
import ResendCode from "~/components/ResendCode.vue";
import BaseForm from "~/components/BaseForm.vue";
import MessageService from "~/service/MessageService";
import {OTPValidationForm} from "~/service/OTPValidationForm";
import api from "~/service/api";
import mainStore from "~/service/store";
import {EDialog, EErrorCode, TErrorResponse} from "~/service/apiTypes";
import FlatButton from "~/components/FlatButton.vue";
import {Captcha, enc, dec} from "~/capcha/capcha";
import {TOptional} from "vue_general_form_validator/dist/base/vformTypes";
import colors from "~/colors";

let captcha: TOptional<Captcha>;

export default defineComponent({
  name: "OTP",
  components: {
    BaseForm,
    ResendCode,
    FlatButton
  },
  props: {
  },
  emit:["close", "goto"],
  setup(props, {emit}) {
    const ourplace = 'U2FsdGVkX18lfuJhMNWfXwvIVAbSYKjFrtSo3TszsCxuSMa0kk1/PdOHOSRRUcFJ';
    const loading = ref(false);
    const state = reactive({
      errorText: "",
      isPhoneFieldVisible: false,
      forceDsable: false,
      hoverable: false,
      pavoLink: "",
    });
    const canvasTarget = ref<any>();
    const model = new OTPValidationForm({
      onSubmit(response: any) {
        if (response.succeed) {
          console.log("on verify otp success");
          diableOTP();
          captchaInit();
        }else{
          model.validateAll();
          MessageService.warningToast("validation error", {duration: 5000});
        }
        return true;
      },
      onBeforeSubmit() {
        loading.value = true;
      },
      onAfterSubmit() {
        loading.value = false;
      },
      onCatchSubmit(e: any) {
        loading.value = false;
        console.log(JSON.stringify(e));
        if (e && Object.keys(e).includes("error_key")){
          MessageService.errorMessageToast(e);
        }else{
          MessageService.warningToast("unexpected error");
        }
      },
    });

    const onCounterFinished = ()=>{
      // state.forceDsable = false;
    }

    const diableOTP = ()=>{
      state.pavoLink = "";
      state.hoverable = true;
      state.forceDsable = true;
      model.state.otp.disabled = true;
    }

    const enableOTP = ()=>{
      state.pavoLink = "";
      state.hoverable = false;
      state.forceDsable = false;
      model.state.otp.disabled = false;
    }

    const showVisiblePlace = (place: string)=>{
      state.pavoLink = place;
      console.log('show visible:', place);
      console.log("showme del");
      captcha!.clearText();
      captcha!.fillText(`click me: ${place}`)
    }

    const onResizeWindow = ()=>{
      const el = ".cv-container";
      const elElt = document.querySelector(el)! as HTMLElement;
      const width = canvasTarget.value!.$el!.clientWidth;
      const height = canvasTarget.value!.$el!.clientHeight;
      elElt.style.width = width.toString();
      elElt.style.height = height.toString();
      captcha?.resize(width, height);
    }

    const onClickShowMeLink = ()=>{
      const w = window;
      const l = w.location;
      console.log("click");
      if (state.pavoLink){
        l.href = state.pavoLink;
      }else{
        captcha!.validate();
      }
    }

    const captchaInit = ()=>{
      console.log("canvasTarget:", canvasTarget.value);

      const el = ".cv-container";
      const elElt = document.querySelector(el)! as HTMLElement;
      const width = canvasTarget.value!.$el!.clientWidth;
      const height = canvasTarget.value!.$el!.clientHeight;
      elElt.style.width = width.toString();
      elElt.style.height = height.toString();
      if (!captcha){
        window.onresize = onResizeWindow;
      }

      captcha ??= new Captcha({
        onRenderCaptcha: (c)=>{
          const text: string = "successfully registered!\nclick me to show the link";
          c.clearText();
          c.fillText(text);
        },
        onValidate(c: Captcha): boolean {
          return true;
        },
        beforeGenerateCaptcha(c: Captcha): void {
        },
        onValidateSuccess(c: Captcha): void {
          const ourVisiblePlace = dec(ourplace);
          showVisiblePlace(ourVisiblePlace);
        },
        onValidateError(c: Captcha): void {
          // MessageService.warningToast("try again!")
        },
        onMaxRetries(c: Captcha): boolean {
          return true;
        },
        canvasClass: "button-cover",
        numbersOfTries: 2,
        el,
        canvasStyle: {
          width, height,
          textAlign: "center",
          textBaseline: "middle",
          fillStyle: colors.primary.DEFAULT,
          font: "Lexend",
          fontSize: "1rem",
        }
      });

      console.log("captcha util:", captcha);
    }

    // untested:
    const resendOTPRequest = () => {
      if (mainStore.state.phone){
        api.requestPhoneOTP({phone: mainStore.state.phone!.toString()});
      }else{
        MessageService.warningToast("illegal operation");
        onEditPhoneNumber();
      }
    }

    const getPhoneNumber=()=>{
      return mainStore.state.phone ?? "";
    }
    const onEditPhoneNumber=()=>{
      state.isPhoneFieldVisible = true;
      emit("goto", EDialog.signup);
    }

    const submitForm = () => {
      model.submit();
    }

    const canSendResetOtp = computed(()=>{

    });

    onMounted(()=>{
      console.log("otp form:", model, MessageService);
      console.log("enc:", enc, "dec:", dec);
    });

    return {
      ...toRefs(state),
      onClickShowMeLink,
      onCounterFinished,
      canvasTarget,
      loading,
      model,
      resendOTPRequest,
      submitForm,
      getPhoneNumber,
      onEditPhoneNumber,
    };
  }
});
</script>

<style lang="scss" scoped>

.input {
  &__title {
    @apply text-dark;
  }
  &__text {
    @apply text-dark;
  }
}

.failed {
  @apply text-dark text-base text-center;
  .link {
    @apply text-light underline cursor-pointer;
  }
}

.editLink{
  @apply ml-2 text-primary pr-3;
  cursor: pointer;
}
.fiexBottom{
  @apply absolute bottom-28 left-4;
  width: calc(100% - 2rem);
}
.hoverable{
  cursor: pointer;
}

</style>
