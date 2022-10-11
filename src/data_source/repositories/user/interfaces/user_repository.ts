import { UserEntity } from "~/data_source/entities/user_entity";
import { RemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { UserMapper } from "~/data_source/mappers/mappers_types";
import { BaseRepository } from "~/data_source/repositories/base_repository";

export type UserRepository = BaseRepository<
  RemoteClientService,
  UserMapper,
  UserEntity
>;
