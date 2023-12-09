import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { Result } from '@libs/utils';
import { DeadlineEntity, DeadlineEntityProps } from '@modules/order/domain';
import { OrderStatus } from '@modules/order/types';

import { DeadlineObjectionOrmEntity, DeadlineOrmEntity } from '../entities';
import { DeadlineOrmMapper } from '../mappers';

export class DeadlineObjectionRepository extends ObjectionRepositoryBase<
  DeadlineEntity,
  DeadlineEntityProps,
  DeadlineOrmEntity,
  DeadlineObjectionOrmEntity,
  DeadlineOrmMapper
> {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(
      DeadlineObjectionOrmEntity,
      new DeadlineOrmMapper(),
      unitOfWork,
      trxId,
    );
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
