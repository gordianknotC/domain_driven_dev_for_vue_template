const { defineConfig } = require("@vue/cli-service")
const path = require("path");
const resolve = path.resolve;
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const pjson = require("./package.json");
const isGithubPageDeployment = process.env.VITE_APP_ENV === "githubPage";
const plugins = isGithubPageDeployment
  ? []
  : [
    //new BundleAnalyzerPlugin(),
  ];



module.exports = defineConfig({
  publicPath: isGithubPageDeployment
    ? `/${pjson.slug}`
    : "/",
  transpileDependencies: true,
  productionSourceMap: false,
  // outputDir: "../tempSiteForTestingOnly.github.io",
  configureWebpack: config => {
    let optimization = {};
    if (process.env.VITE_APP_ENV) {
      optimization = {
        minimize: true,
        runtimeChunk: true,
        splitChunks: {
          chunks: "all",
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
            "core-js": {
              name: "core-js",
              test: /[\\/]node_modules[\\/]core-js[\\/]/,
              minSize: 0,
              priority: 3,
              reuseExistingChunk: true,
              enforce: true
            },
            "vue": {
              name: "vue",
              test: /[\\/]node_modules[\\/]vue[\\/]/,
              minSize: 0,
              priority: 4,
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
        }
      },
      plugins,
    };
  },
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        additionalData: "@use '@/assets/styles/mixin';"
      }
    },
    extract: {
      ignoreOrder: true
    }
  },
});
