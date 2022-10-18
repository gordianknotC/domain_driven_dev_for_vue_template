# bloc
business logic (BLOC)(XState)

> 商業操作邏輯


# const
> app constants
### router constants
### user account control(UAC) constants

# config
> application configs
### menu config
### router config
### theme config

# controller
>  用來處理 presentation 層的邏輯, 之後會改為 pinia
>  的 convention "store"
### account
### i18n
### router


# components

> 組件

# pages

> 頁面

# theme

> 主題


# third_parties
> 第三方套件，所有 plugin，及可能會被 domain / data source / presentation 存取的工具類，如 exception, 加密解密, 
## plugins
### devtool plugin
> 將 debug 工具注入 browser console
### element plugin
> 安裝設定 element plus
### svg icon plugin
> 設定 svg icons 載入

### index
> plugin 入口，安裝所有 plugin

## utils
- **crypto**
  用於 app 加密解密
- **assert_exceptions** 
  所有 assert exceptions