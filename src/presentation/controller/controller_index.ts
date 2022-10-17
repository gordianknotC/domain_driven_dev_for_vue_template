import { App } from "vue";

export type FacadePresentationController = {
  ctlr: {
    sideMenu: any;
  };
};

// todo: presentation controller
export function setupPresentationControllers(
  app: App<Element>, 
  facade: any,
  mounted: boolean
) {
  if (!mounted) {
    // todo:
    // 1) controller 前袑始化
  } else {
    // todo:
    // 1）theme 切換寫在這
    // 2） controller 後初始化
  }
}
