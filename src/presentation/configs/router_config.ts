import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { ERouter } from "../consts/router_const";
import { ADMIN_GROUP, EUserAccount } from "../consts/ua_const";
import admin_router_config from "./router/admin_router_config";
import user_router_config from "./router/user_router_config";

/**
 * adminRouterConfig, 用於設定 user 可訪頁面
 *
 *  */
export const routerConfig = {
  admin: admin_router_config.adminRoutes,
  user: user_router_config.userRoutes
};
