import { UserEntity } from "~/data_source/entities/user_entity";
import { BaseModelMapper } from "@/data_source/mappers/mappers_base";
import { UserDomainModel } from "~/domain/account/user_domain_model";
import { AnnouncementDomainModel } from "~/domain/app/announcement_domain_model";
import { AnnouncementEntity } from "../entities/announcement_entity";

export type UserMapper = BaseModelMapper<UserEntity, UserDomainModel>;
export type AnnouncementMapper = BaseModelMapper<AnnouncementEntity, AnnouncementDomainModel>;
