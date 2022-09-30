import { defineStore } from "pinia";

export const useController = defineStore("user", {
  state: () => {
    return { count: 0 };
  },
  // 也可以定义为
  // state: () => ({ count: 0 })
  actions: {
    increment() {
      this.count++;
    }
  }
});
