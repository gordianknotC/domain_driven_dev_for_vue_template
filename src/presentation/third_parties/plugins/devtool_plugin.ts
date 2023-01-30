import { App } from "vue";
import { isDev } from "../utils/env_util";
import type { AppFacade } from "~/main";

export function setupDevTool(app: App<Element>, facade: AppFacade) {
  (window as any).facade = facade;
  console.group("-----------DEV INFO-------------");
  console.log("env:", process.env);
  // console.log("env:", import.meta.env);
  console.log("isDev:", isDev());
  console.groupEnd();
}
