import { defineStore } from "pinia";
import { computed } from "vue";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { ERole, UserEntity } from "~/data_source/entities/user_entity";

export const userController = defineStore("user", () => {
  const doubleCount = computed(() => 22);
  const userKey = ``;
  const defaultState:UserEntity = {
    id: "",
    name: "guest",
    role: ERole.merchant,
  };

  return {
    state: useLocalStorage("", {
      ...defaultState
    }),
    getters: {

    },
    actions: {

    },
  };
});



