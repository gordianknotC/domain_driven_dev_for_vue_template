const path = require("path");
const Walk = require("@root/walk");
const fs = require("fs");
const base64ToImage = require("base64-to-image");
const reg = new RegExp(/<image [^>]+ xlink:href="(data:image\/png;base64,[^"]+)"\/>/g);
const { exec } = require("child_process");
const shell = require("shelljs");
const imageToBase64 = require("image-to-base64");


Walk.walk("./src/assets/icons", async (err, pathname, dirent)=>{
  if (dirent.name.endsWith(".svg")){
    let fileContent = fs.readFileSync(pathname).toString();
    const matches = fileContent.match(reg);
    if (matches){
      console.log("walk:", pathname, dirent);
      console.log("\ttest matches:", matches.length );
      matches.forEach((_)=>{
        const group = reg.exec(_);
        const base64Str = group[1];
        const path = pathname.split(dirent.name)[0];

        imageToBase64(`${path}${dirent.name}.png`).then((response) => {
          const newImage = group[0].replace(group[1], `data:image/png;base64,${response}`);
          console.log("\tbefore:", fileContent.length);
          fileContent = fileContent.replace(group[0], newImage);
          console.log("\tafter:", fileContent.length);
          fs.writeFileSync(pathname, fileContent);
        }).catch((error) => {
          console.log(error);
        })
      });
    }
  }
});
