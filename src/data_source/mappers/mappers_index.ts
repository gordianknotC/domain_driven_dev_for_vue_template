// todo: index mappers 統一注入
import { injectFacade } from "common_js_builtin";
import { UserEntity } from "~/data_source/entities/user_entity";
import { BaseModelMapper } from "~/data_source/mappers/base_mappers";

export function setupMappers() {
  injectFacade({
    mappers: {
      user: () =>
        new BaseModelMapper(
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
