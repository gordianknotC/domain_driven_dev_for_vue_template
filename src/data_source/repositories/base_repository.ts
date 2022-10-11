import { RemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { ModelMapper } from "~/data_source/mappers/base_mappers";

// todo: incomplete:

export abstract class BaseRepository<R, M, P = R> {
  protected constructor(protected client: RemoteClientService) {}
  abstract mapper: M;
  /** sync get from local storage if available*/
  abstract get(): R | null;
  abstract set(val: R): void;
  abstract fetch(params?: P): Promise<R>;
  abstract upload(val: R): Promise<{ success: boolean }>;
}

// export abstract class RemoteRepository<E, P, D> {
//   abstract client: RemoteClientService;
//   abstract mapper: ModelMapper<E, D>;
//   abstract get(params?: P): E;
//   abstract set(val: E): void;
//   abstract fetch(params?: P): Promise<E>;
//   abstract upload(val: Partial<E>): Promise<{ success: boolean }>;
// }

export abstract class LocalRepository {}
