const packageJson = require("./package.json");
const template = require("./github_deploy_script_template");
const github = packageJson.github;
const stringFormat = require("string-format");
const renderedScript = stringFormat(template, {"github_repository": github})
const sh = require("shelljs");

renderedScript.split("\n").forEach((l)=>{
  if (l.startsWith("#")){
    sh.echo(l);
  }else{
    sh.echo(l);
    // sh.exec(l);
  }
});

sh.exit(1);

console.log(process.env);
