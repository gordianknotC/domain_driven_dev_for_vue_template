import { createApp } from 'vue'
import App from './App.vue'
// import "vant/lib/index.css";
import "~/assets/styles/tailwind.scss";
// import {installVant, setupVToast} from "@/plugins/vantPlugin";
import svgIconPlugin from "@/plugins/svgIcon";



const app = createApp(App as any)
// installVant(app);
// setupVToast(app);
app.use(svgIconPlugin, {imports: []});
app.mount('#app');
