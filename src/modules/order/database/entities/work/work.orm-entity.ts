import { ModelBase, OrmEntityBase } from '@libs/base-classes';
import { WorkPriority } from '@modules/order/types';

export interface WorkOrmEntityProps {
  name: string;
  price: number;
  time: number;
  priority: WorkPriority;
}

export class WorkOrmEntity
  extends OrmEntityBase<WorkOrmEntityProps>
  implements WorkOrmEntityProps
{
  name: string;
  price: number;
  time: number;
  priority: WorkPriority;
}

export class WorkModel extends ModelBase implements WorkOrmEntity {
  name: string;
  price: number;
  time: number;
  priority: WorkPriority;
}
