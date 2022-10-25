import { Ident } from "~/data_source/core/interfaces/remote_client_service";
import { AnnouncementEntity } from "~/data_source/entities/announcement_entity";
import { AnnouncementMapper } from "~/data_source/mappers/mappers_types";
import { BaseRepository } from "~/data_source/repositories/base_repository";

type PayloadType = Ident & Partial<AnnouncementEntity>;
export const AnnouncementRepository = BaseRepository<AnnouncementMapper, AnnouncementEntity, PayloadType>;
export type TAnnouncementRepository = BaseRepository<AnnouncementMapper, AnnouncementEntity, PayloadType>;
