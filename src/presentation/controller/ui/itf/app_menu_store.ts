import { APP_MENU_CONFIG } from "~/presentation/configs/menu_config";
import { ERouteName } from "~/presentation/consts/router_const";

export type AppTabItem = {
    name: ERouteName,
    query?: Record<string, string>,
    params?: Record<string, string>,
}

export type AppMenuState = {
    config: typeof APP_MENU_CONFIG,
    activated?: AppTabItem,
    openedTabs?: AppTabItem[],
    enlarged: boolean,
}
 
