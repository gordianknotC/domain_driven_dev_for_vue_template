module.exports = {
  stories: ["../src/**/*.stories.@(mdx|js|jsx|ts|tsx)"],
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-actions",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions"
  ],
  framework: "@storybook/vue3",
  core: {
    builder: "@storybook/builder-vite"
  }
  // async viteFinal(config) {
  //   return {
  //     ...config,
  //     esbuild: {
  //       ...config.esbuild,
  //       jsxInject: `import Vue from 'vue'`
  //     },
  //     rollupOptions: {
  //       ...config.rollupOptions,
  //       // Externalize deps that shouldn't be bundled
  //       // external: ["react", "react-dom"],
  //       output: {
  //         // Global vars to use in UMD build for externalized deps
  //         globals: {
  //           //react: "React",
  //           //"react-dom": "ReactDOM",
  //         }
  //       }
  //     }
  //   };
  // }
};
