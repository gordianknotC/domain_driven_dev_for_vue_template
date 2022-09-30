import { createApp } from "vue";
import App from "./App.vue";
import "~/assets/styles/tailwind.scss";
import { setupDomainDependencies } from "~/domain/app/domain_app_index";
import { setupAppPlugins } from "~/domain/app/third_parties/plugins/plugins_index";
const app = createApp(App as any);

setupDomainDependencies(app, true);
