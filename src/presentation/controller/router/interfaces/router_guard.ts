import {
  NavigationGuardNext,
  NavigationGuardWithThis,
  RouteLocationNormalized,
  Router
} from "vue-router";

export abstract class IRouterGuard {
  abstract preprocessChains: IRouterGuardPreprocessor[];
  abstract guardChains: any[];
  abstract preprocess(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): Promise<any>;
}

export abstract class IRouterGuardPreprocessor {
  abstract router: Router;
  abstract _nextChain?: IRouterGuardPreprocessor;
  abstract _prevChain?: IRouterGuardPreprocessor;
  abstract addNext(nextChain?: IRouterGuardPreprocessor): void;
  abstract addAction(
    qsName: string,
    action: (
      to: RouteLocationNormalized,
      from: RouteLocationNormalized,
      next: NavigationGuardNext
    ) => Promise<void>
  ): void;
  abstract canProcess(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): boolean;
  abstract canGoNext(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): boolean;
  abstract process(
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): void;
}
