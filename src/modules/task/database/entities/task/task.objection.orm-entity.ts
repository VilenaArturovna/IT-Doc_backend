import { Tables } from '@libs/tables';
import { Model, RelationMappings } from 'objection';

import { TaskStaffObjectionOrmEntity } from '../task-staff/task-staff.objection.orm-entity';
import { TaskModel, TaskOrmEntityProps } from './task.orm-entity';

export class TaskObjectionOrmEntity extends TaskModel {
  static tableName = Tables.TASKS;

  static create(props: TaskOrmEntityProps) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['theme', 'description', 'status'],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        theme: { type: 'string' },
        description: { type: 'string' },
        status: { type: 'string' },
        number: { type: ['string', 'null'] },
        deadline: { type: ['string', 'null'] },
        price: { type: ['string', 'null'] },
      },
    };
  }

  static relationMappings: RelationMappings = {
    participants: {
      relation: Model.HasManyRelation,
      modelClass: TaskStaffObjectionOrmEntity,
      join: {
        from: `${this.tableName}.id`,
        to: `${TaskStaffObjectionOrmEntity.tableName}.taskId`,
      },
    },
  };
}
