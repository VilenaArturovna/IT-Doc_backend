import { ModelBase, OrmEntityBase } from '@libs/base-classes';
import { StaffOrmEntity } from '@modules/staff/database/entities';

export interface TaskStaffOrmEntityProps {
  staffId: string;
  taskId: string;
  comment?: string;
  isResponsible: boolean;
  isAuthor: boolean;
  isRead: boolean;
  staff?: StaffOrmEntity;
}

export class TaskStaffOrmEntity
  extends OrmEntityBase<TaskStaffOrmEntityProps>
  implements TaskStaffOrmEntityProps
{
  staffId: string;
  taskId: string;
  comment?: string;
  isResponsible: boolean;
  isAuthor: boolean;
  isRead: boolean;
  staff?: StaffOrmEntity;
}

export class TaskStaffModel extends ModelBase implements TaskStaffOrmEntity {
  staffId: string;
  taskId: string;
  comment?: string;
  isResponsible: boolean;
  isAuthor: boolean;
  isRead: boolean;
  staff?: StaffOrmEntity;
}
