import { useLocalStorage, RemovableRef } from "@vueuse/core";

/** 用以加密／解密 
 * @typeParam T - 解密的資料型別 */
export abstract class CryptoService<T> {
  protected constructor(protected key: string) {}
  /** 加密物件 */
  abstract encryptObj(val: T): string;
  /** 加密字串 */
  abstract encrypt(val: string): string;
  /** 解密字串 */
  abstract decrypt(val: string, onFailed?: (val: any) => any): T | undefined;
}

/** LocalStorage 但使用了 vue useLocalStorage, 即帶有 reactive 特性 
 * @typeParam - ENTITY entity 型別
*/
export abstract class LocalStorage<ENTITY> { 
  protected constructor(
      protected storeKey: string,
      protected defaultEntities: ENTITY,
  ){};
  protected get localStorage(): RemovableRef<ENTITY> | null{
    return useLocalStorage(this.storeKey, this.defaultEntities);
  };
}

/** 
 * LocalStorage 但使用了 vue useLocalStorage, 即帶有 reactive 特性
 * 內有 crypto service, 預設所有資料的存取均會加密／解密，用於存取需要加密的資料
 * @typeParam T - 資料型別
 */
export abstract class CryptoLocalStorage<T> {
  abstract store: typeof localStorage;
  abstract crypto: CryptoService<T>;

  protected constructor(
    protected storeKey: string,
    protected defaultEntity: T,
  ) {}

  private _localStorage: RemovableRef<string> | null | undefined;
  protected get localStorage(): RemovableRef<string> | null{
    return this._localStorage ??= useLocalStorage(this.storeKey, this.crypto.encryptObj(this.defaultEntity));
  };

   get value(): T | undefined{
    const self = this;
    return this.crypto.decrypt(this.localStorage!.value, function onFailed(){
      console.error("failed to decrypt:", self.localStorage!.value );
    });
  }
  
   set value(item: T | undefined) {
    this.localStorage!.value = this.crypto.encryptObj(item ?? this.defaultEntity);
  }
}
