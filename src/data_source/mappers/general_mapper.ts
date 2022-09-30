
abstract class ModelMapper<E, D>{
  abstract fromEntity(entity: E): D;
  abstract fromDomain(domain: D): E;
  abstract toEntity(): E;
  abstract toDomain(): D;
  protected constructor(protected entity: E){};
}

export
class BaseModelMapper<E, D> extends  ModelMapper<E, D>{
  fromDomain(domain: D): E {
    return domain as any as E;
  }
  fromEntity(entity: E): D {
    return entity as any as D;
  }
  toDomain(): D {
    return this.entity as any as D;
  }
  toEntity(): E {
    return this.entity as any as E;
  }
}

