import {
  NavigationGuardNext,
  NavigationGuardWithThis,
  RouteLocationNormalized,
  Router
} from "vue-router";

import {
  IRouterGuard,
  IRouterGuardPreprocessor
} from "../interfaces/router_guard";

export class RouterGuardImpl implements IRouterGuard {
  constructor(
    public preprocessChains: IRouterGuardPreprocessor[],
    public guardChains: any[]
  ) {
    for (let i = 0; i < preprocessChains.length; i++) {
      const chain = preprocessChains[i];
      const nextChain =
        i !== preprocessChains.length - 1 ? preprocessChains[i + 1] : undefined;
      chain.addNext(nextChain);
    }
  }

  async preprocess(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<any> {
    for (let i = 0; i < this.preprocessChains.length; i++) {
      const chain = this.preprocessChains[i];
      if (chain.canProcess(to, from, next)) {
        try {
          await chain.process(to, from, next);
          if (!chain.canGoNext(to, from, next)) {
            break;
          }
        } catch (e) {
          // preprocessor 目的在前處理，不應 break code, 不 raise
          console.error(e);
        }
      }
    }
  }
}

type TReg = {
  queryName: string;
  act: (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ) => Promise<void>;
  forceCheck: boolean;
};

export class UACPreprocessorGuard {}

export class QueryStringPreprocessorGuard implements IRouterGuardPreprocessor {
  protected registry: TReg[] = [];
  _nextChain?: IRouterGuardPreprocessor;
  _prevChain?: IRouterGuardPreprocessor;

  constructor(public router: Router) {}

  // TODO: 移至上層封裝
  addNext(nextChain?: IRouterGuardPreprocessor) {
    if (!nextChain) return;
    this._nextChain = nextChain;
    nextChain._prevChain = this;
  }

  // TODO: 移至上層封裝
  addAction(
    queryName: string,
    action: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => Promise<void>,
    forceCheck: boolean = true
  ) {
    this.registry.push({ queryName, act: action, forceCheck });
  }

  /** 匹配 querystring */
  canProcess(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): boolean {
    const regs = this.registry.map(_ => _);
    const qKeys = Object.keys(to.query);
    for (let i = 0; i < regs.length; i++) {
      const rKey = regs[i].queryName;
      const forceCheck = this.registry[i].forceCheck;
      if (forceCheck && !qKeys.includes(rKey)) {
        return false;
      }
    }
    return true;
  }

  /** 是否進行 next chain*/
  canGoNext(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): boolean {
    if (this._nextChain) {
      return this._nextChain.canProcess(to, from, next);
    }
    return false;
  }

  // TODO: 移至上層封裝
  async process(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<void> {
    for (let i = 0; i < this.registry.length; i++) {
      const reg = this.registry[i];
      await reg.act(to, from, next);
    }
  }
}
