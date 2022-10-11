import { UserEntity } from "~/data_source/entities/user_entity";
import { UserMapper } from "~/data_source/mappers/mappers_types";
import { BaseRepository } from "~/data_source/repositories/base_repository";

export const UserRepository = BaseRepository<UserMapper, UserEntity>;

export type TUserRepository = BaseRepository<UserMapper, UserEntity>;
