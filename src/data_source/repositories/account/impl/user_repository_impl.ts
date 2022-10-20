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

const defaultUser: UserEntity = {
  // email: "",
  id: "",
  name: "guest",
  phone: "",
  // refresh_token: "",
  role: ERole.merchant
  // token: ""
};

export class UserRepositoryImpl extends UserRepository {
  constructor(
    protected client: IRemoteClientService<UserEntity>,
    protected mapper: UserMapper
  ) {
    super(client, mapper);
  }

  get localStorage(): RemovableRef<UserEntity> | null {
    return useLocalStorage(StorageKeys.user, defaultUser);
  }

  async fetch(
    params: UserEntity | undefined
  ): Promise<TDataResponse<Model<UserEntity, any>> | TErrorResponse> {
    const event = "user";
    return super.remoteCall(params, event);
  }

  upload(val: UserEntity): Promise<TErrorResponse | TDataResponse<Model<UserEntity, any>> | TSuccessResponse> {
    const event = "userUpdate";
    return super.remoteUpdate(val);
  }

  get(): Model<UserEntity, UserDomainModel> | null {
    const mapper = facade.data.mappers.user;
    return new Model(mapper, this.localStorage!.value);
  }

  set(val: UserEntity): void {
    useLocalStorage(StorageKeys.user, defaultUser).value = val;
  }  
}
