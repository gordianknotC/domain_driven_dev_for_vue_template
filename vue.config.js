const { defineConfig } = require('@vue/cli-service')
const path = require("path");
const resolve = path.resolve;
const CAPACITOR_CFG_PATH= resolve(__dirname, "patch/ios/App/App/capacitor.config.json");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = defineConfig({
  transpileDependencies: true,
  productionSourceMap: false,
  // outputDir: "../tempSiteForTestingOnly.github.io",
  configureWebpack: config => {
    let optimization = {};
    if (process.env.BUILD) {
      optimization = {
        minimize: true,
        runtimeChunk: true,
        splitChunks: {
          chunks: 'async',
          minSize: 8000,
          minRemainingSize: 0,
          minChunks: 1,
          maxAsyncRequests: 30,
          maxInitialRequests: 30,
          enforceSizeThreshold: 50000,
          cacheGroups: {
            defaultVendors: {
              test: /[\\/]node_modules[\\/]/,
              priority: -10,
              reuseExistingChunk: true,
            },
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
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
          'common_js_builtin': path.resolve('node_modules', 'common_js_builtin'),

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
        prependData: `@import '@/assets/styles/mixin';`
      }
    },
    extract: {
      ignoreOrder: true
    }
  },
});
