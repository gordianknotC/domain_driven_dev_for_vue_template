/* eslint-disable */

export const optimizationConfig = {
    runtimeChunk: 'multiple',
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        // 抽離 node_modules
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          name: 'vendors',
          priority: -20,
          enforce: true,
        },
        config: {
          test: /config.ts/,
          name: "config",
          priority: -15,
          ...individualGroup,
          filename: `[name].js`
        },
        // 抽離公用模組
        common: {
          chunks: 'initial',
          name: 'common',
          minChunks: 2,
          priority: -10,
        },
        vue: {
          test: /[\\/]node_modules[\\/](@vue|vue|vue-router)[\\/]/,
          name: `vue`,
          priority: 10,
          chunks: 'all',
          filename: `vue.js`
        },
        vant: {
          test: /[\\/]node_modules[\\/]vant[\\/]/,
          name: `vant`,
          priority: 30,
          chunks: 'all',
          filename: `[name].js`
        },
        intlInput: {
          test: /[\\/]src[\\/]components[\\/]intlInput[\\/]/,
          name: `intlInput`,
          priority: 31,
          chunks: 'all',
        },
        "vue-plyr": {
          name: `vue-plyr`,
          test: /[\\/]node_modules[\\/]vue-plyr[\\/]/,
          priority: 33,
          chunks: 'all',
        },
        "v-calendar": {
          name: `v-calendar`,
          test: /[\\/]node_modules[\\/]v-calendar[\\/]/,
          priority: 34,
          chunks: 'all',
        },
        fontawesome: {
          name: `fontawesome`,
          test: /[\\/]node_modules[\\/]@fontawesome[\\/]/,
          priority: 100,
          chunks: "async",
        }
      },
    },
  };