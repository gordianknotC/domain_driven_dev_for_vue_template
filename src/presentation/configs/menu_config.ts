import { LazyHolder } from "js_util_for_vue_project";
import { computed, ComputedRef } from "vue";
import { facade } from "~/main";
import { ERouteName } from "../consts/router_const";
import { ADMIN_GROUP, EUserAccount } from "../consts/ua_const";
import { createElMenu, ElMenuConfig, ElMenuConfigItem } from "../third_parties/utils/element_menu_helper";

const supplier: ElMenuConfigItem = {
  route: {name: ERouteName.supplierList},
  label: computed(() => facade.stores.t.supplierList),
  icon: "HomeWork",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

// const home: ElMenuConfigItem = {
//   route: {name: ERouteName.home},
//   label: computed(() => facade.stores.t.material),
//   icon: "Material",
//   meta: {
//     admin: ADMIN_GROUP.all
//   }
// };

const material: ElMenuConfigItem = {
  route: {name: ERouteName.materialList},
  label: computed(() => facade.stores.t.material),
  icon: "Material",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

const dashboard: ElMenuConfigItem = {
  route: {name: ERouteName.dashboard},
  label: computed(() => facade.stores.t.dashboard),
  icon: "DataView",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

const userAdminControl: ElMenuConfigItem = {
  route: {name: ERouteName.userAccountControl},
  label: computed(() => facade.stores.t.userAccountControl),
  icon: "ManageAccounts",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

const projectManager: ElMenuConfigItem = {
  route: {name: ERouteName.projectManagement},
  label: computed(() => facade.stores.t.projectManagement),
  icon: "BusinessCenter",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

const humanResource: ElMenuConfigItem = {
  route: {name: ERouteName.humanResource},
  label: computed(() => facade.stores.t.humanResource),
  icon: "Handyman",
  meta: {
    admin: ADMIN_GROUP.all
  }
};

const finalConfig = {
  dashboard,
  // home,
  humanResource,
  material,
  projectManager,
  supplier,
  userAdminControl,
}

export const APP_MENU_CONFIG = LazyHolder<ElMenuConfig<typeof finalConfig>>(() => {
  return createElMenu<typeof finalConfig>(finalConfig);
});

