import { ERole, UserEntity } from "~/data_source/entities/user_entity";
import { UserRepository } from "~/data_source/repositories/account/itf/user_repository_itf";
import { UserDomainModel } from "~/domain/account/user_domain_model";
import { StorageKeys } from "~/data_source/core/impl/crypto_storage_impl";
import { IRemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { UserMapper } from "~/data_source/mappers/mappers_types";
import { RequestEvent } from "~/data_source/entities/request_entity";

type Entity = UserEntity;
type Mapper = UserMapper;
type Domain = UserDomainModel;
const defaultEntity: Entity[] = [
  {
    // email: "",
    id: "",
    name: "guest",
    phone: "",
    // refresh_token: "",
    role: ERole.user
    // token: ""
  }
];

const clientEvents = {
  get: RequestEvent.getUser,
  post: RequestEvent.updateUser
};

const storeKey = StorageKeys.user;
export class UserRepositoryImpl extends UserRepository {
  constructor(
    protected client: IRemoteClientService<{ id: string; data: Entity[] }>,
    protected mapper: Mapper
  ) {
    super(client, mapper, clientEvents, defaultEntity, storeKey);
  }
}
