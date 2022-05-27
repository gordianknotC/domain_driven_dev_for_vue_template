import { computed } from "vue";
import TFormOption = VForm.TFormOption;
import {IRequestOtpThruPhonePayload, IVerifyOTPPayload, TOptional} from "~/service/apiTypes";
import {BaseFormImpl} from "vue_general_form_validator/dist/base/baseFormImpl";
import {getBaseFormStatesByKeys, validationMessages} from "~/utils/baseFormConfigs";
import {VForm} from "vue_general_form_validator/dist/base/vformTypes";
import api from "./api";
import {getFieldRules, getValidationRules} from "vue_general_form_validator/dist/base/formRuleUtil";
import { asCascadeClass } from "common_js_builtin/dist/utils/typeInferernce";
import mainStore from "~/service/store";



type TFields = IVerifyOTPPayload;
type TExtraFields = {
  // confirm_password: string;
};
type T = TFields;
type E = TExtraFields;

const baseFormRules: VForm.TValidationRules<any> = getValidationRules();

export class OTPValidationForm extends BaseFormImpl<T, E> {
  constructor(option: Partial<TFormOption<T, E>>) {
    const state = getBaseFormStatesByKeys([
      "otp",
      "phone",
    ]);
    state.phone!.hidden = true;
    state.phone.value = mainStore.state.phone;
    const requester = api.verifyPhoneOTP;
    const resend = api.requestPhoneOTP;
    super(
      Object.assign(option ?? {},     <TFormOption<T, E>>{
        state: state as any,
        rules: baseFormRules,
        messages: validationMessages,
        request: (a)=>{
          // return {succeed: false};
          return requester(a);
        },
        onClose(model) {
          model.resetState();
          model.config.visible.value = false;
        },
        onVisible(model, extra) {},
        onBeforeVisible(model, extra) {
          model.resetState(extra);
        }
      })
    );
    asCascadeClass(this);
  }

  getPayload(): Record<VForm.TFormKey<T, E>, any> {
    return super.getPayload();
  }
}
