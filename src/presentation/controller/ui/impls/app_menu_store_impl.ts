import { defineStore } from "pinia";
import {
  computed,
  ComputedRef,
  reactive,
  ref,
  UnwrapNestedRefs,
  watch,
  WatchStopHandle
} from "vue";
import { facade } from "~/main";
import { APP_MENU_CONFIG } from "~/presentation/configs/menu_config";
import { ERouteName } from "@/presentation/const/router_const";
import { flattenInstance, LazyHolder } from "@gdknot/frontend_common";
import { ISimpleStore } from "../itf/base_store_itf";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { LocalStorage } from "~/data_source/core/interfaces/crypto_storage";
import { StorageKeys } from "~/data_source/core/impl/crypto_storage_impl";
import { merge } from "merge-anything";

import { RouteLocationNormalizedLoaded } from "vue-router";
import { AppMenuState, AppTabItem } from "../itf/app_menu_store";
import { ElMenuConfigItem } from "~/presentation/third_parties/utils/element_menu_helper";
import { AnnouncementEntity } from "~/data_source/entities/announcement_entity";
import { AnnouncementDomainModel } from "~/domain/app/announcement_domain_model";
import { DataModel } from "~/data_source/mappers/base_mappers";
import { RequestEvent } from "~/data_source/entities/request_entity";
import { ArrayDelegate, Arr } from "@gdknot/frontend_common";
/** 處理 announcement */
export class AppMenuStoreExtensionMarquee {}

/** 處理 app aside menu, app tab header */
export class AppMenuStore
  extends LocalStorage<AppMenuState>
  implements ISimpleStore<AppMenuState>
{
  state!: UnwrapNestedRefs<AppMenuState>;
  getters: Record<string, ComputedRef<any>>;
  get localStorage(): RemovableRef<AppMenuState> | null {
    const defaultMenu = this.defaultState();
    return useLocalStorage(StorageKeys.ui.appMenu, defaultMenu);
  }

  constructor(public defaultState: () => AppMenuState) {
    super(StorageKeys.ui.appMenu, defaultState());
    const overrideReadonlyProperty = true;
    this.initializeLocalTabs();
    this.getters = {};
    flattenInstance(this, overrideReadonlyProperty);
    this.initialFetchUpdate();
  }

  async initialFetchUpdate(): Promise<void> {
    await facade.data.repo.announcement.fetchAndUpdate({id: 12345}, RequestEvent.getAnnouncement);
    this.state.announcements = facade.data.repo.announcement.get()!;
    this.state.initialFetched = true;
  }

  /** 初始化 local tabs 由 local storage 載入 */
  private initializeLocalTabs() {
    this.state = reactive(this.defaultState());
    merge(this.state, this.localStorage?.value ?? {});
  }

  /** 作用於 app tabs */
  private addActiveTab(item: AppTabItem): void {
    this.state.openedTabs = Arr([...this.state.openedTabs!, item]);
  }

  private isRouteAlreadyOpened(route: ERouteName): boolean {
    return this.state.openedTabs!.firstWhere(_ => _.name == route) != undefined;
  }

  private walkMenuConfig(
    items: ElMenuConfigItem[],
    continueAction: (item: ElMenuConfigItem) => boolean
  ) {
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      if (continueAction(element)) {
        if (element.children) {
          this.walkMenuConfig(Object.values(element.children), continueAction);
        }
      } else {
        return;
      }
    }
  }
  private canFindInMenuConfig(routeName: ERouteName): boolean {
    if (this.state.config.indexMapping[routeName]) {
      return true;
    } else {
      return false;
    }
  }

  private onRouterChange(
    newVal: RouteLocationNormalizedLoaded,
    oldVal: RouteLocationNormalizedLoaded
  ) {
    if (newVal.name == oldVal.name) {
      //pass
    } else {
      const routeName = newVal.name as any as ERouteName;
      const item = this.getTabItem(routeName);
      if (this.isRouteAlreadyOpened(routeName)) {
        this.setActiveTab(item);
      } else if (this.canFindInMenuConfig(routeName)) {
        this.addActiveTab(item);
      } else {
        this.addActiveTab(item);
        this.setActiveTab(item);
      }
    }
  }

  routerWatcher?: WatchStopHandle;
  bindRouter() {
    this.routerWatcher ??= watch(
      () => facade.stores.router.currentRoute.value,
      this.onRouterChange
    );
  }

  toggleAsideMenu(){
    this.state.enlarged = !this.state.enlarged;
  }

  unbindRouter() {
    this.routerWatcher?.();
  }

  getTabItem(route: ERouteName): AppTabItem {
    const openedTab = this.state.openedTabs!.firstWhere(_ => _.name == route);
    if (openedTab == undefined) return { name: route, params: {}, query: {} };
    return openedTab!;
  }

  /** 作用於 app tabs */
  setActiveTab(item: AppTabItem): void {
    const preTab = this.state.activated;
    this.state.activated = item;
    // return new Promise((resolve, reject) => {
    //     facade.stores.router.push(item).then((_) => {
    //         if (_ == undefined) {
    //             resolve({ succeed: true });
    //         } else {
    //             resolve({ succeed: false });
    //             this.state.activated = preTab;
    //         }
    //     });
    // });
  }

  removeTab(routeName: string) {
    const item = this.state.openedTabs!.firstWhere(_ => _.name == routeName)!;
    if (item) {
      this.state.openedTabs!.remove(item);
      this.state.openedTabs! = Arr([...this.state.openedTabs!]);
      facade.stores.router.push(this.state.openedTabs!.last);
    }
  }
}

/** 實驗 oop 寫法，這裡沒必要不要這樣寫，之後會改 function */
export const appMenuStore = defineStore("AppMenu", () => {
  const announcements: DataModel<AnnouncementEntity, AnnouncementDomainModel> =
    facade.data.repo.announcement.get()!;

  const activated: AppTabItem = {
    name:
      (facade.stores.router.currentRoute.value.name as any) ??
      facade.stores.router.getHomeRoute(),
    params: {},
    query: {}
  };
  const homeTab = {
    name: facade.stores.router.getHomeRoute(),
    params: {},
    query: {}
  };
  const openedTabs: AppTabItem[] =
    homeTab.name == activated.name ? [homeTab] : [homeTab, activated];

  const enlarged = true;

  console.log("AppMenu announcements:", announcements);
  return new AppMenuStore(() => {
    return {
      config: LazyHolder(() => APP_MENU_CONFIG),
      activated,
      openedTabs: Arr(openedTabs),
      enlarged,
      announcements,
      initialFetched: false,
    };
  });
});
