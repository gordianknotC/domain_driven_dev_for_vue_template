import {ClientServicePlugins} from "~/data_source/core/interfaces/client_service_plugin";
import {AxiosRequestConfig, AxiosResponse} from "axios";
import { RemoteClientService } from "src/data_source/core/interfaces/remote_client_service";


abstract class BaseClientServiceResponsePlugin extends ClientServicePlugins<AxiosResponse, Promise<AxiosResponse>> {
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
export class AuthResponseGuardImpl extends BaseClientServiceResponsePlugin {
  client?: RemoteClientService | undefined;
  prev?: ClientServicePlugins<AxiosRequestConfig<AxiosResponse>, Promise<AxiosResponse>> | undefined;
  next?: ClientServicePlugins<AxiosRequestConfig<AxiosResponse>, Promise<AxiosResponse>> | undefined;

  process(response: AxiosResponse): Promise<AxiosResponse> {
    if (this.canProcess){

    }
    return super.process(response);
  }

  processError(error: any): any {
    console.log(error);
    return super.processError(error);
  }
}

