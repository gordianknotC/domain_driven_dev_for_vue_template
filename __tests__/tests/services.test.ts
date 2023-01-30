
import { CryptoLocalStorageImpl } from "@/data_source/core/impl/crypto_storage_impl";
import { appLocalStorageMgr } from "@/data_source/core/impl/local_storage_manager_impl";
import { LocalStorageManager } from "@/data_source/core/interfaces/local_storage_manager";
import { setupComputed, setupCurrentEnv, setupReactive, setupRef, setupWatch } from "@gdknot/frontend_common";
import { computed, reactive, ref, watch } from "vue";

import { useLocalStorage, RemovableRef } from "@vueuse/core";
import { Arr, ArrayDelegate, IQueue, Queue } from "@gdknot/frontend_common";
import internal from "stream";
import { Timer } from "@element-plus/icons-vue";

function wait (span: number): Promise<boolean>{
  return new Promise(resolve =>{
    setTimeout(()=>{
      resolve(true);
    }, span);
  });
}
function time(): number{
  return (new Date()).getTime();
}
 

describe("Services", ()=>{
  beforeAll(()=>{
    setupComputed(computed);
    setupReactive(reactive);
    setupRef(ref);
    setupWatch(watch);
    setupCurrentEnv("develop");
  });

  describe("Storage", ()=>{
    describe("CryptoStorage", ()=>{
      const storeKey = "key";
      const entity = {hello: "world"};
      const crypto = new CryptoLocalStorageImpl(storeKey, entity);
      const storage = useLocalStorage(storeKey, entity);

      test("expect encrypted value to be decrypted validly", function(){
        const encrypted = crypto.crypto.encryptObj(entity);
        const decrypted = crypto.crypto.decrypt(encrypted);
        expect(encrypted).not.toEqual(entity);
        expect(decrypted).toEqual(entity);
      });

      test("expect value stored in localStorage should be encrypted", ()=>{
        expect((crypto as any).localStorage.value).not.toEqual(String(entity));
      });

      test("expect value stored in localStorage should be decrypted", ()=>{
        const encrypted = (crypto as any).localStorage.value;
        const encryptedB = crypto.crypto.encryptObj(entity);
        expect(crypto.crypto.decrypt(encrypted)).toEqual(entity);
        expect(crypto.crypto.decrypt(encryptedB)).toEqual(entity);
      });
      
      test("expect crypto.value is identical to entity", ()=>{
        expect(crypto.value).toEqual(entity);
      });

      test("assign an arbitrary value", ()=>{
        crypto.value = {hello: "hot"} as any;
        expect(crypto.value).toEqual({hello: "hot"});
      });

      test("assign an undefined value, expect revert to default", ()=>{
        crypto.value = undefined;
        expect(crypto.value).toEqual(entity);
      })
    });

    describe("Request plugin", ()=>{
      
    });

    describe("Response plugin", ()=>{

    });
       
  });

  test("demo test", function(){
    expect(true).toBe(true);
  });
});


