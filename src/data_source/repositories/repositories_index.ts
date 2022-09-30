import { injectFacade } from "common_js_builtin";
import { UserRepository } from "~/data_source/repositories/user/interfaces/user_repository";
import { UserRepositoryImpl } from "~/data_source/repositories/user/impl/user_repository_impl";

// todo: index repositories 統一注入
export function setupRepositories() {
  // injectFacade({
  //   repository: {
  //     user: new UserRepositoryImpl()
  //   }
  // });
}
