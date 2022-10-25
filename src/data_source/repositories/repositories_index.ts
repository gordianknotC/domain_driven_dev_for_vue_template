import { IFacade, provideFacade } from "js_util_for_vue_project";
import { TUserRepository } from "~/data_source/repositories/account/itf/user_repository_itf";
import { UserRepositoryImpl } from "~/data_source/repositories/account/impl/user_repository_impl";
import { facade } from "~/main";
import { App } from "vue";
import { TAnnouncementRepository } from "./app/itf/announcement_repository_itf";
import { AnnouncementRepositoryImpl } from "./app/impl/announcement_repository_impl";
import { UserEntity } from "../entities/user_entity";
import { UserMapper } from "../mappers/mappers_types";
import { BaseRepository } from "./base_repository";

export type FacadeRepository = {
  data: {
    repo: {
      user: TUserRepository,
      announcement: TAnnouncementRepository,
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

  const announcementMapper = facade.data.mappers.announcement;
  const announcement = new AnnouncementRepositoryImpl(client, announcementMapper);

  provideFacade(
    {
      data: {
        repo: {
          user,
          announcement
        }
      }
    },
    mergeObject
  );
}
