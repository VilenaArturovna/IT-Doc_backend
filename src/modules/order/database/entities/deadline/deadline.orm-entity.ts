import { ModelBase, OrmEntityBase } from '@libs/base-classes';
import { OrderStatus } from '@modules/order/types';

export interface DeadlineOrmEntityProps {
  name: OrderStatus;
  normal: number;
  urgent: number;
}

export class DeadlineOrmEntity
  extends OrmEntityBase<DeadlineOrmEntityProps>
  implements DeadlineOrmEntityProps
{
  name: OrderStatus;
  normal: number;
  urgent: number;
}

export class DeadlineModel extends ModelBase implements DeadlineOrmEntity {
  name: OrderStatus;
  normal: number;
  urgent: number;
}
