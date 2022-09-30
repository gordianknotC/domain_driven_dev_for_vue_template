import defaultColors from "./default_colors";

/**
 * primary colors:
 *    These are the colors that are most frequently used across
 *    your UI and imparts a distinct identity to the product.
 *    These are usually the colors that a brand sets as their identity.
 *
 *    三種命名方式
 *      1）100 為 default 以上為 dark 以下為 light e.g: primary-90 / primary-110
 *      2) dark / light / medium-dark / medium-light
 *      3) accent / medium-accent / trivial / medium-trivial
 *      前二種是視覺上絕對，第三種是相對，用於有 dark theme / light theme 反差類的主題
 *
 * secondary / tertiary  colors:
 *    These colors highlight or complement the primary color.
 *    These are to be used sparingly to make the UI elements stand out.
 *
 *
 * 以下不強制分子類
 *
 * neutral colors: (如灰階，文字）
 *    These include shades of grey, all the way from White to Black.
 *    These are used for backgrounds, text colors, etc, and form the majority of your UI.
 *
 * semantic colors: （如 success/error/info/warning)
 *    These are the colors that communicate purpose. They help users convey messages.
 *    For example, Green has a positive connotation. We use Green to convey success,
 *    confirmation messages, etc.
 * */


module.exports = Object.assign({
  ...defaultColors
},{

});
