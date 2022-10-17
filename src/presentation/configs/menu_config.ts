import { ERouter } from "../consts/router_const";
import { ADMIN_GROUP, EUserAdmin } from "../consts/ua_const";


export type TAppMenu = {
  name: string, 
  default?: boolean;
  children: TAppMenu[];
  meta: {
    admin: EUserAdmin[],
  },
}

export const APP_MENU_CONFIG: TAppMenu[] = [
  {
    name: ERouter.materialList,
    default: true,
    children: [],
    meta: {
      admin: ADMIN_GROUP.all
    }
  },
  {
    name: ERouter.materialList,
    children: [],
    meta: {
      admin: ADMIN_GROUP.all
    }
  },
]

