import { Tables } from '@libs/tables';

import { VendorModel, VendorOrmEntityProps } from './vendor.orm-entity';

export class VendorObjectionOrmEntity extends VendorModel {
  static tableName = Tables.VENDORS;

  static create(props: VendorOrmEntityProps) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'createdAt', 'updatedAt', 'title'],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        title: { type: 'string' },
        description: { type: ['string', 'null'] },
      },
    };
  }
}
