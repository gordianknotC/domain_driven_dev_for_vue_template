import {
  EClientStage,
  IRemoteClientService,
  IQueue,
  QueueItem,
  IdentData
} from "~/data_source/core/interfaces/remote_client_service";
import {
  EErrorCode,
  TDataResponse,
  TErrorResponse,
  TSuccessResponse
} from "~/data_source/entities/response_entity";
import { ISocketClientService } from "../interfaces/socket_client_service";

// TODO: unittest, 先定版 socket 再來做這個
/** T remote entity, 必須帶有 id 
 *  以 websocket 實作 api request 方法  get/post/del/put
 * 
*/
export class RemoteClientServiceImpl<T extends IdentData<any>>
  implements IRemoteClientService<T>
{
  stage: EClientStage;
  constructor(public socket: ISocketClientService, public queue: IQueue<any>) {
    this.stage = EClientStage.idle;
  }
  isSuccessResponse(response: any): boolean {
    throw new Error("Method not implemented.");
  }
  isDataResponse(response: any): boolean {
    const validType = (response as TDataResponse<T>);
    return validType.data?.id != undefined && validType.data?.id != "";
  }

  isErrorResponse(response: TDataResponse<T> | TErrorResponse | any): boolean {
    if (!this.isDataResponse(response)) {
      const validType = (response as TErrorResponse);
      return validType.message != undefined
        && validType.error_code != undefined;
    } else { 
      return false;
    }
  }

  // TODO: 失敗後自我連接，直到 max retries
  private connect(): Promise<TSuccessResponse| TErrorResponse> {
    return new Promise<TSuccessResponse|TErrorResponse>((resolve, reject) => {
      this.socket.connect({
        success(msg: string) {
          resolve({succeed: true});
        },
        failed(msg: string) {
          const ret: TErrorResponse = {
            error_code: EErrorCode.socketConnectFailed,
            error_key: "",
            error_msg: "",
            message: ""
          };
          reject(ret);
        },
        reSuccess(msg: string) {
          resolve({succeed: true});
        },
        reFailed(msg: string) {
          const ret: TErrorResponse = {
            error_code: EErrorCode.socketConnectFailed,
            error_key: "",
            error_msg: "",
            message: ""
          };
          reject(ret);
        }
      });
    });
     
  }

  // TODO: 實作資料轉換(如果需要的話)
  private toResponse(rawData: any): TDataResponse<T> | TSuccessResponse {
    return rawData;
  }

  async sendRequest(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse | TSuccessResponse> {
    this.stage = EClientStage.fetching;
    const payloadAsString = JSON.stringify({ event, payload });
    const id: number = payload.id;
    const self = this;
    const action = () => {
      return new Promise<TDataResponse<T>|TSuccessResponse>((resolve, reject) => {
        this.socket.send(
          event,
          payloadAsString,
          // FIXME: 原認知為:這裡的 socket response 為 serializable json string
          function onSuccess(msg: string) {
            const rawData = JSON.parse(msg);
            resolve(self.toResponse(rawData));
          },
          // FIXME: 原認知為:這裡的 socket response 為 serializable json string
          function onError(msg: string) {
            const rawData = JSON.parse(msg);
            reject(self.toResponse(rawData));
          }
        );
      });
    };

    if (this.socket.socket.connected) {
      return this.queue.enqueue(id, action);
    } else {
      try {
        const connected = await this.connect();
        if (connected.succeed) {
          return this.queue.enqueue(id, action);
        } else {
          const error: TErrorResponse = {
            error_code: 0,
            error_key: "",
            error_msg: "network error",
            message: "network error"
          };
          return error;
        }
      } catch (e) {
        throw e;
      }
    }
  }

  // 從設計上考量，get by event name 而不是 url, 因為使用的是 web socket 而不是 http request
  async get(
    event: string,
    payload: Record<string, any>
  ): Promise<TDataResponse<T> | TErrorResponse> {
    return this.sendRequest(event, payload) as any;
  }

  post(url: string, payload: Record<string, any>) {
    return this.sendRequest(url, payload);
  }

  put(url: string, payload: Record<string, any>) {
    return this.sendRequest(url, payload);
  }

  del(url: string, payload: Record<string, any>) {
    return this.sendRequest(url, payload) as any;
  }
  
}

/**
 * api client 處理由 websocket 傳送出去的請求, 將請求暫存於 queue 以後，待收到 socket
 * 資料，再由 queue 裡的 promise resolve 返回值， resolve 後無論成功失敗，移除該筆 queue
 */
export class Queue implements IQueue<QueueItem> {
  queue: QueueItem[] = [];
  public enqueue(
    id: number,
    promise: () => Promise<any>,
    timeout: number = 10000
  ): Promise<any> {
    const timestamp = new Date().getTime();
    return new Promise((resolve, reject) => {
      this.queue.push({
        id,
        timestamp,
        timeout: setTimeout(() => {
          this.onTimeout(id);
        }, timeout),
        promise,
        resolve,
        reject
      });
      this.dequeue(id);
    });
  }

  private onTimeout(id: number) {
    const item = this.queue.firstWhere(_ => _.id == id)!;
    if (!item) return;

    // TODO: error code 定義
    const timeoutError: TErrorResponse = {
      error_code: EErrorCode.timeout,
      error_key: "",
      error_msg: "timeout error",
      message: "timeout error"
    };
    item.reject(timeoutError);
  }

  private remove(item: QueueItem) {
    clearTimeout(item.timeout);
    this.queue.remove(item);
  }

  public dequeue(id: number): boolean {
    const item = this.queue.firstWhere(_ => _.id == id)!;
    if (!item) {
      return false;
    }
    try {
      item
        .promise()
        .then(value => {
          item.resolve(value);
          this.remove(item);
        })
        .catch(err => {
          item.reject(err);
          this.remove(item);
        });
    } catch (err) {
      item.reject(err);
      this.remove(item);
    }
    return true;
  }
}