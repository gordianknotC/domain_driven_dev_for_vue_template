import { AnnouncementEntity } from "~/data_source/entities/announcement_entity";
import { AnnouncementMapper } from "~/data_source/mappers/mappers_types";
import { BaseRepository } from "~/data_source/repositories/base_repository";

export const AnnouncementRepository = BaseRepository<AnnouncementMapper, AnnouncementEntity>;
export type TAnnouncementRepository = BaseRepository<AnnouncementMapper, AnnouncementEntity>;
