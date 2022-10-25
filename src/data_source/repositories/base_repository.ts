import { IRemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { Model, IModelMapper } from "~/data_source/mappers/base_mappers";
import { EErrorCode, TDataResponse, TErrorResponse, TSuccessResponse } from "~/data_source/entities/response_entity";
import { InvalidUsage, NotImplementedError, UnCaughtCondition } from "js_util_for_vue_project";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { facade } from "~/main";
import { LocalStorage } from "../core/interfaces/crypto_storage";

 
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
> extends LocalStorage<ENTITY> {
  protected constructor(
    protected client: IRemoteClientService<ENTITY>,
    protected mapper: MAPPER,
    protected clientEvents: {get: string, upload: string},
    protected defaultEntity: ENTITY,
    protected storeKey: string,
  ) {
    super(storeKey, defaultEntity);
  }
  get localStorage(): RemovableRef<ENTITY> | null {
    return useLocalStorage(this.storeKey, this.defaultEntity);
  }

  /** sync get and set from local storage */
  protected get(): Model<ENTITY, any> | null{
    return new Model(this.mapper, this.localStorage!.value);
  };

  /** sync get and set from local storage */
  protected set(val: ENTITY): void{
    this.localStorage!.value = val;
  };

  /** async fetch/upload from/onto remote cloud  
   *  使用者實作後，需乎叫 super.remoteCall
  */
  protected fetch(
    params?: PAYLOAD,
    event?: string,
  ): Promise<TDataResponse<Model<ENTITY, any>> | TErrorResponse>{
    return this.remoteCall(params, this.clientEvents.get);
  };

  /** async fetch/upload from/onto remote cloud  
   * 使用者實作後，需乎叫 super.remoteUpdate
  */
  protected upload(
    val: ENTITY
  ): Promise<TDataResponse<Model<ENTITY, any>> | TSuccessResponse | TErrorResponse>{
    return this.remoteUpdate(val, this.clientEvents.upload);
  }

  protected async remoteCall(
    params?: PAYLOAD,
    event?: string,
  ): Promise<TDataResponse<Model<ENTITY, any>> | TErrorResponse> { 
    try {
      const response = await this.client.get(this.clientEvents.get, params!);
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
