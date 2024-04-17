import { Tables } from '@libs/tables';
import { Model } from 'objection';

import { WarehouseItemObjectionOrmEntity } from '../../../../warehouse/database/entities/warehouse-item/warehouse-item.objection.orm-entity';
import {
  OrderWarehouseItemModel,
  OrderWarehouseItemOrmEntityProps,
} from './order-warehouse-item.orm-entity';
export class OrderWarehouseItemObjectionOrmEntity extends OrderWarehouseItemModel {
  static tableName = Tables.ORDERS_WAREHOUSE_ITEMS;

  static create(props: OrderWarehouseItemOrmEntityProps) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['cost', 'orderId', 'quantity', 'warehouseItemId'],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        cost: { type: 'string' },
        orderId: { type: 'string' },
        warehouseItemId: { type: 'string' },
        quantity: { type: 'number' },
      },
    };
  }

  static relationMappings = {
    warehouseItem: {
      relation: Model.HasOneRelation,
      modelClass: WarehouseItemObjectionOrmEntity,
      join: {
        from: `${this.tableName}.warehouseItemId`,
        to: `${WarehouseItemObjectionOrmEntity.tableName}.id`,
      },
    },
  };
}
