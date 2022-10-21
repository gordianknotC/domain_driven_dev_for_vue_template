/// <reference types="vitest" />

import {
  ConfigEnv,
  defineConfig,
  loadEnv,
  Plugin,
  UserConfig,
  UserConfigExport
} from "vite";
import { createHtmlPlugin } from "vite-plugin-html";
import path from "node:path";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import ViteRequireContext from "@originjs/vite-plugin-require-context";
import envCompatible from "vite-plugin-env-compatible";
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";
// import pugPlugin from "vite-plugin-pug"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";

const options = { pretty: true }; // FIXME: pug pretty is deprecated!
const locals = { name: "My Pug" };

export default ({ command, mode }: ConfigEnv) => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const stringfiedEnv: Record<string, any> = {};
  const isBuild = command === "build";

  Object.keys(env).forEach(key => {
    stringfiedEnv[key] = JSON.stringify(env[key]);
  });

  // https://github.com/vitejs/vite/issues/8909
  //stringfiedEnv["global"] = JSON.stringify(JSON.stringify({}));

  // Load app-level env vars to node-level env vars.
  console.log("env:", stringfiedEnv);

  return defineConfig({
    root,
    define: {
      ...stringfiedEnv,
    },
    esbuild: {
      target: "esnext"
    },
    resolve: {
      alias: {
        "@": path.resolve(root, "src/"),
        "~": path.resolve(root, "src/")
      },
      extensions: [".mjs", ".js", ".ts", ".tsx", ".json", ".vue"]
    },
    server: {},
    css: {
      preprocessorOptions: {
        //@ts-ignore
        resolver(id, basedir, importOptions) {
          console.log("id, basedir, importopt", id, basedir, importOptions);
        },
        scss: {
          additionalData: `
            @import '@/presentation/assets/styles/predefined/mixin';
            @import '@/presentation/assets/styles/predefined/variables';
          `
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      ViteRequireContext(),
      viteCommonjs(),
      // 讓 process.env 可以被存取
      envCompatible(),
      // pugPlugin(options, locals),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [path.resolve(process.cwd(), "src/presentation/assets/icons")],
        // Specify symbolId format
        symbolId: "icon-[dir]-[name]",
        inject: 'body-last',
        customDomId: '__svg__icons__dom__',
      }),
      createHtmlPlugin({
        inject: {
          data: { ...env, MODE: mode }
        }
      })
    ]
  });
};
