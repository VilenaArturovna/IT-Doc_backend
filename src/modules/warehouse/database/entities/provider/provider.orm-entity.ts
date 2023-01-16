import { ModelBase, OrmEntityBase } from '@libs/base-classes';

export interface ProviderOrmEntityProps {
  title: string;
  description?: string;
}

export class ProviderOrmEntity
  extends OrmEntityBase<ProviderOrmEntityProps>
  implements ProviderOrmEntityProps
{
  title: string;
  description?: string;
}

export class ProviderModel extends ModelBase implements ProviderOrmEntity {
  title: string;
  description?: string;
}
