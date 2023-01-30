import { createI18n } from "vue-i18n";
import tw, { LocaleObject } from "./locales/tw";
import { App } from "vue";
import { LazyHolder, provideFacade } from "@gdknot/frontend_common";


const i18n = createI18n<{
  locale: string;
  fallbackLocale: string;
  messages: {
    tw: LocaleObject;
  };
}>({
  legacy: false,
  locale: "tw",
  fallbackLocale: "tw",
  messages: {
    tw
  } as any
});

export default i18n;

export function setupI18n(app: App<Element>) {
  const merge = true;
  app.use(i18n);
  console.log("i18n:", i18n);
  provideFacade({
    deps: {
      stores: {
        i18n,
        t: LazyHolder<LocaleObject>(() => {
          return new Proxy<LocaleObject>({} as any, {
            get(target, name) {
              return i18n.global.t(name as string) as string;
            }
          });
        })
      }
    },
    merge
  });
}

// TODO:
// const createI18n = (config: any) => ({
//   locale: ref(config.locale),
//   messages: config.messages,
//   $t(key: keyof typeof en) {
//     return this.messages[this.locale.value][key];
//   }
// });

// let _i18nInstance: any;

// export type TLanguage = "en" | "cn" | "ind";

// const _i18nLazyHolder = LazyHolder<{
//   locale: Ref<TLanguage>;
//   messages: Record<TLanguage, typeof en>;
//   $t: (key: keyof typeof en) => string;
// }>(() => {
//   const { global } = getStore() as TStore;
//   const locale = global.getters.currentLang.value;
//   // prettier-ignore
//   _i18nInstance ??= createI18n({
//     locale: locale,
//     messages: {
//       en: en,
//       ind: ind
//     }
//   });
//   console.log("_i18nInstance:", _i18nInstance);
//   return _i18nInstance;
// });
