import { ServiceModel, ServiceOrmEntityProps } from './service.orm-entity';

export class ServiceObjectionOrmEntity extends ServiceModel {
  static tableName = 'services';

  static create(props: ServiceOrmEntityProps) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['id', 'createdAt', 'updatedAt', 'title', 'cost'],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        title: { type: 'string' },
        cost: { type: 'number' },
        description: { type: ['string', 'null'] },
      },
    };
  }
}
