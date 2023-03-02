import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { DeadlineEntity, DeadlineEntityProps } from '@modules/order/domain';
import { DeadlineObjectionOrmEntity, DeadlineOrmEntity } from '../entities';
import { DeadlineOrmMapper } from '../mappers';
import { Result } from '@libs/utils';
import { NotFoundException } from '@libs/exceptions';
import { OrderStatus } from '@modules/order/types';

export class DeadlineObjectionRepository extends ObjectionRepositoryBase<
  DeadlineEntity,
  DeadlineEntityProps,
  DeadlineOrmEntity,
  DeadlineObjectionOrmEntity,
  DeadlineOrmMapper
> {
  constructor() {
    super(DeadlineObjectionOrmEntity, new DeadlineOrmMapper());
  }

  async getOneByName(
    name: OrderStatus,
  ): Promise<Result<DeadlineEntity, ExceptionBase>> {
    try {
      const ormEntity = await this.repository.query().findOne('name', name);

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
