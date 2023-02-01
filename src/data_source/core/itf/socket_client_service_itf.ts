import { BuiltinSocketEvent, RequestEvent } from "~/data_source/entities/request_entity";

export enum SocketMetaType {
  waitOnQueue,
  processDirectly
}

/** socket io interface*/
export abstract class ISocket {
  abstract connected: boolean;
  abstract disconnected: boolean;
  abstract id: string;
  abstract on(msg: RequestEvent | BuiltinSocketEvent, listener: (msg: string) => void): void;
  abstract emit(msg: RequestEvent | BuiltinSocketEvent, args: any): void;
}

/** 用來解析 socket 返回後的資料 */
export abstract class ISocketDataParser {
  /**
   * @param type 暫時用不到, 可能取消只有 data
   *  */
  abstract parse(data: any): {
    type: SocketMetaType;
    data: any;
  };
}

/** web socket client interface */
export abstract class ISocketClientService {
  abstract socket: ISocket;
  abstract server_response(callback: (msg: string) => void): void;
  abstract server_response_error(callback: (msg: string) => void): void;
  abstract send(
    event: string,
    payload: string,
    success: (msg: string) => void,
    error: (msg: string) => void
  ): void;
  /**
   * @param success 連結成功
   * @param failed  連結失敗
   * @param reSuccess 重連結成功
   * @param reFailed  重連結失敗
   * 
   * */
  abstract connect(opt: {
    success: (msg: string) => void;
    failed: (msg: string) => void;
    reSuccess: (msg: string) => void;
    reFailed: (msg: string) => void;
  }): void;
  abstract disconnect(cb: (msg: string) => void): void;
}

function main() {}
