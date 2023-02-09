import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import {
  WarehouseItemEntity,
  WarehouseItemEntityProps,
} from '@modules/warehouse/domain';
import {
  WarehouseItemObjectionOrmEntity,
  WarehouseItemOrmEntity,
} from '../entities';
import { WarehouseItemOrmMapper } from '../mappers';
import { IdVO } from '@libs/value-objects';
import { Result } from '@libs/utils';
import { NotFoundException } from '@libs/exceptions';

export class WarehouseItemObjectionRepository extends ObjectionRepositoryBase<
  WarehouseItemEntity,
  WarehouseItemEntityProps,
  WarehouseItemOrmEntity,
  WarehouseItemObjectionOrmEntity,
  WarehouseItemOrmMapper
> {
  constructor() {
    super(WarehouseItemObjectionOrmEntity, new WarehouseItemOrmMapper());
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

      const domainEntity = await this.mapper.toDomainEntity(ormEntity);

      return Result.ok(domainEntity);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
