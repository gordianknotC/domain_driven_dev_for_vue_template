
import { setupComputed, setupCurrentEnv, setupReactive, setupRef, setupWatch } from "@gdknot/frontend_common";
import { computed, reactive, ref, watch } from "vue";


describe("Have a demo test", ()=>{
  beforeAll(()=>{
    setupComputed(computed);
    setupReactive(reactive);
    setupRef(ref);
    setupWatch(watch);
    setupCurrentEnv("develop");
  });
  test("demo test", function(){
    expect(true).toBe(true);
  });
});


