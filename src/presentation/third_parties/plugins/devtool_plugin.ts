import { App } from "vue";
import { isDev } from "../utils/env_util";

export function setupDevTool(app: App<Element>, facade: any) {
  (window as any).facade = facade;
  console.group("======== JINHAO APP INFO =========");
  console.log("env:", import.meta.env);
  console.log("isDev:", isDev());
  console.groupEnd();
}
