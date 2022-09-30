

# assets
## colors
放置企業識別色彩定義檔
- dark_theme_colors.js
  如有 dark theme 才使用，否則與 default_colors 一樣

- default_colors.js
  app 預設色彩定義

## icons
放置小型 icon 檔，預計本資料夾的所有 icon 會使用 svg-icons plugin 整包併入 index.html，所以如果這個資料夾內有太多大檔案 svg icon, 會嚴重影響 index.html 的初始大小

## images
放置小型 image 檔，本資料夾內所有的 image 會使用 rollup 打包成單一或多個 js 檔

## large icons
放置大型 icon 檔, 用以各別打包或各別載入處裡

## large images
放置大型 image 檔， 用以各別打包或各別載入處裡

## styles
### predefined
由 vite sass loader 預處理器，伴隨每個 .vue 檔載入，目前預載只載入 mixin / variables，作用是為了讓 每個 vue 檔能夠引用 **自定義 mixin** 及 **自定義變數**

如果欲新增其他檔案，需要在 vite.config.ts 檔中新增，如下
```javascript
css: {
      preprocessorOptions: {
        scss:{
          additionalData:`
            @import '@/presentation/assets/styles/predefined/mixin';
            @import '@/presentation/assets/styles/predefined/variables';
          `
```

- index.scss
  由 main.ts 載入，為 APP stylesheet 的入口
- container.scss
  定義所有 global container
- form.scss
  定義輔入表單, form, input, ...
- utils.scss
- button.scss
- typography.scss
