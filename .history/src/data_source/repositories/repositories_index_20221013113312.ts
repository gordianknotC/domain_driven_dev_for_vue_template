import { IFacade, provideFacade } from "js_util_for_vue_project";
import { TUserRepository } from "~/data_source/repositories/account/interfaces/user_repository";
import { UserRepositoryImpl } from "~/data_source/repositories/account/impl/user_repository_impl";
import { facade } from "~/domain/app/domain_app_index";

export type FacadeRepository = {
  data: {
    repo: {
      user: TUserRepository;
    };
  };
};

// todo: index repositories 統一注入
export function setupRepositories() {
  const userMapper = facade.data.mappers.user;
  const client = facade.data.remote;
  const user = new UserRepositoryImpl(client, userMapper);
  const repo = {};

  provideFacade({
    data: {
      repo: {
        user
      }
    },
  }, true);
}
