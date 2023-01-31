<!--#-->


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