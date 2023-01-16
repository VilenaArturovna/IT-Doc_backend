import { ModelBase, OrmEntityBase } from '@libs/base-classes';

export interface VendorOrmEntityProps {
  title: string;
  description?: string;
}

export class VendorOrmEntity
  extends OrmEntityBase<VendorOrmEntityProps>
  implements VendorOrmEntityProps
{
  title: string;
  description?: string;
}

export class VendorModel extends ModelBase implements VendorOrmEntity {
  title: string;
  description?: string;
}
