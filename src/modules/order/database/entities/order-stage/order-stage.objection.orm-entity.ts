import { Tables } from '@libs/tables';

import {
  OrderStageModel,
  OrderStageOrmEntityProps,
} from './order-stage.orm-entity';

export class OrderStageObjectionOrmEntity extends OrderStageModel {
  static tableName = Tables.ORDER_STAGES;

  static create(props: OrderStageOrmEntityProps) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['number', 'status', 'orderId'],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        number: { type: 'number' },
        status: { type: 'string' },
        orderId: { type: 'string' },
        deadline: { type: ['string', 'null'] },
        completedAt: { type: ['string', 'null'] },
      },
    };
  }
}
