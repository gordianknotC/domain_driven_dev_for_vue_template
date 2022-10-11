import { ERole, UserEntity } from "~/data_source/entities/user_entity";
import { UserRepository } from "~/data_source/repositories/account/interfaces/user_repository";
import { TDataResponse } from "~/data_source/entities/response_entity";
import { Model } from "~/data_source/mappers/base_mappers";
import { UserDomainModel } from "~/domain/account/user_domain_model";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { StorageKeys } from "~/data_source/core/impl/local_client_service_impl";
import { facade } from "~/domain/app/domain_app_index";
import { RemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { UserMapper } from "~/data_source/mappers/mappers_types";

const defaultUser: UserEntity = {
  // email: "",
  id: "",
  name: "guest",
  phone: "",
  // refresh_token: "",
  role: ERole.merchant,
  // token: ""
}

export class UserRepositoryImpl extends UserRepository {
  constructor(
    protected client: RemoteClientService,
    protected mapper: UserMapper
  ) {
    super(client, mapper);
  }

  get localStorage(): RemovableRef<UserEntity> | null {
    return useLocalStorage(StorageKeys.user, defaultUser);
  }

  async fetch(params: UserEntity | undefined): Promise<TDataResponse<Model<UserEntity, any>> | null> {
    try{
      const response = await this.client.get("user", params!);
      const mapper = facade.data.mappers.user;
      const entity = response.data.data as UserEntity;
      response.data.data = new Model(mapper, entity);
      return response.data as TDataResponse<Model<UserEntity, any>>;
    }catch(e){
      throw e;
    }
  }

  get(): Model<UserEntity, UserDomainModel> | null {
    const mapper = facade.data.mappers.user;
    return new Model(mapper, this.localStorage!.value);
  }

  set(val: UserEntity): void {
    useLocalStorage(StorageKeys.user, defaultUser).value = val;
  }

  upload(val: UserEntity): Promise<{ success: boolean }> {
    return Promise.resolve({ success: false });
  }
}
