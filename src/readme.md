

<!--#-->

Domain Driven Design 原則用於 Vue 專案，結合以下 package
- vite
- vue
- vue-router
- vitest
- vite
- storybook
- tailwind/scss/pug
- element-plus
- axios

## Project Structure:
- Data Source
  - core
    > 存放所有與 data source 連接的 service, 共有二資料夾 impl 及 itf,  impl(implementation) 存放實作，itf(interface) 存放介面。
    - core services
      - crypto storage
      - encrypt service
      - local storage manager
      - remote client
  - entities
    > 具有唯一實體 (id/identifier) 的資料，多半是與遠端對接後取得的資料，具有唯一性
  - mappers
    > 將資料映射於不同層級中所需要的脈絡，也可以理解為了在不同層級傳遞資料所需的介面轉換，以符合該層級的脈絡需求 - mappers 將 entities 轉換成不同層級所需要的資料（便於於不同層級中獨立測試及相依份離），如 user entity 於 server 端的資料與 ui 端的顯示會因為脈絡的不同，而需要顥示不同的東西。
  - repositories
    > 由 remote 端取得資料所需的介面，包含最原始的 entities 及各層級所需的 mapper, 以便在不同層級中使用

- Domain
  > Domain 層級將商業邏輯依不同的 Domain 以協作的方式分類命名，透過前後業務端統一化的名稱進行分類描述，並將適業邏輯實作於其中， domain 間若有資料需傳遞，該資料稱為 DomainModel 用於 Domain 層級的資料交流, 於Data Source 間傳遞的資料稱 DataModel/entity， Domain 層級橋接 DataSource 與 Presentation，當它橋接 DataSource 時，透過 Mapper轉換 DomainModel/DataModel，當它橋接 Presentation 時透過 Mapper轉換 DomainModel/PresentationModel
  - domain of account
  - domain of app
  - domain of material
  - domain of project
  - domain of supplier 

- Presentation
  > Presentation 層級處理 ui 層的顯示，presentation 若有資料需傳遞於其他層，該資料稱為 PresentationModel，該層級也代表與使用者平台的應用層級，如 browser/mobile/app 相關設定/plugin
  - assets
    > images | fonts | icons | static files
    - images
    - colors
    - icons
    - large_icons
    - large_images
    - styles
  - components
    > 可複用的組件
  - controller
    > presentation controller
  - layout
    > layout 為可複用的 page 
  - pages
    > presentation pages/views
  - const
    > app 常數
  - configs
    > app 設定
    - menu_configs
    - router_configs
    - theme_configs
    - router
      - admin_router_config
      - user_router_config
  - third_parties
    > 第三方套件的安裝 / export / 方便後續 minification / tree-shaking

# Table of Content
<!-- START doctoc -->
<!-- END doctoc -->


[s-baseAuthGard]: ../src/base/impl/base_auth_response_guard_impl.ts
[s-baseClientServiceResponsePlugin]: ../src/base/impl/response_plugins_impl.ts
[s-baseClientServiceRequestPlugin]: ../src/base/impl/request_plugins_impl.ts
[s-baseRequestReplacer]: ../src/base/impl/base_request_replacer_impl.ts
[s-baseRequestGuard]: ../src/base/impl/base_request_guard_impl.ts
[s-requestClient]: ../src/base/impl/client_impl.ts
[s-requestClient.types]: ../src/base/itf/client_itf.ts
[s-eClientStage]: ../src/presets/auth_client_guards.ts

[s-acAuthResponseGuard]: ../src/presets/auth_client_guards.ts
[s-acFetchedMarker]: ../src/presets/auth_client_guards.ts
[s-acIdleMarker]: ../src/presets/auth_client_guards.ts
[s-acTokenUpdater]: ../src/presets/auth_client_guards.ts

[s-authResponseGuard]: ../src/presets/auth_response_guard.ts
[s-networkErrorGuard]: ../src/presets/network_error_response_guard.ts
[s-headerUpdater]: ../src/presets/request_header_updater.ts
[s-requestReplacer]: ../src/presets/request_replacer.ts

[s-test-mocking]: ../__tests__/__mocks__/axios.ts
[s-test-helper]: ../__tests__/helpers/axo.test.helper.ts
[s-test-setup]: ../__tests__/setup/client.test.setup.ts


