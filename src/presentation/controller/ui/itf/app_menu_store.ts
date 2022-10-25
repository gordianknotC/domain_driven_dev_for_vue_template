import type { AnnouncementEntity } from "~/data_source/entities/announcement_entity";
import type { Model } from "~/data_source/mappers/base_mappers";
import type { AnnouncementDomainModel } from "~/domain/app/announcement_domain_model";
import type { AppMenuConfig } from "~/presentation/configs/menu_config";
import { ERouteName } from "~/presentation/consts/router_const";


export type AppTabItem = {
    name: ERouteName,
    query?: Record<string, string>,
    params?: Record<string, string>,
}

export type AppMenuState = {
    config: AppMenuConfig,
    activated?: AppTabItem,
    openedTabs?: AppTabItem[],
    enlarged: boolean,
    announcements: Model<AnnouncementEntity, AnnouncementDomainModel>[];
}
 
