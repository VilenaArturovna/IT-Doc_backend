import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { VendorEntity, VendorEntityProps } from '@modules/warehouse/domain';
import { VendorObjectionOrmEntity, VendorOrmEntity } from '../entities';
import { VendorOrmMapper } from '../mappers';
import { Result } from '@libs/utils';
import { NotFoundException } from '@libs/exceptions';

export class VendorObjectionRepository extends ObjectionRepositoryBase<
  VendorEntity,
  VendorEntityProps,
  VendorOrmEntity,
  VendorObjectionOrmEntity,
  VendorOrmMapper
> {
  constructor() {
    super(VendorObjectionOrmEntity, new VendorOrmMapper());
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
