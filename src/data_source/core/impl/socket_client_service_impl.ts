import { UnCaughtCondition } from "js_util_for_vue_project";
import { io, Socket } from "socket.io-client";
import { createBlock } from "vue";
import {
  ISocket,
  ISocketClientService
} from "../interfaces/socket_client_service";

export enum SocketEvent {
  connect = "connect",
  disconnect = "disconnect",
  socket_response = "socket_response",
  socket_error = "socket_error",
  send_message = "send_message"
}

/** 用於 UI 測試 */
class PseudoSocket implements ISocket {
  constructor(
    public connected: boolean = false,
    public disconnected: boolean = true,
    public id: string = "pseudo"
  ) {}
  emit(msg: string, args: any): void {
    console.log(`message send from socket client: ${msg} - ${args}`);
  }

  on(msg: SocketEvent, listener: (msg: string) => void): void {
    listener(`[SOCKET] ${msg}`);
    if (msg == SocketEvent.socket_response) {
      let counter = 0;
      setTimeout(() => {
        counter++;
        listener(`message response from pseudo socket server: ${counter}`);
      }, 1000);
    }
  }
}

export class SocketClientServiceImpl implements ISocketClientService {
  socket: ISocket;
  private token: string;
  constructor(token: string) {
    if (process.env.VITE_APP_PSEUDO_SOCKET == "true") {
      this.socket = new PseudoSocket();
    } else {
      this.socket = io(process.env.VITE_APP_API_HOST!);
    }
    this.token = token;
  }

  /** NOTE: 需要問一下是一個事件一個 response 還是 on data 持續收，寫法不同 */
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
    this.socket.on("server_response", function (msg) {
      callback(msg);
    });
  }

  /**  不一定叫 server_response */
  server_response_error(callback: (msg: string) => void) {
    this.socket.on("socket_error", function (msg) {
      console.log(msg);
      callback(msg);
    });
  }

  disconnect(cb: (msg: string) => void) {
    this.socket.on("disconnect", function (msg) {
      cb(msg);
    });
    this.socket.emit("disconnect", { token: this.token });
  }

  private connectedCb?: (msg: string) => void;
  private connectErrCb?: (msg: string) => void;
  private reconnectedCb?: (msg: string) => void;
  private reconnectErrCb?: (msg: string) => void;

  connect(opt: {
    success: (msg: string) => {};
    failed: (msg: string) => {};
    resuccess: (msg: string) => {};
    refailed: (msg: string) => {};
  }): void {
    if (this.socket.connected) {
      this.reconnectedCb ??= opt.resuccess;
      this.reconnectErrCb ??= opt.refailed;
      this.socket.on("reconnect", function (msg) {
        opt.resuccess(msg);
      });
      this.socket.on("reconnect_error", function (msg) {
        opt.refailed(msg);
      });
    } else if (this.socket.disconnected) {
      this.connectedCb ??= opt.success;
      this.connectErrCb ??= opt.failed;
      this.socket.on("connect", function (msg) {
        opt.success(msg);
      });
      this.socket.on("connect_error", function (msg) {
        opt.failed(msg);
      });
    } else {
      throw new UnCaughtCondition();
    }

    this.socket.emit("connect", { token: this.token });
  }

  sendMessage(msg: string): void {
    this.socket.emit("send_message", { msg });
  }
}
