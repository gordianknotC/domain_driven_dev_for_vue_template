import { App } from "vue";
import { IFacade, injectFacade } from "common_js_builtin/dist";
import { FacadeDateSource, setupDataCoreServices } from "~/data_source/core/data_source_core_index";
import { FacadeRepository, setupRepositories } from "~/data_source/repositories/repositories_index";
import { setupAppPlugins } from "~/domain/app/third_parties/plugins/plugins_index";
import { FacadeMappers, setupMappers } from "~/data_source/mappers/mappers_index";
import { FacadePresentationController, setupPresentationControllers } from "~/presentation/controller/controller_index";


export const facade = IFacade<
  FacadeMappers &
  FacadeDateSource &
  FacadeRepository &
  //FacadeDomainService &
  FacadePresentationController
>();

/**
 *  App dependencies includes
 *    1) vue / ui specific plugins
 *    2) all mappers
 *    3) all repositories
 *    4) all services
 *    5) all presentation controllers
 *
 * */
export function setupDomainDependencies(
  app: App<Element>,
  applyMount: boolean
) {
  setupAppPlugins(app);
  setupMappers();
  setupRepositories();
  setupDataCoreServices();
  setupPresentationControllers(app, false);
  app.mount("#app");
  setupPresentationControllers(app, true);
}
