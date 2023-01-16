import {
  WarehouseItemModel,
  WarehouseItemOrmEntityProps,
} from './warehouse-item.orm-entity';
import {
  ProviderObjectionOrmEntity,
  ServiceObjectionOrmEntity,
  VendorObjectionOrmEntity,
} from '@modules/warehouse/database/entities';
import { Model } from 'objection';

export class WarehouseItemObjectionOrmEntity extends WarehouseItemModel {
  static tableName = 'warehouse_items';

  static create(props: WarehouseItemOrmEntityProps) {
    return this.fromJson(props);
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: [
        'id',
        'createdAt',
        'updatedAt',
        'section',
        'title',
        'unit',
        'price',
        'balance',
        'criticalMargin',
        'isArchived',
        'vendorId',
        'providerId',
      ],
      properties: {
        id: { type: 'string' },
        createdAt: { type: 'string' },
        updatedAt: { type: 'string' },
        section: { type: 'string' },
        title: { type: 'string' },
        unit: { type: 'string' },
        price: { type: 'number' },
        balance: { type: 'number' },
        criticalMargin: { type: 'number' },
        isArchived: { type: 'boolean' },
        partNumber: { type: ['string', 'null'] },
        compatibleModels: { type: ['string', 'null'] },
        packing: { type: ['string', 'null'] },
        expense: { type: ['number', 'null'] },
        expenseReserve: { type: ['number', 'null'] },
        nextDeliveryDate: { type: ['string', 'null'] },
        serviceId: { type: ['string', 'null'] },
        vendorId: { type: 'string' },
        providerId: { type: 'string' },
      },
    };
  }

  static relationMappings = {
    vendor: {
      relation: Model.BelongsToOneRelation,
      modelClass: VendorObjectionOrmEntity,
      join: {
        from: `${this.tableName}.vendorId`,
        to: `${VendorObjectionOrmEntity.tableName}.id`,
      },
    },
    provider: {
      relation: Model.BelongsToOneRelation,
      modelClass: ProviderObjectionOrmEntity,
      join: {
        from: `${this.tableName}.providerId`,
        to: `${ProviderObjectionOrmEntity.tableName}.id`,
      },
    },
    service: {
      relation: Model.BelongsToOneRelation,
      modelClass: ServiceObjectionOrmEntity,
      join: {
        from: `${this.tableName}.serviceId`,
        to: `${ServiceObjectionOrmEntity.tableName}.id`,
      },
    },
  };
}
