import { RemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { Model, IModelMapper } from "~/data_source/mappers/base_mappers";
import { TDataResponse } from "~/data_source/entities/response_entity";
import { NotImplementedError } from "js_util_for_vue_project";
import { useLocalStorage, RemovableRef } from "@vueuse/core";

/**
 *  用於可與 local 同步之 repository
 *  get - 同步local取值
 *  set - 同步local設值
 *  fetch / upload 非同步遠端取/設值
 * */
export abstract class BaseRepository<
  M extends IModelMapper<ENTITY, any>,
  ENTITY = any,
  PAYLOAD = any
> {
  protected constructor(
    protected client: RemoteClientService,
    protected mapper: M
  ) {}
  abstract get localStorage(): RemovableRef<ENTITY> | null;

  /** sync get and set from local storage if available*/
  abstract get(): Model<ENTITY, any> | null;
  abstract set(val: ENTITY): void;

  /** async fetch and upload from remote cloud if available */
  abstract fetch(
    params?: PAYLOAD
  ): Promise<TDataResponse<Model<ENTITY, any>> | null>;
  abstract upload(val: ENTITY): Promise<{ success: boolean } | null>;
}

/**
 *  用於 不需與 local 同步之 repository
 *  fetch / upload 非同步遠端取/設值
 * */
export abstract class BaseRemoteRepository<E, PAYLOAD> extends BaseRepository<
  IModelMapper<E, any>,
  E,
  PAYLOAD
> {
  abstract fetch(
    params?: PAYLOAD
  ): Promise<TDataResponse<Model<E, any>> | null>;
  abstract upload(val: E): Promise<{ success: boolean } | null>;
  get localStorage(): RemovableRef<E> | null {
    throw new NotImplementedError();
  }
  get(): Model<E, any> | null {
    throw new NotImplementedError();
  }
  set(val: E): void {
    throw new NotImplementedError();
  }
}
