import { CryptoService } from "~/data_source/core/interfaces/encrypt_service";
import { useLocalStorage, RemovableRef } from "@vueuse/core";

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
  protected get localStorage(): RemovableRef<string> | null{
    return useLocalStorage(this.storeKey, this.crypto.encryptObj(this.defaultEntity));
  };

   get(): T | undefined {
    return JSON.parse(this.crypto.decrypt(this.localStorage!.value) as string);
  }
  
   set(item: T) {
    this.localStorage!.value = this.crypto.encryptObj(item);
  }
}
