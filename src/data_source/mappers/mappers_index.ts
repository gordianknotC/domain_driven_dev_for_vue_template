// todo: index mappers 統一注入
import { provideFacade } from "js_util_for_vue_project";
import { App } from "vue";
import { UserEntity } from "~/data_source/entities/user_entity";
import { BaseModelMapper, tempMapper } from "~/data_source/mappers/base_mappers";
import { UserDomainModel } from "~/domain/account/user_domain_model";
import { AnnouncementDomainModel } from "~/domain/app/announcement_domain_model";
import { AnnouncementEntity } from "../entities/announcement_entity";

export type FacadeMappers = {
  data: {
    mappers: {
      user: BaseModelMapper<UserEntity, UserDomainModel>;
      announcement: BaseModelMapper<AnnouncementEntity, AnnouncementDomainModel>;
    };
  };
};


export function setupMappers(app: App<Element>, facade: any) {
  const mergeObject = true;
  provideFacade(
    {
      data: {
        // FIXME: tempMapper 測試用
        mappers: {
          user: tempMapper(),
          announcement: tempMapper()
        }
      }
    },
    mergeObject
  );
}
