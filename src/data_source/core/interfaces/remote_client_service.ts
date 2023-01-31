import {
  DataResponse,
  ErrorResponse,
  Response,
  SuccessResponse
} from "~/data_source/entities/response_entity";
import { ISocketClientService, SocketMetaType } from "./socket_client_service";
import { Arr, ArrayDelegate, IQueue } from "@gdknot/frontend_common";
import { EClientStage, IBaseClient } from "@gdknot/request_client/dist";
export type Ident = { id: number|string };
export type IdentData<T> = { id: number|string, data: T[] }


/**  Api client 方法 interface */
export abstract class IApiClientMethods<T extends IdentData<any>> {
  abstract get(
    event: string,
    payload: Record<string, any>
  ): Promise<DataResponse<T> | ErrorResponse>;
  abstract post(
    event: string,
    payload: Record<string, any>
  ): Promise<SuccessResponse | DataResponse<T> | ErrorResponse>;
  abstract put(
    event: string,
    payload: Record<string, any>
  ): Promise<SuccessResponse | DataResponse<T> | ErrorResponse>;
  abstract del(
    event: string,
    payload: Record<string, any>
  ): Promise<SuccessResponse | ErrorResponse>;
}
 
 

/**  api client service */
export abstract class IRemoteClientService<T extends IdentData<any>>
  implements IApiClientMethods<T>
{
  abstract socket: ISocketClientService;
  //abstract client: IBaseClient<DataResponse<T> , ErrorResponse, SuccessResponse>;
  abstract stage: EClientStage;
  abstract isDataResponse(response: Response<any> | any): boolean;
  abstract isErrorResponse(response: Response<any> | any): boolean;
  abstract isSuccessResponse(response: Response<any> | any): boolean;
  
  abstract get(
    url: string,
    payload: Record<string, any>
  ): Promise<DataResponse<T> | ErrorResponse>;
  abstract post(
    url: string,
    payload: Record<string, any>
  ): Promise<SuccessResponse | DataResponse<T> | ErrorResponse>;
  abstract put(
    url: string,
    payload: Record<string, any>
  ): Promise<SuccessResponse | DataResponse<T> | ErrorResponse>;
  abstract del(
    url: string,
    payload: Record<string, any>
  ): Promise<SuccessResponse | ErrorResponse>;
}
