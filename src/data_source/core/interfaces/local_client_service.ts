import { CryptoService } from "~/data_source/core/interfaces/encrypt_service";
import { useLocalStorage, RemovableRef } from "@vueuse/core";

export abstract class ILocalStorage<ENTITY> { 
  abstract get localStorage(): RemovableRef<ENTITY> | null;
}

export abstract class LocalClientService<T> {
  abstract store: typeof localStorage;
  abstract crypto: CryptoService<T>;

  protected constructor(
    protected storeKey: string,
    protected enableCrypto: boolean = true
  ) {}

  protected getWithCrypto() {
    const encrypted = localStorage.getItem(this.storeKey) as string;
    return this.crypto.decrypt(encrypted);
  }

  protected setWithCrypto(item: T) {
    const encrypted = this.crypto.encryptObj(item);
    localStorage.setItem(this.storeKey, encrypted);
  }

  get(): T | undefined {
    if (this.enableCrypto) return this.getWithCrypto();
    return JSON.parse(localStorage.getItem(this.storeKey) ?? "{}") as any;
  }

  set(item: T) {
    if (this.enableCrypto) return this.setWithCrypto(item);
    localStorage.setItem(this.storeKey, JSON.stringify(item));
  }
}
