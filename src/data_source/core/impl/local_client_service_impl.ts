import { CryptoService } from "~/data_source/core/interfaces/encrypt_service";
import { LocalClientService } from "~/data_source/core/interfaces/local_client_service";
import { CryptoServiceImpl } from "~/data_source/core/impl/encrypt_service_impl";

const APP = process.title;
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
export class LocalClientServiceImpl<T> extends LocalClientService<T> {
  crypto: CryptoService<T>;
  store: typeof localStorage;
  constructor(
    protected storeKey: string,
    protected enableCrypto: boolean = true
  ) {
    super(storeKey, enableCrypto);
    this.store = localStorage;
    this.crypto = new CryptoServiceImpl(storeKey);
  }
}
