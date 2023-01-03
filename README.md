# data source

- core
  可以理解為所有用於 **直接處理資料層級的 Service**, data access logic

  > impl 為 implementation 的縮寫，代表界面的實作
  >
  > interfaces 為界面定義

- entities
  代表對應 data base （DAL-DataAccessLayer) 接口的資料別，以前端而言指的是 API 直接回傳未經修改的資料型別.

- mappers
  用來轉換資料型別所需的 mapper, 主要提供以下三種轉換，分別對應不同 layer

  1. entity model > domain model / view model
  2. domain model > view model / domain model
  3. view model > domain model / entity model

  1 用於 data access layer 將資料轉入 business logic 處理

  2 用於 business logic 將資料理理完後送到 ui render

  3 用於 ui 將資料回傳到 business logic 再傳入 data access layer

- repositories
  直接存取資料層級的的接口 data access io，不涉及邏輯，如與邏輯相關則定義為 data access logic，需實作在 core 當中

## core

- encrypt_service_impl
  資料加密/解密
- crypto_storage_impl
  本地存取資料
- remote_client_service_impl
  遠端存取資料

- request_plugins_impl
  遠端 request 邏輯，以責任鍊方式實作

  - UpdateRequestHeaderGuard
    用於每個 request 前，更新 request header

- response_plugins_impl
  遠端 response 邏輯，以責任鍊方式實作

  - AuthResponseGuardImpl
    用於處理當 response 判定為 refresh token 過期時，處理 token 換發機制

- socket_client_service_impl
  websocket service

## entities

## mappers

## repositories







# bloc

business logic (BLOC)(XState)

> 商業操作邏輯

# const

> app constants

### router constants

### user account control(UAC) constants

# config

> application configs, 不涉及邏輯，單純 js object

- **menu_config**
  選單設定，包括選單名，選單 label, 子選單，選單使用者權限
- **router_config**
- **theme_config**
-

# controller

> 用來處理 presentation 層的邏輯, 之後會改為 pinia
> 的 convention "store"

- **account**:
  處理帳戶相關邏輯
- **i18n**
- **router**
  router 相關業務邏輯
- **material**
  通用材料相關頁面商業邏輯
- **supplier**
  供應商相關頁面商業邏輯

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
