import { EntityBase } from '@libs/base-classes';
import { DateVO, IdVO, PhoneVO, UrlVO } from '@libs/value-objects';
import { StaffHasEmptyFieldsError } from '@modules/staff/domain/errors';
import { Role } from '@modules/staff/types';

export interface StaffEntityProps {
  firstname: string;
  lastname: string;
  phone: PhoneVO;
  birthdate?: DateVO;
  avatar?: UrlVO;
  role: Role;
  isRemoved: boolean;
  tgId?: string;
  tgUsername: string;
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

  public get role() {
    return this.props.role;
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

  public remove() {
    this.props.isRemoved = true;
    this.updatedAtNow();
  }

  public activate(tgId: string, avatar?: UrlVO) {
    this.props.tgId = tgId;
    this.props.avatar = this.props.avatar ?? avatar;
    this.updatedAtNow();
  }

  protected validate() {
    const { firstname, lastname, phone, role, tgUsername } = this.props;

    const requiredFields = [firstname, lastname, tgUsername, phone, role];

    if (requiredFields.some((f) => f === null || f === undefined)) {
      throw new StaffHasEmptyFieldsError();
    }
  }
}
