import { Tables } from '@libs/tables';
import { Model, RelationMappings } from 'objection';

import { StaffObjectionOrmEntity } from '../../../../staff/database/entities/staff/staff.objection.orm-entity';
import {
  TaskStaffModel,
  TaskStaffOrmEntityProps,
} from './task-staff.orm-entity';

export class TaskStaffObjectionOrmEntity extends TaskStaffModel {
  static tableName = Tables.TASKS_STAFF;

  static create(props: TaskStaffOrmEntityProps) {
    return this.fromJson(props);
  }

  staffId: string;
  taskId: string;
  comment?: string;
  isResponsible: boolean;
  isAuthor: boolean;
  isRead: boolean;
  static get jsonSchema() {
    return {
      type: 'object',
      required: ['staffId', 'taskId', 'isResponsible', 'isAuthor', 'isRead'],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        staffId: { type: 'string' },
        taskId: { type: 'string' },
        comment: { type: ['string', 'null'] },
        isResponsible: { type: 'boolean' },
        isAuthor: { type: 'boolean' },
        isRead: { type: 'boolean' },
      },
    };
  }

  static relationMappings: RelationMappings = {
    staff: {
      relation: Model.HasOneRelation,
      modelClass: StaffObjectionOrmEntity,
      join: {
        from: `${this.tableName}.staffId`,
        to: `${StaffObjectionOrmEntity.tableName}.id`,
      },
    },
  };
}
