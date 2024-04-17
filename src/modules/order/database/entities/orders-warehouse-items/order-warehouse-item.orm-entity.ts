import { ModelBase } from '@libs/base-classes';
import { WarehouseItemOrmEntity } from '@modules/warehouse/database/entities';

export interface OrderWarehouseItemOrmEntityProps {
  orderId: string;
  warehouseItemId: string;
  cost: string;
  quantity: number;
  warehouseItem?: WarehouseItemOrmEntity;
}

export class OrderWarehouseItemOrmEntity
  implements OrderWarehouseItemOrmEntityProps
{
  cost: string;
  orderId: string;
  quantity: number;
  warehouseItemId: string;
  warehouseItem?: WarehouseItemOrmEntity;
}

export class OrderWarehouseItemModel
  extends ModelBase
  implements OrderWarehouseItemOrmEntity
{
  cost: string;
  orderId: string;
  quantity: number;
  warehouseItemId: string;
  warehouseItem?: WarehouseItemOrmEntity;
}
