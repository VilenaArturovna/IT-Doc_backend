import { Tables } from '@libs/tables';
import { Model } from 'objection';

import { StaffObjectionOrmEntity } from '../../../../staff/database/entities/staff/staff.objection.orm-entity';
import { WarehouseItemObjectionOrmEntity } from '../../../../warehouse/database/entities/warehouse-item/warehouse-item.objection.orm-entity';
import { ClientObjectionOrmEntity } from '../client/client.objection.orm-entity';
import { WorkObjectionOrmEntity } from '../work/work.objection.orm-entity';
import { OrderModel, OrderOrmEntityProps } from './order.orm-entity';

export class OrderObjectionOrmEntity extends OrderModel {
  static tableName = Tables.ORDERS;

  static create(props: OrderOrmEntityProps) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'status',
        'deadline',
        'equipment',
        'equipmentCondition',
        'clientId',
        'malfunction',
        'beneficiary',
        'price',
        'priority',
      ],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        number: { type: 'string' },
        status: { type: 'string' },
        priority: { type: 'string' },
        deadline: { type: 'string' },
        equipment: { type: 'string' },
        equipmentCondition: { type: 'string' },
        malfunction: { type: 'string' },
        beneficiary: { type: 'string' },
        price: { type: 'number' },
        clientId: { type: 'string' },
        responsibleStaffId: { type: ['string', 'null'] },
        workId: { type: ['string', 'null'] },
        serialNumberEquipment: { type: ['string', 'null'] },
      },
    };
  }

  static relationMappings = {
    client: {
      relation: Model.HasOneRelation,
      modelClass: ClientObjectionOrmEntity,
      join: {
        from: `${this.tableName}.clientId`,
        to: `${ClientObjectionOrmEntity.tableName}.id`,
      },
    },
    responsibleStaff: {
      relation: Model.HasOneRelation,
      modelClass: StaffObjectionOrmEntity,
      join: {
        from: `${this.tableName}.responsibleStaffId`,
        to: `${StaffObjectionOrmEntity.tableName}.id`,
      },
    },
    work: {
      relation: Model.HasOneRelation,
      modelClass: WorkObjectionOrmEntity,
      join: {
        from: `${this.tableName}.workId`,
        to: `${WorkObjectionOrmEntity.tableName}.id`,
      },
    },
    repairParts: {
      relation: Model.ManyToManyRelation,
      modelClass: WarehouseItemObjectionOrmEntity,
      join: {
        from: `${this.tableName}.id`,
        through: {
          from: 'orders_warehouse_items.orderId',
          to: 'orders_warehouse_items.warehouseItemId',
        },
        to: `${WarehouseItemObjectionOrmEntity.tableName}.id`,
      },
    },
  };
}
