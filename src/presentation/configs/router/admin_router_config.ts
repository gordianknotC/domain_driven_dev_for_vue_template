import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ERouter } from "~/presentation/consts/router_const";
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
const notFoundROutes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    name: ERouter.notFound,
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
    name: ERouter.splash,
    component: () => import("~/presentation/pages/SplashPage.vue"),
    meta: {
      auth: false
    }
  },
  {
    path: "/signin",
    name: ERouter.signin,
    component: () => import("~/presentation/pages/SigninPage.vue"),
    meta: {
      auth: false
    }
  }
];

/**
 * adminRouterConfig, 用於設定 admin 可訪頁面
 *
 *  */
const adminRoutes: Array<RouteRecordRaw> = [
  ...loginRoutes,
  {
    path: "/",
    name: ERouter.pagelayout,
    component: () => import("~/presentation/layout/PageLayout.vue"),
    children: [
      {
        path: "",
        name: ERouter.pagelayout,
        redirect: { name: ERouter.merhantList }
      },
      {
        path: "/merchant-list",
        name: ERouter.merhantList,
        component: () => import("~/presentation/pages/MerchantListPage.vue"),
        meta: {
          admin: ADMIN_GROUP.all
        }
      },
      {
        path: "/material-list",
        name: ERouter.merhantList,
        component: () => import("~/presentation/pages/MaterialListPage.vue"),
        meta: {
          admin: ADMIN_GROUP.all
        }
      }
    ]
  },
  ...notFoundROutes
];

export default {
  loginRoutes,
  adminRoutes,
  notFoundROutes
};
