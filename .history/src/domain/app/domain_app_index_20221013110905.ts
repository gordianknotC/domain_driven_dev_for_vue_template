import { App } from "vue";
import { IFacade, injectFacade } from "js_util_for_vue_project";
import {
  FacadeDateSource,
  setupDataCoreServices
} from "~/data_source/core/data_source_core_index";
import {
  FacadeRepository,
  setupRepositories
} from "~/data_source/repositories/repositories_index";
import { setupAppPlugins } from "~/domain/app/third_parties/plugins/plugins_index";
import {
  FacadeMappers,
  setupMappers
} from "~/data_source/mappers/mappers_index";
import {
  FacadePresentationController,
  setupPresentationControllers
} from "~/presentation/controller/controller_index";

export type FacadeDomainService = {
  svc: {
    material: any;
    merchant: any;
    generalMaterial: any;
  };
};

/**
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
 * facade.ctlr.sideMenu;

 * facade.svc.material;
 * facade.svc.merchant;
 * facade.svc.generalMaterial;
 *
 * */
export const facade = IFacade<
  FacadeMappers &
    FacadeDateSource &
    FacadeRepository &
    FacadePresentationController &
    FacadeDomainService
>();

/**
 *  App dependencies includes
 *    1) vue / ui specific plugins
 *    2) all mappers
 *    3) all repositories
 *    4) all services
 *    5) all presentation controllers
 * */
export function setupDomainDependencies(
  app: App<Element>,
  applyMount: boolean
) {
  //@ts-ignore
  window.facade = facade;
  setupAppPlugins(app);
  setupMappers();
  setupRepositories();
  setupDataCoreServices();
  setupPresentationControllers(app, false);
  app.mount("#app");
  setupPresentationControllers(app, true);
}
