module.exports =  `
# 當發生錯誤時終止腳本運行
set -e

# 打包
yarn githubPage:build

# 移動至到打包後的dist目錄
cd dist

# 因為dist資料夾預設是被ignore的，因此在進入dist資料夾後初始化git
git init 
git add -A
git commit -m 'deploy'

# 部署到 ... 分支為 gh-pages
git push -f {github_repository} master:gh-pages
cd -
`


