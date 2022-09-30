import {injectFacade} from "common_js_builtin";
import {RemoteClientServiceImpl} from "~/data_source/core/impl/remote_client_service_impl";
import {UpdateRequestHeaderGuardImpl} from "~/data_source/core/impl/request_plugins_impl";
import {AuthResponseGuardImpl} from "~/data_source/core/impl/response_plugins_impl";
import {SocketClientServiceImpl} from "~/data_source/core/impl/socket_client_service_impl";

function setupClientService(){
  const requestPlugins = [
    new UpdateRequestHeaderGuardImpl()
  ];
  const responsePlugins = [
    new AuthResponseGuardImpl(),
  ];
  const clientService = RemoteClientServiceImpl.singleton(
    requestPlugins,
    responsePlugins,
    {
      baseURL: process.env.VITE_APP_API_HOST,
      timeout: 10000,
    }
  );
  injectFacade({
    clientService
  });
}

function setupLocalService(){
  // pass
}

function setupRemoteService(){
  // pass
}

function setupSocketService(){
  const token = "";
  const socketService = new SocketClientServiceImpl(token);
  injectFacade({
    socketService
  });
}

export
function setupDataCoreServices(){
  setupClientService();
  setupLocalService();
  setupRemoteService();
  setupSocketService();
}
