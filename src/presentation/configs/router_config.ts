import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ERouter } from "../consts/router_const";
import { ADMIN_GROUP } from "../consts/ua_const";
import {
  QueryStringPreprocessorGuard,
  RouterGuardImpl
} from "../controller/router/impls/router_guard_impl";

/**
 * 共用 - not found
 *  */
const notFoundROutes: Array<RouteRecordRaw> = [
  {
    path: "/:catchAll(.*)",
    name: ERouter.notFound,
    component: () => import("@/views/NotFound.vue")
  }
];

/**
 * 共用 - login
 *  */
const loginRoutes: Array<RouteRecordRaw> = [
  {
    path: "/splash",
    name: ERouter.splash,
    component: () => import("~/presentation/pages/SplashPage.vue")
  },
  {
    path: "/signin",
    name: ERouter.signin,
    component: () => import("~/presentation/pages/SigninPage.vue")
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
    name: ERouter.homelayout,
    component: () => import("~/presentation/layout/HomeLayout.vue"),
    children: [
      {
        path: "",
        name: ERouter.homelayout,
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

/**
 * userRouterConfig, 用於設定 user 可訪頁面
 *
 *  */
export const userRoutes: Array<RouteRecordRaw> = [
  ...loginRoutes,
  {
    path: "/",
    name: ERouter.homelayout,
    component: () => import("~/presentation/layout/HomeLayout.vue"),
    children: [
      {
        path: "",
        name: ERouter.homelayout,
        redirect: { name: ERouter.notFound }
      }
    ]
  },
  ...notFoundROutes
];

/**
 * adminRouterConfig, 用於設定 user 可訪頁面
 *
 *  */
export const routerConfig = {
  admin: adminRoutes,
  user: userRoutes
};
