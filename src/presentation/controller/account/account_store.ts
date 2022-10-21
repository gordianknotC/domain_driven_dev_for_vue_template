import { defineStore } from "pinia";
import { computed, ComputedRef, ref } from "vue";
import { ERole, UserEntity } from "~/data_source/entities/user_entity";
import { useRestoreActive } from "element-plus";
import { facade } from "~/main";
import { ILocalStorage } from "~/data_source/core/interfaces/local_client_service";
import { RemovableRef } from "@vueuse/shared";
import { ISimpleStore } from "../ui/itf/base_store_itf";
import { flattenInstance } from "js_util_for_vue_project/dist/utils/typeInference";


export type AccountState = UserEntity & {
  // todo:
}

export const accountStore = defineStore("user", () => {
  const state = facade.data.repo.user.localStorage;
  
  return {
    state,
    getters: {
      isAdmin: computed(() => {
        return state!.value!.role == ERole.admin;
      }),
      isMerchant: computed(() => {
        return state!.value!.role == ERole.user;
      })
    },
    actions: {}
  };
});
