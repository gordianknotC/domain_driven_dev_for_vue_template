const path = require("path");
const Walk = require("@root/walk");
const fs = require("fs");
const base64ToImage = require("base64-to-image");
const reg = new RegExp(/<image [^>]+ xlink:href="(data:image\/png;base64,[^"]+)"\/>/g);
const { exec } = require("child_process");
const shell = require('shelljs');

Walk.walk("./src/assets/icons", async (err, pathname, dirent)=>{
  if (dirent.name.endsWith(".svg")){
    const content = fs.readFileSync(pathname).toString();
    const matches = content.match(reg);
    if (matches){
      console.log("walk:", pathname, dirent);
      console.log("\ttest matches:", matches.length );
      matches.forEach((_)=>{
        const group = reg.exec(_);
        const base64Str = group[1];
        const path = pathname.split(dirent.name)[0];
        const optionalObj = {fileName: `${dirent.name}.png`, type:"png"};
        console.log("\t\t dump base 64 into png, path:", path, "name:", `${dirent.name}.png`)
        base64ToImage(base64Str,path,optionalObj);
      });
    }
  }
});
