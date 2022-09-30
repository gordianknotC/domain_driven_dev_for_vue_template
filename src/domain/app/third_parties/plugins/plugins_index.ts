import {App} from "vue";
import { createPinia } from 'pinia'
import "@/assets/styles/custom/element-variables.scss";
import "element-plus/theme-chalk/index.css";
import "@/assets/styles/tailwind.scss";
import {setupSvg} from "~/domain/app/third_parties/plugins/svg_icon_plugin";
import {setupElement} from "~/domain/app/third_parties/plugins/element_plugin";


/**
 *  App plugins
 * */
export
function setupAppPlugins(app: App<Element>){
  app.use(createPinia())
  setupSvg(app);
  setupElement(app);
}
