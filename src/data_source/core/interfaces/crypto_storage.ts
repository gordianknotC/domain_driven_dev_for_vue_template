import { useLocalStorage, RemovableRef } from "@vueuse/core";

export abstract class CryptoService<T> {
  protected constructor(protected key: string) {}
  abstract encryptObj(val: T): string;
  abstract encrypt(val: string): string;
  abstract decrypt(val: string, onFailed?: (val: any) => any): T | undefined;
}

export abstract class LocalStorage<ENTITY> { 
  protected constructor(
      protected storeKey: string,
      protected defaultEntities: ENTITY,
  ){};
  protected get localStorage(): RemovableRef<ENTITY> | null{
    return useLocalStorage(this.storeKey, this.defaultEntities);
  };
}

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
