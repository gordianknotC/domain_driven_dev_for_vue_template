import {ConfigEnv, defineConfig, loadEnv, Plugin, UserConfig} from 'vite';
import path from 'node:path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import ViteRequireContext from '@originjs/vite-plugin-require-context';
import envCompatible from 'vite-plugin-env-compatible';
import { createHtmlPlugin } from 'vite-plugin-html';
import { viteCommonjs } from '@originjs/vite-plugin-commonjs';
import pugPlugin from "vite-plugin-pug"
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

const options = { pretty: true } // FIXME: pug pretty is deprecated!
const locals = { name: "My Pug" }

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const stringfiedEnv: Record<string, any> = {};
  const isBuild = command === 'build';

  Object.keys(env).forEach((key)=>{
    stringfiedEnv[key] = JSON.stringify(env[key]);
  });

  // Load app-level env vars to node-level env vars.
  console.log("env:", stringfiedEnv);

  return {
    root,
    define:{
      ...stringfiedEnv,
      global:{}
    },
    resolve: {
      alias: {
        "@": path.resolve(root, 'src/'),
        "~": path.resolve(root, 'src/'),
      },
      extensions: [
        '.mjs',
        '.js',
        '.ts',
        '.tsx',
        '.json',
        '.vue'
      ]
    },
    server: {
    },
    css: {
      preprocessorOptions: {
        //@ts-ignore
        resolver(id, basedir, importOptions){
          console.log("id, basedir, importopt", id, basedir, importOptions);
        }
      },
    },
    plugins: [
      vue(),
      vueJsx(),
      ViteRequireContext(),
      viteCommonjs(),
      // 讓 process.env 可以被存取
      // envCompatible(),
      // injectHtml({
      //   injectData: {
      //     htmlWebpackPlugin: {
      //       options: {
      //         title: 'Fantasyee',
      //         pwa: {
      //           name: 'Fantasyee',
      //           themeColor: '#1915bf',
      //           msTileColor: '#000000',
      //           appleMobileWebAppCapable: 'yes',
      //           appleMobileWebAppStatusBarStyle: 'black',
      //           workboxPluginMode: 'GenerateSW',
      //           workboxOptions: {
      //             skipWaiting: true,
      //             clientsClaim: true,
      //           },
      //           iconPaths: {
      //             favicon32: "img/icons/favicon-32x32.png",
      //             favicon16: "img/icons/favicon-16x16.png",
      //             appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
      //             maskIcon: "img/icons/safari-pinned-tab.svg",
      //             msTileImage: "img/icons/msapplication-icon-144x144"
      //           },
      //         }
      //       }
      //     }
      //   }
      // }),
      pugPlugin(options, locals),
      createSvgIconsPlugin({
        // Specify the icon folder to be cached
        iconDirs: [
          path.resolve(process.cwd(),
            'assets/icons')
        ],
        // Specify symbolId format
        symbolId: 'icon-[name]',
      }),
    ]
  };
}





