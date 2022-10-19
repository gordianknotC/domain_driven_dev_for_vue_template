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
export abstract class IApiClientMethods<T extends { id: number }> {
  abstract get(
    url: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T>>;
  abstract post(
    url: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T>>;
  abstract put(
    url: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T>>;
  abstract del(
    url: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T>>;
}

export type QueueItem = {
  id: number;
  promise: () => Promise<any>;
  resolve: any;
  reject: any;
  timestamp: number;
  timeout: NodeJS.Timeout;
};

/**
 * api client 處理由 websocket 傳送出去的請求, 將請求暫存於 queue 以後，待收到 socket
 * 資料，再由 queue 裡的 promise resolve 返回值， resolve 後無論成功失敗，移除該筆 queue
 */
export abstract class IQueue<T extends QueueItem> {
  abstract queue: T[];
  abstract enqueue(
    id: number,
    promise: () => Promise<any>,
    timeout: number
  ): Promise<any>;
  abstract dequeue(id: number): boolean;
}

/**  api client service */
export abstract class IApiClientService<T extends { id: number }>
  implements IApiClientMethods<T>
{
  abstract socket: ISocketClientService;
  abstract queue: IQueue<any>;
  abstract stage: EClientStage;
  abstract get(
    url: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T>>;
  abstract post(
    url: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T>>;
  abstract put(
    url: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T>>;
  abstract del(
    url: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T>>;
}
