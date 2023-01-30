// todo: index mappers 統一注入
import { provideFacade } from "@gdknot/frontend_common";
import { App } from "vue";
import type { UserEntity } from "~/data_source/entities/user_entity";
import { BaseModelMapper, tempMapper } from "~/data_source/mappers/base_mappers";
import type { UserDomainModel } from "~/domain/account/user_domain_model";
import type { AnnouncementDomainModel } from "~/domain/app/announcement_domain_model";
import type { AnnouncementEntity } from "../entities/announcement_entity";
import type { AppFacade } from "~/main";

export type FacadeMappers = {
  data: {
    mappers: {
      user: BaseModelMapper<UserEntity, UserDomainModel>;
      announcement: BaseModelMapper<AnnouncementEntity, AnnouncementDomainModel>;
    };
  };
};


export function setupMappers(app: App<Element>, facade: AppFacade) {
  const merge = true;
  provideFacade({
    deps: {
      data: {
        // FIXME: tempMapper 測試用
        mappers: {
          user: tempMapper(),
          announcement: tempMapper()
        }
      }
    },
    merge
  });
}
