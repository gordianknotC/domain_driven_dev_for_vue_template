import { provideFacade } from "@gdknot/frontend_common";
import { App } from "vue";
import { Router } from "vue-router";
import type { AppFacade } from "~/main";
import { APP_MENU_CONFIG } from "../configs/menu_config";
import { ERouteName } from "../const/router_const";
import i18n, { setupI18n } from "./i18n/i18n_index";
import type { LocaleObject } from "./i18n/locales/tw";
import { setupRouter } from "./router/router_index";
import {
  AppMenuStore,
  appMenuStore
} from "./ui/impls/app_menu_store_impl";

export type FacadePresentationStore = {
  stores: {
    appMenu: AppMenuStore;
    i18n: typeof i18n;
    router: Router & { getHomeRoute: ()=> ERouteName};
    t: LocaleObject;
  };
};

// todo: presentation controller
export function setupPresentationStores(
  app: App<Element>,
  facade: AppFacade,
  beforeMounted: boolean
) {
  if (beforeMounted) {
    const merge = true;
    setupRouter();
    setupI18n(app);
    provideFacade({
      deps: {
        stores: {
          appMenu: appMenuStore()
        },
      }, 
      merge
    });
    console.log("facade.store", facade.stores);
  } else {
  }
}
