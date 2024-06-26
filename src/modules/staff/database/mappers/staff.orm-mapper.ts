import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { DateVO, PhoneVO, UrlVO } from '@libs/value-objects';
import { StaffEntity, StaffEntityProps } from '@modules/staff/domain';

import { StaffOrmEntity, StaffOrmEntityProps } from '../entities';

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
      phone: new PhoneVO(ormEntity.phone),
      birthdate: ormEntity.birthdate
        ? new DateVO(ormEntity.birthdate)
        : undefined,
      firstname: ormEntity.firstname,
      lastname: ormEntity.lastname,
      role: ormEntity.role,
      avatar: ormEntity.avatar ? new UrlVO(ormEntity.avatar) : undefined,
      isRemoved: ormEntity.isRemoved,
      tgUsername: ormEntity.tgUsername,
      tgId: ormEntity.tgId,
      middleName: ormEntity.middleName,
      isFirstEntrance: ormEntity.isFirstEntrance,
    };
  }

  protected toOrmProps(entity: StaffEntity): OrmEntityProps<StaffOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      phone: props.phone.value,
      birthdate: props.birthdate ? props.birthdate.ISOString : null,
      firstname: props.firstname,
      lastname: props.lastname,
      role: props.role,
      avatar: props.avatar ? props.avatar.value : null,
      isRemoved: props.isRemoved,
      tgId: props.tgId,
      tgUsername: props.tgUsername ?? null,
      middleName: props.middleName,
      isFirstEntrance: props.isFirstEntrance,
    };
  }
}
