import { EntityBase } from '@libs/base-classes';
import { DateVO, IdVO, PhoneVO, UrlVO } from '@libs/value-objects';
import { StaffHasEmptyFieldsError } from '@modules/staff/domain/errors';
import { Role } from '@modules/staff/types';

export interface StaffEntityProps {
  firstname: string;
  lastname: string;
  middleName: string;
  phone: PhoneVO;
  birthdate?: DateVO;
  avatar?: UrlVO;
  role: Role;
  isRemoved: boolean;
  tgId: string;
  tgUsername?: string;
  isFirstEntrance: boolean;
}

type CreateStaffEntityProps = Omit<
  StaffEntityProps,
  'isFirstEntrance' | 'isRemoved'
>;

type UpdateStaffEntityProps = Pick<
  StaffEntityProps,
  'firstname' | 'lastname' | 'phone' | 'birthdate' | 'avatar' | 'middleName'
>;

export class StaffEntity extends EntityBase<StaffEntityProps> {
  protected readonly _id: IdVO;

  public static create(props: CreateStaffEntityProps): StaffEntity {
    return new StaffEntity({
      props: { ...props, isFirstEntrance: true, isRemoved: false },
    });
  }

  public get name() {
    return {
      firstname: this.props.firstname,
      lastname: this.props.lastname,
      middleName: this.props.middleName,
    };
  }

  public get role() {
    return this.props.role;
  }

  public get tgId(): string {
    return this.props.tgId;
  }

  public get isRemoved() {
    return this.props.isRemoved;
  }

  public get isFirstEntrance() {
    return this.props.isFirstEntrance;
  }

  public enteredForFirstTime() {
    this.props.isFirstEntrance = false;
  }

  public update(props: UpdateStaffEntityProps) {
    this.props.lastname = props.lastname;
    this.props.firstname = props.firstname;
    this.props.middleName = props.middleName;
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

  public activate(tgUsername?: string, avatar?: UrlVO) {
    this.props.tgUsername = tgUsername;
    this.props.avatar = this.props.avatar ?? avatar;
    this.updatedAtNow();
  }

  protected validate() {
    const {
      firstname,
      lastname,
      phone,
      role,
      tgId,
      middleName,
      isFirstEntrance,
    } = this.props;

    const requiredFields = [
      firstname,
      lastname,
      tgId,
      phone,
      role,
      middleName,
      isFirstEntrance,
    ];

    if (requiredFields.some((f) => f === null || f === undefined)) {
      throw new StaffHasEmptyFieldsError();
    }
  }
}
