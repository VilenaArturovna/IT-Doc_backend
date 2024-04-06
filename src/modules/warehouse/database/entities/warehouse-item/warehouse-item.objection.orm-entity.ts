import { Tables } from '@libs/tables';
import { Model } from 'objection';

import { ProviderObjectionOrmEntity } from '../provider/provider.objection.orm-entity';
import { VendorObjectionOrmEntity } from '../vendor/vendor.objection.orm-entity';
import {
  WarehouseItemModel,
  WarehouseItemOrmEntityProps,
} from './warehouse-item.orm-entity';

export class WarehouseItemObjectionOrmEntity extends WarehouseItemModel {
  static tableName = Tables.WAREHOUSE_ITEMS;

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
        price: { type: 'string' },
        balance: { type: 'number' },
        criticalMargin: { type: 'number' },
        isArchived: { type: 'boolean' },
        partNumber: { type: ['string', 'null'] },
        compatibleModels: { type: ['string', 'null'] },
        packing: { type: ['string', 'null'] },
        expense: { type: ['number', 'null'] },
        expenseReserve: { type: ['number', 'null'] },
        nextDeliveryDate: { type: ['string', 'null'] },
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
  };
}
