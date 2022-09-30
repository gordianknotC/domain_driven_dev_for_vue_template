import { createApp } from "vue";
import App from "./App.vue";
import "~/assets/styles/index.scss";
import { setupDomainDependencies } from "~/domain/app/domain_app_index";
import { setupAppPlugins } from "~/domain/app/third_parties/plugins/plugins_index";
import router from "~/presentation/controller/router/router_config";
const app = createApp(App as any);
app.use(router);

console.log("123");
setupDomainDependencies(app, true);
