// todo: index mappers 統一注入
import { injectFacade } from "js_util_for_vue_project";
import { UserEntity } from "~/data_source/entities/user_entity";
import { BaseModelMapper } from "~/data_source/mappers/base_mappers";

export type FacadeMappers = {
  data: {
    mappers: {
      user: BaseModelMapper<UserEntity, UserEntity>;
    };
  };
};

export function setupMappers() {
  injectFacade({
    data: {
      mappers: {
        user: new BaseModelMapper(
          entity => {
            return entity;
          },
          domain => {
            return domain;
          }
        )
      }
    }
  }, true);
}
