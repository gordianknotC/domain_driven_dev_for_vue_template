import admin_router_config from "./admin_router_config";
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

const { loginRoutes, notFoundROutes, demoRoutes } = admin_router_config;

/**
 * userRouterConfig, 用於設定 user 可訪頁面
 *
 *  */
export const userRoutes: Array<RouteRecordRaw> = [
  ...loginRoutes,
  ...demoRoutes,
  {
    path: "/",
    name: ERouter.pageLayout,
    component: () => import("~/presentation/layout/PageLayout.vue"),
    children: [
      {
        path: "",
        name: ERouter.pageLayout,
        redirect: { name: ERouter.notFound }
      }
    ]
  },
  ...notFoundROutes
];

export default {
  userRoutes
};
