const path = require("path");
const { parse, HTMLElement } = require('node-html-parser');
const fs = require("fs");

const ENV = {};

function useYamlAsEnv(yaml, {override} = {override: true}){
  Object.keys(yaml).forEach((key)=>{
    if (override){
      ENV[key] = JSON.stringify(yaml[key]);
    }else{
      if (!ENV[key]){
        ENV[key] = JSON.stringify(yaml[key]);
      }
    }
  });
}


/**
 *  用於定義 env variables, 之後使用 getEnv, 方便寫入 vue global
 *  key: environment key
 *  val: value
 * */
function asEnv(key, val){
  ENV[key] = JSON.stringify(val);
  return val;
}

/**
 *  取得 asEnv 所定義的 env variables
 *
 * */
function getEnv(){
  return ENV;
}


function configSVGIcon(config) {
  config.module
    .rule("svg")
    .exclude.add(path.resolve(__dirname, "./src/assets/icons"))
    .end();

  // Options used by svgo-loader to optimize SVG files
  // https://github.com/svg/svgo#what-it-can-do
  const options = {
    plugins: [
      { cleanupAttrs: true },
      { cleanupEnableBackground: true },
      { cleanupIDs: true },
      { cleanupListOfValues: true },
      { cleanupNumericValues: true },
      { collapseGroups: true },
      { convertColors: true },
      { convertPathData: true },
      { convertShapeToPath: true },
      { convertStyleToAttrs: true },
      { convertTransform: true },
      { mergePaths: true },
      { removeComments: true },
      { removeDesc: true },
      { removeDimensions: true },
      { removeDoctype: true },
      { removeEditorsNSData: true },
      { removeEmptyAttrs: true },
      { removeEmptyContainers: true },
      { removeEmptyText: true },
      { removeHiddenElems: true },
      { removeMetadata: true },
      { removeNonInheritableGroupAttrs: true },
      { removeRasterImages: true },
      { removeTitle: true },
      { removeUnknownsAndDefaults: true },
      { removeUselessDefs: true },
      { removeUnusedNS: true },
      { removeUselessStrokeAndFill: true },
      {removeAttrs: { attrs: "fill" }}, //移除fill属性
      { removeXMLProcInst: true },
      { removeStyleElement: true },
      { removeUnknownsAndDefaults: true },
      { sortAttrs: true }
    ]
  };

  // Include only SVG sprite directory for new svg-icon rule
  // Use svg-sprite-loader to build SVG sprite
  // Use svgo-loader to optimize SVG files
  config.module
    .rule("svg-icon")
    .test(/\.svg$/)
    .include.add(path.resolve(__dirname, "./src/assets/icons"))
    .end()
    .use("svg-sprite-loader")
    .loader("svg-sprite-loader")
    .options({
      symbolId: "icon-[name]"
    })
    .end();
  // .use('svgo-loader')
  // .loader('svgo-loader')
  // .options(options)
  // .end();
}



function _rewriteAttrPath(s, attrName, newBasePath){
  const path = s.getAttribute(attrName);
  const filename = path.split("/")[path.split("/").length - 1];
  const newSrc = `${newBasePath}/${filename}`
  s.setAttribute(attrName, newSrc);
}

// 用於 server side render
function rewriteDistIndex(){
  const index = fs.readFileSync("./dist/index.html").toString();
  const dom = parse(index);
  const scripts = dom.querySelector("head").querySelectorAll("script[defer]");
  const csses = dom.querySelector("head").querySelectorAll("link[rel=stylesheet]");
  const favicon = dom.querySelector("head").querySelector("link[rel=icon]");
  _rewriteAttrPath(favicon, "href", "{{image_domain}}/image")

  scripts.forEach((s)=>{
    _rewriteAttrPath(s, "src", "{{js_domain}}")
  });

  csses.forEach((s)=>{
    _rewriteAttrPath(s, "href", "{{css_domain}}")
  });

  fs.writeFileSync("./dist/new_payment_template_not_bundled.html", dom.toString() );
}

function _dumpAttrPathIntoDom(s, attrName, targetTagName){
  const scriptPath = s.getAttribute(attrName);
  const content = fs.readFileSync(path.join(path.join(__dirname, "dist"), scriptPath));
  const newDom =  parse(`<${targetTagName}>${content}</${targetTagName}>`)
  s.setAttribute(attrName, "");
  return newDom;
}

function generateBundledHtml(){
  const index = fs.readFileSync("./dist/index.html");
  const dom = parse(index);
  const scripts = dom.querySelector("head").querySelectorAll("script[defer]");
  const csses = dom.querySelector("head").querySelectorAll("link[rel=stylesheet]");

  scripts.forEach((s)=>{
    const newDom = _dumpAttrPathIntoDom(s, "src", "script")
    dom.querySelector("body").appendChild(newDom);
  });

  csses.forEach((s)=>{
    const newDom = _dumpAttrPathIntoDom(s, "href", "style")
    dom.querySelector("head").appendChild(newDom);
  });

  fs.writeFileSync("./bundled/index.html", dom.toString() );
}

module.exports = {
  configSVGIcon,
  asEnv,
  getEnv,
  useYamlAsEnv,
  rewriteDistIndex,
  generateBundledHtml
}
