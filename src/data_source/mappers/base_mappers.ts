import { UserEntity } from "~/data_source/entities/user_entity";
import { assert } from "~/presentation/third_parties/utils/assert_exceptions";

/** mapper interface */
export abstract class IModelMapper<E, D> {
  abstract toEntity(domain: D): E;
  abstract toDomain(entity: E): D;
  constructor(
    protected fromEntity: (entity: E) => D,
    protected fromDomain: (domain: D) => E
  ) {}
}

/** base mapper */
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

/** base model, 便於 entity / domain 互換
 *  generic E 代表 Entity, generic D 代表 Domain
 *  @param mapper required
 *  @param entity optional (entity / domain 二擇一)
 *  @param domain optional (entity / domain 二擇一)
 *  e.g.:
 *    const model = new Model(mapper, entityOrUndefined, domainOrUndefined);
 *    const entity = model.entity;
 *    const domain = model.domain;
 */
export class Model<E, D> {
  entity!: E;
  domain!: D;
  constructor(public mapper: IModelMapper<E, D>, entity?: E, domain?: D) {
    assert(
      () => entity != undefined || domain != undefined,
      "entity/domain 則一不為空"
    );
    if (entity == undefined) {
      this.entity = mapper.toEntity(domain!);
    } else {
      this.domain = mapper.toDomain(entity!);
    }
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
