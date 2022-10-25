import { IFacade, provideFacade } from "js_util_for_vue_project";
import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw
} from "vue-router";
import { routerConfig } from "~/presentation/configs/router_config";
import { ERouteName } from "~/presentation/consts/router_const";
import { ADMIN_GROUP } from "~/presentation/consts/ua_const";
import {
  QueryStringPreprocessorGuard,
  RouterGuardImpl
} from "./impls/router_guard_impl";

let routerInstance: Router;

/** 用來巢狀寫入 router config 中 meta.admin 裡面的值 */
function applyMetaDefaults(
  routes: RouteRecordRaw[],
  defaults = ADMIN_GROUP.all
): RouteRecordRaw[] {
  routes.forEach(r => {
    if (r.meta?.admin == undefined) {
      r.meta ??= {};
      r.meta.admin = defaults;
    }
    if ((r.children?.length ?? 0) >= 1) {
      applyMetaDefaults(r.children!, defaults);
    }
  });
  return routes;
}

/**
 * // TODO: 實作移除不必要的 routes 如
 * 1）User Account Control 不允許的 routes
 * e.g: demoRoutes
 */
function removeRedundantRoutes(config: typeof routerConfig): RouteRecordRaw[] {
  return config.admin;
}


export function getRouter(): Router {
  if (routerInstance != undefined) return routerInstance!;

  // TODO:
  // 實作角色權限 router 選擇, 目前先直接用 routerConfig.admin,
  // 預計這裡會偵聽 UAC change 重刷 routerInstance
  routerInstance ??= createRouter({
    history: createWebHistory(),
    routes: applyMetaDefaults(
      removeRedundantRoutes(routerConfig),
      ADMIN_GROUP.all
    )
  });

  // TODO: UAC guard
  const routerGuardPlugins = [
    new QueryStringPreprocessorGuard(routerInstance!)
  ];
  const routerGuard = new RouterGuardImpl(routerGuardPlugins, []);

  routerInstance!.beforeEach((to, from, next) => {
    routerGuard.preprocess(to, from, next).then(_ => {
      next();
    });
  });

  Object.assign(routerInstance, {
    getHomeRoute:(): ERouteName=>{
      const layout = routerConfig.admin.firstWhere((_)=>_.name == ERouteName.pageLayout)!;
      const home = layout?.children?.firstWhere((_)=>_.path == "")!;
      return (home!.redirect! as any).name as any;
    }
  });

  return routerInstance!;
}

/** 注入 router */
export function setupRouter() {
  const mergeObject = true;
  provideFacade(
    {
      stores: {
        router: getRouter()
      }
    },
    mergeObject
  );
}
