import { provideFacade } from "@gdknot/frontend_common";
import { App } from "vue";
import { MaterialServiceImpl } from "./material/material_service_impl";
import { SupplierServiceImpl } from "./supplier/supplier_service_impl";
import type { AppFacade } from "~/main";

export type FacadeDomainService = {
  domain: {
    material: any;
    merchant: any;
  };
};

export function setupDomainServices(app: App<Element>, facade: AppFacade) {
  const materialService = new MaterialServiceImpl();
  const merchantService = new SupplierServiceImpl();
  const merge = true;
  provideFacade({
    deps: {
      domain: {
        material: materialService,
        merchant: merchantService
      }
    }, 
    merge
  });
}
