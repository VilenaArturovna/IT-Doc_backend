import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { Result } from '@libs/utils';
import { ProviderEntity, ProviderEntityProps } from '@modules/warehouse/domain';

import { ProviderObjectionOrmEntity, ProviderOrmEntity } from '../entities';
import { ProviderOrmMapper } from '../mappers';

export class ProviderObjectionRepository extends ObjectionRepositoryBase<
  ProviderEntity,
  ProviderEntityProps,
  ProviderOrmEntity,
  ProviderObjectionOrmEntity,
  ProviderOrmMapper
> {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(
      ProviderObjectionOrmEntity,
      new ProviderOrmMapper(),
      unitOfWork,
      trxId,
    );
  }

  async getOneByTitle(
    title: string,
  ): Promise<Result<ProviderEntity, ExceptionBase>> {
    try {
      const ormEntity = await this.repository.query().findOne('title', title);

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
