import { createI18n } from "vue-i18n";
import tw from "./tw";
import en from "./en";

type MessageSchema = typeof en;

const i18n = createI18n<{
  locale: string;
  fallbackLocale: string;
  messages: {
    en: MessageSchema;
    tw: MessageSchema;
  };
}>({
  legacy: false,
  locale: "en",
  fallbackLocale: "cn",
  messages: {
    en,
    tw
  } as any
});

export default i18n;
