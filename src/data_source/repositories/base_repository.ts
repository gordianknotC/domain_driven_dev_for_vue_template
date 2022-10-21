import { IRemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { Model, IModelMapper } from "~/data_source/mappers/base_mappers";
import { EErrorCode, TDataResponse, TErrorResponse, TSuccessResponse } from "~/data_source/entities/response_entity";
import { InvalidUsage, NotImplementedError, UnCaughtCondition } from "js_util_for_vue_project";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { facade } from "~/main";
import { ILocalStorage } from "../core/interfaces/local_client_service";

 
/**
 *  用於可與 local/remote 同步之 repository
 *  get - 同步local取值
 *  set - 同步local設值
 *  fetch / upload 非同步遠端取/設值
 * */
export abstract class BaseRepository<
  MAPPER extends IModelMapper<ENTITY, any>,
  ENTITY extends {id: number|string},
  PAYLOAD = any
> implements ILocalStorage<ENTITY> {
  protected constructor(
    protected client: IRemoteClientService<ENTITY>,
    protected mapper: MAPPER
  ) {}
  abstract get localStorage(): RemovableRef<ENTITY> | null;

  /** sync get and set from local storage */
  abstract get(): Model<ENTITY, any> | null;

  /** sync get and set from local storage */
  abstract set(val: ENTITY): void;

  /** async fetch/upload from/onto remote cloud  
   *  使用者實作後，需乎叫 super.remoteCall
  */
  abstract fetch(
    params?: PAYLOAD,
    event?: string,
  ): Promise<TDataResponse<Model<ENTITY, any>> | TErrorResponse>;

  /** async fetch/upload from/onto remote cloud  
   * 使用者實作後，需乎叫 super.remoteUpdate
  */
  abstract upload(
    val: ENTITY
  ): Promise<TDataResponse<Model<ENTITY, any>> | TSuccessResponse | TErrorResponse>;

  protected async remoteCall(
    params?: PAYLOAD,
    event?: string,
  ): Promise<TDataResponse<Model<ENTITY, any>> | TErrorResponse> { 
    try {
      const response = await this.client.get("user", params!);
      const mapper = this.mapper;
      if (this.client.isDataResponse(response)) {
        const entity = (response as TDataResponse<ENTITY>).data;
        const model = new Model(mapper, entity);
        this.localStorage!.value = model.entity;
        return {
          ...response,
          data: model
        };
      } else if (this.client.isErrorResponse(response)) {
        return (response as TErrorResponse);
      } else if (this.client.isSuccessResponse(response)) {
        return response as any;
      } else { 
        throw new UnCaughtCondition();
      }
    } catch (e) {
      console.error(e);
      return {
        error_code: EErrorCode.internalError,
        error_key: "",
        error_msg: (e ?? "").toString(),
        message: "internal error",
      } as TErrorResponse;
    }
  };

  protected async remoteUpdate(val: ENTITY, event?: string): Promise<TDataResponse<Model<ENTITY, any>> | TSuccessResponse | TErrorResponse> { 
    const response = await this.remoteCall(val as any, event);
    if (this.client.isErrorResponse(response)) {
      return response as TErrorResponse;
    } else if (this.client.isSuccessResponse(response)) {
      return response as any as TSuccessResponse;
    } else { 
      return response as TDataResponse<Model<ENTITY, any>>;
    }
  }
}

/**
 *  用於 不需與 local 同步之 repository
 *  fetch / upload 非同步遠端取/設值
 * */
export abstract class BaseRemoteRepository<
  ENTITY extends { id: number | string },
  PAYLOAD
> extends BaseRepository<
  IModelMapper<ENTITY, any>,
  ENTITY,
  PAYLOAD
> {
  get localStorage(): RemovableRef<ENTITY> | null {
    throw new InvalidUsage();
  }
  get(): Model<ENTITY, any> | null {
    throw new InvalidUsage();
  }
  set(val: ENTITY): void {
    throw new InvalidUsage();
  }
}

