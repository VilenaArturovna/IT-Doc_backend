import { Tables } from '@libs/tables';

import { WorkModel, WorkOrmEntityProps } from './work.orm-entity';

export class WorkObjectionOrmEntity extends WorkModel {
  static tableName = Tables.WORKS;

  static create(props: WorkOrmEntityProps) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'createdAt', 'updatedAt', 'name', 'price', 'time'],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        name: { type: 'string' },
        price: { type: 'string' },
        time: { type: 'number' },
      },
    };
  }
}
