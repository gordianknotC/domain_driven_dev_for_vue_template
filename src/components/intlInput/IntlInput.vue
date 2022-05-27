<template lang="pug">
.iti-wrapper
  input.baseInput(
    id="phone"
    :class="{ 'iti-disabled': disabled }"
    ref="telInput"
    type="tel"
    :disabled="disabled"
    @change="onInput"
    @keyup="onInput"
    @countrychange="onInput"
  )
  p.iti-error-message(v-if="hasError") {{errorMsg}}
  p.iti-valid-message(v-if="isValid")
    svg-icon(name="check")
</template>

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from "vue";
import "intl-tel-input/build/css/intlTelInput.css";
import intlTelInput from "intl-tel-input";
import intlInputUtil from "./intlInput-utils";
import { CommonMixin } from "~/utils/commonMixin";

export default defineComponent({
  name: "IntlInput",
  props: {
    modelValue: {
      type: [String, Number]
    },
    isDirty: {
      default: false,
      type: Boolean
    },
    disabled: {
      default: false,
      type: Boolean
    },
    isPossibleNumber: {
      default: false,
      type: Boolean
    }
  },
  emits: ["updatePhone"],
  setup(props, { emit }) {
    const mixin = new CommonMixin();
    const phoneNumber = ref();
    const iti = ref();
    const telInput = ref<any>("telInput");
    const isValidNumber = ref(false);
    const errorMsg = ref("");
    const isValid = ref(false);
    const hasError = ref(false);

    onMounted(() => {
      const countries = ["in", "tw"];

      iti.value = intlTelInput(telInput.value, {
        utilsScript: `${intlInputUtil()}`,
        separateDialCode: true,
        // nationalMode: true,
        onlyCountries: countries,
        customContainer: `intl-phone ${
          props.disabled ? "intl-phone-disabled" : ""
        }`
      });
    });

    function onInput() {
      const errorMap = [
        "Invalid number",
        "Invalid country code",
        "Too short",
        "Too long",
        "Invalid number"
      ];
      phoneNumber.value = iti.value.getNumber();
      isValidNumber.value = iti.value.isValidNumber();
      let countryData = iti.value.getSelectedCountryData();
      /** 判斷是否為特殊會員 */
      let isSpecialNumber = () => {
        let phone = phoneNumber.value as string;
        let number = phone.split("+91")[1] || "";
        return (number.startsWith("1") || number.startsWith("2")) && number.length === 10 && props.isPossibleNumber;
      }
      if (!isValidNumber.value && isSpecialNumber()) {
        errorMsg.value = "";
        isValid.value = true;
        hasError.value = false;
        emit("updatePhone", phoneNumber.value, true);
      } else if (!isValidNumber.value) {
        const error_code = iti.value.getValidationError();
        errorMsg.value = errorMap[error_code];
        isValid.value = false;
        hasError.value = true;
        emit("updatePhone", "", false);
      } else if (isValidNumber.value && !countryData.dialCode) {
        console.log(countryData.dialCode);
        errorMsg.value = errorMap[1];
        isValid.value = false;
        hasError.value = true;
        emit("updatePhone", "", false);
      } else {
        errorMsg.value = "";
        isValid.value = true;
        hasError.value = false;
        // note: 這裡的 phone number 有加國碼
        emit("updatePhone", phoneNumber.value, isValidNumber.value);
      }
    }

    onUnmounted(() => {
      iti.value?.destroy();
    });

    onMounted(() => {
      const inputElt = telInput.value as HTMLInputElement;
      mixin.hideAutoFillBackground(inputElt, () => {
        inputElt.value = inputElt.value.toString();
      });
    });

    return {
      onInput,
      telInput,
      isValidNumber,
      hasError,
      errorMsg,
      isValid
    };
  }
});
</script>
<style lang="scss">
.intl-phone {
  &.iti--allow-dropdown {
    @apply w-full bg-white rounded;
    height: 52px;
  }
  input {
    @apply w-full h-full border rounded;
    border-color: rgb(235, 237, 240);
  }
}

.iti-mobile .iti--container {
  @apply flex justify-center items-center;
}

.intl-phone-disabled {
  pointer-events: none;
}

.intl-phone-disabled > * {
  opacity: 0.6;
}

.iti-wrapper {
  @apply relative;
}

.iti-error-message {
  @apply text-red text-sm;
}

.iti-valid-message {
  @apply text-green text-sm absolute top-1/2 right-2 transform -translate-y-1/2;
}

.baseInput {
  background: linear-gradient(123.24deg, #e3ebf1 0.21%, #ecf0f3 100.42%);

  box-shadow: inset 4.79419px 3.83535px 5.43341px rgba(209, 217, 230, 0.34),
    inset 4.79419px 4.47458px 6.07264px rgba(209, 217, 230, 0.4),
    inset 4.79419px 5.59322px 7.19128px rgba(209, 217, 230, 0.48),
    inset 4.79419px 8.62954px 9.74818px rgba(209, 217, 230, 0.67),
    inset -3.19613px -10.0678px 10.3874px rgba(255, 255, 255, 0.75),
    inset -3.19613px -5.88633px 6.81923px rgba(255, 255, 255, 0.539141),
    inset -3.19613px -5.01213px 5.59737px rgba(255, 255, 255, 0.44708),
    inset -3.19613px -4.54145px 4.82082px rgba(255, 255, 255, 0.375);
}
</style>
