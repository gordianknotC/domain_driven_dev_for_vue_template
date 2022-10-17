import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { ERole, UserEntity } from "~/data_source/entities/user_entity";
import { useRestoreActive } from "element-plus";
import { facade } from "~/main";

export const accountCtlr = defineStore("user", () => {
  const state = facade.data.repo.user.localStorage;

  return {
    state,
    getters: {
      isAdmin: computed(() => {
        return state!.value!.role == ERole.admin;
      }),
      isMerchant: computed(() => {
        return state!.value!.role == ERole.merchant;
      })
    },
    actions: {}
  };
});
