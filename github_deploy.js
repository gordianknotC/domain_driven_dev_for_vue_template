const packageJson = require("./package.json");
const template = require("./github_deploy_script_template");
const github = packageJson.github;
const stringFormat = require("string-format");
const renderedScript = stringFormat(template, {"github_repository": github})
const sh = require("shelljs");
const fs = require("fs");
const deploy_script = "github_deploy.sh";

fs.writeFileSync(deploy_script, renderedScript);
console.log("script generated successfully");
sh.exit(0);
