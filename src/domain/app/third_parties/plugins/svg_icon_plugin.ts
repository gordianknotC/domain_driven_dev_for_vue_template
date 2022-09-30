//@ts-ignore
import SvgIcon from "~/presentation/components/SvgIcon.vue";
import { App } from "vue";

export function setupSvg(app: App<Element>) {
  const componentPlugin: any = {
    install: function (vue: any, options: any) {
      if (
        options &&
        options.imports &&
        Array.isArray(options.imports) &&
        options.imports.length > 0
      ) {
        // 按需引入图标
        const { imports } = options;
        imports.forEach((name: any) => {
          import.meta.resolve!(`/src/assets/icons/${name}.svg`);
        });
      } else {
        // 全量引入图标
        const ctx = require.context("/src/assets/icons", false, /\.svg$/);
        ctx.keys().forEach(path => {
          const temp = path.match(/\.\/([A-Za-z0-9\-_]+)\.svg$/);
          if (!temp) return;
          const name = temp[1];
          import.meta.resolve!(`/src/assets/icons/${name}.svg`);
        });
      }
      vue.component(SvgIcon.name, SvgIcon);
    }
  };
  app.use(componentPlugin, { imports: [] });
}
