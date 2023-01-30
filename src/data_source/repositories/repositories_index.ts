import { IFacade, provideFacade } from "@gdknot/frontend_common";
import { TUserRepository } from "~/data_source/repositories/account/itf/user_repository_itf";
import { UserRepositoryImpl } from "~/data_source/repositories/account/impl/user_repository_impl";
import { App } from "vue";
import { TAnnouncementRepository } from "./app/itf/announcement_repository_itf";
import { AnnouncementRepositoryImpl } from "./app/impl/announcement_repository_impl";
import { BaseRepository } from "./base_repository";
import { appLocalStorageMgr } from "../core/impl/local_storage_manager_impl";
import type { AppFacade } from "~/main";

export type FacadeRepository = {
  data: {
    repo: {
      user: TUserRepository,
      announcement: TAnnouncementRepository,
      reset: ()=>void
    };
  };
};


// todo: index repositories 統一注入
export function setupRepositories(app: App<Element>, facade: AppFacade) {
  const merge = true;
  const client = facade.data.remoteClient;

  /** repository 設定，注入 */
  const userMapper = facade.data.mappers.user;
  const user = new UserRepositoryImpl(client, userMapper);

  const announcementMapper = facade.data.mappers.announcement;
  const announcement = new AnnouncementRepositoryImpl(client, announcementMapper);
  
  provideFacade({
    deps: {
      data: {
        repo: {
          user,
          announcement,
          reset: ()=>{
            appLocalStorageMgr().clear();
          }
        }
      }
    },
    merge
  });
}
