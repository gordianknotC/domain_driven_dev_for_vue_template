import { StorageKeys } from "~/data_source/core/impl/crypto_storage_impl";
import {
  IdentData,
  IRemoteClientService
} from "~/data_source/core/interfaces/remote_client_service";
import {
  AnnouncementMapper,
  UserMapper
} from "~/data_source/mappers/mappers_types";
import { AnnouncementEntity } from "~/data_source/entities/announcement_entity";
import { AnnouncementRepository } from "../itf/announcement_repository_itf";
import { AnnouncementDomainModel } from "~/domain/app/announcement_domain_model";
import { RequestEvent } from "~/data_source/entities/request_entity";

type Entity = AnnouncementEntity;
type Mapper = AnnouncementMapper;
type Domain = AnnouncementDomainModel;
const defaultEntity: Entity[] = [
  {
    category: 0,
    content: "Welcome Jinhao",
    create_datetime: "2022-02-01",
    id: 0,
    is_open: false,
    publish_datetime: "2022-02-01",
    title: "Welcome JinHao",
    update_datetime: "2022-02-01"
  }
];

const clientEvents = {
  get: RequestEvent.getAnnouncement,
  post: RequestEvent.addAnnouncement
};

const storeKey = StorageKeys.user;

export class AnnouncementRepositoryImpl extends AnnouncementRepository {
  constructor(
    protected client: IRemoteClientService<IdentData<Entity>>,
    protected mapper: Mapper
  ) {
    super(client, mapper, clientEvents, defaultEntity, storeKey);
  }
}
