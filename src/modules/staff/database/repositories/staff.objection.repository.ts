import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { NotFoundException } from '@libs/exceptions';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';
import { Result } from '@libs/utils';
import { PhoneVO } from '@libs/value-objects';
import { StaffEntity, StaffEntityProps } from '@modules/staff/domain';
import { Role } from '@modules/staff/types';

import { StaffObjectionOrmEntity, StaffOrmEntity } from '../entities';
import { StaffOrmMapper } from '../mappers';

export class StaffObjectionRepository extends ObjectionRepositoryBase<
  StaffEntity,
  StaffEntityProps,
  StaffOrmEntity,
  StaffObjectionOrmEntity,
  StaffOrmMapper
> {
  constructor(
    protected readonly unitOfWork: UnitOfWork,
    protected readonly trxId: TrxId,
  ) {
    super(StaffObjectionOrmEntity, new StaffOrmMapper(), unitOfWork, trxId);
  }

  async getOneByPhone(
    phone: PhoneVO,
  ): Promise<Result<StaffEntity, ExceptionBase>> {
    try {
      const ormEntity = await this.repository
        .query()
        .findOne('phone', phone.value);

      if (!ormEntity) {
        return Result.fail(new NotFoundException('Entity not found'));
      }

      const domainEntity = this.mapper.toDomainEntity(ormEntity);

      return Result.ok(domainEntity);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getOneByTgUsername(
    tgUsername: string,
  ): Promise<Result<StaffEntity, ExceptionBase>> {
    try {
      const ormEntity = await this.repository
        .query()
        .findOne('tgUsername', tgUsername);

      if (!ormEntity) {
        return Result.fail(new NotFoundException('Entity not found'));
      }

      const domainEntity = this.mapper.toDomainEntity(ormEntity);

      return Result.ok(domainEntity);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getOneByTgId(
    tgId: string,
  ): Promise<Result<StaffEntity, ExceptionBase>> {
    try {
      const ormEntity = await this.repository.query().findOne('tgId', tgId);

      if (!ormEntity) {
        return Result.fail(new NotFoundException('Entity not found'));
      }

      const domainEntity = this.mapper.toDomainEntity(ormEntity);

      return Result.ok(domainEntity);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getManyByRole(
    role: Role,
  ): Promise<Result<StaffEntity[], ExceptionBase>> {
    const transaction = this.unitOfWork.getTrx(this.trxId);

    try {
      const ormEntities = await this.repository
        .query(transaction)
        .where({ role });

      const domainEntities = ormEntities.map((ormEntity) =>
        this.mapper.toDomainEntity(ormEntity),
      );

      return Result.ok(domainEntities);
    } catch (e) {
      return Result.fail(e);
    }
  }
}
