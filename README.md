

# Domain Driven Design Template for Vue Project:

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
<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
table of content

- [Domain Driven Design Template for Vue Project:](#domain-driven-design-template-for-vue-project)
  - [Project Structure:](#project-structure)
- [Table of Content](#table-of-content)
  - [Data Source:](#data-source)
    - [entities](#entities)
    - [mappers](#mappers)
    - [repositories](#repositories)
  - [Domain:](#domain)
  - [Presentation:](#presentation)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


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



## Data Source:


即 core data service 可以理解為所有用於 **直接處理資料層級的 Service** - data accessing logic, core 底下有二個資料夾 impl / itf

> impl 為 implementation 的縮寫，代表界面的實作
> 
> itf 為 interfaces  的縮寫，代表界面定義

core service 為主要與資料對接的邏輯，包括 data access IO ( remote/local ) (remote: websocket|http) (local: local platform IO)，以同樣的介面對接不同的 platform，也包括資料的加密解密.

__core services 如下:__
- encrypt_service_impl - 資料加密/解密
- crypto_storage_impl - 本地存取資料
- remote_client_service_impl - 遠端存取資料(http)
- socket_client_service_impl - 遠端存取資料(websocket)



### entities
  
代表對應（DAL-DataAccessLayer) 接口的資料別，以前端而言指的是 API 由 server端回傳未經修改的資料型別，其資料屬性具備唯一性，因此多半有 id 作為其 identification， 這裡指的是 typescript 的型別定義.

__如常用的 userEntity__
```ts
export enum ERole {
  admin,
  user
}

export type UserEntity = {
  name: string;
  email?: string;
  id: string;
  phone?: string;
  token?: string;
  refresh_token?: string;
  role: ERole;
};

```
### mappers

用來轉換資料型別所需的 mapper, 主要提供以下三種轉換，分別對應不同 layer

1. entity model > domain model / view model
   > 用於 data access layer 將資料轉入 business logic 處理
2. domain model > view model / domain model
   > 用於 business logic 將資料理理完後送到 ui render
3. view model > domain model / entity model
   > 用於 ui 將資料回傳到 business logic 再傳入 data access layer

因此當我們需要將資料自由的於這三層傳遞時，為方便我們可以將這三層的資料及 mapper 考慮進一個氾用的資料別 DataModel

__DataModel__
```ts
/** 便於 entity / domain 互換
 * @typeParam E - EntityModel
 *  @typeParam D - DomainModel
 *  @param mapper required
 *  @param entity optional (entity / domain 二擇一)
 *  @param domain optional (entity / domain 二擇一)
 */
export class DataModel<E, D> {
  get entity(): E[]{
    if (this._entity == undefined)
      return this._domain!.map(this.mapper.toEntity);
    return this._entity!;
  }
  get domain(): D[]{
    if (this._domain == undefined)
      return this._entity!.map(this.mapper.toDomain);
    return this._domain!;
  }
  constructor(
    public mapper: IModelMapper<E, D>, 
    private _entity?: E[], 
    private _domain?: D[]
  ) {
    assert(
      () => _entity != undefined || _domain != undefined,
      "entity/domain 則一不為空"
    );
  }
}
```

__mapper 主要介面如下 - IModelMapper:__
```ts
/** mapper interface 
 * @typeParam E - EntityModel
 * @typeParam D - DomainModel */
export abstract class IModelMapper<E, D> {
  /** DomainModel 轉換為 EntityModel */
  abstract toEntity(domain: D): E;
  /** EntityModel 轉換為 DomainModel */
  abstract toDomain(entity: E): D;
  constructor(
    /** EntityModel 轉換為 DomainModel */
    protected fromEntity: (entity: E) => D,
    /** DomainModel 轉換為 EntityModel */
    protected fromDomain: (domain: D) => E
  ) {}
}
```



### repositories
直接存取資料層級的的接口 data access IO，不涉及邏輯，如與邏輯相關則定義為 data access logic，需實作在 core 當中

#### BaseRepository

#### BaseRemoteRepository


## Domain:


## Presentation:
