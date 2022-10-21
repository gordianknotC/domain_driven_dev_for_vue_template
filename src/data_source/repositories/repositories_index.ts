import { IFacade, provideFacade } from "js_util_for_vue_project";
import { TUserRepository } from "~/data_source/repositories/account/itf/user_repository_itf";
import { UserRepositoryImpl } from "~/data_source/repositories/account/impl/user_repository_impl";
import { facade } from "~/main";
import { App } from "vue";

export type FacadeRepository = {
  data: {
    repo: {
      user: TUserRepository;
    };
  };
};

// todo: index repositories 統一注入
export function setupRepositories(app: App<Element>, facade: any) {
  const mergeObject = true;
  const client = facade.data.remote;

  /** repository 設定，注入 */
  const userMapper = facade.data.mappers.user;
  const user = new UserRepositoryImpl(client, userMapper);

  provideFacade(
    {
      data: {
        repo: {
          user
        }
      }
    },
    mergeObject
  );
}
