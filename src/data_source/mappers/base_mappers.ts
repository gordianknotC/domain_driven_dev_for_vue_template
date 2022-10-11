import { UserEntity } from "~/data_source/entities/user_entity";

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
