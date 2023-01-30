import { UnCaughtCondition } from "@gdknot/frontend_common";
import { io, Socket } from "socket.io-client";
import { createBlock } from "vue";
import { BuiltinSocketEvent, RequestEvent } from "~/data_source/entities/request_entity";
import {
  ISocket,
  ISocketClientService
} from "../interfaces/socket_client_service";

// todo: untested: inCompleted:


export class SocketClientServiceImpl implements ISocketClientService {
  socket: ISocket;
  private token: string;
  constructor(token: string) {
    if (process.env.VITE_APP_PSEUDO_SOCKET == "true") {
    // if (import.meta.env.VITE_APP_PSEUDO_SOCKET == "true") {
      this.socket = new PseudoSocket();
    } else {
      this.socket = io(process.env.VITE_APP_API_HOST!);
      // this.socket = io(import.meta.env.VITE_APP_API_HOST!);
    }
    this.token = token;
  }

  /** NOTE: 需要問一下是一個事件一個 response 還是 on data 持續收，寫法不同 */
  // TODO: unit test 映像中 on instance 會重覆
  send(
    event: string,
    payload: string,
    success: (msg: string) => void,
    error: (msg: string) => void
  ): any {
    //this.socket.on(event);    
  }

  /**  不一定叫 server_response */
  server_response(callback: (msg: string) => void) {
    this.socket.on(BuiltinSocketEvent.server_response, function (msg) {
      callback(msg);
    });
  }

  /**  不一定叫 server_response */
  server_response_error(callback: (msg: string) => void) {
    this.socket.on(BuiltinSocketEvent.socket_error, function (msg) {
      console.log(msg);
      callback(msg);
    });
  }

  // FIXME: 以下 connect / disconnect 重看一之
  disconnect(cb: (msg: string) => void) {
    this.socket.on(BuiltinSocketEvent.disconnect, function (msg) {
      cb(msg);
    });
    this.socket.emit(BuiltinSocketEvent.disconnect, { token: this.token });
  }

  private connectedCb?: (msg: string) => void;
  private connectErrCb?: (msg: string) => void;
  private reconnectedCb?: (msg: string) => void;
  private reconnectErrCb?: (msg: string) => void;

  connect(opt: {
    success: (msg: string) => {};
    failed: (msg: string) => {};
    reSuccess: (msg: string) => {};
    reFailed: (msg: string) => {};
  }): void {
    if (this.socket.connected) {
      this.reconnectedCb ??= opt.reSuccess;
      this.reconnectErrCb ??= opt.reFailed;
      this.socket.on(BuiltinSocketEvent.reconnect, function (msg) {
        opt.reSuccess(msg);
      });
      this.socket.on(BuiltinSocketEvent.reconnect_error, function (msg) {
        opt.reFailed(msg);
      });
    } else if (this.socket.disconnected) {
      this.connectedCb ??= opt.success;
      this.connectErrCb ??= opt.failed;
      this.socket.on(BuiltinSocketEvent.connect, function (msg) {
        opt.success(msg);
      });
      this.socket.on(BuiltinSocketEvent.connect_error, function (msg) {
        opt.failed(msg);
      });
    } else {
      throw new UnCaughtCondition();
    }

    this.socket.emit(BuiltinSocketEvent.connect, { token: this.token });
  }

  // sendMessage(msg: string): void {
  //   this.socket.emit(BuiltinSocketEvent.send_message, { msg });
  // }
}



/** 用於 UI 測試 */
class PseudoSocket implements ISocket {
  constructor(
    public connected: boolean = false,
    public disconnected: boolean = true,
    public id: string = "pseudo"
  ) {}
  emit(msg: RequestEvent | BuiltinSocketEvent, args: any): void {
    console.log(`message send from socket client: ${msg} - ${args}`);
  }

  on(msg: RequestEvent | BuiltinSocketEvent, listener: (msg: string) => void): void {
    listener(`[SOCKET] ${msg}`);
    if (msg == BuiltinSocketEvent.socket_response) {
      let counter = 0;
      setTimeout(() => {
        counter++;
        listener(`message response from pseudo socket server: ${counter}`);
      }, 1000);
    }
  }
}
