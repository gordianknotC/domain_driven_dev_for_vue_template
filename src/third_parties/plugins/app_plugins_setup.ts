import {App} from "vue";
import { createPinia } from 'pinia'
import svgIconPlugin from "~/third_parties/plugins/svgIcon";


/**
 *  App plugins
 * */
export
function setupAppPlugins(app: App<Element>){
  app.use(createPinia())
  app.use(svgIconPlugin, {imports: []});
}
