import { EntityBase } from './entity.base';
import { ModelBase } from './model.base';
import { DateVO, IdVO } from '@libs/value-objects';

export type OrmEntityProps<OrmEntity> = Omit<
  OrmEntity,
  'id' | 'createdAt' | 'updatedAt'
>;

export interface IOrmMapper<Entity, OrmEntity> {
  toDomainEntity(ormEntity: OrmEntity): Entity;

  toOrmEntity(entity: Entity): OrmEntity;
}

export abstract class OrmMapper<
  Entity extends EntityBase<unknown>,
  EntityProps extends Record<string, any>,
  OrmEntity,
> implements IOrmMapper<Entity, OrmEntity>
{
  protected abstract getEntityConstructor(
    ormEntity: OrmEntity,
  ): new (props: any) => Entity;

  protected abstract getOrmEntityConstructor(
    entity: Entity,
  ): new (props: any) => OrmEntity;

  protected abstract toDomainProps(ormEntity: OrmEntity): EntityProps;

  protected abstract toOrmProps(entity: Entity): OrmEntityProps<OrmEntity>;

  public toDomainEntity(ormEntity: OrmEntity): Entity {
    const props = this.toDomainProps(ormEntity);
    const entity = ormEntity as unknown as ModelBase;

    const constructor = this.getEntityConstructor(ormEntity);
    return new constructor({
      id: new IdVO(entity.id),
      props,
      createdAt: new DateVO(entity.createdAt),
      updatedAt: new DateVO(entity.updatedAt),
    });
  }

  public toOrmEntity(entity: Entity): OrmEntity {
    const props = this.toOrmProps(entity);
    const constructor = this.getOrmEntityConstructor(entity);
    return new constructor({
      ...props,
      id: entity.id.value,
      createdAt: entity.createdAt.ISOString,
      updatedAt: entity.updatedAt.ISOString,
    });
  }
}
