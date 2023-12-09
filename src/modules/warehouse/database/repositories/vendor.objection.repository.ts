import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { Result } from '@libs/utils';
import { VendorEntity, VendorEntityProps } from '@modules/warehouse/domain';

import { VendorObjectionOrmEntity, VendorOrmEntity } from '../entities';
import { VendorOrmMapper } from '../mappers';

export class VendorObjectionRepository extends ObjectionRepositoryBase<
  VendorEntity,
  VendorEntityProps,
  VendorOrmEntity,
  VendorObjectionOrmEntity,
  VendorOrmMapper
> {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(VendorObjectionOrmEntity, new VendorOrmMapper(), unitOfWork, trxId);
  }

  async getOneByTitle(
    title: string,
  ): Promise<Result<VendorEntity, ExceptionBase>> {
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
