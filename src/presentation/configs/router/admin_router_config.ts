import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ERouteName } from "~/presentation/consts/router_const";
import { ADMIN_GROUP, EUserAccount } from "~/presentation/consts/ua_const";

/**
 *  Router Config 所使用的 meta type
 *  @param auth @default true           是否需要 auth, 預設為 true
 *  @param admin @default [admin+user]  admin group
 *
 *  以上預設值由 router index 邏輯部份處理，config 檔只指派非預設值, 如
 *  notFound / login pages 不需要 auth, 其他頁面均需要
 */
type RouterMetaType = {
  admin: EUserAccount[];
  auth: boolean;
};

/**
 * 共用 - not found
 **/
const notFoundRoutes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    name: ERouteName.notFound,
    component: () => import("~/presentation/components/NotFound.vue"),
    meta: {
      auth: false
    }
  }
];

/**
 * 共用 - login
 *  */
const loginRoutes: Array<RouteRecordRaw> = [
  {
    path: "/splash",
    name: ERouteName.splash,
    component: () => import("~/presentation/pages/SplashPage.vue"),
    meta: {
      auth: false
    }
  },
  {
    path: "/signIn",
    name: ERouteName.signIn,
    component: () => import("~/presentation/pages/SignInPage.vue"),
    meta: {
      auth: false
    }
  }
];

/** 於邏輯層 (router_index) 判斷，以決定 production 下移除 demoRoutes */
const demoRoutes: Array<RouteRecordRaw> = [
  {
    path: "/demo",
    name: ERouteName.demo,
    component: () => import("~/presentation/pages/demos/DemoIndexPage.vue"),
    meta: {
      auth: false
    }
  },
  {
    path: "/demo/buttons",
    name: ERouteName.demoButtons,
    component: () => import("~/presentation/pages/demos/DemoButtonsPage.vue"),
    meta: {
      auth: false
    }
  },
  {
    path: "/demo/dialogs",
    name: ERouteName.demoDialogs,
    component: () => import("~/presentation/pages/demos/DemoDialogsPage.vue"),
    meta: {
      auth: false
    }
  },
  {
    path: "/demo/dropdowns",
    name: ERouteName.demoDropdowns,
    component: () => import("~/presentation/pages/demos/DemoDropdownsPage.vue"),
    meta: {
      auth: false
    }
  },
  {
    path: "/demo/input-fields",
    name: ERouteName.demoInputFields,
    component: () =>
      import("~/presentation/pages/demos/DemoInputFieldsPage.vue"),
    meta: {
      auth: false
    }
  }
];

/**
 * adminRouterConfig, 用於設定 admin 可訪頁面
 *  */
const adminRoutes: Array<RouteRecordRaw> = [
  ...loginRoutes,
  ...demoRoutes,
  {
    path: "/",
    name: ERouteName.pageLayout,
    component: () => import("~/presentation/layout/PageLayout.vue"),
    children: [
      {
        path: "",
        name: ERouteName.pageLayout,
        redirect: { name: ERouteName.dashboard }
      },
      {
        path: "/dashboard",
        name: ERouteName.dashboard,
        component: () => import("~/presentation/pages/DashboardPage.vue"),
        meta: {
          admin: ADMIN_GROUP.all
        }
      },
      {
        path: "/merchant-list",
        name: ERouteName.supplierList,
        component: () => import("~/presentation/pages/MerchantListPage.vue"),
        meta: {
          admin: ADMIN_GROUP.all
        }
      },
      {
        path: "/material-list",
        name: ERouteName.materialList,
        component: () => import("~/presentation/pages/MaterialListPage.vue"),
        meta: {
          admin: ADMIN_GROUP.all
        }
      },
      {
        path: "/project-manager",
        name: ERouteName.projectManagement,
        component: () => import("~/presentation/pages/ProjectManagementPage.vue"),
        meta: {
          admin: ADMIN_GROUP.all
        }
      },
      {
        path: "/human-resource",
        name: ERouteName.humanResource,
        component: () => import("~/presentation/pages/HumanResourcePage.vue"),
        meta: {
          admin: ADMIN_GROUP.all
        }
      },
      {
        path: "/user-account-control",
        name: ERouteName.userAccountControl,
        component: () => import("~/presentation/pages/UserAccountControlPage.vue"),
        meta: {
          admin: ADMIN_GROUP.all
        }
      },
    ],
  },
  ...notFoundRoutes
];

export default {
  loginRoutes,
  demoRoutes,
  adminRoutes,
  notFoundRoutes
};
