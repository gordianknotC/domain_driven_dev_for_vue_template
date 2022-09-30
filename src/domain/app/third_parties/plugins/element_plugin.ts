import {App} from "vue";
import ElementPlus from "element-plus";
import "@/assets/styles/custom/element-variables.scss";
import "element-plus/theme-chalk/index.css";
import * as Icons from "@element-plus/icons-vue";
import "@/assets/styles/tailwind.scss";


/**
 *  App plugins
 * */
export
function setupElement(app: App<Element>){
  app.use(ElementPlus);
  Object.keys(Icons).forEach(key => { // @ts-ignore
    app.component(key, Icons[key]);
  });
}
