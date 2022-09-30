import { UserEntity } from "~/data_source/entities/user_entity";
import { RemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { ModelMapper } from "~/data_source/mappers/mappers_setup";

export abstract class UserRepository {
  abstract client: RemoteClientService;
  abstract mapping: ModelMapper<UserEntity, UserEntity>;
  abstract get(): UserEntity;
  abstract set(val: UserEntity): void;
  abstract fetch(): Promise<UserEntity>;
  abstract upload(): Promise<{ success: boolean }>;
}
