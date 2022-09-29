import { createApp } from 'vue'
import App from './App.vue'
import "~/presentation/assets/styles/tailwind.scss";
import {setupAppDependencies} from "~/domain/app/app_dependencies_setup";
import {setupAppPlugins} from "~/third_parties/plugins/app_plugins_setup";
const app = createApp(App as any);

setupAppPlugins(app);
setupAppDependencies(app, true);
