import { UserEntity } from "~/data_source/entities/user_entity";
import { RemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { UserRepository } from "~/data_source/repositories/user/interfaces/user_repository";
import {ModelMapper} from "~/data_source/mappers/general_mapper";

export class UserRepositoryImpl implements UserRepository {
  constructor(
    public client: RemoteClientService,
    public mapping: ModelMapper<UserEntity, UserEntity>
  ) {
  }
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
