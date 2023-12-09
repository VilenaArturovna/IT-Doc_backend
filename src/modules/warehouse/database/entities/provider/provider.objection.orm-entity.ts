import { Tables } from '@libs/tables';

import { ProviderModel, ProviderOrmEntityProps } from './provider.orm-entity';

export class ProviderObjectionOrmEntity extends ProviderModel {
  static tableName = Tables.PROVIDERS;

  static create(props: ProviderOrmEntityProps) {
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
