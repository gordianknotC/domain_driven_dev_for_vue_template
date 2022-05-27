<template lang="pug">
van-form.base-form.container(
  @submit="model.submit"
  autocomplete="off"
)
  section.mb-6(v-for="(field, idx) in model.getFields()")
    slot(
      v-if="!field.hidden"
      :name="field.dataKey"
      :field="field"
      :key="idx"
    )
      //.input__title(:class="{ 'opacity-40': field.disabled }") {{formLabel(field.label)}}
      IntlInput(
        v-if="field.name === 'phone' && !field.disabled"
        :modelValue="field.value"
        :disabled="field.disabled"
        :is-possible-number="title === 'Login'"
        @updatePhone="(val) => { field.value = val }"
      )

      base-input(
        v-else-if="field.name === 'phone' && field.disabled"
        v-model="field.value"
        :type="field.fieldType"
        :placeholder="field.placeholder"
        :error-message="field.fieldError"
        :disabled="field.disabled"
        :label="field.label"
      )

      password(
        v-else-if="field.fieldType === 'password'"
        v-model="field.value"
        :type="getFieldType(idx)"
        :placeholder="field.placeholder"
        :error-message="field.fieldError"
        :disabled="field.disabled"
        :label="field.label"
        @input="()=>model.notifyOnInput(field.dataKey)"
        @clickRightIcon="()=>onToggleRightIcon(idx)"
      )

      div(v-else)
        base-input(
          v-model="field.value"
          :type="field.fieldType"
          :error-message="field.fieldError"
          :disabled="field.disabled"
          :label="field.label"
          @input="()=>model.notifyOnInput(field.dataKey)"
        )
  slot(
    name='submitFooter'
    :model="model"
  )
    FlatButton(
      text="Log In"
      native-type="submit"
      :disabled="!model.canSubmit.value"
      @click="model.submit"
    )

</template>

<script lang="ts">
import {ComputedRef, defineComponent} from "vue";
import {computed, PropType, reactive, toRef, toRefs} from "vue";
import Password from "~/components/Password.vue";
import FlatButton from "~/components/FlatButton.vue";
import {VForm} from "vue_general_form_validator/dist/base/vformTypes";
import IntlInput from "~/components/intlInput/IntlInput.vue";
import BaseInput from "~/components/BaseInput.vue";


export default defineComponent({
  name: "BaseForm",
  props: {
    model: {
      type: Object as PropType<VForm.IBaseFormModel<any, any>>,
      required: true
    }
  },
  components: {
    IntlInput,
    BaseInput,
    Password,
    FlatButton,
  },
  setup(props) {
    const state = reactive({
      fieldTypes: props.model.getFields().map((_: any)=>{
        return _.fieldType;
      })
    });

    return {
      ...toRefs(state),
      title: computed(() => props.model.config.title.value ?? ""),
      onToggleRightIcon(idx:number){
        console.log("onToggle...");
        const type = state.fieldTypes[idx] === "password"
          ? "text"
          : "password";
        const fieldTypes = [...state.fieldTypes];
        fieldTypes[idx] = type;
        state.fieldTypes = fieldTypes;
      },
      getFieldType(idx: number){
        return state.fieldTypes[idx];
      },
    };
  }
});
</script>
<style lang="scss" scoped>
.forget-title {
  @apply text-base text-light text-center py-4;
}
.national {
  width: 30% ;
  border-width: 1px;
  line-height: 1.25rem;
  @apply rounded p-2 mr-4 text-sm flex justify-center items-center;
  &__flag {
    @apply mr-2
  }
  &__number {
    @apply text-dark
  }
}

.input {
  &__title {
    @apply text-dark mb-2;
  }
}

::v-deep(.van-field) {
}
</style>
