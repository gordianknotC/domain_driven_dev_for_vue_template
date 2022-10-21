import { LazyHolder } from "js_util_for_vue_project";
import { computed, ComputedRef } from "vue";
import { ERouter } from "../consts/router_const";
import { ADMIN_GROUP, EUserAccount } from "../consts/ua_const";
import { createElMenu } from "../third_parties/utils/element_menu_helper";

export const APP_MENU_CONFIG = LazyHolder(() => {
  return createElMenu({
    supplierList: {
      route: ERouter.supplierLIst,
      label: computed(() => "supplier"),
      icon: "",
      meta: {
        admin: ADMIN_GROUP.all
      }
    },
    materialList: {
      route: ERouter.materialList,
      label: computed(() => "material"),
      icon: "",
      meta: {
        admin: ADMIN_GROUP.all
      }
    }
  });
});

