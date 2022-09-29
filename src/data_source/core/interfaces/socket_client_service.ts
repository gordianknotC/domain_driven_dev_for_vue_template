import {io, Socket} from "socket.io-client";

export
abstract class ISocket{
  abstract on(msg: string, listener: (msg: string)=>void): void;
  abstract emit(msg: string, args: any): void;
}

export
abstract class ISocketClientService{
  abstract server_response(callback: (msg: string)=>void): void;
  abstract server_response_error(callback: (msg: string)=>void):void
  abstract connect(): void;
  abstract disconnect():void;
}
