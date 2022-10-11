import { injectFacade } from "common_js_builtin/dist";
import { RemoteClientServiceImpl } from "~/data_source/core/impl/remote_client_service_impl";
import { UpdateRequestHeaderPlugin } from "~/data_source/core/impl/request_plugins_impl";
import { AuthResponsePlugin } from "~/data_source/core/impl/response_plugins_impl";
import { SocketClientServiceImpl } from "~/data_source/core/impl/socket_client_service_impl";

import { RemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { ISocketClientService } from "~/data_source/core/interfaces/socket_client_service";

export type FacadeDateSource = {
  data: {
    remote: RemoteClientService;
    socket: ISocketClientService;
  };
};

function setupClientService() {
  const requestPlugins = [new UpdateRequestHeaderPlugin()];
  const responsePlugins = [new AuthResponsePlugin()];
  const clientService = RemoteClientServiceImpl.singleton(
    requestPlugins,
    responsePlugins,
    {
      baseURL: process.env.VITE_APP_API_HOST,
      timeout: 10000
    }
  );
  injectFacade({
    clientService
  });
}

function setupLocalService() {
  // pass
}

function setupRemoteService() {
  // pass
}

function setupSocketService() {
  const token = "";
  const socketService = new SocketClientServiceImpl(token);
  injectFacade({
    socketService
  });
}

export function setupDataCoreServices() {
  setupClientService();
  setupLocalService();
  setupRemoteService();
  setupSocketService();
}
