import { App } from "vue";
import { Router } from "vue-router";
import i18n, { setupI18n } from "./i18n/i18n_index";
import { setupRouter } from "./router/router_index";

export type FacadePresentationController = {
  ctlr: {
    sideMenu: any;
    i18n: typeof i18n;
    router: Router;
  };
};

// todo: presentation controller
export function setupPresentationControllers(
  app: App<Element>,
  facade: any,
  beforeMounted: boolean
) {
  if (beforeMounted) {
    setupRouter();
    setupI18n(app);
  } else {
  }
}
