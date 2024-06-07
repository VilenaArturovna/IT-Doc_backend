import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { Result } from '@libs/utils';
import { IdVO } from '@libs/value-objects';
import {
  WarehouseItemEntity,
  WarehouseItemEntityProps,
} from '@modules/warehouse/domain';

import {
  WarehouseItemObjectionOrmEntity,
  WarehouseItemOrmEntity,
} from '../entities';
import { WarehouseItemOrmMapper } from '../mappers';

export class WarehouseItemObjectionRepository extends ObjectionRepositoryBase<
  WarehouseItemEntity,
  WarehouseItemEntityProps,
  WarehouseItemOrmEntity,
  WarehouseItemObjectionOrmEntity,
  WarehouseItemOrmMapper
> {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(
      WarehouseItemObjectionOrmEntity,
      new WarehouseItemOrmMapper(),
      unitOfWork,
      trxId,
    );
  }

  async getOneById(
    id: IdVO,
  ): Promise<Result<WarehouseItemEntity, ExceptionBase>> {
    try {
      const ormEntity = await this.repository
        .query()
        .findById(id.value)
        .withGraphFetched('[vendor, provider]');

      if (!ormEntity) {
        return Result.fail(new NotFoundException('Entity not found'));
      }

      const domainEntity = this.mapper.toDomainEntity(ormEntity);

      return Result.ok(domainEntity);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async batchUpdate(
    entities: WarehouseItemEntity[],
  ): Promise<Result<void, ExceptionBase>> {
    try {
      for (const entity of entities) {
        await this.update(entity);
      }

      return Result.ok();
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getManyByIds(
    ids: IdVO[],
  ): Promise<Result<WarehouseItemEntity[], ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);
    try {
      const ormEntities = await this.repository
        .query(transaction)
        .findByIds(ids.map((id) => id.value))
        .withGraphFetched('[vendor, provider]');

      if (ids.length !== ormEntities.length) {
        return Result.fail(new NotFoundException('Entities not found'));
      }

      const domainEntities = ormEntities.map((ormEntity) =>
        this.mapper.toDomainEntity(ormEntity),
      );

      return Result.ok(domainEntities);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
