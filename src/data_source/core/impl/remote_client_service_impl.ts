import { AxiosPromise, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  assert,
  AssertMessages
} from "~/domain/app/third_parties/utils/exceptions";
import { ClientServicePlugins } from "~/data_source/core/interfaces/client_service_plugin";
import {
  RemoteClientService,
  EClientStage
} from "~/data_source/core/interfaces/remote_client_service";

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

  async dl(
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
