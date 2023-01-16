import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import {
  GetOneWarehouseItemDaoModel,
  GetOneWarehouseItemReadDao,
} from './get-one-warehouse-item.read.dao';
import { GetOneWarehouseItemQuery } from '@modules/warehouse/queries';

export class GetOneWarehouseItemObjectionReadDao extends GetOneWarehouseItemReadDao {
  async query(
    query: GetOneWarehouseItemQuery,
  ): Promise<Result<GetOneWarehouseItemDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const item = await knex('warehouse_items as wi')
      .select(
        'wi.*',
        knex.raw(`
        jsonb_build_object('id', v.id, 'name', v.name) as vendor,
        jsonb_build_object('id', p.id, 'name', p.name) as provider,
        jsonb_build_object('id', s.id, 'name', s.name) as service,
      `),
      )
      .innerJoin('vendors as v', 'v.id', 'wi.vendorId')
      .innerJoin('providers as p', 'p.id', 'wi.providerId')
      .innerJoin('services as s', 's.id', 'wi.serviceId')
      .where('wi.id', query.params.id)
      .first();

    return Result.ok(item);
  }
}
