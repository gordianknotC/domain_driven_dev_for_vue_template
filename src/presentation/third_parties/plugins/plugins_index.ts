import { App } from "vue";
import { createPinia } from "pinia";

import { setupSvg } from "~/presentation/third_parties/plugins/svg_icon_plugin";
import { setupElement } from "~/presentation/third_parties/plugins/element_plugin";
import { setupDevTool } from "./devtool_plugin";
import type { AppFacade } from "~/main";
import { setupMappers } from "~/data_source/mappers/mappers_index";
import { setupMarquee } from "./marquee_plugin";
import { computed, reactive, ref, watch } from "vue";
import { setupComputed, setupCurrentEnv, setupReactive, setupRef, setupWatch } from "@gdknot/frontend_common";


/**
 *  App plugins
 * */
export function setupAppPlugins(app: App<Element>, facade: AppFacade) {
  setupComputed(computed);
  setupReactive(reactive);
  setupRef(ref);
  setupWatch(watch);
  setupCurrentEnv("develop");
  setupDevTool(app, facade);
  app.use(createPinia());
  setupSvg(app);
  setupElement(app);
  setupMarquee(app);
}
