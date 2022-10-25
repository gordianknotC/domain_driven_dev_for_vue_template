import { defineStore } from "pinia";
import { computed, ComputedRef, ref } from "vue";
import { ERole, UserEntity } from "~/data_source/entities/user_entity";
import { facade } from "~/main";

export type AccountState = UserEntity & {
  // todo:
}

export const accountStore = defineStore("user", () => {
  const state = facade.data.repo.user.localStorage;
  
  return {
    state,
    getters: {
      isAdmin: computed(() => {
        return state!.value![0].role == ERole.admin;
      }),
      isMerchant: computed(() => {
        return state!.value![0].role == ERole.user;
      })
    },
    actions: {}
  };
});
