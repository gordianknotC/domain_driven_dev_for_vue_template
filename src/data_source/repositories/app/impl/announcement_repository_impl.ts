import { EErrorCode, TDataResponse, TErrorResponse, TSuccessResponse } from "~/data_source/entities/response_entity";
import { Model } from "~/data_source/mappers/base_mappers";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { StorageKeys } from "~/data_source/core/impl/local_client_service_impl";
import { IRemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { AnnouncementMapper, UserMapper } from "~/data_source/mappers/mappers_types";
import { facade } from "~/main";
import { AnnouncementEntity } from "~/data_source/entities/announcement_entity";
import { AnnouncementRepository } from "../itf/announcement_repository_itf";
import { AnnouncementDomainModel } from "~/domain/app/announcement_domain_model";

type Entity = AnnouncementEntity;
type Mapper = AnnouncementMapper;
type Domain = AnnouncementDomainModel;
const defaultEntity: Entity = {
    category: 0,
    content: "",
    create_datetime: "",
    id: 0,
    is_open: false,
    publish_datetime: "",
    title: "",
    update_datetime: ""
};

export class AnnouncementRepositoryImpl extends AnnouncementRepository {
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
