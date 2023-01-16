import { ModelBase, OrmEntityBase } from '@libs/base-classes';
import { Role } from '@modules/staff/types';

export interface StaffOrmEntityProps {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  birthdate?: string;
  avatar?: string;
  resetPasswordHash?: string;
  role: Role;
  isRemoved: boolean;
}

export class StaffOrmEntity
  extends OrmEntityBase<StaffOrmEntityProps>
  implements StaffOrmEntityProps
{
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  birthdate?: string;
  avatar?: string;
  resetPasswordHash?: string;
  role: Role;
  isRemoved: boolean;
}

export class StaffModel extends ModelBase implements StaffOrmEntity {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  password: string;
  birthdate?: string;
  avatar?: string;
  resetPasswordHash?: string;
  role: Role;
  isRemoved: boolean;
}
