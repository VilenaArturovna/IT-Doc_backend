import { EntityBase } from '@libs/base-classes';
import { ValidationException } from '@libs/exceptions';
import {
  DateVO,
  EmailVO,
  HashPasswordVO,
  HashVO,
  IdVO,
  PhoneVO,
  UrlVO,
} from '@libs/value-objects';
import { StaffHasEmptyFieldsError } from '@modules/staff/domain/errors';
import { Role } from '@modules/staff/types';

export interface StaffEntityProps {
  firstname: string;
  lastname: string;
  email: EmailVO;
  phone: PhoneVO;
  password: HashPasswordVO;
  birthdate?: DateVO;
  avatar?: UrlVO;
  resetPasswordHash?: HashVO;
  role: Role;
  isRemoved: boolean;
}

type UpdateStaffEntityProps = Pick<
  StaffEntityProps,
  'firstname' | 'lastname' | 'phone' | 'birthdate' | 'avatar'
>;

export class StaffEntity extends EntityBase<StaffEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: StaffEntityProps): StaffEntity {
    return new StaffEntity({ props });
  }

  public get name() {
    return {
      firstname: this.props.firstname,
      lastname: this.props.lastname,
    };
  }

  public update(props: UpdateStaffEntityProps) {
    this.props.lastname = props.lastname;
    this.props.firstname = props.firstname;
    this.props.phone = props.phone;
    this.props.birthdate = props.birthdate;
    this.props.avatar = props.avatar;
    this.updatedAtNow();
    this.validate();
  }

  public changePassword(oldPassword: string, newPassword: string) {
    if (oldPassword === newPassword) {
      throw new ValidationException(
        'Новый пароль должен быть отличным от старого',
      );
    }

    const isValid = this.props.password.compare(oldPassword);

    if (!isValid) {
      throw new ValidationException('Старый пароль не совпадает');
    }

    this.props.password = new HashPasswordVO(newPassword);
    this.updatedAtNow();
  }

  public remove() {
    this.props.isRemoved = true;
    this.updatedAtNow();
  }

  public set resetPasswordHash(value: HashVO) {
    this.props.resetPasswordHash = value;
    this.updatedAtNow();
  }

  public forgotPassword(password: string) {
    const isEquals = this.props.password.compare(password);

    if (isEquals) {
      throw new ValidationException(
        'Новый пароль должен быть отличным от старого',
      );
    }

    this.props.password = new HashPasswordVO(password);
    this.props.resetPasswordHash = undefined;
    this.updatedAtNow();
  }

  protected validate() {
    const { firstname, lastname, email, password, phone, role } = this.props;

    const requiredFields = [firstname, lastname, email, password, phone, role];

    if (requiredFields.some((f) => f === null || f === undefined)) {
      throw new StaffHasEmptyFieldsError();
    }
  }
}
