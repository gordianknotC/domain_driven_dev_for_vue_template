import axios, {
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse
} from "axios";
import { ClientServicePlugins } from "~/data_source/core/interfaces/client_service_plugin";
import { TDataResponse } from "~/data_source/entities/response_entity";
import { ISocketClientService, SocketMetaType } from "./socket_client_service";

export enum EClientStage {
  idle,
  fetching,
  authorizing,
  success,
  error
}

/** 可能取消 */
export abstract class RemoteClientMethods {
  abstract get(url: string, payload: Record<string, any>): AxiosPromise<any>;
  abstract post(url: string, payload: Record<string, any>): AxiosPromise<any>;
  abstract put(url: string, payload: Record<string, any>): AxiosPromise<any>;
  abstract del(url: string, payload: Record<string, any>): AxiosPromise<any>;
}

/** 可能取消 */
export abstract class RemoteClientService implements RemoteClientMethods {
  protected axios: AxiosInstance;
  protected stage: EClientStage = EClientStage.idle;
  constructor(
    requestPlugins: ClientServicePlugins<AxiosRequestConfig>[],
    responsePlugins: ClientServicePlugins<
      AxiosResponse,
      Promise<AxiosResponse>
    >[],
    config: AxiosRequestConfig
  ) {
    this.axios = axios.create(config);
    this.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

    const headingRequestPlugin = requestPlugins[0];
    const headingResponsePlugin = responsePlugins[0];
    headingRequestPlugin.init(this);
    headingResponsePlugin.init(this);

    headingRequestPlugin.addAll(requestPlugins.slice(1));
    headingResponsePlugin.addAll(responsePlugins.slice(1));

    const requestConfig = (config: AxiosRequestConfig) => {
      return headingRequestPlugin.process(config);
    };

    const requestError = (error: any) => {
      return headingRequestPlugin.processError(error);
    };

    const responseConfig = (val: AxiosResponse) => {
      return headingResponsePlugin.process(val);
    };

    const responseError = (error: any) => {
      return headingResponsePlugin.processError(error);
    };

    this.axios.interceptors.request.use(requestConfig, requestError);
    this.axios.interceptors.response.use(responseConfig, responseError);
  }
  abstract get(url: string, payload: Record<string, any>): AxiosPromise<any>;
  abstract post(url: string, payload: Record<string, any>): AxiosPromise<any>;
  abstract put(url: string, payload: Record<string, any>): AxiosPromise<any>;
  abstract del(url: string, payload: Record<string, any>): AxiosPromise<any>;
}



/**  Api client 方法 interface */
export abstract class IApiClientMethods<T extends {id: number}> {
  abstract get(url: string, payload: Record<string, any>): Promise<TDataResponse<T>>;
  abstract post(url: string, payload: Record<string, any>): Promise<TDataResponse<T>>;
  abstract put(url: string, payload: Record<string, any>): Promise<TDataResponse<T>>;
  abstract del(url: string, payload: Record<string, any>): Promise<TDataResponse<T>>;
}

/** 
 * api client 處理由 websocket 傳送出去的請求, 將請求暫存於 queue 以後，待收到 socket
 * 資料，再由 queue 裡的 promise resolve 返回值， resolve 後無論成功失敗，移除該筆 queue
 */
export abstract class IApiClientRequestQueue<T extends {id: number ,timestamp: number, timeout: number, promise: Promise<any>}>{
  abstract queue: T[];
  abstract add(elt: T): void;
  abstract addAll(elts: T[]): void;
  abstract remove(id: number): void;
  abstract removeAll(ids: number[]): void;
  abstract pop(): T;
}


/**  */
export abstract class IApiClientService implements IApiClientMethods<any>{
  abstract socket: ISocketClientService;
  get(url: string, payload: Record<string, any>): Promise<TDataResponse<any>> {
    throw new Error("Method not implemented.");
  }
  post(url: string, payload: Record<string, any>): Promise<TDataResponse<any>> {
    throw new Error("Method not implemented.");
  }
  put(url: string, payload: Record<string, any>): Promise<TDataResponse<any>> {
    throw new Error("Method not implemented.");
  }
  del(url: string, payload: Record<string, any>): Promise<TDataResponse<any>> {
    throw new Error("Method not implemented.");
  } 
}