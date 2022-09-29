

export
abstract class ModelMapper<E, D>{
  abstract fromEntity(entity: E): D;
  abstract fromDomain(domain: D): E;
  abstract toEntity(): E;
  abstract toDomain(): D;
  protected constructor(protected entity: E){};
}

export
class BaseModelMapper<E> extends  ModelMapper<E, E>{
  fromDomain(domain: E): E {
    return domain;
  }
  fromEntity(entity: E): E {
    return entity;
  }
  toDomain(): E {
    return this.entity;
  }
  toEntity(): E {
    return this.entity;
  }
}


