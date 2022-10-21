import { LazyHolder } from "js_util_for_vue_project";
import { computed, ComputedRef } from "vue";
import { ERouter } from "../consts/router_const";
import { ADMIN_GROUP, EUserAccount } from "../consts/ua_const";
import { createElMenu, ElMenuConfig, ElMenuConfigItem } from "../third_parties/utils/element_menu_helper";

const supplier: ElMenuConfigItem = {
  route: ERouter.supplierLIst,
  label: computed(() => "supplier"),
  icon: "",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

const material: ElMenuConfigItem = {
  route: ERouter.materialList,
  label: computed(() => "material"),
  icon: "",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

const dashboard: ElMenuConfigItem = {
  route: ERouter.materialList,
  label: computed(() => "material"),
  icon: "",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

const userAdminControl: ElMenuConfigItem = {
  route: ERouter.materialList,
  label: computed(() => "material"),
  icon: "",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

const projectManager: ElMenuConfigItem = {
  route: ERouter.materialList,
  label: computed(() => "material"),
  icon: "",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

const humanResource: ElMenuConfigItem = {
  route: ERouter.materialList,
  label: computed(() => "material"),
  icon: "",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

const finalConfig = {
  dashboard,
  humanResource,
  material,
  projectManager,
  supplier,
  userAdminControl,
}

export const APP_MENU_CONFIG = LazyHolder(() => {
  return createElMenu(finalConfig);
});


