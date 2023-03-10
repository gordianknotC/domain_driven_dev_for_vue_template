import { RemovableRef } from "@vueuse/core";
import { LocalStorageManager } from "~/data_source/core/itf/local_storage_manager_itf";

let instance;

/** 
 * @singleton
 * 統一管理 localStorage / sessionStorage
 * 統一管理/destroy...
 */

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
  return new _LocalStorageManager();
}