import { defineStore } from "pinia";
import { computed, ComputedRef, reactive, ref, UnwrapNestedRefs, watch, WatchStopHandle } from "vue";
import { facade } from "~/main";
import { APP_MENU_CONFIG } from "~/presentation/configs/menu_config";
import { ERouteName } from "~/presentation/consts/router_const";
import { flattenInstance } from "js_util_for_vue_project";
import { ISimpleStore } from "../itf/base_store_itf";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { ILocalStorage } from "~/data_source/core/interfaces/local_client_service";
import { StorageKeys } from "~/data_source/core/impl/local_client_service_impl";
import { merge } from "merge-anything";

import { RouteLocationNormalizedLoaded } from "vue-router";
import { AppMenuState, AppTabItem } from "../itf/app_menu_store";
import { ElMenuConfigItem } from "~/presentation/third_parties/utils/element_menu_helper";


export class AppMenuStore implements
    ISimpleStore<AppMenuState>,
    ILocalStorage<AppMenuState>
{
    state!: UnwrapNestedRefs<AppMenuState>;
    getters: Record<string, ComputedRef<any>>;
    get localStorage(): RemovableRef<AppMenuState> | null {
        const defaultMenu = this.defaultState();
        return useLocalStorage(StorageKeys.ui.appMenu, defaultMenu);
    }

    constructor(public defaultState: () => AppMenuState) {
        this.initializeLocalTabs();
        this.getters = {
            
        };
        flattenInstance(this, undefined, console.log);
    }

    /** 初始化 local tabs 由 local storage 載入 */
    private initializeLocalTabs() { 
        this.state = reactive(this.defaultState());
        merge(this.state, this.localStorage?.value ?? {});
    }
    

    
    
    /** 作用於 app tabs */
    private addActiveTab(item: AppTabItem): void {
        this.state.openedTabs = [...this.state.openedTabs!, item];
    }

    private isRouteAlreadyOpened(route: ERouteName): boolean{
        return this.state.openedTabs!.firstWhere((_)=>_.name == route) != undefined;
    }

    

    private onRouterChange(newVal: RouteLocationNormalizedLoaded, oldVal: RouteLocationNormalizedLoaded){
        
        if (newVal.name == oldVal.name){
            //pass
        }else{
            if (this.isRouteAlreadyOpened(newVal.name as any)){
            console.log("onRouterChange, setActiveTab");
                this.setActiveTab(this.getTabItem(newVal.name as any));
            }else{
            console.log("onRouterChange, addActiveTab");
                this.addActiveTab(this.getTabItem(newVal.name as any));
            }
        }
    }

    routerWatcher?: WatchStopHandle;
    bindRouter(){
        this.routerWatcher ??= watch(()=>facade.stores.router.currentRoute.value, this.onRouterChange);
    }

    unbindRouter(){
        this.routerWatcher?.();
    }

    getTabItem(route: ERouteName): AppTabItem {
        const openedTab = this.state.openedTabs!.firstWhere((_)=>_.name == route);
        if (openedTab == undefined)
            return {name: route, params: {}, query: {}};
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

    removeTab(routeName: string){
        const item = this.state.openedTabs!.firstWhere((_)=>_.name == routeName)!;
        if (item){
            this.state.openedTabs!.remove(item);
            this.state.openedTabs! = [...this.state.openedTabs!];
            facade.stores.router.push(this.state.openedTabs!.last);
        }
        
    }
}


export const appMenuStore = defineStore("AppMenu", () => {
    const activated: AppTabItem = {
        name: (facade.stores.router.currentRoute.value.name as any )?? facade.stores.router.getHomeRoute(),
        params: {},
        query: {}
    };
    const homeTab = {
        name:  facade.stores.router.getHomeRoute(),
        params: {},
        query: {}
    };
    console.log("activated:", activated, facade.stores.router.currentRoute.value);
    const openedTabs: AppTabItem[] = homeTab.name == activated.name
        ? [homeTab]
        : [homeTab, activated];
    const enlarged = true;
    const state = () => { 
        return {
            config: APP_MENU_CONFIG,
            activated,
            openedTabs,
            enlarged
        };
    }

    return new AppMenuStore(() => { 
        return {
            config: APP_MENU_CONFIG,
            activated,
            openedTabs,
            enlarged,
        };
    });
});


