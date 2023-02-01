import {
  Ident,
  IdentData,
  IRemoteClientService
} from "~/data_source/core/itf/remote_client_service_itf";
import { DataModel, IModelMapper } from "@/data_source/mappers/mappers_base";
import {
  EErrorCode,
  DataResponse,
  ErrorResponse,
  SuccessResponse
} from "~/data_source/entities/response_entity";
import {
  InvalidUsageError,
  is,
  NotImplementedError,
  UnCaughtCondition
} from "@gdknot/frontend_common";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { CryptoService, LocalStorage } from "@/data_source/core/itf/crypto_storage_itf";
import { assert } from "~/presentation/third_parties/utils/assert_exceptions";
import { CryptoServiceImpl } from "@/data_source/core/impl/encrypt_service_impl";
import { appLocalStorageMgr } from "@/data_source/core/impl/local_storage_manager_impl";
import { RequestEvent } from "@/data_source/entities/request_entity";


/**
 *  用於可與 local/remote 同步之 repository
 *  get - 同步local取值
 *  set - 同步local設值
 *  fetch / upload 非同步遠端取/設值
 * @typeParam ENTITY - Entity Model
 * @typeParam PAYLOAD - 用來表示 fetch 當前 entity model 所需的 payload
 * */
export abstract class BaseRepository<
  MAPPER extends IModelMapper<ENTITY, any>,
  ENTITY extends Ident,
  PAYLOAD extends Ident
> extends LocalStorage<ENTITY[]> {
  static storedKeys: WeakMap<any, RemovableRef<any[]> | null> = new WeakMap();
  private crypto?: CryptoService<ENTITY[]>;
  private _localStorage: RemovableRef<ENTITY[]> | null | undefined;
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
    BaseRepository.storedKeys.set(this, this.localStorage);
  }

  get localStorage(): RemovableRef<ENTITY[]> | null{
    this._localStorage ??= useLocalStorage(this.storeKey, 
      this.useCrypto 
      ? this.crypto!.encryptObj(this.defaultEntities as any) 
      : this.defaultEntities as any
    );
    return this._localStorage;
  }

  /** sync get and set from local storage */
  get(): DataModel<ENTITY, any> | null {
    try {
      const self = this;
      const entities = this.crypto
        ? this.crypto!.decrypt(this.localStorage!.value! as any as string, function onFailed(){
          console.error("failed to decrypt:", self.localStorage?.value);
        })!
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
      const entities = (response as DataResponse<DataModel<ENTITY, any>>).data
        .entity!;
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
  ): Promise<DataResponse<DataModel<ENTITY, any>> | ErrorResponse> {
    return this.remoteCall(params, this.clientEvents.get);
  }

  /** async fetch/upload from/onto remote cloud
   * 使用者實作後，需乎叫 super.remoteUpdate
   */
  upload(
    val: ENTITY
  ): Promise<
    DataResponse<DataModel<ENTITY, any>> | SuccessResponse | ErrorResponse
  > {
    return this.remoteUpdate(val, this.clientEvents.post);
  }

  protected async remoteCall(
    params?: PAYLOAD,
    event?: RequestEvent
  ): Promise<DataResponse<DataModel<ENTITY, any>> | ErrorResponse> {
    try {
      const response = await this.client.get(this.clientEvents.get, params!);
      const mapper = this.mapper;
      if (this.client.isDataResponse(response)) {
        const entities = (
          response as DataResponse<{ id: string; data: ENTITY[] }>
        ).data.data as ENTITY[];
        const model = new DataModel<ENTITY, any>(mapper, entities);
        this.localStorage!.value = model.entity;
        return {
          ...response,
          data: model
        };
      } else if (this.client.isErrorResponse(response)) {
        return response as ErrorResponse;
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
      } as ErrorResponse;
    }
  }

  protected async remoteUpdate(
    val: ENTITY,
    event?: RequestEvent
  ): Promise<
    DataResponse<DataModel<ENTITY, any>> | SuccessResponse | ErrorResponse
  > {
    const response = await this.remoteCall(val as any, event);
    if (this.client.isErrorResponse(response)) {
      return response as ErrorResponse;
    } else if (this.client.isSuccessResponse(response)) {
      return response as any as SuccessResponse;
    } else {
      return response as DataResponse<DataModel<ENTITY, any>>;
    }
  }
}

/**
 *  用於 不需與 local 同步之 repository
 *  fetch / upload 非同步遠端取/設值
 * @typeParam ENTITY - Entity Model
 * @typeParam PAYLOAD - 用來表示 fetch 當前 entity model 所需的 payload
 * */
export abstract class BaseRemoteRepository<
  ENTITY extends Ident,
  PAYLOAD extends Ident,
> extends BaseRepository<IModelMapper<ENTITY, any>, ENTITY, PAYLOAD> {
  get localStorage(): RemovableRef<ENTITY[]> | null {
    throw new InvalidUsageError("local storage");
  }
  get(): DataModel<ENTITY, any> | null {
    throw new InvalidUsageError("get data model from remote repository");
  }
  set(val: ENTITY[]): void {
    throw new InvalidUsageError("set entity");
  }
}
