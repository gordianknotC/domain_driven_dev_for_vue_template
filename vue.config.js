const { defineConfig } = require("@vue/cli-service")
const path = require("path");
const resolve = path.resolve;
const CAPACITOR_CFG_PATH= resolve(__dirname, "patch/ios/App/App/capacitor.config.json");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const pjson = require("./package.json");


module.exports = defineConfig({
  publicPath: process.env.VUE_APP_ENV === "githubPage"
    ? `/${pjson.slug}`
    : "/",
  transpileDependencies: true,
  productionSourceMap: false,
  // outputDir: "../tempSiteForTestingOnly.github.io",
  configureWebpack: config => {
    let optimization = {};
    if (process.env.VUE_APP_ENV) {
      optimization = {
        minimize: true,
        runtimeChunk: true,
        splitChunks: {
          chunks: "all",
          minSize: 8000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            common: {
              name: "chunk-common", // 打包后的文件名
              minChunks: 2,
              maxInitialRequests: 5,
              minSize: 0,
              priority: 1,
              reuseExistingChunk: true
            },
            vendors: {
              name: "chunk-vendors",
              test: /[\\/]node_modules[\\/]/,
              priority: 2,
              minSize: 0,
              reuseExistingChunk: true,
              enforce: true
            },
            vant: {
              name: "vant",
              test: /[\\/]node_modules[\\/]vant[\\/]/,
              minSize: 0,
              priority: 3,
              reuseExistingChunk: true,
              enforce: true
            }
          },
        },
      };
    }
    return {
      optimization,
      resolve: {
        alias: {
          "~": resolve(__dirname, "src/"),
          "@": resolve(__dirname, "src/"),
          "common_js_builtin": path.resolve("node_modules", "common_js_builtin"),

        }
      },
      plugins:[
        new BundleAnalyzerPlugin()
      ]
    };
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        prependData: "@import '@/assets/styles/mixin';"
      }
    },
    extract: {
      ignoreOrder: true
    }
  },
});
