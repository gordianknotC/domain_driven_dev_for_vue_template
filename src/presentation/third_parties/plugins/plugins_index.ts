import { App } from "vue";
import { createPinia } from "pinia";

import { setupSvg } from "~/presentation/third_parties/plugins/svg_icon_plugin";
import { setupElement } from "~/presentation/third_parties/plugins/element_plugin";
import { setupDevTool } from "./devtool_plugin";
import type { AppFacade } from "~/main";
import { setupMappers } from "~/data_source/mappers/mappers_index";
import { setupMarquee } from "./marquee_plugin";

/**
 *  App plugins
 * */
export function setupAppPlugins(app: App<Element>, facade: AppFacade) {
  setupDevTool(app, facade);
  app.use(createPinia());
  setupSvg(app);
  setupElement(app);
  setupMarquee(app);
}
