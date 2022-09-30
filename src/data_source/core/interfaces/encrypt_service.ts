export abstract class CryptoService<T> {
  protected constructor(protected key: string) {}
  abstract encryptObj(val: T): string;
  abstract encrypt(val: string): string;
  abstract decrypt(val: string, onFailed?: (val: any) => any): T | undefined;
}
