import { App } from "vue";
import Vue3Marquee from 'vue3-marquee'
/**
 *  App plugins
 * */
export function setupMarquee(app: App<Element>) {
  app.use(Vue3Marquee);
}
