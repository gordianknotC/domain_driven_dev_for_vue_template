// todo: index mappers 統一注入
import { injectFacade } from "common_js_builtin/dist";
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
  });
}
