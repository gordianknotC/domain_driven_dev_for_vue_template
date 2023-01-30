import { ApiClientServicePlugins } from "~/data_source/core/interfaces/api_client_service_plugin";
import { AxiosRequestConfig } from "axios";
import { IRemoteClientService } from "src/data_source/core/interfaces/remote_client_service";
import { merge } from "merge-anything";
import { NotImplementedError } from "@gdknot/frontend_common";

type AxiosConfigHeader = {
  common: {
    Authorization: string;
    Version: string;
  };
};

abstract class BaseClientServiceRequestPlugin extends ApiClientServicePlugins<AxiosRequestConfig> {
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

/** 用來 UpdateRequest Configuration */
export class UpdateRequestHeaderPlugin extends BaseClientServiceRequestPlugin {
  client?: IRemoteClientService<any>;
  prev?: ApiClientServicePlugins<AxiosRequestConfig<any>, AxiosRequestConfig<any>>;
  next?: ApiClientServicePlugins<AxiosRequestConfig<any>, AxiosRequestConfig<any>>;

  protected getRequestHeader(){
    throw new NotImplementedError("getRequestHeader");
  }

  process(config: AxiosRequestConfig): AxiosRequestConfig {
    if (this.canProcess) {
      const header = config.headers as any as AxiosConfigHeader;
      merge(header, this.getRequestHeader());
    }
    return super.process(config);
  }
}

export class UpdateAuthHeaderPlugin extends UpdateRequestHeaderPlugin{
  protected getRequestHeader(){
    return {
      common: {
        Authorization: "ABCDEFG"
      }
    }
  }
}


export class UpdateExtraHeaderPlugin extends UpdateRequestHeaderPlugin{
  protected getRequestHeader(){
    return {
      extra: {
        Authorization: "ABCDEFG"
      }
    }
  }
}
