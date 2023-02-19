import { EntityBase } from '@libs/base-classes';
import { EmailVO, IdVO, PhoneVO } from '@libs/value-objects';
import { Beneficiary, ClientType } from '@modules/order/types';
import { ClientHasEmptyFieldsError } from '@modules/order/domain/errors';

export interface ClientEntityProps {
  name: string;
  phone: PhoneVO;
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
  email?: EmailVO;
  contactPerson?: string;
  contactPersonPhone?: PhoneVO;
}

type UpdateClientEntityProps = Omit<ClientEntityProps, 'type'>;

export class ClientEntity extends EntityBase<ClientEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: ClientEntityProps): ClientEntity {
    return new ClientEntity({ props });
  }

  protected validate() {
    const {
      type,
      name,
      INN,
      fullName,
      directorName,
      BIK,
      KPP,
      actualAddress,
      legalAddress,
      correspondentAccount,
      paymentAccount,
      OGRN,
      email,
      beneficiary,
      phone,
      contactPerson,
      contactPersonPhone,
    } = this.props;

    const requiredFields = [type, name, beneficiary, phone];

    const requiredLegalPersonFields = [
      type,
      name,
      INN,
      fullName,
      directorName,
      BIK,
      KPP,
      actualAddress,
      legalAddress,
      correspondentAccount,
      paymentAccount,
      OGRN,
      email,
      beneficiary,
      phone,
      contactPerson,
      contactPersonPhone,
    ];

    if (requiredFields.some((f) => f === null || f === undefined)) {
      throw new ClientHasEmptyFieldsError();
    }
    if (
      type === ClientType.LEGAL_PERSON &&
      requiredLegalPersonFields.some((f) => f === null || f === undefined)
    ) {
      throw new ClientHasEmptyFieldsError();
    }
  }

  public get beneficiary() {
    return this.props.beneficiary;
  }

  public update(props: UpdateClientEntityProps) {
    this.props.name = props.name;
    this.props.phone = props.phone;
    this.props.beneficiary = props.beneficiary;
    this.props.fullName = props.fullName;
    this.props.legalAddress = props.legalAddress;
    this.props.actualAddress = props.actualAddress;
    this.props.INN = props.INN;
    this.props.KPP = props.KPP;
    this.props.OGRN = props.OGRN;
    this.props.BIK = props.BIK;
    this.props.paymentAccount = props.paymentAccount;
    this.props.correspondentAccount = props.correspondentAccount;
    this.props.directorName = props.directorName;
    this.props.email = props.email;
    this.props.contactPerson = props.contactPerson;
    this.props.contactPersonPhone = props.contactPersonPhone;
    this.updatedAtNow();
    this.validate();
  }
}
