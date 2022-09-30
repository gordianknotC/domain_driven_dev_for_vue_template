import { UserEntity } from "~/data_source/entities/user_entity";
import { RemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import {ModelMapper} from "~/data_source/mappers/general_mapper";

export abstract class RemoteRepository<E, P, D> {
  abstract client: RemoteClientService;
  abstract mapper: ModelMapper<E, D>;
  abstract get(params?: P): E;
  abstract set(val: E): void;
  abstract fetch(params?: P): Promise<E>;
  abstract upload(val: Partial<E>): Promise<{ success: boolean }>;
}

export abstract class LocalRepository {
  abstract client: RemoteClientService;
}

function main() {}
