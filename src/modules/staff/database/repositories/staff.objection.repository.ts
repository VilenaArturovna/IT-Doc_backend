import { ExceptionBase, ObjectionRepositoryBase } from '@libs/base-classes';
import { StaffEntity, StaffEntityProps } from '@modules/staff/domain';
import { StaffObjectionOrmEntity, StaffOrmEntity } from '../entities';
import { StaffOrmMapper } from '../mappers';
import { EmailVO, HashVO, PhoneVO } from '@libs/value-objects';
import { Result } from '@libs/utils';
import { NotFoundException } from '@libs/exceptions';
import { TrxId, UnitOfWork } from '@libs/unit-of-work';

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

      const domainEntity = await this.mapper.toDomainEntity(ormEntity);

      return Result.ok(domainEntity);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getOneByEmail(
    email: EmailVO,
  ): Promise<Result<StaffEntity, ExceptionBase>> {
    try {
      const ormEntity = await this.repository
        .query()
        .findOne('email', email.value);

      if (!ormEntity) {
        return Result.fail(new NotFoundException('Entity not found'));
      }

      const domainEntity = await this.mapper.toDomainEntity(ormEntity);

      return Result.ok(domainEntity);
    } catch (e) {
      return Result.fail(e);
    }
  }

  async getOneByResetPasswordHash(
    hash: HashVO,
  ): Promise<Result<StaffEntity, ExceptionBase>> {
    try {
      const ormEntity = await this.repository
        .query()
        .findOne('resetPasswordHash', hash.value);

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
