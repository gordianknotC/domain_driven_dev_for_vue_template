import { CryptoLocalStorage, CryptoService } from "~/data_source/core/interfaces/crypto_storage";
import { CryptoServiceImpl } from "~/data_source/core/impl/encrypt_service_impl";

// const APP = import.meta.env.title;
const APP = process.env.title!;
const prefixWith = <T extends Record<string, string>>(target: T, prefix: string):T => {
  Object.entries(target).forEach((pair) => {
    target[pair[0] as any as keyof T] = `/${prefix}${pair[1]}` as any;
  });
  return target;
 }

enum entityKeys {
  user="user"
}

enum uiKeys { 
  appMenu="appMenu"
}

export const StorageKeys = {
  ...prefixWith(entityKeys, APP),
  ui: {
    ...prefixWith(uiKeys, `${APP}/ui`)
  }
};

export class CryptoLocalStorageImpl<T> extends CryptoLocalStorage<T> {
  crypto: CryptoService<T>;
  store: typeof localStorage;
  constructor(
    protected storeKey: string,
    protected defaultEntity: T 
  ) {
    super(storeKey, defaultEntity);
    this.crypto = new CryptoServiceImpl(storeKey);
    this.store = this.localStorage as any;
  }
}
