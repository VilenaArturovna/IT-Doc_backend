import {
  CreateEntityProps,
  OrmEntityProps,
  OrmMapper,
} from '@libs/base-classes';
import { ClientEntity, ClientEntityProps } from '@modules/order/domain';
import { ClientOrmEntity, ClientOrmEntityProps } from '../entities';
import { EmailVO, PhoneVO } from '@libs/value-objects';

export class ClientOrmMapper extends OrmMapper<
  ClientEntity,
  ClientEntityProps,
  ClientOrmEntity
> {
  protected getEntityConstructor(ormEntity: ClientOrmEntity): {
    new (props: CreateEntityProps<ClientEntityProps>): ClientEntity;
  } {
    return ClientEntity;
  }

  protected getOrmEntityConstructor(entity: ClientEntity): {
    new (props: ClientOrmEntityProps): ClientOrmEntity;
  } {
    return ClientOrmEntity;
  }

  protected toDomainProps(ormEntity: ClientOrmEntity): ClientEntityProps {
    return {
      name: ormEntity.name,
      beneficiary: ormEntity.beneficiary,
      type: ormEntity.type,
      phone: new PhoneVO(ormEntity.phone),
      email: ormEntity.email ? new EmailVO(ormEntity.email) : undefined,
      contactPerson: ormEntity.contactPerson,
      contactPersonPhone: ormEntity.contactPersonPhone
        ? new PhoneVO(ormEntity.contactPersonPhone)
        : undefined,
      OGRN: ormEntity.OGRN,
      paymentAccount: ormEntity.paymentAccount,
      fullName: ormEntity.fullName,
      INN: ormEntity.INN,
      correspondentAccount: ormEntity.correspondentAccount,
      KPP: ormEntity.KPP,
      BIK: ormEntity.BIK,
      legalAddress: ormEntity.legalAddress,
      actualAddress: ormEntity.actualAddress,
      directorName: ormEntity.directorName,
    };
  }

  protected toOrmProps(entity: ClientEntity): OrmEntityProps<ClientOrmEntity> {
    const props = entity.getCopiedProps();
    return {
      name: props.name,
      beneficiary: props.beneficiary,
      type: props.type,
      phone: props.phone.value,
      INN: props.INN,
      BIK: props.BIK,
      KPP: props.KPP,
      email: props.email?.value,
      directorName: props.directorName,
      actualAddress: props.actualAddress,
      fullName: props.fullName,
      legalAddress: props.legalAddress,
      OGRN: props.OGRN,
      paymentAccount: props.paymentAccount,
      contactPerson: props.contactPerson,
      contactPersonPhone: props.contactPersonPhone?.value,
      correspondentAccount: props.correspondentAccount,
    };
  }
}
