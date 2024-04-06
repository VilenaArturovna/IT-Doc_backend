import { ModelBase, OrmEntityBase } from '@libs/base-classes';

export interface WorkOrmEntityProps {
  name: string;
  price: string;
  time: number;
}

export class WorkOrmEntity
  extends OrmEntityBase<WorkOrmEntityProps>
  implements WorkOrmEntityProps
{
  name: string;
  price: string;
  time: number;
}

export class WorkModel extends ModelBase implements WorkOrmEntity {
  name: string;
  price: string;
  time: number;
}
