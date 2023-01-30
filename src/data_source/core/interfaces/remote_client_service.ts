import {
  TDataResponse,
  TErrorResponse,
  TResponse,
  TSuccessResponse
} from "~/data_source/entities/response_entity";
import { ISocketClientService, SocketMetaType } from "./socket_client_service";
import { Arr, ArrayDelegate, IQueue } from "@gdknot/frontend_common";
export type Ident = { id: number|string };
export type IdentData<T> = { id: number|string, data: T[] }

export enum EClientStage {
  idle,
  fetching,
  authorizing,
  success,
  error
}

/**  Api client 方法 interface */
export abstract class IApiClientMethods<T extends IdentData<any>> {
  abstract get(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse>;
  abstract post(
    event: string,
    payload: Record<string, any>
  ): Promise<TSuccessResponse | TDataResponse<T> | TErrorResponse>;
  abstract put(
    event: string,
    payload: Record<string, any>
  ): Promise<TSuccessResponse | TDataResponse<T> | TErrorResponse>;
  abstract del(
    event: string,
    payload: Record<string, any>
  ): Promise<TSuccessResponse | TErrorResponse>;
}
 
 

/**  api client service */
export abstract class IRemoteClientService<T extends IdentData<any>>
  implements IApiClientMethods<T>
{
  abstract socket: ISocketClientService;
  abstract queue: IQueue<any>;
  abstract stage: EClientStage;
  abstract isDataResponse(response: TResponse<any> | any): boolean;
  abstract isErrorResponse(response: TResponse<any> | any): boolean;
  abstract isSuccessResponse(response: TResponse<any> | any): boolean;
  
  abstract get(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse>;
  abstract post(
    event: string,
    payload: Record<string, any>
  ): Promise<TSuccessResponse | TDataResponse<T> | TErrorResponse>;
  abstract put(
    event: string,
    payload: Record<string, any>
  ): Promise<TSuccessResponse | TDataResponse<T> | TErrorResponse>;
  abstract del(
    event: string,
    payload: Record<string, any>
  ): Promise<TSuccessResponse | TErrorResponse>;
}
