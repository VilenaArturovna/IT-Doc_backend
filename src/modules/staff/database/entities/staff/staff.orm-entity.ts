import { ModelBase, OrmEntityBase } from '@libs/base-classes';
import { Role } from '@modules/staff/types';

export interface StaffOrmEntityProps {
  firstname: string;
  lastname: string;
  phone: string;
  birthdate?: string;
  avatar?: string;
  role: Role;
  isRemoved: boolean;
  tgId?: string;
  tgUsername: string;
}

export class StaffOrmEntity
  extends OrmEntityBase<StaffOrmEntityProps>
  implements StaffOrmEntityProps
{
  firstname: string;
  lastname: string;
  phone: string;
  birthdate?: string;
  avatar?: string;
  role: Role;
  isRemoved: boolean;
  tgId?: string;
  tgUsername: string;
}

export class StaffModel extends ModelBase implements StaffOrmEntity {
  firstname: string;
  lastname: string;
  phone: string;
  birthdate?: string;
  avatar?: string;
  role: Role;
  isRemoved: boolean;
  tgId?: string;
  tgUsername: string;
}
