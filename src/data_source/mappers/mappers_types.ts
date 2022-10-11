import { UserEntity } from "~/data_source/entities/user_entity";
import { BaseModelMapper } from "~/data_source/mappers/base_mappers";

export type UserMapper = BaseModelMapper<UserEntity, UserEntity>;

