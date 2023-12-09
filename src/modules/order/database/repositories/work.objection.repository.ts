import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { Result } from '@libs/utils';
import { WorkEntity, WorkEntityProps } from '@modules/order/domain';

import { WorkObjectionOrmEntity, WorkOrmEntity } from '../entities';
import { WorkOrmMapper } from '../mappers';

export class WorkObjectionRepository extends ObjectionRepositoryBase<
  WorkEntity,
  WorkEntityProps,
  WorkOrmEntity,
  WorkObjectionOrmEntity,
  WorkOrmMapper
> {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(WorkObjectionOrmEntity, new WorkOrmMapper(), unitOfWork, trxId);
  }

  async getWorkByName(
    name: string,
  ): Promise<Result<WorkEntity, ExceptionBase>> {
    try {
      const ormEntity = await this.repository.query().findOne({ name });

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
