import { EntityBase } from './entity.base';
import { IdVO } from '../value-objects';
import { OrmMapper } from './orm-mapper.base';
import { Result } from '../utils';
import { ExceptionBase } from './exception.base';
import { NotFoundException } from '../exceptions';
import { Model, ModelClass } from 'objection';

export interface ObjectionRepository<Entity> {
  getOneById(id: IdVO): Promise<Result<Entity, ExceptionBase>>;
  getManyByIds(ids: IdVO[]): Promise<Result<Entity[], ExceptionBase>>;
  create(entity: Entity): Promise<Result<Entity, ExceptionBase>>;
  remove(id: IdVO): Promise<Result<void, ExceptionBase>>;
}

export abstract class ObjectionRepositoryBase<
  Entity extends EntityBase<unknown>,
  EntityProps,
  OrmEntity,
  ObjectionOrmEntity extends Model,
  Mapper extends OrmMapper<Entity, EntityProps, OrmEntity>,
> implements ObjectionRepository<Entity>
{
  constructor(
    protected readonly repository: ModelClass<ObjectionOrmEntity>,
    protected readonly mapper: Mapper,
  ) {}

  async getOneById(id: IdVO): Promise<Result<Entity, ExceptionBase>> {
    try {
      const ormEntity = await this.repository.query().findById(id.value);

      if (!ormEntity) {
        return Result.fail(new NotFoundException('Entity not found'));
      }

      const domainEntity = await this.mapper.toDomainEntity(
        ormEntity as unknown as OrmEntity,
      );

      return Result.ok(domainEntity);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async create(entity: Entity): Promise<Result<Entity, ExceptionBase>> {
    try {
      const ormEntity = this.mapper.toOrmEntity(entity);

      await this.repository.query().insert(ormEntity);

      return Result.ok(entity);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getManyByIds(ids: IdVO[]): Promise<Result<Entity[], ExceptionBase>> {
    try {
      const ormEntities = await this.repository
        .query()
        .findByIds(ids.map((id) => id.value));

      if (ids.length !== (ormEntities as unknown as OrmEntity[]).length) {
        return Result.fail(new NotFoundException('Entities not found'));
      }

      const domainEntities = (ormEntities as unknown as OrmEntity[]).map(
        (ormEntity) => this.mapper.toDomainEntity(ormEntity),
      );

      return Result.ok(domainEntities);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async remove(id: IdVO): Promise<Result<void, ExceptionBase>> {
    try {
      const ormEntity = await this.repository.query().findById(id.value);

      if (!ormEntity) {
        return Result.fail(new NotFoundException('Entity not found'));
      }

      await this.repository.query().deleteById(id.value);

      return Result.ok();
    } catch (e) {
      return Result.fail(e);
    }
  }

  async update(entity: Entity): Promise<Result<Entity, ExceptionBase>> {
    try {
      await this.repository
        .query()
        .findById(entity.id.value)
        .patch(this.mapper.toOrmEntity(entity));

      return Result.ok(entity);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
