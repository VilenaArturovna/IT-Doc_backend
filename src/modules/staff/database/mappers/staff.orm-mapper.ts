import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { StaffEntity, StaffEntityProps } from '@modules/staff/domain';
import { StaffOrmEntity, StaffOrmEntityProps } from '../entities';
import {
  DateVO,
  EmailVO,
  HashPasswordVO,
  HashVO,
  PhoneVO,
  UrlVO,
} from '@libs/value-objects';

export class StaffOrmMapper extends OrmMapper<
  StaffEntity,
  StaffEntityProps,
  StaffOrmEntity
> {
  protected getEntityConstructor(ormEntity: StaffOrmEntity): {
    new (props: CreateEntityProps<StaffEntityProps>): StaffEntity;
  } {
    return StaffEntity;
  }

  protected getOrmEntityConstructor(entity: StaffEntity): {
    new (props: StaffOrmEntityProps): StaffOrmEntity;
  } {
    return StaffOrmEntity;
  }

  protected toDomainProps(ormEntity: StaffOrmEntity): StaffEntityProps {
    return {
      email: new EmailVO(ormEntity.email),
      password: new HashPasswordVO(ormEntity.password),
      phone: new PhoneVO(ormEntity.phone),
      birthdate: new DateVO(ormEntity.birthdate),
      firstname: ormEntity.firstname,
      lastname: ormEntity.lastname,
      role: ormEntity.role,
      avatar: ormEntity.avatar ? new UrlVO(ormEntity.avatar) : undefined,
      resetPasswordHash: ormEntity.resetPasswordHash
        ? new HashVO(ormEntity.resetPasswordHash)
        : undefined,
      isRemoved: ormEntity.isRemoved,
    };
  }

  protected toOrmProps(entity: StaffEntity): OrmEntityProps<StaffOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      email: props.email.value,
      password: props.password.value,
      phone: props.phone.value,
      birthdate: props.birthdate ? props.birthdate.ISOString : null,
      firstname: props.firstname,
      lastname: props.lastname,
      role: props.role,
      avatar: props.avatar ? props.avatar.value : null,
      resetPasswordHash: props.resetPasswordHash
        ? props.resetPasswordHash.value
        : null,
      isRemoved: props.isRemoved,
    };
  }
}
