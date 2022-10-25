import { ERole, UserEntity } from "~/data_source/entities/user_entity";
import { TUserRepository, UserRepository } from "~/data_source/repositories/account/itf/user_repository_itf";
import { EErrorCode, TDataResponse, TErrorResponse, TSuccessResponse } from "~/data_source/entities/response_entity";
import { Model } from "~/data_source/mappers/base_mappers";
import { UserDomainModel } from "~/domain/account/user_domain_model";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { StorageKeys } from "~/data_source/core/impl/crypto_storage_impl";
import { IRemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { UserMapper } from "~/data_source/mappers/mappers_types";
import { facade } from "~/main";

type Entity = UserEntity;
type Mapper = UserMapper;
type Domain = UserDomainModel;
const defaultEntity: Entity = {
  // email: "",
  id: "",
  name: "guest",
  phone: "",
  // refresh_token: "",
  role: ERole.user
  // token: ""
};

const clientEvents = {
  get: "user", upload: "userUpdate"
}

const storeKey = StorageKeys.user;
export class UserRepositoryImpl extends UserRepository {
  constructor(
    protected client: IRemoteClientService<Entity>,
    protected mapper: Mapper
  ) {
    super(client, mapper, clientEvents,defaultEntity, storeKey);
  }
}
