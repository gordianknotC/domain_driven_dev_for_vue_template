import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  assert,
  AssertMessages
} from "~/presentation/third_parties/utils/assert_exceptions";
import { ClientServicePlugins } from "~/data_source/core/interfaces/client_service_plugin";
import {
  RemoteClientService,
  EClientStage,
  IApiClientMethods,
  IApiClientService,
  IQueue,
  QueueItem
} from "~/data_source/core/interfaces/remote_client_service";
import {
  TDataResponse,
  TErrorResponse,
  TSuccessResponse
} from "~/data_source/entities/response_entity";
import { ISocketClientService } from "../interfaces/socket_client_service";

export class RemoteClientServiceImpl extends RemoteClientService {
  static _instance?: RemoteClientServiceImpl;
  static singleton(
    requestPlugins?: ClientServicePlugins<AxiosRequestConfig>[],
    responsePlugins?: ClientServicePlugins<
      AxiosResponse,
      Promise<AxiosResponse>
    >[],
    config?: AxiosRequestConfig
  ) {
    if (this._instance != undefined) {
      assert(
        () => requestPlugins != undefined,
        AssertMessages.notUndefined("requestParam")
      );
      assert(
        () => responsePlugins != undefined,
        AssertMessages.notUndefined("responsePlugins")
      );
      assert(() => config != undefined, AssertMessages.notUndefined("config"));
    }
    return (this._instance ??= new RemoteClientServiceImpl(
      requestPlugins!,
      responsePlugins!,
      config!
    ));
  }

  get isAuthorizing(): boolean {
    return this.stage == EClientStage.authorizing;
  }

  get canResetAsIdle(): boolean {
    return (
      this.stage == EClientStage.error || this.stage == EClientStage.success
    );
  }

  private async fetch(
    method: "get" | "post" | "del" | "put",
    url: string,
    params: Record<string, any>
  ): Promise<AxiosResponse<any>> {
    // todo: processing plugins here...
    if (this.isAuthorizing) {
    } else if (this.canResetAsIdle) {
      this.stage = EClientStage.idle;
    }
    const result = this.axios({
      method,
      url,
      params
    });
    this.stage = EClientStage.fetching;
    return result;
  }

  async get(
    url: string,
    payload: Record<string, any>
  ): Promise<AxiosResponse<any, any>> {
    try {
      const result = await this.fetch("get", url, payload);
      return result.data;
    } catch (e) {
      throw e;
    }
  }

  async post(
    url: string,
    payload: Record<string, any>
  ): Promise<AxiosResponse<any, any>> {
    try {
      const result = await this.fetch("post", url, payload);
      return result.data;
    } catch (e) {
      throw e;
    }
  }

  async put(
    url: string,
    payload: Record<string, any>
  ): Promise<AxiosResponse<any, any>> {
    try {
      const result = await this.fetch("put", url, payload);
      return result.data;
    } catch (e) {
      throw e;
    }
  }

  async del(
    url: string,
    payload: Record<string, any>
  ): Promise<AxiosResponse<any, any>> {
    try {
      const result = await this.fetch("del", url, payload);
      return result.data;
    } catch (e) {
      throw e;
    }
  }
}

// UNTESTED:
// INCOMPLETED:
export class ApiClientService<T extends { id: number }>
  implements IApiClientService<T>
{
  stage: EClientStage;
  constructor(public socket: ISocketClientService, public queue: IQueue<any>) {
    this.stage = EClientStage.idle;
  }

  private connect(): Promise<TSuccessResponse> {
    const futureResponse = new Promise<TSuccessResponse>(() => {});
    this.socket.connect({
      success(msg: string) {
        futureResponse.then();
        throw new Error("Function not implemented.");
      },
      failed(msg: string) {
        throw new Error("Function not implemented.");
      },
      resuccess(msg: string) {
        throw new Error("Function not implemented.");
      },
      refailed(msg: string) {
        throw new Error("Function not implemented.");
      }
    });
    return futureResponse;
  }

  // TODO: 待確認請求方式
  getEventFromUrl(url: string): string {
    return "temp";
  }

  // TODO: unittest
  // FIXME: 待確認請求方式, 可能為 eventname 而不是 url
  get(url: string, payload: Record<string, any>): Promise<TDataResponse<T>> {
    this.stage = EClientStage.fetching;
    if (this.socket.socket.connected) {
      const payloadAsString = JSON.stringify({ url, payload });
      const event = this.getEventFromUrl(url);
      const futureResponse = new Promise<TDataResponse<T>>(() => {});

      this.queue.add(futureResponse);
      this.socket.send(
        event,
        payloadAsString,
        function onSuccess(msg: string) {},
        function onError(msg: string) {}
      );
      return futureResponse;
    } else {
      this.connect();
    }
  }
  post(url: string, payload: Record<string, any>): Promise<TDataResponse<T>> {
    throw new Error("Method not implemented.");
  }
  put(url: string, payload: Record<string, any>): Promise<TDataResponse<T>> {
    throw new Error("Method not implemented.");
  }
  del(url: string, payload: Record<string, any>): Promise<TDataResponse<T>> {
    throw new Error("Method not implemented.");
  }
}

/**
 * api client 處理由 websocket 傳送出去的請求, 將請求暫存於 queue 以後，待收到 socket
 * 資料，再由 queue 裡的 promise resolve 返回值， resolve 後無論成功失敗，移除該筆 queue
 */
export class Queue implements IQueue<QueueItem> {
  queue: QueueItem[] = [];
  enqueue(
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
      error_code: 0,
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

  dequeue(id: number): boolean {
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
