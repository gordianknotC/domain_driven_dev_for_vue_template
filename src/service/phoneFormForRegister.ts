import TFormOption = VForm.TFormOption;
import {IRequestOtpThruPhonePayload} from "~/service/apiTypes";
import {getBaseFormStatesByKeys, validationMessages} from "~/utils/baseFormConfigs";
import api from "./api";
import {BaseFormImpl} from "vue_general_form_validator/dist/base/baseFormImpl";
import {VForm} from "vue_general_form_validator/dist/base/vformTypes";
import {getFieldRules, getValidationRules} from "vue_general_form_validator/dist/base/formRuleUtil";
import {asCascadeClass} from "common_js_builtin/dist/utils/typeInferernce";


type TFields = IRequestOtpThruPhonePayload;
type TExtraFields = {
  phone: string;
};
type T = TFields;
type E = TExtraFields;
const baseFormRules: VForm.TValidationRules<any> = getValidationRules();

/**
 * 發送手機驗證碼
 */
export class PhoneFormForRegister extends BaseFormImpl<T, E> {
  constructor(option?: Partial<TFormOption<T, E>>) {
    super(
      Object.assign(option ?? {}, <TFormOption<T, E>>{
        state: getBaseFormStatesByKeys([
          "phone",
        ]),
        rules: baseFormRules,
        messages: validationMessages,
        request: (p)=>{
          // return {succeed: true};
          return api.requestPhoneOTP(p);
        },
        //@ts-ignore
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

