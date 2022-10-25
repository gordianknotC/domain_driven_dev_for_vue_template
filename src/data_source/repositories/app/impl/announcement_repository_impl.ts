import { EErrorCode, TDataResponse, TErrorResponse, TSuccessResponse } from "~/data_source/entities/response_entity";
import { Model } from "~/data_source/mappers/base_mappers";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { StorageKeys } from "~/data_source/core/impl/crypto_storage_impl";
import { IRemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { AnnouncementMapper, UserMapper } from "~/data_source/mappers/mappers_types";
import { facade } from "~/main";
import { AnnouncementEntity } from "~/data_source/entities/announcement_entity";
import { AnnouncementRepository } from "../itf/announcement_repository_itf";
import { AnnouncementDomainModel } from "~/domain/app/announcement_domain_model";
import { NotImplementedError } from "js_util_for_vue_project";

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

const clientEvents = {
    get: "announcement", upload: "addAnnouncement"
}
  
const storeKey = StorageKeys.user;

export class AnnouncementRepositoryImpl extends AnnouncementRepository {
    constructor(
        protected client: IRemoteClientService<Entity>,
        protected mapper: Mapper
    ) {
        super(client, mapper, clientEvents,defaultEntity, storeKey);
    }
}
