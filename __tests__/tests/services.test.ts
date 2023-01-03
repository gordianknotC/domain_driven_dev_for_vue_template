
import { CryptoLocalStorageImpl } from "@/data_source/core/impl/crypto_storage_impl";
import { setupComputed, setupCurrentEnv, setupReactive, setupRef, setupWatch } from "@gdknot/frontend_common";
import { computed, reactive, ref, watch } from "vue";


describe("Services", ()=>{
  beforeAll(()=>{
    setupComputed(computed);
    setupReactive(reactive);
    setupRef(ref);
    setupWatch(watch);
    setupCurrentEnv("develop");
  });

  describe("Crypto", ()=>{
      const entity = {hello: "world"};
      const crypto = new CryptoLocalStorageImpl("key", entity);
      test("demo test", function(){
        expect(true).toBe(true);
      });
  });
  test("demo test", function(){
    expect(true).toBe(true);
  });
});


