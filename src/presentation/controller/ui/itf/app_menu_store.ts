import type { AnnouncementEntity } from "~/data_source/entities/announcement_entity";
import type { DataModel } from "~/data_source/mappers/base_mappers";
import type { AnnouncementDomainModel } from "~/domain/app/announcement_domain_model";
import type { AppMenuConfig } from "~/presentation/configs/menu_config";
import { ERouteName } from "@/presentation/const/router_const";
import { ArrayDelegate } from "@gdknot/frontend_common";


export type AppTabItem = {
    name: ERouteName,
    query?: Record<string, string>,
    params?: Record<string, string>,
}

export type AppMenuState = {
    config: AppMenuConfig,
    activated?: AppTabItem,
    openedTabs?: ArrayDelegate<AppTabItem>,
    enlarged: boolean,
    announcements: DataModel<AnnouncementEntity, AnnouncementDomainModel>;
    initialFetched: boolean,
}
 
