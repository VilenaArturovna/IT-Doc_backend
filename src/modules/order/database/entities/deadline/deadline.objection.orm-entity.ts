import { Tables } from '@libs/tables';

import { DeadlineModel, DeadlineOrmEntityProps } from './deadline.orm-entity';

export class DeadlineObjectionOrmEntity extends DeadlineModel {
  static tableName = Tables.DEADLINES;

  static create(props: DeadlineOrmEntityProps) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'normal', 'urgent'],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        name: { type: 'string' },
        normal: { type: 'string' },
        urgent: { type: 'string' },
      },
    };
  }
}
