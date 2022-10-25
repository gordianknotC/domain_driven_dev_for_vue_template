"use strict";

import { createApp } from "vue";
import App from "./App.vue";

import "~/presentation/assets/styles/index.scss";
import { setupAppPlugins } from "~/presentation/third_parties/plugins/plugins_index";
import { IFacade, provideFacade } from "js_util_for_vue_project";
import {
  FacadeDateSource,
  setupDataCoreServices
} from "~/data_source/core/data_source_core_index";
import {
  FacadeRepository,
  setupRepositories
} from "~/data_source/repositories/repositories_index";
import {
  FacadeMappers,
  setupMappers
} from "~/data_source/mappers/mappers_index";
import {
  FacadePresentationStore,
  setupPresentationStores
} from "~/presentation/controller/controller_index";
import {
  FacadeDomainService,
  setupDomainServices
} from "./domain/domain_index";
import {
  getRouter,
  setupRouter
} from "./presentation/controller/router/router_index";
import 'virtual:svg-icons-register';


const app = createApp(App as any);

/**
 * Facade
 * 提供 APP 入口界面，實際上的相依則以 provideFacade 以注入的方式
 * 注入 container 中，其運作方式 同 DI pattern
 *
 * facade 用來存取 app 中的 data source / domain / presentation
 *
 * 存取 data source
 * facade.data.remote;
 * facade.data.socket;
 *
 * 存取 mappers / repository
 * facade.data.mappers.user;
 * facade.data.repo.user;
 *
 * 存取 presentation controllers
 * facade.stores.appMenu;
 *
 * 存取 domain service
 * facade.svc.material;
 * facade.svc.merchant;
 * facade.svc.generalMaterial;
 *
 * */
export type AppFacade = 
  FacadeMappers &
  FacadeDateSource &
  FacadeRepository &
  FacadePresentationStore &
  FacadeDomainService;

export const facade = IFacade<AppFacade>();

app.use(getRouter());


const feed = (msg: string, cb: ()=>void)=>{
  console.group("", `----------${msg}---------`);
  cb();
  console.groupEnd();
}

/**
 *  設定 App 所需要的相依注入
 * */
(function setupDependencies() {
  "use strict";
  console.group("===============JinHao INFO================")
  feed("APP_PLUGIN", ()=>setupAppPlugins(app, facade));
  // ---------------
  // data source 注入
  feed("DATE_SERVICES", ()=>setupDataCoreServices(app, facade));
  feed("MAPPERS", ()=>setupMappers(app, facade));
  feed("REPOS", ()=>setupRepositories(app, facade));
  // -----------
  // domain 注入
  feed("DOMAIN_SERVICES", ()=>setupDomainServices(app, facade));
  // ----------------
  // presentation 注入
  feed("VIEW_STORES", ()=>setupPresentationStores(app, facade, true));
  app.mount("#app");
  feed("VIEW_STORES", ()=>setupPresentationStores(app, facade, false));
  console.groupEnd();
})();
