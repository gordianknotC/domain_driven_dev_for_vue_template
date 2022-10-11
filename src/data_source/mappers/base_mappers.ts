import { UserEntity } from "~/data_source/entities/user_entity";
import { assert } from "~/domain/app/third_parties/utils/exceptions";

export class Model<E, D>{
  entity!: E;
  domain!: D;
  constructor(public mapper: ModelMapper<E, D>, entity?: E, domain?: D){
    assert(()=>entity != undefined || domain != undefined, "entity/domain 則一不為空" );
    if (entity == undefined){
      this.entity = mapper.toEntity(domain!);
    }else{
      this.domain = mapper.toDomain(entity!);
    }
  }
}

export abstract class ModelMapper<E, D> {
  abstract toEntity(domain: D): E;
  abstract toDomain(entity: E): D;
  constructor(
    protected fromEntity: (entity: E) => D,
    protected fromDomain: (domain: D) => E
  ) {}
}

export class BaseModelMapper<E, D> extends ModelMapper<E, D> {
  toEntity(domain: D): E {
    return this.fromDomain(domain);
  }
  toDomain(entity: E): D {
    return this.fromEntity(entity);
  }
}
