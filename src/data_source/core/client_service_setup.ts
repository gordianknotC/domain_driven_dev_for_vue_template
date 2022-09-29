import {injectFacade} from "common_js_builtin";
import {ClientServiceImpl} from "~/data_source/core/impl/remote_client_service_impl";
import {UpdateRequestHeaderGuardImpl} from "~/data_source/core/impl/request_plugins_impl";
import {AuthResponseGuardImpl} from "~/data_source/core/impl/response_plugins_impl";


export
function setupClientService(){
  const requestPlugins = [
    new UpdateRequestHeaderGuardImpl(),
  ]
  // todo:
  const responsePlugins = [
    new AuthResponseGuardImpl(),
  ];
  const clientService = ClientServiceImpl.singleton(
    requestPlugins,
    responsePlugins,
    {
      baseURL: process.env.VITE_APP_API_HOST,
      timeout: 10000,
    }
  );
  injectFacade({
    clientService
  })
}
