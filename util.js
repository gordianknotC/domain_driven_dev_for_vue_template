const path = require("path");
const fs = require("fs");



// function trySyncWithIOSPatch(){
//   if (fs.existsSync("ios") && FOLDER_SYNC === "true") {
//     const capacitorCfgString = fs.readFileSync(CAPACITOR_CFG_PATH, "utf-8");
//     const capacitorObj = JSON.parse(capacitorCfgString);
//     capacitorObj.webDir = VITE_APP_ENV;
//     const newCapacitorString = JSON.stringify(capacitorObj);
//     fs.writeFileSync(CAPACITOR_CFG_PATH, newCapacitorString);
//     copyDir.sync(IOS_SYNC_FOLDER, "ios");
//   }
// }

const ENV = {};

/**
 *  用於定義 env variables, 之後使用 getEnv, 方便寫入 vue global
 *  key: environment key
 *  val: value
 * */
function asEnv(key, val){
  ENV[key] = JSON.stringify(val);
  return val;
}


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
 *  取得 asEnv 所定義的 env variables
 *
 * */
function getEnv(){
  return ENV;
}


function configSVGIcon(config) {
  config.module
    .rule("svg")
    .exclude.add(path.resolve(__dirname, "./presentation/assets/icons"))
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
    .include.add(path.resolve(__dirname, "./presentation/assets/icons"))
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



module.exports = {
  configSVGIcon,
  asEnv,
  getEnv,
  useYamlAsEnv,
}
