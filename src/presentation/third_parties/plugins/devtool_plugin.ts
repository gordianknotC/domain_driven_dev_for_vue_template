import { App } from "vue";

export function setupDevTool(app: App<Element>, facade: any) {
  (window as any).facade = facade;
}
