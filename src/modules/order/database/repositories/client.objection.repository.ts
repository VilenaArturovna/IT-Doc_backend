import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { Result } from '@libs/utils';
import { ClientEntity, ClientEntityProps } from '@modules/order/domain';

import { ClientObjectionOrmEntity, ClientOrmEntity } from '../entities';
import { ClientOrmMapper } from '../mappers';

export class ClientObjectionRepository extends ObjectionRepositoryBase<
  ClientEntity,
  ClientEntityProps,
  ClientOrmEntity,
  ClientObjectionOrmEntity,
  ClientOrmMapper
> {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(ClientObjectionOrmEntity, new ClientOrmMapper(), unitOfWork, trxId);
  }

  async getOneByName(
    name: string,
  ): Promise<Result<ClientEntity, ExceptionBase>> {
    try {
      const ormEntity = await this.repository.query().findOne('name', name);

      if (!ormEntity) {
        return Result.fail(new NotFoundException('Client not found'));
      }

      const domainEntity = await this.mapper.toDomainEntity(ormEntity);

      return Result.ok(domainEntity);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
