import { Tables } from '@libs/tables';
import { Model } from 'objection';

import { StaffObjectionOrmEntity } from '../../../../staff/database/entities/staff/staff.objection.orm-entity';
import { ClientObjectionOrmEntity } from '../client/client.objection.orm-entity';
import { OrderStageObjectionOrmEntity } from '../order-stage/order-stage.objection.orm-entity';
import { OrderWarehouseItemObjectionOrmEntity } from '../orders-warehouse-items/order-warehouse-item.objection.orm-entity';
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
        price: { type: 'string' },
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
      relation: Model.HasManyRelation,
      modelClass: OrderWarehouseItemObjectionOrmEntity,
      join: {
        from: `${this.tableName}.id`,
        to: `${OrderWarehouseItemObjectionOrmEntity}.orderId`,
      },
    },
    stages: {
      relation: Model.HasManyRelation,
      modelClass: OrderStageObjectionOrmEntity,
      join: {
        from: `${this.tableName}.id`,
        to: `${OrderStageObjectionOrmEntity.tableName}.orderId`,
      },
    },
  };
}
