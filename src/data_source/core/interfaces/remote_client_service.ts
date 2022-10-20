import {
  TDataResponse,
  TErrorResponse
} from "~/data_source/entities/response_entity";
import { ISocketClientService, SocketMetaType } from "./socket_client_service";

export enum EClientStage {
  idle,
  fetching,
  authorizing,
  success,
  error
}

/**  Api client 方法 interface */
export abstract class IApiClientMethods<T extends { id: number }> {
  abstract get(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse>;
  abstract post(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse>;
  abstract put(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse>;
  abstract del(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse>;
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
    timeout?: number
  ): Promise<any>;
  abstract dequeue(id: number): boolean;
}

/**  api client service */
export abstract class IRemoteClientService<T extends { id: number }>
  implements IApiClientMethods<T>
{
  abstract socket: ISocketClientService;
  abstract queue: IQueue<any>;
  abstract stage: EClientStage;
  abstract get(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse>;
  abstract post(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse>;
  abstract put(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse>;
  abstract del(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse>;
}
