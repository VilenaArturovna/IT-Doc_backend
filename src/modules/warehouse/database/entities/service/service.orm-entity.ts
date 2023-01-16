import { ModelBase, OrmEntityBase } from '@libs/base-classes';

export interface ServiceOrmEntityProps {
  title: string;
  cost: number;
  description?: string;
}

export class ServiceOrmEntity
  extends OrmEntityBase<ServiceOrmEntityProps>
  implements ServiceOrmEntityProps
{
  title: string;
  cost: number;
  description?: string;
}

export class ServiceModel extends ModelBase implements ServiceOrmEntity {
  title: string;
  cost: number;
  description?: string;
}
