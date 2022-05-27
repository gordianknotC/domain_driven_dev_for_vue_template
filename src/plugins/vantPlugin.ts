import { App, Plugin } from "vue";
import VToast, {PluginOptions, POSITION} from "vue-toastification";
import {
  Button,
  Dialog,
  Form,
  Field,
  Empty,
  Toast,
  CountDown,
}  from "vant";

export const installVant: Exclude<Plugin["install"], undefined> = function installTemp(app: App) {
  Object.entries({
    Button,
    Dialog,
    Form,
    Field,
    Empty,
    Toast,
    CountDown,
  }).forEach(([componentName, component]) => {
    app.use(component as any);
  });
};

export
function setupVToast(app: App<Element>){
  const vToastOpts: PluginOptions = {
    position: POSITION.BOTTOM_CENTER,
    hideProgressBar: true,
    icon: false,
    transition: "Vue-Toastification__fade",
    maxToasts: 3
  };
  app.use(VToast, vToastOpts);
}



