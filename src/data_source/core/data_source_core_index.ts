import { provideFacade } from "js_util_for_vue_project";
import { App } from "vue";
import { UpdateRequestHeaderPlugin } from "~/data_source/core/impl/request_plugins_impl";
import { AuthResponsePlugin } from "~/data_source/core/impl/response_plugins_impl";
import { SocketClientServiceImpl } from "~/data_source/core/impl/socket_client_service_impl";
import type { AppFacade } from "~/main";
import type { ISocketClientService } from "~/data_source/core/interfaces/socket_client_service";
import {
  Queue,
  RemoteClientServiceImpl
} from "./impl/remote_client_service_impl";
import type { IRemoteClientService } from "./interfaces/remote_client_service";


export type FacadeDateSource = {
  data: {
    remoteClient: IRemoteClientService<any>;
    socket: ISocketClientService;
  };
};

export function setupDataCoreServices(app: App<Element>, facade: AppFacade) {
  //    SocketClient
  const token = "";
  const socket = new SocketClientServiceImpl(
    token
  ) as any as ISocketClientService;
  provideFacade({
    data: {
      socket
    }
  }, true);
  //     RemoteClient
  const queue = new Queue();
  const remoteClient = new RemoteClientServiceImpl(socket, queue);
  provideFacade({
    data: {
      remoteClient
    }
  }, true);

  // TODO: ApiClientService
  // const apiClient 

}

