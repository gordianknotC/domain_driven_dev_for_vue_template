import { UserEntity } from "~/data_source/entities/user_entity";
import { RemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { UserRepository } from "~/data_source/repositories/user/interfaces/user_repository";
import { UserMapper } from "~/data_source/mappers/mappers_types";

export class UserRepositoryImpl implements UserRepository {
  constructor(public client: RemoteClientService, public mapper: UserMapper) {}

  fetch(): Promise<UserEntity> {
    throw new Error("NotImplemented");
  }

  get(): UserEntity {
    throw new Error("NotImplemented");
  }
  set(val: UserEntity): void {}
  upload(): Promise<{ success: boolean }> {
    return Promise.resolve({ success: false });
  }
}
