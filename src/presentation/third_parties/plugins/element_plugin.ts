import { App } from "vue";
import ElementPlus from "element-plus";
// todo: fix css import
// import "@/presentation/assets/styles/custom/element-variables.scss";
import "element-plus/theme-chalk/index.css";
import * as Icons from "@element-plus/icons-vue";
import zhTw from "element-plus/es/locale/lang/zh-tw";
import elLocale from "element-plus/es/locale";

/**
 *  App plugins
 * */
export function setupElement(app: App<Element>) {
  app.use(ElementPlus);
  Object.keys(Icons).forEach(key => {
    // @ts-ignore
    app.component(key, Icons[key]);
  });
}
