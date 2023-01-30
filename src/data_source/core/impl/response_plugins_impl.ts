import { ApiClientServicePlugins } from "~/data_source/core/interfaces/api_client_service_plugin";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { IRemoteClientService } from "src/data_source/core/interfaces/remote_client_service";

abstract class BaseClientServiceResponsePlugin 
  extends ApiClientServicePlugins<
    AxiosResponse,
    Promise<AxiosResponse>
  > 
{
  get canGoNext(): boolean {
    return super.canGoNext;
  }

  get canProcess(): boolean {
    return super.canProcess;
  }

  process(response: AxiosResponse): Promise<AxiosResponse> {
    if (this.canProcess) {
    }
    if (this.canGoNext && this.next) {
      return this.next.process(response);
    }
    return Promise.resolve(response);
  }

  processError(error: any): Promise<any> {
    if (this.canGoNext && this.next) {
      return this.next.processError(error);
    }
    return Promise.reject(error);
  }
}

// todo:
export class AuthResponsePlugin 
  extends BaseClientServiceResponsePlugin
{
  client?: IRemoteClientService<any>;
  prev?: ApiClientServicePlugins<
    AxiosResponse,
    Promise<AxiosResponse>
  >;
  next?: ApiClientServicePlugins<
    AxiosResponse,
    Promise<AxiosResponse>
  >;

  process(response: AxiosResponse): Promise<AxiosResponse> {
    if (this.canProcess) {
    }
    return super.process(response);
  }

  processError(error: any): any {
    console.log(error);
    return super.processError(error);
  }
}
