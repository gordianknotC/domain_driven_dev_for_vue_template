import { provideFacade } from "js_util_for_vue_project";
import { App } from "vue";
import { MaterialServiceImpl } from "./material/material_service_impl";
import { MerchantServiceImpl } from "./merchant/merchant_service_impl";

export type FacadeDomainService = {
  domain: {
    material: any;
    merchant: any;
  };
};


export function setupDomainServices(app: App<Element>, facade: any){
  const materialService = new MaterialServiceImpl();
  const merchantService = new MerchantServiceImpl();
  provideFacade({
    domain: {
      material: materialService,
      merchant: merchantService,
    }
  })
}