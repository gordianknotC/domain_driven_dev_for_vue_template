import { defineStore } from "pinia";
import { computed, ComputedRef, ref } from "vue";
import { ERole, UserEntity } from "~/data_source/entities/user_entity";
import { useRestoreActive } from "element-plus";
import { facade } from "~/main";
import { APP_MENU_CONFIG, TAppMenu } from "~/presentation/configs/menu_config";
import { ERouter } from "~/presentation/consts/router_const";
import { flattenInstance } from "js_util_for_vue_project";
import { IUiStore } from "../itf/uis_store_itf";
import { NavigationFailure } from "vue-router";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { ILocalStorage } from "~/data_source/core/interfaces/local_client_service";
import { StorageKeys } from "~/data_source/core/impl/local_client_service_impl";
import {merge} from "merge-anything";

export type AppTabItem = {
    name: ERouter,
    query?: Record<string, string>,
    params?: Record<string, string>,
}

export type AppMenuState = {
    config: TAppMenu[],
    activated?: AppTabItem,
    openedTabs?: AppTabItem[],
}

class AppMenuController implements
    IUiStore<AppMenuState>,
    ILocalStorage<AppMenuState>
{
    state!: AppMenuState;
    getters: Record<string, ComputedRef<any>>; 
    get localStorage(): RemovableRef<AppMenuState> | null {
        const defaultMenu = this.defaultState();
        return useLocalStorage(StorageKeys.ui.appMenu, defaultMenu);
    }

    constructor(public defaultState: () => AppMenuState, singleton: boolean = true) { 
        this.initializeLocalTabs();
        this.getters = {
            
        };
        flattenInstance(this);
    }

    setActiveTab(item: AppTabItem): Promise<{ succeed: boolean }> { 
        const preTab = this.state.activated;
        this.state.activated = item;
        return new Promise((resolve, reject) => {
            facade.ctlr.router.push(item).then((_) => { 
                if (_ == undefined) {
                    resolve({ succeed: true });
                } else { 
                    resolve({ succeed: false });
                    this.state.activated = preTab;
                }
            });
        });
    }

    /** 初始化 local tabs 由 local storage 載入 */
    initializeLocalTabs() { 
        this.state = this.defaultState();
        merge(this.state, this.localStorage?.value ?? {});
    }
}


export const appMenuStore = defineStore("AppMenu", () => {
    const activated: AppTabItem = {
        name: ERouter.home,
        params: {},
        query: {}
    };
    const openedTabs: AppTabItem[] = [
        activated
    ];
    return new AppMenuController(() => { 
        return {
            config: APP_MENU_CONFIG,
            activated,
            openedTabs
        };
    });
});
