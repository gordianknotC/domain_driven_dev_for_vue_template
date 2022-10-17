
import { IFacade, provideFacade } from "js_util_for_vue_project";
import { createRouter, createWebHistory, Router, RouteRecordRaw } from "vue-router";
import { routerConfig } from "~/presentation/configs/router_config";
import { ADMIN_GROUP } from "~/presentation/consts/ua_const";
import { RouterGuardImpl, QueryStringPreprocessorGuard } from "~/presentation/controller/router/impls/router_guard_impl";


/** 用來巢狀寫入 router config 中 meta.admin 裡面的值 */
function applyAdminMetaIfNotSpecified(
    routes: RouteRecordRaw[],
    defaults = ADMIN_GROUP.all
  ): RouteRecordRaw[] {
    routes.forEach(r => {
      if (r.meta?.admin == undefined) {
        r.meta ??= {};
        r.meta.admin = defaults;
      }
      if ((r.children?.length ?? 0) >= 1) {
        applyAdminMetaIfNotSpecified(r.children!, defaults);
      }
    });
    return routes;
  }
  
  let routerInstance: Router;
  export function getRouter(): Router{
    // TODO:
    // 實作角色權限 router 選擇, 目前先直接用 routerConfig.admin, 
    // 預計這裡會偵聽 UAC change 重刷 routerInstance
    routerInstance ??= createRouter({
      history: createWebHistory(),
      routes: applyAdminMetaIfNotSpecified(routerConfig.admin, ADMIN_GROUP.all)
    });

    // TODO: UAC guard
    const routerGuardPlugins = [
      new QueryStringPreprocessorGuard(routerInstance!),
    ];
    const routerGuard = new RouterGuardImpl(
      routerGuardPlugins,[]);
    
    routerInstance!.beforeEach((to, from , next)=>{
      routerGuard.preprocess(to, from, next).then((_)=>{
        next();
      });
    });

    return routerInstance!;
  }

  export function setupRouter(){
    provideFacade({
      router: getRouter()
    });
  }