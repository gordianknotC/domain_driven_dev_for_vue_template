import {ClientServicePlugins} from "~/data_source/core/interfaces/client_service_plugin";
import {AxiosRequestConfig} from "axios";
import { RemoteClientService } from "src/data_source/core/interfaces/remote_client_service";

type AxiosConfigHeader = {
  common: {
    Authorization: string,
    Version: string,
  }
}

abstract class BaseClientServiceRequestPlugin extends ClientServicePlugins<AxiosRequestConfig> {
  get canGoNext(): boolean {
    return super.canGoNext;
  }

  get canProcess(): boolean {
    return super.canProcess;
  }

  process(config: AxiosRequestConfig): AxiosRequestConfig {
    if (this.canGoNext && this.next) {
      return this.next.process(config);
    }
    return config;
  }

  processError(error: any): Promise<any> {
    if (this.canGoNext && this.next) {
      return this.next.processError(error);
    }
    return Promise.reject(error);
  }
}


export class UpdateRequestHeaderGuardImpl extends BaseClientServiceRequestPlugin {
  client?: RemoteClientService | undefined;
  prev?: ClientServicePlugins<AxiosRequestConfig<any>, AxiosRequestConfig<any>> | undefined;
  next?: ClientServicePlugins<AxiosRequestConfig<any>, AxiosRequestConfig<any>> | undefined;
  process(config: AxiosRequestConfig): AxiosRequestConfig {
    if (this.canProcess){
      const header = config.headers as any as AxiosConfigHeader;
      header.common.Authorization = facade.userReact.state.token ;
    }
    return super.process(config);
  }

  processError(error: any): any {
    console.log(error);
    return super.processError(error);
  }
}
