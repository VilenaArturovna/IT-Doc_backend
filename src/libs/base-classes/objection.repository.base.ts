import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { Model, ModelClass } from 'objection';

import { NotFoundException } from '../exceptions';
import { Result } from '../utils';
import { IdVO } from '../value-objects';
import { EntityBase } from './entity.base';
import { ExceptionBase } from './exception.base';
import { OrmMapper } from './orm-mapper.base';

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
  protected constructor(
    protected readonly repository: ModelClass<ObjectionOrmEntity>,
    protected readonly mapper: Mapper,
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {}

  async getOneById(id: IdVO): Promise<Result<Entity, ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);
    try {
      const ormEntity = await this.repository
        .query(transaction)
        .findById(id.value);

      if (!ormEntity) {
        return Result.fail(new NotFoundException('Entity not found'));
      }

      const domainEntity = this.mapper.toDomainEntity(
        ormEntity as unknown as OrmEntity,
      );

      return Result.ok(domainEntity);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async create(entity: Entity): Promise<Result<Entity, ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);
    try {
      const ormEntity = this.mapper.toOrmEntity(entity);

      await this.repository.query(transaction).insert(ormEntity);

      return Result.ok(entity);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getManyByIds(ids: IdVO[]): Promise<Result<Entity[], ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);
    try {
      const ormEntities = await this.repository
        .query(transaction)
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
    const transaction = this.unitOfWork.getTrx(this.trxId);
    try {
      const ormEntity = await this.repository
        .query(transaction)
        .findById(id.value);

      if (!ormEntity) {
        return Result.fail(new NotFoundException('Entity not found'));
      }

      await this.repository.query(transaction).deleteById(id.value);

      return Result.ok();
    } catch (e) {
      return Result.fail(e);
    }
  }

  async update(entity: Entity): Promise<Result<Entity, ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);

    try {
      await this.repository
        .query(transaction)
        .findById(entity.id.value)
        .patch(this.mapper.toOrmEntity(entity));

      return Result.ok(entity);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
