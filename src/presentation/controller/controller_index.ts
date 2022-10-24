import { provideFacade } from "js_util_for_vue_project";
import { App } from "vue";
import { Router } from "vue-router";
import { APP_MENU_CONFIG } from "../configs/menu_config";
import i18n, { setupI18n } from "./i18n/i18n_index";
import { setupRouter } from "./router/router_index";
import { AppMenuState, AppMenuStore, appMenuStore } from "./ui/impls/app_menu_store_impl";

export type FacadePresentationStore = {
  stores: {
    sideMenu: AppMenuStore;
    i18n: typeof i18n;
    router: Router;
  };
};

// todo: presentation controller
export function setupPresentationStores(
  app: App<Element>,
  facade: any,
  beforeMounted: boolean
) {
  if (beforeMounted) {
    const mergeMode = true;
    setupRouter();
    setupI18n(app);
    // provideFacade({
    //   stores: {
    //     sideMenu: appMenuStore(),
    //   }, mergeMode
    // })
  } else {
  }
}
