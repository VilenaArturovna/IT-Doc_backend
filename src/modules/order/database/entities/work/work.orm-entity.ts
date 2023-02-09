import { ModelBase, OrmEntityBase } from '@libs/base-classes';

export interface WorkOrmEntityProps {
  name: string;
  price: number;
  time: number;
}

export class WorkOrmEntity
  extends OrmEntityBase<WorkOrmEntityProps>
  implements WorkOrmEntityProps
{
  name: string;
  price: number;
  time: number;
}

export class WorkModel extends ModelBase implements WorkOrmEntity {
  name: string;
  price: number;
  time: number;
}
