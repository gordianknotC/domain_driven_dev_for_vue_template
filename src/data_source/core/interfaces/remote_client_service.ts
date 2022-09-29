import axios, {AxiosInstance, AxiosPromise, AxiosRequestConfig, AxiosResponse} from "axios";
import {ClientServicePlugins} from "~/data_source/core/interfaces/client_service_plugin";

export
enum EClientStage {
  idle,
  fetching,
  authorizing,
  success,
  error,
}

export
abstract class RemoteClientService{
  protected axios: AxiosInstance;
  protected stage: EClientStage = EClientStage.idle;
  constructor(
    requestPlugins: ClientServicePlugins<AxiosRequestConfig>[],
    responsePlugins: ClientServicePlugins<AxiosResponse, Promise<AxiosResponse>>[],
    config: AxiosRequestConfig
  ) {
    this.axios = axios.create(config);
    this.axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

    const headingRequestPlugin = requestPlugins[0];
    const headingResponsePlugin = responsePlugins[0];
    headingRequestPlugin.init(this);
    headingResponsePlugin.init(this);

    headingRequestPlugin.addAll(requestPlugins.slice(1));
    headingResponsePlugin.addAll(responsePlugins.slice(1));

    const requestConfig = (config: AxiosRequestConfig)=>{
      return headingRequestPlugin.process(config);
    }

    const requestError = (error: any)=>{
      return headingRequestPlugin.processError(error);
    }

    const responseConfig = (val: AxiosResponse)=>{
      return headingResponsePlugin.process(val);
    }

    const responseError = (error: any)=>{
      return headingResponsePlugin.processError(error);
    }

    this.axios.interceptors.request.use(
      requestConfig,
      requestError
    );

    this.axios.interceptors.response.use(
      responseConfig,
      responseError
    );
  }
  abstract get(url: string, payload: Record<string, any>): AxiosPromise<any>;
  abstract post(url: string, payload: Record<string, any>): AxiosPromise<any>;
  abstract put(url: string, payload: Record<string, any>): AxiosPromise<any>;
  abstract del(url: string, payload: Record<string, any>): AxiosPromise<any>;
  abstract dl(url: string, payload: Record<string, any>): AxiosPromise<any>;
}
