import { io, Socket } from "socket.io-client";
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

class PseudoSocket implements ISocket {
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
  private socket: ISocket;
  private token: string;
  constructor(token: string) {
    // this.socket = io('http://fandream11-chat-api.play-demo.com');
    this.socket = new PseudoSocket();
    this.token = token;
  }
  server_response(callback: (msg: string) => void) {
    this.socket.on("server_response", function (msg) {
      callback(msg);
    });
  }
  server_response_error(callback: (msg: string) => void) {
    this.socket.on("socket_error", function (msg) {
      console.log(msg);
      callback(msg);
    });
  }
  disconnect() {
    this.socket.emit("disconnect", { token: this.token });
  }
  connect(): void {
    this.socket.emit("connect", { token: this.token });
  }
  sendMessage(msg: string): void {
    this.socket.emit("send_message", { msg });
  }
}
