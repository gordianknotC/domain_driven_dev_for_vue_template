import { App } from "vue";
import { createPinia } from "pinia";
import "element-plus/theme-chalk/index.css";
import { setupSvg } from "~/presentation/third_parties/plugins/svg_icon_plugin";
import { setupElement } from "~/presentation/third_parties/plugins/element_plugin";
import { setupDevTool } from "./devtool_plugin";

/**
 *  App plugins
 * */
export function setupAppPlugins(app: App<Element>, facade: any) {
  setupDevTool(app, facade);
  app.use(createPinia());
  setupSvg(app);
  setupElement(app);
}
