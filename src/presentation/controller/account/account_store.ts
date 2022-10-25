import { defineStore } from "pinia";
import { computed, ComputedRef, ref } from "vue";
import { ERole, UserEntity } from "~/data_source/entities/user_entity";
import { facade } from "~/main";

~/data_source/core/interfaces/crypto_storage
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
