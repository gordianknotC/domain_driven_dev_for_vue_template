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
  IApiClientRequestQueue
} from "~/data_source/core/interfaces/remote_client_service";
import { TDataResponse } from "~/data_source/entities/response_entity";
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

export class Queue implements IApiClientRequestQueue<any> {
  queue: any[];
  constructor() {
    this.queue = [];
  }
  private processElt(elt: any): any {
    return elt;
  }
  add(elt: any): void {
    this.queue.add(this.processElt(elt));
  }
  addAll(elts: any[]): void {
    elts.forEach(this.add);
  }
  remove(id: number): void {
    try {
      const elt = this.queue.firstWhere(_ => _.id == id)!;
      this.queue.remove(elt);
    } catch (e) {
      throw e;
    }
  }
  removeAll(ids: number[]): void {
    ids.forEach(this.remove);
  }
  pop() {
    return this.queue.pop();
  }
}

// UNTESTED:
// INCOMPLETED:
export class ApiClientService<T extends { id: number }>
  implements IApiClientService<T>
{
  stage: EClientStage;
  constructor(
    public socket: ISocketClientService,
    public queue: IApiClientRequestQueue<any>
  ) {
    this.stage = EClientStage.idle;
  }

  private connect() {}
  get(url: string, payload: Record<string, any>): Promise<TDataResponse<T>> {
    this.stage = EClientStage.fetching;
    if (this.socket.socket.connected) {
      this.queue.add(new Promise(() => {}));
      this.socket.send(
        JSON.stringify({
          url,
          payload
        }),
        msg => {}
      );
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
