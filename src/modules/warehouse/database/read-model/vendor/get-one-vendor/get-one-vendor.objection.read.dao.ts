import { ExceptionBase } from '@libs/base-classes';
import { Result } from '@libs/utils';
import { Model } from 'objection';

import {
  GetOneVendorDaoModel,
  GetOneVendorReadDao,
} from './get-one-vendor.read.dao';
import { GetOneVendorQuery } from '@modules/warehouse/queries';
import { NotFoundException } from '@libs/exceptions';
import { Tables } from '@libs/tables';

export class GetOneVendorObjectionReadDao extends GetOneVendorReadDao {
  async query(
    query: GetOneVendorQuery,
  ): Promise<Result<GetOneVendorDaoModel, ExceptionBase>> {
    const knex = Model.knex();

    const vendor = await knex(Tables.VENDORS)
      .select('id', 'title', 'description')
      .where('id', query.params.id)
      .first();

    if (!vendor) {
      return Result.fail(new NotFoundException('Продавец не найден'));
    }

    return Result.ok(vendor);
  }
}
