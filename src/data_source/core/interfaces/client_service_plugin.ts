import {RemoteClientService} from "~/data_source/core/interfaces/remote_client_service";
import {assert, AssertMessages} from "~/third_parties/utils/exceptions";


export
abstract class ClientServicePlugins<T, R=T> {
  abstract prev?: ClientServicePlugins<T, R>;
  abstract next?: ClientServicePlugins<T, R>;
  abstract client?: RemoteClientService;
  abstract process(config: T): R;
  abstract processError(error: any): Promise<any>;
  addNext(next: ClientServicePlugins<T, R>){
    assert(()=>this.client != undefined, AssertMessages.notUndefined("client"));
    this.next = next;
    next.prev = this;
  }
  addPrev(prev: ClientServicePlugins<T, R>){
    assert(()=>this.client != undefined, AssertMessages.notUndefined("client"));
    this.prev = prev;
    prev.next = this;
  }
  addAll(all: ClientServicePlugins<T, R>[]){
    if (all.length ==1 )
      return;
    assert(()=>this.client != undefined, AssertMessages.notUndefined("client"));
    const allSerial = [this, ...all]
    for (let i = 0; i < allSerial.length - 1; i++) {
      all[i].init(this.client!);
      all[i].addNext(all[i+1]);
    }
  }

  protected get canGoNext(): boolean {
    return this.next != undefined;
  }
  protected get canProcess(): boolean {
    return true;
  }
  init(client: RemoteClientService){
    this.client = client;
  }
}
