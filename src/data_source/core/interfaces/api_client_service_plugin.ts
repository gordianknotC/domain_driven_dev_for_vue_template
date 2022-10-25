import { IdentData, IRemoteClientService } from "~/data_source/core/interfaces/remote_client_service";
import { TResponse } from "~/data_source/entities/response_entity";
import {
  assert,
  AssertMessages
} from "~/presentation/third_parties/utils/assert_exceptions";

export abstract class ApiClientServicePlugins<REQ, RESP = REQ> {
  abstract prev?: ApiClientServicePlugins<REQ, RESP>;
  abstract next?: ApiClientServicePlugins<REQ, RESP>;
  abstract client?: IRemoteClientService<IdentData<TResponse<RESP>>>;
  abstract process(config: REQ): RESP;
  abstract processError(error: any): Promise<any>;
  addNext(next: ApiClientServicePlugins<REQ, RESP>) {
    assert(
      () => this.client != undefined,
      AssertMessages.notUndefined("client")
    );
    this.next = next;
    next.prev = this;
  }
  addPrev(prev: ApiClientServicePlugins<REQ, RESP>) {
    assert(
      () => this.client != undefined,
      AssertMessages.notUndefined("client")
    );
    this.prev = prev;
    prev.next = this;
  }
  addAll(all: ApiClientServicePlugins<REQ, RESP>[]) {
    if (all.length == 1) return;
    assert(
      () => this.client != undefined,
      AssertMessages.notUndefined("client")
    );
    const allSerial = [this, ...all];
    for (let i = 0; i < allSerial.length - 1; i++) {
      all[i].init(this.client!);
      all[i].addNext(all[i + 1]);
    }
  }

  protected get canGoNext(): boolean {
    return this.next != undefined;
  }
  protected get canProcess(): boolean {
    return true;
  }
  init(client: IRemoteClientService<IdentData<TResponse<RESP>>>) {
    this.client = client;
  }
}
