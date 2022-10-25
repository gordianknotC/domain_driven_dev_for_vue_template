import { Ident } from "~/data_source/core/interfaces/remote_client_service";
import { UserEntity } from "~/data_source/entities/user_entity";
import { UserMapper } from "~/data_source/mappers/mappers_types";
import { BaseRepository } from "~/data_source/repositories/base_repository";

type PayloadType = Ident & Partial<UserEntity>;
export const UserRepository = BaseRepository<UserMapper, UserEntity, PayloadType>;
export type TUserRepository = BaseRepository<UserMapper, UserEntity, PayloadType>;
