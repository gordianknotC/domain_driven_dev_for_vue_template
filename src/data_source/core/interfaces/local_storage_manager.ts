import { useLocalStorage, RemovableRef } from "@vueuse/core";

export abstract class LocalStorageManager{
  abstract clear(): void;
  abstract delete(k: any): void;
  abstract has(k: any) : boolean;
  abstract get(k: any): RemovableRef<any[]> | undefined;
  abstract set(k: object, v: RemovableRef<any[]>, reset: ()=>void): LocalStorageManager;
}