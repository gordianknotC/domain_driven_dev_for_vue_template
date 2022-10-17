import { AxiosInstance, AxiosPromise } from "axios";
import { io, Socket } from "socket.io-client";
import { TDataResponse } from "~/data_source/entities/response_entity";
import { EClientStage, RemoteClientMethods, RemoteClientService } from "./remote_client_service";

export enum SocketMetaType {
  waitOnQueue,
  processDirectly
}

/** socket io interface*/
export abstract class ISocket {
  abstract on(msg: string, listener: (msg: string) => void): void;
  abstract emit(msg: string, args: any): void;
}


/** 用來解析 socket 返回後的資料 */
export abstract class ISocketDataParser{
  /** 
   * @param type 暫時用不到, 可能取消只有 data
   *  */
  abstract parse(data: any): {
    type: SocketMetaType,
    data: any
  };
}


/** web socket client interface */
export abstract class ISocketClientService {
  abstract server_response(callback: (msg: string) => void): void;
  abstract server_response_error(callback: (msg: string) => void): void;
  abstract connect(): void;
  abstract disconnect(): void;
}

