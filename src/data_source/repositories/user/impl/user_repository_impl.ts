import { UserEntity } from "~/data_source/entities/user_entity";
import { RemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { UserRepository } from "~/data_source/repositories/user/interfaces/user_repository";
import { ModelMapper } from "~/data_source/mappers/mappers_setup";

export class UserRepositoryImpl implements UserRepository {
  client: RemoteClientService;
  mapping: ModelMapper<UserEntity, UserEntity>;

  fetch(): Promise<UserEntity> {
    return Promise.resolve(undefined);
  }

  get(): UserEntity {
    return undefined;
  }

  set(val: UserEntity): void {}

  upload(): Promise<{ success: boolean }> {
    return Promise.resolve({ success: false });
  }
}
