import { ModelBase, OrmEntityBase } from '@libs/base-classes';
import { Beneficiary, ClientType } from '@modules/order/types';

export interface ClientOrmEntityProps {
  name: string;
  phone: string;
  beneficiary: Beneficiary;
  type: ClientType;
  fullName?: string;
  legalAddress?: string;
  actualAddress?: string;
  INN?: string;
  KPP?: string;
  OGRN?: string;
  BIK?: string;
  paymentAccount?: string;
  correspondentAccount?: string;
  directorName?: string;
  email?: string;
  contactPerson?: string;
  contactPersonPhone?: string;
}

export class ClientOrmEntity
  extends OrmEntityBase<ClientOrmEntityProps>
  implements ClientOrmEntityProps
{
  name: string;
  phone: string;
  beneficiary: Beneficiary;
  type: ClientType;
  fullName?: string;
  legalAddress?: string;
  actualAddress?: string;
  INN?: string;
  KPP?: string;
  OGRN?: string;
  BIK?: string;
  paymentAccount?: string;
  correspondentAccount?: string;
  directorName?: string;
  email?: string;
  contactPerson?: string;
  contactPersonPhone?: string;
}

export class ClientModel extends ModelBase implements ClientOrmEntity {
  name: string;
  phone: string;
  beneficiary: Beneficiary;
  type: ClientType;
  fullName?: string;
  legalAddress?: string;
  actualAddress?: string;
  INN?: string;
  KPP?: string;
  OGRN?: string;
  BIK?: string;
  paymentAccount?: string;
  correspondentAccount?: string;
  directorName?: string;
  email?: string;
  contactPerson?: string;
  contactPersonPhone?: string;
}
