import {CryptoService} from "~/data_source/core/interfaces/encrypt_service";
import {LocalClientService} from "~/data_source/core/interfaces/local_client_service";
import {CryptoServiceImpl} from "~/data_source/core/impl/encrypt_service_impl";

export
class LocalClientServiceImpl<T> extends LocalClientService<T>{
  crypto: CryptoService<T>;
  store: typeof localStorage;
  constructor(
    protected storeKey: string,
    protected enableCrypto: boolean = true,
  ) {
    super(storeKey, enableCrypto);
    this.store = localStorage;
    this.crypto = new CryptoServiceImpl(storeKey);
  }
}
