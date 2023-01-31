import { assert } from "~/presentation/third_parties/utils/assert_exceptions";

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

/** {@inheritdoc IModelMapper} base mapper 
 * @typeParam E - EntityModel
 * @typeParam D - DomainModel */
export class BaseModelMapper<E, D> extends IModelMapper<E, D> {
  constructor(option: {
    fromEntity: (entity: E) => D,
    fromDomain: (domain: D) => E
  }) {
    const {fromEntity, fromDomain} = option;
    super(fromEntity, fromDomain);
  }
  toEntity(domain: D): E {
    return this.fromDomain(domain);
  }
  toDomain(entity: E): D {
    return this.fromEntity(entity);
  }
}

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

export 
const tempMapper = ()=> new BaseModelMapper({
  // convert from entity to domain
  fromEntity: entity => {
    return entity;
  },
  // convert from domain to entity
  fromDomain: domain => {
    return domain;
  }
});
