import { ERole, UserEntity } from "~/data_source/entities/user_entity";
import { TUserRepository, UserRepository } from "~/data_source/repositories/account/itf/user_repository_itf";
import { EErrorCode, TDataResponse, TErrorResponse, TSuccessResponse } from "~/data_source/entities/response_entity";
import { Model } from "~/data_source/mappers/base_mappers";
import { UserDomainModel } from "~/domain/account/user_domain_model";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { StorageKeys } from "~/data_source/core/impl/local_client_service_impl";
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

export class UserRepositoryImpl extends UserRepository {
  constructor(
    protected client: IRemoteClientService<Entity>,
    protected mapper: Mapper
  ) {
    super(client, mapper);
  }

  get localStorage(): RemovableRef<Entity> | null {
    return useLocalStorage(StorageKeys.user, defaultEntity);
  }

  async fetch(
    params: Entity | undefined
  ): Promise<TDataResponse<Model<Entity, any>> | TErrorResponse> {
    const event = "user";
    return super.remoteCall(params, event);
  }

  upload(val: Entity): Promise<TErrorResponse | TDataResponse<Model<Entity, any>> | TSuccessResponse> {
    const event = "userUpdate";
    return super.remoteUpdate(val);
  }

  get(): Model<Entity, Domain> | null {
    const mapper = facade.data.mappers.user;
    return new Model(mapper, this.localStorage!.value);
  }

  set(val: Entity): void {
    useLocalStorage(StorageKeys.user, defaultEntity).value = val;
  }  
}
