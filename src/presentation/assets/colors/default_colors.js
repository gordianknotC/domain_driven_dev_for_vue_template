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

/**
 * d: abbreviate for dark
 * l: abbreviate for light
 * s: abbreviate for saturated
 *
 * Corporation Identity System (CI)
 */

const swatches = {
  purple: {
    800: "#3F56C6",
    600: "#5562FF",
    500: "#7882FA",
    400: "#ADB1FF",
    300: "#C4C8FF",
    200: "#E0E2FF"
  },
  brand: {
    800: "#00193E",
    500: "#1B3F69",
    400: "#4C6997",
    300: "#97B0D7"
  },
  blue: {
    800: "#006ECA",
    600: "#1E83FF",
    500: "#4C9CFE",
    400: "#89CDFF",
    300: "#BCE3FF",
    200: "#BCE3FF"
  },
  green: {
    800: "#0BA45B",
    600: "#37C570",
    500: "#56D689",
    400: "#8CFFB9",
    300: "#CCFFE0",
    200: "#EAFFF2"
  },
  red: {
    800: "#B9002C",
    600:" #B9002C",
    500: "#DF2551",
    400: "#EA6585",
    300: "#FFE5EC"
  },
  grey: {
    800: "#70757B",
    600: "#8791A0",
    500: "#99A3B2",
    300: "#D4D9E0",
    200: "#E3EAF3",
    100: "#EFF3F8",
    0:   "#FFFFFF"
  }
};

const ci = {
  primary: {
    d2: swatches.brand["800"],
    d1: swatches.brand["500"],
    DEFAULT: swatches.brand["400"],
    l1: swatches.brand["300"],
    // ----- saturated --------
    sd3: swatches.purple["800"],
    sd2: swatches.purple["600"],
    sd1: swatches.purple["500"],
    s: swatches.purple["400"],
    sl1: swatches.purple["300"],
    sl2: swatches.purple["200"]
  },
  secondary: {
    d3: swatches.green["800"],
    d2: swatches.green["600"],
    d1: swatches.green["500"],
    DEFAULT: swatches.green["400"],
    l1: swatches.green["300"],
    l2: swatches.green["200"]
  },
  tertiary: {
    d3: swatches.blue["800"],
    d2: swatches.blue["600"],
    d1: swatches.blue["500"],
    DEFAULT: swatches.blue["400"],
    l1: swatches.blue["300"],
    l2: swatches.blue["200"]
  },
  error:{
    d3: swatches.red["800"],
    d2: swatches.red["600"],
    d1: swatches.red["500"],
    DEFAULT: swatches.red["400"],
    l1: swatches.red["300"]
  },
  cancel:{
    d3: swatches.grey["800"],
    d2: swatches.grey["600"],
    d1: swatches.grey["500"],
    DEFAULT: swatches.grey["400"],
    l1: swatches.grey["300"]
  },
  success: {
    DEFAULT: swatches.green["500"]
  },
  info: {
    DEFAULT: swatches.green["500"]
  },
  danger: {
    DEFAULT: swatches.red["500"]
  },
  warning: {
    DEFAULT: swatches.red["500"]
  },
  disable:{
    DEFAULT: swatches.grey["500"]
  },
  text: {
    DEFAULT: swatches.grey["800"],
    bright: swatches.grey["0"],
    light: swatches.grey["500"],
    strong: swatches.brand["800"],
    activated: swatches.purple["500"]
  }
};

module.exports = {
  ...swatches,
  ...ci,
  bg: {
    primaryActivated: swatches.purple["500"],
    primaryClickable: swatches.purple["400"],
    secondaryClickable: swatches.green["500"],
    tertiaryClickable: swatches.blue["400"],
    colorlessClickable: swatches.grey["100"],
    inputDisable: swatches.grey["100"],
    tableHead: swatches.grey["200"],
    appHeader: swatches.brand["500"],
    footer: swatches.grey["200"]
  },
  stroke: {
    error: swatches.red["500"],
    focus: swatches.purple["500"],
    inactive: swatches.grey["300"]
  }
};
