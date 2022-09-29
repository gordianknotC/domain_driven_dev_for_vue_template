import {App} from "vue";
import {injectFacade} from "common_js_builtin/dist";
import {setupClientService} from "~/data_source/core/client_service_setup";
import {setupRepositories} from "~/data_source/repositories/repository_setup";

/**
 *  App dependencies includes
 *    all services
 *    all presentation controllers
 *    all repositories
 *
 * */
export
function setupAppDependencies(app: App<Element>, applyMount: boolean) {
  setupClientService();
  setupRepositories();
  app.mount('#app');
}
