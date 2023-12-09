import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import {
  GetOneWarehouseItemDaoModel,
  GetOneWarehouseItemReadDao,
} from './get-one-warehouse-item.read.dao';
import { GetOneWarehouseItemQuery } from '@modules/warehouse/queries';
import { Tables } from '@libs/tables';

export class GetOneWarehouseItemObjectionReadDao extends GetOneWarehouseItemReadDao {
  async query(
    query: GetOneWarehouseItemQuery,
  ): Promise<Result<GetOneWarehouseItemDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const item = await knex(`${Tables.WAREHOUSE_ITEMS} as wi`)
      .select(
        'wi.*',
        knex.raw(`
        jsonb_build_object('id', v.id, 'title', v.title) as vendor,
        jsonb_build_object('id', p.id, 'title', p.title) as provider    
      `),
      )
      .innerJoin(`${Tables.VENDORS} as v`, 'v.id', 'wi.vendorId')
      .innerJoin(`${Tables.PROVIDERS} as p`, 'p.id', 'wi.providerId')
      .where('wi.id', query.params.id)
      .first();

    return Result.ok(item);
  }
}
