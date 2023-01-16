import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import {
  ProviderEntity,
  ServiceEntity,
  ServiceEntityProps,
} from '@modules/warehouse/domain';
import { ServiceObjectionOrmEntity, ServiceOrmEntity } from '../entities';
import { ServiceOrmMapper } from '../mappers';
import { Result } from '@libs/utils';
import { NotFoundException } from '@libs/exceptions';

export class ServiceObjectionRepository extends ObjectionRepositoryBase<
  ServiceEntity,
  ServiceEntityProps,
  ServiceOrmEntity,
  ServiceObjectionOrmEntity,
  ServiceOrmMapper
> {
  constructor() {
    super(ServiceObjectionOrmEntity, new ServiceOrmMapper());
  }

  async getOneByTitle(
    title: string,
  ): Promise<Result<ServiceEntity, ExceptionBase>> {
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
