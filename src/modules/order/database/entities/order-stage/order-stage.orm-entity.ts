import { ModelBase, OrmEntityBase } from '@libs/base-classes';
import { OrderStatus } from '@modules/order/types';

export interface OrderStageOrmEntityProps {
  completedAt?: string;
  deadline?: string;
  number: number;
  status: OrderStatus;
  orderId: string;
}

export class OrderStageOrmEntity
  extends OrmEntityBase<OrderStageOrmEntityProps>
  implements OrderStageOrmEntityProps
{
  completedAt?: string;
  deadline?: string;
  number: number;
  status: OrderStatus;
  orderId: string;
}

export class OrderStageModel extends ModelBase implements OrderStageOrmEntity {
  completedAt?: string;
  deadline?: string;
  number: number;
  status: OrderStatus;
  orderId: string;
}
