import { is } from "js_util_for_vue_project/dist/utils/typeInferernce";
import { computed, ComputedRef } from "vue";
import { ERouteName } from "~/presentation/consts/router_const";
import { EUserAccount } from "~/presentation/consts/ua_const";

/**
 * @param meta 額外資料，可用來判斷該 menu 是不出現
 *             如 meta.admin 表明menu 在什麼樣的權限下是否限示
 * @param index unique identification for element menu
 * @param route 表示連結到 router 的名稱
 * @param defaultChild 母層展開後的第一個預設節點
 * @param label ui 顯示用 label
 * @param icon ui 顯示用 icon name
 * @param order 暫存用，不需填
 * @param children 子層 menu
 * 
 * 1）index 不設時，自動以 route 作為名稱
 * 2）children (submenu) 如不設 index, 會自動生成為
 *    `${parentIndex}-${subRoute}`
 * 
 * javascript 裡的 hashMap 是 ordered hashmap, 本身代有 order
 */
export type ElMenuConfigItem = {
  order?: number;
  index?: ERouteName | string;
  route: {name: ERouteName};
  icon: string;
  label: ComputedRef<string>;
  defaultChild?: ERouteName;
  children?: ElMenuConfigItemGroup;
  meta: {
    admin: EUserAccount[];
  };
};

export type ElMenuConfigItemGroup = Partial<Record<ERouteName, ElMenuConfigItem>>;

export type ElRawMenuConfig<T> = ElMenuConfigItem[];

export type ElMenuConfig<T extends Record<string, ElMenuConfigItem>> = {
  indexMapping: Record<ERouteName, string | ERouteName>;
  children: Record<keyof T, ElMenuConfigItem>;
}

export function createElMenu<T extends Record<string, ElMenuConfigItem>>(
  config: Record<keyof T, ElMenuConfigItem>
): ElMenuConfig<T> { 
  const menu = {
    indexMapping: {} as Record<ERouteName, string | ERouteName>,
    children: config,
  }

  function processItem(item: ElMenuConfigItem, indexMap:Record<ERouteName, string | ERouteName>, prependKey: string|ERouteName = ""): any {
    const hasSubMenu = is.not.empty((item as any)?.children);
    if (hasSubMenu) {
      let order = 0;
      Object.entries(item.children!).forEach(entry => {
        let [origMenuKey, val] = entry;
        val.order = order;
        val.index ??= val.route.name;
        /** 母子關係時 母key-子key 如
         * 母 index 1, 子 index 勍會為 1-...
         */
        const combinedKey = prependKey
          ? `${prependKey}-${val!.index ?? origMenuKey}`
          : origMenuKey;
        order++;
        processItem(val as any, indexMap, combinedKey);
      });
    } else {
      /** 這裡是以 route name 作為 key, 所以如果有 RouterNames.comingSoon 就有可能連錯地方 */
      indexMap[item.route!.name] = item.index = prependKey;
    }
    return item;
  }

  Object.values(menu.children).forEach((_item: any) => {
    const item = _item as ElMenuConfigItem;
    item.index ??= item.route.name;
    processItem(item as any, menu.indexMapping, item.index);
  });
  
  return menu;
}


