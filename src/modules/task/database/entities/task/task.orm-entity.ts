import { ModelBase, OrmEntityBase } from '@libs/base-classes';
import { TaskStaffOrmEntity } from '@modules/task/database/entities';
import { TaskStatus } from '@modules/task/types';

export interface TaskOrmEntityProps {
  theme: string;
  number: string;
  description: string;
  status: TaskStatus;
  deadline?: string;
  price?: string;
  participants?: TaskStaffOrmEntity[];
}

export class TaskOrmEntity
  extends OrmEntityBase<TaskOrmEntityProps>
  implements TaskOrmEntityProps
{
  theme: string;
  number: string;
  description: string;
  status: TaskStatus;
  deadline?: string;
  price?: string;
  participants?: TaskStaffOrmEntity[];
}

export class TaskModel extends ModelBase implements TaskOrmEntity {
  theme: string;
  number: string;
  description: string;
  status: TaskStatus;
  deadline?: string;
  price?: string;
  participants?: TaskStaffOrmEntity[];
}
