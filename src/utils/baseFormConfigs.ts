import {computed} from "vue";
import {
  addFieldRule,
  addValidationRule,
  aRule,
  DefaultFieldRules,
  EBaseValidationRules,
  getFieldRules
} from "vue_general_form_validator/dist/base/formRuleUtil";
import {VForm} from "vue_general_form_validator/dist/base/vformTypes";
import {is} from "common_js_builtin/dist/utils/typeInferernce";
import TFormKey = VForm.TFormKey;
import {FormField} from "vue_general_form_validator/dist/base/formStateUtil";


enum AddedValidationRules{
  otpPattern = "otpPattern"
}
export const EValidationRules = EBaseValidationRules as (
  typeof EBaseValidationRules & typeof AddedValidationRules
);

addValidationRule(AddedValidationRules.otpPattern, (ctx, args)=>{
  return is.not.empty(ctx.value) && ctx.value.length >= 4;
}, true);
addFieldRule("otp", aRule<any>([
  EValidationRules.required,
  EValidationRules.otpPattern
]));

const fieldRules = getFieldRules() as (DefaultFieldRules
  & Record<"otp", string>);

export
const validationMessages: VForm.TValidationMessages = {
  [EBaseValidationRules.remark]: computed(()=>""),
  [EBaseValidationRules.confirm]: computed(()=>""),
  [EBaseValidationRules.required]: computed(()=>""),
  [EBaseValidationRules.allUserPattern]: computed(()=>""),
  [EBaseValidationRules.email]: computed(()=>""),
  [EBaseValidationRules.notEqual]: computed(()=>""),
  [EBaseValidationRules.pwdLength]: computed(()=>""),
  [EBaseValidationRules.pwdPattern]: computed(()=>""),
  [EBaseValidationRules.searchLength]: computed(()=>""),
  [EBaseValidationRules.userLength]: computed(()=>""),
  [EBaseValidationRules.userPattern]: computed(()=>""),
  [EBaseValidationRules.phone]: computed(()=>""),
  [EBaseValidationRules.nickLength]: computed(()=>""),
  "userCode": computed(()=>""),
  "otpPattern": computed(()=>"")
};

const phone = FormField({
  dataKey: "phone",
  value: "",
  fieldType: "phone",
  label: computed(() => "mobileNumber"),
  rule: fieldRules.phone,
  placeholder: computed(() => "")
});

const otp = FormField({
  dataKey: "otp",
  value: "",
  fieldType: "text",
  label: computed(() => "otpCode"),
  rule: fieldRules.otp,
  placeholder: computed(() => "")
});

export const baseFormConfigs = {
  phone,
  otp,
};



export function getBaseFormStatesByKeys<T = Partial<typeof baseFormConfigs>>(
  keys: TFormKey<T, {}>[]
): T {
  let result: Partial<typeof baseFormConfigs> = {};
  keys.forEach(key => {
    //@ts-ignore
    result[key] = Object.assign({}, baseFormConfigs[key]);
  });
  return result as T;
}
