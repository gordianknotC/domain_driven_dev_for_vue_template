import { computed, ComputedRef } from "vue";
import { ERouter } from "../consts/router_const";
import { ADMIN_GROUP, EUserAdmin } from "../consts/ua_const";

/**
 * @param label 選單 label, 必需是 computed ref 或 ref object, 當語系變動時才能跟著連動
 * @param meta 額外資料，可用來判斷該 menu 是不出現
 *             如 meta.admin 表明menu 在什麼樣的權限下是否限示
 * @param name menu 名稱，也對應到 [ERouter], 用來表示連結到 router 的名稱
 * @param default 是否為母層展開後的第一個預設節點
 * @param children 子層 menu
 */
export type TAppMenu = {
  name: string;
  label: ComputedRef<string>;
  default?: boolean;
  children: TAppMenu[];
  meta: {
    admin: EUserAdmin[];
  };
};

export const APP_MENU_CONFIG: TAppMenu[] = [
  {
    name: ERouter.materialList,
    label: computed(() => ""),
    default: true,
    children: [],
    meta: {
      admin: ADMIN_GROUP.all
    }
  },
  {
    name: ERouter.materialList,
    label: computed(() => ""),
    children: [],
    meta: {
      admin: ADMIN_GROUP.all
    }
  }
];
