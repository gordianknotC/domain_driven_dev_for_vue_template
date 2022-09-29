import {UserEntity} from "~/data_source/entities/user_entity";
import {RemoteClientService} from "~/data_source/core/interfaces/remote_client_service";
import {IFacade, injectFacade} from "common_js_builtin/dist";
import {ClientServiceImpl} from "~/data_source/core/impl/remote_client_service_impl";

export
abstract class GeneralRepository<R, P=R>{
  protected client: RemoteClientService;
  protected constructor() {
    this.client = ;
  }
  abstract get(params?: P): R;
  abstract set(val: R): void;
  abstract fetch(params?: P): Promise<R>;
  abstract upload(val: R): Promise<{ success: boolean }>;
}

export
class BaseRepository<R, P> extends GeneralRepository<R, P>{
  fetch(params: P | undefined): Promise<R> {
    this.client.get();
  }
  get(params: P | undefined): R {
    return undefined;
  }
  set(val: R): void {
  }
  upload(val: R): Promise<{ success: boolean }> {
    return Promise.resolve({success: false});
  }
}





class AppRepository{
  constructor(){

  }
}


