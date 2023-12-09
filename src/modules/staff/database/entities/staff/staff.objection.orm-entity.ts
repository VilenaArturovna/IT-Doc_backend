import { Tables } from '@libs/tables';

import { StaffModel, StaffOrmEntityProps } from './staff.orm-entity';

export class StaffObjectionOrmEntity extends StaffModel {
  static tableName = Tables.STAFF;

  static create(props: StaffOrmEntityProps) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'id',
        'createdAt',
        'updatedAt',
        'firstname',
        'lastname',
        'email',
        'phone',
        'password',
        'role',
        'isRemoved',
      ],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        firstname: { type: 'string' },
        lastname: { type: 'string' },
        email: { type: 'string' },
        phone: { type: 'string' },
        password: { type: 'string' },
        birthdate: { type: ['string', 'null'] },
        role: { type: 'string' },
        avatar: { type: ['string', 'null'] },
        resetPasswordHash: { type: ['string', 'null'] },
        isRemoved: { type: 'boolean' },
      },
    };
  }
}
