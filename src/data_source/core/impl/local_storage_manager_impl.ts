import { CryptoService } from "~/data_source/core/interfaces/encrypt_service";
import { CryptoLocalStorage } from "~/data_source/core/interfaces/crypto_storage";
import { CryptoServiceImpl } from "~/data_source/core/impl/encrypt_service_impl";
import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { LocalStorageManager } from "../interfaces/local_storage_manager";

let instance;

export
class _LocalStorageManager implements LocalStorageManager{
  protected wm?: WeakMap<object, RemovableRef<any[]>>;
  protected cm?: (()=>void)[];
  constructor() {
    // singleton design pattern
    instance ??= this;
    instance!.wm ??= new WeakMap();
    instance!.cm ??= [];
    return instance;
  }
  clear() {
    this.cm!.forEach((_)=>{
      console.log("localstorage reset cb called");
      _();
    });
    this.wm = new WeakMap();
  }
  delete(k: object) {
    return this.wm!.delete(k);
  }
  get(k: object): RemovableRef<any[]> | undefined {
    return this.wm!.get(k);
  }
  has(k: object) {
    return this.wm!.has(k);
  }
  set(k: object, v: RemovableRef<any[]>, reset: ()=>void) {
    if (!this.wm!.get(k)){
      this.cm?.push(reset);
    }
    this.wm!.set(k, v);
    return this;
  }
}

export function appLocalStorageMgr(): LocalStorageManager{
  // singleton
  return new _LocalStorageManager();
}