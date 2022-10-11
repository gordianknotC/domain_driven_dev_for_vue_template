import { injectFacade } from "common_js_builtin/dist";
import { UserRepository } from "~/data_source/repositories/user/interfaces/user_repository";
import { UserRepositoryImpl } from "~/data_source/repositories/user/impl/user_repository_impl";


export type FacadeRepository = {
  repository: {
    user: UserRepository
  }
}

// todo: index repositories 統一注入
export function setupRepositories() {
  const userMapper = fa
  const user = new UserRepositoryImpl(client, userMapper);
  injectFacade({
    repository: {
      user
    }
  });
}
