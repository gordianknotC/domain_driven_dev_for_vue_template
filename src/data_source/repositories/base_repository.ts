import {
  Ident,
  IdentData,
  IRemoteClientService
} from "~/data_source/core/interfaces/remote_client_service";
import { DataModel, IModelMapper } from "~/data_source/mappers/base_mappers";
import {
  EErrorCode,
  TDataResponse,
  TErrorResponse,
  TSuccessResponse
} from "~/data_source/entities/response_entity";
import {
  InvalidUsage,
  is,
  NotImplementedError,
  UnCaughtCondition
} from "js_util_for_vue_project";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { LocalStorage } from "../core/interfaces/crypto_storage";
import { assert } from "~/presentation/third_parties/utils/assert_exceptions";
import { CryptoService } from "../core/interfaces/encrypt_service";
import { CryptoServiceImpl } from "../core/impl/encrypt_service_impl";
import { appLocalStorageMgr } from "../core/impl/local_storage_manager_impl";
import { RequestEvent } from "../entities/request_entity";

const localStorageInUsed = appLocalStorageMgr();

/**
 *  用於可與 local/remote 同步之 repository
 *  get - 同步local取值
 *  set - 同步local設值
 *  fetch / upload 非同步遠端取/設值
 * */
export abstract class BaseRepository<
  MAPPER extends IModelMapper<ENTITY, any>,
  ENTITY extends Ident,
  PAYLOAD extends Ident
> extends LocalStorage<ENTITY[]> {
  static get localStorageInUsed(): typeof localStorageInUsed{
    return localStorageInUsed;
  }
  private crypto?: CryptoService<ENTITY[]>;
  protected constructor(
    protected client: IRemoteClientService<IdentData<ENTITY>>,
    protected mapper: MAPPER,
    protected clientEvents: { get: RequestEvent; post: RequestEvent },
    protected defaultEntities: ENTITY[],
    protected storeKey: string,
    private useCrypto: boolean = false
  ) {
    super(storeKey, defaultEntities);
    assert(()=> client != undefined, "remote client not initialized");
    if (useCrypto) {
      this.crypto = new CryptoServiceImpl(storeKey);
    }
  }

  get localStorage(): RemovableRef<ENTITY[]> | null {
    if (localStorageInUsed.has(this))
      return localStorageInUsed.get(this) as any;

    const defaultEntities = this.crypto
      ? this.crypto!.encryptObj(this.defaultEntities) as any
      : this.defaultEntities;

    localStorageInUsed.set(
      this,
      useLocalStorage(this.storeKey, defaultEntities),
      ()=>{
        if (localStorageInUsed.get(this) != undefined){
          localStorageInUsed.get(this)!.value = defaultEntities;
        }
      }
    );
    return localStorageInUsed.get(this) as any;
  }

  /** sync get and set from local storage */
  get(): DataModel<ENTITY, any> | null {
    try {
      const entities = this.crypto
        ? this.crypto!.decrypt(this.localStorage!.value! as any as string)!
        : (this.localStorage!.value! as ENTITY[]);
      assert(
        () => Array.isArray(entities),
        `invalid entities type, expect array got: ${typeof entities}`
      );
      assert(
        () => Array.isArray(this.defaultEntities),
        `invalid defaultEntities type, expect array got: ${typeof this
          .defaultEntities}`
      );
      console.log("get announcement, entities:", entities);
      return new DataModel(this.mapper, entities);
    } catch (e) {
      console.error(e);
      this.localStorage!.value = this.crypto
        ? (this.crypto.encryptObj(this.defaultEntities) as any)
        : this.defaultEntities;
      return new DataModel(this.mapper, this.defaultEntities);
    }
  }

  /** sync get and set from local storage */
  set(val: ENTITY[]): void {
    try {
      this.localStorage!.value = this.crypto
        ? (this.crypto!.encrypt(JSON.stringify(val)) as any)
        : val;
    } catch (e) {
      this.localStorage!.value = this.crypto
        ? (this.crypto!.encrypt(JSON.stringify(this.defaultEntities)) as any)
        : this.defaultEntities;
      console.error(e);
    }
  }

  async fetchAndUpdate(params: PAYLOAD, event: RequestEvent) {
    const response = await this.fetch(params, event);
    if (this.client.isDataResponse(response)) {
      const entities = (response as TDataResponse<DataModel<ENTITY, any>>).data
        .entities!;
      this.localStorage!.value = entities;
    }
    return response;
  }

  /** async fetch/upload from/onto remote cloud
   *  使用者實作後，需乎叫 super.remoteCall
   */
  fetch(
    params?: PAYLOAD,
    event?: RequestEvent
  ): Promise<TDataResponse<DataModel<ENTITY, any>> | TErrorResponse> {
    return this.remoteCall(params, this.clientEvents.get);
  }

  /** async fetch/upload from/onto remote cloud
   * 使用者實作後，需乎叫 super.remoteUpdate
   */
  upload(
    val: ENTITY
  ): Promise<
    TDataResponse<DataModel<ENTITY, any>> | TSuccessResponse | TErrorResponse
  > {
    return this.remoteUpdate(val, this.clientEvents.post);
  }

  protected async remoteCall(
    params?: PAYLOAD,
    event?: RequestEvent
  ): Promise<TDataResponse<DataModel<ENTITY, any>> | TErrorResponse> {
    try {
      const response = await this.client.get(this.clientEvents.get, params!);
      const mapper = this.mapper;
      if (this.client.isDataResponse(response)) {
        const entities = (
          response as TDataResponse<{ id: string; data: ENTITY[] }>
        ).data.data as ENTITY[];
        const model = new DataModel<ENTITY, any>(mapper, entities);
        this.localStorage!.value = model.entities;
        return {
          ...response,
          data: model
        };
      } else if (this.client.isErrorResponse(response)) {
        return response as TErrorResponse;
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
        message: "internal error"
      } as TErrorResponse;
    }
  }

  protected async remoteUpdate(
    val: ENTITY,
    event?: RequestEvent
  ): Promise<
    TDataResponse<DataModel<ENTITY, any>> | TSuccessResponse | TErrorResponse
  > {
    const response = await this.remoteCall(val as any, event);
    if (this.client.isErrorResponse(response)) {
      return response as TErrorResponse;
    } else if (this.client.isSuccessResponse(response)) {
      return response as any as TSuccessResponse;
    } else {
      return response as TDataResponse<DataModel<ENTITY, any>>;
    }
  }
}

/**
 *  用於 不需與 local 同步之 repository
 *  fetch / upload 非同步遠端取/設值
 * */
export abstract class BaseRemoteRepository<
  ENTITY extends Ident,
  PAYLOAD extends Ident,
> extends BaseRepository<IModelMapper<ENTITY, any>, ENTITY, PAYLOAD> {
  get localStorage(): RemovableRef<ENTITY[]> | null {
    throw new InvalidUsage();
  }
  get(): DataModel<ENTITY, any> | null {
    throw new InvalidUsage();
  }
  set(val: ENTITY[]): void {
    throw new InvalidUsage();
  }
}
