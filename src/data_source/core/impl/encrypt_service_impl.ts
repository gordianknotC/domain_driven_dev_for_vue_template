import {
  decryptWithAES,
  encryptWithAES
} from "~/presentation/third_parties/utils/crypto_util";
import { CryptoService } from "~/data_source/core/itf/crypto_storage_itf";
import { StorageKeys } from "./crypto_storage_impl";

export class CryptoServiceImpl<T> extends CryptoService<T> {
  constructor(key: string) {
    super(key);
  }
  decrypt(val: string, onFailed?: (val: any) => any): T | undefined {
    onFailed ??= (val: any) => undefined;
    try {
      return JSON.parse(decryptWithAES(val, this.key)) as T;
    } catch (e) {
      return onFailed(val);
    }
  }
  encrypt(val: string): string {
    return encryptWithAES(val, this.key);
  }
  encryptObj(val: T): string {
    return encryptWithAES(JSON.stringify(val), this.key);
  }
}
