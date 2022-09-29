/* eslint-disable */
declare module "*.vue" {
  import type { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.svg" {
  const content: any;
  export default content;
}

declare module "*.png" {
  const content: any;
  export default content;
}

declare global {
  const process: {
    env: {
      NODE_ENV:string,
      VITE_APP_VERSION:string,
      VITE_APP_API_HOST:string,
      VITE_APP_IMG_HOST:string,
      VITE_APP_OUTPUT_DIR:string,
    }
  }
}
